import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import NotFound from "@/pages/NotFound";
import {
  FIELD_NOTE_CARD_HEIGHT,
  FIELD_NOTE_CARD_WIDTH,
  fieldNoteCardUrl,
  fieldNoteDescription,
  fieldNoteParagraphs,
  formatFieldNoteDate,
  liveFieldNotes,
} from "@/constants/fieldNotes";

const FieldNote = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = liveFieldNotes.findIndex((note) => note.slug === slug);

  // A note that is not live (or does not exist) renders the site's 404, so
  // nothing about it shows before its post has gone out.
  if (index === -1) {
    return <NotFound />;
  }

  const note = liveFieldNotes[index];
  const previous = index > 0 ? liveFieldNotes[index - 1] : undefined;
  const next = index < liveFieldNotes.length - 1 ? liveFieldNotes[index + 1] : undefined;
  const downloadName = note.card.split("/").pop() ?? `${note.slug}.png`;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title={note.title}
        description={fieldNoteDescription(note.text)}
        canonicalUrl={`/field-notes/${note.slug}`}
        ogImage={fieldNoteCardUrl(note)}
        ogImageWidth={FIELD_NOTE_CARD_WIDTH}
        ogImageHeight={FIELD_NOTE_CARD_HEIGHT}
        ogType="article"
      />

      <article className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/field-notes"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All field notes
          </Link>

          <header className="mb-10 space-y-3">
            <span className="kicker text-primary inline-block">Field notes</span>
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-foreground">
              {note.title}
            </h1>
            <time
              dateTime={note.postedAt}
              className="block text-sm font-heading tracking-wider uppercase text-muted-foreground"
            >
              {formatFieldNoteDate(note.postedAt)}
            </time>
          </header>

          <div className="space-y-5 text-lg leading-relaxed text-foreground/90" data-field-note-text>
            {fieldNoteParagraphs(note.text).map((lines, paragraphIndex) => (
              <p key={paragraphIndex}>
                {lines.map((line, lineIndex) => (
                  <Fragment key={lineIndex}>
                    {lineIndex > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>

        <figure className="max-w-[1080px] mx-auto mt-14">
          <img
            src={note.card}
            alt={note.alt}
            width={FIELD_NOTE_CARD_WIDTH}
            height={FIELD_NOTE_CARD_HEIGHT}
            className="w-full h-auto rounded-lg border border-border/40"
          />
          <figcaption className="mt-4 flex justify-center">
            <a
              href={note.card}
              download={downloadName}
              className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-heading tracking-wide text-primary hover:bg-primary/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download card (PNG)
            </a>
          </figcaption>
        </figure>

        {(previous || next) && (
          <nav
            aria-label="More field notes"
            className="max-w-3xl mx-auto mt-14 pt-8 border-t border-border/30 grid gap-4 sm:grid-cols-2"
          >
            <div>
              {previous && (
                <Link
                  to={`/field-notes/${previous.slug}`}
                  className="group block text-left"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-heading tracking-wider uppercase text-muted-foreground">
                    <ArrowLeft className="w-3 h-3" />
                    Previous
                  </span>
                  <span className="block text-foreground group-hover:text-primary transition-colors">
                    {previous.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="sm:text-right">
              {next && (
                <Link
                  to={`/field-notes/${next.slug}`}
                  className="group block"
                >
                  <span className="inline-flex items-center gap-1 text-xs font-heading tracking-wider uppercase text-muted-foreground">
                    Next
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="block text-foreground group-hover:text-primary transition-colors">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
    </div>
  );
};

export default FieldNote;
