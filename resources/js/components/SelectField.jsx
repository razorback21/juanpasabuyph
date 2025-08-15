import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

export default function SelectField(props) {
    return (
        <Select {...props.selectProps}>
            <SelectTrigger {...props.selectTrigger}>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {props.data.map(([key, value]) => (
                    <SelectItem value={key}>{value}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
