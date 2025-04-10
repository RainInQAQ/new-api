<script setup></script>

<template>
	<div class="top-bar">
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.top-bar {
	position: fixed;
	top: 20px;
	left: 20px;
	width: calc(100% - 40px);
	height: 80px;
	border-radius: 40px;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-right: 1px solid rgba(255, 255, 255, 0.2);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
