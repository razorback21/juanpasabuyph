import { forwardRef, useImperativeHandle, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

const AlertConfirm = forwardRef(({ buttonName = "Continue" }, ref) => {
    const [open, setOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        title: "Message",
        description: "",
        onContinue: () => {},
        footer: true,
        buttonName: "",
    });
    const { title, description, onContinue, footer } = dialogProps;

    useImperativeHandle(ref, () => ({
        open(props) {
            setDialogProps(props);
            setOpen(true);
        },
        close() {
            setOpen(false);
        },
    }));
    return (
        <AlertDialog
            open={open}
            onOpenChange={() => setOpen(!open)}
            onInteractOutside={(e) => setOpen(false)}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {!onContinue ? "Close" : "Cancel"}
                    </AlertDialogCancel>
                    {onContinue && (
                        <AlertDialogAction onClick={onContinue}>
                            {dialogProps.buttonName != ""
                                ? dialogProps.buttonName
                                : buttonName}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

export default AlertConfirm;
