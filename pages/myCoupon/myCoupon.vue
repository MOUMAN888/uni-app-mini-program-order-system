
<template>
	<view class="coupon-page">
		<view class="coupon-header">
			<view class="coupon-header__title">{{ headerTitle }}</view>
			<view class="coupon-header__subtitle">{{ headerSubtitle }}</view>
		</view>
		<u-gap height="20"></u-gap>
		<view v-if="couponList.length">
			<view class="coupon-card" v-for="item in couponList" :key="item.id" :class="{'coupon-card--used': item.status === 1}">
				<view v-if="item.status === 1" class="coupon-card__ribbon">已使用</view>
				<view class="coupon-card__left">
					<text class="coupon-card__currency">￥</text>
					<text class="coupon-card__amount">{{ item.discountAmount }}</text>
				</view>
				<view class="coupon-card__right">
					<view class="coupon-card__name">{{ item.couponName }}</view>
					<view class="coupon-card__info" v-if="item.getTime">领取时间：{{ item.getTime }}</view>
					<view class="coupon-card__info">消费金额：{{ formatMinOrderAmount(item.minOrderAmount) }}</view>
					<view class="coupon-card__info" v-if="item.status !== undefined">
						<text :class="{'coupon-card__status': true, 'coupon-card__status--used': item.status === 1}">
							{{ item.status === 1 ? '已使用' : '未使用' }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<u-empty v-else text="暂无可用优惠券" mode="coupon"></u-empty>
	</view>
</template>

<script>
	import { BASE_URL } from '@/common/config.js'
	import { couponApi, userApi } from '@/common/api.js'

	export default {
		data() {
			return {
				couponList: [],
				userInfo: null,
				isLoading: false,
				totalCount: 0
			}
		},
		computed: {
			headerTitle() {
				return '我的优惠券'
			},
			headerSubtitle() {
				return this.totalCount > 0 ? `共${this.totalCount}张优惠券` : '查看已领取的优惠券'
			}
		},
		onLoad() {
			// 先从本地存储获取用户信息
			const storedUserInfo = uni.getStorageSync('userInfo')
			if (storedUserInfo) {
				this.userInfo = storedUserInfo
			}
			this.fetchUserInfoFallback()
			this.fetchCouponList()
		},
		methods: {
			fetchUserInfoFallback() {
				if (this.userInfo && Object.keys(this.userInfo).length) {
					return
				}
				// 从 localStorage 获取用户 ID
				const storedUserInfo = uni.getStorageSync('userInfo')
				const userId = storedUserInfo?.id || uni.getStorageSync('token')
				
				if (!userId) {
					uni.showToast({
						title: '未登录，请先登录',
						icon: 'none'
					})
					return
				}
				
				userApi.getUserInfo(userId).then(res => {
					if (res && res.code === 200 && res.data) {
						this.userInfo = res.data
						// 更新本地存储
						uni.setStorageSync('userInfo', res.data)
					}
				}).catch(error => {
					console.error('获取用户信息失败', error)
				})
			},
			fetchCouponList() {
				const userId = this.getUserId()
				if (!userId) {
					uni.showToast({
						title: '未登录，无法获取优惠券',
						icon: 'none'
					})
					return
				}
				
				this.isLoading = true
				couponApi.getUserCoupons(userId).then(res => {
					if (res && res.code === 200 && res.data) {
						const data = res.data
						// 数据结构：{ totalCount: 2, coupons: [...] }
						if (data.coupons && Array.isArray(data.coupons)) {
							this.couponList = data.coupons
							this.totalCount = data.totalCount || data.coupons.length
						} else if (Array.isArray(data)) {
							// 兼容直接返回数组的情况
							this.couponList = data
							this.totalCount = data.length
						} else {
							this.couponList = []
							this.totalCount = 0
						}
					} else {
						this.couponList = []
						this.totalCount = 0
					}
				}).catch(error => {
					this.couponList = []
					this.totalCount = 0
					console.error('获取优惠券列表失败', error)
				}).finally(() => {
					this.isLoading = false
				})
			},
			getUserId() {
				// 优先从当前 userInfo 获取
				if (this.userInfo) {
					return this.userInfo.id || this.userInfo.userId || this.userInfo.userID
				}
				// 从本地存储获取
				const storedUserInfo = uni.getStorageSync('userInfo')
				if (storedUserInfo) {
					return storedUserInfo.id || storedUserInfo.userId || storedUserInfo.userID
				}
				// 最后尝试从 token 获取（如果 token 就是 userId）
				const token = uni.getStorageSync('token')
				return token || null
			},
			formatMinOrderAmount(amount) {
				if (amount === null || amount === undefined || amount === '' || Number(amount) === 0) {
					return '无限制'
				}
				const value = Number(amount)
				return isNaN(value) ? '无限制' : `￥${value.toFixed(2)}`
			}
		}
	}
</script>

<style lang="scss">
	.coupon-page {
		min-height: 100vh;
		padding: 30rpx;
		background: #f7f7f7;
	}

	.coupon-header {
		padding: 30rpx;
		background: linear-gradient(135deg, #ee2f37, #ff7b55);
		border-radius: 20rpx;
		color: #fff;

		&__title {
			font-size: 36rpx;
			font-weight: bold;
		}

		&__subtitle {
			margin-top: 10rpx;
			font-size: 26rpx;
			opacity: 0.9;
		}
	}

	.coupon-card {
		display: flex;
		position: relative;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);

		&--used {
			background: #f3f4f6;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

			.coupon-card__left {
				background: #e6e7eb;
			}

			.coupon-card__currency,
			.coupon-card__amount {
				color: #9ca3af;
			}

			.coupon-card__name {
				color: #6b7280;
			}

			.coupon-card__info,
			.coupon-card__status {
				color: #9ca3af;
			}
		}

		&__ribbon {
			position: absolute;
			top: 20rpx;
			right: -60rpx;
			width: 220rpx;
			text-align: center;
			background: #d1d5db;
			color: #4b5563;
			font-weight: bold;
			padding: 12rpx 0;
			transform: rotate(45deg);
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
			letter-spacing: 4rpx;
		}

		&__left {
			width: 28%;
			background: #ffeeef;
			padding: 40rpx 30rpx;
			display: flex;
			align-items: flex-end;
			gap: 6rpx;
		}

		&__currency {
			font-size: 28rpx;
			color: #ee2f37;
		}

		&__amount {
			font-size: 60rpx;
			color: #ee2f37;
			font-weight: bold;
		}

		&__right {
			flex: 1;
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			gap: 10rpx;
		}

		&__name {
			font-size: 30rpx;
			font-weight: bold;
			color: #303133;
		}

		&__info {
			font-size: 24rpx;
			color: #909399;
		}

		&__status {
			font-size: 24rpx;
			color: #67c23a;
			font-weight: bold;

			&--used {
				color: #909399;
			}
		}
	}
</style>