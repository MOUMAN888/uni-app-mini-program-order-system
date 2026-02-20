<template>
	<view>
		<!-- 空状态 -->
		<view v-if="!orderList || orderList.length === 0" class="empty-order">
			<view class="empty-order__icon">
				<u-icon name="order" size="120" color="#d0d0d0"></u-icon>
			</view>
			<view class="empty-order__text">暂无订单</view>
			<view class="empty-order__desc">快去下单吧~</view>
			<view class="empty-order__btn">
				<u-button type="primary" :custom-style="{ background: '#EE2F37', borderRadius: '50rpx', height: '80rpx', fontSize: '28rpx' }"  @click="goToMenu">
					去点餐
				</u-button>
			</view>
		</view>
		
		<!-- list start -->
		<view v-else class="content" v-for="(item, index) in orderList" :key="index" @click="orderDetail(item)">
			<view class="content__header">
				<view class="content__header-main">
					<view class="flex">
						<view class="content__vip">
							{{ item.eatStatus }}
						</view>
						<view class="content__address">
							订单号：{{ item.orderNoShort }}
						</view>
					</view>
					<view class="content__order-info">
						<view class="content__meta-item">
							<!-- <text class="content__meta-label">订单号：</text>{{ item.orderNoShort || '--' }} -->
						</view>
						<view class="content__meta-item">
						</view>
					</view>
				</view>
				<view class="content__status-block">
					<view class="content__status">
						{{ item.status }}
					</view>
				</view>
			</view>
			<view v-for="(item1, index1) in getDisplayMenu(item, index)" :key="index1" class="menulist">
				<view>
					<image class="item-menu-image" :src="item1.icon" mode="aspectFill"></image>
				</view>
				<view class="item-menu-name">
					<text class="item-menu-name__name">{{ item1.name }}</text>
					<view class="item-menu-name__desc u-line-2">
						{{ item1.desc }}
					</view>
					<view class="item-menu-price">
						<view class="item-menu-price__color">
							<text class="u-font-20 item-menu-price__text">￥</text>
							{{ item1.price }}
						</view>
						<view class="item-menu-price__num">
							x{{ item1.num }}
						</view>
					</view>
				</view>
			</view>
			<!-- 展开/收起按钮 -->
			<view v-if="item.menu && item.menu.length > 2" class="expand-btn" @click.stop="toggleExpand(index)">
				<text class="expand-btn__text">{{ expandedOrders[index] ? '收起' : `展开更多(${item.menu.length - 2}件)` }}</text>
				<text class="expand-btn__icon">{{ expandedOrders[index] ? '▲' : '▼' }}</text>
			</view>
			<view class="total-price-box">
				<view class="total-price">{{ item.createTime || '--' }}</view>
				<view class="total-price">共计{{ item.num }}件商品，合计：￥{{ item.price }}</view>
			</view>
			<view class="action-btns">
				<view class="again-btn" @click.stop="oneMore(item)">
					<u-tag text="再来一单" mode="plain" shape="circle" type="info" />
				</view>
				<!-- 管理员可见的已完成按钮 -->
				<view v-if="isAdmin && item.status !== '已出餐' && item.statusValue !== 3" class="complete-btn" @click.stop="updateOrderStatus(item)">
					<u-tag text="已出餐" mode="plain" shape="circle" type="success" />
				</view>
			</view>
		</view>
		<!-- list end -->
	</view>
</template>

<script>
import { orderApi } from '@/common/api.js'

