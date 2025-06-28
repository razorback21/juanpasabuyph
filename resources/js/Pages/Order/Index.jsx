import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ({}) {
    return (
        <AuthenticatedLayout header='Orders'>
            <Head title="Orders" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden px-6 py-12 bg-white shadow-sm sm:rounded-lg">
                        <h1>Orders</h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
