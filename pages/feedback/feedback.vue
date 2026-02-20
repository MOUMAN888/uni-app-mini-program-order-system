<template>
	<view class="feedback-page">
		<view class="feedback-card">
			<!-- 管理员：显示全部反馈列表 -->
			<view v-if="Number(userType) === 3" class="admin-section">
				<view class="section-title">用户反馈列表</view>
				<view class="section-subtitle" v-if="feedbackList.length">
					共 {{ feedbackList.length }} 条反馈
				</view>
				<scroll-view scroll-y="true" class="feedback-list">
					<view v-if="feedbackList.length === 0" class="empty-text">
						暂无反馈
					</view>
					<view
						v-for="(item, index) in feedbackList"
						:key="item.id || index"
						class="feedback-item"
					>
						<view class="feedback-header">
							<view class="feedback-header-left">
								<text class="feedback-index">#{{ index + 1 }}</text>
								<text class="feedback-user">用户ID：{{ item.userId }}</text>
							</view>
							<text class="feedback-time">
								{{ item.createTime || item.create_at || '' }}
							</text>
						</view>
						<view class="feedback-content">
							{{ item.content }}
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 普通用户：只显示表单和提交按钮 -->
			<view v-else class="user-section">
				<view class="section-title">意见反馈</view>
				<view class="section-subtitle">
					您的每一条意见都会帮助我们做得更好～
				</view>
				<textarea
					class="feedback-input"
					v-model="content"
					placeholder="请在这里填写您在点餐过程中的疑问、建议或问题描述…"
					maxlength="500"
					auto-height
				/>
				<view class="word-limit">
					{{ content.length }}/500
				</view>
				<button
					class="submit-btn"
					type="primary"
					style="background-color: #EE2F37; border-color: #EE2F37;"
					@click="submitFeedback"
				>
					提交反馈
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import { feedbackApi } from '@/common/api.js'

export default {
	data() {
		return {
			userType: null,        // 3 为管理员，其它为普通用户
			userId: null,
			content: '',           // 反馈内容
			feedbackList: []       // 管理员查看的反馈列表
		}
	},
	onLoad() {
		// 从本地存储获取用户信息
		const storedUserInfo = uni.getStorageSync('userInfo') || {}
		if (storedUserInfo) {
			this.userId = storedUserInfo.id || uni.getStorageSync('token') || null
		}
		
		// 从本地存储获取用户类型
		this.userType = uni.getStorageSync('userType')
		// 如果本地存储没有，尝试从 userInfo 中获取
		if (!this.userType && storedUserInfo && storedUserInfo.type !== undefined) {
			this.userType = storedUserInfo.type
		}
		
		// 确保 userType 是数字类型
		if (this.userType !== null && this.userType !== undefined) {
			this.userType = Number(this.userType)
		}

		// 如果是管理员，进入页面时拉取全部反馈
		if (Number(this.userType) === 3) {
			this.fetchAllFeedback()
		}
	},
	methods: {
		// 提交反馈（普通用户）
		submitFeedback() {
			if (!this.userId) {
				uni.showToast({
					title: '未登录，请先登录',
					icon: 'none'
				})
				return
			}
			if (!this.content.trim()) {
				uni.showToast({
					title: '请先填写反馈内容',
					icon: 'none'
				})
				return
			}

			feedbackApi.submitFeedback({
				userId: this.userId,
				content: this.content
			}).then(res => {
				console.log('提交反馈成功', res)
				uni.showToast({
					title: '提交成功，感谢反馈',
					icon: 'success'
				})
				this.content = ''
			}).catch(err => {
				console.error('提交反馈失败', err)
			})
		},

		// 管理员：获取全部反馈
		async fetchAllFeedback() {
			try {
				const res = await feedbackApi.getAllFeedback()
				console.log('获取全部反馈成功', res)
				// 假设后端数据在 res.data 中，兼容直接在 res 的情况
				this.feedbackList = res.data || res || []
			} catch (err) {
				console.error('获取全部反馈失败', err)
			}
		}
	}
}
</script>

<style lang="scss">
.feedback-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 30rpx;
	box-sizing: border-box;
}

.feedback-card {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 8rpx;
	margin-left: 16rpx;
}

.section-subtitle {
	font-size: 24rpx;
	color: #909399;
	margin-bottom: 24rpx;
	margin-left: 16rpx;
}

.user-section {
	display: flex;
	flex-direction: column;
}

.feedback-input {
	width: 100%;
	min-height: 260rpx;
	padding: 20rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	background-color: #ffffff;
	font-size: 28rpx;
	line-height: 1.6;
	border-width: 2rpx;
	border-style: solid;
	border-color: #f2f2f2;
}

.feedback-input:focus {
	border-color: #EE2F37;
}

.word-limit {
	margin-top: 12rpx;
	font-size: 22rpx;
	color: #c0c4cc;
	text-align: right;
}

.submit-btn {
	margin-top: 40rpx;
	background-color: #EE2F37;
	color: #ffffff;
	border-radius: 50rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 28rpx;
}

.admin-section {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.feedback-list {
	max-height: calc(100vh - 160rpx);
}

.feedback-item {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
}

.feedback-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 12rpx;
}

.feedback-header-left {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.feedback-index {
	min-width: 44rpx;
	height: 44rpx;
	line-height: 44rpx;
	text-align: center;
	border-radius: 50%;
	background-color: #fdf3f3;
	color: #EE2F37;
	font-size: 22rpx;
}

.feedback-content {
	font-size: 28rpx;
	color: #333333;
	word-break: break-all;
}

.empty-text {
	text-align: center;
	color: #999999;
	margin-top: 40rpx;
	font-size: 26rpx;
}
</style>

