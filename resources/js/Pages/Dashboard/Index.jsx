//import { DataTable } from "@/components/data-table"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function (props) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
}
