/**
 * Head de-duplication for the pre-rendered pages.
 *
 * index.html ships static defaults (title, description, og:*, twitter:*). The
 * page's own SEOHead (react-helmet-async) APPENDS its tags, marked data-rh="true",
 * instead of replacing those defaults. The pre-rendered HTML therefore carries two
 * og:image, two twitter:image, two description tags, and so on. Scrapers such as
 * LinkedIn usually take the FIRST og:image, so a shared page showed the generic
 * card instead of its own.
 *
 * dedupeHead() works on the serialised HTML string, so it needs no DOM and no
 * dependencies. For every <meta> (keyed by property/name), <title> and
 * <link rel="canonical"> that has a data-rh version, it removes the static copy.
 * A static tag with no data-rh counterpart is never touched, so a page that sets
 * nothing keeps the static default exactly once.
 *
 * auditHead() counts the tags that must appear exactly once, so the build can
 * refuse a page with zero or duplicate og:image / twitter:image / description /
 * title.
 */

// Tokens that matter inside <head>. Comments, <script> and <style> are matched
// first so that text inside them is never mistaken for a tag. Quoted attribute
// values may contain ">" so they are matched as a unit.
const TAG_BODY = `(?:[^>"']|"[^"]*"|'[^']*')*`;
const TOKEN = new RegExp(
  [
    '<!--[\\s\\S]*?-->',
    '<script\\b[\\s\\S]*?<\\/script\\s*>',
    '<style\\b[\\s\\S]*?<\\/style\\s*>',
    '<title\\b[^>]*>[\\s\\S]*?<\\/title\\s*>',
    `<meta\\b${TAG_BODY}>`,
    `<link\\b${TAG_BODY}>`,
  ].join('|'),
  'gi'
);

const ATTR = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttrs(tag) {
  const attrs = {};
  const inner = tag.replace(/^<\w+/, '').replace(/\/?>$/, '');
  let m;
  ATTR.lastIndex = 0;
  while ((m = ATTR.exec(inner)) !== null) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return attrs;
}

/** Identity of a head tag for de-duplication, or null if the tag is not one we manage. */
function identify(token) {
  const lower = token.slice(0, 7).toLowerCase();
  if (lower.startsWith('<title')) {
    // Only the opening tag carries attributes; the title text must not be parsed.
    return { kind: 'title', key: 'title', attrs: parseAttrs(/^<title\b[^>]*>/i.exec(token)[0]) };
  }

  const attrs = parseAttrs(token);
  if (lower.startsWith('<meta')) {
    for (const attr of ['property', 'name']) {
      if (attrs[attr]) return { kind: 'meta', key: `${attr}:${attrs[attr].toLowerCase()}`, attrs };
    }
    return null; // charset, http-equiv, itemprop: not managed here
  }
  if (lower.startsWith('<link') && (attrs.rel || '').toLowerCase() === 'canonical') {
    return { kind: 'link', key: 'canonical', attrs };
  }
  return null;
}

function headRange(html) {
  const open = /<head\b[^>]*>/i.exec(html);
  if (!open) return null;
  const start = open.index + open[0].length;
  const end = html.toLowerCase().indexOf('</head>', start);
  return end === -1 ? null : { start, end };
}

function collectEntries(headHtml) {
  const entries = [];
  TOKEN.lastIndex = 0;
  let m;
  while ((m = TOKEN.exec(headHtml)) !== null) {
    const id = identify(m[0]);
    if (!id) continue;
    entries.push({
      ...id,
      from: m.index,
      to: m.index + m[0].length,
      text: m[0],
      rh: Object.prototype.hasOwnProperty.call(id.attrs, 'data-rh'),
    });
  }
  return entries;
}

/**
 * Remove static head tags that a data-rh tag supersedes.
 * Returns { html, removed } where removed lists what was dropped (for logging).
 */
export function dedupeHead(html) {
  const range = headRange(html);
  if (!range) return { html, removed: [] };

  const headHtml = html.slice(range.start, range.end);
  const entries = collectEntries(headHtml);

  const hasRh = new Set(entries.filter((e) => e.rh).map((e) => `${e.kind}|${e.key}`));
  const drop = new Set();

  for (const entry of entries) {
    if (!entry.rh && hasRh.has(`${entry.kind}|${entry.key}`)) drop.add(entry);
  }

  // Image dimensions and other og:image:* details describe ONE image. If the page
  // replaced og:image with a different picture, the static details (1200x630 for
  // the default card) are stale and must not survive next to it.
  const rhImage = entries.find((e) => e.rh && e.key === 'property:og:image');
  const staticImage = entries.find((e) => !e.rh && e.key === 'property:og:image');
  if (rhImage && staticImage && rhImage.attrs.content !== staticImage.attrs.content) {
    for (const entry of entries) {
      if (!entry.rh && entry.key.startsWith('property:og:image:')) drop.add(entry);
    }
  }

  // Several <title> elements and none from helmet: keep the first, which is the one
  // document.title writes to.
  const titles = entries.filter((e) => e.kind === 'title');
  if (titles.length > 1 && !titles.some((t) => t.rh)) {
    titles.slice(1).forEach((t) => drop.add(t));
  }

  if (drop.size === 0) return { html, removed: [] };

  // Cut back to front so earlier offsets stay valid. Also take the tag's own
  // indentation and line break, so no blank lines are left behind.
  const ordered = [...drop].sort((a, b) => b.from - a.from);
  let out = headHtml;
  for (const entry of ordered) {
    let from = entry.from;
    let to = entry.to;
    const before = out.slice(0, from);
    const indent = /(^|\n)[ \t]*$/.exec(before);
    if (indent) from = before.length - (indent[0].length - indent[1].length);
    const after = /^\r?\n/.exec(out.slice(to));
    if (after && indent) to += after[0].length;
    out = out.slice(0, from) + out.slice(to);
  }

  return {
    html: html.slice(0, range.start) + out + html.slice(range.end),
    removed: ordered.reverse().map((e) => e.key),
  };
}

/** Tags that must each appear exactly once in a finished page. */
const MUST_BE_SINGLE = [
  ['og:image', 'meta', 'property:og:image'],
  ['twitter:image', 'meta', 'name:twitter:image'],
  ['description', 'meta', 'name:description'],
  ['title', 'title', 'title'],
];

/**
 * Count the single-instance tags in the page's head. `problems` is empty when
 * every one of them appears exactly once (so never zero, never two).
 */
export function auditHead(html) {
  const range = headRange(html);
  const entries = range ? collectEntries(html.slice(range.start, range.end)) : [];
  const counts = {};
  const problems = [];
  for (const [label, kind, key] of MUST_BE_SINGLE) {
    counts[label] = entries.filter((e) => e.kind === kind && e.key === key).length;
    if (counts[label] !== 1) problems.push(`${label} x${counts[label]}`);
  }
  const canonical = entries.filter((e) => e.kind === 'link' && e.key === 'canonical').length;
  counts.canonical = canonical;
  if (canonical > 1) problems.push(`canonical x${canonical}`);
  return { counts, problems };
}
