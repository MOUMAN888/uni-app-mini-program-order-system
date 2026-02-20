<template>
	<view class="coupon-page">
		<view class="coupon-header">
			<view class="coupon-header__title-bar">
				<view class="coupon-header__title-bar-left">
					<view class="coupon-header__title">{{ headerTitle }}</view>
					<view class="coupon-header__subtitle">{{ headerSubtitle }}</view>
				</view>
				<view class="coupon-header__title-bar-right"  v-if="isSuperAdmin">
					<u-button type="primary" size="mini" plain @click="openCreateCoupon">
						新增优惠券
					</u-button>
				</view>
			</view>
		
		</view>
		<u-gap height="20"></u-gap>
		<view v-if="couponList.length">
			<view class="coupon-card" v-for="item in couponList" :key="item.id">
				<view class="coupon-card__left">
					<text class="coupon-card__currency">￥</text>
					<text class="coupon-card__amount">{{ item.discountAmount }}</text>
				</view>
				<view class="coupon-card__right">
					<view class="coupon-card__header-row">
						<view class="coupon-card__name">{{ item.couponName }}</view>
						<view v-if="isSuperAdmin" class="coupon-card__admin-actions">
							<u-icon name="edit-pen" size="28" color="#ee2f37" @click="openEditCoupon(item)"></u-icon>
							<u-icon name="trash" size="28" color="#fa3534" @click="handleDeleteCoupon(item)"></u-icon>
						</view>
					</view>
					<view class="coupon-card__meta">
						<view class="coupon-card__meta-item">
							<text class="coupon-card__meta-label">等级</text>
							<text class="coupon-card__meta-value">{{ formatLevelText(item.needLevel) }}</text>
						</view>
						<view class="coupon-card__meta-item">
							<text class="coupon-card__meta-label">兑换积分</text>
							<text class="coupon-card__meta-value">{{ item.needPoints }}</text>
						</view>
				
						<view class="coupon-card__meta-item">
							<text class="coupon-card__meta-label">消费金额</text>
							<text class="coupon-card__meta-value">{{ formatMinOrderAmount(item.minOrderAmount) }}</text>
						</view>
					</view>
					<view class="coupon-card__actions">
						<u-button type="error" size="mini" :disabled="!canRedeem(item)" @click="redeemCoupon(item)">{{ redeemButtonText(item) }}</u-button>
					</view>
				</view>
			</view>
		</view>
		<u-empty v-else text="暂无可用优惠券" mode="coupon"></u-empty>

		<u-popup v-model="couponModalVisible" mode="center" border-radius="16" :mask-close-able="false">
			<view class="coupon-form">
				<view class="coupon-form__title">{{ isEditing ? '修改优惠券' : '新增优惠券' }}</view>
				<u-form :model="couponForm" label-position="top">
					<u-form-item label="优惠券名称">
						<u-input v-model="couponForm.couponName" placeholder="请输入优惠券名称"></u-input>
					</u-form-item>
					<u-form-item label="优惠金额（支持小数）">
						<u-input type="digit" v-model="couponForm.discountAmount" placeholder="请输入优惠金额"></u-input>
					</u-form-item>
					<u-form-item label="所需积分">
						<u-input type="number" v-model="couponForm.needPoints" placeholder="请输入所需积分"></u-input>
					</u-form-item>
					<u-form-item label="等级要求（为空表示无限制）">
						<u-input type="number" v-model="couponForm.needLevel" placeholder="如需限制请输入等级数字"></u-input>
					</u-form-item>
					<u-form-item label="最低订单金额（为空或0表示无限制）">
						<u-input type="digit" v-model="couponForm.minOrderAmount"
							placeholder="达到此金额才可使用，为空表示无限制"></u-input>
					</u-form-item>
				</u-form>
				<view class="coupon-form__actions">
					<u-button size="medium" plain @click="closeCouponModal" :disabled="submitLoading">取消</u-button>
					<u-button size="medium" type="primary" :loading="submitLoading" @click="submitCouponForm">
						{{ isEditing ? '保存修改' : '确认新增' }}
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { couponApi, userApi } from '@/common/api.js'

