<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductSlugRoutingTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_can_be_accessed_by_slug_in_routes()
    {
        // Create a user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);
        
        // Create a product category and product
        $category = ProductCategory::factory()->create();
        $product = Product::create([
            'name' => 'Test Product for Routing',
            'description' => 'Test description',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
        
        // Assert that the product has a slug
        $this->assertNotNull($product->slug);
        $this->assertEquals('test-product-for-routing', $product->slug);
        
        // Test that we can access the product show page using the slug
        $response = $this->get(route('products.show', $product->slug));
        $response->assertStatus(200);
        
        // Test that we can access the product edit page using the slug
        $response = $this->get(route('products.edit', $product->slug));
        $response->assertStatus(200);
    }
    
    public function test_product_route_model_binding_uses_slug()
    {
        // Create a user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);
        
        // Create a product category and product
        $category = ProductCategory::factory()->create();
        $product = Product::create([
            'name' => 'Another Test Product',
            'description' => 'Test description',
            'price' => 149.99,
            'product_category_id' => $category->id,
        ]);
        
        // Test that accessing by ID returns 404 (since we're using slug binding)
        $response = $this->get("/products/{$product->id}");
        $response->assertStatus(404);
        
        // Test that accessing by slug works
        $response = $this->get("/products/{$product->slug}");
        $response->assertStatus(200);
    }
}