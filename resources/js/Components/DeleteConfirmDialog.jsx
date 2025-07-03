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
import { Button } from "@/Components/ui/button";

const DeleteConfirmDialog = forwardRef((props, ref) => {
    const { title, description, confirmhandler, children } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => { 
            setOpen(true)
            setIsOpen(true)
        },
        close: () => {
            setOpen(false)
            setIsOpen(false);
            console.log("close dialog");
        },
    }));

    return (
        <Dialog open={open} onOpenChange={isOpen}>

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
