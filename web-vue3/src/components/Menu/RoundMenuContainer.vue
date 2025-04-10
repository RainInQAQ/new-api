<template>
	<div :class="{ menu: true, active: toggleActive }">
		<div class="toggle" @click="toggleMenu">
			<div class="menu-icon">
				<Plus />
			</div>
		</div>
		<li v-for="(menu, i) in topMenus" :key="i" :style="{ '--i': i }">
			<router-link :to="menu.path">
				<div class="menu-icon">
					<component :is="menu.meta.icon" v-if="menu.meta && menu.meta.icon"></component>
				</div>
			</router-link>
		</li>
	</div>
</template>

<script setup>
import { topMenus } from '@/router/index.ts'
import { ref } from 'vue'
let toggleActive = ref(false)
const toggleMenu = () => {
	toggleActive.value = !toggleActive.value
}
</script>

<style scoped lang="scss">
.menu {
	position: fixed;
	width: 240px;
	height: 240px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 120px;
	.menu-icon {
		min-width: 26px;
		height: 26px;
		display: flex;
	}
	.toggle {
		position: absolute;
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		border-radius: 50%;
		cursor: pointer;
		transition: transform 0.5s;
		background-color: #ffffff;
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
	}
	li {
		position: absolute;
		left: -20px;
		list-style: none;
		transform-origin: 120px;
		transition: 0.5s;
		transform: rotate(0deg) translateX(120px);
		border-radius: 50%;
		background-color: #ffffff;
		backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			transform: rotate(calc(360deg / -12 * var(--i)));
		}
	}
	&.active {
		.toggle {
			transform: rotate(225deg);
		}
		li {
			left: 0;
			transform: rotate(calc(360deg / 12 * var(--i)));
		}
	}
}
</style>
