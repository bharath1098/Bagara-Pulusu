import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Send a compliment or a complaint to the owner of Bagara & Pulusu, Madhapur.",
  alternates: { canonical: "/feedback" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
