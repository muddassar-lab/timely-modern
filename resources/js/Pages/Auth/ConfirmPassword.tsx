import FormControlledInput from '@/Components/controlled/FormControlledInput'
import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import GuestLayout from '@/Layouts/GuestLayout'
import useCustomForm from '@/lib/form'
import type React from 'react'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	password: z.string().min(1, { message: 'Password is required' })
})

function ConfirmPassword() {
	const route = useRoute()
	const form = useCustomForm({
		schema,
		values: {
			password: ''
		},
		callback: (_, inertiaForm) => {
			inertiaForm.post(route('password.confirm'))
		}
	})

	return (
		<>
			<FormProvider {...form.hookForm}>
				<FormControlledInput
					label="Password"
					name="password"
					placeholder="Password"
					control={form.hookForm.control}
				/>
			</FormProvider>
			<Button disabled={form.disabled} onClick={form.submit}>
				Confirm
			</Button>
		</>
	)
}

ConfirmPassword.layout = (page: React.ReactNode) => (
	<GuestLayout
		title="Secure Area"
		header="Secure Area"
		description="This is a secure area of the application. Please confirm your password before continuing."
	>
		{page}
	</GuestLayout>
)

export default ConfirmPassword
