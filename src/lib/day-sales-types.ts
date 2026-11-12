import type { OrderChannel } from "./types";

export type DaySalesBillRow = {
  billNumber: string;
  paidAt: string;
  timeLabel: string;
  channel: OrderChannel;
  channelLabel: string;
  tableLabel: string;
  paymentMethod: string;
  paymentLabel: string;
  itemCount: number;
  grandTotal: number;
};

export type DaySalesItemRow = {
  id: string;
  name: string;
  category: string;
  plates: number;
  revenue: number;
};

export type DaySalesPaymentRow = {
  method: string;
  label: string;
  bills: number;
  revenue: number;
};

export type DaySalesChannelRow = {
  channel: OrderChannel;
  label: string;
  bills: number;
  items: number;
  revenue: number;
};

export type DaySalesSummary = {
  revenue: number;
  bills: number;
  plates: number;
  avgBill: number;
  subtotal: number;
  discounts: number;
  serviceCharge: number;
  tax: number;
  roundOff: number;
};

export type DaySalesReport = {
  cafeName: string;
  date: string;
  generatedAt: string;
  summary: DaySalesSummary;
  channels: DaySalesChannelRow[];
  payments: DaySalesPaymentRow[];
  bills: DaySalesBillRow[];
  items: DaySalesItemRow[];
};
