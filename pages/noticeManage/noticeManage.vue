<template>
	<view class="notice-manage-page">
		<!-- 顶部标题 -->
		<view class="notice-header">
			<view class="notice-header__title">公告管理</view>
			<view class="notice-header__subtitle">管理公告信息</view>
		</view>

		<!-- 添加按钮 -->
		<!-- <view class="notice-actions">
			<u-button type="primary" @click="showAddModal" :custom-style="{ borderRadius: '12rpx', fontWeight: '500' }">
				<u-icon name="plus" color="#fff" size="20" style="margin-right: 8rpx;"></u-icon>
				添加公告
			</u-button>
		</view> -->

		<!-- 公告卡片 -->
		<view class="notice-content">
			<view v-if="currentNotice" class="notice-card-wrapper">
				<view class="notice-card">
					<view class="notice-card__header">
						<view class="notice-card__title">
							<u-icon name="file-text" color="#ee2f37" size="36"></u-icon>
							<text class="notice-card__title-text">{{ currentNotice.name || '未命名公告' }}</text>
						</view>
						<view class="notice-card__actions">
							<u-button type="primary" size="mini" @click="showEditModal(currentNotice)" :custom-style="{ borderRadius: '8rpx' }">
								<u-icon name="edit-pen" color="#fff" size="16" style="margin-right: 6rpx;"></u-icon>
								编辑
							</u-button>
						</view>
					</view>
					<view class="notice-card__content">
						{{ currentNotice.content || '无内容' }}
					</view>
					<view class="notice-card__footer" v-if="currentNotice.times">
						<view class="notice-card__meta">
							<u-tag text="首页展示" type="success" size="mini" shape="circle"></u-tag>
							<text class="notice-card__time">
								<u-icon name="clock" size="20" color="#909399" style="margin-right: 6rpx;"></u-icon>
								{{ currentNotice.times }}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="notice-empty">
				<u-empty text="暂无公告" mode="list"></u-empty>
			</view>
		</view>

		<!-- 添加公告弹窗 -->
		<!-- <u-modal 
			v-model="showAddNoticeModal" 
			title="添加公告" 
			:show-cancel-button="true"
			:show-confirm-button="true"
			confirm-text="确定"
			cancel-text="取消"
			@confirm="handleAddNotice"
			@cancel="closeAddModal"
			width="650rpx"
			border-radius="20"
		>
			<view class="notice-form">
				<view class="notice-form__item">
					<view class="notice-form__label">公告名称：</view>
					<u-input 
						v-model="addForm.name" 
						placeholder="请输入公告名称"
						:border="true"
					></u-input>
				</view>
				<view class="notice-form__item">
					<view class="notice-form__label">公告内容：</view>
					<u-input 
						v-model="addForm.content" 
						type="textarea"
						placeholder="请输入公告内容"
						:border="true"
						:auto-height="true"
						:maxlength="500"
					></u-input>
				</view>
				<view class="notice-form__item">
					<u-switch 
						v-model="addForm.showOnHome" 
						active-text="展示在首页"
						inactive-text="不展示"
					></u-switch>
				</view>
			</view>
		</u-modal> -->

		<!-- 修改公告弹窗 -->
		<u-modal 
			v-model="showEditNoticeModal" 
			title="修改公告" 
			:show-cancel-button="true"
			:show-confirm-button="true"
			confirm-text="确定"
			cancel-text="取消"
			@confirm="handleUpdateNotice"
			@cancel="closeEditModal"
			width="650rpx"
			border-radius="20"
		>
			<view class="notice-form">
				<view class="notice-form__item">
					<view class="notice-form__label">标题：</view>
					<u-input 
						v-model="editForm.name" 
						placeholder="请输入标题"
						:border="true"
					></u-input>
				</view>
				<view class="notice-form__item">
					<view class="notice-form__label">内容：</view>
					<u-input 
						v-model="editForm.content" 
						type="textarea"
						placeholder="请输入内容"
						:border="true"
						:auto-height="true"
						:maxlength="500"
					></u-input>
				</view>
		
			</view>
		</u-modal>
	</view>
