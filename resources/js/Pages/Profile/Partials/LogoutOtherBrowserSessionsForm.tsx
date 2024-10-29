import FormControlledInput from '@/Components/controlled/FormControlledInput'
import { Button } from '@/Components/ui/button'
import useRoute from '@/Hooks/useRoute'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import useCustomForm from '@/lib/form'
import type { Session } from '@/types'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	sessions: Session[]
}

const schema = z.object({
	password: z.string().min(1, { message: 'Password is required' })
})

export default function LogoutOtherBrowserSessions({ sessions }: Props) {
	const route = useRoute()
	const form = useCustomForm({
		schema,
		values: {
			password: ''
		},
		callback(_, inertiaForm, hookForm) {
			inertiaForm.delete(route('other-browser-sessions.destroy'), {
				preserveScroll: true,
				onFinish: () => hookForm.reset()
			})
		}
	})

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Logout Other Browser Sessions</CardTitle>
					<CardDescription>
						If necessary, you may log out of all of your other browser sessions
						across all of your devices. Some of your recent sessions are listed
						below; however, this list may not be exhaustive. If you feel your
						account has been compromised, you should also update your password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{sessions.length > 0 ? (
						<div className="mt-5 space-y-6">
							{sessions.map((session) => (
								<div className="flex items-center" key={session.id}>
									<div>
										{session.agent.is_desktop ? (
											// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
											<svg
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-8 h-8 text-gray-500"
											>
												<path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
										) : (
											// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												strokeWidth="2"
												stroke="currentColor"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="w-8 h-8 text-gray-500"
											>
												<path d="M0 0h24v24H0z" stroke="none" />
												<rect x="7" y="4" width="10" height="16" rx="1" />
												<path d="M11 5h2M12 17v.01" />
											</svg>
										)}
									</div>

									<div className="ml-3">
										<div className="text-sm text-gray-600 dark:text-gray-400">
											{session.agent.platform} - {session.agent.browser}
										</div>

										<div>
											<div className="text-xs text-gray-500">
												{session.ip_address},
												{session.is_current_device ? (
													<span className="text-green-500 font-semibold">
														This device
													</span>
												) : (
													<span>Last active {session.last_active}</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : null}
				</CardContent>
				<CardFooter className="flex justify-end">
					<AlertDialog>
						<AlertDialogTrigger>
							<Button variant={'destructive'}>
								Logout other browser sessions
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Logout other browser sessions
								</AlertDialogTitle>
								<AlertDialogDescription>
									Please enter your password to confirm you would like to log
									out of your other browser sessions across all of your devices.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<FormProvider {...form.hookForm}>
								<FormControlledInput
									control={form.hookForm.control}
									label="Password"
									name="password"
								/>
							</FormProvider>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={form.submit}>
									Logout other browser sessions
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			</Card>
		</>
	)
}
