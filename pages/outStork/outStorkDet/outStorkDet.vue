<template>
	<view class="main">
		<view class="waitOut" style="margin-bottom: 20upx;">
			<view class="content">
				<view class="info">
					<view class="text">
						<span>出库单编号：</span>
						<text>{{ info.warehouseOutCode }}</text>
					</view>
					<view class="text">
						<span>业务单位：</span>
						<text>{{ info.enterpriseName }}</text>
					</view>
					<view class="text">
						<span>联系人：</span>
						<text>{{ info.lastModifyName }}</text>
					</view>
					<view class="text">
						<span>联系电话：</span>
						<text class="color">{{ info.phone }}</text>
					</view>
					<view class="text">
						<span>单据日期：</span>
						<text>{{ info.createTime }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="numInfo" v-for="item in list">
			<view class="text">
				<span>配件名称：</span>
				<text>{{ item.partsName }}</text>
			</view>
			<view class="text">
				<span>配件编码：</span>
				<text class="color">{{ item.partsCode }}</text>
			</view>
			<view class="text">
				<span>价格级别：</span>
				<text>{{ item.channel }}</text>
			</view>
			<view class="flex">
				<view class="text">
					<span>订货数量：</span>
					<text>{{ item.number }}</text>
				</view>
				<view class="text">
					<span>价格：</span>
					<text>{{ item.partsPrice }}</text>
				</view>
				<view class="text">
					<span>货位：</span>
					<text>{{ item.locationName }}</text>
				</view>
				<view class="text">
					<span>库存数：</span>
					<text>{{ item.warehouseNumber }}</text>
				</view>
				<view class="text">
					<span>实际出库数：</span>
					<text>{{ item.realNumber }}</text>
				</view>
				<view class="text">
					<span>金额（合计）：</span>
					<text style="color: red;">{{ item.money }}</text>
				</view>
			</view>

			<view class="text">
				<span>订单编码：</span>
				<text>{{ item.orderCode }}</text>
			</view>
			<view class="text">
				<span>订单时间：</span>
				<text>{{ item.createTime }}</text>
			</view>
		</view>
		<view style="text-align: center;">{{ loadText }}</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data: function() {
		return {
			info: {},
			list: [],
			id: '',
			pageNo: 1,
			isReach: false,
			loadText: '加载中...'
		};
	},
	onLoad: function(option) {
		this.info = JSON.parse(option.info);
	},
	onShow: function() {
		this.show();
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
	computed: {
		...mapState(['app'])
	},
	methods: {
		...mapMutations(['urlRequest']),
		show() {
			this.loadText = '加载中...';
			this.urlRequest({
				method: 'post',
				url: `/operation-agency-service/warehouseOut/listWarehouseDetailById?access_token=${this.app.access_token}`,
				data: {
					isPage: true,
					pageNo: this.pageNo,
					pageSize: 10,
					params: { mid: this.info.id }
				},
				callBack: res => {
					let a = res.data.result;
					if (a === '0000' || !a.length) {
						this.loadText = '没有更多数据！';
						return;
					} else if (this.isReach) {
						for (let i of a) {
							this.list.push(i);
						}
						return;
					}
					this.list = a;
					this.loadText = '没有更多数据！';
				}
			});
		}
	}
};
</script>

<style lang="less">
.main {
	.waitOut {
		padding: 40upx 20upx 20upx 20upx;
		background: #fff;
		.content {
			background-color: #fff;
			border-radius: 10upx;
			margin-bottom: 20upx;
			.title {
				border-bottom: 1upx solid #e5e5e5;
				font-size: 30upx;
				h3 {
					font-weight: bold;
				}
			}
			.info {
				.text {
					display: flex;
					span {
						width: 180upx;
						text-align: right;
					}
					.color {
						color: #0099ff;
					}
				}
				text {
					color: #999999;
				}
			}
		}
	}
	.numInfo {
		padding: 20upx;
		background: #fff;
		border-bottom: 1upx solid #dcdcdc;
		span {
			color: #999999;
		}
		.color {
			color: #0099ff;
		}
		.flex {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.text {
				width: 50%;
			}
		}
	}
}
</style>
