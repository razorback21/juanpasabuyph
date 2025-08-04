<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Enums\MovementTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTotalCalculationTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_total_calculation_with_database_aggregation()
    {
        // Create test data
        $customer = Customer::create([
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john.doe@example.com',
            'phone' => '123-456-7890',
            'address' => '123 Main St',
            'city' => 'Manila',
            'province' => 'NCR',
            'postal_code' => '1000'
        ]);
        $category = ProductCategory::factory()->create();
        $product1 = Product::factory()->create([
            'product_category_id' => $category->id,
            'price' => 10.50
        ]);
        $product2 = Product::factory()->create([
            'product_category_id' => $category->id,
            'price' => 25.75
        ]);

        // Create inventory records to ensure products have stock
        Inventory::create([
            'product_id' => $product1->id,
            'quantity' => 100,
            'movement_type' => MovementTypeEnum::INBOUND->value,
            'uom' => 'pcs',
            'notes' => 'Initial stock for testing'
        ]);

        Inventory::create([
            'product_id' => $product2->id,
            'quantity' => 100,
            'movement_type' => MovementTypeEnum::INBOUND->value,
            'uom' => 'pcs',
            'notes' => 'Initial stock for testing'
        ]);

        $order = Order::create([
            'customer_id' => $customer->id,
            'status' => 'placed',
            'order_number' => 'ORD-001'
        ]);

        // Create order items
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product1->id,
            'quantity' => 2,
            'price' => 10.50
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product2->id,
            'quantity' => 3,
            'price' => 25.75
        ]);

        // Calculate expected total: (10.50 * 2) + (25.75 * 3) = 21.00 + 77.25 = 98.25
        $expectedTotal = 98.25;

        // Debug: Check if order items were created
        $this->assertCount(2, $order->items);
        
        // Debug: Check individual item totals
        $item1 = $order->items->first();
        $item2 = $order->items->last();
        
        $this->assertEquals(10.50, $item1->price);
        $this->assertEquals(2, $item1->quantity);
        $this->assertEquals(25.75, $item2->price);
        $this->assertEquals(3, $item2->quantity);

        // Refresh the order to ensure we have the latest data
        $order->refresh();
        
        // Force database commit
        \DB::commit();
        
        // Debug: Check the raw SQL query result
        $rawTotal = $order->items()
            ->selectRaw('COALESCE(SUM(price * quantity), 0) as total')
            ->value('total');
        dump('Raw SQL Total: ' . $rawTotal);
        
        // Debug: Check items count from database
        $itemsCount = $order->items()->count();
        dump('Items count from DB: ' . $itemsCount);
        
        // Debug: Check actual values in database
        $items = $order->items()->select('price', 'quantity')->get();
        foreach ($items as $index => $item) {
            dump("Item {$index}: price={$item->price}, quantity={$item->quantity}");
        }
        
        // Debug: Try direct DB query
        $directTotal = \DB::table('order_items')
            ->where('order_id', $order->id)
            ->selectRaw('COALESCE(SUM(price * quantity), 0) as total')
            ->value('total');
        dump('Direct DB Total: ' . $directTotal);
        
        // Debug: Check raw data types
        $rawItems = \DB::table('order_items')
            ->where('order_id', $order->id)
            ->select('price', 'quantity', \DB::raw('price * quantity as item_total'))
            ->get();
        foreach ($rawItems as $index => $item) {
            dump("Raw Item {$index}: price={$item->price} (type: " . gettype($item->price) . "), quantity={$item->quantity} (type: " . gettype($item->quantity) . "), item_total={$item->item_total}");
        }
        
        // Test the refactored total() method
        $calculatedTotal = $order->total();
        
        // Debug: Output the calculated total
        dump('Calculated Total: ' . $calculatedTotal);
        dump('Expected Total: ' . $expectedTotal);

        $this->assertEquals($expectedTotal, $calculatedTotal);
        $this->assertEquals($expectedTotal, $order->total);
    }

    public function test_order_total_with_no_items()
    {
        $customer = Customer::create([
            'firstname' => 'Jane',
            'lastname' => 'Smith',
            'email' => 'jane.smith@example.com',
            'phone' => '123-456-7891',
            'address' => '456 Oak St',
            'city' => 'Quezon City',
            'province' => 'NCR',
            'postal_code' => '1100'
        ]);
        $order = Order::create([
            'customer_id' => $customer->id,
            'status' => 'placed',
            'order_number' => 'ORD-002'
        ]);

        // Order with no items should have total of 0
        $this->assertEquals(0, $order->total());
        $this->assertEquals(0, $order->total);
    }
}