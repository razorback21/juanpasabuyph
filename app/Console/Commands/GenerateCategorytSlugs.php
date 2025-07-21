<?php

namespace App\Console\Commands;

use App\Actions\GenarateSlug;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Console\Command;

class GenerateCategorytSlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-category-slugs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Generate slugs for categories that don't have them";

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to generate category slugs...');

        $categoriesWithoutSlugs = ProductCategory::whereNull('slug')->get();

        if ($categoriesWithoutSlugs->isEmpty()) {
            $this->info('All categories already have slugs!');
            return false;
        }

        $this->info("Found {$categoriesWithoutSlugs->count()} categories without slugs.");

        // Cool laravel featured I've discovered
        $bar = $this->output->createProgressBar($categoriesWithoutSlugs->count());
        $bar->start();

        foreach ($categoriesWithoutSlugs as $category) {
            $category->slug = GenarateSlug::run($category, config('constants.CATEGORY_SLUG_SOURCE_FIELD'));
            $category->save();
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Category slugs generated successfully!');

        return false;
    }
}
