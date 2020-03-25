<template>
	<view class="main">
		<div class="h1"><span>欢迎登录</span></div>
		<view class="list">
			
			<view class="list-call">
				<image class="img" src="/static/login/my.png"></image>
				<input class="biaoti" placeholder-style="font-family: 'Scour';color:#A2E2FF" v-model="account" type="text" maxlength="11" placeholder="输入账号/手机号" />
			</view>
			
			<view class="list-call">
				<image class="img" src="/static/login/password.png"></image>
				<input class="biaoti" placeholder-style="font-family: 'Scour';color:#A2E2FF" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
			</view>
		</view>
		
		<view class="dlbutton animated" :hover-stay-time="300" hover-class="pulse" @click="loginBind">
			<text>登录</text>
		</view>

		<view class="footer">
			<image src="../../static/login/GLog.png"></image>
			<view class="text">
				<text>汽车零部件产业链</text>
				<text>技术创新服务平台</text>
			</view>
		</view>


	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			account: 'xys_admin',
			password: '123456'
		};
	},
	methods: {
		...mapMutations(['urlRequest','login']),
		loginBind() {
			if (this.account && this.password) {
				this.urlRequest({
					method: 'post',
					url: `/api-auth/oauth/token?username=${this.account}&password=${this.password}&code=2374&randomStr=Rr7pYGeW3&grant_type=password&client_id=client1&client_secret=111111&redirect_uri=http:%2F%2Fwww.baidu.com`,
					data: {},
					callBack: res => {
						this.login(res.data)
						// navigateTo
						uni.navigateTo({
							url: '../chooseUnion/chooseUnion'
						});
					}
				});
			}
		},

		TO() {}
	}
};
</script>

<style lang="less">
.main {
	height: 100vh;
	width: 100%;
	background-image: url(../../static/bgImg.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: relative;
	.h1 {
		font-family: 'Scour';
		text-align: center;
		color: #fff;
		font-size: 40upx;
		padding-top: 190upx;
		letter-spacing: 1px;
	}
	.input {
		width: 80%;
		margin: 0 auto;
		font-size: 30upx;
		border-bottom: 1rpx solid #a1e2ff;
		display: flex;
		margin-bottom: 40upx;
	}
	.footer {
		position: absolute;
		width: auto;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 50%;
		transform: translateX(-50%);
		bottom: 180upx;
		image {
			width: 90upx;
			height: 90upx;
			margin-right: 20upx;
		}
		.text {
			text {
				display: block;
				color: #fff;
			}
			text:first-child {
				font-family: 'Scour';
				font-size: 30upx;
				font-weight: bold;
				letter-spacing: 1px;
			}
			text:last-child {
				letter-spacing: 2px;
				color: #87cfff;
			}
		}
	}
}
.list {
	display: flex;
	flex-direction: column;
	padding-top: 50upx;
	padding-left: 70upx;
	padding-right: 70upx;
}
.list-call {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100upx;
	color: #fff;
	border-bottom: 1upx solid #a1e2ff;
	margin-bottom: 50upx;
}
.list-call .img {
	width: 40upx;
	height: 40upx;
}
.list-call .biaoti {
	flex: 1;
	text-align: left;
	font-size: 32upx;
	line-height: 100upx;
	margin-left: 30upx;
}
.dlbutton {
	color: #ffffff;
	font-size: 34upx;
	width: 670upx;
	height: 100upx;
	background: #64cfff;
	border-radius: 50upx;
	line-height: 100upx;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 50upx;
}
</style>
