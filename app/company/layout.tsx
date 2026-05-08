import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Company Portal",
    template: "%s · Company Portal",
  },
  description:
    "District Operations Console for companies registered inside Amaravati Startup Capital.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return children;
}
