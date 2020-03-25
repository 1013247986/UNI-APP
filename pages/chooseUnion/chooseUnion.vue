<template>
	<view class="main">
		<view v-for="item in app.user.alliances" class="union animated" :hover-stay-time="300" hover-class="pulse" @click="choose(item.allianceId)">
			{{item.allianceName}}
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
	data() {
		return {};
	},
	computed:{
		...mapState(['app']),
	},
	methods: {
		...mapMutations(['urlRequest']),
		choose(row) {
			console.log(row)
			this.urlRequest({
				method:"post",
				url:`/user-service/user/getUserInAllianceResouses?access_token=${this.app.access_token}`,
				data:{
					params: {allianceId:row }
				},
				callBack:res=>{
					console.log(res)
					uni.reLaunch({
						url: '../home/home'
					});
				}
			})
		}
	}
};
</script>

<style lang="less">
.main {
	.union {
		width: 80%;
		height: 200upx;
		background: #fff;
		border-radius: 10upx;
		margin: 10upx auto;
		line-height: 200upx;
		text-align: center;
		font-size: 30upx;
	}
}
</style>
