"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "lines" | "text" | "hold" | "move" | "done";

export function Intro() {
  const [phase, setPhase] = useState<Phase | "skip">("skip");
  const [shouldRun, setShouldRun] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) {
      setPhase("done");
      return;
    }
    setShouldRun(true);
    setPhase("lines");
  }, []);

  // Phase timeline
  useEffect(() => {
    if (!shouldRun) return;

    const timers: NodeJS.Timeout[] = [];

    // lines animate in and spread (0-600ms)
    // text slides in (500-1000ms)
    timers.push(setTimeout(() => setPhase("text"), 500));
    // hold (1300ms)
    timers.push(setTimeout(() => setPhase("hold"), 1300));
    // move to header (1800ms)
    timers.push(setTimeout(() => startMove(), 1800));

    return () => timers.forEach(clearTimeout);
  }, [shouldRun]);

  function startMove() {
    const introName = nameRef.current;
    const headerName = document.getElementById("header-name");
    if (!introName || !headerName) {
      setPhase("done");
      sessionStorage.setItem("intro-played", "1");
      return;
    }

    // FLIP: measure positions
    const first = introName.getBoundingClientRect();
    const last = headerName.getBoundingClientRect();

    const dx = last.left - first.left;
    const dy = last.top - first.top;
    const scaleX = last.width / first.width;
    const scaleY = last.height / first.height;

    // Apply the move transform
    introName.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
    introName.style.transformOrigin = "top left";
    introName.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

    setPhase("move");

    // Fade overlay, reveal header
    setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-played", "1");
    }, 700);
  }

  if (phase === "done") return null;
  if (phase === "skip" && !shouldRun) return null;

  const showLines = phase === "lines" || phase === "text";
  const showText = phase !== "lines";

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "move" ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: phase === "move" ? "none" : undefined }}
    >
      <div className="relative flex flex-col items-center">
        {/* Top line */}
        <div
          className={`h-px w-48 bg-accent ${showLines ? "" : "opacity-0"}`}
          style={{
            animation: shouldRun
              ? "line-scale-in 0.3s ease-out both, line-spread-up 0.3s ease-out 0.3s both, line-fade-out 0.3s ease-out 1.0s both"
              : undefined,
          }}
        />

        {/* Name */}
        <div ref={nameRef} className="my-4 flex items-baseline gap-3">
          <span
            className={`text-3xl font-semibold text-foreground sm:text-4xl ${
              showText ? "" : "opacity-0"
            }`}
            style={{
              animation:
                shouldRun && showText
                  ? "slide-in-left 0.4s ease-out both"
                  : undefined,
            }}
          >
            Gospel
          </span>
          <span
            className={`text-3xl font-semibold text-foreground sm:text-4xl ${
              showText ? "" : "opacity-0"
            }`}
            style={{
              animation:
                shouldRun && showText
                  ? "slide-in-right 0.4s ease-out 0.1s both"
                  : undefined,
            }}
          >
            Excel
          </span>
        </div>

        {/* Bottom line */}
        <div
          className={`h-px w-48 bg-accent ${showLines ? "" : "opacity-0"}`}
          style={{
            animation: shouldRun
              ? "line-scale-in 0.3s ease-out both, line-spread-down 0.3s ease-out 0.3s both, line-fade-out 0.3s ease-out 1.0s both"
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
