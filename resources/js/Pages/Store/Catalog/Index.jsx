import Layout from "@/Pages/Store/components/Layout.jsx";
import Products from "../components/Products";
import CategorySidebar from "../components/CategorySidebar";
import { PriceRangeSlider } from "../components/CategorySidebar";
import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import Axios from "@/lib/axios";

const LoadMore = forwardRef(({ priceFilter, categoryQuery, priceRange }, ref) => {
    const productsRef = useRef([]);
    const allProductsRef = useRef([]);
    const nextPageUrlRef = useRef("");
    const isLoadingRef = useRef(false);
    const isFetchingRef = useRef(true);
    const categoryRef = useRef("All");
    const totalProductsRef = useRef(0);
    const forceUpdateRef = useRef(0);
    const [, setForceUpdate] = useState({});

    const forceUpdate = () => {
        forceUpdateRef.current += 1;
        setForceUpdate({});
    };

    const filterProductsByPrice = (products) => {
        return products.filter(product =>
            parseFloat(product.price) >= priceFilter.min &&
            parseFloat(product.price) <= priceFilter.max
        );
    };

    const fetchProducts = async (category, search = null) => {
        const response = await Axios.get(
            route("catalog.paginate", {
                category,
                page: 1,
                search,
            })
        );
        allProductsRef.current = response.data;
        productsRef.current = filterProductsByPrice(response.data);
        nextPageUrlRef.current = response.next_page_url;
        totalProductsRef.current = response.total;
        categoryRef.current = category;
        isFetchingRef.current = false;
        forceUpdate();
    };

    useEffect(() => {
        const currentUrl = new URL(window.location);
        let categoryName = currentUrl.searchParams.get("category");
        categoryName =
            categoryName === "All" || categoryName === ""
                ? "All"
                : categoryName;
        fetchProducts(categoryName);
    }, []);

    useEffect(() => {
        productsRef.current = filterProductsByPrice(allProductsRef.current);
        forceUpdate();
    }, [priceFilter]);

    function loadNextProducts() {
        if (nextPageUrlRef.current && !isLoadingRef.current) {
            isLoadingRef.current = true;
            forceUpdate();

            Axios.get(
                nextPageUrlRef.current,
                categoryRef.current && { category: categoryRef.current }
            )
                .then((res) => {
                    allProductsRef.current = [
                        ...allProductsRef.current,
                        ...res.data,
                    ];
                    productsRef.current = filterProductsByPrice(allProductsRef.current);
                    nextPageUrlRef.current = res.next_page_url;
                    totalProductsRef.current = res.total;
                    isLoadingRef.current = false;
                    forceUpdate();
                })
                .catch(() => {
                    isLoadingRef.current = false;
                    forceUpdate();
                });
        }
    }

    function loadSearch(searchTerm) {
        isLoadingRef.current = true;
        forceUpdate();

        fetchProducts(categoryRef.current, searchTerm || null);
    }

    useImperativeHandle(ref, () => ({
        loadNextProducts,
        loadSearch
    }));

    if (isFetchingRef.current) {
        return (
            <div className="px-4 my-2 text-sm text-gray-500">
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            className="animate-spin h-8 w-8 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span className="text-gray-500">
                            Loading products...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-col-1">
            <div className="px-4 my-2 text-sm text-gray-500">
                {totalProductsRef.current} items found in this category
            </div>
            {productsRef.current?.length === 0 && (
                <div className="flex items-center justify-center min-h-[200px]">
                    <div className="flex flex-col items-center gap-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-16 h-16 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                No products found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search or filter to find
                                what you're looking for.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <Products products={productsRef.current} />
            {nextPageUrlRef.current && (
                <div className="grid grid-col-1 mt-10">
                    <div className="flex justify-center px-4 md:px-0">
                        <button
                            onClick={loadNextProducts}
                            disabled={isLoadingRef.current}
                            className="w-full p-2 text-gray-600 w-full font-bold rounded-md border-2 border-gray-300 border-dashed text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoadingRef.current && (
                                <svg
                                    className="animate-spin h-4 w-4 text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            {isLoadingRef.current
                                ? "Loading..."
                                : "Load More"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

function SearchProducts({ loadMoreRef }) {
    const searchInputRef = useRef(null);

    function searchValue(e) {
        e.preventDefault();
        searchInputRef.current.value = e.target.value;
    }

    function handleSearch(e) {
        const searchTerm = searchInputRef.current.value;
        loadMoreRef.current?.loadSearch(searchTerm);
    }

    function handleKeyUp(e) {
        if (e.key === "Enter") {
            handleSearch(e);
        } else if (e.target.value == "") {
            handleSearch(e);
        }
    }

    return (
        <>
            <div className="relative w-full">
                <div className="flex items-center">
                    <input
                        ref={searchInputRef}
                        onChange={searchValue}
                        onKeyUp={handleKeyUp}
                        type="text"
                        placeholder="Search products..."
                        className="h-10 w-full rounded-lg bg-gray-100 px-4 text-sm focus:outline-none border-0 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-3 text-gray-500 hover:text-red-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

function requestCategory() {
    const urlQuery = new URLSearchParams(window.location.search);
    return urlQuery.get("category") ?? "All";
}

export default function Index({ title, categories, priceRange = { min: 0, max: 10000 } }) {
    const loadMoreRef = useRef(null);
    const categoryQuery = requestCategory();
    const [priceFilter, setPriceFilter] = useState({ min: priceRange.min, max: priceRange.max });

    const previousCategoryRef = useRef(categoryQuery);

    useEffect(() => {
        if (previousCategoryRef.current !== categoryQuery) {
            setPriceFilter({ min: priceRange.min, max: priceRange.max });
            previousCategoryRef.current = categoryQuery;
        }
    }, [categoryQuery]);

    return (
        <Layout title={title}>
            <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
                <h1 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">
                    All Products
                </h1>
            </div>

            <div className="lg:hidden px-4 mb-6 space-y-2">
                <SearchProducts loadMoreRef={loadMoreRef} />
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Price Range
                    </h3>
                    <PriceRangeSlider
                        min={priceRange.min}
                        max={priceRange.max}
                        initialMin={priceRange.min}
                        initialMax={priceRange.max}
                        onChange={setPriceFilter}
                    />
                </div>
                <CategorySidebar
                    categories={categories}
                    activeCategorySlug={categoryQuery}
                    priceRange={priceRange}
                    onPriceFilterChange={setPriceFilter}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24">
                    <CategorySidebar
                        categories={categories}
                        activeCategorySlug={categoryQuery}
                        priceRange={priceRange}
                        onPriceFilterChange={setPriceFilter}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="hidden lg:flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-lg shadow-sm">
                        <SearchProducts loadMoreRef={loadMoreRef} />
                    </div>
                    <section>
                        <LoadMore
                            ref={loadMoreRef}
                            priceFilter={priceFilter}
                            categoryQuery={categoryQuery}
                            priceRange={priceRange}
                        />
                    </section>
                </div>
            </div>
        </Layout>
    );
}
