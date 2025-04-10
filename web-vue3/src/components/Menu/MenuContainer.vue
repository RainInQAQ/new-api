<script setup>
import MenuItem from '@/components/Menu/MenuItem.vue'
import { topMenus } from '@/router/index.ts'
</script>

<template>
	<div class="menu-container">
		<MenuItem v-for="(menu, i) in topMenus" :key="i" :menu="menu" />
	</div>
</template>

<style scoped lang="scss">
.menu-container {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
