"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Cable,
  Calendar,
  Cpu,
  Home,
  Plus,
  Wifi,
  Zap,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { portalWorkspace, portalCompany } from "@/lib/data";

const roomStatusColor: Record<string, string> = {
  AVAILABLE: "var(--success)",
  RESERVED: "var(--warning)",
  MAINTENANCE: "var(--text-3)",
};

export default function WorkspacePage() {
  const occupancyPct = Math.round(
    (portalWorkspace.deskOccupancy / portalWorkspace.deskCapacity) * 100
  );
  const housingPct = Math.round(
    (portalWorkspace.housing.occupied / portalWorkspace.housing.units) * 100
  );

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ WORKSPACE · DISTRICT INFRASTRUCTURE ]"
          title="Workspace · Tower B"
          body={`Operational allocation for ${portalCompany.shortName} inside ${portalWorkspace.districtZone}. Lease 36 months · renewable. Internet ${portalWorkspace.internetTier}.`}
          trailing={
            <StatusPill kind="active" label={portalWorkspace.officeStatus} pulse />
          }
        />

        {/* Hero allocation card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[var(--border)] bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-7 py-5 text-white">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5" strokeWidth={1.5} />
              <div className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  WORKSPACE ALLOCATION
                </span>
                <span className="font-display text-[20px] font-bold uppercase tracking-[0.04em]">
                  {portalWorkspace.tower} · {portalWorkspace.level}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                DISTRICT ZONE
              </span>
              <span className="font-mono text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {portalWorkspace.districtZone}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            <Cell
              k="OFFICE SIZE"
              v={portalWorkspace.officeSize}
              icon={Building2}
            />
            <Cell
              k="DESK CAPACITY"
              v={`${portalWorkspace.deskOccupancy} / ${portalWorkspace.deskCapacity}`}
              icon={Cpu}
              middle
            />
            <Cell
              k="OFFICE STATUS"
              v={portalWorkspace.officeStatus}
              icon={Zap}
              last
              highlight
            />
          </div>

          <div className="grid grid-cols-1 gap-0 border-t-2 border-[var(--border-soft)] md:grid-cols-3">
            <Cell
              k="INTERNET"
              v={portalWorkspace.internetTier}
              icon={Wifi}
            />
            <Cell
              k="POWER"
              v={portalWorkspace.powerTier}
              icon={Cable}
              middle
            />
            <Cell
              k="TRANSPORT"
              v={portalWorkspace.transportRoute}
              icon={Home}
              last
            />
          </div>
        </motion.div>

        {/* Occupancy + Rooms split */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Occupancy */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="border-2 border-[var(--border)] bg-white"
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--border-soft)] px-6 py-4">
              <span className="label">[ OCCUPANCY · TOWER B · L12 ]</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                7-DAY TREND
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[64px] font-extrabold leading-none tracking-[-0.02em] text-[var(--text)]">
                  {occupancyPct}
                </span>
                <span className="font-display text-[18px] font-bold leading-none text-[var(--text-2)]">
                  %
                </span>
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  {portalWorkspace.deskOccupancy} OF {portalWorkspace.deskCapacity} DESKS
                </span>
              </div>

              {/* 7-day mini bars */}
              <div className="mt-6 flex h-[80px] items-end gap-2">
                {portalWorkspace.occupancyHistory.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="origin-bottom flex-1 bg-[var(--text)]"
                    style={{ height: `${v}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t-2 border-[var(--border-soft)] pt-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    HOUSING · SECTOR A
                  </span>
                  <div className="mt-1 font-display text-[20px] font-bold text-[var(--text)]">
                    {portalWorkspace.housing.occupied} / {portalWorkspace.housing.units}
                  </div>
                  <div className="mt-2">
                    <Progress value={housingPct} />
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    UNIT TYPE
                  </span>
                  <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                    {portalWorkspace.housing.type}
                  </div>
                  <Button variant="secondary" size="sm" className="mt-3 w-full">
                    REQUEST UNIT
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rooms list */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="border-2 border-[var(--border)] bg-white"
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--border-soft)] px-6 py-4">
              <span className="label">[ MEETING ROOMS ]</span>
              <Button variant="primary" size="sm">
                <Plus className="h-3 w-3" strokeWidth={2.5} />
                RESERVE ROOM
              </Button>
            </div>
            <ul className="flex flex-col">
              {portalWorkspace.rooms.map((room) => (
                <li
                  key={room.name}
                  className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] px-6 py-3 last:border-b-0"
                >
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                      {room.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      {room.capacity} SEATS · {room.nextSlot}
                    </span>
                  </div>
                  <span
                    className="border-[1.5px] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{
                      borderColor: roomStatusColor[room.status],
                      color: roomStatusColor[room.status],
                    }}
                  >
                    {room.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-[var(--border-soft)] px-6 py-3">
              <Button variant="ghost" size="sm" className="px-0">
                APPLY FOR EXPANSION →
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Coworking reservations */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ COWORKING RESERVATIONS ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                Upcoming bookings · District 01
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {portalWorkspace.coworkingReservations.length} ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {portalWorkspace.coworkingReservations.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-2 border-[var(--border)] bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <Calendar
                    className="h-4 w-4 text-[var(--text-2)]"
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {r.seats} SEAT{r.seats > 1 ? "S" : ""}
                  </span>
                </div>
                <h3 className="mt-3 font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                  {r.title}
                </h3>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
                  {r.date}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

function Cell({
  k,
  v,
  icon: Icon,
  middle,
  last,
  highlight,
}: {
  k: string;
  v: string;
  icon: typeof Building2;
  middle?: boolean;
  last?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 px-6 py-5 ${
        last
          ? ""
          : middle
          ? "border-b-2 border-[var(--border-soft)] md:border-b-0 md:border-x-2"
          : "border-b-2 border-[var(--border-soft)] md:border-b-0 md:border-r-0"
      }`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-2)]" strokeWidth={1.5} />
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          {k}
        </span>
        <span
          className={`font-mono text-[13px] uppercase tracking-[0.04em] ${
            highlight ? "text-[var(--accent)] font-bold" : "text-[var(--text)]"
          }`}
        >
          {v}
        </span>
      </div>
    </div>
  );
}
