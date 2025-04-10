<template>
	<router-link :to="menu.path">
		<div :class="{ 'menu-item': true, active: menu.path === proxy?.$route.path }">
			<div class="menu-icon">
				<component :is="menu.meta.icon" v-if="menu.meta && menu.meta.icon"></component>
			</div>
			<div v-if="menu.meta && menu.meta.title" class="menu-label">{{ menu.meta.title }}</div>
		</div>
	</router-link>
</template>
<script setup lang="ts">
import { getCurrentInstance, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
defineProps<{
	menu: {
		type: PropType<RouteRecordRaw>
		required: true
	}
}>()
const { proxy } = getCurrentInstance()
</script>
<style scoped>
.menu-item {
	margin-left: 20px;
	cursor: pointer;
	transition: all 0.2s;
	height: 40px;
	min-width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	border: 1px solid transparent;
	.menu-icon {
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
	.menu-label {
		margin-left: 5px;
		margin-right: 10px;
		user-select: none;
	}
	&:hover,
	&.active {
		background-color: #333333;
		border-color: #333333;
		color: #eeeeee;
	}
}
</style>
