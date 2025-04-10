/** 登录表单参数 */
export interface LoginForm {
	username: string
	password: string
}

/** 登录返回结果 */
export interface LoginData {
	id: number
	username: string
	password: string
	display_name: string
	role: number
	status: number
	email: string
	github_id: string
	linuxdo_id: string
	linuxdo_level: number
	wechat_id: string
	telegram_id: string
	verification_code: string
	access_token: string
	quota: number
	used_quota: number
	request_count: number
	group: string
	aff_code: string
	aff_count: number
	aff_quota: number
	aff_history_quota: number
	inviter_id: number
	stripe_customer: string
	signing_period: object
	created_at: string
	updated_at: string
	last_signIn: string
	last_request_time: number
	increment_state: object
	message_penetration: string
	user_agreement: false
	user_upper_quota: number
	DeletedAt: object
}

/** 登录返回结果 */
export interface LoginResponse extends ResponseData {
	data: LoginData
}
