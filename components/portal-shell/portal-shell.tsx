"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ToastProvider } from "@/components/ui/toaster";
import { PortalSidebar } from "@/components/portal-shell/portal-sidebar";
import { PortalTopbar } from "@/components/portal-shell/portal-topbar";
import { PortalMetricsBar } from "@/components/portal-shell/portal-metrics-bar";
import { PortalBottomNav } from "@/components/portal-shell/portal-bottom-nav";
import { PortalMobileMenu } from "@/components/portal-shell/portal-mobile-menu";
import { getSession, type Session } from "@/lib/store";

type Variant = "company" | "govt";

const requiredRole: Record<Variant, Session["role"]> = {
  company: "Company",
  govt: "Government",
};

export function PortalShell({
  variant,
  activityPanel,
  children,
}: {
  variant: Variant;
  activityPanel?: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    if (session.role !== requiredRole[variant]) {
      router.replace("/login");
    }
  }, [router, variant]);

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#FAFAFB]">
        <PortalSidebar variant={variant} />

        <div className="flex min-h-screen flex-1 flex-col">
          <PortalTopbar
            variant={variant}
            onMenuOpen={() => setMobileMenuOpen(true)}
          />
          <PortalMetricsBar variant={variant} />

          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto bg-white pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            {activityPanel}
          </div>
        </div>

        <PortalBottomNav
          variant={variant}
          onMoreClick={() => setMobileMenuOpen(true)}
        />
        <PortalMobileMenu
          variant={variant}
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        />
      </div>
    </ToastProvider>
  );
}
