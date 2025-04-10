import { API } from '@/utils/api.ts'
import { AxiosPromise } from 'axios'
import { PricingVO } from '@/api/types/pricing'

export function getPricing(): AxiosPromise<PricingVO[]> {
	return API.get('/api/pricing')
}
