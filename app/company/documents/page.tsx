"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portalDocuments, type PortalDocument } from "@/lib/data";

const filters = [
  "ALL",
  "INCORPORATION",
  "RESIDENCY",
  "COMPLIANCE",
  "TAX",
  "WORKSPACE",
  "AGREEMENT",
  "POLICY",
] as const;
type Filter = (typeof filters)[number];

const statusColor: Record<string, string> = {
  VERIFIED: "var(--success)",
  SIGNED: "var(--text)",
  "DISTRICT ISSUED": "var(--accent)",
  "UNDER REVIEW": "var(--warning)",
};

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") return portalDocuments;
    return portalDocuments.filter((d) => d.type === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: portalDocuments.length };
    portalDocuments.forEach((d) => {
      c[d.type] = (c[d.type] ?? 0) + 1;
    });
    return c;
  }, []);

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DOCUMENT VAULT · DISTRICT ISSUED ]"
          title="Documents"
          body={`${portalDocuments.length} documents on the District Registry. Issued, verified, or signed by the Registrar, AP DPIIT Cell, AP Skills Fund, and statutory authorities.`}
          trailing={
            <>
              <StatusPill kind="verified" label="ALL VERIFIED" />
              <Button variant="secondary" size="sm">
                <Download className="h-3.5 w-3.5" strokeWidth={2} />
                EXPORT INDEX
              </Button>
            </>
          }
        />

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "flex items-center gap-2 border-[1.5px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-white"
                    : "border-[var(--border-soft)] bg-white text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
                )}
              >
                {f}
                <span
                  className={cn(
                    "font-mono text-[9px]",
                    active ? "text-white/70" : "text-[var(--text-3)]"
                  )}
                >
                  {counts[f] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Document grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doc, i) => (
            <DocumentCard key={doc.id} doc={doc} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </PortalShell>
  );
}

function DocumentCard({
  doc,
  delay = 0,
}: {
  doc: PortalDocument;
  delay?: number;
}) {
  const color = statusColor[doc.status] ?? "var(--text)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="flex flex-col border-2 border-[var(--border)] bg-white hover-brutal"
    >
      {/* PDF preview */}
      <div className="relative border-b-2 border-[var(--border)] bg-[#FAFAFB] p-5">
        <div className="absolute right-3 top-3 flex items-center gap-2 border-[1.5px] border-[var(--border-soft)] bg-white px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          <FileText className="h-3 w-3" strokeWidth={2} />
          {doc.size} · {doc.pages}P
        </div>
        <div className="mx-auto aspect-[3/4] max-h-[200px] w-full max-w-[160px] border-2 border-[var(--border)] bg-white p-3 shadow-[3px_3px_0_var(--border)]">
          <div className="border-b-2 border-[var(--border)] pb-1.5">
            <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              ASC · DISTRICT
            </div>
            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.04em] text-[var(--text)] leading-tight">
              {doc.title.length > 30
                ? doc.title.slice(0, 28) + "…"
                : doc.title}
            </div>
          </div>
          <p className="mt-2 line-clamp-6 font-mono text-[7px] leading-[1.5] text-[var(--text-2)]">
            {doc.preview}
          </p>
          <div className="mt-2 border-t border-[var(--border-soft)] pt-1.5 font-mono text-[6px] uppercase tracking-[0.18em] text-[var(--text-3)]">
            ASC · {doc.id}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {doc.type}
            </span>
            <h3 className="mt-1 font-display text-[15px] font-bold uppercase leading-tight tracking-[0.02em] text-[var(--text)]">
              {doc.title}
            </h3>
          </div>
          <span
            className="border-[1.5px] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ borderColor: color, color }}
          >
            {doc.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-[var(--border-soft)] pt-3">
          <Field k="ISSUED BY" v={doc.issuedBy} />
          <Field k="ISSUED ON" v={doc.issuedOn} />
          {doc.expiresOn && <Field k="EXPIRES" v={doc.expiresOn} />}
          {doc.signedBy && <Field k="SIGNED BY" v={doc.signedBy} mono />}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-t-2 border-[var(--border-soft)] bg-[#FAFAFB] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-[var(--text-3)] truncate">{doc.filename}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center border-[1.5px] border-[var(--border-soft)] text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
            aria-label="Open"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center border-[1.5px] border-[var(--border-soft)] text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
            aria-label="Download"
          >
            <Download className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.div>
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
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className={`text-[11px] text-[var(--text)] ${mono ? "font-mono" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}
