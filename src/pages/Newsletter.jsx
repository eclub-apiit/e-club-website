import { Download, Calendar, ArrowUpRight } from "lucide-react";

import Container from "../components/ui/Container";
import Reveal, { RevealGroup, RevealItem } from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import GradientBlob from "../components/ui/GradientBlob";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import TextReveal from "../components/ui/TextReveal";
import SignatureMotif from "../components/ui/SignatureMotif";
import TiltCard from "../components/ui/TiltCard";
import { innovatorsDigest, entrepreneurialPulse } from "../data/newsletters";

const latest = innovatorsDigest[0];

export default function Newsletter() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero pb-24 pt-32 animate-gradient-shift sm:pb-32 sm:pt-40">
        <div className="absolute inset-0 bg-noise opacity-40" aria-hidden="true" />
        <GradientBlob tone="gold" size={440} className="-top-32 -left-24 animate-float-slow" />
        <GradientBlob tone="teal" size={380} className="-bottom-24 -right-16 animate-float-slower" />
        <SignatureMotif
          tone="light"
          className="pointer-events-none absolute -bottom-8 left-0 hidden h-auto w-[480px] max-w-none opacity-30 lg:block"
        />

        <Container className="relative grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal direction="up">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gold" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
                  APIIT E-Club Publications
                </span>
              </div>
            </Reveal>

            <TextReveal
              as="h1"
              text="Innovator's Digest"
              delay={0.08}
              className="mt-6 text-5xl font-bold leading-[1.05] text-white sm:text-6xl"
            />

            <Reveal direction="up" delay={0.14}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                A space for entrepreneurial journeys, lessons learned, and transformative experiences - a
                collection of ventures, stories, milestones, and discoveries from the APIIT E-Club community.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Badge tone="white">Latest Issue</Badge>
                <span className="text-sm font-medium text-white/60">
                  Volume {latest.volume} · {latest.date}
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button as="a" href={latest.file} download variant="primary" size="lg" icon={false}>
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button as="a" href={latest.file} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
                  Read Online
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={0.3} className="relative hidden lg:block">
            <TiltCard className="relative mx-auto h-[460px] w-full max-w-xs">
              <Card glass className="h-full overflow-hidden p-3">
                <a href={latest.file} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                  <img
                    src={latest.cover}
                    alt={`Cover of ${latest.title}, Volume ${latest.volume}`}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </a>
              </Card>
            </TiltCard>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The Magazine"
            title="Innovator's Digest"
            description="Our flagship publication - exclusive entrepreneur interviews, club chronicles, and student-crafted stories."
          />

          <RevealGroup className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3" stagger={0.1}>
            {innovatorsDigest.map((issue) => (
              <RevealItem key={issue.volume}>
                <Card className="group h-full overflow-hidden p-0">
                  <a href={issue.file} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={issue.cover}
                        alt={`Cover of ${issue.title}, Volume ${issue.volume}`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                      <Badge tone="gold" className="absolute left-4 top-4">
                        Volume {issue.volume}
                      </Badge>
                    </div>
                  </a>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-teal-dark">
                      <Calendar className="h-3.5 w-3.5" />
                      {issue.date}
                    </div>
                    <Button
                      as="a"
                      href={issue.file}
                      download
                      variant="outline"
                      size="md"
                      icon={false}
                      className="mt-4 w-full justify-center"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="2024 Archive"
            title="Entrepreneurial Pulse"
            description="Before Innovator's Digest, the club ran a monthly newsletter recapping every project, workshop, and event."
          />

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {entrepreneurialPulse.map((issue) => (
              <RevealItem key={issue.issue}>
                <Card className="group h-full overflow-hidden p-0">
                  <a href={issue.file} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={issue.cover}
                        alt={`Cover of Entrepreneurial Pulse Issue ${issue.issue}: ${issue.title}`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                      <Badge tone="teal" className="absolute left-4 top-4">
                        Issue {issue.issue}
                      </Badge>
                    </div>
                  </a>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-teal-dark">
                      <Calendar className="h-3.5 w-3.5" />
                      {issue.date}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-ink">{issue.title}</h3>
                    <a
                      href={issue.file}
                      download
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-dark transition-colors hover:text-dark-green"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download PDF
                    </a>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-hero py-24 animate-gradient-shift sm:py-32">
        <div className="absolute inset-0 bg-noise opacity-40" aria-hidden="true" />
        <GradientBlob tone="gold" size={420} className="-top-24 right-0" />
        <GradientBlob tone="teal" size={320} className="-bottom-16 left-0" />
        <Container className="relative text-center">
          <SectionHeading
            light
            align="center"
            eyebrow="Stay In The Loop"
            title="Never Miss an Issue"
            description="Follow us on Instagram for the announcement the moment a new issue drops."
          />

          <Reveal direction="up" delay={0.2} className="mt-8">
            <Button
              as="a"
              href="https://www.instagram.com/apiit_eclub/"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={false}
            >
              Follow @apiit_eclub
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
