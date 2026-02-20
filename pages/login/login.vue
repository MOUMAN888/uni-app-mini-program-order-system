<template>
    <view class="register-container">
        <!-- 顶部装饰 -->
        <view class="register-header">
            <view class="header-bg"></view>
            <view class="header-content">
                <view class="title">欢迎登录</view>
                <view class="subtitle">请输入手机号和密码登录</view>
            </view>
        </view>

        <!-- 表单内容 -->
        <view class="form-container">
            <u-form :model="formData" ref="form" :rules="rules" label-width="160">
                <!-- 手机号 -->
                <u-form-item label="手机号" prop="phone" required>
                    <u-input v-model="formData.phone" type="number" placeholder="请输入手机号" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="11" />
                </u-form-item>

                <!-- 密码 -->
                <u-form-item label="密码" prop="pwd" required>
                    <u-input v-model="formData.pwd" type="password" placeholder="请输入密码" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 真实姓名 -->
                <!-- <u-form-item label="真实姓名" prop="realname" required>
                    <u-input v-model="formData.realname" placeholder="请输入真实姓名" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item> -->

                <!-- 性别 -->
                <!-- <u-form-item label="性别" prop="sex" required>
                    <u-radio-group v-model="formData.sex" placement="row">
                       <span class="u-radio-item">男： <u-radio name="男" active-color="#EE2F37" label="男" ></u-radio></span>
                       <span class="u-radio-item">女： <u-radio name="女" active-color="#EE2F37" label="女"> </u-radio></span>
                       
                    </u-radio-group>
                </u-form-item> -->

                <!-- 年龄 -->
                <!-- <u-form-item label="年龄" prop="age" required>
                    <u-input v-model="formData.age" type="number" placeholder="请输入年龄" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item> -->

                <!-- 身份证号 -->
                <!-- <u-form-item label="身份证号" prop="card" required>
                    <u-input v-model="formData.card" placeholder="请输入身份证号" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="18" />
                </u-form-item> -->

                <!-- 手机号 -->
                <!-- <u-form-item label="手机号" prop="phone" required>
                    <u-input v-model="formData.phone" type="number" placeholder="请输入手机号" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="11" />
                </u-form-item> -->

                <!-- 邮箱 -->
                <!-- <u-form-item label="邮箱" prop="email" required>
                    <u-input v-model="formData.email" type="text" placeholder="请输入邮箱地址" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item> -->

                <!-- 地址 -->
                <!-- <u-form-item label="地址" prop="address" required>
                    <u-input v-model="formData.address" type="textarea" placeholder="请输入详细地址" :auto-height="true"
                        :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx', minHeight: '80rpx' }" />
                </u-form-item> -->

                <!-- 邮编 -->
                <!-- <u-form-item label="邮编" prop="code" required>
                    <u-input v-model="formData.code" type="number" placeholder="请输入邮编" :border="false"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="6" />
                </u-form-item> -->

                <!-- 用户类型 -->
                <!-- <u-form-item label="用户类型" prop="type" required>
                    <u-radio-group v-model="formData.type" placement="row">
                      <span class="u-radio-item">我是用户： <u-radio name="0" active-color="#EE2F37" label="普通用户"></u-radio></span>
                      <span class="u-radio-item">我是商家： <u-radio name="1" active-color="#EE2F37" label="商家用户"></u-radio></span>
                    </u-radio-group>
                </u-form-item> -->
            </u-form>

            <!-- 提交按钮 -->
            <view class="submit-btn-container">
                <u-button type="primary"
                    :custom-style="{ background: '#EE2F37', borderRadius: '50rpx', height: '88rpx', fontSize: '32rpx' }"
                    @click="handleRegister">立即登录</u-button>
            </view>

            <!-- 登录链接 -->
            <view class="login-link" @click="goToLogin">
                <text>使用微信登录</text>
            </view>
        </view>
    </view>
</template>

<script>
import { userApi } from '@/common/api.js'

