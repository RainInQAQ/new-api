import { createApp } from 'vue'
import './assets/styles/global.scss'
import './assets/styles/vxe.scss'
import './assets/styles/furry.scss'

// App、router、store
import App from './App.vue'
import router from './router/index.ts'

// 完整导入 UI 组件库
import 'vxe-pc-ui/lib/style.css'
import { lazyVxeUI, lazyVxeTable } from './utils/vant.ts'
import 'vxe-table/lib/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 引入路由
app.use(router)
// 引入VxeUI和表格
app.use(lazyVxeUI)
app.use(lazyVxeTable)
// 引入ElementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.mount('#app')
