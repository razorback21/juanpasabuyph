# Coding Standards & Best Practices

> **Stack**: Laravel + Inertia.js + React (TypeScript preferred)

---

## Core Principles

### KISS (Keep It Simple, Stupid)
- Strive for simplicity in every method, class, module, and component.
- If a method exceeds **20 lines**, refactor or extract sub-methods.
- If a React component exceeds **150 lines**, extract sub-components or custom hooks.
- Avoid premature optimization — measure first, then optimize.
- Single-responsibility: one class/method/component does one thing well.
- Favor plain PHP arrays, value objects, and composable React components over deep inheritance hierarchies.

### DRY (Don't Repeat Yourself)
- No duplicated logic across the codebase — extract shared utilities into `app/Support/` or `app/Helpers/`.
- Shared constants, enums, and configs live in dedicated files (e.g., `app/Enums/`, `config/`).
- Reusable React components belong in `resources/js/Components/` (shared) or `resources/js/Layouts/`.
- Custom hooks (`use*`) go in `resources/js/Hooks/`; shared type definitions in `resources/js/types/`.
- Custom Artisan commands, traits, and service classes encapsulating repeated logic go into appropriate `app/` subdirectories.
- Before copy-pasting: ask "can this be parameterized or composed via a trait, service, or custom hook?"

### Best Design Patterns & Architecture

**Preferred Backend Patterns**
| Pattern | When to Use |
|---------|-------------|
| Strategy / Dependency Injection | Swappable algorithms (payment gateways, exporters, parsers) |
| Repository | Abstracting Eloquent / DB queries from business logic |
| Adapter | Wrapping 3rd-party SDKs behind your own interface |
| Factory | Creating complex objects with varying config |
| Observer / Pub-Sub | Decoupled event-driven communication via Laravel Events & Listeners |
| Service Layer | Encapsulating business logic outside of controllers and models |

**Preferred Frontend Patterns (React + Inertia)**
| Pattern | When to Use |
|---------|-------------|
| Presentational / Container | Separate UI rendering from data-fetching and logic |
| Custom Hooks | Extracting reusable stateful logic (forms, modals, queries) |
| Composition (children / slots) | Building flexible, reusable layouts and components |
| Higher-Order Components (HOCs) | Cross-cutting concerns (auth guards, permissions) — sparingly |
| Context API | Global or subtree-level state (theme, auth user, flash messages) |
| Render Props | When children need access to parent state/logic — prefer hooks first |

**Architecture Rules**
- **Separation of Concerns**: 
  - *Backend*: Keep controllers thin, business logic in services, data access in repositories or models. For single-responsibility, reusable operations that don't warrant a full service class (e.g., slug generation, image processing, order number sequencing), use **Laravel Actions** (`lorisleiva/laravel-actions`) in `app/Actions/`. Actions are preferred over Services when the logic is self-contained and stateless.
  - *Frontend*: Keep page components as data-passing shells; extract business-aware UI into dedicated components.
- **N-Tier / Clean Architecture**: Controllers (HTTP layer) → Services (domain logic) → Repositories (data access) → Models (Eloquent/DB).
- **Inertia as the bridge**: Controllers return `Inertia::render('PageComponent', props)` — never mix Blade views with Inertia pages for the same UI flow. Use Blade only for the root `app.blade.php` shell.
- **Composition over Inheritance**: Prefer composing small, focused classes/components using dependency injection over deep hierarchies.
- **Interface-driven design**: Define contracts (PHP interfaces) before implementation; bind them in Service Providers.
- **Dependency direction**: Dependencies flow inward — outer layers depend on inner layers, never the reverse.
- **Side-effect isolation**: Keep side effects (HTTP calls, DB writes, file I/O, cache) at the boundaries — pure functions in core domain logic. In React, keep side effects inside `useEffect`, custom hooks, or event handlers — never during render.

---

## Directory Structure Conventions

