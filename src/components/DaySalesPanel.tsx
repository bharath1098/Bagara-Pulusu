"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Banknote,
  CalendarDays,
  Download,
  Printer,
  RefreshCw,
  UtensilsCrossed,
} from "lucide-react";
import { NeoButton } from "@/components/Neo";
import { formatMoney } from "@/lib/cafe";
import type { DaySalesReport } from "@/lib/day-sales-types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayDayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDaysKey(dayKey: string, delta: number) {
  const [y, m, d] = dayKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + delta);
  return todayDayKey(date);
}

function formatDayLabel(dayKey: string) {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DaySalesPanel() {
  const today = todayDayKey();
  const yesterday = addDaysKey(today, -1);
  const [date, setDate] = useState(today);
  const [report, setReport] = useState<DaySalesReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (day: string) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/staff/sales?date=${encodeURIComponent(day)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load sales");
      setReport(data as DaySalesReport);
    } catch (e) {
      setReport(null);
      setError(e instanceof Error ? e.message : "Could not load sales");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void load(date);
  }, [date, load]);

  async function downloadCsv() {
    const res = await fetch(
      `/api/staff/sales?date=${encodeURIComponent(date)}&format=csv`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "CSV download failed");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bagara-pulusu-sales-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printPdf() {
    document.title = `bagara-pulusu-sales-${date}`;
    window.print();
  }

  return (
    <div className="day-sales">
      <div className="day-sales-toolbar no-print">
        <div className="day-sales-date-row">
          <label className="day-sales-date-field">
            <CalendarDays size={16} aria-hidden />
            <span>Date</span>
            <input
              type="date"
              max={today}
              value={date}
              onChange={(e) => setDate(e.target.value || today)}
            />
          </label>
          <NeoButton
            variant="ghost"
            className="btn-sm"
            onClick={() => setDate(today)}
            disabled={date === today}
          >
            Today
          </NeoButton>
          <NeoButton
            variant="ghost"
            className="btn-sm"
            onClick={() => setDate(yesterday)}
            disabled={date === yesterday}
          >
            Yesterday
          </NeoButton>
          <NeoButton
            variant="ghost"
            className="btn-sm"
            onClick={() => void load(date)}
            disabled={busy}
          >
            <RefreshCw size={15} />
            Refresh
          </NeoButton>
        </div>
        <div className="day-sales-actions">
          <NeoButton
            variant="ghost"
            className="btn-sm"
            onClick={() => void downloadCsv()}
            disabled={!report || busy}
          >
            <Download size={15} />
            Download CSV
          </NeoButton>
          <NeoButton
            className="btn-sm"
            onClick={printPdf}
            disabled={!report || busy}
          >
            <Printer size={15} />
            Print / Save PDF
          </NeoButton>
        </div>
      </div>

      {error && <p className="order-notice no-print">{error}</p>}
      {busy && !report && <p className="muted">Loading day sales…</p>}

      {report && (
        <div className="day-sales-print">
          <header className="day-sales-print-head">
            <div>
              <p className="day-sales-kicker">Daily sales report</p>
              <h2>{report.cafeName}</h2>
              <p className="muted">{formatDayLabel(report.date)}</p>
            </div>
            <p className="day-sales-print-meta muted">
              Generated{" "}
              {new Date(report.generatedAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </header>

          <div className="day-sales-kpis">
            <div className="day-sales-kpi">
              <span>Total secured</span>
              <strong>{formatMoney(report.summary.revenue)}</strong>
            </div>
            <div className="day-sales-kpi">
              <span>Bills</span>
              <strong>{report.summary.bills}</strong>
            </div>
            <div className="day-sales-kpi">
              <span>Plates sold</span>
              <strong>{report.summary.plates}</strong>
            </div>
            <div className="day-sales-kpi">
              <span>Avg bill</span>
              <strong>{formatMoney(report.summary.avgBill)}</strong>
            </div>
          </div>

          <div className="day-sales-grid">
            <section className="day-sales-card">
              <h3>
                <Banknote size={16} aria-hidden /> Payments
              </h3>
              {report.payments.length === 0 ? (
                <p className="muted">No payments this day.</p>
              ) : (
                <table className="day-sales-table">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Bills</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.payments.map((p) => (
                      <tr key={p.method}>
                        <td>{p.label}</td>
                        <td>{p.bills}</td>
                        <td>{formatMoney(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section className="day-sales-card">
              <h3>
                <UtensilsCrossed size={16} aria-hidden /> Channels
              </h3>
              {report.channels.length === 0 ? (
                <p className="muted">No channel sales this day.</p>
              ) : (
                <table className="day-sales-table">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      <th>Bills</th>
                      <th>Plates</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.channels.map((c) => (
                      <tr key={c.channel}>
                        <td>{c.label}</td>
                        <td>{c.bills}</td>
                        <td>{c.items}</td>
                        <td>{formatMoney(c.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>

          <section className="day-sales-card">
            <h3>Money breakdown</h3>
            <table className="day-sales-table">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{formatMoney(report.summary.subtotal)}</td>
                </tr>
                <tr>
                  <td>Discounts</td>
                  <td>{formatMoney(report.summary.discounts)}</td>
                </tr>
                <tr>
                  <td>Service charge</td>
                  <td>{formatMoney(report.summary.serviceCharge)}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>{formatMoney(report.summary.tax)}</td>
                </tr>
                <tr>
                  <td>Round off</td>
                  <td>{formatMoney(report.summary.roundOff)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total secured</strong>
                  </td>
                  <td>
                    <strong>{formatMoney(report.summary.revenue)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="day-sales-card">
            <h3>Bills ({report.bills.length})</h3>
            {report.bills.length === 0 ? (
              <p className="muted">No paid bills on this day.</p>
            ) : (
              <div className="day-sales-table-wrap">
                <table className="day-sales-table">
                  <thead>
                    <tr>
                      <th>Bill</th>
                      <th>Time</th>
                      <th>Source</th>
                      <th>Payment</th>
                      <th>Plates</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.bills.map((b, i) => (
                      <tr key={`${b.billNumber}-${b.paidAt}-${i}`}>
                        <td>{b.billNumber}</td>
                        <td>{b.timeLabel}</td>
                        <td>
                          {b.tableLabel}
                          {b.channel !== "dine_in" ? ` · ${b.channelLabel}` : ""}
                        </td>
                        <td>{b.paymentLabel}</td>
                        <td>{b.itemCount}</td>
                        <td>{formatMoney(b.grandTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="day-sales-card">
            <h3>Items sold ({report.items.length})</h3>
            {report.items.length === 0 ? (
              <p className="muted">No items sold on this day.</p>
            ) : (
              <div className="day-sales-table-wrap">
                <table className="day-sales-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Plates</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.plates}</td>
                        <td>{formatMoney(item.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
