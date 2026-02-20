<template>
	<view class="profile-page">
		<view class="profile-card">
			<u-form :model="form" label-width="160rpx">
				<u-form-item label="昵称">
					<u-input v-model="form.name" placeholder="请输入昵称"></u-input>
				</u-form-item>
				<u-form-item label="手机号">
					<u-input v-model="form.phone" type="number" placeholder="请输入手机号"></u-input>
				</u-form-item>
				<u-form-item label="头像">
					<view class="avatar-preview" @click="handleAvatarClick">
						<u-avatar :src="form.avatar || defaultAvatar" size="140"></u-avatar>
						<text class="avatar-preview__hint">点击头像上传照片</text>
					</view>
				</u-form-item>
			</u-form>
			<u-button :loading="loading" type="primary"
				:custom-style="{ background: '#EE2F37', borderRadius: '50rpx', height: '80rpx', fontSize: '28rpx' }"
				@click="handleSubmit">
				保存信息
			</u-button>
		</view>
	</view>
</template>

<script>
import { BASE_URL } from '@/common/config.js'
import { userApi } from '@/common/api.js'

export default {
	data() {
		return {
			form: {
				name: '',
				phone: '',
				avatar: ''
			},
			userId: null,
			loading: false,
			defaultAvatar: '/static/my/avatarurl.jpg'
		}
	},
	onLoad() {
		const storedUserInfo = uni.getStorageSync('userInfo')
		if (storedUserInfo) {
			this.userId = storedUserInfo.id
			this.form.name = storedUserInfo.name || storedUserInfo.realname || ''
			this.form.phone = storedUserInfo.phone || ''
			this.form.avatar = storedUserInfo.avatar || ''
		}
	},
		methods: {
		handleAvatarClick() {
			if (!this.userId) {
				uni.showToast({
					title: '未登录，无法上传头像',
					icon: 'none'
				})
				return
			}

			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const filePath = res.tempFilePaths && res.tempFilePaths[0]
					if (!filePath) return

					uni.showLoading({
						title: '上传中...',
						mask: true
					})

					uni.uploadFile({
						url: `${BASE_URL}/api/users/uploadAvatar`,
						filePath,
						name: 'file',
						formData: {
							userId: this.userId
						},
						success: (uploadRes) => {
							try {
								const data = typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data
								// 这里假设后端返回 { code: 200, data: { url: 'http://...' } }
								if (data && data.code === 200 && data.data && data.data.url) {
									this.form.avatar = data.data.url
									uni.showToast({
										title: '头像上传成功',
										icon: 'success'
									})
								} else {
									uni.showToast({
										title: data.msg || '上传失败',
										icon: 'none'
									})
								}
							} catch (e) {
								console.error('解析上传结果失败', e)
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								})
							}
						},
						fail: (err) => {
							console.error('上传头像失败', err)
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				},
				fail: () => {
					// 用户取消选择，不做处理
				}
			})
		},
		handleSubmit() {
			if (!this.userId) {
				uni.showToast({
					title: '未登录，无法修改',
					icon: 'none'
				})
				return
			}

			if (!this.form.name.trim()) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				})
				return
			}

			if (!this.form.phone.trim()) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				})
				return
			}

			this.loading = true
			userApi.updateProfile({
				userId: this.userId,
				name: this.form.name,
				phone: this.form.phone,
				avatar: this.form.avatar
			}).then(res => {
				if (res && res.code === 200) {
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					})
					const storedUserInfo = uni.getStorageSync('userInfo') || {}
					const updatedUserInfo = {
						...storedUserInfo,
						name: this.form.name,
						phone: this.form.phone,
						avatar: this.form.avatar
					}
					uni.setStorageSync('userInfo', updatedUserInfo)
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			}).catch(error => {
				console.error('保存失败', error)
			}).finally(() => {
				this.loading = false
			})
		}
	}
}
</script>

<style lang="scss">
.profile-page {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 30rpx;
}

.profile-card {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 40rpx 30rpx;
	box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
}

.profile-tips {
	margin: 30rpx 0;
	font-size: 24rpx;
	color: #909399;
	line-height: 1.6;
}

.avatar-preview {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20rpx;

	&__hint {
		font-size: 24rpx;
		color: #909399;
	}
}
</style>

