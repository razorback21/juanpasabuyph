<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductSlugTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_automatically_generates_slug_on_creation()
    {
        // Create a product category first
        $category = ProductCategory::factory()->create();
        
        // Create a product
        $product = Product::create([
            'name' => 'Test Product Name',
            'description' => 'Test description',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
        
        // Assert that slug was automatically generated
        $this->assertNotNull($product->slug);
        $this->assertEquals('test-product-name', $product->slug);
    }
    
    public function test_product_generates_unique_slug_when_duplicate_names_exist()
    {
        // Create a product category first
        $category = ProductCategory::factory()->create();
        
        // Create first product
        $product1 = Product::create([
            'name' => 'Duplicate Name',
            'description' => 'Test description',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
        
        // Create second product with same name
        $product2 = Product::create([
            'name' => 'Duplicate Name',
            'description' => 'Test description',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
        
        // Assert that slugs are unique
        $this->assertEquals('duplicate-name', $product1->slug);
        $this->assertEquals('duplicate-name-1', $product2->slug);
        $this->assertNotEquals($product1->slug, $product2->slug);
    }
    
    public function test_product_slug_is_updated_when_name_changes_and_slug_is_empty()
    {
        // Create a product category first
        $category = ProductCategory::factory()->create();
        
        // Create a product
        $product = Product::create([
            'name' => 'Original Name',
            'description' => 'Test description',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
        
        $originalSlug = $product->slug;
        
        // Clear the slug and update the name
        $product->slug = null;
        $product->name = 'Updated Name';
        $product->save();
        
        // Assert that slug was regenerated
        $this->assertNotNull($product->slug);
        $this->assertEquals('updated-name', $product->slug);
        $this->assertNotEquals($originalSlug, $product->slug);
    }
}