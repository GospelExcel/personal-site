"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export function Intro() {
  const [phase, setPhase] = useState<"pending" | "playing" | "move" | "done">(
    "pending"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) {
      setPhase("done");
      return;
    }
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing" || !containerRef.current) return;

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

    // After timeline completes, hold then move to header
    tl.finished.then(() => {
      setTimeout(() => startMove(), 500);
    });

    return () => tl.pause();
  }, [phase]);

  function startMove() {
    const introName = nameRef.current;
    const headerName = document.getElementById("header-name");
    const overlay = overlayRef.current;
    if (!introName || !headerName || !overlay) {
      finish();
      return;
    }

    // FLIP: measure positions
    const first = introName.getBoundingClientRect();
    const last = headerName.getBoundingClientRect();

    const dx = last.left - first.left;
    const dy = last.top - first.top;
    const scale = last.height / first.height;

    // Hide lines before the move
    const lines = containerRef.current?.querySelectorAll(".line");
    lines?.forEach((line) => {
      anime({
        targets: line,
        opacity: 0,
        duration: 300,
        easing: "easeOutQuint",
      });
    });

    setPhase("move");

    // Animate text to header position using anime.js
    // Overlay stays fully opaque during this — user only sees text moving on solid bg
    anime({
      targets: introName,
      translateX: dx,
      translateY: dy,
      scale: scale,
      duration: 800,
      easing: "easeInOutQuint",
      complete: () => {
        // Text has arrived — tell the header to show itself (behind the overlay)
        window.dispatchEvent(new CustomEvent("intro-settled"));

        // Now fade the overlay away like a curtain lifting
        anime({
          targets: overlay,
          opacity: [1, 0],
          duration: 600,
          easing: "easeOutQuint",
          complete: () => finish(),
        });
      },
    });
  }

  function finish() {
    setPhase("done");
    sessionStorage.setItem("intro-played", "1");
  }

  if (phase === "done" || phase === "pending") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div ref={containerRef}>
        <h1 className="ml5">
          <span className="text-wrapper">
            <span className="line line1" />
            <span
              ref={nameRef}
              className="name-group"
              style={{ transformOrigin: "top left" }}
            >
              <span className="letters letters-left">Gospel</span>
              <span className="letters letters-right">Excel</span>
            </span>
            <span className="line line2" />
          </span>
        </h1>
      </div>
    </div>
  );
}
