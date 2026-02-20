<template>
	<view class="u-wrap">
		<!-- header start -->
		<view class="header">
			<!-- <view v-if="subCurrent">
				<view class="header__title">北京市朝阳区万豪公馆7号楼1单元1201</view>
				<view class="header__info">
					<text class="header__name">Kaiyuan_Q</text>
					<text>188****8888</text>
				</view>
			</view> -->
			<view>
				<view class="header__title">{{shopName}}</view>
				<!-- <view class="header__info">距离您1.2km</view> -->
			</view>
			<view>
				<u-subsection :list="subList" :current="subCurrent" active-color="#EE2F37" mode="subsection" height="50"
					:bold="false" @change="subChange"></u-subsection>
			</view>
		</view>
		<!-- header end -->

		<!-- menu start -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				:show-scrollbar="false" enhanced>
				<view v-for="(item, index) in tabbar" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" :data-current="index">
					<view class="u-tab-item__content" @tap.stop="swichMenu(index)">
						<text class="tabMenu-name">{{ item.name }}</text>
					</view>
					<!-- 分类管理按钮（仅管理员可见） -->
					<view v-if="isAdmin" class="category-more-btn" @click.stop="showCategoryActionSheet(item)">
						<u-icon name="more-dot-fill" size="20" color="#909399"></u-icon>
					</view>
				</view>
				<!-- 添加分类按钮（仅管理员可见） -->
				<view v-if="isAdmin" class="add-category-btn" @click.stop="showAddCategoryPopup">
					<u-icon name="plus" size="24" color="#fff"></u-icon>
					<text class="add-category-btn__text">添加分类</text>
				</view>
				<u-gap height="300" bg-color="#FFFFFF"></u-gap>
			</scroll-view>
			<block v-for="(item, index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current == index" :show-scrollbar="false" enhanced>
					<view class="right-box__swiper">
						<u-swiper :list="bannerList" :height="180"></u-swiper>
					</view>
					<view class="page-view">
						<view class="item-title">
							<text>{{ item.name }}</text>
							<!-- 添加商品按钮（仅管理员可见） -->
							<view v-if="isAdmin" class="add-product-btn" @click="showAddProductPopup(item)">
								<u-icon name="plus" size="20" color="#EE2F37"></u-icon>
								<text>添加商品</text>
							</view>
						</view>
						<view class="class-item">
							<view class="class-item-box" v-for="(item1, index1) in item.foods" :key="index1">
								<!-- 管理按钮（仅管理员可见） -->
								<view v-if="isAdmin" class="product-admin-actions">
									<view class="product-admin-btn" @click.stop="showEditProductPopup(item1, item)">
										<u-icon name="edit-pen" size="18" color="#fff"></u-icon>
									</view>
									<view class="product-admin-btn product-admin-btn--delete" @click.stop="handleDeleteProduct(item1)">
										<u-icon name="trash" size="18" color="#fff"></u-icon>
									</view>
								</view>
								<image class="item-menu-image" :src="item1.icon" mode="aspectFill"></image>
								<view class="item-menu-name">
									<text class="item-menu-name__name">{{ item1.name }}</text>
									<view class="item-menu-name__desc u-line-2">
										{{ item1.desc }}
									</view>
									<view class="item-menu-price">
										<view class="item-menu-price__color">
											<text class="item-menu-price__text">￥</text>
											{{ item1.price }}
										</view>
										<view>
											<u-number-box :min="0" :max="100" disabled-input v-model="item1.value"
												:long-press="false" color="#fff" @plus="plusMenu(item1)"
												@minus="minusMenu(item1)"></u-number-box>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<u-gap height="200" bg-color="#FAFAFA"></u-gap>
				</scroll-view>
			</block>
		</view>
		<!-- menu end -->

		<!-- bottom start-->
		<view class="u-bottom">
			<view class="u-bottom__wrap" @click="MenuPopup">
				<view class="u-bottom__bags">
					<u-badge :count="menuNum" type="error" :offset="[-5, -10]"></u-badge>
					<u-icon name="/static/menu/bags.png" size="50"></u-icon>
				</view>
				<view class="u-bottom__price">
					<text>￥</text>
					{{ (Math.abs(menuPrice - discountAmount) === 0 ? '0.00' : (menuPrice - discountAmount).toFixed(2)) }}
					<text v-if="discountAmount > 0" class="u-bottom__discount">已优惠￥{{ discountAmount.toFixed(2) }}</text>
				</view>
				<view class="u-bottom__nums">共 {{ menuNum }} 件</view>
			</view>
			<view class="u-bottom__place" @click="settlement">
				去结算
			</view>
		</view>
		<!-- bottom start -->

		<!-- popup start -->
		<u-popup v-model="PopupShow" mode="bottom" height="70%" border-radius="14">
			<view class="popup-wrap">
				<!-- clearshoppingCar -->
				<view class="emptyShop" @click="clickEmptyShop">
					<u-icon name="trash" class="emptyShop__icon"></u-icon>清空购物车
				</view>
				<u-gap height="80"></u-gap>
				<!-- menulist -->
				<view class="menulist" v-for="(item, index) in SelectMenu" :key="index">
					<image class="item-menu-images" :src="item.icon" mode="aspectFill"></image>
					<view class="item-menu-name">
						<text class="item-menu-name__name">{{ item.name }}</text>
						<view class="item-menu-name__desc">
							{{ item.desc }}
						</view>
						<view class="item-menu-price">
							<view class="item-menu-price__color">
								<text class="item-menu-price__text">￥</text>
								{{ item.price }}
							</view>
							<view>
								<u-number-box :min="0" :max="100" disabled-input v-model="item.value"
									:long-press="false" color="#fff" @plus="plusMenu(item)"
									@minus="minusMenu(item)"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- popup end -->

		<!-- 添加/编辑分类弹窗 -->
		<u-popup v-model="showCategoryPopup" mode="center" width="80%" border-radius="20">
			<view class="admin-popup">
				<view class="admin-popup__title">{{ editingCategory ? '编辑分类' : '添加分类' }}</view>
				<u-form :model="categoryForm" ref="categoryForm" label-width="120">
					<u-form-item label="分类名称" prop="name" required>
						<u-input v-model="categoryForm.name" placeholder="请输入分类名称" :border="false"
							:custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
					</u-form-item>
				</u-form>
				<view class="admin-popup__actions">
					<u-button type="info" size="default" @click="showCategoryPopup = false">取消</u-button>
					<u-button type="primary" size="default" @click="handleSaveCategory">确定</u-button>
				</view>
			</view>
		</u-popup>

		<!-- 添加/编辑商品弹窗 -->
		<u-popup v-model="showProductPopup" mode="center" width="85%" border-radius="20">
			<view class="admin-popup">
				<view class="admin-popup__title">{{ editingProduct ? '编辑商品' : '添加商品' }}</view>
				<u-form :model="productForm" ref="productForm" label-width="120">
					<u-form-item label="商品名称" prop="name" required>
						<u-input v-model="productForm.name" placeholder="请输入商品名称" :border="false"
							:custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
					</u-form-item>
					<u-form-item label="分类" prop="typeid" required>
						<view class="category-selector" @click.stop="handleOpenCategoryPicker">
							<view class="category-selector__input">
								<text class="category-selector__text">{{ productForm.typeName || '请选择分类' }}</text>
							</view>
							<u-icon name="arrow-down" size="20" color="#909399" class="category-selector__icon"></u-icon>
						</view>
					</u-form-item>
					<u-form-item label="价格" prop="price" required>
						<u-input v-model="productForm.price" type="digit" placeholder="请输入价格" :border="false"
							:custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
					</u-form-item>
					<u-form-item label="会员价" prop="price1">
						<u-input v-model="productForm.price1" type="digit" placeholder="可选，请输入会员价" :border="false"
							:custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
					</u-form-item>
					<u-form-item label="商品简介" prop="brief">
						<u-input v-model="productForm.brief" type="textarea" placeholder="可选，请输入商品简介" :border="false"
							:custom-style="{ background: '#f5f5f5', borderRadius: '10rpx', padding: '20rpx' }" />
					</u-form-item>
					<u-form-item label="商品图片" prop="imgpath">
						<view class="product-image-upload">
							<image class="product-image-preview" :src="productForm.imgpath || defaultProductImage" mode="aspectFill"></image>
							<view class="product-image-actions">
								<u-button size="mini" type="primary" :loading="uploadingProductImage" :disabled="uploadingProductImage" @click="handleChooseProductImage">
									<u-icon name="cloud-upload" size="24" color="#fff" />上传图片
								</u-button>
								<text class="product-image-tip">支持 jpg/png，建议 2MB 以内</text>
							</view>
						</view>
					</u-form-item>
				</u-form>
				<view class="admin-popup__actions">
					<u-button type="info" size="default" @click="showProductPopup = false">取消</u-button>
					<u-button type="primary" size="default" @click="handleSaveProduct">确定</u-button>
				</view>
			</view>
		</u-popup>

		<!-- 分类选择弹窗 -->
		<u-popup 
			v-model="showCategoryPicker" 
			mode="bottom" 
			height="60%" 
			border-radius="20"
			:mask-close-able="true"
		>
			<view class="category-picker">
				<view class="category-picker__header">
					<view class="category-picker__title">选择分类</view>
					<view class="category-picker__close" @click.stop="showCategoryPicker = false">
						<u-icon name="close" size="24"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y class="category-picker__list">
					<view 
						v-for="category in categoryList" 
						:key="category.id"
						class="category-picker__item"
						:class="{'category-picker__item--selected': productForm.typeid === category.id}"
						@click.stop="handleCategorySelect(category)"
					>
						<text class="category-picker__name">{{ category.name }}</text>
						<u-icon v-if="productForm.typeid === category.id" name="checkmark" color="#EE2F37" size="24"></u-icon>
					</view>
					<view v-if="categoryList.length === 0" class="category-picker__empty">
						暂无分类
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<!-- 分类操作菜单 -->
		<u-action-sheet 
			v-model="showCategoryActionMenu" 
			:list="categoryActionList" 
			@click="handleCategoryAction"
			:title="selectedCategory ? `操作：${selectedCategory.name}` : '分类操作'"
		></u-action-sheet>
	</view>
