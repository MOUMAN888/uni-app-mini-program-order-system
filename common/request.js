import { BASE_URL } from './config.js'

/**
 * 统一的请求封装
 * @param {Object} options 请求配置
 * @returns {Promise} 返回 Promise
 */
function request(options) {
	return new Promise((resolve, reject) => {
		// 获取 token
		const token = uni.getStorageSync('token')
		
		// 默认 header
		const defaultHeader = {
			'content-type': 'application/json'
		}
		
		// 合并配置（注意：options 中的 header 会覆盖 defaultHeader）
		const config = {
			url: `${BASE_URL}${options.url}`,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				...defaultHeader,
				...(options.header || {})
			},
			showLoading: options.showLoading,
			showError: options.showError,
			loadingText: options.loadingText,
			loadingMask: options.loadingMask
		}
		
		// 显示加载提示（如果配置了）
		if (options.showLoading !== false) {
			uni.showLoading({
				title: options.loadingText || '加载中...',
				mask: options.loadingMask !== false
			})
		}
		
		uni.request({
			...config,
			success: (res) => {
				// 隐藏加载提示
				if (options.showLoading !== false) {
					uni.hideLoading()
				}
				
				// 处理响应
				if (res.statusCode === 200) {
					// 如果返回的数据有 code 字段，判断是否成功
					if (res.data && typeof res.data === 'object') {
						if (res.data.code === 200) {
							resolve(res.data)
						} else {
							// 业务错误
							const errorMsg = res.data.message || '请求失败'
							if (options.showError !== false) {
								uni.showToast({
									title: errorMsg,
									icon: 'none'
								})
							}
							reject(new Error(errorMsg))
						}
					} else {
						// 直接返回数据
						resolve(res.data)
					}
				} else {
					// HTTP 错误
					const errorMsg = `请求失败: ${res.statusCode}`
					if (options.showError !== false) {
						uni.showToast({
							title: errorMsg,
							icon: 'none'
						})
					}
					reject(new Error(errorMsg))
				}
			},
			fail: (err) => {
				// 隐藏加载提示
				if (options.showLoading !== false) {
					uni.hideLoading()
				}
				
				// 网络错误
				const errorMsg = '网络请求失败，请检查网络连接'
				if (options.showError !== false) {
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					})
				}
				reject(err)
			}
		})
	})
}

/**
 * GET 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export function get(url, data = {}, options = {}) {
	return request({
		url,
		method: 'GET',
		data,
		...options
	})
}

/**
 * POST 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export function post(url, data = {}, options = {}) {
	return request({
		url,
		method: 'POST',
		data,
		...options
	})
}

/**
 * PUT 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export function put(url, data = {}, options = {}) {
	return request({
		url,
		method: 'PUT',
		data,
		...options
	})
}

/**
 * DELETE 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export function del(url, data = {}, options = {}) {
	return request({
		url,
		method: 'DELETE',
		data,
		...options
	})
}

export default {
	request,
	get,
	post,
	put,
	delete: del
}

