<template>
	<view class="admin-page">
		<!-- 顶部标题 -->
		<view class="admin-header">
			<view class="admin-header__title">管理员设置</view>
			<view class="admin-header__subtitle">管理管理员和用户权限</view>
		</view>

		<!-- Tab切换 -->
		<view class="admin-tabs">
			<view class="admin-tabs__item" :class="{ 'admin-tabs__item--active': activeTab === 'admin' }"
				@click="switchTab('admin')">
				管理员列表
			</view>
			<view class="admin-tabs__item" :class="{ 'admin-tabs__item--active': activeTab === 'user' }"
				@click="switchTab('user')">
				用户列表
			</view>
		</view>

		<!-- 搜索框（仅用户列表显示） -->
		<view v-if="activeTab === 'user'" class="admin-search">
			<u-input v-model="searchKeyword" placeholder="搜索姓名、手机号、邮箱、用户名" :border="false"
				:custom-style="{ background: '#f5f5f5', borderRadius: '20rpx', padding: '20rpx' }"
				@confirm="handleSearch">
				<template slot="suffix">
					<view class="admin-search__icon" @click="handleSearch">
						<u-icon name="search" size="20" color="#909399"></u-icon>
					</view>
				</template>
			</u-input>
		</view>

		<!-- 管理员列表 -->
		<view v-if="activeTab === 'admin'" class="admin-content">
			<view v-if="adminList.length" class="admin-list">
				<view v-for="(item, index) in adminList" :key="item.id" class="admin-card">
					<view class="admin-card__left">
						<view class="admin-card__avatar">
							<text class="admin-card__avatar-text">{{ item.name ? item.name.charAt(0).toUpperCase() : 'A' }}</text>
						</view>
						<view class="admin-card__info">
							<view class="admin-card__name">{{ item.name || '管理员' }}</view>
							<view class="admin-card__type">
								<u-tag :text="item.authority === 'super_admin' ? '超级管理员' : '普通管理员'"
									:type="item.authority === 'super_admin' ? 'error' : 'warning'" size="mini" />
							</view>
						</view>
					</view>
					<!-- <view class="admin-card__right">
						<u-button v-if="item.authority !== 'super_admin'" type="error" size="mini"
							@click="handleRemoveAdmin(item)">删除管理员</u-button>
						<text v-else class="admin-card__super-tip">超级管理员</text>
					</view> -->
				</view>
			</view>
			<u-empty v-else text="暂无管理员" mode="list"></u-empty>

			<!-- 分页 -->
			<view v-if="adminTotalPages > 1" class="admin-pagination">
				<u-button type="info" size="mini" :disabled="adminPage === 1" @click="prevAdminPage">上一页</u-button>
				<text class="admin-pagination__text">{{ adminPage }} / {{ adminTotalPages }}</text>
				<u-button type="info" size="mini" :disabled="adminPage === adminTotalPages"
					@click="nextAdminPage">下一页</u-button>
			</view>
		</view>

		<!-- 用户列表 -->
		<view v-if="activeTab === 'user'" class="admin-content">
			<view v-if="userList.length" class="admin-list">
				<view v-for="(item, index) in userList" :key="item.id" class="admin-card">
					<view class="admin-card__left">
						<view class="admin-card__avatar">
							<text class="admin-card__avatar-text">{{ item.realname ? item.realname.charAt(0) : (item.name ? item.name.charAt(0).toUpperCase() : 'U') }}</text>
						</view>
						<view class="admin-card__info">
							<view class="admin-card__name">{{ item.realname || item.name || '用户' }}</view>
							<view class="admin-card__meta">
								<text v-if="item.phone" class="admin-card__meta-item">手机：{{ item.phone }}</text>
							</view>
							<view class="admin-card__type">
								<u-tag :text="getUserTypeText(item.type)" :type="getUserTypeTagType(item.type)"
									size="mini" />
								<text v-if="item.totalPoints !== undefined" class="admin-card__points">积分：{{ item.totalPoints }}</text>
							</view>
						</view>
					</view>
					<view class="admin-card__right">
						<u-button v-if="item.type === 1" type="primary" size="mini"
							@click="handleSetAdmin(item)">设为管理员</u-button>
						<u-button v-else-if="item.type === 2" type="error" size="mini"
							@click="handleRemoveAdmin(item)">删除管理员</u-button>
						<text v-else-if="item.type === 3" class="admin-card__super-tip">超级管理员</text>
					</view>
				</view>
			</view>
			<u-empty v-else text="暂无用户" mode="list"></u-empty>

			<!-- 分页 -->
			<view v-if="userTotalPages > 1" class="admin-pagination">
				<u-button type="info" size="mini" :disabled="userPage === 1" @click="prevUserPage">上一页</u-button>
				<text class="admin-pagination__text">{{ userPage }} / {{ userTotalPages }}</text>
				<u-button type="info" size="mini" :disabled="userPage === userTotalPages"
					@click="nextUserPage">下一页</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { adminApi, userApi } from '@/common/api.js'

