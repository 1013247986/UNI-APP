<template>
	<view class="mian">
		<view class="contant" v-for="(item, index) in list" :key="index">
			<text>{{ index + 1 }}.</text>
			<view class="list-con">
				品牌：
				<view class="text-con">{{ item.brandName }}</view>
			</view>
			<view class="list-con">
				配件分类：
				<view class="text-con">安全类</view>
			</view>
			<view class="list-con">
				配件编码：
				<view class="text-con text-num">{{ item.partCode }}</view>
			</view>
			<view class="list-con">
				配件名称：
				<view class="text-con">{{ item.partName }}</view>
			</view>
			<view class="list-con">
				规格型号：
				<view class="text-con">SDD389274-3542</view>
			</view>
			<view class="list-con">
				查询码：
				<view class="text-con text-num">67466743</view>
			</view>
			<view class="list-con">
				同俗名称：
				<view class="text-con">{{ item.channelName }}</view>
			</view>
			<view class="list-con">
				通用车型：
				<view class="text-con">两箱、三箱</view>
			</view>
			<view class="list-con">
				计量单位：
				<view class="text-con">件</view>
			</view>
			<view class="list-con">
				可替代件：
				<view class="text-con">升降开关左前</view>
			</view>
			<view class="list-con">
				是否大件：
				<view class="text-con">{{ item.incoice }}</view>
			</view>
			<view class="list-con">
				颜色：
				<view class="text-con">灰银</view>
			</view>
			<view class="list-con">
				关联配件：
				<view class="text-con">安全开关断路器</view>
			</view>
			<view class="list-con">
				上级配件：
				<view class="text-con">右前升降开关</view>
			</view>
			<view class="list-con">
				生产厂家：
				<view class="text-con">德国士兰微零件股份有限公司</view>
			</view>
			<view class="list-con">
				进口：
				<view class="text-con">中国香港</view>
			</view>
			<view class="list-con">
				产地：
				<view class="text-con">德国</view>
			</view>
			<view class="list-dex">
				<view class="list-con">
					价格级别：
					<view class="text-num">
						{{ item.channel }}
						<text class="cuIcon-unfold icon-color"></text>
					</view>
				</view>
				<view class="list-con" style="margin-left: 130upx;">
					是否开票：
					<view class="text-num">
						否
						<text class="cuIcon-unfold icon-color"></text>
					</view>
				</view>
			</view>
			<view class="list-dex">
				<view class="list-con">
					入库数量：
					<input type="number" class="list-inpu" :value="item.number" :disabled="true" />
				</view>
				<view class="list-con" style="margin-left: 130upx;">
					进价：
					<input type="number" class="list-inpu" :value="item.purchasingPrice" :disabled="true" />
				</view>
			</view>
			<view class="list-con">
				配件来源：
				<view class="text-con">大方县合兴汽车修理厂</view>
			</view>
			<view class="list-con">
				购买渠道：
				<view class="text-con">中间代理经销商</view>
			</view>
			<view class="list-con">
				货位：
				<view class="text-con">{{ item.localtionName }}</view>
			</view>
			<view class="list-con">
				备注：
				<view class="text-con">{{ item.remark }}</view>
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
			list: [],
			id: '',
			pageNo: 1,
			isReach: false,
			loadText: '加载中...'
		};
	},
	onload: function(option) {
		this.id = option.id;
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
		console.log('加载');
		this.pageNo++;
		this.isReach = true;
		this.show();
	},
	methods: {
		...mapMutations(['urlRequest', 'TO', 'setStork']),
		show() {
			this.loadText = '加载中...';
			this.urlRequest({
				method: 'post',
				url: `/operation-agency-service/warehouseIn/getDetailList?access_token=${this.app.access_token}`,
				data: {
					isPage: true,
					pageNo: this.pageNo,
					pageSize: 10,
					params: { mid: this.id }
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
						console.log(this.list);
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
.mian {
	background: #fff;
	.contant {
		padding: 28upx;
		border-top: 1upx solid #e5e5e5;
		.list-con {
			display: flex;
			font-size: 26upx;
			color: #999999;
			line-height: 26px;
			.text-con {
				font-size: 26upx;
				font-weight: 400;
				color: #333333;
			}

			.text-num {
				color: #0099ff;
				.icon-color {
					color: #333333;
				}
			}

			.list-inpu {
				width: 136upx;
				height: 48upx;
				border: 1upx solid rgba(160, 160, 160, 1);
				border-radius: 10upx;
				text-align: center;
			}
		}

		.list-dex {
			display: flex;
			// justify-content: space-between;
			width: 88%;
		}
	}
}
</style>
