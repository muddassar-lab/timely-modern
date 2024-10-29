type DateTime = string

export type Nullable<T> = T | null

export interface User {
	id: number
	name: string
	email: string
	phone: string
	date_of_birth: Nullable<Date>
	email_verified_at: Nullable<DateTime>
	created_at: DateTime
	updated_at: DateTime
}

export interface Auth {
	user: Nullable<User>
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type InertiaSharedProps<T = {}> = T & {
	auth: Auth
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	errorBags: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	errors: any
}

export interface Session {
	id: number
	ip_address: string
	is_current_device: boolean
	agent: {
		is_desktop: boolean
		platform: string
		browser: string
	}
	last_active: DateTime
}
