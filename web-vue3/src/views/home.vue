<script setup></script>

<template>
	<div class="container">
		<VxeCard title="系统信息" shadow width="calc(50% - 20px)">
			<template #extra>系统信息总览</template>
			<div class="info-line">名称：{{ sysInfo.name }}</div>
			<div class="info-line">版本：{{ sysInfo.version }}</div>
			<div class="info-line">
				源码：
				<VxeLink
					status="primary"
					:content="sysInfo.sourceCodeUrl"
					:href="sysInfo.sourceCodeUrl"
					target="_blank" />
			</div>
			<div class="info-line">
				协议：
				<VxeLink
					status="primary"
					:content="sysInfo.licenseName"
					:href="sysInfo.licenseUrl"
					target="_blank" />
			</div>
		</VxeCard>
		<VxeCard title="系统配置" shadow width="calc(50% - 20px)">
			<template #extra>系统配置总览</template>
			<div class="info-line">邮箱验证：未启用</div>
			<div class="info-line">GitHub 身份验证：未启用</div>
			<div class="info-line">LINUX DO 身份验证：未启用</div>
			<div class="info-line">微信身份验证：未启用</div>
			<div class="info-line">Turnstile 用户校验：未启用</div>
			<div class="info-line">Telegram 身份验证：未启用</div>
		</VxeCard>
	</div>
</template>
<script setup lang="ts">
import { getHomePageContent } from '@/api/home.ts'

const sysInfo = {
	name: 'New API',
	version: 'v0.0.0',
	sourceCodeUrl: 'https://github.com/Calcium-Ion/new-api',
	licenseName: 'Apache-2.0 License',
	licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0'
}
getHomePageContent().then((res) => {
	console.log(res.data)
})
</script>
<style scoped lang="scss">
.container {
	display: flex;
	justify-content: space-between;
	.info-line {
		margin-bottom: 10px;
	}
}
::v-deep {
	.vxe-card {
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(5px);
		box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
}
</style>
