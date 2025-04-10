import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
// 顶部菜单
const topMenus: RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/home.vue'),
		meta: { title: '首页', icon: 'HomeFilled' }
	},
	{
		path: '/pricing',
		name: 'Pricing',
		component: () => import('@/views/Pricing/index.vue'),
		meta: { title: '模型价格', icon: 'PriceTag' }
	},
	{
		path: '/channel',
		name: 'Channel',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '渠道', icon: 'MessageBox' }
	},
	{
		path: '/token',
		name: 'Token',
		component: () => import('@/views/Token/index.vue'),
		meta: { title: '令牌', icon: 'Key' }
	},
	{
		path: '/redemption',
		name: 'Redemption',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '兑换码', icon: 'Ticket' }
	},
	{
		path: '/topup',
		name: 'Topup',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '钱包', icon: 'WalletFilled' }
	},
	{
		path: '/user',
		name: 'User',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '用户管理', icon: 'UserFilled' }
	},
	{
		path: '/log',
		name: 'Log',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '日志', icon: 'DataAnalysis' }
	},
	{
		path: '/detail',
		name: 'Detail',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '数据看板', icon: 'TrendCharts' }
	},
	{
		path: '/midjourney',
		name: 'Midjourney',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '绘图', icon: 'PictureFilled' }
	},
	{
		path: '/task',
		name: 'Task',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '异步任务', icon: 'Operation' }
	},
	{
		path: '/setting',
		name: 'Setting',
		component: () => import('@/views/Channel/index.vue'),
		meta: { title: '设置', icon: 'Setting' }
	}
]
const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '',
		component: Layout,
		redirect: '/home',
		children: topMenus
	}
]

export default createRouter({
	history: createWebHistory(),
	routes
})
// 导出顶部菜单供menu相关组件使用
export { topMenus }
