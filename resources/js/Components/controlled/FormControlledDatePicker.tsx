import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {} from '@/components/ui/popover'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { DateTimePicker } from '../ui/datetime-picker'

interface Props<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label: string
	helperText?: string
	disabled?: boolean
}

const FormControlledDatePicker = <T extends FieldValues>({
	control,
	name,
	label,
	helperText,
	disabled = false
}: Props<T>) => {
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
							disabled={disabled}
						/>
					</FormControl>
					{helperText && <FormDescription>{helperText}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default FormControlledDatePicker
