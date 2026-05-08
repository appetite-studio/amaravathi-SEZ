"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusPill } from "@/components/ui/status-pill";
import { DistrictSeal } from "@/components/ui/district-seal";
import { setSession, type Session } from "@/lib/store";
import { simulate } from "@/lib/simulate";
import { IMG_LOGIN_SPLIT } from "@/lib/images";

const presets: Record<
  Session["role"],
  Omit<Session, "loggedInAt"> & { destination: string; previewLine: string }
> = {
  Founder: {
    name: "Diya Rajiv",
    role: "Founder",
    company: "Neon AI Systems",
    email: "diya@neon.ai",
    destination: "/app/identity",
    previewLine: "DIYA RAJIV · FOUNDER",
  },
  Company: {
    name: "Neon AI Systems",
    role: "Company",
    company: "Neon AI Systems · Pvt Ltd",
    email: "ops@neon.ai",
    destination: "/company/overview",
    previewLine: "NEON AI · COMPANY",
  },
  Government: {
    name: "Department of IT, AP",
    role: "Government",
    company: "Government of Andhra Pradesh",
    email: "preview@ap.gov.in",
    destination: "/govt/overview",
    previewLine: "DEPT. OF IT · GOVT PREVIEW",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Session["role"]>("Founder");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await simulate(600, 900);
    const preset = presets[role];
    setSession({
      name: preset.name,
      role: preset.role,
      company: preset.company,
      email: preset.email,
      loggedInAt: new Date().toISOString(),
    });
    router.push(preset.destination);
  };

  const preset = presets[role];

  return (
    <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 lg:grid-cols-[1fr_0.9fr]">
      {/* Left pane - cinematic image */}
      <div className="relative hidden border-r-2 border-[var(--border)] bg-[var(--header-dark)] lg:block">
        <Image
          src={IMG_LOGIN_SPLIT}
          alt="Amaravati district at dusk"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b-2 border-white/20 bg-black/40 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          <span className="flex items-center gap-2">
            <DistrictSeal size={18} className="text-[var(--accent)]" />
            ASC · DISTRICT 01
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            SECURE CHANNEL
          </span>
        </div>
        <div className="absolute inset-x-6 bottom-8 flex flex-col gap-5">
          <div className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.01em] text-white">
            &ldquo;The district is built so a founder anywhere in the world can
            arrive in two weeks and ship something local in two months.&rdquo;
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
            DEPT. OF IT · GOVT OF ANDHRA PRADESH · 2026
          </div>
        </div>
      </div>

      {/* Right pane - login card */}
      <div className="flex items-center justify-center bg-white px-6 py-16 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="border-2 border-[var(--border)] bg-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--border)] bg-[var(--accent)] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <DistrictSeal size={22} className="text-white" />
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
                    Amaravati · Startup Capital
                  </span>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-[0.18em]">
                    District Console · Login
                  </span>
                </div>
              </div>
              <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
            </div>

            <div className="flex flex-col gap-6 p-7">
              <div className="flex flex-col gap-2">
                <div className="label">[ SECURE LOGIN · LOCAL SESSION ]</div>
                <h1 className="font-display text-[28px] font-bold leading-tight tracking-[-0.01em]">
                  Access the district.
                </h1>
                <p className="text-[13px] text-[var(--text-2)]">
                  Choose your role.
                </p>
              </div>

              <Tabs
                value={role}
                onValueChange={(v) => setRole(v as Session["role"])}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="Founder" className="flex-1">
                    FOUNDER
                  </TabsTrigger>
                  <TabsTrigger value="Company" className="flex-1">
                    COMPANY
                  </TabsTrigger>
                  <TabsTrigger value="Government" className="flex-1">
                    GOVT PREVIEW
                  </TabsTrigger>
                </TabsList>

                {(["Founder", "Company", "Government"] as const).map((r) => (
                  <TabsContent key={r} value={r}>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                      <Field label="EMAIL" defaultValue={preset.email} />
                      <Field
                        label="ACCESS KEY"
                        defaultValue="••••••••••••"
                        type="password"
                      />

                      <div className="flex items-center justify-between border-2 border-[var(--border-soft)] bg-[var(--accent-soft)] p-3">
                        <div className="flex flex-col">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                            IDENTITY
                          </div>
                          <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                            {preset.previewLine}
                          </div>
                        </div>
                        <StatusPill kind="verified" label="PREFILLED" />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        disabled={submitting}
                        className="mt-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            VERIFYING…
                          </>
                        ) : (
                          <>
                            CONTINUE
                            <ArrowRight className="h-4 w-4" strokeWidth={2} />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="flex items-center justify-between border-t-2 border-[var(--border-soft)] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                <span>NO ACCOUNT?</span>
                <Link
                  href="/"
                  className="text-[var(--text)] hover:text-[var(--accent)]"
                >
                  REQUEST RESIDENCY →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            <span>DEPT. OF IT · GOVT OF ANDHRA PRADESH · 2026</span>
            <span>SESSION · LOCAL ONLY</span>
            <span>ASC · DISTRICT 01</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label">{label}</span>
      <input
        {...props}
        className="border-2 border-[var(--border)] bg-white px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0"
      />
    </label>
  );
}
