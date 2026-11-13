/**
 * Reads field-note data for the Node build scripts from the ONE source of
 * truth, src/constants/fieldNotes.ts, without a TypeScript toolchain.
 *
 * The TS file keeps its data array as strict JSON between two marker comments
 * (FIELD_NOTES_DATA_START / FIELD_NOTES_DATA_END). This module slices that
 * block out and JSON.parses it. If the markers are missing or the block is not
 * valid JSON, it throws, so the build fails loudly instead of silently
 * publishing (or hiding) the wrong notes.
 */

import { readFileSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(__dirname, '..', 'src', 'constants', 'fieldNotes.ts');
const START = '// FIELD_NOTES_DATA_START';
const END = '// FIELD_NOTES_DATA_END';

export function readAllFieldNotes() {
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
    if (typeof note.live !== 'boolean') {
      throw new Error(`fieldNotesData: note ${note.slug} has a non-boolean "live"`);
    }
  }
  return notes;
}

/** Live notes only, oldest first (same rule as liveFieldNotes in the TS file). */
export function readLiveFieldNotes() {
  return readAllFieldNotes()
    .filter((note) => note.live === true)
    .sort((a, b) => a.postedAt.localeCompare(b.postedAt));
}

/**
 * Vite copies everything in public/ into dist/, including the card PNGs of
 * notes that are not live yet. Delete those copies from dist/ so a card is
 * never reachable before its post has gone out. public/ is left untouched.
 * Returns the dist-relative paths it removed.
 */
export function pruneNonLiveCards(distDir) {
  const removed = [];
  for (const note of readAllFieldNotes()) {
    if (note.live === true) continue;
    if (typeof note.card !== 'string' || !/^\/field-notes\/cards\/[a-z0-9-]+\.png$/.test(note.card)) {
      throw new Error(`fieldNotesData: note ${note.slug} has an unexpected card path ${JSON.stringify(note.card)}`);
    }
    const target = join(distDir, note.card);
    if (existsSync(target)) {
      rmSync(target);
      removed.push(note.card);
    }
  }
  return removed;
}

/** Route paths for the field-notes index and every LIVE note. */
export function fieldNoteRoutes() {
  return ['/field-notes', ...readLiveFieldNotes().map((note) => `/field-notes/${note.slug}`)];
}
