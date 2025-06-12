<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_products_page_is_displayed(): void
    {
        $response = $this->actingAs($this->user)
            ->get('/products');

        $response->assertOk();
    }

    public function test_products_can_be_created(): void
    {
        $category = \App\Models\ProductCategory::factory()->create();

        $response = $this->actingAs($this->user)
            ->post('/products', [
                'name' => 'Test Product',
                'description' => 'Test Description',
                'price' => 99.99,
                'product_category_id' => $category->id,
            ]);

        $response->assertRedirect('/products');
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 99.99,
            'product_category_id' => $category->id,
        ]);
    }

    public function test_products_can_be_updated(): void
    {
        $product = Product::factory()->create();

        $response = $this->actingAs($this->user)
            ->put("/products/{$product->id}", [
                'name' => 'Updated Product',
                'description' => 'Updated Description',
                'price' => 149.99,
            ]);

        $response->assertRedirect('/products');
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product',
            'price' => 149.99,
        ]);
    }

    public function test_products_can_be_deleted(): void
    {
        $product = Product::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete("/products/{$product->id}");

        $response->assertRedirect('/products');
        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }

    public function test_products_can_be_searched(): void
    {
        $product1 = Product::factory()->create(['name' => 'Test Product ABC']);
        $product2 = Product::factory()->create(['name' => 'Another Product XYZ']);

        $response = $this->actingAs($this->user)
            ->get('/products/search?query=ABC');

        $response->assertOk()
            ->assertJsonFragment(['name' => 'Test Product ABC'])
            ->assertJsonMissing(['name' => 'Another Product XYZ']);
    }

    public function test_products_can_be_filtered_by_price(): void
    {
        $cheapProduct = Product::factory()->create(['price' => 10.00]);
        $expensiveProduct = Product::factory()->create(['price' => 1000.00]);

        $response = $this->actingAs($this->user)
            ->get('/products/search?min_price=500');

        $response->assertOk()
            ->assertJsonPath('data.0.price', '1000.00')
            ->assertJsonMissing(['price' => 10.00]);
    }

    public function test_unauthorized_users_cannot_manage_products(): void
    {
        $product = Product::factory()->create();

        $this->get('/products')->assertRedirect('/login');
        $this->post('/products')->assertRedirect('/login');
        $this->put("/products/{$product->id}")->assertRedirect('/login');
        $this->delete("/products/{$product->id}")->assertRedirect('/login');
    }

    public function test_product_validation_rules(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/products', [
                'name' => '',
                'price' => 'not-a-number',
            ]);

        $response->assertSessionHasErrors(['name', 'price']);
    }

    public function test_product_belongs_to_a_category(): void
    {
        $category = \App\Models\ProductCategory::factory()->create();
        $product = Product::factory()->create(['product_category_id' => $category->id]);

        $this->assertEquals($category->id, $product->product_category_id);
        $this->assertInstanceOf(\App\Models\ProductCategory::class, $product->category);
        $this->assertEquals($category->name, $product->category->name);
    }
}
