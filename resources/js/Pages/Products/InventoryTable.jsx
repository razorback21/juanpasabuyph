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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date Added</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventory.map((data) => (
                    <TableRow key={data.invoice}>
                        <TableCell className="font-medium">
                            <Badge variant='secondary'>{data.movement_type.toString().toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{data.uom.toString().toUpperCase()}</TableCell>
                        <TableCell>{data.notes}</TableCell>
                        <TableCell>{data.order_id}</TableCell>
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
