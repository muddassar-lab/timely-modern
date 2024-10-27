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
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        dayjs(field.value).format("MMM D, YYYY")

                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode={mode}
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01") || disableCallback(date)
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
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
