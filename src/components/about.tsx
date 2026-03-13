import { FadeIn } from "./fade-in";

export function About() {
  return (
    <section>
      <FadeIn>
        <p className="text-base leading-relaxed text-foreground">
          <span className="text-shimmer">Software Engineer</span> based in NYC. I love creating in every shape and
          form, from the terminal to the stage. I&apos;m a problem solver and
          builder, currently working on constructing things to remind myself and
          others that there is life outside of the screens we stare at.
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <p className="mt-4 text-base leading-relaxed text-foreground">
          As a creative and engineer, I flow and adapt. As technology and trends
          shift, so do my workflows. I utilize growing tools in{" "}
          <span className="text-shimmer-bold">Artificial Intelligence</span>{" "}
          such as{" "}
          <span className="text-shimmer-bold">Claude Code</span> as an
          instrument in my orchestra.
        </p>
      </FadeIn>
      <FadeIn delay={300}>
        <p className="mt-4 text-base leading-relaxed text-muted">
          New friends to make. New experiences to be had.{" "}
          <em className="italic text-foreground">Let&apos;s build.</em>
        </p>
      </FadeIn>
    </section>
  );
}