export default {
	data() {
		return {
			couponList: [],
			userInfo: null,
			view: 'center',
			isLoading: false,
			userType: uni.getStorageSync('userType') || null,
			couponModalVisible: false,
			isEditing: false,
			submitLoading: false,
			editingCouponId: null,
			couponForm: {
				couponName: '',
				couponNumber: '',
				discountAmount: '',
				needPoints: '',
				needLevel: '',
				minOrderAmount: ''
			}
		}
	},
	computed: {
		headerTitle() {
			return this.view === 'mine' ? '我的优惠券' : '优惠券中心'
		},
		headerSubtitle() {
			return this.view === 'mine' ? '查看已领取的券' : '积分兑换好礼'
		},
		isSuperAdmin() {
			// userType 是数字类型：1=普通用户, 2=普通管理员, 3=超级管理员
			const userType = Number(this.userType) || Number(this.userInfo?.type)
			return userType === 3
		}
	},
	onLoad(options) {
		this.view = (options && options.view) || 'center'
		this.bindUserInfo()
		this.fetchCouponList()
	},
	methods: {
		resetCouponForm() {
			this.couponForm = {
				couponName: '',
				couponNumber: '',
				discountAmount: '',
				needPoints: '',
				needLevel: '',
				minOrderAmount: ''
			}
		},
		bindUserInfo() {
			const eventChannel = this.getOpenerEventChannel && this.getOpenerEventChannel()
			if (eventChannel && eventChannel.on) {
				eventChannel.on('acceptUserInfo', (payload) => {
					const info = payload && (payload.userInfo || payload)
					if (info) {
						this.userInfo = info
						if (info.type !== undefined) {
							this.userType = info.type
							uni.setStorageSync('userType', info.type)
						}
					}
				})
			}
			this.fetchUserInfoFallback()
		},
		async fetchUserInfoFallback() {
			if (this.userInfo && Object.keys(this.userInfo).length) {
				return
			}
			// 从本地存储获取用户ID
			const storedUserInfo = uni.getStorageSync('userInfo')
			const userId = storedUserInfo?.id || uni.getStorageSync('token')
			
			if (!userId) {
				return
			}
			
			try {
				const res = await userApi.getUserInfo(userId)
				if (res && res.code === 200 && res.data) {
					this.userInfo = res.data
					if (res.data.type !== undefined) {
						this.userType = res.data.type
						uni.setStorageSync('userType', res.data.type)
					}
				}
			} catch (error) {
				console.error('获取用户信息失败', error)
			}
		},
		async fetchCouponList() {
			this.isLoading = true
			try {
				const res = await couponApi.getCouponList()
				if (res && res.code === 200 && res.data) {
					this.couponList = res.data
				}
			} catch (error) {
				console.error('获取优惠券列表失败', error)
			} finally {
				this.isLoading = false
			}
		},

		canRedeem(item) {
			if (!this.userInfo) {
				return false
			}
			const userLevel = Number(this.userInfo.levelId) || 0
			const userPoints = Number(this.userInfo.totalPoints) || 0
			const needLevel = Number(item.needLevel) || 0
			const needPoints = Number(item.needPoints) || 0
			return userPoints >= needPoints && userLevel >= needLevel
		},
		redeemButtonText(item) {
			if (!this.userInfo) {
				return '加载中...'
			}
			const userPoints = Number(this.userInfo.totalPoints) || 0
			const needPoints = Number(item.needPoints) || 0
			if (userPoints < needPoints) {
				return '积分不足'
			}
			const userLevel = Number(this.userInfo.levelId) || 0
			const needLevel = Number(item.needLevel) || 0
			if (userLevel < needLevel) {
				return '等级不足'
			}
			return '立即兑换'
		},
		async redeemCoupon(item) {
			if (!this.userInfo) {
				this.fetchUserInfoFallback()
				uni.showToast({
					title: '正在获取用户信息',
					icon: 'none'
				})
				return
			}
			if (!this.canRedeem(item)) {
				uni.showToast({
					title: '暂不符合兑换条件',
					icon: 'none'
				})
				return
			}
			const userId = this.getUserId()
			if (!userId) {
				uni.showToast({
					title: '缺少用户信息，无法兑换',
					icon: 'none'
				})
				return
			}
			try {
				const res = await couponApi.redeemCoupon({
					userId,
					couponId: item.id
				})
				console.log('兑换优惠券返回结果:', res)
				if (res && res.code === 200) {
					uni.showToast({
						title: '兑换成功',
						icon: 'success',
						duration: 2000
					})
					// 兑换成功后刷新用户信息和优惠券列表
					setTimeout(() => {
						this.fetchUserInfoFallback()
						this.fetchCouponList()
					}, 1500)
				} else {
					// 如果 code 不是 200，显示错误信息
					uni.showToast({
						title: res?.message || '兑换失败，请稍后重试',
						icon: 'none',
						duration: 2000
					})
				}
			} catch (error) {
				console.error('兑换优惠券失败', error)
				uni.showToast({
					title: error?.message || '兑换失败，请稍后重试',
					icon: 'none',
					duration: 2000
				})
			}
		},
		buildFormData(data) {
			return Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')
		},
		getUserId() {
			if (!this.userInfo) return null
			return this.userInfo.id || this.userInfo.userId || this.userInfo.userID || 7
		},
		formatLevelText(level) {
			if (level === null || level === undefined || level === '') {
				return '无限制'
			}
			const value = Number(level)
			return isNaN(value) ? '无限制' : `V${value}`
		},
		formatMinOrderAmount(amount) {
			if (amount === null || amount === undefined || amount === '' || Number(amount) === 0) {
				return '无限制'
			}
			const value = Number(amount)
			return isNaN(value) ? '无限制' : `￥${value.toFixed(2)}`
		},
		openCreateCoupon() {
			this.isEditing = false
			this.editingCouponId = null
			this.resetCouponForm()
			this.couponModalVisible = true
		},
		openEditCoupon(item) {
			this.isEditing = true
			this.editingCouponId = item.id
			this.couponForm = {
				couponName: item.couponName || '',
				discountAmount: item.discountAmount,
				needPoints: item.needPoints,
				needLevel: item.needLevel === null ? '' : item.needLevel,
				minOrderAmount: item.minOrderAmount === null || item.minOrderAmount === 0 ? '' : item.minOrderAmount
			}
			this.couponModalVisible = true
		},
		closeCouponModal() {
			if (this.submitLoading) return
			this.couponModalVisible = false
		},
		async handleDeleteCoupon(item) {
			if (!this.isSuperAdmin) return
			uni.showModal({
				title: '确认删除',
				content: `确定删除优惠券「${item.couponName}」吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await couponApi.deleteCoupon(item.id)
							if (result && result.code === 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								})
								this.fetchCouponList()
							}
						} catch (error) {
							console.error('删除优惠券失败', error)
						}
					}
				}
			})
		},
		validateCouponForm() {
			const { couponName, discountAmount, needPoints } = this.couponForm
			if (!couponName) {
				uni.showToast({ title: '请输入优惠券名称', icon: 'none' })
				return false
			}
			if (discountAmount === '' || discountAmount === null) {
				uni.showToast({ title: '请输入优惠金额', icon: 'none' })
				return false
			}
			if (needPoints === '' || needPoints === null) {
				uni.showToast({ title: '请输入所需积分', icon: 'none' })
				return false
			}
			return true
		},
		async submitCouponForm() {
			if (!this.isSuperAdmin) return
			if (!this.validateCouponForm()) {
				return
			}
			this.submitLoading = true
			
			// 构建基础 payload，包含必填字段
			const payload = {
				couponName: String(this.couponForm.couponName).trim(),
				discountAmount: Number(this.couponForm.discountAmount),
				needPoints: Number(this.couponForm.needPoints)
			}
			
			// 优惠券号码（可选）
			if (this.couponForm.couponNumber && String(this.couponForm.couponNumber).trim()) {
				payload.couponNumber = String(this.couponForm.couponNumber).trim()
			}
			
			// needLevel 处理：如果为空或0，不传该字段或传0（根据API要求）
			if (this.couponForm.needLevel !== '' && this.couponForm.needLevel !== null && this.couponForm.needLevel !== undefined) {
				const needLevelValue = Number(this.couponForm.needLevel)
				if (!isNaN(needLevelValue) && needLevelValue > 0) {
					payload.needLevel = needLevelValue
				}
			}
			
			// minOrderAmount 处理：如果为空或0，不传该字段（表示无限制）
			if (this.couponForm.minOrderAmount !== '' && 
				this.couponForm.minOrderAmount !== null && 
				this.couponForm.minOrderAmount !== undefined) {
				const minOrderAmountValue = Number(this.couponForm.minOrderAmount)
				if (!isNaN(minOrderAmountValue) && minOrderAmountValue > 0) {
					payload.minOrderAmount = minOrderAmountValue
				}
			}
			
			const isEdit = this.isEditing && this.editingCouponId

			try {
				console.log('提交优惠券数据:', payload, 'isEdit:', isEdit)
				const res = isEdit
					? await couponApi.updateCoupon(this.editingCouponId, payload)
					: await couponApi.createCoupon(payload)
				if (res && res.code === 200) {
					uni.showToast({
						title: isEdit ? '修改成功' : '新增成功',
						icon: 'success'
					})
					this.couponModalVisible = false
					this.resetCouponForm()
					this.fetchCouponList()
				} else {
					uni.showToast({
						title: res?.message || (isEdit ? '修改失败' : '新增失败'),
						icon: 'none'
					})
				}
			} catch (error) {
				console.error('提交优惠券失败', error)
				uni.showToast({
					title: error?.message || '操作失败，请重试',
					icon: 'none'
				})
			} finally {
				this.submitLoading = false
			}
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

	&__title-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title-bar-left {
		width: 150px;
		gap: 10rpx;
	}

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
	background: #fff;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.06);

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
		padding: 20rpx;
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

	&__actions {
		flex-wrap: wrap;
		text-align: right;
	}

	&__header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16rpx;
	}

	&__admin-actions {
		display: flex;
		gap: 16rpx;
	}

	&__meta {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12rpx;
		padding: 10rpx 0;
	}

	&__meta-item {
		display: flex;
		flex-direction: column;
		gap: 6rpx;
		padding: 16rpx 18rpx;
		background: #f9f9f9;
		border-radius: 12rpx;
		border: 1rpx solid #f1f1f1;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.03);
	}

	&__meta-label {
		font-size: 24rpx;
		color: #909399;
	}

	&__meta-value {
		font-size: 28rpx;
		color: #303133;
		font-weight: 600;
	}
}

.coupon-form {
	padding: 30rpx;
	width: 600rpx;

	&__title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20rpx;
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		gap: 20rpx;
		margin-top: 20rpx;
	}
}
</style>