!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t((e["@mailonline/video-ad-sdk"] = {}));
})(this, function(e) {
  "use strict";
  var t =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  var r,
    n =
      ((function(e) {
        !(function(t) {
          var r,
            n = Object.prototype,
            i = n.hasOwnProperty,
            o = "function" == typeof Symbol ? Symbol : {},
            a = o.iterator || "@@iterator",
            u = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag",
            s = t.regeneratorRuntime;
          if (s) e.exports = s;
          else {
            (s = t.regeneratorRuntime = e.exports).wrap = w;
            var d = "suspendedStart",
              l = "suspendedYield",
              f = "executing",
              h = "completed",
              p = {},
              v = {};
            v[a] = function() {
              return this;
            };
            var m = Object.getPrototypeOf,
              y = m && m(m(S([])));
            y && y !== n && i.call(y, a) && (v = y);
            var g = (k.prototype = E.prototype = Object.create(v));
            (A.prototype = g.constructor = k),
              (k.constructor = A),
              (k[c] = A.displayName = "GeneratorFunction"),
              (s.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return (
                  !!t &&
                  (t === A || "GeneratorFunction" === (t.displayName || t.name))
                );
              }),
              (s.mark = function(e) {
                return (
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, k)
                    : ((e.__proto__ = k),
                      c in e || (e[c] = "GeneratorFunction")),
                  (e.prototype = Object.create(g)),
                  e
                );
              }),
              (s.awrap = function(e) {
                return { __await: e };
              }),
              x(C.prototype),
              (C.prototype[u] = function() {
                return this;
              }),
              (s.AsyncIterator = C),
              (s.async = function(e, t, r, n) {
                var i = new C(w(e, t, r, n));
                return s.isGeneratorFunction(t)
                  ? i
                  : i.next().then(function(e) {
                      return e.done ? e.value : i.next();
                    });
              }),
              x(g),
              (g[c] = "Generator"),
              (g[a] = function() {
                return this;
              }),
              (g.toString = function() {
                return "[object Generator]";
              }),
              (s.keys = function(e) {
                var t = [];
                for (var r in e) t.push(r);
                return (
                  t.reverse(),
                  function r() {
                    for (; t.length; ) {
                      var n = t.pop();
                      if (n in e) return (r.value = n), (r.done = !1), r;
                    }
                    return (r.done = !0), r;
                  }
                );
              }),
              (s.values = S),
              (P.prototype = {
                constructor: P,
                reset: function(e) {
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = r),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = r),
                    this.tryEntries.forEach(L),
                    !e)
                  )
                    for (var t in this)
                      "t" === t.charAt(0) &&
                        i.call(this, t) &&
                        !isNaN(+t.slice(1)) &&
                        (this[t] = r);
                },
                stop: function() {
                  this.done = !0;
                  var e = this.tryEntries[0].completion;
                  if ("throw" === e.type) throw e.arg;
                  return this.rval;
                },
                dispatchException: function(e) {
                  if (this.done) throw e;
                  var t = this;
                  function n(n, i) {
                    return (
                      (u.type = "throw"),
                      (u.arg = e),
                      (t.next = n),
                      i && ((t.method = "next"), (t.arg = r)),
                      !!i
                    );
                  }
                  for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var a = this.tryEntries[o],
                      u = a.completion;
                    if ("root" === a.tryLoc) return n("end");
                    if (a.tryLoc <= this.prev) {
                      var c = i.call(a, "catchLoc"),
                        s = i.call(a, "finallyLoc");
                      if (c && s) {
                        if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                        if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                      } else if (c) {
                        if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                      } else {
                        if (!s)
                          throw new Error(
                            "try statement without catch or finally"
                          );
                        if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                      }
                    }
                  }
                },
                abrupt: function(e, t) {
                  for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var n = this.tryEntries[r];
                    if (
                      n.tryLoc <= this.prev &&
                      i.call(n, "finallyLoc") &&
                      this.prev < n.finallyLoc
                    ) {
                      var o = n;
                      break;
                    }
                  }
                  o &&
                    ("break" === e || "continue" === e) &&
                    o.tryLoc <= t &&
                    t <= o.finallyLoc &&
                    (o = null);
                  var a = o ? o.completion : {};
                  return (
                    (a.type = e),
                    (a.arg = t),
                    o
                      ? ((this.method = "next"), (this.next = o.finallyLoc), p)
                      : this.complete(a)
                  );
                },
                complete: function(e, t) {
                  if ("throw" === e.type) throw e.arg;
                  return (
                    "break" === e.type || "continue" === e.type
                      ? (this.next = e.arg)
                      : "return" === e.type
                      ? ((this.rval = this.arg = e.arg),
                        (this.method = "return"),
                        (this.next = "end"))
                      : "normal" === e.type && t && (this.next = t),
                    p
                  );
                },
                finish: function(e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.finallyLoc === e)
                      return this.complete(r.completion, r.afterLoc), L(r), p;
                  }
                },
                catch: function(e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.tryLoc === e) {
                      var n = r.completion;
                      if ("throw" === n.type) {
                        var i = n.arg;
                        L(r);
                      }
                      return i;
                    }
                  }
                  throw new Error("illegal catch attempt");
                },
                delegateYield: function(e, t, n) {
                  return (
                    (this.delegate = {
                      iterator: S(e),
                      resultName: t,
                      nextLoc: n
                    }),
                    "next" === this.method && (this.arg = r),
                    p
                  );
                }
              });
          }
          function w(e, t, r, n) {
            var i = t && t.prototype instanceof E ? t : E,
              o = Object.create(i.prototype),
              a = new P(n || []);
            return (
              (o._invoke = (function(e, t, r) {
                var n = d;
                return function(i, o) {
                  if (n === f) throw new Error("Generator is already running");
                  if (n === h) {
                    if ("throw" === i) throw o;
                    return O();
                  }
                  for (r.method = i, r.arg = o; ; ) {
                    var a = r.delegate;
                    if (a) {
                      var u = T(a, r);
                      if (u) {
                        if (u === p) continue;
                        return u;
                      }
                    }
                    if ("next" === r.method) r.sent = r._sent = r.arg;
                    else if ("throw" === r.method) {
                      if (n === d) throw ((n = h), r.arg);
                      r.dispatchException(r.arg);
                    } else "return" === r.method && r.abrupt("return", r.arg);
                    n = f;
                    var c = b(e, t, r);
                    if ("normal" === c.type) {
                      if (((n = r.done ? h : l), c.arg === p)) continue;
                      return { value: c.arg, done: r.done };
                    }
                    "throw" === c.type &&
                      ((n = h), (r.method = "throw"), (r.arg = c.arg));
                  }
                };
              })(e, r, a)),
              o
            );
          }
          function b(e, t, r) {
            try {
              return { type: "normal", arg: e.call(t, r) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          function E() {}
          function A() {}
          function k() {}
          function x(e) {
            ["next", "throw", "return"].forEach(function(t) {
              e[t] = function(e) {
                return this._invoke(t, e);
              };
            });
          }
          function C(e) {
            var t;
            this._invoke = function(r, n) {
              function o() {
                return new Promise(function(t, o) {
                  !(function t(r, n, o, a) {
                    var u = b(e[r], e, n);
                    if ("throw" !== u.type) {
                      var c = u.arg,
                        s = c.value;
                      return s && "object" == typeof s && i.call(s, "__await")
                        ? Promise.resolve(s.__await).then(
                            function(e) {
                              t("next", e, o, a);
                            },
                            function(e) {
                              t("throw", e, o, a);
                            }
                          )
                        : Promise.resolve(s).then(function(e) {
                            (c.value = e), o(c);
                          }, a);
                    }
                    a(u.arg);
                  })(r, n, t, o);
                });
              }
              return (t = t ? t.then(o, o) : o());
            };
          }
          function T(e, t) {
            var n = e.iterator[t.method];
            if (n === r) {
              if (((t.delegate = null), "throw" === t.method)) {
                if (
                  e.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = r),
                  T(e, t),
                  "throw" === t.method)
                )
                  return p;
                (t.method = "throw"),
                  (t.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return p;
            }
            var i = b(n, e.iterator, t.arg);
            if ("throw" === i.type)
              return (
                (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), p
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method && ((t.method = "next"), (t.arg = r)),
                  (t.delegate = null),
                  p)
                : o
              : ((t.method = "throw"),
                (t.arg = new TypeError("iterator result is not an object")),
                (t.delegate = null),
                p);
          }
          function I(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function L(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function P(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(I, this),
              this.reset(!0);
          }
          function S(e) {
            if (e) {
              var t = e[a];
              if (t) return t.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var n = -1,
                  o = function t() {
                    for (; ++n < e.length; )
                      if (i.call(e, n))
                        return (t.value = e[n]), (t.done = !1), t;
                    return (t.value = r), (t.done = !0), t;
                  };
                return (o.next = o);
              }
            }
            return { next: O };
          }
          function O() {
            return { value: r, done: !0 };
          }
        })(
          (function() {
            return this;
          })() || Function("return this")()
        );
      })((r = { exports: {} }), r.exports),
      r.exports),
    i =
      (function() {
        return this;
      })() || Function("return this")(),
    o =
      i.regeneratorRuntime &&
      Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime") >= 0,
    a = o && i.regeneratorRuntime;
  i.regeneratorRuntime = void 0;
  var u = n;
  if (o) i.regeneratorRuntime = a;
  else
    try {
      delete i.regeneratorRuntime;
    } catch (e) {
      i.regeneratorRuntime = void 0;
    }
  var c,
    s,
    d,
    l,
    f = u,
    h = {
      clickThrough: "clickThrough",
      closeLinear: "closeLinear",
      complete: "complete",
      error: "error",
      exitFullscreen: "exitFullscreen",
      firstQuartile: "firstQuartile",
      fullscreen: "fullscreen",
      iconClick: "iconClick",
      iconView: "iconView",
      impression: "impression",
      midpoint: "midpoint",
      mute: "mute",
      otherAdInteraction: "otherAdInteraction",
      pause: "pause",
      playerCollapse: "playerCollapse",
      playerExpand: "playerExpand",
      progress: "progress",
      resume: "resume",
      rewind: "rewind",
      skip: "skip",
      start: "start",
      thirdQuartile: "thirdQuartile",
      timeSpentViewing: "timeSpentViewing",
      unmute: "unmute"
    },
    p = "acceptInvitation",
    v = "adCollapse",
    m = "creativeView",
    y = { acceptInvitation: p, adCollapse: v, close: "close", creativeView: m },
    g = [
      new RegExp(
        "^<h3[^>]*>This page contains the following errors:</h3><div[^>]*>(.+?)\n?</div>"
      ),
      new RegExp("^(.+)\n")
    ],
    w = function(e) {
      var t,
        r,
        n,
        i,
        o =
          ((t = e),
          (r = new XMLSerializer()),
          Array.prototype.map
            .call(t.childNodes, function(e) {
              return r.serializeToString(e);
            })
            .join(""));
      for (n = 0; n < g.length; n++) if ((i = g[n].exec(o))) return i[1];
    },
    b = function(e) {
      return (
        (function(e) {
          var t;
          if (null === e) throw new Error("Parse error");
          var r = (function(e) {
            return "parsererror" === e.documentElement.tagName &&
              "http://www.mozilla.org/newlayout/xml/parsererror.xml" ===
                e.documentElement.namespaceURI
              ? e.documentElement
              : ("xml" === e.documentElement.tagName ||
                  "html" === e.documentElement.tagName) &&
                e.documentElement.childNodes &&
                e.documentElement.childNodes.length > 0 &&
                "parsererror" === e.documentElement.childNodes[0].nodeName
              ? e.documentElement.childNodes[0]
              : "html" === e.documentElement.tagName &&
                e.documentElement.childNodes &&
                e.documentElement.childNodes.length > 0 &&
                "body" === e.documentElement.childNodes[0].nodeName &&
                e.documentElement.childNodes[0].childNodes &&
                e.documentElement.childNodes[0].childNodes.length &&
                "parsererror" ===
                  e.documentElement.childNodes[0].childNodes[0].nodeName
              ? e.documentElement.childNodes[0].childNodes[0]
              : void 0;
          })(e);
          if (void 0 !== r) throw ((t = w(r) || "Parse error"), new Error(t));
        })(e),
        e
      );
    },
    E = "document",
    A = "element",
    k = "text",
    x = function e(t) {
      var r = (function(e) {
          if (1 === e.nodeType) return A;
          if (3 === e.nodeType || 4 === e.nodeType) return k;
          if (9 === e.nodeType) return E;
          throw new Error("Unsupported element type");
        })(t),
        n = { type: r };
      if (r === A) {
        if (((n.name = t.nodeName.toLowerCase()), t.attributes.length > 0)) {
          n.attributes = {};
          var i = !0,
            o = !1,
            a = void 0;
          try {
            for (
              var u, c = Array.from(t.attributes)[Symbol.iterator]();
              !(i = (u = c.next()).done);
              i = !0
            ) {
              var s = u.value;
              n.attributes[s.nodeName] = s.nodeValue;
            }
          } catch (e) {
            (o = !0), (a = e);
          } finally {
            try {
              !i && c.return && c.return();
            } finally {
              if (o) throw a;
            }
          }
        }
      } else
        r === k &&
          (n.text = t.nodeValue
            .replace("<![CDATA[", "")
            .replace("]]>", "")
            .trim());
      if (t.hasChildNodes()) {
        var d = Array.from(t.childNodes).filter(function(e) {
            return [1, 3, 4].includes(e.nodeType);
          }),
          l = [];
        n.elements = l;
        var f = !0,
          h = !1,
          p = void 0;
        try {
          for (
            var v, m = d[Symbol.iterator]();
            !(f = (v = m.next()).done);
            f = !0
          ) {
            var y = e(v.value);
            (y.type !== k || y.text.length > 0) && l.push(y);
          }
        } catch (e) {
          (h = !0), (p = e);
        } finally {
          try {
            !f && m.return && m.return();
          } finally {
            if (h) throw p;
          }
        }
      }
      return n;
    },
    C = function() {
      var e = (arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).elements;
      return void 0 === e ? [] : e;
    },
    T = function(e, t) {
      return C(e).find(function(e) {
        var r = e.name;
        return (void 0 === r ? "" : r).toUpperCase() === t.toUpperCase();
      });
    },
    I = function(e, t) {
      return "string" == typeof t
        ? (function(e, t) {
            return C(e).filter(function(e) {
              var r = e.name;
              return (void 0 === r ? "" : r).toUpperCase() === t.toUpperCase();
            });
          })(e, t)
        : C(e);
    },
    L = function(e) {
      return C(e)[0] || null;
    },
    P = function(e) {
      var t = e && L(e);
      return (t && t.text) || null;
    },
    S = function() {
      var e = (arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : {}
      ).attributes;
      return void 0 === e ? {} : e;
    },
    O = function(e, t) {
      return S(e)[t];
    },
    F = new DOMParser(),
    U = function(e) {
      return (function(e, t) {
        var r = e.parseFromString(t, "application/xml");
        return b(r), x(r);
      })(F, e);
    },
    _ = function(e) {
      if ("string" == typeof e) {
        var t = e.match(/(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/);
        if (t) {
          var r =
            ((o = t[1]),
            60 * parseInt(o, 10) * 60 * 1e3 +
              ((i = t[2]), 60 * parseInt(i, 10) * 1e3) +
              ((n = t[3]), 1e3 * parseInt(n, 10)) +
              parseInt(t[5] || 0, 10));
          if (!isNaN(r)) return r;
        }
      }
      var n, i, o;
      return null;
    },
    B = function(e) {
      return (function(e) {
        return /^\d+(\.\d+)?%$/g.test(e);
      })(e)
        ? e
        : _(e);
    },
    R = function(e) {
      var t = L(e),
        r = t && T(t, "creatives");
      return (
        (r &&
          I(r).find(function(e) {
            return T(e, "linear");
          })) ||
        null
      );
    },
    N = function(e, t) {
      var r = e && R(e);
      if (r) {
        var n = T(r, "Linear"),
          i = n && T(n, "TrackingEvents"),
          o = i && I(i, "Tracking");
        if (o && o.length > 0) {
          var a = o.map(function(e) {
            var t = S(e),
              r = t.event,
              n = t.offset,
              i = P(e);
            return { event: r, offset: n && B(n), uri: i };
          });
          if (!t) return a;
          var u = a.filter(function(e) {
            return e.event === t;
          });
          if (u.length > 0) return u;
        }
      }
      return null;
    },
    j = function(e, t) {
      var r = e && R(e);
      if (r) {
        var n = T(r, "NonLinearAds"),
          i = n && T(n, "TrackingEvents"),
          o = i && I(i, "Tracking");
        if (o && o.length > 0) {
          var a = o.map(function(e) {
            return { event: S(e).event, uri: P(e) };
          });
          if (!t) return a;
          var u = a.filter(function(e) {
            return e.event === t;
          });
          if (u.length > 0) return u;
        }
      }
      return null;
    },
    V = function(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
          return (function n(i, o) {
            try {
              var a = t[i](o),
                u = a.value;
            } catch (e) {
              return void r(e);
            }
            if (!a.done)
              return Promise.resolve(u).then(
                function(e) {
                  n("next", e);
                },
                function(e) {
                  n("throw", e);
                }
              );
            e(u);
          })("next");
        });
      };
    },
    M = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    D = (function() {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    })(),
    W = function(e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = r),
        e
      );
    },
    z =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
    H = function e(t, r, n) {
      null === t && (t = Function.prototype);
      var i = Object.getOwnPropertyDescriptor(t, r);
      if (void 0 === i) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, r, n);
      }
      if ("value" in i) return i.value;
      var a = i.get;
      return void 0 !== a ? a.call(n) : void 0;
    },
    q = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    X = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    },
    G = function(e) {
      return Array.isArray(e) ? e : Array.from(e);
    },
    Q = function(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
      }
      return Array.from(e);
    },
    $ = function(e) {
      var t = ("" + e).match(/\d+/g);
      return parseInt(t[0], 10);
    },
    K = function(e) {
      return /\d+/.test(e) ? $(e) : e;
    },
    Y = function(e) {
      var t = e && R(e),
        r = t && T(t, "linear"),
        n = r && T(r, "Icons"),
        i = n && I(n, "Icon");
      return i && i.length > 0
        ? i.map(function(e) {
            return z(
              {},
              (function(e) {
                var t = S(e),
                  r = t.duration,
                  n = t.height,
                  i = t.offset,
                  o = t.program,
                  a = t.pxratio,
                  u = t.width,
                  c = t.xPosition,
                  s = void 0 === c ? "right" : c,
                  d = t.yPosition,
                  l = void 0 === d ? "top" : d;
                return {
                  duration: r && _(r),
                  height: n && $(n),
                  offset: i && _(i),
                  program: o,
                  pxratio: a && parseInt(a, 10),
                  width: u && $(u),
                  xPosition: s && K(s),
                  yPosition: l && K(l)
                };
              })(e),
              (function(e) {
                var t = T(e, "StaticResource"),
                  r = T(e, "HTMLResource"),
                  n = T(e, "IFrameResource");
                return t
                  ? { staticResource: P(t) }
                  : r
                  ? { htmlResource: P(r) }
                  : n
                  ? { iFrameResource: P(n) }
                  : { staticResource: P(e) };
              })(e),
              (function(e) {
                var t = I(e, "IconViewTracking").map(function(e) {
                  return P(e);
                });
                return 0 === t.length ? {} : { iconViewTracking: t };
              })(e),
              (function(e) {
                var t = T(e, "IconClicks"),
                  r = t && T(t, "IconClickThrough"),
                  n =
                    t &&
                    I(t, "IconClickTracking").map(function(e) {
                      return P(e);
                    });
                return {
                  iconClickThrough: r && P(r),
                  iconClickTracking: n && n.length > 0 ? n : void 0
                };
              })(e)
            );
          })
        : null;
    },
    J = function(e) {
      return "string" == typeof e ? "true" === e : Boolean(e);
    },
    Z = function(e, t) {
      var r = parseInt(O(e, "sequence"), 10),
        n = parseInt(O(t, "sequence"), 10);
      return r < n ? -1 : r > n ? 1 : 0;
    },
    ee = function(e) {
      var t = e && T(e, "VAST"),
        r = t && I(t, "Ad");
      return r && r.length > 0 ? r : [];
    },
    te = function(e) {
      var t = e && T(e, "VAST");
      if (t) {
        var r = T(t, "Error");
        if (r) return P(r);
      }
      return null;
    },
    re = function(e) {
      var t = parseInt(O(e, "sequence"), 10);
      return "number" != typeof t || isNaN(t) ? null : t;
    },
    ne = function(e) {
      return Boolean(re(e));
    },
    ie = function(e) {
      var t = ee(e);
      return Array.isArray(t) && t.filter(ne).length > 1;
    },
    oe = function(e) {
      var t = ee(e);
      return Array.isArray(t) && t.length > 0
        ? ie(e)
          ? t.filter(ne).sort(Z)[0]
          : t[0]
        : null;
    },
    ae = function() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return Boolean(T(e || {}, "Wrapper"));
    },
    ue = function(e) {
      return Boolean(T(e || {}, "Inline"));
    },
    ce = function(e) {
      var t = T(e, "Wrapper"),
        r = t && T(t, "VastAdTagUri");
      return (r && P(r)) || null;
    },
    se = function(e) {
      var t = S(T(e, "Wrapper")),
        r = t.allowMultipleAds,
        n = t.fallbackOnNoAd,
        i = t.followAdditionalWrappers,
        o = {};
      return (
        r && (o.allowMultipleAds = J(r)),
        n && (o.fallbackOnNoAd = J(n)),
        i && (o.followAdditionalWrappers = J(i)),
        o
      );
    },
    de = function(e) {
      var t = e && L(e);
      if (t) {
        var r = T(t, "Error");
        if (r) return P(r);
      }
      return null;
    },
    le = function(e) {
      var t = e && L(e);
      if (t) {
        var r = T(t, "Impression");
        if (r) return P(r);
      }
      return null;
    },
    fe = function(e) {
      var t = e && R(e);
      if (t) {
        var r = T(t, "UniversalAdId"),
          n = (r && P(r)) || null,
          i = T(t, "Linear"),
          o = T(i, "MediaFiles"),
          a = o && I(o, "MediaFile");
        if (a && a.length > 0)
          return a.map(function(e) {
            var t = P(e),
              r = S(e),
              i = r.apiFramework,
              o = r.bitrate,
              a = r.codec,
              u = r.delivery,
              c = r.height,
              s = r.id,
              d = r.maintainAspectRatio,
              l = r.maxBitrate,
              f = r.minBitrate,
              h = r.scalable,
              p = r.type,
              v = r.width;
            return {
              apiFramework: i,
              bitrate: o,
              codec: a,
              delivery: u,
              height: c,
              id: s,
              maintainAspectRatio: d,
              maxBitrate: l,
              minBitrate: f,
              scalable: h,
              src: t,
              type: p,
              universalAdId: n,
              width: v
            };
          });
      }
      return null;
    },
    he = function(e) {
      var t = e && R(e);
      if (t) {
        var r = T(t, "Linear"),
          n = T(r, "MediaFiles"),
          i = n && I(n, "InteractiveCreativeFile");
        if (i && i.length > 0)
          return i.map(function(e) {
            var t = S(e),
              r = t.apiFramework,
              n = t.type;
            return { apiFramework: r, src: P(e), type: n };
          });
      }
      return null;
    },
    pe = function(e) {
      var t = he(e);
      if (t) return t;
      var r = fe(e);
      return r &&
        (t = r
          .filter(function(e) {
            var t = e.apiFramework;
            return "vpaid" === (void 0 === t ? "" : t).toLowerCase();
          })
          .map(function(e) {
            return { apiFramework: e.apiFramework, src: e.src, type: e.type };
          })).length > 0
        ? t
        : null;
    },
    ve = function(e) {
      var t = e && R(e),
        r = t && T(t, "Linear"),
        n = r && T(r, "VideoClicks");
      return n || null;
    },
    me = function(e) {
      var t = ve(e),
        r = t && T(t, "ClickThrough");
      return r ? P(r) : null;
    },
    ye = function(e) {
      var t = ve(e),
        r = t && I(t, "ClickTracking");
      return r && r.length > 0
        ? r.map(function(e) {
            return P(e);
          })
        : null;
    },
    ge = function(e) {
      var t = ve(e),
        r = t && I(t, "CustomClick");
      return r && r.length > 0
        ? r.map(function(e) {
            return P(e);
          })
        : null;
    },
    we = function(e) {
      var t = e && R(e),
        r = t && T(t, "Linear"),
        n = r && O(r, "skipoffset");
      return n ? B(n) : null;
    },
    be = function(e) {
      var t = (function(e) {
        var t = /<Linear([\s\S]*)<\/Linear/gm.exec(e);
        return t && t[1];
      })(e);
      return {
        AdParameters:
          t &&
          (function(e) {
            var t = /<AdParameters[\s\w="]*>([\s\S]*)<\/AdParameters>/gm.exec(
              e
            );
            return (
              t &&
              t[1]
                .replace(/[\n\s]*<!\[CDATA\[[\n\s]*/, "")
                .replace(/[\n\s]*\]\]>[\n\s]*$/, "")
                .replace(/\]\]\]\]><!\[CDATA\[>/, "]]>")
                .trim()
            );
          })(t),
        xmlEncoded:
          t &&
          (function(e) {
            var t = /<AdParameters[\s]*xmlEncoded="(.*?)">/gim.exec(e);
            return Boolean(t) && "true" === t[1];
          })(t)
      };
    },
    Ee = Object.freeze({
      getAds: ee,
      getVastErrorURI: te,
      getPodAdSequence: re,
      isPodAd: ne,
      hasAdPod: ie,
      isAdPod: function() {
        return (arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : []
        )
          .map(function(e) {
            return e.parsedXML;
          })
          .some(ie);
      },
      getFirstAd: oe,
      isWrapper: ae,
      isInline: ue,
      getVASTAdTagURI: ce,
      getWrapperOptions: se,
      getAdErrorURI: de,
      getImpressionUri: le,
      getMediaFiles: fe,
      getInteractiveCreativeFiles: he,
      getInteractiveFiles: pe,
      getClickThrough: me,
      getClickTracking: ye,
      getCustomClick: ge,
      getSkipOffset: we,
      getCreativeData: be,
      getIcons: Y,
      getLinearTrackingEvents: N,
      getNonLinearTrackingEvents: j
    }),
    Ae = function(e) {
      var t,
        r,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = e,
        o =
          ((t = n),
          (r = {}),
          Object.keys(t).forEach(function(e) {
            r[e.toUpperCase()] = t[e];
          }),
          r);
      return (
        Boolean(o.CACHEBUSTING) ||
          (o.CACHEBUSTING = Math.round(1e10 * Math.random())),
        Boolean(o.TIMESTAMP) || (o.TIMESTAMP = new Date().toISOString()),
        Object.keys(o).forEach(function(e) {
          var t = encodeURIComponent(o[e]);
          i = i.replace(new RegExp("\\[" + e + "\\]", "gm"), t);
        }),
        i
      );
    },
    ke = function(e, t) {
      var r = new Image();
      return (r.src = Ae(e, t)), r;
    },
    xe = function(e, t) {
      var r = t.errorCode,
        n = t.tracker,
        i = void 0 === n ? ke : n;
      e.forEach(function(e) {
        var t = e.ad,
          n = e.parsedXML,
          o = de(t) || te(n);
        Boolean(o) && i(o, { errorCode: r });
      });
    },
    Ce = function(e) {
      return function(t, r) {
        var n = r.data,
          i = r.tracker,
          o = void 0 === i ? ke : i;
        t.forEach(function(t) {
          var r = t.ad,
            i = e(r);
          if (Boolean(i))
            switch (!0) {
              case "string" == typeof i:
                o(i, n);
                break;
              case Array.isArray(i):
                i.map(function(e) {
                  var t = e.uri;
                  return o(t, n);
                });
            }
        });
      };
    },
    Te = function(e) {
      return function(t) {
        return N(t, e);
      };
    },
    Ie =
      (W(
        (c = {}),
        "clickThrough",
        Ce(function(e) {
          var t = [],
            r = ye(e),
            n = ge(e);
          return (
            Array.isArray(r) &&
              r.length > 0 &&
              t.push.apply(
                t,
                Q(
                  r.map(function(e) {
                    return { uri: e };
                  })
                )
              ),
            Array.isArray(n) &&
              n.length > 0 &&
              t.push.apply(
                t,
                Q(
                  n.map(function(e) {
                    return { uri: e };
                  })
                )
              ),
            t
          );
        })
      ),
      W(c, "closeLinear", Ce(Te("closeLinear"))),
      W(c, "complete", Ce(Te("complete"))),
      W(c, "error", xe),
      W(c, "exitFullscreen", Ce(Te("exitFullscreen"))),
      W(c, "firstQuartile", Ce(Te("firstQuartile"))),
      W(c, "fullscreen", Ce(Te("fullscreen"))),
      W(c, "iconClick", function(e, t) {
        var r = t.data,
          n = t.tracker,
          i = void 0 === n ? ke : n,
          o = r.iconClickTracking;
        if (Array.isArray(o)) {
          var a = !0,
            u = !1,
            c = void 0;
          try {
            for (
              var s, d = o[Symbol.iterator]();
              !(a = (s = d.next()).done);
              a = !0
            )
              i(s.value, z({}, r));
          } catch (e) {
            (u = !0), (c = e);
          } finally {
            try {
              !a && d.return && d.return();
            } finally {
              if (u) throw c;
            }
          }
        }
      }),
      W(c, "iconView", function(e, t) {
        var r = t.data,
          n = t.tracker,
          i = void 0 === n ? ke : n,
          o = r.iconViewTracking;
        if (Array.isArray(o)) {
          var a = !0,
            u = !1,
            c = void 0;
          try {
            for (
              var s, d = o[Symbol.iterator]();
              !(a = (s = d.next()).done);
              a = !0
            )
              i(s.value, z({}, r));
          } catch (e) {
            (u = !0), (c = e);
          } finally {
            try {
              !a && d.return && d.return();
            } finally {
              if (u) throw c;
            }
          }
        }
      }),
      W(c, "impression", Ce(le)),
      W(c, "midpoint", Ce(Te("midpoint"))),
      W(c, "mute", Ce(Te("mute"))),
      W(c, "pause", Ce(Te("pause"))),
      W(c, "playerCollapse", Ce(Te("playerCollapse"))),
      W(c, "playerExpand", Ce(Te("playerExpand"))),
      W(c, "progress", function(e, t) {
        var r = t.data,
          n = t.tracker,
          i = void 0 === n ? ke : n,
          o = r.progressUri;
        Boolean(o) && i(o, z({}, r));
      }),
      W(c, "resume", Ce(Te("resume"))),
      W(c, "rewind", Ce(Te("rewind"))),
      W(c, "skip", Ce(Te("skip"))),
      W(c, "start", Ce(Te("start"))),
      W(c, "thirdQuartile", Ce(Te("thirdQuartile"))),
      W(c, "unmute", Ce(Te("unmute"))),
      c),
    Le = function(e) {
      return function(t) {
        return j(t, e);
      };
    },
    Pe =
      (W((s = {}), p, Ce(Le(p))),
      W(s, v, Ce(Le(v))),
      W(s, "close", Ce(Le("close"))),
      W(s, m, Ce(Le(m))),
      s),
    Se = function(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.async,
        n = void 0 !== r && r,
        i = t.defer,
        o = void 0 !== i && i,
        a = t.type,
        u = void 0 === a ? "text/javascript" : a,
        c = t.placeholder;
      if (!e) throw new TypeError('Missing required "src" parameter');
      return new Promise(function(t, r) {
        var i = document.createElement("script"),
          a = c;
        (i.type = u),
          (i.async = n),
          (i.defer = o),
          (i.onerror = function() {
            return r(new URIError("The script " + e + " is not accessible."));
          }),
          (i.onload = function() {
            return t(i);
          }),
          a ||
            (a = document.currentScript
              ? document.currentScript.parentNode
              : document.head),
          (i.src = e),
          a.appendChild(i);
      });
    },
    Oe = function() {
      var e = (arguments.length > 0 && void 0 !== arguments[0]
        ? arguments[0]
        : document
      ).createElement("VIDEO");
      return (e.style.width = "100%"), (e.style.height = "100%"), e;
    },
    Fe = function() {
      var e = document.createElement("DIV");
      return (
        e.classList.add("mol-video-ad-container"),
        (e.style.width = "100%"),
        (e.style.height = "100%"),
        e
      );
    },
    Ue = function(e) {
      return e.contentDocument || (e.contentWindow && e.contentWindow.document);
    },
    _e = "srcdoc" in document.createElement("iframe"),
    Be = function() {
      var e = document.createElement("IFRAME");
      return (
        (e.sandbox =
          "allow-forms allow-popups allow-scripts allow-same-origin"),
        (e.style.margin = "0"),
        (e.style.padding = "0"),
        (e.style.border = "none"),
        (e.style.width = "0"),
        (e.style.height = "0"),
        (e.style.position = "absolute"),
        e
      );
    },
    Re = function(e, t) {
      return new Promise(function(r, n) {
        var i,
          o = (function(e, t) {
            return (
              "<!DOCTYPE html>\n<html>\n  <head><meta charset='UTF-8'></head>\n  <body style='margin:0;padding:0'>\n  <script type='text/javascript'>window.parent.postMessage('" +
              e +
              "_ready', '" +
              t +
              "');</script>\n  </body>\n</html>"
            );
          })(
            t,
            (i = window.location).origin
              ? i.origin
              : i.protocol + "//" + i.hostname + (i.port ? ":" + i.port : "")
          ),
          a = void 0;
        try {
          ((a = Be()).src = "about:blank"), e.appendChild(a), Ue(a).write(o);
        } catch (t) {
          e.removeChild(a),
            _e
              ? (((a = Be()).src = "about:srcdoc"),
                (a.srcdoc = o),
                e.appendChild(a))
              : n(t);
        }
        window.addEventListener(
          "message",
          function e(n) {
            n.data === t + "_ready" &&
              (window.removeEventListener("message", e), r(a));
          },
          !1
        );
      });
    },
    Ne =
      ((d = "videoAdContainer"),
      (l = -1),
      function() {
        return d + "_" + ++l;
      }),
    je = Symbol("hidden"),
    Ve = (function() {
      function e(t) {
        var r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (
          (M(this, e),
          (this[je] = { destroyed: !1, iframe: null, readyPromise: null }),
          !(t instanceof Element))
        )
          throw new TypeError("placeholder is not an Element");
        (this[je].id = Ne()),
          (this.element = Fe()),
          (this.executionContext = null),
          (this.isOriginalVideoElement = Boolean(r)),
          r
            ? (this.videoElement = r)
            : ((this.videoElement = Oe()),
              this.element.appendChild(this.videoElement)),
          t.appendChild(this.element);
      }
      return (
        D(e, [
          {
            key: "addScript",
            value: (function() {
              var e = V(
                f.mark(function e(t) {
                  var r,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this.isDestroyed()) {
                              e.next = 2;
                              break;
                            }
                            throw new Error(
                              "VideoAdContainer has been destroyed"
                            );
                          case 2:
                            if (this[je].iframe) {
                              e.next = 7;
                              break;
                            }
                            return (e.next = 5), Re(this.element, this[je].id);
                          case 5:
                            (this[je].iframe = e.sent),
                              (this.executionContext = this[
                                je
                              ].iframe.contentWindow);
                          case 7:
                            return (
                              (r = Ue(this[je].iframe).body),
                              e.abrupt(
                                "return",
                                Se(t, z({ placeholder: r }, n))
                              )
                            );
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function(t) {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: "destroy",
            value: function() {
              this.element.parentNode.removeChild(this.element),
                (this[je].destroyed = !0);
            }
          },
          {
            key: "isDestroyed",
            value: function() {
              return this[je].destroyed;
            }
          }
        ]),
        e
      );
    })(),
    Me = function(e, t) {
      if (!e) throw new TypeError("placeholder is required");
      return new Ve(e, t);
    },
    De = function(e, t) {
      var r = t.src,
        n = t.type;
      return e.canPlayType(
        n ||
          (function(e) {
            var t = e.match(/\.([^.\/?]+)(\?[^\/]+)?$/i),
              r = t && t[1];
            return (
              {
                "3gp": "video/3gpp",
                avi: "video/x-msvideo",
                flv: "video/x-flv",
                m3u8: "application/x-mpegURL",
                m4v: "video/mp4",
                mov: "video/quicktime",
                mp4: "video/mp4",
                mpd: "application/dash+xml",
                ogv: "video/ogg",
                ts: "video/MP2T",
                webm: "video/webm",
                wmv: "video/x-ms-wmv"
              }[r] || "video/" + r
            );
          })(r)
      );
    },
    We = function(e, t, r) {
      var n = r.getBoundingClientRect(),
        i = fe(e);
      return i
        ? (function(e, t) {
            var r = t.width;
            return e.slice(0).sort(function(e, t) {
              return (
                Math.abs(r - (e.width || 0)) - Math.abs(r - (t.width || 0))
              );
            });
          })(
            i.filter(function(e) {
              return De(t, e);
            }),
            n
          )[0]
        : null;
    },
    ze = function(e, t, r) {
      var n = function n() {
        return e.removeEventListener(t, n), r.apply(void 0, arguments);
      };
      return (
        e.addEventListener(t, n),
        function() {
          e.removeEventListener(t, n);
        }
      );
    },
    He = h.progress,
    qe = function(e, t) {
      return function() {
        try {
          e.apply(void 0, arguments);
        } catch (e) {
          t && t.error(e);
        }
      };
    },
    Xe = h.fullscreen,
    Ge = h.exitFullscreen,
    Qe = h.playerCollapse,
    $e = h.playerExpand,
    Ke = h.pause,
    Ye = h.resume,
    Je = h.rewind,
    Ze = h.skip,
    et = function() {
      var e = document.createElement("BUTTON");
      return (
        e.classList.add("mol-vast-skip-control"),
        (e.type = "button"),
        (e.innerHTML = "skip"),
        (e.style.position = "absolute"),
        (e.style.bottom = "15px"),
        (e.style.right = "15px"),
        e
      );
    },
    tt = h.error,
    rt = "volumeChanged",
    nt = "finish",
    it = "adProgress",
    ot = h.complete,
    at = h.firstQuartile,
    ut = h.midpoint,
    ct = h.start,
    st = h.thirdQuartile,
    dt = function(e, t) {
      return (100 * e) / t;
    },
    lt = function(e, t) {
      return dt(e, t) >= 99;
    },
    ft = h.mute,
    ht = h.unmute,
    pt = function(e) {
      return e.muted || 0 === e.volume;
    },
    vt = h.impression,
    mt = function(e, t) {
      for (var r = String(e); r.length < t; ) r = "0" + r;
      return r;
    },
    yt = h.progress,
    gt = function(e) {
      return 1e3 * e;
    },
    wt = function(e) {
      var t = e.offset,
        r = e.uri,
        n =
          "number" == typeof t ||
          (function(e) {
            return /^\d+(\.\d+)?%$/g.test(e) && !isNaN(parseFloat(e));
          })(t),
        i = "string" == typeof r && r.length > 0;
      return n && i;
    },
    bt = function(e, t) {
      return "number" == typeof e ? e : (parseFloat(e) / 100) * t;
    },
    Et = h.clickThrough,
    At = [
      function(e, t) {
        var r = e.videoElement,
          n = e.element,
          i = (arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : {}
          ).clickThroughUrl,
          o = n || r.parentNode,
          a = document.createElement("A");
        return (
          a.classList.add("mol-vast-clickthrough"),
          (a.style.width = "100%"),
          (a.style.height = "100%"),
          (a.style.position = "absolute"),
          (a.style.left = 0),
          (a.style.top = 0),
          i && ((a.href = i), (a.target = "_blank")),
          (a.onclick = function(e) {
            void 0 !== Event.prototype.stopPropagation && e.stopPropagation(),
              r.paused ? r.play() : (r.pause(), t(Et));
          }),
          o.appendChild(a),
          function() {
            return o.removeChild(a);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = function() {
            t(tt, r.error);
          };
        return (
          r.addEventListener("error", n),
          function() {
            r.removeEventListener("error", n);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = [
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "fullscreenchange",
            "MSFullscreenChange"
          ],
          i = !1,
          o = function() {
            (document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement ||
              null) === r
              ? ((i = !0), t($e), t(Xe))
              : i && ((i = !1), t(Qe), t(Ge));
          },
          a = !0,
          u = !1,
          c = void 0;
        try {
          for (
            var s, d = n[Symbol.iterator]();
            !(a = (s = d.next()).done);
            a = !0
          ) {
            var l = s.value;
            document.addEventListener(l, o);
          }
        } catch (e) {
          (u = !0), (c = e);
        } finally {
          try {
            !a && d.return && d.return();
          } finally {
            if (u) throw c;
          }
        }
        return function() {
          var e = !0,
            t = !1,
            r = void 0;
          try {
            for (
              var i, a = n[Symbol.iterator]();
              !(e = (i = a.next()).done);
              e = !0
            ) {
              var u = i.value;
              document.removeEventListener(u, o);
            }
          } catch (e) {
            (t = !0), (r = e);
          } finally {
            try {
              !e && a.return && a.return();
            } finally {
              if (t) throw r;
            }
          }
        };
      },
      function(e, t) {
        var r = e.videoElement,
          n = function e() {
            r.currentTime >= 2 &&
              (t(vt), r.removeEventListener("timeupdate", e));
          };
        return (
          r.addEventListener("timeupdate", n),
          function() {
            r.removeEventListener("timeupdate", n);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = !1,
          i = !0,
          o = function() {
            n ? i && ((i = !1), t(Ye)) : ((n = !0), (i = !1));
          },
          a = function() {
            i || ((i = !0), t(Ke));
          };
        return (
          r.addEventListener("play", o),
          r.addEventListener("pause", a),
          function() {
            r.removeEventListener("play", o), r.removeEventListener("pause", a);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = (arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : {}
          ).progressEvents,
          i = void 0 === n ? [] : n,
          o = r.duration,
          a = gt(o),
          u = 0,
          c = gt(r.currentTime),
          s = i.filter(wt).map(function(e) {
            var t = e.offset,
              r = e.uri;
            return { offset: bt(t, a), uri: r };
          }),
          d = function e() {
            var n = r.currentTime,
              i = Math.abs(n - c);
            (u += gt(i)), (c = n);
            var o = s.reduce(
                function(e, t) {
                  var r = t.offset;
                  return u >= r ? e.toCall.push(t) : e.stillPending.push(t), e;
                },
                { stillPending: [], toCall: [] }
              ),
              a = o.stillPending,
              d = o.toCall;
            (s = a),
              d.forEach(function(e) {
                var r,
                  n,
                  i,
                  o,
                  a,
                  c = e.uri;
                t(yt, {
                  contentplayhead:
                    ((r = u),
                    (n = Math.floor(r / 36e5)),
                    (i = Math.floor((r / 6e4) % 60)),
                    (o = Math.floor((r / 1e3) % 60)),
                    (a = r % 1e3),
                    mt(n, 2) +
                      ":" +
                      mt(i, 2) +
                      ":" +
                      mt(o, 2) +
                      "." +
                      mt(a, 3)),
                  progressUri: c
                });
              }),
              0 === s.length && r.removeEventListener("timeupdate", e);
          };
        return (
          s.length > 0 && r.addEventListener("timeupdate", d),
          function() {
            r.removeEventListener("timeupdate", d);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = r.currentTime,
          i = function() {
            var e = r.currentTime - n;
            e < 0 && Math.abs(e) >= 1 && t(Je), (n = r.currentTime);
          };
        return (
          r.addEventListener("timeupdate", i),
          function() {
            r.removeEventListener("timeupdate", i);
          }
        );
      },
      function(e, t) {
        var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          n = r.skipoffset,
          i = r.createSkipControl,
          o = void 0 === i ? et : i;
        if (!Boolean(n)) return function() {};
        var a = void 0,
          u = e.videoElement,
          c = e.element,
          s = function e() {
            var r = 1e3 * u.currentTime;
            !Boolean(a) &&
              r >= n &&
              (((a = o()).onclick = function(e) {
                return (
                  void 0 !== Event.prototype.stopPropagation &&
                    e.stopPropagation(),
                  t(Ze),
                  !1
                );
              }),
              c.appendChild(a),
              u.removeEventListener("timeupdate", e));
          };
        return (
          u.addEventListener("timeupdate", s),
          function() {
            u.removeEventListener("timeupdate", s),
              Boolean(a) && c.removeChild(a);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = !1,
          i = !1,
          o = !1,
          a = !1,
          u = !1,
          c = function() {
            var e = r.duration,
              c = r.currentTime;
            !n && c > 0
              ? ((n = !0), t(ct))
              : i
              ? o
                ? a
                  ? u || (lt(c, e) && ((u = !0), t(ot)))
                  : (function(e, t) {
                      return dt(e, t) >= 75;
                    })(c, e) && ((a = !0), t(st))
                : (function(e, t) {
                    return dt(e, t) >= 50;
                  })(c, e) && ((o = !0), t(ut))
              : (function(e, t) {
                  return dt(e, t) >= 25;
                })(c, e) && ((i = !0), t(at)),
              t(it);
          },
          s = function e() {
            var n = r.duration,
              i = r.currentTime;
            !u && lt(i, n) && ((u = !0), t(ot)),
              r.removeEventListener("ended", e),
              r.removeEventListener("timeupdate", c);
          };
        return (
          r.addEventListener("timeupdate", c),
          r.addEventListener("ended", s),
          function() {
            r.removeEventListener("timeupdate", c),
              r.removeEventListener("ended", s);
          }
        );
      },
      function(e, t) {
        var r = e.videoElement,
          n = pt(r),
          i = function() {
            t(rt), n && !pt(r) ? t(ht) : !n && pt(r) && t(ft), (n = pt(r));
          };
        return (
          r.addEventListener("volumechange", i),
          function() {
            r.removeEventListener("volumechange", i);
          }
        );
      }
    ],
    kt = function(e, t) {
      var r = e.vastChain,
        n = e.videoAdContainer,
        i = e.hooks,
        o = r[0].ad,
        a = we(o),
        u = me(o),
        c = (function(e) {
          return e
            .map(function(e) {
              return e.ad;
            })
            .reduce(function(e, t) {
              var r = N(t, He) || [];
              return [].concat(Q(e), Q(r));
            }, [])
            .map(function(e) {
              return { offset: e.offset, uri: e.uri };
            });
        })(r),
        s = z({ clickThroughUrl: u, progressEvents: c, skipoffset: a }, i),
        d = At.map(function(e) {
          return qe(e(n, t, s));
        });
      return function() {
        return d.forEach(function(e) {
          return e();
        });
      };
    },
    xt = function(e, t) {
      return new Promise(function(r) {
        var n = { currentTime: e.currentTime, playing: !e.paused };
        n.playing && e.pause(),
          (e.src = t.src),
          e.load(),
          ze(e, "loadeddata", function() {
            (e.currentTime = n.currentTime), n.playing && e.play(), r();
          });
      });
    },
    Ct = "Expected a function",
    Tt = NaN,
    It = "[object Symbol]",
    Lt = /^\s+|\s+$/g,
    Pt = /^[-+]0x[0-9a-f]+$/i,
    St = /^0b[01]+$/i,
    Ot = /^0o[0-7]+$/i,
    Ft = parseInt,
    Ut = "object" == typeof t && t && t.Object === Object && t,
    _t = "object" == typeof self && self && self.Object === Object && self,
    Bt = Ut || _t || Function("return this")(),
    Rt = Object.prototype.toString,
    Nt = Math.max,
    jt = Math.min,
    Vt = function() {
      return Bt.Date.now();
    };
  function Mt(e) {
    var t = typeof e;
    return !!e && ("object" == t || "function" == t);
  }
  function Dt(e) {
    if ("number" == typeof e) return e;
    if (
      (function(e) {
        return (
          "symbol" == typeof e ||
          ((function(e) {
            return !!e && "object" == typeof e;
          })(e) &&
            Rt.call(e) == It)
        );
      })(e)
    )
      return Tt;
    if (Mt(e)) {
      var t = "function" == typeof e.valueOf ? e.valueOf() : e;
      e = Mt(t) ? t + "" : t;
    }
    if ("string" != typeof e) return 0 === e ? e : +e;
    e = e.replace(Lt, "");
    var r = St.test(e);
    return r || Ot.test(e) ? Ft(e.slice(2), r ? 2 : 8) : Pt.test(e) ? Tt : +e;
  }
  var Wt = function(e, t, r) {
      var n,
        i,
        o,
        a,
        u,
        c,
        s = 0,
        d = !1,
        l = !1,
        f = !0;
      if ("function" != typeof e) throw new TypeError(Ct);
      function h(t) {
        var r = n,
          o = i;
        return (n = i = void 0), (s = t), (a = e.apply(o, r));
      }
      function p(e) {
        var r = e - c;
        return void 0 === c || r >= t || r < 0 || (l && e - s >= o);
      }
      function v() {
        var e = Vt();
        if (p(e)) return m(e);
        u = setTimeout(
          v,
          (function(e) {
            var r = t - (e - c);
            return l ? jt(r, o - (e - s)) : r;
          })(e)
        );
      }
      function m(e) {
        return (u = void 0), f && n ? h(e) : ((n = i = void 0), a);
      }
      function y() {
        var e = Vt(),
          r = p(e);
        if (((n = arguments), (i = this), (c = e), r)) {
          if (void 0 === u)
            return (function(e) {
              return (s = e), (u = setTimeout(v, t)), d ? h(e) : a;
            })(c);
          if (l) return (u = setTimeout(v, t)), h(c);
        }
        return void 0 === u && (u = setTimeout(v, t)), a;
      }
      return (
        (t = Dt(t) || 0),
        Mt(r) &&
          ((d = !!r.leading),
          (o = (l = "maxWait" in r) ? Nt(Dt(r.maxWait) || 0, t) : o),
          (f = "trailing" in r ? !!r.trailing : f)),
        (y.cancel = function() {
          void 0 !== u && clearTimeout(u), (s = 0), (n = c = i = u = void 0);
        }),
        (y.flush = function() {
          return void 0 === u ? a : m(Vt());
        }),
        y
      );
    },
    zt =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver,
    Ht = function() {},
    qt = ["style", "clientWidth", "clientHeight"],
    Xt = Symbol("mutationHandlers"),
    Gt = Symbol("mutationObserver"),
    Qt = function(e, t) {
      if (!e[Xt]) {
        e[Xt] = [];
        e[Gt] = (function(e, t) {
          var r = new zt(function(e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r].attributeName;
              qt.includes(n) && t();
            }
          });
          return (
            r.observe(e, { attributes: !0, characterData: !1, childList: !0 }),
            r
          );
        })(e, function() {
          for (var t = arguments.length, r = Array(t), n = 0; n < t; n++)
            r[n] = arguments[n];
          e[Xt] &&
            e[Xt].forEach(function(e) {
              return e.apply(void 0, r);
            });
        });
      }
      return (
        e[Xt].push(t),
        function() {
          (e[Xt] = e[Xt].filter(function(e) {
            return e !== t;
          })),
            0 === e[Xt].length &&
              (e[Gt].disconnect(), delete e[Xt], delete e[Gt]);
        }
      );
    },
    $t = Symbol("resizeHandlers"),
    Kt = Symbol("resizeObj"),
    Yt = function(e, t) {
      if (!e[$t]) {
        e[$t] = [];
        (e[Kt] = (function(e) {
          var t = document.createElement("object");
          return (
            t.setAttribute(
              "style",
              "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"
            ),
            (t.onload = function() {
              this.contentWindow &&
                this.contentWindow.addEventListener("resize", e);
            }),
            (t.type = "text/html"),
            (t.data = "about:blank"),
            t
          );
        })(function() {
          for (var t = arguments.length, r = Array(t), n = 0; n < t; n++)
            r[n] = arguments[n];
          e[$t] &&
            e[$t].forEach(function(e) {
              return e.apply(void 0, r);
            });
        })),
          "static" === getComputedStyle(e).position &&
            (e.style.position = "relative"),
          e.appendChild(e[Kt]);
      }
      return (
        e[$t].push(t),
        function() {
          (e[$t] = e[$t].filter(function(e) {
            return e !== t;
          })),
            0 === e[$t].length &&
              (e.removeChild(e[Kt]), delete e[$t], delete e[Kt]);
        }
      );
    },
    Jt = function(e, t) {
      var r = (arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : {}
        ).threshold,
        n = void 0 === r ? 20 : r;
      !(function(e, t) {
        if (!(e instanceof Element))
          throw new TypeError("Target is not an Element node");
        if (!(t instanceof Function))
          throw new TypeError("Callback is not a function");
      })(e, t);
      var i = function(e) {
          var t = e.style,
            r = e.clientHeight,
            n = e.clientWidth;
          return [t.width, t.height, n, r].join(".");
        },
        o = i(e),
        a = Wt(function() {
          var r = i(e);
          r !== o && ((o = r), t());
        }, n),
        u = Boolean(zt) ? Qt(e, a) : Ht,
        c = Yt(e, a);
      return function() {
        u(), c();
      };
    },
    Zt = [],
    er = function(e) {
      var t = e.element,
        r = e.callback,
        n = e.lastInViewport,
        i = (function(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            r = e.getBoundingClientRect(),
            n = r.height,
            i = r.width,
            o = r.top,
            a = r.right,
            u = r.bottom,
            c = r.left;
          if (!n || !i) return !1;
          var s = n * (1 - t),
            d = i * (1 - t),
            l = window.innerHeight || document.documentElement.clientHeight,
            f = window.innerWidth || document.documentElement.clientWidth;
          return (
            !document.hidden &&
            o + s >= 0 &&
            u - s <= l &&
            c + d >= 0 &&
            a - d <= f
          );
        })(t, e.viewportOffset);
      i !== n && ((e.lastInViewport = i), r(i));
    },
    tr = function() {
      var e = !0,
        t = !1,
        r = void 0;
      try {
        for (
          var n, i = Zt[Symbol.iterator]();
          !(e = (n = i.next()).done);
          e = !0
        ) {
          var o = n.value;
          er(o);
        }
      } catch (e) {
        (t = !0), (r = e);
      } finally {
        try {
          !e && i.return && i.return();
        } finally {
          if (t) throw r;
        }
      }
    },
    rr = function(e, t) {
      var r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        n = r.threshold,
        i = void 0 === n ? 100 : n,
        o = r.scrollableElement,
        a = void 0 === o ? window : o,
        u = r.viewabilityOffset,
        c = void 0 === u ? 0.4 : u;
      !(function(e, t) {
        if (!(e instanceof Element))
          throw new TypeError("Target is not an Element node");
        if (!(t instanceof Function))
          throw new TypeError("Callback is not a function");
      })(e, t);
      var s = i > 0 ? Wt(tr) : tr,
        d = {
          callback: t,
          element: e,
          lastInViewport: !1,
          scrollableElement: a,
          viewabilityOffset: c
        };
      return (
        er(d),
        Zt.push(d),
        a.addEventListener("scroll", s),
        1 === Zt.length &&
          (window.addEventListener("resize", s),
          window.addEventListener("orientationchange", s),
          document.addEventListener("visibilitychange", s)),
        function() {
          0 ===
            (Zt = Zt.filter(function(e) {
              return e !== d;
            })).length &&
            (window.removeEventListener("resize", s),
            window.removeEventListener("orientationchange", s),
            document.removeEventListener("visibilitychange", s)),
            Zt.every(function(e) {
              return e.scrollableElement !== a;
            }) && a.removeEventListener("scroll", s);
        }
      );
    },
    nr = function(e) {
      var t = 0,
        r = 0,
        n = function() {
          e.duration - t > 3 && (e.pause(), e.play(), (e.currentTime = t));
        },
        i = function() {
          var n = e.currentTime;
          Math.abs(n - t) > 3
            ? ((r += 1) >= 2 && e.pause(), (e.currentTime = t))
            : (t = n);
        };
      return (
        e.addEventListener("timeupdate", i),
        e.addEventListener("ended", n),
        function() {
          e.removeEventListener("timeupdate", i),
            e.removeEventListener("ended", n);
        }
      );
    },
    ir = (function() {
      function e(t) {
        M(this, e), (this.evts = {}), (this.logger = t || console);
      }
      return (
        D(e, [
          {
            key: "on",
            value: function(e, t) {
              var r = this.evts;
              return (r[e] || (r[e] = [])).push(t), this;
            }
          },
          {
            key: "removeListener",
            value: function(e, t) {
              var r = this.evts,
                n = r[e] || (r[e] = []);
              return (
                (r[e] = n.filter(function(e) {
                  return e !== t && e._ !== t;
                })),
                this
              );
            }
          },
          {
            key: "removeAllListeners",
            value: function(e) {
              return e ? (this.evts[e] = null) : (this.evts = {}), this;
            }
          },
          {
            key: "once",
            value: function(e, t) {
              var r = this,
                n = function n() {
                  r.removeListener(e, n), t.apply(void 0, arguments);
                };
              return (n._ = t), this.on(e, n);
            }
          },
          {
            key: "emit",
            value: function(e) {
              for (
                var t = this,
                  r = arguments.length,
                  n = Array(r > 1 ? r - 1 : 0),
                  i = 1;
                i < r;
                i++
              )
                n[i - 1] = arguments[i];
              var o = this.evts,
                a = o[e] || (o[e] = []),
                u = a.length > 0;
              return (
                a.forEach(function(e) {
                  try {
                    e.apply(void 0, n);
                  } catch (e) {
                    t.logger.error(e, e.stack);
                  }
                }),
                u
              );
            }
          }
        ]),
        e
      );
    })(),
    or = function() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.staticResource,
        r = e.htmlResource,
        n = e.iFrameResource;
      return t || r || n;
    },
    ar = function(e) {
      return 1 === e.length
        ? e[0]
        : (function(e) {
            var t = window.devicePixelRatio || 0;
            return e.slice(0).sort(function(e, r) {
              return (
                Math.abs(t - (e.pxratio || 0)) - Math.abs(t - (r.pxratio || 0))
              );
            });
          })(e)[0];
    },
    ur = function(e) {
      var t = e
        .map(function(e) {
          return e.ad;
        })
        .reduce(function(e, t) {
          return [].concat(Q(e), Q(Y(t) || []));
        }, []);
      return t.length > 0
        ? (function(e) {
            var t = (function(e) {
              return e.reduce(function(e, t) {
                var r = t.program,
                  n = void 0 === r ? "UNKNOWN" : r;
                return e[n] || (e[n] = []), e[n].push(t), e;
              }, {});
            })(e);
            return Object.keys(t).reduce(function(e, r) {
              return [].concat(
                Q(e),
                "UNKNOWN" === r ? Q(t.UNKNOWN) : [ar(t[r])]
              );
            }, []);
          })(
            (function(e) {
              return (
                (t = or),
                (r = {}),
                e.filter(function(e) {
                  var n = t(e);
                  return !r.hasOwnProperty(n) && ((r[n] = !0), !0);
                })
              );
              var t, r;
            })(t)
          )
        : null;
    },
    cr = function e() {
      var t = this;
      M(this, e),
        (this.promise = new Promise(function(e, r) {
          (t.resolve = e), (t.reject = r);
        }));
    },
    sr = function(e, t) {
      var r = !0,
        n = new cr(),
        i = n.promise,
        o = n.reject,
        a = n.resolve,
        u = ze(e, t, function() {
          for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          (r = !1), a(t);
        });
      return {
        cancel: function() {
          r && ((r = !1), u(), o(new Error("waitFor was canceled")));
        },
        promise: i
      };
    };
  !(function(e) {
    if (!e.fetch) {
      var t = {
        searchParams: "URLSearchParams" in e,
        iterable: "Symbol" in e && "iterator" in Symbol,
        blob:
          "FileReader" in e &&
          "Blob" in e &&
          (function() {
            try {
              return new Blob(), !0;
            } catch (e) {
              return !1;
            }
          })(),
        formData: "FormData" in e,
        arrayBuffer: "ArrayBuffer" in e
      };
      if (t.arrayBuffer)
        var r = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ],
          n = function(e) {
            return e && DataView.prototype.isPrototypeOf(e);
          },
          i =
            ArrayBuffer.isView ||
            function(e) {
              return e && r.indexOf(Object.prototype.toString.call(e)) > -1;
            };
      (d.prototype.append = function(e, t) {
        (e = u(e)), (t = c(t));
        var r = this.map[e];
        this.map[e] = r ? r + "," + t : t;
      }),
        (d.prototype.delete = function(e) {
          delete this.map[u(e)];
        }),
        (d.prototype.get = function(e) {
          return (e = u(e)), this.has(e) ? this.map[e] : null;
        }),
        (d.prototype.has = function(e) {
          return this.map.hasOwnProperty(u(e));
        }),
        (d.prototype.set = function(e, t) {
          this.map[u(e)] = c(t);
        }),
        (d.prototype.forEach = function(e, t) {
          for (var r in this.map)
            this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
        }),
        (d.prototype.keys = function() {
          var e = [];
          return (
            this.forEach(function(t, r) {
              e.push(r);
            }),
            s(e)
          );
        }),
        (d.prototype.values = function() {
          var e = [];
          return (
            this.forEach(function(t) {
              e.push(t);
            }),
            s(e)
          );
        }),
        (d.prototype.entries = function() {
          var e = [];
          return (
            this.forEach(function(t, r) {
              e.push([r, t]);
            }),
            s(e)
          );
        }),
        t.iterable && (d.prototype[Symbol.iterator] = d.prototype.entries);
      var o = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      (m.prototype.clone = function() {
        return new m(this, { body: this._bodyInit });
      }),
        v.call(m.prototype),
        v.call(g.prototype),
        (g.prototype.clone = function() {
          return new g(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new d(this.headers),
            url: this.url
          });
        }),
        (g.error = function() {
          var e = new g(null, { status: 0, statusText: "" });
          return (e.type = "error"), e;
        });
      var a = [301, 302, 303, 307, 308];
      (g.redirect = function(e, t) {
        if (-1 === a.indexOf(t)) throw new RangeError("Invalid status code");
        return new g(null, { status: t, headers: { location: e } });
      }),
        (e.Headers = d),
        (e.Request = m),
        (e.Response = g),
        (e.fetch = function(e, r) {
          return new Promise(function(n, i) {
            var o = new m(e, r),
              a = new XMLHttpRequest();
            (a.onload = function() {
              var e,
                t,
                r = {
                  status: a.status,
                  statusText: a.statusText,
                  headers:
                    ((e = a.getAllResponseHeaders() || ""),
                    (t = new d()),
                    e
                      .replace(/\r?\n[\t ]+/g, " ")
                      .split(/\r?\n/)
                      .forEach(function(e) {
                        var r = e.split(":"),
                          n = r.shift().trim();
                        if (n) {
                          var i = r.join(":").trim();
                          t.append(n, i);
                        }
                      }),
                    t)
                };
              r.url =
                "responseURL" in a
                  ? a.responseURL
                  : r.headers.get("X-Request-URL");
              var i = "response" in a ? a.response : a.responseText;
              n(new g(i, r));
            }),
              (a.onerror = function() {
                i(new TypeError("Network request failed"));
              }),
              (a.ontimeout = function() {
                i(new TypeError("Network request failed"));
              }),
              a.open(o.method, o.url, !0),
              "include" === o.credentials
                ? (a.withCredentials = !0)
                : "omit" === o.credentials && (a.withCredentials = !1),
              "responseType" in a && t.blob && (a.responseType = "blob"),
              o.headers.forEach(function(e, t) {
                a.setRequestHeader(t, e);
              }),
              a.send(void 0 === o._bodyInit ? null : o._bodyInit);
          });
        }),
        (e.fetch.polyfill = !0);
    }
    function u(e) {
      if (
        ("string" != typeof e && (e = String(e)),
        /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
      )
        throw new TypeError("Invalid character in header field name");
      return e.toLowerCase();
    }
    function c(e) {
      return "string" != typeof e && (e = String(e)), e;
    }
    function s(e) {
      var r = {
        next: function() {
          var t = e.shift();
          return { done: void 0 === t, value: t };
        }
      };
      return (
        t.iterable &&
          (r[Symbol.iterator] = function() {
            return r;
          }),
        r
      );
    }
    function d(e) {
      (this.map = {}),
        e instanceof d
          ? e.forEach(function(e, t) {
              this.append(t, e);
            }, this)
          : Array.isArray(e)
          ? e.forEach(function(e) {
              this.append(e[0], e[1]);
            }, this)
          : e &&
            Object.getOwnPropertyNames(e).forEach(function(t) {
              this.append(t, e[t]);
            }, this);
    }
    function l(e) {
      if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
      e.bodyUsed = !0;
    }
    function f(e) {
      return new Promise(function(t, r) {
        (e.onload = function() {
          t(e.result);
        }),
          (e.onerror = function() {
            r(e.error);
          });
      });
    }
    function h(e) {
      var t = new FileReader(),
        r = f(t);
      return t.readAsArrayBuffer(e), r;
    }
    function p(e) {
      if (e.slice) return e.slice(0);
      var t = new Uint8Array(e.byteLength);
      return t.set(new Uint8Array(e)), t.buffer;
    }
    function v() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function(e) {
          if (((this._bodyInit = e), e))
            if ("string" == typeof e) this._bodyText = e;
            else if (t.blob && Blob.prototype.isPrototypeOf(e))
              this._bodyBlob = e;
            else if (t.formData && FormData.prototype.isPrototypeOf(e))
              this._bodyFormData = e;
            else if (
              t.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(e)
            )
              this._bodyText = e.toString();
            else if (t.arrayBuffer && t.blob && n(e))
              (this._bodyArrayBuffer = p(e.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer]));
            else {
              if (
                !t.arrayBuffer ||
                (!ArrayBuffer.prototype.isPrototypeOf(e) && !i(e))
              )
                throw new Error("unsupported BodyInit type");
              this._bodyArrayBuffer = p(e);
            }
          else this._bodyText = "";
          this.headers.get("content-type") ||
            ("string" == typeof e
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set("content-type", this._bodyBlob.type)
              : t.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(e) &&
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8"
                ));
        }),
        t.blob &&
          ((this.blob = function() {
            var e = l(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }),
          (this.arrayBuffer = function() {
            return this._bodyArrayBuffer
              ? l(this) || Promise.resolve(this._bodyArrayBuffer)
              : this.blob().then(h);
          })),
        (this.text = function() {
          var e,
            t,
            r,
            n = l(this);
          if (n) return n;
          if (this._bodyBlob)
            return (
              (e = this._bodyBlob),
              (t = new FileReader()),
              (r = f(t)),
              t.readAsText(e),
              r
            );
          if (this._bodyArrayBuffer)
            return Promise.resolve(
              (function(e) {
                for (
                  var t = new Uint8Array(e), r = new Array(t.length), n = 0;
                  n < t.length;
                  n++
                )
                  r[n] = String.fromCharCode(t[n]);
                return r.join("");
              })(this._bodyArrayBuffer)
            );
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }),
        t.formData &&
          (this.formData = function() {
            return this.text().then(y);
          }),
        (this.json = function() {
          return this.text().then(JSON.parse);
        }),
        this
      );
    }
    function m(e, t) {
      var r,
        n,
        i = (t = t || {}).body;
      if (e instanceof m) {
        if (e.bodyUsed) throw new TypeError("Already read");
        (this.url = e.url),
          (this.credentials = e.credentials),
          t.headers || (this.headers = new d(e.headers)),
          (this.method = e.method),
          (this.mode = e.mode),
          i || null == e._bodyInit || ((i = e._bodyInit), (e.bodyUsed = !0));
      } else this.url = String(e);
      if (
        ((this.credentials = t.credentials || this.credentials || "omit"),
        (!t.headers && this.headers) || (this.headers = new d(t.headers)),
        (this.method =
          ((r = t.method || this.method || "GET"),
          (n = r.toUpperCase()),
          o.indexOf(n) > -1 ? n : r)),
        (this.mode = t.mode || this.mode || null),
        (this.referrer = null),
        ("GET" === this.method || "HEAD" === this.method) && i)
      )
        throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(i);
    }
    function y(e) {
      var t = new FormData();
      return (
        e
          .trim()
          .split("&")
          .forEach(function(e) {
            if (e) {
              var r = e.split("="),
                n = r.shift().replace(/\+/g, " "),
                i = r.join("=").replace(/\+/g, " ");
              t.append(decodeURIComponent(n), decodeURIComponent(i));
            }
          }),
        t
      );
    }
    function g(e, t) {
      t || (t = {}),
        (this.type = "default"),
        (this.status = void 0 === t.status ? 200 : t.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = "statusText" in t ? t.statusText : "OK"),
        (this.headers = new d(t.headers)),
        (this.url = t.url || ""),
        this._initBody(e);
    }
  })("undefined" != typeof self ? self : void 0);
  var dr,
    lr,
    fr,
    hr,
    pr = function(e) {
      var t = e.toLowerCase();
      return ["text/plain", "text/html"].some(function(e) {
        return t.includes(e);
      });
    },
    vr =
      ((dr = V(
        f.mark(function e(t) {
          var r, n, i, o;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), fetch(t);
                  case 2:
                    if (
                      ((r = e.sent),
                      (n = r.headers.get("Content-Type")),
                      !(r.status >= 400))
                    ) {
                      e.next = 8;
                      break;
                    }
                    throw (((i = new Error(r.statusText)).response = r), i);
                  case 8:
                    if (pr(n)) {
                      e.next = 12;
                      break;
                    }
                    throw (((o = new Error(
                      "fetchHtml error, invalid Content-Type " + n
                    )).response = r),
                    o);
                  case 12:
                    return e.abrupt("return", r.text());
                  case 13:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0
          );
        })
      )),
      function(e) {
        return dr.apply(this, arguments);
      }),
    mr = function(e, t) {
      var r = t.staticResource,
        n = t.htmlResource,
        i = t.iFrameResource;
      return Boolean(r)
        ? (function(e, t) {
            var r = t.document,
              n = t.data,
              i = n.height,
              o = n.width,
              a = r.createElement("IMG");
            return o && (a.width = o), i && (a.height = i), (a.src = e), a;
          })(r, { data: t, document: e })
        : Boolean(n)
        ? (function(e, t) {
            var r = t.document,
              n = t.data,
              i = n.height,
              o = n.width,
              a = r.createElement("DIV");
            return (
              o && (a.style.width = o + "px"),
              i && (a.style.height = i + "px"),
              vr(e)
                .then(function(e) {
                  (a.innerHTML = e), a.dispatchEvent(new CustomEvent("load"));
                })
                .catch(function() {
                  a.dispatchEvent(new CustomEvent("error"));
                }),
              a
            );
          })(n, { data: t, document: e })
        : (function(e, t) {
            var r = t.document,
              n = t.data,
              i = n.height,
              o = n.width,
              a = r.createElement("IFRAME");
            return (
              (a.src = e),
              (a.sandbox = "allow-forms allow-popups allow-scripts"),
              o && (a.width = o),
              i && (a.height = i),
              (a.src = e),
              (a.frameBorder = 0),
              (a.style.border = "none"),
              a
            );
          })(i, { data: t, document: e });
    },
    yr = function() {},
    gr = function(e, t) {
      var r = t.document,
        n = t.placeholder;
      return new Promise(function(t, i) {
        try {
          var o = mr(r, e),
            a = sr(o, "error"),
            u = sr(o, "load"),
            c = function() {
              n.contains(o) && (n.removeChild(o), (o.style.zIndex = 0));
            };
          a.promise
            .then(function() {
              u.cancel(), c(), i(new Error("Error loading resource"));
            })
            .catch(yr),
            u.promise
              .then(function() {
                a.cancel(), c(), t(o);
              })
              .catch(yr),
            (o.style.zIndex = -9999),
            n.appendChild(o);
        } catch (e) {
          i(e);
        }
      });
    },
    wr = function(e, t, r) {
      var n,
        i,
        o,
        a = r.drawnIcons,
        u = r.placeholder,
        c = e.signature,
        s = t.getBoundingClientRect(),
        d = u.getBoundingClientRect(),
        l = e.width || s.width,
        f = e.height || s.height,
        h = e.xPosition || "right",
        p = e.yPosition || "top",
        v = void 0,
        m = void 0;
      if (
        (function(e) {
          return !["left", "right"].includes(String(e).toLowerCase());
        })(h)
      )
        v = h;
      else {
        var y = a.filter(function(e) {
          return e.xPosition === h && e.yPosition === p;
        });
        v = (function(e, t, r, n) {
          var i = r.reduce(function(e, t) {
            return e + t.width + 1;
          }, 0);
          return "left" === e ? i : n - i - t;
        })(h, l, y, d.width);
      }
      !(function(e) {
        return !["top", "bottom"].includes(String(e).toLowerCase());
      })(p)
        ? ((n = p), (i = f), (o = d.height), (m = "top" === n ? 0 : o - i))
        : (m = p);
      var g = v + "-" + m + "_" + l + "x" + f;
      return Object.assign(e, {
        height: f,
        left: v,
        signature: g,
        top: m,
        updated: c !== g,
        width: l
      });
    },
    br = function(e) {
      return e.height * e.width;
    },
    Er = function(e) {
      return e.left + e.width;
    },
    Ar = function(e) {
      var t = e.left;
      return t;
    },
    kr = function(e) {
      var t = e.top;
      return t;
    },
    xr = function(e) {
      return e.top + e.height;
    },
    Cr = function(e, t) {
      return !t.drawnIcons.some(function(t) {
        return (function(e, t) {
          return !(
            Ar(e) > Er(t) ||
            Er(e) < Ar(t) ||
            xr(e) < kr(t) ||
            kr(e) > xr(t)
          );
        })(e, t);
      });
    },
    Tr = function(e, t) {
      var r = (function(e, t) {
          var r = t.drawnIcons,
            n = t.placeholder,
            i = br(n.getBoundingClientRect());
          return (
            br(e) +
              r.reduce(function(e, t) {
                return e + br(t);
              }, 0) <=
            0.35 * i
          );
        })(e, t),
        n = (function(e, t) {
          var r = t.placeholder.getBoundingClientRect();
          return (
            e.left >= 0 &&
            e.left + e.width <= r.width &&
            e.top >= 0 &&
            e.top + e.height <= r.height
          );
        })(e, t),
        i = Cr(e, t);
      return r && n && i;
    },
    Ir = function() {},
    Lr = function(e, t) {
      var r = (arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : {}
        ).onIconClick,
        n = void 0 === r ? Ir : r,
        i = document.createElement("A");
      return (
        t.iconClickthrough &&
          ((i.href = t.iconClickthrough), (i.target = "_blank")),
        Boolean(t.iFrameResource) && (e.style.pointerEvents = "none"),
        (i.onclick = function(e) {
          void 0 !== Event.prototype.stopPropagation && e.stopPropagation(),
            n(t);
        }),
        i.appendChild(e),
        i
      );
    },
    Pr =
      ((lr = V(
        f.mark(function e(t, r) {
          var n;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (t.element) {
                      e.next = 9;
                      break;
                    }
                    return (e.next = 3), gr(t, r);
                  case 3:
                    ((n = e.sent).width = "100%"),
                      (n.height = "100%"),
                      (n.style.height = "100%"),
                      (n.style.width = "100%"),
                      (t.element = Lr(n, t, r));
                  case 9:
                    return e.abrupt("return", t.element);
                  case 10:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0
          );
        })
      )),
      function(e, t) {
        return lr.apply(this, arguments);
      }),
    Sr = function(e, t) {
      var r = t.height,
        n = t.width,
        i = t.left,
        o = t.top,
        a = t.yPosition;
      return (
        (e.height = r),
        (e.width = n),
        (e.style.position = "absolute"),
        (e.style.left = i + "px"),
        "bottom" === a ? (e.style.bottom = "0") : (e.style.top = o + "px"),
        (e.style.height = r + "px"),
        (e.style.width = n + "px"),
        e
      );
    },
    Or =
      ((fr = V(
        f.mark(function e(t, r) {
          var n, i, o;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (n = r.placeholder), (e.next = 3), Pr(t, r);
                  case 3:
                    if (((i = e.sent), (o = wr(t, i, r)), !Tr(o, r))) {
                      e.next = 9;
                      break;
                    }
                    (i.parentNode && !t.updated) || n.appendChild(Sr(i, o)),
                      (e.next = 11);
                    break;
                  case 9:
                    throw (i.parentNode && i.parentNode.removeChild(i),
                    new Error("Icon can't be rendered"));
                  case 11:
                    return e.abrupt("return", o);
                  case 12:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0
          );
        })
      )),
      function(e, t) {
        return fr.apply(this, arguments);
      }),
    Fr = function(e, t) {
      var r = t.onIconClick,
        n = t.videoAdContainer,
        i = t.logger,
        o = n.element,
        a = n.videoElement,
        u = [],
        c = e.reduce(
          function(e, t) {
            return (
              !(function(e, t) {
                var r = 1e3 * t.currentTime,
                  n = 1e3 * t.duration,
                  i = e.offset || 0,
                  o = e.duration || n;
                return i <= r && r - i <= o;
              })(t, a)
                ? e.otherIcons.push(t)
                : e.iconsToShow.push(t),
              e
            );
          },
          { iconsToShow: [], otherIcons: [] }
        ),
        s = c.iconsToShow;
      return (
        c.otherIcons.forEach(function(e) {
          var t = e.element;
          t && t.parentNode && t.parentNode.removeChild(t);
        }),
        s
          .reduce(function(e, t) {
            return e
              .then(function() {
                return Or(t, {
                  document: document,
                  drawnIcons: u,
                  onIconClick: r,
                  placeholder: o
                });
              })
              .then(function(e) {
                return u.push(e);
              })
              .catch(function(e) {
                return i.log(e);
              });
          }, Promise.resolve(u))
          .then(function() {
            return u;
          })
      );
    },
    Ur = Symbol("firstRenderPending"),
    _r = function() {},
    Br = function(e) {
      var t,
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = r.videoAdContainer,
        i = r.onIconView,
        o = void 0 === i ? _r : i,
        a = r.onIconClick,
        u = void 0 === a ? _r : a,
        c = (function(e, t) {
          var r = {};
          for (var n in e)
            t.indexOf(n) >= 0 ||
              (Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]));
          return r;
        })(r, ["videoAdContainer", "onIconView", "onIconClick"]),
        s = n.videoElement,
        d = n.element,
        l =
          ((t = V(
            f.mark(function t() {
              var r;
              return f.wrap(
                function(t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (t.next = 2),
                          Fr(e, z({ onIconClick: u, videoAdContainer: n }, c))
                        );
                      case 2:
                        (r = t.sent),
                          d.dispatchEvent(new CustomEvent("iconsDrawn")),
                          r.forEach(function(e) {
                            e[Ur] && (o(e), (e[Ur] = !1));
                          });
                      case 5:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                void 0
              );
            })
          )),
          function() {
            return t.apply(this, arguments);
          });
      return (
        e.forEach(function(e) {
          e[Ur] = !0;
        }),
        {
          drawIcons: l,
          hasPendingIconRedraws: function() {
            return (function(e, t) {
              var r = 1e3 * t.currentTime,
                n = 1e3 * t.duration,
                i = e.filter(function(e) {
                  return !e.offset || e.offset < r;
                }),
                o = e.filter(function(e) {
                  return e.duration && e.duration < n;
                });
              return i.length > 0 || o.length > 0;
            })(e, s);
          },
          removeIcons: function() {
            return (function(e) {
              return e
                .filter(function(e) {
                  var t = e.element;
                  return Boolean(t) && Boolean(t.parentNode);
                })
                .forEach(function(e) {
                  var t = e.element;
                  return t.parentNode.removeChild(t);
                });
            })(e);
          }
        }
      );
    },
    Rr = function(e, t) {
      return e + 100 > innerWidth && t + 100 > innerHeight
        ? "fullscreen"
        : e < 400
        ? "thumbnail"
        : "normal";
    },
    Nr = h.start,
    jr = h.iconClick,
    Vr = h.iconView,
    Mr = Symbol("_protected"),
    Dr = (function(e) {
      function t(e, r) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = n.viewability,
          o = void 0 !== i && i,
          a = n.responsive,
          u = void 0 !== a && a,
          c = n.logger,
          s = void 0 === c ? console : c;
        M(this, t);
        var d = X(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, s)
        );
        (d[Mr] = {
          finish: function() {
            (d[Mr].finished = !0),
              d[Mr].onFinishCallbacks.forEach(function(e) {
                return e();
              }),
              d.emit(nt, { adUnit: d, type: nt });
          },
          finished: !1,
          onErrorCallbacks: [],
          onFinishCallbacks: [],
          started: !1,
          throwIfCalled: function() {
            throw new Error(
              "VideoAdUnit method must be implemented on child class"
            );
          },
          throwIfFinished: function() {
            if (d.isFinished()) throw new Error("VideoAdUnit is finished");
          }
        }),
          (d.type = null),
          (d.error = null),
          (d.errorCode = null);
        var l = d[Mr].onFinishCallbacks;
        if (
          ((d.vastChain = e),
          (d.videoAdContainer = r),
          (d.icons = ur(e)),
          l.push(nr(d.videoAdContainer.videoElement)),
          d.icons)
        ) {
          var f = Br(d.icons, {
              logger: s,
              onIconClick: function(e) {
                return d.emit(jr, { adUnit: d, data: e, type: jr });
              },
              onIconView: function(e) {
                return d.emit(Vr, { adUnit: d, data: e, type: Vr });
              },
              videoAdContainer: r
            }),
            h = f.drawIcons,
            p = f.hasPendingIconRedraws,
            v = f.removeIcons;
          (d[Mr].drawIcons = h),
            (d[Mr].removeIcons = v),
            (d[Mr].hasPendingIconRedraws = p),
            l.push(v);
        }
        return (
          o &&
            d.once(Nr, function() {
              var e = rr(d.videoAdContainer.element, function(e) {
                d.isFinished() || (e ? d.resume() : d.pause());
              });
              l.push(e);
            }),
          u &&
            d.once(Nr, function() {
              var e = d.videoAdContainer.element;
              d[Mr].size = {
                height: e.clientHeight,
                viewmode: Rr(e.clientWidth, e.clientHeight),
                width: e.clientWidth
              };
              var t = Jt(e, function() {
                if (!d.isFinished()) {
                  var t = d[Mr].size,
                    r = e.clientHeight,
                    n = e.clientWidth;
                  (r === t.height && n === t.width) || d.resize(n, r, Rr(n, r));
                }
              });
              l.push(t);
            }),
          d
        );
      }
      return (
        q(t, ir),
        D(t, [
          {
            key: "start",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "resume",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "pause",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "setVolume",
            value: function(e) {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "getVolume",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "cancel",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "duration",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "paused",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "currentTime",
            value: function() {
              this[Mr].throwIfCalled();
            }
          },
          {
            key: "onFinish",
            value: function(e) {
              if ("function" != typeof e)
                throw new TypeError("Expected a callback function");
              this[Mr].onFinishCallbacks.push(qe(e, this.logger));
            }
          },
          {
            key: "onError",
            value: function(e) {
              if ("function" != typeof e)
                throw new TypeError("Expected a callback function");
              this[Mr].onErrorCallbacks.push(qe(e, this.logger));
            }
          },
          {
            key: "isFinished",
            value: function() {
              return this[Mr].finished;
            }
          },
          {
            key: "isStarted",
            value: function() {
              return this[Mr].started;
            }
          },
          {
            key: "resize",
            value: (function() {
              var e = V(
                f.mark(function e(t, r, n) {
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              ((this[Mr].size = {
                                height: r,
                                viewmode: n,
                                width: t
                              }),
                              !this.isStarted() ||
                                this.isFinished() ||
                                !this.icons)
                            ) {
                              e.next = 6;
                              break;
                            }
                            return (e.next = 4), this[Mr].removeIcons();
                          case 4:
                            return (e.next = 6), this[Mr].drawIcons();
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function(t, r, n) {
                return e.apply(this, arguments);
              };
            })()
          }
        ]),
        t
      );
    })(),
    Wr = h.complete,
    zr = h.error,
    Hr = h.skip,
    qr = Symbol("_private"),
    Xr = (function(e) {
      function t(e, r) {
        var n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        M(this, t);
        var i = X(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, n)
        );
        (i[qr] = {
          handleMetric: function(e, t) {
            switch (e) {
              case Wr:
                i[Mr].finish();
                break;
              case zr:
                (i.error = t),
                  (i.errorCode = i.error && i.error.code ? i.error.code : 405),
                  i[Mr].onErrorCallbacks.forEach(function(e) {
                    return e(i.error, { adUnit: i, vastChain: i.vastChain });
                  }),
                  i[Mr].finish();
                break;
              case Hr:
                i.cancel();
            }
            i.emit(e, { adUnit: i, type: e });
          }
        }),
          (i.assetUri = null),
          (i.type = "VAST");
        var o = i[Mr].onFinishCallbacks,
          a = i[qr].handleMetric;
        i.hooks = n.hooks || {};
        var u = kt(
          {
            hooks: i.hooks,
            vastChain: i.vastChain,
            videoAdContainer: i.videoAdContainer
          },
          a
        );
        return o.push(u), i;
      }
      return (
        q(t, Dr),
        D(t, [
          {
            key: "start",
            value: (function() {
              var e = V(
                f.mark(function e() {
                  var t,
                    r,
                    n,
                    i,
                    o,
                    a,
                    u,
                    c = this;
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (this[Mr].throwIfFinished(), !this.isStarted())
                            ) {
                              e.next = 3;
                              break;
                            }
                            throw new Error("VastAdUnit already started");
                          case 3:
                            if (
                              ((t = this.vastChain[0].ad),
                              (r = this.videoAdContainer),
                              (n = r.videoElement),
                              (i = r.element),
                              (o = We(t, n, i)),
                              !Boolean(o))
                            ) {
                              e.next = 16;
                              break;
                            }
                            if (!this.icons) {
                              e.next = 11;
                              break;
                            }
                            return (
                              (a = (function() {
                                var e = V(
                                  f.mark(function e() {
                                    return f.wrap(
                                      function(e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (!c.isFinished()) {
                                                e.next = 2;
                                                break;
                                              }
                                              return e.abrupt("return");
                                            case 2:
                                              return (
                                                (e.next = 4), c[Mr].drawIcons()
                                              );
                                            case 4:
                                              c[Mr].hasPendingIconRedraws() &&
                                                !c.isFinished() &&
                                                ze(n, "timeupdate", a);
                                            case 5:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      c
                                    );
                                  })
                                );
                                return function() {
                                  return e.apply(this, arguments);
                                };
                              })()),
                              (e.next = 11),
                              a()
                            );
                          case 11:
                            (n.src = o.src),
                              (this.assetUri = o.src),
                              n.play(),
                              (e.next = 19);
                            break;
                          case 16:
                            ((u = new Error(
                              "Can't find a suitable media to play"
                            )).code = 403),
                              this[qr].handleMetric(zr, u);
                          case 19:
                            this[Mr].started = !0;
                          case 20:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function() {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: "resume",
            value: function() {
              this.videoAdContainer.videoElement.play();
            }
          },
          {
            key: "pause",
            value: function() {
              this.videoAdContainer.videoElement.pause();
            }
          },
          {
            key: "paused",
            value: function() {
              return this.videoAdContainer.videoElement.paused;
            }
          },
          {
            key: "setVolume",
            value: function(e) {
              this.videoAdContainer.videoElement.volume = e;
            }
          },
          {
            key: "getVolume",
            value: function() {
              return this.videoAdContainer.videoElement.volume;
            }
          },
          {
            key: "cancel",
            value: function() {
              this[Mr].throwIfFinished(),
                this.videoAdContainer.videoElement.pause(),
                this[Mr].finish();
            }
          },
          {
            key: "duration",
            value: function() {
              return this.isStarted()
                ? this.videoAdContainer.videoElement.duration
                : 0;
            }
          },
          {
            key: "currentTime",
            value: function() {
              return this.isStarted()
                ? this.videoAdContainer.videoElement.currentTime
                : 0;
            }
          },
          {
            key: "resize",
            value: (function() {
              var e = V(
                f.mark(function e(r, n, i) {
                  var o, a, u, c, s;
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              H(
                                t.prototype.__proto__ ||
                                  Object.getPrototypeOf(t.prototype),
                                "resize",
                                this
                              ).call(this, r, n, i)
                            );
                          case 2:
                            this.isStarted() &&
                              !this.isFinished() &&
                              ((o = this.vastChain[0].ad),
                              (a = this.videoAdContainer),
                              (u = a.videoElement),
                              (c = a.element),
                              (s = We(o, u, c)),
                              Boolean(s) && u.src !== s.src && xt(u, s));
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function(t, r, n) {
                return e.apply(this, arguments);
              };
            })()
          }
        ]),
        t
      );
    })(),
    Gr = [
      "text/javascript",
      "text/javascript1.0",
      "text/javascript1.2",
      "text/javascript1.4",
      "text/jscript",
      "application/javascript",
      "application/x-javascript",
      "text/ecmascript",
      "text/ecmascript1.0",
      "text/ecmascript1.2",
      "text/ecmascript1.4",
      "text/livescript",
      "application/ecmascript",
      "application/x-ecmascript"
    ],
    Qr = function(e) {
      var t = e.type;
      return Gr.some(function(e) {
        return e === t;
      });
    },
    $r = (function() {
      var e = V(
        f.mark(function e(t, r) {
          var n, i, o, a;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if ((n = (pe(t[0].ad) || []).filter(Qr)[0])) {
                      e.next = 3;
                      break;
                    }
                    throw new TypeError(
                      "VastChain does not contain a supported vpaid creative"
                    );
                  case 3:
                    return (
                      (i = n.src),
                      (o = n.type),
                      (e.next = 6),
                      r.addScript(i, { type: o })
                    );
                  case 6:
                    return (
                      (a = r.executionContext),
                      e.abrupt("return", a.getVPAIDAd())
                    );
                  case 8:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0
          );
        })
      );
      return function(t, r) {
        return e.apply(this, arguments);
      };
    })(),
    Kr = "AdStarted",
    Yr = "AdStopped",
    Jr = "AdSkipped",
    Zr = "AdDurationChange",
    en = "AdRemainingTimeChange",
    tn = "AdVolumeChange",
    rn = "AdImpression",
    nn = "AdVideoStart",
    on = "AdVideoFirstQuartile",
    an = "AdVideoMidpoint",
    un = "AdVideoThirdQuartile",
    cn = "AdVideoComplete",
    sn = "AdClickThru",
    dn = "AdUserAcceptInvitation",
    ln = "AdUserMinimize",
    fn = "AdUserClose",
    hn = "AdPaused",
    pn = "AdPlaying",
    vn = "AdError",
    mn = function(e, t, r) {
      return new Promise(function(n, i) {
        var o = void 0,
          a = function i() {
            "number" == typeof r && clearTimeout(o), e.unsubscribe(i, t), n();
          };
        "number" == typeof r &&
          (o = setTimeout(function() {
            e.unsubscribe(a, t),
              i(new Error("Timeout waiting for event '" + t + "'"));
          }, r)),
          e.subscribe(a, t);
      });
    },
    yn = function(e, t, r) {
      for (
        var n = arguments.length, i = Array(n > 3 ? n - 3 : 0), o = 3;
        o < n;
        o++
      )
        i[o - 3] = arguments[o];
      var a = mn(e, r, 5e3);
      return e[t].apply(e, i), a;
    },
    gn = function(e) {
      var t = e.split(".");
      return parseInt(t[0], 10);
    },
    wn = function(e, t) {
      var r = e.handshakeVersion(t);
      if (
        !(function(e, t) {
          var r = gn(t);
          return !(r < 1) && r <= gn(e);
        })(t, r)
      )
        throw new Error("Creative Version '" + r + "' not supported");
      return r;
    },
    bn = function(e, t, r) {
      var n = document.createElement("DIV");
      return (
        Object.assign(n.style, {
          border: "0px",
          cursor: "pointer",
          height: r + "px",
          left: "0px",
          margin: "0px",
          padding: "0px",
          position: "absolute",
          top: "0px",
          width: t + "px"
        }),
        e.appendChild(n),
        n
      );
    },
    En = h.complete,
    An = h.mute,
    kn = h.unmute,
    xn = h.skip,
    Cn = h.start,
    Tn = h.firstQuartile,
    In = h.pause,
    Ln = h.resume,
    Pn = h.impression,
    Sn = h.midpoint,
    On = h.thirdQuartile,
    Fn = h.clickThrough,
    Un = h.error,
    _n = h.closeLinear,
    Bn = [
      "AdLoaded",
      Kr,
      Yr,
      Jr,
      "AdSkippableStateChange",
      "AdSizeChange",
      "AdLinearChange",
      Zr,
      "AdExpandedChange",
      en,
      tn,
      rn,
      nn,
      on,
      an,
      un,
      cn,
      sn,
      "AdInteraction",
      dn,
      ln,
      fn,
      hn,
      pn,
      "AdLog",
      vn
    ].filter(function(e) {
      return "AdLoaded" !== e;
    }),
    Rn = Symbol("_private"),
    Nn = function(e) {
      var t = e instanceof Error ? e : new Error("VPAID general error");
      return t.code || (t.code = 901), t;
    },
    jn = (function(e) {
      function t(e, r) {
        var n,
          i =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        M(this, t);
        var o = X(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r, i)
        );
        return (
          (o[Rn] = {
            evtHandler:
              ((n = {}),
              W(n, sn, function(e, t, r) {
                if (r)
                  if (o.paused()) o.resume();
                  else {
                    var n =
                      "string" == typeof e && e.length > 0
                        ? e
                        : me(o.vastChain[0].ad);
                    o.pause(), window.open(n, "_blank");
                  }
                o.emit(Fn, { adUnit: o, type: Fn });
              }),
              W(n, Zr, function() {
                o.emit(it, { adUnit: o, type: it });
              }),
              W(n, vn, function(e) {
                (o.error = Nn(e)),
                  (o.errorCode = o.error.code),
                  o[Mr].onErrorCallbacks.forEach(function(e) {
                    return e(o.error, { adUnit: o, vastChain: o.vastChain });
                  }),
                  o[Mr].finish(),
                  o.emit(Un, { adUnit: o, type: Un });
              }),
              W(n, rn, function() {
                o[Rn].videoStart || o[Rn].handleVpaidEvt(nn),
                  o.emit(Pn, { adUnit: o, type: Pn });
              }),
              W(n, hn, function() {
                (o[Rn].paused = !0), o.emit(In, { adUnit: o, type: In });
              }),
              W(n, pn, function() {
                (o[Rn].paused = !1), o.emit(Ln, { adUnit: o, type: Ln });
              }),
              W(n, en, function() {
                o.emit(it, { adUnit: o, type: it });
              }),
              W(n, Jr, function() {
                o.cancel(), o.emit(xn, { adUnit: o, type: xn });
              }),
              W(n, Kr, function() {
                o.emit(m, { adUnit: o, type: m });
              }),
              W(n, Yr, function() {
                o.emit(Yr, { adUnit: o, type: Yr }), o[Mr].finish();
              }),
              W(n, dn, function() {
                o.emit(p, { adUnit: o, type: p });
              }),
              W(n, fn, function() {
                o.emit(_n, { adUnit: o, type: _n }), o[Mr].finish();
              }),
              W(n, ln, function() {
                o.emit(v, { adUnit: o, type: v });
              }),
              W(n, cn, function() {
                o.emit(En, { adUnit: o, type: En }), o[Mr].finish();
              }),
              W(n, on, function() {
                o.emit(Tn, { adUnit: o, type: Tn });
              }),
              W(n, an, function() {
                o.emit(Sn, { adUnit: o, type: Sn });
              }),
              W(n, nn, function() {
                o[Rn].videoStart ||
                  ((o[Rn].videoStart = !0),
                  (o[Rn].paused = !1),
                  o.emit(Cn, { adUnit: o, type: Cn }));
              }),
              W(n, un, function() {
                o.emit(On, { adUnit: o, type: On });
              }),
              W(n, tn, function() {
                var e = o.getVolume();
                o.emit(rt, { adUnit: o, type: rt }),
                  0 !== e ||
                    o[Rn].muted ||
                    ((o[Rn].muted = !0), o.emit(An, { adUnit: o, type: An })),
                  e > 0 &&
                    o[Rn].muted &&
                    ((o[Rn].muted = !1), o.emit(kn, { adUnit: o, type: kn }));
              }),
              n),
            handleVpaidEvt: function(e) {
              for (
                var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1;
                n < t;
                n++
              )
                r[n - 1] = arguments[n];
              var i = o[Rn].evtHandler[e];
              i && i.apply(void 0, r), o.emit(e, { adUnit: o, type: e });
            },
            muted: !1,
            paused: !0
          }),
          (o.type = "VPAID"),
          (o.creativeAd = null),
          (o[Rn].loadCreativePromise = $r(e, r)),
          o
        );
      }
      return (
        q(t, Dr),
        D(t, [
          {
            key: "start",
            value: (function() {
              var e = V(
                f.mark(function e() {
                  var t,
                    r,
                    n,
                    i,
                    o,
                    a,
                    u,
                    c,
                    s,
                    d = this;
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (this[Mr].throwIfFinished(), !this.isStarted())
                            ) {
                              e.next = 3;
                              break;
                            }
                            throw new Error("VpaidAdUnit already started");
                          case 3:
                            return (
                              (e.prev = 3),
                              (e.next = 6),
                              this[Rn].loadCreativePromise
                            );
                          case 6:
                            for (
                              this.creativeAd = e.sent,
                                t = mn(this.creativeAd, "AdLoaded"),
                                r = !0,
                                n = !1,
                                i = void 0,
                                e.prev = 11,
                                o = Bn[Symbol.iterator]();
                              !(r = (a = o.next()).done);
                              r = !0
                            )
                              (u = a.value),
                                this.creativeAd.subscribe(
                                  this[Rn].handleVpaidEvt.bind(this, u),
                                  u
                                );
                            e.next = 19;
                            break;
                          case 15:
                            (e.prev = 15),
                              (e.t0 = e.catch(11)),
                              (n = !0),
                              (i = e.t0);
                          case 19:
                            (e.prev = 19),
                              (e.prev = 20),
                              !r && o.return && o.return();
                          case 22:
                            if (((e.prev = 22), !n)) {
                              e.next = 25;
                              break;
                            }
                            throw i;
                          case 25:
                            return e.finish(22);
                          case 26:
                            return e.finish(19);
                          case 27:
                            return (
                              this.creativeAd.getAdIcons &&
                                !this.creativeAd.getAdIcons() &&
                                (this.icons = null),
                              wn(this.creativeAd, "2.0"),
                              (l = this.creativeAd),
                              (h = this.videoAdContainer),
                              (p = this.vastChain),
                              (v = void 0),
                              (m = void 0),
                              (y = void 0),
                              (g = void 0),
                              (w = void 0),
                              (b = void 0),
                              (E = void 0),
                              (v = h.element),
                              (m = v.getBoundingClientRect()),
                              (y = m.width),
                              (g = m.height),
                              (w = Rr(y, g)),
                              (b = {
                                slot: bn(v, y, g),
                                videoSlot: h.videoElement,
                                videoSlotCanAutoPlay: h.isOriginalVideoElement
                              }),
                              (E = be(p[0].XML)),
                              l.initAd(y, g, w, -1, E, b),
                              (e.next = 32),
                              t
                            );
                          case 32:
                            if (this.videoAdContainer.isDestroyed()) {
                              e.next = 48;
                              break;
                            }
                            return (
                              (e.prev = 33),
                              (c = this.videoAdContainer.videoElement).muted
                                ? ((this[Rn].muted = !0), this.setVolume(0))
                                : this.setVolume(c.volume),
                              (e.next = 38),
                              yn(this.creativeAd, "startAd", Kr)
                            );
                          case 38:
                            if (!this.icons) {
                              e.next = 42;
                              break;
                            }
                            return (
                              (s = (function() {
                                var e = V(
                                  f.mark(function e() {
                                    return f.wrap(
                                      function(e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (!d.isFinished()) {
                                                e.next = 2;
                                                break;
                                              }
                                              return e.abrupt("return");
                                            case 2:
                                              return (
                                                (e.next = 4), d[Mr].drawIcons()
                                              );
                                            case 4:
                                              d[Mr].hasPendingIconRedraws() &&
                                                !d.isFinished() &&
                                                setTimeout(s, 500);
                                            case 5:
                                            case "end":
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      d
                                    );
                                  })
                                );
                                return function() {
                                  return e.apply(this, arguments);
                                };
                              })()),
                              (e.next = 42),
                              s()
                            );
                          case 42:
                            (this[Mr].started = !0), (e.next = 48);
                            break;
                          case 45:
                            (e.prev = 45), (e.t1 = e.catch(33)), this.cancel();
                          case 48:
                            return e.abrupt("return", this);
                          case 51:
                            throw ((e.prev = 51),
                            (e.t2 = e.catch(3)),
                            this[Rn].handleVpaidEvt(vn, e.t2),
                            e.t2);
                          case 55:
                          case "end":
                            return e.stop();
                        }
                      var l, h, p, v, m, y, g, w, b, E;
                    },
                    e,
                    this,
                    [[3, 51], [11, 15, 19, 27], [20, , 22, 26], [33, 45]]
                  );
                })
              );
              return function() {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: "resume",
            value: function() {
              this.creativeAd.resumeAd();
            }
          },
          {
            key: "pause",
            value: function() {
              this.creativeAd.pauseAd();
            }
          },
          {
            key: "paused",
            value: function() {
              return this.isFinished() || this[Rn].paused;
            }
          },
          {
            key: "setVolume",
            value: function(e) {
              this.creativeAd.setAdVolume(e);
            }
          },
          {
            key: "getVolume",
            value: function() {
              return this.creativeAd.getAdVolume();
            }
          },
          {
            key: "cancel",
            value: (function() {
              var e = V(
                f.mark(function e() {
                  var t;
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              this[Mr].throwIfFinished(),
                              (e.prev = 1),
                              (t = mn(this.creativeAd, Yr, 3e3)),
                              this.creativeAd.stopAd(),
                              (e.next = 6),
                              t
                            );
                          case 6:
                            e.next = 11;
                            break;
                          case 8:
                            (e.prev = 8),
                              (e.t0 = e.catch(1)),
                              this[Mr].finish();
                          case 11:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[1, 8]]
                  );
                })
              );
              return function() {
                return e.apply(this, arguments);
              };
            })()
          },
          {
            key: "duration",
            value: function() {
              if (!this.creativeAd) return 0;
              var e = this.creativeAd.getAdDuration();
              return e < 0 ? 0 : e;
            }
          },
          {
            key: "currentTime",
            value: function() {
              if (!this.creativeAd) return 0;
              var e = this.creativeAd.getAdRemainingTime();
              return e < 0 ? 0 : this.duration() - e;
            }
          },
          {
            key: "resize",
            value: (function() {
              var e = V(
                f.mark(function e(r, n, i) {
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              H(
                                t.prototype.__proto__ ||
                                  Object.getPrototypeOf(t.prototype),
                                "resize",
                                this
                              ).call(this, r, n, i)
                            );
                          case 2:
                            return e.abrupt(
                              "return",
                              yn(
                                this.creativeAd,
                                "resizeAd",
                                "AdSizeChange",
                                r,
                                n,
                                i
                              )
                            );
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function(t, r, n) {
                return e.apply(this, arguments);
              };
            })()
          }
        ]),
        t
      );
    })(),
    Vn = function(e, t, r) {
      var n = r.tracker,
        i = "VPAID" === r.type ? new jn(e, t, r) : new Xr(e, t, r);
      return (
        Object.values(h).forEach(function(t) {
          return i.on(t, function(t) {
            var r = t.type,
              o = { data: t.data, errorCode: i.errorCode, tracker: n };
            !(function(e, t, r) {
              var n = r.data,
                i = r.errorCode,
                o = r.tracker,
                a = void 0 === o ? ke : o,
                u = r.logger,
                c = void 0 === u ? console : u,
                s = Ie[e];
              s
                ? s(t, {
                    data: z({}, n, { errorCode: i }),
                    errorCode: i,
                    tracker: a
                  })
                : c.error("Event '" + e + "' cannot be tracked");
            })(r, e, o);
          });
        }),
        Object.values(y).forEach(function(t) {
          return i.on(t, function(t) {
            var r = { data: t.data, tracker: n };
            !(function(e, t, r) {
              var n = r.data,
                i = r.tracker,
                o = void 0 === i ? ke : i,
                a = r.logger,
                u = void 0 === a ? console : a,
                c = Pe[e];
              c
                ? c(t, { data: z({}, n), tracker: o })
                : u.error("Event '" + e + "' cannot be tracked");
            })(t.type, e, r);
          });
        }),
        i
      );
    },
    Mn = function(e, t) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new TypeError("Invalid vastChain");
      if (!(t instanceof Ve)) throw new TypeError("Invalid VideoAdContainer");
    },
    Dn = function(e, t) {
      var r = fe(e);
      return (
        !!r &&
        r.some(function(e) {
          return De(t, e);
        })
      );
    },
    Wn = function(e, t) {
      var r = t.onAdReady;
      return new Promise(function(t, n) {
        var i = function(e) {
          return function() {
            return n(
              new Error("Ad unit start rejected due to event '" + e + "'")
            );
          };
        };
        e.onError(n),
          e.on("start", function() {
            return t(e);
          }),
          e.on(fn, i(fn)),
          e.on("closeLinear", i("closeLinear")),
          e.on(Yr, i(Yr)),
          r(e),
          e.start();
      });
    },
    zn = function(e, t, r) {
      if (((n = e[0].ad), !Boolean(pe(n))))
        throw new Error("No valid creative found in the passed VAST chain");
      var n,
        i = Vn(e, t, z({}, r, { type: "VPAID" }));
      return Wn(i, r);
    },
    Hn = function(e, t, r) {
      var n = Vn(e, t, z({}, r, { type: "VAST" }));
      return Wn(n, r);
    },
    qn = (function() {
      var e = V(
        f.mark(function e(t, r, n) {
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return Mn(t, r), (e.prev = 1), (e.next = 4), zn(t, r, n);
                  case 4:
                    return e.abrupt("return", e.sent);
                  case 7:
                    if (
                      ((e.prev = 7),
                      (e.t0 = e.catch(1)),
                      !Dn(t[0].ad, r.videoElement))
                    ) {
                      e.next = 11;
                      break;
                    }
                    return e.abrupt("return", Hn(t, r, n));
                  case 11:
                    throw e.t0;
                  case 12:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0,
            [[1, 7]]
          );
        })
      );
      return function(t, r, n) {
        return e.apply(this, arguments);
      };
    })(),
    Xn = (function() {
      var e = V(
        f.mark(function e(t, r, n) {
          var i, o, a, u, c, s, d;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (i = void 0),
                      (e.prev = 1),
                      (o = n.timeout),
                      (i = Me(r, n.videoElement)),
                      (a = qn(t, i, n)),
                      "number" == typeof o &&
                        ((u = !1),
                        (c = void 0),
                        (s = new Promise(function(e, r) {
                          c = setTimeout(function() {
                            var e = n.tracker;
                            xe(t, { errorCode: 402, tracker: e }),
                              (u = !0),
                              r(new Error("Timeout while starting the ad"));
                          }, n.timeout);
                        })),
                        (a = Promise.race([
                          a.then(function(e) {
                            return (
                              u ? e.isStarted() && e.cancel() : clearTimeout(c),
                              e
                            );
                          }),
                          s
                        ]))),
                      (e.next = 8),
                      a
                    );
                  case 8:
                    return (
                      (d = e.sent).onFinish(function() {
                        i.destroy();
                      }),
                      e.abrupt("return", d)
                    );
                  case 13:
                    throw ((e.prev = 13),
                    (e.t0 = e.catch(1)),
                    i && i.destroy(),
                    e.t0);
                  case 17:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0,
            [[1, 13]]
          );
        })
      );
      return function(t, r, n) {
        return e.apply(this, arguments);
      };
    })(),
    Gn = (function() {
      var e = V(
        f.mark(function e(t) {
          var r,
            n,
            i,
            o,
            a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (r = { credentials: "include" }),
                      (n = Object.assign({}, r, a)),
                      (e.next = 4),
                      window.fetch(t, n)
                    );
                  case 4:
                    if (!((i = e.sent).status >= 400)) {
                      e.next = 9;
                      break;
                    }
                    throw (((o = new Error(i.statusText)).response = i), o);
                  case 9:
                    return e.abrupt("return", i);
                  case 10:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0
          );
        })
      );
      return function(t) {
        return e.apply(this, arguments);
      };
    })(),
    Qn = Symbol("requested"),
    $n = function(e) {
      e[Qn] = !0;
    },
    Kn = function(e, t) {
      var r = t.wrapperLimit,
        n = void 0 === r ? 5 : r;
      if (e.length > n) {
        var i = new Error("Wrapper Limit reached");
        throw ((i.code = 304), i);
      }
    },
    Yn = (function() {
      var e = V(
        f.mark(function e(t, r) {
          var n, i;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.prev = 0), (e.next = 3), Gn(t, r);
                  case 3:
                    return (n = e.sent), (e.next = 6), n.text();
                  case 6:
                    return (i = e.sent), e.abrupt("return", i);
                  case 10:
                    throw ((e.prev = 10),
                    (e.t0 = e.catch(0)),
                    (e.t0.code = 502),
                    e.t0);
                  case 14:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0,
            [[0, 10]]
          );
        })
      );
      return function(t, r) {
        return e.apply(this, arguments);
      };
    })(),
    Jn = function(e) {
      try {
        return U(e);
      } catch (e) {
        throw ((e.code = 100), e);
      }
    },
    Zn = function(e) {
      try {
        var t = oe(e);
        if (Boolean(t)) return $n(t), t;
        throw new Error("No Ad");
      } catch (e) {
        throw ((e.code = 303), e);
      }
    },
    ei = function(e, t) {
      var r = e.ad,
        n = e.parsedXML,
        i = t.allowMultipleAds,
        o = void 0 === i || i,
        a = t.followAdditionalWrappers,
        u = void 0 === a || a;
      if (!ae(r) && !ue(r)) {
        var c = new Error(
          "Invalid VAST, ad contains neither Wrapper nor Inline"
        );
        throw ((c.code = 101), c);
      }
      if (ie(n) && !o) {
        var s = new Error("Multiple ads are not allowed");
        throw ((s.code = 203), s);
      }
      if (ae(r) && !u) {
        var d = new Error("To follow additional wrappers is not allowed");
        throw ((d.code = 200), d);
      }
    },
    ti = function(e, t) {
      var r = e[0],
        n = Boolean(r) && ae(r.ad) ? se(r.ad) : {};
      return z({}, n, t);
    },
    ri =
      ((hr = V(
        f.mark(function e(t, r) {
          var n,
            i,
            o,
            a,
            u,
            c =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : [];
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n = {
                        ad: null,
                        errorCode: null,
                        parsedXML: null,
                        requestTag: t,
                        XML: null
                      }),
                      (i = void 0),
                      (o = void 0),
                      (a = void 0),
                      (e.prev = 4),
                      (i = ti(c, r)),
                      Kn(c, i),
                      (u = Yn(t, i)),
                      "number" == typeof i.timeout &&
                        ((a = i.timeout),
                        (o = Date.now()),
                        (u = Promise.race([
                          u,
                          new Promise(function(e, t) {
                            setTimeout(function() {
                              var e = new Error("RequestAd timeout");
                              (e.code = 301), t(e);
                            }, a);
                          })
                        ]))),
                      (e.next = 11),
                      u
                    );
                  case 11:
                    if (
                      ((n.XML = e.sent),
                      (n.parsedXML = Jn(n.XML)),
                      (n.ad = Zn(n.parsedXML)),
                      ei(n, i),
                      !ae(n.ad))
                    ) {
                      e.next = 18;
                      break;
                    }
                    return (
                      o && (a -= Date.now() - o),
                      e.abrupt(
                        "return",
                        ri(ce(n.ad), z({}, i, { timeout: a }), [n].concat(Q(c)))
                      )
                    );
                  case 18:
                    return e.abrupt("return", [n].concat(Q(c)));
                  case 21:
                    return (
                      (e.prev = 21),
                      (e.t0 = e.catch(4)),
                      Number.isInteger(e.t0.code) || (e.t0.code = 900),
                      (n.errorCode = e.t0.code),
                      (n.error = e.t0),
                      e.abrupt("return", [n].concat(Q(c)))
                    );
                  case 27:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0,
            [[4, 21]]
          );
        })
      )),
      function(e, t) {
        return hr.apply(this, arguments);
      }),
    ni = function(e, t) {
      var r = e.ad,
        n = e.parsedXML,
        i = t.fallbackOnNoAd,
        o = void 0 === i || i,
        a = t.useAdBuffet,
        u = void 0 !== a && a,
        c = ee(n).filter(function(e) {
          return !Boolean(e[Qn]);
        }),
        s = null;
      return (
        ie(n)
          ? (u &&
              (s = c.filter(function(e) {
                return !ne(e);
              })[0]),
            s ||
              (s = (function(e, t) {
                var r = re(e) + 1;
                return (
                  t.find(function(e) {
                    return re(e) === r;
                  }) || null
                );
              })(r, c)))
          : c.length > 0 && o && (s = c[0]),
        s
      );
    },
    ii = function e(t, r) {
      !(function(e) {
        if (!Array.isArray(e)) throw new TypeError("Invalid VAST chain");
        if (0 === e.length) throw new Error("No next ad to request");
      })(t);
      var n = t[0],
        i = ni(n, r);
      if (Boolean(i)) {
        var o = [Object.assign({}, n, { ad: i })].concat(Q(t.slice(1)));
        return $n(i), ae(i) ? ri(ce(i), r, o) : Promise.resolve(o);
      }
      return e(t.slice(1), r);
    },
    oi = function(e, t) {
      if (!e || 0 === e.length) throw new Error("Invalid VastChain");
      var r = e[0];
      if (
        !t.vpaidEnabled &&
        (function(e) {
          return Boolean(pe(e[0].ad));
        })(e)
      ) {
        var n = new Error("VPAID ads are not supported by the current player");
        (n.code = 200), (r.errorCode = 200), (r.error = n);
      }
      if (Boolean(r.error)) throw r.error;
      t.hooks &&
        "function" == typeof t.hooks.validateVastResponse &&
        t.hooks.validateVastResponse(e);
    },
    ai = function(e) {
      return function() {
        "function" == typeof e && e.apply(void 0, arguments);
      };
    },
    ui = function(e, t) {
      return (e && e[0] && e[0].errorCode) || t.code;
    },
    ci = function(e, t) {
      var r = t.hooks;
      return r && "function" == typeof r.transformVastResponse
        ? r.transformVastResponse(e)
        : e;
    },
    si = (function() {
      var e = V(
        f.mark(function e(t, r, n, i) {
          var o, a, u, c, s, d, l, h, p, v;
          return f.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (o = void 0),
                      (a = void 0),
                      (u = void 0),
                      (c = z({}, n)),
                      (s = c.onAdStart),
                      (d = c.onError),
                      (l = c.onRunFinish),
                      (e.prev = 5),
                      "number" == typeof c.timeout && (a = Date.now()),
                      (e.next = 9),
                      t()
                    );
                  case 9:
                    if (((o = e.sent), !i())) {
                      e.next = 13;
                      break;
                    }
                    return l(), e.abrupt("return");
                  case 13:
                    return (
                      a && ((h = Date.now()), (c.timeout -= h - a), (a = h)),
                      oi(o, c),
                      (e.next = 17),
                      Xn(ci(o, c), r, z({}, c))
                    );
                  case 17:
                    if (((u = e.sent), !i())) {
                      e.next = 22;
                      break;
                    }
                    return u.cancel(), l(), e.abrupt("return");
                  case 22:
                    u.onError(d), u.onFinish(l), s(u), (e.next = 38);
                    break;
                  case 27:
                    if (
                      ((e.prev = 27),
                      (e.t0 = e.catch(5)),
                      (p = ui(o, e.t0)),
                      Boolean(p) &&
                        ((v = n.tracker), xe(o, { errorCode: p, tracker: v })),
                      d(e.t0, { adUnit: u, vastChain: o }),
                      !o || i())
                    ) {
                      e.next = 37;
                      break;
                    }
                    if (
                      (a && (c.timeout -= Date.now() - a),
                      a && !(c.timeout > 0))
                    ) {
                      e.next = 37;
                      break;
                    }
                    return (
                      si(
                        function() {
                          return ii(o, c);
                        },
                        r,
                        z({}, c),
                        i
                      ),
                      e.abrupt("return")
                    );
                  case 37:
                    l();
                  case 38:
                  case "end":
                    return e.stop();
                }
            },
            e,
            void 0,
            [[5, 27]]
          );
        })
      );
      return function(t, r, n, i) {
        return e.apply(this, arguments);
      };
    })(),
    di = function(e, t) {
      var r = e && T(e, t);
      if (r) return P(r);
    },
    li = function e(t) {
      var r = (function(e) {
        var t = L(e);
        return t && T(t, "Pricing");
      })(t[0].ad);
      return r
        ? {
            pricing: P(r),
            pricingCurrency: O(r, "currency"),
            pricingModel: O(r, "model")
          }
        : t.length > 1
        ? e(t.slice(1))
        : {};
    };
  (e.getDetails = function(e) {
    var t,
      r,
      n,
      i,
      o,
      a = e.map(function(e) {
        var t = e.ad;
        return O(t, "id");
      }),
      u = e.map(function(e) {
        return (function(e) {
          var t = L(e),
            r = t && T(t, "AdSystem");
          if (r) return P(r);
        })(e.ad);
      }),
      c = e
        .map(function(e) {
          var t = e.ad;
          return R(t);
        })
        .filter(function(e) {
          return Boolean(e);
        }),
      s = c.map(function(e) {
        return O(e, "id");
      }),
      d = c.map(function(e) {
        return O(e, "adId");
      }),
      l = li(e),
      f = l.pricing,
      h = l.pricingCurrency,
      p = l.pricingModel,
      v =
        ((t = e[0].ad),
        (r = T(t, "InLine")),
        (n = r && T(r, "Category"))
          ? { category: P(n), categoryAuthority: O(n, "authority") }
          : {}),
      m = v.category,
      y = v.categoryAuthority,
      g = L(e[0].ad),
      w = R(e[0].ad),
      b = w && T(w, "Linear"),
      E = di(g, "AdServingId"),
      A =
        ((i = e[0].parsedXML),
        (o = i && T(i, "VAST")) ? O(o, "version") : "unknown"),
      k = di(g, "Advertiser"),
      x = di(g, "AdTitle"),
      C = di(g, "Description"),
      I = di(b, "Duration"),
      S = I && _(I),
      F = void 0,
      U = [],
      B = void 0,
      N = [],
      j = void 0,
      V = [],
      M = void 0,
      D = [],
      W = void 0,
      z = void 0,
      H = void 0,
      q = void 0,
      X = [],
      Q = void 0,
      $ = void 0,
      K = void 0,
      Y = void 0;
    if (ue(e[0].ad)) {
      var J = G(a);
      (F = J[0]), (U = J.slice(1));
      var Z = G(u);
      (B = Z[0]), (N = Z.slice(1));
      var ee = G(s);
      (j = ee[0]), (V = ee.slice(1));
      var te = G(d);
      (M = te[0]), (D = te.slice(1)), (W = me(e[0].ad)), (z = be(e[0].XML));
      var re = T(w, "UniversalAdId");
      (H = P(re)),
        (q = O(re, "idRegistry")),
        (X = fe(e[0].ad)),
        (Q = Boolean(pe(e[0].ad))),
        (K = O(b, "skipoffset")),
        (Y = _(K)),
        ($ = Boolean(K));
    } else ae(e[0].ad) && ((U = a), (N = u), (V = s), (D = d));
    return {
      adId: F,
      adServingId: E,
      adSystem: B,
      adTitle: x,
      advertiser: k,
      adWrapperCreativeAdIds: D,
      adWrapperCreativeIds: V,
      adWrapperIds: U,
      adWrapperSystems: N,
      category: m,
      categoryAuthority: y,
      clickThroughUrl: W,
      creativeAdId: M,
      creativeData: z,
      creativeId: j,
      description: C,
      duration: I,
      durationInMs: S,
      mediaFiles: X,
      pricing: f,
      pricingCurrency: h,
      pricingModel: p,
      skipOffset: K,
      skipOffsetInMs: Y,
      skippable: $,
      universalAdId: H,
      universalAdIdRegistry: q,
      vastVersion: A,
      vpaid: Q
    };
  }),
    (e.run = Xn),
    (e.runWaterfall = function(e, t, r) {
      var n = !1,
        i = null,
        o = ai(r.onAdStart),
        a = z({ vpaidEnabled: !0 }, r, {
          onAdReady: ai(r.onAdReady),
          onAdStart: function(e) {
            o((i = e));
          },
          onError: ai(r.onError),
          onRunFinish: ai(r.onRunFinish)
        });
      return (
        r.videoElement &&
          /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !window.MSStream &&
          r.videoElement.load(),
        si(
          function() {
            return ri(e, a);
          },
          t,
          a,
          function() {
            return n;
          }
        ),
        function() {
          (n = !0), i && !i.isFinished() && i.cancel();
        }
      );
    }),
    (e.requestAd = ri),
    (e.requestNextAd = ii),
    (e.vastSelectors = Ee),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=main.umd.js.map