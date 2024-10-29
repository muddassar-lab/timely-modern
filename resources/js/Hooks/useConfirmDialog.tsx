import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface Props {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}

const useConfirmDialog = ({
    title,
    description,
    onConfirm,
    onCancel,
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
}: Props) => {
    const [open, setOpen] = useState(false)


    return {
        Dialog: (
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            setOpen(false)
                            onCancel && onCancel()
                        }}>{cancelButtonLabel}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setOpen(false)
                            onConfirm()
                        }}>{confirmButtonLabel}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ),
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false),
    }
}

export default useConfirmDialog