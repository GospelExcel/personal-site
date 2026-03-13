"use client";

import { socialLinks } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon, InstagramIcon, XIcon } from "./icons";
import { FadeIn } from "./fade-in";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  instagram: InstagramIcon,
  x: XIcon,
} as const;

export function Connect() {
  return (
    <section>
      <FadeIn>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Connect</h2>
      </FadeIn>
      <div className="flex items-center gap-4">
        {socialLinks.map((link, i) => {
          const Icon = iconMap[link.icon];
          return (
            <FadeIn key={link.label} delay={i * 80}>
              <a
                href={link.href}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="group/email relative flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {link.icon === "mail" && (
                  <span
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 cursor-text select-all whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted opacity-0 shadow-sm transition-all duration-300 after:absolute after:left-0 after:top-full after:h-3 after:w-full group-hover/email:-top-10 group-hover/email:opacity-100"
                  >
                    gexcel123@gmail.com
                  </span>
                )}
              </a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
