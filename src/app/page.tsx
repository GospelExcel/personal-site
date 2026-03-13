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
      <main className="mx-auto max-w-2xl px-6">
        <section className="relative z-[60] flex min-h-[70vh] items-center justify-center">
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
        <div className="space-y-16 pb-20">
          <About />
          <Projects />
          <Experience />
          <FunStuff />
          <Connect />
        </div>
      </main>
    </div>
  );
}
