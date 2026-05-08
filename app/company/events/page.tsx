"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { ActivityPanel } from "@/components/portal-shell/activity-panel";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portalEvents, type PortalEvent } from "@/lib/data";

const filters = ["ALL", "FOUNDER", "INVESTOR", "COHORT", "MEETUP", "HIRING", "LEGAL", "SUMMIT"] as const;
type Filter = (typeof filters)[number];

const rsvpColor: Record<string, string> = {
  CONFIRMED: "var(--success)",
  "RSVP OPEN": "var(--accent)",
  "RSVP PENDING": "var(--warning)",
};

export default function EventsPage() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return portalEvents;
    return portalEvents.filter((e) => e.tag === filter);
  }, [filter]);

  return (
    <PortalShell variant="company" activityPanel={<ActivityPanel />}>
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ EVENTS · DISTRICT CALENDAR ]"
          title="Events"
          body={`Upcoming gatherings inside ${"District 01"}. Linked to ${"Neon AI"}'s residency permits — RSVP automatically issues a district pass.`}
          trailing={
            <StatusPill
              kind="active"
              label={`${portalEvents.length} UPCOMING`}
              pulse
            />
          }
        />

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "border-[1.5px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-white"
                    : "border-[var(--border-soft)] bg-white text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-4">
          {filtered.map((evt, i) => (
            <EventRow key={evt.id} event={evt} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

function EventRow({ event, delay = 0 }: { event: PortalEvent; delay?: number }) {
  const rsvpColor_ = rsvpColor[event.rsvp] ?? "var(--text-3)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white hover-brutal sm:grid-cols-[88px_1fr_180px]"
    >
      {/* Date block */}
      <div className="flex items-center justify-center border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-4 py-5 text-white sm:border-b-0 sm:border-r-2">
        <div className="flex flex-col items-center leading-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
            {event.day}
          </span>
          <span className="mt-1 font-display text-[26px] font-extrabold tracking-[-0.01em]">
            {event.date.split(" ")[0]}
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
            {event.date.split(" ")[1]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[18px] font-bold uppercase leading-tight tracking-[0.02em] text-[var(--text)]">
            {event.title}
          </h3>
          <span className="border-[1.5px] border-[var(--border)] bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text)]">
            {event.tag}
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-2)]">
          {event.host}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {event.location}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" strokeWidth={2} />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3 w-3" strokeWidth={2} />
            {event.attendees} attendees
          </span>
          <span>· DISTRICT ZONE · {event.districtZone}</span>
        </div>
      </div>

      {/* RSVP */}
      <div className="flex flex-col items-stretch justify-center gap-2 border-t-2 border-[var(--border-soft)] p-5 sm:border-l-2 sm:border-t-0">
        <span
          className="text-center border-[1.5px] px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ borderColor: rsvpColor_, color: rsvpColor_ }}
        >
          {event.rsvp}
        </span>
        <Button
          variant={event.rsvp === "CONFIRMED" ? "secondary" : "primary"}
          size="sm"
        >
          {event.rsvp === "CONFIRMED" ? "MANAGE" : "RSVP →"}
        </Button>
      </div>
    </motion.div>
  );
}
