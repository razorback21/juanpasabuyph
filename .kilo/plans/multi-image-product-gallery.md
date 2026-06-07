# Multi-Image Product Gallery Plan

## Goal
Allow multiple images per product with a gallery on the product detail page, while preserving existing single-image behavior for product listings.

---

## Current State — Two Parallel Image Systems

### System 1: Spatie MediaLibrary (ACTIVE)
- `StoreProductImage` action → collection `product_feature_image` → `media` table
- All 5 accessors (`featured_image_url`, `medium_image_url`, etc.) read from Spatie
- `ProductController::destroy()` clears Spatie collection before deleting product
- Conversions: thumb(150), small(250), medium(450), large(800), xlarge(1080), facebook(1200×630) — all WebP

### System 2: Legacy File Storage (DEAD CODE)
- `UploadFeaturedImage`, `UploadSocialMediaImage`, `ConventToWebp`, `ProductFileUploadService`, `ImageUploadServiceResolver`
- Stores to `storage/app/public/products/` as WebP, writes to `featured_image`/`socialmedia_image` DB columns
- Controller code that used this is **commented out** (`ProductImageController` lines 22-31)
- The `featured_image` and `socialmedia_image` DB columns exist but are **never populated** by active code

### Key Decision: Consolidate on Spatie MediaLibrary
- All new gallery work uses Spatie only
- Legacy system left as-is (separate cleanup task)
- The unused `featured_image`/`socialmedia_image` columns are ignored

### Other Findings
- `StoreProductImage` calls `clearMediaCollection()` then `addMediaFromRequest()` then `unlink()` the original — the `unlink()` is intentional (Spatie keeps its own copy)
- `Lightbox.jsx` already wraps `fslightbox-react` and accepts `sources` as an array
- `CatalogController` and `HomeController` don't eager-load `media` — N+1 already exists
- No image-related tests exist
- `CataglogService` (typo in name) handles catalog pagination — also no eager-load

---

## Scope
- Gallery upload (multiple images per product)
- New `gallery_images` accessor on Product model
- Frontend gallery on product detail page using existing `Lightbox` component
- Admin UI to upload/delete gallery images + set featured
- Keep existing `medium_image_url` / `featured_image_url` behavior for listings
- Add `featured_media_id` column to explicitly mark the featured image
- Fix existing N+1 issues with eager-loading

---

## Backend Design — Image Management

### Data Model

```
products table:
  id, name, description, price, ...
  featured_media_id  (NEW — FK to media.id, nullable)
  featured_image     (UNUSED — legacy, ignore)
  socialmedia_image  (UNUSED — legacy, ignore)

media table (Spatie):
  id, model_type, model_id, collection_name, ...
  model_type = 'App\Models\Product'
  collection_name = 'product_feature_image'
```

### Upload Flow

```
POST /productimages/upload-gallery/{product}
  ↓ validate (images[], max 8 total including existing)
  ↓ loop each file:
      StoreProductGalleryImage::handle($product, $file)
        → $product->addMedia($file)->toMediaCollection('product_feature_image')
        → unlink original upload (Spatie keeps its copy)
  ↓ if product.featured_media_id is null → auto-set to first uploaded media
  ↓ return JSON { gallery_images: [...], featured_media_id: ... }
```

### Delete Flow

```
DELETE /productimages/{product}/{mediaId}
  ↓ find media by ID, verify model_id === product.id
  ↓ if media.id === product.featured_media_id:
      → find next media in collection (by ID, excluding deleted)
      → set product.featured_media_id = next or null
  ↓ $media->delete()  (Spatie handles file + conversions cleanup)
  ↓ save product if featured changed
  ↓ return JSON { gallery_images: [...], featured_media_id: ... }
```

### Set Featured Flow

```
PUT /productimages/{product}/featured/{mediaId}
  ↓ find media by ID, verify model_id === product.id AND collection === 'product_feature_image'
  ↓ product.featured_media_id = mediaId
  ↓ product.save()
  ↓ return JSON { featured_media_id, featured_image_url }
```

### Accessor Design (Product Model)

```php
// All image accessors follow this pattern:
// 1. If featured_media_id set → use that media's conversion
// 2. Else → use first media in collection
// 3. Else → placeholder URL

// featured_image_url (for listings) → large conversion
// medium_image_url (for product cards) → medium conversion
// thumbnail_url → thumb conversion
// large_image_url → large conversion
// facebook_image_url → facebook conversion (SEO trait uses this)
// gallery_images (NEW) → array of {id, thumb_url, medium_url, large_url}
```

### $appends Decision

- Keep existing 5 image accessors in `$appends` (backward compatible)
- Do NOT add `gallery_images` to `$appends` — it would load all media for every product in every query
- Instead, controllers that need gallery data explicitly call `$product->append('gallery_images')` or return it in Inertia props

### Eager Loading Strategy

| Controller | Current | Change |
|-----------|---------|--------|
| `CatalogController::item()` | `$product->load('category')` | Add `'media'` to load |
| `CatalogController::paginate()` | via `CataglogService` | Add `->with('media')` in service |
| `HomeController::index()` | `Product::featuredProducts()->get()` | Add `->with('media')` |
| `ProductController::index()` | `->with('category')` | Add `->with('media')` |
| `ProductController::show()` | loads inventory | Add `'media'` to load |
| `ProductController::edit()` | returns product | Add `'media'` to load |
| Related products in `CatalogController::item()` | `$category->products()->get()` | Add `->with('media')` |
| `FeaturedProductController` | `Product::featuredProducts()->get()` | Add `->with('media')` |
| `DisabledProductController` | `Product::disabledProducts()->get()` | Add `->with('media')` |

---

## Implementation Steps

