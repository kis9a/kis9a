(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // sources/src/components/header/path.js
  var require_path = __commonJS({
    "sources/src/components/header/path.js"(exports, module) {
      "use strict";
      function assertPath(path2) {
        if (typeof path2 !== "string") {
          throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
        }
      }
      function normalizeStringPosix(path2, allowAboveRoot) {
        var res = "";
        var lastSegmentLength = 0;
        var lastSlash = -1;
        var dots = 0;
        var code;
        for (var i = 0; i <= path2.length; ++i) {
          if (i < path2.length)
            code = path2.charCodeAt(i);
          else if (code === 47)
            break;
          else
            code = 47;
          if (code === 47) {
            if (lastSlash === i - 1 || dots === 1) {
            } else if (lastSlash !== i - 1 && dots === 2) {
              if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                if (res.length > 2) {
                  var lastSlashIndex = res.lastIndexOf("/");
                  if (lastSlashIndex !== res.length - 1) {
                    if (lastSlashIndex === -1) {
                      res = "";
                      lastSegmentLength = 0;
                    } else {
                      res = res.slice(0, lastSlashIndex);
                      lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                    }
                    lastSlash = i;
                    dots = 0;
                    continue;
                  }
                } else if (res.length === 2 || res.length === 1) {
                  res = "";
                  lastSegmentLength = 0;
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              }
              if (allowAboveRoot) {
                if (res.length > 0)
                  res += "/..";
                else
                  res = "..";
                lastSegmentLength = 2;
              }
            } else {
              if (res.length > 0)
                res += "/" + path2.slice(lastSlash + 1, i);
              else
                res = path2.slice(lastSlash + 1, i);
              lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
          } else if (code === 46 && dots !== -1) {
            ++dots;
          } else {
            dots = -1;
          }
        }
        return res;
      }
      function _format(sep, pathObject) {
        var dir = pathObject.dir || pathObject.root;
        var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir) {
          return base;
        }
        if (dir === pathObject.root) {
          return dir + base;
        }
        return dir + sep + base;
      }
      var posix = {
        resolve: function resolve() {
          var resolvedPath = "";
          var resolvedAbsolute = false;
          var cwd;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path2;
            if (i >= 0)
              path2 = arguments[i];
            else {
              if (cwd === void 0)
                cwd = process.cwd();
              path2 = cwd;
            }
            assertPath(path2);
            if (path2.length === 0) {
              continue;
            }
            resolvedPath = path2 + "/" + resolvedPath;
            resolvedAbsolute = path2.charCodeAt(0) === 47;
          }
          resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
          if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
              return "/" + resolvedPath;
            else
              return "/";
          } else if (resolvedPath.length > 0) {
            return resolvedPath;
          } else {
            return ".";
          }
        },
        normalize: function normalize(path2) {
          assertPath(path2);
          if (path2.length === 0)
            return ".";
          var isAbsolute = path2.charCodeAt(0) === 47;
          var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
          path2 = normalizeStringPosix(path2, !isAbsolute);
          if (path2.length === 0 && !isAbsolute)
            path2 = ".";
          if (path2.length > 0 && trailingSeparator)
            path2 += "/";
          if (isAbsolute)
            return "/" + path2;
          return path2;
        },
        isAbsolute: function isAbsolute(path2) {
          assertPath(path2);
          return path2.length > 0 && path2.charCodeAt(0) === 47;
        },
        join: function join() {
          if (arguments.length === 0)
            return ".";
          var joined;
          for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            assertPath(arg);
            if (arg.length > 0) {
              if (joined === void 0)
                joined = arg;
              else
                joined += "/" + arg;
            }
          }
          if (joined === void 0)
            return ".";
          return posix.normalize(joined);
        },
        relative: function relative(from, to) {
          assertPath(from);
          assertPath(to);
          if (from === to)
            return "";
          from = posix.resolve(from);
          to = posix.resolve(to);
          if (from === to)
            return "";
          var fromStart = 1;
          for (; fromStart < from.length; ++fromStart) {
            if (from.charCodeAt(fromStart) !== 47)
              break;
          }
          var fromEnd = from.length;
          var fromLen = fromEnd - fromStart;
          var toStart = 1;
          for (; toStart < to.length; ++toStart) {
            if (to.charCodeAt(toStart) !== 47)
              break;
          }
          var toEnd = to.length;
          var toLen = toEnd - toStart;
          var length = fromLen < toLen ? fromLen : toLen;
          var lastCommonSep = -1;
          var i = 0;
          for (; i <= length; ++i) {
            if (i === length) {
              if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                  return to.slice(toStart + i + 1);
                } else if (i === 0) {
                  return to.slice(toStart + i);
                }
              } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                  lastCommonSep = i;
                } else if (i === 0) {
                  lastCommonSep = 0;
                }
              }
              break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
              break;
            else if (fromCode === 47)
              lastCommonSep = i;
          }
          var out = "";
          for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === 47) {
              if (out.length === 0)
                out += "..";
              else
                out += "/..";
            }
          }
          if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
          else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47)
              ++toStart;
            return to.slice(toStart);
          }
        },
        _makeLong: function _makeLong(path2) {
          return path2;
        },
        dirname: function dirname(path2) {
          assertPath(path2);
          if (path2.length === 0)
            return ".";
          var code = path2.charCodeAt(0);
          var hasRoot = code === 47;
          var end = -1;
          var matchedSlash = true;
          for (var i = path2.length - 1; i >= 1; --i) {
            code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1)
            return hasRoot ? "/" : ".";
          if (hasRoot && end === 1)
            return "//";
          return path2.slice(0, end);
        },
        basename: function basename(path2, ext) {
          if (ext !== void 0 && typeof ext !== "string")
            throw new TypeError('"ext" argument must be a string');
          assertPath(path2);
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
            if (ext.length === path2.length && ext === path2)
              return "";
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for (i = path2.length - 1; i >= 0; --i) {
              var code = path2.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else {
                if (firstNonSlashEnd === -1) {
                  matchedSlash = false;
                  firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                  if (code === ext.charCodeAt(extIdx)) {
                    if (--extIdx === -1) {
                      end = i;
                    }
                  } else {
                    extIdx = -1;
                    end = firstNonSlashEnd;
                  }
                }
              }
            }
            if (start === end)
              end = firstNonSlashEnd;
            else if (end === -1)
              end = path2.length;
            return path2.slice(start, end);
          } else {
            for (i = path2.length - 1; i >= 0; --i) {
              if (path2.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1)
              return "";
            return path2.slice(start, end);
          }
        },
        extname: function extname(path2) {
          assertPath(path2);
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var preDotState = 0;
          for (var i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path2.slice(startDot, end);
        },
        format: function format(pathObject) {
          if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
          }
          return _format("/", pathObject);
        },
        parse: function parse(path2) {
          assertPath(path2);
          var ret = { root: "", dir: "", base: "", ext: "", name: "" };
          if (path2.length === 0)
            return ret;
          var code = path2.charCodeAt(0);
          var isAbsolute = code === 47;
          var start;
          if (isAbsolute) {
            ret.root = "/";
            start = 1;
          } else {
            start = 0;
          }
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var i = path2.length - 1;
          var preDotState = 0;
          for (; i >= start; --i) {
            code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
              if (startPart === 0 && isAbsolute)
                ret.base = ret.name = path2.slice(1, end);
              else
                ret.base = ret.name = path2.slice(startPart, end);
            }
          } else {
            if (startPart === 0 && isAbsolute) {
              ret.name = path2.slice(1, startDot);
              ret.base = path2.slice(1, end);
            } else {
              ret.name = path2.slice(startPart, startDot);
              ret.base = path2.slice(startPart, end);
            }
            ret.ext = path2.slice(startDot, end);
          }
          if (startPart > 0)
            ret.dir = path2.slice(0, startPart - 1);
          else if (isAbsolute)
            ret.dir = "/";
          return ret;
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null
      };
      posix.posix = posix;
      module.exports = posix;
    }
  });

  // sources/src/modules/js/hyperapp.js
  var SSR_NODE = 1;
  var TEXT_NODE = 3;
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var SVG_NS = "http://www.w3.org/2000/svg";
  var id = (a) => a;
  var map = EMPTY_ARR.map;
  var isArray = Array.isArray;
  var enqueue = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
  var createClass = (obj) => {
    var out = "";
    if (typeof obj === "string")
      return obj;
    if (isArray(obj)) {
      for (var k = 0, tmp; k < obj.length; k++) {
        if (tmp = createClass(obj[k])) {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (var k in obj) {
        if (obj[k])
          out += (out && " ") + k;
      }
    }
    return out;
  };
  var shouldRestart = (a, b) => {
    for (var k in { ...a, ...b }) {
      if (typeof (isArray(a[k]) ? a[k][0] : a[k]) === "function") {
        b[k] = a[k];
      } else if (a[k] !== b[k])
        return true;
    }
  };
  var patchSubs = (oldSubs, newSubs = EMPTY_ARR, dispatch) => {
    for (var subs = [], i = 0, oldSub, newSub; i < oldSubs.length || i < newSubs.length; i++) {
      oldSub = oldSubs[i];
      newSub = newSubs[i];
      subs.push(newSub && newSub !== true ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [
        newSub[0],
        newSub[1],
        (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1]))
      ] : oldSub : oldSub && oldSub[2]());
    }
    return subs;
  };
  var getKey = (vdom) => vdom == null ? vdom : vdom.key;
  var patchProperty = (node, key, oldValue, newValue, listener, isSvg) => {
    if (key === "key") {
    } else if (key === "style") {
      for (var k in { ...oldValue, ...newValue }) {
        oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
        if (k[0] === "-") {
          node[key].setProperty(k, oldValue);
        } else {
          node[key][k] = oldValue;
        }
      }
    } else if (key[0] === "o" && key[1] === "n") {
      if (!((node.events || (node.events = {}))[key = key.slice(2)] = newValue)) {
        node.removeEventListener(key, listener);
      } else if (!oldValue) {
        node.addEventListener(key, listener);
      }
    } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
      node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };
  var createNode = (vdom, listener, isSvg) => {
    var props = vdom.props;
    var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is }) : document.createElement(vdom.tag, { is: props.is });
    for (var k in props) {
      patchProperty(node, k, null, props[k], listener, isSvg);
    }
    for (var i = 0; i < vdom.children.length; i++) {
      node.appendChild(createNode(vdom.children[i] = maybeVNode(vdom.children[i]), listener, isSvg));
    }
    return vdom.node = node;
  };
  var patch = (parent, node, oldVNode, newVNode, listener, isSvg) => {
    if (oldVNode === newVNode) {
    } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
      if (oldVNode.tag !== newVNode.tag)
        node.nodeValue = newVNode.tag;
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
      node = parent.insertBefore(createNode(newVNode = maybeVNode(newVNode), listener, isSvg), node);
      if (oldVNode != null) {
        parent.removeChild(oldVNode.node);
      }
    } else {
      var tmpVKid;
      var oldVKid;
      var oldKey;
      var newKey;
      var oldProps = oldVNode.props;
      var newProps = newVNode.props;
      var oldVKids = oldVNode.children;
      var newVKids = newVNode.children;
      var oldHead = 0;
      var newHead = 0;
      var oldTail = oldVKids.length - 1;
      var newTail = newVKids.length - 1;
      isSvg = isSvg || newVNode.tag === "svg";
      for (var i in { ...oldProps, ...newProps }) {
        if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
          patchProperty(node, i, oldProps[i], newProps[i], listener, isSvg);
        }
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
          break;
        }
        patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = maybeVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
          break;
        }
        patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = maybeVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
      }
      if (oldHead > oldTail) {
        while (newHead <= newTail) {
          node.insertBefore(createNode(newVKids[newHead] = maybeVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
        }
      } else if (newHead > newTail) {
        while (oldHead <= oldTail) {
          node.removeChild(oldVKids[oldHead++].node);
        }
      } else {
        for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
          if ((oldKey = oldVKids[i].key) != null) {
            keyed[oldKey] = oldVKids[i];
          }
        }
        while (newHead <= newTail) {
          oldKey = getKey(oldVKid = oldVKids[oldHead]);
          newKey = getKey(newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid));
          if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
            if (oldKey == null) {
              node.removeChild(oldVKid.node);
            }
            oldHead++;
            continue;
          }
          if (newKey == null || oldVNode.type === SSR_NODE) {
            if (oldKey == null) {
              patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newHead++;
            }
            oldHead++;
          } else {
            if (oldKey === newKey) {
              patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              if ((tmpVKid = keyed[newKey]) != null) {
                patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                newKeyed[newKey] = true;
              } else {
                patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
              }
            }
            newHead++;
          }
        }
        while (oldHead <= oldTail) {
          if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
            node.removeChild(oldVKid.node);
          }
        }
        for (var i in keyed) {
          if (newKeyed[i] == null) {
            node.removeChild(keyed[i].node);
          }
        }
      }
    }
    return newVNode.node = node;
  };
  var propsChanged = (a, b) => {
    for (var k in a)
      if (a[k] !== b[k])
        return true;
    for (var k in b)
      if (a[k] !== b[k])
        return true;
  };
  var maybeVNode = (newVNode, oldVNode) => newVNode !== true && newVNode !== false && newVNode ? typeof newVNode.tag === "function" ? ((!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.memo)) && ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo), oldVNode) : newVNode : text("");
  var recycleNode = (node) => node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node);
  var createVNode = (tag, props, children, type, node) => ({
    tag,
    props,
    key: props.key,
    children,
    type,
    node
  });
  var text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
  var h = (tag, props, children = EMPTY_ARR) => createVNode(tag, props, isArray(children) ? children : [children]);
  var app = ({
    node,
    view,
    subscriptions,
    dispatch = id,
    init = EMPTY_OBJ
  }) => {
    var vdom = node && recycleNode(node);
    var subs = [];
    var state;
    var busy;
    var update = (newState) => {
      if (state !== newState) {
        if ((state = newState) == null)
          dispatch = subscriptions = render = id;
        if (subscriptions)
          subs = patchSubs(subs, subscriptions(state), dispatch);
        if (view && !busy)
          enqueue(render, busy = true);
      }
    };
    var render = () => node = patch(node.parentNode, node, vdom, vdom = view(state), listener, busy = false);
    var listener = function(event) {
      dispatch(this.events[event.type], event);
    };
    return (dispatch = dispatch((action, props) => typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], action[1]) : action.slice(1).map((fx) => fx && fx !== true && fx[0](dispatch, fx[1]), update(action[0])) : update(action)))(init), dispatch;
  };

  // sources/src/modules/js/utils.js
  function assign(source, assignments) {
    var result = {}, i;
    for (i in source)
      result[i] = source[i];
    for (i in assignments)
      result[i] = assignments[i];
    return result;
  }

  // sources/src/modules/js/Http.js
  function httpEffect(dispatch, props) {
    fetch(props.url, props.options).then(function(response) {
      if (!response.ok) {
        throw response;
      }
      return response;
    }).then(function(response) {
      return response[props.response]();
    }).then(function(result) {
      dispatch(props.action, result);
    }).catch(function(error) {
      dispatch(props.error, error);
    });
  }
  function Http(props) {
    return [
      httpEffect,
      assign({
        options: {},
        response: "json",
        error: props.action
      }, props)
    ];
  }

  // sources/src/assets/svgs/home.svg
  var home_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>\n</svg>\n';

  // sources/src/assets/svgs/photograph.svg
  var photograph_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>\n</svg>\n';

  // sources/src/assets/svgs/chart-bar.svg
  var chart_bar_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>\n</svg>\n';

  // sources/src/assets/svgs/pencil-alt.svg
  var pencil_alt_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>\n  <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>\n</svg>\n';

  // sources/src/modules/js/router.js
  var routes = [
    {
      name: "home",
      href: "/",
      icon: home_default
    },
    {
      name: "memos",
      href: "/memos/",
      icon: pencil_alt_default
    },
    {
      name: "images",
      href: "/images/",
      icon: photograph_default
    },
    {
      name: "waka",
      href: "/waka/",
      icon: chart_bar_default
    }
  ];

  // sources/src/components/link/index.js
  var LinkIcon = (name, opts = { as: "", active: true }) => {
    let item = routes.find((v) => v.name == name);
    if (!item) {
      item = { name, href: "#", icon: "" };
    }
    return h("a", {
      class: `link-icon ${opts.active ? "" : "disable"}`,
      href: item.href,
      innerHTML: item.icon
    }, [h("span", {}, [text(opts.as || item.name.toUpperCase())])]);
  };

  // sources/src/assets/logo.png
  var logo_default = "data:image/png;base64,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";

  // sources/src/components/header/index.js
  var path = require_path();
  var Header = () => {
    const uri = window.location.pathname + window.location.search;
    const ss = uri.split("/");
    let sn = "/";
    if (ss) {
      ss.forEach((v) => {
        if (v !== "") {
          sn = v;
          return;
        }
      });
    }
    const parse = (str) => {
      str = path.normalize(str);
      return str.replaceAll("/", "");
    };
    let c = routes.find((v) => {
      return parse(sn) === parse(v.href);
    });
    if (!c) {
      c = { name: "" };
    }
    return h("div", { class: "header-wrapper" }, [
      h("header", {}, [
        h("nav", {}, [
          h("h1", { class: "logo-text", onclick: toNavigation }, text("KIS9A")),
          h("div", { class: "logo-image" }, [
            h("img", {
              src: logo_default,
              alt: "kis9a.png",
              onclick: toNavigation
            })
          ]),
          h("div", { class: "links" }, routes.map((r) => LinkIcon(r.name, { active: r.name !== c.name })))
        ])
      ])
    ]);
  };
  var toNavigation = (state) => {
    window.open("https://nav.kis9a.com", "_blank");
    return { ...state };
  };

  // sources/src/assets/svgs/calendar.svg
  var calendar_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>\n</svg>\n';

  // sources/src/pages/waka/index.js
  var getSvgs = Http({
    url: "/data/wakatime.json",
    response: "json",
    action: (state, json) => {
      pureState.svgs = json.svgs;
      return {
        ...state,
        svgs: json.svgs || []
      };
    }
  });
  var pureState = {
    svgs: []
  };
  var initSvgs = getSvgs;
  var initialState = [pureState, initSvgs];
  var yymmdd = (dt) => {
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  };
  var afterDay = (n) => {
    date.setDate(date.getDate() + n);
    return yymmdd(date);
  };
  var date = new Date();
  var today = yymmdd(date);
  var dateRange = (name) => {
    if (name == "w") {
      return -7;
    }
    if (name == "m") {
      return -30;
    }
    if (name == "y") {
      return -365;
    }
  };
  app({
    init: initialState,
    view: ({ svgs }) => h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h("div", { class: "content svgs" }, svgs && svgs.map((s) => h("div", {}, [
          s.name && h("div", { class: "date" }, [
            h("div", { class: "date-svg", innerHTML: calendar_default }),
            h("h2", { class: "date-text" }, text(afterDay(dateRange(s.name)) + " - " + today))
          ]),
          h("div", { class: "item" }, [
            h("img", { src: s.activity }),
            h("img", { src: s.percent }),
            h("img", { src: s.bar })
          ])
        ])))
      ])
    ]),
    subscriptions: () => {
    },
    node: document.getElementById("app")
  });
})();
