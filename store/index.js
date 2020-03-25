import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export let url = "";
export default new Vuex.Store({
	state: {
		app: {}, //用户所有信息
		white: [], //其他网址，用于内部页面
		stork: [{
					name: '暂无可选择仓库',
					id: '0'
				}],
		value1: '0',
		inter: { //api地址
			server: "http://118.114.245.102:7500",
			api: "123"
		}
	},
	//处理同步数据修改
	mutations: {
		APP(state) {
			//每次app启动获取初始化用户信息
			uni.getStorage({
				key: 'user',
				success(res) {
					state.app = res.data;
				},
				fail() {
					state.app = '';
					uni.reLaunch({
						url: './login'
					});
				}
			})
		},
		setStork(s, p) {
			uni.setStorage({
				key: 'stork',
				data: p,
				success: (res) => {
					s.stork = p
					// console.log(p);
				}
			})
		},
		setVal(s, p) {
			s.stork = p
		},
		SET(state, provider) {
			//通过登录界面缓存更新用户信息
			uni.setStorage({
				key: 'user',
				data: provider,
				success: (res) => {
					state.app = provider
				}
			})
		},
		//统一跳转接口,拦截未登录路由
		TO(s, url) {
			if (url.match(RegExp(/http/))) {
				uni.navigateTo({
					url: "/pages/common/webview?url=" + url
				})
			} else {
				for (let i in s.white) {
					if (s.app.User.userInfo.id == '' && !url.indexOf(s.white[i])) {
						return false;
					}
				}
				uni.navigateTo({
					url
				})
			}
		},
		BACK(s, delta) {
			uni.navigateBack({
				delta: delta ? delta : 1,
				animationType: 'pop-out',
				animationDuration: 200
			})
		},
		login(s, provider) {
			this.commit("SET", provider)
		},
		logout(s) {
			uni.removeStorage({
				key: 'user',
				success: function(res) {
					console.log('success');
					s.app = {}
					uni.reLaunch({
						url: '../pages/user/login'
					});
				}
			});
		},
		urlRequest(s, d) {
			uni.showNavigationBarLoading();
			uni.request({
				url: '/dpc' + d.url,
				method: d.method,
				header: {
					'content-type': 'application/json',
					'Authorization': s.app.access_token || ""
				},
				data: d.data || {},
				dataType: 'json',
				success: (res) => {
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					if (res.statusCode === 401) {
						uni.showModal({
							title: '用户权限',
							content: '用户信息已过期请重新登录',
							confirmText: '确定',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.reLaunch({
										url: d.out || '../user/login'
									});
								}
							}
						})
					}
					if (res.statusCode === 500) {
						uni.showToast({
							title: d.title || '连接超时，请刷新！',
							icon: 'none',
							duration: 1500,
							success: _ => {
								uni.removeStorage({
									key: 'user',
									success: function(res) {
										console.log('success');
									}
								});
							}
						});
					} else {
						d.callBack(res)
					}

				},

			});
		},
		loading() {
			uni.showLoading({
				title: '加载中...',
				mask: true,

			});
		}
	},
	//异步
	actions: {}
})
