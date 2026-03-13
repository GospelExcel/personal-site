import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Projects</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
