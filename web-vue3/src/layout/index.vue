<script setup>
import TopBar from '@/components/TopBar/TopBar.vue'
import MenuContainer from '@/components/Menu/MenuContainer.vue'
// import RoundMenuContainer from '@/components/Menu/RoundMenuContainer.vue'
</script>

<template>
	<div>
		<TopBar>
			<div class="top-container">
				<div class="logo">
					<img width="40px" src="../assets/icons/logo.png" alt="logo" />
					<div class="project-name">New Api</div>
				</div>
				<div class="menus">
					<MenuContainer />
				</div>
			</div>
		</TopBar>
		<section class="menu-content">
			<RouterView />
		</section>
		<footer>
			<VxeLink
				status="primary"
				content="New Api"
				href="https://github.com/Calcium-Ion/new-api"
				target="_blank" />
			由
			<VxeLink
				status="primary"
				content="Calcium-Ion"
				href="https://github.com/Calcium-Ion"
				target="_blank" />
			开发，基于 One API
		</footer>
		<!--		<RoundMenuContainer />-->
	</div>
</template>
<style scoped lang="scss">
.top-container {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	.logo {
		width: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			user-select: none;
			-webkit-user-drag: none;
		}
		.project-name {
			display: flex;
			margin-left: 10px;
			font-size: 30px;
		}
	}
	.menus {
		width: calc(100% - 200px);
	}
}
.menu-content {
	margin-top: 100px;
	padding: 20px;
	height: calc(100vh - 100px);
	overflow: auto;
}
footer {
	position: fixed;
	width: 100%;
	bottom: 0;
	text-align: center;
	line-height: 30px;
}
</style>
