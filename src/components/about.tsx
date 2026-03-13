"use client";

import { useState, useRef } from "react";
import { FadeIn } from "./fade-in";
import { ContactPopup } from "./contact-popup";

export function About() {
  const [popupOpen, setPopupOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <section className="relative z-10">
      <FadeIn>
        <p className="text-base leading-relaxed text-foreground">
          <span className="group relative"><span className="text-shimmer-bold">Software Engineer</span><span className="pointer-events-none absolute top-0 right-full mr-2 w-64 text-center text-wrap rounded-xl border border-border bg-surface px-3 py-2 text-sm font-normal text-muted opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:mr-3">aka Cyber Wizard, Bug Squasher,<br />or &ldquo;in need of a chiropractor&rdquo;</span></span> based in NYC. I love creating in every shape and
          form, from the terminal to the stage. I&apos;m a problem solver and
          builder, currently working on constructing things to remind myself and
          others that there is life outside of the screens we stare at.
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <p className="mt-4 text-base leading-relaxed text-foreground">
          As a creative and engineer, I flow and adapt. As technology and trends
          shift, so do my workflows. I utilize growing tools in{" "}
          <span className="group relative"><span className="text-shimmer-bold">Artificial Intelligence</span><span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-sm font-normal text-muted opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:-top-9">aka... A.I.</span></span>{" "}
          such as{" "}
          <span className="group relative"><span className="text-shimmer-bold">Claude Code</span><span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-sm font-normal text-muted opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:-top-9">aka the LOML</span></span> as an
          instrument in my orchestra.
        </p>
      </FadeIn>
      <FadeIn delay={300}>
        <div className="mt-4 text-base leading-relaxed text-muted">
          New friends to make. New experiences to be had.{" "}
          <span
            className="relative z-[999] inline-block"
            onMouseEnter={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
              setPopupOpen(true);
            }}
            onMouseLeave={() => {
              hoverTimeout.current = setTimeout(() => setPopupOpen(false), 200);
            }}
          >
            <span className="text-shimmer-bold cursor-pointer italic">
              Let&apos;s build.
            </span>
            <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
