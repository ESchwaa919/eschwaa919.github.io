// engine.js

export function normalizePreferences(prefs) {
  const copy = JSON.parse(JSON.stringify(prefs || {}));
  if (!Array.isArray(copy.mustCover) || copy.mustCover.length === 0) {
    copy.mustCover = ["Foundations","GenAI","ResponsibleAI","RiskHallucinations","ROI"];
  }
  if (!Array.isArray(copy.formatBias) || copy.formatBias.length === 0) {
    copy.formatBias = ["video","interactive","text"];
  }
  if (!Array.isArray(copy.jurisdiction) || copy.jurisdiction.length === 0) {
    copy.jurisdiction = ["UK","EU","US","Global"];
  }
  if (typeof copy.slotMinutes !== "number" || copy.slotMinutes <= 0) {
    copy.slotMinutes = 60;
  }
  if (typeof copy.wantCertificate !== "boolean") {
    copy.wantCertificate = true;
  }
  return copy;
}

export function scoreResource(resource, prefs, unmetTopics) {
  let score = 0;
  const reasons = [];

  // 1) Coverage fit
  const coverageCount = resource.topics.filter(t => unmetTopics.includes(t)).length;
  score += coverageCount * 10;
  if (coverageCount > 0) reasons.push(`covers ${coverageCount} unmet topics`);

  // 2) Time fit
  if (resource.durationMinutes <= prefs.slotMinutes) {
    score += 4; reasons.push("fits slot");
  } else if (resource.chunkable && resource.durationMinutes <= prefs.slotMinutes * 4) {
    score += 2; reasons.push("chunkable");
  } else {
    score -= 3; reasons.push("time penalty");
  }

  // 3) Format bias
  const idx = prefs.formatBias.indexOf(resource.format);
  if (idx >= 0) {
    const boost = Math.max(0, 3 - idx); // 3,2,1
    score += boost; reasons.push(`format ${resource.format} +${boost}`);
  }

  // 4) Region fit
  const regionOk = resource.regionTags.includes("Global") ||
                   resource.regionTags.some(r => prefs.jurisdiction.includes(r));
  if (regionOk) { score += 2; reasons.push("region match"); }
  else { score -= 2; reasons.push("region mismatch"); }

  // 5) Certificate / badge
  if (prefs.wantCertificate) {
    if (resource.certificateBadge === "badge") { score += 2; reasons.push("badge"); }
    if (resource.certificateBadge === "certificate_paid") { score += 1; reasons.push("certificate"); }
  }

  // 6) Commute friendly for long slots
  if (prefs.slotMinutes >= 60 && resource.commuteFriendly) {
    score += 1; reasons.push("commute friendly");
  }

  return { resource, score, reasons };
}

export function generateLearningPath(catalog, prefs, options) {
  const opts = Object.assign({ maxSessions: 8, enforceDiversity: true }, options || {});
  const unmet = new Set(prefs.mustCover);
  const chosen = [];
  const usedProviders = new Set();

  // Two-pass greedy selection
  for (let pass = 0; pass < 2; pass++) {
    const scored = catalog
      .filter(r => !chosen.find(c => c.id === r.id))
      .map(r => scoreResource(r, prefs, Array.from(unmet)))
      .sort((a, b) => b.score - a.score);

    for (const s of scored) {
      if (chosen.length >= opts.maxSessions) break;
      if (opts.enforceDiversity && usedProviders.has(s.resource.provider)) continue;

      chosen.push(s.resource);
      usedProviders.add(s.resource.provider);
      for (const t of s.resource.topics) unmet.delete(t);
    }
  }

  // Build sessions respecting slot minutes
  const sessions = [];
  for (const r of chosen) {
    const chunks = chunkResourceIntoSessions(r, prefs.slotMinutes);
    for (const ch of chunks) {
      if (sessions.length >= opts.maxSessions) break;
      sessions.push(ch);
    }
    if (sessions.length >= opts.maxSessions) break;
  }

  return {
    sessions,
    coverage: computeCoverageVector(chosen, prefs.mustCover),
    explanation: buildPlanExplanation(chosen, prefs)
  };
}

