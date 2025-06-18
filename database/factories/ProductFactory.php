<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productNames = [
            'Wireless Bluetooth Headphones',
            'Smartphone Case',
            'Laptop Stand',
            'USB-C Cable',
            'Portable Charger',
            'Wireless Mouse',
            'Mechanical Keyboard',
            'Monitor Stand',
            'Desk Lamp',
            'Coffee Mug',
            'Water Bottle',
            'Notebook',
            'Pen Set',
            'Phone Holder',
            'Tablet Case',
            'Gaming Controller',
            'Webcam',
            'Microphone',
            'Speaker',
            'Cable Organizer'
        ];

        return [
            'name' => $this->faker->randomElement($productNames),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 9.99, 999.99),
            'product_category_id' => ProductCategory::factory(),
            'featured_image' => 'https://picsum.photos/1080/1080',
        ];
    }

    /**
     * Indicate that the product is expensive.
     */
    public function expensive(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => $this->faker->randomFloat(2, 500.00, 2000.00),
        ]);
    }

    /**
     * Indicate that the product is cheap.
     */
    public function cheap(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => $this->faker->randomFloat(2, 5.00, 50.00),
        ]);
    }

    /**
     * Indicate that the product is electronics.
     */
    public function electronics(): static
    {
        $electronicsNames = [
            'Wireless Bluetooth Headphones',
            'Smartphone Case',
            'Laptop Stand',
            'USB-C Cable',
            'Portable Charger',
            'Wireless Mouse',
            'Mechanical Keyboard',
            'Gaming Controller',
            'Webcam',
            'Microphone',
            'Speaker'
        ];

        return $this->state(fn (array $attributes) => [
            'name' => $this->faker->randomElement($electronicsNames),
            'description' => 'High-quality electronic device with advanced features and modern design.',
            'price' => $this->faker->randomFloat(2, 29.99, 599.99),
        ]);
    }

    /**
     * Indicate that the product is office supplies.
     */
    public function officeSupplies(): static
    {
        $officeNames = [
            'Notebook',
            'Pen Set',
            'Desk Lamp',
            'Monitor Stand',
            'Cable Organizer',
            'Phone Holder',
            'Coffee Mug',
            'Water Bottle'
        ];

        return $this->state(fn (array $attributes) => [
            'name' => $this->faker->randomElement($officeNames),
            'description' => 'Essential office supply for productivity and organization.',
            'price' => $this->faker->randomFloat(2, 4.99, 89.99),
        ]);
    }
}
