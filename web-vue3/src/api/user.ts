import { API } from '@/utils/api.ts'
import { AxiosPromise } from 'axios'
import { LoginForm, LoginResponse } from '@/api/types/user'

export function login(loginForm: LoginForm): AxiosPromise<LoginResponse[]> {
	return API.post('/api/user/login', loginForm)
}
