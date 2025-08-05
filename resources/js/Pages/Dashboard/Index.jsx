//import { DataTable } from "@/components/data-table"
import { ChartAreaInteractive } from "@/Components/chart-area-interactive";
import { SectionCards } from "@/Components/section-cards";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ({
    outOfStock,
    profitThisMonth,
    orderCount,
    chartData,
}) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />
            <SectionCards
                outOfStock={outOfStock}
                profitThisMonth={profitThisMonth}
                orderCount={orderCount}
            />
            <div className="grid grid-cols-1 mx-6">
                <ChartAreaInteractive chartData={chartData} />
            </div>
        </AuthenticatedLayout>
    );
}
