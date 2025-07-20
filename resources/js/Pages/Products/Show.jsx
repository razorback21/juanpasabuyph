import { useEffect, useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import LinkButton from "@/Components/LinkButton";
import NoImage from "@/Components/NoImage";
import InventoryTable from "@/Pages/Products/InventoryTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/Components/ui/button";
import { GenericDialog as AddInventoryDialog } from "@/Components/GenericDialog";
import SelectField from "@/Components/SelectField";
import Textarea from "@/Components/Textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/Components/ui/badge";

export default function EditProduct({ product, movementTypes }) {
    const props = usePage().props;
    const dialogRef = useRef(null);
    const formRef = useRef(null);
    const formDataRef = useRef({
        movement_type: "",
        uom: "pc",
        quantity: 1,
        notes: "",
        product_id: product.id,
    });

    useEffect(() => {
        console.log(document.getElementById("inventory-form"));
    }, []);

    const handleFormData = (e) => {
        if (!e?.target) {
            formDataRef.current["movement_type"] = e;
        } else {
            formDataRef.current[e.target.name] = e.target.value;
        }
    };

    const handleStoreInventory = (e) => {
        e.preventDefault();
        router.post(
            route("api.inventory.store", product),
            formDataRef.current,
            {
                onSuccess: (response) => {
                    dialogRef.current.close();
                    toast.success(response.props.flash.message);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {product.name}
                </h2>
            }
        >
            <Head title={`Edit - ${product.name}`} />
            <Toaster />
            <AddInventoryDialog ref={dialogRef}>
                <form id="inventory-form" ref={formRef}>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="quantity">Type</label>
                        <SelectField
                            selectProps={{
                                name: "type",
                                id: "type",
                                required: true,
                                onValueChange: (e) => handleFormData(e),
                            }}
                            data={Object.entries(movementTypes)}
                            placeholder="Select movement type"
                        />
                        {props?.errors.movement_type && (
                            <p className="text-red-500 text-xs">
                                {props.errors.movement_type}
                            </p>
                        )}
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            required
                            min={1}
                            max={9000}
                            className="border border-gray-300 rounded-md p-2"
                            onChange={handleFormData}
                            defaultValue={1}
                        />
                        {props?.errors.quantity && (
                            <p className="text-red-500 text-xs">
                                {props.errors.quantity}
                            </p>
                        )}
                        <label htmlFor="remarks">Notes</label>
                        <Textarea
                            name="notes"
                            id="notes"
                            required
                            onChange={handleFormData}
                        />
                    </div>
                </form>
            </AddInventoryDialog>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-right pt-4">
                        <LinkButton
                            href={route("dashboard")}
                            className="mr-2 bg-red-500 text-white"
                        >
                            Back
                        </LinkButton>
                    </div>
                    <div className="flex pt-10 pb-5 gap-10">
                        {product.featured_image ? (
                            <img
                                src={product.featured_image_url}
                                alt={product.name}
                                className="h-[300px] max-w-[300px] object-cover rounded-md"
                            />
                        ) : (
                            <NoImage height="300px" width="300px" />
                        )}

                        <div>
                            <h1 className="text-2xl font-bold">
                                {product.name}{" "}
                                {product.disabled === true && (
                                    <Badge variant="secondary">Disabled</Badge>
                                )}
                            </h1>
                            <p>Price: PHP {product.price}</p>
                            <p class="my-4">{product.description}</p>
                            <p class="my-4">
                                Stocks: {product.current_stock ?? "0"} pcs.
                            </p>
                            <p>
                                <LinkButton
                                    href={
                                        route("products.edit", product) +
                                        "?from=/products/" +
                                        product.id
                                    }
                                >
                                    Edit
                                </LinkButton>
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold my-5">Inventory</h1>
                        <Button
                            //disabled={product.disabled}
                            onClick={() => {
                                props.errors = {};
                                dialogRef.current.open({
                                    title: "Update Inventory",
                                    description: (
                                        <>
                                            <p className="my-2">
                                                Use the plus sign [ + ] to add
                                                items to inventory (e.g.,
                                                inbound, returns). Use the minus
                                                sign [ - ] to remove items
                                                (e.g., reserved, outbound). This
                                                helps track all inventory
                                                movements
                                            </p>
                                            <p className="text-red-500">
                                                Once added you can no longer
                                                delete the inventory.
                                            </p>
                                        </>
                                    ),
                                    actionHandler: handleStoreInventory,
                                });
                            }}
                        >
                            +/- Inventory
                        </Button>
                    </div>
                    <InventoryTable inventory={product.inventory} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
