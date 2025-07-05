import { forwardRef, useImperativeHandle, useState } from "react";
import { Progress } from "@/components/ui/progress";

const Progressbar = forwardRef((props, ref) => {
    const [value, setValue] = useState(0);
    const [show, setShow] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            setValue(value) {
                setValue(value);
            },
            reset() {
                setValue(0);
            },
            show(bool) {
                setShow(bool);
            },
            getValue() {
                return value;
            },
        }),
        [value]
    );

    return (
        show && (
            <Progress
                value={value}
                max={100}
                {...props}
                className={`w-[30%] ${
                    value === 100  ? "[&>*]:bg-green-500" : "[&>*]:bg-yellow-500"
                }`}
            />
        )
    );
});

export default Progressbar;
