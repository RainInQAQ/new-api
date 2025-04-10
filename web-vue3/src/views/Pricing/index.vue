<template>
	<div class="furry">
		<VxeTip status="success" icon="vxe-icon-check">您的默认分组为：default，分组倍率为：1</VxeTip>
		<VxeTip status="primary" icon="vxe-icon-info-circle">
			按量计费费用 = 分组倍率 × 模型倍率 × （提示token数 + 补全token数 × 补全倍率）/ 500000
			（单位：美元）
		</VxeTip>
		<div class="table-container furry-box">
			<VxeTable :data="pricingData.data">
				<VxeColumn title="可用性">
					<!--				<template #default="{ row }">-->
					<!--					{{ row.enable_groups }}-->
					<!--				</template>-->
				</VxeColumn>
				<VxeColumn title="模型名称">
					<template #default="{ row }">
						<VxeTag status="success" :content="row.model_name" />
					</template>
				</VxeColumn>
				<VxeColumn title="计费类型">
					<template #default="{ row }">
						<VxeTag
							:status="quotaType[row.quota_type]?.tagStatus"
							:content="quotaType[row.quota_type]?.text" />
					</template>
				</VxeColumn>
				<VxeColumn title="可用分组">
					<template #default="{ row }">
						<VxeTag v-for="(g, i) in row.enable_groups" :key="i" status="info" :content="g" />
					</template>
				</VxeColumn>
				<VxeColumn title="倍率">
					<template #default="{ row }">
						<p>模型：{{ row.quota_type === 0 ? row.model_ratio : '无' }}</p>
						<p>补全：{{ row.quota_type === 0 ? row.completion_ratio : '无' }}</p>
						<!--					<p>分组：{{ row.quota_type === 0 ? row.model_ratio : '无' }}</p>-->
					</template>
				</VxeColumn>
				<VxeColumn title="模型价格">
					<!--				<template #default="{ row }">-->
					<!--					<p>提示：${{ row.model_ratio * 2 * groupRatio[selectedGroup] }} / 1M tokens</p>-->
					<!--					<p>补全：{{ row.quota_type === 0 ? row.completion_ratio : '无' }}</p>-->
					<!--				</template>-->
				</VxeColumn>
			</VxeTable>
			<VxePager
				align="left"
				:current-page="1"
				:page-size="pricingData?.data?.length"
				:page-sizes="[{ label: '所有数据', value: pricingData?.data?.length }]"
				:total="pricingData?.data?.length"
				size="small" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { getPricing } from '@/api/pricing.ts'
import { PricingVO } from '@/api/types/pricing.ts'
import { ref } from 'vue'
const quotaType = {
	0: {
		tagStatus: 'primary',
		text: '按量计费'
	},
	1: {
		tagStatus: 'success',
		text: '按次计费'
	}
}
const pricingData = ref<PricingVO[]>([])
getPricing().then((res) => {
	pricingData.value = res.data
})
</script>

<style scoped lang="scss">
.table-container {
	width: 100%;
	max-height: calc(100vh - 240px);
	overflow: auto;
}
</style>
