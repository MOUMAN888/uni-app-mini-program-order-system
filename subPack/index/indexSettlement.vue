<template>
	<view class="wrap">
		<!-- top start -->
		<!-- @subCurrent if true 外卖 else 堂食-->
		<view v-if="subCurrent == 1">
			<!-- address start-->
			<view class="address" @click="goToProfile">
				<view>
					<view class="u-font-weight">{{ userAddress || '请点击设置配送地址' }}</view>
					<view class="u-font-24 u-type-info u-m-t-15">
						<text class="u-m-r-10">{{ userName || '用户' }}</text>
						<text>{{ userPhone || '' }}</text>
					</view>
				</view>
				<view>
					<u-icon name="arrow-right" color="#909399"></u-icon>
				</view>
			</view>

			<!-- slot -->
			<u-gap height="20" bg-color="#f3f4f6"></u-gap>
		</view>
		<!-- top end -->

		<!-- list start -->
		<view class="u-flex u-row-between u-m-t-30 u-m-b-30 u-m-l-30 u-m-r-30">
			<view class="u-font-24 u-font-weight u-content-color">
				{{ shopName }}
			</view>
			<view>
				<u-tag :text="subCurrent == 1 ? '外卖' : '堂食'" mode="dark" bg-color="#EE2F37" size="mini" />
			</view>
		</view>
		<view v-for="(item, index) in orderList" :key="index" class="u-flex list-box">
			<view>
				<image class="item-menu-image" :src="item.icon" mode="aspectFill"></image>
			</view>
			<view class="item-menu-name">
				<text class="u-font-26">{{ item.name }}</text>
				<view class="u-line-2 u-font-20 u-type-info u-m-t-10 u-m-b-10">
					{{ item.desc }}
				</view>
				<view class="u-flex u-row-between">
					<view class="u-font-weight u-font-24" style="color: #EE2F37;">
						<text class="u-font-20">￥</text>
						{{ item.price }}
					</view>
					<view class="u-type-info u-font-22">
						x{{ item.value }}
					</view>
				</view>
			</view>
		</view>
		<!-- list end -->

		<!-- cell start -->
		<view class="u-cell-box">
			<u-cell-group :border="false">
				<u-cell-item title="联系电话" :title-style="titleStyle" :border-bottom="false" :arrow="false"
					:clickable="false" v-if="subCurrent == 0">
						<u-input
							v-model="form.phone"
							placeholder="请输入手机号"
							type="number"
							maxlength="11"
							input-align="right"
							style="width: 100%; border: none;"
						/>
				</u-cell-item>
				<u-cell-item title="配送时间" :value="form.mealsTime ? form.mealsTime : '请选择'" :title-style="titleStyle"
					:value-style="valueStyle" hover-class="none" @click="TimerShow = true" :border-bottom="false"
					v-else></u-cell-item>
				<u-cell-item title="备注" :border-bottom="false" :title-style="titleStyle"
					:value="form.note ? (form.note.length > 10 ? form.note.slice(0, 10) + '...' : form.note) : '无'"
					:value-style="valueStyle" hover-class="none" @click="PopupModal(1)">
				</u-cell-item>
				<u-cell-item title="优惠券" :border-bottom="false" :title-style="titleStyle"
					:value="selectedCoupon ? `${selectedCoupon.couponName}（-￥${selectedCoupon.discountAmount}）` : '选择优惠券'"
					:value-style="valueStyle" hover-class="none" @click="couponSelectorShow = true">
				</u-cell-item>
			</u-cell-group>
		</view>
		<!-- cell end -->

		<!-- slot -->
		<u-gap height="100"></u-gap>

		<!-- button start -->
		<view class="u-bottom">
			<view class="u-bottom__wrap">
				<view class="u-font-weight u-font-40 u-m-l-20">
					<text class="u-font-24">￥</text>
					{{ finalPrice.toFixed(2) }}
					<text v-if="selectedCoupon" class="u-font-20" style="text-decoration: line-through; color: #909399; margin-left: 10rpx;">
						￥{{ orderPrice.toFixed(2) }}
					</text>
				</view>
				<view class="u-bottom__nums">共 {{ orderNum }} 件商品</view>
			</view>
			<view class="u-bottom__place" @click="confirmPay">
				确认支付
			</view>
		</view>
		<!-- button end -->

		<!-- popup start -->
		<u-popup v-model="PopupShow" mode="bottom" height="80%" border-radius="14" closeable :mask-close-able="false">
			<view v-if="!PopupPage">
				<view class="u-m-l-30 u-m-r-30 u-m-t-30">
					<view>
						<u-image src="/static/menu/index-dining.png" width="220" height="180"></u-image>
					</view>
					<view class="u-font-34 u-font-weight u-m-t-50 u-m-b-50">请选择用餐人数</view>
					<!-- content -->
					<u-grid :col="4" :border="false" hover-class="none">
						<u-grid-item v-for="item in 12" :key="item" :custom-style="customStyle"
							@click="SelectPeople(item)">
							<view class="u-font-weight">
								<!-- #ifdef MP-WEIXIN -->
								{{ item + 1 }}
								<!-- #endif -->
								<!-- #ifdef H5 -->
								{{ item }}
								<!-- #endif -->
							</view>
						</u-grid-item>
					</u-grid>
					<u-gap height="30"></u-gap>
				</view>
			</view>
			<!-- leave -->
			<view v-else>
				<view class="u-m-l-30 u-m-r-30 u-m-t-30">
					<view>
						<u-image src="/static/menu/index-leave.jpg" width="220" height="180"></u-image>
					</view>
					<view class="u-font-34 u-font-weight u-m-t-50 u-m-b-50">快捷标签</view>
					<!-- tags -->
					<u-grid :col="4" :border="false" hover-class="none">
						<u-grid-item v-for="item in tags" :key="item" :custom-style="customStyle"
							@click="SelectTags(item)">
							<view class="u-font-weight">{{ item }}</view>
						</u-grid-item>
					</u-grid>
					<view class="u-font-34 u-font-weight u-m-t-50 u-m-b-50">自定义留言</view>
					<u-input type="textarea" placeholder="请填写您的需求" placeholder-style="color: #909399"
						:custom-style="inputStyle" v-model="form.note"></u-input>
					<u-gap height="30"></u-gap>
				</view>
			</view>
		</u-popup>
		<!-- popup end -->

		<!-- timerSelect -->
		<u-picker v-model="TimerShow" mode="time" :params="TimerParams" @confirm="mealsPicker"></u-picker>

		<!-- 优惠券选择弹窗 -->
		<u-popup v-model="couponSelectorShow" mode="bottom" height="70%" border-radius="20" :mask-close-able="true">
			<view class="coupon-selector">
				<view class="coupon-selector__header">
					<view class="coupon-selector__title">选择优惠券</view>
					<view class="coupon-selector__close" @click="couponSelectorShow = false">
						<u-icon name="close" size="24"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y class="coupon-selector__list">
					<view class="coupon-selector__item coupon-selector__item--none" 
						:class="{'coupon-selector__item--selected': !selectedCoupon}"
						@click="selectCoupon(null)">
						<text>不使用优惠券</text>
					</view>
					<view 
						v-for="coupon in userCoupons" 
						:key="coupon.id"
						class="coupon-selector__item"
						:class="{
							'coupon-selector__item--disabled': !canUseCoupon(coupon),
							'coupon-selector__item--selected': selectedCoupon && selectedCoupon.id === coupon.id
						}"
						@click="selectCoupon(coupon)">
						<view class="coupon-selector__item-left">
							<text class="coupon-selector__item-amount">￥{{ coupon.discountAmount }}</text>
						</view>
						<view class="coupon-selector__item-right">
							<view class="coupon-selector__item-name">{{ coupon.couponName }}</view>
							<view class="coupon-selector__item-desc" v-if="coupon.minOrderAmount">
								满￥{{ coupon.minOrderAmount }}可用
							</view>
							<view class="coupon-selector__item-desc" v-else>
								无门槛
							</view>
							<view v-if="!canUseCoupon(coupon)" class="coupon-selector__item-tip">
								订单金额不足
							</view>
						</view>
						<view v-if="selectedCoupon && selectedCoupon.id === coupon.id" class="coupon-selector__item-check">
							<u-icon name="checkmark" color="#EE2F37" size="24"></u-icon>
						</view>
					</view>
					<view v-if="userCoupons.length === 0" class="coupon-selector__empty">
						暂无可用优惠券
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<!-- 模拟微信支付弹窗 -->
		<u-popup
			v-model="payPopupShow"
			mode="bottom"
			border-radius="24"
			:mask-close-able="false"
		>
			<view class="pay-popup">
				<!-- 支付加载遮罩层 -->
				<view v-if="payProcessing" class="pay-popup__loading">
					<view class="pay-popup__loading-content">
						<view class="pay-popup__spinner"></view>
						<text class="pay-popup__loading-text">支付中...</text>
					</view>
				</view>
				
				<view class="pay-popup__title">微信支付</view>
				<view class="pay-popup__amount">
					<text class="symbol">￥</text>
					<text class="value">{{ finalPrice.toFixed(2) }}</text>
					<text v-if="selectedCoupon" class="pay-popup__discount">
						已优惠￥{{ selectedCoupon.discountAmount.toFixed(2) }}
					</text>
				</view>
				<view class="pay-popup__desc">
					请输入支付密码完成本次支付
				</view>
				<view class="pay-popup__password">
					<u-input
						v-model="payPassword"
						type="password"
						maxlength="6"
						placeholder="请输入6位支付密码"
						:border="true"
						input-align="center"
						:disabled="payProcessing"
					></u-input>
				</view>
				<view v-if="payError" class="pay-popup__error">
					{{ payError }}
				</view>
				<view class="pay-popup__actions">
					<u-button
						plain
						type="default"
						size="medium"
						:disabled="payProcessing"
						@click="payPopupShow = false"
					>
						取消
					</u-button>
					<u-button
						type="primary"
						size="medium"
						:custom-style="{ background: '#07c160', borderColor: '#07c160' }"
						:loading="payProcessing"
						:disabled="payProcessing"
						@click="handlePayConfirm"
					>
						立即支付
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { SHOP_NAME } from '@/common/config.js'
import { couponApi, orderApi } from '@/common/api.js'

