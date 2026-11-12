import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Banana-leaf thalis, chulha cooking and the Andhra dishes guests come back for at Bagara & Pulusu, Madhapur.",
  alternates: { canonical: "/gallery" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
