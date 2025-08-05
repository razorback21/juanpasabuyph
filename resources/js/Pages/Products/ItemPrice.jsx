import { useState, useRef, forwardRef } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { usePage } from "@inertiajs/react";

const ItemPrice = forwardRef(({ cost = 0, price = 0 }, ref) => {
    const props = usePage().props;
    const [costPrice, setCostPrice] = useState(cost);
    const [salePrice, setSalePrice] = useState(price);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <InputLabel value="Cost Price" htmlFor="cost_price" />
                <TextInput
                    className="w-full mt-1"
                    type="number"
                    name="cost_price"
                    onChange={(e) => {
                        setSalePrice(e.target.value); // Auto-update sale price
                        ref.current.cost_price = e.target.value;
                        ref.current.price = e.target.value;
                    }}
                    defaultValue={costPrice}
                />
                {props.errors?.cost_price && (
                    <p className="text-red-500 text-sm py-1">
                        Cost Price field is required
                    </p>
                )}
            </div>
            <div>
                <InputLabel value="Sale Price" htmlFor="price" />
                <TextInput
                    className="w-full mt-1"
                    type="number"
                    name="price"
                    onChange={(e) => {
                        setSalePrice(e.target.value); // Allow custom input
                        ref.current.price = e.target.value;
                    }}
                    value={salePrice}
                />
                {props.errors?.price && (
                    <p className="text-red-500 text-sm py-1">
                        Sale Price field is required
                    </p>
                )}
            </div>
        </div>
    );
});

export default ItemPrice;
