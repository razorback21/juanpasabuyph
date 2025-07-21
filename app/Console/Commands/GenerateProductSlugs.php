<?php

namespace App\Console\Commands;

use App\Actions\GenarateSlug;
use App\Models\Product;
use Illuminate\Console\Command;

class GenerateProductSlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-product-slugs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate slugs for products that don\'t have them';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to generate product slugs...');

        $productsWithoutSlugs = Product::whereNull('slug')->get();

        if ($productsWithoutSlugs->isEmpty()) {
            $this->info('All products already have slugs!');
            return false;
        }

        $this->info("Found {$productsWithoutSlugs->count()} products without slugs.");

        $bar = $this->output->createProgressBar($productsWithoutSlugs->count());
        $bar->start();

        foreach ($productsWithoutSlugs as $product) {
            $product->slug = GenarateSlug::run($product, config('constants.PRODUCT_SLUG_SOURCE_FIELD'));
            $product->save();
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Product slugs generated successfully!');

        return false;
    }
}