export default {
	data() {
		return {
			activeTab: 'admin', // 'admin' | 'user'
			// 管理员列表相关
			adminList: [],
			adminPage: 1,
			adminPageSize: 10,
			adminTotalPages: 0,
			adminTotalCount: 0,
			// 用户列表相关
			userList: [],
			userPage: 1,
			userPageSize: 10,
			userTotalPages: 0,
			userTotalCount: 0,
			searchKeyword: '',
			// 当前用户信息
			currentUserId: null
		}
	},
	onLoad() {
		// 获取当前用户ID
		const userInfo = uni.getStorageSync('userInfo')
		if (userInfo && userInfo.id) {
			this.currentUserId = userInfo.id
		}
		// 加载管理员列表
		this.fetchAdminList()
	},
	methods: {
		// 切换Tab
		switchTab(tab) {
			this.activeTab = tab
			if (tab === 'admin') {
				this.fetchAdminList()
			} else {
				this.fetchUserList()
			}
		},
		// 搜索
		handleSearch() {
			this.userPage = 1
			this.fetchUserList()
		},
		// 获取管理员列表
		async fetchAdminList() {
			try {
				const res = await adminApi.getAdminList({
					page: this.adminPage,
					pageSize: this.adminPageSize
				})
				if (res && res.code === 200 && res.data) {
					this.adminList = res.data.admins || []
					this.adminTotalCount = res.data.totalCount || 0
					this.adminTotalPages = res.data.totalPages || 0
				}
			} catch (error) {
				console.error('获取管理员列表失败', error)
			}
		},
		// 获取用户列表
		async fetchUserList() {
			try {
				const params = {
					page: this.userPage,
					pageSize: this.userPageSize
				}
				if (this.searchKeyword) {
					params.keyword = this.searchKeyword
				}
				const res = await userApi.getUserList(params)
				if (res && res.code === 200 && res.data) {
					this.userList = res.data.users || []
					this.userTotalCount = res.data.totalCount || 0
					this.userTotalPages = res.data.totalPages || 0
				}
			} catch (error) {
				console.error('获取用户列表失败', error)
			}
		},
		// 设置管理员
		async handleSetAdmin(user) {
			uni.showModal({
				title: '确认设置',
				content: `确定要将"${user.realname || user.name}"设置为管理员吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await adminApi.setAdmin({
								currentUserId: this.currentUserId,
								targetUserId: user.id,
								adminType: 2 // 普通管理员
							})
							if (result && result.code === 200) {
								uni.showToast({
									title: '设置成功',
									icon: 'success'
								})
								// 刷新列表
								setTimeout(() => {
									this.fetchUserList()
									this.fetchAdminList()
								}, 1500)
							}
						} catch (error) {
							console.error('设置管理员失败', error)
						}
					}
				}
			})
		},
		// 删除管理员
		async handleRemoveAdmin(user) {
			uni.showModal({
				title: '确认删除',
				content: `确定要删除"${user.realname || user.name || user.name}"的管理员权限吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await adminApi.removeAdmin({
								currentUserId: this.currentUserId,
								targetUserId: user.id
							})
							if (result && result.code === 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								})
								// 刷新列表
								setTimeout(() => {
									this.fetchUserList()
									this.fetchAdminList()
								}, 1500)
							}
						} catch (error) {
							console.error('删除管理员失败', error)
						}
					}
				}
			})
		},
		// 获取用户类型文本
		getUserTypeText(type) {
			const typeMap = {
				1: '普通用户',
				2: '普通管理员',
				3: '超级管理员'
			}
			return typeMap[type] || '未知'
		},
		// 获取用户类型标签类型
		getUserTypeTagType(type) {
			const typeMap = {
				1: 'info',
				2: 'warning',
				3: 'error'
			}
			return typeMap[type] || 'info'
		},
		// 管理员列表分页
		prevAdminPage() {
			if (this.adminPage > 1) {
				this.adminPage--
				this.fetchAdminList()
			}
		},
		nextAdminPage() {
			if (this.adminPage < this.adminTotalPages) {
				this.adminPage++
				this.fetchAdminList()
			}
		},
		// 用户列表分页
		prevUserPage() {
			if (this.userPage > 1) {
				this.userPage--
				this.fetchUserList()
			}
		},
		nextUserPage() {
			if (this.userPage < this.userTotalPages) {
				this.userPage++
				this.fetchUserList()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.admin-page {
	min-height: 100vh;
	background: #f7f7f7;
	padding-bottom: 40rpx;
}

.admin-header {
	padding: 40rpx 30rpx;
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

.admin-tabs {
	display: flex;
	background: #fff;
	margin: 0 30rpx;
	border-radius: 20rpx 20rpx 0 0;
	overflow: hidden;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

	&__item {
		flex: 1;
		text-align: center;
		padding: 30rpx 0;
		font-size: 28rpx;
		color: #909399;
		position: relative;

		&--active {
			color: #ee2f37;
			font-weight: bold;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 60rpx;
				height: 4rpx;
				background: #ee2f37;
				border-radius: 2rpx;
			}
		}
	}
}

.admin-search {
	padding: 20rpx 30rpx;
	background: #fff;
	margin: 0 30rpx;
	border-radius: 0 0 20rpx 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

	&__icon {
		padding: 0 20rpx;
	}
}

.admin-content {
	margin: 20rpx 30rpx;
}

.admin-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.admin-card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);

	&__left {
		display: flex;
		align-items: center;
		flex: 1;
	}

	&__avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: linear-gradient(135deg, #ee2f37, #ff7b55);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;

		&-text {
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
		}
	}

	&__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}

	&__name {
		font-size: 30rpx;
		font-weight: bold;
		color: #303133;
	}

	&__meta {
		display: flex;
		flex-direction: column;
		gap: 4rpx;

		&-item {
			font-size: 24rpx;
			color: #909399;
		}
	}

	&__type {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	&__points {
		font-size: 24rpx;
		color: #909399;
	}

	&__right {
		margin-left: 20rpx;
	}

	&__super-tip {
		font-size: 24rpx;
		color: #ee2f37;
		font-weight: bold;
	}
}
/* 假设组件内部 input 的类是 .u-input-inner */
::v-deep .u-input__input[data-v-fdbb9fe6] {
    min-height: 28px !important;
    background: none !important;
    border-radius: 10rpx !important;
    padding: 8px !important;
}

.admin-pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30rpx;
	margin-top: 40rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

	&__text {
		font-size: 28rpx;
		color: #303133;
	}
}
</style>
