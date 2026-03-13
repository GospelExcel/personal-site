import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { FadeIn } from "./fade-in";

export function Projects() {
  return (
    <section>
      <FadeIn>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Projects</h2>
      </FadeIn>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={i * 100}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
