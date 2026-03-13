import { socialLinks } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
} as const;

export function Connect() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Connect</h2>
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