export default {
		data() {
			return {
				// 堂食or外卖
				subCurrent: 0,
				form: {
					mealsTime: '',
					mealsTimeFull: '', // 完整的配送时间（YYYY-MM-DD HH:mm:ss格式）
					people: 0,
					note: '',
					phone: '13750209771'
				},
				// orderlist
				orderList: [],
				// orderTotalPrice
				orderPrice: 0,
				// orderNum
				orderNum: 0,
				// 店铺名称，解耦写死文案
				shopName: SHOP_NAME,
				// 用户信息
				userAddress: '',
				userName: '',
				userPhone: '',
			// u-cell
			valueStyle: {
				fontSize: '26rpx'
			},
			titleStyle: {
				fontWeight: 'bold',
				color: '#333',
				fontSize: '26rpx'
			},
			// popup
			PopupShow: false,
			PopupPage: false,
			// timerSelect
			TimerShow: false,
			TimerParams: {
				year: false,
				month: false,
				day: true,
				hour: true,
				minute: true,
				second: false
			},
			// u-cell
			customStyle: {
				border: "20rpx solid #fff",
				borderRadius: "50rpx",
				padding: '40rpx 0',
				backgroundColor: '#f4f4f5'
			},
			// label
			tags: ['不放辣', '少放辣', '多放辣', '少盐', '不吃蒜', '不吃香菜', '不吃葱', '少油'],
			// input
			inputStyle: {
				backgroundColor: '#f3f4f6',
				borderRadius: "20rpx",
				padding: "30rpx"
			},
			// 模拟微信支付弹窗
			payPopupShow: false,
			payPassword: '',
			payError: '',
			payProcessing: false,
			// 优惠券相关
			userCoupons: [],
			selectedCoupon: null,
			couponSelectorShow: false
		}
	},
	computed: {
		// 最终支付金额（原价 - 优惠券金额）
		finalPrice() {
			const discount = this.selectedCoupon ? (this.selectedCoupon.discountAmount || 0) : 0;
			return Math.max(0, this.orderPrice - discount);
		}
	},
	onLoad(param) {
		// determine 外卖 or 堂食
		this.subCurrent = Number(param.subCurrent) || 0;
		// obtainStorageMenu
		const dishData = uni.getStorageSync('dishData');
		if (dishData && dishData.order) {
			this.orderList = dishData.order;
			this.orderNum = dishData.menuNum || 0;
			this.orderPrice = dishData.menuPrice || 0;
		} else {
			this.orderList = [];
			this.orderNum = 0;
			this.orderPrice = 0;
		}
		
		// 加载用户信息
		this.loadUserInfo();
		
		// 获取用户优惠券
		this.fetchUserCoupons();
		
		// 从本地存储获取已选优惠券（从菜单页传递过来的最佳优惠券）
		const savedCoupon = uni.getStorageSync('selectedCoupon');
		if (savedCoupon) {
			this.selectedCoupon = savedCoupon;
		}
	},
	onShow() {
		// 每次显示页面时重新加载用户信息（可能从个人信息页面返回）
		this.loadUserInfo();
	},
		methods: {
		// 加载用户信息
		loadUserInfo() {
			const userInfo = uni.getStorageSync('userInfo') || {};
			this.userAddress = userInfo.address || '';
			this.userName = userInfo.name || userInfo.realname || '';
			this.userPhone = userInfo.phone || '';
		},
		// 跳转到个人信息页面
		goToProfile() {
			// 保存当前页面状态，以便返回后继续
			uni.setStorageSync('needReturnToSettlement', true);
			uni.navigateTo({
				url: '/pages/profile/profile'
			});
		},
		// 获取用户优惠券
		fetchUserCoupons() {
			const userId = this.getUserId();
			if (!userId) return;
			
			couponApi.getUserCoupons(userId).then(res => {
				if (res && res.code === 200 && res.data) {
					const data = res.data;
					if (data.coupons && Array.isArray(data.coupons)) {
						this.userCoupons = data.coupons.filter(coupon => coupon.status === 0); // 只获取未使用的
					} else if (Array.isArray(data)) {
						this.userCoupons = data.filter(coupon => coupon.status === 0);
					}
				}
			}).catch(error => {
				console.error('获取用户优惠券失败', error)
			});
		},
		// 获取用户ID
		getUserId() {
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				return userInfo.id || userInfo.userId || userInfo.userID;
			}
			const token = uni.getStorageSync('token');
			return token || null;
		},
		// 判断优惠券是否可以使用
		canUseCoupon(coupon) {
			if (!coupon) return false;
			const minOrderAmount = coupon.minOrderAmount || 0;
			return this.orderPrice >= minOrderAmount;
		},
		// 选择优惠券
		selectCoupon(coupon) {
			if (coupon && !this.canUseCoupon(coupon)) {
				uni.showToast({
					title: '订单金额不足，无法使用此优惠券',
					icon: 'none'
				});
				return;
			}
			this.selectedCoupon = coupon;
			if (coupon) {
				uni.setStorageSync('selectedCoupon', coupon);
			} else {
				uni.removeStorageSync('selectedCoupon');
			}
			this.couponSelectorShow = false;
		},
		PopupModal(param) {
			if (param) {
				this.PopupPage = true;
			} else {
				this.PopupPage = false;
			}
			this.PopupShow = true;
		},
		// leave
		SelectTags(param) {
			if (this.form.note === '') {
				this.form.note = param;
				return;
			}
			this.form.note = this.form.note + '，' + param;
		},
		// NumberDiners
		SelectPeople(param) {
			// #ifdef H5
			this.form.people = param;
			// #endif
			// #ifdef MP-WEIXIN
			this.form.people = param + 1;
			// #endif
			this.PopupShow = false;
		},
		// PickMealsTimer
		mealsPicker(param) {
			// 显示格式：用于界面显示
			this.form.mealsTime = param.day + "日" + ' ' + param.hour + ":" + param.minute;
			
			// 获取当前日期，用于构建完整的日期时间
			const now = new Date();
			const year = now.getFullYear();
			const month = now.getMonth() + 1; // 月份从0开始，需要+1
			// 时间选择器返回的day可能是字符串或数字，需要转换为数字
			const day = parseInt(param.day) || now.getDate();
			const hour = parseInt(param.hour) || 0;
			const minute = parseInt(param.minute) || 0;
			
			// 格式化日期时间：YYYY-MM-DD HH:mm:ss
			const formatNumber = (n) => {
				const num = parseInt(n);
				return num < 10 ? '0' + num : num.toString();
			};
			
			this.form.mealsTimeFull = `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(minute)}:00`;
		},
		validatePhone() {
			const phone = (this.form.phone || '').trim();
			const phoneReg = /^1[3-9]\d{9}$/;
			if (!phone) {
				this.$u.toast('请输入联系电话');
				return false;
			}
			if (!phoneReg.test(phone)) {
				this.$u.toast('手机号格式不正确');
				return false;
			}
			return true;
		},
		// confirmPay 打开支付密码弹窗
		confirmPay() {
			// 堂食
			if (this.subCurrent == 0) {
				if (!this.validatePhone()) {
					return;
				}
			}
			// 外卖
			if (this.subCurrent == 1) {
				if (!this.form.mealsTime) {
					this.$u.toast('请选择配送时间')
					return;
				}
			}
			const cartItems = (this.orderList || [])
				.filter(item => item.value && item.value > 0)
				.map(item => ({
					flowerId: item.id,
					quantity: item.value
				}));

			if (!cartItems.length) {
				this.$u.toast('商品數量為 0，無法下單');
				return;
			}

			// 通过基础校验后，打开模拟微信支付弹窗
			this.payPassword = '';
			this.payError = '';
			this.payPopupShow = true;
		},
		// 真正发起创建订单（模拟输入支付密码后调用）
		handlePayConfirm() {
			if (this.payProcessing) return;

			if (!this.payPassword || this.payPassword.length < 6) {
				this.payError = '请输入6位支付密码';
				if (this.$u && this.$u.toast) {
					this.$u.toast('请输入6位支付密码');
				}
				return;
			}

			const cartItems = (this.orderList || [])
				.filter(item => item.value && item.value > 0)
				.map(item => ({
					flowerId: item.id,
					quantity: item.value
				}));

			if (!cartItems.length) {
				if (this.$u && this.$u.toast) {
					this.$u.toast('商品數量為 0，無法下單');
				}
				this.payPopupShow = false;
				return;
			}

			// 根据堂食 / 外送确定配送方式和电话
			const userInfo = uni.getStorageSync('userInfo') || {};
			const isDelivery = this.subCurrent === 1; // 0: 堂食, 1: 外送
			const phone = isDelivery
				? (userInfo.phone || this.form.phone || null)
				: (this.form.phone || userInfo.phone || null);

			const requestData = {
				userId: this.getUserId() || 7,
				phone: phone,
				note: this.form.note ? this.form.note : '',
				cartItems,
				delivery: isDelivery ? 1 : 0,
				userCouponId: this.selectedCoupon ? this.selectedCoupon.id : null  // 用户优惠券ID
			};

			// 外送订单需要添加配送时间
			if (isDelivery && this.form.mealsTimeFull) {
				requestData.deliveryTime = this.form.mealsTimeFull;
			}

			console.log(requestData, 'requestData');

			// 清除错误信息
			this.payError = '';
			// 开始支付处理
			this.payProcessing = true;

			orderApi.createOrder(requestData).then(res => {
				console.log(res);
				// 支付成功，清空购物车相关数据
				// 1. 清空本地存储的订单数据
				uni.removeStorageSync('dishData');
				// 2. 设置支付成功标记，通知菜单页面清空购物车
				uni.setStorageSync('shouldClearCart', true);
				
				// 支付成功，延迟一下再跳转，让用户看到成功状态
				setTimeout(() => {
					this.payPopupShow = false;
					uni.redirectTo({
						url: '/subPack/index/indexPaysuccess'
					})
				}, 500);
			}).catch(err => {
				console.error('submit order failed: ', err);
				this.payError = '支付失败，请稍后重试';
				if (this.$u && this.$u.toast) {
					this.$u.toast('下單失敗，請稍後重試');
				}
			}).finally(() => {
				this.payProcessing = false;
			})
		}
	}
}
</script>

