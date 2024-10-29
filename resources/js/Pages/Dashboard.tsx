import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

function Dashboard() {
	return <>dashboard</>
}

Dashboard.layout = (page: React.ReactNode) => (
	<AuthenticatedLayout title="Dashboard">{page}</AuthenticatedLayout>
)

export default Dashboard
