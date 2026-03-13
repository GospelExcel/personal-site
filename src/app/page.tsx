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
      <main className="mx-auto max-w-2xl space-y-16 px-6 py-12 md:py-20">
        <About />
        <Projects />
        <Experience />
        <FunStuff />
        <Connect />
      </main>
    </div>
  );
}