### 1. Database Migration — Add `featured_media_id`
**File:** `php artisan make:migration add_featured_media_id_to_products_table`

- Add nullable `featured_media_id` unsignedBigInteger to `products` table
- No FK constraint to `media` table (Spatie media IDs can change on re-upload; soft reference is safer)
- Backfill: for existing products with media, set `featured_media_id` to first media ID

### 2. Product Model Changes
**File:** `app/Models/Product.php`

- Add `featured_media_id` to `$fillable` or `$guarded` removal
- Add `featuredMedia()` relationship: `belongsTo(Media::class, 'featured_media_id')`
- Add `gallery_images` accessor (returns array, NOT in `$appends`)
- Refactor all 5 existing image accessors to check `featured_media_id` first
- Add `scopeWithMedia()` helper or document eager-loading convention

### 3. Gallery Upload Action
**File:** `app/Actions/StoreProductGalleryImage.php` (new)

- Uses `lorisleiva/laravel-actions` `AsAction` trait (matches existing pattern)
- `handle(Product $product, UploadedFile $file)`: adds to collection, unlinks original
- Does NOT clear collection (unlike current `StoreProductImage`)
- Auto-sets `featured_media_id` if null

### 4. Gallery Delete Action
**File:** `app/Actions/DeleteProductGalleryImage.php` (new)

- `handle(Product $product, int $mediaId)`: validates ownership, handles featured reset, deletes
- Wrapped in DB transaction for featured reset safety

### 5. Set Featured Action
**File:** `app/Actions/SetProductFeaturedImage.php` (new)

- `handle(Product $product, int $mediaId)`: validates, updates `featured_media_id`

### 6. Request Validation
**File:** `app/Http/Requests/ProductGalleryUploadRequest.php` (new)

- `images[]` — required, array, max:8
- `images.*` — image, mimes:jpeg,png,jpg,webp, max:2048

### 7. Controller & Routes
**Files:** `ProductImageController.php`, `routes/web.php`

- `POST /productimages/upload-gallery/{product}` → `uploadGallery()` — loops files, returns JSON
- `DELETE /productimages/{product}/{mediaId}` → `deleteImage()` — returns JSON
- `PUT /productimages/{product}/featured/{mediaId}` → `setFeatured()` — returns JSON
- Keep existing `POST /productimages/upload/{id}/{type}` (backward compat, still works via `StoreProductImage`)

### 8. Eager Loading Fixes
**Files:** All controllers listed in Eager Loading Strategy table above

- Add `->with('media')` to all product queries
- This fixes existing N+1 AND prepares for `gallery_images` accessor

### 9. Admin Gallery UI
**File:** `resources/js/Pages/Products/Edit.jsx`

- Gallery thumbnail grid below existing featured image preview
- Each thumbnail: image + delete button (X overlay) + "Set as Featured" star
- Multi-file input with "Add Images" button
- Upload progress bar (reuse `Progressbar` component)
- Disable upload when max 8 images reached
- On upload: POST to `/productimages/upload-gallery/{id}` with `images[]` FormData
- On delete: DELETE to `/productimages/{id}/{mediaId}`
- On set featured: PUT to `/productimages/{id}/featured/{mediaId}`

### 10. Product Detail Gallery
**File:** `resources/js/Pages/Store/Catalog/Item.jsx`

- Thumbnail strip below main product image
- Map `product.gallery_images` to clickable thumbnails
- Click thumbnail → swap main image
- Click main image → open `Lightbox` with all gallery URLs
- Pass `product.gallery_images.map(img => img.large_url)` as `sources` to existing `Lightbox`
- Hide thumbnail strip if ≤1 image

### 11. Tests
**Files:** `tests/Feature/ProductImageGalleryTest.php` (new)

- Upload single image → stored, featured auto-set
- Upload 5 images → all stored, gallery returns 5
- Upload 9th image → validation error (max 8)
- Set featured → accessor returns that image's URL
- Delete featured → falls back to next available
- Delete non-featured → others remain, featured unchanged
- Delete last image → `featured_media_id` null, accessors return placeholders
- Product listing still shows single featured image (no regression)
- Catalog detail page returns `gallery_images` in props

---

## Bug Prevention Checklist

| Risk | Mitigation |
|------|-----------|
| FK breaks when media deleted | No hard FK — soft reference via `featured_media_id`; `DeleteProductGalleryImage` resets it |
| N+1 from `gallery_images` accessor | NOT in `$appends`; explicit eager-load in controllers |
| Existing products break | Accessors fall back to first media → placeholder chain |
| `StoreProductImage` still clears collection | Keep it for backward compat; new gallery uses separate action |
| Legacy `featured_image` column confusion | Documented as dead code; no migration touches it |
| Bulk upload timeout | Admin-only flow; max 8 files; acceptable latency |
| Concurrent upload race on `featured_media_id` | Auto-set only when null; explicit "set featured" for overrides |

## Dead Code (Do Not Touch in This PR)
- `UploadFeaturedImage`, `UploadSocialMediaImage`, `ConventToWebp`
- `ProductFileUploadService`, `ImageUploadServiceResolver`, `ProductImageUploadServiceInterface`
- `featured_image`, `socialmedia_image` columns on products table
- Commented-out code in `ProductImageController` lines 22-31

---

## Validation Plan
1. `php artisan test --compact --filter=ProductImageGallery`
2. Manual: upload 5 images → all stored, conversions generated, gallery accessor returns 5
3. Manual: set one as featured → `featured_image_url` returns that one
4. Manual: delete featured → falls back to next
5. Manual: delete non-featured → others remain
6. Manual: product listing still shows single featured image
7. Manual: product detail page shows gallery with thumbnails + lightbox
8. `vendor/bin/pint --dirty --format agent` before finalizing
