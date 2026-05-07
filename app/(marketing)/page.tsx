import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { FeatureSplit } from "@/components/landing/feature-split";
import { FeatureRow } from "@/components/landing/feature-row";
import { MetricsBar } from "@/components/ui/metrics-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  IMG_AP_SKILLS_FUND,
  IMG_FOUNDER_COHORT_GROUP,
  IMG_FOUNDER_RESIDENCY,
  IMG_GLOBAL_NETWORK,
  IMG_INCORPORATION,
  IMG_LOCAL_HIRING,
  IMG_WHY_AP,
} from "@/lib/images";
import { cohorts, metrics } from "@/lib/data";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <MetricsBar items={metrics.topbar} />

      <FeatureSplit
        id="residency"
        eyebrow="FOUNDER RESIDENCY"
        title="A digital residency built for builders."
        body="Apply once. Get a Founder Residency permit, a District ID, and the access keys to coworking, founder housing, district events, and the Government Liaison channel."
        image={IMG_FOUNDER_RESIDENCY}
        imageAlt="Modern coworking floor with founders working at desks"
        bullets={[
          "Tier I, Tier II, and Visiting Founder tracks",
          "Median approval: 9 days, fully digital",
          "Bundled with founder housing and coworking",
        ]}
        badge="ACTIVE · 127 FOUNDERS ONBOARDED"
      />

      <FeatureSplit
        eyebrow="STARTUP INCORPORATION"
        title="Incorporate in eleven days, not eleven months."
        body="The District Registry runs an end-to-end Pvt Ltd / LLP incorporation pipeline. Templates, signatures, and government filings are pre-wired."
        image={IMG_INCORPORATION}
        imageAlt="Founder paperwork and clean desk"
        reverse
        bullets={[
          "11-day median CIN issuance",
          "Pre-wired SAFE, term sheet, and cap table templates",
          "30% capex rebate · zero state GST · 36 months",
        ]}
        badge="42 STARTUPS REGISTERED"
      />

      <FeatureRow
        id="cohorts"
        eyebrow="EVENTS & COHORTS"
        title="The district runs on cohorts, not on conferences."
        body="Quarterly cohorts of 40–60 founders. Open office hours every Friday. Investor AMAs and policy reviews on rotation."
        items={[
          {
            label: "QUANTUM VALLEY · COHORT 03",
            title: "Opens 01 April 2026",
            body: "42 of 60 seats reserved. Founders from 9 countries, weighted to AI x Gov, FinTech, and ClimateTech.",
            metric: "18 DAYS UNTIL OPEN",
          },
          {
            label: "INVESTOR OFFICE HOURS",
            title: "Sequoia Surge AMA · Friday",
            body: "Open AMA with the Surge team on India-out incorporation, treasury, and Series A staging from Amaravati.",
            metric: "RSVP CLOSES THU",
          },
          {
            label: "DISTRICT FORUM",
            title: "14 events this quarter",
            body: "Hiring days, founder dinners, policy office hours, and investor AMAs run weekly through the district calendar.",
            metric: "RUNS WEEKLY",
          },
        ]}
      />

      <FeatureSplit
        eyebrow="AP SKILLS FUND"
        title="Hire from Andhra Pradesh, co-funded by the state."
        body="The AP Skills Fund co-finances engineering and design hires from AP universities. ₹6L per seat. Compliance-tracked through your Founder Console."
        image={IMG_AP_SKILLS_FUND}
        imageAlt="Students attending a training session in Amaravati"
        bullets={[
          "₹6L per engineering seat, co-funded",
          "Direct pipelines from AP universities",
          "Compliance auto-tracked in your Founder Console",
        ]}
        badge="318 AP JOBS COMMITTED"
      />

      <FeatureSplit
        eyebrow="LOCAL HIRING"
        title="Local hiring isn't a quota. It's the model."
        body="Every district resident commits a hiring ratio. We track it, verify it, and surface it on your founder profile. Founders that miss go on review."
        image={IMG_LOCAL_HIRING}
        imageAlt="Diverse Indian engineering team in an office"
        reverse
        bullets={[
          "Quarterly compliance check on hiring ratios",
          "Founder Console shows live ratio per company",
          "Tier I founders maintain ≥ 70% local hiring",
        ]}
        badge="84% AVG LOCAL HIRING RATIO"
      />

      <FeatureRow
        id="ai"
        eyebrow="AI GOVERNANCE LAYER · BY AIM STATES"
        title="The district is run by an AI-native governance layer."
        body="AIM States operates the underlying governance system: identity, permitting, compliance, and policy. Calm, auditable, founder-readable."
        items={[
          {
            label: "AUDITABLE",
            title: "Every approval is a record",
            body: "Residency, incorporation, hiring, and tax decisions are emitted as auditable records to your Founder Console.",
          },
          {
            label: "FOUNDER-READABLE",
            title: "No legalese walls",
            body: "Notices arrive in your inbox in plain English with the underlying clause linked. No 40-page PDFs.",
          },
          {
            label: "PROGRAMMATIC",
            title: "Government as an API",
            body: "File incorporations, residency renewals, and visa requests through typed API endpoints — or a clean UI.",
          },
        ]}
      />

      <FeatureSplit
        eyebrow="FOUNDER NETWORK"
        title="A founder anywhere in the world. A district that backs them locally."
        body="Founders in 9 countries are already building from Amaravati. Pair a Founder Residency with the Founder Visa fast-track and arrive in two weeks."
        image={IMG_GLOBAL_NETWORK}
        imageAlt="World map showing global founder network"
        bullets={[
          "Founder Visa fast-track · 9-day median",
          "Founders onboarded from 9 countries",
          "Tax bridges to Singapore and Delaware C-Corp",
        ]}
        badge="9 COUNTRIES · GROWING"
      />

      <FeatureSplit
        id="why"
        eyebrow="WHY ANDHRA PRADESH"
        title="A capital region with a state behind it."
        body="Andhra Pradesh is rebuilding Amaravati as the state capital. Startup Capital is the founder-first district inside it — backed by the AP government, AIM States, and a coalition of district partners."
        image={IMG_WHY_AP}
        imageAlt="Amaravati landscape along the Krishna river"
        reverse
        bullets={[
          "Capital region with active state-level support",
          "Direct corridor to Hyderabad, Bangalore, Singapore",
          "₹8.4 Cr projected district activity in Q1",
        ]}
        badge="STATE OF ANDHRA PRADESH · PARTNER"
      />

      {/* Upcoming founder cohort - feature CTA */}
      <section id="upcoming" className="border-b-2 border-[var(--border)]">
        <div className="mx-auto max-w-[1280px] px-8 py-20">
          <SectionHeader
            eyebrow="[ UPCOMING FOUNDER COHORT ]"
            title="Quantum Valley · Cohort 03"
            body="Forty-two founders confirmed. Eighteen seats remaining. Cohort opens on the first of April."
          />
          <div className="mt-12 grid gap-0 border-2 border-[var(--border)] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[420px] bg-[var(--header-dark)] lg:border-r-2 lg:border-[var(--border)]">
              {/* PLACEHOLDER: replace with final asset */}
              <Image
                src={IMG_FOUNDER_COHORT_GROUP}
                alt="Group of young founders in the district plaza"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 border-2 border-white/40 bg-black/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
                COHORT · 03 · QUANTUM VALLEY
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 p-8">
              <div className="flex flex-col gap-5">
                <div className="label">[ STATUS ]</div>
                <div className="flex items-baseline gap-3">
                  <div className="font-display text-[68px] font-extrabold leading-none tracking-[-0.02em] text-[var(--accent)]">
                    {cohorts.current.openInDays}
                  </div>
                  <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                    DAYS UNTIL OPEN
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[12px] font-mono uppercase tracking-[0.18em]">
                    <span className="text-[var(--text-2)]">Seats reserved</span>
                    <span className="text-[var(--text)]">
                      {cohorts.current.seatsFilled} / {cohorts.current.seatsTotal}
                    </span>
                  </div>
                  <Progress
                    value={
                      (cohorts.current.seatsFilled /
                        cohorts.current.seatsTotal) *
                      100
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <StatusPill kind="active" label="OPEN FOR FOUNDERS" pulse />
                  <StatusPill kind="verified" label="DISTRICT 01 · APPROVED" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" variant="primary">
                  <Link href="/login">
                    RESERVE A SEAT
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/login">VIEW COHORT BRIEF</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--header-dark)] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-8 py-24 text-center">
          <div className="label text-white/60">[ START HERE ]</div>
          <h3 className="max-w-3xl font-display text-[40px] font-bold leading-[1.05] tracking-[-0.01em] sm:text-[56px]">
            Apply for residency. Build from Amaravati.
          </h3>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
            One application. Founder Residency, Company Registration, Founder
            Visa support, Coworking, and the full district operating system.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/login">
                APPLY FOR RESIDENCY
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button asChild variant="dark" size="lg" className="border-white/40">
              <Link href="/login">EXPLORE DISTRICT</Link>
            </Button>
          </div>
          {/* Decorative axis-row */}
          <div className="mt-10 grid w-full max-w-3xl grid-cols-3 border-y-2 border-white/15 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            <div>16.516 N</div>
            <div className="text-center text-white">DISTRICT 01 · SECTOR A</div>
            <div className="text-right">80.518 E</div>
          </div>
        </div>
      </section>
    </div>
  );
}
