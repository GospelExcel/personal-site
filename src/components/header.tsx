import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-foreground">
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
