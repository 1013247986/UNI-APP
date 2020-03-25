<template>
	<view class="content">
		<!-- 图标-->
		<text class="title iconfont icon-icon" style="color: green;font-size: 30px;"></text>

		<!--动画1-->
		<view style="display: flex;justify-content: center;padding: 20px;">
			<view class="animated faster iconfont icon-icon" hover-class="pulse" style="border: 1px solid #333;padding: 20rpx;"></view>
		</view>

		<!--动画列表渲染-->

		<!--原生与css库相结合-->
		<view class="view-box animated" :hover-stay-time="800" hover-class="view-box-hover rubberBand">雷鸣</view>
		<text :selectable="true">text\ntext\ntext\ntext\n</text>

		<text class="view-box" id="view2">text2</text>

		<!--flex布局-->
		<view class="box">
			<view class="box-item">1</view>
			<view class="box-item">2</view>
			<view class="box-item">1</view>
		</view>

		<!--数据渲染-->
		<view class="box2">
			<view>{{text}}</view>
			<view>123</view>
			<view>123</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '333'
			};
		},
		onLoad() {
		},
		created() {
			console.log(this.$store.state.app)
		},
		methods: {
			change() {

			}
		}
	};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.view-box {
		font-family: "Scour";
		font-weight: 100;
		font-size: 80upx;
		width: 200upx;
		height: 200upx;
		background: #007aff;
		color: #ffffff;
		margin: 100upx;
	}

	.view-box-hover {
		border: 1px solid;
		background: red;
	}

	#view2 {
		background: yellow;
	}

	.box {
		height: 500upx;
		width: 100%;
		border: 1upx solid #ccc;
		display: flex;
		/* justify-content: center;
	align-items: center;
	flex-direction: column; */
	}

	.box-item {
		font-size: 30upx;
		height: 200upx;
		/* width: 200upx; */
		background: #007aff;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box-item:nth-of-type(odd) {
		background: #007aff;
	}

	.box-item:nth-of-type(even) {
		background: #09bb07;
	}

	/* .box-item:first-of-type{
	flex-shrink: 0;
} */

	.box-item:nth-of-type(1) {
		flex: 1;
	}

	.box-item:nth-of-type(2) {
		flex: 3;
		align-self: flex-end;
	}

	.box-item:nth-of-type(3) {
		flex: 1;
	}

	.box2 {
		border: 1upx solid #333333;
		height: 500upx;
		width: 100%;
		display: flex;
	}

	.box2>view {
		font-size: 40upx;
		flex: 1;
		font-weight: bold;
		background: #007AFF;
		color: #fff;
		display: flex;
		height: 500upx;
		align-items: center;
		justify-content: center;
		border: 1upx solid #fff;
	}
</style>
