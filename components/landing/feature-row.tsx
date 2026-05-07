"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";

type Item = {
  label: string;
  title: string;
  body: string;
  metric?: string;
};

export function FeatureRow({
  eyebrow,
  title,
  body,
  items,
  id,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  items: Item[];
  id?: string;
}) {
  return (
    <section id={id} className="border-b-2 border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-8 py-20">
        <SectionHeader eyebrow={`[ ${eyebrow} ]`} title={title} body={body} />
        <div className="mt-12 grid gap-0 border-2 border-[var(--border)] md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col gap-4 border-b-2 border-[var(--border)] p-7 last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0"
            >
              <div className="label">{item.label}</div>
              <div className="font-display text-[22px] font-bold leading-tight tracking-[0.01em] text-[var(--text)]">
                {item.title}
              </div>
              <p className="text-[14px] leading-relaxed text-[var(--text-2)]">
                {item.body}
              </p>
              {item.metric && (
                <div className="mt-auto pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {item.metric}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
