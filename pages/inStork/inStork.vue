<template>
	<view class="main">
		<view class="boxlist">
			<view class="boxOne" v-for="(item, index) in list" :key="index" @click="TO">
				<view class="boxOne-left">
					<view class="text">
						入库记录单编号：
						<view class="text-num">{{ item.warehouseInCode }}</view>
					</view>
					<view class="text">
						仓库：
						<view class="text-cont">{{ item.warehouseName }}</view>
					</view>
					<view class="text">
						入库时间：
						<view class="text-cont">{{ item.createTime }}</view>
					</view>
					<view class="text">
						操作员：
						<view class="text-cont">{{ item.createName }}</view>
					</view>
				</view>
				<view class="boxOne-right"><text class="cuIcon-right"></text></view>
			</view>

			<view style="text-align: center;">{{ loadText }}</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			list: [],
			pageNo: 1,
			isReach: false,
			loadText: '加载中...'
		};
	},
	onShow() {
		this.show();
	},
	computed: {
		...mapState(['app'])
	},

	onPullDownRefresh: function() {
		this.isReach = false;
		this.pageNo = 1;
		this.show();
	},
	onReachBottom: function() {
		this.pageNo++;
		this.isReach = true;
		this.show();
	},
	methods: {
		...mapMutations(['urlRequest']),
		TO() {
			uni.navigateTo({
				url: './inStorkDet/inStorkDet'
			});
		},
		show() {
			this.loadText = '加载中...';
			this.urlRequest({
				url: `/operation-agency-service/warehouseIn/getHeadList?access_token=${this.app.access_token}`,
				method: 'post',
				data: {
					isPage: true,
					pageNo: this.pageNo,
					pageSize: 10,
					params: { brandId: '', partsCode: '', warehouseId: '' }
				},
				callBack: res => {
					let a = res.data.result;
					if (a === '0000'||!a.length) {
						this.loadText = '没有更多数据！';
						return;
					} else if (this.isReach) {
						for(let i of a){
						this.list.push(i);
						}
						return;
					}
					this.list = a;
				}
			});
		}
	}
};
</script>

<style lang="less">
.main {
	background: rgba(238, 238, 238, 1);

	.boxlist {
		.boxOne,
		.boxOne:first-child {
			background: rgba(255, 255, 255, 1);
			border-radius: 16upx;
			margin: 24upx;
			padding: 22upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.boxOne-left {
				.text {
					display: flex;
					color: #999999;
					font-size: 26upx;

					.text-cont {
						color: #333333;
					}

					.text-num {
						color: #0099ff;
					}
				}
			}

			.boxOne-right {
				color: #999999;
				font-size: 38upx !important;
			}
		}

		.boxOne:first-child {
			margin-top: 30upx;
		}
	}
}
</style>
