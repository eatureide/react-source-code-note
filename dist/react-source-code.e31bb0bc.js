// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"react-dom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;

var _index = require("./index");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function diff(dom, vnode, container) {
  // 对比节点变化
  var ret = diffNode(dom, vnode);

  if (container) {
    container.appendChild(ret);
  }

  return vnode;
}

function diffNode(dom, vnode) {
  var out = dom; // 如果vnode是undefine、null、boolean类型，则把它置为空

  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      if (dom.textContext !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      out = document.createTextNode(vnode);

      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }

    return out;
  }

  if (!dom) {
    out = document.createElement(vnode.tag);
  }

  if (vnode.childrens && vnode.childrens.length > 0 || out.childNodes && out.childNodes.length > 0) {
    diffChildren(out, vnode.childNodes);
  }

  diffAttribute(out, vnode);
  return out;
}

function diffChildren(dom, vChildrens) {
  var domChildren = dom.childNodes;
  console.log(domChildren);
}

function diffAttribute(dom, vnode) {
  var oldAttrs = {};
  var newAttrs = vnode.attrs;
  var domAttrs = dom.attributes;

  var domAttrsArray = _toConsumableArray(domAttrs).forEach(function (item) {
    oldAttrs[item.name] = item.value;
  });

  for (var key in oldAttrs) {
    if (!(key in newAttrs)) {
      (0, _index.setAttribute)(dom, key, undefined);
    }
  }

  for (var _key in newAttrs) {
    if (oldAttrs[_key] !== newAttrs[_key]) {
      (0, _index.setAttribute)(dom, _key, newAttrs[_key]);
    }
  }
}
},{"./index":"react-dom/index.js"}],"react-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.renderComponent = renderComponent;
exports.setAttribute = setAttribute;

var _component = _interopRequireDefault(require("../react/component"));

var _diff = require("./diff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var ReactDOM = {
  render: render
};

function render(vnode, container, dom) {
  // console.log(vnode)
  return (0, _diff.diff)(dom, vnode, container); // return container.appendChild(_render(vnode, container))
}

function createComponent(comp, props) {
  var inst = null; // 如果是类定义的组件，则创建实例

  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props);
  } else {
    // 如果是函数组件，将函数组件转换为类组件，方便后面统一管理
    inst = new _component.default(props);
    inst.constructor = comp; // 定义render函数

    inst.render = function () {
      return this.constructor(props);
    };
  }

  return inst;
}

function setComponentProps(comp, props) {
  if (!comp.base) {
    if (comp.componentWillMount) comp.componentWillMount();
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps();
  } // 设置组件属性


  comp.props = props; // 渲染组件

  renderComponent(comp);
}

function renderComponent(comp) {
  var base = null;
  var renderer = comp.render(); // jsx对象

  base = _render(renderer); // js节点对象

  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }

  if (comp.base) {
    if (comp.componentDidUpdate) comp.componentDidUpdate();
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  }

  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }

  comp.base = base;
}
/**
 * 函数render接收两个参数
 * vnode，一个是jsx对象（也就是babel转换后的对象）
 * container，经过render内逻辑处理后被插入的节点
 */


function _render(vnode, container) {
  // 如果vnode是undefine、null、boolean类型，则把它置为空
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  } // 如果传入的vnode是一个字符串的话，则创建text节点并插入到指定的节点后返回即可


  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  } // 如果vnode是一个函数，则渲染组件


  if (typeof vnode.tag === 'function') {
    // 1、创建组件
    var comp = createComponent(vnode.tag, vnode.attrs); // // 2、设置组件属性

    setComponentProps(comp, vnode, attrs); // // 3、组件渲染的节点对象返回

    return comp.base;
  } // 如果vnode是对象的话，则先获取tag和attrs属性


  var _vnode = vnode,
      tag = _vnode.tag,
      attrs = _vnode.attrs;
  var dom = document.createElement(tag); // 如果有自定义属性attrs，则遍历该对象，将它逐步设置在指定的dom上，这里的dom注意可能是vode第一级tag，也有可能是child内的tag，因为会做递归

  if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];
      setAttribute(dom, key, value);
    });
  } // 遍历子节点，逐步递归到vnode为空为止


  if (vnode.childrens) {
    vnode.childrens.forEach(function (child) {
      render(child, dom);
    });
  }

  return dom;
}
/** 
 * 函数setAttribute接受三个参数
 * dom，将要处理的节点
 * key，设置dom属性的名称
 * value，设置dom属性的值
*/