```
/
├── app/
│   ├── Console/         # Artisan commands
│   ├── Enums/           # PHP 8.1+ enums
│   ├── Events/          # Event classes
│   ├── Exceptions/      # Custom exception classes
│   ├── Http/
│   │   ├── Controllers/ # Thin controllers (delegate to services; return Inertia responses)
│   │   ├── Middleware/   # HTTP middleware (incl. HandleInertiaRequests)
│   │   ├── Requests/    # Form request validation classes
│   │   └── Resources/   # API resource transformers
│   ├── Jobs/            # Queued jobs
│   ├── Listeners/       # Event listeners
│   ├── Models/          # Eloquent models
│   ├── Providers/       # Service providers
│   ├── Repositories/    # Data-access abstraction layer
│   ├── Services/        # Business logic layer
│   ├── Support/         # Utility classes, helpers, macros
│   └── Traits/          # Shared traits
├── config/              # App-wide configuration files
├── database/
│   ├── factories/       # Model factories
│   ├── migrations/      # Database migrations
│   └── seeders/         # Database seeders
├── lang/                # Localization / translation files
├── resources/
│   ├── js/              # React + Inertia frontend
│   │   ├── Components/  # Shared, reusable React components
│   │   ├── Hooks/       # Custom React hooks (useAuth, useModal, useForm)
│   │   ├── Layouts/     # Page layouts (AuthenticatedLayout, GuestLayout)
│   │   ├── Pages/       # Inertia page components (mirrors routes)
│   │   ├── types/       # TypeScript type definitions & interfaces
│   │   └── utils/       # Pure utility functions & helpers
│   └── views/           # Blade templates (root app.blade.php shell only)
│       └── app.blade.php
├── routes/              # Route definitions (web, api, console, channels)
└── tests/               # PHPUnit / Pest tests
```

---

## Naming Conventions

### Backend (PHP / Laravel)
- **Files**: `StudlyCaps.php` for classes (e.g., `UserService.php`, `OrderRepository.php`)
- **Controllers**: `StudlyCapsController.php` (e.g., `UserController.php`, `Api/OrderController.php`)
- **Models**: `StudlyCaps.php`, singular noun (e.g., `User.php`, `OrderItem.php`)
- **Database tables**: `snake_case`, plural (e.g., `users`, `order_items`)
- **Methods / Functions**: `camelCase` (e.g., `findByEmail`, `isActive`)
- **Variables**: `camelCase` (e.g., `$orderTotal`, `$isPending`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `DEFAULT_CURRENCY`)
- **Interfaces**: `StudlyCaps` with `Contract` or `Interface` suffix (e.g., `PaymentGatewayContract`, `UserRepositoryInterface`)
- **Traits**: `StudlyCaps` with `Trait` suffix or adjective (e.g., `HasUuids`, `Notifiable`)

### Frontend (React / TypeScript / Inertia)
- **Page components**: `StudlyCaps.tsx`, named after route (e.g., `Dashboard.tsx`, `Users/Index.tsx`, `Users/Edit.tsx`)
- **Shared components**: `StudlyCaps.tsx` (e.g., `PrimaryButton.tsx`, `DataTable.tsx`, `Modal.tsx`)
- **Custom hooks**: `use` prefix, `camelCase.ts` (e.g., `useAuth.ts`, `useFlashMessages.ts`, `usePagination.ts`)
- **Layouts**: `StudlyCapsLayout.tsx` (e.g., `AuthenticatedLayout.tsx`, `GuestLayout.tsx`)
- **TypeScript types/interfaces**: `StudlyCaps` with `Props` suffix for component props (e.g., `UserProps`, `PaginatedProps<T>`)
- **Utility files**: `camelCase.ts` (e.g., `formatDate.ts`, `cn.ts`)
- **Inertia shared data props**: `camelCase` keys in `HandleInertiaRequests` (e.g., `auth`, `flash`, `ziggy`)
- **Ziggy route helper**: always use typed `route()` from `ziggy-js`; never hardcode URL strings

---

## PHP & Laravel Strictness

- Use typed properties (PHP 7.4+) and typed method parameters/returns (PHP 7+).
- Prefer PHP 8.1+ enums over class constants for state/status values.
- No `mixed` type where a more specific type can be used; use `null` and nullable types explicitly.
- Return types on all methods should be explicit.
- Use constructor property promotion for simple dependencies.
- Leverage Eloquent strict mode: `Model::shouldBeStrict()` in `AppServiceProvider`.

---

## Inertia.js & React Best Practices

