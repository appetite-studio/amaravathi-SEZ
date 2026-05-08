"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Database, Globe, LogOut, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { clearSession, useLocalState } from "@/lib/store";
import { portalCompany } from "@/lib/data";
import { cn } from "@/lib/utils";

type Toggles = {
  notifPolicy: boolean;
  notifEvents: boolean;
  notifHires: boolean;
  notifDocs: boolean;
  publicDirectory: boolean;
  analyticsConsent: boolean;
};

const defaults: Toggles = {
  notifPolicy: true,
  notifEvents: true,
  notifHires: true,
  notifDocs: false,
  publicDirectory: true,
  analyticsConsent: true,
};

export default function SettingsPage() {
  const router = useRouter();
  const [toggles, setToggles] = useLocalState<Toggles>(
    "asc.company.settings",
    defaults
  );

  const onLogout = () => {
    clearSession();
    router.push("/");
  };

  const flip = (k: keyof Toggles) =>
    setToggles({ ...toggles, [k]: !toggles[k] });

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ SETTINGS · COMPANY PROFILE ]"
          title="Settings"
          body={`Operational settings for ${portalCompany.shortName}. Profile fields are read-only — managed by the District Registrar. Notifications and consents are local to this device.`}
          trailing={
            <StatusPill kind="verified" label="LOCAL SESSION" />
          }
        />

        {/* Profile (read-only) */}
        <Section
          eyebrow="[ COMPANY PROFILE · READ-ONLY ]"
          title="Registry-bound fields"
          desc="Profile fields are bonded to the District Registrar. To request a change, file an amendment via the Legal Desk."
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field k="LEGAL NAME" v={portalCompany.legalName} />
            <Field k="REGISTRATION ID" v={portalCompany.registrationId} mono />
            <Field k="CIN" v={portalCompany.cin} mono />
            <Field k="PAN" v={portalCompany.pan} mono />
            <Field k="GSTIN" v={portalCompany.gstin} mono />
            <Field k="POLICY TIER" v={portalCompany.policyTier} />
            <Field k="SECTOR" v={portalCompany.sector} />
            <Field k="STARTUP TIER" v={portalCompany.tier} />
            <Field k="DISTRICT ZONE" v={portalCompany.districtZone} />
          </div>
        </Section>

        {/* Notifications */}
        <Section
          eyebrow="[ NOTIFICATIONS · LOCAL ]"
          title="Operational alerts"
          desc="Choose what reaches your console. All alerts are local and never leave this device."
        >
          <div className="flex flex-col">
            <Toggle
              icon={ShieldCheck}
              label="POLICY UPDATES"
              desc="Tier shifts, capex rebate notifications, AP DPIIT cell notices."
              on={toggles.notifPolicy}
              onClick={() => flip("notifPolicy")}
            />
            <Toggle
              icon={Bell}
              label="EVENT RSVPS"
              desc="Event reminders and district passes."
              on={toggles.notifEvents}
              onClick={() => flip("notifEvents")}
            />
            <Toggle
              icon={Globe}
              label="LOCAL HIRING ALERTS"
              desc="University drives, intern placements, AP Skills Fund disbursements."
              on={toggles.notifHires}
              onClick={() => flip("notifHires")}
            />
            <Toggle
              icon={Database}
              label="DOCUMENT EVENTS"
              desc="New documents issued, expiries approaching, signatures pending."
              on={toggles.notifDocs}
              onClick={() => flip("notifDocs")}
            />
          </div>
        </Section>

        {/* Privacy */}
        <Section
          eyebrow="[ DIRECTORY · CONSENT ]"
          title="Public visibility"
          desc="Cross-tenant directory listings and analytics consents."
        >
          <div className="flex flex-col">
            <Toggle
              icon={Globe}
              label="PUBLIC DIRECTORY"
              desc="Show this company in the District Directory's company census."
              on={toggles.publicDirectory}
              onClick={() => flip("publicDirectory")}
            />
            <Toggle
              icon={Database}
              label="DISTRICT ANALYTICS"
              desc="Allow aggregate use of compliance metrics for District 01 reporting."
              on={toggles.analyticsConsent}
              onClick={() => flip("analyticsConsent")}
            />
          </div>
        </Section>

        {/* Session */}
        <Section
          eyebrow="[ SESSION · LOCAL DEVICE ]"
          title="Active session"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field k="ROLE" v="COMPANY" />
            <Field k="TENANT" v={portalCompany.shortName} />
            <Field k="STORAGE" v="LOCAL ONLY" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-[var(--border-soft)] pt-5">
            <Button variant="secondary" size="md" onClick={onLogout}>
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              END SESSION
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              Logging out clears this browser&apos;s local session.
            </span>
          </div>
        </Section>
      </div>
    </PortalShell>
  );
}

function Section({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="border-2 border-[var(--border)] bg-white"
    >
      <div className="border-b-2 border-[var(--border-soft)] px-7 py-5">
        <div className="label">{eyebrow}</div>
        <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
          {title}
        </h2>
        {desc && (
          <p className="mt-2 max-w-2xl text-[13px] text-[var(--text-2)]">
            {desc}
          </p>
        )}
      </div>
      <div className="p-7">{children}</div>
    </motion.section>
  );
}

function Field({
  k,
  v,
  mono = false,
}: {
  k: string;
  v: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className={`text-[13px] text-[var(--text)] ${mono ? "font-mono break-all" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  desc,
  on,
  onClick,
}: {
  icon: typeof Bell;
  label: string;
  desc: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start justify-between gap-4 border-b border-[var(--border-soft)] py-5 text-left last:border-b-0 hover:bg-[#FAFAFB]"
    >
      <div className="flex items-start gap-3">
        <Icon
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-2)]"
          strokeWidth={1.5}
        />
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[var(--text)]">
            {label}
          </span>
          <span className="text-[12px] text-[var(--text-2)]">{desc}</span>
        </div>
      </div>
      <span
        className={cn(
          "relative flex h-6 w-11 shrink-0 items-center border-2 border-[var(--border)] transition-colors",
          on ? "bg-[var(--accent)]" : "bg-white"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute h-3 w-3 bg-[var(--border)] transition-all",
            on ? "left-[calc(100%-16px)]" : "left-1"
          )}
          style={{ backgroundColor: on ? "white" : "var(--border)" }}
        />
      </span>
    </button>
  );
}
