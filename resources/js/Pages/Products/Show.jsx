import { useRef } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import NoImage from "@/components/NoImage";
import InventoryTable from "@/Pages/Products/InventoryTable";
import { Button } from "@/components/ui/button";
import { GenericDialog as AddInventoryDialog } from "@/components/GenericDialog";
import SelectField from "@/components/SelectField";
import Textarea from "@/components/Textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductGroupingDialog from "@/components/ProductGroupingDialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    ArrowLeft,
    Pencil,
    Package,
    TrendingUp,
    TrendingDown,
    ShieldCheck,
    Truck,
    Layers,
    Plus,
    Box,
    X,
} from "lucide-react";

function StockMetric({ label, value, icon: Icon, color = "text-gray-700" }) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ${color}`}
            >
                <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-500 truncate">
                    {label}
                </p>
                <p className="text-lg font-bold text-gray-900">
                    {value ?? "0"}
                </p>
            </div>
        </div>
    );
}

function PriceDisplay({ label, price, sublabel = false }) {
    return (
        <div className={sublabel ? "mt-1" : ""}>
            <span
                className={`font-bold ${sublabel ? "text-sm text-gray-500" : "text-2xl text-gray-900"}`}
            >
                {sublabel ? "Cost: " : ""}
                <span className={sublabel ? "" : "text-primary"}>₱</span>
                {Number(price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </div>
    );
}

export default function Show({ product, movementTypes, allProducts }) {
    const props = usePage().props;
    const dialogRef = useRef(null);
    const groupingDialogRef = useRef(null);
    const formRef = useRef(null);
    const formDataRef = useRef({
        movement_type: "",
        uom: "pc",
        quantity: 1,
        notes: "",
        product_id: product.id,
    });

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
            },
        );
    };

    const handleSaveGroupings = (selectedIds) => {
        router.put(
            route("products.groupings.update", product),
            { grouped_product_ids: selectedIds },
            {
                onSuccess: () => {
                    toast.success("Variants updated successfully.");
                },
            },
        );
    };

    const handleRemoveGrouping = (groupedProductId) => {
        const currentIds = (product.grouped_products || []).map((p) => p.id);
        const newIds = currentIds.filter((id) => id !== groupedProductId);
        router.put(
            route("products.groupings.update", product),
            { grouped_product_ids: newIds },
            {
                onSuccess: () => {
                    toast.success("Variant removed.");
                },
            },
        );
    };

    const stockLevel = product.current_stock ?? 0;
    const stockColor =
        stockLevel === 0
            ? "text-red-600 bg-red-50 border-red-200"
            : stockLevel <= 10
              ? "text-amber-600 bg-amber-50 border-amber-200"
              : "text-emerald-600 bg-emerald-50 border-emerald-200";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("products.index")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Product Details
                            </h2>
                        </div>
                    </div>
                    <Link
                        href={
                            route("products.edit", product) +
                            "?from=/products/" +
                            product.slug
                        }
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                    >
                        <Pencil size={14} />
                        Edit Product
                    </Link>
                </div>
            }
        >
            <Head title={`${product.name} — Product`} />
            <Toaster />

            <AddInventoryDialog ref={dialogRef}>
                <form id="inventory-form" ref={formRef}>
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="quantity"
                            className="text-sm font-medium"
                        >
                            Movement Type
                        </label>
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
                        <label
                            htmlFor="quantity"
                            className="text-sm font-medium"
                        >
                            Quantity
                        </label>
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
                        <label
                            htmlFor="remarks"
                            className="text-sm font-medium"
                        >
                            Notes
                        </label>
                        <Textarea
                            name="notes"
                            id="notes"
                            required
                            onChange={handleFormData}
                        />
                    </div>
                </form>
            </AddInventoryDialog>

            <ProductGroupingDialog
                ref={groupingDialogRef}
                products={allProducts || []}
                currentProduct={product}
                onSave={handleSaveGroupings}
            />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* ── Two-Column Layout ────────────────────────────── */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                        {/* LEFT — Product Info (3/5 width) */}
                        <div className="space-y-6 lg:col-span-3">
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Image */}
                                        <div className="shrink-0 sm:w-[260px]">
                                            {product.featured_image_url ? (
                                                <img
                                                    src={
                                                        product.featured_image_url
                                                    }
                                                    alt={product.name}
                                                    className="h-[260px] w-full object-cover sm:h-full sm:rounded-l-xl"
                                                />
                                            ) : (
                                                <div className="h-[260px] w-full sm:h-full sm:rounded-l-xl">
                                                    <NoImage
                                                        height="100%"
                                                        width="100%"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-1 flex-col justify-between p-6">
                                            <div>
                                                <div className="flex items-start justify-between gap-3">
                                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                                        {product.name}
                                                    </h1>
                                                    {product.disabled ===
                                                        true && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="shrink-0"
                                                        >
                                                            Disabled
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="mt-4">
                                                    <PriceDisplay
                                                        price={product.price}
                                                    />
                                                    <PriceDisplay
                                                        price={
                                                            product.cost_price
                                                        }
                                                        sublabel
                                                    />
                                                </div>

                                                <div className="mt-4 flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs font-normal"
                                                    >
                                                        Sold per{" "}
                                                        {product.sale_uom}
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs font-semibold ${stockColor}`}
                                                    >
                                                        {stockLevel === 0
                                                            ? "Out of Stock"
                                                            : stockLevel <= 10
                                                              ? "Low Stock"
                                                              : "In Stock"}
                                                    </Badge>
                                                </div>

                                                {product.description && (
                                                    <>
                                                        <Separator className="my-4" />
                                                        <p className="text-sm leading-relaxed text-gray-600">
                                                            {
                                                                product.description
                                                            }
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT — Inventory Summary (2/5 width) */}
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader className="pb-3">
                <div className="flex w-full items-center justify-between">
                                        <CardTitle className="text-base font-semibold">
                                            Inventory Overview
                                        </CardTitle>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                props.errors = {};
                                                dialogRef.current.open({
                                                    title: "Update Inventory",
                                                    description: (
                                                        <>
                                                            <p className="my-2 text-sm">
                                                                Use the plus
                                                                sign [ + ] to
                                                                add items to
                                                                inventory
                                                                (e.g., inbound,
                                                                returns). Use
                                                                the minus sign [
                                                                - ] to remove
                                                                items (e.g.,
                                                                reserved,
                                                                outbound).
                                                            </p>
                                                            <p className="text-sm text-red-500">
                                                                Once added you
                                                                can no longer
                                                                delete the
                                                                inventory.
                                                            </p>
                                                        </>
                                                    ),
                                                    actionHandler:
                                                        handleStoreInventory,
                                                });
                                            }}
                                            className="gap-1.5"
                                        >
                                            <Plus size={14} />
                                            Adjust
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <StockMetric
                                        label="Current Stock"
                                        value={product.current_stock}
                                        icon={Package}
                                        color="text-blue-600"
                                    />
                                    <StockMetric
                                        label="Available Stock"
                                        value={product.available_stock}
                                        icon={TrendingUp}
                                        color="text-emerald-600"
                                    />
                                    <StockMetric
                                        label="Reserved for Orders"
                                        value={
                                            product.stock_reservation_for_order_quantity
                                        }
                                        icon={ShieldCheck}
                                        color="text-amber-600"
                                    />
                                    <StockMetric
                                        label="Released"
                                        value={
                                            product.stock_reservation_for_completed_order_quantity
                                        }
                                        icon={Truck}
                                        color="text-violet-600"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* ── Variants Section ─────────────────────────────── */}
                    <div className="mt-8">
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                            <Layers
                                                size={16}
                                                className="text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-semibold">
                                                Variants
                                            </CardTitle>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Size, color, and other product
                                                variations
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                        onClick={() => {
                                            const currentIds = (product.grouped_products || []).map((p) => p.id);
                                            groupingDialogRef.current.open(currentIds);
                                        }}
                                    >
                                        <Plus size={14} />
                                        Add Variant
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {(product.grouped_products || []).length > 0 ? (
                                    <TooltipProvider>
                                        <div className="flex flex-wrap gap-3">
                                            {product.grouped_products.map((gp) => (
                                                <div key={gp.id} className="relative group">
                                                    <button
                                                        onClick={() => handleRemoveGrouping(gp.id)}
                                                        className="absolute -top-1.5 -right-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                    >
                                                        <X size={10} />
                                                    </button>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="w-20 h-[60px] rounded-lg overflow-hidden bg-cover bg-center cursor-default transition-all duration-300 hover:scale-105 hover:shadow-lg ring-1 ring-gray-200 hover:ring-gray-300"
                                                                style={{ backgroundImage: `url("${gp.thumbnail_url}")` }}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="font-medium">{gp.name}</p>
                                                            <p className="text-white/70">
                                                                ₱{Number(gp.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            ))}
                                        </div>
                                    </TooltipProvider>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-12">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <Box
                                                size={20}
                                                className="text-gray-400"
                                            />
                                        </div>
                                        <p className="mt-3 text-sm font-medium text-gray-500">
                                            No variants configured
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Add size, color, or other variations for
                                            this product
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* ── Inventory History ─────────────────────────────── */}
                    <div className="mt-8">
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                                        <TrendingDown
                                            size={16}
                                            className="text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold">
                                            Inventory History
                                        </CardTitle>
                                        <p className="mt-0.5 text-xs text-gray-500">
                                            All stock movements and adjustments
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <InventoryTable
                                    inventory={product.inventory}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
