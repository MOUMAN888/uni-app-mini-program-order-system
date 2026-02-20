<template>
	<view>
		<!-- header start -->
		<view>
			<u-swiper :list="bannerList" mode="rect" height="700" border-radius="0"></u-swiper>
		</view>
		<!-- header end -->

		<!-- body start -->
		<view class="body">
			<u-grid :col="2" :border="false">
				<u-grid-item @click="orderFood(0)">
					<u-image src="/static/index/service.jpg" width="150" height="150"></u-image>
					<view class="body__text">门店堂食</view>
				</u-grid-item>
				<u-grid-item @click="orderFood(1)">
					<u-image src="/static/index/takeaway.jpg" width="150" height="150"></u-image>
					<view class="body__text">外卖派送</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- body end -->

		<!-- slot start -->
		<u-gap height="20" bg-color="#fafafa"></u-gap>
		<!-- slot end -->

		<!-- integral start -->
		<view class="integral">
			<view>
				<u-image src="/static/index/integral.jpg" width="200" height="200"></u-image>
			</view>
			<view>
				<view class="integral__nav">我的积分：<text>{{ userInfo.totalPoints || 0 }}</text></view>
				<view class="integral__desc">可兑换现金优惠券 ></view>
			</view>
		</view>
		<!-- integral end -->
		
		<!-- slot start -->
		<u-gap height="20" bg-color="#fafafa"></u-gap>
		<!-- slot end -->

		<!-- head start -->
		<view>
			<u-grid :col="3" :border="false">
				<u-grid-item @click="goCouponPage">
					<view class="grid-text">积分兑换</view>
					<view class="grid-desc">好多神秘好礼等你</view>
					<u-image src="/static/index/integralShop.png" width="120" height="120"></u-image>
				</u-grid-item>
				<u-grid-item @click="goMyCouponPage">
					<view class="grid-text">我的优惠券</view>
					<view class="grid-desc">查看和使用已领取的券</view>
					<u-image src="/static/index/vipCenter.png" width="120" height="120"></u-image>
				</u-grid-item>
				<u-grid-item @click="goFeedbackPage">
					<view class="grid-text">意见反馈</view>
					<view class="grid-desc">有问题欢迎随时反馈</view>
					<u-image src="/static/index/activityCenter.png" width="120" height="120"></u-image>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- head end -->
		
		<!-- 公告弹窗 -->
		<u-modal 
			v-model="showNoticeModal" 
			title="公告" 
			:show-cancel-button="false"
			:show-confirm-button="true"
			confirm-text="知道了"
			@confirm="closeNoticeModal"
			width="600rpx"
		>
			<view class="notice-content">
				{{ noticeData.content || '' }}
			</view>
		</u-modal>
	</view>
</template>

<script>
	import { userApi, noticeApi } from '@/common/api.js'

	export default {
		data() {
			return {
				// bannerlist
				bannerList: [
					'/static/index/banner.jpg'
				],
				hasCheckedLogin: false, // 标记是否已检查过登录状态
				userInfo: {}, // 用户信息
				showNoticeModal: false, // 是否显示公告弹窗
				noticeData: {} // 公告数据
			}
		},
		onLoad() {
			this.checkLogin()
			this.loadUserInfo()
			this.checkAndShowNotice()
		},
		onShow() {
			// 每次显示页面时检查登录状态（避免 token 被清除的情况）
			const token = uni.getStorageSync('token')
			if (!token && this.hasCheckedLogin) {
				// 如果之前检查过但现在没有 token，说明可能被清除了，需要重新登录
				uni.reLaunch({
					url: '/pages/login/login'
				})
			} else {
				// 刷新用户信息
				this.loadUserInfo()
			}
		},
		methods: {
			// 检查登录状态
			checkLogin() {
				const token = uni.getStorageSync('token')
				if (!token) {
					// 未登录，跳转到登录页
					uni.reLaunch({
						url: '/pages/login/login'
					})
				} else {
					this.hasCheckedLogin = true
				}
			},
			// 加载用户信息
			loadUserInfo() {
				// 先从本地存储获取
				const storedUserInfo = uni.getStorageSync('userInfo')
				if (storedUserInfo) {
					this.userInfo = storedUserInfo
				}
				
				// 从服务器获取最新信息
				const userId = storedUserInfo?.id || uni.getStorageSync('token')
				if (userId) {
					userApi.getUserInfo(userId).then(res => {
						if (res && res.data) {
							this.userInfo = res.data
							// 更新本地存储
							uni.setStorageSync('userInfo', res.data)
						}
					}).catch(() => {
						// 请求失败时使用本地存储的数据
						if (storedUserInfo) {
							this.userInfo = storedUserInfo
						}
					})
				}
			},
			// spotmeal
			orderFood(param) {
				// 如果是外卖派送（param === 1），显示提示弹窗
				if (param === 1) {
					// 使用 setTimeout 延迟显示，确保弹窗不被遮挡
					setTimeout(() => {
						uni.showModal({
							title: '提示',
							content: '外卖暂时未开放',
							showCancel: false,
							confirmText: '知道了'
						})
					}, 100)
					return
				}
				uni.setStorageSync('subCurrent', param);
				uni.switchTab({
					url: '/pages/menu/menu'
				})
			},
			goCouponPage() {
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				})
			},
			goMyCouponPage() {
				uni.navigateTo({
					url: '/pages/myCoupon/myCoupon?view=mine'
				})
			},
			goFeedbackPage() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},
			// 显示暂未开放弹窗
			showNotOpenModal(moduleName) {
				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: `${moduleName}暂未开放`,
						showCancel: false,
						confirmText: '知道了'
					})
				}, 100)
			},
			// 检查并显示公告
			checkAndShowNotice() {
				// 检查是否已经显示过公告
				const hasShownNotice = uni.getStorageSync('hasShownNotice')
				if (hasShownNotice) {
					return // 已经显示过，不再显示
				}
				
				// 获取公告列表
				noticeApi.getNoticeList().then(res => {
					if (res && res.data && res.data.length > 0) {
						// 显示第一条公告
						this.noticeData = res.data[0]
						this.showNoticeModal = true
					}
				}).catch(err => {
					console.error('获取公告失败:', err)
				})
			},
			// 关闭公告弹窗
			closeNoticeModal() {
				this.showNoticeModal = false
				// 标记已显示过公告
				uni.setStorageSync('hasShownNotice', true)
			}
		}
	}
</script>

<style lang="scss">
	.body {
		position: relative;
		z-index: 1;
		margin: -40rpx 30rpx 0 30rpx;
		padding: 0 15rpx;
		background-color: white;
		border-radius: 14rpx;

		&__text {
			font-weight: bold;
			font-size: 30rpx;
			margin-top: 15rpx;
		}
	}

	.integral {
		display: flex;
		align-items: flex-end;
		padding: 20rpx;

		&__nav {
			color: $u-main-color;
			font-weight: bold;
			margin-bottom: 20rpx;
			font-size: 30rpx;

			text {
				font-size: 38rpx;
			}
		}

		&__desc {
			font-size: 24rpx;
			color: $u-type-info;
			margin-bottom: 10rpx;
		}
	}
	
	.grid-text{
		font-size: 38rpx;
		font-weight: bold;
	}
	
	.grid-desc{
		font-size: 24rpx;
		color: $u-type-info;
		margin-bottom: 30rpx;
	}
	
	.notice-content {
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		line-height: 1.6;
		color: #333;
		white-space: pre-wrap;
		word-break: break-all;
	}
</style>