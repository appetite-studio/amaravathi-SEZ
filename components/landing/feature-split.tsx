"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/ui/status-pill";

export function FeatureSplit({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  bullets,
  badge,
  reverse = false,
  id,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  bullets?: string[];
  badge?: string;
  reverse?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="border-b-2 border-[var(--border)]">
      <div
        className={cn(
          "mx-auto grid max-w-[1280px] gap-0 px-0 py-0 lg:grid-cols-2"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex flex-col justify-center gap-6 px-8 py-16 lg:py-24",
            reverse && "lg:order-2"
          )}
        >
          <div className="label">[ {eyebrow} ]</div>
          <h3 className="font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] text-[var(--text)] sm:text-[42px]">
            {title}
          </h3>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-2)]">
            {body}
          </p>
          {bullets && (
            <ul className="flex flex-col gap-3 border-t-2 border-[var(--border-soft)] pt-5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[14px] text-[var(--text)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {badge && (
            <div className="pt-2">
              <StatusPill kind="active" label={badge} />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={cn(
            "relative min-h-[420px] border-l-0 lg:min-h-0",
            reverse ? "lg:border-r-2 lg:border-[var(--border)]" : "lg:border-l-2 lg:border-[var(--border)]"
          )}
        >
          <div className="relative h-full min-h-[420px] w-full bg-[var(--header-dark)]">
            {/* PLACEHOLDER: replace with final asset */}
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 border-2 border-white/40 bg-black/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              {eyebrow}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
