module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _transform = __webpack_require__(12);
	
	var _transform2 = _interopRequireDefault(_transform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getTime() {
	    return new Date().getTime();
	}
	function getDistance(pointA, pointB) {
	    return Math.sqrt((pointA.X - pointB.X) * (pointA.X - pointB.X) + (pointA.Y - pointB.Y) * (pointA.Y - pointB.Y));
	}
	function getVectorDistance(vector) {
	    return Math.sqrt(vector.X * vector.X + vector.Y * vector.Y);
	}
	function getRotateAngle(vectorA, vectorB) {
	    var direction = getRotateDirection(vectorA, vectorB);
	    var disA = getVectorDistance(vectorA);
	    var disB = getVectorDistance(vectorB);
	    var mr = disA * disB;
	    if (mr === 0) return 0;
	    var dot = vectorA.X * vectorB.X + vectorA.Y * vectorB.Y;
	    var r = dot / mr;
	    if (r > 1) r = 1;
	    if (r < -1) r = -1;
	    return Math.acos(r) * direction * 180 / Math.PI;
	}
	function getRotateDirection(vectorA, vectorB) {
	    return vectorA.X * vectorB.Y - vectorB.X * vectorA.Y > 0 ? 1 : -1;
	}
	
	exports.default = {
	    install: function install(Vue) {
	        Vue.directive('finger', {
	            bind: function bind() {
	                var el = this.el;
	                (0, _transform2.default)(el);
	
	                this.pointA = "";
	                this.pointB = "";
	                this.pointA_end = "";
	                this.pointB_end = "";
	                this.DoublePoint = "";
	                this.DoubleTapTime = 0;
	                this.lastTime;
	                this.longpressInt;
	                this.doubleTabInt;
	                this.distance;
	                this.vector;
	
	                el.addEventListener("touchstart", this.start.bind(this));
	                el.addEventListener("touchmove", this.move.bind(this));
	                el.addEventListener("touchend", this.end.bind(this));
	            },
	            update: function update(options) {
	                var tap = options.tap;
	                var longpress = options.longpress;
	                var doubletap = options.doubletap;
	                var pinch = options.pinch;
	                var rotate = options.rotate;
	                var swipe = options.swipe;
	                var pressmove = options.pressmove;
	                var singlestartcallback = options.singlestartcallback;
	                var singleendcallback = options.singleendcallback;
	                var multistartcallback = options.multistartcallback;
	                var multiendcallback = options.multiendcallback;
	
	
	                this.tap = tap || function () {};
	                this.longpress = longpress || function () {};
	                this.doubletap = doubletap || function () {};
	                this.pinch = pinch || function () {};
	                this.rotate = rotate || function () {};
	                this.swipe = swipe || function () {};
	                this.pressmove = pressmove || function () {};
	                this.singlestartcallback = singlestartcallback || function () {};
	                this.singleendcallback = singleendcallback || function () {};
	                this.multistartcallback = multistartcallback || function () {};
	                this.multiendcallback = multiendcallback || function () {};
	            },
	            start: function start(e) {
	                this.reset();
	                if (e.touches.length == 1) {
	                    this.singlestartcallback.call(this.el);
	                    this.pointA = {
	                        X: e.touches[0].pageX,
	                        Y: e.touches[0].pageY
	                    };
	                    this.longpressInt = setTimeout(this.handleLongPress.bind(this), 800);
	                    if (this.DoublePoint) {
	                        this.handleDoubleTap();
	                    } else {
	                        this.DoublePoint = {
	                            X: e.touches[0].pageX,
	                            Y: e.touches[0].pageY
	                        };
	                        this.lastTime = getTime();
	                    }
	                    this.doubleTabInt = setTimeout(function () {
	                        this.DoublePoint = "";
	                        this.DoubleTapTime = 0;
	                    }.bind(this), 300);
	                } else if (e.touches.length == 2) {
	                    this.multistartcallback.call(this.el);
	                    this.pointA = {
	                        X: e.touches[0].pageX,
	                        Y: e.touches[0].pageY
	                    };
	                    this.pointB = {
	                        X: e.touches[1].pageX,
	                        Y: e.touches[1].pageY
	                    };
	                    this.distance = getDistance(this.pointA, this.pointB);
	                    this.vector = {
	                        X: this.pointA.X - this.pointB.X,
	                        Y: this.pointA.Y - this.pointB.Y
	                    };
	                }
	            },
	            move: function move(e) {
	                clearTimeout(this.longpressInt);
	                if (e.touches.length == 1) {
	                    this.pointA_end = {
	                        X: e.touches[0].pageX,
	                        Y: e.touches[0].pageY
	                    };
	                    this.handlePressMove();
	                } else if (e.touches.length == 2) {
	                    this.pointA_end = {
	                        X: e.touches[0].pageX,
	                        Y: e.touches[0].pageY
	                    };
	                    this.pointB_end = {
	                        X: e.touches[1].pageX,
	                        Y: e.touches[1].pageY
	                    };
	
	                    if (this.distance) {
	                        var distance = getDistance(this.pointA_end, this.pointB_end);
	                        this.handlePinch(distance / this.distance);
	                    }
	
	                    if (this.vector) {
	                        var vector = {
	                            X: this.pointA_end.X - this.pointB_end.X,
	                            Y: this.pointA_end.Y - this.pointB_end.Y
	                        };
	                        var rotate = getRotateAngle(this.vector, vector);
	                        this.handleRotate(rotate);
	                    }
	                }
	            },
	            end: function end(e) {
	                clearTimeout(this.longpressInt);
	                if (this.pointA && !this.pointB) {
	                    if (this.DoublePoint && this.DoubleTapTime == 1) {
	                        this.handleDoubleTap();
	                    } else {
	                        var isTap = this.handleTap();
	                        !isTap && this.handleSwipe();
	                    }
	                    this.singleendcallback.call(this.el);
	                }
	                if (this.pointA && this.pointB && e.touches.length == 0) {
	                    this.multiendcallback.call(this.el);
	                }
	            },
	            reset: function reset() {
	                this.pointA = "";
	                this.pointB = "";
	            },
	            handleTap: function handleTap() {
	                var now = getTime();
	                if (now - this.lastTime < 500 && !this.pointA_end || Math.abs(this.pointA.X - this.pointA_end.X) < 10 && Math.abs(this.pointA.Y - this.pointA_end.Y) < 10) {
	                    this.tap.call(this.el);
	                    return true;
	                }
	                return false;
	            },
	            handleLongPress: function handleLongPress() {
	                this.longpress.call(this.el);
	            },
	            handleDoubleTap: function handleDoubleTap() {
	                var now = getTime();
	                if (now - this.lastTime < 300 && Math.abs(this.pointA.X - this.DoublePoint.X) < 10 && Math.abs(this.pointA.Y - this.DoublePoint.Y) < 10) {
	                    this.doubletap.call(this.el);
	                }
	            },
	            handlePinch: function handlePinch(scale) {
	                var evt = {};
	                evt.scale = scale;
	                this.pinch.call(this.el, evt);
	            },
	            handleRotate: function handleRotate(rotate) {
	                var evt = {};
	                evt.rotate = rotate;
	                this.rotate.call(this.el, evt);
	            },
	            handleSwipe: function handleSwipe() {
	                var now = getTime();
	                if (now - this.lastTime < 500) {
	                    var evt = {};
	                    var isHorizental = Math.abs(this.pointA_end.Y - this.pointA.Y) < 30;
	                    var isVertical = Math.abs(this.pointA_end.X - this.pointA.X) < 30;
	                    var isRight = this.pointA_end.X - this.pointA.X > 0;
	                    var isTop = this.pointA_end.Y - this.pointA.Y > 0;
	
	                    if (isHorizental && isRight) {
	                        evt.direction = "right";
	                    } else if (isHorizental && !isRight) {
	                        evt.direction = "left";
	                    } else if (isVertical && isTop) {
	                        evt.direction = "down";
	                    } else if (isVertical && !isTop) {
	                        evt.direction = "up";
	                    }
	                    evt.direction && this.swipe.call(this.el, evt);
	                }
	                this.pointA = "";
	                this.pointA_end = "";
	            },
	            handlePressMove: function handlePressMove() {
	                var evt = {
	                    disX: this.pointA_end.X - this.pointA.X,
	                    disY: this.pointA_end.Y - this.pointA.Y
	                };
	                this.pressmove.call(this.el, evt);
	            }
	        });
	    }
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _defineProperty = __webpack_require__(13);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Matrix3D = function Matrix3D(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
	    this.elements = window.Float32Array ? new Float32Array(16) : [];
	    var te = this.elements;
	    te[0] = n11 !== undefined ? n11 : 1;te[4] = n12 || 0;te[8] = n13 || 0;te[12] = n14 || 0;
	    te[1] = n21 || 0;te[5] = n22 !== undefined ? n22 : 1;te[9] = n23 || 0;te[13] = n24 || 0;
	    te[2] = n31 || 0;te[6] = n32 || 0;te[10] = n33 !== undefined ? n33 : 1;te[14] = n34 || 0;
	    te[3] = n41 || 0;te[7] = n42 || 0;te[11] = n43 || 0;te[15] = n44 !== undefined ? n44 : 1;
	};
	
	Matrix3D.DEG_TO_RAD = Math.PI / 180;
	
	Matrix3D.prototype = {
	    set: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
	        var te = this.elements;
	        te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;
	        te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;
	        te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;
	        te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;
	        return this;
	    },
	    identity: function identity() {
	        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	        return this;
	    },
	    multiplyMatrices: function multiplyMatrices(a, be) {
	
	        var ae = a.elements;
	        var te = this.elements;
	        var a11 = ae[0],
	            a12 = ae[4],
	            a13 = ae[8],
	            a14 = ae[12];
	        var a21 = ae[1],
	            a22 = ae[5],
	            a23 = ae[9],
	            a24 = ae[13];
	        var a31 = ae[2],
	            a32 = ae[6],
	            a33 = ae[10],
	            a34 = ae[14];
	        var a41 = ae[3],
	            a42 = ae[7],
	            a43 = ae[11],
	            a44 = ae[15];
	
	        var b11 = be[0],
	            b12 = be[1],
	            b13 = be[2],
	            b14 = be[3];
	        var b21 = be[4],
	            b22 = be[5],
	            b23 = be[6],
	            b24 = be[7];
	        var b31 = be[8],
	            b32 = be[9],
	            b33 = be[10],
	            b34 = be[11];
	        var b41 = be[12],
	            b42 = be[13],
	            b43 = be[14],
	            b44 = be[15];
	
	        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
	
	        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
	
	        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
	
	        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	
	        return this;
	    },
	
	    _rounded: function _rounded(value, i) {
	        i = Math.pow(10, i || 15);
	
	        return Math.round(value * i) / i;
	    },
	    appendTransform: function appendTransform(x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {
	
	        var rx = rotateX * Matrix3D.DEG_TO_RAD;
	        var cosx = this._rounded(Math.cos(rx));
	        var sinx = this._rounded(Math.sin(rx));
	        var ry = rotateY * Matrix3D.DEG_TO_RAD;
	        var cosy = this._rounded(Math.cos(ry));
	        var siny = this._rounded(Math.sin(ry));
	        var rz = rotateZ * Matrix3D.DEG_TO_RAD;
	        var cosz = this._rounded(Math.cos(rz * -1));
	        var sinz = this._rounded(Math.sin(rz * -1));
	
	        this.multiplyMatrices(this, [1, 0, 0, x, 0, cosx, sinx, y, 0, -sinx, cosx, z, 0, 0, 0, 1]);
	
	        this.multiplyMatrices(this, [cosy, 0, siny, 0, 0, 1, 0, 0, -siny, 0, cosy, 0, 0, 0, 0, 1]);
	
	        this.multiplyMatrices(this, [cosz * scaleX, sinz * scaleY, 0, 0, -sinz * scaleX, cosz * scaleY, 0, 0, 0, 0, 1 * scaleZ, 0, 0, 0, 0, 1]);
	
	        if (skewX || skewY) {
	            this.multiplyMatrices(this, [this._rounded(Math.cos(skewX * Matrix3D.DEG_TO_RAD)), this._rounded(Math.sin(skewX * Matrix3D.DEG_TO_RAD)), 0, 0, -1 * this._rounded(Math.sin(skewY * Matrix3D.DEG_TO_RAD)), this._rounded(Math.cos(skewY * Matrix3D.DEG_TO_RAD)), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	        }
	
	        if (originX || originY || originZ) {
	            this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
	            this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
	            this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
	        }
	        return this;
	    }
	};
	
	function observe(target, props, callback) {
	    for (var i = 0, len = props.length; i < len; i++) {
	        var prop = props[i];
	        watch(target, prop, callback);
	    }
	}
	
	function watch(target, prop, callback) {
	    (0, _defineProperty2.default)(target, prop, {
	        get: function get() {
	            return this["__" + prop];
	        },
	        set: function set(value) {
	            if (value !== this["__" + prop]) {
	                this["__" + prop] = value;
	                callback();
	            }
	        }
	    });
	}
	
	var Transform = function Transform(element) {
	
	    observe(element, ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"], function () {
	        var mtx = element.matrix3D.identity().appendTransform(element.translateX, element.translateY, element.translateZ, element.scaleX, element.scaleY, element.scaleZ, element.rotateX, element.rotateY, element.rotateZ, element.skewX, element.skewY, element.originX, element.originY, element.originZ);
	        element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
	    });
	
	    observe(element, ["perspective"], function () {
	        element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(element.matrix3D.elements).join(",") + ")";
	    });
	
	    element.matrix3D = new Matrix3D();
	    element.perspective = 500;
	    element.scaleX = element.scaleY = element.scaleZ = 1;
	
	    element.translateX = element.translateY = element.translateZ = element.rotateX = element.rotateY = element.rotateZ = element.skewX = element.skewY = element.originX = element.originY = element.originZ = 0;
	};
	
	exports.default = Transform;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	var $Object = __webpack_require__(18).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(26), 'Object', {defineProperty: __webpack_require__(22).f});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=vuefinger.js.map