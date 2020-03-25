<template>
	<view class="main">
		<view class="waitOut">
			<view class="content" v-for="(item, index) in list" :key="index">
				<view class="title">
					<view style="display: flex;" @click="checkboxChange(item.orderDetailId, 0)">
						<div class="select"><image :src="item.select ? '../../static/select.png' : ''" mode=""></image></div>
						<h3>{{ item.partsName }}</h3>
					</view>
					<text style="color: #0099FF;">{{ item.urgent === '否' ? '未加急' : '加急订单' }}</text>
				</view>
				<view class="info">
					<view class="text">
						<span>配件编码：</span>
						<text style="color: #0099FF;">{{ item.partsCode }}</text>
					</view>
					<div class="num">
						<view class="text">
							<span>价格级别：</span>
							<text>{{ item.channel }}</text>
						</view>
						<view class="text">
							<span>货位：</span>
							<text>{{ item.locationName }}</text>
						</view>
						<view class="text">
							<span>订货数量：</span>
							<text>{{ item.number }}</text>
						</view>
						<view class="text">
							<span>库存数：</span>
							<text>{{ item.warehouseNumber }}</text>
						</view>
						<view class="text">
							<span>价格：</span>
							<text>{{ item.urgent === '否' ? item.partsPrice.toFixed(2) : item.partsPrice + item.urgentPrice }}</text>
						</view>
					</div>
				</view>
				<view class="text">
					<span>订单编号：</span>
					<text>{{ item.i }}</text>
				</view>
				<view class="text">
					<span>订单时间：</span>
					<text>{{ item.date }}</text>
				</view>

				<view class="outNum">
					<div style="display: flex;align-items: center;">
						<span>出库数：</span>
						<uni-number-box
							:min="1"
							:max="item.warehouseNumber"
							:value="item.unfilledNumber > item.warehouseNumber ? item.warehouseNumber : item.unfilledNumber"
							@change="numberChange($event, item.orderDetailId)"
						></uni-number-box>
					</div>
					<div>
						<span>金额（合计）：</span>
						<text>
							{{
								Math.floor(item.urgent === '否' ? item.partsPrice * item.unfilledNumber * 100 : (item.partsPrice + item.urgentPrice) * item.unfilledNumber * 100) /
									100
							}}
						</text>
					</div>
				</view>
			</view>
			<view style="text-align: center;">{{loadText}}</view>
		</view>
		<view class="footer">
			<view class="left" @click="chooseAll">
				<div class="all"><image v-if="imgUrl" src="../../static/select.png" mode="" style="width: 100%;height: 100%;"></image></div>
				<text>全选</text>
			</view>
			<view class="right">
				<view class="total">
					<text>合计：</text>
					<text>￥{{ totalPrice.toFixed(2) }}</text>
				</view>
				<view class="bottom" @click="noTitlemodalTap">出库</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			loadText:'加载中...',
			list: [],
			sendList: [],
			totalPrice: 0,
			imgUrl: false,
			enterpriseName: '',
			pageNo: 1,
			isReach: false
		};
	},
	watch: {
		sendList() {
			this.totalPrice = 0;
			let list = this.sendList;
			if (this.sendList.length === this.list.length) {
				this.imgUrl = true;
			} else {
				this.imgUrl = false;
			}
			for (var j = 0; j < list.length; j++) {
				let a = list[j].partsPrice;
				if (list[j].urgent === '是') {
					a = list[j].partsPrice + list.urgentPrice;
				}
				this.totalPrice += list[j].unfilledNumber > list[j].warehouseNumber ? list[j].warehouseNumber * a : a * list[j].unfilledNumber;
			}
		}
	},
	onLoad: function(option) {
		this.enterpriseName = option.name;
	},
	onShow: function() {
		this.show();
	},
	computed: {
		...mapState(['app', 'stork'])
	},

	onPullDownRefresh: function() {
		this.isReach = false;
		this.pageNo = 1;
		this.show();
	},
	onReachBottom: function() {
		console.log('加载');
		this.pageNo++;
		this.isReach = true;
		this.show();
	},
	methods: {
		...mapMutations(['urlRequest']),
		checkboxChange(e) {
			var checked = e;
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i].orderDetailId === checked && this.list[i].warehouseNumber) {
					this.list[i].select = !this.list[i].select;
					if (this.list[i].select) {
						this.sendList.push(this.list[i]);
						console.log(this.sendList);
					} else {
						this.del(checked);
					}
				}
			}
		},
		chooseAll() {
			this.imgUrl = !this.imgUrl;
			this.sendList = [];
			if (this.imgUrl) {
				for (var i = 0; i < this.list.length; i++) {
					if (!this.list[i].warehouseNumber) {
						this.$api.msg('部分出库单仓库数量不足，不能进行全选操作');
						return;
					}
					this.list[i].select = true;
					this.sendList.push(this.list[i]);
				}
			} else {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].select = false;
				}
			}
		},
		del(checked) {
			for (var j = 0; j < this.sendList.length; j++) {
				if (this.sendList[j].orderDetailId === checked) {
					this.sendList.splice(j, 1);
				}
			}
			console.log(this.sendList);
		},
		numberChange(event, key) {
			console.log(event, key);
			// this.list[index].number = data;
			let items = this.list;
			for (let i = 0; i < items.length; i++) {
				if (items[i].orderDetailId == key) {
					items[i].unfilledNumber = event;
					items[i].realNumber = event;
					if (items[i].select) {
						this.del(items[i].orderDetailId);
						this.sendList.push(this.list[i]);
					}
				}
			}
		},
		noTitlemodalTap() {
			uni.showModal({
				title: '出库确认',
				content: '确定要出库吗？',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定');
						this.subumit();
						// uni.navigateTo({
						// 	url: './waitOutInfo'
						// });
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		show() {
			this.loadText='加载中...'
			this.urlRequest({
				method: 'post',
				url: `/operation-agency-service/warehouseOut/listSellDetail?access_token=${this.app.access_token}`,
				data: {
					isPage: true,
					pageNo: this.pageNo,
					pageSize: 10,
					params: { partsCode: '', partsName: '', urgent: '', enterpriseName: this.enterpriseName, code: '' }
				},
				callBack: res => {
					let a = res.data.result;
					if(a==='0000'){
						this.loadText='没有更多数据！'
						return
					}
					for (let i = 0; i < a.length; i++) {
						a[i].select = false;
						a[i].realNumber = a[i].unfilledNumber;
					}
					if(this.isReach){
						this.list.concat(a)
						return
					}
					this.list = a;
				}
			});
		},
		subumit() {
			this.urlRequest({
				method: 'post',
				url: `/operation-agency-service/warehouseOut/addWareHouseOrder?access_token=${this.app.access_token}`,
				data: {
					list: this.sendList
				},
				callBack: res => {
					console.log(res);
					this.$api.msg('提交成功');
					this.sendList = [];
					this.pageNo = 1;
					this.isReach=false
					this.show();
				}
			});
		}
	}
};
</script>

<style lang="less">
.main {
	.waitOut {
		margin-bottom: 120upx;
		padding: 0 20upx;
		.content {
			padding: 20upx 20upx;
			background-color: #fff;
			margin-top: 20upx;
			border-radius: 10upx;
			.outNum {
				display: flex;
				align-items: center;
				div {
					margin-top: 10upx;
				}
				span {
					color: #000;
				}
				text {
					color: red;
					font-size: 35upx;
				}
			}
			.title {
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #e5e5e5;
				font-size: 30upx;
				.select {
					width: 40upx;
					height: 40upx;
					border: 1px solid #999;
					border-radius: 50%;
					margin: 5upx 10upx 0 0;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				h3 {
					font-weight: bold;
				}
			}
			span {
				color: #999999;
			}
			.info {
				border-bottom: 1upx solid #e5e5e5;
				padding-left: 40upx;
				.num {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.text {
						width: 50%;
					}
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		font-family: 'Scour';
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 20upx;
		height: 100upx;
		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			.all {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				border: 1px solid #999;
				margin-right: 20upx;
			}
		}
		.right {
			display: flex;
			justify-content: center;
			align-items: center;
			.total {
				margin-right: 40upx;
				font-size: 30upx;
				font-weight: bold;
				text:last-child {
					font-size: 45upx;
					color: red;
				}
			}
			.bottom {
				background-color: ;
				color: #fff;
				border-radius: 50upx;
				width: 200upx;
				line-height: 80upx;
				text-align: center;
				background: linear-gradient(to right, #51b6fa, #0099ff);
			}
		}
	}
}
</style>
