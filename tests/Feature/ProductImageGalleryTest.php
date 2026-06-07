<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProductImageGalleryTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Product $product;
    private \App\Models\ProductCategory $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->category = \App\Models\ProductCategory::factory()->create();
        $this->product = Product::factory()->create([
            'product_category_id' => $this->category->id,
        ]);
    }

    public function test_upload_single_gallery_image_sets_featured(): void
    {
        $file = UploadedFile::fake()->image('photo1.jpg');

        $response = $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => [$file],
            ]);

        $response->assertOk();
        $this->assertNotEmpty($this->product->fresh()->featured_media_id);
        $this->assertEquals(1, $this->product->fresh()->getMedia('product_feature_image')->count());
    }

    public function test_upload_multiple_gallery_images(): void
    {
        $files = [
            UploadedFile::fake()->image('a.jpg'),
            UploadedFile::fake()->image('b.jpg'),
            UploadedFile::fake()->image('c.jpg'),
            UploadedFile::fake()->image('d.jpg'),
            UploadedFile::fake()->image('e.jpg'),
        ];

        $response = $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => $files,
            ]);

        $response->assertOk();
        $gallery = $this->product->fresh()->gallery_images;

        $this->assertCount(5, $gallery);
        $this->assertNotEmpty($this->product->fresh()->featured_media_id);
    }

    public function test_upload_gallery_rejects_when_over_max(): void
    {
        $this->addMediaToProduct($this->product, 8);

        $extra = UploadedFile::fake()->image('extra.jpg');

        $response = $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => [$extra],
            ]);

        $response->assertSessionHasErrors('images');
        $this->assertEquals(8, $this->product->fresh()->getMedia('product_feature_image')->count());
    }

    public function test_set_featured_image_updates_accessor(): void
    {
        $file1 = UploadedFile::fake()->image('first.jpg');
        $file2 = UploadedFile::fake()->image('second.jpg');

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => [$file1, $file2],
            ]);

        $mediaIds = $this->product->fresh()->getMedia('product_feature_image')->pluck('id')->toArray();
        $secondId = $mediaIds[1];

        $this->actingAs($this->user)
            ->put(route('productimages.set-featured', [
                'product' => $this->product->slug,
                'mediaId' => $secondId,
            ]));

        $fresh = $this->product->fresh();
        $this->assertEquals($secondId, $fresh->featured_media_id);
    }

    public function test_delete_featured_image_falls_back_to_next(): void
    {
        $files = [
            UploadedFile::fake()->image('first.jpg'),
            UploadedFile::fake()->image('second.jpg'),
        ];

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => $files,
            ]);

        $mediaIds = $this->product->fresh()->getMedia('product_feature_image')->pluck('id')->toArray();
        $this->actingAs($this->user)
            ->delete(route('productimages.delete', [
                'product' => $this->product->slug,
                'mediaId' => $mediaIds[0],
            ]));

        $fresh = $this->product->fresh();

        $this->assertEquals($mediaIds[1], $fresh->featured_media_id);
        $this->assertNotEmpty($fresh->featured_image_url);
    }

    public function test_delete_non_featured_image_preserves_featured(): void
    {
        $files = [
            UploadedFile::fake()->image('first.jpg'),
            UploadedFile::fake()->image('second.jpg'),
        ];

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => $files,
            ]);

        $mediaIds = $this->product->fresh()->getMedia('product_feature_image')->pluck('id')->toArray();
        $this->actingAs($this->user)
            ->put(route('productimages.set-featured', [
                'product' => $this->product->slug,
                'mediaId' => $mediaIds[1],
            ]));

        $this->actingAs($this->user)
            ->delete(route('productimages.delete', [
                'product' => $this->product->slug,
                'mediaId' => $mediaIds[0],
            ]));

        $fresh = $this->product->fresh();

        $this->assertEquals($mediaIds[1], $fresh->featured_media_id);
        $this->assertEquals(1, $fresh->getMedia('product_feature_image')->count());
    }

    public function test_delete_last_image_clears_featured(): void
    {
        $file = UploadedFile::fake()->image('only.jpg');

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => [$file],
            ]);

        $mediaId = $this->product->fresh()->getMedia('product_feature_image')->first()->id;

        $this->actingAs($this->user)
            ->delete(route('productimages.delete', [
                'product' => $this->product->slug,
                'mediaId' => $mediaId,
            ]));

        $fresh = $this->product->fresh();

        $this->assertNull($fresh->featured_media_id);
    }

    public function test_product_listing_still_shows_single_featured_image(): void
    {
        $files = [
            UploadedFile::fake()->image('a.jpg'),
            UploadedFile::fake()->image('b.jpg'),
        ];

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => $files,
            ]);

        $fresh = $this->product->fresh();

        $this->assertNotEmpty($fresh->featured_image_url);
    }

    public function test_catalog_detail_returns_gallery_images(): void
    {
        $files = [
            UploadedFile::fake()->image('a.jpg'),
            UploadedFile::fake()->image('b.jpg'),
        ];

        $this->actingAs($this->user)
            ->post(route('productimages.upload-gallery', $this->product), [
                'images' => $files,
            ]);

        $response = $this->actingAs($this->user)
            ->get(route('catalog.item', [
                'category' => $this->category->slug ?? $this->category->name,
                'slug' => $this->product->slug,
            ]));

        $response->assertOk();
        $response->assertInertia(function ($page) {
            $page->component("Store/Catalog/Item")->has("product");
        });
    }

    private function addMediaToProduct(Product $product, int $count): void
    {
        for ($i = 0; $i < $count; $i++) {
            $product->addMedia(UploadedFile::fake()->image("img{$i}.jpg"))
                ->toMediaCollection('product_feature_image', 'local');
        }
    }
}
