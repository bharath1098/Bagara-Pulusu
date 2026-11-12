import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Staff sign in · Bagara & Pulusu" },
  description: "Sign in to the Bagara & Pulusu floor tools.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
