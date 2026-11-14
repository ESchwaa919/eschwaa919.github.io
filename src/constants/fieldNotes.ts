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
[]
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
