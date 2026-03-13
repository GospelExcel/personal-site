"use client";

import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { socialLinks } from "@/lib/data";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  InstagramIcon,
  XIcon,
} from "./icons";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  instagram: InstagramIcon,
  x: XIcon,
} as const;

export function ContactPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = popupRef.current;
    if (!el) return;

    if (open) {
      el.style.display = "block";
      anime({
        targets: el,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 250,
        easing: "easeOutCubic",
      });
    } else {
      anime({
        targets: el,
        scale: [1, 0.95],
        opacity: [1, 0],
        duration: 200,
        easing: "easeInCubic",
        complete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    // Delay listener so the opening click doesn't immediately close it
    const timer = setTimeout(
      () => document.addEventListener("click", handleClick),
      10
    );
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [open, onClose]);

  return (
    <div
      ref={popupRef}
      style={{ display: "none", opacity: 0 }}
      className="absolute left-0 top-full z-[999] mt-2 w-56 origin-top-left rounded-xl border border-border bg-surface p-2 shadow-lg"
    >
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.icon === "mail" ? undefined : "_blank"}
            rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-accent-muted hover:text-accent"
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
