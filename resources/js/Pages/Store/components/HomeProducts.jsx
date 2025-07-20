export default function ({ products, title }) {
    return (
        <section className="mb-12">
            <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-tight px-4 pb-6">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => (
                    <div className="flex flex-col gap-3 pb-3 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                            style={{
                                backgroundImage: 'url("' + product.image + '")',
                            }}
                        />
                        <h3 className="text-gray-800 text-lg font-semibold leading-normal">
                            {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {product.description}
                        </p>
                        <p className="text-red-600 text-lg font-bold mt-1">
                            ₱{product.price.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
