# Bagara & Pulusu

End-to-end restaurant platform for **Bagara & Pulusu** (Madhapur, Hyderabad): public website, QR table ordering with group codes, staff roles, kitchen board, billing, loyalty, reservations, and owner stats.

Same stack and integrations as Lunar Cafe: Next.js App Router, libSQL/Turso, staff HMAC sessions, UTM logging, SEO (sitemap/robots/JSON-LD).

## Quick start

```bash
cd C:\Users\admin\bagara-pulusu
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo logins

| Role | Email | Password |
|------|-------|----------|
| Owner | owner@bagarapulusu.com | owner123 |
| Reception | reception@bagarapulusu.com | reception123 |
| Waiter | waiter1@bagarapulusu.com | waiter123 |
| Kitchen | kitchen@bagarapulusu.com | kitchen123 |

## Try ordering

1. Open `/t/bagara-I1` on phone A → become host (note group code)
2. Open `/t/bagara-I1` on phone B → enter group code
3. Add items → Place order
4. Staff → Approvals → approve → Kitchen board
5. Reception → Bills → pay / print thermal layout

## Key routes

- `/` public home
- `/menu` menu without prices
- `/reserve` `/loyalty` `/feedback` `/contact`
- `/t/[tableId]` QR join
- `/order/[sessionId]` live ordering
- `/staff` staff console
- `/staff/bill/[sessionId]` digital + thermal print bill

See `ARCHITECTURE.md` for the frozen blueprint.
