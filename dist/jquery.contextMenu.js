var ContextMenu =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(1);

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_CAPTURED_EVENTS = [];
var EventListener = function () {
    function EventListener(el, contextMenuData) {
        _classCallCheck(this, EventListener);

        if (!window.instanceId) {
            window.instanceId = 0;
        }
        this.instanceId = window.instanceId++;

        this.contextMenuData = contextMenuData || null;
        this.el = el;
        this.events = {};
        this.eventData = {};
        this._onEvent = this._onEvent.bind(this);
    }

    _createClass(EventListener, [{
        key: 'destruct',
        value: function destruct() {
            if (this.events !== null) {
                Object.keys(this.events).forEach(function (eventName) {
                    var useCapture = NOT_CAPTURED_EVENTS.indexOf(eventName) === -1;
                    this.el.removeEventListener(eventName, this._onEvent, useCapture);
                }, this);
            }

            this.context = null;
            this.contextMenuData = null;
            this.el = null;
            this.events = null;
            this.eventData = null;
        }
    }, {
        key: 'off',
        value: function off(eventName, selector, callback) {
            if (typeof selector !== 'string') {
                callback = selector;
                selector = '';
            }

            if (callback) {
                var events = this.events[eventName];
                if (events) {
                    events = events[selector];
                    if (events) {
                        for (var i = 0; i < events.length; i++) {
                            if (events[i] === callback) {
                                events.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
            } else {
                if (this.events.hasOwnProperty(eventName) && this.events[eventName].hasOwnProperty(selector)) {
                    this.events[eventName][selector] = [];
                }
            }
            return this;
        }
    }, {
        key: 'on',
        value: function on(eventName, selector, callback) {
            var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (typeof eventName !== 'string') {
                var eventsMap = eventName;
                for (var key in eventsMap) {
                    if (eventsMap.hasOwnProperty(key)) {
                        var split = key.split(' ');
                        if (split.length > 1) {
                            this.on(split[0], split[1], eventsMap[key], data);
                        } else {
                            this.on(split[0], '', eventsMap[key], data);
                        }
                    }
                }
                return this;
            }

            if (typeof selector !== 'string') {
                callback = selector;
                selector = '';
            }

            if (!this.events.hasOwnProperty(eventName)) {
                var useCapture = NOT_CAPTURED_EVENTS.indexOf(eventName) === -1;
                this.el.addEventListener(eventName, this._onEvent, useCapture);

                this.events[eventName] = {};
            }

            if (!this.events[eventName].hasOwnProperty(selector)) {
                this.events[eventName][selector] = [];
            }

            if (this.events[eventName][selector].indexOf(callback) < 0) {
                this.events[eventName][selector].push(callback);
            }

            if (data) {
                if (!this.eventData.hasOwnProperty(eventName)) {
                    this.eventData[eventName] = {};
                }
                if (!this.eventData[eventName].hasOwnProperty(selector)) {
                    this.eventData[eventName][selector] = data;
                }
            }

            return this;
        }
    }, {
        key: '_onEvent',
        value: function _onEvent(event) {
            var isPropagationStopped = false;
            var stopPropagation = event.stopPropagation;
            event.stopPropagation = function () {
                stopPropagation.call(event);
                isPropagationStopped = true;
            };

            if (event.detail && event.detail.data) {
                event._contextMenuData = event.detail.data;
            } else {
                event._contextMenuData = this.contextMenuData;
            }

            var target = event.target;

            var events = this.events[event.type.toLowerCase()];
            var eventData = this.eventData[event.type.toLowerCase()];

            while (target && target !== this.el && isPropagationStopped === false) {
                for (var selector in events) {
                    if (selector && eventData && eventData.hasOwnProperty(selector) && _Helper2.default.matchesSelector(target, selector)) {
                        event._extraContextMenuData = eventData[selector];
                    }

                    if (selector && events.hasOwnProperty(selector) && _Helper2.default.matchesSelector(target, selector)) {
                        this.context = target;
                        EventListener.callAll(events[selector], event, this.context);
                    }
                }
                target = target.parentElement;
                if (isPropagationStopped === true) {
                    break;
                }
            }

            if (isPropagationStopped === false && events.hasOwnProperty('')) {
                EventListener.callAll(events[''], event, this.context);
            }
        }
    }], [{
        key: 'triggerEvent',
        value: function triggerEvent(el, eventName) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
            var cancelable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

            var event = new CustomEvent(eventName, { detail: data, bubbles: bubbles, cancelable: cancelable });
            el.dispatchEvent(event);
            return !event.defaultPrevented;
        }
    }, {
        key: 'callAll',
        value: function callAll(callbacks, event, context) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].call(context, event);
            }
        }
    }]);

    return EventListener;
}();

module.exports = EventListener;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'isVisible',
        value: function isVisible(elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        }
    }, {
        key: 'matchesSelector',
        value: function matchesSelector(el, selector) {
            var method = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
            return method.call(el, selector);
        }
    }, {
        key: 'zindex',
        value: function zindex($t) {
            var zin = 0;
            var $tt = $t;

            while (true) {
                zin = Math.max(zin, parseInt($tt.css('z-index'), 10) || 0);
                $tt = $tt.parent();
                if (!$tt || !$tt.length || 'html body'.indexOf($tt.prop('nodeName').toLowerCase()) > -1) {
                    break;
                }
            }
            return zin;
        }
    }, {
        key: 'splitAccesskey',
        value: function splitAccesskey(val) {
            var t = val.split(/\s+/);
            var keys = [];

            for (var i = 0, k; k = t[i]; i++) {
                k = k.charAt(0).toUpperCase();
                keys.push(k);
            }

            return keys;
        }
    }]);

    return Helper;
}();

exports.default = Helper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ItemTypes = {
  simple: '',

  text: 'text',

  textarea: 'textarea',

  checkbox: 'checkbox',

  radio: 'radio',

  select: 'select',

  html: 'html',

  separator: 'cm_separator',

  submenu: 'sub'
};

exports.default = ItemTypes;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _position = __webpack_require__(6);

