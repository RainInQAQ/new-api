import { VxeUI } from 'vxe-pc-ui'

const Toast = {
	success(content: string) {
		VxeUI.modal.message({
			content,
			status: 'success'
		})
	},
	info(content: string) {
		VxeUI.modal.message({
			content,
			status: 'info'
		})
	},
	error(content: string) {
		VxeUI.modal.message({
			content,
			status: 'error'
		})
	}
}

export default Toast
