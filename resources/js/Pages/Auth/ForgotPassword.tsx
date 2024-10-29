import FormControlledInput from '@/Components/controlled/FormControlledInput'
import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import GuestLayout from '@/Layouts/GuestLayout'
import useCustomForm from '@/lib/form'
import type React from 'react'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	status: string
}

const schema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email('Email is invalid')
})

function ForgotPassword({ status }: Props) {
	const route = useRoute()

	const form = useCustomForm({
		schema,
		values: {
			email: ''
		},
		callback: (_, inertiaForm) => {
			inertiaForm.post(route('password.email'))
		}
	})

	return (
		<>
			{status && (
				<div className="font-medium text-sm text-green-600">{status}</div>
			)}
			<FormProvider {...form.hookForm}>
				<FormControlledInput
					label="Email"
					name="email"
					placeholder="Email"
					control={form.hookForm.control}
				/>
			</FormProvider>
			<Button onClick={form.submit} disabled={form.disabled}>
				Send Password Reset Link
			</Button>
		</>
	)
}

ForgotPassword.layout = (page: React.ReactNode) => (
	<GuestLayout
		title="Forgot Password"
		header="Forgot Password"
		description="Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one."
	>
		{page}
	</GuestLayout>
)

export default ForgotPassword
