"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { IMG_HERO_LANDING } from "@/lib/images";

export function Hero() {
  return (
    <section className="border-b-2 border-[var(--border)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-8 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="label">
            [ ANDHRA PRADESH · INDIA · EST. 2026 ]
          </div>
          <h1 className="font-display text-[56px] font-bold leading-[0.95] tracking-[-0.02em] text-[var(--text)] sm:text-[68px] lg:text-[80px]">
            Build
            <br />
            companies
            <br />
            from
            <br />
            <span className="text-[var(--accent)]">Amaravati.</span>
          </h1>
          <p className="max-w-md text-[16px] leading-relaxed text-[var(--text-2)]">
            A founder-first startup capital. Apply for residency, incorporate
            your company, hire locally, and access the district&apos;s operating
            system &mdash; through one platform.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/login">
                APPLY FOR RESIDENCY
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/login">EXPLORE DISTRICT</Link>
            </Button>
            <Button asChild variant="tag" size="md">
              <Link href="/login">JOIN FOUNDER COHORT</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <StatusPill kind="active" label="DISTRICT 01 · OPERATIONAL" />
            <StatusPill kind="verified" label="GOVT OF AP · VERIFIED" />
            <StatusPill kind="new" label="QUANTUM VALLEY COHORT · OPENS 01 APR" pulse />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full border-2 border-[var(--border)] bg-[var(--header-dark)]">
            <Image
              src={IMG_HERO_LANDING}
              alt="Amaravati capital architecture at golden hour"
              fill
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b-2 border-white/20 bg-black/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
              <span>DISTRICT 01 / SECTOR A</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                OPERATIONAL
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t-2 border-white/20 bg-black/55 p-5 backdrop-blur">
              <div className="flex flex-col gap-1.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  FOUNDER CONSOLE
                </div>
                <div className="font-display text-[18px] font-bold uppercase tracking-[0.02em] text-white">
                  Amaravati · Startup Capital
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  COORDINATES
                </div>
                <div className="font-mono text-[12px] text-white">
                  16.516 N · 80.518 E
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-3 -top-3 hidden border-2 border-[var(--border)] bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)] shadow-[var(--shadow-brutal-sm)] sm:block">
            ASC · 2026
          </div>
        </motion.div>
      </div>
    </section>
  );
}
