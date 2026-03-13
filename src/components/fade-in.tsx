"use client";

import { useRef, useEffect, useState } from "react";

// Global stagger state for initial page load
let firstIntersectionTime: number | null = null;
let globalIndex = 0;
const STAGGER_MS = 80;
const INITIAL_LOAD_WINDOW = 100; // ms

// Wait for intro overlay to finish before observing
let introReady = false;
const introReadyCallbacks: (() => void)[] = [];

function onIntroReady(cb: () => void) {
  if (introReady) {
    cb();
  } else {
    introReadyCallbacks.push(cb);
  }
}

if (typeof window !== "undefined") {
  window.addEventListener(
    "intro-settled",
    () => {
      introReady = true;
      introReadyCallbacks.forEach((cb) => cb());
      introReadyCallbacks.length = 0;
    },
    { once: true }
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;

    function startObserving() {
      if (!el) return;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer!.unobserve(el!);

            const now = performance.now();
            if (firstIntersectionTime === null) {
              firstIntersectionTime = now;
            }

            const isInitialLoad =
              now - firstIntersectionTime < INITIAL_LOAD_WINDOW;

            if (isInitialLoad) {
              const staggerDelay = globalIndex++ * STAGGER_MS;
              timer = setTimeout(() => setVisible(true), staggerDelay);
            } else {
              if (delay > 0) {
                timer = setTimeout(() => setVisible(true), delay);
              } else {
                setVisible(true);
              }
            }
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
    }

    onIntroReady(startObserving);

    return () => {
      observer?.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-blur-in" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