<style lang="scss">
.wrap {
	.address {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.u-cell-box {
		border-radius: 30rpx;
		margin: 30rpx 0;
	}

	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
	}

	.item-menu-name {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		width: 100%;
	}

	.u-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		right: 0;
		display: flex;
		z-index: 99;

		&__nums {
			border-left: 1px solid #606266;
			font-size: 24rpx;
			margin-left: 20rpx;
			padding-left: 20rpx;
			font-weight: bold;
		}

		&__wrap,
		&__place {
			display: flex;
			color: #fff;
		}

		&__wrap {
			width: 70%;
			padding: 30rpx 0 30rpx 30rpx;
			align-items: center;
			color: #303133;
			border-top: 1px solid #f3f4f6;
			background-color: white;
		}

		&__place {
			background-color: #EE2F37;
			width: 30%;
			text-align: center;
			flex-direction: column;
			justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.list-box {
		padding: 20rpx 30rpx;
		margin: 0 30rpx 20rpx 30rpx;
		margin-bottom: 20rpx;
		border-radius: 14rpx;
		box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);
	}
}

.pay-popup {
	padding: 40rpx 40rpx 50rpx 40rpx;
	background-color: #ffffff;
	position: relative;

	&__loading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.95);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		border-radius: 24rpx 24rpx 0 0;
	}

	&__loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 30rpx;
	}

	&__spinner {
		width: 80rpx;
		height: 80rpx;
		border: 6rpx solid #f0f0f0;
		border-top-color: #07c160;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	&__loading-text {
		font-size: 28rpx;
		color: #303133;
		font-weight: 500;
	}

	&__title {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	&__amount {
		text-align: center;
		margin-bottom: 10rpx;

		.symbol {
			font-size: 32rpx;
			color: #303133;
		}

		.value {
			font-size: 48rpx;
			font-weight: bold;
			color: #303133;
			margin-left: 6rpx;
		}
	}

	&__desc {
		text-align: center;
		font-size: 24rpx;
		color: #909399;
		margin-bottom: 30rpx;
	}

	&__password {
		margin: 0 20rpx 10rpx 20rpx;
	}

	&__error {
		text-align: center;
		font-size: 22rpx;
		color: #fa3534;
		margin-bottom: 20rpx;
	}

	&__actions {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		gap: 20rpx;
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.coupon-selector {
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #fff;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	&__title {
		font-size: 32rpx;
		font-weight: bold;
	}

	&__close {
		padding: 10rpx;
	}

	&__list {
		flex: 1;
	}

	&__item {
		display: flex;
		align-items: center;
		background: #fff;
		border: 2rpx solid #e0e0e0;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		position: relative;

		&--none {
			justify-content: center;
			padding: 30rpx;
		}

		&--selected {
			border-color: #EE2F37;
			background: #fdf3f3;
		}

		&--disabled {
			opacity: 0.5;
			background: #f5f5f5;
		}
	}

	&__item-left {
		width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffeeef;
		border-radius: 12rpx;
		padding: 20rpx 0;
		margin-right: 20rpx;
	}

	&__item-amount {
		font-size: 36rpx;
		font-weight: bold;
		color: #EE2F37;
	}

	&__item-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	&__item-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
	}

	&__item-desc {
		font-size: 24rpx;
		color: #909399;
	}

	&__item-tip {
		font-size: 22rpx;
		color: #EE2F37;
	}

	&__item-check {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	&__empty {
		text-align: center;
		padding: 100rpx 0;
		color: #909399;
		font-size: 28rpx;
	}
}

.pay-popup {
	&__discount {
		display: block;
		font-size: 24rpx;
		color: #67c23a;
		margin-top: 10rpx;
	}
}
</style>