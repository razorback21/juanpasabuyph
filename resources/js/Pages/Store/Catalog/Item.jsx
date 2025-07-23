import Layout from "@/Pages/Store/components/Layout";

export default function ({ title, product, category }) {
    return (
        <Layout title={title} category={category}>
            <h1>{product.name}</h1>
        </Layout>
    );
}
