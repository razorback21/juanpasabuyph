# Admin Design System

Design patterns for admin pages. Based on Product Show redesign.

## Stack

- **shadcn/ui** — Card, Badge, Button, Separator, Table, Dialog, Tabs
- **Tailwind CSS v3** — utility-first, no custom CSS
- **lucide-react** — icons
- **Inertia.js v2** — Link, router, useForm

## Page Layout

```
┌─────────────────────────────────────────────┐
│ Header (AuthenticatedLayout > header prop)  │
│ [← Back]  Page Title        [Primary Action]│
├─────────────────────────────────────────────┤
│ max-w-7xl px-4 sm:px-6 lg:px-8             │
│                                             │
│ ┌─────────────────┐ ┌───────────────┐       │
│ │  Left (3/5)     │ │ Right (2/5)   │       │
│ │  lg:col-span-3  │ │ lg:col-span-2 │       │
│ └─────────────────┘ └───────────────┘       │
│                                             │
│ ┌───────────────────────────────────────┐   │
│ │ Full-width section (mt-8)             │   │
│ └───────────────────────────────────────┘   │
│                                             │
│ ┌───────────────────────────────────────┐   │
│ │ Full-width section (mt-8)             │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Grid

```jsx
<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
    <div className="lg:col-span-3">{/* Primary content */}</div>
    <div className="lg:col-span-2">{/* Sidebar / summary */}</div>
</div>
```

Responsive: stacks to single column on mobile via `grid-cols-1`.

### Header Bar

```jsx
<header={
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Link href={route("...")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700">
                <ArrowLeft size={16} />
            </Link>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">Page Title</h2>
        </div>
        <Link className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90">
            <Pencil size={14} />
            Action
        </Link>
    </div>
}>
```

- Back: icon-only button with border, `h-8 w-8`
- Primary action: `bg-primary`, uppercase, icon + text

## Cards

All content sections use `Card`. No raw divs with manual borders.

### Content Card (image + details)

```jsx
<Card className="overflow-hidden">
    <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
            <div className="shrink-0 sm:w-[260px]">
                {/* image — h-[260px] w-full object-cover */}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                {/* details */}
            </div>
        </div>
    </CardContent>
</Card>
```

### Section Card (with icon header)

```jsx
<Card>
    <CardHeader className="pb-4">
    <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                    <Icon size={16} className="text-gray-600" />
                </div>
                <div>
                    <CardTitle className="text-base font-semibold">Title</CardTitle>
                    <p className="mt-0.5 text-xs text-gray-500">Subtitle</p>
                </div>
            </div>
            {/* optional action button */}
        </div>
    </CardHeader>
    <CardContent>
        {/* content */}
    </CardContent>
</Card>
```

Icon container: `h-8 w-8 rounded-md bg-gray-100`, icon `text-gray-600`.

### Metric Card (sidebar stats)

```jsx
<div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm text-{color}-600">
        <Icon size={18} />
    </div>
    <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 truncate">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
</div>
```

Metric colors: `text-blue-600`, `text-emerald-600`, `text-amber-600`, `text-violet-600`.

## Empty States

```jsx
<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-12">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Icon size={20} className="text-gray-400" />
    </div>
    <p className="mt-3 text-sm font-medium text-gray-500">No items yet</p>
    <p className="mt-1 text-xs text-gray-400">Helper text</p>
</div>
```

## Badges

- **Status** — `variant="outline"` + color class: `text-emerald-600 bg-emerald-50 border-emerald-200`
- **Label** — `variant="outline" className="text-xs font-normal"`
- **Disabled** — `variant="secondary"`
- **Destructive** — `variant="destructive"`

### Status Color Mapping

```
success/active  → text-emerald-600 bg-emerald-50 border-emerald-200
warning/low     → text-amber-600 bg-amber-50 border-amber-200
error/out       → text-red-600 bg-red-50 border-red-200
info            → text-blue-600 bg-blue-50 border-blue-200
neutral         → variant="outline" (default)
```

## Typography

```
Page title    → text-2xl font-bold tracking-tight text-gray-900
Section title → text-base font-semibold (inside CardTitle)
Label         → text-xs font-medium text-gray-500
Body          → text-sm leading-relaxed text-gray-600
Value (lg)    → text-lg font-bold text-gray-900
Value (xl)    → text-2xl font-bold text-gray-900
```

## Spacing

- Page padding: `py-8` on outer wrapper
- Grid gap: `gap-6`
- Card internal: `p-6` (content), `pb-3` / `pb-4` (header)
- Between sections: `mt-8`
- Metric items: `space-y-3`

## Icons

All from `lucide-react`. Size conventions:

- Header actions: `size={14}`
- Inline icons: `size={16}`
- Metric icons: `size={18}`
- Empty state: `size={20}`

## Section Ordering Pattern

1. Primary info (left) + Summary/sidebar (right) — `grid-cols-5`
2. Sub-sections below — full width, `mt-8` spacing, each in Card
3. Tables inside Card > CardContent

## Responsive

- `grid-cols-1 lg:grid-cols-5` — stacks on mobile
- `flex-col sm:flex-row` — image/details stack on mobile
- `px-4 sm:px-6 lg:px-8` — container padding
- `sm:w-[260px]` — fixed image width on desktop
