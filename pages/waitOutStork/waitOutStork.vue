<template>
	<view class="main">
		<view style="height: 200upx; width: 100%;position: fixed;top: 0;">
			<view class="select"><selectStork @parent="setStork"></selectStork></view>
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入搜索的关键词" confirm-type="search" v-model="input" />
				</view>
				<view class="action"><button class="cu-btn bg-gradual-blue shadow-blur round" @click="submit">搜索</button></view>
			</view>
		</view>
		<view class="waitOut">
			<view class="content" v-for="(item, index) in list" :key="index">
				<view class="title" @click="TO(`./waitList?name=${item.enterpriseName}`)">
					<h3>{{ item.enterpriseName }}</h3>
					<text class="cuIcon-right"></text>
				</view>
				<view class="info">
					<view class="text">
						<span>联系人：</span>
						<text>{{ item.name }}</text>
					</view>
					<view class="text">
						<span>待出库订单数：</span>
						<text style="color: #0099FF;">{{ item.num }}</text>
					</view>
					<view class="text">
						<span>联系电话：</span>
						<text>{{ item.phone }}</text>
					</view>
					<view class="text">
						<span>联系地址：</span>
						<text>{{ item.address }}</text>
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
export default {
	components: {
		selectStork
	},
	data() {
		return {
			loading: false,
			res: '',
			stork: '',
			list: [],
			input: '',
			loadingText: '正在载入数据...'
		};
	},
	onLoad() {
		// this.sendRequest();
	},
	watch: {
		stork() {
			console.log(this.stork);
			this.show();
		}
	},
	onPullDownRefresh: function() {
		this.show();
	},
	computed: {
		...mapState(['app'])
	},
	methods: {
		...mapMutations(['urlRequest', 'TO', 'setStork']),
		setStork(e) {
			this.stork = e;
			console.log(e);
		},
		submit(){
			this.show()
		},
		show() {
			this.loadingText = '正在载入数据...';
			this.urlRequest({
				method: 'post',
				url: `/operation-agency-service/warehouseOut/listWarehouseOutAPP?access_token=${this.app.access_token}`,
				data: {
					params: { warehouseId: this.stork, enterpriseName: this.input }
				},
				callBack: res => {
					this.list = res.data.result;
					this.loadingText = '没有更多数据！';
				}
			});
		}
	}
};
</script>

<style lang="less">
.main {
	font-family: 'Scour';
	margin-bottom: 20px;
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
				span {
					color: #999999;
				}
			}
		}
	}
}
</style>
