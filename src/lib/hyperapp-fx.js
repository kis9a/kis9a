!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((n = n || self).hyperappFx = {}));
})(this, (n) => {
  "use strict";
  function t(n, t) {
    n(t.action);
  }
  function e(n, t) {
    console.log.apply(null, t);
  }
  function r(n) {
    if (n.values) return n.values.map(r);
    let t = n.min || 0,
      e = n.max || 1;
    n.int && e++, n.bool && ((t = 0), (e = 2));
    let o = Math.random() * (e - t) + t;
    return (n.int || n.bool) && (o = Math.floor(o)), n.bool && (o = !!o), o;
  }
  function o(n, t) {
    let e = r(t);
    n(t.action, e);
  }
  function i(n, t) {
    let e,
      o = {};
    for (e in n) o[e] = n[e];
    for (e in t) o[e] = t[e];
    return o;
  }
  function c(n, t, e, o) {
    let r = t.bind(null, e);
    return (
      n.addEventListener(o, r),
      function () {
        n.removeEventListener(o, r);
      }
    );
  }
  function u(n, t) {
    return function () {
      n(t.action, t.asDate ? new Date() : performance.now());
    };
  }
  let a = {};
  function f(n) {
    let t = a[n.url];
    return (
      t ||
        ((t = { socket: new WebSocket(n.url, n.protocols), listeners: [] }),
        (a[n.url] = t)),
      t
    );
  }
  function s(t, e) {
    fetch(e.url, e.options)
      .then((n) => {
        if (!n.ok) throw n;
        return n;
      })
      .then((n) => {
        return n[e.response]();
      })
      .then((n) => {
        t(e.action, n);
      })
      .catch((n) => {
        t(e.error, n);
      });
  }
  function l(n, t) {
    n((n) => {
      return i(n, t.action(n));
    });
  }
  let p = [];
  function v(n, t) {
    let e = p.find((n) => {
      return n[0] === t.action;
    });
    e ? clearTimeout(e[1]) : ((e = [t.action]), p.push(e)),
      (e[1] = setTimeout(() => {
        n(t.action);
      }, t.wait));
  }
  let d = [];
  function m(n, t) {
    let e = d.find((n) => {
      return n[0] === t.action;
    });
    e || ((e = [t.action]), d.push(e)),
      e[1] ||
        (n(t.action),
        (e[1] = !0),
        setTimeout(() => {
          e[1] = !1;
        }, t.rate));
  }
  function h(n) {
    return window[`${n  }Storage`] || localStorage;
  }
  function k(n, t) {
    let e = t.converter(t.value);
    h(t.area).setItem(t.key, e);
  }
  function g(t, e) {
    try {
      let n = e.converter(h(e.area).getItem(e.key)),
        o = i({}, e.props || {});
      (o[e.prop || "value"] = n), t(e.action, o);
    } catch (n) {
      t(e.error);
    }
  }
  function y(n, t) {
    h(t.area).removeItem(t.key);
  }
  function S(n, t) {
    let e = t.title || document.title,
      o = t.url || location.href;
    history.pushState(t.state, e, o);
  }
  function b(n, t) {
    let e = t.title || document.title,
      o = t.url || location.href;
    history.replaceState(t.state, e, o);
  }
  let w =
      "abdefghijklmnqrstuvxyzABDEFGHIJKLMNQRSTUVXYZ0123456789!#$%&'*+-.^_`|~",
    x = `${w  }()/:<>?@[]{}`;
  function C(n) {
    return n
      .toString()
      .split("")
      .map((n) => {
        return -1 < w.indexOf(n) ? n : encodeURIComponent(n);
      })
      .join("");
  }
  function I(n, t) {
    let e = document.cookie.split("; ").find((n) => {
      return n.substr(0, n.indexOf("=")) === t.nameEncoder(t.name);
    });
    if (e) {
      let o = i({}, t.props || {});
      (o[t.prop || "value"] = t.converter(
        t.decoder(e.substr(t.nameEncoder(t.name).length + 1))
      )),
        n(t.action, o);
    }
  }
  function E(n, t) {
    let e = (t.nameEncoder || C)(t.name),
      o = (
        t.encoder ||
        function (n) {
          return n
            .toString()
            .split("")
            .map((n) => {
              return -1 < x.indexOf(n) ? n : encodeURIComponent(n);
            })
            .join("");
        }
      )(t.converter(t.value)),
      r = {};
    t.ttl && (t.expires = new Date(new Date().getTime() + 1e3 * t.ttl)),
      t.path && (r.path = t.path),
      t.domain && (r.domain = t.domain),
      t.expires && (r.expires = t.expires.toUTCString()),
      (function (n, t, e) {
        let o = Object.keys(e)
          .map((n) => {
            return `${n  }=${  e[n]}`;
          })
          .join(";");
        document.cookie = `${n  }=${  t  }${o ? ";" + o : ""}`;
      })(e, o, r);
  }
  function T(n) {
    return [
      E,
      i(
        {
          converter:
            n.converter || n.json
              ? JSON.stringify
              : function (n) {
                  return n;
                },
        },
        n
      ),
    ];
  }
  function j(n, t) {
    u(n, t)();
  }
  function D(n, t) {
    setTimeout(u(n, t), t.wait);
  }
  function N(n, t) {
    let e = f(t);
    function o() {
      e.socket.send(t.data), e.socket.removeEventListener("open", o);
    }
    e.socket.readyState === WebSocket.CONNECTING
      ? e.socket.addEventListener("open", o)
      : o();
  }
  function O(t, e) {
    navigator.geolocation.getCurrentPosition(
      (n) => {
        return t(e.action, n);
      },
      (n) => {
        return t(e.error, n);
      },
      e.options
    );
  }
  function R(n, t) {
    let e = u(n, t),
      o = setInterval(e, t.every);
    return function () {
      o && clearInterval(o);
    };
  }
  function W(e, o) {
    let r;
    return (
      (r = requestAnimationFrame(function n(t) {
        e(o, t), (r = requestAnimationFrame(n));
      })),
      function () {
        cancelAnimationFrame(r);
      }
    );
  }
  function F(n, t) {
    let e = c.bind(null, document, n, t.action),
      o = t.downs ? e("keydown") : null,
      r = t.ups ? e("keyup") : null,
      i = t.presses ? e("keypress") : null;
    return function () {
      o && o(), r && r(), i && i();
    };
  }
  function L(n, t) {
    let e,
      o,
      r,
      i = f(t),
      u = c(i.socket, n, t.action, "message");
    return (
      i.listeners.push(u),
      t.error && ((e = c(i.socket, n, t.error, "error")), i.listeners.push(e)),
      t.open && ((o = c(i.socket, n, t.open, "open")), i.listeners.push(o)),
      t.close && ((r = c(i.socket, n, t.close, "close")), i.listeners.push(r)),
      function () {
        u && u(),
          e && e(),
          o && o(),
          r && r(),
          (i.listeners = i.listeners.filter((n) => {
            return n !== u && n !== e && n !== o && n !== r;
          })),
          0 === i.listeners.length &&
            (function (n) {
              f(n).socket.close(), delete a[n.url];
            })(t);
      }
    );
  }
  function P(n, t) {
    return c(window, n, t.action, "popstate");
  }
  function A(t, e) {
    let n = navigator.geolocation.watchPosition(
      (n) => {
        return t(e.action, n);
      },
      (n) => {
        return t(e.error, n);
      },
      e.options
    );
    return function () {
      navigator.geolocation.clearWatch(n);
    };
  }
  (n.Animation = function (n) {
    return [W, n];
  }),
    (n.Console = function () {
      return [e, arguments];
    }),
    (n.Debounce = function (n) {
      return [v, n];
    }),
    (n.Delay = function (n) {
      return [D, n];
    }),
    (n.DeleteCookie = function (n) {
      return T(i(n, { ttl: -1, value: "" }));
    }),
    (n.Dispatch = function (n) {
      return [t, { action: n }];
    }),
    (n.GetCurrentPosition = function (n) {
      return [O, n];
    }),
    (n.HistoryPop = function (n) {
      return [P, n];
    }),
    (n.HistoryPush = function (n) {
      return [S, n];
    }),
    (n.HistoryReplace = function (n) {
      return [b, n];
    }),
    (n.Http = function (n) {
      return [s, i({ options: {}, response: "json", error: n.action }, n)];
    }),
    (n.Interval = function (n) {
      return [R, n];
    }),
    (n.Keyboard = function (n) {
      return [F, n];
    }),
    (n.Merge = function (n) {
      return [l, { action: n }];
    }),
    (n.Now = function (n) {
      return [j, n];
    }),
    (n.Random = function (n) {
      return [o, n];
    }),
    (n.ReadCookie = function (n) {
      return [
        I,
        i(
          {
            nameEncoder: C,
            converter:
              n.converter || n.json
                ? JSON.parse
                : function (n) {
                    return n;
                  },
            decoder: n.decoder || decodeURIComponent,
          },
          n
        ),
      ];
    }),
    (n.ReadFromStorage = function (n) {
      return [
        g,
        i({ converter: n.converter || JSON.parse, error: n.error }, n),
      ];
    }),
    (n.RemoveFromStorage = function (n) {
      return [y, n];
    }),
    (n.Throttle = function (n) {
      return [m, n];
    }),
    (n.WatchPosition = function (n) {
      return [A, n];
    }),
    (n.WebSocketListen = function (n) {
      return [L, n];
    }),
    (n.WebSocketSend = function (n) {
      return [N, n];
    }),
    (n.WriteCookie = T),
    (n.WriteToStorage = function (n) {
      return [k, i({ converter: n.converter || JSON.stringify }, n)];
    });
});
//# sourceMappingURL=hyperappFx.js.map
