<template>
	<div class="furry">
		<div class="login-container furry-box">
			<div class="title">用户登录</div>
			<VxeForm ref="formRef" :data="loginForm" title-width="70">
				<VxeFormItem title="用户名" field="username" span="24" :item-render="{}">
					<template #default>
						<VxeInput v-model="loginForm.username" placeholder="请输入用户名" />
					</template>
				</VxeFormItem>
				<VxeFormItem title="密码" field="password" span="24" :item-render="{}">
					<template #default>
						<VxeInput v-model="loginForm.password" placeholder="请输入密码" type="password" />
					</template>
				</VxeFormItem>
			</VxeForm>
			<VxeButton class="btn-login" content="登录" @click="handleLogin"></VxeButton>
		</div>
	</div>
</template>
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { LoginForm } from '@/api/types/user'
import { login } from '@/api/user'
import { setUserData } from '@/utils/user'
import { updateAPI } from '@/utils/api'
import Toast from '@/utils/toast'

const { proxy } = getCurrentInstance()
if (proxy.$route.query.redirect) {
	Toast.error('未登录或令牌已失效，请重新登录！')
}

const loginForm = ref<LoginForm>({
	username: '',
	password: ''
})
// 登录方法
const handleLogin = () => {
	login(loginForm.value).then((res) => {
		if (res.success) {
			setUserData(res.data)
			updateAPI()
			Toast.success('登录成功！')
			proxy.$router.push(proxy.$route.query.redirect || '/')
		}
	})
}
</script>
<style scoped lang="scss">
.login-container {
	width: 500px;
	position: absolute;
	left: calc(50% - 250px);
	top: 100px;
	padding: 20px;
	&,
	* {
		font-family: pixel, sans-serif;
	}
	.title {
		font-size: 36px;
		text-align: center;
		margin-bottom: 20px;
	}
	.btn-login.vxe-button {
		width: 100%;
		background-color: rgba(0, 100, 250, 0.3);
		backdrop-filter: blur(5px);
		color: #ffffff;
		letter-spacing: 10px;
		transition: background-color 0.2s;
		box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1) !important;
		&:hover {
			background-color: rgba(0, 100, 250, 0.4);
		}
	}
}
</style>
