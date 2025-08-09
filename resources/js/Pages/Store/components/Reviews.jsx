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
                {[
                    {
                        title: "Smartwatch is a game-changer!",
                        review: "Absolutely love the new smartwatch! The battery life is amazing, and it tracks my workouts perfectly. Highly recommend it for anyone looking to stay active and connected.",
                        rating: 4,
                        author: "Sarah M.",
                    },
                    {
                        title: "Designer Handbag is stunning!",
                        review: "The quality of this handbag is exceptional. It's even more beautiful in person! I've received so many compliments. A perfect addition to my collection.",
                        rating: 5,
                        author: "John B.",
                    },
                    {
                        title: "Best Headphones I've owned!",
                        review: "The sound quality of these wireless headphones is incredible! They are comfortable for long listening sessions and the noise cancellation is top-notch. Definitely worth the price.",
                        rating: 5,
                        author: "Emily K.",
                    },
                ].map((review, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col"
                    >
                        <div className="flex items-center mb-3">
                            <h4 className="text-gray-800 text-base sm:text-lg font-semibold">
                                {review.title}
                            </h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            "{review.review}"
                        </p>
                        <div className="mr-3 text-yellow-400 flex">
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
                        <p className="text-gray-700 text-sm font-medium mt-auto">
                            - {review.author}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
