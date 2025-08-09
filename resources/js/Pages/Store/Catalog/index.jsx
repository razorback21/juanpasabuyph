import Layout from "@/Pages/Store/components/Layout.jsx";
import Products from "../components/Products";
import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import Axios from "@/lib/axios";

export default function Index({ title, categories }) {
    const catalogRef = useRef(null);
    const loadMoreRef = useRef(null);
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
                typeof category === "string" ? category : category.slug;
            titleRef.current =
                categoryName === "All"
                    ? "All Categories"
                    : categories.find((cat) => cat.slug === categoryName).name;
            setIsDropdownOpen(false);

            // Update URL with the selected category
            const currentUrl = new URL(window.location);
            if (categoryName === "All" || categoryName === "all") {
                currentUrl.searchParams.delete("category");
            } else {
                currentUrl.searchParams.set("category", categoryName);
            }

            window.history.pushState({}, "", currentUrl.toString());
            loadMoreRef.current?.loadCategory(categoryName);
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

    const LoadMore = forwardRef((props, ref) => {
        const [products, setProducts] = useState([]);
        const [nextPageUrl, setNextPageUrl] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const [category, setCategory] = useState("All");

        useEffect(() => {
            const currentUrl = new URL(window.location);
            const categoryName = currentUrl.searchParams.get("category");

            if (categoryName === "All" || categoryName === "") {
                categoryName = "All";
            }

            Axios.get(
                route("catalog.paginate", {
                    category: categoryName,
                    page: 1,
                })
            ).then((res) => {
                setProducts(res.data);
                setNextPageUrl(res.next_page_url);
            });
        }, []);

        useImperativeHandle(ref, () => ({
            loadCategory: (category) => {
                console.log(category);
                Axios.get(
                    route("catalog.paginate", { category, page: 1 })
                ).then((res) => {
                    setProducts(res.data);
                    setNextPageUrl(res.next_page_url);
                });
            },
        }));

        function loadNextProducts() {
            if (nextPageUrl && !isLoading) {
                setIsLoading(true);
                Axios.get(nextPageUrl, category && { category })
                    .then((res) => {
                        setProducts([...products, ...res.data]);
                        setNextPageUrl(res.next_page_url);
                        setIsLoading(false);
                    })
                    .catch(() => {
                        setIsLoading(false);
                    });
            }
        }

        return (
            <div className="grid grid-col-1">
                <Products products={products} />
                {nextPageUrl && (
                    <div className="grid grid-col-1 mt-10">
                        <div className="flex justify-center px-4 md:px-0">
                            <button
                                onClick={loadNextProducts}
                                disabled={isLoading}
                                className="w-full p-2 text-gray-600 w-full md:w-1/2 rounded-md border-2 border-gray-300 border-dashed text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading && (
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
                                {isLoading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    });

    return (
        <Layout title={title}>
            <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
                <h1 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">
                    All Products
                </h1>{" "}
                asas
            </div>

            <div className="flex flex-wrap gap-3 p-4 mb-6 bg-white rounded-lg shadow-sm">
                <CategoryDropdown />
            </div>
            <section>
                <LoadMore ref={loadMoreRef} />
            </section>
        </Layout>
    );
}
