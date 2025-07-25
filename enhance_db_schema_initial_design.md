Normalize Inventory Tables

Recommended inventory_movements Schema

- inventory_movements
  - id
  - product_id
  - warehouse_id
  - quantity
  - movement_type // in, out, transfer, return, adjustment
  - uom // unit of measurement (pc, bxs, kg, lb, mt)
  - batch_code // Optional, for traceability
  - expiration_date // For perishables item
  - movement_date
  - order_id // Optional, link to sales or purchase order
  - created_at
  - updated_at
  - encoded_by // user who encoded the record
--------------------------------------------------------------------------------------

This table could be:
Refreshed via triggers or materialized view or view, if performance matters.
Used to avoid repeated SUM(quantity) queries across large movement logs.

- products_stocks
   - product_id
   - warehouse_id
   - quantity
   - uom
   - created_at
   - updated_at
   - encoded_by

Good Practices
Immutable movements: Treat movement logs like event sourcing don't update them, just append new ones.
Separation of concerns: Don't mix config (thresholds, batch rules) into movement rows.
Archival plan: Partition by product_id, location_id, or month for performance on large datasets.
-----------------------------------------------------------------------------------------

How reserved_stock Might Be Computed
Based on movement types (or auxiliary reservation logic). Here's a concept breakdown:

- reserved_stock
 - id	// Primary key
 - product_id	// Reference to stock item
 - reservable_id	// Polymorphic key
 - reservable_type	// Polymorphic type (cart, preoprder, user_hold, voucher, order, campaign, etc...)
 - reservation_type	// Describes the type explicitly
 - quantity	//	Number of units reserved
 - status	string	pending, confirmed, expired, etc.
 - expires_at	// Optional expiration
 - created_at	// Audit trail

Alternatively, reserved_stock could be computed from a separate stock_reservations table if you want explicit linkage to users, carts, or session contexts. That gives you more control over hold expiration, user actions, and queueing.
------------------------------------------------------------------------------------------

- products
  - id
  - name
  - description
  - uom
  - created_at
  - updated_at
  - encoded_by
------------------------------------------------------------------------------------------

- warehouses
  - id
  - name
  - description
  - location