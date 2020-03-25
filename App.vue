<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
export default {
	methods: {
		...mapMutations(['APP','TO'])
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});

		//检查更新

		//网络监听

		//初始化数据
		let userInfo = uni.getStorageSync('user') || '';
		if (userInfo) {
			//更新登陆状态
			this.APP();
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
/*每个页面公共css */
@import './common/uni.css';
/*自定义图标*/
@import './common/icon.css';
/*自定义css动画*/
@import './common/animate.css';
/*自定义字体库*/
@font-face {
	font-family: 'Scour';
	src: url(./static/SourceHanSansCN-Regular.otf);
}
</style>
