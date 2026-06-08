import { forwardRef, useImperativeHandle, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const ProductGroupingDialog = forwardRef(({ products = [], currentProduct, onSave }, ref) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    useImperativeHandle(ref, () => ({
        open: (initialSelectedIds = []) => {
            setSelectedIds(initialSelectedIds);
            setSearch("");
            setOpen(true);
        },
        close: () => setOpen(false),
    }));

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggle = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        onSave(selectedIds);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Variants</DialogTitle>
                    <DialogDescription>
                        Select products to group as variants of{" "}
                        <span className="font-semibold">{currentProduct?.name}</span>.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">
                        {selectedIds.length} selected
                    </span>
                    {selectedIds.length > 0 && (
                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-xs text-gray-400 hover:text-red-500"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 min-h-0">
                    {filtered.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-6">
                            No products found
                        </p>
                    ) : (
                        filtered.map((p) => (
                            <label
                                key={p.id}
                                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <Checkbox
                                    checked={selectedIds.includes(p.id)}
                                    onCheckedChange={() => toggle(p.id)}
                                />
                                <img
                                    src={p.thumbnail_url}
                                    alt={p.name}
                                    className="h-10 w-10 rounded-md object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {p.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ₱
                                        {Number(p.price).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            </label>
                        ))
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={selectedIds.length === 0}>
                        Save Variants
                        {selectedIds.length > 0 && (
                            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
                                {selectedIds.length}
                            </Badge>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default ProductGroupingDialog;
