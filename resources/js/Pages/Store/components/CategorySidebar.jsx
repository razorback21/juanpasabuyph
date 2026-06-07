import { useState, useRef, useCallback, useEffect } from "react";
import { Link, router } from "@inertiajs/react";

function PriceRangeSlider({ min, max, initialMin, initialMax, onChange }) {
    const [minVal, setMinVal] = useState(initialMin);
    const [maxVal, setMaxVal] = useState(initialMax);
    const minRef = useRef(null);
    const maxRef = useRef(null);
    const range = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (minRef.current && range.current) {
            const minPercent = getPercent(minVal);
            range.current.style.left = `${minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (maxRef.current && range.current) {
            const maxPercent = getPercent(maxVal);
            range.current.style.width = `${maxPercent - getPercent(minVal)}%`;
        }
    }, [maxVal, getPercent, minVal]);

    function minPercent() {
        return getPercent(minVal);
    }

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxVal - 1);
        setMinVal(value);
        onChange({ min: value, max: maxVal });
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minVal + 1);
        setMaxVal(value);
        onChange({ min: minVal, max: value });
    };

    return (
        <div className="mt-3">
            <div className="relative h-2 mb-6">
                <div className="absolute inset-0 h-2 rounded-full bg-gray-200" />
                <div
                    ref={range}
                    className="absolute h-2 rounded-full bg-gradient-to-r from-[#e92933] to-[#ff6b6b]"
                />
                <input
                    ref={minRef}
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={handleMinChange}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#e92933] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#e92933] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
                <input
                    ref={maxRef}
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={handleMaxChange}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#e92933] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#e92933] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
            </div>
            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                        ₱
                    </span>
                    <input
                        type="number"
                        value={minVal}
                        onChange={(e) => {
                            const val = Math.max(
                                min,
                                Math.min(Number(e.target.value), maxVal - 1)
                            );
                            setMinVal(val);
                            onChange({ min: val, max: maxVal });
                        }}
                        className="w-full h-9 pl-7 pr-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92933]/30 focus:border-[#e92933] transition-all"
                    />
                </div>
                <span className="text-gray-300 text-sm font-medium">—</span>
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                        ₱
                    </span>
                    <input
                        type="number"
                        value={maxVal}
                        onChange={(e) => {
                            const val = Math.min(
                                max,
                                Math.max(Number(e.target.value), minVal + 1)
                            );
                            setMaxVal(val);
                            onChange({ min: minVal, max: val });
                        }}
                        className="w-full h-9 pl-7 pr-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92933]/30 focus:border-[#e92933] transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

export default function CategorySidebar({
    categories,
    activeCategorySlug,
    priceRange,
}) {
    const [priceFilter, setPriceFilter] = useState({
        min: priceRange.min,
        max: priceRange.max,
    });

    const handleCategoryClick = (slug) => {
        router.get(
            route("catalog"),
            { category: slug },
            { preserveState: true, replace: true }
        );
    };

    const handleApplyPriceFilter = () => {
        router.get(
            route("catalog"),
            {
                category: activeCategorySlug || undefined,
                price_min: priceFilter.min,
                price_max: priceFilter.max,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleResetFilters = () => {
        setPriceFilter({ min: priceRange.min, max: priceRange.max });
        router.get(route("catalog"), {}, { preserveState: true, replace: true });
    };

    return (
        <aside className="w-full lg:w-64 xl:w-72 shrink-0">
            <div className="sticky top-24 space-y-5">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                            Categories
                        </h3>
                    </div>
                    <div className="p-3">
                        <button
                            onClick={() => handleCategoryClick("all")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                !activeCategorySlug || activeCategorySlug === "all"
                                    ? "bg-[#e92933]/10 text-[#e92933]"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <span
                                className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold ${
                                    !activeCategorySlug || activeCategorySlug === "all"
                                        ? "bg-[#e92933] text-white"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                            >
                                All
                            </span>
                            <span>All Products</span>
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeCategorySlug === cat.slug
                                        ? "bg-[#e92933]/10 text-[#e92933]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <span
                                    className={`flex items-center justify-center min-w-[1.5rem] h-6 rounded-lg text-xs font-bold ${
                                        activeCategorySlug === cat.slug
                                            ? "bg-[#e92933] text-white"
                                            : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {cat.products_count}
                                </span>
                                <span className="truncate">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                            Price Range
                        </h3>
                    </div>
                    <div className="p-5">
                        <PriceRangeSlider
                            min={priceRange.min}
                            max={priceRange.max}
                            initialMin={priceRange.min}
                            initialMax={priceRange.max}
                            onChange={setPriceFilter}
                        />
                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={handleApplyPriceFilter}
                                className="flex-1 h-10 rounded-xl bg-[#e92933] text-white text-sm font-semibold hover:bg-[#ce2b30] transition-colors shadow-sm hover:shadow-md active:scale-[0.98]"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleResetFilters}
                                className="h-10 px-4 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors active:scale-[0.98]"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
