//import { DataTable } from "@/components/data-table"
import { ChartAreaInteractive } from "@/Components/chart-area-interactive";
import { SectionCards } from "@/Components/section-cards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ({ outOfStock, profitThisMonth, customers }) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />
            <SectionCards
                outOfStock={outOfStock}
                profitThisMonth={profitThisMonth}
                customers={customers}
            />
            <div className="grid grid-cols-1 mx-6">
                <ChartAreaInteractive />
            </div>
        </AuthenticatedLayout>
    );
}
