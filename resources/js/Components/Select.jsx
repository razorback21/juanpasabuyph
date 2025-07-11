import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

export default function SelectComponent({ className }) {
    return (
        <Select
           {...props}
        >
            <SelectTrigger className={width}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
        </Select>
    );
}
