<template>
	<view>
		<!-- header start-->
		<view class="header">
			<view class="header__bg"></view>
			<view class="header__con">
				<view>
					<view class="header__name">{{ userInfo.name || '暂无昵称' }}</view>
					<view class="header__line">
						<u-line-progress active-color="#EE2F37" :percent="progressPercent"></u-line-progress>
					</view>
					<view class="header__level">
						<u-tag :text="levelNumberText"
							mode="plain" border-color="#EE2F37" color="#EE2F37" size="mini"
							shape="circle" />
						<text class="header__levelname">{{ currentLevel ? currentLevel.levelName : '未入级' }}</text>
					</view>
					<text class="header__linevipdesc">{{ levelHintText }}</text>
					<view class="header__stats">
						<view class="header__stats-item">
							<text class="header__stats-value">{{ userInfo.totalPoints || 0 }}</text>
							<text class="header__stats-label">当前积分</text>
						</view>
						<view class="header__stats-divider"></view>
						<view class="header__stats-item">
							<text class="header__stats-value">{{ userInfo.totalEarnedPoints || 0 }}</text>
							<text class="header__stats-label">累计积分</text>
						</view>
					</view>
				</view>
				<view class="header__avatar">
			<u-avatar :src="userInfo.avatar || defaultAvatar" size="180" show-level level-bg-color="#fa3534"></u-avatar>
				</view>
			</view>
		</view>
		<!-- header end -->

		<!-- content start-->
		<!-- <view class="content">我的服务</view> -->

		<view class="u-m-l-30 u-m-r-30">
			<u-cell-group>
				<u-cell-item icon="order" title="我的订单" @click="goOrderPage"></u-cell-item>
				<u-cell-item icon="coupon" title="我的优惠劵" @click="goMyCouponPage"></u-cell-item>
				<u-cell-item icon="gift" title="积分兑换" @click="goCouponPage"></u-cell-item>
				<u-cell-item icon="account" title="个人信息" @click="goProfilePage"></u-cell-item>
				<u-cell-item icon="edit-pen" title="意见反馈" @click="goFeedbackPage"></u-cell-item>
				<u-cell-item v-if="userType === 3" icon="setting" :title="settingTitle" @click="goAdminPage"></u-cell-item>
				<u-cell-item v-if="userType === 3" icon="file-text" title="管理公告" @click="goNoticeManagePage"></u-cell-item>
				<u-cell-item icon="close-circle" title="退出登录" @click="handleLogout"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- cell end -->
	</view>
</template>

