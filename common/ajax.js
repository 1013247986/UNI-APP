const URL = "http://118.114.245.102:7500";
const server = function(obj) {
	return new Promise((resolve, reject) => {
		uni.request({
			url:obj.url,
			header: {
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			},
			data: obj.data,
			method: obj.method || "get",
			timeout: 3000,
			success(res) {
				if (res.code == 0) {
					resolve(res)
				} else {
                 reject(res)
				}

			}
		})
	})
}
export default {
	server
}