function setAttribute(dom, key, value) {
  // 将属性名className转换为class
  if (key === 'className') {
    key = 'class';
  } // 如果是个事件(因为react的检测规则，需要以on开头)，将属性直接设置进dom内


  if (/on\w+/.test(key)) {
    // 转成小写
    key = key.toLowerCase();
    dom[key] = value || '';
  } //  如果是style
  else if (key === 'style') {
      // style可能会是对象，或者是字符串，如果是字符串的话直接设置csstext
      if (!value || typeof value === 'string') {
        dom.style.cssText = value || '';
      } // 如果style是对象，则遍历对象并设置进dom内
      else if (value && _typeof(value) === 'object') {
          for (var k in value) {
            // number的话帮它加入单位，这里是简单处理
            if (typeof value[key] === 'number') {
              dom.style[key] = value[k] + 'px';
            } else {
              dom.style[k] = value[k];
            }
          }
        }
    } // 既不事件，也不是style样式
    else {
        // 如果这个属性dom已经有了，则直接更新
        if (key in dom) {
          dom[key] = value || '';
        } // 有value的话则设置属性和值


        if (value) {
          dom.setAttribute(key, value);
        } else {
          // 没有的话只设置属性
          dom.removeAttribute(key);
        }
      }
}

var _default = ReactDOM;
exports.default = _default;
},{"../react/component":"react/component.js","./diff":"react-dom/diff.js"}],"react/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = require("../react-dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Component =
/*#__PURE__*/
function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      // 对象拷贝
      Object.assign(this.state, stateChange); // 渲染组件

      (0, _reactDom.renderComponent)(this);
    }
  }]);

  return Component;
}();

var _default = Component;
exports.default = _default;
},{"../react-dom":"react-dom/index.js"}],"react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createElement(tag, attrs) {
  for (var _len = arguments.length, childrens = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childrens[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    // 外层标签
    attrs: attrs,
    // attrs 属性 对象
    childrens: childrens,
    // 一个数组
    key: attrs.key || null
  };
}

var _default = {
  createElement: createElement,
  Component: _component.default
};
exports.default = _default;
},{"./component":"react/component.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("./react"));

var _reactDom = _interopRequireDefault(require("./react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ele = _react.default.createElement("div", {
  className: "active",
  title: "123"
}, "hello,", _react.default.createElement("span", null, "react")); // function Home() {
//   return (
//     <div className="active" title="123">
//       hello,<span>react</span>
//     </div>
//   )
// }


var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  var _super = _createSuper(Home);

  function Home(props) {
    var _this;

    _classCallCheck(this, Home);

    _this = _super.call(this, props);
    _this.state = {
      num: 0
    };
    return _this;
  }

  _createClass(Home, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('组件将要加载');
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      console.log('props');
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      console.log('组件将要更新');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log('组件更新完成');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('组件加载完成');
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        num: this.state.num + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "active",
        title: "123"
      }, "hello,", _react.default.createElement("span", null, "react"), this.state.num, _react.default.createElement("button", {
        onClick: function onClick() {
          return _this2.handleClick();
        }
      }, "click me"));
    }
  }]);

  return Home;
}(_react.default.Component); // console.log(<Test />)


_reactDom.default.render(ele, document.querySelector('#root'));
},{"./react":"react/index.js","./react-dom":"react-dom/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52500" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/react-source-code.e31bb0bc.js.map