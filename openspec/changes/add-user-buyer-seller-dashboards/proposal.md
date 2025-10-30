## Why
Users need a consolidated place to monitor their activity. Buyers require visibility into active bids, wins, and payment status. Sellers need insight into current listings, sold items, and revenue. Both parties benefit from a unified transaction history with downloadable receipts.

## What Changes
- Add Buyer Dashboard: active bids, won auctions, payment status
- Add Seller Dashboard: current listings, sold items, revenue stats
- Add User History: unified transaction history with downloadable receipts
- Navigation entry points from public layout; protected routes under user area

## Impact
- Affected specs: `dashboards`, `transactions`
- Affected code: routing (`src/routes/routes.ts`), pages under `src/pages`, hooks under `src/hooks`, API layer in `src/services`
- Non-breaking: new routes and components; existing behavior unchanged

## Notes
- Exact API endpoints and payloads to be aligned with backend; mock or adapt in hooks if not yet available


