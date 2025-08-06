import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteConfirmDialog = forwardRef((props, ref) => {
    const { title, description, confirmhandler, children } = props;
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
            console.log("close dialog");
        },
    }));

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            {children ? (
                children
            ) : (
                <DialogTrigger asChild>
                    <Button variant="destructive">DELETE</Button>
                </DialogTrigger>
            )}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <p>{description}</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={confirmhandler}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export default DeleteConfirmDialog;
