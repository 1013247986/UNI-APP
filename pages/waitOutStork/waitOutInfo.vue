<template>
	<view class="main">
		<view class="waitOut">
			<view class="content">
				<view class="title"><h3>订单信息</h3></view>
				<view class="info">
					<view class="text">
						<span>订单编号：</span>
						<text class="color">3SXD20191201150273480</text>
					</view>
					<view class="text">
						<span>订单时间：</span>
						<text>2010-02-18 15:38:46</text>
					</view>
					<view class="text">
						<span>业务单位名称：</span>
						<text>大方县合兴汽车修理厂</text>
					</view>
					<view class="text">
						<span>是否加急：</span>
						<text class="color">是</text>
					</view>
				</view>
			</view>

			<view class="content" @click="TO">
				<view class="title"><h3>配件信息</h3></view>
				<view class="info">
					<view class="text">
						<span>配件名称：</span>
						<text>轮毂总成（铝）</text>
					</view>
					<view class="text">
						<span>配件编码：</span>
						<text class="color">310102P101A</text>
					</view>
					<view class="text">
						<span>品牌名称：</span>
						<text>野马汽车</text>
					</view>
					<view class="text">
						<span>价格级别：</span>
						<text>一级价格</text>
					</view>
					<view class="text">
						<span>规格型号：</span>
						<text>XSD432784927524</text>
					</view>
					<view class="text">
						<span>计量单位：</span>
						<text>件</text>
					</view>
					<view class="text">
						<span>订单数量：</span>
						<text>10</text>
					</view>
					<view class="text">
						<span>库存数：</span>
						<text>30</text>
					</view>
					<view class="text">
						<span>仓库：</span>
						<text>双流库</text>
					</view>
					<view class="text">
						<span>货位：</span>
						<text>A78</text>
					</view>
				</view>
			</view>
			<view class="content" style="text-align: right;">
				<text >金额（合计）：</text>
				<text style="color: red;font-size: 35upx;font-weight: bolder;">￥500</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			TO(){
				uni.navigateTo({
					url:"./outInfo"
				})
			}
		}
	}
</script>

<style lang="less">
.main {
	.waitOut {
		padding: 0 20upx;
		.color {
			color: #0099ff;
		}
		.content {
			padding: 20upx;
			background-color: #fff;
			margin-top: 20upx;
			border-radius: 10upx;
			.title {
				border-bottom: 1upx solid #e5e5e5;
				font-size: 30upx;
				h3 {
					font-weight: bold;
				}
			}
			.info {
				span {
					color: #999999;
				}
			}
		}
	}
}
</style>
