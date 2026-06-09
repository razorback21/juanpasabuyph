# Fix Catalog Search - Design Issue

## Problem
Search only works within current page's visible products because it's constrained by active price filter. Users cannot search across entire catalog.

**Current Behavior:**
- User enters search term → `loadSearch(searchTerm, 'All')` called
- Frontend sends active `priceFilter.min/max` to backend
- Backend filters by BOTH search term AND price range
- Result: Search limited to current price range, not all products

**Root Cause:**
Line 37-38 in `Index.jsx` sends `priceFilter` state to API even during search, constraining results.

## Design Decisions

1. **Category Scope:** Search respects active category. If no category active, search all.
2. **Price Range:** After search completes, price range slider updates to search results' min/max.
3. **Filter Reset:** Price filter resets to new range from search results, not full catalog range.
4. **URL Sync:** URL reflects current category + search term + result price range.

## Implementation Tasks

### 1. Backend - Return Price Range in API Response
**File:** `app/Services/CataglogService.php`

Modify `getPaginatedData()` to calculate and return price range of current query results:

```php
// Before pagination (after line 40)
$priceRange = [
    'min' => (float) $products->min('price'),
    'max' => (float) $products->max('price'),
];

$result = $products->orderBy('price', 'asc')->paginate($itemPerPage)->withQueryString();

// Add priceRange to response
$result->priceRange = $priceRange;

return $result;
```

### 2. Frontend - Track Active Category During Search
**File:** `resources/js/Pages/Store/Catalog/Index.jsx`

**Modify `SearchProducts` component:**
- Pass `activeCategory` prop
- Use in `handleSearch` instead of hardcoded 'All'

**Modify `Index` component:**
- Pass `categoryQuery` to `SearchProducts`

```javascript
// In SearchProducts props
function SearchProducts({ loadMoreRef, activeCategory }) {

// In handleSearch (line 238)
loadMoreRef.current?.loadSearch(searchTerm, activeCategory);

// In Index render
<SearchProducts loadMoreRef={loadMoreRef} activeCategory={categoryQuery} />
```

### 3. Frontend - Accept and Apply Price Range from Search
**File:** `resources/js/Pages/Store/Catalog/Index.jsx`

**Modify `LoadMore` component:**
- Add `onPriceRangeChange` prop to parent callback
- Extract `priceRange` from API response
- Call callback on search results

```javascript
// In fetchProducts (after line 45)
const resultPriceRange = response.priceRange || { min: priceFilter.min, max: priceFilter.max };
if (onPriceRangeChange && search) {
    onPriceRangeChange(resultPriceRange);
}

// In useImperativeHandle (line 97)
onPriceRangeChange: onPriceRangeChange
```

**Modify `Index` component:**
- Add handler for price range updates
- Update `priceFilter` state when search completes

```javascript
const handleSearchPriceRangeChange = (newRange) => {
    setPriceFilter({ min: newRange.min, max: newRange.max });
};

// In LoadMore render
<LoadMore
    ref={loadMoreRef}
    priceFilter={priceFilter}
    categoryQuery={categoryQuery}
    priceRange={priceRange}
    onPriceRangeChange={handleSearchPriceRangeChange}
/>
```

### 4. Frontend - URL Update for Category During Search
**File:** `resources/js/Pages/Store/Catalog/Index.jsx`

**Modify `handleSearch` function (line 228):**
- Keep category in URL if active
- Update price range in URL to match results

```javascript
function handleSearch(e) {
    const searchTerm = searchInputRef.current.value;
    const url = new URL(window.location);

    // Don't delete category - keep it if active
    if (activeCategory && activeCategory !== 'All') {
        url.searchParams.set('category', activeCategory);
    }

    if (searchTerm) {
        url.searchParams.set('search', searchTerm);
    } else {
        url.searchParams.delete('search');
    }

    window.history.pushState({}, '', url);
    loadMoreRef.current?.loadSearch(searchTerm, activeCategory);
}
```

### 5. Validation

**Manual Testing Checklist:**
- [ ] Search with active category "Electronics" → Results within Electronics only
- [ ] Search with no category → Results across all categories
- [ ] After search completes, price slider reflects result min/max
- [ ] Search with active price filter $50-$100 → Price slider updates to result range (e.g., $45-$120)
- [ ] URL updates with category + search term + price params
- [ ] Clear search → Returns to previous category with original price range

**Edge Cases:**
- Empty search results → Price range {0, 0} or null
- Search term with special characters → Backend handles via `like` query
- Very large result set → Paginated, price range calculated from full query before pagination

## Files Modified
- `app/Services/CataglogService.php` - Add price range calculation
- `resources/js/Pages/Store/Catalog/Index.jsx` - Category-aware search, price range updates

## Risk Assessment
- **Risk:** LOW - Backend already supports search params. Frontend state management only.
- **Breaking Change:** No. Adds functionality, doesn't remove existing behavior.
- **Rollback:** Simple git revert if issues arise.