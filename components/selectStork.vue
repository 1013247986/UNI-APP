<template>
	<div class="dropdown-menu">
		<view class="select">
			<image src="../../static/home/1.png"></image>
			<msDropdownMenu><ms-dropdown-item v-model="value" :list="list" ref="child"></ms-dropdown-item></msDropdownMenu>
		</view>
	</div>
</template>

<script>
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		msDropdownItem,
		msDropdownMenu
	},
	data() {
		return {
			list: [
				{
					name: '暂无可选择仓库',
					id: '0'
				}
			],
			value: ''
		};
	},
	computed: {
		...mapState(['app', 'stork'])
	},
	created() {
		this.show();
	},
	watch: {
		list() {
			this.value = this.list[0].id;
			this.$refs.child.choose(this.list[0]);
		},
		value() {
			// console.log(this.value)
			this.$emit('parent', this.value);
		}
	},
	methods: {
		...mapMutations(['urlRequest']),
		show() {
			uni.getStorage({
				key: 'stork',
				success: res => {
					this.list = JSON.parse(res.data);
				}
			});
		}
	}
};
</script>

<style lang="less">
.dropdown-menu {
	background: #fff;
	display: flex;
	overflow: auto;
	white-space: nowrap;
}
dropdown-item {
	flex: 1;
}
.select {
	display: flex;
	image {
		width: 40upx;
		height: 48upx;
		margin-right: 10upx;
	}
	margin-bottom: 20upx;
}
</style>
