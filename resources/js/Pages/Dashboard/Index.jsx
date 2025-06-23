// import { DataTable } from "@/components/data-table"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ProductsTable } from "./ProductsTable";

import data from "../data.json";

export default function() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <ProductsTable data={data} />
        </AuthenticatedLayout>    
    )
}
    

// export default function({ products, categories, active_category }) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
//                     <div className="overflow-hidden px-6 py-12 bg-white shadow-sm sm:rounded-lg">
//                         <ProductsTable
//                             products={products}
//                             categories={categories}
//                             active_category={active_category}
//                         />
//                     </div>
//                 </div>
//                 <div className="text-gray-900 text-center">
//                     <Pagination links={products.links} />
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
