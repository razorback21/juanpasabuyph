import { useRef } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import Textarea from "@/components/Textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Tag } from "lucide-react";

export default function Edit({ category }) {
    const props = usePage().props;
    const formDataRef = useRef({
        name: category.name,
        description: category.description,
    });

    const submitHandler = (e) => {
        e.preventDefault();
        router.patch(route("product-categories.update", category), formDataRef.current);
    };

    const formInputHandler = (e) => {
        formDataRef.current[e.target.name] = e.target.value;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("product-categories.index")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Edit Category
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={submitHandler}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                    >
                        <Save size={14} />
                        Save Changes
                    </button>
                </div>
            }
        >
            <Head title="Edit Category" />
            <Toaster />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                        <Tag size={16} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">
                                            Category Details
                                        </CardTitle>
                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Name and description
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitHandler}>
                                <div className="space-y-4">
                                    <div>
                                        <InputLabel value="Name" htmlFor="name" />
                                        <TextInput
                                            className="mt-1 w-full"
                                            name="name"
                                            defaultValue={category.name}
                                            onChange={formInputHandler}
                                        />
                                        {props.errors?.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                Name field is required
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <InputLabel value="Description" htmlFor="description" />
                                        <Textarea
                                            className="mt-1 w-full"
                                            rows={6}
                                            name="description"
                                            defaultValue={category.description}
                                            onChange={formInputHandler}
                                        />
                                        {props.errors?.description && (
                                            <p className="mt-1 text-xs text-red-500">
                                                Description field is required
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
