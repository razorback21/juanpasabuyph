Juan Padala Phase 1 - Laravel E-commerce site 

### WEB Version
Tech Stack
- Laravel 12
- Ineria React JS
- SQlite
- Shadcn
- Tailwind

### Features Store Front
- Common pages (Home, About, FAQs, Contact)
- Product catalog with categories and product details
- Add to cart and checkout functionality
- SEO-friendly URLs
- Meta tags and opengraph tags for common pages and Product pages

### Features Admin
- Inventory system with reservation,
- Manage Products,  
- Manage Product Categories, 
- Manage orders ( Status, notifications, timeline)
- Reports (Inventory, Sales, Product Status)

## Sitemap Generation

The application includes an automated sitemap generation feature for better SEO.

### Generate Sitemap
```bash
php artisan app:generate-sitemap
```

This command will:
- Generate a `sitemap.xml` file in the public directory
- Include all active products with their category and product slugs
- Include all product categories
- Include static pages (catalog, about, faqs, contact)
- Set appropriate SEO metadata (lastmod, changefreq, priority)

### Sitemap URLs
- **Categories**: `/catalog?category={category_name}`
- **Products**: `/catalog/{category_slug}/{product_slug}`
- **Static Pages**: `/`, `/catalog`, `/about`, `/faqs`, `/contact`

### Access Sitemap
- Direct file: `http://yourdomain.com/sitemap.xml`
- Laravel route: `http://yourdomain.com/sitemap.xml` (with proper headers)
- Referenced in `robots.txt` for search engine discovery

Permission
- No user role for phase 1. The user has full access to the admin section

### ROADMAP

Phase 2
- Payment integration with GCASH
- QR code scanning
- Product image gallery
- Product Variations
- Product Statistics Report
- Enhanced dashboard With Charts
- Chatbot
----------------------------------------------------

### MOBILE Version

Tech Stack
- React Native
- GraphQL
- Dexie JS
- laravel 12 Lighthouse for graphql

 
