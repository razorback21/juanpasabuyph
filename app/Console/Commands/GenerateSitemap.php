<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate sitemap.xml file for categories and products';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting sitemap generation...');

        // Get base URL from config
        $baseUrl = rtrim(config('app.url'), '/');
        
        // Start building the sitemap XML
        $xml = new \DOMDocument('1.0', 'UTF-8');
        $xml->formatOutput = true;
        
        // Create urlset element
        $urlset = $xml->createElement('urlset');
        $urlset->setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xml->appendChild($urlset);

        // Add homepage
        $this->addUrl($xml, $urlset, $baseUrl, '1.0', 'daily');
        
        // Add static pages
        $staticPages = [
            '/catalog' => ['priority' => '0.9', 'changefreq' => 'daily'],
            '/about' => ['priority' => '0.7', 'changefreq' => 'monthly'],
            '/faqs' => ['priority' => '0.6', 'changefreq' => 'monthly'],
            '/contact' => ['priority' => '0.6', 'changefreq' => 'monthly'],
        ];
        
        foreach ($staticPages as $page => $options) {
            $this->addUrl($xml, $urlset, $baseUrl . $page, $options['priority'], $options['changefreq']);
        }

        // Get all categories with slugs
        $categories = ProductCategory::whereNotNull('slug')->get();
        $this->info("Found {$categories->count()} categories with slugs.");
        
        foreach ($categories as $category) {
            $categoryUrl = $baseUrl . '/catalog?category=' . urlencode($category->name);
            $this->addUrl($xml, $urlset, $categoryUrl, '0.8', 'weekly', $category->updated_at);
        }

        // Get all products with slugs and their categories
        $products = Product::with('category')
            ->whereNotNull('slug')
            ->whereHas('category', function($query) {
                $query->whereNotNull('slug');
            })
            ->where('disabled', false)
            ->get();
            
        $this->info("Found {$products->count()} active products with slugs.");
        
        foreach ($products as $product) {
            if ($product->category && $product->category->slug) {
                $productUrl = $baseUrl . '/catalog/' . $product->category->slug . '/' . $product->slug;
                $this->addUrl($xml, $urlset, $productUrl, '0.7', 'weekly', $product->updated_at);
            }
        }

        // Save the sitemap to public folder
        $sitemapPath = public_path('sitemap.xml');
        $xml->save($sitemapPath);
        
        $this->info("Sitemap generated successfully at: {$sitemapPath}");
        $this->info("Total URLs: " . $urlset->childNodes->length);
        
        return Command::SUCCESS;
    }
    
    /**
     * Add a URL to the sitemap
     */
    private function addUrl($xml, $urlset, $url, $priority = '0.5', $changefreq = 'weekly', $lastmod = null)
    {
        $urlElement = $xml->createElement('url');
        
        $loc = $xml->createElement('loc', htmlspecialchars($url));
        $urlElement->appendChild($loc);
        
        if ($lastmod) {
            $lastmodElement = $xml->createElement('lastmod', $lastmod->format('Y-m-d\TH:i:s\Z'));
            $urlElement->appendChild($lastmodElement);
        } else {
            $lastmodElement = $xml->createElement('lastmod', now()->format('Y-m-d\TH:i:s\Z'));
            $urlElement->appendChild($lastmodElement);
        }
        
        $changefreqElement = $xml->createElement('changefreq', $changefreq);
        $urlElement->appendChild($changefreqElement);
        
        $priorityElement = $xml->createElement('priority', $priority);
        $urlElement->appendChild($priorityElement);
        
        $urlset->appendChild($urlElement);
    }
}