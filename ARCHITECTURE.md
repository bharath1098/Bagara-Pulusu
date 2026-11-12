# Bagara & Pulusu — Frozen Architecture

## Product surfaces
1. Public marketing site (no prices on menu)
2. Table QR ordering (`/t/bagara-I1`, `/t/bagara-O1`, …)
3. Staff consoles: Owner, Reception, Waiter, Kitchen

## Tables
- Indoor: `bagara-I1` … `bagara-I5`
- Outdoor: `bagara-O1` … `bagara-O15`
- Stable QR URL never changes; server decides new session vs join-with-code

## Session security
- First scanner = host + 6-digit group code
- Others must enter code
- Closed/paid sessions cannot be hijacked by old bookmarks
- Host leave → longest-joined member becomes host
- Staff can regenerate code / force close

## Order pipeline
Customer place → `pending_approval` → Waiter/Reception approve → Kitchen `queued` → `preparing` → `ready` → `served`  
Reject includes in-app reason. New token per order batch.

## Bill formula
1. Subtotal  
2. Discount (% and/or ₹)  
3. Service OP = 5% × original subtotal (default ON; removable)  
4. CGST 2.5% + SGST 2.5% on `(subtotal − discount + service)`  
5. Round off → Grand total ₹  

## Loyalty
- Join by phone · welcome +100 points  
- Earn 1 point / ₹100 paid  
- Redeem 100 points = ₹50 (Owner/Reception)

## Reservations
- Free booking · no fixed table advance · assign on arrival

## Feedback
- Customer submit → Owner inbox → publish or veto from public site

## Stack (v1)
Next.js App Router + libSQL (`data/bagara.db` locally, Turso in production).  
`cafe_id` ready for multi-branch later.
