import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm'
import type { Session } from '@/types'

interface Props {
	sessions: Session[]
}

function Show({ sessions }: Props) {
	return (
		<>
			<UpdateProfileInformationForm />
			<UpdatePasswordForm />
			<LogoutOtherBrowserSessions sessions={sessions} />
		</>
	)
}

Show.layout = (page: React.ReactNode) => (
	<AuthenticatedLayout title="Profile">{page}</AuthenticatedLayout>
)

export default Show
