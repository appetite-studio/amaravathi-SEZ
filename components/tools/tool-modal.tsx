"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { useToast } from "@/components/ui/toaster";
import { simulate, nowIST } from "@/lib/simulate";
import type { Tool } from "@/lib/data";

type FieldDef = { key: string; label: string; defaultValue: string };

const formMap: Record<string, FieldDef[]> = {
  "register-company": [
    { key: "company", label: "PROPOSED NAME", defaultValue: "Neon AI II" },
    { key: "type", label: "ENTITY TYPE", defaultValue: "Pvt Ltd" },
    { key: "category", label: "CATEGORY", defaultValue: "AI Infrastructure" },
    { key: "founders", label: "FOUNDING TEAM", defaultValue: "2 founders · AP residents" },
  ],
  "apply-residency": [
    { key: "name", label: "FOUNDER NAME", defaultValue: "Diya Rajiv" },
    { key: "tier", label: "TIER", defaultValue: "Tier I — Founding Cohort" },
    { key: "duration", label: "RESIDENCY DURATION", defaultValue: "5 years" },
  ],
  "founder-housing": [
    { key: "unit", label: "UNIT TYPE", defaultValue: "2-BHK · Sector A" },
    { key: "moveIn", label: "MOVE-IN", defaultValue: "01 Apr 2026" },
    { key: "duration", label: "DURATION", defaultValue: "12 months" },
  ],
  "join-cohort": [
    { key: "cohort", label: "COHORT", defaultValue: "Quantum Valley · Cohort 03" },
    { key: "stage", label: "STAGE", defaultValue: "Pre-seed" },
    { key: "ask", label: "WHAT YOU NEED", defaultValue: "₹6L AP Skills Fund + 2 mentor matches" },
  ],
  "tax-benefits": [
    { key: "scheme", label: "SCHEME", defaultValue: "30% Capex Rebate" },
    { key: "spend", label: "QUALIFYING CAPEX", defaultValue: "₹14,80,000" },
    { key: "year", label: "ASSESSMENT YEAR", defaultValue: "2026-27" },
  ],
  "skills-fund": [
    { key: "role", label: "ROLE", defaultValue: "Senior Software Engineer" },
    { key: "university", label: "UNIVERSITY", defaultValue: "IIIT Sri City" },
    { key: "seats", label: "SEATS", defaultValue: "2" },
  ],
  events: [
    { key: "event", label: "EVENT", defaultValue: "Sequoia Surge × Amaravati AMA" },
    { key: "date", label: "DATE", defaultValue: "27 Mar 2026 · 18:30 IST" },
    { key: "rsvp", label: "RSVP STATUS", defaultValue: "Going" },
  ],
  "legal-desk": [
    { key: "subject", label: "SUBJECT", defaultValue: "Series A — Term sheet review" },
    { key: "urgency", label: "URGENCY", defaultValue: "Within 48 hours" },
  ],
  documents: [
    { key: "doc", label: "DOCUMENT", defaultValue: "Founder Residency Permit" },
    { key: "share", label: "SHARE WITH", defaultValue: "District Legal Desk" },
  ],
  "district-map": [
    { key: "block", label: "BLOCK", defaultValue: "Sector A · Coworking 03" },
    { key: "purpose", label: "PURPOSE", defaultValue: "Cohort dinner walk-through" },
  ],
  "hiring-portal": [
    { key: "role", label: "ROLE TITLE", defaultValue: "Founding Engineer" },
    { key: "compensation", label: "COMPENSATION", defaultValue: "₹38L + 0.6% ESOP" },
    { key: "skillsFund", label: "AP SKILLS FUND", defaultValue: "Co-fund requested" },
  ],
  "founder-visa": [
    { key: "passport", label: "PASSPORT", defaultValue: "IND · Active" },
    { key: "duration", label: "VISA DURATION", defaultValue: "5 years · multi-entry" },
  ],
  "mentor-matching": [
    { key: "stage", label: "STAGE", defaultValue: "Pre-seed → Seed" },
    { key: "domain", label: "DOMAIN", defaultValue: "AI infrastructure" },
    { key: "timezone", label: "TIMEZONE", defaultValue: "IST · UTC+5:30" },
  ],
};

export function ToolModal({
  tool,
  open,
  onOpenChange,
}: {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  if (!tool) return null;
  const fields = formMap[tool.id] ?? [];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await simulate(700, 1100);
    setSubmitting(false);
    onOpenChange(false);
    toast({
      title: `${tool.title.replace(/^./, (c) => c) } · FILED`,
      body: `Filed ${nowIST()} · District Registry confirmed receipt.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="label">[ DISTRICT TOOL ]</div>
            <StatusPill kind="active" label="LIVE FORM" />
          </div>
          <DialogTitle>{tool.title}</DialogTitle>
          <DialogDescription>{tool.blurb}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-2 sm:col-span-2">
              <span className="label">{f.label}</span>
              <input
                defaultValue={f.defaultValue}
                className="border-2 border-[var(--border)] bg-white px-4 py-3 text-[14px] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
          ))}
          <div className="flex flex-col gap-3 border-t-2 border-[var(--border-soft)] pt-4 sm:col-span-2">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              <span>FILING REF · ASC-{tool.id.toUpperCase()}</span>
              <span>SECURE · LOCAL</span>
            </div>
            <Button
              type="submit"
              size="lg"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  FILING…
                </>
              ) : (
                <>
                  {tool.actionLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
