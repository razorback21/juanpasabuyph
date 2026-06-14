# JuanPasabuyPH Project Overview

> **Enhancement Plan**: ENH-000 through ENH-006 | See [Enhancement Tracking](#enhancement-tracking) section

## Project Summary

JuanPasabuyPH is a modern **Laravel + Inertia.js + React e-commerce platform** built with cutting-edge web technologies and designed for scalability, maintainability, and developer experience.

**Quick Stats**
- **26 database migrations** | **11 Eloquent models**
- **15+ React page groups** with storefront, dashboard, and admin sections
- **4 route files**: `web.php`, `api.php`, `auth.php`, `console.php`

## Technology Stack

### Backend
- **Laravel 12.x** - Modern PHP framework with strict typing conventions
- **Inertia.js v2** - Server-side rendered Single Page Application framework
- **PHP 8.2+** - Modern PHP with property promotion, enums, and strict types
- **Laravel Sanctum** - API authentication for SPA applications
- **Laravel Horizon** - Queue management and monitoring
- **Laravel Telescope** - Debugging and application monitoring
- **Spatie Laravel Media Library** - Media management with WebP support
- **Tightenco Ziggy** - Route management for JavaScript applications
- **Laravel Actions** (`lorisleiva/laravel-actions`) - Self-contained business logic operations
- **WebP Support** (`buglinjo/laravel-webp`) - Automatic image format conversion
- **SEO Management** (`honeystone/laravel-seo`) - Built-in search engine optimization
- **User Agent Detection** (`jenssegers/agent`) - Device/browser parsing
- **CAPTCHA** (`mews/captcha`) - Spam protection and bot prevention
- **Adminer** (`onecentlin/laravel-adminer`) - Lightweight database administration

### Frontend
- **React 18** - Modern frontend library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Next-generation build tool with hot module replacement
- **Tailwind CSS v3** - Utility-first CSS framework with custom design tokens
- **shadcn/ui** - Headless, accessible UI component library
- **Radix UI** - Low-level primitive components for accessibility (alert-dialog, avatar, checkbox, dialog, dropdown-menu, label, popover, progress, select, separator, slot, switch, tabs, toggle, toggle-group, tooltip)
- **Lucide React** - Consistent icon library
- **Inertia.js React** - Typed components for Inertia interactions
- **TanStack React Table** - Headless table/data grid component
- **Recharts** - Composable charting library for dashboards
- **Embla Carousel** - Lightweight carousel/slider component
- **FS Lightbox React** - Fullscreen image lightbox galleries
- **React Day Picker** - Date picker component
- **Sonner** - Toast notification system
- **Vaul** - Drawer component for mobile-friendly panels
- **next-themes** - Dark/light theme switching
- **@dnd-kit** - Drag and drop toolkit (core, sortable, modifiers, utilities)
- **CVA + clsx + tailwind-merge** - Component variant management and class merging
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utility library

### Development & Tools
- **Laravel Boost** - AI-powered development assistance and MCP server
- **GitNexus** - Code intelligence and impact analysis
- **MemPalace** - Knowledge graph for session management
- **PHPUnit** - PHP testing framework
- **Laravel Pint** - Code formatter for consistent style
- **Composer** - Dependency management
- **npm** - JavaScript package management

## Architecture & Design

### Backend Architecture
- **Clean Architecture** - N-tier separation: Controllers → Services → Repositories → Models
- **Dependency Injection** - Services resolved through Laravel container
- **Repository Pattern** - Data access abstraction for models
- **Service Layer** - Business logic encapsulated in dedicated service classes
- **Event-Driven** - Laravel events and listeners for decoupled communication

### Frontend Architecture
- **Component-Based** - Functional React components with TypeScript
- **Composition** - Sub-components and custom hooks for complex features
- **Inertia as Bridge** - Controllers render Inertia pages with props
- **Type Safety** - Explicit interfaces and type definitions
- **Responsive Design** - Mobile-first with Tailwind CSS utilities

### Design System
- **Admin Interface** - Professional admin using shadcn/ui components
- **Consistent Styling** - Tailwind CSS with custom design tokens
- **Accessibility** - Built on Radix UI primitives for WCAG compliance
- **Responsive Layout** - Mobile-first approach with breakpoints
- **Consistent Patterns** - Reusable components and standardized layouts

## Development Guidelines

### Coding Standards
- **PHP**: Typed properties, explicit return types, single-responsibility methods
- **React**: Functional components, TypeScript Props interfaces, composition over inheritance
- **Laravel**: Thin controllers, Form Requests for validation, Service classes for business logic
- **Testing**: PHPUnit unit tests, feature tests, component tests

### Best Practices
- **KISS Principle** - Simple, maintainable code over clever solutions
- **DRY** - Shared utilities in `app/Support/`, reusable components in `resources/js/Components/`
- **Separation of Concerns** - Clear boundaries between UI, business logic, and data access
- **Type Safety** - No `any` types, explicit interfaces, proper TypeScript usage
- **Performance** - Code splitting, lazy loading, efficient queries

### Anti-Patterns to Avoid
- ❌ Fat controllers with business logic
- ❌ Direct database queries in controllers
- ❌ Hardcoded URLs (use Ziggy route helper)
- ❌ Mixed Blade and Inertia views
- ❌ Class components (use functional with hooks)

## Key Features

### E-commerce Capabilities
- **Product Management** - CRUD operations with media galleries
- **Order Processing** - Queue-based order fulfillment
- **Customer Management** - User authentication and profiles
- **Inventory Control** - Stock tracking with media support
- **Search & Filtering** - Product discovery with advanced search

### Developer Experience
- **AI Assistance** - Laravel Boost for context-aware development
- **Code Intelligence** - GitNexus for impact analysis and navigation
- **Automated Testing** - Comprehensive test coverage
- **Code Formatting** - Laravel Pint for consistent style
- **Hot Reload** - Vite for instant development feedback

### Performance & Scalability
- **Queue Processing** - Horizon for background job management
- **Media Optimization** - WebP support with automatic conversion
- **Code Splitting** - Lazy-loaded page components
- **Caching** - Laravel caching with efficient strategies
- **Database Optimization** - Eager loading, proper indexing

## Project Structure

```
/home/donz/projects/juanpasabuyph/
├── app/
│   ├── Actions/                # Laravel Actions (stateless operations)
│   │   └── Order/              # Order-related actions
│   ├── Console/Commands/       # Artisan commands
│   ├── dashboard/              # Dashboard-specific logic
│   ├── Enums/                  # PHP 8.1+ enums
│   ├── Events/                 # Event classes
│   ├── Exceptions/             # Custom exceptions
│   ├── Http/
│   │   ├── Controllers/        # Thin controllers
│   │   │   ├── Api/            # API controllers
│   │   │   ├── Auth/           # Authentication controllers
│   │   │   └── Pages/          # Page controllers
│   │   ├── Middleware/         # HTTP middleware
│   │   ├── Requests/           # Form request validation
│   │   │   ├── Auth/           # Auth validation rules
│   │   │   └── Product/        # Product validation rules
│   │   └── Resources/          # API resources
│   ├── Jobs/                   # Queued jobs
│   ├── Listeners/              # Event listeners
│   ├── Mail/                   # Mailables
│   ├── Models/                 # Eloquent models (11 total)
│   │   └── Pages/              # Page content models
│   ├── Notifications/          # Notification classes
│   ├── Observers/              # Model observers
│   │   ├── Order/              # Order lifecycle observers
│   │   └── Product/            # Product lifecycle observers
│   ├── Policies/               # Authorization policies
│   ├── Providers/              # Service providers
│   ├── Rules/                  # Custom validation rules
│   ├── Services/               # Business logic
│   │   ├── Classes/            # Service implementations
│   │   └── Interfaces/         # Service contracts
│   └── Traits/                 # Shared traits
│       └── Enum/               # Enum helper traits
├── config/                     # Laravel configuration
├── database/
│   ├── factories/             # Model factories
│   ├── migrations/             # Database migrations (26 total)
│   └── seeders/                # Database seeders
├── resources/js/
│   ├── components/ui/          # shadcn/ui base components
│   ├── Components/ui/          # Custom UI components
│   ├── data/                   # Static/mock data
│   ├── hooks/                  # Custom React hooks
│   ├── Layouts/                # Page layouts
│   ├── lib/                    # Utility libraries
│   ├── Pages/                  # Inertia page components
│   │   ├── Auth/               # Login, register, password reset
│   │   ├── Dashboard/          # Admin dashboard
│   │   ├── DisabledProduct/    # Disabled product management
│   │   ├── FeaturedProduct/    # Featured product management
│   │   ├── Inventory/          # Inventory management
│   │   ├── Order/              # Order management
│   │   ├── OutOfStock/         # Out of stock management
│   │   ├── PageContent/        # CMS page content
│   │   ├── ProductCategory/    # Category management
│   │   ├── Products/           # Product management
│   │   ├── Profile/            # User profile
│   │   │   └── Partials/       # Profile sub-components
│   │   └── Store/              # Public storefront
│   │       ├── About/          # About page
│   │       ├── Catalog/        # Product catalog
│   │       ├── Checkout/       # Checkout flow
│   │       ├── components/     # Store-specific components
│   │       ├── Contact/        # Contact page
│   │       ├── Faqs/           # FAQ page
│   │       ├── Home/           # Homepage
│   │       ├── Privacy/        # Privacy policy
│   │       └── Track/          # Order tracking
│   └── [types, utils as needed]
├── routes/                     # Route definitions (web, api, auth, console)
├── tests/                      # PHPUnit tests
├── context/                    # Project documentation
│   ├── CODING_BEHAVIOR.md      # Behavioral guidelines
│   ├── CODING_STANDARDS.md     # Code standards
│   ├── ADMIN_DESIGN_SYSTEM.md  # Admin interface patterns
│   ├── MEMPALACE.md            # Memory store documentation
│   └── OVERVIEW.md             # Project overview (this file)
├── .kilo/plans/                # Enhancement plans (see tracking)
│   ├── catalog-search-design-fix.md
│   ├── fix-catalog-pagination.md
│   ├── multi-image-product-gallery.md
│   ├── multi-image-product-gallery-README.md
│   └── product-groupings.md
├── AGENTS.md                   # Agent session instructions
├── CLAUDE.md                   # Main project context + Laravel Boost guidelines
├── LARAVEL_BOOST_CONFIGURATION.md  # Boost setup status
├── README.md                   # Project README
├── enhance_db_schema_initial_design.md  # DB schema design doc
└── .github/.cursor/.vscode/    # AI tool configurations
```

## Development Commands

### Laravel Artisan
```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Clear caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Test suite
php artisan test --compact
```

### Frontend
```bash
# Development mode (runs server, queue, and vite concurrently)
composer run dev

# Development with external access
composer run devc

# Build for production
npm run build

# Vite development server
npm run dev
```

### Laravel Boost (AI Assistant)
```bash
# Start MCP server
php artisan boost:mcp

# List available boost commands
php artisan list boost

# Search documentation
php artisan boost:search-docs
```

## Configuration Files

### Environment Setup
- **`.env`** - Environment variables and configuration
- **`.env.example`** - Template for environment setup

### Dependencies
- **`composer.json`** - PHP dependencies including Laravel packages
- **`package.json`** - JavaScript dependencies including React and Tailwind
- **`vite.config.js`** - Vite configuration and build settings

### Code Quality
- **`.github/copilot-instructions.md`** - AI development guidelines
- **`.cursor/rules/design.mdc`** - Design and style guidelines
- **`composer.json` scripts** - Development and testing workflows

## Integration Points

### AI & Development Tools
- **Laravel Boost** - Provides context-aware AI assistance via MCP protocol
- **GitNexus** - Code intelligence for impact analysis and navigation
- **MemPalace** - Knowledge graph for session management and recall
- **GitHub Copilot** - Enhanced with Laravel-specific context

### Third-Party Services
- **Media Library** - Automatic WebP conversion and optimization
- **SEO Management** - Built-in SEO tools for search optimization
- **Adminer** - Database administration interface
- **Telescope** - Application debugging and monitoring

## Enhancement Tracking

Each enhancement has a unique ID, source, status, and description.

| ID | Source | Status | Description |
|----|--------|--------|-------------|
| **ENH-000** | User request | ✅ Complete | Create project overview document (`OVERVIEW.md`) with structure, stack, and enhancement tracking |
| **ENH-001** | `.kilo/plans/multi-image-product-gallery.md` | 📋 Planned | Multi-image product gallery with drag-and-drop reordering, lightbox preview, and WebP optimization |
| **ENH-002** | `.kilo/plans/product-groupings.md` | 📋 Planned | Product grouping/variant system (size, color, etc.) with shared inventory tracking |
| **ENH-003** | `.kilo/plans/catalog-search-design-fix.md` | 📋 Planned | Catalog search redesign — improved filtering, faceted search, and search UX |
| **ENH-004** | `.kilo/plans/fix-catalog-pagination.md` | 📋 Planned | Fix catalog pagination — proper page controls, query string preservation, scroll position |
| **ENH-005** | Overview audit | 📋 Planned | Dependency and structure audit — upgrade Tailwind v3→v4 (already in devDeps), TypeScript strictness, package pruning |
| **ENH-006** | Overview audit | 📋 Planned | Testing coverage gap analysis — identify untested models, controllers, and critical user flows |

### Enhancement Status Legend

| Icon | Meaning |
|------|---------|
| ✅ Complete | Implemented and verified |
| 🔄 In Progress | Actively being developed |
| 📋 Planned | Scoped and prioritized |
| 💡 Backlog | Identified but not yet scoped |
| ⚠️ Blocked | Waiting on dependency or decision |

### ENH-000: Project Overview Document ✅
- Created `context/OVERVIEW.md` with full technology stack, architecture, coding standards, and project structure
- Added enhancement tracking system with unique IDs
- Aligned documentation with actual codebase (26 migrations, 11 models, 15+ page groups)
- Linked `.kilo/plans/` documents to ENH-001 through ENH-004

### ENH-001: Multi-Image Product Gallery 📋
- **Source**: `.kilo/plans/multi-image-product-gallery.md`
- **Dependencies**: @dnd-kit (installed), Embla Carousel (installed), FS Lightbox (installed), Spatie Media Library (installed)
- **Key deliverables**: Upload multiple images per product, drag-and-drop reorder, lightbox preview, WebP auto-conversion

### ENH-002: Product Groupings/Variants 📋
- **Source**: `.kilo/plans/product-groupings.md`
- **Dependencies**: Database migration for variant tables, admin UI changes
- **Key deliverables**: Group products by shared attributes, variant-level inventory, variant-specific pricing, SKU generation

### ENH-003: Catalog Search Redesign 📋
- **Source**: `.kilo/plans/catalog-search-design-fix.md`
- **Dependencies**: Frontend search state, query string handling
- **Key deliverables**: Redesigned search bar, faceted filters, real-time results, URL-based search params

### ENH-004: Catalog Pagination Fix 📋
- **Source**: `.kilo/plans/fix-catalog-pagination.md`
- **Dependencies**: Inertia scroll preservation, query string management
- **Key deliverables**: Proper page navigation, preserve scroll position, query string sync, page size selector

### ENH-005: Dependency & Structure Audit 📋
- **Scope**: Review `composer.json` and `package.json` for unused/outdated packages
- **Notable**: `@tailwindcss/vite` v4 is in devDependencies but app uses Tailwind v3 — needs migration plan
- **Key deliverables**: Upgrade Tailwind to v4, prune unused packages, standardize casing (`components/` vs `Components/`)

### ENH-006: Testing Coverage Gap Analysis 📋
- **Scope**: Audit test coverage across 11 models, controllers, and store checkout flow
- **Key deliverables**: Identify gaps, write missing feature tests, target 80%+ coverage on critical paths

---

## Known Issues & Technical Debt

| ID | Issue | Impact |
|----|-------|--------|
| DEBT-001 | Duplicate `components/ui/` and `Components/ui/` directories | Confusion, potential import conflicts |
| DEBT-002 | Tailwind v3 in use but `@tailwindcss/vite` v4 in devDeps | Possible build issues after upgrade |
| DEBT-003 | No `.env.example` visible in tree | Onboarding friction for new developers |

---

This project represents a modern, production-ready e-commerce platform with enterprise-grade architecture, comprehensive tooling, and a strong focus on developer experience and code quality.

*Last updated: 2026-06-14 | Enhancement count: 7 (1 complete, 6 planned)*