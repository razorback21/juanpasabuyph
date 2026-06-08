---
name: admin-design
description: Applies the juanpasabuyph admin design system to any admin page. Use when redesigning, creating, or refactoring any admin/show/edit/index page to match the established Card-based layout with lucide icons, shadcn/ui components, two-column grid, and section card patterns.
---

# Admin Design System

MUST use exact code blocks below. No deviations. Reference [EXAMPLE-Show.jsx](EXAMPLE-Show.jsx) and [EXAMPLE-Edit.jsx](EXAMPLE-Edit.jsx) as canonical implementations — match their exact style, spacing, and feel.

## Imports (use these exact imports for every admin page)

```jsx
import { useRef, useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// Add only what you need from lucide-react — never inline SVG
import { ArrowLeft, Plus, /* etc */ } from "lucide-react";
```

## Page Wrapper (exact)

```jsx
<AuthenticatedLayout
    header={
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
                <Link href={route("...")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700">
                    <ArrowLeft size={16} />
                </Link>
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Page Title</h2>
            </div>
            <button type="button" onClick={handler} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90">
                <SaveIcon size={14} />
                Action Text
            </button>
        </div>
    }
>
    <Head title="..." />
    <Toaster />
    <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* PAGE CONTENT HERE */}
        </div>
    </div>
</AuthenticatedLayout>
```

## Two-Column Grid (exact)

```jsx
<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
    <div className="space-y-6 lg:col-span-3">{/* LEFT — primary */}</div>
    <div className="space-y-6 lg:col-span-2">{/* RIGHT — sidebar */}</div>
</div>
```

## Section Card with Icon Header (exact — use for EVERY card)

```jsx
<Card>
    <CardHeader className="pb-4">
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                    <IconName size={16} className="text-gray-600" />
                </div>
                <div>
                    <CardTitle className="text-base font-semibold">Section Title</CardTitle>
                    <p className="mt-0.5 text-xs text-gray-500">Short description</p>
                </div>
            </div>
            {/* OPTIONAL: action button on right */}
            <Button size="sm" className="gap-1.5"><Plus size={14} />Action</Button>
        </div>
    </CardHeader>
    <CardContent>
        {/* content */}
    </CardContent>
</Card>
```

## Metric Row (exact — for stats, toggle rows, sidebar items)

```jsx
<div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm text-blue-600">
        <IconName size={18} />
    </div>
    <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 truncate">Label</p>
        <p className="text-lg font-bold text-gray-900">Value</p>
    </div>
</div>
```

Metric icon colors: `text-blue-600` | `text-emerald-600` | `text-amber-600` | `text-violet-600`

## Toggle Row (exact — metric row + Switch on right)

```jsx
<div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
    <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm text-amber-500">
            <IconName size={18} />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 truncate">Toggle Label</p>
            <p className="text-xs text-gray-400">Toggle description</p>
        </div>
    </div>
    <Switch
        defaultChecked={value}
        onCheckedChange={(checked) => { /* handler */ }}
    />
</div>
```

## Content Card — Image + Details (exact)

```jsx
<Card className="overflow-hidden">
    <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
            <div className="shrink-0 sm:w-[260px]">
                {/* img: h-[260px] w-full object-cover sm:h-full sm:rounded-l-xl */}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                {/* details */}
            </div>
        </div>
    </CardContent>
</Card>
```

## Empty State (exact)

```jsx
<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-12">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <IconName size={20} className="text-gray-400" />
    </div>
    <p className="mt-3 text-sm font-medium text-gray-500">No items yet</p>
    <p className="mt-1 text-xs text-gray-400">Helper text explaining what to do</p>
</div>
```

## Status Badge Colors (exact)

```jsx
// In Stock / Active / Success
<Badge variant="outline" className="text-xs font-semibold text-emerald-600 bg-emerald-50 border-emerald-200">In Stock</Badge>

// Low / Warning
<Badge variant="outline" className="text-xs font-semibold text-amber-600 bg-amber-50 border-amber-200">Low Stock</Badge>

// Out / Error
<Badge variant="outline" className="text-xs font-semibold text-red-600 bg-red-50 border-red-200">Out of Stock</Badge>

// Label (neutral)
<Badge variant="outline" className="text-xs font-normal">Sold per pc</Badge>

// Disabled
<Badge variant="secondary">Disabled</Badge>
```

## Form Input Styling (exact)

```jsx
// Text input
<input
    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
/>

// Select
<select className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
```

## Error Display (exact)

```jsx
{props.errors?.field_name && (
    <p className="mt-1 text-xs text-red-500">Field error message</p>
)}
```

## Feedback (exact)

```jsx
// Success
toast.success("Action completed!");
// Error
toast.error("Action failed.");
```

NEVER use `AlertConfirm`, `window.alert`, or inline error dialogs. ALWAYS use `toast` from sonner.

## Card Content Spacing (exact)

```jsx
// Cards with metric/toggle rows
<CardContent className="space-y-3">

// Cards with form fields
<CardContent>
    <div className="space-y-4">

// Cards with mixed content
<CardContent className="space-y-4">
```

## Full-Width Section Below Grid (exact)

```jsx
<div className="mt-8">
    <Card>
        <CardHeader className="pb-4">
            {/* Section Card header pattern */}
        </CardHeader>
        <CardContent>
            {/* content or table */}
        </CardContent>
    </Card>
</div>
```

## Page Type Structures

### Show Page
```
Header (back + title + edit action)
├── Two-Column Grid
│   ├── Left (3/5): Content Card (image + details)
│   └── Right (2/5): Summary Card (metric rows)
├── Full-Width Card: Related sub-section (mt-8)
└── Full-Width Card: History table (mt-8)
```

### Edit Page
```
Header (back + title + save action)
├── Two-Column Grid
│   ├── Left (3/5): Form Card (fields + pricing)
│   └── Right (2/5): Toggle Card + Gallery Card
```

### Index Page
```
Header (title + create action button)
└── Full-Width Card: Table + Pagination
```

## Workflow (exact order)

1. Read target page file
2. Identify page type (show/edit/index)
3. Apply matching page structure above
4. Use ONLY the exact JSX blocks from this skill — no custom styling
5. Replace all inline SVGs with lucide-react icons at correct sizes
6. Remove `LinkButton` back buttons -> use ArrowLeft icon Link
7. Remove `AlertConfirm` -> use toast
8. Build: `npx vite build`
9. Verify in browser