export default {
	data() {
		return {
			// orderlist
			orderList: [],
			// 记录每个订单的展开状态，key为订单索引
			expandedOrders: {},
			// 用户类型
			userType: null,
			// 当前用户ID
			currentUserId: null
		}
	},
	computed: {
		// 判断是否为管理员（type === 2 或 type === 3）
		isAdmin() {
			return Number(this.userType) === 2 || Number(this.userType) === 3
		}
	},
	onLoad() {
		// 从本地存储获取用户信息
		const storedUserInfo = uni.getStorageSync('userInfo')
		const userId = storedUserInfo?.id || uni.getStorageSync('token')
		
		// 获取用户类型
		this.userType = uni.getStorageSync('userType')
		// 如果本地存储没有，尝试从 userInfo 中获取
		if (!this.userType && storedUserInfo && storedUserInfo.type !== undefined) {
			this.userType = storedUserInfo.type
		}
		// 确保 userType 是数字类型
		if (this.userType !== null && this.userType !== undefined) {
			this.userType = Number(this.userType)
		}
		
		// 保存当前用户ID
		this.currentUserId = userId
		
		if (!userId) {
			uni.showToast({
				title: '未登录，请先登录',
				icon: 'none'
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}, 1500)
			return
		}
		
		this.loadOrderList()
	},
	methods: {
		/**
		 * 获取要显示的商品列表
		 * @param {Object} item 订单项
		 * @param {Number} index 订单索引
		 * @returns {Array} 要显示的商品列表
		 */
		getDisplayMenu(item, index) {
			if (!item.menu || item.menu.length <= 2) {
				// 商品数量小于等于2个，直接显示全部
				return item.menu || []
			}
			// 商品数量超过2个，根据展开状态决定显示数量
			if (this.expandedOrders[index]) {
				// 已展开，显示全部
				return item.menu
			} else {
				// 未展开，只显示前2个
				return item.menu.slice(0, 2)
			}
		},
		/**
		 * 切换订单的展开/折叠状态
		 * @param {Number} index 订单索引
		 */
		toggleExpand(index) {
			// 使用 $set 确保响应式更新
			this.$set(this.expandedOrders, index, !this.expandedOrders[index])
		},
		/**
		 * 将后端订单数据转换为前端所需的orderList格式
		 * @param {Array} backendOrders 后端返回的订单数组
		 * @returns {Array} 转换后的orderList数组
		 */
		transformOrderData(backendOrders) {
			console.log(backendOrders, "backendOrders")
			if (!backendOrders || !Array.isArray(backendOrders)) {
				return [];
			}
			// 直接遍历订单数组，每个订单对象转换为一个orderList项
			return backendOrders.map(order => {
				const menu = [];
				let totalNum = 0;

				// 遍历订单中的商品数组
				if (order.flowers && Array.isArray(order.flowers)) {
					order.flowers.forEach(flower => {
						const quantity = flower.quantity || 1;
						menu.push({
							id: flower.id, // 添加商品id，用于再来一单功能
							icon: flower.imgpath || '',
							name: flower.name || '',
							desc: flower.name || '', // 后端没有desc字段，使用name作为描述
							price: flower.price1 || flower.price || 0,
							num: quantity
						});

						// 累加商品数量
						totalNum += quantity;
					});
				}

				const orderNo = order.orderNo || '';
				const orderNoShort = orderNo ? orderNo.slice(-3) : (order.id ? String(order.id).slice(-3) : '--');
				const createTime = order.createTime || order.times || '';
				
				// 状态映射：将数字状态转换为文本
				const statusMap = {
					0: '未完成',
					1: '已支付',
					2: '配送中',
					3: '已出餐'
				};
				const statusValue = order.status;
				const statusText = typeof statusValue === 'number' 
					? (statusMap[statusValue] || '未知') 
					: (statusValue || '已出餐');

				return {
					id: order.orderNo || order.id,
					orderId: order.id,
					eatStatus: order.delivery === 0 ? '堂食' : '外卖',
					status: statusText,
					statusValue: typeof statusValue === 'number' ? statusValue : (statusValue === '已出餐' ? 3 : null), // 保存原始状态值用于判断
					createTime,
					orderNo,
					orderNoShort,
					menu: menu,
					num: totalNum,
					price: order.totalPrice || 0,
					phone: order.phone || '',
					note: order.note || ''
				};
			}).sort((a, b) => {
				// 按创建时间倒序排列（最新的在前），如果有id可以用id排序
				return new Date(b.createTime || 0) - new Date(a.createTime || 0);
			});
		},
		// orderdetail
		orderDetail(item) {
			uni.navigateTo({
				url: "/subPack/order/orderDetail?item=" + encodeURIComponent(JSON.stringify(item))
			})
		},
		// again
		oneMore(item) {
			// 将订单的menu数据保存到本地存储
			if (item && item.menu && item.menu.length > 0) {
				uni.setStorageSync('againOrderMenu', item.menu);
			}
			uni.switchTab({
				url: '/pages/menu/menu'
			})
		},
		// 跳转到菜单页
		goToMenu() {
			uni.switchTab({
				url: '/pages/menu/menu'
			})
		},
		// 加载订单列表
		async loadOrderList() {
			try {
				const res = await orderApi.getOrderList(this.currentUserId)
				if (res && res.data && res.data.orders) {
					console.log(res.data, "接口返回数据");
					this.orderList = this.transformOrderData(res.data.orders);
					console.log(this.orderList, "转换后的orderList");
				}
			} catch (error) {
				console.error('请求失败', error);
			}
		},
		// 更新订单状态为已完成
		updateOrderStatus(item) {
			// 检查权限
			if (!this.isAdmin) {
				uni.showToast({
					title: '无权限操作',
					icon: 'none'
				})
				return
			}
			
			// 确认操作
			uni.showModal({
				title: '确认操作',
				content: '确定要该订单已出餐吗？',
				success: (res) => {
					if (res.confirm) {
						this.updateOrderStatusRequest(item)
					}
				}
			})
		},
		// 更新订单状态请求
		async updateOrderStatusRequest(item) {
			try {
				const result = await orderApi.updateOrderStatus({
					currentUserId: this.currentUserId,
					orderId: item.orderId || item.id,
					status: 3 // 3: 完成
				})
				if (result && result.code === 200) {
					uni.showToast({
						title: '更新成功',
						icon: 'success'
					})
					// 刷新订单列表
					setTimeout(() => {
						this.loadOrderList()
					}, 1500)
				}
			} catch (error) {
				console.error('更新订单状态失败', error)
			}
		}
	}
}
</script>

