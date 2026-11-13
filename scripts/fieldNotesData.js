/**
 * Reads field-note data for the Node build scripts from the ONE source of
 * truth, src/constants/fieldNotes.ts, without a TypeScript toolchain.
 *
 * The TS file keeps its data array as strict JSON between two marker comments
 * (FIELD_NOTES_DATA_START / FIELD_NOTES_DATA_END). This module slices that
 * block out and JSON.parses it. If the markers are missing or the block is not
 * valid JSON, it throws, so the build fails loudly instead of silently
 * publishing (or hiding) the wrong notes.
 *
 * There is no "live" flag. The repo is public, so a note is only ever added to
 * the array once its post has gone out: every note in the array is published.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'src', 'constants', 'fieldNotes.ts');
const START = '// FIELD_NOTES_DATA_START';
const END = '// FIELD_NOTES_DATA_END';

// 2026-11-16 or 2026-11-16T08:30:00Z (seconds, fraction and offset optional).
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/;
const CARD_PATH = /^\/field-notes\/cards\/[a-z0-9-]+\.png$/;

/** Every note in the data block, validated, oldest first by postedAt. */
export function readFieldNotes() {
  const source = readFileSync(SOURCE, 'utf-8');
  const start = source.indexOf(START);
  const end = source.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`fieldNotesData: markers ${START} / ${END} not found in ${SOURCE}`);
  }
  const block = source.slice(start + START.length, end);
  let notes;
  try {
    notes = JSON.parse(block);
  } catch (err) {
    throw new Error(`fieldNotesData: data block in ${SOURCE} is not valid JSON: ${err.message}`);
  }
  if (!Array.isArray(notes)) {
    throw new Error('fieldNotesData: data block is not an array');
  }
  for (const note of notes) {
    if (typeof note.slug !== 'string' || !/^[a-z0-9-]+$/.test(note.slug)) {
      throw new Error(`fieldNotesData: bad slug ${JSON.stringify(note.slug)}`);
    }
    if (
      typeof note.postedAt !== 'string' ||
      !ISO_DATE.test(note.postedAt) ||
      Number.isNaN(Date.parse(note.postedAt))
    ) {
      throw new Error(
        `fieldNotesData: note ${note.slug} has a bad postedAt ${JSON.stringify(note.postedAt)} (expected an ISO date)`,
      );
    }
    // A note is published by adding its entry and its card in one commit.
    // An entry without its card would publish a broken image, so fail the build.
    if (typeof note.card !== 'string' || !CARD_PATH.test(note.card)) {
      throw new Error(`fieldNotesData: note ${note.slug} has an unexpected card path ${JSON.stringify(note.card)}`);
    }
    if (!existsSync(join(ROOT, 'public', note.card))) {
      throw new Error(`fieldNotesData: note ${note.slug} has no card file at public${note.card}`);
    }
  }
  return notes.sort((a, b) => a.postedAt.localeCompare(b.postedAt));
}

/** Route paths for the field-notes index and every note. */
export function fieldNoteRoutes() {
  return ['/field-notes', ...readFieldNotes().map((note) => `/field-notes/${note.slug}`)];
}
