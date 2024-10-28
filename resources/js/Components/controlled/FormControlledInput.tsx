import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input"

interface Props<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    helperText?: string
    disabled?: boolean
}

const FormControlledInput = <T extends FieldValues>(
    {
        control,
        name,
        label,
        placeholder,
        helperText,
        disabled = false
    }: Props<T>
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} disabled={disabled} {...field} />
                    </FormControl>
                    {
                        helperText && (
                            <FormDescription>
                                {helperText}
                            </FormDescription>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormControlledInput
