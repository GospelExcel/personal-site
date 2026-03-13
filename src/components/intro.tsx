"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export function Intro() {
  const [phase, setPhase] = useState<"pending" | "playing" | "move" | "done">(
    "pending"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

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
    if (!introName || !headerName) {
      finish();
      return;
    }

    // FLIP: measure positions
    const first = introName.getBoundingClientRect();
    const last = headerName.getBoundingClientRect();

    const dx = last.left - first.left;
    const dy = last.top - first.top;
    const scaleX = last.width / first.width;
    const scaleY = last.height / first.height;

    // Hide lines before the move
    const lines = containerRef.current?.querySelectorAll(".line");
    lines?.forEach((line) => {
      (line as HTMLElement).style.opacity = "0";
    });

    // Animate text to header position
    introName.style.transition =
      "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
    introName.style.transformOrigin = "top left";
    introName.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

    setPhase("move");

    setTimeout(() => finish(), 700);
  }

  function finish() {
    setPhase("done");
    sessionStorage.setItem("intro-played", "1");
  }

  if (phase === "done" || phase === "pending") return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "move" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="ml5">
        <span className="text-wrapper">
          <span className="line line1" />
          <span ref={nameRef} className="name-group">
            <span className="letters letters-left">Gospel</span>
            <span className="letters letters-right">Excel</span>
          </span>
          <span className="line line2" />
        </span>
      </h1>
    </div>
  );
}
