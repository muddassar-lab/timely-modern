import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import { Control, FieldValues, Path } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import { DayPickerSingleProps } from "react-day-picker";
import { DateTimePicker } from "../ui/datetime-picker";
import { DateTimeInput } from "../ui/datetime-input";

interface Props<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    helperText?: string
    disableCallback?: (date: Date) => boolean
    mode?: DayPickerSingleProps["mode"]
}

const FormControlledDatePicker = <T extends FieldValues>(
    {
        control,
        name,
        label,
        placeholder,
        helperText,
        disableCallback = () => false,
        mode = "single"
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
                        <DateTimePicker
                            value={field.value}
                            onChange={field.onChange}
                            hideTime
                        />
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

export default FormControlledDatePicker
