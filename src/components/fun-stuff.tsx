import { FadeIn } from "./fade-in";

export function FunStuff() {
  return (
    <FadeIn>
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Fun Stuff</h2>
        <div className="rounded-lg border border-dashed border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">
            This section is a work in progress — music, photos, hobbies, and more
            coming soon.
          </p>
        </div>
      </section>
    </FadeIn>
  );
}
