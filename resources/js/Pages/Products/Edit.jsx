import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/LinkButton";
import Textarea from "@/Components/Textarea";

// /import Dropdown from "@/Components/Dropdown";
import { useRef } from "react";

export default function EditProduct({ product, categories }) {
    const props = usePage().props
    const formDataRef = useRef({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
    })

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formDataRef.current);
        // router.post(`/products/${product.id}/update`, {
        //     name: product.name,
        //     description: product.description,
        //     price: product.price,
        //     category_id: product.category_id,
        // })
    }

    const formInputHandler = (e) => {
        formDataRef.current[e.target.name] = e.target.value;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {product.name}
                </h2>
            }
        >
            <Head title={`Edit - ${product.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
                    <div className="flex justify-center pt-10 pb-5">
                        <img src={product.image_url} alt={product.name} className="object-cover rounded-md"/>
                    </div>
                    <div className="overflow-hidden px-6 py-6 bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submitHandler} action="post">
                            <div className="mb-4">
                                <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value=""> -- Select Category --</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <InputLabel value="Name" for="name"/>
                                <TextInput 
                                className="w-full mt-1"
                                defaultValue={product.name} name="name" onChange={formInputHandler}/>
                            </div>
                            <div className="mb-4">
                                <InputLabel value="Description" for="description"/>
                                <Textarea 
                                className="w-full mt-1"
                                rows="8"
                                value={product.description} name="description" onChange={formInputHandler}/>
                            </div>
                            <div>
                                <InputLabel value="Price" for="price"/> 
                                <TextInput 
                                className="w-full mt-1"
                                defaultValue={product.price} name="price" onChange={formInputHandler}/>
                            </div>
                            <div className="mt-4">
                                <PrimaryButton type="submit">Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
