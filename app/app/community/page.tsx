"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Pin, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SearchInput } from "@/components/ui/search-input";
import { FilterChip } from "@/components/ui/filter-chip";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forum, notifications } from "@/lib/data";
import { IMG_AVATARS } from "@/lib/images";

const filters: Array<{ id: string; label: string; channelMatch?: string }> = [
  { id: "all", label: "ALL" },
  { id: "founders", label: "FOUNDERS", channelMatch: "founders" },
  { id: "policy", label: "POLICY", channelMatch: "policy" },
  { id: "govt", label: "GOVT NOTICES", channelMatch: "govt" },
  { id: "office", label: "OFFICE HOURS", channelMatch: "office" },
  { id: "mentors", label: "MENTOR", channelMatch: "mentors" },
  { id: "cohort", label: "COHORT", channelMatch: "cohort" },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  const channelMatch =
    filters.find((f) => f.id === activeFilter)?.channelMatch ?? activeChannel;
  const posts = channelMatch
    ? forum.posts.filter((p) => p.channel === channelMatch)
    : forum.posts;

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="[ DISTRICT COMMUNITY · FOUNDER NETWORK ]"
        title="District Community"
        body="A private founder network. Channels, policy, office hours, and cohorts &mdash; not a public Reddit. 127 founders online today."
        trailing={
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
            <Users className="h-4 w-4" strokeWidth={1.5} />
            127 ONLINE · 9 COUNTRIES
          </div>
        }
      />

      <div className="flex flex-col gap-3">
        <SearchInput
          placeholder="SEARCH DISTRICT COMMUNITY"
          defaultValue=""
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <FilterChip
              key={f.id}
              active={activeFilter === f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setActiveChannel(null);
              }}
            >
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_300px]">
        {/* Channels */}
        <aside className="border-2 border-[var(--border)] bg-white">
          <div className="border-b-2 border-[var(--border)] px-5 py-4">
            <div className="label">[ CHANNELS ]</div>
            <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.04em]">
              7 active · 30 unread
            </div>
          </div>
          <ul className="flex flex-col">
            {forum.channels.map((c) => {
              const active = activeChannel === c.id;
              return (
                <li
                  key={c.id}
                  className="border-b-2 border-[var(--border-soft)] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveChannel(active ? null : c.id);
                      setActiveFilter("all");
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors",
                      active
                        ? "bg-[var(--text)] text-white"
                        : "bg-white text-[var(--text)] hover:bg-[var(--accent-soft)]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.16em]",
                        active ? "text-white" : "text-[var(--text)]"
                      )}
                    >
                      {c.label}
                    </span>
                    {c.unread > 0 && (
                      <span
                        className={cn(
                          "border-[1.5px] px-2 py-0.5 font-mono text-[10px] tracking-[0.06em]",
                          active
                            ? "border-white bg-[var(--accent)] text-white"
                            : "border-[var(--border)] bg-[var(--accent)] text-white"
                        )}
                      >
                        {c.unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t-2 border-[var(--border)] p-4">
            <Button variant="secondary" size="sm" className="w-full">
              + REQUEST CHANNEL
            </Button>
          </div>
        </aside>

        {/* Feed */}
        <section className="flex flex-col gap-5">
          {posts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden border-2 border-[var(--border)] bg-[var(--header-dark)]">
                    {/* PLACEHOLDER: replace with final asset */}
                    <Image
                      src={IMG_AVATARS[p.authorIndex] ?? IMG_AVATARS[0]}
                      alt={`${p.author} avatar`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--text)]">
                      {p.author}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                      {p.city} · {p.timestamp}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.live && <StatusPill kind="live" pulse />}
                  <span className="border-[1.5px] border-[var(--border)] bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
                    {p.tag}
                  </span>
                </div>
              </header>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--text)]">
                {p.body}
              </p>
              <footer className="mt-5 flex items-center gap-4 border-t-2 border-[var(--border-soft)] pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
                <button
                  type="button"
                  className="flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                >
                  <Heart className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {p.reactions}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 transition-colors hover:text-[var(--text)]"
                >
                  <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {p.replies} REPLIES
                </button>
                <button
                  type="button"
                  className="ml-auto flex items-center gap-2 transition-colors hover:text-[var(--text)]"
                >
                  <Pin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  PIN
                </button>
              </footer>
            </motion.article>
          ))}
        </section>

        {/* Notifications rail */}
        <aside className="flex flex-col gap-4">
          <div className="border-2 border-[var(--border)] bg-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-5 py-4">
              <div className="label">[ INBOX ]</div>
              <StatusPill kind="new" label="6 NEW" />
            </div>
            <ul className="flex flex-col">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="border-b-2 border-[var(--border-soft)] px-5 py-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text)]">
                      {n.title}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      {n.timestamp.split(" · ")[0]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text-2)]">
                    {n.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-[var(--border)] bg-[var(--accent-soft)] p-5">
            <div className="label">[ NEW JOINER ]</div>
            <div className="mt-2 font-display text-[16px] font-bold uppercase tracking-[0.04em]">
              Wei Lin · Singapore
            </div>
            <p className="mt-2 text-[13px] text-[var(--text-2)]">
              Joined Quantum Valley Cohort. Founder Tier I. Privacy-first
              identity infra.
            </p>
            <div className="mt-3">
              <Button variant="secondary" size="sm">SAY HELLO</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