</template>

<script>
import { UPLOAD_URL, SHOP_NAME } from '@/common/config.js'
import { menuApi, couponApi } from '@/common/api.js'
export default {
	data() {
		return {
			PopupShow: false,
			tabbar: [],
			scrollTop: 0,
			current: 0,
			menuHeight: 0,
			menuItemHeight: 0,
			menuNum: 0,
			menuPrice: 0,
			SelectMenu: [],
			// Sectioner
			subList: [{
				name: '堂食'
			},
			{
				name: '外卖'
			}
			],
			subCurrent: 0,
			// bannerList
			bannerList: [
				'/static/menu/banner-1.jpg',
				'/static/menu/banner-2.jpg',
				'/static/menu/banner-3.jpg'
			],
			// 管理员相关
			userType: null,
			// 分类弹窗
			showCategoryPopup: false,
			editingCategory: null, // 正在编辑的分类
			categoryForm: {
				id: null,
				name: '',
				image: ''
			},
			// 商品弹窗
			showProductPopup: false,
			editingProduct: null,
			editingCategory: null,
			productForm: {
				name: '',
				typeid: null,
				typeName: '',
				price: '',
				price1: '',
				brief: '',
				imgpath: ''
			},
			defaultProductImage: '/static/menu/index-dining.png',
			uploadingProductImage: false,
			// 优惠券相关
			userCoupons: [],
			bestCoupon: null,
			discountAmount: 0,
			// 分类列表
			categoryList: [],
			showCategoryPicker: false,
			// 分类操作菜单
			showCategoryActionMenu: false,
			selectedCategory: null,
			categoryActionList: [
				{
					text: '编辑分类',
					color: '#303133'
				},
				{
					text: '删除分类',
					color: '#EE2F37'
				}
			]
		}
	},
	computed: {
		// 判断是否为管理员（type === 2 或 type === 3）
		isAdmin() {
			return this.userType === 2 || this.userType === 3
		},
		// 店铺名称
		shopName() {
			return SHOP_NAME
		}
	},
	async onLoad() {
		// 获取用户类型
		this.userType = uni.getStorageSync('userType')
		const userInfo = uni.getStorageSync('userInfo')
		if (!this.userType && userInfo && userInfo.type !== undefined) {
			this.userType = userInfo.type
		}
		
		try {
			const res = await menuApi.getMenuList()
			if (res && res.data) {
				console.log(res.data, "res.data")
				const menuData = this.transformToMenuFormat(res.data);
				this.tabbar = menuData;
				console.log(menuData)
				this.clickEmptyShop();
			}
		} catch (error) {
			console.error('获取菜单列表失败', error)
		}
		
		// 获取用户优惠券
		this.fetchUserCoupons();
	},
	onUnload() {
		// init
		this.clickEmptyShop();
	},
	onShow() {
		this.subCurrent = uni.getStorageSync('subCurrent') || 0
		
		// 检查是否需要清空购物车（支付成功后）
		const shouldClearCart = uni.getStorageSync('shouldClearCart');
		if (shouldClearCart) {
			this.clickEmptyShop();
			// 清除标记
			uni.removeStorageSync('shouldClearCart');
		}
		
		// 检查是否需要返回结算页面（从个人信息页面返回且已填写地址）
		const needReturnToSettlement = uni.getStorageSync('needReturnToSettlement');
		if (needReturnToSettlement) {
			const userInfo = uni.getStorageSync('userInfo') || {};
			if (userInfo.address && userInfo.address.trim()) {
				// 地址已填写，清除标记并跳转到结算页面
				uni.removeStorageSync('needReturnToSettlement');
				const dishData = uni.getStorageSync('dishData');
				if (dishData && dishData.order && dishData.order.length > 0) {
					setTimeout(() => {
						uni.navigateTo({
							url: `/subPack/index/indexSettlement?subCurrent=${this.subCurrent}`
						});
					}, 300);
				}
			}
		}
		
		// 处理"再来一单"功能
		this.handleAgainOrder();
	},
	methods: {
		/**
		 * 转换后端数据为目标菜单格式
		 * @param {Object} backendData 后端返回的原始数据
		 * @returns {Array} 转换后的菜单数组
		 */
		transformToMenuFormat(backendData) {
			// 从后端数据中提取需要的字段
			const { typesList, flowersList } = backendData;

			// 遍历类型列表，生成对应的菜单结构
			return typesList.map(type => {
				// 筛选当前类型下的所有花束
				const relatedFlowers = flowersList.filter(flower => flower.typeid === type.id);

				// 转换花束数据为目标格式
				const foods = relatedFlowers.map(flower => ({
					id: flower.id,
					icon: flower.imgpath, // 使用花束图片路径作为图标
					name: flower.name,
					desc: flower.brief, // 使用简介作为描述
					price: flower.price1.toString(), // 使用优惠价作为显示价格
					value: 0, // 初始数量为0
					// 保存原始数据用于编辑
					originalPrice: flower.price,
					originalPrice1: flower.price1
				}));

				return {
					id: type.id, // 保存分类ID
					name: type.name, // 分类名称（如"安康（送给长辈）"）
					image: type.image, // 
					foods: foods // 该分类下的所有花束
				};
			})
		},
		subChange(param) {
			this.subCurrent = param;
			uni.setStorageSync('subCurrent', param);
		},
		/**
		 * 处理"再来一单"功能
		 * 从本地存储中读取订单商品数据，并添加到购物车
		 */
		handleAgainOrder() {
			const againOrderMenu = uni.getStorageSync('againOrderMenu');
			if (!againOrderMenu || !Array.isArray(againOrderMenu) || againOrderMenu.length === 0) {
				return;
			}
			
			// 等待菜单数据加载完成
			this.$nextTick(() => {
				if (!this.tabbar || this.tabbar.length === 0) {
					// 如果菜单数据还没加载，延迟执行
					setTimeout(() => {
						this.handleAgainOrder();
					}, 500);
					return;
				}
				// 清除本地存储，避免重复添加（在确认菜单数据已加载后才清除）
				uni.removeStorageSync('againOrderMenu');
				
				// 遍历订单商品，添加到购物车
				againOrderMenu.forEach(orderItem => {
					// 在所有分类中查找对应的商品
					for (let category of this.tabbar) {
						const product = category.foods.find(food => food.id == orderItem.id);
						if (product) {
							// 找到商品，设置数量并添加到购物车
							const quantity = orderItem.num || 1;
							for (let i = 0; i < quantity; i++) {
								this.plusMenu(product);
							}
							break;
						}
					}
				});
			});
		},
		// addvariety
		plusMenu(param) {
			this.menuNum++;
			this.menuPrice += Number(param.price);

			let found = this.SelectMenu.find(product => product.id == param.id);
			if (!found) {
				// 创建商品副本，避免引用问题
				const productCopy = {
					...param,
					value: 0
				};
				this.SelectMenu.push(productCopy);
				found = productCopy;
			}
			
			// 更新数量
			if (found) {
				found.value = (found.value || 0) + 1;
			}
			
			// 同步更新菜单中的数量显示
			this.syncMenuValue(param.id, found.value);
			
			// 重新计算最佳优惠券
			this.calculateBestCoupon();
		},
		/**
		 * 同步更新菜单中商品的数量显示
		 */
		syncMenuValue(productId, value) {
			for (let category of this.tabbar) {
				const product = category.foods.find(food => food.id == productId);
				if (product) {
					product.value = value;
					break;
				}
			}
		},
		// deletevariety
		minusMenu(param) {
			let product = this.SelectMenu.find(product => product.id == param.id);
			if (product) {
				this.menuNum--;
				this.menuPrice -= Number(product.price);
				product.value = (product.value || 1) - 1;
				
				// 同步更新菜单中的数量显示
				this.syncMenuValue(param.id, product.value);
				
				// 重新计算最佳优惠券
				this.calculateBestCoupon();
			}
		},
		// goSettle
		settlement() {
			if (this.menuNum === 0 || this.menuPrice === 0) return;

			const filteredMenu = this.SelectMenu.filter(item => item.value !== 0);
			if (!filteredMenu.length) return;

			// 如果是外送模式，检查用户是否填写了地址
			if (this.subCurrent === 1) {
				const userInfo = uni.getStorageSync('userInfo') || {};
				if (!userInfo.address || !userInfo.address.trim()) {
					uni.showModal({
						title: '提示',
						content: '外送订单需要填写配送地址，是否前往填写？',
						success: (res) => {
							if (res.confirm) {
								// 保存当前订单数据，以便返回后继续结算
								const dishData = {
									order: filteredMenu,
									menuNum: this.menuNum,
									menuPrice: this.menuPrice
								};
								uni.setStorageSync('dishData', dishData);
								uni.setStorageSync('needReturnToSettlement', true);
								// 跳转到个人信息页面
								uni.navigateTo({
									url: '/pages/profile/profile'
								});
							}
						}
					});
					return;
				}
			}

			const dishData = {
				order: filteredMenu,
				menuNum: this.menuNum,
				menuPrice: this.menuPrice
			};

			uni.setStorageSync('dishData', dishData);

			uni.navigateTo({
				url: `/subPack/index/indexSettlement?subCurrent=${this.subCurrent}`
			});
		},
		// clearshoppingCar
		clickEmptyShop() {
			// 同步清空菜单中所有商品的数量显示
			this.tabbar.forEach(category => {
				if (category.foods && Array.isArray(category.foods)) {
					category.foods.forEach(food => {
						food.value = 0;
					});
				}
			});
			
			// menuNuminit
			this.SelectMenu.forEach(food => {
				food.value = 0;
			});
			//init
			this.SelectMenu = [];
			this.PopupShow = false;
			this.menuNum = 0;
			this.menuPrice = 0;
			this.bestCoupon = null;
			this.discountAmount = 0;
			
			// 清空本地存储的订单数据
			uni.removeStorageSync('dishData');
		},
		// popup
		MenuPopup() {
			if (this.menuNum != 0 && this.menuPrice != 0) {
				this.PopupShow = true;
				// init
				this.SelectMenu = this.SelectMenu.filter(item => item.value !== 0);
			}
		},
		// clickLstMenuTabs
		async swichMenu(index) {
			if (index == this.current) return;
			this.current = index;
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
		},
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.' + elClass).fields({
					size: true
				}, res => {
					if (!res) {
						setTimeout(() => {
							this.getElRect(elClass);
						}, 10);
						return;
					}
					this[dataVal] = res.height;
				}).exec();
			})
		},
		// 获取用户优惠券
		async fetchUserCoupons() {
			const userId = this.getUserId();
			if (!userId) return;
			
			try {
				const res = await couponApi.getUserCoupons(userId)
				if (res && res.code === 200 && res.data) {
					const data = res.data;
					if (data.coupons && Array.isArray(data.coupons)) {
						this.userCoupons = data.coupons.filter(coupon => coupon.status === 0); // 只获取未使用的优惠券
						this.calculateBestCoupon();
					} else if (Array.isArray(data)) {
						this.userCoupons = data.filter(coupon => coupon.status === 0);
						this.calculateBestCoupon();
					}
				}
			} catch (error) {
				console.error('获取用户优惠券失败', error)
			}
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
		// 计算最佳优惠券（能使用且优惠力度最大）
		calculateBestCoupon() {
			if (this.menuPrice <= 0 || this.userCoupons.length === 0) {
				this.bestCoupon = null;
				this.discountAmount = 0;
				return;
			}
			
			let bestCoupon = null;
			let maxDiscount = 0;
			
			this.userCoupons.forEach(coupon => {
				// 检查是否可以使用：订单金额 >= 最低订单金额（如果有）
				const minOrderAmount = coupon.minOrderAmount || 0;
				if (this.menuPrice >= minOrderAmount) {
					// 找到优惠力度最大的
					if (coupon.discountAmount > maxDiscount) {
						maxDiscount = coupon.discountAmount;
						bestCoupon = coupon;
					}
				}
			});
			
			this.bestCoupon = bestCoupon;
			this.discountAmount = maxDiscount;
			
			// 将最佳优惠券信息存储到本地，供结算页使用
			if (bestCoupon) {
				uni.setStorageSync('selectedCoupon', bestCoupon);
			} else {
				uni.removeStorageSync('selectedCoupon');
			}
		},
		// ========== 管理员功能 ==========
		// 显示添加分类弹窗
		showAddCategoryPopup() {
			this.editingCategory = null
			this.categoryForm = {
				id: null,
				name: '',
				image: ''
			}
			this.showCategoryPopup = true
		},
		// 显示分类操作菜单
		showCategoryActionSheet(category) {
			this.selectedCategory = category
			this.showCategoryActionMenu = true
		},
		// 处理分类操作菜单点击
		handleCategoryAction(index) {
			if (!this.selectedCategory) return
			
			if (index === 0) {
				// 编辑分类
				this.showEditCategoryPopup(this.selectedCategory)
			} else if (index === 1) {
				// 删除分类
				this.handleDeleteCategory(this.selectedCategory)
			}
			this.showCategoryActionMenu = false
		},
		// 显示编辑分类弹窗
		showEditCategoryPopup(category) {
			this.editingCategory = category
			this.categoryForm = {
				id: category.id,
				name: category.name || '',
				image: category.image || ''
			}
			this.showCategoryPopup = true
		},
		// 保存分类（添加或编辑）
		async handleSaveCategory() {
			if (!this.categoryForm.name || !this.categoryForm.name.trim()) {
				uni.showToast({
					title: '请输入分类名称',
					icon: 'none'
				})
				return
			}
			
			const isEdit = !!this.editingCategory
			
			try {
				let res
				if (isEdit) {
					// 编辑分类
					res = await menuApi.updateCategory({
						id: this.categoryForm.id,
						name: this.categoryForm.name.trim()
					})
				} else {
					// 添加分类
					res = await menuApi.addCategory({
						name: this.categoryForm.name.trim(),
						image: this.categoryForm.image.trim() || undefined
					})
				}
				
				if (res && res.code === 200) {
					uni.showToast({
						title: isEdit ? '更新成功' : '添加成功',
						icon: 'success'
					})
					this.showCategoryPopup = false
					// 刷新菜单数据
					setTimeout(() => {
						this.refreshMenuData()
					}, 1500)
				} else {
					uni.showToast({
						title: res?.message || (isEdit ? '更新失败' : '添加失败'),
						icon: 'none'
					})
				}
			} catch (error) {
				console.error(isEdit ? '更新分类失败' : '添加分类失败', error)
				uni.showToast({
					title: '操作失败，请重试',
					icon: 'none'
				})
			}
		},
		// 删除分类
		async handleDeleteCategory(category) {
			// 检查分类下是否有商品
			const categoryProducts = this.tabbar.find(item => item.id === category.id)?.foods || []
			if (categoryProducts.length > 0) {
				uni.showModal({
					title: '无法删除',
					content: `该分类下还有 ${categoryProducts.length} 个商品，请先删除或移动这些商品后再删除分类`,
					showCancel: false,
					confirmText: '知道了'
				})
				return
			}
			
			uni.showModal({
				title: '确认删除',
				content: `确定要删除分类"${category.name}"吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await menuApi.deleteCategory(category.id)
							if (result && result.code === 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								})
								// 刷新菜单数据
								setTimeout(() => {
									this.refreshMenuData()
								}, 1500)
							} else {
								uni.showToast({
									title: result?.message || '删除失败',
									icon: 'none'
								})
							}
						} catch (error) {
							console.error('删除分类失败', error)
							uni.showToast({
								title: '删除失败，请重试',
								icon: 'none'
							})
						}
					}
				}
			})
		},
		// 显示添加商品弹窗
		async showAddProductPopup(category) {
			this.editingProduct = null
			this.editingCategory = category
			// 获取分类列表
			await this.fetchCategoryList()
			this.productForm = {
				name: '',
				typeid: this.getCategoryId(category),
				typeName: category.name,
				price: '',
				price1: '',
				brief: '',
				imgpath: ''
			}
			this.showProductPopup = true
		},
		// 显示编辑商品弹窗
		async showEditProductPopup(product, category) {
			this.editingProduct = product
			this.editingCategory = category
			// 获取分类列表
			await this.fetchCategoryList()
			// 需要从原始数据中获取完整信息，这里先使用现有数据
			// 确保 price 和 price1 转换为字符串，以便在输入框中正常显示
			this.productForm = {
				name: product.name || '',
				typeid: this.getCategoryId(category),
				typeName: category.name || category || '',
				price: String(product.originalPrice || product.price || ''),
				price1: String(product.originalPrice1 || product.price || ''),
				brief: product.desc || '',
				imgpath: product.icon || ''
			}
			this.showProductPopup = true
		},
		// 获取分类列表
		async fetchCategoryList() {
			try {
				const res = await menuApi.getCategoryList()
				if (res && res.code === 200 && res.data) {
					this.categoryList = Array.isArray(res.data) ? res.data : []
				}
			} catch (error) {
				console.error('获取分类列表失败', error)
				uni.showToast({
					title: '获取分类列表失败',
					icon: 'none'
				})
			}
		},
		// 打开分类选择器
		handleOpenCategoryPicker() {
			console.log('打开分类选择器', this.categoryList.length)
			// 确保分类列表已加载
			if (this.categoryList.length === 0) {
				this.fetchCategoryList().then(() => {
					console.log('分类列表加载完成', this.categoryList)
					this.showCategoryPicker = true
				}).catch(() => {
					uni.showToast({
						title: '获取分类列表失败',
						icon: 'none'
					})
				})
			} else {
				this.showCategoryPicker = true
			}
		},
		// 选择分类
		handleCategorySelect(category) {
			if (category && category.id) {
				// 更新分类ID和分类名称
				this.productForm.typeid = Number(category.id)
				this.productForm.typeName = category.name
				console.log('选择分类:', category.name, 'typeid:', this.productForm.typeid)
				// 关闭分类选择弹窗
				this.showCategoryPicker = false
			}
		},
		// 获取分类ID
		getCategoryId(category) {
			// 如果 category 是对象且有 id 属性，直接返回
			if (category && category.id) {
				return category.id
			}
			// 否则从 tabbar 中查找
			const found = this.tabbar.find(t => t.name === category.name || (category && t.id === category))
			return found ? (found.id || null) : null
		},
		// 保存商品（添加或编辑）
		async handleSaveProduct() {
			console.log('保存商品 - productForm:', this.productForm)
			if (!this.productForm.name || !String(this.productForm.name).trim()) {
				uni.showToast({
					title: '请输入商品名称',
					icon: 'none'
				})
				return
			}
			if (!this.productForm.typeid) {
				uni.showToast({
					title: '请选择分类',
					icon: 'none'
				})
				return
			}
			// 将 price 转换为字符串后再检查，因为可能是数字类型
			const priceStr = String(this.productForm.price || '')
			if (!priceStr || !priceStr.trim() || isNaN(Number(priceStr))) {
				uni.showToast({
					title: '请输入有效的价格',
					icon: 'none'
				})
				return
			}
			
			const isEdit = !!this.editingProduct
			
			// 构建请求数据，确保 typeid 被正确包含
			const data = {
				name: String(this.productForm.name).trim(),
				typeid: Number(this.productForm.typeid), // 确保 typeid 是数字类型
				price: Number(this.productForm.price) // price 可能是字符串或数字，统一转换为数字
			}
			
			// 如果是编辑模式，添加商品ID
			if (isEdit && this.editingProduct) {
				data.id = this.editingProduct.id
			}
			
			// 添加可选字段
			if (this.productForm.price1) {
				data.price1 = Number(this.productForm.price1)
			}
			if (this.productForm.brief) {
				data.brief = String(this.productForm.brief).trim()
			}
			if (this.productForm.imgpath) {
				data.imgpath = this.productForm.imgpath.trim()
			}
			
			console.log('发送请求数据:', data, 'isEdit:', isEdit)
			
			try {
				const res = isEdit 
					? await menuApi.updateProduct(data)
					: await menuApi.addProduct(data)
				if (res && res.code === 200) {
					uni.showToast({
						title: isEdit ? '更新成功' : '添加成功',
						icon: 'success'
					})
					this.showProductPopup = false
					// 刷新菜单数据
					setTimeout(() => {
						this.refreshMenuData()
					}, 1500)
				} else {
					uni.showToast({
						title: res?.message || (isEdit ? '更新失败' : '添加失败'),
						icon: 'none'
					})
				}
			} catch (error) {
				console.error('保存商品失败', error)
				uni.showToast({
					title: '操作失败，请重试',
					icon: 'none'
				})
			}
		},
		// 删除商品
		async handleDeleteProduct(product) {
			uni.showModal({
				title: '确认删除',
				content: `确定要删除商品"${product.name}"吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await menuApi.deleteProduct(product.id)
							if (result && result.code === 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'success'
								})
								// 刷新菜单数据
								setTimeout(() => {
									this.refreshMenuData()
								}, 1500)
							}
						} catch (error) {
							console.error('删除商品失败', error)
						}
					}
				}
			})
		},
		// 刷新菜单数据
		async refreshMenuData() {
			try {
				const res = await menuApi.getMenuList()
				if (res && res.data) {
					const menuData = this.transformToMenuFormat(res.data)
					this.tabbar = menuData
				}
			} catch (error) {
				console.error('刷新菜单数据失败', error)
			}
		},
		// 选择商品图片
		handleChooseProductImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const tempFilePath = res.tempFilePaths && res.tempFilePaths[0]
					if (tempFilePath) {
						this.uploadProductImage(tempFilePath)
					}
				}
			})
		},
		// 上传商品图片
		uploadProductImage(filePath) {
			this.uploadingProductImage = true
			uni.showLoading({ title: '上传中...' })
			uni.uploadFile({
				url: UPLOAD_URL,
				filePath,
				name: 'file',
				success: (uploadRes) => {
					let response = {}
					try {
						response = typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data
					} catch (error) {
						response = {}
					}
					const imageUrl = response?.data?.url || response?.url || response?.data
					if ((response.code === 200 && imageUrl) || imageUrl) {
						this.productForm.imgpath = imageUrl
						uni.showToast({
							title: '上传成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: response.message || '上传失败，请重试',
							icon: 'none'
						})
					}
				},
				fail: () => {
					uni.showToast({
						title: '上传失败，请检测网络',
						icon: 'none'
					})
				},
				complete: () => {
					this.uploadingProductImage = false
					uni.hideLoading()
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.u-wrap {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}

.header {
	display: flex;
	justify-content: space-between;
	padding: 30rpx;

	&__title {
		font-weight: bold;
	}

	&__info {
		font-size: 24rpx;
		color: $u-type-info;
		margin-top: 15rpx;
	}

	&__name {
		margin-right: 15rpx;
	}
}

.menuimg {
	margin-bottom: 10rpx;
}

.logo {
	margin: -80rpx 0 15rpx 50rpx;

	image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 20rpx solid #fff;
	}
}

.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
	background-color: #FFFFFF;
}

.tabMenu-name {
	text-align: center;
	padding: 0 10rpx;
}

.u-tab-item {
	height: 120rpx;
	background: #FFFFFF;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-size: 22rpx;
	font-weight: 400;
	color: #8D9699;
	line-height: 1;
	position: relative;
	padding: 0 10rpx;
	
	&__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
}

.u-tab-item-active {
	position: relative;
	color: #EE2F37;
	font-size: 22rpx;
	font-weight: 600;
	background: #FAFAFA;
}

.u-tab-item-active::before {
	content: "";
	position: absolute;
	border-left: 2px solid #EE2F37;
	height: 120rpx;
	left: 0;
	top: 0;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color: #FAFAFA;

	&__swiper {
		margin: 0 30rpx;
	}
}

.item-title {
	font-size: 22rpx;
	color: $u-main-color;
	font-weight: bold;
	padding: 16rpx 16rpx 0 16rpx;
}

.page-view {
	padding: 16rpx;
}

.class-item {
	margin-bottom: 30rpx;
	padding: 16rpx;
	border-radius: 8rpx;
}

.class-item-box {
	display: flex;
	background-color: white;
	padding: 20rpx;
	margin-bottom: 20rpx;
	box-shadow: 2px 0px 8px 0px rgba(244, 244, 245, 0.75);
	border-radius: 14rpx;
}

.item-menu-name {
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	width: 100%;

	&__name {
		font-weight: bold;
		font-size: 30rpx;
	}

	&__desc {
		margin: 20rpx 0;
		font-size: 20rpx;
		color: $u-type-info;
	}
}

.item-menu-price {
	display: flex;
	justify-content: space-between;

	&__color {
		font-weight: bold;
		font-size: 36rpx;
		color: #EE2F37;
	}

	&__text {
		font-size: 22rpx;
	}
}

.item-menu-image {
	width: 50%;
	height: 160rpx;
	border-radius: 20rpx;
}

.item-menu-images {
	width: 30%;
	height: 130rpx;
	border-radius: 20rpx;
}

.u-bottom {
	position: fixed;
	z-index: 7777;
	/* #ifdef MP-WEIXIN */
	bottom: 30rpx;
	/* #endif */
	/* #ifdef H5 */
	bottom: 130rpx;
	/* #endif */
	width: 92%;
	left: 0;
	right: 0;
	margin: 0 auto;
	display: flex;
	box-shadow: 2px 0px 8px 0px rgba(200, 201, 204, 0.75);
	border-radius: 14rpx;
	background-color: white;

	&__bags {
		position: relative;
		// display: flex;
		// flex-direction: column;
		// justify-content: space-around;
		// border: 1px solid #f00;
	}

	&__price {
		font-weight: bold;
		font-size: 40rpx;
		margin-left: 20rpx;

		text {
			font-size: 24rpx;
		}
	}

	&__discount {
		font-size: 22rpx;
		color: #67c23a;
		margin-left: 10rpx;
	}

	&__nums {
		border-left: 1px solid #303133;
		font-size: 24rpx;
		margin-left: 20rpx;
		padding-left: 20rpx;
		font-weight: bold;
	}

	&__wrap,
	&__place {
		display: flex;
		color: #303133;
	}

	&__wrap {
		width: 80%;
		padding: 20rpx 0 20rpx 30rpx;
		align-items: center;
	}

	&__place {
		background-color: #EE2F37;
		width: 20%;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		color: white;
		border-top-right-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
	}
}

.popup-wrap {
	margin: 20rpx 30rpx 0 30rpx;
	padding-bottom: 30rpx;
}

.emptyShop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	color: $u-type-info;
	font-size: 24rpx;
	border-bottom: 1px solid #f3f4f6;
	z-index: 2;
	padding: 20rpx;
	display: flex;
	justify-content: flex-end;

	&__icon {
		margin-right: 20rpx;
	}
}

.menulist {
	display: flex;
	margin-bottom: 30rpx;
}

// 管理员功能样式
.add-category-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20rpx 10rpx;
	padding: 20rpx;
	background: linear-gradient(135deg, #ee2f37, #ff7b55);
	border-radius: 20rpx;
	color: #fff;
	font-size: 24rpx;
	cursor: pointer;

	&__text {
		margin-left: 10rpx;
	}
}

.category-more-btn {
	width: 50rpx;
	height: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10rpx;
	margin-right: 10rpx;
	border-radius: 8rpx;
	transition: all 0.3s;
	
	&:active {
		background: rgba(0, 0, 0, 0.05);
		transform: scale(0.95);
	}
}

.add-product-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 10rpx 20rpx;
	background: #fff;
	border: 2rpx solid #ee2f37;
	border-radius: 20rpx;
	color: #ee2f37;
	font-size: 24rpx;
	cursor: pointer;
}

