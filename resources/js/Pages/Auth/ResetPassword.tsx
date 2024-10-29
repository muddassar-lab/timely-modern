import FormControlledInput from '@/Components/controlled/FormControlledInput'
import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import GuestLayout from '@/Layouts/GuestLayout'
import useCustomForm from '@/lib/form'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	token: string
	email: string
}

const schema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email('Email is invalid'),
		token: z.string({ required_error: 'Token is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password should be atleast 8 characters' }),
		password_confirmation: z
			.string({ required_error: 'Password confirmation is required' })
			.min(1, { message: 'Password confirmation is required' })
	})
	.refine((data) => data.password === data.password_confirmation, {
		path: ['password_confirmation'],
		message: 'Password confirmation does not match password'
	})

function ResetPassword({ token, email }: Props) {
	const route = useRoute()
	const form = useCustomForm({
		schema,
		values: {
			token,
			email,
			password: '',
			password_confirmation: ''
		},
		callback: (_, inertiaForm) => {
			inertiaForm.post(route('password.update'))
		}
	})

	return (
		<>
			<FormProvider {...form.hookForm}>
				<FormControlledInput
					label="Email"
					name="email"
					placeholder="Email"
					control={form.hookForm.control}
					disabled
				/>
				<FormControlledInput
					label="Password"
					name="password"
					placeholder="Password"
					control={form.hookForm.control}
				/>
				<FormControlledInput
					label="Confirm Password"
					name="password_confirmation"
					placeholder="Confirm Password"
					control={form.hookForm.control}
				/>
			</FormProvider>
			<Button disabled={form.disabled} onClick={form.submit}>
				Reset Password
			</Button>
		</>
	)
}

ResetPassword.layout = (page: React.ReactNode) => (
	<GuestLayout
		title="Reset Password"
		header="Reset Your Password"
		description="Please enter your new password."
	>
		{page}
	</GuestLayout>
)

export default ResetPassword
