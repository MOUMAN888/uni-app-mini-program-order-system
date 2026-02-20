(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/menu/menu"],{

/***/ 80:
/*!*************************************************************************************!*\
  !*** E:/EngineeringPractice/ordering-system/main.js?{"page":"pages%2Fmenu%2Fmenu"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/uni-stat/dist/uni-stat.es.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _menu = _interopRequireDefault(__webpack_require__(/*! ./pages/menu/menu.vue */ 81));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_menu.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 81:
/*!******************************************************************!*\
  !*** E:/EngineeringPractice/ordering-system/pages/menu/menu.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.vue?vue&type=template&id=368aef34&scoped=true& */ 82);
/* harmony import */ var _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.vue?vue&type=script&lang=js& */ 84);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.vue?vue&type=style&index=0&id=368aef34&lang=scss&scoped=true& */ 86);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "368aef34",
  null,
  false,
  _menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/menu/menu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 82:
/*!*************************************************************************************************************!*\
  !*** E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=template&id=368aef34&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./menu.vue?vue&type=template&id=368aef34&scoped=true& */ 83);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_template_id_368aef34_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 83:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=template&id=368aef34&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uSubsection: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-subsection/u-subsection */ "node-modules/uview-ui/components/u-subsection/u-subsection").then(__webpack_require__.bind(null, /*! uview-ui/components/u-subsection/u-subsection.vue */ 234))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-icon/u-icon */ "node-modules/uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! uview-ui/components/u-icon/u-icon.vue */ 241))
    },
    uGap: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-gap/u-gap */ "node-modules/uview-ui/components/u-gap/u-gap").then(__webpack_require__.bind(null, /*! uview-ui/components/u-gap/u-gap.vue */ 220))
    },
    uSwiper: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-swiper/u-swiper */ "node-modules/uview-ui/components/u-swiper/u-swiper").then(__webpack_require__.bind(null, /*! uview-ui/components/u-swiper/u-swiper.vue */ 192))
    },
    uNumberBox: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-number-box/u-number-box */ "node-modules/uview-ui/components/u-number-box/u-number-box").then(__webpack_require__.bind(null, /*! uview-ui/components/u-number-box/u-number-box.vue */ 248))
    },
    uBadge: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-badge/u-badge */ "node-modules/uview-ui/components/u-badge/u-badge").then(__webpack_require__.bind(null, /*! uview-ui/components/u-badge/u-badge.vue */ 255))
    },
    uPopup: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-popup/u-popup */ "node-modules/uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! uview-ui/components/u-popup/u-popup.vue */ 262))
    },
    uForm: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-form/u-form */ "node-modules/uview-ui/components/u-form/u-form").then(__webpack_require__.bind(null, /*! uview-ui/components/u-form/u-form.vue */ 269))
    },
    uFormItem: function () {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-form-item/u-form-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-form-item/u-form-item.vue */ 276))
    },
    uInput: function () {
      return Promise.all(/*! import() | node-modules/uview-ui/components/u-input/u-input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("node-modules/uview-ui/components/u-input/u-input")]).then(__webpack_require__.bind(null, /*! uview-ui/components/u-input/u-input.vue */ 287))
    },
    uButton: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-button/u-button */ "node-modules/uview-ui/components/u-button/u-button").then(__webpack_require__.bind(null, /*! uview-ui/components/u-button/u-button.vue */ 294))
    },
    uActionSheet: function () {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-action-sheet/u-action-sheet */ "node-modules/uview-ui/components/u-action-sheet/u-action-sheet").then(__webpack_require__.bind(null, /*! uview-ui/components/u-action-sheet/u-action-sheet.vue */ 301))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = Math.abs(_vm.menuPrice - _vm.discountAmount)
  var g1 = !(g0 === 0) ? (_vm.menuPrice - _vm.discountAmount).toFixed(2) : null
  var g2 = _vm.discountAmount > 0 ? _vm.discountAmount.toFixed(2) : null
  var g3 = _vm.categoryList.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showCategoryPopup = false
    }
    _vm.e1 = function ($event) {
      _vm.showProductPopup = false
    }
    _vm.e2 = function ($event) {
      $event.stopPropagation()
      _vm.showCategoryPicker = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 84:
/*!*******************************************************************************************!*\
  !*** E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./menu.vue?vue&type=script&lang=js& */ 85);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 85:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 47));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 49));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _config = __webpack_require__(/*! @/common/config.js */ 77);
