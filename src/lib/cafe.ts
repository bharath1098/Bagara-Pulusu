export const CAFE = {
  id: "bagara-pulusu-hyd",
  name: "Bagara & Pulusu",
  tagline: "Traditional Andhra rice, fiery fries, and slow-cooked pulusu.",
  baristaTagline: "From the chulha to your table.",
  addressLines: [
    "Road no 7, Jubilee Hills",
    "Bhavani Nagar, HYD-500045",
  ],
  city: "Hyderabad",
  phone: "081792 28935",
  phoneDisplay: "+91 81792 28935",
  email: "hello@bagarapulusu.com",
  updated: "12 November 2026",
  upiId: "bagarapulusu@upi",
  gstin: "36AAAAA0000A1Z5",
  hours: "11:00 AM – 11:30 PM",
  hoursStart: "11:00",
  hoursEnd: "23:30",
  mapsQuery: "Bagara & Pulusu Jubilee Hills Hyderabad",
  zomatoUrl: "https://www.zomato.com/hyderabad/bagara-pulusu-jubilee-hills",
  swiggyUrl:
    "https://www.swiggy.com/restaurants/hyderabad/jubilee-hills/bagara-pulusu",
  districtUrl:
    "https://www.district.in/dining/hyderabad/bagara-pulusu-jubilee-hills",
  colors: {
    mint: "#B53A1A",
    sage: "#5C3A1E",
    cream: "#F3EBE0",
    ink: "#1C1009",
    gold: "#B53A1A",
    moon: "#FAF6F0",
  },
} as const;

export const LOCALES = [
  { code: "en", label: "English", name: "English" },
  { code: "hi", label: "हिन्दी", name: "Hindi" },
  { code: "te", label: "తెలుగు", name: "Telugu" },
] as const;

/** Display-only conversion from the base currency (INR). Bills are always charged in ₹. */
export const CURRENCIES = [
  { code: "INR", symbol: "₹", rate: 1, label: "INR", name: "Indian Rupee" },
  { code: "USD", symbol: "$", rate: 0.012, label: "USD", name: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.011, label: "EUR", name: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.0094, label: "GBP", name: "British Pound" },
  { code: "AED", symbol: "د.إ", rate: 0.044, label: "AED", name: "UAE Dirham" },
  { code: "AUD", symbol: "A$", rate: 0.018, label: "AUD", name: "Australian Dollar" },
] as const;

export function formatMoney(
  amountInr: number,
  currencyCode: string = "INR",
): string {
  const currency =
    CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  const value = amountInr * currency.rate;
  if (currency.code === "INR") {
    return `₹${value.toFixed(2)}`;
  }
  return `${currency.symbol}${value.toFixed(2)}`;
}