### Inertia Controllers
- **Always return `Inertia::render()`** from page-loading controller actions; never mix Blade views and Inertia pages for the same navigation flow.
- **Partial reloads**: Use `Inertia::render('Page', props)` and mark expensive props as `lazy()` when they aren't needed on first paint.
- **Deferred props**: Use `Inertia::defer()` for slow-queries that can load after the page renders.
- **Shared data**: Define all globally shared props in `HandleInertiaRequests::share()` only; avoid ad-hoc sharing in individual controllers.
- **Flash messages**: Share `flash` (success, error, info) via `HandleInertiaRequests`; consume them in a `<FlashMessages />` component or custom hook.

### React Components
- **Prefer functional components** — no class components unless integrating with an older library that requires them.
- **TypeScript mandatory**: All components must be typed; define explicit `Props` interfaces.
- **Component file structure**:
  ```tsx
  // 1. Imports (React, Inertia, 3rd-party, internal)
  // 2. Props interface
  // 3. Component function
  // 4. Default export
  ```
- **Single component per file** — except small, co-located sub-components that aren't reused elsewhere.
- **Props destructuring in function signature** with default values where appropriate.
- **Use `useForm()` from `@inertiajs/react`** for all form handling; it provides `data`, `setData`, `errors`, `processing`, `post`, `put`, `patch`, `delete`, `reset`.
- **Never `fetch` or `axios` directly from React** for page data — use Inertia visits or dedicated API routes only for async interactions.
- **`<Head>` component**: Every page should set a descriptive `<title>` and `<meta>` tags via `<Head title="..." />`.
- **`<Link>` component**: Use Inertia's `<Link>` for all internal navigation; use `<a>` only for external links or `target="_blank"`.
- **Preserve scroll**: Set `preserveScroll: true` in visit options when returning to list pages after edit/create.

### State Management
- **Local state**: `useState` / `useReducer` for component-scoped state.
- **Page-level state**: Props passed from controller via `Inertia::render()`.
- **Shared/global state**: Shared Inertia props (`auth`, `flash`, `permissions`) via `usePage().props`; React Context for complex global state.
- **No Redux/Zustand** unless the app grows beyond what Inertia shared data + Context can handle cleanly.

### TypeScript Standards
- `strict: true` in `tsconfig.json`.
- Explicit return types on utility functions; infer return types on React components (TS inferring `React.FC` or `JSX.Element` is fine).
- No `any` — use `unknown` and narrow the type, or define proper interfaces.
- Barrel exports via `index.ts` files in `Components/`, `Hooks/`, `utils/`.

### Forms & Validation
- **Server-side**: Use Laravel Form Requests for all validation.
- **Client-side display**: Inertia automatically surfaces validation errors via `useForm().errors` — display them inline next to fields.
- **Client-side validation**: Use simple checks before submit for instant feedback, but never rely solely on client-side validation.
- **Optimistic UI**: Avoid for financial or destructive operations; acceptable for toggles, likes, and low-risk interactions.

### Performance
- **Code splitting**: Lazy-load page components via `React.lazy()` + `<Suspense>` for large, infrequently-visited pages.
- **Bundle analysis**: Periodically run `vite build -- --analyze` (or similar) to audit bundle size.
- **Shared data pruning**: Only share what every page truly needs in `HandleInertiaRequests`.
- **Asset versioning**: Use Vite's built-in hashing; ensure `@vite` directive includes all entry points.

---

## Laravel Best Practices

- **Thin Controllers, Fat Services**: Controllers handle HTTP concerns only (request/response, Inertia rendering); business logic lives in dedicated service classes.
- **Form Requests** for validation — never validate in controllers.
- **API Resources** for transforming model data to JSON responses (for API routes, not Inertia pages).
- **Mass assignment protection** — use `$fillable` or `$guarded` on models, never both.
- **Eager loading** relationships to avoid N+1 queries; use `Model::preventLazyLoading()` in non-production.
- **Queues** for long-running tasks (emails, reports, 3rd-party API calls).
- **Service Providers** for binding interfaces to implementations and registering singleton services.
- **Config & env separation**: All config values read from `config/` files; never use `env()` outside of config files.
- **Ziggy route helper**: Install `tightenco/ziggy` and share routes via `HandleInertiaRequests`; use `route()` in React to generate URLs.

---

## Code Review Checklist

