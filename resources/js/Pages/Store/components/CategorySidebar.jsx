import { useState, useRef, useCallback, useEffect } from "react";
import { router } from "@inertiajs/react";

export function PriceRangeSlider({ min, max, initialMin, initialMax, onChange }) {
    const [minVal, setMinVal] = useState(initialMin);
    const [maxVal, setMaxVal] = useState(initialMax);
    const minRef = useRef(null);
    const maxRef = useRef(null);
    const range = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        setMinVal(initialMin);
        setMaxVal(initialMax);
    }, [initialMin, initialMax]);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (minRef.current && range.current) {
            const minPercent = Math.max(0, Math.min(100, getPercent(minVal)));
            range.current.style.left = `${minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (maxRef.current && range.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = Math.max(0, Math.min(100, getPercent(maxVal)));
            range.current.style.width = `${Math.max(0, maxPercent - minPercent)}%`;
        }
    }, [maxVal, getPercent, minVal]);

    const debouncedOnChange = useCallback(
        (value) => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
                onChange(value);
            }, 300);
        },
        [onChange]
    );

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxVal - 1);
        setMinVal(value);
        debouncedOnChange({ min: value, max: maxVal });
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minVal + 1);
        setMaxVal(value);
        debouncedOnChange({ min: minVal, max: value });
    };

    const handleMinInput = (e) => {
        const val = Math.max(
            min,
            Math.min(Number(e.target.value), maxVal - 1)
        );
        setMinVal(val);
    };

    const handleMaxInput = (e) => {
        const val = Math.min(
            max,
            Math.max(Number(e.target.value), minVal + 1)
        );
        setMaxVal(val);
    };

    const handleMinBlur = () => {
        debouncedOnChange({ min: minVal, max: maxVal });
    };

    const handleMaxBlur = () => {
        debouncedOnChange({ min: minVal, max: maxVal });
    };

    return (
        <div className="mt-3 w-full">
            <div className="relative h-2 mb-6 w-full">
                <div className="absolute inset-0 h-2 rounded-full bg-gray-200 w-full" />
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
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff6b6b] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#ff6b6b] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
                <input
                    ref={maxRef}
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={handleMaxChange}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e92933] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#e92933] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
            </div>
            <div className="flex items-center gap-3">
                <div className="relative flex-1 min-w-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium whitespace-nowrap z-10">
                        ₱
                    </span>
                    <input
                        type="number"
                        value={minVal}
                        onChange={handleMinInput}
                        onBlur={handleMinBlur}
                        className="w-full h-9 pl-7 pr-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92933]/30 focus:border-[#e92933] transition-all"
                    />
                </div>
                <span className="text-gray-300 text-sm font-medium shrink-0">—</span>
                <div className="relative flex-1 min-w-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium whitespace-nowrap z-10">
                        ₱
                    </span>
                    <input
                        type="number"
                        value={maxVal}
                        onChange={handleMaxInput}
                        onBlur={handleMaxBlur}
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
    onPriceFilterChange,
}) {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const dropdownRef = useRef(null);

    function handleClickOutside(event) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsMobileFilterOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCategoryClick = (slug) => {
        setIsMobileFilterOpen(false);
        router.get(
            route("catalog"),
            { category: slug },
            { preserveState: true, replace: true }
        );
    };

    const handlePriceChange = (newPriceFilter) => {
        if (onPriceFilterChange) {
            onPriceFilterChange(newPriceFilter);
        }
    };

    const activeCategoryName = !activeCategorySlug || activeCategorySlug === "all"
        ? "All Products"
        : categories.find((cat) => cat.slug === activeCategorySlug)?.name || "All Products";

    return (
        <>
            <aside className="hidden lg:block w-full lg:w-64 xl:w-72 shrink-0">
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
                </div>
            </aside>

            <div className="lg:hidden relative w-full" ref={dropdownRef}>
                <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex h-10 items-center gap-x-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 transition-colors w-full"
                >
                    <div className="text-gray-500">Filter:</div>
                    <div className="text-sm font-medium">
                        {activeCategoryName}
                    </div>
                    <div
                        className={`text-gray-500 hover:text-red-600 cursor-pointer transition-transform duration-200 ml-auto ${
                            isMobileFilterOpen ? "rotate-180" : ""
                        }`}
                    >
                        <svg
                            fill="currentColor"
                            height="18px"
                            viewBox="0 0 256 256"
                            width="18px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                    </div>
                </button>

                {isMobileFilterOpen && (
                    <div className="mt-2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                    Categories
                                </h3>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => handleCategoryClick("all")}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            !activeCategorySlug || activeCategorySlug === "all"
                                                ? "bg-[#e92933]/10 text-[#e92933]"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
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
                                            <span>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
