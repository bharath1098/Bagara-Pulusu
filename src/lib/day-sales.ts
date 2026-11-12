import { billableOrders, calculateBill } from "./bill";
import { CAFE } from "./cafe";
import { parseDayParam } from "./analytics";
import { getStore, isDineInSession } from "./store";
import type { CafeStore, OrderChannel, TableSession } from "./types";
import type { DaySalesBillRow, DaySalesReport } from "./day-sales-types";

export type {
  DaySalesBillRow,
  DaySalesChannelRow,
  DaySalesItemRow,
  DaySalesPaymentRow,
  DaySalesReport,
  DaySalesSummary,
} from "./day-sales-types";

const CHANNEL_LABELS: Record<OrderChannel, string> = {
  dine_in: "Dine-in",
  takeaway: "Takeaway",
  swiggy: "Swiggy",
  zomato: "Zomato",
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Cash",
  upi: "UPI",
  card: "Card",
};

function money(n: number) {
  return Math.round(n * 100) / 100;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function todayDayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDaysKey(dayKey: string, delta: number) {
  const base = parseDayParam(dayKey);
  if (!base) return dayKey;
  base.setDate(base.getDate() + delta);
  return todayDayKey(base);
}

function channelOf(session: TableSession): OrderChannel {
  return session.channel === "takeaway" ||
    session.channel === "swiggy" ||
    session.channel === "zomato"
    ? session.channel
    : "dine_in";
}

function timeLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function csvEscape(value: string | number) {
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function computeDaySalesReport(
  store: CafeStore,
  dateInput: string | null,
): DaySalesReport {
  const today = todayDayKey();
  let date = dateInput && parseDayParam(dateInput) ? dateInput! : today;
  if (date > today) date = today;

  const dayStart = parseDayParam(date)!;
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const tableById = new Map(store.tables.map((t) => [t.id, t]));
  const menuById = new Map(store.menu.map((m) => [m.id, m]));

  const paid = store.sessions
    .filter(
      (s) =>
        Boolean(s.paidAt) &&
        (Boolean(s.billNumber) || (s.channel != null && s.channel !== "dine_in")),
    )
    .map((session) => ({
      session,
      at: new Date(session.paidAt as string),
      bill: calculateBill(session, store.settings),
    }))
    .filter((p) => p.bill.grandTotal > 0 && p.at >= dayStart && p.at < dayEnd)
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  let revenue = 0;
  let plates = 0;
  let subtotal = 0;
  let discounts = 0;
  let serviceCharge = 0;
  let tax = 0;
  let roundOff = 0;

  const channelMap = new Map<
    OrderChannel,
    { bills: number; items: number; revenue: number }
  >();
  const paymentMap = new Map<string, { bills: number; revenue: number }>();
  const itemMap = new Map<
    string,
    { id: string; name: string; category: string; plates: number; revenue: number }
  >();

  const bills: DaySalesBillRow[] = [];

  for (const { session, bill } of paid) {
    const channel = channelOf(session);
    const total = bill.grandTotal;
    revenue += total;
    plates += bill.totalQty;
    subtotal += bill.subtotal;
    discounts += bill.discountValue;
    serviceCharge += bill.serviceCharge;
    tax += bill.taxTotal;
    roundOff += bill.roundOff;

    const ch = channelMap.get(channel) ?? { bills: 0, items: 0, revenue: 0 };
    ch.bills += 1;
    ch.items += bill.totalQty;
    ch.revenue += total;
    channelMap.set(channel, ch);

    if (channel === "dine_in" || channel === "takeaway") {
      const method = session.paymentMethod || "cash";
      const p = paymentMap.get(method) ?? { bills: 0, revenue: 0 };
      p.bills += 1;
      p.revenue += total;
      paymentMap.set(method, p);
    } else {
      const method = channel;
      const p = paymentMap.get(method) ?? { bills: 0, revenue: 0 };
      p.bills += 1;
      p.revenue += total;
      paymentMap.set(method, p);
    }

    const table = tableById.get(session.tableId);
    const paymentMethod =
      channel === "dine_in" || channel === "takeaway"
        ? session.paymentMethod || "cash"
        : channel;

    bills.push({
      billNumber: session.billNumber ? String(session.billNumber) : "—",
      paidAt: session.paidAt as string,
      timeLabel: timeLabel(session.paidAt as string),
      channel,
      channelLabel: CHANNEL_LABELS[channel],
      tableLabel: isDineInSession(session)
        ? table?.label || session.tableId.replace(/^bagara-/, "")
        : CHANNEL_LABELS[channel],
      paymentMethod,
      paymentLabel:
        PAYMENT_LABELS[paymentMethod] ||
        CHANNEL_LABELS[paymentMethod as OrderChannel] ||
        paymentMethod,
      itemCount: bill.totalQty,
      grandTotal: money(total),
    });

    for (const line of billableOrders(session.orders)) {
      const menu = menuById.get(line.menuItemId);
      const category = menu?.category || "Other";
      const lineRevenue = line.unitPrice * line.qty;
      const row = itemMap.get(line.menuItemId) ?? {
        id: line.menuItemId,
        name: line.name,
        category,
        plates: 0,
        revenue: 0,
      };
      row.plates += line.qty;
      row.revenue += lineRevenue;
      itemMap.set(line.menuItemId, row);
    }
  }

  const billCount = paid.length;

  return {
    cafeName: CAFE.name,
    date,
    generatedAt: new Date().toISOString(),
    summary: {
      revenue: money(revenue),
      bills: billCount,
      plates,
      avgBill: billCount ? money(revenue / billCount) : 0,
      subtotal: money(subtotal),
      discounts: money(discounts),
      serviceCharge: money(serviceCharge),
      tax: money(tax),
      roundOff: money(roundOff),
    },
    channels: (
      [
        ["dine_in", "Dine-in"],
        ["takeaway", "Takeaway"],
        ["swiggy", "Swiggy"],
        ["zomato", "Zomato"],
      ] as const
    )
      .map(([channel, label]) => {
        const v = channelMap.get(channel) ?? { bills: 0, items: 0, revenue: 0 };
        return {
          channel,
          label,
          bills: v.bills,
          items: v.items,
          revenue: money(v.revenue),
        };
      })
      .filter((c) => c.bills > 0),
    payments: [...paymentMap.entries()]
      .map(([method, v]) => ({
        method,
        label:
          PAYMENT_LABELS[method] ||
          CHANNEL_LABELS[method as OrderChannel] ||
          method,
        bills: v.bills,
        revenue: money(v.revenue),
      }))
      .sort((a, b) => b.revenue - a.revenue),
    bills,
    items: [...itemMap.values()]
      .map((i) => ({ ...i, revenue: money(i.revenue) }))
      .sort((a, b) => b.plates - a.plates || b.revenue - a.revenue),
  };
}

export async function getDaySalesReport(date: string | null) {
  return computeDaySalesReport(await getStore(), date);
}

export function daySalesToCsv(report: DaySalesReport) {
  const lines: string[] = [];
  const push = (cols: (string | number)[]) =>
    lines.push(cols.map(csvEscape).join(","));

  push(["Bagara & Pulusu — Day sales"]);
  push(["Date", report.date]);
  push(["Generated", report.generatedAt]);
  push([]);

  push(["SUMMARY"]);
  push(["Total secured", report.summary.revenue]);
  push(["Bills", report.summary.bills]);
  push(["Plates / items", report.summary.plates]);
  push(["Average bill", report.summary.avgBill]);
  push(["Subtotal", report.summary.subtotal]);
  push(["Discounts", report.summary.discounts]);
  push(["Service charge", report.summary.serviceCharge]);
  push(["Tax", report.summary.tax]);
  push(["Round off", report.summary.roundOff]);
  push([]);

  push(["CHANNELS"]);
  push(["Channel", "Bills", "Plates", "Revenue"]);
  for (const c of report.channels) {
    push([c.label, c.bills, c.items, c.revenue]);
  }
  push([]);

  push(["PAYMENTS"]);
  push(["Method", "Bills", "Revenue"]);
  for (const p of report.payments) {
    push([p.label, p.bills, p.revenue]);
  }
  push([]);

  push(["BILLS"]);
  push([
    "Bill no",
    "Time",
    "Channel",
    "Table / source",
    "Payment",
    "Plates",
    "Amount",
  ]);
  for (const b of report.bills) {
    push([
      b.billNumber,
      b.timeLabel,
      b.channelLabel,
      b.tableLabel,
      b.paymentLabel,
      b.itemCount,
      b.grandTotal,
    ]);
  }
  push([]);

  push(["ITEMS SOLD"]);
  push(["Item", "Category", "Plates", "Revenue"]);
  for (const i of report.items) {
    push([i.name, i.category, i.plates, i.revenue]);
  }

  return `${lines.join("\r\n")}\r\n`;
}

export { addDaysKey };
