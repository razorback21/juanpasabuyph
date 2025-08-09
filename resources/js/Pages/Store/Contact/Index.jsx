import Layout from "../components/Layout";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

export default function Index() {
    return (
        <>
            <Layout title="Contact">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                            <ContactForm />
                            <ContactInformation />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
