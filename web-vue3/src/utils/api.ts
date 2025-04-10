import { getUserIdFromLocalStorage, showError } from './utils'
import axios, { AxiosResponse } from 'axios'
import Toast from '@/utils/toast'

export let API = axios.create({
	headers: {
		'New-API-User': getUserIdFromLocalStorage()
	}
})

export function updateAPI() {
	API = axios.create({
		baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL
			? import.meta.env.VITE_REACT_APP_SERVER_URL
			: '',
		headers: {
			'New-API-User': getUserIdFromLocalStorage()
		}
	})
}

// 响应拦截器
API.interceptors.response.use(
	(res: AxiosResponse) => {
		// 未设置状态码则默认成功状态
		if (!res.data.success) {
			Toast.error(res.data.message)
		}
		return res.data
	},
	(error: any) => {
		const { status } = error
		if (status === 401) {
			const message = error.response.data.message
			Toast.error(message)
			location.href = '/login?redirect=' + location.pathname
			return Promise.reject(message)
		}
		return Promise.reject(error)
	}
)
