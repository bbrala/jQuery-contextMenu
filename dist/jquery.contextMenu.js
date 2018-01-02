/*!
 * 
 * jQuery contextMenu v3.0.0-beta.1 - Plugin for simple contextMenu handling
 * 
 * Version: v3.0.0-beta.1
 * 
 * Authors: Björn Brala (SWIS.nl), Rodney Rehm, Addy Osmani (patches for FF)
 * 
 * Web: http://swisnl.github.io/jQuery-contextMenu/
 * 
 * Copyright (c) 2011-2018 SWIS BV and contributors
 * 
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 * 
 * Date: 2018-01-02T14:59:31.530Z
 * 
 * 
 */(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ContextMenu"] = factory();
	else
		root["ContextMenu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ContextMenuItemTypes = {
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

exports.default = ContextMenuItemTypes;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _ContextMenu = __webpack_require__(4);

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _ContextMenuItemTypes = __webpack_require__(0);

var _ContextMenuItemTypes2 = _interopRequireDefault(_ContextMenuItemTypes);

var _contextMenuFunction = __webpack_require__(10);

var _contextMenuFunction2 = _interopRequireDefault(_contextMenuFunction);

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

$.fn.contextMenu = _contextMenuFunction2.default;
$.contextMenu = contextMenu;

module.exports = { ContextMenu: _ContextMenu2.default, ContextMenuItemTypes: _ContextMenuItemTypes2.default };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: C:/projecten/jQuery-contextMenu/src/js/classes/ContextMenu.js: Unexpected token (429:5)\n\n\u001b[0m \u001b[90m 427 | \u001b[39m        el\u001b[33m.\u001b[39mdispatchEvent(event)\u001b[33m;\u001b[39m\n \u001b[90m 428 | \u001b[39m        \u001b[36mreturn\u001b[39m \u001b[33m!\u001b[39mevent\u001b[33m.\u001b[39mdefaultPrevented\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 429 | \u001b[39m    }\u001b[33m,\u001b[39m\n \u001b[90m     | \u001b[39m     \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 430 | \u001b[39m\n \u001b[90m 431 | \u001b[39m\n \u001b[90m 432 | \u001b[39m}\u001b[0m\n");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
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
            $t.first().trigger('contextmenu');
        } else if (typeof operation.x !== 'undefined' && typeof operation.y !== 'undefined') {
            $t.first().trigger($.Event('contextmenu', {
                pageX: operation.x,
                pageY: operation.y,
                mouseButton: operation.button
            }));
        } else if (operation === 'hide') {
            var $menu = this.first().data('contextMenu') ? this.first().data('contextMenu').$menu : null;
            if ($menu) {
                $menu.trigger('contextmenu:hide');
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

/***/ })
/******/ ]);
});