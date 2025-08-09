import Layout from "@/Pages/Store/components/Layout.jsx";
import CheckOutForm from "@/Pages/Store/Checkout/CheckoutForm.jsx";
import OrderSummary from "@/Pages/Store/Checkout/OrderSummary.jsx";
import EmptyCart from "@/Pages/Store/Checkout/EmptyCart.jsx";

export default function Index({ cartItems, cartTotal }) {
    if (cartItems.length === 0) {
        return (
            <Layout title="Checkout">
                <EmptyCart />
            </Layout>
        );
    }

    return (
        <Layout title="Checkout">
            <section className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-7">
                    <CheckOutForm />
                </div>
                <div className="md:col-span-5">
                    <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
                </div>
            </section>
        </Layout>
    );
}
