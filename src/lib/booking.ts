// Single source of truth for booking helpers lives in `lib/booking.mjs` so the
// node test runner can exercise it directly. This module is the typed entry
// point for the app.
export { getDestination, resolveBranchId } from '../../lib/booking.mjs';
