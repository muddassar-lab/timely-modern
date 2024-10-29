import type { InertiaSharedProps } from '@/types'
import { usePage } from '@inertiajs/react'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export default function useTypedPage<T = {}>() {
	return usePage<InertiaSharedProps<T>>()
}
