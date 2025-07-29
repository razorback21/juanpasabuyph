import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function InventoryTable({ inventory }) {
    function movementTypeStatusColor(movementType) {
        switch (movementType) {
            case "inbound":
                return "bg-green-400 text-white";
            case "outbound":
            case "adjustment_down":
            case "damage":
                return "bg-red-400 text-white";
            case "returned":
                return "bg-blue-400 text-white";
            default:
                return "";
        }
    }
    return inventory.length === 0 ? (
        <p className="text-sm">No inventory found.</p>
    ) : (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Movement Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>UoM</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Date Added</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventory.map((data) => (
                    <TableRow key={data.invoice}>
                        <TableCell className="font-medium">
                            <Badge
                                variant="secondary"
                                className={movementTypeStatusColor(
                                    data.movement_type.toString().toLowerCase()
                                )}
                            >
                                {data.movement_type.toString().toUpperCase()}
                            </Badge>
                        </TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>
                            {data.uom.toString().toUpperCase()}
                        </TableCell>
                        <TableCell>
                            {data.notes?.includes("Reserved for ORDER #") ? (
                                <a
                                    href={route("orders.show", data.order_id)}
                                    className="underline text-blue-600"
                                >
                                    {data.notes}
                                </a>
                            ) : (
                                data.notes
                            )}
                        </TableCell>
                        <TableCell>
                            {new Date(data.created_at).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default InventoryTable;
