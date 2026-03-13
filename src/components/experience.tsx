import { experience } from "@/lib/data";
import { FadeIn } from "./fade-in";

export function Experience() {
  return (
    <section>
      <FadeIn>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Experience</h2>
      </FadeIn>
      <div className="space-y-6">
        {experience.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 100}>
            <div className="relative pl-4 border-l-2 border-border">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{exp.company}</h3>
                  <p className="text-sm text-muted">{exp.role}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                  <p className="font-mono text-xs text-muted">{exp.location}</p>
                </div>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm leading-relaxed text-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
