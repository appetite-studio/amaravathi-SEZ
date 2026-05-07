"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppTopbar } from "@/components/app-topbar";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { MetricsBar } from "@/components/ui/metrics-bar";
import { NotificationsSheet } from "@/components/notifications-sheet";
import { ToastProvider } from "@/components/ui/toaster";
import { metrics } from "@/lib/data";
import { getSession } from "@/lib/store";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-bg">
        <AppTopbar onOpenNotifications={() => setNotifOpen(true)} />
        <MetricsBar items={metrics.topbar} />
        <main className="flex-1 pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto max-w-[1280px] px-8 py-12"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <AppBottomNav />
        <NotificationsSheet open={notifOpen} onOpenChange={setNotifOpen} />
      </div>
    </ToastProvider>
  );
}