</template>

<script>
import { noticeApi } from '@/common/api.js'

export default {
	data() {
		return {
			noticeList: [],
			showAddNoticeModal: false,
			showEditNoticeModal: false,
			addForm: {
				name: '',
				content: '',
				showOnHome: false
			},
			editForm: {
				id: null,
				name: '',
				content: '',
				showOnHome: false
			}
		}
	},
	computed: {
		// 获取第一条公告（因为只有一条）
		currentNotice() {
			return this.noticeList.length > 0 ? this.noticeList[0] : null
		}
	},
	onLoad() {
		this.fetchNoticeList()
	},
	methods: {
		// 获取公告列表
		async fetchNoticeList() {
			try {
				const res = await noticeApi.getNoticeList()
				if (res && res.data) {
					this.noticeList = Array.isArray(res.data) ? res.data : []
				}
			} catch (error) {
				console.error('获取公告列表失败', error)
				uni.showToast({
					title: '获取公告列表失败',
					icon: 'none'
				})
			}
		},
		// 显示添加弹窗
		showAddModal() {
			this.addForm = {
				name: '',
				content: '',
				showOnHome: false
			}
			this.showAddNoticeModal = true
		},
		// 关闭添加弹窗
		closeAddModal() {
			this.showAddNoticeModal = false
			this.addForm = {
				name: '',
				content: '',
				showOnHome: false
			}
		},
		// 显示编辑弹窗
		showEditModal(item) {
			this.editForm = {
				id: item.id,
				name: item.name || '',
				content: item.content || '',
				showOnHome: !!item.times
			}
			this.showEditNoticeModal = true
		},
		// 关闭编辑弹窗
		closeEditModal() {
			this.showEditNoticeModal = false
			this.editForm = {
				id: null,
				name: '',
				content: '',
				showOnHome: false
			}
		},
		// 格式化时间为指定格式
		formatDateTime() {
			const now = new Date()
			const year = now.getFullYear()
			const month = String(now.getMonth() + 1).padStart(2, '0')
			const day = String(now.getDate()).padStart(2, '0')
			const hours = String(now.getHours()).padStart(2, '0')
			const minutes = String(now.getMinutes()).padStart(2, '0')
			const seconds = String(now.getSeconds()).padStart(2, '0')
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		},
		// 添加公告
		async handleAddNotice() {
			if (!this.addForm.name || !this.addForm.content) {
				uni.showToast({
					title: '请填写完整信息',
					icon: 'none'
				})
				return
			}

			try {
				const data = {
					name: this.addForm.name,
					content: this.addForm.content
				}

				// 如果选择展示在首页，添加 times 字段
				if (this.addForm.showOnHome) {
					data.times = this.formatDateTime()
				}

				const res = await noticeApi.addNotice(data)
				if (res && res.code === 200) {
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					})
					this.closeAddModal()
					// 刷新列表
					setTimeout(() => {
						this.fetchNoticeList()
					}, 1500)
				} else {
					uni.showToast({
						title: res.msg || '添加失败',
						icon: 'none'
					})
				}
			} catch (error) {
				console.error('添加公告失败', error)
				uni.showToast({
					title: '添加公告失败',
					icon: 'none'
				})
			}
		},
		// 修改公告
		async handleUpdateNotice() {
			if (!this.editForm.id) {
				uni.showToast({
					title: '缺少公告ID',
					icon: 'none'
				})
				return
			}

			try {
				const data = {
					id: this.editForm.id
				}

				// name 和 content 可选，如果填写了才添加
				if (this.editForm.name !== undefined && this.editForm.name !== null) {
					data.name = this.editForm.name
				}
				if (this.editForm.content !== undefined && this.editForm.content !== null) {
					data.content = this.editForm.content
				}

				// 如果选择展示在首页，添加 times 字段
				if (this.editForm.showOnHome) {
					data.times = this.formatDateTime()
				} else {
					// 如果不展示在首页，可以传空或删除 times
					data.times = null
				}

				const res = await noticeApi.updateNotice(data)
				if (res && res.code === 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					})
					this.closeEditModal()
					// 刷新列表
					setTimeout(() => {
						this.fetchNoticeList()
					}, 1500)
				} else {
					uni.showToast({
						title: res.msg || '修改失败',
						icon: 'none'
					})
				}
			} catch (error) {
				console.error('修改公告失败', error)
				uni.showToast({
					title: '修改公告失败',
					icon: 'none'
				})
			}
		}
	}
}
</script>

