<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-box">
				<view class="flex uni-tab__cart-button-left uni-tab__shop-cart" >
					<view class="uni-tab__icon"><image class="image" mode="widthFix" /></view>
					<text class="uni-tab__text">全选</text>
				</view>
			</view>
			<view class="flex uni-tab__cart-sub-box ">
				<view
					class="flex uni-tab__cart-button-right"
				>
					<text class="uni-tab__cart-button-right-text">出库</text>
				</view>
				<!-- <view class="flex uni-tab__cart-button-right uni-tab__color-y ">立即购买</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UniGoodsNav',
	props: {
		options: {
			type: Array,
			default() {
				return [
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
						text: '店铺'
					},
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
						text: '购物车'
					}
				];
			}
		},
		buttonGroup: {
			type: Array,
			default() {
				return [
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				];
			}
		},
		fill: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onClick(index, item) {
		},
		buttonClick(index, item) {
			if (uni.report) {
				uni.report(item.text, item.text);
			}
			this.$emit('buttonClick', {
				index,
				content: item
			});
		}
	}
};
</script>

<style scoped>
.flex {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}

.uni-goods-nav {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex: 1;
	flex-direction: row;
}

.uni-tab__cart-box {
	flex: 1;
	height: 100rpx;
	background-color: #fff;
	z-index: 900;
}

.uni-tab__cart-sub-box {
	flex: 1;
}

.uni-tab__right {
	margin: 5px 0;
	margin-right: 10px;
	border-radius: 100px;
	overflow: hidden;
}

.uni-tab__cart-button-left {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	position: relative;
	justify-content: center;
	align-items: center;
	padding-left: 50upx;
}

.uni-tab__icon {
	width: 20px;
	height: 20px;
	border: 1upx solid #999999;
	border-radius: 50%;
	overflow: hidden;
}

.image {
	width: 20px;
	height: 20px;
}

.uni-tab__text {
	margin-top: 3px;
	font-size: 24rpx;
	color: #666;
}

.uni-tab__cart-button-right {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	flex: 1;
	justify-content: center;
	align-items: center;
}

.uni-tab__cart-button-right-text {
	font-size: 28rpx;
	color: #fff;
}

.uni-tab__cart-button-right:active {
	opacity: 0.7;
}

.uni-tab__dot-box {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	position: absolute;
	right: 12px;
	top: 4px;
	justify-content: center;
	align-items: center;
	/* width: 0;
 */
	/* height: 0;
 */
}

.uni-tab__dot {
	/* width: 30rpx;
 */
	/* height: 30rpx;
 */
	padding: 0 4px;
	line-height: 15px;
	color: #ffffff;
	text-align: center;
	font-size: 12px;
	background-color: #ff0000;
	border-radius: 15px;
}

.uni-tab__dots {
	padding: 0 4px;
	/* width: auto;
 */
	border-radius: 15px;
}

.uni-tab__color-y {
	background-color: #ffa200;
}

.uni-tab__color-r {
	background-color: #ff0000;
}
</style>
