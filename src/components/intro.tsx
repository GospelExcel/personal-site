"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

// Module-level flag: resets on refresh, persists across SPA navigation
let introPlayed = false;

export function Intro() {
  const [phase, setPhase] = useState<"pending" | "playing" | "done">("pending");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introPlayed) {
      document.documentElement.classList.add("intro-done");
      setPhase("done");
      return;
    }
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const tl = anime.timeline({ loop: false });

    // 1. Lines scale in
    tl.add({
      targets: ".ml5 .line",
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700,
    });

    // 2. Lines spread apart
    tl.add({
      targets: ".ml5 .line",
      duration: 600,
      easing: "easeOutExpo",
      translateY: (_el: Element, i: number) =>
        -0.625 + 0.625 * 2 * i + "em",
    });

    // 3. Left text slides in (overlaps with line spread)
    tl.add(
      {
        targets: ".ml5 .letters-left",
        opacity: [0, 1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
      },
      "-=300"
    );

    // 4. Right text slides in (overlaps fully with left)
    tl.add(
      {
        targets: ".ml5 .letters-right",
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
      },
      "-=600"
    );

    // After timeline completes, hold then fade overlay + lines
    tl.finished.then(() => {
      setTimeout(() => revealSite(), 500);
    });

    return () => tl.pause();
  }, [phase]);

  function revealSite() {
    const overlay = overlayRef.current;
    if (!overlay) {
      finish();
      return;
    }

    // Tell the header to show itself
    window.dispatchEvent(new CustomEvent("intro-settled"));

    // Fade overlay away, revealing the site underneath
    anime({
      targets: overlay,
      opacity: [1, 0],
      duration: 600,
      easing: "easeOutQuint",
      complete: () => finish(),
    });
  }

  function finish() {
    introPlayed = true;
    document.documentElement.classList.add("intro-done");
    setPhase("done");
  }

  if (phase === "done" || phase === "pending") return null;

  // Overlay is just a solid background — the hero text lives in the page layout
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-background pointer-events-none"
    />
  );
}