exports.default = {

    baseElement: document,

    selector: null,

    appendTo: null,

    trigger: 'right',

    autoHide: false,

    delay: 200,

    reposition: true,

    hideOnSecondTrigger: false,

    selectableSubMenu: false,

    className: '',

    classNames: {
        hover: 'context-menu-hover',
        disabled: 'context-menu-disabled',
        visible: 'context-menu-visible',
        notSelectable: 'context-menu-not-selectable',

        icon: 'context-menu-icon',
        iconEdit: 'context-menu-icon-edit',
        iconCut: 'context-menu-icon-cut',
        iconCopy: 'context-menu-icon-copy',
        iconPaste: 'context-menu-icon-paste',
        iconDelete: 'context-menu-icon-delete',
        iconAdd: 'context-menu-icon-add',
        iconQuit: 'context-menu-icon-quit',
        iconLoadingClass: 'context-menu-icon-loading'
    },

    zIndex: 1,

    animation: {
        duration: 50,
        show: 'slideDown',
        hide: 'slideUp'
    },

    events: {
        show: $.noop,
        hide: $.noop,
        activated: $.noop
    },

    callback: null,

    items: {},

    build: false,

    types: {},

    determinePosition: _position.determinePosition,

    position: _position.position,

    positionSubmenu: _position.positionSubmenu
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Operations = __webpack_require__(5);

var _Operations2 = _interopRequireDefault(_Operations);

var _defaults = __webpack_require__(3);

var _defaults2 = _interopRequireDefault(_defaults);

var _Html5Builder = __webpack_require__(7);

var _Html5Builder2 = _interopRequireDefault(_Html5Builder);

var _EventHandler = __webpack_require__(8);

var _EventHandler2 = _interopRequireDefault(_EventHandler);

var _EventListener = __webpack_require__(0);

var _EventListener2 = _interopRequireDefault(_EventListener);

var _Helper = __webpack_require__(1);

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenu = function () {
    function ContextMenu() {
        _classCallCheck(this, ContextMenu);

        this.html5builder = new _Html5Builder2.default();
        this.defaults = _defaults2.default;
        this.handler = new _EventHandler2.default();
        this.operations = new _Operations2.default();
        this.namespaces = {};
        this.initialized = false;
        this.menus = {};
        this.counter = 0;
    }

    _createClass(ContextMenu, [{
        key: 'execute',
        value: function execute(operation, options) {
            var normalizedArguments = this.normalizeArguments(operation, options);
            operation = normalizedArguments.operation;
            options = normalizedArguments.options;

            switch (operation) {
                case 'update':
                    this.update(options);
                    break;

                case 'create':
                    this.create(options);
                    break;

                case 'destroy':
                    this.destroy(options);
                    break;

                case 'html5':
                    this.html5(options);
                    break;

                default:
                    throw new Error('Unknown operation "' + operation + '"');
            }

            return this;
        }
    }, {
        key: 'html5',
        value: function html5(options) {
            options = this.buildOptions(options);

            var menuItemSupport = 'contextMenu' in document.body && 'HTMLMenuItemElement' in window;

            if (!menuItemSupport || typeof options === 'boolean' && options === true) {
                $('menu[type="context"]').each(function () {
                    if (this.id) {
                        $.contextMenu({
                            selector: '[contextmenu=' + this.id + ']',
                            items: $.contextMenu.fromMenu(this)
                        });
                    }
                }).css('display', 'none');
            }
        }
    }, {
        key: 'destroy',
        value: function destroy(options) {
            var _this = this;

            options = this.buildOptions(options);

            var $visibleMenu = void 0;

            if (options._hasContext) {
                var context = options.context;

                Object.keys(this.menus).forEach(function (ns) {
                    var o = _this.menus[ns];

                    if (!o) {
                        return true;
                    }

                    if (!$(context).is(o.selector)) {
                        return true;
                    }

                    $visibleMenu = $('.context-menu-list').filter(':visible');
                    if ($visibleMenu.length && $visibleMenu.data().contextMenuRoot.$trigger.is($(o.context).find(o.selector))) {
                        _EventListener2.default.triggerEvent($visibleMenu.get(0), 'contextmenu:hide', { force: true });
                    }

                    _this.removeListeners(o.ns);

                    if (_this.menus[o.ns].$menu) {
                        _this.menus[o.ns].$menu.remove();
                    }
                    delete _this.menus[o.ns];

                    return true;
                });
            } else if (!options.selector) {

                this.removeListeners();

                this.namespaces = {};
                this.menus = {};
                this.counter = 0;
                this.initialized = false;

                var layer = document.getElementById('context-menu-layer');
                if (layer) {
                    layer.parentNode.removeChild(layer);
                }

                var contextMenus = document.querySelectorAll('.context-menu-list');
                contextMenus.forEach(function (e) {
                    e.parentNode.removeChild(e);
                });
            } else if (this.namespaces[options.selector]) {
                var visibleMenus = this.getVisibleMenus();
                visibleMenus.forEach(function (e) {
                    _EventListener2.default.triggerEvent(e, 'contextmenu:hide', { force: true });
                });

                var namespace = this.namespaces[options.selector];

                this.removeListeners(namespace);

                if (this.menus[namespace].$menu) {
                    this.menus[namespace].$menu.remove();
                }
                delete this.menus[this.namespaces[options.selector]];
            }
            this.handler.$currentTrigger = null;
        }
    }, {
        key: 'create',
        value: function create(options) {
            options = this.buildOptions(options);

            if (!options.selector) {
                throw new Error('No selector specified');
            }

            if (options.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
                throw new Error('Cannot bind to selector "' + options.selector + '" as it contains a reserved className');
            }
            if (!options.build && (!options.items || $.isEmptyObject(options.items))) {
                throw new Error('No Items specified');
            }
            this.counter++;
            options.ns = '.contextMenu' + this.counter;
            if (!options._hasContext) {
                this.namespaces[options.selector] = options.ns;
            }
            if (typeof options.listeners === 'undefined') {
                options.listeners = {
                    baseElement: new _EventListener2.default(document, options)
                };
            }

            this.menus[options.ns] = options;

            if (!options.trigger) {
                options.trigger = 'right';
            }

            if (!this.initialized) {
                var itemClick = options.itemClickEvent === 'click' ? 'click' : 'mouseup';

                options.listeners.baseElement.on('contextmenu:hide', '.context-menu-list', this.handler.hideMenu).on('prevcommand', '.context-menu-list', this.handler.prevItem).on('nextcommand', '.context-menu-list', this.handler.nextItem).on('contextmenu', '.context-menu-list', this.handler.abortevent).on('mouseleave', '.context-menu-list', this.handler.menuMouseleave).on('mouseenter', '.context-menu-list', this.handler.menuMouseenter);

                options.listeners.baseElement.on(itemClick, '.context-menu-item', this.handler.itemClick).on('contextmenu:focus', '.context-menu-item', this.handler.focusItem).on('contextmenu:blur', '.context-menu-item', this.handler.blurItem).on('contextmenu', '.context-menu-item', this.handler.abortevent).on('mouseleave', '.context-menu-item', this.handler.itemMouseleave).on('mouseenter', '.context-menu-item', this.handler.itemMouseenter);

                options.listeners.baseElement.on('mouseup', '.context-menu-input', this.handler.inputClick);

                this.initialized = true;
            }

            if (options._hasContext) {
                options.listeners.context = new _EventListener2.default(options.context.get(0), options);
            } else {
                options.listeners.context = options.listeners.baseElement;
            }

            options.listeners.context.on('contextmenu', options.selector, this.handler.contextmenu);

            switch (options.trigger) {
                case 'hover':
                    options.listeners.context.on('mouseenter', options.selector, this.handler.mouseenter).on('mouseleave', options.selector, this.handler.mouseleave);
                    break;

                case 'left':
                    options.listeners.context.on('click', options.selector, this.handler.click);
                    break;
                case 'touchstart':
                    options.listeners.context.on('touchstart', options.selector, this.handler.click);
                    break;
            }

            if (!options.build) {
                this.operations.create(null, options);
            }
        }
    }, {
        key: 'update',
        value: function update(options) {
            var _this2 = this;

            options = this.buildOptions(options);

            if (options._hasContext) {
                this.operations.update(null, $(options.context).data('contextMenu'), $(options.context).data('contextMenuRoot'));
            } else {
                Object.keys(this.menus).forEach(function (menu) {
                    _this2.operations.update(null, _this2.menus[menu]);
                });
            }
        }
    }, {
        key: 'buildOptions',
        value: function buildOptions(userOptions) {
            if (typeof userOptions === 'string') {
                userOptions = { selector: userOptions };
            }

            var options = $.extend(true, { manager: this }, this.defaults, userOptions);

            if (!options.context || !options.context.length) {
                options.context = $(document);
                options._hasContext = false;
            } else {
                options.context = $(options.context).first();
                options._hasContext = !$(options.context).is($(document));
            }
            return options;
        }
    }, {
        key: 'normalizeArguments',
        value: function normalizeArguments(operation, options) {
            if (typeof operation !== 'string') {
                options = operation;
                operation = 'create';
            }

            if (typeof options === 'string') {
                options = { selector: options };
            } else if (typeof options === 'undefined') {
                options = {};
            }
            return { operation: operation, options: options };
        }
    }, {
        key: 'setInputValues',
        value: function setInputValues(contextMenuData, data) {
            if (typeof data === 'undefined') {
                data = {};
            }

            $.each(contextMenuData.inputs, function (key, item) {
                switch (item.type) {
                    case 'text':
                    case 'textarea':
                        item.value = data[key] || '';
                        break;

                    case 'checkbox':
                        item.selected = !!data[key];
                        break;

                    case 'radio':
                        item.selected = (data[item.radio] || '') === item.value;
                        break;

                    case 'select':
                        item.selected = data[key] || '';
                        break;
                }
            });
        }
    }, {
        key: 'getInputValues',
        value: function getInputValues(contextMenuData, data) {
            if (typeof data === 'undefined') {
                data = {};
            }

            $.each(contextMenuData.inputs, function (key, item) {
                switch (item.type) {
                    case 'text':
                    case 'textarea':
                    case 'select':
                        data[key] = item.$input.val();
                        break;

                    case 'checkbox':
                        data[key] = item.$input.prop('checked');
                        break;

                    case 'radio':
                        if (item.$input.prop('checked')) {
                            data[item.radio] = item.value;
                        }
                        break;
                }
            });

            return data;
        }
    }, {
        key: 'triggerEvent',
        value: function triggerEvent(el, eventName) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
            var cancelable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

            var event = new CustomEvent(eventName, { detail: data, bubbles: bubbles, cancelable: cancelable });
            el.dispatchEvent(event);
            return !event.defaultPrevented;
        }
    }, {
        key: 'getVisibleMenus',
        value: function getVisibleMenus() {
            return Array.prototype.filter.call(document.querySelectorAll('.context-menu-list'), function (element) {
                return _Helper2.default.isVisible(element);
            });
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners(namespace) {
            var _this3 = this;

            var namespaces = [namespace];
            if (!namespace) {
                namespaces = Object.values(this.namespaces);
            }

            namespaces.forEach(function (ns) {
                if (_this3.menus[ns] && _this3.menus[ns].listeners) {
                    Object.keys(_this3.menus[ns].listeners).forEach(function (key) {
                        _this3.menus[ns].listeners[key].destruct();
                    });
                }
            });
        }
    }, {
        key: 'getMenuBySelector',
        value: function getMenuBySelector(selector) {
            return Object.values(this.menus).find(function (menu) {
                return menu.selector === selector;
            });
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(1);

var _Helper2 = _interopRequireDefault(_Helper);

var _ItemTypes = __webpack_require__(2);

var _ItemTypes2 = _interopRequireDefault(_ItemTypes);

var _EventListener = __webpack_require__(0);

var _EventListener2 = _interopRequireDefault(_EventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operations = function () {
    function Operations() {
        _classCallCheck(this, Operations);

        return this;
    }

    _createClass(Operations, [{
        key: 'show',
        value: function show(e, menuData, x, y) {
            var $trigger = $(e.target);
            var css = {};

            var layer = document.getElementById('#context-menu-layer');
            if (layer) {
                _EventListener2.default.triggerEvent(document.getElementById('#context-menu-layer'), 'mousedown');
            }

            menuData.$trigger = $trigger;

            if (menuData.events.show.call($trigger, e, menuData) === false) {
                menuData.manager.handler.$currentTrigger = null;
                return;
            }

            var hasVisibleItems = menuData.manager.operations.update.call($trigger, e, menuData);

            if (hasVisibleItems === false) {
                menuData.manager.handler.$currentTrigger = null;
                return;
            }

            menuData.position.call($trigger, e, menuData, x, y);

            if (menuData.zIndex) {
                var additionalZValue = menuData.zIndex;

                if (typeof menuData.zIndex === 'function') {
                    additionalZValue = menuData.zIndex.call($trigger, menuData);
                }
                css.zIndex = _Helper2.default.zindex($trigger) + additionalZValue;
            }

            menuData.manager.operations.layer.call(menuData.$menu, e, menuData, css.zIndex);

            menuData.$menu.find('ul').css('zIndex', css.zIndex + 1);

            menuData.$menu.css(css)[menuData.animation.show](menuData.animation.duration, function () {
                _EventListener2.default.triggerEvent($trigger.get(0), 'contextmenu:visible');

                menuData.manager.operations.activated(e, menuData);
                menuData.events.activated($trigger, e, menuData);
            });

            $trigger.data('contextMenu', menuData).addClass('context-menu-active');

            menuData.listeners.baseElement.off('keydown').on('keydown', menuData.manager.handler.key);

            if (menuData.autoHide) {
                menuData.listeners.contextMenuAutoHide.on('mousemove', function (e) {
                    var pos = $trigger.offset();
                    pos.right = pos.left + $trigger.outerWidth();
                    pos.bottom = pos.top + $trigger.outerHeight();

                    if (menuData.$layer && !menuData.hovering && (!(e.pageX >= pos.left && e.pageX <= pos.right) || !(e.pageY >= pos.top && e.pageY <= pos.bottom))) {
                        setTimeout(function () {
                            if (!menuData.hovering && menuData.$menu !== null && typeof menuData.$menu !== 'undefined') {
                                _EventListener2.default.triggerEvent(menuData.$menu.get(0), 'contextmenu:hide');
                            }
                        }, 50);
                    }
                });
            }
        }
    }, {
        key: 'hide',
        value: function hide(e, menuData, force) {
            var $trigger = $(this);
            if ((typeof menuData === 'undefined' ? 'undefined' : _typeof(menuData)) !== 'object' && $trigger.data('contextMenu')) {
                menuData = $trigger.data('contextMenu');
            } else if ((typeof menuData === 'undefined' ? 'undefined' : _typeof(menuData)) !== 'object') {
                return;
            }

            if (!force && menuData.events && menuData.events.hide.call($trigger, e, menuData) === false) {
                return;
            }

            $trigger.removeData('contextMenu').removeClass('context-menu-active');

            if (menuData.$layer) {
                setTimeout(function ($layer) {
                    return function () {
                        $layer.remove();
                    };
                }(menuData.$layer), 10);

                try {
                    delete menuData.$layer;
                } catch (e) {
                    menuData.$layer = null;
                }
            }

            menuData.manager.handler.$currentTrigger = null;

            menuData.$menu.find('.' + menuData.classNames.hover).trigger('contextmenu:blur');
            menuData.$selected = null;

            menuData.$menu.find('.' + menuData.classNames.visible).removeClass(menuData.classNames.visible);

            if (menuData.listeners.contextMenuAutoHide) {
                menuData.listeners.contextMenuAutoHide.destruct();
            }
            menuData.listeners.baseElement.off('keydown');

            if (menuData.$menu) {
                menuData.$menu[menuData.animation.hide](menuData.animation.duration, function () {
                    if (menuData.build) {
                        menuData.$menu.remove();
                        Object.keys(menuData).forEach(function (key) {
                            switch (key) {
                                case 'ns':
                                case 'selector':
                                case 'build':
                                case 'trigger':
                                    return true;
                                default:
                                    menuData[key] = undefined;
                                    try {
                                        delete menuData[key];
                                    } catch (e) {}
                                    return true;
                            }
                        });
                    }

                    setTimeout(function () {
                        _EventListener2.default.triggerEvent($trigger.get(0), 'contextmenu:hidden');
                    }, 10);
                });
            }
        }
    }, {
        key: 'create',
        value: function create(e, currentMenuData, rootMenuData) {
            var _this = this;

            if (typeof rootMenuData === 'undefined') {
                rootMenuData = currentMenuData;
            }

            var menuElement = document.createElement('ul');
            menuElement.className = 'context-menu-list ' + (currentMenuData.className || '');

            currentMenuData.menuElement = menuElement;
            menuElement.contextMenu = currentMenuData;
            menuElement.contextMenuRoot = currentMenuData;

            currentMenuData.$menu = $(menuElement).addClass(currentMenuData.className || '').data({
                'contextMenu': currentMenuData,
                'contextMenuRoot': rootMenuData
            });

            ['callbacks', 'commands', 'inputs'].forEach(function (k) {
                currentMenuData[k] = {};
                if (!rootMenuData[k]) {
                    rootMenuData[k] = {};
                }
            });

            if (!rootMenuData.accesskeys) {
                rootMenuData.accesskeys = {};
            }

            function createNameNode(item) {
                var $name = $('<span></span>');
                if (item._accesskey) {
                    if (item._beforeAccesskey) {
                        $name.append(document.createTextNode(item._beforeAccesskey));
                    }
                    $('<span></span>').addClass('context-menu-accesskey').text(item._accesskey).appendTo($name);
                    if (item._afterAccesskey) {
                        $name.append(document.createTextNode(item._afterAccesskey));
                    }
                } else {
                    if (item.isHtmlName) {
                        if (typeof item.accesskey !== 'undefined') {
                            throw new Error('accesskeys are not compatible with HTML names and cannot be used together in the same item');
                        }
                        $name.html(item.name);
                    } else {
                        $name.text(item.name);
                    }
                }
                return $name;
            }

            Object.keys(currentMenuData.items).forEach(function (key) {
                var item = currentMenuData.items[key];
                var $t = $('<li class="context-menu-item"></li>').addClass(item.className || '');
                var $label = null;
                var $input = null;

                $t.on('click', $.noop);

                if (typeof item === 'string' || item.type === 'cm_seperator') {
                    item = { type: _ItemTypes2.default.separator };
                }

                item.$node = $t.data({
                    'contextMenu': currentMenuData,
                    'contextMenuRoot': rootMenuData,
                    'contextMenuKey': key
                });

                if (typeof item.listeners === 'undefined') {
                    item.listeners = {};
                }

                if (typeof item.accesskey !== 'undefined') {
                    var aks = _Helper2.default.splitAccesskey(item.accesskey);
                    for (var i = 0, ak; ak = aks[i]; i++) {
                        if (!rootMenuData.accesskeys[ak]) {
                            rootMenuData.accesskeys[ak] = item;
                            var matched = item.name.match(new RegExp('^(.*?)(' + ak + ')(.*)$', 'i'));
                            if (matched) {
                                item._beforeAccesskey = matched[1];
                                item._accesskey = matched[2];
                                item._afterAccesskey = matched[3];
                            }
                            break;
                        }
                    }
                }

                if (item.type && rootMenuData.types[item.type]) {
                    rootMenuData.types[item.type].call($t, e, item, currentMenuData, rootMenuData);

                    [currentMenuData, rootMenuData].forEach(function (k) {
                        k.commands[key] = item;

                        if (typeof item.callback === 'function' && (typeof k.callbacks[key] === 'undefined' || typeof currentMenuData.type === 'undefined')) {
                            k.callbacks[key] = item.callback;
                        }
                    });
                } else {
                    if (item.type === _ItemTypes2.default.separator) {
                        $t.addClass('context-menu-separator ' + rootMenuData.classNames.notSelectable);
                    } else if (item.type === _ItemTypes2.default.html) {
                        $t.addClass('context-menu-html ' + rootMenuData.classNames.notSelectable);
                    } else if (item.type && item.type !== _ItemTypes2.default.submenu) {
                        $label = $('<label></label>').appendTo($t);
                        createNameNode(item).appendTo($label);

                        $t.addClass('context-menu-input');
                        currentMenuData.hasTypes = true;
                        [currentMenuData, rootMenuData].forEach(function (k) {
                            k.commands[key] = item;
                            k.inputs[key] = item;
                        });
                    } else if (item.items) {
                        item.type = _ItemTypes2.default.submenu;
                    }

                    switch (item.type) {
                        case _ItemTypes2.default.separator:
                            break;

                        case _ItemTypes2.default.text:
                            $input = $('<input type="text" value="1" name="" />').attr('name', 'context-menu-input-' + key).val(item.value || '').appendTo($label);
                            break;

                        case _ItemTypes2.default.textarea:
                            $input = $('<textarea name=""></textarea>').attr('name', 'context-menu-input-' + key).val(item.value || '').appendTo($label);

                            if (item.height) {
                                $input.height(item.height);
                            }
                            break;

                        case _ItemTypes2.default.checkbox:
                            $input = $('<input type="checkbox" value="1" name="" />').attr('name', 'context-menu-input-' + key).val(item.value || '').prop('checked', !!item.selected).prependTo($label);
                            break;

                        case _ItemTypes2.default.radio:
                            $input = $('<input type="radio" value="1" name="" />').attr('name', 'context-menu-input-' + item.radio).val(item.value || '').prop('checked', !!item.selected).prependTo($label);
                            break;

                        case _ItemTypes2.default.select:
                            $input = $('<select name=""></select>').attr('name', 'context-menu-input-' + key).appendTo($label);
                            if (item.options) {
                                Object.keys(item.options).forEach(function (value) {
                                    $('<option></option>').val(value).text(item.options[value]).appendTo($input);
                                });
                                $input.val(item.selected);
                            }
                            break;

                        case _ItemTypes2.default.submenu:
                            createNameNode(item).appendTo($t);
                            $t.addClass('item-' + item.name);
                            item.appendTo = item.$node;
                            $t.data('contextMenu', item).addClass('context-menu-submenu');

                            item.callback = null;

                            if (typeof item.items.then === 'function') {
                                rootMenuData.manager.operations.processPromises(e, item, rootMenuData, item.items);
                            } else {
                                rootMenuData.manager.operations.create(e, item, rootMenuData);
                            }
                            break;

                        case _ItemTypes2.default.html:
                            $(item.html).appendTo($t);
                            break;

                        default:
                            [currentMenuData, rootMenuData].forEach(function (k) {
                                k.commands[key] = item;

                                if (typeof item.callback === 'function' && (typeof k.callbacks[key] === 'undefined' || typeof currentMenuData.type === 'undefined')) {
                                    k.callbacks[key] = item.callback;
                                }
                            });
                            createNameNode(item).appendTo($t);
                            break;
                    }

                    if (item.type && item.type !== _ItemTypes2.default.submenu && item.type !== _ItemTypes2.default.html && item.type !== _ItemTypes2.default.separator) {
                        item.listeners.input = new _EventListener2.default($input.get(0), rootMenuData);
                        item.listeners.input.on('focus', rootMenuData.manager.handler.focusInput).on('blur', rootMenuData.manager.handler.blurInput);

                        if (item.events) {
                            item.listeners.input.on(item.events, currentMenuData);
                        }
                    }

                    if (item.icon) {
                        if (typeof item.icon === 'function') {
                            item._icon = item.icon.call(_this, e, $t, key, item, currentMenuData, rootMenuData);
                        } else {
                            if (typeof item.icon === 'string' && item.icon.substring(0, 3) === 'fa-') {
                                item._icon = rootMenuData.classNames.icon + ' ' + rootMenuData.classNames.icon + '--fa fa ' + item.icon;
                            } else {
                                item._icon = rootMenuData.classNames.icon + ' ' + rootMenuData.classNames.icon + '-' + item.icon;
                            }
                        }
                        $t.addClass(item._icon);
                    }
                }

                item.$input = $input;
                item.$label = $label;

                $t.appendTo(currentMenuData.$menu);

                if (!currentMenuData.hasTypes && $.support.eventSelectstart) {
                    $t.on('selectstart.disableTextSelect', currentMenuData.manager.handler.abortevent);
                }
            });

            if (!currentMenuData.$node) {
                currentMenuData.$menu.css('display', 'none').addClass('context-menu-root');
            }
            currentMenuData.$menu.appendTo(currentMenuData.appendTo || document.body);
        }
    }, {
        key: 'resize',
        value: function resize(e, $menu, nested) {
            var domMenu = void 0;

            $menu.css({ position: 'absolute', display: 'block' });

            $menu.data('width', (domMenu = $menu.get(0)).getBoundingClientRect ? Math.ceil(domMenu.getBoundingClientRect().width) : $menu.outerWidth() + 1);
            $menu.css({
                position: 'static',
                minWidth: '0px',
                maxWidth: '100000px'
            });

            $menu.find('> li > ul').each(function (index, element) {
                e._contextMenuData.manager.operations.resize(e, $(element), true);
            });

            if (!nested) {
                $menu.find('ul').addBack().css({
                    position: '',
                    display: '',
                    minWidth: '',
                    maxWidth: ''
                }).outerWidth(function () {
                    return $(this).data('width');
                });
            }
        }
    }, {
        key: 'update',
        value: function update(e, currentMenuData, rootMenuData) {
            var $trigger = this;
            if (typeof rootMenuData === 'undefined') {
                rootMenuData = currentMenuData;
                rootMenuData.manager.operations.resize(e, currentMenuData.$menu);
            }

            var hasVisibleItems = false;

            currentMenuData.$menu.children().each(function (index, element) {
                var $item = $(element);
                var key = $item.data('contextMenuKey');
                var item = currentMenuData.items[key];

                var disabled = typeof item.disabled === 'function' && item.disabled.call($trigger, e, key, currentMenuData, rootMenuData) || item.disabled === true;
                var visible = void 0;

                if (typeof item.visible === 'function') {
                    visible = item.visible.call($trigger, e, key, currentMenuData, rootMenuData);
                } else if (typeof item.visible !== 'undefined') {
                    visible = item.visible === true;
                } else {
                    visible = true;
                }

                if (visible) {
                    hasVisibleItems = true;
                }

                $item[visible ? 'show' : 'hide']();

                $item[disabled ? 'addClass' : 'removeClass'](rootMenuData.classNames.disabled);

                if (typeof item.icon === 'function') {
                    $item.removeClass(item._icon);
                    item._icon = item.icon.call($trigger, e, $item, key, item, currentMenuData, rootMenuData);
                    $item.addClass(item._icon);
                }

                if (item.type) {
                    $item.find('input, select, textarea').prop('disabled', disabled);

                    switch (item.type) {
                        case _ItemTypes2.default.text:
                        case _ItemTypes2.default.textarea:
                            item.$input.val(item.value || '');
                            break;

                        case _ItemTypes2.default.checkbox:
                        case _ItemTypes2.default.radio:
                            item.$input.val(item.value || '').prop('checked', !!item.selected);
                            break;

                        case _ItemTypes2.default.select:
                            item.$input.val((item.selected === 0 ? '0' : item.selected) || '');
                            break;
                    }
                }

                if (item.$menu) {
                    var subMenuHasVisibleItems = rootMenuData.manager.operations.update.call($trigger, e, item, rootMenuData);
                    if (subMenuHasVisibleItems) {
                        hasVisibleItems = true;
                    }
                }
            });

            return hasVisibleItems;
        }
    }, {
        key: 'layer',
        value: function layer(e, menuData, zIndex) {
            var $window = $(window);

            var $layer = menuData.$layer = $('<div id="context-menu-layer"></div>').css({
                height: $window.height(),
                width: $window.width(),
                display: 'block',
                position: 'fixed',
                'z-index': zIndex,
                top: 0,
                left: 0,
                opacity: 0,
                filter: 'alpha(opacity=0)',
                'background-color': '#000'
            }).data('contextMenuRoot', menuData).insertBefore(this);

            menuData.listeners.layer = new _EventListener2.default($layer.get(0), menuData);
            menuData.listeners.layer.on('contextmenu', menuData.manager.handler.abortevent).on('mousedown', menuData.manager.handler.layerClick);

            if (typeof document.body.style.maxWidth === 'undefined') {
                $layer.css({
                    'position': 'absolute',
                    'height': $(document).height()
                });
            }

            return $layer;
        }
    }, {
        key: 'processPromises',
        value: function processPromises(e, currentMenuData, rootMenuData, promise) {
            currentMenuData.$node.addClass(rootMenuData.classNames.iconLoadingClass);

            function finishPromiseProcess(currentMenuData, rootMenuData, items) {
                if (typeof rootMenuData.$menu === 'undefined' || !rootMenuData.$menu.is(':visible')) {
                    return;
                }
                currentMenuData.$node.removeClass(rootMenuData.classNames.iconLoadingClass);
                currentMenuData.items = items;
                rootMenuData.manager.operations.create(e, currentMenuData, rootMenuData);
                rootMenuData.manager.operations.update(e, currentMenuData, rootMenuData);
                rootMenuData.positionSubmenu.call(currentMenuData.$node, e, currentMenuData.$menu);
            }

            function errorPromise(currentMenuData, rootMenuData, errorItem) {
                if (typeof errorItem === 'undefined') {
                    errorItem = {
                        'error': {
                            name: 'No items and no error item',
                            icon: 'context-menu-icon context-menu-icon-quit'
                        }
                    };
                    if (window.console) {
                        (console.error || console.log).call(console, 'When you reject a promise, provide an "items" object, equal to normal sub-menu items');
                    }
                } else if (typeof errorItem === 'string') {
                    errorItem = { 'error': { name: errorItem } };
                }
                finishPromiseProcess(currentMenuData, rootMenuData, errorItem);
            }

            function completedPromise(currentMenuData, rootMenuData, items) {
                if (typeof items === 'undefined') {
                    errorPromise(undefined);
                }
                finishPromiseProcess(currentMenuData, rootMenuData, items);
            }

            promise.then(completedPromise.bind(this, currentMenuData, rootMenuData), errorPromise.bind(this, currentMenuData, rootMenuData));
        }
    }, {
        key: 'activated',
        value: function activated(e, menuData) {
            var $menu = menuData.$menu;
            var $menuOffset = $menu.offset();
            var winHeight = $(window).height();
            var winScrollTop = $(window).scrollTop();
            var menuHeight = $menu.height();
            if (menuHeight > winHeight) {
                $menu.css({
                    'height': winHeight + 'px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                    'top': winScrollTop + 'px'
                });
            } else if ($menuOffset.top < winScrollTop || $menuOffset.top + menuHeight > winScrollTop + winHeight) {
                $menu.css({
                    'top': '0px'
                });
            }
        }
    }]);

    return Operations;
}();

exports.default = Operations;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.determinePosition = determinePosition;
exports.position = position;
exports.positionSubmenu = positionSubmenu;
function determinePosition($menu) {
    if ($.ui && $.ui.position) {
        $menu.css('display', 'block').position({
            my: 'center top',
            at: 'center bottom',
            of: this,
            offset: '0 5',
            collision: 'fit'
        }).css('display', 'none');
    } else {
        var offset = this.offset();
        offset.top += this.outerHeight();
        offset.left += this.outerWidth() / 2 - $menu.outerWidth() / 2;
        $menu.css(offset);
    }
}

function position(e, currentMenuData, x, y) {
    var $window = $(window);
    var offset = void 0;

    if (!x && !y) {
        currentMenuData.determinePosition.call(this, currentMenuData.$menu);
        return;
    } else if (x === 'maintain' && y === 'maintain') {
        offset = currentMenuData.$menu.position();
    } else {
        var offsetParentOffset = currentMenuData.$menu.offsetParent().offset();
        offset = { top: y - offsetParentOffset.top, left: x - offsetParentOffset.left };
    }

    var bottom = $window.scrollTop() + $window.height();
    var right = $window.scrollLeft() + $window.width();
    var height = currentMenuData.$menu.outerHeight();
    var width = currentMenuData.$menu.outerWidth();

    if (offset.top + height > bottom) {
        offset.top -= height;
    }

    if (offset.top < 0) {
        offset.top = 0;
    }

    if (offset.left + width > right) {
        offset.left -= width;
    }

    if (offset.left < 0) {
        offset.left = 0;
    }

    currentMenuData.$menu.css(offset);
}

function positionSubmenu(e, $menu) {
    if (typeof $menu === 'undefined') {
        return;
    }
    if ($.ui && $.ui.position) {
        $menu.css('display', 'block').position({
            my: 'left top-5',
            at: 'right top',
            of: this,
            collision: 'flipfit fit'
        }).css('display', '');
    } else {
        var offset = {
            top: -9,
            left: this.outerWidth() - 5
        };
        $menu.css(offset);
    }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Html5Builder = function () {
    function Html5Builder() {
        _classCallCheck(this, Html5Builder);
    }

    _createClass(Html5Builder, [{
        key: 'inputLabel',
        value: function inputLabel(node) {
            return node.id && $('label[for="' + node.id + '"]').val() || node.name;
        }
    }, {
        key: 'fromMenu',
        value: function fromMenu(element) {
            var $this = $(element);
            var items = {};

            this.build(items, $this.children());

            return items;
        }
    }, {
        key: 'build',
        value: function build(items, $children, counter) {
            if (!counter) {
                counter = 0;
            }

            var builder = this;

            $children.each(function () {
                var $node = $(this);
                var node = this;
                var nodeName = this.nodeName.toLowerCase();
                var label = void 0;
                var item = void 0;

                if (nodeName === 'label' && $node.find('input, textarea, select').length) {
                    label = $node.text();
                    $node = $node.children().first();
                    node = $node.get(0);
                    nodeName = node.nodeName.toLowerCase();
                }

                switch (nodeName) {
                    case 'menu':
                        item = { name: $node.attr('label'), items: {} };
                        counter = builder.build(item.items, $node.children(), counter);
                        break;

                    case 'a':
                    case 'button':
                        item = {
                            name: $node.text(),
                            disabled: !!$node.attr('disabled'),
                            callback: function () {
                                return function () {
                                    $node.get(0).click();
                                };
                            }()
                        };
                        break;

                    case 'menuitem':
                    case 'command':
                        switch ($node.attr('type')) {
                            case undefined:
                            case 'command':
                            case 'menuitem':
                                item = {
                                    name: $node.attr('label'),
                                    disabled: !!$node.attr('disabled'),
                                    icon: $node.attr('icon'),
                                    callback: function () {
                                        return function () {
                                            $node.get(0).click();
                                        };
                                    }()
                                };
                                break;

                            case 'checkbox':
                                item = {
                                    type: 'checkbox',
                                    disabled: !!$node.attr('disabled'),
                                    name: $node.attr('label'),
                                    selected: !!$node.attr('checked')
                                };
                                break;
                            case 'radio':
                                item = {
                                    type: 'radio',
                                    disabled: !!$node.attr('disabled'),
                                    name: $node.attr('label'),
                                    radio: $node.attr('radiogroup'),
                                    value: $node.attr('id'),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            default:
                                item = undefined;
                        }
                        break;

                    case 'hr':
                        item = '-------';
                        break;

                    case 'input':
                        switch ($node.attr('type')) {
                            case 'text':
                                item = {
                                    type: 'text',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    value: $node.val()
                                };
                                break;

                            case 'checkbox':
                                item = {
                                    type: 'checkbox',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            case 'radio':
                                item = {
                                    type: 'radio',
                                    name: label || builder.inputLabel(node),
                                    disabled: !!$node.attr('disabled'),
                                    radio: !!$node.attr('name'),
                                    value: $node.val(),
                                    selected: !!$node.attr('checked')
                                };
                                break;

                            default:
                                item = undefined;
                                break;
                        }
                        break;

                    case 'select':
                        item = {
                            type: 'select',
                            name: label || builder.inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            selected: $node.val(),
                            options: {}
                        };
                        $node.children().each(function () {
                            item.options[this.value] = $(this).text();
                        });
                        break;

                    case 'textarea':
                        item = {
                            type: 'textarea',
                            name: label || builder.inputLabel(node),
                            disabled: !!$node.attr('disabled'),
                            value: $node.val()
                        };
                        break;

                    case 'label':
                        break;

                    default:
                        item = { type: 'html', html: $node.clone(true) };
                        break;
                }

                if (item) {
                    counter++;
                    items['key' + counter] = item;
                }
            });

            return counter;
        }
    }]);

    return Html5Builder;
}();

exports.default = Html5Builder;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = __webpack_require__(3);

var _defaults2 = _interopRequireDefault(_defaults);

var _EventListener = __webpack_require__(0);

var _EventListener2 = _interopRequireDefault(_EventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventHandler = function () {
    function EventHandler() {
        _classCallCheck(this, EventHandler);

        this.$currentTrigger = null;
        this.hoveract = {};
    }

    _createClass(EventHandler, [{
        key: 'abortevent',
        value: function abortevent(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, {
        key: 'contextmenu',
        value: function contextmenu(e) {
            var $this = $(this);

            if (!e._contextMenuData) {
                throw new Error('No data attached');
            }

            if (e._contextMenuData.trigger === 'right') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            if (e._contextMenuData.trigger !== 'right' && e._contextMenuData.trigger !== 'demand' && e.originalEvent) {
                return;
            }

            if (typeof e.mouseButton !== 'undefined') {
                if (!(e._contextMenuData.trigger === 'left' && e.mouseButton === 0) && !(e._contextMenuData.trigger === 'right' && e.mouseButton === 2)) {
                    return;
                }
            }

            if (this.classList.contains('context-menu-active')) {
                return;
            }

            if (!this.classList.contains('context-menu-disabled')) {

                e._contextMenuData.manager.handler.$currentTrigger = $this;
                if (e._contextMenuData.build) {
                    var built = e._contextMenuData.build(e, $this);

                    if (built === false) {
                        return;
                    }

                    e._contextMenuData = $.extend(true, {}, _defaults2.default, e._contextMenuData, built || {});

                    if (!e._contextMenuData.items || $.isEmptyObject(e._contextMenuData.items)) {
                        if (window.console) {
                            (console.error || console.log).call(console, 'No items specified to show in contextMenu');
                        }

                        throw new Error('No Items specified');
                    }

                    e._contextMenuData.$trigger = e._contextMenuData.manager.handler.$currentTrigger;

                    e._contextMenuData.manager.operations.create(e, e._contextMenuData);
                }
                var showMenu = false;

                Object.keys(e._contextMenuData.items).forEach(function (key) {
                    var visible = void 0;
                    if (typeof e._contextMenuData.items[key].visible === 'function') {
                        visible = e._contextMenuData.items[key].visible.call($this, e, key, e._contextMenuData, e._contextMenuData);
                    } else if (typeof e._contextMenuData.items[key].visible !== 'undefined') {
                        visible = e._contextMenuData.items[key].visible === true;
                    } else {
                        visible = true;
                    }
                    if (visible) {
                        showMenu = true;
                    }
                });

                if (showMenu) {
                    e._contextMenuData.manager.operations.show.call($this, e, e._contextMenuData, e.pageX, e.pageY);
                }
            }
        }
    }, {
        key: 'click',
        value: function click(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            _EventListener2.default.triggerEvent(this, 'contextmenu', { data: e._contextMenuData, pageX: e.pageX, pageY: e.pageY, originalEvent: e });
        }
    }, {
        key: 'mousedown',
        value: function mousedown(e) {
            var $this = $(this);

            if (e._contextMenuData.manager.handler.$currentTrigger && e._contextMenuData.manager.handler.$currentTrigger.length && !e._contextMenuData.manager.handler.$currentTrigger.is($this)) {
                _EventListener2.default.triggerEvent(e._contextMenuData.manager.handler.$currentTrigger.data('contextMenu').$menu.get(0), 'contextmenu', { data: e._contextMenuData, originalEvent: e });
            }

            if (e.button === 2) {
                e._contextMenuData.manager.handler.$currentTrigger = $this.data('contextMenuActive', true);
            }
        }
    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            var $this = $(this);
            if ($this.data('contextMenuActive') && e._contextMenuData.manager.handler.$currentTrigger && e._contextMenuData.manager.handler.$currentTrigger.length && e._contextMenuData.manager.handler.$currentTrigger.is($this) && !this.classList.contains('context-menu-disabled')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e._contextMenuData.manager.handler.$currentTrigger = $this;
                _EventListener2.default.triggerEvent(this, 'contextmenu', { data: e._contextMenuData, pageX: e.pageX, pageY: e.pageY, originalEvent: e });
            }

            $this.removeData('contextMenuActive');
        }
    }, {
        key: 'mouseenter',
        value: function mouseenter(e) {
            var $related = $(e.relatedTarget);

            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }

            if (e._contextMenuData.manager.handler.$currentTrigger && e._contextMenuData.manager.handler.$currentTrigger.length) {
                return;
            }

            e._contextMenuData.manager.handler.hoveract.pageX = e.pageX;
            e._contextMenuData.manager.handler.hoveract.pageY = e.pageY;
            e._contextMenuData.manager.handler.hoveract.data = e._contextMenuData;
        }
    }, {
        key: 'mousemove',
        value: function mousemove(e) {
            e._contextMenuData.manager.handler.hoveract.pageX = e.pageX;
            e._contextMenuData.manager.handler.hoveract.pageY = e.pageY;
        }
    }, {
        key: 'mouseleave',
        value: function mouseleave(e) {
            var $related = $(e.relatedTarget);
            if ($related.is('.context-menu-list') || $related.closest('.context-menu-list').length) {
                return;
            }

            try {
                clearTimeout(e._contextMenuData.manager.handler.hoveract.timer);
            } catch (e) {}

            e._contextMenuData.manager.handler.hoveract.timer = null;
        }
    }, {
        key: 'layerClick',
        value: function layerClick(e) {
            var root = e._contextMenuData;

            if (root === null || typeof root === 'undefined') {
                throw new Error('No ContextMenuData found');
            }

            var button = e.button;
            var x = e.pageX;
            var y = e.pageY;
            var fakeClick = x === undefined;
            var target = void 0;
            var offset = void 0;

            e.preventDefault();

            setTimeout(function () {
                if (fakeClick) {
                    if (root.$menu !== null && typeof root.$menu !== 'undefined') {
                        root.$menu.trigger('contextmenu:hide', { data: root, originalEvent: e });
                    }
                    return;
                }

                var $window = $(window);
                var triggerAction = root.trigger === 'left' && button === 0 || root.trigger === 'right' && button === 2;

                if (document.elementFromPoint && root.$layer) {
                    root.$layer.hide();
                    target = document.elementFromPoint(x - $window.scrollLeft(), y - $window.scrollTop());

                    if (target.isContentEditable) {
                        var range = document.createRange();
                        var sel = window.getSelection();
                        range.selectNode(target);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    _EventListener2.default.triggerEvent(target, e);
                    root.$layer.show();
                }

                if (root.hideOnSecondTrigger && triggerAction && root.$menu !== null && typeof root.$menu !== 'undefined') {
                    _EventListener2.default.triggerEvent(root.$menu.get(0), 'contextmenu:hide', { data: root, originalEvent: e });
                    return;
                }

                if (root.reposition && triggerAction) {
                    if (document.elementFromPoint) {
                        if (root.$trigger.is(target)) {
                            root.position.call(root.$trigger, e, root, x, y);
                            return;
                        }
                    } else {
                        offset = root.$trigger.offset();
                        var _$window = $(window);

                        offset.top += _$window.scrollTop();
                        if (offset.top <= e.pageY) {
                            offset.left += _$window.scrollLeft();
                            if (offset.left <= e.pageX) {
                                offset.bottom = offset.top + root.$trigger.outerHeight();
                                if (offset.bottom >= e.pageY) {
                                    offset.right = offset.left + root.$trigger.outerWidth();
                                    if (offset.right >= e.pageX) {
                                        root.position.call(root.$trigger, e, root, x, y);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }

                if (target && triggerAction) {
                    root.$trigger.one('contextmenu:hidden', function () {
                        $(target).contextMenu({ x: x, y: y, button: button, originalEvent: e });
                    });
                }

                if (root.$menu !== null && typeof root.$menu !== 'undefined') {
                    _EventListener2.default.triggerEvent(root.$menu.get(0), 'contextmenu:hide', { data: root, originalEvent: e });
                }
            }, 50);
        }
    }, {
        key: 'keyStop',
        value: function keyStop(e, currentMenuData) {
            if (!currentMenuData.isInput) {
                e.preventDefault();
            }

            e.stopPropagation();
        }
    }, {
        key: 'key',
        value: function key(e) {
            var rootMenuData = {};

            if (e._contextMenuData.manager.handler.$currentTrigger) {
                rootMenuData = e._contextMenuData.manager.handler.$currentTrigger.data('contextMenu') || {};
            }

            if (typeof rootMenuData.zIndex === 'undefined') {
                rootMenuData.zIndex = 0;
            }
            var getZIndexOfTriggerTarget = function getZIndexOfTriggerTarget(target) {
                if (target.style.zIndex !== '') {
                    return target.style.zIndex;
                } else {
                    if (target.offsetParent !== null && typeof target.offsetParent !== 'undefined') {
                        return getZIndexOfTriggerTarget(target.offsetParent);
                    } else if (target.parentElement !== null && typeof target.parentElement !== 'undefined') {
                        return getZIndexOfTriggerTarget(target.parentElement);
                    }
                }
            };
            var targetZIndex = getZIndexOfTriggerTarget(e.target);

            if (rootMenuData.$menu && parseInt(targetZIndex, 10) > parseInt(rootMenuData.$menu.css('zIndex'), 10)) {
                return;
            }
            switch (e.keyCode) {
                case 9:
                case 38:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);

                    if (rootMenuData.isInput) {
                        if (e.keyCode === 9 && e.shiftKey) {
                            e.preventDefault();
                            if (rootMenuData.$selected) {
                                rootMenuData.$selected.find('input, textarea, select').blur();
                            }
                            if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                                _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'prevcommand', { data: rootMenuData, originalEvent: e });
                            }
                            return;
                        } else if (e.keyCode === 38 && rootMenuData.$selected.find('input, textarea, select').prop('type') === 'checkbox') {
                            e.preventDefault();
                            return;
                        }
                    } else if (e.keyCode !== 9 || e.shiftKey) {
                        if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                            _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'prevcommand', { data: rootMenuData, originalEvent: e });
                        }
                        return;
                    }
                    break;

                case 40:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput) {
                        if (e.keyCode === 9) {
                            e.preventDefault();
                            if (rootMenuData.$selected) {
                                rootMenuData.$selected.find('input, textarea, select').blur();
                            }
                            if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                                _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'nextcommand', { data: rootMenuData, originalEvent: e });
                            }
                            return;
                        } else if (e.keyCode === 40 && rootMenuData.$selected.find('input, textarea, select').prop('type') === 'checkbox') {
                            e.preventDefault();
                            return;
                        }
                    } else {
                        if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                            _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'nextcommand', { data: rootMenuData, originalEvent: e });
                        }
                        return;
                    }
                    break;

                case 37:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput || !rootMenuData.$selected || !rootMenuData.$selected.length) {
                        break;
                    }

                    if (!rootMenuData.$selected.parent().hasClass('context-menu-root')) {
                        var $parent = rootMenuData.$selected.parent().parent();
                        _EventListener2.default.triggerEvent(rootMenuData.$selected.get(0), 'contextmenu:blur', { data: rootMenuData, originalEvent: e }, true);
                        rootMenuData.$selected = $parent;
                        return;
                    }
                    break;

                case 39:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput || !rootMenuData.$selected || !rootMenuData.$selected.length) {
                        break;
                    }

                    var itemdata = rootMenuData.$selected.data('contextMenu') || {};
                    if (itemdata.$menu && rootMenuData.$selected.hasClass('context-menu-submenu')) {
                        rootMenuData.$selected = null;
                        itemdata.$selected = null;
                        _EventListener2.default.triggerEvent(itemdata.$menu.get(0), 'nextcommand', { data: itemdata, originalEvent: e });
                        return;
                    }
                    break;

                case 35:
                case 36:
                    if (rootMenuData.$selected && rootMenuData.$selected.find('input, textarea, select').length) {
                        break;
                    } else {
                        (rootMenuData.$selected && rootMenuData.$selected.parent() || rootMenuData.$menu).children(':not(.' + rootMenuData.classNames.disabled + ', .' + rootMenuData.classNames.notSelectable + ')')[e.keyCode === 36 ? 'first' : 'last']().trigger('contextmenu:focus', { data: rootMenuData, originalEvent: e }, false);

                        e.preventDefault();
                        break;
                    }
                case 13:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.isInput) {
                        if (rootMenuData.$selected && !rootMenuData.$selected.is('textarea, select')) {
                            e.preventDefault();
                            return;
                        }
                        break;
                    }
                    if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                        _EventListener2.default.triggerEvent(rootMenuData.$selected.get(0), 'mouseup', { data: rootMenuData, originalEvent: e });
                    }
                    return;
                case 32:
                case 33:
                case 34:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    return;

                case 27:
                    e._contextMenuData.manager.handler.keyStop(e, rootMenuData);
                    if (rootMenuData.$menu !== null && typeof rootMenuData.$menu !== 'undefined') {
                        _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'contextmenu:hide', { data: rootMenuData, originalEvent: e });
                    }
                    return;

                default:
                    var k = String.fromCharCode(e.keyCode).toUpperCase();
                    if (rootMenuData.accesskeys && rootMenuData.accesskeys[k]) {
                        rootMenuData.accesskeys[k].$node.trigger(rootMenuData.accesskeys[k].$menu ? 'contextmenu:focus' : 'mouseup', {
                            data: rootMenuData,
                            originalEvent: e
                        }, false);
                        return;
                    }
                    break;
            }

            e.stopPropagation();
            if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                rootMenuData.$selected.get(0).dispatchEvent(e);
            }
        }
    }, {
        key: 'prevItem',
        value: function prevItem(e) {
            e.stopPropagation();
            var currentMenuData = $(this).data('contextMenu') || {};
            var rootMenuData = $(this).data('contextMenuRoot') || {};

            if (currentMenuData.$selected) {
                var $s = currentMenuData.$selected;
                currentMenuData = currentMenuData.$selected.parent().data('contextMenu') || {};
                currentMenuData.$selected = $s;
            }

            var $children = currentMenuData.$menu.children();
            var $prev = !currentMenuData.$selected || !currentMenuData.$selected.prev().length ? $children.last() : currentMenuData.$selected.prev();
            var $round = $prev;

            while ($prev.hasClass(rootMenuData.classNames.disabled) || $prev.hasClass(rootMenuData.classNames.notSelectable) || $prev.is(':hidden')) {
                if ($prev.prev().length) {
                    $prev = $prev.prev();
                } else {
                    $prev = $children.last();
                }

                if ($prev.is($round)) {
                    return;
                }
            }

            if (currentMenuData.$selected) {
                rootMenuData.manager.handler.itemMouseleave.call(currentMenuData.$selected.get(0), e);
            }

            rootMenuData.manager.handler.itemMouseenter.call($prev.get(0), e);

            var $input = $prev.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        }
    }, {
        key: 'nextItem',
        value: function nextItem(e) {
            e.stopPropagation();
            var currentMenuData = $(this).data('contextMenu') || {};
            var rootMenuData = $(this).data('contextMenuRoot') || {};

            if (currentMenuData.$selected) {
                var $s = currentMenuData.$selected;
                currentMenuData = currentMenuData.$selected.parent().data('contextMenu') || {};
                currentMenuData.$selected = $s;
            }

            var $children = currentMenuData.$menu.children();
            var $next = !currentMenuData.$selected || !currentMenuData.$selected.next().length ? $children.first() : currentMenuData.$selected.next();
            var $round = $next;

            while ($next.hasClass(rootMenuData.classNames.disabled) || $next.hasClass(rootMenuData.classNames.notSelectable) || $next.is(':hidden')) {
                if ($next.next().length) {
                    $next = $next.next();
                } else {
                    $next = $children.first();
                }
                if ($next.is($round)) {
                    break;
                }
            }

            if (currentMenuData.$selected) {
                rootMenuData.manager.handler.itemMouseleave.call(currentMenuData.$selected.get(0), e);
            }

            rootMenuData.manager.handler.itemMouseenter.call($next.get(0), e);

            var $input = $next.find('input, textarea, select');
            if ($input.length) {
                $input.focus();
            }
        }
    }, {
        key: 'focusInput',
        value: function focusInput(e) {
            var $this = $(this).closest('.context-menu-item');
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.$selected = currentMenuData.$selected = $this;
            rootMenuData.isInput = currentMenuData.isInput = true;
        }
    }, {
        key: 'blurInput',
        value: function blurInput(e) {
            var $this = $(this).closest('.context-menu-item');
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.isInput = currentMenuData.isInput = false;
        }
    }, {
        key: 'menuMouseenter',
        value: function menuMouseenter(e) {
            var root = e._contextMenuData;
            root.hovering = true;
        }
    }, {
        key: 'menuMouseleave',
        value: function menuMouseleave(e) {
            var root = e._contextMenuData;
            if (root.$layer && root.$layer.is(e.relatedTarget)) {
                root.hovering = false;
            }
        }
    }, {
        key: 'itemMouseenter',
        value: function itemMouseenter(e) {
            console.log('itemmouseenter');
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            rootMenuData.hovering = true;

            if (e && rootMenuData.$layer && rootMenuData.$layer.is(e.relatedTarget)) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            if (this.classList.contains(rootMenuData.classNames.disabled) || this.classList.contains(rootMenuData.classNames.notSelectable)) {
                currentMenuData.$selected = null;
                return;
            }

            e.stopPropagation();
            _EventListener2.default.triggerEvent(this, 'contextmenu:focus', { data: currentMenuData, originalEvent: e }, true);
        }
    }, {
        key: 'itemMouseleave',
        value: function itemMouseleave(e) {
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if (rootMenuData !== currentMenuData && rootMenuData.$layer && rootMenuData.$layer.is(e.relatedTarget)) {
                if (typeof rootMenuData.$selected !== 'undefined' && rootMenuData.$selected !== null) {
                    console.log('blur itemmouseleave?');
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                rootMenuData.$selected = currentMenuData.$selected = currentMenuData.$node;
            }
        }
    }, {
        key: 'itemClick',
        value: function itemClick(e) {
            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;
            var key = data.contextMenuKey;
            var callback = void 0;

            if (!currentMenuData.items[key] || $this.is('.' + rootMenuData.classNames.disabled + ', .context-menu-separator, .' + rootMenuData.classNames.notSelectable) || $this.is('.context-menu-submenu') && rootMenuData.selectableSubMenu === false) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            if (typeof currentMenuData.callbacks[key] === 'function' && Object.prototype.hasOwnProperty.call(currentMenuData.callbacks, key)) {
                callback = currentMenuData.callbacks[key];
            } else if (typeof rootMenuData.callback === 'function') {
                callback = rootMenuData.callback;
            } else {
                return;
            }

            if (callback.call(rootMenuData.$trigger, e, key, currentMenuData, rootMenuData) !== false) {
                _EventListener2.default.triggerEvent(rootMenuData.$menu.get(0), 'contextmenu:hide');
            } else if (rootMenuData.$menu.parent().length) {
                rootMenuData.manager.operations.update.call(rootMenuData.$trigger, e, rootMenuData);
            }
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            e.stopImmediatePropagation();
        }
    }, {
        key: 'hideMenu',
        value: function hideMenu(e, data) {
            var root = $(this).data('contextMenuRoot');
            root.manager.operations.hide.call(root.$trigger, e, root, data && data.force);
        }
    }, {
        key: 'focusItem',
        value: function focusItem(e) {

            var $this = $(this);
            var data = $this.data();
            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if (this.classList.contains(rootMenuData.classNames.disabled) || this.classList.contains(rootMenuData.classNames.notSelectable)) {
                return;
            }

            var $elements = $this.addClass([rootMenuData.classNames.hover, rootMenuData.classNames.visible].join(' ')).parent().find('> .context-menu-item').not($this).removeClass(rootMenuData.classNames.visible).filter('.' + rootMenuData.classNames.hover);

            if ($elements.length > 0) {
                $elements.each(function (i, element) {
                    if (!element.isEqualNode(e.target)) {
                        _EventListener2.default.triggerEvent(element, 'contextmenu:blur', { data: currentMenuData }, true);
                    }
                });
            }

            currentMenuData.$selected = rootMenuData.$selected = $this;

            if (currentMenuData.$node && currentMenuData.$node.hasClass('context-menu-submenu')) {
                currentMenuData.$node.addClass(rootMenuData.classNames.hover);
                currentMenuData.$node.addClass(rootMenuData.classNames.visible);
            }

            if (currentMenuData.$node) {
                if (currentMenuData.$node.get(0).isEqualNode(e.target)) {
                    rootMenuData.positionSubmenu.call(currentMenuData.$node, e, currentMenuData.$menu);
                }
            }
        }
    }, {
        key: 'blurItem',
        value: function blurItem(e) {
            var $this = $(this);
            var data = $this.data();

            var currentMenuData = data.contextMenu;
            var rootMenuData = data.contextMenuRoot;

            if (rootMenuData.autoHide) {
                $this.removeClass(rootMenuData.classNames.visible);
            }
            $this.removeClass(rootMenuData.classNames.hover);
            currentMenuData.$selected = null;
        }
    }]);

    return EventHandler;
}();

exports.default = EventHandler;
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(15);

var _ContextMenu = __webpack_require__(4);

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _ItemTypes = __webpack_require__(2);

var _ItemTypes2 = _interopRequireDefault(_ItemTypes);

var _contextMenu = __webpack_require__(13);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _ContextMenu2.default();

var contextMenu = function contextMenu(operation, options) {
    manager.execute(operation, options);
};

contextMenu.getInputValues = function (currentMenuData, data) {
    return manager.getInputValues(currentMenuData, data);
};
contextMenu.setInputValues = function (currentMenuData, data) {
    return manager.getInputValues(currentMenuData, data);
};
contextMenu.fromMenu = function (element) {
    return manager.html5builder.fromMenu(element);
};

contextMenu.defaults = manager.defaults;
contextMenu.types = manager.defaults.types;
contextMenu.manager = manager;

contextMenu.handle = manager.handler;
contextMenu.operations = manager.operations;
contextMenu.menus = manager.menus;
contextMenu.namespaces = manager.namespaces;

$.fn.contextMenu = _contextMenu2.default;
$.contextMenu = contextMenu;

module.exports = { ContextMenu: _ContextMenu2.default, ContextMenuItemTypes: _ItemTypes2.default };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (operation) {
    var $t = this;
    var $o = operation;
    if ($t.length > 0) {
        if (typeof operation === 'undefined') {
            _EventListener2.default.triggerEvent($t.get(0), 'contextmenu');
        } else if (typeof operation.x !== 'undefined' && typeof operation.y !== 'undefined') {
            _EventListener2.default.triggerEvent($t.get(0), 'contextmenu', {
                pageX: operation.x,
                pageY: operation.y,
                mouseButton: operation.button
            });
        } else if (operation === 'hide') {
            var $menu = this.first().data('contextMenu') ? this.first().data('contextMenu').$menu : null;
            if ($menu) {
                _EventListener2.default.triggerEvent($menu.get(0), 'contextmenu:hide');
            }
        } else if (operation === 'destroy') {
            $.contextMenu('destroy', { context: this });
        } else if (operation === 'update') {
            $.contextMenu('update', { context: this });
        } else if ($.isPlainObject(operation)) {
            operation.context = this;
            $.contextMenu('create', operation);
        } else if (operation === true) {
            $t.removeClass('context-menu-disabled');
        } else if (operation === false) {
            $t.addClass('context-menu-disabled');
        }
    } else {
        $.each($.contextMenu.menus, function () {
            if (this.selector === $t.selector) {
                $o.data = this;

                $.extend($o.data, { trigger: 'demand' });
            }
        });

        $.contextMenu.handle.contextmenu.call($o.target, $o);
    }

    return this;
};

var _EventListener = __webpack_require__(0);

var _EventListener2 = _interopRequireDefault(_EventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);