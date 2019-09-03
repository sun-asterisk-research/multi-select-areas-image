/*!
 * multi-select-areas-image v0.1.2
 * (c) quanghung97
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  data: function data() {
    return {
      pos: null
    };
  },
  props: {
    item: {
      type: Object,
      "default": null
    },
    posImg: {
      type: Object,
      "default": null
    }
  },
  methods: {
    startDrag: function startDrag(item, type) {
      this.pos = type;
      document.addEventListener('mousemove', this.doDrag);
      this.$emit('startDrag');
    },
    doDrag: function doDrag(e) {
      this.$emit('doDrag', this.item, this.pos, e);
    }
  },
  updated: function updated() {
    if (this.item.resizable == false) {
      window.addEventListener('mouseup', document.removeEventListener('mousemove', this.doDrag));
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "handler"
  }, [_vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler w",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'w-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left - 6 + 'px',
      top: _vm.item.y + _vm.posImg.top + _vm.item.height / 2 - 4 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'w');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler sw",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'sw-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left - 4 + 'px',
      top: _vm.item.y + _vm.posImg.top + _vm.item.height - 6 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'sw');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler s",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 's-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left + _vm.item.width / 2 - 4 + 'px',
      top: _vm.item.y + _vm.posImg.top + _vm.item.height - 6 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 's');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler se",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'se-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left + _vm.item.width - 6 + 'px',
      top: _vm.item.y + _vm.posImg.top + _vm.item.height - 6 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'se');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler e",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'e-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left + _vm.item.width - 6 + 'px',
      top: _vm.item.y + _vm.posImg.top + _vm.item.height / 2 - 6 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'e');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler ne",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'ne-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left + _vm.item.width - 6 + 'px',
      top: _vm.item.y + _vm.posImg.top - 4 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'ne');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler n",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'n-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left + _vm.item.width / 2 - 4 + 'px',
      top: _vm.item.y + _vm.posImg.top - 4 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'n');
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.item.resizable ? _c('div', {
    staticClass: "select-areas-resize-handler nw",
    style: {
      opacity: 0.5,
      position: 'absolute',
      cursor: 'nw-resize',
      display: 'block',
      left: _vm.item.x + _vm.posImg.left - 4 + 'px',
      top: _vm.item.y + _vm.posImg.top - 4 + 'px',
      'z-index': _vm.item.z + 10
    },
    on: {
      "mousedown": function mousedown($event) {
        $event.stopPropagation();
        $event.preventDefault();
        return _vm.startDrag(_vm.item, 'nw');
      }
    }
  }) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-06438e33_0", {
    source: ".select-areas-resize-handler[data-v-06438e33]{background-color:#000;border:1px #fff solid;height:8px;width:8px;overflow:hidden}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-06438e33";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var Resizable = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

//

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var script$1 = {
  data: function data() {
    return {
      mousedown: false,
      // state mouse down event
      originImgSize: {
        // root size image
        w: 0,
        h: 0,
        r: 0
      },
      url: this.cropUrl,
      posImg: {
        // position box image in screen
        top: 0,
        left: 0
      },
      scrollLeft: 0,
      scrollTop: 0,
      areas: [{
        id: 1,
        x: 100,
        y: 200,
        width: 200,
        height: 100,
        z: 0,
        resizable: false
      }],
      moveTempX: 0,
      moveTempY: 0,
      moveCurrentX: 0,
      moveCurrentY: 0,
      temp: 0,
      dragdown: false,
      // state mouse event drag,
      move: false
    };
  },
  props: {
    cropUrl: {
      type: String,
      "default": 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/45585072_925043081015026_6599956628924006400_o.jpg?_nc_cat=108&_nc_oc=AQlJUcFj4S_wGeX016thVhmgINU5wDV4xPBNSCIcYSti9Sm5WEPBDYO_kxK4aRP0Emo&_nc_ht=scontent.fhan2-3.fna&oh=052bb05956a1460d014205754da5a15b&oe=5DCC1053'
    },
    width: {
      type: Number,
      "default": 1500
    },
    opacityOutline: {
      type: Number,
      "default": 0.5
    },
    opacityOverlay: {
      type: Number,
      "default": 0.5
    }
  },
  components: {
    Resizable: Resizable
  },
  created: function created() {},
  watch: {
    cropUrl: function cropUrl(val) {
      var _this2 = this;

      this.url = val;
      setTimeout(function () {
        _this2.setSize();
      }, 200);
    },
    // send data to parent when list areas change
    areas: function areas() {
      var _this3 = this;

      setTimeout(function () {
        _this3.getListAreas();
      }, 200);
    }
  },
  methods: {
    setSize: function setSize() {
      try {
        var _this5 = this;

        if (!_this5.url) {
          return;
        }

        return _await(_this5.getSize(_this5.url), function (imgSize) {
          _this5.originImgSize = imgSize;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // Get the size of the src image
    getSize: function getSize(src) {
      var _this = this;

      var img = this.$el.querySelector('#c-crop--hide_img');
      return new Promise(function (resolve) {
        if (src && img) {
          img.onload = function () {
            // Compatible with unacceptable size
            var size = _this.getSizeImg(img);

            resolve(size);
          };

          img.src = src;
        } else {
          resolve({
            w: 0,
            h: 0,
            r: 0
          });
        }
      });
    },
    getSizeImg: function getSizeImg(img) {
      var w = img.width;
      var h = img.height;
      var r = w === 0 && h === 0 ? 0 : w / h;
      return {
        w: w,
        h: h,
        r: r
      };
    },
    calcPosOfBox: function calcPosOfBox() {
      // set posImg static
      var ref = this.$refs['image-area'];
      this.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.posImg.top = ref.getBoundingClientRect().top + this.scrollTop;
      this.posImg.left = ref.getBoundingClientRect().left + this.scrollLeft;
    },
    // draw rectangle on image mouseDown mouseMove mouseUp
    mouseDown: function mouseDown(e) {
      this.mousedown = true;

      if (this.areas.length > 0) {
        var idArea = this.areas.slice(-1).pop().id; // get last areas

        if (idArea) {
          this.areas.push({
            id: idArea + 1,
            x: e.pageX - this.posImg.left,
            y: e.pageY - this.posImg.top,
            width: 0,
            height: 0,
            z: 0,
            resizable: false
          });
          this.temp = idArea + 1;
        }
      } else {
        this.areas.push({
          id: 1,
          x: e.pageX - this.posImg.left,
          y: e.pageY - this.posImg.top,
          width: 0,
          height: 0,
          z: 0,
          resizable: false
        });
        this.temp = 1;
      }
    },
    mouseMove: function mouseMove(e) {
      var _this6 = this;

      if (this.mousedown) {
        this.areas.filter(function (x) {
          return x.id == _this6.temp;
        }).map(function (item) {
          item.width = e.pageX - item.x - _this6.posImg.left - 8;
          item.height = e.pageY - item.y - _this6.posImg.top - 8;
        });
      }
    },
    mouseUp: function mouseUp() {
      this.mousedown = false; // delete all point width is = 0

      this.areas = this.areas.filter(function (item) {
        return item.width != 0 || item.height != 0;
      });
    },
    // after click rectangle area select active resizable and dragable
    changeResizable: function changeResizable(id) {
      this.areas.filter(function (item) {
        return item.id == id;
      }).map(function (item) {
        item.resizable = true;
        item.z = 100;
      });
      this.areas.filter(function (item) {
        return item.id != id;
      }).map(function (item) {
        item.resizable = false;
        item.z = 0;
      });
    },
    // delete item area
    deleteSelected: function deleteSelected(id) {
      this.areas = this.areas.filter(function (item) {
        return item.id != id;
      });
    },
    // drag point around rectangle on image startDrag doDrag endDrag
    startDrag: function startDrag() {
      this.dragdown = true;
    },
    doDrag: function doDrag(item, type, e) {
      if (this.dragdown) {
        switch (type) {
          case 'w':
            // fix drag outside box w position
            if (e.pageX - this.posImg.left >= 0) {
              item.width = item.width + item.x - e.pageX + this.posImg.left;
              item.x = e.pageX - this.posImg.left;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            break;

          case 'sw':
            // fix drag outside box sw position
            if (e.pageX - this.posImg.left >= 0) {
              item.width = item.width + item.x - e.pageX + this.posImg.left;
              item.x = e.pageX - this.posImg.left;
            }

            if (e.pageY - this.posImg.top <= this.originImgSize.h) {
              item.height = e.pageY - this.posImg.top - item.y;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          case 's':
            // fix drag outside box s position
            if (e.pageY - this.posImg.top <= this.originImgSize.h) {
              item.height = e.pageY - this.posImg.top - item.y;
            } // fix minimum area


            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          case 'se':
            // fix drag outside box se position
            if (e.pageX - this.posImg.left <= this.originImgSize.w) {
              item.width = e.pageX - this.posImg.left - item.x;
            }

            if (e.pageY - this.posImg.top <= this.originImgSize.h) {
              item.height = e.pageY - this.posImg.top - item.y;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          case 'e':
            // fix drag outside box e position
            if (e.pageX - this.posImg.left <= this.originImgSize.w) {
              item.width = e.pageX - this.posImg.left - item.x;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            break;

          case 'ne':
            // fix drag outside box ne position
            if (e.pageX - this.posImg.left <= this.originImgSize.w) {
              item.width = e.pageX - this.posImg.left - item.x;
            }

            if (e.pageY - this.posImg.top >= 0) {
              item.height = item.height + (item.y + this.posImg.top - e.pageY);
              item.y = e.pageY - this.posImg.top;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          case 'n':
            // fix drag outside box n position
            if (e.pageY - this.posImg.top >= 0) {
              item.height = item.height + (item.y + this.posImg.top - e.pageY);
              item.y = e.pageY - this.posImg.top;
            } // fix minimum area


            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          case 'nw':
            // fix drag outside box nw position
            if (e.pageY - this.posImg.top >= 0) {
              item.height = item.height + (item.y + this.posImg.top - e.pageY);
              item.y = e.pageY - this.posImg.top;
            }

            if (e.pageX - this.posImg.left >= 0) {
              item.width = item.width + item.x - e.pageX + this.posImg.left;
              item.x = e.pageX - this.posImg.left;
            } // fix minimum area


            if (item.width < 10) {
              item.x = item.x - 10;
              item.width = item.width + 10;
            }

            if (item.height < 10) {
              item.height = item.height + 10;
            }

            break;

          default:
            break;
        }
      }
    },
    endDrag: function endDrag() {
      this.dragdown = false;
    },
    // move rectangle area startMove doMove endMove
    startMove: function startMove(item, e) {
      this.move = true;
      this.moveTempX = e.clientX;
      this.moveTempY = e.clientY;
      this.moveCurrentX = item.x;
      this.moveCurrentY = item.y;
    },
    doMove: function doMove(item, e) {
      if (this.move) {
        var x = this.moveCurrentX + (e.clientX - this.moveTempX);
        var y = this.moveCurrentY + (e.clientY - this.moveTempY);
        var maxX = this.originImgSize.w - item.width;
        var maxY = this.originImgSize.h - item.height;

        if (x > 0 && y > 0 && x < maxX && y < maxY) {
          item.x = x;
          item.y = y;
        }
      }
    },
    endMove: function endMove() {
      this.move = false;
    },
    // send data from child to parent $emit
    getListAreas: function getListAreas() {
      this.$emit('getListAreas', this.areas);
    }
  },
  mounted: function mounted() {
    this.setSize();
    window.addEventListener('mousemove', this.calcPosOfBox);
    window.addEventListener('scroll', this.calcPosOfBox);
    this.calcPosOfBox();
    window.addEventListener('mouseup', this.mouseUp);
    window.addEventListener('mouseup', this.endMove);
    window.addEventListener('mouseup', this.endDrag);
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    ref: "image-area",
    staticClass: "image-decorator"
  }, [_c('div', {
    style: {
      positon: 'relative'
    }
  }, [_vm.url ? _c('img', {
    staticClass: "original-image",
    attrs: {
      "src": _vm.url,
      "alt": "Original Image",
      "width": _vm.width
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "select-areas--overlay",
    style: {
      opacity: _vm.opacityOverlay,
      position: 'absolute',
      width: _vm.originImgSize.w + 'px',
      height: _vm.originImgSize.h + 'px',
      display: 'block'
    }
  }), _vm._v(" "), _c('div', {
    style: {
      'background-color': 'rgb(0, 0, 0)',
      opacity: 0,
      position: 'absolute',
      width: _vm.originImgSize.w + 'px',
      height: _vm.originImgSize.h + 'px',
      cursor: 'crosshair'
    },
    on: {
      "mousedown": _vm.mouseDown,
      "mousemove": _vm.mouseMove
    }
  }), _vm._v(" "), _vm._l(_vm.areas, function (item) {
    return _c('div', {
      key: item.id
    }, [_c('div', {
      on: {
        "mousedown": function mousedown($event) {
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.startMove(item, $event);
        },
        "mousemove": function mousemove($event) {
          return _vm.doMove(item, $event);
        }
      }
    }, [_c('div', {
      staticClass: "select-areas--outline",
      style: {
        opacity: _vm.opacityOutline,
        position: 'absolute',
        cursor: 'default',
        width: item.width + 4 + 'px',
        height: item.height + 4 + 'px',
        left: item.x + _vm.posImg.left - 2 + 'px',
        top: item.y + _vm.posImg.top - 2 + 'px',
        'z-index': item.z
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "select-areas--background_area",
      style: {
        background: "#fff url('" + _vm.url + "') -" + item.x + "px -" + item.y + "px / " + _vm.originImgSize.w + "px " + _vm.originImgSize.h + "px no-repeat",
        position: 'absolute',
        cursor: 'move',
        width: item.width + 'px',
        height: item.height + 'px',
        left: item.x + _vm.posImg.left + 'px',
        top: item.y + _vm.posImg.top + 'px',
        'z-index': item.z + 2
      },
      on: {
        "click": function click($event) {
          return _vm.changeResizable(item.id);
        }
      }
    }), _vm._v(" "), item.resizable ? _c('div', {
      staticClass: "delete-area",
      style: {
        display: 'block',
        left: item.x + _vm.posImg.left + item.width + 'px',
        top: item.y + _vm.posImg.top - 25 + 'px',
        'z-index': item.z + 2
      },
      on: {
        "click": function click($event) {
          return _vm.deleteSelected(item.id);
        }
      }
    }, [_c('div', {
      staticClass: "select-areas--delete_area"
    })]) : _vm._e(), _vm._v(" "), _c('Resizable', {
      attrs: {
        "item": item,
        "posImg": _vm.posImg
      },
      on: {
        "startDrag": _vm.startDrag,
        "doDrag": _vm.doDrag
      }
    })], 1)]);
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "c-crop--hide_main"
  }, [_c('img', {
    attrs: {
      "id": "c-crop--hide_img",
      "src": _vm.url,
      "alt": "",
      "width": _vm.width
    }
  })])])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-25c89760_0", {
    source: ".c-crop[data-v-25c89760]{display:inline-block}.c-crop *[data-v-25c89760]{box-sizing:border-box}.c-crop img[data-v-25c89760]{pointer-events:none}.c-crop .c-crop--hide_main[data-v-25c89760]{width:0;height:0;overflow:hidden}.original-image[data-v-25c89760]{position:absolute}.select-areas--overlay[data-v-25c89760]{background-color:#000;overflow:hidden;position:absolute}.select-areas--outline[data-v-25c89760]{background:#fff url(data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg+ELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm+rQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg+EhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs=);overflow:hidden}.select-areas--delete_area[data-v-25c89760]{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfjCB0SCQuXtRLQAAABRklEQVQoz4XRMUiUcQCG8V//O6MhuuEwI4VDDg9ubDCC+ILzIgcFySEnP2wOkqDRMffAa+3wpqDBSRAPp6MlC+yTFsnS0EzBursp8ECHS3AIetYXXnjfhy5B2SuJlpZPKkaEbnAJDJh33w/v7SLntpvq5uz5G69IPFWUlZGRVTQrsaK/W74o8UiftHPS+kxJVIWUkucWLHvilkO/kfdY5K2OaR+DSQfqjrWNmzFkyIxxbcdWHZpMi7xzpGNJxl29KGhY0nFk3b0gZ0cH22q2lJVtqdnGiW9ywX8Idg3qQV6sYM2aglgePQbtpDXc0avpoUhDDbFIy0vXDWuk/BH76avIpje++OW7lGs+mzBqnqAqMfWPoza9FlJOfVAy5kTTqcuuuCpnwqx9z7S7svq98MDBBVk31M3Zv7hmRMWGpqYNC0rnus8AXqJjvC9MrWIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDgtMjlUMTY6MDk6MTErMDI6MDDV30hTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA4LTI5VDE2OjA5OjExKzAyOjAwpILw7wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=);cursor:pointer;height:16px;width:16px}.delete-area[data-v-25c89760]{position:absolute;cursor:pointer;padding:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-25c89760";
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

var MultiSelectAreasImage = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, browser, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("multi-select-areas-image", MultiSelectAreasImage);
  }
};

module.exports = index;
