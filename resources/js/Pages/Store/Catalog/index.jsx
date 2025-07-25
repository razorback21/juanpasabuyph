import Layout from "@/Pages/Store/components/Layout.jsx";
import Products from "../components/Products";
import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

export default function ({ title, products, categories }) {
    const catalogRef = useRef(null);
    const urlQuery = new URLSearchParams(window.location.search);
    const categoryQuery = urlQuery.get("category") ?? "All";
    const titleRef = useRef(
        categoryQuery == "All" ? "All Categories" : categoryQuery
    );

    function CategoryDropdown() {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const dropdownRef = useRef(null);

        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }

        function handleCategoryChange(category) {
            const categoryName =
                typeof category === "string" ? category : category.name;
            catalogRef.current.filter(categoryName);
            titleRef.current =
                categoryName === "All" ? "All Categories" : categoryName;
            setIsDropdownOpen(false);

            // Update URL with the selected category
            const currentUrl = new URL(window.location);
            if (categoryName === "All" || categoryName === "all") {
                currentUrl.searchParams.delete("category");
            } else {
                currentUrl.searchParams.set("category", categoryName);
            }

            window.history.pushState({}, "", currentUrl.toString());
        }

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex h-10 items-center gap-x-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-4 transition-colors"
                >
                    <div className="text-gray-500">Category :</div>
                    <div className="text-sm font-medium">
                        {titleRef.current}
                    </div>
                    {/* <div className="text-xs text-gray-500 font-bold">
                            ({products.length})
                        </div> */}
                    <div
                        className={`text-gray-500 hover:text-red-600 cursor-pointer transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                        }`}
                        data-icon="CaretDown"
                        data-size="20px"
                        data-weight="regular"
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryChange("All");
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                            >
                                All Categories
                            </a>
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCategoryChange(category);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                                >
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const ProductCatalog = forwardRef((props, ref) => {
        const [filteredProducts, setFilteredProducts] = useState(
            urlQuery.get("category") == "All" || !urlQuery.get("category")
                ? props.products
                : props.products.filter(
                      (product) =>
                          product.category.name == urlQuery.get("category")
                  )
        );

        useImperativeHandle(ref, () => ({
            filter: (category) => {
                console.log(category, "AAAAAAAAA");
                if (category == "All") {
                    setFilteredProducts(props.products);
                } else {
                    setFilteredProducts(
                        props.products.filter(
                            (product) => product.category.name == category
                        )
                    );
                }
            },
        }));

        return (
            <div>
                <div className="py-2 text-sm px-4 text-gray-600">
                    {filteredProducts.length} items found in this category
                </div>
                <Products products={filteredProducts} />
            </div>
        );
    });

    return (
        <Layout title={title}>
            <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
                <h1 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">
                    All Products
                </h1>
            </div>

            <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-lg shadow-sm">
                <CategoryDropdown />
            </div>

            <ProductCatalog products={products} ref={catalogRef} />
        </Layout>
    );
}
