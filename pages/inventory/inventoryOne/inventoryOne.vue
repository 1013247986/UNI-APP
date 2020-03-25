<template>
	<view class="mian">
		<view class="contant">
			<view class="cont-title">配件基本信息</view>
			<view class="list-con">
				品牌：
				<view class="text-con">野马汽车</view>
			</view>
			<view class="list-con">
				配件分类：
				<view class="text-con">安全类</view>
			</view>
			<view class="list-con">
				配件编码：
				<view class="text-con text-num">{{info.partsCode}}</view>
			</view>
			<view class="list-con">
				配件名称：
				<view class="text-con">{{info.name}}</view>
			</view>
			<view class="list-con">
				规格型号：
				<view class="text-con">SDD389274-3542</view>
			</view>
			<view class="list-con">
				当前库存数：
				<view class="text-con text-num">{{info.number}}</view>
			</view>
			<view class="list-con">
				通俗名称：
				<view class="text-con">升降开关</view>
			</view>
			<view class="list-con">
				通用车型：
				<view class="text-con">两箱、三箱</view>
			</view>
			<view class="list-dex">
				<view class="list-con">
					计量单位：
					<view class="text-con">{{info.unit}}</view>
				</view>
				<view class="list-con" style="margin-left: 200upx;">
					查询码：
					<view class="text-con text-num">67466743</view>
				</view>
			</view>
			<view class="list-dex">
				<view class="list-con">
					可替代件：
					<view class="text-con">无</view>
				</view>
				<view class="list-con" style="margin-left: 200upx;">
					进口：
					<view class="text-con">香港</view>
				</view>
			</view>
			<view class="list-dex">
				<view class="list-con">
					颜色：
					<view class="text-con">灰银</view>
				</view>
				<view class="list-con" style="margin-left: 224upx;">
					货位：
					<view class="text-con">A78</view>
				</view>
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
			<view class="list-con">
				购买渠道：
				<view class="text-con">中间代理经销商</view>
			</view>
			<view class="list-con">
				备注：
				<view class="text-con"></view>
			</view>
		</view>
		<view class="record-title">出/入库记录</view>
		<view class="record-box" v-for="(item,index) in inOutStork" :key="index">
			<view class="record-nav1" v-if="item.type=='初始化入库'">
				<view class="list-con">
					入库订单编号：
					<view class="text-con text-num">CKFD234567</view>
				</view>
				<view class="list-con">
					入库时间：
					<view class="text-con">2020-02-16</view>
				</view>
				<view class="list-con">
					入库数量：
					<view class="text-con">60</view>
				</view>
				<view class="list-con">
					操作人：
					<view class="text-con">任庆林</view>
				</view>
			</view>
			<view class="record-nav2"  v-if="item.type=='销售待出库'">
				<view class="list-con">
					出库订单编号：
					<view class="text-con">CKFD234567</view>
				</view>
				<view class="list-con">
					出库时间：
					<view class="text-con">2020-02-16</view>
				</view>
				<view class="list-con">
					出库数量：
					<view class="text-con">60</view>
				</view>
				<view class="list-con">
					业务单位名称：
					<view class="text-con">双流汽车修理厂</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
export default {
	data: function() {
		return {
			id: '',
			info:{},
			inOutStork:[]
		};
	},
	onLoad: function(option) {
		this.id = option.id;
	},
	onShow:function(){
		this.urlRequest({
			method:"post",
			url:`/operation-agency-service/warehouse/getDetailList?access_token=${this.app.access_token}`,
			data:{
				params: {id: this.id}
			},
			callBack:res=>{
				this.info=res.data.result[0]
			}
		});
		this.urlRequest({
			method:"post",
			url:`/operation-agency-service/warehouse/inOutHistroyList?access_token=${this.app.access_token}`,
			data:{
				params: {id: this.id}
			},
			callBack:res=>{
				this.inOutStork=res.data.result
				console.log(res.data.result)
			}
		})
	},
	computed:{
		...mapState(['app'])
	},
	methods:{
		...mapMutations(['urlRequest'])
	}
};
</script>

<style lang="less">
.mian {
	.contant {
		margin: 28upx;
		border-top: 1upx solid #e5e5e5;
		padding: 22upx;
		background: #fff;
		border-radius: 16upx;

		.cont-title {
			font-size: 30upx;
			font-weight: 500;
			color: rgba(34, 34, 34, 1);
			line-height: 26upx;
			border-bottom: 1upx solid rgba(229, 229, 229, 1);
			padding-bottom: 20upx;
			margin-bottom: 20upx;
		}

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
			width: 88%;
		}
	}
	.record-title {
		font-size: 30upx;
		font-weight: 500;
		color: rgba(34, 34, 34, 1);
		line-height: 26upx;
		margin-left: 48upx;
	}
	.record-box {
		margin: 28upx;
		padding: 22upx;
		background: #fff;
		border-radius: 16upx;
		.record-nav1,
		.record-nav2 {
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
			}
		}
		.record-nav1 {
			padding-bottom: 30upx;
			border-bottom: 1upx solid #e5e5e5;
		}
		.record-nav2 {
			padding-top: 28upx;
		}
	}
}
</style>
