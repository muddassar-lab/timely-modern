import FormControlledInput from '@/Components/controlled/FormControlledInput'
import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import GuestLayout from '@/Layouts/GuestLayout'
import useCustomForm from '@/lib/form'
import { Link } from '@inertiajs/react'
import type React from 'react'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email('Email is invalid'),
	password: z.string().min(1, { message: 'Password is required' })
})

function Login() {
	const route = useRoute()
	const form = useCustomForm({
		schema,
		values: {
			email: '',
			password: ''
		},
		callback: (data, inertiaForm) => {
			inertiaForm.post(route('login'), {
				data
			})
		}
	})

	return (
		<>
			<FormProvider {...form.hookForm}>
				<FormControlledInput
					control={form.hookForm.control}
					name={'email'}
					label="Email"
				/>
				<FormControlledInput
					control={form.hookForm.control}
					name={'password'}
					label="Password"
				/>
				<div className="flex justify-end">
					<Link href={route('password.request')}>Forgot Password?</Link>
				</div>
				<Button disabled={form.disabled} onClick={form.submit}>
					Login
				</Button>
			</FormProvider>
		</>
	)
}

Login.layout = (page: React.ReactNode) => (
	<GuestLayout
		linkHref="/register"
		linkTitle="Register"
		title={'Login'}
		header={'Login to your account'}
		description="You can login to your account using your email and password."
	>
		{page}
	</GuestLayout>
)

export default Login
