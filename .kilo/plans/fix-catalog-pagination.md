# Fix Product Catalog Pagination

## Bug
After searching or changing categories/filters, "Load More" pagination stuck at loading icon.

## Root Cause
In `resources/js/Pages/Store/Catalog/Index.jsx`, line 75:

```jsx
}, [priceFilter]);
```

The `useEffect` only watches `priceFilter` dependency. When category changes via URL query or search triggers `loadSearch()`, the effect doesn't re-run. The `fetchProducts` call at line 74 uses stale cached category, causing `nextPageUrlRef` to point to invalid state → loading stuck.

## Fix
Add `categoryQuery` to dependency array:

```jsx
}, [priceFilter, categoryQuery]);
```

This ensures when category changes (via sidebar click or search), the effect re-fetches with correct category parameter.

## Files Changed
- `resources/js/Pages/Store/Catalog/Index.jsx` (line 75)

## Validation
1. Load catalog page
2. Change category via sidebar → pagination works
3. Search product → pagination works
4. Adjust price range → pagination works
5. "Load More" clickable, fetches next page correctly