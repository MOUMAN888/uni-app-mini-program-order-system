<template>
    <view class="register-container">
        <!-- 顶部装饰 -->
        <view class="register-header">
            <view class="header-bg"></view>
            <view class="header-content">
                <view class="title">欢迎注册</view>
                <view class="subtitle">请填写以下信息完成注册</view>
            </view>
        </view>

        <!-- 表单内容 -->
        <view class="form-container">
            <u-form :model="formData" ref="form" :rules="rules" label-width="160">
                <!-- 用户名 -->
                <u-form-item label="用户名" prop="name" required>
                    <u-input v-model="formData.name" placeholder="请输入用户名" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 密码 -->
                <u-form-item label="密码" prop="pwd" required>
                    <u-input v-model="formData.pwd" type="password" placeholder="请输入密码" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 真实姓名 -->
                <u-form-item label="真实姓名" prop="realname" required>
                    <u-input v-model="formData.realname" placeholder="请输入真实姓名" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 性别 -->
                <u-form-item label="性别" prop="sex" required>
                    <u-radio-group v-model="formData.sex" placement="row">
                       <span class="u-radio-item">男： <u-radio name="男" active-color="#EE2F37" label="男" ></u-radio></span>
                       <span class="u-radio-item">女： <u-radio name="女" active-color="#EE2F37" label="女"> </u-radio></span>
                       
                    </u-radio-group>
                </u-form-item>

                <!-- 年龄 -->
                <u-form-item label="年龄" prop="age" required>
                    <u-input v-model="formData.age" type="number" placeholder="请输入年龄" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 身份证号 -->
                <u-form-item label="身份证号" prop="card" required>
                    <u-input v-model="formData.card" placeholder="请输入身份证号" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="18" />
                </u-form-item>

                <!-- 手机号 -->
                <u-form-item label="手机号" prop="phone" required>
                    <u-input v-model="formData.phone" type="number" placeholder="请输入手机号" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="11" />
                </u-form-item>

                <!-- 邮箱 -->
                <u-form-item label="邮箱" prop="email" required>
                    <u-input v-model="formData.email" type="text" placeholder="请输入邮箱地址" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
                </u-form-item>

                <!-- 地址 -->
                <u-form-item label="地址" prop="address" required>
                    <u-input v-model="formData.address" type="textarea" placeholder="请输入详细地址" :auto-height="true"
                        border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx', minHeight: '80rpx' }" />
                </u-form-item>

                <!-- 邮编 -->
                <u-form-item label="邮编" prop="code" required>
                    <u-input v-model="formData.code" type="number" placeholder="请输入邮编" border="none"
                        :custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }"
                        maxlength="6" />
                </u-form-item>

                <!-- 用户类型 -->
                <u-form-item label="用户类型" prop="type" required>
                    <u-radio-group v-model="formData.type" placement="row">
                      <span class="u-radio-item">我是用户： <u-radio name="0" active-color="#EE2F37" label="普通用户"></u-radio></span>
                      <span class="u-radio-item">我是商家： <u-radio name="1" active-color="#EE2F37" label="商家用户"></u-radio></span>
                    </u-radio-group>
                </u-form-item>
            </u-form>

            <!-- 提交按钮 -->
            <view class="submit-btn-container">
                <u-button type="primary"
                    :custom-style="{ background: '#EE2F37', borderRadius: '50rpx', height: '88rpx', fontSize: '32rpx' }"
                    @click="handleRegister">立即注册</u-button>
            </view>

            <!-- 登录链接 -->
            <view class="login-link" @click="goToLogin">
                <text>已有账号？立即登录</text>
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
                name: '',
                pwd: '',
                realname: '',
                sex: '男',
                age: '',
                card: '',
                address: '',
                phone: '',
                email: '',
                code: '',
                type: '0'
            },
            rules: {

                name: [{
                    required: true,
                    message: '请输入用户名',
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
                }],
                realname: [{
                    required: true,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }],
                sex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'change'
                }],
                age: [{
                    required: true,
                    message: '请输入年龄',
                    trigger: 'blur'
                }, {
                    pattern: /^[1-9]\d*$/,
                    message: '请输入有效的年龄',
                    trigger: 'blur'
                }],
                card: [{
                    required: true,
                    message: '请输入身份证号',
                    trigger: 'blur'
                }, {
                    pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                    message: '请输入正确的身份证号',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '请输入正确的手机号',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }, {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '请输入地址',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入邮编',
                    trigger: 'blur'
                }, {
                    pattern: /^\d{6}$/,
                    message: '请输入正确的6位邮编',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择用户类型',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        // 注册
        handleRegister() {
            this.$refs.form.validate().then(valid => {
                if (valid) {
                    uni.showLoading({
                        title: '注册中...'
                    });

                    userApi.register(this.formData).then(res => {
                        uni.hideLoading();
                        if (res && (res.code === 200 || res.statusCode === 200)) {
                            uni.showToast({
                                title: '注册成功',
                                icon: 'success'
                            });

                            // 延迟跳转到登录页
                            setTimeout(() => {
                                uni.redirectTo({
                                url: '/pages/login/login'
                            });
                            }, 1500);
                        }
                    }).catch(err => {
                        uni.hideLoading();
                        console.error('注册失败', err);
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
        goToLogin() {
            uni.navigateBack();
            // 或者使用跳转
            uni.redirectTo({
            	url: '/pages/login/login'
            });
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
