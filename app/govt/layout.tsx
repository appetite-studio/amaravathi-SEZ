import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "District Administration",
    template: "%s · District Administration",
  },
  description:
    "Cross-tenant administrative oversight for Amaravati Startup Capital · Department of IT, Govt of Andhra Pradesh.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function GovtLayout({ children }: { children: ReactNode }) {
  return children;
}
