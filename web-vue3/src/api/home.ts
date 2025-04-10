import { API } from '@/utils/api.ts'

export function getHomePageContent() {
	return API.get('/api/home_page_content')
}
