<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "product_id" => Product::factory(),
            "quantity" => $this->faker->numberBetween(1, 100),
            "uom" => 'pc',
            "movement_type" => $this->faker->randomElement(["inbound", "outbound"]),
            "notes" => $this->faker->sentence(),
        ];
    }
}
