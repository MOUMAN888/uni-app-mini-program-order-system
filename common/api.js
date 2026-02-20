import { get, post, put, del } from './request.js'

/**
 * 用户相关 API
 */
export const userApi = {
	// 用户登录（手机号密码）
	login(data) {
		return post('/api/users/login', data)
	},

	// 用户登录（微信）
	loginByWechat(code) {
		return post('/api/users/login', { code })
	},

	// 用户注册
	register(data) {
		return post('/api/users/register', data)
	},

	// 获取用户信息
	getUserInfo(userId) {
		return get('/api/users/info', { userId })
	},

	// 更新用户信息
	updateProfile(data) {
		return put('/api/users/profile', data)
	},

	// 获取用户列表（管理员）
	getUserList(params) {
		return get('/api/users/list', params)
	}
}

/**
 * 管理员相关 API
 */
export const adminApi = {
	// 获取管理员列表
	getAdminList(params) {
		return get('/api/admin/list', params)
	},

	// 设置管理员
	setAdmin(data) {
		return post('/api/admin/setAdmin', data)
	},

	// 删除管理员
	removeAdmin(data) {
		return post('/api/admin/removeAdmin', data)
	}
}

/**
 * 菜单相关 API
 */
export const menuApi = {
	// 获取菜单列表
	getMenuList() {
		return get('/api/flowers/list')
	},
	//获取分类
	getCategoryList() {
		return get('/api/types/list')
	},
	// 添加分类
	addCategory(data) {
		return post('/api/types/add', data)
	},
	// 编辑分类
	updateCategory(data) {
		return put('/api/types/update', data)
	},
	// 删除分类
	deleteCategory(id) {
		return del(`/api/types/delete/${id}`)
	},
	// 添加商品
	addProduct(data) {
		return post('/api/flowers/add', data)
	},

	// 编辑商品
	updateProduct(data) {
		return put('/api/flowers/update', data)
	},

	// 删除商品（使用 POST 方法）
	deleteProduct(id) {
		return del(`/api/flowers/delete/${id}`)
	}
}

/**
 * 订单相关 API
 */
export const orderApi = {
	// 获取订单列表
	getOrderList(userId) {
		return get('/api/orders/list', { userId })
	},

	// 创建订单
	createOrder(data) {
		return post('/api/orders/createFromCart', data, {
			// header: {
			// 	'Content-Type': 'application/json'
			// }
		})
	},

	// 更新订单状态
	updateOrderStatus(data) {
		return post('/api/orders/updateStatus', data)
	}
}

/**
 * 优惠券相关 API
 */
export const couponApi = {
	// 获取优惠券列表
	getCouponList() {
		return get('/api/coupons/list')
	},

	// 获取用户优惠券
	getUserCoupons(userId) {
		return get(`/api/coupons/user/${userId}`)
	},

	// 兑换优惠券
	redeemCoupon(data) {
		return post('/api/coupons/redeem', data, {
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		})
	},

	// 创建优惠券（管理员）
	createCoupon(data) {
		return post('/api/coupons', data)
	},

	// 更新优惠券（管理员）
	updateCoupon(id, data) {
		return put(`/api/coupons/${id}`, data)
	},

	// 删除优惠券（管理员）
	deleteCoupon(id) {
		return del(`/api/coupons/${id}`)
	}
}

/**
 * 反馈相关 API
 */
export const feedbackApi = {
	// 提交反馈
	submitFeedback(data) {
		return post('/feedback/add', data)
	},

	// 获取全部反馈（管理员）
	getAllFeedback() {
		return get('/feedback/all')
	}
}

/**
 * 公告相关 API
 */
export const noticeApi = {
	// 获取全部公告
	getNoticeList() {
		return get('/api/notices/list')
	},

	// 添加公告
	addNotice(data) {
		return post('/api/notices/add', data)
	},

	// 修改公告
	updateNotice(data) {
		return put('/api/notices/update', data)
	}
}

export default {
	userApi,
	adminApi,
	menuApi,
	orderApi,
	couponApi,
	feedbackApi,
	noticeApi
}