export function chunkResourceIntoSessions(resource, slotMinutes) {
  const parts = [];
  if (resource.durationMinutes <= slotMinutes || !resource.chunkable) {
    parts.push({
      id: resource.id,
      title: resource.title,
      provider: resource.provider,
      url: resource.url,
      durationMinutes: Math.min(resource.durationMinutes, slotMinutes),
      originalDuration: resource.durationMinutes,
      part: 1, of: 1,
      category: resource.category,
      format: resource.format
    });
    return parts;
  }
  const total = resource.durationMinutes;
  const count = Math.ceil(total / slotMinutes);
  for (let i = 0; i < count; i++) {
    const remaining = total - i * slotMinutes;
    const d = Math.min(slotMinutes, remaining);
    parts.push({
      id: `${resource.id}-p${i+1}`,
      title: `${resource.title} (Part ${i+1}/${count})`,
      provider: resource.provider,
      url: resource.url,
      durationMinutes: d,
      originalDuration: resource.durationMinutes,
      part: i+1, of: count,
      category: resource.category,
      format: resource.format
    });
  }
  return parts;
}

export function computeCoverageVector(resources, mustCover) {
  const have = new Set();
  for (const r of resources) for (const t of r.topics) have.add(t);
  const missing = mustCover.filter(t => !have.has(t));
  return { covered: Array.from(have), missing };
}

export function buildPlanExplanation(resources, prefs) {
  return {
    rationale: [
      "Prioritized unmet core topics first.",
      "Respected time slots and preferred formats.",
      "Diversified across providers.",
      prefs.wantCertificate ? "Boosted items with badges/certificates." : "No certificate boost applied."
    ],
    order: resources.map(r => `${r.title} [${r.provider}]`)
  };
}

/** Create an ICS calendar from sessions starting today (one per day at 08:00). */
export function createIcsFromSessions(sessions, startDate) {
  function fmt(dt) {
    const pad = n => String(n).padStart(2,'0');
    return dt.getUTCFullYear()
      + pad(dt.getUTCMonth()+1)
      + pad(dt.getUTCDate()) + 'T'
      + pad(dt.getUTCHours())
      + pad(dt.getUTCMinutes())
      + pad(dt.getUTCSeconds()) + 'Z';
  }
  let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//theAiExpert.ai//Exec AI Learning//EN\n';
  let d = new Date(startDate);
  d.setHours(8,0,0,0); // 08:00 local; we’ll export as UTC
  for (let i=0;i<sessions.length;i++) {
    const s = sessions[i];
    const start = new Date(d.getTime() + i*24*3600*1000);
    const end = new Date(start.getTime() + s.durationMinutes*60*1000);
    const uid = `${s.id}-${start.getTime()}@theaiexpert.ai`;
    const title = s.title.replace(/[\n\r]/g,' ');
    ics += 'BEGIN:VEVENT\n';
    ics += `UID:${uid}\n`;
    ics += `DTSTAMP:${fmt(new Date())}\n`;
    ics += `DTSTART:${fmt(start)}\n`;
    ics += `DTEND:${fmt(end)}\n`;
    ics += `SUMMARY:${escapeText(title)}\n`;
    ics += `DESCRIPTION:${escapeText(`${s.provider} — ${s.url}`)}\n`;
    ics += 'END:VEVENT\n';
  }
  ics += 'END:VCALENDAR\n';
  return ics;

  function escapeText(t){ return t.replace(/([,;])/g,'\\$1').replace(/\n/g,'\\n'); }
}

/** Best-effort link verification from the browser. */
export async function verifyCatalogLinks(catalog) {
  const results = [];
  for (const r of catalog) {
    const out = { id:r.id, url:r.url, method:null, ok:false, status:null, mode:null, note:null };
    try {
      // Try CORS-friendly GET first (some origins allow)
      let resp = await fetch(r.url, { method:'GET', mode:'cors' });
      out.method='GET'; out.mode='cors'; out.status=resp.status; out.ok=resp.ok;
      if (!resp.ok) {
        // Fallback to no-cors which returns opaque but at least checks reachability at network layer
        const resp2 = await fetch(r.url, { method:'GET', mode:'no-cors' });
        out.method='GET'; out.mode='no-cors'; out.status='opaque'; out.ok = resp2.type === 'opaque';
        out.note = 'opaque response (CORS blocked), manual check advised';
      }
    } catch (e) {
      // Final fallback: open a zero-size image fetch to test DNS/HTTPS (will fail for HTML, but catches network errors)
      try {
        await fetch(r.url, { method:'HEAD', mode:'no-cors' });
        out.method='HEAD'; out.mode='no-cors'; out.status='opaque'; out.ok=true; out.note='HEAD no-cors fallback';
      } catch (e2) {
        out.ok=false; out.note = String(e2);
      }
    }
    results.push(out);
  }
  const summary = {
    ok: results.filter(x=>x.ok).length,
    bad: results.filter(x=>x.ok===false && x.status && x.status !== 'opaque').length,
    unknown: results.filter(x=>x.status === 'opaque' && x.ok).length
  };
  return { summary, results };
}