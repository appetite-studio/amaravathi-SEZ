"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CalendarClock, Globe2, IdCard, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { DistrictSeal } from "@/components/ui/district-seal";
import { portalResidency, portalCompany } from "@/lib/data";

const statusColor: Record<string, string> = {
  "ACTIVE ACCESS": "var(--success)",
  "DISTRICT VERIFIED": "var(--success)",
  APPROVED: "var(--success)",
  "UNDER REVIEW": "var(--warning)",
  PENDING: "var(--warning)",
};

export default function ResidencyLayerPage() {
  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ RESIDENCY LAYER · ACCESS INFRASTRUCTURE ]"
          title="Residency Layer"
          body={`Permits, founder visas, and access permissions linked to ${portalCompany.shortName}. Issued under ASC residency policy. Each permit is offline-verifiable.`}
          trailing={
            <StatusPill
              kind="active"
              label={`${portalResidency.summary.active} ACTIVE PERMITS`}
              pulse
            />
          }
        />

        {/* 4 summary cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="ACTIVE RESIDENCY"
            value={String(portalResidency.summary.active)}
            sub={`${portalResidency.summary.global} GLOBAL · ${portalResidency.summary.apOrigin} AP ORIGIN`}
            icon={IdCard}
          />
          <SummaryCard
            label="FOUNDER VISAS"
            value={String(
              portalResidency.permits.filter((p) =>
                p.type.includes("Founder")
              ).length
            )}
            sub="9-day average processing"
            icon={ShieldCheck}
          />
          <SummaryCard
            label="EARLIEST EXPIRY"
            value={portalResidency.permits[2]?.validUntil ?? "—"}
            sub={portalResidency.permits[2]?.holder ?? ""}
            icon={CalendarClock}
            warning
          />
          <SummaryCard
            label="ACCESS LEVEL"
            value="FULL"
            sub={portalResidency.summary.accessLevel}
            icon={Globe2}
            highlight
          />
        </div>

        {/* District permissions */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ DISTRICT PERMISSIONS ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                {portalResidency.summary.districtPermissions.length} permissions granted
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {portalResidency.summary.districtPermissions.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex items-start gap-2 border-b-2 border-r-2 border-[var(--border-soft)] p-4 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(4n)]:border-r-0"
              >
                <ShieldCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--success)]"
                  strokeWidth={2}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text)]">
                  {p}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Permit cards */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ PERMIT REGISTER ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                Issued permits · {portalCompany.shortName}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {portalResidency.permits.length} ENTRIES
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {portalResidency.permits.map((permit, i) => (
              <motion.div
                key={permit.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-2 border-[var(--border)] bg-white"
              >
                <div className="flex items-center justify-between gap-4 border-b-2 border-[var(--border)] bg-[var(--accent)] px-5 py-3 text-white">
                  <div className="flex items-center gap-3">
                    <DistrictSeal size={20} className="text-white" />
                    <div className="flex flex-col leading-tight">
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
                        ASC PERMIT
                      </span>
                      <span className="font-mono text-[12px] font-bold uppercase tracking-[0.18em]">
                        {permit.id}
                      </span>
                    </div>
                  </div>
                  <span
                    className="border-[1.5px] border-white bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{
                      color: "white",
                    }}
                  >
                    {permit.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_140px]">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b-2 border-[var(--border-soft)] p-5 sm:grid-cols-3 lg:border-b-0 lg:border-r-2">
                    <Field k="HOLDER" v={permit.holder} />
                    <Field k="TYPE" v={permit.type} />
                    <Field
                      k="STAGE"
                      v={permit.stage}
                      stageColor={statusColor[permit.status]}
                    />
                    <Field k="ISSUED ON" v={permit.issuedOn} />
                    <Field k="VALID UNTIL" v={permit.validUntil} />
                    <Field
                      k="ACCESS"
                      v={permit.status === "ACTIVE ACCESS" ? "Full" : "Pending"}
                    />
                  </div>
                  <div className="flex items-center justify-center bg-[#FAFAFB] p-5">
                    {permit.qrPayload ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="border-2 border-[var(--border)] bg-white p-2">
                          <QRCodeSVG
                            value={permit.qrPayload}
                            size={88}
                            fgColor="#111111"
                            bgColor="#ffffff"
                            level="M"
                          />
                        </div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                          OFFLINE VERIFIABLE
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex h-[88px] w-[88px] items-center justify-center border-2 border-dashed border-[var(--border-soft)] bg-white font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                          PENDING ISSUE
                        </div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--warning)]">
                          QR ON APPROVAL
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  icon: Icon,
  highlight,
  warning,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof IdCard;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
    >
      <div className="flex items-start justify-between">
        <span className="label">[ {label} ]</span>
        <Icon
          className={`h-4 w-4 ${
            highlight
              ? "text-[var(--accent)]"
              : warning
              ? "text-[var(--warning)]"
              : "text-[var(--text-2)]"
          }`}
          strokeWidth={1.5}
        />
      </div>
      <div
        className={`mt-3 font-display text-[32px] font-extrabold leading-none tracking-[-0.01em] ${
          highlight ? "text-[var(--accent)]" : "text-[var(--text)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
        {sub}
      </div>
    </motion.div>
  );
}

function Field({
  k,
  v,
  stageColor,
}: {
  k: string;
  v: string;
  stageColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]"
        style={stageColor ? { color: stageColor } : undefined}
      >
        {v}
      </span>
    </div>
  );
}
