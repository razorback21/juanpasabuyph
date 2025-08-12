import Layout from "../components/Layout";
import faqs from "@/data/faqs";
export default function Index({ title }) {
    return (
        <Layout title="Faqs">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-8">
                    <h1 className="tracking-tight text-3xl sm:text-4xl font-bold leading-tight min-w-72">
                        Frequently Asked Questions
                    </h1>
                </div>
                <div className="space-y-10">
                    {faqs.map((faq) => (
                        <section key={faq.section}>
                            <h2 className="text-2xl font-bold leading-tight tracking-tight px-4 pb-4 pt-2 border-b border-gray-200 mb-6">
                                {faq.section}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {faq.questions.map((question) => (
                                    <details
                                        key={question.title}
                                        className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out"
                                    >
                                        <summary className="flex list-none cursor-pointer items-center justify-between gap-4 p-4">
                                            <p className="text-[var(--text-primary)] text-base font-medium leading-normal">
                                                {question.title}
                                            </p>
                                        </summary>
                                        <div className="px-4 pb-4">
                                            <p className="text-gray-600  text-sm font-normal leading-relaxed">
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
