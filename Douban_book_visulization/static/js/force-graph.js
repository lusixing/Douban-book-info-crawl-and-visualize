// Version 1.32.3 force-graph - https://github.com/vasturiano/force-graph
!function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).ForceGraph = n()
}(this, (function () {
    "use strict";

    function t(n) {
        return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(n)
    }

    function n(t, n, e) {
        return n in t ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[n] = e, t
    }

    function e(t, n) {
        var e = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            n && (r = r.filter((function (n) {
                return Object.getOwnPropertyDescriptor(t, n).enumerable
            }))), e.push.apply(e, r)
        }
        return e
    }

    function r(t) {
        for (var r = 1; r < arguments.length; r++) {
            var i = null != arguments[r] ? arguments[r] : {};
            r % 2 ? e(Object(i), !0).forEach((function (e) {
                n(t, e, i[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : e(Object(i)).forEach((function (n) {
                Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(i, n))
            }))
        }
        return t
    }

    function i(t, n) {
        return (i = Object.setPrototypeOf || function (t, n) {
            return t.__proto__ = n, t
        })(t, n)
    }

    function o() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {
            }))), !0
        } catch (t) {
            return !1
        }
    }

    function a(t, n, e) {
        return (a = o() ? Reflect.construct : function (t, n, e) {
            var r = [null];
            r.push.apply(r, n);
            var o = new (Function.bind.apply(t, r));
            return e && i(o, e.prototype), o
        }).apply(null, arguments)
    }

    function u(t, n) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, n) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
            var e = [], r = !0, i = !1, o = void 0;
            try {
                for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (e.push(a.value), !n || e.length !== n); r = !0) ;
            } catch (t) {
                i = !0, o = t
            } finally {
                try {
                    r || null == u.return || u.return()
                } finally {
                    if (i) throw o
                }
            }
            return e
        }(t, n) || l(t, n) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function s(t) {
        return function (t) {
            if (Array.isArray(t)) return c(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
        }(t) || l(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function l(t, n) {
        if (t) {
            if ("string" == typeof t) return c(t, n);
            var e = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === e && t.constructor && (e = t.constructor.name), "Map" === e || "Set" === e ? Array.from(t) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? c(t, n) : void 0
        }
    }

    function c(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r
    }

    !function (t, n) {
        void 0 === n && (n = {});
        var e = n.insertAt;
        if (t && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
            i.type = "text/css", "top" === e && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t))
        }
    }("canvas {\n  user-select: none;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.graph-tooltip {\n  position: absolute;\n  transform: translate(-50%, 25px);\n  font-family: sans-serif;\n  font-size: 16px;\n  padding: 4px;\n  border-radius: 3px;\n  color: #eee;\n  background: rgba(0,0,0,0.65);\n  visibility: hidden; /* by default */\n}\n\n.grabbable {\n  cursor: move;\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}\n");
    var h = "http://www.w3.org/1999/xhtml", f = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: h,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function p(t) {
        var n = t += "", e = n.indexOf(":");
        return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), f.hasOwnProperty(n) ? {
            space: f[n],
            local: t
        } : t
    }

    function d(t) {
        return function () {
            var n = this.ownerDocument, e = this.namespaceURI;
            return e === h && n.documentElement.namespaceURI === h ? n.createElement(t) : n.createElementNS(e, t)
        }
    }

    function g(t) {
        return function () {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
    }

    function y(t) {
        var n = p(t);
        return (n.local ? g : d)(n)
    }

    function v() {
    }

    function _(t) {
        return null == t ? v : function () {
            return this.querySelector(t)
        }
    }

    function m() {
        return []
    }

    function x(t) {
        return null == t ? m : function () {
            return this.querySelectorAll(t)
        }
    }

    function b(t) {
        return function () {
            return this.matches(t)
        }
    }

    function w(t) {
        return new Array(t.length)
    }

    function k(t, n) {
        this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
    }

    k.prototype = {
        constructor: k, appendChild: function (t) {
            return this._parent.insertBefore(t, this._next)
        }, insertBefore: function (t, n) {
            return this._parent.insertBefore(t, n)
        }, querySelector: function (t) {
            return this._parent.querySelector(t)
        }, querySelectorAll: function (t) {
            return this._parent.querySelectorAll(t)
        }
    };

    function z(t, n, e, r, i, o) {
        for (var a, u = 0, s = n.length, l = o.length; u < l; ++u) (a = n[u]) ? (a.__data__ = o[u], r[u] = a) : e[u] = new k(t, o[u]);
        for (; u < s; ++u) (a = n[u]) && (i[u] = a)
    }

    function A(t, n, e, r, i, o, a) {
        var u, s, l, c = {}, h = n.length, f = o.length, p = new Array(h);
        for (u = 0; u < h; ++u) (s = n[u]) && (p[u] = l = "$" + a.call(s, s.__data__, u, n), l in c ? i[u] = s : c[l] = s);
        for (u = 0; u < f; ++u) (s = c[l = "$" + a.call(t, o[u], u, o)]) ? (r[u] = s, s.__data__ = o[u], c[l] = null) : e[u] = new k(t, o[u]);
        for (u = 0; u < h; ++u) (s = n[u]) && c[p[u]] === s && (i[u] = s)
    }

    function M(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function S(t) {
        return function () {
            this.removeAttribute(t)
        }
    }

    function E(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function N(t, n) {
        return function () {
            this.setAttribute(t, n)
        }
    }

    function C(t, n) {
        return function () {
            this.setAttributeNS(t.space, t.local, n)
        }
    }

    function O(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
        }
    }

    function P(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
        }
    }

    function T(t) {
        return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
    }

    function j(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }

    function R(t, n, e) {
        return function () {
            this.style.setProperty(t, n, e)
        }
    }

    function D(t, n, e) {
        return function () {
            var r = n.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
        }
    }

    function I(t, n) {
        return t.style.getPropertyValue(n) || T(t).getComputedStyle(t, null).getPropertyValue(n)
    }

    function U(t) {
        return function () {
            delete this[t]
        }
    }

    function F(t, n) {
        return function () {
            this[t] = n
        }
    }

    function L(t, n) {
        return function () {
            var e = n.apply(this, arguments);
            null == e ? delete this[t] : this[t] = e
        }
    }

    function q(t) {
        return t.trim().split(/^|\s+/)
    }

    function B(t) {
        return t.classList || new H(t)
    }

    function H(t) {
        this._node = t, this._names = q(t.getAttribute("class") || "")
    }

    function V(t, n) {
        for (var e = B(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
    }

    function X(t, n) {
        for (var e = B(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
    }

    function G(t) {
        return function () {
            V(this, t)
        }
    }

    function Y(t) {
        return function () {
            X(this, t)
        }
    }

    function $(t, n) {
        return function () {
            (n.apply(this, arguments) ? V : X)(this, t)
        }
    }

    function W() {
        this.textContent = ""
    }

    function Z(t) {
        return function () {
            this.textContent = t
        }
    }

    function Q(t) {
        return function () {
            var n = t.apply(this, arguments);
            this.textContent = null == n ? "" : n
        }
    }

    function J() {
        this.innerHTML = ""
    }

    function K(t) {
        return function () {
            this.innerHTML = t
        }
    }

    function tt(t) {
        return function () {
            var n = t.apply(this, arguments);
            this.innerHTML = null == n ? "" : n
        }
    }

    function nt() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function et() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function rt() {
        return null
    }

    function it() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function ot() {
        var t = this.cloneNode(!1), n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t
    }

    function at() {
        var t = this.cloneNode(!0), n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t
    }

    H.prototype = {
        add: function (t) {
            this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
        }, remove: function (t) {
            var n = this._names.indexOf(t);
            n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
        }, contains: function (t) {
            return this._names.indexOf(t) >= 0
        }
    };
    var ut = {}, st = null;
    "undefined" != typeof document && ("onmouseenter" in document.documentElement || (ut = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }));

    function lt(t, n, e) {
        return t = ct(t, n, e), function (n) {
            var e = n.relatedTarget;
            e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n)
        }
    }

    function ct(t, n, e) {
        return function (r) {
            var i = st;
            st = r;
            try {
                t.call(this, this.__data__, n, e)
            } finally {
                st = i
            }
        }
    }

    function ht(t) {
        return t.trim().split(/^|\s+/).map((function (t) {
            var n = "", e = t.indexOf(".");
            return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {type: t, name: n}
        }))
    }

    function ft(t) {
        return function () {
            var n = this.__on;
            if (n) {
                for (var e, r = 0, i = -1, o = n.length; r < o; ++r) e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
                ++i ? n.length = i : delete this.__on
            }
        }
    }

    function pt(t, n, e) {
        var r = ut.hasOwnProperty(t.type) ? lt : ct;
        return function (i, o, a) {
            var u, s = this.__on, l = r(n, o, a);
            if (s) for (var c = 0, h = s.length; c < h; ++c) if ((u = s[c]).type === t.type && u.name === t.name) return this.removeEventListener(u.type, u.listener, u.capture), this.addEventListener(u.type, u.listener = l, u.capture = e), void (u.value = n);
            this.addEventListener(t.type, l, e), u = {
                type: t.type,
                name: t.name,
                value: n,
                listener: l,
                capture: e
            }, s ? s.push(u) : this.__on = [u]
        }
    }

    function dt(t, n, e, r) {
        var i = st;
        t.sourceEvent = st, st = t;
        try {
            return n.apply(e, r)
        } finally {
            st = i
        }
    }

    function gt(t, n, e) {
        var r = T(t), i = r.CustomEvent;
        "function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
    }

    function yt(t, n) {
        return function () {
            return gt(this, t, n)
        }
    }

    function vt(t, n) {
        return function () {
            return gt(this, t, n.apply(this, arguments))
        }
    }

    var _t = [null];

    function mt(t, n) {
        this._groups = t, this._parents = n
    }

    function xt() {
        return new mt([[document.documentElement]], _t)
    }

    function bt(t) {
        return "string" == typeof t ? new mt([[document.querySelector(t)]], [document.documentElement]) : new mt([[t]], _t)
    }

    function wt() {
        for (var t, n = st; t = n.sourceEvent;) n = t;
        return n
    }

    function kt(t, n) {
        var e = t.ownerSVGElement || t;
        if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            return r.x = n.clientX, r.y = n.clientY, [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
        }
        var i = t.getBoundingClientRect();
        return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]
    }

    function zt(t) {
        var n = wt();
        return n.changedTouches && (n = n.changedTouches[0]), kt(t, n)
    }

    function At(t, n, e) {
        arguments.length < 3 && (e = n, n = wt().changedTouches);
        for (var r, i = 0, o = n ? n.length : 0; i < o; ++i) if ((r = n[i]).identifier === e) return kt(t, r);
        return null
    }

    mt.prototype = xt.prototype = {
        constructor: mt, select: function (t) {
            "function" != typeof t && (t = _(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) for (var o, a, u = n[i], s = u.length, l = r[i] = new Array(s), c = 0; c < s; ++c) (o = u[c]) && (a = t.call(o, o.__data__, c, u)) && ("__data__" in o && (a.__data__ = o.__data__), l[c] = a);
            return new mt(r, this._parents)
        }, selectAll: function (t) {
            "function" != typeof t && (t = x(t));
            for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o) for (var a, u = n[o], s = u.length, l = 0; l < s; ++l) (a = u[l]) && (r.push(t.call(a, a.__data__, l, u)), i.push(a));
            return new mt(r, i)
        }, filter: function (t) {
            "function" != typeof t && (t = b(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) for (var o, a = n[i], u = a.length, s = r[i] = [], l = 0; l < u; ++l) (o = a[l]) && t.call(o, o.__data__, l, a) && s.push(o);
            return new mt(r, this._parents)
        }, data: function (t, n) {
            if (!t) return p = new Array(this.size()), l = -1, this.each((function (t) {
                p[++l] = t
            })), p;
            var e = n ? A : z, r = this._parents, i = this._groups;
            "function" != typeof t && (t = function (t) {
                return function () {
                    return t
                }
            }(t));
            for (var o = i.length, a = new Array(o), u = new Array(o), s = new Array(o), l = 0; l < o; ++l) {
                var c = r[l], h = i[l], f = h.length, p = t.call(c, c && c.__data__, l, r), d = p.length,
                    g = u[l] = new Array(d), y = a[l] = new Array(d);
                e(c, h, g, y, s[l] = new Array(f), p, n);
                for (var v, _, m = 0, x = 0; m < d; ++m) if (v = g[m]) {
                    for (m >= x && (x = m + 1); !(_ = y[x]) && ++x < d;) ;
                    v._next = _ || null
                }
            }
            return (a = new mt(a, r))._enter = u, a._exit = s, a
        }, enter: function () {
            return new mt(this._enter || this._groups.map(w), this._parents)
        }, exit: function () {
            return new mt(this._exit || this._groups.map(w), this._parents)
        }, join: function (t, n, e) {
            var r = this.enter(), i = this, o = this.exit();
            return r = "function" == typeof t ? t(r) : r.append(t + ""), null != n && (i = n(i)), null == e ? o.remove() : e(o), r && i ? r.merge(i).order() : i
        }, merge: function (t) {
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u) for (var s, l = n[u], c = e[u], h = l.length, f = a[u] = new Array(h), p = 0; p < h; ++p) (s = l[p] || c[p]) && (f[p] = s);
            for (; u < r; ++u) a[u] = n[u];
            return new mt(a, this._parents)
        }, order: function () {
            for (var t = this._groups, n = -1, e = t.length; ++n < e;) for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0;) (r = i[o]) && (a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), a = r);
            return this
        }, sort: function (t) {
            function n(n, e) {
                return n && e ? t(n.__data__, e.__data__) : !n - !e
            }

            t || (t = M);
            for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
                for (var a, u = e[o], s = u.length, l = i[o] = new Array(s), c = 0; c < s; ++c) (a = u[c]) && (l[c] = a);
                l.sort(n)
            }
            return new mt(i, this._parents).order()
        }, call: function () {
            var t = arguments[0];
            return arguments[0] = this, t.apply(null, arguments), this
        }, nodes: function () {
            var t = new Array(this.size()), n = -1;
            return this.each((function () {
                t[++n] = this
            })), t
        }, node: function () {
            for (var t = this._groups, n = 0, e = t.length; n < e; ++n) for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
                var a = r[i];
                if (a) return a
            }
            return null
        }, size: function () {
            var t = 0;
            return this.each((function () {
                ++t
            })), t
        }, empty: function () {
            return !this.node()
        }, each: function (t) {
            for (var n = this._groups, e = 0, r = n.length; e < r; ++e) for (var i, o = n[e], a = 0, u = o.length; a < u; ++a) (i = o[a]) && t.call(i, i.__data__, a, o);
            return this
        }, attr: function (t, n) {
            var e = p(t);
            if (arguments.length < 2) {
                var r = this.node();
                return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
            }
            return this.each((null == n ? e.local ? E : S : "function" == typeof n ? e.local ? P : O : e.local ? C : N)(e, n))
        }, style: function (t, n, e) {
            return arguments.length > 1 ? this.each((null == n ? j : "function" == typeof n ? D : R)(t, n, null == e ? "" : e)) : I(this.node(), t)
        }, property: function (t, n) {
            return arguments.length > 1 ? this.each((null == n ? U : "function" == typeof n ? L : F)(t, n)) : this.node()[t]
        }, classed: function (t, n) {
            var e = q(t + "");
            if (arguments.length < 2) {
                for (var r = B(this.node()), i = -1, o = e.length; ++i < o;) if (!r.contains(e[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof n ? $ : n ? G : Y)(e, n))
        }, text: function (t) {
            return arguments.length ? this.each(null == t ? W : ("function" == typeof t ? Q : Z)(t)) : this.node().textContent
        }, html: function (t) {
            return arguments.length ? this.each(null == t ? J : ("function" == typeof t ? tt : K)(t)) : this.node().innerHTML
        }, raise: function () {
            return this.each(nt)
        }, lower: function () {
            return this.each(et)
        }, append: function (t) {
            var n = "function" == typeof t ? t : y(t);
            return this.select((function () {
                return this.appendChild(n.apply(this, arguments))
            }))
        }, insert: function (t, n) {
            var e = "function" == typeof t ? t : y(t), r = null == n ? rt : "function" == typeof n ? n : _(n);
            return this.select((function () {
                return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
            }))
        }, remove: function () {
            return this.each(it)
        }, clone: function (t) {
            return this.select(t ? at : ot)
        }, datum: function (t) {
            return arguments.length ? this.property("__data__", t) : this.node().__data__
        }, on: function (t, n, e) {
            var r, i, o = ht(t + ""), a = o.length;
            if (!(arguments.length < 2)) {
                for (u = n ? pt : ft, null == e && (e = !1), r = 0; r < a; ++r) this.each(u(o[r], n, e));
                return this
            }
            var u = this.node().__on;
            if (u) for (var s, l = 0, c = u.length; l < c; ++l) for (r = 0, s = u[l]; r < a; ++r) if ((i = o[r]).type === s.type && i.name === s.name) return s.value
        }, dispatch: function (t, n) {
            return this.each(("function" == typeof n ? vt : yt)(t, n))
        }
    };
    var Mt = {
        value: function () {
        }
    };

    function St() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
            if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
            r[t] = []
        }
        return new Et(r)
    }

    function Et(t) {
        this._ = t
    }

    function Nt(t, n) {
        return t.trim().split(/^|\s+/).map((function (t) {
            var e = "", r = t.indexOf(".");
            if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            return {type: t, name: e}
        }))
    }

    function Ct(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r) if ((e = t[r]).name === n) return e.value
    }

    function Ot(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r) if (t[r].name === n) {
            t[r] = Mt, t = t.slice(0, r).concat(t.slice(r + 1));
            break
        }
        return null != e && t.push({name: n, value: e}), t
    }

    function Pt() {
        st.stopImmediatePropagation()
    }

    function Tt() {
        st.preventDefault(), st.stopImmediatePropagation()
    }

    function jt(t) {
        var n = t.document.documentElement, e = bt(t).on("dragstart.drag", Tt, !0);
        "onselectstart" in n ? e.on("selectstart.drag", Tt, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none")
    }

    function Rt(t, n) {
        var e = t.document.documentElement, r = bt(t).on("dragstart.drag", null);
        n && (r.on("click.drag", Tt, !0), setTimeout((function () {
            r.on("click.drag", null)
        }), 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect)
    }

    function Dt(t) {
        return function () {
            return t
        }
    }

    function It(t, n, e, r, i, o, a, u, s, l) {
        this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = a, this.dx = u, this.dy = s, this._ = l
    }

    function Ut() {
        return !st.ctrlKey && !st.button
    }

    function Ft() {
        return this.parentNode
    }

    function Lt(t) {
        return null == t ? {x: st.x, y: st.y} : t
    }

    function qt() {
        return navigator.maxTouchPoints || "ontouchstart" in this
    }

    function Bt(t, n, e) {
        t.prototype = n.prototype = e, e.constructor = t
    }

    function Ht(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e
    }

    function Vt() {
    }

    Et.prototype = St.prototype = {
        constructor: Et, on: function (t, n) {
            var e, r = this._, i = Nt(t + "", r), o = -1, a = i.length;
            if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++o < a;) if (e = (t = i[o]).type) r[e] = Ot(r[e], t.name, n); else if (null == n) for (e in r) r[e] = Ot(r[e], t.name, null);
                return this
            }
            for (; ++o < a;) if ((e = (t = i[o]).type) && (e = Ct(r[e], t.name))) return e
        }, copy: function () {
            var t = {}, n = this._;
            for (var e in n) t[e] = n[e].slice();
            return new Et(t)
        }, call: function (t, n) {
            if ((e = arguments.length - 2) > 0) for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i)
        }, apply: function (t, n, e) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e)
        }
    }, It.prototype.on = function () {
        var t = this._.on.apply(this._, arguments);
        return t === this._ ? this : t
    };
    var Xt = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        Yt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", $t = /^#([0-9a-f]{3,8})$/,
        Wt = new RegExp("^rgb\\(" + [Xt, Xt, Xt] + "\\)$"), Zt = new RegExp("^rgb\\(" + [Yt, Yt, Yt] + "\\)$"),
        Qt = new RegExp("^rgba\\(" + [Xt, Xt, Xt, Gt] + "\\)$"),
        Jt = new RegExp("^rgba\\(" + [Yt, Yt, Yt, Gt] + "\\)$"), Kt = new RegExp("^hsl\\(" + [Gt, Yt, Yt] + "\\)$"),
        tn = new RegExp("^hsla\\(" + [Gt, Yt, Yt, Gt] + "\\)$"), nn = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function en() {
        return this.rgb().formatHex()
    }

    function rn() {
        return this.rgb().formatRgb()
    }

    function on(t) {
        var n, e;
        return t = (t + "").trim().toLowerCase(), (n = $t.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), 6 === e ? an(n) : 3 === e ? new cn(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : 8 === e ? un(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) : 4 === e ? un(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) : (n = Wt.exec(t)) ? new cn(n[1], n[2], n[3], 1) : (n = Zt.exec(t)) ? new cn(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = Qt.exec(t)) ? un(n[1], n[2], n[3], n[4]) : (n = Jt.exec(t)) ? un(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Kt.exec(t)) ? dn(n[1], n[2] / 100, n[3] / 100, 1) : (n = tn.exec(t)) ? dn(n[1], n[2] / 100, n[3] / 100, n[4]) : nn.hasOwnProperty(t) ? an(nn[t]) : "transparent" === t ? new cn(NaN, NaN, NaN, 0) : null
    }

    function an(t) {
        return new cn(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function un(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new cn(t, n, e, r)
    }

    function sn(t) {
        return t instanceof Vt || (t = on(t)), t ? new cn((t = t.rgb()).r, t.g, t.b, t.opacity) : new cn
    }

    function ln(t, n, e, r) {
        return 1 === arguments.length ? sn(t) : new cn(t, n, e, null == r ? 1 : r)
    }

    function cn(t, n, e, r) {
        this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
    }

    function hn() {
        return "#" + pn(this.r) + pn(this.g) + pn(this.b)
    }

    function fn() {
        var t = this.opacity;
        return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
    }

    function pn(t) {
        return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
    }

    function dn(t, n, e, r) {
        return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new yn(t, n, e, r)
    }

    function gn(t) {
        if (t instanceof yn) return new yn(t.h, t.s, t.l, t.opacity);
        if (t instanceof Vt || (t = on(t)), !t) return new yn;
        if (t instanceof yn) return t;
        var n = (t = t.rgb()).r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r),
            a = NaN, u = o - i, s = (o + i) / 2;
        return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new yn(a, u, s, t.opacity)
    }

    function yn(t, n, e, r) {
        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
    }

    function vn(t, n, e) {
        return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
    }

    function _n(t) {
        return function () {
            return t
        }
    }

    function mn(t) {
        return 1 == (t = +t) ? xn : function (n, e) {
            return e - n ? function (t, n, e) {
                return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function (r) {
                    return Math.pow(t + r * n, e)
                }
            }(n, e, t) : _n(isNaN(n) ? e : n)
        }
    }

    function xn(t, n) {
        var e = n - t;
        return e ? function (t, n) {
            return function (e) {
                return t + e * n
            }
        }(t, e) : _n(isNaN(t) ? n : t)
    }

    Bt(Vt, on, {
        copy: function (t) {
            return Object.assign(new this.constructor, this, t)
        }, displayable: function () {
            return this.rgb().displayable()
        }, hex: en, formatHex: en, formatHsl: function () {
            return gn(this).formatHsl()
        }, formatRgb: rn, toString: rn
    }), Bt(cn, ln, Ht(Vt, {
        brighter: function (t) {
            return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new cn(this.r * t, this.g * t, this.b * t, this.opacity)
        }, darker: function (t) {
            return t = null == t ? .7 : Math.pow(.7, t), new cn(this.r * t, this.g * t, this.b * t, this.opacity)
        }, rgb: function () {
            return this
        }, displayable: function () {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        }, hex: hn, formatHex: hn, formatRgb: fn, toString: fn
    })), Bt(yn, (function (t, n, e, r) {
        return 1 === arguments.length ? gn(t) : new yn(t, n, e, null == r ? 1 : r)
    }), Ht(Vt, {
        brighter: function (t) {
            return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new yn(this.h, this.s, this.l * t, this.opacity)
        }, darker: function (t) {
            return t = null == t ? .7 : Math.pow(.7, t), new yn(this.h, this.s, this.l * t, this.opacity)
        }, rgb: function () {
            var t = this.h % 360 + 360 * (this.h < 0), n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l,
                r = e + (e < .5 ? e : 1 - e) * n, i = 2 * e - r;
            return new cn(vn(t >= 240 ? t - 240 : t + 120, i, r), vn(t, i, r), vn(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
        }, displayable: function () {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        }, formatHsl: function () {
            var t = this.opacity;
            return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
        }
    }));
    var bn = function t(n) {
        var e = mn(n);

        function r(t, n) {
            var r = e((t = ln(t)).r, (n = ln(n)).r), i = e(t.g, n.g), o = e(t.b, n.b), a = xn(t.opacity, n.opacity);
            return function (n) {
                return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = a(n), t + ""
            }
        }

        return r.gamma = t, r
    }(1);

    function wn(t, n) {
        return t = +t, n = +n, function (e) {
            return t * (1 - e) + n * e
        }
    }

    var kn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, zn = new RegExp(kn.source, "g");

    function An(t, n) {
        var e, r, i, o = kn.lastIndex = zn.lastIndex = 0, a = -1, u = [], s = [];
        for (t += "", n += ""; (e = kn.exec(t)) && (r = zn.exec(n));) (i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, s.push({
            i: a,
            x: wn(e, r)
        })), o = zn.lastIndex;
        return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? s[0] ? function (t) {
            return function (n) {
                return t(n) + ""
            }
        }(s[0].x) : function (t) {
            return function () {
                return t
            }
        }(n) : (n = s.length, function (t) {
            for (var e, r = 0; r < n; ++r) u[(e = s[r]).i] = e.x(t);
            return u.join("")
        })
    }

    var Mn, Sn, En, Nn, Cn = 180 / Math.PI,
        On = {translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1};

    function Pn(t, n, e, r, i, o) {
        var a, u, s;
        return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (s = t * e + n * r) && (e -= t * s, r -= n * s), (u = Math.sqrt(e * e + r * r)) && (e /= u, r /= u, s /= u), t * r < n * e && (t = -t, n = -n, s = -s, a = -a), {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * Cn,
            skewX: Math.atan(s) * Cn,
            scaleX: a,
            scaleY: u
        }
    }

    function Tn(t, n, e, r) {
        function i(t) {
            return t.length ? t.pop() + " " : ""
        }

        return function (o, a) {
            var u = [], s = [];
            return o = t(o), a = t(a), function (t, r, i, o, a, u) {
                if (t !== i || r !== o) {
                    var s = a.push("translate(", null, n, null, e);
                    u.push({i: s - 4, x: wn(t, i)}, {i: s - 2, x: wn(r, o)})
                } else (i || o) && a.push("translate(" + i + n + o + e)
            }(o.translateX, o.translateY, a.translateX, a.translateY, u, s), function (t, n, e, o) {
                t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
                    i: e.push(i(e) + "rotate(", null, r) - 2,
                    x: wn(t, n)
                })) : n && e.push(i(e) + "rotate(" + n + r)
            }(o.rotate, a.rotate, u, s), function (t, n, e, o) {
                t !== n ? o.push({
                    i: e.push(i(e) + "skewX(", null, r) - 2,
                    x: wn(t, n)
                }) : n && e.push(i(e) + "skewX(" + n + r)
            }(o.skewX, a.skewX, u, s), function (t, n, e, r, o, a) {
                if (t !== e || n !== r) {
                    var u = o.push(i(o) + "scale(", null, ",", null, ")");
                    a.push({i: u - 4, x: wn(t, e)}, {i: u - 2, x: wn(n, r)})
                } else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")")
            }(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, s), o = a = null, function (t) {
                for (var n, e = -1, r = s.length; ++e < r;) u[(n = s[e]).i] = n.x(t);
                return u.join("")
            }
        }
    }

    var jn = Tn((function (t) {
        return "none" === t ? On : (Mn || (Mn = document.createElement("DIV"), Sn = document.documentElement, En = document.defaultView), Mn.style.transform = t, t = En.getComputedStyle(Sn.appendChild(Mn), null).getPropertyValue("transform"), Sn.removeChild(Mn), Pn(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
    }), "px, ", "px)", "deg)"), Rn = Tn((function (t) {
        return null == t ? On : (Nn || (Nn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Nn.setAttribute("transform", t), (t = Nn.transform.baseVal.consolidate()) ? Pn((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : On)
    }), ", ", ")", ")"), Dn = Math.SQRT2;

    function In(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }

    function Un(t, n) {
        var e, r, i = t[0], o = t[1], a = t[2], u = n[0], s = n[1], l = n[2], c = u - i, h = s - o, f = c * c + h * h;
        if (f < 1e-12) r = Math.log(l / a) / Dn, e = function (t) {
            return [i + t * c, o + t * h, a * Math.exp(Dn * t * r)]
        }; else {
            var p = Math.sqrt(f), d = (l * l - a * a + 4 * f) / (2 * a * 2 * p),
                g = (l * l - a * a - 4 * f) / (2 * l * 2 * p), y = Math.log(Math.sqrt(d * d + 1) - d),
                v = Math.log(Math.sqrt(g * g + 1) - g);
            r = (v - y) / Dn, e = function (t) {
                var n = t * r, e = In(y), u = a / (2 * p) * (e * function (t) {
                    return ((t = Math.exp(2 * t)) - 1) / (t + 1)
                }(Dn * n + y) - function (t) {
                    return ((t = Math.exp(t)) - 1 / t) / 2
                }(y));
                return [i + u * c, o + u * h, a * e / In(Dn * n + y)]
            }
        }
        return e.duration = 1e3 * r, e
    }

    var Fn, Ln, qn = 0, Bn = 0, Hn = 0, Vn = 0, Xn = 0, Gn = 0,
        Yn = "object" == typeof performance && performance.now ? performance : Date,
        $n = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
            setTimeout(t, 17)
        };

    function Wn() {
        return Xn || ($n(Zn), Xn = Yn.now() + Gn)
    }

    function Zn() {
        Xn = 0
    }

    function Qn() {
        this._call = this._time = this._next = null
    }

    function Jn(t, n, e) {
        var r = new Qn;
        return r.restart(t, n, e), r
    }

    function Kn() {
        Xn = (Vn = Yn.now()) + Gn, qn = Bn = 0;
        try {
            !function () {
                Wn(), ++qn;
                for (var t, n = Fn; n;) (t = Xn - n._time) >= 0 && n._call.call(null, t), n = n._next;
                --qn
            }()
        } finally {
            qn = 0, function () {
                var t, n, e = Fn, r = 1 / 0;
                for (; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Fn = n);
                Ln = t, ne(r)
            }(), Xn = 0
        }
    }

    function te() {
        var t = Yn.now(), n = t - Vn;
        n > 1e3 && (Gn -= n, Vn = t)
    }

    function ne(t) {
        qn || (Bn && (Bn = clearTimeout(Bn)), t - Xn > 24 ? (t < 1 / 0 && (Bn = setTimeout(Kn, t - Yn.now() - Gn)), Hn && (Hn = clearInterval(Hn))) : (Hn || (Vn = Yn.now(), Hn = setInterval(te, 1e3)), qn = 1, $n(Kn)))
    }

    function ee(t, n, e) {
        var r = new Qn;
        return n = null == n ? 0 : +n, r.restart((function (e) {
            r.stop(), t(e + n)
        }), n, e), r
    }

    Qn.prototype = Jn.prototype = {
        constructor: Qn, restart: function (t, n, e) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            e = (null == e ? Wn() : +e) + (null == n ? 0 : +n), this._next || Ln === this || (Ln ? Ln._next = this : Fn = this, Ln = this), this._call = t, this._time = e, ne()
        }, stop: function () {
            this._call && (this._call = null, this._time = 1 / 0, ne())
        }
    };
    var re = St("start", "end", "cancel", "interrupt"), ie = [];

    function oe(t, n, e, r, i, o) {
        var a = t.__transition;
        if (a) {
            if (e in a) return
        } else t.__transition = {};
        !function (t, n, e) {
            var r, i = t.__transition;

            function o(s) {
                var l, c, h, f;
                if (1 !== e.state) return u();
                for (l in i) if ((f = i[l]).name === e.name) {
                    if (3 === f.state) return ee(o);
                    4 === f.state ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete i[l]) : +l < n && (f.state = 6, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete i[l])
                }
                if (ee((function () {
                    3 === e.state && (e.state = 4, e.timer.restart(a, e.delay, e.time), a(s))
                })), e.state = 2, e.on.call("start", t, t.__data__, e.index, e.group), 2 === e.state) {
                    for (e.state = 3, r = new Array(h = e.tween.length), l = 0, c = -1; l < h; ++l) (f = e.tween[l].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = f);
                    r.length = c + 1
                }
            }

            function a(n) {
                for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(u), e.state = 5, 1), o = -1, a = r.length; ++o < a;) r[o].call(t, i);
                5 === e.state && (e.on.call("end", t, t.__data__, e.index, e.group), u())
            }

            function u() {
                for (var r in e.state = 6, e.timer.stop(), delete i[n], i) return;
                delete t.__transition
            }

            i[n] = e, e.timer = Jn((function (t) {
                e.state = 1, e.timer.restart(o, e.delay, e.time), e.delay <= t && o(t - e.delay)
            }), 0, e.time)
        }(t, e, {
            name: n,
            index: r,
            group: i,
            on: re,
            tween: ie,
            time: o.time,
            delay: o.delay,
            duration: o.duration,
            ease: o.ease,
            timer: null,
            state: 0
        })
    }

    function ae(t, n) {
        var e = se(t, n);
        if (e.state > 0) throw new Error("too late; already scheduled");
        return e
    }

    function ue(t, n) {
        var e = se(t, n);
        if (e.state > 3) throw new Error("too late; already running");
        return e
    }

    function se(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e
    }

    function le(t, n) {
        var e, r, i, o = t.__transition, a = !0;
        if (o) {
            for (i in n = null == n ? null : n + "", o) (e = o[i]).name === n ? (r = e.state > 2 && e.state < 5, e.state = 6, e.timer.stop(), e.on.call(r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group), delete o[i]) : a = !1;
            a && delete t.__transition
        }
    }

    function ce(t, n) {
        var e, r;
        return function () {
            var i = ue(this, t), o = i.tween;
            if (o !== e) for (var a = 0, u = (r = e = o).length; a < u; ++a) if (r[a].name === n) {
                (r = r.slice()).splice(a, 1);
                break
            }
            i.tween = r
        }
    }

    function he(t, n, e) {
        var r, i;
        if ("function" != typeof e) throw new Error;
        return function () {
            var o = ue(this, t), a = o.tween;
            if (a !== r) {
                i = (r = a).slice();
                for (var u = {name: n, value: e}, s = 0, l = i.length; s < l; ++s) if (i[s].name === n) {
                    i[s] = u;
                    break
                }
                s === l && i.push(u)
            }
            o.tween = i
        }
    }

    function fe(t, n, e) {
        var r = t._id;
        return t.each((function () {
            var t = ue(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments)
        })), function (t) {
            return se(t, r).value[n]
        }
    }

    function pe(t, n) {
        var e;
        return ("number" == typeof n ? wn : n instanceof on ? bn : (e = on(n)) ? (n = e, bn) : An)(t, n)
    }

    function de(t) {
        return function () {
            this.removeAttribute(t)
        }
    }

    function ge(t) {
        return function () {
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function ye(t, n, e) {
        var r, i, o = e + "";
        return function () {
            var a = this.getAttribute(t);
            return a === o ? null : a === r ? i : i = n(r = a, e)
        }
    }

    function ve(t, n, e) {
        var r, i, o = e + "";
        return function () {
            var a = this.getAttributeNS(t.space, t.local);
            return a === o ? null : a === r ? i : i = n(r = a, e)
        }
    }

    function _e(t, n, e) {
        var r, i, o;
        return function () {
            var a, u, s = e(this);
            if (null != s) return (a = this.getAttribute(t)) === (u = s + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, s));
            this.removeAttribute(t)
        }
    }

    function me(t, n, e) {
        var r, i, o;
        return function () {
            var a, u, s = e(this);
            if (null != s) return (a = this.getAttributeNS(t.space, t.local)) === (u = s + "") ? null : a === r && u === i ? o : (i = u, o = n(r = a, s));
            this.removeAttributeNS(t.space, t.local)
        }
    }

    function xe(t, n) {
        return function (e) {
            this.setAttribute(t, n.call(this, e))
        }
    }

    function be(t, n) {
        return function (e) {
            this.setAttributeNS(t.space, t.local, n.call(this, e))
        }
    }

    function we(t, n) {
        var e, r;

        function i() {
            var i = n.apply(this, arguments);
            return i !== r && (e = (r = i) && be(t, i)), e
        }

        return i._value = n, i
    }

    function ke(t, n) {
        var e, r;

        function i() {
            var i = n.apply(this, arguments);
            return i !== r && (e = (r = i) && xe(t, i)), e
        }

        return i._value = n, i
    }

    function ze(t, n) {
        return function () {
            ae(this, t).delay = +n.apply(this, arguments)
        }
    }

    function Ae(t, n) {
        return n = +n, function () {
            ae(this, t).delay = n
        }
    }

    function Me(t, n) {
        return function () {
            ue(this, t).duration = +n.apply(this, arguments)
        }
    }

    function Se(t, n) {
        return n = +n, function () {
            ue(this, t).duration = n
        }
    }

    function Ee(t, n) {
        if ("function" != typeof n) throw new Error;
        return function () {
            ue(this, t).ease = n
        }
    }

    function Ne(t, n, e) {
        var r, i, o = function (t) {
            return (t + "").trim().split(/^|\s+/).every((function (t) {
                var n = t.indexOf(".");
                return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
            }))
        }(n) ? ae : ue;
        return function () {
            var a = o(this, t), u = a.on;
            u !== r && (i = (r = u).copy()).on(n, e), a.on = i
        }
    }

    var Ce = xt.prototype.constructor;

    function Oe(t) {
        return function () {
            this.style.removeProperty(t)
        }
    }

    function Pe(t, n, e) {
        return function (r) {
            this.style.setProperty(t, n.call(this, r), e)
        }
    }

    function Te(t, n, e) {
        var r, i;

        function o() {
            var o = n.apply(this, arguments);
            return o !== i && (r = (i = o) && Pe(t, o, e)), r
        }

        return o._value = n, o
    }

    function je(t) {
        return function (n) {
            this.textContent = t.call(this, n)
        }
    }

    function Re(t) {
        var n, e;

        function r() {
            var r = t.apply(this, arguments);
            return r !== e && (n = (e = r) && je(r)), n
        }

        return r._value = t, r
    }

    var De = 0;

    function Ie(t, n, e, r) {
        this._groups = t, this._parents = n, this._name = e, this._id = r
    }

    function Ue() {
        return ++De
    }

    var Fe = xt.prototype;
    Ie.prototype = function (t) {
        return xt().transition(t)
    }.prototype = {
        constructor: Ie,
        select: function (t) {
            var n = this._name, e = this._id;
            "function" != typeof t && (t = _(t));
            for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a) for (var u, s, l = r[a], c = l.length, h = o[a] = new Array(c), f = 0; f < c; ++f) (u = l[f]) && (s = t.call(u, u.__data__, f, l)) && ("__data__" in u && (s.__data__ = u.__data__), h[f] = s, oe(h[f], n, e, f, h, se(u, e)));
            return new Ie(o, this._parents, n, e)
        },
        selectAll: function (t) {
            var n = this._name, e = this._id;
            "function" != typeof t && (t = x(t));
            for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u) for (var s, l = r[u], c = l.length, h = 0; h < c; ++h) if (s = l[h]) {
                for (var f, p = t.call(s, s.__data__, h, l), d = se(s, e), g = 0, y = p.length; g < y; ++g) (f = p[g]) && oe(f, n, e, g, p, d);
                o.push(p), a.push(s)
            }
            return new Ie(o, a, n, e)
        },
        filter: function (t) {
            "function" != typeof t && (t = b(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i) for (var o, a = n[i], u = a.length, s = r[i] = [], l = 0; l < u; ++l) (o = a[l]) && t.call(o, o.__data__, l, a) && s.push(o);
            return new Ie(r, this._parents, this._name, this._id)
        },
        merge: function (t) {
            if (t._id !== this._id) throw new Error;
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u) for (var s, l = n[u], c = e[u], h = l.length, f = a[u] = new Array(h), p = 0; p < h; ++p) (s = l[p] || c[p]) && (f[p] = s);
            for (; u < r; ++u) a[u] = n[u];
            return new Ie(a, this._parents, this._name, this._id)
        },
        selection: function () {
            return new Ce(this._groups, this._parents)
        },
        transition: function () {
            for (var t = this._name, n = this._id, e = Ue(), r = this._groups, i = r.length, o = 0; o < i; ++o) for (var a, u = r[o], s = u.length, l = 0; l < s; ++l) if (a = u[l]) {
                var c = se(a, n);
                oe(a, t, e, l, u, {time: c.time + c.delay + c.duration, delay: 0, duration: c.duration, ease: c.ease})
            }
            return new Ie(r, this._parents, t, e)
        },
        call: Fe.call,
        nodes: Fe.nodes,
        node: Fe.node,
        size: Fe.size,
        empty: Fe.empty,
        each: Fe.each,
        on: function (t, n) {
            var e = this._id;
            return arguments.length < 2 ? se(this.node(), e).on.on(t) : this.each(Ne(e, t, n))
        },
        attr: function (t, n) {
            var e = p(t), r = "transform" === e ? Rn : pe;
            return this.attrTween(t, "function" == typeof n ? (e.local ? me : _e)(e, r, fe(this, "attr." + t, n)) : null == n ? (e.local ? ge : de)(e) : (e.local ? ve : ye)(e, r, n))
        },
        attrTween: function (t, n) {
            var e = "attr." + t;
            if (arguments.length < 2) return (e = this.tween(e)) && e._value;
            if (null == n) return this.tween(e, null);
            if ("function" != typeof n) throw new Error;
            var r = p(t);
            return this.tween(e, (r.local ? we : ke)(r, n))
        },
        style: function (t, n, e) {
            var r = "transform" == (t += "") ? jn : pe;
            return null == n ? this.styleTween(t, function (t, n) {
                var e, r, i;
                return function () {
                    var o = I(this, t), a = (this.style.removeProperty(t), I(this, t));
                    return o === a ? null : o === e && a === r ? i : i = n(e = o, r = a)
                }
            }(t, r)).on("end.style." + t, Oe(t)) : "function" == typeof n ? this.styleTween(t, function (t, n, e) {
                var r, i, o;
                return function () {
                    var a = I(this, t), u = e(this), s = u + "";
                    return null == u && (this.style.removeProperty(t), s = u = I(this, t)), a === s ? null : a === r && s === i ? o : (i = s, o = n(r = a, u))
                }
            }(t, r, fe(this, "style." + t, n))).each(function (t, n) {
                var e, r, i, o, a = "style." + n, u = "end." + a;
                return function () {
                    var s = ue(this, t), l = s.on, c = null == s.value[a] ? o || (o = Oe(n)) : void 0;
                    l === e && i === c || (r = (e = l).copy()).on(u, i = c), s.on = r
                }
            }(this._id, t)) : this.styleTween(t, function (t, n, e) {
                var r, i, o = e + "";
                return function () {
                    var a = I(this, t);
                    return a === o ? null : a === r ? i : i = n(r = a, e)
                }
            }(t, r, n), e).on("end.style." + t, null)
        },
        styleTween: function (t, n, e) {
            var r = "style." + (t += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ("function" != typeof n) throw new Error;
            return this.tween(r, Te(t, n, null == e ? "" : e))
        },
        text: function (t) {
            return this.tween("text", "function" == typeof t ? function (t) {
                return function () {
                    var n = t(this);
                    this.textContent = null == n ? "" : n
                }
            }(fe(this, "text", t)) : function (t) {
                return function () {
                    this.textContent = t
                }
            }(null == t ? "" : t + ""))
        },
        textTween: function (t) {
            var n = "text";
            if (arguments.length < 1) return (n = this.tween(n)) && n._value;
            if (null == t) return this.tween(n, null);
            if ("function" != typeof t) throw new Error;
            return this.tween(n, Re(t))
        },
        remove: function () {
            return this.on("end.remove", function (t) {
                return function () {
                    var n = this.parentNode;
                    for (var e in this.__transition) if (+e !== t) return;
                    n && n.removeChild(this)
                }
            }(this._id))
        },
        tween: function (t, n) {
            var e = this._id;
            if (t += "", arguments.length < 2) {
                for (var r, i = se(this.node(), e).tween, o = 0, a = i.length; o < a; ++o) if ((r = i[o]).name === t) return r.value;
                return null
            }
            return this.each((null == n ? ce : he)(e, t, n))
        },
        delay: function (t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? ze : Ae)(n, t)) : se(this.node(), n).delay
        },
        duration: function (t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? Me : Se)(n, t)) : se(this.node(), n).duration
        },
        ease: function (t) {
            var n = this._id;
            return arguments.length ? this.each(Ee(n, t)) : se(this.node(), n).ease
        },
        end: function () {
            var t, n, e = this, r = e._id, i = e.size();
            return new Promise((function (o, a) {
                var u = {value: a}, s = {
                    value: function () {
                        0 == --i && o()
                    }
                };
                e.each((function () {
                    var e = ue(this, r), i = e.on;
                    i !== t && ((n = (t = i).copy())._.cancel.push(u), n._.interrupt.push(u), n._.end.push(s)), e.on = n
                }))
            }))
        }
    };
    var Le = {
        time: null, delay: 0, duration: 250, ease: function (t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
        }
    };

    function qe(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]);) if (!(t = t.parentNode)) return Le.time = Wn(), Le;
        return e
    }

    function Be(t) {
        return function () {
            return t
        }
    }

    function He(t, n, e) {
        this.target = t, this.type = n, this.transform = e
    }

    function Ve(t, n, e) {
        this.k = t, this.x = n, this.y = e
    }

    xt.prototype.interrupt = function (t) {
        return this.each((function () {
            le(this, t)
        }))
    }, xt.prototype.transition = function (t) {
        var n, e;
        t instanceof Ie ? (n = t._id, t = t._name) : (n = Ue(), (e = Le).time = Wn(), t = null == t ? null : t + "");
        for (var r = this._groups, i = r.length, o = 0; o < i; ++o) for (var a, u = r[o], s = u.length, l = 0; l < s; ++l) (a = u[l]) && oe(a, t, n, l, u, e || qe(a, n));
        return new Ie(r, this._parents, t, n)
    }, Ve.prototype = {
        constructor: Ve, scale: function (t) {
            return 1 === t ? this : new Ve(this.k * t, this.x, this.y)
        }, translate: function (t, n) {
            return 0 === t & 0 === n ? this : new Ve(this.k, this.x + this.k * t, this.y + this.k * n)
        }, apply: function (t) {
            return [t[0] * this.k + this.x, t[1] * this.k + this.y]
        }, applyX: function (t) {
            return t * this.k + this.x
        }, applyY: function (t) {
            return t * this.k + this.y
        }, invert: function (t) {
            return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
        }, invertX: function (t) {
            return (t - this.x) / this.k
        }, invertY: function (t) {
            return (t - this.y) / this.k
        }, rescaleX: function (t) {
            return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
        }, rescaleY: function (t) {
            return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
        }, toString: function () {
            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
        }
    };
    var Xe = new Ve(1, 0, 0);

    function Ge(t) {
        for (; !t.__zoom;) if (!(t = t.parentNode)) return Xe;
        return t.__zoom
    }

    function Ye() {
        st.stopImmediatePropagation()
    }

    function $e() {
        st.preventDefault(), st.stopImmediatePropagation()
    }

    function We() {
        return !st.ctrlKey && !st.button
    }

    function Ze() {
        var t = this;
        return t instanceof SVGElement ? (t = t.ownerSVGElement || t).hasAttribute("viewBox") ? [[(t = t.viewBox.baseVal).x, t.y], [t.x + t.width, t.y + t.height]] : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]] : [[0, 0], [t.clientWidth, t.clientHeight]]
    }

    function Qe() {
        return this.__zoom || Xe
    }

    function Je() {
        return -st.deltaY * (1 === st.deltaMode ? .05 : st.deltaMode ? 1 : .002)
    }

    function Ke() {
        return navigator.maxTouchPoints || "ontouchstart" in this
    }

    function tr(t, n, e) {
        var r = t.invertX(n[0][0]) - e[0][0], i = t.invertX(n[1][0]) - e[1][0], o = t.invertY(n[0][1]) - e[0][1],
            a = t.invertY(n[1][1]) - e[1][1];
        return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a))
    }

    function nr(t, n) {
        let e;
        if (void 0 === n) for (const n of t) null != n && (e < n || void 0 === e && n >= n) && (e = n); else {
            let r = -1;
            for (let i of t) null != (i = n(i, ++r, t)) && (e < i || void 0 === e && i >= i) && (e = i)
        }
        return e
    }

    function er(t, n) {
        let e;
        if (void 0 === n) for (const n of t) null != n && (e > n || void 0 === e && n >= n) && (e = n); else {
            let r = -1;
            for (let i of t) null != (i = n(i, ++r, t)) && (e > i || void 0 === e && i >= i) && (e = i)
        }
        return e
    }

    Ge.prototype = Ve.prototype;
    var rr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function ir(t, n, e) {
        return t(e = {
            path: n, exports: {}, require: function (t, n) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == n && e.path)
            }
        }, e.exports), e.exports
    }

    var or = /^\s+|\s+$/g, ar = /^[-+]0x[0-9a-f]+$/i, ur = /^0b[01]+$/i, sr = /^0o[0-7]+$/i, lr = parseInt,
        cr = "object" == typeof rr && rr && rr.Object === Object && rr,
        hr = "object" == typeof self && self && self.Object === Object && self,
        fr = cr || hr || Function("return this")(), pr = Object.prototype.toString, dr = Math.max, gr = Math.min,
        yr = function () {
            return fr.Date.now()
        };

    function vr(t, n, e) {
        var r, i, o, a, u, s, l = 0, c = !1, h = !1, f = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");

        function p(n) {
            var e = r, o = i;
            return r = i = void 0, l = n, a = t.apply(o, e)
        }

        function d(t) {
            return l = t, u = setTimeout(y, n), c ? p(t) : a
        }

        function g(t) {
            var e = t - s;
            return void 0 === s || e >= n || e < 0 || h && t - l >= o
        }

        function y() {
            var t = yr();
            if (g(t)) return v(t);
            u = setTimeout(y, function (t) {
                var e = n - (t - s);
                return h ? gr(e, o - (t - l)) : e
            }(t))
        }

        function v(t) {
            return u = void 0, f && r ? p(t) : (r = i = void 0, a)
        }

        function _() {
            var t = yr(), e = g(t);
            if (r = arguments, i = this, s = t, e) {
                if (void 0 === u) return d(s);
                if (h) return u = setTimeout(y, n), p(s)
            }
            return void 0 === u && (u = setTimeout(y, n)), a
        }

        return n = mr(n) || 0, _r(e) && (c = !!e.leading, o = (h = "maxWait" in e) ? dr(mr(e.maxWait) || 0, n) : o, f = "trailing" in e ? !!e.trailing : f), _.cancel = function () {
            void 0 !== u && clearTimeout(u), l = 0, r = s = i = u = void 0
        }, _.flush = function () {
            return void 0 === u ? a : v(yr())
        }, _
    }

    function _r(t) {
        var n = typeof t;
        return !!t && ("object" == n || "function" == n)
    }

    function mr(t) {
        if ("number" == typeof t) return t;
        if (function (t) {
            return "symbol" == typeof t || function (t) {
                return !!t && "object" == typeof t
            }(t) && "[object Symbol]" == pr.call(t)
        }(t)) return NaN;
        if (_r(t)) {
            var n = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = _r(n) ? n + "" : n
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(or, "");
        var e = ur.test(t);
        return e || sr.test(t) ? lr(t.slice(2), e ? 2 : 8) : ar.test(t) ? NaN : +t
    }

    var xr, br, wr = function (t, n, e) {
        var r = !0, i = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return _r(e) && (r = "leading" in e ? !!e.leading : r, i = "trailing" in e ? !!e.trailing : i), vr(t, n, {
            leading: r,
            maxWait: n,
            trailing: i
        })
    }, kr = "undefined" == typeof self && "undefined" != typeof process && process.hrtime ? function () {
        var t = process.hrtime();
        return 1e3 * t[0] + t[1] / 1e6
    } : "undefined" != typeof self && void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now.bind(self.performance) : void 0 !== Date.now ? Date.now : function () {
        return (new Date).getTime()
    }, zr = function () {
        function t() {
            this._tweens = {}, this._tweensAddedDuringUpdate = {}
        }

        return t.prototype.getAll = function () {
            var t = this;
            return Object.keys(this._tweens).map((function (n) {
                return t._tweens[n]
            }))
        }, t.prototype.removeAll = function () {
            this._tweens = {}
        }, t.prototype.add = function (t) {
            this._tweens[t.getId()] = t, this._tweensAddedDuringUpdate[t.getId()] = t
        }, t.prototype.remove = function (t) {
            delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()]
        }, t.prototype.update = function (t, n) {
            var e = Object.keys(this._tweens);
            if (0 === e.length) return !1;
            for (t = void 0 !== t ? t : kr(); e.length > 0;) {
                this._tweensAddedDuringUpdate = {};
                for (var r = 0; r < e.length; r++) {
                    var i = this._tweens[e[r]];
                    i && !1 === i.update(t) && !n && delete this._tweens[e[r]]
                }
                e = Object.keys(this._tweensAddedDuringUpdate)
            }
            return !0
        }, t
    }(), Ar = {
        Linear: {
            None: function (t) {
                return t
            }
        }, Quadratic: {
            In: function (t) {
                return t * t
            }, Out: function (t) {
                return t * (2 - t)
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
        }, Cubic: {
            In: function (t) {
                return t * t * t
            }, Out: function (t) {
                return --t * t * t + 1
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }
        }, Quartic: {
            In: function (t) {
                return t * t * t * t
            }, Out: function (t) {
                return 1 - --t * t * t * t
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }
        }, Quintic: {
            In: function (t) {
                return t * t * t * t * t
            }, Out: function (t) {
                return --t * t * t * t * t + 1
            }, InOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
        }, Sinusoidal: {
            In: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, Out: function (t) {
                return Math.sin(t * Math.PI / 2)
            }, InOut: function (t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }
        }, Exponential: {
            In: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, Out: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, InOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            }
        }, Circular: {
            In: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, Out: function (t) {
                return Math.sqrt(1 - --t * t)
            }, InOut: function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
        }, Elastic: {
            In: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
            }, Out: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin(5 * (t - .1) * Math.PI) + 1
            }, InOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1
            }
        }, Back: {
            In: function (t) {
                var n = 1.70158;
                return t * t * ((n + 1) * t - n)
            }, Out: function (t) {
                var n = 1.70158;
                return --t * t * ((n + 1) * t + n) + 1
            }, InOut: function (t) {
                var n = 2.5949095;
                return (t *= 2) < 1 ? t * t * ((n + 1) * t - n) * .5 : .5 * ((t -= 2) * t * ((n + 1) * t + n) + 2)
            }
        }, Bounce: {
            In: function (t) {
                return 1 - Ar.Bounce.Out(1 - t)
            }, Out: function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, InOut: function (t) {
                return t < .5 ? .5 * Ar.Bounce.In(2 * t) : .5 * Ar.Bounce.Out(2 * t - 1) + .5
            }
        }
    }, Mr = {
        Linear: function (t, n) {
            var e = t.length - 1, r = e * n, i = Math.floor(r), o = Mr.Utils.Linear;
            return n < 0 ? o(t[0], t[1], r) : n > 1 ? o(t[e], t[e - 1], e - r) : o(t[i], t[i + 1 > e ? e : i + 1], r - i)
        }, Bezier: function (t, n) {
            for (var e = 0, r = t.length - 1, i = Math.pow, o = Mr.Utils.Bernstein, a = 0; a <= r; a++) e += i(1 - n, r - a) * i(n, a) * t[a] * o(r, a);
            return e
        }, CatmullRom: function (t, n) {
            var e = t.length - 1, r = e * n, i = Math.floor(r), o = Mr.Utils.CatmullRom;
            return t[0] === t[e] ? (n < 0 && (i = Math.floor(r = e * (1 + n))), o(t[(i - 1 + e) % e], t[i], t[(i + 1) % e], t[(i + 2) % e], r - i)) : n < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -r) - t[0]) : n > 1 ? t[e] - (o(t[e], t[e], t[e - 1], t[e - 1], r - e) - t[e]) : o(t[i ? i - 1 : 0], t[i], t[e < i + 1 ? e : i + 1], t[e < i + 2 ? e : i + 2], r - i)
        }, Utils: {
            Linear: function (t, n, e) {
                return (n - t) * e + t
            }, Bernstein: function (t, n) {
                var e = Mr.Utils.Factorial;
                return e(t) / e(n) / e(t - n)
            }, Factorial: (xr = [1], function (t) {
                var n = 1;
                if (xr[t]) return xr[t];
                for (var e = t; e > 1; e--) n *= e;
                return xr[t] = n, n
            }), CatmullRom: function (t, n, e, r, i) {
                var o = .5 * (e - t), a = .5 * (r - n), u = i * i;
                return (2 * n - 2 * e + o + a) * (i * u) + (-3 * n + 3 * e - 2 * o - a) * u + o * i + n
            }
        }
    }, Sr = function () {
        function t() {
        }

        return t.nextId = function () {
            return t._nextId++
        }, t._nextId = 0, t
    }(), Er = function () {
        function t(t, n) {
            void 0 === n && (n = Cr), this._object = t, this._group = n, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = Cr.Easing.Linear.None, this._interpolationFunction = Cr.Interpolation.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._id = Cr.nextId(), this._isChainStopped = !1
        }

        return t.prototype.getId = function () {
            return this._id
        }, t.prototype.isPlaying = function () {
            return this._isPlaying
        }, t.prototype.isPaused = function () {
            return this._isPaused
        }, t.prototype.to = function (t, n) {
            for (var e in t) this._valuesEnd[e] = t[e];
            return void 0 !== n && (this._duration = n), this
        }, t.prototype.duration = function (t) {
            return this._duration = t, this
        }, t.prototype.start = function (t) {
            if (this._isPlaying) return this;
            if (this._group.add(this), this._repeat = this._initialRepeat, this._reversed) for (var n in this._reversed = !1, this._valuesStartRepeat) this._swapEndStartRepeatValues(n), this._valuesStart[n] = this._valuesStartRepeat[n];
            return this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = void 0 !== t ? "string" == typeof t ? Cr.now() + parseFloat(t) : t : Cr.now(), this._startTime += this._delayTime, this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat), this
        }, t.prototype._setupProperties = function (t, n, e, r) {
            for (var i in e) {
                var o = t[i], a = Array.isArray(o), u = a ? "array" : typeof o, s = !a && Array.isArray(e[i]);
                if ("undefined" !== u && "function" !== u) {
                    if (s) {
                        var l = e[i];
                        if (0 === l.length) continue;
                        l = l.map(this._handleRelativeValue.bind(this, o)), e[i] = [o].concat(l)
                    }
                    if ("object" !== u && !a || !o || s) void 0 === n[i] && (n[i] = o), a || (n[i] *= 1), r[i] = s ? e[i].slice().reverse() : n[i] || 0; else {
                        for (var c in n[i] = a ? [] : {}, o) n[i][c] = o[c];
                        r[i] = a ? [] : {}, this._setupProperties(o, n[i], e[i], r[i])
                    }
                }
            }
        }, t.prototype.stop = function () {
            return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this
        }, t.prototype.end = function () {
            return this.update(1 / 0), this
        }, t.prototype.pause = function (t) {
            return this._isPaused || !this._isPlaying || (this._isPaused = !0, this._pauseStart = void 0 === t ? Cr.now() : t, this._group.remove(this)), this
        }, t.prototype.resume = function (t) {
            return this._isPaused && this._isPlaying ? (this._isPaused = !1, this._startTime += (void 0 === t ? Cr.now() : t) - this._pauseStart, this._pauseStart = 0, this._group.add(this), this) : this
        }, t.prototype.stopChainedTweens = function () {
            for (var t = 0, n = this._chainedTweens.length; t < n; t++) this._chainedTweens[t].stop();
            return this
        }, t.prototype.group = function (t) {
            return this._group = t, this
        }, t.prototype.delay = function (t) {
            return this._delayTime = t, this
        }, t.prototype.repeat = function (t) {
            return this._initialRepeat = t, this._repeat = t, this
        }, t.prototype.repeatDelay = function (t) {
            return this._repeatDelayTime = t, this
        }, t.prototype.yoyo = function (t) {
            return this._yoyo = t, this
        }, t.prototype.easing = function (t) {
            return this._easingFunction = t, this
        }, t.prototype.interpolation = function (t) {
            return this._interpolationFunction = t, this
        }, t.prototype.chain = function () {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            return this._chainedTweens = t, this
        }, t.prototype.onStart = function (t) {
            return this._onStartCallback = t, this
        }, t.prototype.onUpdate = function (t) {
            return this._onUpdateCallback = t, this
        }, t.prototype.onRepeat = function (t) {
            return this._onRepeatCallback = t, this
        }, t.prototype.onComplete = function (t) {
            return this._onCompleteCallback = t, this
        }, t.prototype.onStop = function (t) {
            return this._onStopCallback = t, this
        }, t.prototype.update = function (t) {
            var n, e;
            if (t > this._startTime + this._duration && !this._isPlaying) return !1;
            if (this.isPlaying || this.start(t), t < this._startTime) return !0;
            !1 === this._onStartCallbackFired && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), e = (t - this._startTime) / this._duration, e = 0 === this._duration || e > 1 ? 1 : e;
            var r = this._easingFunction(e);
            if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, r), this._onUpdateCallback && this._onUpdateCallback(this._object, e), 1 === e) {
                if (this._repeat > 0) {
                    for (n in isFinite(this._repeat) && this._repeat--, this._valuesStartRepeat) this._yoyo || "string" != typeof this._valuesEnd[n] || (this._valuesStartRepeat[n] = this._valuesStartRepeat[n] + parseFloat(this._valuesEnd[n])), this._yoyo && this._swapEndStartRepeatValues(n), this._valuesStart[n] = this._valuesStartRepeat[n];
                    return this._yoyo && (this._reversed = !this._reversed), void 0 !== this._repeatDelayTime ? this._startTime = t + this._repeatDelayTime : this._startTime = t + this._delayTime, this._onRepeatCallback && this._onRepeatCallback(this._object), !0
                }
                this._onCompleteCallback && this._onCompleteCallback(this._object);
                for (var i = 0, o = this._chainedTweens.length; i < o; i++) this._chainedTweens[i].start(this._startTime + this._duration);
                return this._isPlaying = !1, !1
            }
            return !0
        }, t.prototype._updateProperties = function (t, n, e, r) {
            for (var i in e) if (void 0 !== n[i]) {
                var o = n[i] || 0, a = e[i], u = Array.isArray(t[i]), s = Array.isArray(a);
                !u && s ? t[i] = this._interpolationFunction(a, r) : "object" == typeof a && a ? this._updateProperties(t[i], o, a, r) : "number" == typeof (a = this._handleRelativeValue(o, a)) && (t[i] = o + (a - o) * r)
            }
        }, t.prototype._handleRelativeValue = function (t, n) {
            return "string" != typeof n ? n : "+" === n.charAt(0) || "-" === n.charAt(0) ? t + parseFloat(n) : parseFloat(n)
        }, t.prototype._swapEndStartRepeatValues = function (t) {
            var n = this._valuesStartRepeat[t];
            "string" == typeof this._valuesEnd[t] ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(this._valuesEnd[t]) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = n
        }, t
    }(), Nr = (br = function (t, n) {
        return (br = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, n) {
            t.__proto__ = n
        } || function (t, n) {
            for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e])
        })(t, n)
    }, function (t, n) {
        function e() {
            this.constructor = t
        }

        br(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e)
    }), Cr = new (function (t) {
        function n() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.version = "18.6.0", n.now = kr, n.Group = zr, n.Easing = Ar, n.Interpolation = Mr, n.nextId = Sr.nextId, n.Tween = Er, n
        }

        return Nr(n, t), n
    }(zr));

    function Or(t, n, e) {
        var r, i, o, a, u;

        function s() {
            var l = Date.now() - a;
            l < n && l >= 0 ? r = setTimeout(s, n - l) : (r = null, e || (u = t.apply(o, i), o = i = null))
        }

        null == n && (n = 100);
        var l = function () {
            o = this, i = arguments, a = Date.now();
            var l = e && !r;
            return r || (r = setTimeout(s, n)), l && (u = t.apply(o, i), o = i = null), u
        };
        return l.clear = function () {
            r && (clearTimeout(r), r = null)
        }, l.flush = function () {
            r && (u = t.apply(o, i), o = i = null, clearTimeout(r), r = null)
        }, l
    }

    Or.debounce = Or;
    var Pr = Or;

    function Tr(t, n) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, n) {
            if (!(Symbol.iterator in Object(t)) && "[object Arguments]" !== Object.prototype.toString.call(t)) return;
            var e = [], r = !0, i = !1, o = void 0;
            try {
                for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (e.push(a.value), !n || e.length !== n); r = !0) ;
            } catch (t) {
                i = !0, o = t
            } finally {
                try {
                    r || null == u.return || u.return()
                } finally {
                    if (i) throw o
                }
            }
            return e
        }(t, n) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    var jr = function t(n, e) {
        var r = e.default, i = void 0 === r ? null : r, o = e.triggerUpdate, a = void 0 === o || o, u = e.onChange,
            s = void 0 === u ? function (t, n) {
            } : u;
        !function (t, n) {
            if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
        }(this, t), this.name = n, this.defaultVal = i, this.triggerUpdate = a, this.onChange = s
    };

    function Rr(t) {
        var n = t.stateInit, e = void 0 === n ? function () {
                return {}
            } : n, r = t.props, i = void 0 === r ? {} : r, o = t.methods, a = void 0 === o ? {} : o, u = t.aliases,
            s = void 0 === u ? {} : u, l = t.init, c = void 0 === l ? function () {
            } : l, h = t.update, f = void 0 === h ? function () {
            } : h, p = Object.keys(i).map((function (t) {
                return new jr(t, i[t])
            }));
        return function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = Object.assign({}, e instanceof Function ? e(t) : e, {initialised: !1}), r = {};

            function i(n) {
                return o(n, t), u(), i
            }

            var o = function (t, e) {
                c.call(i, t, n, e), n.initialised = !0
            }, u = Pr((function () {
                n.initialised && (f.call(i, n, r), r = {})
            }), 1);
            return p.forEach((function (t) {
                i[t.name] = function (t) {
                    var e = t.name, o = t.triggerUpdate, a = void 0 !== o && o, s = t.onChange,
                        l = void 0 === s ? function (t, n) {
                        } : s, c = t.defaultVal, h = void 0 === c ? null : c;
                    return function (t) {
                        var o = n[e];
                        if (!arguments.length) return o;
                        var s = void 0 === t ? h : t;
                        return n[e] = s, l.call(i, s, n, o), !r.hasOwnProperty(e) && (r[e] = o), a && u(), i
                    }
                }(t)
            })), Object.keys(a).forEach((function (t) {
                i[t] = function () {
                    for (var e, r = arguments.length, o = new Array(r), u = 0; u < r; u++) o[u] = arguments[u];
                    return (e = a[t]).call.apply(e, [i, n].concat(o))
                }
            })), Object.entries(s).forEach((function (t) {
                var n = Tr(t, 2), e = n[0], r = n[1];
                return i[e] = i[r]
            })), i.resetProps = function () {
                return p.forEach((function (t) {
                    i[t.name](t.defaultVal)
                })), i
            }, i.resetProps(), n._rerender = u, i
        }
    }

    var Dr = function (t) {
        return t instanceof Function ? t : "string" == typeof t ? function (n) {
            return n[t]
        } : function (n) {
            return t
        }
    }, Ir = ir((function (t) {
        !function (n) {
            var e = /^\s+/, r = /\s+$/, i = 0, o = n.round, a = n.min, u = n.max, s = n.random;

            function l(t, s) {
                if (s = s || {}, (t = t || "") instanceof l) return t;
                if (!(this instanceof l)) return new l(t, s);
                var c = function (t) {
                    var i = {r: 0, g: 0, b: 0}, o = 1, s = null, l = null, c = null, h = !1, f = !1;
                    "string" == typeof t && (t = function (t) {
                        t = t.replace(e, "").replace(r, "").toLowerCase();
                        var n, i = !1;
                        if (S[t]) t = S[t], i = !0; else if ("transparent" == t) return {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 0,
                            format: "name"
                        };
                        if (n = L.rgb.exec(t)) return {r: n[1], g: n[2], b: n[3]};
                        if (n = L.rgba.exec(t)) return {r: n[1], g: n[2], b: n[3], a: n[4]};
                        if (n = L.hsl.exec(t)) return {h: n[1], s: n[2], l: n[3]};
                        if (n = L.hsla.exec(t)) return {h: n[1], s: n[2], l: n[3], a: n[4]};
                        if (n = L.hsv.exec(t)) return {h: n[1], s: n[2], v: n[3]};
                        if (n = L.hsva.exec(t)) return {h: n[1], s: n[2], v: n[3], a: n[4]};
                        if (n = L.hex8.exec(t)) return {
                            r: P(n[1]),
                            g: P(n[2]),
                            b: P(n[3]),
                            a: D(n[4]),
                            format: i ? "name" : "hex8"
                        };
                        if (n = L.hex6.exec(t)) return {r: P(n[1]), g: P(n[2]), b: P(n[3]), format: i ? "name" : "hex"};
                        if (n = L.hex4.exec(t)) return {
                            r: P(n[1] + "" + n[1]),
                            g: P(n[2] + "" + n[2]),
                            b: P(n[3] + "" + n[3]),
                            a: D(n[4] + "" + n[4]),
                            format: i ? "name" : "hex8"
                        };
                        if (n = L.hex3.exec(t)) return {
                            r: P(n[1] + "" + n[1]),
                            g: P(n[2] + "" + n[2]),
                            b: P(n[3] + "" + n[3]),
                            format: i ? "name" : "hex"
                        };
                        return !1
                    }(t));
                    "object" == typeof t && (q(t.r) && q(t.g) && q(t.b) ? (p = t.r, d = t.g, g = t.b, i = {
                        r: 255 * C(p, 255),
                        g: 255 * C(d, 255),
                        b: 255 * C(g, 255)
                    }, h = !0, f = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : q(t.h) && q(t.s) && q(t.v) ? (s = j(t.s), l = j(t.v), i = function (t, e, r) {
                        t = 6 * C(t, 360), e = C(e, 100), r = C(r, 100);
                        var i = n.floor(t), o = t - i, a = r * (1 - e), u = r * (1 - o * e), s = r * (1 - (1 - o) * e),
                            l = i % 6;
                        return {
                            r: 255 * [r, u, a, a, s, r][l],
                            g: 255 * [s, r, r, u, a, a][l],
                            b: 255 * [a, a, s, r, r, u][l]
                        }
                    }(t.h, s, l), h = !0, f = "hsv") : q(t.h) && q(t.s) && q(t.l) && (s = j(t.s), c = j(t.l), i = function (t, n, e) {
                        var r, i, o;

                        function a(t, n, e) {
                            return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? t + 6 * (n - t) * e : e < .5 ? n : e < 2 / 3 ? t + (n - t) * (2 / 3 - e) * 6 : t
                        }

                        if (t = C(t, 360), n = C(n, 100), e = C(e, 100), 0 === n) r = i = o = e; else {
                            var u = e < .5 ? e * (1 + n) : e + n - e * n, s = 2 * e - u;
                            r = a(s, u, t + 1 / 3), i = a(s, u, t), o = a(s, u, t - 1 / 3)
                        }
                        return {r: 255 * r, g: 255 * i, b: 255 * o}
                    }(t.h, s, c), h = !0, f = "hsl"), t.hasOwnProperty("a") && (o = t.a));
                    var p, d, g;
                    return o = N(o), {
                        ok: h,
                        format: t.format || f,
                        r: a(255, u(i.r, 0)),
                        g: a(255, u(i.g, 0)),
                        b: a(255, u(i.b, 0)),
                        a: o
                    }
                }(t);
                this._originalInput = t, this._r = c.r, this._g = c.g, this._b = c.b, this._a = c.a, this._roundA = o(100 * this._a) / 100, this._format = s.format || c.format, this._gradientType = s.gradientType, this._r < 1 && (this._r = o(this._r)), this._g < 1 && (this._g = o(this._g)), this._b < 1 && (this._b = o(this._b)), this._ok = c.ok, this._tc_id = i++
            }

            function c(t, n, e) {
                t = C(t, 255), n = C(n, 255), e = C(e, 255);
                var r, i, o = u(t, n, e), s = a(t, n, e), l = (o + s) / 2;
                if (o == s) r = i = 0; else {
                    var c = o - s;
                    switch (i = l > .5 ? c / (2 - o - s) : c / (o + s), o) {
                        case t:
                            r = (n - e) / c + (n < e ? 6 : 0);
                            break;
                        case n:
                            r = (e - t) / c + 2;
                            break;
                        case e:
                            r = (t - n) / c + 4
                    }
                    r /= 6
                }
                return {h: r, s: i, l: l}
            }

            function h(t, n, e) {
                t = C(t, 255), n = C(n, 255), e = C(e, 255);
                var r, i, o = u(t, n, e), s = a(t, n, e), l = o, c = o - s;
                if (i = 0 === o ? 0 : c / o, o == s) r = 0; else {
                    switch (o) {
                        case t:
                            r = (n - e) / c + (n < e ? 6 : 0);
                            break;
                        case n:
                            r = (e - t) / c + 2;
                            break;
                        case e:
                            r = (t - n) / c + 4
                    }
                    r /= 6
                }
                return {h: r, s: i, v: l}
            }

            function f(t, n, e, r) {
                var i = [T(o(t).toString(16)), T(o(n).toString(16)), T(o(e).toString(16))];
                return r && i[0].charAt(0) == i[0].charAt(1) && i[1].charAt(0) == i[1].charAt(1) && i[2].charAt(0) == i[2].charAt(1) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("")
            }

            function p(t, n, e, r) {
                return [T(R(r)), T(o(t).toString(16)), T(o(n).toString(16)), T(o(e).toString(16))].join("")
            }

            function d(t, n) {
                n = 0 === n ? 0 : n || 10;
                var e = l(t).toHsl();
                return e.s -= n / 100, e.s = O(e.s), l(e)
            }

            function g(t, n) {
                n = 0 === n ? 0 : n || 10;
                var e = l(t).toHsl();
                return e.s += n / 100, e.s = O(e.s), l(e)
            }

            function y(t) {
                return l(t).desaturate(100)
            }

            function v(t, n) {
                n = 0 === n ? 0 : n || 10;
                var e = l(t).toHsl();
                return e.l += n / 100, e.l = O(e.l), l(e)
            }

            function _(t, n) {
                n = 0 === n ? 0 : n || 10;
                var e = l(t).toRgb();
                return e.r = u(0, a(255, e.r - o(-n / 100 * 255))), e.g = u(0, a(255, e.g - o(-n / 100 * 255))), e.b = u(0, a(255, e.b - o(-n / 100 * 255))), l(e)
            }

            function m(t, n) {
                n = 0 === n ? 0 : n || 10;
                var e = l(t).toHsl();
                return e.l -= n / 100, e.l = O(e.l), l(e)
            }

            function x(t, n) {
                var e = l(t).toHsl(), r = (e.h + n) % 360;
                return e.h = r < 0 ? 360 + r : r, l(e)
            }

            function b(t) {
                var n = l(t).toHsl();
                return n.h = (n.h + 180) % 360, l(n)
            }

            function w(t) {
                var n = l(t).toHsl(), e = n.h;
                return [l(t), l({h: (e + 120) % 360, s: n.s, l: n.l}), l({h: (e + 240) % 360, s: n.s, l: n.l})]
            }

            function k(t) {
                var n = l(t).toHsl(), e = n.h;
                return [l(t), l({h: (e + 90) % 360, s: n.s, l: n.l}), l({
                    h: (e + 180) % 360,
                    s: n.s,
                    l: n.l
                }), l({h: (e + 270) % 360, s: n.s, l: n.l})]
            }

            function z(t) {
                var n = l(t).toHsl(), e = n.h;
                return [l(t), l({h: (e + 72) % 360, s: n.s, l: n.l}), l({h: (e + 216) % 360, s: n.s, l: n.l})]
            }

            function A(t, n, e) {
                n = n || 6, e = e || 30;
                var r = l(t).toHsl(), i = 360 / e, o = [l(t)];
                for (r.h = (r.h - (i * n >> 1) + 720) % 360; --n;) r.h = (r.h + i) % 360, o.push(l(r));
                return o
            }

            function M(t, n) {
                n = n || 6;
                for (var e = l(t).toHsv(), r = e.h, i = e.s, o = e.v, a = [], u = 1 / n; n--;) a.push(l({
                    h: r,
                    s: i,
                    v: o
                })), o = (o + u) % 1;
                return a
            }

            l.prototype = {
                isDark: function () {
                    return this.getBrightness() < 128
                }, isLight: function () {
                    return !this.isDark()
                }, isValid: function () {
                    return this._ok
                }, getOriginalInput: function () {
                    return this._originalInput
                }, getFormat: function () {
                    return this._format
                }, getAlpha: function () {
                    return this._a
                }, getBrightness: function () {
                    var t = this.toRgb();
                    return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
                }, getLuminance: function () {
                    var t, e, r, i = this.toRgb();
                    return t = i.r / 255, e = i.g / 255, r = i.b / 255, .2126 * (t <= .03928 ? t / 12.92 : n.pow((t + .055) / 1.055, 2.4)) + .7152 * (e <= .03928 ? e / 12.92 : n.pow((e + .055) / 1.055, 2.4)) + .0722 * (r <= .03928 ? r / 12.92 : n.pow((r + .055) / 1.055, 2.4))
                }, setAlpha: function (t) {
                    return this._a = N(t), this._roundA = o(100 * this._a) / 100, this
                }, toHsv: function () {
                    var t = h(this._r, this._g, this._b);
                    return {h: 360 * t.h, s: t.s, v: t.v, a: this._a}
                }, toHsvString: function () {
                    var t = h(this._r, this._g, this._b), n = o(360 * t.h), e = o(100 * t.s), r = o(100 * t.v);
                    return 1 == this._a ? "hsv(" + n + ", " + e + "%, " + r + "%)" : "hsva(" + n + ", " + e + "%, " + r + "%, " + this._roundA + ")"
                }, toHsl: function () {
                    var t = c(this._r, this._g, this._b);
                    return {h: 360 * t.h, s: t.s, l: t.l, a: this._a}
                }, toHslString: function () {
                    var t = c(this._r, this._g, this._b), n = o(360 * t.h), e = o(100 * t.s), r = o(100 * t.l);
                    return 1 == this._a ? "hsl(" + n + ", " + e + "%, " + r + "%)" : "hsla(" + n + ", " + e + "%, " + r + "%, " + this._roundA + ")"
                }, toHex: function (t) {
                    return f(this._r, this._g, this._b, t)
                }, toHexString: function (t) {
                    return "#" + this.toHex(t)
                }, toHex8: function (t) {
                    return function (t, n, e, r, i) {
                        var a = [T(o(t).toString(16)), T(o(n).toString(16)), T(o(e).toString(16)), T(R(r))];
                        if (i && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) && a[3].charAt(0) == a[3].charAt(1)) return a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) + a[3].charAt(0);
                        return a.join("")
                    }(this._r, this._g, this._b, this._a, t)
                }, toHex8String: function (t) {
                    return "#" + this.toHex8(t)
                }, toRgb: function () {
                    return {r: o(this._r), g: o(this._g), b: o(this._b), a: this._a}
                }, toRgbString: function () {
                    return 1 == this._a ? "rgb(" + o(this._r) + ", " + o(this._g) + ", " + o(this._b) + ")" : "rgba(" + o(this._r) + ", " + o(this._g) + ", " + o(this._b) + ", " + this._roundA + ")"
                }, toPercentageRgb: function () {
                    return {
                        r: o(100 * C(this._r, 255)) + "%",
                        g: o(100 * C(this._g, 255)) + "%",
                        b: o(100 * C(this._b, 255)) + "%",
                        a: this._a
                    }
                }, toPercentageRgbString: function () {
                    return 1 == this._a ? "rgb(" + o(100 * C(this._r, 255)) + "%, " + o(100 * C(this._g, 255)) + "%, " + o(100 * C(this._b, 255)) + "%)" : "rgba(" + o(100 * C(this._r, 255)) + "%, " + o(100 * C(this._g, 255)) + "%, " + o(100 * C(this._b, 255)) + "%, " + this._roundA + ")"
                }, toName: function () {
                    return 0 === this._a ? "transparent" : !(this._a < 1) && (E[f(this._r, this._g, this._b, !0)] || !1)
                }, toFilter: function (t) {
                    var n = "#" + p(this._r, this._g, this._b, this._a), e = n,
                        r = this._gradientType ? "GradientType = 1, " : "";
                    if (t) {
                        var i = l(t);
                        e = "#" + p(i._r, i._g, i._b, i._a)
                    }
                    return "progid:DXImageTransform.Microsoft.gradient(" + r + "startColorstr=" + n + ",endColorstr=" + e + ")"
                }, toString: function (t) {
                    var n = !!t;
                    t = t || this._format;
                    var e = !1, r = this._a < 1 && this._a >= 0;
                    return n || !r || "hex" !== t && "hex6" !== t && "hex3" !== t && "hex4" !== t && "hex8" !== t && "name" !== t ? ("rgb" === t && (e = this.toRgbString()), "prgb" === t && (e = this.toPercentageRgbString()), "hex" !== t && "hex6" !== t || (e = this.toHexString()), "hex3" === t && (e = this.toHexString(!0)), "hex4" === t && (e = this.toHex8String(!0)), "hex8" === t && (e = this.toHex8String()), "name" === t && (e = this.toName()), "hsl" === t && (e = this.toHslString()), "hsv" === t && (e = this.toHsvString()), e || this.toHexString()) : "name" === t && 0 === this._a ? this.toName() : this.toRgbString()
                }, clone: function () {
                    return l(this.toString())
                }, _applyModification: function (t, n) {
                    var e = t.apply(null, [this].concat([].slice.call(n)));
                    return this._r = e._r, this._g = e._g, this._b = e._b, this.setAlpha(e._a), this
                }, lighten: function () {
                    return this._applyModification(v, arguments)
                }, brighten: function () {
                    return this._applyModification(_, arguments)
                }, darken: function () {
                    return this._applyModification(m, arguments)
                }, desaturate: function () {
                    return this._applyModification(d, arguments)
                }, saturate: function () {
                    return this._applyModification(g, arguments)
                }, greyscale: function () {
                    return this._applyModification(y, arguments)
                }, spin: function () {
                    return this._applyModification(x, arguments)
                }, _applyCombination: function (t, n) {
                    return t.apply(null, [this].concat([].slice.call(n)))
                }, analogous: function () {
                    return this._applyCombination(A, arguments)
                }, complement: function () {
                    return this._applyCombination(b, arguments)
                }, monochromatic: function () {
                    return this._applyCombination(M, arguments)
                }, splitcomplement: function () {
                    return this._applyCombination(z, arguments)
                }, triad: function () {
                    return this._applyCombination(w, arguments)
                }, tetrad: function () {
                    return this._applyCombination(k, arguments)
                }
            }, l.fromRatio = function (t, n) {
                if ("object" == typeof t) {
                    var e = {};
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = "a" === r ? t[r] : j(t[r]));
                    t = e
                }
                return l(t, n)
            }, l.equals = function (t, n) {
                return !(!t || !n) && l(t).toRgbString() == l(n).toRgbString()
            }, l.random = function () {
                return l.fromRatio({r: s(), g: s(), b: s()})
            }, l.mix = function (t, n, e) {
                e = 0 === e ? 0 : e || 50;
                var r = l(t).toRgb(), i = l(n).toRgb(), o = e / 100;
                return l({
                    r: (i.r - r.r) * o + r.r,
                    g: (i.g - r.g) * o + r.g,
                    b: (i.b - r.b) * o + r.b,
                    a: (i.a - r.a) * o + r.a
                })
            },
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
                l.readability = function (t, e) {
                    var r = l(t), i = l(e);
                    return (n.max(r.getLuminance(), i.getLuminance()) + .05) / (n.min(r.getLuminance(), i.getLuminance()) + .05)
                }, l.isReadable = function (t, n, e) {
                var r, i, o = l.readability(t, n);
                switch (i = !1, (r = function (t) {
                    var n, e;
                    n = ((t = t || {
                        level: "AA",
                        size: "small"
                    }).level || "AA").toUpperCase(), e = (t.size || "small").toLowerCase(), "AA" !== n && "AAA" !== n && (n = "AA");
                    "small" !== e && "large" !== e && (e = "small");
                    return {level: n, size: e}
                }(e)).level + r.size) {
                    case"AAsmall":
                    case"AAAlarge":
                        i = o >= 4.5;
                        break;
                    case"AAlarge":
                        i = o >= 3;
                        break;
                    case"AAAsmall":
                        i = o >= 7
                }
                return i
            }, l.mostReadable = function (t, n, e) {
                var r, i, o, a, u = null, s = 0;
                i = (e = e || {}).includeFallbackColors, o = e.level, a = e.size;
                for (var c = 0; c < n.length; c++) (r = l.readability(t, n[c])) > s && (s = r, u = l(n[c]));
                return l.isReadable(t, u, {
                    level: o,
                    size: a
                }) || !i ? u : (e.includeFallbackColors = !1, l.mostReadable(t, ["#fff", "#000"], e))
            };
            var S = l.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            }, E = l.hexNames = function (t) {
                var n = {};
                for (var e in t) t.hasOwnProperty(e) && (n[t[e]] = e);
                return n
            }(S);

            function N(t) {
                return t = parseFloat(t), (isNaN(t) || t < 0 || t > 1) && (t = 1), t
            }

            function C(t, e) {
                (function (t) {
                    return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
                })(t) && (t = "100%");
                var r = function (t) {
                    return "string" == typeof t && -1 != t.indexOf("%")
                }(t);
                return t = a(e, u(0, parseFloat(t))), r && (t = parseInt(t * e, 10) / 100), n.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e)
            }

            function O(t) {
                return a(1, u(0, t))
            }

            function P(t) {
                return parseInt(t, 16)
            }

            function T(t) {
                return 1 == t.length ? "0" + t : "" + t
            }

            function j(t) {
                return t <= 1 && (t = 100 * t + "%"), t
            }

            function R(t) {
                return n.round(255 * parseFloat(t)).toString(16)
            }

            function D(t) {
                return P(t) / 255
            }

            var I, U, F,
                L = (U = "[\\s|\\(]+(" + (I = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")\\s*\\)?", F = "[\\s|\\(]+(" + I + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")[,|\\s]+(" + I + ")\\s*\\)?", {
                    CSS_UNIT: new RegExp(I),
                    rgb: new RegExp("rgb" + U),
                    rgba: new RegExp("rgba" + F),
                    hsl: new RegExp("hsl" + U),
                    hsla: new RegExp("hsla" + F),
                    hsv: new RegExp("hsv" + U),
                    hsva: new RegExp("hsva" + F),
                    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                });

            function q(t) {
                return !!L.CSS_UNIT.exec(t)
            }

            t.exports ? t.exports = l : window.tinycolor = l
        }(Math)
    }));

    function Ur(t, n) {
        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
    }

    function Fr(t, n) {
        for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function Lr(t) {
        return function (t) {
            if (Array.isArray(t)) {
                for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];
                return e
            }
        }(t) || function (t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    var qr = function (t, n, e) {
        return (t << 16) + (n << 8) + e
    }, Br = function (t, n) {
        return 123 * t % Math.pow(2, n)
    }, Hr = function () {
        function t() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 6;
            Ur(this, t), this.csBits = n, this.registry = ["__reserved for background__"]
        }

        var n, e, r;
        return n = t, (e = [{
            key: "register", value: function (t) {
                if (this.registry.length >= Math.pow(2, 24 - this.csBits)) return null;
                var n, e = this.registry.length, r = Br(e, this.csBits),
                    i = (n = e + (r << 24 - this.csBits), "#".concat(Math.min(n, Math.pow(2, 24)).toString(16).padStart(6, "0")));
                return this.registry.push(t), i
            }
        }, {
            key: "lookup", value: function (t) {
                var n, e, r, i,
                    o = "string" == typeof t ? (n = Ir(t).toRgb(), e = n.r, r = n.g, i = n.b, qr(e, r, i)) : qr.apply(void 0, Lr(t));
                if (!o) return null;
                var a = o & Math.pow(2, 24 - this.csBits) - 1, u = o >> 24 - this.csBits & Math.pow(2, this.csBits) - 1;
                return Br(a, this.csBits) !== u || a >= this.registry.length ? null : this.registry[a]
            }
        }]) && Fr(n.prototype, e), r && Fr(n, r), t
    }();

    function Vr(t, n, e) {
        var r;

        function i() {
            var i, o, a = r.length, u = 0, s = 0, l = 0;
            for (i = 0; i < a; ++i) u += (o = r[i]).x || 0, s += o.y || 0, l += o.z || 0;
            for (u = u / a - t, s = s / a - n, l = l / a - e, i = 0; i < a; ++i) o = r[i], u && (o.x -= u), s && (o.y -= s), l && (o.z -= l)
        }

        return null == t && (t = 0), null == n && (n = 0), null == e && (e = 0), i.initialize = function (t) {
            r = t
        }, i.x = function (n) {
            return arguments.length ? (t = +n, i) : t
        }, i.y = function (t) {
            return arguments.length ? (n = +t, i) : n
        }, i.z = function (t) {
            return arguments.length ? (e = +t, i) : e
        }, i
    }

    function Xr(t, n, e) {
        if (isNaN(n)) return t;
        var r, i, o, a, u, s, l = t._root, c = {data: e}, h = t._x0, f = t._x1;
        if (!l) return t._root = c, t;
        for (; l.length;) if ((a = n >= (i = (h + f) / 2)) ? h = i : f = i, r = l, !(l = l[u = +a])) return r[u] = c, t;
        if (n === (o = +t._x.call(null, l.data))) return c.next = l, r ? r[u] = c : t._root = c, t;
        do {
            r = r ? r[u] = new Array(2) : t._root = new Array(2), (a = n >= (i = (h + f) / 2)) ? h = i : f = i
        } while ((u = +a) == (s = +(o >= i)));
        return r[s] = l, r[u] = c, t
    }

    function Gr(t, n, e) {
        this.node = t, this.x0 = n, this.x1 = e
    }

    function Yr(t) {
        return t[0]
    }

    function $r(t, n) {
        var e = new Wr(null == n ? Yr : n, NaN, NaN);
        return null == t ? e : e.addAll(t)
    }

    function Wr(t, n, e) {
        this._x = t, this._x0 = n, this._x1 = e, this._root = void 0
    }

    function Zr(t) {
        for (var n = {data: t.data}, e = n; t = t.next;) e = e.next = {data: t.data};
        return n
    }

    var Qr = $r.prototype = Wr.prototype;

    function Jr(t, n, e, r) {
        if (isNaN(n) || isNaN(e)) return t;
        var i, o, a, u, s, l, c, h, f, p = t._root, d = {data: r}, g = t._x0, y = t._y0, v = t._x1, _ = t._y1;
        if (!p) return t._root = d, t;
        for (; p.length;) if ((l = n >= (o = (g + v) / 2)) ? g = o : v = o, (c = e >= (a = (y + _) / 2)) ? y = a : _ = a, i = p, !(p = p[h = c << 1 | l])) return i[h] = d, t;
        if (u = +t._x.call(null, p.data), s = +t._y.call(null, p.data), n === u && e === s) return d.next = p, i ? i[h] = d : t._root = d, t;
        do {
            i = i ? i[h] = new Array(4) : t._root = new Array(4), (l = n >= (o = (g + v) / 2)) ? g = o : v = o, (c = e >= (a = (y + _) / 2)) ? y = a : _ = a
        } while ((h = c << 1 | l) == (f = (s >= a) << 1 | u >= o));
        return i[f] = p, i[h] = d, t
    }

    function Kr(t, n, e, r, i) {
        this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i
    }

    function ti(t) {
        return t[0]
    }

    function ni(t) {
        return t[1]
    }

    function ei(t, n, e) {
        var r = new ri(null == n ? ti : n, null == e ? ni : e, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t)
    }

    function ri(t, n, e, r, i, o) {
        this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0
    }

    function ii(t) {
        for (var n = {data: t.data}, e = n; t = t.next;) e = e.next = {data: t.data};
        return n
    }

    Qr.copy = function () {
        var t, n, e = new Wr(this._x, this._x0, this._x1), r = this._root;
        if (!r) return e;
        if (!r.length) return e._root = Zr(r), e;
        for (t = [{
            source: r,
            target: e._root = new Array(2)
        }]; r = t.pop();) for (var i = 0; i < 2; ++i) (n = r.source[i]) && (n.length ? t.push({
            source: n,
            target: r.target[i] = new Array(2)
        }) : r.target[i] = Zr(n));
        return e
    }, Qr.add = function (t) {
        var n = +this._x.call(null, t);
        return Xr(this.cover(n), n, t)
    }, Qr.addAll = function (t) {
        var n, e, r = t.length, i = new Array(r), o = 1 / 0, a = -1 / 0;
        for (n = 0; n < r; ++n) isNaN(e = +this._x.call(null, t[n])) || (i[n] = e, e < o && (o = e), e > a && (a = e));
        for (a < o && (o = this._x0, a = this._x1), this.cover(o).cover(a), n = 0; n < r; ++n) Xr(this, i[n], t[n]);
        return this
    }, Qr.cover = function (t) {
        if (isNaN(t = +t)) return this;
        var n = this._x0, e = this._x1;
        if (isNaN(n)) e = (n = Math.floor(t)) + 1; else {
            if (!(n > t || t > e)) return this;
            var r, i, o = e - n, a = this._root;
            switch (i = +(t < (n + e) / 2)) {
                case 0:
                    do {
                        (r = new Array(2))[i] = a, a = r
                    } while (t > (e = n + (o *= 2)));
                    break;
                case 1:
                    do {
                        (r = new Array(2))[i] = a, a = r
                    } while ((n = e - (o *= 2)) > t)
            }
            this._root && this._root.length && (this._root = a)
        }
        return this._x0 = n, this._x1 = e, this
    }, Qr.data = function () {
        var t = [];
        return this.visit((function (n) {
            if (!n.length) do {
                t.push(n.data)
            } while (n = n.next)
        })), t
    }, Qr.extent = function (t) {
        return arguments.length ? this.cover(+t[0][0]).cover(+t[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]]
    }, Qr.find = function (t, n) {
        var e, r, i, o, a, u = this._x0, s = this._x1, l = [], c = this._root;
        for (c && l.push(new Gr(c, u, s)), null == n ? n = 1 / 0 : (u = t - n, s = t + n); o = l.pop();) if (!(!(c = o.node) || (r = o.x0) > s || (i = o.x1) < u)) if (c.length) {
            var h = (r + i) / 2;
            l.push(new Gr(c[1], h, i), new Gr(c[0], r, h)), (a = +(t >= h)) && (o = l[l.length - 1], l[l.length - 1] = l[l.length - 1 - a], l[l.length - 1 - a] = o)
        } else {
            var f = Math.abs(t - +this._x.call(null, c.data));
            f < n && (n = f, u = t - f, s = t + f, e = c.data)
        }
        return e
    }, Qr.remove = function (t) {
        if (isNaN(o = +this._x.call(null, t))) return this;
        var n, e, r, i, o, a, u, s, l, c = this._root, h = this._x0, f = this._x1;
        if (!c) return this;
        if (c.length) for (; ;) {
            if ((u = o >= (a = (h + f) / 2)) ? h = a : f = a, n = c, !(c = c[s = +u])) return this;
            if (!c.length) break;
            n[s + 1 & 1] && (e = n, l = s)
        }
        for (; c.data !== t;) if (r = c, !(c = c.next)) return this;
        return (i = c.next) && delete c.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[s] = i : delete n[s], (c = n[0] || n[1]) && c === (n[1] || n[0]) && !c.length && (e ? e[l] = c : this._root = c), this) : (this._root = i, this)
    }, Qr.removeAll = function (t) {
        for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
        return this
    }, Qr.root = function () {
        return this._root
    }, Qr.size = function () {
        var t = 0;
        return this.visit((function (n) {
            if (!n.length) do {
                ++t
            } while (n = n.next)
        })), t
    }, Qr.visit = function (t) {
        var n, e, r, i, o = [], a = this._root;
        for (a && o.push(new Gr(a, this._x0, this._x1)); n = o.pop();) if (!t(a = n.node, r = n.x0, i = n.x1) && a.length) {
            var u = (r + i) / 2;
            (e = a[1]) && o.push(new Gr(e, u, i)), (e = a[0]) && o.push(new Gr(e, r, u))
        }
        return this
    }, Qr.visitAfter = function (t) {
        var n, e = [], r = [];
        for (this._root && e.push(new Gr(this._root, this._x0, this._x1)); n = e.pop();) {
            var i = n.node;
            if (i.length) {
                var o, a = n.x0, u = n.x1, s = (a + u) / 2;
                (o = i[0]) && e.push(new Gr(o, a, s)), (o = i[1]) && e.push(new Gr(o, s, u))
            }
            r.push(n)
        }
        for (; n = r.pop();) t(n.node, n.x0, n.x1);
        return this
    }, Qr.x = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    };
    var oi = ei.prototype = ri.prototype;

    function ai(t, n, e, r, i) {
        if (isNaN(n) || isNaN(e) || isNaN(r)) return t;
        var o, a, u, s, l, c, h, f, p, d, g, y, v = t._root, _ = {data: i}, m = t._x0, x = t._y0, b = t._z0, w = t._x1,
            k = t._y1, z = t._z1;
        if (!v) return t._root = _, t;
        for (; v.length;) if ((f = n >= (a = (m + w) / 2)) ? m = a : w = a, (p = e >= (u = (x + k) / 2)) ? x = u : k = u, (d = r >= (s = (b + z) / 2)) ? b = s : z = s, o = v, !(v = v[g = d << 2 | p << 1 | f])) return o[g] = _, t;
        if (l = +t._x.call(null, v.data), c = +t._y.call(null, v.data), h = +t._z.call(null, v.data), n === l && e === c && r === h) return _.next = v, o ? o[g] = _ : t._root = _, t;
        do {
            o = o ? o[g] = new Array(8) : t._root = new Array(8), (f = n >= (a = (m + w) / 2)) ? m = a : w = a, (p = e >= (u = (x + k) / 2)) ? x = u : k = u, (d = r >= (s = (b + z) / 2)) ? b = s : z = s
        } while ((g = d << 2 | p << 1 | f) == (y = (h >= s) << 2 | (c >= u) << 1 | l >= a));
        return o[y] = v, o[g] = _, t
    }

    function ui(t, n, e, r, i, o, a) {
        this.node = t, this.x0 = n, this.y0 = e, this.z0 = r, this.x1 = i, this.y1 = o, this.z1 = a
    }

    function si(t) {
        return t[0]
    }

    function li(t) {
        return t[1]
    }

    function ci(t) {
        return t[2]
    }

    function hi(t, n, e, r) {
        var i = new fi(null == n ? si : n, null == e ? li : e, null == r ? ci : r, NaN, NaN, NaN, NaN, NaN, NaN);
        return null == t ? i : i.addAll(t)
    }

    function fi(t, n, e, r, i, o, a, u, s) {
        this._x = t, this._y = n, this._z = e, this._x0 = r, this._y0 = i, this._z0 = o, this._x1 = a, this._y1 = u, this._z1 = s, this._root = void 0
    }

    function pi(t) {
        for (var n = {data: t.data}, e = n; t = t.next;) e = e.next = {data: t.data};
        return n
    }

    oi.copy = function () {
        var t, n, e = new ri(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root;
        if (!r) return e;
        if (!r.length) return e._root = ii(r), e;
        for (t = [{
            source: r,
            target: e._root = new Array(4)
        }]; r = t.pop();) for (var i = 0; i < 4; ++i) (n = r.source[i]) && (n.length ? t.push({
            source: n,
            target: r.target[i] = new Array(4)
        }) : r.target[i] = ii(n));
        return e
    }, oi.add = function (t) {
        var n = +this._x.call(null, t), e = +this._y.call(null, t);
        return Jr(this.cover(n, e), n, e, t)
    }, oi.addAll = function (t) {
        var n, e, r, i, o = t.length, a = new Array(o), u = new Array(o), s = 1 / 0, l = 1 / 0, c = -1 / 0, h = -1 / 0;
        for (e = 0; e < o; ++e) isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r, u[e] = i, r < s && (s = r), r > c && (c = r), i < l && (l = i), i > h && (h = i));
        if (s > c || l > h) return this;
        for (this.cover(s, l).cover(c, h), e = 0; e < o; ++e) Jr(this, a[e], u[e], t[e]);
        return this
    }, oi.cover = function (t, n) {
        if (isNaN(t = +t) || isNaN(n = +n)) return this;
        var e = this._x0, r = this._y0, i = this._x1, o = this._y1;
        if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1; else {
            for (var a, u, s = i - e, l = this._root; e > t || t >= i || r > n || n >= o;) switch (u = (n < r) << 1 | t < e, (a = new Array(4))[u] = l, l = a, s *= 2, u) {
                case 0:
                    i = e + s, o = r + s;
                    break;
                case 1:
                    e = i - s, o = r + s;
                    break;
                case 2:
                    i = e + s, r = o - s;
                    break;
                case 3:
                    e = i - s, r = o - s
            }
            this._root && this._root.length && (this._root = l)
        }
        return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this
    }, oi.data = function () {
        var t = [];
        return this.visit((function (n) {
            if (!n.length) do {
                t.push(n.data)
            } while (n = n.next)
        })), t
    }, oi.extent = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
    }, oi.find = function (t, n, e) {
        var r, i, o, a, u, s, l, c = this._x0, h = this._y0, f = this._x1, p = this._y1, d = [], g = this._root;
        for (g && d.push(new Kr(g, c, h, f, p)), null == e ? e = 1 / 0 : (c = t - e, h = n - e, f = t + e, p = n + e, e *= e); s = d.pop();) if (!(!(g = s.node) || (i = s.x0) > f || (o = s.y0) > p || (a = s.x1) < c || (u = s.y1) < h)) if (g.length) {
            var y = (i + a) / 2, v = (o + u) / 2;
            d.push(new Kr(g[3], y, v, a, u), new Kr(g[2], i, v, y, u), new Kr(g[1], y, o, a, v), new Kr(g[0], i, o, y, v)), (l = (n >= v) << 1 | t >= y) && (s = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - l], d[d.length - 1 - l] = s)
        } else {
            var _ = t - +this._x.call(null, g.data), m = n - +this._y.call(null, g.data), x = _ * _ + m * m;
            if (x < e) {
                var b = Math.sqrt(e = x);
                c = t - b, h = n - b, f = t + b, p = n + b, r = g.data
            }
        }
        return r
    }, oi.remove = function (t) {
        if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t))) return this;
        var n, e, r, i, o, a, u, s, l, c, h, f, p = this._root, d = this._x0, g = this._y0, y = this._x1, v = this._y1;
        if (!p) return this;
        if (p.length) for (; ;) {
            if ((l = o >= (u = (d + y) / 2)) ? d = u : y = u, (c = a >= (s = (g + v) / 2)) ? g = s : v = s, n = p, !(p = p[h = c << 1 | l])) return this;
            if (!p.length) break;
            (n[h + 1 & 3] || n[h + 2 & 3] || n[h + 3 & 3]) && (e = n, f = h)
        }
        for (; p.data !== t;) if (r = p, !(p = p.next)) return this;
        return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[h] = i : delete n[h], (p = n[0] || n[1] || n[2] || n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[f] = p : this._root = p), this) : (this._root = i, this)
    }, oi.removeAll = function (t) {
        for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
        return this
    }, oi.root = function () {
        return this._root
    }, oi.size = function () {
        var t = 0;
        return this.visit((function (n) {
            if (!n.length) do {
                ++t
            } while (n = n.next)
        })), t
    }, oi.visit = function (t) {
        var n, e, r, i, o, a, u = [], s = this._root;
        for (s && u.push(new Kr(s, this._x0, this._y0, this._x1, this._y1)); n = u.pop();) if (!t(s = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && s.length) {
            var l = (r + o) / 2, c = (i + a) / 2;
            (e = s[3]) && u.push(new Kr(e, l, c, o, a)), (e = s[2]) && u.push(new Kr(e, r, c, l, a)), (e = s[1]) && u.push(new Kr(e, l, i, o, c)), (e = s[0]) && u.push(new Kr(e, r, i, l, c))
        }
        return this
    }, oi.visitAfter = function (t) {
        var n, e = [], r = [];
        for (this._root && e.push(new Kr(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
            var i = n.node;
            if (i.length) {
                var o, a = n.x0, u = n.y0, s = n.x1, l = n.y1, c = (a + s) / 2, h = (u + l) / 2;
                (o = i[0]) && e.push(new Kr(o, a, u, c, h)), (o = i[1]) && e.push(new Kr(o, c, u, s, h)), (o = i[2]) && e.push(new Kr(o, a, h, c, l)), (o = i[3]) && e.push(new Kr(o, c, h, s, l))
            }
            r.push(n)
        }
        for (; n = r.pop();) t(n.node, n.x0, n.y0, n.x1, n.y1);
        return this
    }, oi.x = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, oi.y = function (t) {
        return arguments.length ? (this._y = t, this) : this._y
    };
    var di = hi.prototype = fi.prototype;

    function gi(t) {
        return function () {
            return t
        }
    }

    function yi() {
        return 1e-6 * (Math.random() - .5)
    }

    function vi(t) {
        return t.index
    }

    function _i(t, n) {
        var e = t.get(n);
        if (!e) throw new Error("node not found: " + n);
        return e
    }

    function mi(t) {
        var n, e, r, i, o, a, u = vi, s = function (t) {
            return 1 / Math.min(o[t.source.index], o[t.target.index])
        }, l = gi(30), c = 1;

        function h(r) {
            for (var o = 0, u = t.length; o < c; ++o) for (var s, l, h, f, p, d = 0, g = 0, y = 0, v = 0; d < u; ++d) l = (s = t[d]).source, g = (h = s.target).x + h.vx - l.x - l.vx || yi(), i > 1 && (y = h.y + h.vy - l.y - l.vy || yi()), i > 2 && (v = h.z + h.vz - l.z - l.vz || yi()), g *= f = ((f = Math.sqrt(g * g + y * y + v * v)) - e[d]) / f * r * n[d], y *= f, v *= f, h.vx -= g * (p = a[d]), i > 1 && (h.vy -= y * p), i > 2 && (h.vz -= v * p), l.vx += g * (p = 1 - p), i > 1 && (l.vy += y * p), i > 2 && (l.vz += v * p)
        }

        function f() {
            if (r) {
                var i, s, l = r.length, c = t.length, h = new Map(r.map((t, n) => [u(t, n, r), t]));
                for (i = 0, o = new Array(l); i < c; ++i) (s = t[i]).index = i, "object" != typeof s.source && (s.source = _i(h, s.source)), "object" != typeof s.target && (s.target = _i(h, s.target)), o[s.source.index] = (o[s.source.index] || 0) + 1, o[s.target.index] = (o[s.target.index] || 0) + 1;
                for (i = 0, a = new Array(c); i < c; ++i) s = t[i], a[i] = o[s.source.index] / (o[s.source.index] + o[s.target.index]);
                n = new Array(c), p(), e = new Array(c), d()
            }
        }

        function p() {
            if (r) for (var e = 0, i = t.length; e < i; ++e) n[e] = +s(t[e], e, t)
        }

        function d() {
            if (r) for (var n = 0, i = t.length; n < i; ++n) e[n] = +l(t[n], n, t)
        }

        return null == t && (t = []), h.initialize = function (t, n) {
            r = t, i = n, f()
        }, h.links = function (n) {
            return arguments.length ? (t = n, f(), h) : t
        }, h.id = function (t) {
            return arguments.length ? (u = t, h) : u
        }, h.iterations = function (t) {
            return arguments.length ? (c = +t, h) : c
        }, h.strength = function (t) {
            return arguments.length ? (s = "function" == typeof t ? t : gi(+t), p(), h) : s
        }, h.distance = function (t) {
            return arguments.length ? (l = "function" == typeof t ? t : gi(+t), d(), h) : l
        }, h
    }

    di.copy = function () {
        var t, n, e = new fi(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
            r = this._root;
        if (!r) return e;
        if (!r.length) return e._root = pi(r), e;
        for (t = [{
            source: r,
            target: e._root = new Array(8)
        }]; r = t.pop();) for (var i = 0; i < 8; ++i) (n = r.source[i]) && (n.length ? t.push({
            source: n,
            target: r.target[i] = new Array(8)
        }) : r.target[i] = pi(n));
        return e
    }, di.add = function (t) {
        var n = +this._x.call(null, t), e = +this._y.call(null, t), r = +this._z.call(null, t);
        return ai(this.cover(n, e, r), n, e, r, t)
    }, di.addAll = function (t) {
        var n, e, r, i, o, a = t.length, u = new Array(a), s = new Array(a), l = new Array(a), c = 1 / 0, h = 1 / 0,
            f = 1 / 0, p = -1 / 0, d = -1 / 0, g = -1 / 0;
        for (e = 0; e < a; ++e) isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || isNaN(o = +this._z.call(null, n)) || (u[e] = r, s[e] = i, l[e] = o, r < c && (c = r), r > p && (p = r), i < h && (h = i), i > d && (d = i), o < f && (f = o), o > g && (g = o));
        for (p < c && (c = this._x0, p = this._x1), d < h && (h = this._y0, d = this._y1), g < f && (f = this._z0, g = this._z1), this.cover(c, h, f).cover(p, d, g), e = 0; e < a; ++e) ai(this, u[e], s[e], l[e], t[e]);
        return this
    }, di.cover = function (t, n, e) {
        if (isNaN(t = +t) || isNaN(n = +n) || isNaN(e = +e)) return this;
        var r = this._x0, i = this._y0, o = this._z0, a = this._x1, u = this._y1, s = this._z1;
        if (isNaN(r)) a = (r = Math.floor(t)) + 1, u = (i = Math.floor(n)) + 1, s = (o = Math.floor(e)) + 1; else {
            if (!(r > t || t > a || i > n || n > u || o > e || e > s)) return this;
            var l, c, h = a - r, f = this._root;
            switch (c = (e < (o + s) / 2) << 2 | (n < (i + u) / 2) << 1 | t < (r + a) / 2) {
                case 0:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (u = i + (h *= 2), s = o + h, t > (a = r + h) || n > u || e > s);
                    break;
                case 1:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (u = i + (h *= 2), s = o + h, (r = a - h) > t || n > u || e > s);
                    break;
                case 2:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (i = u - (h *= 2), s = o + h, t > (a = r + h) || i > n || e > s);
                    break;
                case 3:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (i = u - (h *= 2), s = o + h, (r = a - h) > t || i > n || e > s);
                    break;
                case 4:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (u = i + (h *= 2), o = s - h, t > (a = r + h) || n > u || o > e);
                    break;
                case 5:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (u = i + (h *= 2), o = s - h, (r = a - h) > t || n > u || o > e);
                    break;
                case 6:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (i = u - (h *= 2), o = s - h, t > (a = r + h) || i > n || o > e);
                    break;
                case 7:
                    do {
                        (l = new Array(8))[c] = f, f = l
                    } while (i = u - (h *= 2), o = s - h, (r = a - h) > t || i > n || o > e)
            }
            this._root && this._root.length && (this._root = f)
        }
        return this._x0 = r, this._y0 = i, this._z0 = o, this._x1 = a, this._y1 = u, this._z1 = s, this
    }, di.data = function () {
        var t = [];
        return this.visit((function (n) {
            if (!n.length) do {
                t.push(n.data)
            } while (n = n.next)
        })), t
    }, di.extent = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1], +t[0][2]).cover(+t[1][0], +t[1][1], +t[1][2]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]]
    }, di.find = function (t, n, e, r) {
        var i, o, a, u, s, l, c, h, f, p = this._x0, d = this._y0, g = this._z0, y = this._x1, v = this._y1,
            _ = this._z1, m = [], x = this._root;
        for (x && m.push(new ui(x, p, d, g, y, v, _)), null == r ? r = 1 / 0 : (p = t - r, d = n - r, g = e - r, y = t + r, v = n + r, _ = e + r, r *= r); h = m.pop();) if (!(!(x = h.node) || (o = h.x0) > y || (a = h.y0) > v || (u = h.z0) > _ || (s = h.x1) < p || (l = h.y1) < d || (c = h.z1) < g)) if (x.length) {
            var b = (o + s) / 2, w = (a + l) / 2, k = (u + c) / 2;
            m.push(new ui(x[7], b, w, k, s, l, c), new ui(x[6], o, w, k, b, l, c), new ui(x[5], b, a, k, s, w, c), new ui(x[4], o, a, k, b, w, c), new ui(x[3], b, w, u, s, l, k), new ui(x[2], o, w, u, b, l, k), new ui(x[1], b, a, u, s, w, k), new ui(x[0], o, a, u, b, w, k)), (f = (e >= k) << 2 | (n >= w) << 1 | t >= b) && (h = m[m.length - 1], m[m.length - 1] = m[m.length - 1 - f], m[m.length - 1 - f] = h)
        } else {
            var z = t - +this._x.call(null, x.data), A = n - +this._y.call(null, x.data),
                M = e - +this._z.call(null, x.data), S = z * z + A * A + M * M;
            if (S < r) {
                var E = Math.sqrt(r = S);
                p = t - E, d = n - E, g = e - E, y = t + E, v = n + E, _ = e + E, i = x.data
            }
        }
        return i
    }, di.remove = function (t) {
        if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)) || isNaN(u = +this._z.call(null, t))) return this;
        var n, e, r, i, o, a, u, s, l, c, h, f, p, d, g, y = this._root, v = this._x0, _ = this._y0, m = this._z0,
            x = this._x1, b = this._y1, w = this._z1;
        if (!y) return this;
        if (y.length) for (; ;) {
            if ((h = o >= (s = (v + x) / 2)) ? v = s : x = s, (f = a >= (l = (_ + b) / 2)) ? _ = l : b = l, (p = u >= (c = (m + w) / 2)) ? m = c : w = c, n = y, !(y = y[d = p << 2 | f << 1 | h])) return this;
            if (!y.length) break;
            (n[d + 1 & 7] || n[d + 2 & 7] || n[d + 3 & 7] || n[d + 4 & 7] || n[d + 5 & 7] || n[d + 6 & 7] || n[d + 7 & 7]) && (e = n, g = d)
        }
        for (; y.data !== t;) if (r = y, !(y = y.next)) return this;
        return (i = y.next) && delete y.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[d] = i : delete n[d], (y = n[0] || n[1] || n[2] || n[3] || n[4] || n[5] || n[6] || n[7]) && y === (n[7] || n[6] || n[5] || n[4] || n[3] || n[2] || n[1] || n[0]) && !y.length && (e ? e[g] = y : this._root = y), this) : (this._root = i, this)
    }, di.removeAll = function (t) {
        for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
        return this
    }, di.root = function () {
        return this._root
    }, di.size = function () {
        var t = 0;
        return this.visit((function (n) {
            if (!n.length) do {
                ++t
            } while (n = n.next)
        })), t
    }, di.visit = function (t) {
        var n, e, r, i, o, a, u, s, l = [], c = this._root;
        for (c && l.push(new ui(c, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); n = l.pop();) if (!t(c = n.node, r = n.x0, i = n.y0, o = n.z0, a = n.x1, u = n.y1, s = n.z1) && c.length) {
            var h = (r + a) / 2, f = (i + u) / 2, p = (o + s) / 2;
            (e = c[7]) && l.push(new ui(e, h, f, p, a, u, s)), (e = c[6]) && l.push(new ui(e, r, f, p, h, u, s)), (e = c[5]) && l.push(new ui(e, h, i, p, a, f, s)), (e = c[4]) && l.push(new ui(e, r, i, p, h, f, s)), (e = c[3]) && l.push(new ui(e, h, f, o, a, u, p)), (e = c[2]) && l.push(new ui(e, r, f, o, h, u, p)), (e = c[1]) && l.push(new ui(e, h, i, o, a, f, p)), (e = c[0]) && l.push(new ui(e, r, i, o, h, f, p))
        }
        return this
    }, di.visitAfter = function (t) {
        var n, e = [], r = [];
        for (this._root && e.push(new ui(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); n = e.pop();) {
            var i = n.node;
            if (i.length) {
                var o, a = n.x0, u = n.y0, s = n.z0, l = n.x1, c = n.y1, h = n.z1, f = (a + l) / 2, p = (u + c) / 2,
                    d = (s + h) / 2;
                (o = i[0]) && e.push(new ui(o, a, u, s, f, p, d)), (o = i[1]) && e.push(new ui(o, f, u, s, l, p, d)), (o = i[2]) && e.push(new ui(o, a, p, s, f, c, d)), (o = i[3]) && e.push(new ui(o, f, p, s, l, c, d)), (o = i[4]) && e.push(new ui(o, a, u, d, f, p, h)), (o = i[5]) && e.push(new ui(o, f, u, d, l, p, h)), (o = i[6]) && e.push(new ui(o, a, p, d, f, c, h)), (o = i[7]) && e.push(new ui(o, f, p, d, l, c, h))
            }
            r.push(n)
        }
        for (; n = r.pop();) t(n.node, n.x0, n.y0, n.z0, n.x1, n.y1, n.z1);
        return this
    }, di.x = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, di.y = function (t) {
        return arguments.length ? (this._y = t, this) : this._y
    }, di.z = function (t) {
        return arguments.length ? (this._z = t, this) : this._z
    };

    function xi(t) {
        return t.x
    }

    function bi(t) {
        return t.y
    }

    function wi(t) {
        return t.z
    }

    var ki = Math.PI * (3 - Math.sqrt(5)), zi = 20 * Math.PI / (9 + Math.sqrt(221));

    function Ai(t, n) {
        n = n || 2;
        var e, r = Math.min(3, Math.max(1, Math.round(n))), i = 1, o = .001, a = 1 - Math.pow(o, 1 / 300), u = 0,
            s = .6, l = new Map, c = Jn(f), h = St("tick", "end");

        function f() {
            p(), h.call("tick", e), i < o && (c.stop(), h.call("end", e))
        }

        function p(n) {
            var o, c, h = t.length;
            void 0 === n && (n = 1);
            for (var f = 0; f < n; ++f) for (i += (u - i) * a, l.forEach((function (t) {
                t(i)
            })), o = 0; o < h; ++o) null == (c = t[o]).fx ? c.x += c.vx *= s : (c.x = c.fx, c.vx = 0), r > 1 && (null == c.fy ? c.y += c.vy *= s : (c.y = c.fy, c.vy = 0)), r > 2 && (null == c.fz ? c.z += c.vz *= s : (c.z = c.fz, c.vz = 0));
            return e
        }

        function d() {
            for (var n, e = 0, i = t.length; e < i; ++e) {
                if ((n = t[e]).index = e, null != n.fx && (n.x = n.fx), null != n.fy && (n.y = n.fy), null != n.fz && (n.z = n.fz), isNaN(n.x) || r > 1 && isNaN(n.y) || r > 2 && isNaN(n.z)) {
                    var o = 10 * (r > 2 ? Math.cbrt(e) : r > 1 ? Math.sqrt(e) : e), a = e * ki, u = e * zi;
                    1 === r ? n.x = o : 2 === r ? (n.x = o * Math.cos(a), n.y = o * Math.sin(a)) : (n.x = o * Math.sin(a) * Math.cos(u), n.y = o * Math.cos(a), n.z = o * Math.sin(a) * Math.sin(u))
                }
                (isNaN(n.vx) || r > 1 && isNaN(n.vy) || r > 2 && isNaN(n.vz)) && (n.vx = 0, r > 1 && (n.vy = 0), r > 2 && (n.vz = 0))
            }
        }

        function g(n) {
            return n.initialize && n.initialize(t, r), n
        }

        return null == t && (t = []), d(), e = {
            tick: p, restart: function () {
                return c.restart(f), e
            }, stop: function () {
                return c.stop(), e
            }, numDimensions: function (t) {
                return arguments.length ? (r = Math.min(3, Math.max(1, Math.round(t))), l.forEach(g), e) : r
            }, nodes: function (n) {
                return arguments.length ? (t = n, d(), l.forEach(g), e) : t
            }, alpha: function (t) {
                return arguments.length ? (i = +t, e) : i
            }, alphaMin: function (t) {
                return arguments.length ? (o = +t, e) : o
            }, alphaDecay: function (t) {
                return arguments.length ? (a = +t, e) : +a
            }, alphaTarget: function (t) {
                return arguments.length ? (u = +t, e) : u
            }, velocityDecay: function (t) {
                return arguments.length ? (s = 1 - t, e) : 1 - s
            }, force: function (t, n) {
                return arguments.length > 1 ? (null == n ? l.delete(t) : l.set(t, g(n)), e) : l.get(t)
            }, find: function () {
                var n, e, i, o, a, u, s = Array.prototype.slice.call(arguments), l = s.shift() || 0,
                    c = (r > 1 ? s.shift() : null) || 0, h = (r > 2 ? s.shift() : null) || 0, f = s.shift() || 1 / 0,
                    p = 0, d = t.length;
                for (f *= f, p = 0; p < d; ++p) (o = (n = l - (a = t[p]).x) * n + (e = c - (a.y || 0)) * e + (i = h - (a.z || 0)) * i) < f && (u = a, f = o);
                return u
            }, on: function (t, n) {
                return arguments.length > 1 ? (h.on(t, n), e) : h.on(t)
            }
        }
    }

    function Mi() {
        var t, n, e, r, i, o = gi(-30), a = 1, u = 1 / 0, s = .81;

        function l(i) {
            var o, a = t.length,
                u = (1 === n ? $r(t, xi) : 2 === n ? ei(t, xi, bi) : 3 === n ? hi(t, xi, bi, wi) : null).visitAfter(h);
            for (r = i, o = 0; o < a; ++o) e = t[o], u.visit(f)
        }

        function c() {
            if (t) {
                var n, e, r = t.length;
                for (i = new Array(r), n = 0; n < r; ++n) e = t[n], i[e.index] = +o(e, n, t)
            }
        }

        function h(t) {
            var e, r, o, a, u, s, l = 0, c = 0, h = t.length;
            if (h) {
                for (o = a = u = s = 0; s < h; ++s) (e = t[s]) && (r = Math.abs(e.value)) && (l += e.value, c += r, o += r * (e.x || 0), a += r * (e.y || 0), u += r * (e.z || 0));
                l *= Math.sqrt(4 / h), t.x = o / c, n > 1 && (t.y = a / c), n > 2 && (t.z = u / c)
            } else {
                (e = t).x = e.data.x, n > 1 && (e.y = e.data.y), n > 2 && (e.z = e.data.z);
                do {
                    l += i[e.data.index]
                } while (e = e.next)
            }
            t.value = l
        }

        function f(t, o, l, c, h) {
            if (!t.value) return !0;
            var f = [l, c, h][n - 1], p = t.x - e.x, d = n > 1 ? t.y - e.y : 0, g = n > 2 ? t.z - e.z : 0, y = f - o,
                v = p * p + d * d + g * g;
            if (y * y / s < v) return v < u && (0 === p && (v += (p = yi()) * p), n > 1 && 0 === d && (v += (d = yi()) * d), n > 2 && 0 === g && (v += (g = yi()) * g), v < a && (v = Math.sqrt(a * v)), e.vx += p * t.value * r / v, n > 1 && (e.vy += d * t.value * r / v), n > 2 && (e.vz += g * t.value * r / v)), !0;
            if (!(t.length || v >= u)) {
                (t.data !== e || t.next) && (0 === p && (v += (p = yi()) * p), n > 1 && 0 === d && (v += (d = yi()) * d), n > 2 && 0 === g && (v += (g = yi()) * g), v < a && (v = Math.sqrt(a * v)));
                do {
                    t.data !== e && (y = i[t.data.index] * r / v, e.vx += p * y, n > 1 && (e.vy += d * y), n > 2 && (e.vz += g * y))
                } while (t = t.next)
            }
        }

        return l.initialize = function (e, r) {
            t = e, n = r, c()
        }, l.strength = function (t) {
            return arguments.length ? (o = "function" == typeof t ? t : gi(+t), c(), l) : o
        }, l.distanceMin = function (t) {
            return arguments.length ? (a = t * t, l) : Math.sqrt(a)
        }, l.distanceMax = function (t) {
            return arguments.length ? (u = t * t, l) : Math.sqrt(u)
        }, l.theta = function (t) {
            return arguments.length ? (s = t * t, l) : Math.sqrt(s)
        }, l
    }

    var Si = ir((function (t) {
        !function () {
            var n = Math.abs, e = Math.cos, r = Math.sin, i = Math.acos, o = Math.atan2, a = Math.sqrt, u = Math.pow,
                s = function (t) {
                    return t < 0 ? -u(-t, 1 / 3) : u(t, 1 / 3)
                }, l = Math.PI, c = 2 * l, h = l / 2, f = Number.MAX_SAFE_INTEGER || 9007199254740991,
                p = Number.MIN_SAFE_INTEGER || -9007199254740991, d = {x: 0, y: 0, z: 0}, g = {
                    Tvalues: [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213],
                    Cvalues: [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872],
                    arcfn: function (t, n) {
                        var e = n(t), r = e.x * e.x + e.y * e.y;
                        return void 0 !== e.z && (r += e.z * e.z), a(r)
                    },
                    compute: function (t, n, e) {
                        if (0 === t) return n[0];
                        var r = n.length - 1;
                        if (1 === t) return n[r];
                        var i = n, o = 1 - t;
                        if (0 === r) return n[0];
                        if (1 === r) return f = {
                            x: o * i[0].x + t * i[1].x,
                            y: o * i[0].y + t * i[1].y
                        }, e && (f.z = o * i[0].z + t * i[1].z), f;
                        if (r < 4) {
                            var a, u, s, l = o * o, c = t * t, h = 0;
                            2 === r ? (i = [i[0], i[1], i[2], d], a = l, u = o * t * 2, s = c) : 3 === r && (a = l * o, u = l * t * 3, s = o * c * 3, h = t * c);
                            var f = {
                                x: a * i[0].x + u * i[1].x + s * i[2].x + h * i[3].x,
                                y: a * i[0].y + u * i[1].y + s * i[2].y + h * i[3].y
                            };
                            return e && (f.z = a * i[0].z + u * i[1].z + s * i[2].z + h * i[3].z), f
                        }
                        for (var p = JSON.parse(JSON.stringify(n)); p.length > 1;) {
                            for (var g = 0; g < p.length - 1; g++) p[g] = {
                                x: p[g].x + (p[g + 1].x - p[g].x) * t,
                                y: p[g].y + (p[g + 1].y - p[g].y) * t
                            }, void 0 !== p[g].z && (p[g] = p[g].z + (p[g + 1].z - p[g].z) * t);
                            p.splice(p.length - 1, 1)
                        }
                        return p[0]
                    },
                    computeWithRatios: function (t, n, e, r) {
                        var i, o = 1 - t, a = e, u = n, s = a[0], l = a[1], c = a[2], h = a[3];
                        return s *= o, l *= t, 2 === u.length ? (i = s + l, {
                            x: (s * u[0].x + l * u[1].x) / i,
                            y: (s * u[0].y + l * u[1].y) / i,
                            z: !!r && (s * u[0].z + l * u[1].z) / i
                        }) : (s *= o, l *= 2 * o, c *= t * t, 3 === u.length ? (i = s + l + c, {
                            x: (s * u[0].x + l * u[1].x + c * u[2].x) / i,
                            y: (s * u[0].y + l * u[1].y + c * u[2].y) / i,
                            z: !!r && (s * u[0].z + l * u[1].z + c * u[2].z) / i
                        }) : (s *= o, l *= 1.5 * o, c *= 3 * o, h *= t * t * t, 4 === u.length ? (i = s + l + c + h, {
                            x: (s * u[0].x + l * u[1].x + c * u[2].x + h * u[3].x) / i,
                            y: (s * u[0].y + l * u[1].y + c * u[2].y + h * u[3].y) / i,
                            z: !!r && (s * u[0].z + l * u[1].z + c * u[2].z + h * u[3].z) / i
                        }) : void 0))
                    },
                    derive: function (t, n) {
                        for (var e = [], r = t, i = r.length, o = i - 1; i > 1; i--, o--) {
                            for (var a, u = [], s = 0; s < o; s++) a = {
                                x: o * (r[s + 1].x - r[s].x),
                                y: o * (r[s + 1].y - r[s].y)
                            }, n && (a.z = o * (r[s + 1].z - r[s].z)), u.push(a);
                            e.push(u), r = u
                        }
                        return e
                    },
                    between: function (t, n, e) {
                        return n <= t && t <= e || g.approximately(t, n) || g.approximately(t, e)
                    },
                    approximately: function (t, e, r) {
                        return n(t - e) <= (r || 1e-6)
                    },
                    length: function (t) {
                        var n, e, r = 0, i = g.Tvalues.length;
                        for (n = 0; n < i; n++) e = .5 * g.Tvalues[n] + .5, r += g.Cvalues[n] * g.arcfn(e, t);
                        return .5 * r
                    },
                    map: function (t, n, e, r, i) {
                        return r + (i - r) * ((t - n) / (e - n))
                    },
                    lerp: function (t, n, e) {
                        var r = {x: n.x + t * (e.x - n.x), y: n.y + t * (e.y - n.y)};
                        return n.z && e.z && (r.z = n.z + t * (e.z - n.z)), r
                    },
                    pointToString: function (t) {
                        var n = t.x + "/" + t.y;
                        return void 0 !== t.z && (n += "/" + t.z), n
                    },
                    pointsToString: function (t) {
                        return "[" + t.map(g.pointToString).join(", ") + "]"
                    },
                    copy: function (t) {
                        return JSON.parse(JSON.stringify(t))
                    },
                    angle: function (t, n, e) {
                        var r = n.x - t.x, i = n.y - t.y, a = e.x - t.x, u = e.y - t.y;
                        return o(r * u - i * a, r * a + i * u)
                    },
                    round: function (t, n) {
                        var e = "" + t, r = e.indexOf(".");
                        return parseFloat(e.substring(0, r + 1 + n))
                    },
                    dist: function (t, n) {
                        var e = t.x - n.x, r = t.y - n.y;
                        return a(e * e + r * r)
                    },
                    closest: function (t, n) {
                        var e, r, i = u(2, 63);
                        return t.forEach((function (t, o) {
                            (r = g.dist(n, t)) < i && (i = r, e = o)
                        })), {mdist: i, mpos: e}
                    },
                    abcratio: function (t, e) {
                        if (2 !== e && 3 !== e) return !1;
                        if (void 0 === t) t = .5; else if (0 === t || 1 === t) return t;
                        var r = u(t, e) + u(1 - t, e);
                        return n((r - 1) / r)
                    },
                    projectionratio: function (t, n) {
                        if (2 !== n && 3 !== n) return !1;
                        if (void 0 === t) t = .5; else if (0 === t || 1 === t) return t;
                        var e = u(1 - t, n);
                        return e / (u(t, n) + e)
                    },
                    lli8: function (t, n, e, r, i, o, a, u) {
                        var s = (t - e) * (o - u) - (n - r) * (i - a);
                        return 0 != s && {
                            x: ((t * r - n * e) * (i - a) - (t - e) * (i * u - o * a)) / s,
                            y: ((t * r - n * e) * (o - u) - (n - r) * (i * u - o * a)) / s
                        }
                    },
                    lli4: function (t, n, e, r) {
                        var i = t.x, o = t.y, a = n.x, u = n.y, s = e.x, l = e.y, c = r.x, h = r.y;
                        return g.lli8(i, o, a, u, s, l, c, h)
                    },
                    lli: function (t, n) {
                        return g.lli4(t, t.c, n, n.c)
                    },
                    makeline: function (t, n) {
                        var e = Ti, r = t.x, i = t.y, o = n.x, a = n.y, u = (o - r) / 3, s = (a - i) / 3;
                        return new e(r, i, r + u, i + s, r + 2 * u, i + 2 * s, o, a)
                    },
                    findbbox: function (t) {
                        var n = f, e = f, r = p, i = p;
                        return t.forEach((function (t) {
                            var o = t.bbox();
                            n > o.x.min && (n = o.x.min), e > o.y.min && (e = o.y.min), r < o.x.max && (r = o.x.max), i < o.y.max && (i = o.y.max)
                        })), {
                            x: {min: n, mid: (n + r) / 2, max: r, size: r - n},
                            y: {min: e, mid: (e + i) / 2, max: i, size: i - e}
                        }
                    },
                    shapeintersections: function (t, n, e, r, i) {
                        if (!g.bboxoverlap(n, r)) return [];
                        var o = [], a = [t.startcap, t.forward, t.back, t.endcap],
                            u = [e.startcap, e.forward, e.back, e.endcap];
                        return a.forEach((function (n) {
                            n.virtual || u.forEach((function (r) {
                                if (!r.virtual) {
                                    var a = n.intersects(r, i);
                                    a.length > 0 && (a.c1 = n, a.c2 = r, a.s1 = t, a.s2 = e, o.push(a))
                                }
                            }))
                        })), o
                    },
                    makeshape: function (t, n, e) {
                        var r = n.points.length, i = t.points.length, o = g.makeline(n.points[r - 1], t.points[0]),
                            a = g.makeline(t.points[i - 1], n.points[0]),
                            u = {startcap: o, forward: t, back: n, endcap: a, bbox: g.findbbox([o, t, n, a])}, s = g;
                        return u.intersections = function (t) {
                            return s.shapeintersections(u, u.bbox, t, t.bbox, e)
                        }, u
                    },
                    getminmax: function (t, n, e) {
                        if (!e) return {min: 0, max: 0};
                        var r, i, o = f, a = p;
                        -1 === e.indexOf(0) && (e = [0].concat(e)), -1 === e.indexOf(1) && e.push(1);
                        for (var u = 0, s = e.length; u < s; u++) r = e[u], (i = t.get(r))[n] < o && (o = i[n]), i[n] > a && (a = i[n]);
                        return {min: o, mid: (o + a) / 2, max: a, size: a - o}
                    },
                    align: function (t, n) {
                        var i = n.p1.x, a = n.p1.y, u = -o(n.p2.y - a, n.p2.x - i);
                        return t.map((function (t) {
                            return {x: (t.x - i) * e(u) - (t.y - a) * r(u), y: (t.x - i) * r(u) + (t.y - a) * e(u)}
                        }))
                    },
                    roots: function (t, n) {
                        n = n || {p1: {x: 0, y: 0}, p2: {x: 1, y: 0}};
                        var r = t.length - 1, o = g.align(t, n), u = function (t) {
                            return 0 <= t && t <= 1
                        };
                        if (2 === r) {
                            if (0 !== (y = (v = o[0].y) - 2 * (_ = o[1].y) + (m = o[2].y))) {
                                var l = -a(_ * _ - v * m), h = -v + _;
                                return [-(l + h) / y, -(-l + h) / y].filter(u)
                            }
                            return _ !== m && 0 === y ? [(2 * _ - m) / (2 * _ - 2 * m)].filter(u) : []
                        }
                        var f = o[0].y, p = o[1].y, d = o[2].y, y = 3 * p - f - 3 * d + o[3].y, v = 3 * f - 6 * p + 3 * d,
                            _ = -3 * f + 3 * p, m = f;
                        if (g.approximately(y, 0)) {
                            if (g.approximately(v, 0)) return g.approximately(_, 0) ? [] : [-m / _].filter(u);
                            var x = 2 * v;
                            return [((b = a(_ * _ - 4 * v * m)) - _) / x, (-_ - b) / x].filter(u)
                        }
                        var b, w, k = (o = (3 * (_ /= y) - (v /= y) * v) / 3) / 3,
                            z = (b = (2 * v * v * v - 9 * v * _ + 27 * (m /= y)) / 27) / 2, A = z * z + k * k * k;
                        if (A < 0) {
                            var M = -o / 3, S = a(M * M * M), E = -b / (2 * S), N = i(E < -1 ? -1 : E > 1 ? 1 : E),
                                C = 2 * s(S);
                            return [C * e(N / 3) - v / 3, C * e((N + c) / 3) - v / 3, C * e((N + 2 * c) / 3) - v / 3].filter(u)
                        }
                        if (0 === A) return [2 * (w = z < 0 ? s(-z) : -s(z)) - v / 3, -w - v / 3].filter(u);
                        var O = a(A);
                        return [(w = s(-z + O)) - s(z + O) - v / 3].filter(u)
                    },
                    droots: function (t) {
                        if (3 === t.length) {
                            var n = t[0], e = t[1], r = t[2], i = n - 2 * e + r;
                            if (0 !== i) {
                                var o = -a(e * e - n * r), u = -n + e;
                                return [-(o + u) / i, -(-o + u) / i]
                            }
                            return e !== r && 0 === i ? [(2 * e - r) / (2 * (e - r))] : []
                        }
                        if (2 === t.length) return (n = t[0]) !== (e = t[1]) ? [n / (n - e)] : []
                    },
                    curvature: function (t, e, r, i) {
                        var o, s, l, c, h, f, p = g.derive(e), d = p[0], y = p[1], v = g.compute(t, d), _ = g.compute(t, y),
                            m = v.x * v.x + v.y * v.y;
                        if (r ? (o = a(u(v.y * _.z - _.y * v.z, 2) + u(v.z * _.x - _.z * v.x, 2) + u(v.x * _.y - _.x * v.y, 2)), s = u(m + v.z * v.z, 1.5)) : (o = v.x * _.y - v.y * _.x, s = u(m, 1.5)), 0 === o || 0 === s) return {
                            k: 0,
                            r: 0
                        };
                        if (h = o / s, f = s / o, !i) {
                            var x = g.curvature(t - .001, e, r, !0).k, b = g.curvature(t + .001, e, r, !0).k;
                            c = (b - h + (h - x)) / 2, l = (n(b - h) + n(h - x)) / 2
                        }
                        return {k: h, r: f, dk: c, adk: l}
                    },
                    inflections: function (t) {
                        if (t.length < 4) return [];
                        var n = g.align(t, {p1: t[0], p2: t.slice(-1)[0]}), e = n[2].x * n[1].y, r = n[3].x * n[1].y,
                            i = n[1].x * n[2].y, o = 18 * (-3 * e + 2 * r + 3 * i - (h = n[3].x * n[2].y)),
                            a = 18 * (3 * e - r - 3 * i), u = 18 * (i - e);
                        if (g.approximately(o, 0)) {
                            if (!g.approximately(a, 0)) {
                                var s = -u / a;
                                if (0 <= s && s <= 1) return [s]
                            }
                            return []
                        }
                        var l = a * a - 4 * o * u, c = Math.sqrt(l), h = 2 * o;
                        return g.approximately(h, 0) ? [] : [(c - a) / h, -(a + c) / h].filter((function (t) {
                            return 0 <= t && t <= 1
                        }))
                    },
                    bboxoverlap: function (t, e) {
                        var r, i, o, a, u, s = ["x", "y"], l = s.length;
                        for (r = 0; r < l; r++) if (o = t[i = s[r]].mid, a = e[i].mid, u = (t[i].size + e[i].size) / 2, n(o - a) >= u) return !1;
                        return !0
                    },
                    expandbox: function (t, n) {
                        n.x.min < t.x.min && (t.x.min = n.x.min), n.y.min < t.y.min && (t.y.min = n.y.min), n.z && n.z.min < t.z.min && (t.z.min = n.z.min), n.x.max > t.x.max && (t.x.max = n.x.max), n.y.max > t.y.max && (t.y.max = n.y.max), n.z && n.z.max > t.z.max && (t.z.max = n.z.max), t.x.mid = (t.x.min + t.x.max) / 2, t.y.mid = (t.y.min + t.y.max) / 2, t.z && (t.z.mid = (t.z.min + t.z.max) / 2), t.x.size = t.x.max - t.x.min, t.y.size = t.y.max - t.y.min, t.z && (t.z.size = t.z.max - t.z.min)
                    },
                    pairiteration: function (t, n, e) {
                        var r = t.bbox(), i = n.bbox(), o = 1e5, a = e || .5;
                        if (r.x.size + r.y.size < a && i.x.size + i.y.size < a) return [(o * (t._t1 + t._t2) / 2 | 0) / o + "/" + (o * (n._t1 + n._t2) / 2 | 0) / o];
                        var u = t.split(.5), s = n.split(.5),
                            l = [{left: u.left, right: s.left}, {left: u.left, right: s.right}, {
                                left: u.right,
                                right: s.right
                            }, {left: u.right, right: s.left}];
                        l = l.filter((function (t) {
                            return g.bboxoverlap(t.left.bbox(), t.right.bbox())
                        }));
                        var c = [];
                        return 0 === l.length ? c : (l.forEach((function (t) {
                            c = c.concat(g.pairiteration(t.left, t.right, a))
                        })), c = c.filter((function (t, n) {
                            return c.indexOf(t) === n
                        })))
                    },
                    getccenter: function (t, n, i) {
                        var a, u = n.x - t.x, s = n.y - t.y, l = i.x - n.x, f = i.y - n.y, p = u * e(h) - s * r(h),
                            d = u * r(h) + s * e(h), y = l * e(h) - f * r(h), v = l * r(h) + f * e(h), _ = (t.x + n.x) / 2,
                            m = (t.y + n.y) / 2, x = (n.x + i.x) / 2, b = (n.y + i.y) / 2, w = _ + p, k = m + d, z = x + y,
                            A = b + v, M = g.lli8(_, m, w, k, x, b, z, A), S = g.dist(M, t), E = o(t.y - M.y, t.x - M.x),
                            N = o(n.y - M.y, n.x - M.x), C = o(i.y - M.y, i.x - M.x);
                        return E < C ? ((E > N || N > C) && (E += c), E > C && (a = C, C = E, E = a)) : C < N && N < E ? (a = C, C = E, E = a) : C += c, M.s = E, M.e = C, M.r = S, M
                    },
                    numberSort: function (t, n) {
                        return t - n
                    }
                };
            t.exports = g
        }()
    })), Ei = ir((function (t) {
        var n, e;
        n = Si, (e = function (t) {
            this.curves = [], this._3d = !1, t && (this.curves = t, this._3d = this.curves[0]._3d)
        }).prototype = {
            valueOf: function () {
                return this.toString()
            }, toString: function () {
                return "[" + this.curves.map((function (t) {
                    return n.pointsToString(t.points)
                })).join(", ") + "]"
            }, addCurve: function (t) {
                this.curves.push(t), this._3d = this._3d || t._3d
            }, length: function () {
                return this.curves.map((function (t) {
                    return t.length()
                })).reduce((function (t, n) {
                    return t + n
                }))
            }, curve: function (t) {
                return this.curves[t]
            }, bbox: function () {
                for (var t = this.curves, e = t[0].bbox(), r = 1; r < t.length; r++) n.expandbox(e, t[r].bbox());
                return e
            }, offset: function (t) {
                var n = [];
                return this.curves.forEach((function (e) {
                    n = n.concat(e.offset(t))
                })), new e(n)
            }
        }, t.exports = e
    }));
    var Ni = function (t) {
        var n, e, r, i, o, a,
            u = (t = t.replace(/,/g, " ").replace(/-/g, " - ").replace(/-\s+/g, "-").replace(/([a-zA-Z])/g, " $1 ")).replace(/([a-zA-Z])\s?/g, "|$1").split("|"),
            s = u.length, l = [], c = 0, h = 0, f = 0, p = 0, d = 0, g = 0, y = 0, v = 0, _ = "";
        for (n = 1; n < s; n++) if (i = (r = (e = u[n]).substring(0, 1)).toLowerCase(), o = (l = (l = e.replace(r, "").trim().split(" ")).filter((function (t) {
            return "" !== t
        })).map(parseFloat)).length, "m" === i) {
            if (_ += "M ", "m" === r ? (f += l[0], p += l[1]) : (f = l[0], p = l[1]), c = f, h = p, _ += f + " " + p + " ", o > 2) for (a = 0; a < o; a += 2) "m" === r ? (f += l[a], p += l[a + 1]) : (f = l[a], p = l[a + 1]), _ += ["L", f, p, ""].join(" ")
        } else if ("l" === i) for (a = 0; a < o; a += 2) "l" === r ? (f += l[a], p += l[a + 1]) : (f = l[a], p = l[a + 1]), _ += ["L", f, p, ""].join(" "); else if ("h" === i) for (a = 0; a < o; a++) "h" === r ? f += l[a] : f = l[a], _ += ["L", f, p, ""].join(" "); else if ("v" === i) for (a = 0; a < o; a++) "v" === r ? p += l[a] : p = l[a], _ += ["L", f, p, ""].join(" "); else if ("q" === i) for (a = 0; a < o; a += 4) "q" === r ? (d = f + l[a], g = p + l[a + 1], f += l[a + 2], p += l[a + 3]) : (d = l[a], g = l[a + 1], f = l[a + 2], p = l[a + 3]), _ += ["Q", d, g, f, p, ""].join(" "); else if ("t" === i) for (a = 0; a < o; a += 2) d = f + (f - d), g = p + (p - g), "t" === r ? (f += l[a], p += l[a + 1]) : (f = l[a], p = l[a + 1]), _ += ["Q", d, g, f, p, ""].join(" "); else if ("c" === i) for (a = 0; a < o; a += 6) "c" === r ? (d = f + l[a], g = p + l[a + 1], y = f + l[a + 2], v = p + l[a + 3], f += l[a + 4], p += l[a + 5]) : (d = l[a], g = l[a + 1], y = l[a + 2], v = l[a + 3], f = l[a + 4], p = l[a + 5]), _ += ["C", d, g, y, v, f, p, ""].join(" "); else if ("s" === i) for (a = 0; a < o; a += 4) d = f + (f - y), g = p + (p - v), "s" === r ? (y = f + l[a], v = p + l[a + 1], f += l[a + 2], p += l[a + 3]) : (y = l[a], v = l[a + 1], f = l[a + 2], p = l[a + 3]), _ += ["C", d, g, y, v, f, p, ""].join(" "); else "z" === i && (_ += "Z ", f = c, p = h);
        return _.trim()
    }, Ci = {x: !1, y: !1};

    function Oi(t, n, e) {
        if ("Z" !== n) {
            if ("M" !== n) {
                var r = [!1, Ci.x, Ci.y].concat(e), i = new (t.bind.apply(t, r)), o = e.slice(-2);
                return Ci = {x: o[0], y: o[1]}, i
            }
            Ci = {x: e[0], y: e[1]}
        }
    }

    var Pi = function (t, n) {
        for (var e, r, i = Ni(n).split(" "), o = new RegExp("[MLCQZ]", ""), a = [], u = {
            C: 6,
            Q: 4,
            L: 2,
            M: 2
        }; i.length;) e = i.splice(0, 1)[0], o.test(e) && (r = Oi(t, e, i.splice(0, u[e]).map(parseFloat))) && a.push(r);
        return new t.PolyBezier(a)
    }, Ti = ir((function (t) {
        !function () {
            var n = Math.abs, e = Math.min, r = Math.max, i = Math.cos, o = Math.sin, a = Math.acos, u = Math.sqrt,
                s = Math.PI, l = {x: 0, y: 0, z: 0}, c = Si, h = Ei, f = function (t) {
                    var e = t && t.forEach ? t : [].slice.call(arguments), r = !1;
                    if ("object" == typeof e[0]) {
                        r = e.length;
                        var i = [];
                        e.forEach((function (t) {
                            ["x", "y", "z"].forEach((function (n) {
                                void 0 !== t[n] && i.push(t[n])
                            }))
                        })), e = i
                    }
                    var o = !1, a = e.length;
                    if (r) {
                        if (r > 4) {
                            if (1 !== arguments.length) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
                            o = !0
                        }
                    } else if (6 !== a && 8 !== a && 9 !== a && 12 !== a && 1 !== arguments.length) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
                    var u = !o && (9 === a || 12 === a) || t && t[0] && void 0 !== t[0].z;
                    this._3d = u;
                    for (var s = [], l = 0, h = u ? 3 : 2; l < a; l += h) {
                        var f = {x: e[l], y: e[l + 1]};
                        u && (f.z = e[l + 2]), s.push(f)
                    }
                    this.order = s.length - 1, this.points = s;
                    var p = ["x", "y"];
                    u && p.push("z"), this.dims = p, this.dimlen = p.length, function (t) {
                        for (var e = t.order, r = t.points, i = c.align(r, {
                            p1: r[0],
                            p2: r[e]
                        }), o = 0; o < i.length; o++) if (n(i[o].y) > 1e-4) return void (t._linear = !1);
                        t._linear = !0
                    }(this), this._t1 = 0, this._t2 = 1, this.update()
                }, p = Pi;

            function d(t, n, e, r, i) {
                void 0 === i && (i = .5);
                var o = c.projectionratio(i, t), a = 1 - o, u = {x: o * n.x + a * r.x, y: o * n.y + a * r.y},
                    s = c.abcratio(i, t);
                return {A: {x: e.x + (e.x - u.x) / s, y: e.y + (e.y - u.y) / s}, B: e, C: u}
            }

            f.SVGtoBeziers = function (t) {
                return p(f, t)
            }, f.quadraticFromPoints = function (t, n, e, r) {
                if (void 0 === r && (r = .5), 0 === r) return new f(n, n, e);
                if (1 === r) return new f(t, n, n);
                var i = d(2, t, n, e, r);
                return new f(t, i.A, e)
            }, f.cubicFromPoints = function (t, n, e, r, i) {
                void 0 === r && (r = .5);
                var o = d(3, t, n, e, r);
                void 0 === i && (i = c.dist(n, o.C));
                var a = i * (1 - r) / r, u = c.dist(t, e), s = (e.x - t.x) / u, l = (e.y - t.y) / u, h = i * s,
                    p = i * l, g = a * s, y = a * l, v = n.x - h, _ = n.y - p, m = n.x + g, x = n.y + y, b = o.A,
                    w = b.x + (v - b.x) / (1 - r), k = b.y + (_ - b.y) / (1 - r), z = b.x + (m - b.x) / r,
                    A = b.y + (x - b.y) / r, M = {x: t.x + (w - t.x) / r, y: t.y + (k - t.y) / r},
                    S = {x: e.x + (z - e.x) / (1 - r), y: e.y + (A - e.y) / (1 - r)};
                return new f(t, M, S, e)
            };
            var g = function () {
                return c
            };
            f.getUtils = g, f.PolyBezier = h, f.prototype = {
                getUtils: g, valueOf: function () {
                    return this.toString()
                }, toString: function () {
                    return c.pointsToString(this.points)
                }, toSVG: function (t) {
                    if (this._3d) return !1;
                    for (var n = this.points, e = ["M", n[0].x, n[0].y, 2 === this.order ? "Q" : "C"], r = 1, i = n.length; r < i; r++) e.push(n[r].x), e.push(n[r].y);
                    return e.join(" ")
                }, setRatios: function (t) {
                    if (t.length !== this.points.length) throw new Error("incorrect number of ratio values");
                    this.ratios = t, this._lut = []
                }, verify: function () {
                    var t = this.coordDigest();
                    t !== this._print && (this._print = t, this.update())
                }, coordDigest: function () {
                    return this.points.map((function (t, n) {
                        return "" + n + t.x + t.y + (t.z ? t.z : 0)
                    })).join("")
                }, update: function (t) {
                    this._lut = [], this.dpoints = c.derive(this.points, this._3d), this.computedirection()
                }, computedirection: function () {
                    var t = this.points, n = c.angle(t[0], t[this.order], t[1]);
                    this.clockwise = n > 0
                }, length: function () {
                    return c.length(this.derivative.bind(this))
                }, _lut: [], getLUT: function (t) {
                    if (this.verify(), t = t || 100, this._lut.length === t) return this._lut;
                    this._lut = [], t--;
                    for (var n = 0; n <= t; n++) this._lut.push(this.compute(n / t));
                    return this._lut
                }, on: function (t, n) {
                    n = n || 5;
                    for (var e, r = this.getLUT(), i = [], o = 0, a = 0; a < r.length; a++) e = r[a], c.dist(e, t) < n && (i.push(e), o += a / r.length);
                    return !!i.length && o / i.length
                }, project: function (t) {
                    var n, e, r, i, o = this.getLUT(), a = o.length - 1, u = c.closest(o, t), s = u.mdist, l = u.mpos,
                        h = (l + 1) / a, f = .1 / a;
                    for (s += 1, n = e = (l - 1) / a; e < h + f; e += f) r = this.compute(e), (i = c.dist(t, r)) < s && (s = i, n = e);
                    return (r = this.compute(n)).t = n, r.d = s, r
                }, get: function (t) {
                    return this.compute(t)
                }, point: function (t) {
                    return this.points[t]
                }, compute: function (t) {
                    return this.ratios ? c.computeWithRatios(t, this.points, this.ratios, this._3d) : c.compute(t, this.points, this._3d, this.ratios)
                }, raise: function () {
                    for (var t, n, e = this.points, r = [e[0]], i = e.length, o = 1; o < i; o++) t = e[o], n = e[o - 1], r[o] = {
                        x: (i - o) / i * t.x + o / i * n.x,
                        y: (i - o) / i * t.y + o / i * n.y
                    };
                    return r[i] = e[i - 1], new f(r)
                }, derivative: function (t) {
                    var n, e, r = 1 - t, i = 0, o = this.dpoints[0];
                    2 === this.order && (o = [o[0], o[1], l], n = r, e = t), 3 === this.order && (n = r * r, e = r * t * 2, i = t * t);
                    var a = {x: n * o[0].x + e * o[1].x + i * o[2].x, y: n * o[0].y + e * o[1].y + i * o[2].y};
                    return this._3d && (a.z = n * o[0].z + e * o[1].z + i * o[2].z), a
                }, curvature: function (t) {
                    return c.curvature(t, this.points, this._3d)
                }, inflections: function () {
                    return c.inflections(this.points)
                }, normal: function (t) {
                    return this._3d ? this.__normal3(t) : this.__normal2(t)
                }, __normal2: function (t) {
                    var n = this.derivative(t), e = u(n.x * n.x + n.y * n.y);
                    return {x: -n.y / e, y: n.x / e}
                }, __normal3: function (t) {
                    var n = this.derivative(t), e = this.derivative(t + .01), r = u(n.x * n.x + n.y * n.y + n.z * n.z),
                        i = u(e.x * e.x + e.y * e.y + e.z * e.z);
                    n.x /= r, n.y /= r, n.z /= r, e.x /= i, e.y /= i, e.z /= i;
                    var o = {x: e.y * n.z - e.z * n.y, y: e.z * n.x - e.x * n.z, z: e.x * n.y - e.y * n.x},
                        a = u(o.x * o.x + o.y * o.y + o.z * o.z);
                    o.x /= a, o.y /= a, o.z /= a;
                    var s = [o.x * o.x, o.x * o.y - o.z, o.x * o.z + o.y, o.x * o.y + o.z, o.y * o.y, o.y * o.z - o.x, o.x * o.z - o.y, o.y * o.z + o.x, o.z * o.z];
                    return {
                        x: s[0] * n.x + s[1] * n.y + s[2] * n.z,
                        y: s[3] * n.x + s[4] * n.y + s[5] * n.z,
                        z: s[6] * n.x + s[7] * n.y + s[8] * n.z
                    }
                }, hull: function (t) {
                    var n, e = this.points, r = [], i = [], o = 0, a = 0, u = 0;
                    for (i[o++] = e[0], i[o++] = e[1], i[o++] = e[2], 3 === this.order && (i[o++] = e[3]); e.length > 1;) {
                        for (r = [], a = 0, u = e.length - 1; a < u; a++) n = c.lerp(t, e[a], e[a + 1]), i[o++] = n, r.push(n);
                        e = r
                    }
                    return i
                }, split: function (t, n) {
                    if (0 === t && n) return this.split(n).left;
                    if (1 === n) return this.split(t).right;
                    var e = this.hull(t), r = {
                        left: 2 === this.order ? new f([e[0], e[3], e[5]]) : new f([e[0], e[4], e[7], e[9]]),
                        right: 2 === this.order ? new f([e[5], e[4], e[2]]) : new f([e[9], e[8], e[6], e[3]]),
                        span: e
                    };
                    return r.left._t1 = c.map(0, 0, 1, this._t1, this._t2), r.left._t2 = c.map(t, 0, 1, this._t1, this._t2), r.right._t1 = c.map(t, 0, 1, this._t1, this._t2), r.right._t2 = c.map(1, 0, 1, this._t1, this._t2), n ? (n = c.map(n, t, 1, 0, 1), r.right.split(n).left) : r
                }, extrema: function () {
                    var t, n, e = this.dims, r = {}, i = [];
                    return e.forEach(function (e) {
                        n = function (t) {
                            return t[e]
                        }, t = this.dpoints[0].map(n), r[e] = c.droots(t), 3 === this.order && (t = this.dpoints[1].map(n), r[e] = r[e].concat(c.droots(t))), r[e] = r[e].filter((function (t) {
                            return t >= 0 && t <= 1
                        })), i = i.concat(r[e].sort(c.numberSort))
                    }.bind(this)), i = i.sort(c.numberSort).filter((function (t, n) {
                        return i.indexOf(t) === n
                    })), r.values = i, r
                }, bbox: function () {
                    var t = this.extrema(), n = {};
                    return this.dims.forEach(function (e) {
                        n[e] = c.getminmax(this, e, t[e])
                    }.bind(this)), n
                }, overlaps: function (t) {
                    var n = this.bbox(), e = t.bbox();
                    return c.bboxoverlap(n, e)
                }, offset: function (t, n) {
                    if (void 0 !== n) {
                        var e = this.get(t), r = this.normal(t), i = {c: e, n: r, x: e.x + r.x * n, y: e.y + r.y * n};
                        return this._3d && (i.z = e.z + r.z * n), i
                    }
                    if (this._linear) {
                        var o = this.normal(0), a = this.points.map((function (n) {
                            var e = {x: n.x + t * o.x, y: n.y + t * o.y};
                            return n.z && r.z && (e.z = n.z + t * o.z), e
                        }));
                        return [new f(a)]
                    }
                    return this.reduce().map((function (n) {
                        return n._linear ? n.offset(t)[0] : n.scale(t)
                    }))
                }, simple: function () {
                    if (3 === this.order) {
                        var t = c.angle(this.points[0], this.points[3], this.points[1]),
                            e = c.angle(this.points[0], this.points[3], this.points[2]);
                        if (t > 0 && e < 0 || t < 0 && e > 0) return !1
                    }
                    var r = this.normal(0), i = this.normal(1), o = r.x * i.x + r.y * i.y;
                    return this._3d && (o += r.z * i.z), n(a(o)) < s / 3
                }, reduce: function () {
                    var t, e, r = 0, i = 0, o = [], a = [], u = this.extrema().values;
                    for (-1 === u.indexOf(0) && (u = [0].concat(u)), -1 === u.indexOf(1) && u.push(1), r = u[0], t = 1; t < u.length; t++) i = u[t], (e = this.split(r, i))._t1 = r, e._t2 = i, o.push(e), r = i;
                    return o.forEach((function (t) {
                        for (r = 0, i = 0; i <= 1;) for (i = r + .01; i <= 1.01; i += .01) if (!(e = t.split(r, i)).simple()) {
                            if (n(r - (i -= .01)) < .01) return [];
                            (e = t.split(r, i))._t1 = c.map(r, 0, 1, t._t1, t._t2), e._t2 = c.map(i, 0, 1, t._t1, t._t2), a.push(e), r = i;
                            break
                        }
                        r < 1 && ((e = t.split(r, 1))._t1 = c.map(r, 0, 1, t._t1, t._t2), e._t2 = t._t2, a.push(e))
                    })), a
                }, scale: function (t) {
                    var n = this.order, e = !1;
                    if ("function" == typeof t && (e = t), e && 2 === n) return this.raise().scale(e);
                    var r = this.clockwise, i = e ? e(0) : t, o = e ? e(1) : t,
                        a = [this.offset(0, 10), this.offset(1, 10)], s = c.lli4(a[0], a[0].c, a[1], a[1].c);
                    if (!s) throw new Error("cannot scale this curve. Try reducing it first.");
                    var l = this.points, h = [];
                    return [0, 1].forEach(function (t) {
                        var e = h[t * n] = c.copy(l[t * n]);
                        e.x += (t ? o : i) * a[t].n.x, e.y += (t ? o : i) * a[t].n.y
                    }.bind(this)), e ? ([0, 1].forEach(function (i) {
                        if (2 !== this.order || !i) {
                            var o = l[i + 1], a = {x: o.x - s.x, y: o.y - s.y}, c = e ? e((i + 1) / n) : t;
                            e && !r && (c = -c);
                            var f = u(a.x * a.x + a.y * a.y);
                            a.x /= f, a.y /= f, h[i + 1] = {x: o.x + c * a.x, y: o.y + c * a.y}
                        }
                    }.bind(this)), new f(h)) : ([0, 1].forEach(function (t) {
                        if (2 !== this.order || !t) {
                            var e = h[t * n], r = this.derivative(t), i = {x: e.x + r.x, y: e.y + r.y};
                            h[t + 1] = c.lli4(e, i, s, l[t + 1])
                        }
                    }.bind(this)), new f(h))
                }, outline: function (t, n, e, r) {
                    n = void 0 === n ? t : n;
                    var i, o = this.reduce(), a = o.length, u = [], s = [], l = 0, f = this.length(),
                        p = void 0 !== e && void 0 !== r;

                    function d(t, n, e, r, i) {
                        return function (o) {
                            var a = r / e, u = (r + i) / e, s = n - t;
                            return c.map(o, 0, 1, t + a * s, t + u * s)
                        }
                    }

                    o.forEach((function (i) {
                        w = i.length(), p ? (u.push(i.scale(d(t, e, f, l, w))), s.push(i.scale(d(-n, -r, f, l, w)))) : (u.push(i.scale(t)), s.push(i.scale(-n))), l += w
                    })), s = s.map((function (t) {
                        return (i = t.points)[3] ? t.points = [i[3], i[2], i[1], i[0]] : t.points = [i[2], i[1], i[0]], t
                    })).reverse();
                    var g = u[0].points[0], y = u[a - 1].points[u[a - 1].points.length - 1],
                        v = s[a - 1].points[s[a - 1].points.length - 1], _ = s[0].points[0], m = c.makeline(v, g),
                        x = c.makeline(y, _), b = [m].concat(u).concat([x]).concat(s), w = b.length;
                    return new h(b)
                }, outlineshapes: function (t, n, e) {
                    n = n || t;
                    for (var r = this.outline(t, n).curves, i = [], o = 1, a = r.length; o < a / 2; o++) {
                        var u = c.makeshape(r[o], r[a - o], e);
                        u.startcap.virtual = o > 1, u.endcap.virtual = o < a / 2 - 1, i.push(u)
                    }
                    return i
                }, intersects: function (t, n) {
                    return t ? t.p1 && t.p2 ? this.lineIntersects(t) : (t instanceof f && (t = t.reduce()), this.curveintersects(this.reduce(), t, n)) : this.selfintersects(n)
                }, lineIntersects: function (t) {
                    var n = e(t.p1.x, t.p2.x), i = e(t.p1.y, t.p2.y), o = r(t.p1.x, t.p2.x), a = r(t.p1.y, t.p2.y),
                        u = this;
                    return c.roots(this.points, t).filter((function (t) {
                        var e = u.get(t);
                        return c.between(e.x, n, o) && c.between(e.y, i, a)
                    }))
                }, selfintersects: function (t) {
                    var n, e, r, i, o = this.reduce(), a = o.length - 2, u = [];
                    for (n = 0; n < a; n++) r = o.slice(n, n + 1), i = o.slice(n + 2), e = this.curveintersects(r, i, t), u = u.concat(e);
                    return u
                }, curveintersects: function (t, n, e) {
                    var r = [];
                    t.forEach((function (t) {
                        n.forEach((function (n) {
                            t.overlaps(n) && r.push({left: t, right: n})
                        }))
                    }));
                    var i = [];
                    return r.forEach((function (t) {
                        var n = c.pairiteration(t.left, t.right, e);
                        n.length > 0 && (i = i.concat(n))
                    })), i
                }, arcs: function (t) {
                    t = t || .5;
                    return this._iterate(t, [])
                }, _error: function (t, e, r, i) {
                    var o = (i - r) / 4, a = this.get(r + o), u = this.get(i - o), s = c.dist(t, e), l = c.dist(t, a),
                        h = c.dist(t, u);
                    return n(l - s) + n(h - s)
                }, _iterate: function (t, n) {
                    var e, r = 0, a = 1;
                    do {
                        e = 0, a = 1;
                        var u, s, l, h, f, p = this.get(r), d = !1, g = !1, y = a, v = 1;
                        do {
                            if (g = d, h = l, y = (r + a) / 2, u = this.get(y), s = this.get(a), (l = c.getccenter(p, u, s)).interval = {
                                start: r,
                                end: a
                            }, d = this._error(l, p, r, a) <= t, (f = g && !d) || (v = a), d) {
                                if (a >= 1) {
                                    if (l.interval.end = v = 1, h = l, a > 1) {
                                        var _ = {x: l.x + l.r * i(l.e), y: l.y + l.r * o(l.e)};
                                        l.e += c.angle({x: l.x, y: l.y}, _, this.get(1))
                                    }
                                    break
                                }
                                a += (a - r) / 2
                            } else a = y
                        } while (!f && e++ < 100);
                        if (e >= 100) break;
                        h = h || l, n.push(h), r = v
                    } while (a < 1);
                    return n
                }
            }, t.exports = f
        }()
    })), ji = Ti;

    function Ri(t, n) {
        if (null == t) return {};
        var e, r, i = function (t, n) {
            if (null == t) return {};
            var e, r, i = {}, o = Object.keys(t);
            for (r = 0; r < o.length; r++) e = o[r], n.indexOf(e) >= 0 || (i[e] = t[e]);
            return i
        }(t, n);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (r = 0; r < o.length; r++) e = o[r], n.indexOf(e) >= 0 || Object.prototype.propertyIsEnumerable.call(t, e) && (i[e] = t[e])
        }
        return i
    }

    function Di(t, n) {
        return function (t) {
            if (Array.isArray(t)) return t
        }(t) || function (t, n) {
            if (!(Symbol.iterator in Object(t)) && "[object Arguments]" !== Object.prototype.toString.call(t)) return;
            var e = [], r = !0, i = !1, o = void 0;
            try {
                for (var a, u = t[Symbol.iterator](); !(r = (a = u.next()).done) && (e.push(a.value), !n || e.length !== n); r = !0) ;
            } catch (t) {
                i = !0, o = t
            } finally {
                try {
                    r || null == u.return || u.return()
                } finally {
                    if (i) throw o
                }
            }
            return e
        }(t, n) || function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function Ii(t) {
        return function (t) {
            if (Array.isArray(t)) {
                for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];
                return e
            }
        }(t) || function (t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }

    function Ui(t) {
        var n = function (t, n) {
            if ("object" != typeof t || null === t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var r = e.call(t, n || "default");
                if ("object" != typeof r) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === n ? String : Number)(t)
        }(t, "string");
        return "symbol" == typeof n ? n : String(n)
    }

    function Fi(t, n) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                this.range(t);
                break;
            default:
                this.range(n).domain(t)
        }
        return this
    }

    const Li = Symbol("implicit");
    var qi = function t() {
        var n = new Map, e = [], r = [], i = Li;

        function o(t) {
            var o = t + "", a = n.get(o);
            if (!a) {
                if (i !== Li) return i;
                n.set(o, a = e.push(t))
            }
            return r[(a - 1) % r.length]
        }

        return o.domain = function (t) {
            if (!arguments.length) return e.slice();
            e = [], n = new Map;
            for (const r of t) {
                const t = r + "";
                n.has(t) || n.set(t, e.push(r))
            }
            return o
        }, o.range = function (t) {
            return arguments.length ? (r = Array.from(t), o) : r.slice()
        }, o.unknown = function (t) {
            return arguments.length ? (i = t, o) : i
        }, o.copy = function () {
            return t(e, r).unknown(i)
        }, Fi.apply(o, arguments), o
    }(function (t) {
        for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n;) e[r] = "#" + t.slice(6 * r, 6 * ++r);
        return e
    }("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"));

    function Bi(t, n, e) {
        n && "string" == typeof e && t.filter((function (t) {
            return !t[e]
        })).forEach((function (t) {
            t[e] = qi(n(t))
        }))
    }

    var Hi = Rr({
        props: {
            graphData: {
                default: {nodes: [], links: []}, onChange: function (t, n) {
                    n.engineRunning = !1
                }
            },
            dagMode: {
                onChange: function (t, n) {
                    !t && (n.graphData.nodes || []).forEach((function (t) {
                        return t.fx = t.fy = void 0
                    }))
                }
            },
            dagLevelDistance: {},
            dagNodeFilter: {
                default: function (t) {
                    return !0
                }
            },
            onDagError: {triggerUpdate: !1},
            nodeRelSize: {default: 4, triggerUpdate: !1},
            nodeId: {default: "id"},
            nodeVal: {default: "val", triggerUpdate: !1},
            nodeColor: {default: "color", triggerUpdate: !1},
            nodeAutoColorBy: {},
            nodeCanvasObject: {triggerUpdate: !1},
            nodeCanvasObjectMode: {
                default: function () {
                    return "replace"
                }, triggerUpdate: !1
            },
            nodeVisibility: {default: !0, triggerUpdate: !1},
            linkSource: {default: "source"},
            linkTarget: {default: "target"},
            linkVisibility: {default: !0, triggerUpdate: !1},
            linkColor: {default: "color", triggerUpdate: !1},
            linkAutoColorBy: {},
            linkLineDash: {triggerUpdate: !1},
            linkWidth: {default: 1, triggerUpdate: !1},
            linkCurvature: {default: 0, triggerUpdate: !1},
            linkCanvasObject: {triggerUpdate: !1},
            linkCanvasObjectMode: {
                default: function () {
                    return "replace"
                }, triggerUpdate: !1
            },
            linkDirectionalArrowLength: {default: 0, triggerUpdate: !1},
            linkDirectionalArrowColor: {triggerUpdate: !1},
            linkDirectionalArrowRelPos: {default: .5, triggerUpdate: !1},
            linkDirectionalParticles: {default: 0},
            linkDirectionalParticleSpeed: {default: .01, triggerUpdate: !1},
            linkDirectionalParticleWidth: {default: 4, triggerUpdate: !1},
            linkDirectionalParticleColor: {triggerUpdate: !1},
            globalScale: {default: 1, triggerUpdate: !1},
            d3AlphaMin: {default: 0, triggerUpdate: !1},
            d3AlphaDecay: {
                default: .0228, triggerUpdate: !1, onChange: function (t, n) {
                    n.forceLayout.alphaDecay(t)
                }
            },
            d3AlphaTarget: {
                default: 0, triggerUpdate: !1, onChange: function (t, n) {
                    n.forceLayout.alphaTarget(t)
                }
            },
            d3VelocityDecay: {
                default: .4, triggerUpdate: !1, onChange: function (t, n) {
                    n.forceLayout.velocityDecay(t)
                }
            },
            warmupTicks: {default: 0, triggerUpdate: !1},
            cooldownTicks: {default: 1 / 0, triggerUpdate: !1},
            cooldownTime: {default: 15e3, triggerUpdate: !1},
            onUpdate: {
                default: function () {
                }, triggerUpdate: !1
            },
            onFinishUpdate: {
                default: function () {
                }, triggerUpdate: !1
            },
            onEngineTick: {
                default: function () {
                }, triggerUpdate: !1
            },
            onEngineStop: {
                default: function () {
                }, triggerUpdate: !1
            },
            isShadow: {default: !1, triggerUpdate: !1}
        }, methods: {
            d3Force: function (t, n, e) {
                return void 0 === e ? t.forceLayout.force(n) : (t.forceLayout.force(n, e), this)
            }, d3ReheatSimulation: function (t) {
                return t.forceLayout.alpha(1), this.resetCountdown(), this
            }, resetCountdown: function (t) {
                return t.cntTicks = 0, t.startTickTime = new Date, t.engineRunning = !0, this
            }, tickFrame: function (t) {
                var n, e, r, i, o, l;
                return !t.isShadow && t.engineRunning && (++t.cntTicks > t.cooldownTicks || new Date - t.startTickTime > t.cooldownTime || t.d3AlphaMin > 0 && t.forceLayout.alpha() < t.d3AlphaMin ? (t.engineRunning = !1, t.onEngineStop()) : (t.forceLayout.tick(), t.onEngineTick())), function () {
                    var n = Dr(t.linkVisibility), e = Dr(t.linkColor), r = Dr(t.linkWidth), i = Dr(t.linkLineDash),
                        o = Dr(t.linkCurvature), a = Dr(t.linkCanvasObjectMode), l = t.ctx, c = 2 * t.isShadow,
                        h = t.graphData.links.filter(n);
                    h.forEach((function (t) {
                        var n = o(t);
                        if (!n) return void (t.__controlPoints = null);
                        var e = t.source, r = t.target;
                        if (!(e && r && e.hasOwnProperty("x") && r.hasOwnProperty("x"))) return;
                        var i = Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
                        if (i > 0) {
                            var a = Math.atan2(r.y - e.y, r.x - e.x), u = i * n, s = {
                                x: (e.x + r.x) / 2 + u * Math.cos(a - Math.PI / 2),
                                y: (e.y + r.y) / 2 + u * Math.sin(a - Math.PI / 2)
                            };
                            t.__controlPoints = [s.x, s.y]
                        } else {
                            var l = 70 * n;
                            t.__controlPoints = [r.x, r.y - l, r.x + l, r.y]
                        }
                    }));
                    var f = [], p = [], d = h;
                    if (t.linkCanvasObject) {
                        var g = [], y = [];
                        h.forEach((function (t) {
                            return ({before: f, after: p, replace: g}[a(t)] || y).push(t)
                        })), d = [].concat(s(f), p, y), f = f.concat(g)
                    }
                    l.save(), f.forEach((function (n) {
                        return t.linkCanvasObject(n, l, t.globalScale)
                    })), l.restore();
                    var v = function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                            e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                            i = (n instanceof Array ? n.length ? n : [void 0] : [n]).map((function (t) {
                                return {keyAccessor: t, isProp: !(t instanceof Function)}
                            })), o = t.reduce((function (t, n) {
                                var r = t, o = n;
                                return i.forEach((function (t, n) {
                                    var a, u = t.keyAccessor;
                                    if (t.isProp) {
                                        var s = o, l = s[u], c = Ri(s, [u].map(Ui));
                                        a = l, o = c
                                    } else a = u(o, n);
                                    n + 1 < i.length ? (r.hasOwnProperty(a) || (r[a] = {}), r = r[a]) : e ? (r.hasOwnProperty(a) || (r[a] = []), r[a].push(o)) : r[a] = o
                                })), t
                            }), {});
                        e instanceof Function && function t(n) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                            r === i.length ? Object.keys(n).forEach((function (t) {
                                return n[t] = e(n[t])
                            })) : Object.values(n).forEach((function (n) {
                                return t(n, r + 1)
                            }))
                        }(o);
                        var a = o;
                        return r && (a = [], function t(n) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                            e.length === i.length ? a.push({
                                keys: e,
                                vals: n
                            }) : Object.entries(n).forEach((function (n) {
                                var r = Di(n, 2), i = r[0], o = r[1];
                                return t(o, [].concat(Ii(e), [i]))
                            }))
                        }(o), n instanceof Array && 0 === n.length && 1 === a.length && (a[0].keys = [])), a
                    }(d, [e, r, i]);
                    l.save(), Object.entries(v).forEach((function (n) {
                        var e = u(n, 2), r = e[0], o = e[1], a = r && "undefined" !== r ? r : "rgba(0,0,0,0.15)";
                        Object.entries(o).forEach((function (n) {
                            var e = u(n, 2), r = e[0], o = e[1], h = (r || 1) / t.globalScale + c;
                            Object.entries(o).forEach((function (t) {
                                var n = u(t, 2), e = (n[0], n[1]), r = i(e[0]);
                                l.beginPath(), e.forEach((function (t) {
                                    var n = t.source, e = t.target;
                                    if (n && e && n.hasOwnProperty("x") && e.hasOwnProperty("x")) {
                                        l.moveTo(n.x, n.y);
                                        var r = t.__controlPoints;
                                        r ? l[2 === r.length ? "quadraticCurveTo" : "bezierCurveTo"].apply(l, s(r).concat([e.x, e.y])) : l.lineTo(e.x, e.y)
                                    }
                                })), l.strokeStyle = a, l.lineWidth = h, l.setLineDash(r || []), l.stroke()
                            }))
                        }))
                    })), l.restore(), l.save(), p.forEach((function (n) {
                        return t.linkCanvasObject(n, l, t.globalScale)
                    })), l.restore()
                }(), !t.isShadow && (n = Dr(t.linkDirectionalArrowLength), e = Dr(t.linkDirectionalArrowRelPos), r = Dr(t.linkVisibility), i = Dr(t.linkDirectionalArrowColor || t.linkColor), o = Dr(t.nodeVal), (l = t.ctx).save(), t.graphData.links.filter(r).forEach((function (r) {
                    var u = n(r);
                    if (u && !(u < 0)) {
                        var c = r.source, h = r.target;
                        if (c && h && c.hasOwnProperty("x") && h.hasOwnProperty("x")) {
                            var f = Math.sqrt(Math.max(0, o(c) || 1)) * t.nodeRelSize,
                                p = Math.sqrt(Math.max(0, o(h) || 1)) * t.nodeRelSize,
                                d = Math.min(1, Math.max(0, e(r))), g = i(r) || "rgba(0,0,0,0.28)", y = u / 1.6 / 2,
                                v = r.__controlPoints && a(ji, [c.x, c.y].concat(s(r.__controlPoints), [h.x, h.y])),
                                _ = v ? function (t) {
                                    return v.get(t)
                                } : function (t) {
                                    return {x: c.x + (h.x - c.x) * t || 0, y: c.y + (h.y - c.y) * t || 0}
                                }, m = v ? v.length() : Math.sqrt(Math.pow(h.x - c.x, 2) + Math.pow(h.y - c.y, 2)),
                                x = f + u + (m - f - p - u) * d, b = _(x / m), w = _((x - u) / m),
                                k = _((x - .8 * u) / m), z = Math.atan2(b.y - w.y, b.x - w.x) - Math.PI / 2;
                            l.beginPath(), l.moveTo(b.x, b.y), l.lineTo(w.x + y * Math.cos(z), w.y + y * Math.sin(z)), l.lineTo(k.x, k.y), l.lineTo(w.x - y * Math.cos(z), w.y - y * Math.sin(z)), l.fillStyle = g, l.fill()
                        }
                    }
                })), l.restore()), !t.isShadow && function () {
                    var n = Dr(t.linkDirectionalParticles), e = Dr(t.linkDirectionalParticleSpeed),
                        r = Dr(t.linkDirectionalParticleWidth), i = Dr(t.linkVisibility),
                        o = Dr(t.linkDirectionalParticleColor || t.linkColor), u = t.ctx;
                    u.save(), t.graphData.links.filter(i).forEach((function (i) {
                        var l = n(i);
                        if (i.hasOwnProperty("__photons") && i.__photons.length) {
                            var c = i.source, h = i.target;
                            if (c && h && c.hasOwnProperty("x") && h.hasOwnProperty("x")) {
                                var f = e(i), p = i.__photons || [],
                                    d = Math.max(0, r(i) / 2) / Math.sqrt(t.globalScale),
                                    g = o(i) || "rgba(0,0,0,0.28)";
                                u.fillStyle = g;
                                var y = i.__controlPoints ? a(ji, [c.x, c.y].concat(s(i.__controlPoints), [h.x, h.y])) : null,
                                    v = 0, _ = !1;
                                p.forEach((function (t) {
                                    var n = !!t.__singleHop;
                                    if (t.hasOwnProperty("__progressRatio") || (t.__progressRatio = n ? 0 : v / l), !n && v++, t.__progressRatio += f, t.__progressRatio >= 1) {
                                        if (n) return void (_ = !0);
                                        t.__progressRatio = t.__progressRatio % 1
                                    }
                                    var e = t.__progressRatio, r = y ? y.get(e) : {
                                        x: c.x + (h.x - c.x) * e || 0,
                                        y: c.y + (h.y - c.y) * e || 0
                                    };
                                    u.beginPath(), u.arc(r.x, r.y, d, 0, 2 * Math.PI, !1), u.fill()
                                })), _ && (i.__photons = i.__photons.filter((function (t) {
                                    return !t.__singleHop || t.__progressRatio <= 1
                                })))
                            }
                        }
                    })), u.restore()
                }(), function () {
                    var n = Dr(t.nodeVisibility), e = Dr(t.nodeVal), r = Dr(t.nodeColor),
                        i = Dr(t.nodeCanvasObjectMode), o = t.ctx, a = t.isShadow / t.globalScale,
                        u = t.graphData.nodes.filter(n);
                    o.save(), u.forEach((function (n) {
                        var u = i(n);
                        if (!t.nodeCanvasObject || "before" !== u && "replace" !== u || (t.nodeCanvasObject(n, o, t.globalScale, t.isShadow), "replace" !== u)) {
                            var s = Math.sqrt(Math.max(0, e(n) || 1)) * t.nodeRelSize + a;
                            o.beginPath(), o.arc(n.x, n.y, s, 0, 2 * Math.PI, !1), o.fillStyle = r(n) || "rgba(31, 120, 180, 0.92)", o.fill(), t.nodeCanvasObject && "after" === u && t.nodeCanvasObject(n, t.ctx, t.globalScale)
                        } else o.restore()
                    })), o.restore()
                }(), this
            }, emitParticle: function (t, n) {
                return n && (!n.__photons && (n.__photons = []), n.__photons.push({__singleHop: !0})), this
            }
        }, stateInit: function () {
            return {
                forceLayout: Ai().force("link", mi()).force("charge", Mi()).force("center", Vr()).force("dagRadial", null).stop(),
                engineRunning: !1
            }
        }, init: function (t, n) {
            n.ctx = t
        }, update: function (e) {
            if (e.engineRunning = !1, e.onUpdate(), null !== e.nodeAutoColorBy && Bi(e.graphData.nodes, Dr(e.nodeAutoColorBy), e.nodeColor), null !== e.linkAutoColorBy && Bi(e.graphData.links, Dr(e.linkAutoColorBy), e.linkColor), e.graphData.links.forEach((function (t) {
                t.source = t[e.linkSource], t.target = t[e.linkTarget]
            })), !e.isShadow) {
                var r = Dr(e.linkDirectionalParticles);
                e.graphData.links.forEach((function (t) {
                    var n = Math.round(Math.abs(r(t)));
                    n ? t.__photons = s(Array(n)).map((function () {
                        return {}
                    })) : delete t.__photons
                }))
            }
            e.forceLayout.stop().alpha(1).nodes(e.graphData.nodes);
            var i = e.forceLayout.force("link");
            i && i.id((function (t) {
                return t[e.nodeId]
            })).links(e.graphData.links);
            var o = e.dagMode && function (e, r) {
                    var i = e.nodes, o = e.links, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        l = a.nodeFilter, c = void 0 === l ? function () {
                            return !0
                        } : l, h = a.onLoopError, f = void 0 === h ? function (t) {
                            throw"Invalid DAG structure! Found cycle in node path: ".concat(t.join(" -> "), ".")
                        } : h, p = {};
                    i.forEach((function (t) {
                        return p[r(t)] = {data: t, out: [], depth: -1, skip: !c(t)}
                    })), o.forEach((function (n) {
                        var e = n.source, i = n.target, o = l(e), a = l(i);
                        if (!p.hasOwnProperty(o)) throw"Missing source node with id: ".concat(o);
                        if (!p.hasOwnProperty(a)) throw"Missing target node with id: ".concat(a);
                        var u = p[o], s = p[a];

                        function l(n) {
                            return "object" === t(n) ? r(n) : n
                        }

                        u.out.push(s)
                    }));
                    var d = [];
                    y(Object.values(p));
                    var g = Object.assign.apply(Object, [{}].concat(s(Object.entries(p).filter((function (t) {
                        return !u(t, 2)[1].skip
                    })).map((function (t) {
                        var e = u(t, 2);
                        return n({}, e[0], e[1].depth)
                    })))));
                    return g;

                    function y(t) {
                        for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i = 0, o = t.length; i < o; i++) {
                            var a = t[i];
                            if (-1 !== n.indexOf(a)) {
                                var u = function () {
                                    var t = [].concat(s(n.slice(n.indexOf(a))), [a]).map((function (t) {
                                        return r(t.data)
                                    }));
                                    return d.some((function (n) {
                                        return n.length === t.length && n.every((function (n, e) {
                                            return n === t[e]
                                        }))
                                    })) || (d.push(t), f(t)), "continue"
                                }();
                                if ("continue" === u) continue
                            }
                            e > a.depth && (a.depth = e, y(a.out, [].concat(s(n), [a]), e + (a.skip ? 0 : 1)))
                        }
                    }
                }(e.graphData, (function (t) {
                    return t[e.nodeId]
                }), {nodeFilter: e.dagNodeFilter, onLoopError: e.onDagError || void 0}),
                a = Math.max.apply(Math, s(Object.values(o || []))),
                l = e.dagLevelDistance || e.graphData.nodes.length / (a || 1) * 2 * (-1 !== ["radialin", "radialout"].indexOf(e.dagMode) ? .7 : 1);
            if (e.dagMode) {
                var c = function (t, n) {
                        return function (r) {
                            return t ? (o[r[e.nodeId]] - a / 2) * l * (n ? -1 : 1) : void 0
                        }
                    }, h = c(-1 !== ["lr", "rl"].indexOf(e.dagMode), "rl" === e.dagMode),
                    f = c(-1 !== ["td", "bu"].indexOf(e.dagMode), "bu" === e.dagMode);
                e.graphData.nodes.filter(e.dagNodeFilter).forEach((function (t) {
                    t.fx = h(t), t.fy = f(t)
                }))
            }
            e.forceLayout.force("dagRadial", -1 !== ["radialin", "radialout"].indexOf(e.dagMode) ? function (t, n, e, r) {
                var i, o, a, u, s = gi(.1);

                function l(t) {
                    for (var s = 0, l = i.length; s < l; ++s) {
                        var c = i[s], h = c.x - n || 1e-6, f = (c.y || 0) - e || 1e-6, p = (c.z || 0) - r || 1e-6,
                            d = Math.sqrt(h * h + f * f + p * p), g = (u[s] - d) * a[s] * t / d;
                        c.vx += h * g, o > 1 && (c.vy += f * g), o > 2 && (c.vz += p * g)
                    }
                }

                function c() {
                    if (i) {
                        var n, e = i.length;
                        for (a = new Array(e), u = new Array(e), n = 0; n < e; ++n) u[n] = +t(i[n], n, i), a[n] = isNaN(u[n]) ? 0 : +s(i[n], n, i)
                    }
                }

                return "function" != typeof t && (t = gi(+t)), null == n && (n = 0), null == e && (e = 0), null == r && (r = 0), l.initialize = function (t, n) {
                    i = t, o = n, c()
                }, l.strength = function (t) {
                    return arguments.length ? (s = "function" == typeof t ? t : gi(+t), c(), l) : s
                }, l.radius = function (n) {
                    return arguments.length ? (t = "function" == typeof n ? n : gi(+n), c(), l) : t
                }, l.x = function (t) {
                    return arguments.length ? (n = +t, l) : n
                }, l.y = function (t) {
                    return arguments.length ? (e = +t, l) : e
                }, l.z = function (t) {
                    return arguments.length ? (r = +t, l) : r
                }, l
            }((function (t) {
                var n = o[t[e.nodeId]] || -1;
                return ("radialin" === e.dagMode ? a - n : n) * l
            })).strength((function (t) {
                return e.dagNodeFilter(t) ? 1 : 0
            })) : null);
            for (var p = 0; p < e.warmupTicks && !(e.d3AlphaMin > 0 && e.forceLayout.alpha() < e.d3AlphaMin); p++) e.forceLayout.tick();
            this.resetCountdown(), e.onFinishUpdate()
        }
    });

    function Vi(t, n) {
        var e = t instanceof Array ? t : [t], r = new n;
        return {
            linkProp: function (t) {
                return {
                    default: r[t](), onChange: function (n, r) {
                        e.forEach((function (e) {
                            return r[e][t](n)
                        }))
                    }, triggerUpdate: !1
                }
            }, linkMethod: function (t) {
                return function (n) {
                    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                    var a = [];
                    return e.forEach((function (e) {
                        var r = n[e], o = r[t].apply(r, i);
                        o !== r && a.push(o)
                    })), a.length ? a[0] : this
                }
            }
        }
    }

    var Xi = Vi("forceGraph", Hi), Gi = Vi(["forceGraph", "shadowGraph"], Hi),
        Yi = Object.assign.apply(Object, s(["nodeColor", "nodeAutoColorBy", "nodeCanvasObject", "nodeCanvasObjectMode", "linkColor", "linkAutoColorBy", "linkLineDash", "linkWidth", "linkCanvasObject", "linkCanvasObjectMode", "linkDirectionalArrowLength", "linkDirectionalArrowColor", "linkDirectionalArrowRelPos", "linkDirectionalParticles", "linkDirectionalParticleSpeed", "linkDirectionalParticleWidth", "linkDirectionalParticleColor", "dagMode", "dagLevelDistance", "dagNodeFilter", "onDagError", "d3AlphaMin", "d3AlphaDecay", "d3VelocityDecay", "warmupTicks", "cooldownTicks", "cooldownTime", "onEngineTick", "onEngineStop"].map((function (t) {
            return n({}, t, Xi.linkProp(t))
        }))).concat(s(["nodeRelSize", "nodeId", "nodeVal", "nodeVisibility", "linkSource", "linkTarget", "linkVisibility", "linkCurvature"].map((function (t) {
            return n({}, t, Gi.linkProp(t))
        }))))), $i = Object.assign.apply(Object, s(["d3Force", "d3ReheatSimulation", "emitParticle"].map((function (t) {
            return n({}, t, Xi.linkMethod(t))
        }))));

    function Wi(t) {
        if (t.canvas) {
            var n = t.canvas.width, e = t.canvas.height;
            300 === n && 150 === e && (n = e = 0);
            var r = window.devicePixelRatio;
            n /= r, e /= r, [t.canvas, t.shadowCanvas].forEach((function (i) {
                i.style.width = "".concat(t.width, "px"), i.style.height = "".concat(t.height, "px"), i.width = t.width * r, i.height = t.height * r, n || e || i.getContext("2d").scale(r, r)
            }));
            var i = Ge(t.canvas).k;
            t.zoom.translateBy(t.zoom.__baseElem, (t.width - n) / 2 / i, (t.height - e) / 2 / i)
        }
    }

    function Zi(t) {
        var n = window.devicePixelRatio;
        t.setTransform(n, 0, 0, n, 0, 0)
    }

    function Qi(t, n, e) {
        t.save(), Zi(t), t.clearRect(0, 0, n, e), t.restore()
    }

    return Rr({
        props: r({
            width: {
                default: window.innerWidth, onChange: function (t, n) {
                    return Wi(n)
                }, triggerUpdate: !1
            },
            height: {
                default: window.innerHeight, onChange: function (t, n) {
                    return Wi(n)
                }, triggerUpdate: !1
            },
            graphData: {
                default: {nodes: [], links: []}, onChange: function (t, n) {
                    (t.nodes.length || t.links.length) && console.info("force-graph loading", t.nodes.length + " nodes", t.links.length + " links"), [{
                        type: "Node",
                        objs: t.nodes
                    }, {type: "Link", objs: t.links}].forEach((function (t) {
                        var e = t.type;
                        t.objs.filter((function (t) {
                            if (!t.hasOwnProperty("__indexColor")) return !0;
                            var e = n.colorTracker.lookup(t.__indexColor);
                            return !e || !e.hasOwnProperty("d") || e.d !== t
                        })).forEach((function (t) {
                            t.__indexColor = n.colorTracker.register({type: e, d: t})
                        }))
                    })), n.forceGraph.graphData(t), n.shadowGraph.graphData(t)
                }, triggerUpdate: !1
            },
            backgroundColor: {
                onChange: function (t, n) {
                    n.canvas && t && (n.canvas.style.background = t)
                }, triggerUpdate: !1
            },
            nodeLabel: {default: "name", triggerUpdate: !1},
            linkLabel: {default: "name", triggerUpdate: !1},
            linkHoverPrecision: {default: 4, triggerUpdate: !1},
            enableNodeDrag: {default: !0, triggerUpdate: !1},
            enableZoomPanInteraction: {default: !0, triggerUpdate: !1},
            enablePointerInteraction: {
                default: !0, onChange: function (t, n) {
                    n.hoverObj = null
                }, triggerUpdate: !1
            },
            onNodeDrag: {
                default: function () {
                }, triggerUpdate: !1
            },
            onNodeDragEnd: {
                default: function () {
                }, triggerUpdate: !1
            },
            onNodeClick: {
                default: function () {
                }, triggerUpdate: !1
            },
            onNodeRightClick: {triggerUpdate: !1},
            onNodeHover: {
                default: function () {
                }, triggerUpdate: !1
            },
            onLinkClick: {
                default: function () {
                }, triggerUpdate: !1
            },
            onLinkRightClick: {triggerUpdate: !1},
            onLinkHover: {
                default: function () {
                }, triggerUpdate: !1
            },
            onBackgroundClick: {
                default: function () {
                }, triggerUpdate: !1
            },
            onBackgroundRightClick: {triggerUpdate: !1},
            onZoom: {
                default: function () {
                }, triggerUpdate: !1
            },
            onZoomEnd: {
                default: function () {
                }, triggerUpdate: !1
            }
        }, Yi), aliases: {stopAnimation: "pauseAnimation"}, methods: r({
            graph2ScreenCoords: function (t, n, e) {
                var r = Ge(t.canvas);
                return {x: n * r.k + r.x, y: e * r.k + r.y}
            }, screen2GraphCoords: function (t, n, e) {
                var r = Ge(t.canvas);
                return {x: (n - r.x) / r.k, y: (e - r.y) / r.k}
            }, centerAt: function (t, n, e, r) {
                if (!t.canvas) return null;
                if (void 0 !== n || void 0 !== e) {
                    var i = Object.assign({}, void 0 !== n ? {x: n} : {}, void 0 !== e ? {y: e} : {});
                    return r ? new Cr.Tween(o()).to(i, r).easing(Cr.Easing.Quadratic.Out).onUpdate(a).start() : a(i), this
                }
                return o();

                function o() {
                    var n = Ge(t.canvas);
                    return {x: (t.width / 2 - n.x) / n.k, y: (t.height / 2 - n.y) / n.k}
                }

                function a(n) {
                    var e = n.x, r = n.y;
                    t.zoom.translateTo(t.zoom.__baseElem, void 0 === e ? o().x : e, void 0 === r ? o().y : r)
                }
            }, zoom: function (t, n, e) {
                return t.canvas ? void 0 !== n ? (e ? new Cr.Tween({k: r()}).to({k: n}, e).easing(Cr.Easing.Quadratic.Out).onUpdate((function (t) {
                    return i(t.k)
                })).start() : i(n), this) : r() : null;

                function r() {
                    return Ge(t.canvas).k
                }

                function i(n) {
                    t.zoom.scaleTo(t.zoom.__baseElem, n)
                }
            }, zoomToFit: function (t) {
                for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10, r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) i[o - 3] = arguments[o];
                var a = this.getGraphBbox.apply(this, i);
                if (a) {
                    var u = {x: (a.x[0] + a.x[1]) / 2, y: (a.y[0] + a.y[1]) / 2},
                        s = Math.max(1e-12, Math.min(1e12, (t.width - 2 * e) / (a.x[1] - a.x[0]), (t.height - 2 * e) / (a.y[1] - a.y[0])));
                    this.centerAt(u.x, u.y, n), this.zoom(s, n)
                }
                return this
            }, getGraphBbox: function (t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
                    return !0
                }, e = Dr(t.nodeVal), r = function (n) {
                    return Math.sqrt(Math.max(0, e(n) || 1)) * t.nodeRelSize
                }, i = t.graphData.nodes.filter(n).map((function (t) {
                    return {x: t.x, y: t.y, r: r(t)}
                }));
                return i.length ? {
                    x: [er(i, (function (t) {
                        return t.x - t.r
                    })), nr(i, (function (t) {
                        return t.x + t.r
                    }))], y: [er(i, (function (t) {
                        return t.y - t.r
                    })), nr(i, (function (t) {
                        return t.y + t.r
                    }))]
                } : null
            }, pauseAnimation: function (t) {
                return t.animationFrameRequestId && (cancelAnimationFrame(t.animationFrameRequestId), t.animationFrameRequestId = null), this
            }, resumeAnimation: function (t) {
                return t.animationFrameRequestId || this._animationCycle(), this
            }, _destructor: function () {
                this.pauseAnimation(), this.graphData({nodes: [], links: []})
            }
        }, $i), stateInit: function () {
            return {
                lastSetZoom: 1,
                forceGraph: new Hi,
                shadowGraph: (new Hi).cooldownTicks(0).nodeColor("__indexColor").linkColor("__indexColor").isShadow(!0),
                colorTracker: new Hr
            }
        }, init: function (t, n) {
            t.innerHTML = "";
            var e = document.createElement("div");
            e.style.position = "relative", t.appendChild(e), n.canvas = document.createElement("canvas"), n.backgroundColor && (n.canvas.style.background = n.backgroundColor), e.appendChild(n.canvas), n.shadowCanvas = document.createElement("canvas");
            var i = n.canvas.getContext("2d"), o = n.shadowCanvas.getContext("2d");
            bt(n.canvas).call(function () {
                var t, n, e, r, i = Ut, o = Ft, a = Lt, u = qt, s = {}, l = St("start", "drag", "end"), c = 0, h = 0;

                function f(t) {
                    t.on("mousedown.drag", p).filter(u).on("touchstart.drag", y).on("touchmove.drag", v).on("touchend.drag touchcancel.drag", _).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                }

                function p() {
                    if (!r && i.apply(this, arguments)) {
                        var a = m("mouse", o.apply(this, arguments), zt, this, arguments);
                        a && (bt(st.view).on("mousemove.drag", d, !0).on("mouseup.drag", g, !0), jt(st.view), Pt(), e = !1, t = st.clientX, n = st.clientY, a("start"))
                    }
                }

                function d() {
                    if (Tt(), !e) {
                        var r = st.clientX - t, i = st.clientY - n;
                        e = r * r + i * i > h
                    }
                    s.mouse("drag")
                }

                function g() {
                    bt(st.view).on("mousemove.drag mouseup.drag", null), Rt(st.view, e), Tt(), s.mouse("end")
                }

                function y() {
                    if (i.apply(this, arguments)) {
                        var t, n, e = st.changedTouches, r = o.apply(this, arguments), a = e.length;
                        for (t = 0; t < a; ++t) (n = m(e[t].identifier, r, At, this, arguments)) && (Pt(), n("start"))
                    }
                }

                function v() {
                    var t, n, e = st.changedTouches, r = e.length;
                    for (t = 0; t < r; ++t) (n = s[e[t].identifier]) && (Tt(), n("drag"))
                }

                function _() {
                    var t, n, e = st.changedTouches, i = e.length;
                    for (r && clearTimeout(r), r = setTimeout((function () {
                        r = null
                    }), 500), t = 0; t < i; ++t) (n = s[e[t].identifier]) && (Pt(), n("end"))
                }

                function m(t, n, e, r, i) {
                    var o, u, h, p = e(n, t), d = l.copy();
                    if (dt(new It(f, "beforestart", o, t, c, p[0], p[1], 0, 0, d), (function () {
                        return null != (st.subject = o = a.apply(r, i)) && (u = o.x - p[0] || 0, h = o.y - p[1] || 0, !0)
                    }))) return function a(l) {
                        var g, y = p;
                        switch (l) {
                            case"start":
                                s[t] = a, g = c++;
                                break;
                            case"end":
                                delete s[t], --c;
                            case"drag":
                                p = e(n, t), g = c
                        }
                        dt(new It(f, l, o, t, g, p[0] + u, p[1] + h, p[0] - y[0], p[1] - y[1], d), d.apply, d, [l, r, i])
                    }
                }

                return f.filter = function (t) {
                    return arguments.length ? (i = "function" == typeof t ? t : Dt(!!t), f) : i
                }, f.container = function (t) {
                    return arguments.length ? (o = "function" == typeof t ? t : Dt(t), f) : o
                }, f.subject = function (t) {
                    return arguments.length ? (a = "function" == typeof t ? t : Dt(t), f) : a
                }, f.touchable = function (t) {
                    return arguments.length ? (u = "function" == typeof t ? t : Dt(!!t), f) : u
                }, f.on = function () {
                    var t = l.on.apply(l, arguments);
                    return t === l ? f : t
                }, f.clickDistance = function (t) {
                    return arguments.length ? (h = (t = +t) * t, f) : Math.sqrt(h)
                }, f
            }().subject((function () {
                if (!n.enableNodeDrag) return null;
                var t = n.hoverObj;
                return t && "Node" === t.type ? t.d : null
            })).on("start", (function () {
                var t = st.subject;
                t.__initialDragPos = {
                    x: t.x,
                    y: t.y,
                    fx: t.fx,
                    fy: t.fy
                }, st.active || (t.fx = t.x, t.fy = t.y), n.canvas.classList.add("grabbable")
            })).on("drag", (function () {
                var t = st.subject, e = t.__initialDragPos, r = st, i = Ge(n.canvas).k,
                    o = {x: e.x + (r.x - e.x) / i - t.x, y: e.y + (r.y - e.y) / i - t.y};
                ["x", "y"].forEach((function (n) {
                    return t["f".concat(n)] = t[n] = e[n] + (r[n] - e[n]) / i
                })), n.forceGraph.d3AlphaTarget(.3).resetCountdown(), t.__dragged = !0, n.onNodeDrag(t, o)
            })).on("end", (function () {
                var t = st.subject, e = t.__initialDragPos, r = {x: t.x - e.x, y: t.y - e.y};
                void 0 === e.fx && (t.fx = void 0), void 0 === e.fy && (t.fy = void 0), delete t.__initialDragPos, n.forceGraph.d3AlphaTarget(0).resetCountdown(), n.canvas.classList.remove("grabbable"), t.__dragged && (delete t.__dragged, n.onNodeDragEnd(t, r))
            }))), n.zoom = function () {
                var t, n, e = We, r = Ze, i = tr, o = Je, a = Ke, u = [0, 1 / 0],
                    s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, c = Un, h = St("start", "zoom", "end"), f = 0;

                function p(t) {
                    t.property("__zoom", Qe).on("wheel.zoom", x).on("mousedown.zoom", b).on("dblclick.zoom", w).filter(a).on("touchstart.zoom", k).on("touchmove.zoom", z).on("touchend.zoom touchcancel.zoom", A).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                }

                function d(t, n) {
                    return (n = Math.max(u[0], Math.min(u[1], n))) === t.k ? t : new Ve(n, t.x, t.y)
                }

                function g(t, n, e) {
                    var r = n[0] - e[0] * t.k, i = n[1] - e[1] * t.k;
                    return r === t.x && i === t.y ? t : new Ve(t.k, r, i)
                }

                function y(t) {
                    return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
                }

                function v(t, n, e) {
                    t.on("start.zoom", (function () {
                        _(this, arguments).start()
                    })).on("interrupt.zoom end.zoom", (function () {
                        _(this, arguments).end()
                    })).tween("zoom", (function () {
                        var t = this, i = arguments, o = _(t, i), a = r.apply(t, i),
                            u = null == e ? y(a) : "function" == typeof e ? e.apply(t, i) : e,
                            s = Math.max(a[1][0] - a[0][0], a[1][1] - a[0][1]), l = t.__zoom,
                            h = "function" == typeof n ? n.apply(t, i) : n,
                            f = c(l.invert(u).concat(s / l.k), h.invert(u).concat(s / h.k));
                        return function (t) {
                            if (1 === t) t = h; else {
                                var n = f(t), e = s / n[2];
                                t = new Ve(e, u[0] - n[0] * e, u[1] - n[1] * e)
                            }
                            o.zoom(null, t)
                        }
                    }))
                }

                function _(t, n, e) {
                    return !e && t.__zooming || new m(t, n)
                }

                function m(t, n) {
                    this.that = t, this.args = n, this.active = 0, this.extent = r.apply(t, n), this.taps = 0
                }

                function x() {
                    if (e.apply(this, arguments)) {
                        var t = _(this, arguments), n = this.__zoom,
                            r = Math.max(u[0], Math.min(u[1], n.k * Math.pow(2, o.apply(this, arguments)))),
                            a = zt(this);
                        if (t.wheel) t.mouse[0][0] === a[0] && t.mouse[0][1] === a[1] || (t.mouse[1] = n.invert(t.mouse[0] = a)), clearTimeout(t.wheel); else {
                            if (n.k === r) return;
                            t.mouse = [a, n.invert(a)], le(this), t.start()
                        }
                        $e(), t.wheel = setTimeout(l, 150), t.zoom("mouse", i(g(d(n, r), t.mouse[0], t.mouse[1]), t.extent, s))
                    }

                    function l() {
                        t.wheel = null, t.end()
                    }
                }

                function b() {
                    if (!n && e.apply(this, arguments)) {
                        var t = _(this, arguments, !0),
                            r = bt(st.view).on("mousemove.zoom", l, !0).on("mouseup.zoom", c, !0), o = zt(this),
                            a = st.clientX, u = st.clientY;
                        jt(st.view), Ye(), t.mouse = [o, this.__zoom.invert(o)], le(this), t.start()
                    }

                    function l() {
                        if ($e(), !t.moved) {
                            var n = st.clientX - a, e = st.clientY - u;
                            t.moved = n * n + e * e > f
                        }
                        t.zoom("mouse", i(g(t.that.__zoom, t.mouse[0] = zt(t.that), t.mouse[1]), t.extent, s))
                    }

                    function c() {
                        r.on("mousemove.zoom mouseup.zoom", null), Rt(st.view, t.moved), $e(), t.end()
                    }
                }

                function w() {
                    if (e.apply(this, arguments)) {
                        var t = this.__zoom, n = zt(this), o = t.invert(n), a = t.k * (st.shiftKey ? .5 : 2),
                            u = i(g(d(t, a), n, o), r.apply(this, arguments), s);
                        $e(), l > 0 ? bt(this).transition().duration(l).call(v, u, n) : bt(this).call(p.transform, u)
                    }
                }

                function k() {
                    if (e.apply(this, arguments)) {
                        var n, r, i, o, a = st.touches, u = a.length,
                            s = _(this, arguments, st.changedTouches.length === u);
                        for (Ye(), r = 0; r < u; ++r) o = [o = At(this, a, (i = a[r]).identifier), this.__zoom.invert(o), i.identifier], s.touch0 ? s.touch1 || s.touch0[2] === o[2] || (s.touch1 = o, s.taps = 0) : (s.touch0 = o, n = !0, s.taps = 1 + !!t);
                        t && (t = clearTimeout(t)), n && (s.taps < 2 && (t = setTimeout((function () {
                            t = null
                        }), 500)), le(this), s.start())
                    }
                }

                function z() {
                    if (this.__zooming) {
                        var n, e, r, o, a = _(this, arguments), u = st.changedTouches, l = u.length;
                        for ($e(), t && (t = clearTimeout(t)), a.taps = 0, n = 0; n < l; ++n) r = At(this, u, (e = u[n]).identifier), a.touch0 && a.touch0[2] === e.identifier ? a.touch0[0] = r : a.touch1 && a.touch1[2] === e.identifier && (a.touch1[0] = r);
                        if (e = a.that.__zoom, a.touch1) {
                            var c = a.touch0[0], h = a.touch0[1], f = a.touch1[0], p = a.touch1[1],
                                y = (y = f[0] - c[0]) * y + (y = f[1] - c[1]) * y,
                                v = (v = p[0] - h[0]) * v + (v = p[1] - h[1]) * v;
                            e = d(e, Math.sqrt(y / v)), r = [(c[0] + f[0]) / 2, (c[1] + f[1]) / 2], o = [(h[0] + p[0]) / 2, (h[1] + p[1]) / 2]
                        } else {
                            if (!a.touch0) return;
                            r = a.touch0[0], o = a.touch0[1]
                        }
                        a.zoom("touch", i(g(e, r, o), a.extent, s))
                    }
                }

                function A() {
                    if (this.__zooming) {
                        var t, e, r = _(this, arguments), i = st.changedTouches, o = i.length;
                        for (Ye(), n && clearTimeout(n), n = setTimeout((function () {
                            n = null
                        }), 500), t = 0; t < o; ++t) e = i[t], r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
                        if (r.touch1 && !r.touch0 && (r.touch0 = r.touch1, delete r.touch1), r.touch0) r.touch0[1] = this.__zoom.invert(r.touch0[0]); else if (r.end(), 2 === r.taps) {
                            var a = bt(this).on("dblclick.zoom");
                            a && a.apply(this, arguments)
                        }
                    }
                }

                return p.transform = function (t, n, e) {
                    var r = t.selection ? t.selection() : t;
                    r.property("__zoom", Qe), t !== r ? v(t, n, e) : r.interrupt().each((function () {
                        _(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
                    }))
                }, p.scaleBy = function (t, n, e) {
                    p.scaleTo(t, (function () {
                        var t = this.__zoom.k, e = "function" == typeof n ? n.apply(this, arguments) : n;
                        return t * e
                    }), e)
                }, p.scaleTo = function (t, n, e) {
                    p.transform(t, (function () {
                        var t = r.apply(this, arguments), o = this.__zoom,
                            a = null == e ? y(t) : "function" == typeof e ? e.apply(this, arguments) : e,
                            u = o.invert(a), l = "function" == typeof n ? n.apply(this, arguments) : n;
                        return i(g(d(o, l), a, u), t, s)
                    }), e)
                }, p.translateBy = function (t, n, e) {
                    p.transform(t, (function () {
                        return i(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof e ? e.apply(this, arguments) : e), r.apply(this, arguments), s)
                    }))
                }, p.translateTo = function (t, n, e, o) {
                    p.transform(t, (function () {
                        var t = r.apply(this, arguments), a = this.__zoom,
                            u = null == o ? y(t) : "function" == typeof o ? o.apply(this, arguments) : o;
                        return i(Xe.translate(u[0], u[1]).scale(a.k).translate("function" == typeof n ? -n.apply(this, arguments) : -n, "function" == typeof e ? -e.apply(this, arguments) : -e), t, s)
                    }), o)
                }, m.prototype = {
                    start: function () {
                        return 1 == ++this.active && (this.that.__zooming = this, this.emit("start")), this
                    }, zoom: function (t, n) {
                        return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this
                    }, end: function () {
                        return 0 == --this.active && (delete this.that.__zooming, this.emit("end")), this
                    }, emit: function (t) {
                        dt(new He(p, t, this.that.__zoom), h.apply, h, [t, this.that, this.args])
                    }
                }, p.wheelDelta = function (t) {
                    return arguments.length ? (o = "function" == typeof t ? t : Be(+t), p) : o
                }, p.filter = function (t) {
                    return arguments.length ? (e = "function" == typeof t ? t : Be(!!t), p) : e
                }, p.touchable = function (t) {
                    return arguments.length ? (a = "function" == typeof t ? t : Be(!!t), p) : a
                }, p.extent = function (t) {
                    return arguments.length ? (r = "function" == typeof t ? t : Be([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]), p) : r
                }, p.scaleExtent = function (t) {
                    return arguments.length ? (u[0] = +t[0], u[1] = +t[1], p) : [u[0], u[1]]
                }, p.translateExtent = function (t) {
                    return arguments.length ? (s[0][0] = +t[0][0], s[1][0] = +t[1][0], s[0][1] = +t[0][1], s[1][1] = +t[1][1], p) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]]
                }, p.constrain = function (t) {
                    return arguments.length ? (i = t, p) : i
                }, p.duration = function (t) {
                    return arguments.length ? (l = +t, p) : l
                }, p.interpolate = function (t) {
                    return arguments.length ? (c = t, p) : c
                }, p.on = function () {
                    var t = h.on.apply(h, arguments);
                    return t === h ? p : t
                }, p.clickDistance = function (t) {
                    return arguments.length ? (f = (t = +t) * t, p) : Math.sqrt(f)
                }, p
            }(), n.zoom(n.zoom.__baseElem = bt(n.canvas)), n.zoom.__baseElem.on("dblclick.zoom", null), n.zoom.filter((function () {
                return !!n.enableZoomPanInteraction && !st.button
            })).scaleExtent([.01, 1e3]).on("zoom", (function () {
                var t = Ge(this);
                [i, o].forEach((function (n) {
                    Zi(n), n.translate(t.x, t.y), n.scale(t.k, t.k)
                })), n.onZoom(r({}, t))
            })).on("end", (function () {
                var t = Ge(this);
                n.onZoomEnd(r({}, t))
            })), Wi(n), n.forceGraph.onFinishUpdate((function () {
                Ge(n.canvas).k === n.lastSetZoom && n.graphData.nodes.length && n.zoom.scaleTo(n.zoom.__baseElem, n.lastSetZoom = 4 / Math.cbrt(n.graphData.nodes.length))
            }));
            var a = document.createElement("div");
            a.classList.add("graph-tooltip"), e.appendChild(a);
            var u = {x: -1e12, y: -1e12};
            ["pointermove", "pointerdown"].forEach((function (t) {
                return e.addEventListener(t, (function (t) {
                    !n.isPointerDragging && "pointermove" === t.type && t.pressure > 0 && (0 !== t.movementX || 0 !== t.movementY) && (n.isPointerDragging = !0);
                    var r, i, o,
                        s = (r = e.getBoundingClientRect(), i = window.pageXOffset || document.documentElement.scrollLeft, o = window.pageYOffset || document.documentElement.scrollTop, {
                            top: r.top + o,
                            left: r.left + i
                        });
                    u.x = t.pageX - s.left, u.y = t.pageY - s.top, a.style.top = "".concat(u.y, "px"), a.style.left = "".concat(u.x, "px")
                }), !1)
            })), e.addEventListener("pointerup", (function (t) {
                n.isPointerDragging ? n.isPointerDragging = !1 : requestAnimationFrame((function () {
                    if (0 === t.button && (n.hoverObj ? n["on".concat(n.hoverObj.type, "Click")](n.hoverObj.d, t) : n.onBackgroundClick(t)), 2 === t.button) if (n.hoverObj) {
                        var e = n["on".concat(n.hoverObj.type, "RightClick")];
                        e && e(n.hoverObj.d, t)
                    } else n.onBackgroundRightClick && n.onBackgroundRightClick(t)
                }))
            }), !1), e.addEventListener("contextmenu", (function (t) {
                return !(n.onBackgroundRightClick || n.onNodeRightClick || n.onLinkRightClick) || (t.preventDefault(), !1)
            }), !1), n.forceGraph(i), n.shadowGraph(o);
            var s = wr((function () {
                Qi(o, n.width, n.height), n.shadowGraph.linkWidth((function (t) {
                    return Dr(n.linkWidth)(t) + n.linkHoverPrecision
                }));
                var t = Ge(n.canvas);
                n.shadowGraph.globalScale(t.k).tickFrame()
            }), 800);
            (this._animationCycle = function t() {
                if (n.enablePointerInteraction) {
                    var e = null;
                    if (!n.isPointerDragging) {
                        var r = window.devicePixelRatio,
                            l = u.x > 0 && u.y > 0 ? o.getImageData(u.x * r, u.y * r, 1, 1) : null;
                        l && (e = n.colorTracker.lookup(l.data))
                    }
                    if (e !== n.hoverObj) {
                        var c = n.hoverObj, h = c ? c.type : null, f = e ? e.type : null;
                        h && h !== f && n["on".concat(h, "Hover")](null, c.d), f && n["on".concat(f, "Hover")](e.d, h === f ? c.d : null);
                        var p = e && Dr(n["".concat(e.type.toLowerCase(), "Label")])(e.d) || "";
                        a.style.visibility = p ? "visible" : "hidden", a.innerHTML = p, n.hoverObj = e
                    }
                    s()
                }
                Qi(i, n.width, n.height);
                var d = Ge(n.canvas);
                n.forceGraph.globalScale(d.k).tickFrame(), Cr.update(), n.animationFrameRequestId = requestAnimationFrame(t)
            })()
        }, update: function (t) {
        }
    })
}));