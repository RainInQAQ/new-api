<script setup lang="ts">
import { getTokenPage } from '@/api/token'

getTokenPage({ p: 1, size: 100 })
</script>

<template>令牌</template>

<style scoped lang="scss"></style>