<style lang="scss">
.notice-manage-page {
	min-height: 100vh;
	background: #f7f7f7;
	padding-bottom: 40rpx;
}

.notice-header {
	padding: 40rpx 30rpx 30rpx;
	background: linear-gradient(135deg, #ee2f37, #ff7b55);
	color: #fff;

	&__title {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	&__subtitle {
		font-size: 26rpx;
		opacity: 0.9;
	}
}

.notice-actions {
	padding: 30rpx;
	background: #fff;
	margin: 20rpx 30rpx;
	border-radius: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.notice-content {
	margin: 30rpx;
}

.notice-card-wrapper {
	display: flex;
	justify-content: center;
}

.notice-card {
	background: #fff;
	border-radius: 20rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
	transition: all 0.3s ease;
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 30rpx;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	&__title {
		font-size: 36rpx;
		font-weight: bold;
		color: #303133;
		flex: 1;
		line-height: 1.4;
		display: flex;
		align-items: center;
		gap: 15rpx;
	}

	&__title-text {
		flex: 1;
	}

	&__actions {
		margin-left: 20rpx;
	}

	&__content {
		font-size: 30rpx;
		color: #606266;
		line-height: 2;
		white-space: pre-wrap;
		word-break: break-all;
		min-height: 120rpx;
		padding: 30rpx;
		background: linear-gradient(135deg, #fafafa, #f5f5f5);
		border-radius: 16rpx;
		box-shadow: inset 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
	}

	&__footer {
		padding-top: 30rpx;
		border-top: 2rpx solid #f0f0f0;
		margin-top: 10rpx;
	}

	&__meta {
		display: flex;
		align-items: center;
		gap: 20rpx;
		flex-wrap: wrap;
	}

	&__time {
		font-size: 24rpx;
		color: #909399;
		padding: 8rpx 16rpx;
		background: #f5f5f5;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
	}
}

.notice-empty {
	margin-top: 100rpx;
}

.notice-form {
	padding: 20rpx ;

	&__item {
		margin-bottom: 30rpx;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&__label {
		font-size: 28rpx;
		color: #303133;
		margin-bottom: 15rpx;
		font-weight: 500;
	}
}

// 优化输入框样式
::v-deep .u-input {
	background: #fafafa;
	border-radius: 12rpx;
	padding: 0 20rpx;
}

::v-deep .u-input__input {
	min-height: 80rpx;
	font-size: 28rpx;
}

::v-deep .u-textarea {
	background: #fafafa;
	border-radius: 12rpx;
	padding: 20rpx;
	min-height: 200rpx;
}

// 优化开关样式
::v-deep .u-switch {
	margin-top: 10rpx;
}

// 优化按钮样式
::v-deep .u-btn--primary {
	background: linear-gradient(135deg, #ee2f37, #ff7b55);
	border: none;
	border-radius: 12rpx;
	font-weight: 500;
	box-shadow: 0 4rpx 12rpx rgba(238, 47, 55, 0.3);
}

::v-deep .u-btn--mini {
	border-radius: 8rpx;
}

// 优化弹窗样式
::v-deep .u-modal {
	border-radius: 20rpx;
}

::v-deep .u-modal__header {
	border-bottom: 1rpx solid #f0f0f0;
	padding-bottom: 20rpx;
}

::v-deep .u-modal__title {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
}

::v-deep .u-modal__footer {
	border-top: 1rpx solid #f0f0f0;
	padding-top: 20rpx;
}

::v-deep .u-modal__button-group__button--primary {
	background: linear-gradient(135deg, #ee2f37, #ff7b55);
	border: none;
	border-radius: 12rpx;
	font-weight: 500;
}
</style>