<script>
	import { userApi } from '@/common/api.js'

	export default {
		data() {
			return {
				userInfo: {},
				levelList: [],
				currentLevel: null,
				nextLevel: null,
				progressPercent: 0,
				levelHintText: '正在获取等级信息...',
				userType: null,
				defaultAvatar: '/static/my/avatarurl.jpg'
			}
		},
		onLoad() {
			// 从本地存储获取用户信息
			const storedUserInfo = uni.getStorageSync('userInfo')
			if (storedUserInfo) {
				this.userInfo = storedUserInfo
			}
			// 从本地存储获取用户类型
			this.userType = uni.getStorageSync('userType')
			// 如果本地存储没有，尝试从 userInfo 中获取
			if (!this.userType && storedUserInfo && storedUserInfo.type !== undefined) {
				this.userType = storedUserInfo.type
			}
			
			// 获取用户ID
			const userId = storedUserInfo?.id || uni.getStorageSync('token')
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
			userApi.getUserInfo(userId).then(res => {
				console.log(res.data, "res.data");
				if (res && res.data) {
					this.userInfo = res.data;
					// 缓存最新的用户信息（包含 avatar）
					uni.setStorageSync('userInfo', res.data)
					// 更新 userType
					if (this.userInfo.type !== undefined) {
						this.userType = this.userInfo.type
						uni.setStorageSync('userType', this.userInfo.type)
					}
					this.updateLevelProgress();
				}
			}).catch(error => {
				console.error('获取用户信息失败', error)
			})
			
			// 获取用户等级列表（这个接口需要添加到 API 中，暂时保留原样或使用通用请求）
			// 由于这个接口不在 API 中，暂时保留原样
			uni.request({
				url: 'http://localhost:8080/api/user-levels',
				method: 'GET',
				success: (res) => {
					console.log(res.data.data, "res.data.data");
					if (res.data && res.data.data) {
						this.levelList = res.data.data;
						this.updateLevelProgress();
					}
				}
			})
		},
		computed: {
			levelNumberText() {
				const levelId = this.userInfo.levelId || (this.currentLevel && this.currentLevel.id) || 0;
				return `V${levelId}`;
			},
			settingTitle() {
				// 如果 userType 为 3，显示"设置管理员"，否则显示"设置"
				return this.userType === 3 ? '设置管理员' : '设置'
			}
		},
		methods: {
			goOrderPage() {
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			goMyCouponPage() {
				uni.navigateTo({
					url: '/pages/myCoupon/myCoupon?view=mine'
				})
			},
			goCouponPage() {
				uni.navigateTo({
					url: '/pages/coupon/coupon'
				})
			},
			// 跳转到个人信息页
			goProfilePage() {
				uni.navigateTo({
					url: '/pages/profile/profile'
				})
			},
			// 跳转到意见反馈页
			goFeedbackPage() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},
			goAdminPage() {
				uni.navigateTo({
					url: '/pages/administrator/administrator'
				})
			},
			// 跳转到公告管理页
			goNoticeManagePage() {
				uni.navigateTo({
					url: '/pages/noticeManage/noticeManage'
				})
			},
			// 退出登录
			handleLogout() {
				uni.showModal({
					title: '确认退出',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 清理所有本地存储
							this.clearAllStorage()
							// 跳转到登录页
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
			// 清理所有本地存储
			clearAllStorage() {
				// 获取所有存储的key
				const storageKeys = [
					'token',
					'userInfo',
					'userType',
					'subCurrent',
					'dishData',
					'againOrderMenu'
				]
				
				// 清理所有已知的存储
				storageKeys.forEach(key => {
					uni.removeStorageSync(key)
				})
				
				// 尝试清理所有存储（如果支持）
				try {
					uni.clearStorageSync()
				} catch (e) {
					console.log('清理存储失败', e)
				}
				
				uni.showToast({
					title: '已退出登录',
					icon: 'success'
				})
			},
			updateLevelProgress() {
				if (!this.userInfo.levelId || !this.levelList.length) {
					return;
				}
				const currentLevel = this.levelList.find(item => item.id === this.userInfo.levelId) || this.levelList[0];
				const currentIndex = this.levelList.findIndex(item => item.id === currentLevel.id);
				const nextLevel = this.levelList[currentIndex + 1] || null;
				const totalEarnedPoints = Number(this.userInfo.totalEarnedPoints) || 0;
				const currentMin = currentLevel ? currentLevel.minEarnedPoints : 0;
				let progressPercent = 100;
				let levelHintText = '已达最高等级';

				if (nextLevel) {
					const gap = nextLevel.minEarnedPoints - currentMin;
					const progressed = Math.min(Math.max(totalEarnedPoints - currentMin, 0), gap);
					progressPercent = gap > 0 ? Number(((progressed / gap) * 100).toFixed(2)) : 0;
					const needPoints = Math.max(nextLevel.minEarnedPoints - totalEarnedPoints, 0);
					console.log(nextLevel.minEarnedPoints , "nextLevel.minEarnedPoints");
					levelHintText = needPoints > 0 ? `距${nextLevel.levelName}还差${needPoints}积分` : `已解锁${nextLevel.levelName}`;
				}

				this.currentLevel = currentLevel;
				this.nextLevel = nextLevel;
				this.progressPercent = progressPercent;
				this.levelHintText = levelHintText;
			}
		}
	}
</script>

<style lang="scss">
	.header {
		&__bg {
			height: 368rpx;
			background-color: #EE2F37;
		}

		&__con {
			display: flex;
			justify-content: space-between;
			background-color: white;
			width: 90%;
			margin: -150rpx auto 0 auto;
			border-radius: 14rpx;
			padding: 20rpx 30rpx 30rpx 30rpx;
			box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);
		}

		&__avatar {
			margin-top: -50rpx;
		}

		&__name {
			font-weight: bold;
			font-size: 34rpx;
		}

		&__line {
			margin: 15rpx 0 10rpx 0;
		}

		&__linevipdesc {
			font-size: 24rpx;
			color: $u-type-info;
			margin-left: 20rpx;
		}

		&__level {
			display: flex;
			align-items: center;
			gap: 12rpx;
		}

		&__levelname {
			font-size: 26rpx;
			font-weight: bold;
			color: #333;
		}

		&__stats {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			padding: 15rpx 20rpx;
			background: #fdf3f3;
			border-radius: 12rpx;
		}

		&__stats-item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		&__stats-value {
			font-size: 34rpx;
			font-weight: bold;
			color: #222;
		}

		&__stats-label {
			font-size: 22rpx;
			color: $u-type-info;
			margin-top: 6rpx;
		}

		&__stats-divider {
			width: 2rpx;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.05);
			margin: 0 30rpx;
		}
	}

	// .content {
	// 	font-weight: bold;
	// 	font-size: 30rpx;
	// 	margin: 100rpx 30rpx 30rpx 30rpx;
	// }

	.grid-box {
		margin: 0 30rpx;
		box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);
		border-radius: 14rpx;

		&__text {
			margin-top: 20rpx;
			font-size: 24rpx;
			font-weight: bold;
		}
	}
</style>