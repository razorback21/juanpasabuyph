<?php

namespace Tests\Feature;

use App\Models\ProductCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductCategoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_product_categories_can_be_created(): void
    {
        $category = ProductCategory::factory()->create();

        $this->assertDatabaseHas('product_categories', [
            'name' => $category->name,
            'description' => $category->description,
        ]);
    }

    public function test_product_categories_can_be_retrieved(): void
    {
        $category = ProductCategory::factory()->create();

        $retrievedCategory = ProductCategory::find($category->id);

        $this->assertEquals($category->name, $retrievedCategory->name);
        $this->assertEquals($category->description, $retrievedCategory->description);
    }
}
