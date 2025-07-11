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
import { Button } from "@/Components/ui/button";

const GenericDialog = forwardRef(({children}, ref) => {
    const [open, setOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        title: "Message",
        description: "",
        onContinue: () => {},
        footer: true,
    });
    const {
        title,
        description,
        actionHandler,
        actionButtonText = "Submit"
    } = dialogProps;

    useImperativeHandle(ref, () => ({
        open: (props) => {
            setDialogProps(props);
            setOpen(true);
        },
        close: () => {
            setOpen(false);
            console.log("close dialog");
        },
    }));

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            <p>{description}</p>
                        </DialogDescription>
                    )}
                </DialogHeader>
                {children}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={actionHandler}>
                        {actionButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

export { GenericDialog };
