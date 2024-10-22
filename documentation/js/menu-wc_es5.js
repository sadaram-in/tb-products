'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">tb-products documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'id="xs-controllers-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AppController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"' : 'id="xs-injectables-links-module-AppModule-e6754524e8f80209ee7b65918ff39a6c93b020a4b3fccca9d9dfa424d029b896d3512eee2629e7cb2c44cb82dcf0291e49e8a29dd44108554896e0e297820836"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ResponseService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ResponseService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/CoreModule.html\" data-type=\"entity-link\" >CoreModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DatabaseModule.html\" data-type=\"entity-link\" >DatabaseModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HealthModule.html\" data-type=\"entity-link\" >HealthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"' : 'id="xs-controllers-links-module-HealthModule-4ceda0bf3912ffdf8d0db81918e2b5eb410f15ff1559015d8fee31c86208f13161539de9882171bdf4210645456dc8411560f25b76fdba4d8db9008b302f5fd8"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/HealthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HealthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProductPersistenceModule.html\" data-type=\"entity-link\" >ProductPersistenceModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProductPersistenceModule.html\" data-type=\"entity-link\" >ProductPersistenceModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProductPricingModule.html\" data-type=\"entity-link\" >ProductPricingModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'data-bs-target="#xs-controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'id="xs-controllers-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/ProductPricingController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductPricingController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'data-bs-target="#xs-injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"' : 'id="xs-injectables-links-module-ProductPricingModule-b31b7d71aab08b6e371ad2224ceed18fef2da7cb6894188dc7fe284514cbe456120f6ac316b529c22853fbf2c6dbb5c26929c667835712365681fc28c31e093c"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ProductPricingService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductPricingService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ResponseService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ResponseService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProductsModule.html\" data-type=\"entity-link\" >ProductsModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'id="xs-controllers-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/ProductsController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductsController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"' : 'id="xs-injectables-links-module-ProductsModule-e80d012e783919d58aeacd61cae7eab23a8483b884c8d26ac2d4b1b6cc97cba8a4fb9e84111a87bd8e060df26cc2f29d8212710426b66f06e7d096f1dbe78c12"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ProductsService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductsService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ResponseService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ResponseService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links"' : 'data-bs-target="#xs-controllers-links"', ">\n                                <span class=\"icon ion-md-swap\"></span>\n                                <span>Controllers</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"controllers/AppController.html\" data-type=\"entity-link\" >AppController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/AppController-1.html\" data-type=\"entity-link\" >AppController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/HealthController.html\" data-type=\"entity-link\" >HealthController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/ProductPricingController.html\" data-type=\"entity-link\" >ProductPricingController</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"controllers/ProductsController.html\" data-type=\"entity-link\" >ProductsController</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#entities-links"' : 'data-bs-target="#xs-entities-links"', ">\n                                <span class=\"icon ion-ios-apps\"></span>\n                                <span>Entities</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"entities/ProductEntity.html\" data-type=\"entity-link\" >ProductEntity</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"entities/ProductPricingEntity.html\" data-type=\"entity-link\" >ProductPricingEntity</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/ApiResponseDto.html\" data-type=\"entity-link\" >ApiResponseDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductCommand.html\" data-type=\"entity-link\" >CreateProductCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductCommandHandler.html\" data-type=\"entity-link\" >CreateProductCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductDto.html\" data-type=\"entity-link\" >CreateProductDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductPricingCommand.html\" data-type=\"entity-link\" >CreateProductPricingCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductPricingCommandHandler.html\" data-type=\"entity-link\" >CreateProductPricingCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateProductPricingDto.html\" data-type=\"entity-link\" >CreateProductPricingDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteProductCommand.html\" data-type=\"entity-link\" >DeleteProductCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteProductCommandHandler.html\" data-type=\"entity-link\" >DeleteProductCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteProductPricingCommand.html\" data-type=\"entity-link\" >DeleteProductPricingCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DeleteProductPricingCommandHandler.html\" data-type=\"entity-link\" >DeleteProductPricingCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductPricingByIdQuery.html\" data-type=\"entity-link\" >GetProductPricingByIdQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductPricingByIdQueryHandler.html\" data-type=\"entity-link\" >GetProductPricingByIdQueryHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductPricingQuery.html\" data-type=\"entity-link\" >GetProductPricingQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductPricingsQueryHandler.html\" data-type=\"entity-link\" >GetProductPricingsQueryHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductsByIdQuery.html\" data-type=\"entity-link\" >GetProductsByIdQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductsByIdQueryHandler.html\" data-type=\"entity-link\" >GetProductsByIdQueryHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductsQuery.html\" data-type=\"entity-link\" >GetProductsQuery</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetProductsQueryHandler.html\" data-type=\"entity-link\" >GetProductsQueryHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IProductPricingRepository.html\" data-type=\"entity-link\" >IProductPricingRepository</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IProductRepository.html\" data-type=\"entity-link\" >IProductRepository</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Product.html\" data-type=\"entity-link\" >Product</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ProductFactory.html\" data-type=\"entity-link\" >ProductFactory</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ProductMapper.html\" data-type=\"entity-link\" >ProductMapper</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ProductPricing.html\" data-type=\"entity-link\" >ProductPricing</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ProductPricingFactory.html\" data-type=\"entity-link\" >ProductPricingFactory</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ProductPricingMapper.html\" data-type=\"entity-link\" >ProductPricingMapper</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductCommand.html\" data-type=\"entity-link\" >UpdateProductCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductCommandHandler.html\" data-type=\"entity-link\" >UpdateProductCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductDto.html\" data-type=\"entity-link\" >UpdateProductDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductPricingCommand.html\" data-type=\"entity-link\" >UpdateProductPricingCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductPricingCommandHandler.html\" data-type=\"entity-link\" >UpdateProductPricingCommandHandler</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateProductPricingDto.html\" data-type=\"entity-link\" >UpdateProductPricingDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AppService.html\" data-type=\"entity-link\" >AppService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LoggingInterceptor.html\" data-type=\"entity-link\" >LoggingInterceptor</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProductPricingRepository.html\" data-type=\"entity-link\" >ProductPricingRepository</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProductPricingService.html\" data-type=\"entity-link\" >ProductPricingService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProductRepository.html\" data-type=\"entity-link\" >ProductRepository</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProductsService.html\" data-type=\"entity-link\" >ProductsService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ResponseService.html\" data-type=\"entity-link\" >ResponseService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ApplicationBootstrapOptions.html\" data-type=\"entity-link\" >ApplicationBootstrapOptions</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement)));