import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import GuestLayout from '@/Layouts/GuestLayout'
import { useForm } from '@inertiajs/react'
import type React from 'react'

interface Props {
	status: string
}

function VerifyEmail({ status }: Props) {
	const route = useRoute()
	const form = useForm({})
	const verificationLinkSent = status === 'verification-link-sent'

	function onSubmit(_e: React.FormEvent) {
		form.post(route('verification.send'))
	}

	return (
		<>
			<div className="mb-4 text-sm">
				Before continuing, could you verify your email address by clicking on
				the link we just emailed to you? If you didn't receive the email, we
				will gladly send you another.
			</div>
			{verificationLinkSent && (
				<div className="mb-4 font-medium text-sm text-green-600">
					A new verification link has been sent to the email address you
					provided during registration.
				</div>
			)}
			<Button size={'lg'} className="w-full" onClick={onSubmit}>
				Send Verification Link
			</Button>
		</>
	)
}

VerifyEmail.layout = (page: React.ReactNode) => (
	<GuestLayout
		linkHref={'/logout'}
		linkMethod={'post'}
		linkTitle="Logout"
		title="Email Verification"
		header="Verify your email address"
		description="Verify your email address to complete registration."
	>
		{page}
	</GuestLayout>
)

export default VerifyEmail
