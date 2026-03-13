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
          <div className="pointer-events-none absolute -right-32 top-0 hidden opacity-20 lg:block">
            <Image
              src="/mascot.png"
              alt=""
              width={200}
              height={200}
              className="select-none"
            />
          </div>
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
