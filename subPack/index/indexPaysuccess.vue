<template>
	<view class="u-flex-col u-col-center">
		<!-- body start -->
		<view class="icon">
			<u-icon name="checkmark-circle-fill" color="#13D269" size="150"></u-icon>
		</view>
		<view class="u-font-38 u-font-weight u-m-b-30">支付成功</view>
		<view class="u-type-info">正在为您全力备餐，请耐心等待哦！</view>
		<view class="u-m-t-170 u-flex u-row-between">
			<view class="return-home" @click="backHome">返回首页</view>
			<view class="check-order" @click="checkOrder">查看订单</view>
		</view>
		<!-- body end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			// backHome
			backHome() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// checkOrder
			checkOrder() {
				uni.navigateTo({
					url: "/subPack/order/order"
				})
			}
		}
	}
</script>

<style lang="scss">
	.icon {
		margin: 50% 0 8% 0;
	}

	.return-home,
	.check-order {
		font-size: 34rpx;
		padding: 30rpx 80rpx;
		border-radius: 14rpx;
	}

	.return-home {
		background-color: #f4f4f5;
	}

	.check-order {
		background-color: #2BA0C6;
		color: white;
		margin-left: 100rpx;
	}
</style>