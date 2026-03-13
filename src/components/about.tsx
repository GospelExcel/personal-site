import { FadeIn } from "./fade-in";

export function About() {
  return (
    <section>
      <FadeIn>
        <p className="text-base leading-relaxed text-foreground">
          Software Engineer based in NYC. I love creating in every shape and
          form, from the terminal to the stage. I&apos;m a problem solver and
          builder, currently working on constructing things to remind myself and
          others that there is life outside of the screens we stare at.
        </p>
      </FadeIn>
      <FadeIn delay={150}>
        <p className="mt-4 text-base leading-relaxed text-muted">
          New friends to make. New experiences to be had.{" "}
          <em className="italic text-foreground">Let&apos;s build.</em>
        </p>
      </FadeIn>
    </section>
  );
}
