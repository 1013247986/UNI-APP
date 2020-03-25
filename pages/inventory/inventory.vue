<template>
	<view class="main">
		<view style="height: 200upx; width: 100%;position: fixed;top: 0;">
			<view class="select"><selectStork @parent="getnewsList"></selectStork></view>
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入搜索的关键词" confirm-type="search" v-model="partsCode" />
				</view>
				<view class="action"><button class="cu-btn bg-gradual-blue shadow-blur round" @click="subumit">搜索</button></view>
			</view>
		</view>

		<view class="waitOut">
			<view class="content" v-for="(item, index) in newsList" :key="index" @click="TO(item.id)">
				<view class="title">
					<h3>
						<text class="cuIcon-repairfill"></text>
						{{ item.name }}
					</h3>
				</view>
				<view class="info">
					<view class="text">
						<span>配件编码：</span>
						<view class="text-num">{{ item.partsCode }}</view>
					</view>
					<view class="text">
						<span>品牌：</span>
						<view class="">野马汽车</view>
					</view>
					<view class="text">
						<span>通俗名称：</span>
						<view class="">前杠、保险杠、前保</view>
					</view>
					<view class="text">
						<span>计量单位：</span>
						{{ item.unit }}
					</view>
					<view class="text">
						<span>当前库存数：</span>
						<view class="text-num">{{ item.totalQuantity }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loading" style="text-align: center;">{{ loadingText }}</view>
	</view>
</template>

<script>
import selectStork from '@/components/selectStork.vue';
import { mapState, mapMutations } from 'vuex';
var _self,
	page = 1,
	timer = null;
export default {
	data() {
		return {
			newsList: [],
			row: '',
			partsCode: '',
			loadingText: '加载中...',
			pageNo: 1,
			isReach: false
		};
	},
	components: {
		selectStork
	},
	onLoad: function() {
		_self = this;
		// this.getnewsList();
	},
	onPullDownRefresh: function() {
		console.log('刷新');
		this.pageNo = 1;
		this.isReach = false;
		this.getnewsList();
	},
	onReachBottom: function() {
		console.log('加载');
		this.pageNo++;
		this.isReach = true;
		this.getnewsList();
	},
	computed: {
		...mapState(['app'])
	},
	methods: {
		...mapMutations(['urlRequest']),
		getnewsList: function(row) {
			this.loadingText = '加载中...';
			console.log(typeof row);
			if (typeof row == 'string') {
				this.row = row;
				this.pageNo = 1;
				this.isReach = false;
			}
			this.urlRequest({
				url: `/operation-agency-service/warehouse/getHeadList?access_token=${this.app.access_token}`,
				method: 'post',
				data: {
					isPage: true,
					pageNo: this.pageNo,
					pageSize: 10,
					params: { brandId: '', partsCode: this.partsCode, warehouseId: this.row || '' }
				},
				callBack: res => {
					if (res.data.result === '0000' && this.partsCode) {
						console.log(res.data.result);
						this.newsList === [];
						this.loadingText = '未搜索到相关数据！';
						return;
					} else if (res.data.result.length > 0 && this.partsCode) {
						this.newsList = res.data.result;
						this.loadingText = '没有更多数据！';
						return;
					}
					if (res.data.result.length > 0 && res.data.result != '0000') {
						if (this.isReach) {
							for (let i of res.data.result) {
								this.newsList.push(i);
							}
							return;
						}
						this.newsList = res.data.result;
					} else {
						this.loadingText = '没有更多数据！';
					}
				}
			});
		},
		subumit() {
			this.isReach = false;
			this.getnewsList(1);
		},
		TO(e) {
			uni.navigateTo({
				url: `./inventoryOne/inventoryOne?id=${e}`
			});
		}
	}
};
</script>

<style lang="less">
.main {
	font-family: 'Scour';

	// background: #fff;
	.select {
		background: #fff;
		padding: 0 20upx;
	}
	.search {
		background: #fff;
		z-index: 0;
	}

	.waitOut {
		margin-top: 200upx;
		padding: 0 20upx;

		.content {
			padding: 20upx 20upx;
			background-color: #fff;
			margin-top: 10upx;
			border-radius: 10upx;

			.title {
				display: flex;
				justify-content: space-between;
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
						color: #999999;
					}

					.text-num {
						color: #0099ff;
					}
				}
			}
		}
	}
}
</style>
