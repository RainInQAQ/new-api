import {
	VxeUI,
	VxeCard,
	VxeButton,
	VxeLink,
	VxeTip,
	VxeTag,
	VxePager,
	VxeForm,
	VxeFormItem,
	VxeInput,
	VxeModal
} from 'vxe-pc-ui'

import { VxeTable, VxeColumn, VxeColgroup, VxeGrid, VxeToolbar } from 'vxe-table'

// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'

VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')

export const lazyVxeUI = (app) => {
	app.use(VxeCard)
	app.use(VxeButton)
	app.use(VxeLink)
	app.use(VxeTip)
	app.use(VxeTag)
	app.use(VxePager)
	app.use(VxeForm)
	app.use(VxeFormItem)
	app.use(VxeInput)
	app.use(VxeModal)
}

export const lazyVxeTable = (app) => {
	app.use(VxeTable)
	app.use(VxeColumn)
	app.use(VxeColgroup)
	app.use(VxeGrid)
	app.use(VxeToolbar)
}
