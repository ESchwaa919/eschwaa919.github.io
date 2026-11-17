// Add a note here only after its post has gone out. Adding the entry and its card under public/field-notes/cards/ is what publishes it.
//
// Field notes: the "how we build" series. This file is the ONE source of truth
// for field-note data, used by the React pages AND by the Node build scripts
// (scripts/fieldNotesData.js), which JSON-parse the array between the
// FIELD_NOTES_DATA markers below.
//
// Rules for editing:
// - This repo is public, so there is no "draft" or "live: false" state. A note
//   that is not in this array does not exist: no route, no static page, no
//   sitemap entry, no link, no card. Do not commit a note ahead of its post.
// - To publish a note, add one entry here AND its card PNG under
//   public/field-notes/cards/, in the same commit. Each entry has: slug, stage,
//   title, postedAt (ISO date), text, alt, card.
// - Keep the block between the markers strict JSON (double-quoted keys and
//   strings, no trailing commas, no comments), or the build scripts will fail.
// - `text` is the exact approved post text. Paragraphs are separated by a blank
//   line ("\n\n"); single "\n" line breaks inside a paragraph are kept.

export type FieldNoteStage = "spec" | "code" | "review" | "verification" | "deploy";

export interface FieldNote {
  slug: string;
  stage: FieldNoteStage;
  title: string;
  postedAt: string;
  text: string;
  alt: string;
  card: string;
}

export const FIELD_NOTES_SITE_URL = "https://theaiexpert.ai";
export const FIELD_NOTE_CARD_WIDTH = 1080;
export const FIELD_NOTE_CARD_HEIGHT = 1350;

export const fieldNotes: FieldNote[] =
// FIELD_NOTES_DATA_START
[
  {
    "slug": "the-spec",
    "stage": "spec",
    "title": "Day 1 of 5: the spec",
    "postedAt": "2026-11-16",
    "text": "Day 1 of 5. The spec.\n\nThis week I'm walking through how we take a piece of work from idea to production with AI agents, one stage a day, the way we actually run it. Today is everything that happens before anyone writes code, human or agent.\n\nWe start by checking whether the thing already exists, whether we started it once and stopped, and how far it got. Agents will very happily rebuild something you already have, and do a nice job of it.\n\nThen a short brief, and two lists before any code. Roughly this shape:\n\nFor: (the user, by role)\nJob, in their words:\nWe'll know it worked when:\nNot doing:\nMust pass:\nMust refuse:\n\nIf we can't fill in \"must refuse\", we don't understand the work yet.\n\nLast week a brief asked a builder to add a lock so two requests couldn't overwrite the same record. The builder measured before writing anything. In real use the clash couldn't happen. The failures came from the test's own fake data colliding with itself, so we shipped a test that keeps it that way and no lock.\n\nA model is very good at filling a gap with a confident guess. Most of the spec is us closing the gaps before it gets the chance.\n\nTomorrow, the code, and why the agent that plans the work never writes it.\n\nWhen your team writes acceptance criteria, do you write down what the feature must refuse, or only what it must do?",
    "alt": "Before any code, fill this in. For: The user, by role. Never a name. Job, in their words: Quote them. Don't translate it into spec-speak. We'll know it worked when: Something you could watch happen. Not doing: Write down what's out of scope too. Must pass: The cases the feature has to handle. Must refuse: Can't fill this one in? You don't understand the work yet. A brief asked for a lock. The builder measured first and found the clash could never happen in real use, so we shipped a test instead.",
    "card": "/field-notes/cards/the-spec.png"
  },
  {
    "slug": "the-code",
    "stage": "code",
    "title": "Day 2 of 5: the code",
    "postedAt": "2026-11-17",
    "text": "Day 2 of 5. The code.\n\nThe agent that plans the work never writes the code. Of all the rules we've added this year, that one changed more for us than any model upgrade.\n\nRune, our lead agent, writes the spec, the plan and the checks. The build goes to separate builder agents, and each builder gets its own git worktree. No two builders ever write to the same checkout. We learned that one the hard way.\n\nThe other rules came the same way. If a new idea turns up halfway through a build, it goes to a new builder and the running one is left alone to finish. A bug fix starts with a test that fails, and if we can't make it fail we haven't found the bug yet. The model is picked by how hard the job is, so small mechanical work goes to a cheap model and the top model only sees the hardest items, after the spec and plan have passed review. Urgency doesn't come into it. And a builder's progress lives in files, so any session can die and the next one picks up where it stopped.\n\nA builder isn't finished when it compiles. It loops with a reviewer until the checks pass, opens a PR, and then someone else judges it.\n\nTomorrow, review, and why the reviewer is never the model that wrote the code.\n\nIf you've got more than one agent writing code in the same repo, how are you keeping them off each other's changes?",
    "alt": "The planner never writes code. One builder, one git worktree: No two builders ever write to the same checkout. New idea mid-build? New builder.: The running one is left alone to finish. Bug fixes start with a failing test: If you can't make it fail, you haven't found the bug yet. Pick the model by difficulty: Cheap models for mechanical work. The top model only gets the hardest items, after the spec and plan pass review. Progress lives in files: Any session can die and the next one picks up where it stopped.",
    "card": "/field-notes/cards/the-code.png"
  }
]
// FIELD_NOTES_DATA_END
;

/** Every published note, oldest first. Every note in the file is published. */
export const liveFieldNotes: FieldNote[] = [...fieldNotes].sort((a, b) =>
  a.postedAt.localeCompare(b.postedAt),
);

export const getLiveFieldNote = (slug: string | undefined): FieldNote | undefined =>
  slug ? liveFieldNotes.find((note) => note.slug === slug) : undefined;

/** The note for an SDLC stage key, if any. */
export const getLiveFieldNoteForStage = (stage: FieldNoteStage): FieldNote | undefined =>
  liveFieldNotes.find((note) => note.stage === stage);

/** Paragraphs split on blank lines; each paragraph keeps its own line breaks. */
export const fieldNoteParagraphs = (text: string): string[][] =>
  text.split(/\n\s*\n/).map((paragraph) => paragraph.split("\n"));

/** "16 Nov 2026" (UK format), in UTC so the date never shifts with the reader's timezone. */
export const formatFieldNoteDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(iso))
    .replace("Sept", "Sep");

/**
 * Share-preview description: the first paragraph of at least `minLength`
 * characters (every note opens with a one-line "Day 1 of 5. The spec." that is
 * too short to describe it), at most `max` characters, cut at a word boundary.
 * If no paragraph is long enough, the first paragraph is used.
 */
export const fieldNoteDescription = (text: string, max = 160, minLength = 60): string => {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);
  const first = paragraphs.find((paragraph) => paragraph.length >= minLength) ?? paragraphs[0] ?? "";
  if (first.length <= max) return first;
  const cut = first.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:]+$/, "")}…`;
};

export const fieldNoteCardUrl = (note: FieldNote): string =>
  `${FIELD_NOTES_SITE_URL}${note.card}`;