<style lang="scss">
.flex {
	display: flex;
}

.content {
	margin: 30rpx;
	padding: 20rpx;
	box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20rpx;
	}

	&__header-main {
		flex: 1;
	}

	&__order-info {
		margin-top: 12rpx;
		display: flex;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: $u-type-info;
		line-height: 1.6;
	}

	&__meta-item {
		margin-right: 20rpx;
		display: flex;
		align-items: center;
	}

	&__meta-label {
		color: #303133;
		margin-right: 8rpx;
		font-weight: 500;
	}

	&__address {
		font-weight: bold;
		font-size: 28rpx;
	}

	&__status {
		font-size: 24rpx;
		color: #303133;
		font-weight: 500;
	}

	&__status-block {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		min-width: 120rpx;
	}

	&__vip {
		background-color: #EE2F37;
		color: white;
		padding: 5rpx 0;
		width: 77rpx;
		text-align: center;
		border-radius: 7rpx;
		font-size: 20rpx;
		margin-right: 10rpx;
	}
}

.menulist {
	display: flex;
	margin-top: 30rpx;
}

.item-menu-name {
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	width: 100%;

	&__name {
		font-size: 26rpx;
		font-weight: bold;
	}

	&__desc {
		margin: 10rpx 0;
		font-size: 22rpx;
		font-weight: bold;
		color: $u-type-info;
	}
}

.item-menu-image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 20rpx;
}

.item-menu-price {
	display: flex;
	justify-content: space-between;

	&__color {
		font-weight: bold;
		font-size: 24rpx;
		color: #EE2F37;
	}

	&__num {
		color: $u-type-info;
		font-size: 22rpx;
	}
}

.total-price-box {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.total-price {
		text-align: right;
		font-size: 22rpx;
		font-weight: bold;
		margin-top: 30rpx;
	}

}


.action-btns {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20rpx;
	margin-top: 30rpx;
}

.again-btn {
	display: flex;
}

.complete-btn {
	display: flex;
}

.expand-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20rpx;
	padding: 15rpx 0;
	color: #EE2F37;
	font-size: 24rpx;
	cursor: pointer;

	&__text {
		margin-right: 10rpx;
	}

	&__icon {
		font-size: 20rpx;
	}
}

.empty-order {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	padding: 100rpx 30rpx;

	&__icon {
		margin-bottom: 40rpx;
		opacity: 0.6;
	}

	&__text {
		font-size: 36rpx;
		font-weight: bold;
		color: #303133;
		margin-bottom: 20rpx;
	}

	&__desc {
		font-size: 28rpx;
		color: #909399;
		margin-bottom: 60rpx;
	}

	&__btn {
		width: 300rpx;
	}
}
</style>