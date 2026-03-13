import Image from "next/image";
import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { FunStuff } from "@/components/fun-stuff";
import { Connect } from "@/components/connect";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Intro />
      <Header />
      <main className="relative mx-auto max-w-2xl px-6">
        <section className="relative z-[60] pt-16 pb-12 text-center">
          <h1 className="ml5">
            <span className="text-wrapper">
              <span className="line line1" />
              <span className="name-group">
                <span className="letters letters-left">Gospel</span>
                <span className="letters letters-right">Excel</span>
              </span>
              <span className="line line2" />
            </span>
          </h1>
        </section>
        <div className="relative space-y-16 pb-20">
          <div className="group absolute -right-44 top-0 hidden lg:block">
            <div className="relative">
              <Image
                src="/mascot.png"
                alt=""
                width={200}
                height={200}
                className="scale-75 rotate-12 opacity-20 transition-all duration-500 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100"
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:-top-10">
                I &lt;3 Smiskis!
              </span>
            </div>
          </div>
          <About />
          <Projects />
          <Experience />
          <div className="group absolute -left-56 top-[55%] hidden lg:block">
            <div className="relative">
              <Image
                src="/dell-badge.jpeg"
                alt="Dell Technologies intern badge"
                width={160}
                height={200}
                className="-rotate-6 scale-75 rounded-lg opacity-20 shadow-md transition-all duration-500 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 group-hover:shadow-lg"
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-48 text-center text-wrap rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:-top-16">
                From one of my coolest summers interning at Dell Technologies
              </span>
            </div>
          </div>
          <FunStuff />
          <Connect />
        </div>
      </main>
    </div>
  );
}
