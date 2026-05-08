"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { DistrictSeal } from "@/components/ui/district-seal";
import { portalCompany, portalFounders, portalResidency } from "@/lib/data";

export default function CompanyRegistryPage() {
  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DIGITAL INCORPORATION · DISTRICT REGISTRY ]"
          title="Company Registry"
          body={`Public-facing record on the District Registry. Filed under the Innovation Companies Act 2026. Last filing ${portalCompany.lastFiling}.`}
          trailing={
            <>
              <StatusPill kind="verified" label="VERIFIED ENTITY" />
              <StatusPill kind="active" label="ACTIVE" pulse />
              <Button variant="secondary" size="sm">
                <Download className="h-3.5 w-3.5" strokeWidth={2} />
                EXPORT REGISTRY
              </Button>
            </>
          }
        />

        {/* The registry document */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[var(--border)] bg-white shadow-[var(--shadow-brutal)]"
        >
          {/* Document header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-7 py-5 text-white">
            <div className="flex items-center gap-3">
              <DistrictSeal size={28} className="text-white" />
              <div className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  AMARAVATI STARTUP CAPITAL · DISTRICT REGISTRAR
                </span>
                <span className="font-mono text-[14px] font-bold uppercase tracking-[0.18em]">
                  Certificate of Registration · Class A Innovation Company
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                REGISTRY ID
              </span>
              <span className="font-mono text-[16px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {portalCompany.registrationId}
              </span>
            </div>
          </div>

          {/* Document body */}
          <div className="p-8">
            {/* Title block */}
            <div className="border-b-2 border-[var(--border-soft)] pb-6">
              <div className="label">[ ENTITY NAME ]</div>
              <h2 className="mt-2 font-display text-[36px] font-bold leading-tight tracking-[-0.01em] text-[var(--text)]">
                {portalCompany.legalName}
              </h2>
              <p className="mt-2 text-[14px] text-[var(--text-2)]">
                {portalCompany.subSector} · {portalCompany.sector}. Operating
                under {portalCompany.policyTier}, registered under the ASC
                Innovation District on {portalCompany.founded}.
              </p>
            </div>

            {/* Identifiers grid */}
            <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="REGISTERED NAME" value={portalCompany.legalName} />
              <Field label="ENTITY TYPE" value={portalCompany.type} />
              <Field label="CIN" value={portalCompany.cin} mono />
              <Field label="PAN" value={portalCompany.pan} mono />
              <Field label="GSTIN" value={portalCompany.gstin} mono />
              <Field label="TAN" value={portalCompany.tan} mono />
              <Field label="INCORPORATED" value={portalCompany.founded} />
              <Field
                label="DISTRICT CLASSIFICATION"
                value={portalCompany.districtClassification}
              />
              <Field label="SECTOR" value={portalCompany.sector} />
              <Field label="STAGE" value={portalCompany.stage} />
              <Field label="STARTUP TIER" value={portalCompany.tier} />
              <Field label="POLICY TIER" value={portalCompany.policyTier} />
            </div>

            {/* Registered address block */}
            <div className="mt-8 border-t-2 border-[var(--border-soft)] pt-6">
              <div className="label">[ REGISTERED ADDRESS ]</div>
              <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-[var(--text)]">
                {portalCompany.registeredAddress}
              </p>
            </div>

            {/* Founders + directors */}
            <div className="mt-8 grid grid-cols-1 gap-8 border-t-2 border-[var(--border-soft)] pt-6 lg:grid-cols-2">
              <div>
                <div className="label">[ FOUNDERS ON REGISTRY ]</div>
                <ul className="mt-3 flex flex-col">
                  {portalFounders.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] py-3 last:border-b-0"
                    >
                      <div className="flex flex-col leading-tight">
                        <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                          {f.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                          {f.role.toUpperCase()} · {f.id}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--success)]">
                        {f.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="label">[ BOARD OF DIRECTORS ]</div>
                <ul className="mt-3 flex flex-col">
                  {portalCompany.boardOfDirectors.map((d) => (
                    <li
                      key={d}
                      className="border-b border-[var(--border-soft)] py-3 font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)] last:border-b-0"
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="label mt-6">[ STATUTORY APPOINTMENTS ]</div>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-1">
                  <Field label="AUDITOR" value={portalCompany.auditor} />
                  <Field label="BANKERS" value={portalCompany.bankers} />
                  <Field label="LAST FILING" value={portalCompany.lastFiling} />
                  <Field label="NEXT FILING" value={portalCompany.nextFiling} />
                </div>
              </div>
            </div>

            {/* Compliance + tax */}
            <div className="mt-8 grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-3">
              <ComplianceCell
                k="COMPLIANCE CYCLE"
                v={portalCompany.complianceCycle}
              />
              <ComplianceCell
                k="RESIDENCY-LINKED"
                v={`${portalResidency.summary.active} ACTIVE PERMITS`}
                middle
              />
              <ComplianceCell
                k="ENTITY STATUS"
                v={portalCompany.entityStatus}
                last
              />
            </div>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {portalCompany.badges.map((b) => (
                <span
                  key={b}
                  className="border-[1.5px] border-[var(--border)] bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[var(--border)] bg-[var(--accent-soft)] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
            <span>SIGNED · DISTRICT REGISTRAR · ASC</span>
            <span>{portalCompany.incorporatedAt}</span>
            <span className="flex items-center gap-2">
              <FileText className="h-3 w-3" strokeWidth={2} />
              MACHINE READABLE · ASC-CERT-{portalCompany.id}
            </span>
          </div>
        </motion.div>
      </div>
    </PortalShell>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        className={`text-[14px] text-[var(--text)] ${mono ? "font-mono break-all" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function ComplianceCell({
  k,
  v,
  middle,
  last,
}: {
  k: string;
  v: string;
  middle?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 px-5 py-4 ${
        last
          ? ""
          : middle
          ? "border-b-2 border-[var(--border-soft)] sm:border-b-0 sm:border-x-2"
          : "border-b-2 border-[var(--border-soft)] sm:border-b-0 sm:border-r-0"
      }`}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
        {v}
      </span>
    </div>
  );
}
