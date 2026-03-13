"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if intro-done class is already on html (intro already finished)
    if (document.documentElement.classList.contains("intro-done")) {
      setVisible(true);
      return;
    }

    // Otherwise wait for the intro to settle
    function onSettled() {
      setVisible(true);
    }

    window.addEventListener("intro-settled", onSettled);
    return () => window.removeEventListener("intro-settled", onSettled);
  }, []);

  return (
    <header
      className="sticky top-0 z-[70] border-b border-border bg-background/80 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-end px-6 py-4">
        <nav className="flex items-center gap-4 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            home
          </Link>
          <span className="cursor-default text-border" title="Coming soon">blog</span>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
