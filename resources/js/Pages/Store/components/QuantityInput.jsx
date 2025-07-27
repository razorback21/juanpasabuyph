import { useReducer, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function QuantityInput(props, ref) {
    const quantityReducer = (state, action) => {
        switch (action.type) {
            case "increment":
                return state + 1;
            case "decrement":
                return state <= 1 ? 1 : state - 1;
            case "setValue":
                let value = action.payload;
                if (value < 1) {
                    value = 1;
                }
                return value;
            default:
                return state;
        }
    };

    useImperativeHandle(ref, () => ({
        getQuantity: () => quantity,
        setQuantity: (value) => dispatch({ type: "setValue", payload: value }),
    }));

    const [quantity, dispatch] = useReducer(quantityReducer, 1);

    return (
        <>
            <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
                Quantity:
            </h3>
            <div className="flex items-center">
                <button
                    onClick={() => dispatch({ type: "decrement" })}
                    className="flex items-center justify-center h-10 w-10 rounded-l-md border border-r-0 border-[#d1d5db] text-[#4b5563] hover:bg-[#f3f4f6] transition-colors"
                >
                    -
                </button>
                <input
                    className="form-input h-10 w-16 text-center border-y border-x-0 border-[#d1d5db] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#e92933] focus:border-[#e92933]"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        dispatch({ type: "setValue", payload: e.target.value })
                    }
                />
                <button
                    onClick={() => dispatch({ type: "increment" })}
                    className="flex items-center justify-center h-10 w-10 rounded-r-md border border-l-0 border-[#d1d5db] text-[#4b5563] hover:bg-[#f3f4f6] transition-colors"
                >
                    +
                </button>
            </div>
        </>
    );
});
