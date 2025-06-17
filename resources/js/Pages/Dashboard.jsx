import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function Dashboard({products}) {

    const ProductsTable = ({products}) => {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead >Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(products).map(([key, product]) => (
                    <TableRow key={product.id}>
                        <TableCell></TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell className="text-right">{product.price}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="overflow-hidden p-6  bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <ProductsTable products={products.data} />
                        </div>
                        <div className="text-gray-900 text-center">
                            <Pagination links={products.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
