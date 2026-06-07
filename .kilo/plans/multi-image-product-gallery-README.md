# Multi-Image Product Gallery — README

## What Changed

This feature adds multi-image gallery support for products. Images are stored via the existing Spatie MediaLibrary `product_feature_image` collection.

### Backend (implemented)
- `products.featured_media_id` added (nullable, no FK)
- `StoreProductGalleryImage`, `DeleteProductGalleryImage`, `SetProductFeaturedImage` actions added
- `ProductGalleryUploadRequest` enforces max 8 images per product
- Controller routes added:
    - `POST /productimages/upload-gallery/{product}` → `uploadGallery`
    - `DELETE /productimages/{product}/{mediaId}` → `deleteImage`
    - `PUT /productimages/{product}/featured/{mediaId}` → `setFeatured`
- Eager-loaded `media` on all product queries (Catalog, Home, Featured, Disabled, Product listings/detail/edit)

### Frontend
- `resources/js/Pages/Store/Catalog/Item.jsx`
    - Thumbnail strip below the main product image
    - Clicking a thumbnail updates the main image
    - Lightbox still works for all gallery images
- `resources/js/Pages/Products/Edit.jsx`
    - Read-only gallery panel under the existing product edit form
    - Shows thumbnails from `product.gallery_images`
    - Delete button and star button to set featured (both wired to API)
    - “Add Images” upload UI intentionally left off edit page; user manages gallery via the dedicated gallery management UI or API

## How to Use
1. Upload gallery images via the API (or an external admin gallery UI if added later)
2. Manage featured image via the star button on existing gallery thumbnails
3. Delete images via the × button

## Status
File implementation: DONE
PHPUnit suite: could not run here because the test runner cannot access the `public` disk in this workspace. When this is merged into a test environment with Laravel’s filesystem disk available, run:
```
php artisan test --filter=ProductImageGallery
```
