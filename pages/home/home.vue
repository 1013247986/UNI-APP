<template>
	<view class="main">
		<selectStork @parent="select"></selectStork>
		<view class="banner"><image src="../../static/home/banner.jpg" mode=""></image></view>
		<h3>出库管理</h3>
		<view class="manage">
			<view style="padding: 20upx;width: 200upx;text-align: center;" @click="TO('../waitOutStork/waitOutStork')">
				<view class="img"><image src="../../static/home/7.png" mode=""></image></view>
				<text>销售待出库</text>
			</view>
		</view>

		<h3>入库管理</h3>
		<view class="manage" @click="$api.msg('该功能正在开发中')">
			<view style="padding: 20upx;width: 200upx;text-align: center;">
				<view class="img"><image src="../../static/home/3.png" mode=""></image></view>
				<text>手动入库</text>
			</view>
		</view>

		<h3>相关查询</h3>
		<view class="manage">
			<view style="padding: 20upx;width: 200upx;text-align: center;" @click="TO('../inventory/inventory')">
				<view class="img"><image src="../../static/home/4.png" mode=""></image></view>
				<text>实时库存查询</text>
			</view>
			<view style="padding: 20upx;width: 200upx;text-align: center;" @click="TO('../inStork/inStork')">
				<view class="img"><image src="../../static/home/5.png" mode=""></image></view>
				<text>入库记录</text>
			</view>
			<view style="padding: 20upx;width: 200upx;text-align: center;" @click="TO('../outStork/outStork')">
				<view class="img"><image src="../../static/home/6.png" mode=""></image></view>
				<text>出库记录</text>
			</view>
		</view>
	</view>
</template>

<script>
import selectStork from '@/components/selectStork.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		selectStork
	},
	data() {
		return {};
	},
	onLoad() {
		this.urlRequest({
			method: 'post',
			url: `/api-base/basicBrand/getBrandSelectList?access_token=${this.app.access_token}`,
			data: {},
			callBack: res => {}
		});
		this.urlRequest({
			method: 'post',
			url: `/base-service/sysDepartment/getSelectList?access_token=${this.app.access_token}`,
			data: {},
			callBack: res => {
				this.setStork(JSON.stringify(res.data.result));
			}
		});
	},
	created() {},
	computed: {
		...mapState(['app'])
	},
	methods: {
		...mapMutations(['urlRequest','TO','setStork']),
		select(e){
			console.log(e)
		}
	}
};
</script>

<style lang="less">
body {
	height: 100%;
	background: #fff;
}
.main {
	font-family: 'Scour';
	padding: 40upx 20upx;
	height: auto;
	.banner {
		height: 300upx;
		border-radius: 10upx;
		overflow: hidden;
		margin-bottom: 40upx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	h3 {
		font-size: 35upx;
		font-weight: bold;
	}
	.manage {
		display: flex;
		flex-wrap: wrap;
		.img {
			width: 90upx;
			height: 90upx;
			margin: 0 auto;
			margin-bottom: 10upx;
			image {
				height: 100%;
				width: 100%;
			}
		}
		text {
			color: #444444;
			text-align: center;
			font-size: 25upx;
		}
	}
}
</style>
