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
    onCancel: () => void;
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

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelButtonLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmButtonLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default useConfirmDialog