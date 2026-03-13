import type { Project } from "@/lib/data";
import { ArrowUpRightIcon } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-sm"
      style={{ borderLeftWidth: 3, borderLeftColor: "var(--accent)" }}
    >
      <div className="flex items-start justify-between">
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground transition-colors hover:text-accent">{project.title}</a>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">{project.date}</span>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="text-muted transition-colors hover:text-accent"
          >
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="mt-3 flex gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent underline decoration-accent/30 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
