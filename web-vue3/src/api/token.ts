import { API } from '@/utils/api.ts'
import { TokenPageQuery } from '@/api/types/token'

export function getTokenPage(params: TokenPageQuery) {
	return API.get('/api/token/', params)
}
