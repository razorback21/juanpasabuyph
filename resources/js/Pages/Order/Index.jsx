import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import OrdersTable from "./OrdersTable";
import Pagination from "@/components/Pagination";

export default function ({ orders }) {
    return (
        <AuthenticatedLayout header="Orders">
            <Head title="Orders" />
            <div className="flex flex-col px-4 lg:px-6">
                <OrdersTable orders={orders} />
            </div>
            <div className="text-gray-900 text-center">
                <Pagination links={orders.links} />
            </div>
        </AuthenticatedLayout>
    );
}
