/** 分页查询参数 */
declare interface PageQuery {
	// 页码
	p: number
	// 每页条数
	size: number
}

/** 接口返回数据格式 */
declare interface ResponseData {
	// 数据
	data: object
	// 信息
	message: string
	// 状态
	success: boolean
}
