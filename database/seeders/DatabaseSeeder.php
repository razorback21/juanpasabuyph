<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\ProductCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // cleanup databse before seeding
        Product::truncate();
        ProductCategory::truncate();

        // Create product categories
        $electronicsCategory = ProductCategory::factory()->create(['name' => 'Electronics']);
        $officeSuppliesCategory = ProductCategory::factory()->create(['name' => 'Office Supplies']);
        $otherCategory = ProductCategory::factory()->create(['name' => 'Other']);

        // Create sample products
        // Electronics
        
        Product::factory()
            ->count(5)
            ->for($electronicsCategory, 'category')
            ->electronics()
            ->create();

        // Office Supplies
        Product::factory()
            ->count(5)
            ->for($officeSuppliesCategory, 'category')
            ->officeSupplies()
            ->create();

        // Mix of expensive and cheap products
        Product::factory()
            ->count(3)
            ->for($otherCategory, 'category')
            ->expensive()
            ->create();

        Product::factory()
            ->count(3)
            ->for($otherCategory, 'category')
            ->cheap()
            ->create();

        // Regular products
        Product::factory()
            ->count(4)
            ->for($otherCategory, 'category')
            ->create();
    }
}
