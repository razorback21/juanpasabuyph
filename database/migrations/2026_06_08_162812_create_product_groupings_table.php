<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_groupings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('grouped_product_id')->constrained('products')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['product_id', 'grouped_product_id']);
        });

        if (DB::getDriverName() !== 'sqlite') {
            DB::statement('ALTER TABLE product_groupings ADD CONSTRAINT product_groupings_self_check CHECK (product_id != grouped_product_id)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('product_groupings');
    }
};
