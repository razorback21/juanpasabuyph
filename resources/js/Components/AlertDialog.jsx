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

const ConfirmAlert = forwardRef(({ buttonName = 'Continue' }, ref) => {
    const [open, setOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        title:'',
        description:'',
        onContinue: () => {},
    });
    const { title, description, onContinue } = dialogProps;

    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true)
        },
        close() {
            setOpen(false);
        },
        setDialogProps(props) {
            setDialogProps(props);
        }
    }));
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>
                        {buttonName}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
})

export default ConfirmAlert;
