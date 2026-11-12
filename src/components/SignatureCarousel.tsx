"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/slug";

const SIGNATURES = [
  {
    name: "Bagara",
    d: "Fragrant bagara rice tempered with spices and ghee.",
    category: "Rices",
    isVeg: true,
    price: 120,
  },
  {
    name: "Chepala Pulusu",
    d: "Tangy tamarind fish pulusu — our other namesake.",
    category: "Curries & Pulusu",
    isVeg: false,
    price: 280,
  },
  {
    name: "Chicken Fry",
    d: "Crispy Andhra chicken fry for the middle of the table.",
    category: "Frys",
    isVeg: false,
    price: 220,
  },
  {
    name: "Mix Thali",
    d: "Rice with chicken, fish, boti, liver — the full spread.",
    category: "Thalis",
    isVeg: false,
    price: 449,
  },
].map((s) => ({ ...s, href: `/menu/${slugify(s.name)}` }));

/** Horizontal house-signature strip (replaces Lunar moon dial). */
export function SignatureCarousel() {
  return (
    <section className="bp-plates" aria-label="House signatures">
      <div className="wrap">
        <div className="bp-plates-head">
          <span className="eyebrow">From the chulha</span>
          <h2 className="h-display h-lg">House signatures</h2>
          <p className="bp-lede">
            Four plates that carry Andhra home cooking — rice, pulusu, fry, and thali.
          </p>
        </div>
        <div className="bp-plates-track">
          {SIGNATURES.map((s, i) => (
            <Link key={s.name} href={s.href} className="bp-plate-card">
              <span className="bp-plate-n">{String(i + 1).padStart(2, "0")}</span>
              <span className={s.isVeg ? "bp-tag is-veg" : "bp-tag is-nonveg"}>
                {s.isVeg ? "Veg" : "Non-veg"}
              </span>
              <h3>{s.name}</h3>
              <p>{s.d}</p>
              <span className="bp-plate-foot">
                <b>₹{s.price}</b>
                <span>
                  View <ArrowRight size={14} />
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/menu" className="bp-text-link">
          Full menu <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
