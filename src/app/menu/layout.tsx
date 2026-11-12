import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Menu",
    template: "%s · Bagara & Pulusu",
  },
  description:
    "Coffee, mocktails, pizzas, pastas and plates at Bagara & Pulusu, Madhapur. Browse the menu before you visit.",
  alternates: { canonical: "/menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
