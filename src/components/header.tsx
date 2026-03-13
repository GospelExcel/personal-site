"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If intro already played, show immediately
    if (sessionStorage.getItem("intro-played")) {
      setVisible(true);
      return;
    }

    // Otherwise wait for the intro to settle into position
    function onSettled() {
      setVisible(true);
    }

    window.addEventListener("intro-settled", onSettled);
    return () => window.removeEventListener("intro-settled", onSettled);
  }, []);

  return (
    <header
      className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link href="/" id="header-name" className="font-semibold text-foreground">
          Gospel Excel
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-foreground">
              home
            </Link>
            <span className="cursor-default text-border">blog</span>
            <span className="cursor-default text-border">photos</span>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
