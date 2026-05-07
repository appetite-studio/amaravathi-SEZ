"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { DistrictSeal } from "@/components/ui/district-seal";
import { FieldLabel } from "@/components/ui/label";
import { StatusPill } from "@/components/ui/status-pill";
import { IMG_FOUNDER_PORTRAIT } from "@/lib/images";
import { founder } from "@/lib/data";

export function ResidencyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative border-2 border-[var(--border)] bg-white shadow-[var(--shadow-brutal)]"
    >
      {/* Orange header strip */}
      <div className="flex items-center justify-between border-b-2 border-[var(--border)] bg-[var(--accent)] px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <DistrictSeal size={28} className="text-white" />
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
              Government of Andhra Pradesh
            </span>
            <span className="font-mono text-[14px] font-bold uppercase tracking-[0.18em]">
              Amaravati Startup Capital · Founder Residency
            </span>
          </div>
        </div>
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
            DOC TYPE
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            ASC-FR-01
          </span>
        </div>
      </div>

      {/* Card body - 3 column grid */}
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[200px_1fr_220px]">
        {/* Photo column */}
        <div className="border-b-2 border-[var(--border)] p-6 lg:border-b-0 lg:border-r-2">
          <div className="label mb-3">[ FOUNDER PORTRAIT ]</div>
          <div className="relative aspect-square w-full border-2 border-[var(--border)] bg-[var(--header-dark)]">
            {/* PLACEHOLDER: replace with final asset */}
            <Image
              src={IMG_FOUNDER_PORTRAIT}
              alt={`${founder.name} - Founder portrait`}
              fill
              sizes="200px"
              className="object-cover grayscale-[10%]"
            />
            <div className="absolute inset-x-0 bottom-0 border-t-2 border-white/30 bg-black/50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur">
              ID · 2026 · 03 · 12
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              ORIGIN
            </div>
            <div className="font-mono text-[12px] text-[var(--text)]">
              {founder.homeCity}
            </div>
          </div>
        </div>

        {/* Fields column */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-b-2 border-[var(--border)] p-6 lg:border-b-0 lg:border-r-2">
          <FieldLabel label="NAME" value={founder.name} />
          <FieldLabel label="RESIDENCY ID" value={founder.residencyId} />
          <FieldLabel
            label="FOUNDER TIER"
            value={founder.tier.toUpperCase()}
          />
          <FieldLabel label="RESIDENCY TYPE" value={founder.residencyType} />
          <FieldLabel label="ISSUED ON" value={founder.issuedOn} />
          <FieldLabel label="VALID UNTIL" value={founder.validUntil} />
          <FieldLabel
            label="COMPANY"
            value={founder.company}
          />
          <FieldLabel
            label="ACCESS LEVEL"
            value={founder.accessLevel.toUpperCase()}
          />
          <div className="col-span-2 flex flex-wrap items-center gap-2 border-t-2 border-[var(--border-soft)] pt-4">
            <StatusPill kind="active" label="ACTIVE RESIDENCY" pulse />
            <StatusPill kind="verified" label="LOCAL HIRING VERIFIED" />
            <StatusPill kind="approved" label="DISTRICT 01 · APPROVED" />
          </div>
        </div>

        {/* QR column */}
        <div className="flex flex-col items-stretch p-6">
          <div className="label mb-3">[ MACHINE READABLE ]</div>
          <div className="flex items-center justify-center border-2 border-[var(--border)] bg-white p-4">
            <QRCodeSVG
              value={`https://amaravati.startup/permit/${founder.residencyId}`}
              size={160}
              fgColor="#111111"
              bgColor="#ffffff"
              level="M"
            />
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              SCAN TO VERIFY
            </div>
            <div className="font-mono text-[11px] text-[var(--text)]">
              amaravati.startup/permit/
              <span className="text-[var(--accent)]">{founder.residencyId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer signature row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[var(--border)] bg-[var(--accent-soft)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
        <span>SIGNED · DISTRICT REGISTRAR · ASC</span>
        <span>OPERATED BY AIM STATES</span>
        <span>PERMIT VALID OFFLINE</span>
      </div>
    </motion.div>
  );
}
