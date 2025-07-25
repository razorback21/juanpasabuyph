import Layout from "../components/Layout";

export default function Index({ title }) {
    const faqs = [
        {
            section: "Orders",
            questions: [
                {
                    title: "How do I place an order?",
                    content:
                        "To place an order, simply browse our product selection, add items to your cart, and proceed to checkout. Follow the on-screen instructions to enter your shipping and payment information. You'll receive an order confirmation email once your order is successfully placed.",
                },
                {
                    title: "Can I cancel my order?",
                    content:
                        "Order cancellations are possible if the order has not yet been processed or shipped. Please contact our customer support team as soon as possible with your order number to request a cancellation.",
                },
                {
                    title: "How do I track my order?",
                    content:
                        "Once your order has shipped, you will receive a shipping confirmation email containing a tracking number. You can use this number to track your package on the carrier's website. You can also use the tracking number to check the status of your order.",
                },
            ],
        },
        {
            section: "Shipping",
            questions: [
                {
                    title: "How long does shipping take??",
                    content:
                        "Shipping times vary depending on your location and the shipping method selected at checkout. Standard shipping typically takes 3-7 business days within the continental US. Expedited shipping options are available for faster delivery.",
                },
                {
                    title: "Do you offer international shipping?",
                    content:
                        "Yes, we offer international shipping to select countries. Shipping costs and delivery times will vary based on the destination. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.",
                },
                {
                    title: "What are the shipping costs?",
                    content:
                        "Shipping costs are calculated at checkout based on the weight of your order and your shipping destination. We offer free standard shipping on orders over a certain amount (details available on our shipping policy page).",
                },
            ],
        },
        {
            section: "Returns",
            questions: [
                {
                    title: "What is your return policy?",
                    content:
                        "We accept returns on most items within 30 days of delivery. Items must be unused, in their original packaging, and in resalable condition. Some exclusions may apply (e.g., final sale items). Please refer to our full return policy for detailed information.",
                },
                {
                    title: "What is the return process?",
                    content:
                        "To initiate a return, please contact our customer support team with your order number and provide the necessary documentation. We will guide you through the return process and assist you in returning the item to its original condition. Please note that the return process may vary depending on the carrier and the item's origin.",
                },
                {
                    title: "How long does it take to process a return?",
                    content:
                        "Once we receive your returned item(s), please allow 5-7 business days for processing. Refunds will be issued to the original payment method. You will receive an email notification once your return has been processed and your refund has been issued.",
                },
            ],
        },
    ];
    return (
        <Layout title="Faqs">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-8">
                    <h1 className="tracking-tight text-3xl sm:text-4xl font-bold leading-tight min-w-72">
                        Frequently Asked Questions
                    </h1>
                </div>
                <div class="space-y-10">
                    {faqs.map((faq) => (
                        <section key={faq.section}>
                            <h2 className="text-2xl font-bold leading-tight tracking-tight px-4 pb-4 pt-2 border-b border-gray-200 mb-6">
                                {faq.section}
                            </h2>
                            <div class="flex flex-col gap-4">
                                {faq.questions.map((question) => (
                                    <details
                                        key={question.title}
                                        class="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out"
                                    >
                                        <summary class="flex list-none cursor-pointer items-center justify-between gap-4 p-4">
                                            <p class="text-[var(--text-primary)] text-base font-medium leading-normal">
                                                {question.title}
                                            </p>
                                        </summary>
                                        <div class="px-4 pb-4">
                                            <p class="text-gray-400 text-sm font-normal leading-relaxed">
                                                {question.content}
                                            </p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
