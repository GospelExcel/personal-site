import { siteConfig } from "@/lib/data";

export function About() {
  return (
    <section>
      <p className="text-base leading-relaxed text-foreground">
        Hey, I&apos;m {siteConfig.name}. I&apos;m a software engineer based in{" "}
        {siteConfig.location} — recent CS grad from Stony Brook University. I
        like building full-stack applications and figuring out how to make
        complex things feel simple.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Previously interned at Dell, where I built Terraform tooling for cloud
        infrastructure automation. Right now I&apos;m looking for my next
        software engineering role — somewhere I can{" "}
        <em className="italic text-foreground">grow, build, and ship</em>.
      </p>
    </section>
  );
}
