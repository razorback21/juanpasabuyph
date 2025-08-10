import reviewsData from "../../../data/reviews.json";

export default function Reviews() {
    return (
        <div className="mb-8 sm:mb-12">
            <header>
                <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4">
                    What Our Customers Say
                </h2>
                <p className={`text-gray-500 px-4 pb-6 pt-2`}>
                    Read testimonials from satisfied customers who trust
                    JuanPasabuyPH for their Dubai shopping needs.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
                {reviewsData.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                    >
                        <div className="flex items-start mb-4">
                            {/* <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                                onError={(e) => {
                                    e.target.src =
                                        "/images/avatars/default-avatar.jpg";
                                }}
                            /> */}
                            <div className="mr-4 w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-user-round-icon lucide-user-round"
                                >
                                    <circle cx="12" cy="8" r="5" />
                                    <path d="M20 21a8 8 0 0 0-16 0" />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <h4 className="text-gray-800 text-base sm:text-lg font-semibold">
                                    {review.name}
                                </h4>
                                <p className="text-gray-500 text-xs">
                                    {new Date(review.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="mr-3 text-yellow-400 flex mb-3">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i >= review.rating
                                            ? "text-gray-300"
                                            : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                            "{review.review}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
