"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusPill } from "@/components/ui/status-pill";
import { notifications } from "@/lib/data";

const kindMap: Record<
  string,
  "approved" | "verified" | "policy" | "event" | "new"
> = {
  approved: "approved",
  verified: "verified",
  policy: "policy",
  event: "event",
  new: "new",
};

export function NotificationsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <div className="label">[ DISTRICT NOTIFICATIONS ]</div>
          <SheetTitle>Inbox · 6 unread</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-3 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="border-2 border-[var(--border)] bg-white p-4 hover-brutal"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {n.title}
                </div>
                <StatusPill kind={kindMap[n.kind] ?? "new"} />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-2)]">
                {n.body}
              </p>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                {n.timestamp}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
