<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("order_items", function (Blueprint $table) {
            $table->string("uom", 10)->default('pc')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // I removed uom field
        Schema::table("order_items", function (Blueprint $table) {
            $table->dropColumn("uom");
        });
    }
};