### Backend
- [ ] No duplicated logic — shared abstractions used where appropriate.
- [ ] Methods are small (< 20 lines) and have a single responsibility.
- [ ] Types are explicit; type hints on all method parameters and returns.
- [ ] Side effects isolated to boundaries (jobs, listeners, service classes).
- [ ] Controllers are thin — business logic delegated to services; only Inertia rendering or redirects.
- [ ] No magic numbers/strings — extracted to named constants or config.
- [ ] Error handling is present and user-friendly; exceptions extend base exception classes.
- [ ] Naming is clear, intention-revealing, and follows Laravel conventions above.
- [ ] Eloquent queries avoid N+1 problems; eager loading used where needed.
- [ ] Inertia shared props are defined only in `HandleInertiaRequests` — no scattered `Inertia::share()` calls.

### Frontend
- [ ] All components are TypeScript with explicit Props interfaces.
- [ ] Components are small and focused; complex components extract sub-components or custom hooks.
- [ ] No direct `fetch`/`axios` calls — use Inertia visits or `useForm()` for mutations.
- [ ] `<Head>` title set on every page component.
- [ ] Internal navigation uses `<Link>` from `@inertiajs/react`.
- [ ] Form validation errors are displayed inline (not just flash messages).
- [ ] No `any` types; proper interfaces/type narrowing used.
- [ ] Lazy/eager props distinction respected; expensive data uses `Inertia::lazy()` or `Inertia::defer()`.

---

## Anti-Patterns — Avoid These

### Backend Anti-Patterns
- ❌ Fat controllers that contain business logic, validation, and DB queries.
- ❌ Raw SQL queries outside of migrations or very rare edge cases; prefer Eloquent or Query Builder.
- ❌ Using `env()` helper outside of `config/` files (causes `null` after `config:cache`).
- ❌ Mutating Eloquent properties directly without using accessors/mutators or explicit setters.
- ❌ Accessing another module's internal classes directly — use defined service/repository contracts.
- ❌ Static method calls on classes that should be resolved via the container (`app()`, `resolve()`).
- ❌ Deeply nested conditionals — use early returns, lookup maps, or the Strategy pattern.
- ❌ Hardcoding environment-dependent values — use config files and env vars properly.
- ❌ `final` on every class — use it only when extension would break invariants.
- ❌ Validating in controllers instead of dedicated Form Request classes.
- ❌ Returning Blade views and Inertia pages from the same controller action — pick one per flow.

### Frontend Anti-Patterns
- ❌ Class components — use functional components with hooks.
- ❌ Using `axios` or `fetch` directly in React components to load page data — use Inertia visits.
- ❌ Hardcoding URLs in `<a>` or `<Link>` — use Ziggy's `route()` helper.
- ❌ Mixing `useForm` from Inertia with manual `axios.post` in the same component — commit to one flow.
- ❌ Storing server-derived state in React Context that already lives in Inertia shared props.
- ❌ Large, monolithic page components (> 200 lines) — extract into sub-components and hooks.
- ❌ Ignoring `preserveScroll` and `preserveState` options on Inertia visits when going back to list pages.
- ❌ Using `dangerouslySetInnerHTML` without sanitizing — prefer explicit React markup or a safe HTML renderer.

---

## Testing

### Backend Testing
- Business logic must be covered by **unit tests** (PHPUnit / Pest).
- Feature tests for API endpoints, controller actions, and middleware.
- Database assertions: use `assertDatabaseHas()` / `assertDatabaseMissing()` and `RefreshDatabase` trait.
- Mock 3rd-party HTTP calls with `Http::fake()`; mock jobs with `Queue::fake()` / `Bus::fake()`.
- Test files mirror the source structure under `tests/`: `tests/Unit/`, `tests/Feature/`.
- Test method naming: `test_it_does_something_when_condition()` or use `@test` annotation.

### Frontend Testing
- Component tests with **Vitest** or **Jest** + React Testing Library.
- Test user interactions (clicks, form submissions) — not implementation details.
- Mock Inertia's `usePage`, `useForm`, `router` as needed using test doubles.
- End-to-end tests with **Laravel Dusk** or **Playwright** for critical user flows (login, checkout, etc.).
- Test file co-location or mirroring under `resources/js/__tests__/` or `tests/Javascript/`.
