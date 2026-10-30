// Oracle for chore/retire-aug14-event (headless layout + DOM proxy, NOT real Chrome).
// Usage: node .reports/chore-retire-aug14-event-verify.mjs <baseUrl>   (a served build of dist/)
// Exit 0 + final line "RESULT: PASS ..." only if every route and viewport passes.
import { readFileSync } from "node:fs";
import puppeteer from "puppeteer";

const base = (process.argv[2] ?? "http://localhost:4391").replace(/\/$/, "");

// Routes are derived from App.tsx (real pages only: no redirects, no catch-all).
const appSrc = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const routes = [...appSrc.matchAll(/<Route path="([^"*]+)" element=\{<(?!Navigate)/g)].map(
  (m) => m[1]
);
// Guard the guard: a derivation that silently under-matches must fail loudly.
if (routes.length < 15 || !routes.includes("/") || !routes.includes("/courses")) {
  console.error(`route derivation broken: ${JSON.stringify(routes)}`);
  process.exit(2);
}

// A kept-content guard derived from source (no hardcoded quote): the first course testimonial.
const testimonialSrc = readFileSync(new URL("../src/components/CourseTestimonials.tsx", import.meta.url), "utf8");
const firstQuote = testimonialSrc.match(/quote:\s*"([^"]{40,})"/)?.[1]?.slice(0, 40);
if (!firstQuote) {
  console.error("could not derive a testimonial quote from CourseTestimonials.tsx");
  process.exit(2);
}

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];
const STALE = [/Aug 14/i, /5xyia8en/, /Register Now/, /Dismiss banner/, /2026-08-14/];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
});

let failures = 0;
const fail = (label, msg) => {
  failures += 1;
  console.log(`FAIL ${label}: ${msg}`);
};

try {
  for (const vp of VIEWPORTS) {
    for (const route of routes) {
      const label = `${vp.name} ${route}`;
      const before = failures;
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });
      try {
        // Trailing-slash form so the server returns the prerendered <route>/index.html. Without it,
        // `vite preview` resolves /ai-assessment to the meta-refresh stub dist/ai-assessment.html.
        await page.goto(base + (route === "/" ? "/" : `${route}/`), { waitUntil: "load", timeout: 30000 });
        await page.waitForSelector("main > *", { timeout: 15000 });
        await new Promise((r) => setTimeout(r, 1200));

        const measure = () =>
          page.evaluate(() => {
            const root = document.documentElement;
            const nav = document.querySelector("nav.fixed.top-0");
            const main = document.querySelector("main");
            const navBottom = nav ? nav.getBoundingClientRect().bottom : null;
            // Any other wide fixed bar sitting just under the nav (a banner).
            const stray = [...document.querySelectorAll("body *")]
              .filter((el) => {
                if (el === nav || nav?.contains(el)) return false;
                if (el.closest('nav[aria-label="On this page"]')) return false;
                const cs = getComputedStyle(el);
                if (cs.position !== "fixed" || Number(cs.opacity) < 0.05) return false;
                const r = el.getBoundingClientRect();
                return (
                  navBottom !== null &&
                  r.top >= navBottom - 1 &&
                  r.top < navBottom + 60 &&
                  r.width > 300 &&
                  r.height < 100 &&
                  r.height > 10
                );
              })
              .map((el) => (el.textContent || "").trim().slice(0, 60));
            return {
              chromeH: getComputedStyle(root).getPropertyValue("--chrome-h").trim(),
              mainPad: getComputedStyle(main).paddingTop,
              navBottom,
              firstChildTop: main.firstElementChild?.getBoundingClientRect().top ?? null,
              stray,
              html: root.outerHTML,
              lumaIframe: !!document.querySelector('iframe[src*="luma."]'),
              lumaLinks: [...document.querySelectorAll('a[href*="luma."]')].map((a) => a.href),
              eventLd: [...document.querySelectorAll('script[type="application/ld+json"]')].filter(
                (s) => /"@type":"Event"/.test(s.textContent || "")
              ).length,
              courseLd: [...document.querySelectorAll('script[type="application/ld+json"]')].filter(
                (s) => /"@type":"Course"/.test(s.textContent || "")
              ).length,
              h1: document.querySelector("h1")?.textContent || "",
              bodyText: document.body.innerText,
              askLink: [...document.querySelectorAll("a")]
                .filter((a) => /ask about the next date/i.test(a.textContent || ""))
                .filter((a) => a.getBoundingClientRect().width > 0) // rendered, not display:none
                .map((a) => a.getAttribute("href")),
            };
          });

        const top = await measure();
        await page.evaluate(() => window.scrollTo(0, 600));
        await new Promise((r) => setTimeout(r, 700));
        const scrolled = await measure();

        for (const re of STALE) if (re.test(top.html)) fail(label, `DOM contains ${re}`);
        if (top.navBottom !== 80) fail(label, `nav bottom ${top.navBottom} != 80`);
        for (const [state, m] of [["top", top], ["scrolled", scrolled]]) {
          if (m.chromeH !== "80px") fail(label, `--chrome-h=${m.chromeH} at ${state}, want 80px`);
          if (m.mainPad !== "80px") fail(label, `main padding-top=${m.mainPad} at ${state}, want 80px`);
          if (m.stray.length) fail(label, `stray fixed bar under nav at ${state}: ${JSON.stringify(m.stray)}`);
        }
        if (top.firstChildTop === null || Math.abs(top.firstChildTop - top.navBottom) > 1)
          fail(label, `first content top ${top.firstChildTop} != nav bottom ${top.navBottom}`);
        if (top.lumaLinks.length) fail(label, `luma links: ${top.lumaLinks.join(",")}`);
        if (top.lumaIframe) fail(label, "page still embeds the Luma calendar iframe");
        if (top.eventLd) fail(label, "Event JSON-LD still present");
        if (route === "/courses") {
          if (top.askLink.length === 0) fail(label, 'no "Ask about the next date" CTA');
          if (top.courseLd < 1) fail(label, "Course JSON-LD missing (must be kept)");
          if (!/ship an app/i.test(top.h1)) fail(label, `h1 is "${top.h1}"`);
          if (!top.bodyText.includes(firstQuote)) fail(label, "course testimonial no longer rendered");
          for (const href of top.askLink)
            if (href !== "/contact") fail(label, `ask-CTA href=${href}, want /contact`);
        }
        if (failures === before) console.log(`ok   ${label}`);
      } catch (err) {
        fail(label, `error: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}

console.log(
  failures === 0
    ? `RESULT: PASS (${routes.length} routes x ${VIEWPORTS.length} viewports)`
    : `RESULT: FAIL (${failures} failures over ${routes.length} routes x ${VIEWPORTS.length} viewports)`
);
process.exit(failures === 0 ? 0 : 1);
