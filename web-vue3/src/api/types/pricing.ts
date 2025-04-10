/** 模型价格数据结构 */
export interface PricingData {
	completion_ratio: number
	model_name: string
	enable_groups: string[]
	model_price: number
	model_ratio: number
	owner_by: string
	quota_type: number
}
/** 分组信息 */
export interface GroupRatio {}
export interface PricingVO extends ResponseData {
	data: PricingData[]
	group_ratio: GroupRatio
}
