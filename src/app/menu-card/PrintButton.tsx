"use client";

export function PrintButton() {
  return (
    <button type="button" className="mc-print" onClick={() => window.print()}>
      Print / Save as PDF
    </button>
  );
}