.item-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.product-admin-actions {
	position: absolute;
	top: 10rpx;
	right: 10rpx;
	display: flex;
	gap: 10rpx;
	z-index: 10;
}

.product-admin-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 50%;
	backdrop-filter: blur(10rpx);

	&--delete {
		background: rgba(238, 47, 55, 0.8);
	}
}

.class-item-box {
	position: relative;
}

.admin-popup {
	padding: 40rpx;
	background: #fff;
	border-radius: 20rpx;

	&__title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 40rpx;
		color: #303133;
	}

	&__actions {
		display: flex;
		justify-content: space-between;
		gap: 20rpx;
		margin-top: 40rpx;
	}
}

.product-image-upload {
	display: flex;
	align-items: center;
	gap: 30rpx;
}

.product-image-preview {
	width: 150rpx;
	height: 150rpx;
	border-radius: 20rpx;
	background-color: #f5f5f5;
	object-fit: cover;
}

.product-image-actions {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.product-image-tip {
	font-size: 24rpx;
	color: #909399;
}

.category-selector {
	position: relative;
	width: 100%;
	cursor: pointer;
	
	&__input {
		background: #f5f5f5;
		border-radius: 10rpx;
		padding: 20rpx;
		min-height: 80rpx;
		display: flex;
		align-items: center;
	}
	
	&__text {
		font-size: 28rpx;
		color: #303133;
		flex: 1;
		
		&:empty::before {
			content: '请选择分类';
			color: #909399;
		}
	}
	
	&__icon {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		pointer-events: none;
	}
}

.category-picker {
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
		color: #303133;
	}

	&__close {
		padding: 10rpx;
	}

	&__list {
		flex: 1;
	}

	&__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 20rpx;
		margin-bottom: 10rpx;
		background: #fff;
		border: 2rpx solid #e0e0e0;
		border-radius: 16rpx;
		transition: all 0.3s;

		&--selected {
			border-color: #EE2F37;
			background: #fdf3f3;
		}

		&:active {
			background: #f5f5f5;
		}
	}

	&__name {
		font-size: 28rpx;
		color: #303133;
	}

	&__empty {
		text-align: center;
		padding: 100rpx 0;
		color: #909399;
		font-size: 28rpx;
	}
}
</style>