var _api = __webpack_require__(/*! @/common/api.js */ 75);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var _default = {
  data: function data() {
    var _ref;
    return _ref = {
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
      }
      // {
      // 	name: '外卖'
      // }
      ],

      subCurrent: 0,
      // bannerList
      bannerList: ['/static/menu/banner-1.jpg', '/static/menu/banner-2.jpg', '/static/menu/banner-3.jpg'],
      // 管理员相关
      userType: null,
      // 分类弹窗
      showCategoryPopup: false,
      editingCategory: null,
      // 正在编辑的分类
      categoryForm: {
        id: null,
        name: '',
        image: ''
      },
      // 商品弹窗
      showProductPopup: false,
      editingProduct: null
    }, (0, _defineProperty2.default)(_ref, "editingCategory", null), (0, _defineProperty2.default)(_ref, "productForm", {
      name: '',
      typeid: null,
      typeName: '',
      price: '',
      price1: '',
      brief: '',
      imgpath: ''
    }), (0, _defineProperty2.default)(_ref, "defaultProductImage", '/static/menu/index-dining.png'), (0, _defineProperty2.default)(_ref, "uploadingProductImage", false), (0, _defineProperty2.default)(_ref, "userCoupons", []), (0, _defineProperty2.default)(_ref, "bestCoupon", null), (0, _defineProperty2.default)(_ref, "discountAmount", 0), (0, _defineProperty2.default)(_ref, "categoryList", []), (0, _defineProperty2.default)(_ref, "showCategoryPicker", false), (0, _defineProperty2.default)(_ref, "showCategoryActionMenu", false), (0, _defineProperty2.default)(_ref, "selectedCategory", null), (0, _defineProperty2.default)(_ref, "categoryActionList", [{
      text: '编辑分类',
      color: '#303133'
    }, {
      text: '删除分类',
      color: '#EE2F37'
    }]), _ref;
  },
  computed: {
    // 判断是否为管理员（type === 2 或 type === 3）
    isAdmin: function isAdmin() {
      return this.userType === 2 || this.userType === 3;
    },
    // 店铺名称
    shopName: function shopName() {
      return _config.SHOP_NAME;
    }
  },
  onLoad: function onLoad() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var userInfo, res, menuData;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 获取用户类型
              _this.userType = uni.getStorageSync('userType');
              userInfo = uni.getStorageSync('userInfo');
              if (!_this.userType && userInfo && userInfo.type !== undefined) {
                _this.userType = userInfo.type;
              }
              _context.prev = 3;
              _context.next = 6;
              return _api.menuApi.getMenuList();
            case 6:
              res = _context.sent;
              if (res && res.data) {
                console.log(res.data, "res.data");
                menuData = _this.transformToMenuFormat(res.data);
                _this.tabbar = menuData;
                console.log(menuData);
                _this.clickEmptyShop();
              }
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.error('获取菜单列表失败', _context.t0);
            case 13:
              // 获取用户优惠券
              _this.fetchUserCoupons();
            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }))();
  },
  onUnload: function onUnload() {
    // init
    this.clickEmptyShop();
  },
  onShow: function onShow() {
    this.subCurrent = uni.getStorageSync('subCurrent') || 0;

    // 检查是否需要清空购物车（支付成功后）
    var shouldClearCart = uni.getStorageSync('shouldClearCart');
    if (shouldClearCart) {
      this.clickEmptyShop();
      // 清除标记
      uni.removeStorageSync('shouldClearCart');
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
    transformToMenuFormat: function transformToMenuFormat(backendData) {
      // 从后端数据中提取需要的字段
      var typesList = backendData.typesList,
        flowersList = backendData.flowersList;

      // 遍历类型列表，生成对应的菜单结构
      return typesList.map(function (type) {
        // 筛选当前类型下的所有花束
        var relatedFlowers = flowersList.filter(function (flower) {
          return flower.typeid === type.id;
        });

        // 转换花束数据为目标格式
        var foods = relatedFlowers.map(function (flower) {
          return {
            id: flower.id,
            icon: flower.imgpath,
            // 使用花束图片路径作为图标
            name: flower.name,
            desc: flower.brief,
            // 使用简介作为描述
            price: flower.price1.toString(),
            // 使用优惠价作为显示价格
            value: 0,
            // 初始数量为0
            // 保存原始数据用于编辑
            originalPrice: flower.price,
            originalPrice1: flower.price1
          };
        });
        return {
          id: type.id,
          // 保存分类ID
          name: type.name,
          // 分类名称（如"安康（送给长辈）"）
          image: type.image,
          // 
          foods: foods // 该分类下的所有花束
        };
      });
    },
    subChange: function subChange(param) {
      this.subCurrent = param;
      uni.setStorageSync('subCurrent', param);
    },
    /**
     * 处理"再来一单"功能
     * 从本地存储中读取订单商品数据，并添加到购物车
     */
    handleAgainOrder: function handleAgainOrder() {
      var _this2 = this;
      var againOrderMenu = uni.getStorageSync('againOrderMenu');
      if (!againOrderMenu || !Array.isArray(againOrderMenu) || againOrderMenu.length === 0) {
        return;
      }

      // 等待菜单数据加载完成
      this.$nextTick(function () {
        if (!_this2.tabbar || _this2.tabbar.length === 0) {
          // 如果菜单数据还没加载，延迟执行
          setTimeout(function () {
            _this2.handleAgainOrder();
          }, 500);
          return;
        }
        // 清除本地存储，避免重复添加（在确认菜单数据已加载后才清除）
        uni.removeStorageSync('againOrderMenu');

        // 遍历订单商品，添加到购物车
        againOrderMenu.forEach(function (orderItem) {
          // 在所有分类中查找对应的商品
          var _iterator = _createForOfIteratorHelper(_this2.tabbar),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var category = _step.value;
              var product = category.foods.find(function (food) {
                return food.id == orderItem.id;
              });
              if (product) {
                // 找到商品，设置数量并添加到购物车
                var quantity = orderItem.num || 1;
                for (var i = 0; i < quantity; i++) {
                  _this2.plusMenu(product);
                }
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      });
    },
    // addvariety
    plusMenu: function plusMenu(param) {
      this.menuNum++;
      this.menuPrice += Number(param.price);
      var found = this.SelectMenu.find(function (product) {
        return product.id == param.id;
      });
      if (!found) {
        // 创建商品副本，避免引用问题
        var productCopy = _objectSpread(_objectSpread({}, param), {}, {
          value: 0
        });
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
    syncMenuValue: function syncMenuValue(productId, value) {
      var _iterator2 = _createForOfIteratorHelper(this.tabbar),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var category = _step2.value;
          var product = category.foods.find(function (food) {
            return food.id == productId;
          });
          if (product) {
            product.value = value;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    // deletevariety
    minusMenu: function minusMenu(param) {
      var product = this.SelectMenu.find(function (product) {
        return product.id == param.id;
      });
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
    settlement: function settlement() {
      if (this.menuNum === 0 || this.menuPrice === 0) return;
      var filteredMenu = this.SelectMenu.filter(function (item) {
        return item.value !== 0;
      });
      if (!filteredMenu.length) return;
      var dishData = {
        order: filteredMenu,
        menuNum: this.menuNum,
        menuPrice: this.menuPrice
      };
      uni.setStorageSync('dishData', dishData);
      uni.navigateTo({
        url: "/subPack/index/indexSettlement?subCurrent=".concat(this.subCurrent)
      });
    },
    // clearshoppingCar
    clickEmptyShop: function clickEmptyShop() {
      // 同步清空菜单中所有商品的数量显示
      this.tabbar.forEach(function (category) {
        if (category.foods && Array.isArray(category.foods)) {
          category.foods.forEach(function (food) {
            food.value = 0;
          });
        }
      });

      // menuNuminit
      this.SelectMenu.forEach(function (food) {
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
    MenuPopup: function MenuPopup() {
      if (this.menuNum != 0 && this.menuPrice != 0) {
        this.PopupShow = true;
        // init
        this.SelectMenu = this.SelectMenu.filter(function (item) {
          return item.value !== 0;
        });
      }
    },
    // clickLstMenuTabs
    swichMenu: function swichMenu(index) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(index == _this3.current)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _this3.current = index;
                if (!(_this3.menuHeight == 0 || _this3.menuItemHeight == 0)) {
                  _context2.next = 8;
                  break;
                }
                _context2.next = 6;
                return _this3.getElRect('menu-scroll-view', 'menuHeight');
              case 6:
                _context2.next = 8;
                return _this3.getElRect('u-tab-item', 'menuItemHeight');
              case 8:
                _this3.scrollTop = index * _this3.menuItemHeight + _this3.menuItemHeight / 2 - _this3.menuHeight / 2;
              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getElRect: function getElRect(elClass, dataVal) {
      var _this4 = this;
      new Promise(function (resolve, reject) {
        var query = uni.createSelectorQuery().in(_this4);
        query.select('.' + elClass).fields({
          size: true
        }, function (res) {
          if (!res) {
            setTimeout(function () {
              _this4.getElRect(elClass);
            }, 10);
            return;
          }
          _this4[dataVal] = res.height;
        }).exec();
      });
    },
    // 获取用户优惠券
    fetchUserCoupons: function fetchUserCoupons() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var userId, res, data;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _this5.getUserId();
                if (userId) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return");
              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return _api.couponApi.getUserCoupons(userId);
              case 6:
                res = _context3.sent;
                if (res && res.code === 200 && res.data) {
                  data = res.data;
                  if (data.coupons && Array.isArray(data.coupons)) {
                    _this5.userCoupons = data.coupons.filter(function (coupon) {
                      return coupon.status === 0;
                    }); // 只获取未使用的优惠券
                    _this5.calculateBestCoupon();
                  } else if (Array.isArray(data)) {
                    _this5.userCoupons = data.filter(function (coupon) {
                      return coupon.status === 0;
                    });
                    _this5.calculateBestCoupon();
                  }
                }
                _context3.next = 13;
                break;
              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](3);
                console.error('获取用户优惠券失败', _context3.t0);
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 10]]);
      }))();
    },
    // 获取用户ID
    getUserId: function getUserId() {
      var userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        return userInfo.id || userInfo.userId || userInfo.userID;
      }
      var token = uni.getStorageSync('token');
      return token || null;
    },
    // 计算最佳优惠券（能使用且优惠力度最大）
    calculateBestCoupon: function calculateBestCoupon() {
      var _this6 = this;
      if (this.menuPrice <= 0 || this.userCoupons.length === 0) {
        this.bestCoupon = null;
        this.discountAmount = 0;
        return;
      }
      var bestCoupon = null;
      var maxDiscount = 0;
      this.userCoupons.forEach(function (coupon) {
        // 检查是否可以使用：订单金额 >= 最低订单金额（如果有）
        var minOrderAmount = coupon.minOrderAmount || 0;
        if (_this6.menuPrice >= minOrderAmount) {
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
    showAddCategoryPopup: function showAddCategoryPopup() {
      this.editingCategory = null;
      this.categoryForm = {
        id: null,
        name: '',
        image: ''
      };
      this.showCategoryPopup = true;
    },
    // 显示分类操作菜单
    showCategoryActionSheet: function showCategoryActionSheet(category) {
      this.selectedCategory = category;
      this.showCategoryActionMenu = true;
    },
    // 处理分类操作菜单点击
    handleCategoryAction: function handleCategoryAction(index) {
      if (!this.selectedCategory) return;
      if (index === 0) {
        // 编辑分类
        this.showEditCategoryPopup(this.selectedCategory);
      } else if (index === 1) {
        // 删除分类
        this.handleDeleteCategory(this.selectedCategory);
      }
      this.showCategoryActionMenu = false;
    },
    // 显示编辑分类弹窗
    showEditCategoryPopup: function showEditCategoryPopup(category) {
      this.editingCategory = category;
      this.categoryForm = {
        id: category.id,
        name: category.name || '',
        image: category.image || ''
      };
      this.showCategoryPopup = true;
    },
    // 保存分类（添加或编辑）
    handleSaveCategory: function handleSaveCategory() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var isEdit, res, _res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!_this7.categoryForm.name || !_this7.categoryForm.name.trim())) {
                  _context4.next = 3;
                  break;
                }
                uni.showToast({
                  title: '请输入分类名称',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 3:
                isEdit = !!_this7.editingCategory;
                _context4.prev = 4;
                if (!isEdit) {
                  _context4.next = 11;
                  break;
                }
                _context4.next = 8;
                return _api.menuApi.updateCategory({
                  id: _this7.categoryForm.id,
                  name: _this7.categoryForm.name.trim()
                });
              case 8:
                res = _context4.sent;
                _context4.next = 14;
                break;
              case 11:
                _context4.next = 13;
                return _api.menuApi.addCategory({
                  name: _this7.categoryForm.name.trim(),
                  image: _this7.categoryForm.image.trim() || undefined
                });
              case 13:
                res = _context4.sent;
              case 14:
                if (res && res.code === 200) {
                  uni.showToast({
                    title: isEdit ? '更新成功' : '添加成功',
                    icon: 'success'
                  });
                  _this7.showCategoryPopup = false;
                  // 刷新菜单数据
                  setTimeout(function () {
                    _this7.refreshMenuData();
                  }, 1500);
                } else {
                  uni.showToast({
                    title: ((_res = res) === null || _res === void 0 ? void 0 : _res.message) || (isEdit ? '更新失败' : '添加失败'),
                    icon: 'none'
                  });
                }
                _context4.next = 21;
                break;
              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](4);
                console.error(isEdit ? '更新分类失败' : '添加分类失败', _context4.t0);
                uni.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 17]]);
      }))();
    },
    // 删除分类
    handleDeleteCategory: function handleDeleteCategory(category) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var _this8$tabbar$find;
        var categoryProducts;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // 检查分类下是否有商品
                categoryProducts = ((_this8$tabbar$find = _this8.tabbar.find(function (item) {
                  return item.id === category.id;
                })) === null || _this8$tabbar$find === void 0 ? void 0 : _this8$tabbar$find.foods) || [];
                if (!(categoryProducts.length > 0)) {
                  _context6.next = 4;
                  break;
                }
                uni.showModal({
                  title: '无法删除',
                  content: "\u8BE5\u5206\u7C7B\u4E0B\u8FD8\u6709 ".concat(categoryProducts.length, " \u4E2A\u5546\u54C1\uFF0C\u8BF7\u5148\u5220\u9664\u6216\u79FB\u52A8\u8FD9\u4E9B\u5546\u54C1\u540E\u518D\u5220\u9664\u5206\u7C7B"),
                  showCancel: false,
                  confirmText: '知道了'
                });
                return _context6.abrupt("return");
              case 4:
                uni.showModal({
                  title: '确认删除',
                  content: "\u786E\u5B9A\u8981\u5220\u9664\u5206\u7C7B\"".concat(category.name, "\"\u5417\uFF1F"),
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
                      var result;
                      return _regenerator.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!res.confirm) {
                                _context5.next = 12;
                                break;
                              }
                              _context5.prev = 1;
                              _context5.next = 4;
                              return _api.menuApi.deleteCategory(category.id);
                            case 4:
                              result = _context5.sent;
                              if (result && result.code === 200) {
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                                // 刷新菜单数据
                                setTimeout(function () {
                                  _this8.refreshMenuData();
                                }, 1500);
                              } else {
                                uni.showToast({
                                  title: (result === null || result === void 0 ? void 0 : result.message) || '删除失败',
                                  icon: 'none'
                                });
                              }
                              _context5.next = 12;
                              break;
                            case 8:
                              _context5.prev = 8;
                              _context5.t0 = _context5["catch"](1);
                              console.error('删除分类失败', _context5.t0);
                              uni.showToast({
                                title: '删除失败，请重试',
                                icon: 'none'
                              });
                            case 12:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5, null, [[1, 8]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 显示添加商品弹窗
    showAddProductPopup: function showAddProductPopup(category) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this9.editingProduct = null;
                _this9.editingCategory = category;
                // 获取分类列表
                _context7.next = 4;
                return _this9.fetchCategoryList();
              case 4:
                _this9.productForm = {
                  name: '',
                  typeid: _this9.getCategoryId(category),
                  typeName: category.name,
                  price: '',
                  price1: '',
                  brief: '',
                  imgpath: ''
                };
                _this9.showProductPopup = true;
              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    // 显示编辑商品弹窗
    showEditProductPopup: function showEditProductPopup(product, category) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this10.editingProduct = product;
                _this10.editingCategory = category;
                // 获取分类列表
                _context8.next = 4;
                return _this10.fetchCategoryList();
              case 4:
                // 需要从原始数据中获取完整信息，这里先使用现有数据
                // 确保 price 和 price1 转换为字符串，以便在输入框中正常显示
                _this10.productForm = {
                  name: product.name || '',
                  typeid: _this10.getCategoryId(category),
                  typeName: category.name || category || '',
                  price: String(product.originalPrice || product.price || ''),
                  price1: String(product.originalPrice1 || product.price || ''),
                  brief: product.desc || '',
                  imgpath: product.icon || ''
                };
                _this10.showProductPopup = true;
              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 获取分类列表
    fetchCategoryList: function fetchCategoryList() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _api.menuApi.getCategoryList();
              case 3:
                res = _context9.sent;
                if (res && res.code === 200 && res.data) {
                  _this11.categoryList = Array.isArray(res.data) ? res.data : [];
                }
                _context9.next = 11;
                break;
              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](0);
                console.error('获取分类列表失败', _context9.t0);
                uni.showToast({
                  title: '获取分类列表失败',
                  icon: 'none'
                });
              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 7]]);
      }))();
    },
    // 打开分类选择器
    handleOpenCategoryPicker: function handleOpenCategoryPicker() {
      var _this12 = this;
      console.log('打开分类选择器', this.categoryList.length);
      // 确保分类列表已加载
      if (this.categoryList.length === 0) {
        this.fetchCategoryList().then(function () {
          console.log('分类列表加载完成', _this12.categoryList);
          _this12.showCategoryPicker = true;
        }).catch(function () {
          uni.showToast({
            title: '获取分类列表失败',
            icon: 'none'
          });
        });
      } else {
        this.showCategoryPicker = true;
      }
    },
    // 选择分类
    handleCategorySelect: function handleCategorySelect(category) {
      if (category && category.id) {
        // 更新分类ID和分类名称
        this.productForm.typeid = Number(category.id);
        this.productForm.typeName = category.name;
        console.log('选择分类:', category.name, 'typeid:', this.productForm.typeid);
        // 关闭分类选择弹窗
        this.showCategoryPicker = false;
      }
    },
    // 获取分类ID
    getCategoryId: function getCategoryId(category) {
      // 如果 category 是对象且有 id 属性，直接返回
      if (category && category.id) {
        return category.id;
      }
      // 否则从 tabbar 中查找
      var found = this.tabbar.find(function (t) {
        return t.name === category.name || category && t.id === category;
      });
      return found ? found.id || null : null;
    },
    // 保存商品（添加或编辑）
    handleSaveProduct: function handleSaveProduct() {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var priceStr, isEdit, data, res;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log('保存商品 - productForm:', _this13.productForm);
                if (!(!_this13.productForm.name || !String(_this13.productForm.name).trim())) {
                  _context10.next = 4;
                  break;
                }
                uni.showToast({
                  title: '请输入商品名称',
                  icon: 'none'
                });
                return _context10.abrupt("return");
              case 4:
                if (_this13.productForm.typeid) {
                  _context10.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请选择分类',
                  icon: 'none'
                });
                return _context10.abrupt("return");
              case 7:
                // 将 price 转换为字符串后再检查，因为可能是数字类型
                priceStr = String(_this13.productForm.price || '');
                if (!(!priceStr || !priceStr.trim() || isNaN(Number(priceStr)))) {
                  _context10.next = 11;
                  break;
                }
                uni.showToast({
                  title: '请输入有效的价格',
                  icon: 'none'
                });
                return _context10.abrupt("return");
              case 11:
                isEdit = !!_this13.editingProduct; // 构建请求数据，确保 typeid 被正确包含
                data = {
                  name: String(_this13.productForm.name).trim(),
                  typeid: Number(_this13.productForm.typeid),
                  // 确保 typeid 是数字类型
                  price: Number(_this13.productForm.price) // price 可能是字符串或数字，统一转换为数字
                }; // 如果是编辑模式，添加商品ID

                if (isEdit && _this13.editingProduct) {
                  data.id = _this13.editingProduct.id;
                }

                // 添加可选字段
                if (_this13.productForm.price1) {
                  data.price1 = Number(_this13.productForm.price1);
                }
                if (_this13.productForm.brief) {
                  data.brief = String(_this13.productForm.brief).trim();
                }
                if (_this13.productForm.imgpath) {
                  data.imgpath = _this13.productForm.imgpath.trim();
                }
                console.log('发送请求数据:', data, 'isEdit:', isEdit);
                _context10.prev = 18;
                if (!isEdit) {
                  _context10.next = 25;
                  break;
                }
                _context10.next = 22;
                return _api.menuApi.updateProduct(data);
              case 22:
                _context10.t0 = _context10.sent;
                _context10.next = 28;
                break;
              case 25:
                _context10.next = 27;
                return _api.menuApi.addProduct(data);
              case 27:
                _context10.t0 = _context10.sent;
              case 28:
                res = _context10.t0;
                if (res && res.code === 200) {
                  uni.showToast({
                    title: isEdit ? '更新成功' : '添加成功',
                    icon: 'success'
                  });
                  _this13.showProductPopup = false;
                  // 刷新菜单数据
                  setTimeout(function () {
                    _this13.refreshMenuData();
                  }, 1500);
                } else {
                  uni.showToast({
                    title: (res === null || res === void 0 ? void 0 : res.message) || (isEdit ? '更新失败' : '添加失败'),
                    icon: 'none'
                  });
                }
                _context10.next = 36;
                break;
              case 32:
                _context10.prev = 32;
                _context10.t1 = _context10["catch"](18);
                console.error('保存商品失败', _context10.t1);
                uni.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              case 36:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[18, 32]]);
      }))();
    },
    // 删除商品
    handleDeleteProduct: function handleDeleteProduct(product) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                uni.showModal({
                  title: '确认删除',
                  content: "\u786E\u5B9A\u8981\u5220\u9664\u5546\u54C1\"".concat(product.name, "\"\u5417\uFF1F"),
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(res) {
                      var result;
                      return _regenerator.default.wrap(function _callee11$(_context11) {
                        while (1) {
                          switch (_context11.prev = _context11.next) {
                            case 0:
                              if (!res.confirm) {
                                _context11.next = 11;
                                break;
                              }
                              _context11.prev = 1;
                              _context11.next = 4;
                              return _api.menuApi.deleteProduct(product.id);
                            case 4:
                              result = _context11.sent;
                              if (result && result.code === 200) {
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                                // 刷新菜单数据
                                setTimeout(function () {
                                  _this14.refreshMenuData();
                                }, 1500);
                              }
                              _context11.next = 11;
                              break;
                            case 8:
                              _context11.prev = 8;
                              _context11.t0 = _context11["catch"](1);
                              console.error('删除商品失败', _context11.t0);
                            case 11:
                            case "end":
                              return _context11.stop();
                          }
                        }
                      }, _callee11, null, [[1, 8]]);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    // 刷新菜单数据
    refreshMenuData: function refreshMenuData() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var res, menuData;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return _api.menuApi.getMenuList();
              case 3:
                res = _context13.sent;
                if (res && res.data) {
                  menuData = _this15.transformToMenuFormat(res.data);
                  _this15.tabbar = menuData;
                }
                _context13.next = 10;
                break;
              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13["catch"](0);
                console.error('刷新菜单数据失败', _context13.t0);
              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 7]]);
      }))();
    },
    // 选择商品图片
    handleChooseProductImage: function handleChooseProductImage() {
      var _this16 = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function success(res) {
          var tempFilePath = res.tempFilePaths && res.tempFilePaths[0];
          if (tempFilePath) {
            _this16.uploadProductImage(tempFilePath);
          }
        }
      });
    },
    // 上传商品图片
    uploadProductImage: function uploadProductImage(filePath) {
      var _this17 = this;
      this.uploadingProductImage = true;
      uni.showLoading({
        title: '上传中...'
      });
      uni.uploadFile({
        url: _config.UPLOAD_URL,
        filePath: filePath,
        name: 'file',
        success: function success(uploadRes) {
          var _response, _response$data, _response2, _response3;
          var response = {};
          try {
            response = typeof uploadRes.data === 'string' ? JSON.parse(uploadRes.data) : uploadRes.data;
          } catch (error) {
            response = {};
          }
          var imageUrl = ((_response = response) === null || _response === void 0 ? void 0 : (_response$data = _response.data) === null || _response$data === void 0 ? void 0 : _response$data.url) || ((_response2 = response) === null || _response2 === void 0 ? void 0 : _response2.url) || ((_response3 = response) === null || _response3 === void 0 ? void 0 : _response3.data);
          if (response.code === 200 && imageUrl || imageUrl) {
            _this17.productForm.imgpath = imageUrl;
            uni.showToast({
              title: '上传成功',
              icon: 'success'
            });
          } else {
            uni.showToast({
              title: response.message || '上传失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: function fail() {
          uni.showToast({
            title: '上传失败，请检测网络',
            icon: 'none'
          });
        },
        complete: function complete() {
          _this17.uploadingProductImage = false;
          uni.hideLoading();
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 86:
/*!****************************************************************************************************************************!*\
  !*** E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=style&index=0&id=368aef34&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./menu.vue?vue&type=style&index=0&id=368aef34&lang=scss&scoped=true& */ 87);
/* harmony import */ var _software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_menu_vue_vue_type_style_index_0_id_368aef34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 87:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/EngineeringPractice/ordering-system/pages/menu/menu.vue?vue&type=style&index=0&id=368aef34&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[80,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/menu.js.map