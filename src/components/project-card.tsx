import type { Project } from "@/lib/data";
import { ArrowUpRightIcon } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-sm"
      style={{ borderLeftWidth: 3, borderLeftColor: "var(--accent)" }}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-foreground">{project.title}</h3>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted">{project.date}</span>
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
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
            <span
              key={link.label}
              className="text-xs text-accent underline decoration-accent/30"
            >
              {link.label}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
