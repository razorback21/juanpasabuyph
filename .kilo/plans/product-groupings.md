# Product Groupings Feature

## Context
Admin needs to manually link existing products as "grouped" variants (e.g., same product in different sizes/colors that are stored as separate products). These grouped products should appear on the customer-facing product detail page below the description, above the existing "Related Products" section.

## Key Design Decisions

### Storage: Pairwise pivot table
- Table: `product_groupings` with `product_id`, `grouped_product_id`, unique pair constraint.
- **Bidirectional by default**: When admin links A↔B, two rows are stored (A→B and B→A). This keeps queries simple — just `WHERE product_id = ?` — and ensures both products show each other without UNION queries.
- Self-grouping prevented via CHECK constraint (`product_id != grouped_product_id`).
- Tradeoff: For a group of N products, N×(N-1) rows are stored. Acceptable for small groups (2-5 products typical in ecommerce variant sets). If groups grow large in the future, migrate to a `product_groups` identifier table.

### Admin UX
- "Add Variant" button opens a `ProductGroupingDialog` with a searchable checkbox list of all products (excluding current product and already-grouped ones).
- Selected products are saved via `PUT /products/{product}/groupings` — idempotent full replacement of the grouping set.
- Grouped products display as compact cards in the Variants section with a remove (X) button per card.
- Remove triggers the same PUT endpoint with the product removed from the set.

### Store UX
- Grouped products render **inside the right-column product card**, between the description (line 119) and the price/add-to-cart section (line 120). This places variants in the purchase decision flow — customers see alternatives before committing.
- Displays as a horizontal scrollable row of compact product cards (thumbnail, name, price, clickable link to that product's page).
- Title: "Also Available" or "Other Variants".
- Disabled grouped products are filtered out on the store side.
- If no active grouped products exist, the section is hidden entirely.

### Data Loading
- **Admin Show page** (`ProductController@show`): Eager load `groupedProducts` with `media`. Pass a lightweight `allProducts` list (id, name, slug, price, thumbnail_url) for the dialog picker.
- **Store Item page** (`CatalogController@item`): Eager load `groupedProducts` with `media` and `category`. Filter out disabled products. Pass as `groupedProducts` prop.

## Tasks

### Backend
1. **Migration**: Create `product_groupings` table.
   - Columns: `id`, `product_id` (FK→products), `grouped_product_id` (FK→products), `timestamps`.
   - Unique index on `(product_id, grouped_product_id)`.
   - CHECK constraint: `product_id != grouped_product_id`.
   - Cascade deletes **only the pivot rows** when a product is deleted. The linked products themselves are never deleted — only the association is removed. Both FKs cascade independently so deleting product A removes all rows where A appears in either column.

2. **Product model** (`app/Models/Product.php`):
   - Add `groupedProducts()`: `belongsToMany(Product::class, 'product_groupings', 'product_id', 'grouped_product_id')->withTimestamps()`.
   - Add `groupingOf()`: reverse relationship (`belongsToMany` with swapped keys).

3. **ProductController@show** (`app/Http/Controllers/ProductController.php`):
   - Eager load `groupedProducts.media` on the product.
   - Pass `allProducts` as lightweight array: `Product::where('id', '!=', $product->id)->select('id','name','slug','price')->with('media')->get()->map(...)` with thumbnail_url appended.

4. **New route + controller action** for updating groupings:
   - `PUT /products/{product}/groupings` → `ProductController@updateGroupings`.
   - Validates input: `grouped_product_ids` array of existing product IDs, excludes current product.
   - Syncs the bidirectional relationship: `$product->groupedProducts()->sync($ids)` plus reverse sync.
   - Redirects back to `products.show` with flash message.

5. **CatalogController@item** (`app/Http/Controllers/CatalogController.php`):
   - Eager load `groupedProducts` with `media` and `category`.
   - Filter: `->where('disabled', false)`.
   - Pass as `groupedProducts` prop.

### Frontend
6. **ProductGroupingDialog component** (`resources/js/components/ProductGroupingDialog.jsx`):
   - Uses `GenericDialog` wrapper pattern (or raw shadcn Dialog).
   - Contains: search input (text filter), scrollable checkbox list of products (name, price, thumbnail), selected count badge.
   - Props: `products` (full list), `selectedIds` (current grouping), `onSave(ids)` callback.
   - Posts via `router.put(route('product.groupings.update', product), { grouped_product_ids: selectedIds })`.

7. **Admin Products/Show.jsx** (`resources/js/Pages/Products/Show.jsx`):
   - Enable the "Add Variant" button.
   - Wire click to open `ProductGroupingDialog`.
   - Replace empty state with grouped product cards: thumbnail, name, price, remove button.
   - Remove button calls the same PUT endpoint with the ID removed from the set.

8. **Store Catalog/Item.jsx** (`resources/js/Pages/Store/Catalog/Item.jsx`):
   - Add `groupedProducts` to destructured props.
   - Render a horizontal scrollable row of grouped product cards **inside** the right-column product card (between description at line 119 and price section at line 120).
   - Each card: thumbnail, name, price, clickable to that product's detail page.
   - Title: "Also Available". Only render if `groupedProducts.length > 0`.

## Files to Create/Modify
| File | Action |
|------|--------|
| `database/migrations/xxxx_create_product_groupings_table.php` | Create |
| `app/Models/Product.php` | Add relationships |
| `app/Http/Controllers/ProductController.php` | Modify show(), add updateGroupings() |
| `app/Http/Controllers/CatalogController.php` | Modify item() |
| `routes/web.php` | Add PUT route |
| `resources/js/components/ProductGroupingDialog.jsx` | Create |
| `resources/js/Pages/Products/Show.jsx` | Modify variants section |
| `resources/js/Pages/Store/Catalog/Item.jsx` | Add grouped products row inside product card |

## Rollback
- Drop `product_groupings` migration.
- Remove relationship methods from Product model.
- Remove `updateGroupings` from ProductController.
- Remove route from web.php.
- Delete ProductGroupingDialog component.
- Revert Show.jsx and Item.jsx changes.
