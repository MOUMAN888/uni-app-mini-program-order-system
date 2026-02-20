<template>
	<view class="wrap">
		<!-- header start-->
		<view class="u-flex u-row-between u-m-t-20 u-m-b-30">
			<view class="wrap__vip">
				{{ orderDetail.eatStatus || '堂食' }}
			</view>
			<view class="u-type-info u-font-24">{{ orderDetail.status || '商家已接单 已买单' }}</view>
		</view>
		<view class="table-number">
			<view class="u-m-b-34">订单号</view>
			<view class="u-font-70">{{ orderDetail.orderNoShort || orderDetail.id || '001' }}</view>
		</view>
		<view>
			<view class="u-font-30 u-font-weight u-m-t-30 u-p-b-30 u-border-bottom">点餐详情</view>
			<view v-for="(item,index) in list" :key="index" class="u-flex list-box">
				<view>
					<image class="item-menu-image" :src="item.icon" mode="aspectFill"></image>
				</view>
				<view class="item-menu-name">
					<text class="u-font-26">{{item.name}}</text>
					<view class="u-m-t-10 u-m-b-10 u-line-2 u-font-22 u-font-weight u-type-info">
						{{item.desc}}
					</view>
					<view class="u-flex u-row-between">
						<view class="u-font-weight u-font-24" style="color: #EE2F37;">
							<text class="u-font-20">￥</text>
							{{item.price}}
						</view>
						<view class="u-type-info u-font-22">
							x{{item.num}}
						</view>
					</view>
				</view>
			</view>
			<view class="u-text-right">
				共计 {{ orderDetail.num || 0 }} 件，合计<text class="u-font-22 u-m-l-10" style="color: #EE2F37;">￥</text><text
					class="u-font-weight u-font-34" style="color: #EE2F37;">{{ orderDetail.price || 0 }}</text>
			</view>
		</view>
		<!-- content end -->

		<!-- slot -->
		<u-gap height="20" bg-color="#f3f4f6" margin-top="30"></u-gap>

		<!-- orderinfo start-->
		<view>
			<view class="u-font-30 u-font-weight u-m-t-30 u-p-b-30 u-border-bottom">订单信息</view>
			<view>
				<u-cell-group :border="false">
					<u-cell-item title="订单编号" :value="orderDetail.orderNo || orderDetail.id || '未知订单编号'" :arrow="false"></u-cell-item>
					<u-cell-item title="下单时间" :value="orderDetail.createTime || '2024-08-15 10:00:00'" :arrow="false"></u-cell-item>
					<u-cell-item title="订单留言" :value="orderDetail.note || '无'" :arrow="false" :border-bottom="false"></u-cell-item>
					<u-cell-item title="联系电话" :value="orderDetail.phone || '无'" :arrow="false" :border-bottom="false"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<!-- orderinfo end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail: {},
				list: []
			}
		},
		onLoad(options) {
			if (options.item) {
				try {
					const orderData = JSON.parse(decodeURIComponent(options.item));
					console.log(orderData, "订单详情数据");
					
					// 保存订单详情
					this.orderDetail = orderData;
					
					// 将 menu 数组赋值给 list
					this.list = orderData.menu || [];
				} catch (e) {
					console.error('解析订单数据失败', e);
				}
			}
		}
	}

</script>

<style lang="scss">
	.wrap {
		padding: 30rpx;

		&__vip {
			background-color: #EE2F37;
			color: white;
			padding: 5rpx 0;
			width: 100rpx;
			text-align: center;
			border-radius: 7rpx;
			font-size: 20rpx;
		}

		.table-number {
			text-align: center;
			border-radius: 14rpx;
			padding: 50rpx 0;
			font-weight: bold;
			box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);

			view:nth-child(2) {
				color: #EE2F37;
			}
		}

		.list-box {
			box-shadow: 2px 0px 8px 0px rgba(243, 244, 246, 0.95);
			padding: 20rpx 30rpx;
			margin-bottom: 20rpx;
			border-radius: 14rpx;
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
	}
</style>