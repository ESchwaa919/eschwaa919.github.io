import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import {
  FIELD_NOTE_CARD_HEIGHT,
  FIELD_NOTE_CARD_WIDTH,
  formatFieldNoteDate,
  liveFieldNotes,
} from "@/constants/fieldNotes";

const FieldNotes = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Field notes: how we build with AI agents"
        description="Field notes on how The AI Expert takes work from idea to production with AI agents, one stage at a time, with a card for each to share with your team."
        canonicalUrl="/field-notes"
      />

      <section className="container mx-auto px-4 mb-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="kicker text-primary inline-block">Field notes</span>
          <h1 className="title-scene">
            <span className="text-primary">How we build</span>
            <span className="block text-foreground">with AI agents</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            The full text of each post in the series, with its card to download
            and share with your team.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {liveFieldNotes.length === 0 ? (
            <p className="text-center text-lg text-muted-foreground">
              The first field note goes up with the first post.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveFieldNotes.map((note) => (
                <li key={note.slug}>
                  <Card className="card-enhanced group h-full overflow-hidden">
                    <CardContent className="p-0 h-full">
                      <Link
                        to={`/field-notes/${note.slug}`}
                        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                      >
                        <img
                          src={note.card}
                          alt={note.alt}
                          width={FIELD_NOTE_CARD_WIDTH}
                          height={FIELD_NOTE_CARD_HEIGHT}
                          loading="lazy"
                          className="w-full h-auto border-b border-border/40"
                        />
                        <div className="flex flex-col flex-1 gap-2 p-5">
                          <time
                            dateTime={note.postedAt}
                            className="text-xs font-heading tracking-wider uppercase text-muted-foreground"
                          >
                            {formatFieldNoteDate(note.postedAt)}
                          </time>
                          <h2 className="text-lg font-heading text-foreground group-hover:text-primary transition-colors">
                            {note.title}
                          </h2>
                          <span className="mt-auto inline-flex items-center gap-1 text-sm text-primary">
                            Read the note
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default FieldNotes;