export default {
    data() {
        return {
            formData: {
                phone: '',
                pwd: ''
            },
            rules: {
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '请输入正确的手机号',
                    trigger: 'blur'
                }],
                pwd: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    min: 6,
                    message: '密码长度不能少于6位',
                    trigger: 'blur'
                }]
            }
        }
    },
    onLoad() {
        // 如果已经登录，直接跳转到首页
        const token = uni.getStorageSync('token')
        if (token) {
            uni.switchTab({
                url: '/pages/index/index'
            })
        }
    },
    methods: {
        // 注册
        handleRegister() {
            this.$refs.form.validate().then(valid => {
                if (valid) {
                    uni.showLoading({
                        title: '登录中...'
                    });

                    userApi.login({
                        phone: this.formData.phone,
                        pwd: this.formData.pwd
                    }).then(res => {
                        uni.hideLoading();
                        if (res && (res.code === 200 || res.statusCode === 200)) {
                            // 保存用户信息
                            const responseData = res.data || res
                            if (responseData && responseData.user) {
                                // 保存用户ID作为token（用于登录状态判断）
                                uni.setStorageSync('token', responseData.user.id)
                                // 保存完整的用户信息
                                uni.setStorageSync('userInfo', responseData.user)
                                // 保存用户类型
                                if (responseData.type !== undefined) {
                                    uni.setStorageSync('userType', responseData.type)
                                }
                            }
                            uni.showToast({
                                title: '登录成功',
                                icon: 'success'
                            });
                            // 登录成功后跳转到首页
                            setTimeout(() => {
                                uni.switchTab({
                                    url: '/pages/index/index'
                                })
                            }, 1500)
                        }
                    }).catch(err => {
                        uni.hideLoading();
                        console.error('登录失败', err);
                    });
                } else {
                    uni.showToast({
                        title: '请完善表单信息',
                        icon: 'none'
                    });
                }
            });
        },

        // 跳转到登录页
        async goToLogin() {
            console.log("goToLogin执行  ");
            // 点击登录按钮触发的事件
            try {
                // 1. 调用 uni.login() 获取微信临时 js_code
                await uni.login({
                    provider: 'weixin', // 指定登录方式为微信（uni-app 跨端兼容写法）
                    success: (res) => {
                        let code = res.code;
                        uni.request({
                            url: 'http://localhost:8080/api/users/login',
                            method: 'POST',
                        
                            data: { code: code },
                            success: (res) => {
                                console.log(res, "res");
                                const responseData = res.data.data || res.data
                                if (responseData.code === 200 || res.data.code === 200) {
                                    // 保存用户信息
                                    if (responseData && responseData.user) {
                                        // 保存用户ID作为token（用于登录状态判断）
                                        uni.setStorageSync('token', responseData.user.id)
                                        // 保存完整的用户信息
                                        uni.setStorageSync('userInfo', responseData.user)
                                        // 保存用户类型
                                        if (responseData.type !== undefined) {
                                            uni.setStorageSync('userType', responseData.type)
                                        }
                                    }
                                    uni.showToast({
                                        title: '登录成功',
                                        icon: 'success'
                                    });
                                    // 登录成功后跳转到首页
                                    uni.switchTab({ url: '/pages/index/index' });

                                } else {
                                    uni.showToast({ title: res.data.message || '登录失败', icon: 'none' });
                                }
                            }
                        });
                        console.log(res, "res")
                    },
                    fail: (err) => {
                        uni.showToast({ title: '获取登录凭证失败', icon: 'none' });
                        console.error('login 失败：', err);
                    }
                });

            } catch (err) {
                console.error('登录异常：', err);
                uni.showToast({ title: '网络异常，请重试', icon: 'none' });
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.register-container {
    min-height: 100vh;
    background: linear-gradient(180deg, #EE2F37 0%, #ffffff 30%);
}

.register-header {
    position: relative;
    padding: 80rpx 0 60rpx 0;

    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 400rpx;
        background: linear-gradient(180deg, #EE2F37 0%, rgba(238, 47, 55, 0.8) 100%);
    }

    .header-content {
        position: relative;
        z-index: 1;
        text-align: center;
        color: #ffffff;

        .title {
            font-size: 48rpx;
            font-weight: bold;
            margin-bottom: 20rpx;
        }

        .subtitle {
            font-size: 28rpx;
            opacity: 0.9;
        }
    }
}

.form-container {
    position: relative;
    background: #ffffff;
    margin: -50rpx 30rpx 0 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    padding: 40rpx 30rpx;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
    min-height: calc(100vh - 400rpx);
}

::v-deep .u-form-item {
    margin-bottom: 30rpx;
    padding: 20rpx 0;

    .u-form-item__body__left__content__label {
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
    }
}

::v-deep .u-input {
    font-size: 28rpx;
}

/* 假设组件内部 input 的类是 .u-input-inner */
::v-deep .u-input__input[data-v-fdbb9fe6] {
    min-height: 28px !important;
    background: none !important;
    border-radius: 10rpx !important;
    padding: 8px !important;
}

.submit-btn-container {
    margin: 60rpx 0 30rpx 0;
    padding: 0 20rpx;
}

.login-link {
    text-align: center;
    margin-top: 40rpx;
    padding-bottom: 40rpx;

    text {
        font-size: 28rpx;
        color: #EE2F37;
    }
}
</style>
