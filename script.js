!function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
}(function(t) {
    var e, o, a, r, n, i, s = "Close", l = "BeforeClose", c = "AfterClose", d = "BeforeAppend", p = "MarkupParse", u = "Open", g = "Change", m = "mfp", b = "." + m, f = "mfp-ready", h = "mfp-removing", v = "mfp-prevent-close", U = function() {}, w = !!window.jQuery, $ = t(window), C = function(t, o) {
        e.ev.on(m + t + b, o);
    }, y = function(e, o, a, r) {
        var n = document.createElement("div");
        return n.className = "mfp-" + e, a && (n.innerHTML = a), r ? o && o.appendChild(n) : (n = t(n), 
        o && n.appendTo(o)), n;
    }, x = function(o, a) {
        e.ev.triggerHandler(m + o, a), e.st.callbacks && (o = o.charAt(0).toLowerCase() + o.slice(1), 
        e.st.callbacks[o] && e.st.callbacks[o].apply(e, t.isArray(a) ? a : [ a ]));
    }, k = function(o) {
        return o === i && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), 
        i = o), e.currTemplate.closeBtn;
    }, T = function() {
        t.magnificPopup.instance || (e = new U(), e.init(), t.magnificPopup.instance = e);
    }, P = function() {
        var t = document.createElement("p").style, e = [ "ms", "O", "Moz", "Webkit" ];
        if (void 0 !== t.transition) return !0;
        for (;e.length; ) if (e.pop() + "Transition" in t) return !0;
        return !1;
    };
    U.prototype = {
        constructor: U,
        init: function() {
            var o = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(o), 
            e.isIOS = /iphone|ipad|ipod/gi.test(o), e.supportsTransition = P(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), 
            a = t(document), e.popupsCache = {};
        },
        open: function(o) {
            var r;
            if (o.isObj === !1) {
                e.items = o.items.toArray(), e.index = 0;
                var i, s = o.items;
                for (r = 0; r < s.length; r++) if (i = s[r], i.parsed && (i = i.el[0]), i === o.el[0]) {
                    e.index = r;
                    break;
                }
            } else e.items = t.isArray(o.items) ? o.items : [ o.items ], e.index = o.index || 0;
            if (e.isOpen) return void e.updateItemHTML();
            e.types = [], n = "", o.mainEl && o.mainEl.length ? e.ev = o.mainEl.eq(0) : e.ev = a, 
            o.key ? (e.popupsCache[o.key] || (e.popupsCache[o.key] = {}), e.currTemplate = e.popupsCache[o.key]) : e.currTemplate = {}, 
            e.st = t.extend(!0, {}, t.magnificPopup.defaults, o), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, 
            e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, 
            e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = y("bg").on("click" + b, function() {
                e.close();
            }), e.wrap = y("wrap").attr("tabindex", -1).on("click" + b, function(t) {
                e._checkIfClose(t.target) && e.close();
            }), e.container = y("container", e.wrap)), e.contentContainer = y("content"), e.st.preloader && (e.preloader = y("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (r = 0; r < l.length; r++) {
                var c = l[r];
                c = c.charAt(0).toUpperCase() + c.slice(1), e["init" + c].call(e);
            }
            x("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (C(p, function(t, e, o, a) {
                o.close_replaceWith = k(a.type);
            }), n += " mfp-close-btn-in") : e.wrap.append(k())), e.st.alignTop && (n += " mfp-align-top"), 
            e.fixedContentPos ? e.wrap.css({
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            }) : e.wrap.css({
                top: $.scrollTop(),
                position: "absolute"
            }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: a.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && a.on("keyup" + b, function(t) {
                27 === t.keyCode && e.close();
            }), $.on("resize" + b, function() {
                e.updateSize();
            }), e.st.closeOnContentClick || (n += " mfp-auto-cursor"), n && e.wrap.addClass(n);
            var d = e.wH = $.height(), g = {};
            if (e.fixedContentPos && e._hasScrollBar(d)) {
                var m = e._getScrollbarSize();
                m && (g.marginRight = m);
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
            var h = e.st.mainClass;
            return e.isIE7 && (h += " mfp-ie7"), h && e._addClassToMFP(h), e.updateItemHTML(), 
            x("BuildControls"), t("html").css(g), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), 
            e._lastFocusedEl = document.activeElement, setTimeout(function() {
                e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), a.on("focusin" + b, e._onFocusIn);
            }, 16), e.isOpen = !0, e.updateSize(d), x(u), o;
        },
        close: function() {
            e.isOpen && (x(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(h), 
            setTimeout(function() {
                e._close();
            }, e.st.removalDelay)) : e._close());
        },
        _close: function() {
            x(s);
            var o = h + " " + f + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (o += e.st.mainClass + " "), 
            e._removeClassFromMFP(o), e.fixedContentPos) {
                var r = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : r.overflow = "", t("html").css(r);
            }
            a.off("keyup" + b + " focusin" + b), e.ev.off(b), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), 
            e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), 
            !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), 
            e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, 
            e.content = null, e.currTemplate = null, e.prevHeight = 0, x(c);
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var o = document.documentElement.clientWidth / window.innerWidth, a = window.innerHeight * o;
                e.wrap.css("height", a), e.wH = a;
            } else e.wH = t || $.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), x("Resize");
        },
        updateItemHTML: function() {
            var o = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), o.parsed || (o = e.parseEl(e.index));
            var a = o.type;
            if (x("BeforeChange", [ e.currItem ? e.currItem.type : "", a ]), e.currItem = o, 
            !e.currTemplate[a]) {
                var n = !!e.st[a] && e.st[a].markup;
                x("FirstMarkupParse", n), n ? e.currTemplate[a] = t(n) : e.currTemplate[a] = !0;
            }
            r && r !== o.type && e.container.removeClass("mfp-" + r + "-holder");
            var i = e["get" + a.charAt(0).toUpperCase() + a.slice(1)](o, e.currTemplate[a]);
            e.appendContent(i, a), o.preloaded = !0, x(g, o), r = o.type, e.container.prepend(e.contentContainer), 
            x("AfterChange");
        },
        appendContent: function(t, o) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[o] === !0 ? e.content.find(".mfp-close").length || e.content.append(k()) : e.content = t : e.content = "", 
            x(d), e.container.addClass("mfp-" + o + "-holder"), e.contentContainer.append(e.content);
        },
        parseEl: function(o) {
            var a, r = e.items[o];
            if (r.tagName ? r = {
                el: t(r)
            } : (a = r.type, r = {
                data: r,
                src: r.src
            }), r.el) {
                for (var n = e.types, i = 0; i < n.length; i++) if (r.el.hasClass("mfp-" + n[i])) {
                    a = n[i];
                    break;
                }
                r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"));
            }
            return r.type = a || e.st.type || "inline", r.index = o, r.parsed = !0, e.items[o] = r, 
            x("ElementParse", r), e.items[o];
        },
        addGroup: function(t, o) {
            var a = function(a) {
                a.mfpEl = this, e._openClick(a, t, o);
            };
            o || (o = {});
            var r = "click.magnificPopup";
            o.mainEl = t, o.items ? (o.isObj = !0, t.off(r).on(r, a)) : (o.isObj = !1, o.delegate ? t.off(r).on(r, o.delegate, a) : (o.items = t, 
            t.off(r).on(r, a)));
        },
        _openClick: function(o, a, r) {
            var n = void 0 !== r.midClick ? r.midClick : t.magnificPopup.defaults.midClick;
            if (n || !(2 === o.which || o.ctrlKey || o.metaKey || o.altKey || o.shiftKey)) {
                var i = void 0 !== r.disableOn ? r.disableOn : t.magnificPopup.defaults.disableOn;
                if (i) if (t.isFunction(i)) {
                    if (!i.call(e)) return !0;
                } else if ($.width() < i) return !0;
                o.type && (o.preventDefault(), e.isOpen && o.stopPropagation()), r.el = t(o.mfpEl), 
                r.delegate && (r.items = a.find(r.delegate)), e.open(r);
            }
        },
        updateStatus: function(t, a) {
            if (e.preloader) {
                o !== t && e.container.removeClass("mfp-s-" + o), a || "loading" !== t || (a = e.st.tLoading);
                var r = {
                    status: t,
                    text: a
                };
                x("UpdateStatus", r), t = r.status, a = r.text, e.preloader.html(a), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation();
                }), e.container.addClass("mfp-s-" + t), o = t;
            }
        },
        _checkIfClose: function(o) {
            if (!t(o).hasClass(v)) {
                var a = e.st.closeOnContentClick, r = e.st.closeOnBgClick;
                if (a && r) return !0;
                if (!e.content || t(o).hasClass("mfp-close") || e.preloader && o === e.preloader[0]) return !0;
                if (o === e.content[0] || t.contains(e.content[0], o)) {
                    if (a) return !0;
                } else if (r && t.contains(document, o)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t);
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? a.height() : document.body.scrollHeight) > (t || $.height());
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus();
        },
        _onFocusIn: function(o) {
            if (o.target !== e.wrap[0] && !t.contains(e.wrap[0], o.target)) return e._setFocus(), 
            !1;
        },
        _parseMarkup: function(e, o, a) {
            var r;
            a.data && (o = t.extend(a.data, o)), x(p, [ e, o, a ]), t.each(o, function(o, a) {
                if (void 0 === a || a === !1) return !0;
                if (r = o.split("_"), r.length > 1) {
                    var n = e.find(b + "-" + r[0]);
                    if (n.length > 0) {
                        var i = r[1];
                        "replaceWith" === i ? n[0] !== a[0] && n.replaceWith(a) : "img" === i ? n.is("img") ? n.attr("src", a) : n.replaceWith(t("<img>").attr("src", a).attr("class", n.attr("class"))) : n.attr(r[1], a);
                    }
                } else e.find(b + "-" + o).html(a);
            });
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", 
                document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
            }
            return e.scrollbarSize;
        }
    }, t.magnificPopup = {
        instance: null,
        proto: U.prototype,
        modules: [],
        open: function(e, o) {
            return T(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = o || 0, this.instance.open(e);
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close();
        },
        registerModule: function(e, o) {
            o.options && (t.magnificPopup.defaults[e] = o.options), t.extend(this.proto, o.proto), 
            this.modules.push(e);
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function(o) {
        T();
        var a = t(this);
        if ("string" == typeof o) if ("open" === o) {
            var r, n = w ? a.data("magnificPopup") : a[0].magnificPopup, i = parseInt(arguments[1], 10) || 0;
            n.items ? r = n.items[i] : (r = a, n.delegate && (r = r.find(n.delegate)), r = r.eq(i)), 
            e._openClick({
                mfpEl: r
            }, a, n);
        } else e.isOpen && e[o].apply(e, Array.prototype.slice.call(arguments, 1)); else o = t.extend(!0, {}, o), 
        w ? a.data("magnificPopup", o) : a[0].magnificPopup = o, e.addGroup(a, o);
        return a;
    };
    var I, _, S, M = "inline", N = function() {
        S && (_.after(S.addClass(I)).detach(), S = null);
    };
    t.magnificPopup.registerModule(M, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(M), C(s + "." + M, function() {
                    N();
                });
            },
            getInline: function(o, a) {
                if (N(), o.src) {
                    var r = e.st.inline, n = t(o.src);
                    if (n.length) {
                        var i = n[0].parentNode;
                        i && i.tagName && (_ || (I = r.hiddenClass, _ = y(I), I = "mfp-" + I), S = n.after(_).detach().removeClass(I)), 
                        e.updateStatus("ready");
                    } else e.updateStatus("error", r.tNotFound), n = t("<div>");
                    return o.inlineElement = n, n;
                }
                return e.updateStatus("ready"), e._parseMarkup(a, {}, o), a;
            }
        }
    });
    var F, E = "ajax", H = function() {
        F && t(document.body).removeClass(F);
    }, B = function() {
        H(), e.req && e.req.abort();
    };
    t.magnificPopup.registerModule(E, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(E), F = e.st.ajax.cursor, C(s + "." + E, B), C("BeforeChange." + E, B);
            },
            getAjax: function(o) {
                F && t(document.body).addClass(F), e.updateStatus("loading");
                var a = t.extend({
                    url: o.src,
                    success: function(a, r, n) {
                        var i = {
                            data: a,
                            xhr: n
                        };
                        x("ParseAjax", i), e.appendContent(t(i.data), E), o.finished = !0, H(), e._setFocus(), 
                        setTimeout(function() {
                            e.wrap.addClass(f);
                        }, 16), e.updateStatus("ready"), x("AjaxContentAdded");
                    },
                    error: function() {
                        H(), o.finished = o.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", o.src));
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(a), "";
            }
        }
    });
    var j, R = function(o) {
        if (o.data && void 0 !== o.data.title) return o.data.title;
        var a = e.st.image.titleSrc;
        if (a) {
            if (t.isFunction(a)) return a.call(e, o);
            if (o.el) return o.el.attr(a) || "";
        }
        return "";
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var o = e.st.image, a = ".image";
                e.types.push("image"), C(u + a, function() {
                    "image" === e.currItem.type && o.cursor && t(document.body).addClass(o.cursor);
                }), C(s + a, function() {
                    o.cursor && t(document.body).removeClass(o.cursor), $.off("resize" + b);
                }), C("Resize" + a, e.resizeImage), e.isLowIE && C("AfterChange", e.resizeImage);
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var o = 0;
                    e.isLowIE && (o = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), 
                    t.img.css("max-height", e.wH - o);
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, j && clearInterval(j), t.isCheckingImgSize = !1, x("ImageHasSize", t), 
                t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1));
            },
            findImageSize: function(t) {
                var o = 0, a = t.img[0], r = function(n) {
                    j && clearInterval(j), j = setInterval(function() {
                        return a.naturalWidth > 0 ? void e._onImageHasSize(t) : (o > 200 && clearInterval(j), 
                        o++, void (3 === o ? r(10) : 40 === o ? r(50) : 100 === o && r(500)));
                    }, n);
                };
                r(1);
            },
            getImage: function(o, a) {
                var r = 0, n = function() {
                    o && (o.img[0].complete ? (o.img.off(".mfploader"), o === e.currItem && (e._onImageHasSize(o), 
                    e.updateStatus("ready")), o.hasSize = !0, o.loaded = !0, x("ImageLoadComplete")) : (r++, 
                    r < 200 ? setTimeout(n, 100) : i()));
                }, i = function() {
                    o && (o.img.off(".mfploader"), o === e.currItem && (e._onImageHasSize(o), e.updateStatus("error", s.tError.replace("%url%", o.src))), 
                    o.hasSize = !0, o.loaded = !0, o.loadError = !0);
                }, s = e.st.image, l = a.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", o.el && o.el.find("img").length && (c.alt = o.el.find("img").attr("alt")), 
                    o.img = t(c).on("load.mfploader", n).on("error.mfploader", i), c.src = o.src, l.is("img") && (o.img = o.img.clone()), 
                    c = o.img[0], c.naturalWidth > 0 ? o.hasSize = !0 : c.width || (o.hasSize = !1);
                }
                return e._parseMarkup(a, {
                    title: R(o),
                    img_replaceWith: o.img
                }, o), e.resizeImage(), o.hasSize ? (j && clearInterval(j), o.loadError ? (a.addClass("mfp-loading"), 
                e.updateStatus("error", s.tError.replace("%url%", o.src))) : (a.removeClass("mfp-loading"), 
                e.updateStatus("ready")), a) : (e.updateStatus("loading"), o.loading = !0, o.hasSize || (o.imgHidden = !0, 
                a.addClass("mfp-loading"), e.findImageSize(o)), a);
            }
        }
    });
    var O, A = function() {
        return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), 
        O;
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img");
            }
        },
        proto: {
            initZoom: function() {
                var t, o = e.st.zoom, a = ".zoom";
                if (o.enabled && e.supportsTransition) {
                    var r, n, i = o.duration, c = function(t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), a = "all " + o.duration / 1e3 + "s " + o.easing, r = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }, n = "transition";
                        return r["-webkit-" + n] = r["-moz-" + n] = r["-o-" + n] = r[n] = a, e.css(r), e;
                    }, d = function() {
                        e.content.css("visibility", "visible");
                    };
                    C("BuildControls" + a, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), 
                            !t) return void d();
                            n = c(t), n.css(e._getOffset()), e.wrap.append(n), r = setTimeout(function() {
                                n.css(e._getOffset(!0)), r = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        n.remove(), t = n = null, x("ZoomAnimationEnded");
                                    }, 16);
                                }, i);
                            }, 16);
                        }
                    }), C(l + a, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.st.removalDelay = i, !t) {
                                if (t = e._getItemToZoom(), !t) return;
                                n = c(t);
                            }
                            n.css(e._getOffset(!0)), e.wrap.append(n), e.content.css("visibility", "hidden"), 
                            setTimeout(function() {
                                n.css(e._getOffset());
                            }, 16);
                        }
                    }), C(s + a, function() {
                        e._allowZoom() && (d(), n && n.remove(), t = null);
                    });
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type;
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img;
            },
            _getOffset: function(o) {
                var a;
                a = o ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var r = a.offset(), n = parseInt(a.css("padding-top"), 10), i = parseInt(a.css("padding-bottom"), 10);
                r.top -= t(window).scrollTop() - n;
                var s = {
                    width: a.width(),
                    height: (w ? a.innerHeight() : a[0].offsetHeight) - i - n
                };
                return A() ? s["-moz-transform"] = s.transform = "translate(" + r.left + "px," + r.top + "px)" : (s.left = r.left, 
                s.top = r.top), s;
            }
        }
    });
    var z = "iframe", L = "//about:blank", W = function(t) {
        if (e.currTemplate[z]) {
            var o = e.currTemplate[z].find("iframe");
            o.length && (t || (o[0].src = L), e.isIE8 && o.css("display", t ? "block" : "none"));
        }
    };
    t.magnificPopup.registerModule(z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(z), C("BeforeChange", function(t, e, o) {
                    e !== o && (e === z ? W() : o === z && W(!0));
                }), C(s + "." + z, function() {
                    W();
                });
            },
            getIframe: function(o, a) {
                var r = o.src, n = e.st.iframe;
                t.each(n.patterns, function() {
                    if (r.indexOf(this.index) > -1) return this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)), 
                    r = this.src.replace("%id%", r), !1;
                });
                var i = {};
                return n.srcAction && (i[n.srcAction] = r), e._parseMarkup(a, i, o), e.updateStatus("ready"), 
                a;
            }
        }
    });
    var D = function(t) {
        var o = e.items.length;
        return t > o - 1 ? t - o : t < 0 ? o + t : t;
    }, V = function(t, e, o) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, o);
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [ 0, 2 ],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var o = e.st.gallery, r = ".mfp-gallery";
                return e.direction = !0, !(!o || !o.enabled) && (n += " mfp-gallery", C(u + r, function() {
                    o.navigateByImgClick && e.wrap.on("click" + r, ".mfp-img", function() {
                        if (e.items.length > 1) return e.next(), !1;
                    }), a.on("keydown" + r, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next();
                    });
                }), C("UpdateStatus" + r, function(t, o) {
                    o.text && (o.text = V(o.text, e.currItem.index, e.items.length));
                }), C(p + r, function(t, a, r, n) {
                    var i = e.items.length;
                    r.counter = i > 1 ? V(o.tCounter, n.index, i) : "";
                }), C("BuildControls" + r, function() {
                    if (e.items.length > 1 && o.arrows && !e.arrowLeft) {
                        var a = o.arrowMarkup, r = e.arrowLeft = t(a.replace(/%title%/gi, o.tPrev).replace(/%dir%/gi, "left")).addClass(v), n = e.arrowRight = t(a.replace(/%title%/gi, o.tNext).replace(/%dir%/gi, "right")).addClass(v);
                        r.click(function() {
                            e.prev();
                        }), n.click(function() {
                            e.next();
                        }), e.container.append(r.add(n));
                    }
                }), C(g + r, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null;
                    }, 16);
                }), void C(s + r, function() {
                    a.off(r), e.wrap.off("click" + r), e.arrowRight = e.arrowLeft = null;
                }));
            },
            next: function() {
                e.direction = !0, e.index = D(e.index + 1), e.updateItemHTML();
            },
            prev: function() {
                e.direction = !1, e.index = D(e.index - 1), e.updateItemHTML();
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML();
            },
            preloadNearbyImages: function() {
                var t, o = e.st.gallery.preload, a = Math.min(o[0], e.items.length), r = Math.min(o[1], e.items.length);
                for (t = 1; t <= (e.direction ? r : a); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? a : r); t++) e._preloadItem(e.index - t);
            },
            _preloadItem: function(o) {
                if (o = D(o), !e.items[o].preloaded) {
                    var a = e.items[o];
                    a.parsed || (a = e.parseEl(o)), x("LazyLoad", a), "image" === a.type && (a.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        a.hasSize = !0;
                    }).on("error.mfploader", function() {
                        a.hasSize = !0, a.loadError = !0, x("LazyLoadError", a);
                    }).attr("src", a.src)), a.preloaded = !0;
                }
            }
        }
    });
    var q = "retina";
    t.magnificPopup.registerModule(q, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t;
                });
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina, o = t.ratio;
                    o = isNaN(o) ? o() : o, o > 1 && (C("ImageHasSize." + q, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / o,
                            width: "100%"
                        });
                    }), C("ElementParse." + q, function(e, a) {
                        a.src = t.replaceSrc(a, o);
                    }));
                }
            }
        }
    }), T();
}), jQuery.fn.sortElements = function() {
    var t = [].sort;
    return function(e, o) {
        o = o || function() {
            return this;
        };
        var a = this.map(function() {
            var t = o.call(this), e = t.parentNode, a = e.insertBefore(document.createTextNode(""), t.nextSibling);
            return function() {
                if (e === this) throw new Error("You can't sort elements if any one is a descendant of another.");
                e.insertBefore(this, a), e.removeChild(a);
            };
        });
        return t.call(this, e).each(function(t) {
            a[t].call(o.call(this));
        });
    };
}(), function(t, e, o, a) {
    "use strict";
    function r(e, o) {
        this.element = e, this.settings = t.extend({}, i, o), this._defaults = i, this._name = n, 
        this.init();
    }
    var n = "urbModal", i = {};
    t.extend(r.prototype, {
        init: function() {
            var o = t(this.element).addClass("modal-shade"), a = t('<div class="modal-content" />'), r = t('<button class="modal-close" type="button" />');
            t("body").on("touchmove touchstart", function(o) {
                o = o || e.event;
                var a = t(o.target ? o.target : o.srcElement);
                if (a.hasClass("modal-shade")) return o.returnValue = !1, o.cancelBubble = !0, o.preventDefault && (o.preventDefault(), 
                o.stopPropagation()), !1;
            });
            var n = function(e) {
                var r = t(e.target);
                return !(!r.is(".modal-content") && !r.closest(".modal-content").length) || (a.removeClass("animated fadeIn").addClass("animated fadeOut"), 
                o.removeClass("modal-opened animated fadeIn").addClass("modal-closing animated fadeOut"), 
                t("body").removeClass("modal-active"), void setTimeout(function() {
                    t("body").removeClass("no-scroll"), o.removeClass("modal-closing animated fadeOut");
                }, 500));
            };
            o.on("click", n), o.wrapInner(a), o.append(r);
        },
        show: function() {
            var e = t(this.element), o = t(".modal-content", e);
            o.removeClass("fadeOut").addClass("animated fadeIn"), e.addClass("modal-opened animated fadeIn"), 
            t("body").addClass("no-scroll modal-active");
        }
    }), t.fn[n] = function(e) {
        return this.each(function() {
            t.data(this, n) || t.data(this, n, new r(this, e));
        });
    };
}(jQuery, window, document), jQuery(function(t) {
    window.Urb = {
        logging: location.search.indexOf("logging") >= 0,
        $document: t(document),
        $window: t(window),
        $body: t("body"),
        $html: t("html").removeClass("no-javascript").addClass("javascript"),
        $wpadminbar: t("#wpadminbar"),
        $logo: t(".site .site-header .site-title .site-logo"),
        $menuLogo: t('<img src="/wp-content/themes/urbanrest-wordpress-theme/images/logo-urbanrest-text-inverted-min.png" />'),
        $siteNavigation: t(".site .site-header .site-navigation"),
        $mainNavigation: t(".site .site-header .site-navigation .main-navigation"),
        $pageNavigation: t(".site .site-header .site-navigation .page-navigation"),
        $socialNavigation: t(".site .site-header .site-navigation .social-navigation"),
        $communityEvents: t(".site .site-community .site-events .events"),
        $businessHours: t(".site .site-company .site-location .business-hours"),
        $map: t(".site .site-company .site-map"),
        $mapLink: t(".site .site-company .site-map .map-link"),
        $mapContainer: t(".site .site-company .site-map .map-container"),
        $mapCanvas: t('<div class="map-canvas" />'),
        $contactForm: t(".site .site-company .site-contact .contact-form"),
        $address: t(".site .site-footer .site-address"),
        $viewport: t('<div id="viewport" />'),
        scrollPosition: document.body.scrollTop
    }, Urb.loading = function(t, e) {
        if (void 0 !== e) {
            var o = t.data("loading");
            t.data("loading", t.text()).text(o), t.removeClass("loading").addClass(e ? "success" : "failure").removeAttr("disabled");
        } else {
            var a = t.data("loading");
            t.data("loading", t.text()).text(a), t.addClass("loading").attr("disabled", !0);
        }
    }, Urb.log = function(t) {
        Urb.logging && console.log(t);
    }, Urb.setScrollPosition = function() {
        Urb.scrollPosition = Urb.$document.scrollTop();
    }, Urb.updateViewport = function() {
        Urb.log("Urb.updateViewport");
        var t = Urb.$window.outerWidth();
        Urb.$viewport.toggleClass("phone", t <= 768), Urb.$viewport.toggleClass("tablet", t > 768 && t <= 1024), 
        Urb.$viewport.toggleClass("desktop", t > 1024);
    }, Urb.setupViewport = function() {
        Urb.$body.append(Urb.$viewport), Urb.updateViewport();
    }, Urb.$window.on("load", Urb.setupViewport), Urb.$window.on("resize orientationchange", Urb.updateViewport), 
    Urb.$window.on("scroll", Urb.setScrollPosition);
}), jQuery(function(t) {
    Urb.setupModal = function() {
        Urb.log("Urb.setupModal"), t(".modal").urbModal(), t('[data-action="modal"]').on("click", Urb.showModal);
    }, Urb.showModal = function(e) {
        Urb.log("Urb.showModal"), "string" != typeof e && (e = t(this).data("target")), 
        t(e).data("urbModal").show();
    }, Urb.$window.on("ajaxloaded load", Urb.setupModal);
}), jQuery(function(t) {
    var e = Urb.$wpadminbar && Urb.$window.outerWidth() > 600 ? Urb.$wpadminbar.outerHeight() : 0, o = Urb.$pageNavigation.outerHeight() + e, a = t("main"), r = {
        "#contact": t("#contact"),
        "#beer": t("#beer")
    };
    a.length && (r[a.attr("id")] = a), Urb.$loading = t('<span class="loading-text" id="loading"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>'), 
    Urb.highlightCurrentSection = function() {
        t("a.active", Urb.$pageNavigation).removeClass("active");
        for (var e in r) {
            var o = r[e];
            Urb.scrollPosition > o.offset().top - .5 * Urb.$window.height() && Urb.scrollPosition < o.offset().top + o.outerHeight() - .5 * Urb.$window.height() && t('a[href*="' + e + '"]', Urb.$pageNavigation).addClass("active");
        }
    }, Urb.loadPage = function(o) {
        Urb.log("Urb.loadPage");
        var a = t("main");
        if (Urb.$body.removeClass("no-scroll"), "/" === o || "" === o) {
            var r = 0, n = Math.round(500 * (Math.abs(Urb.$window.scrollTop() - r) / Urb.$window.height()));
            return t("html,body").animate({
                scrollTop: r
            }, n), a.animate({
                height: 0
            }, n), void setTimeout(function() {
                a.remove();
            }, n + 250);
        }
        var i = [];
        t('a[href^="#"]').each(function() {
            var t = this.href.substring(this.href.indexOf("#"));
            i.push(t);
        });
        var s = o.replace("/", "#");
        if (t.inArray(s, i) !== -1) {
            var r = t(o.replace("/", "#")).offset().top - e, n = Math.round(500 * (Math.abs(Urb.$window.scrollTop() - r) / Urb.$window.height()));
            return t("html,body").animate({
                scrollTop: r
            }, n), a.animate({
                height: 0
            }, n), void setTimeout(function() {
                a.remove();
            }, n + 250);
        }
        var r = t(".site-posts").offset().top + t(".site-posts").outerHeight(), n = Math.round(500 * (Math.abs(Urb.$window.scrollTop() - r) / Urb.$window.height()));
        0 == a.length && (a = t('<main class="new page row around-xs" />'), t(".site-posts").after(a)), 
        Urb.$body.append(Urb.$loading), a.addClass("loading"), setTimeout(function() {
            a.animate({
                height: 0
            }, 500);
        }, n), t("html,body").animate({
            scrollTop: r - e
        }, n);
        var l = "...", c = setInterval(function() {
            3 == l.length ? l = "" : l += ".", document.title = "Loading" + l;
        }, 250);
        t.ajax({
            type: "POST",
            url: _URB.url,
            data: {
                action: "getmaincontent",
                nonce: _URB.nonce,
                slug: o
            },
            dataType: "json",
            success: function(e) {
                if (Urb.log(e), e.success) {
                    document.title = e.data.title;
                    var r = t(e.data.content);
                    a.replaceWith(r), Urb.$loading.remove(), Urb.$window.trigger("ajaxloaded");
                    var n = 0;
                    t(".page-header > *:not(.hidden), .page-content > *:not(.hidden), .page-footer > *:not(.hidden), .post-header > *:not(.hidden), .post-content > *:not(.hidden), .post-footer > *:not(.hidden)", r).each(function() {
                        var e = t(this);
                        e.hide(), setTimeout(function() {
                            e.fadeIn(330);
                        }, n), n += 88;
                    }), t("#qr-code").html(".page-footer:before {content: url(http://chart.googleapis.com/chart?cht=qr&chs=200x200&choe=UTF-8&chld=H&chl=" + encodeURIComponent(e.data.shortlink.replace(/URB.beer/i, "QR.URB.beer")) + ") !important;}}");
                } else {
                    document.title = "Server Error";
                    var r = t('<main class="page row around-xs">\t<article id="page-error" class="col-xs-11 col-sm-9 col-md-7 post-error post type-post">\t\t<header class="page-header" role="banner">\t\t\t<h2 class="page-title">Server Error</h2>\t\t</header>\t\t<div class="page-content">\t\t\t<p>\t\t\t\tThere was a problem loading the requested page, <u>' + o + '</u>.\t\t\t\tEither try again later or <a href="#contact">let us know</a> if you think something wrong.\t\t\t</p>\t\t</div>\t</article></main>');
                    a.replaceWith(r), Urb.$loading.remove(), Urb.$window.trigger("ajaxloaded");
                    var n = 0;
                    t(".page-header > *:not(.hidden), .page-content > *:not(.hidden), .page-footer > *:not(.hidden), .post-header > *:not(.hidden), .post-content > *:not(.hidden), .post-footer > *:not(.hidden)", r).each(function() {
                        var e = t(this);
                        e.hide(), setTimeout(function() {
                            e.fadeIn(330);
                        }, n), n += 88;
                    }), t("#qr-code").html(".page-footer:before {content: '' !important;}}");
                }
            },
            complete: function() {
                clearInterval(c);
            }
        });
    }, Urb.navigateInternally = function(e) {
        if (Urb.log("Urb.navigateInternally"), window.history) {
            e.preventDefault(), Urb.$menuToggle.toggleClass("open", !1), Urb.$mainNavigation.toggleClass("open", !1).removeAttr("style");
            var o = t(this), a = o.attr("href").replace(window.location.protocol + "//" + window.location.host, "");
            window.history.pushState({}, o.text(), a), Urb.loadPage(a), t("body").trigger("click");
        }
    }, Urb.performHistoryNavigation = function(t) {
        Urb.log("Urb.performHistoryNavigation"), t.preventDefault();
        var e = (t.state, document.location.pathname);
        Urb.loadPage(e);
    }, Urb.setupImageLinks = function() {
        Urb.log("Urb.setupImageLinks"), t("a").filter('[href$=".png"],[href$=".jpg"],[href$=".bmp"],[href$=".gif"],[href$=".jpeg"]').magnificPopup({
            type: "image",
            autoFocusLast: !1,
            mainClass: "mfp-fade",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            image: {
                cursor: null
            },
            callbacks: {
                open: function() {
                    Urb.$body.addClass("modal-active");
                },
                beforeClose: function() {
                    Urb.$body.removeClass("modal-active");
                }
            }
        });
    }, Urb.setupInternalLinks = function() {
        Urb.log("Urb.setupInternalLinks"), t("a").not('[href^="#"]').not(':not([href^="http://' + window.location.host + '"]):not([href^="https://' + window.location.host + '"])').not('[href$=".png"]').not('[href$=".jpg"]').not('[href$=".bmp"]').not('[href$=".gif"]').not('[href$=".jpeg"]').not('[href$=".pdf"]').not('[href$=".doc"]').not('[href$=".docx"]').not('[href$=".xls"]').not('[href$=".xlsx"]').each(function() {
            var e = t(this);
            e.closest(t("#wpadminbar")).length > 0 || e.unbind("click").click(Urb.navigateInternally);
        });
    }, Urb.setupExternalLinks = function() {
        Urb.log("Urb.setupExternalLinks"), t('a[href^="http"]:not([href*="' + window.location.host + '"])').attr("target", "_blank");
    }, Urb.setupFragmentAnchors = function() {
        Urb.log("Urb.setupFragmentAnchors"), Urb.$document.on("click", 'a[href^="#"]', function(o) {
            o.preventDefault();
            var a = t.attr(this, "href"), r = 0, n = t(a);
            return "#" !== a && 0 !== n.length ? r = n.offset().top : a = "/", t("html,body").animate({
                scrollTop: Math.ceil(r - e)
            }, Math.round(500 * (Math.abs(Urb.$window.scrollTop() - r) / Urb.$window.height()))), 
            !1;
        });
    }, Urb.setupPageNavigation = function() {
        Urb.log("Urb.setupPageNavigation"), Urb.$pageNavigation.find(".menu-item a").click(function() {
            var e = t(this);
            e.blur();
        }), Urb.$menuToggle = t("#menu-toggle"), Urb.$mainMenu = t("#menu-main-menu"), Urb.$menuToggle.on("click", function() {
            var o = !1;
            Urb.scrollPosition > 0 && (Urb.scrollPosition < Urb.$window.height() / 2 ? o = 0 : Urb.scrollPosition < Urb.$window.height() && (o = Urb.$window.height()));
            var a = function() {
                Urb.$menuToggle.toggleClass("open"), Urb.$mainNavigation.toggleClass("open"), Urb.$mainNavigation.hasClass("open") ? Urb.scrollPosition < Urb.$window.height() / 2 ? Urb.$mainNavigation.css("top", Urb.$window.height() - Urb.$pageNavigation.outerHeight() - Urb.$mainMenu.outerHeight()) : Urb.$mainNavigation.css("bottom", Urb.$window.height() - Urb.$pageNavigation.outerHeight() - Urb.$mainMenu.outerHeight()) : Urb.$mainNavigation.removeAttr("style");
            };
            o !== !1 ? t("html,body").animate({
                scrollTop: o - e
            }, {
                duration: 250,
                easing: "swing"
            }).promise().done(a) : a();
        });
    }, Urb.setupNavigationSnap = function() {
        Urb.windowHeightMinusWPHeaderHeight = Urb.$window.height() - Urb.$pageNavigation.outerHeight() - e;
    }, Urb.scrollPageNavigation = function() {
        Urb.scrollPosition >= Urb.windowHeightMinusWPHeaderHeight ? Urb.$siteNavigation.addClass("stuck-top").removeClass("past-midpoint") : Urb.scrollPosition >= Urb.$window.height() / 2 ? Urb.$siteNavigation.addClass("past-midpoint").removeClass("stuck-top") : Urb.$siteNavigation.removeClass("past-midpoint").removeClass("stuck-top");
    }, Urb.scrollSocialNavigation = function() {
        Urb.$socialNavigation.is(":visible") ? Urb.scrollPosition > Urb.$window.height() ? Urb.$socialNavigation.addClass("hidden") : Urb.$socialNavigation.css({
            opacity: (1 - Urb.scrollPosition / (Urb.$window.height() / 15)).toFixed(2),
            "margin-top": (-1 * Urb.scrollPosition / 5).toFixed() + "px",
            transform: "scale(" + (1 - .2 * Urb.scrollPosition / (Urb.$window.height() / 5)).toFixed(2) + ")"
        }) : Urb.scrollPosition < Urb.$window.height() && Urb.$socialNavigation.removeClass("hidden");
    }, Urb.scrollToContent = function() {
        if (Urb.$body.hasClass("home")) {
            if (location.hash) {
                var a = t(location.hash), r = 5;
                Urb.$window.scrollTop() > a.offset().top - (o + r) && Urb.$window.scrollTop() < a.offset().top + r && Urb.$window.scrollTop(a.offset().top - o);
            } else if (location.pathname && location.pathname.match(/^\/(beer|contact)\/?$/)) {
                var a = t(location.pathname.replace(/\/$/, "").replace(/\/+/, "#")), r = 5;
                0 == Urb.$window.scrollTop() && a.length && Urb.$window.scrollTop(a.offset().top);
            }
        } else {
            Urb.$body.addClass("home");
            var n = t("main");
            0 == Urb.$window.scrollTop() && n.length && Urb.$window.scrollTop(n.offset().top - e);
        }
        Urb.scrollPageNavigation();
    }, "scrollRestoration" in history && (history.scrollRestoration = "manual"), Urb.$window.on("load orientationchange resize", Urb.setupNavigationSnap), 
    Urb.$window.on("ajaxloaded load", Urb.setupExternalLinks), Urb.$window.on("ajaxloaded load", Urb.setupImageLinks), 
    Urb.$window.on("load", Urb.setupFragmentAnchors), Urb.$window.on("ajaxloaded load", Urb.setupInternalLinks), 
    Urb.$window.on("load", Urb.setupPageNavigation), Urb.$window.on("load scroll", Urb.scrollPageNavigation), 
    Urb.$window.on("load scroll", Urb.scrollSocialNavigation), Urb.$window.on("load", Urb.scrollToContent), 
    Urb.$window.on("popstate", Urb.performHistoryNavigation), Urb.handleTouchEvents = function() {
        Urb.touchEventsHandled || (t("a, button").each(function() {
            var e = t(this);
            e.on("mouseenter mouseover", function(t) {
                t.preventDefault();
            }).on("touchend", function(e) {
                t("body").trigger("touchstart");
            });
        }), Urb.touchEventsHandled = !0);
    }, Urb.$window.on("touchstart", Urb.handleTouchEvents);
}), jQuery(function(t) {
    Urb.$searchForm = t("#search"), Urb.$search = t("input", Urb.$searchForm), Urb.$searchButton = t('[href="#search"]', Urb.$socialNavigation), 
    Urb.$searchLabel = t(".search-label", Urb.$searchForm), Urb.$searchSubmit = t("button", Urb.$searchForm), 
    Urb.cancelSearching = function() {
        setTimeout(function() {
            Urb.$searchForm.toggleClass("searching", !1);
        }, 250);
    }, Urb.changeSearch = function() {
        Urb.$searchLabel.toggleClass("visible", !Urb.$search.is(":valid"));
    }, Urb.search = function() {
        if (Urb.$search.is(":invalid")) return event.preventDefault(), !1;
    }, Urb.setupSearch = function() {}, Urb.showSearchBox = function() {
        Urb.startSearching(), Urb.$search.focus();
    }, Urb.startSearching = function() {
        Urb.changeSearch(), Urb.$searchForm.toggleClass("searching", !0);
    }, Urb.$searchButton.on("click", Urb.showSearchBox), Urb.$searchSubmit.on("click", function() {
        Urb.$searchForm.submit();
    }), Urb.$searchForm.on("submit", Urb.search), Urb.$search.on("blur", Urb.cancelSearching), 
    Urb.$search.on("input", Urb.changeSearch), Urb.$window.on("load", Urb.setupSearch);
}), jQuery(function(t) {
    Urb.hideTooltip = function() {
        Urb.log("Urb.hideTooltip");
        var e = t(this), o = e.data("tooltip");
        o && (o.removeClass("active"), setTimeout(function() {
            o.hasClass("active") || (e.data("tooltip", !1), e.attr("title", e.attr("data-title")), 
            e.removeAttr("data-title"), o.remove());
        }, 1e3));
    }, Urb.positionTooltip = function(t, e) {
        var o = e.offset().top - 1.25 * t.outerHeight() < Urb.scrollPosition;
        t.toggleClass("above", !o), t.toggleClass("below", o), o ? t.css({
            left: e.offset().left + e.width() / 2 - t.outerWidth() / 2,
            top: e.offset().top + e.outerHeight() + .25 * t.outerHeight()
        }) : t.css({
            left: e.offset().left + e.width() / 2 - t.outerWidth() / 2,
            top: e.offset().top - 1.25 * t.outerHeight()
        });
        var a = t.offset().left < 0, r = t.offset().left + t.outerWidth() > Urb.$window.width();
        t.toggleClass("left", a), t.toggleClass("right", r), a ? t.css({
            left: e.offset().left + e.width() / 2 - t.outerWidth() / 2 + t.offset().left * -1
        }) : r && t.css({
            left: e.offset().left + e.width() / 2 - t.outerWidth() / 2 - (t.offset().left + t.outerWidth() - Urb.$window.width())
        });
    }, Urb.showTooltip = function() {
        Urb.log("showTooltip");
        var e = t(this), o = e.data("tooltip"), a = e.attr("title");
        e.parents(".map-canvas") || (o ? (Urb.positionTooltip(o, e), o.addClass("active")) : (o = t("<div />"), 
        o.addClass("tooltip"), o.text(a), Urb.$body.append(o), Urb.positionTooltip(o, e), 
        e.data("tooltip", o), o.addClass("active"), e.attr("data-title", a), e.removeAttr("title")));
    }, Urb.setupTooltips = function() {
        Urb.$body.on("mouseleave", "[title], [data-title]", Urb.hideTooltip), Urb.$body.on("mouseenter", "[title], [data-title]", Urb.showTooltip);
    }, Urb.$window.on("ajaxloaded load", Urb.setupTooltips);
}), jQuery(function(t) {
    var e, o = Urb.$wpadminbar ? Urb.$wpadminbar.outerHeight() : 0, a = (Urb.$pageNavigation.outerHeight() + o, 
    t('<button class="next"><span class="fa fa-angle-right"></span></button>')), r = t('<button class="previous"><span class="fa fa-angle-left"></span></button>'), n = t(".site-posts .latest-posts .blog-post h4");
    Urb.automaticNavigation = function() {
        Urb.showNextPost();
    }, Urb.showPreviousPost = function() {
        Urb.log("Urb.showPreviousPost");
        var e = t(".site-posts .latest-posts .blog-post.active"), o = e.prev(".previous.blog-post");
        0 === Urb.scrollPosition && o.length && r.trigger("click");
    }, Urb.showNextPost = function() {
        Urb.log("Urb.showNextPost");
        var e = t(".site-posts .latest-posts .blog-post.active"), o = e.next(".next.blog-post");
        0 === Urb.scrollPosition && o.length && a.trigger("click");
    }, Urb.scrollHeader = function() {
        n.each(function() {
            var e = t(this);
            e.parents(".blog-post").is(".active") && (Urb.scrollPosition > 0 && Urb.scrollPosition < Urb.$window.height() ? e.css({
                height: (100 - 25 * Urb.scrollPosition / Urb.$window.height()).toFixed(2) + "%",
                transform: "scale(" + (1 - .15 * Urb.scrollPosition / Urb.$window.height()).toFixed(3) + ")"
            }) : e.removeAttr("style"));
        });
    }, Urb.setupHeaderNavigation = function() {
        Urb.log("Urb.setupHeaderNavigation"), a.on("click", function(e) {
            var o = t(".site-posts .latest-posts .blog-post.active"), n = o.next(".next.blog-post"), i = t(".site-posts .latest-posts .blog-post:first-child");
            o.length ? (r.addClass("active"), o.removeClass("active").addClass("previous"), 
            n.length && (n.removeClass("previous next").addClass("active"), Urb.getNextPost()), 
            n.next(".next.blog-post").length || a.removeClass("active")) : i.removeClass("previous next").addClass("active"), 
            Urb.stopAutomaticNavigation();
        }), r.on("click", function(e) {
            var o = t(".site-posts .latest-posts .blog-post.active"), n = o.prev(".previous.blog-post"), i = t(".site-posts .latest-posts .blog-post:last-child");
            o.length ? (a.addClass("active"), o.removeClass("active").addClass("next"), n.length && n.removeClass("previous next").addClass("active"), 
            n.prev(".previous.blog-post").length || r.removeClass("active")) : i.removeClass("previous next").addClass("active"), 
            Urb.stopAutomaticNavigation();
        }), t(".site-posts .latest-posts").after(a).after(r), t(".site-posts .latest-posts .blog-post > a").on("dragstart", function() {
            return !1;
        });
        document.getElementById("latest-posts");
        Urb.getNextPost();
    }, Urb.startAutomaticNavigation = function() {
        e && clearInterval(e), e = setTimeout(function() {
            Urb.automaticNavigation();
        }, 5e3);
    }, Urb.stopAutomaticNavigation = function() {
        e && clearInterval(e), Urb.$window.off("scroll", Urb.stopAutomaticNavigation);
    }, Urb.getNextPost = function() {
        Urb.log("Urb.getNextPost"), t.ajax({
            type: "POST",
            url: _URB.url,
            data: {
                action: "getnext",
                id: t(".site-posts .latest-posts .blog-post:last-child").data("post-id")
            },
            success: function(e) {
                if (Urb.log(e), e.success) {
                    var o = t("<li />");
                    o.addClass("blog-post next"), o.attr("data-post-id", e.data.ID);
                    var r = t("<a />");
                    if (r.attr("href", e.data.permalink), r.on("dragstart", function() {
                        return !1;
                    }), r.on("click", Urb.navigateInternally), o.append(r), e.data.thumbnail) {
                        var n = t("<span />");
                        n.addClass("blog-post-image"), e.data.image_src && n.css({
                            "background-image": "url(" + e.data.image_src + ")"
                        }), n.append(e.data.thumbnail), r.append(n);
                    }
                    if (e.data.post_title) {
                        var i = t("<h4 />");
                        i.text(e.data.post_title), r.append(i);
                    }
                    if (e.data.excerpt) {
                        var s = t("<div />");
                        s.addClass("blog-post-intro"), s.html(e.data.excerpt), o.append(s);
                    }
                    t(".site-posts .latest-posts").append(o), a.addClass("active");
                }
            }
        });
    }, Urb.$window.on("scroll", Urb.stopAutomaticNavigation), Urb.$window.on("load scroll", Urb.scrollHeader), 
    Urb.$window.on("load", Urb.setupHeaderNavigation);
}), jQuery(function(t) {
    Urb.$specials = t(".site-specials"), Urb.$currentBeerTaps = t(".current-beer .taps", Urb.$specials), 
    Urb.$currentBeerDeck = t(".upcoming-beer .decks", Urb.$specials), Urb.setupTapSorting = function() {
        Urb.log("Urb.setupTapSorting"), t("th", Urb.$currentBeerTaps).click(Urb.sortTap);
    }, Urb.sortTap = function() {
        Urb.log("Urb.sortTap");
        var e = t(this);
        Urb.$currentBeerTaps.find("td").filter(function() {
            return t(this).index() === e.index();
        }).sortElements(function(e, o) {
            return t.text([ e ]) == t.text([ o ]) ? 0 : t.text([ e ]) > t.text([ o ]) ? 1 : -1;
        }, function() {
            return this.parentNode;
        }), Urb.$currentBeerDeck.find("td").filter(function() {
            return t(this).index() === e.index();
        }).sortElements(function(e, o) {
            return t.text([ e ]) == t.text([ o ]) ? 0 : t.text([ e ]) > t.text([ o ]) ? 1 : -1;
        }, function() {
            return this.parentNode;
        });
    }, Urb.$window.on("load", Urb.setupTapSorting);
}), jQuery(function(t) {
    Urb.setupEventLinks = function() {
        t(".event", Urb.$communityEvents).each(function() {
            var e = t(this);
            e.on("click", function(e) {
                location.href = t(this).children(".event-what").attr("href");
            });
        });
    }, Urb.$window.on("load", Urb.setupEventLinks);
}), jQuery(function(t) {
    var e = Urb.$wpadminbar ? Urb.$wpadminbar.outerHeight() : 0, o = Urb.$pageNavigation.outerHeight() + e;
    Urb.centerMap = function() {
        Urb.log("Urb.centerMap"), Urb.$map.hasClass("open") && (Urb.$map.data("map").setCenter(Urb.$map.data("marker").getPosition()), 
        Urb.$map.data("map").panTo(Urb.$map.data("marker").getPosition()));
    }, Urb.scrollMap = function() {
        if (Urb.$map.hasClass("open") && !Urb.$map.hasClass("animating") && Urb.$mapCanvas.offset().top > Urb.scrollPosition + Urb.$window.height() && (Urb.$map.removeClass("open"), 
        t(".map-container, .map-canvas", Urb.$map).removeAttr("style")), !Urb.$map.data("map") && Urb.$window.scrollTop() > t("#contact").offset().top) {
            var e = t("<script />");
            e.attr("type", "text/javascript"), e.attr("async", !0), e.attr("src", "https://maps.google.com/maps/api/js?key=" + _URB.googleBrowserMapApiKey + "&callback=Urb.setupMap"), 
            Urb.$body.append(e), Urb.$map.data("map", !0);
        }
    }, Urb.setupBusinessHours = function() {
        Urb.log("Urb.setupBusinessHours");
        var e = new Date(), o = e.getDay() + 1;
        t("dt:nth-of-type(" + o + "), dd:nth-of-type(" + o + ")", Urb.$businesHours).addClass("today"), 
        t("dt", Urb.$businessHours).hover(function() {
            t(this).toggleClass("hover").next("dd").toggleClass("hover");
        }), t("dd", Urb.$businessHours).hover(function() {
            t(this).toggleClass("hover").prev("dt").toggleClass("hover");
        });
    }, Urb.setupContactForm = function() {
        Urb.log("Urb.setupContactForm"), Urb.$contactForm.attr("novalidate", !0), Urb.$contactForm.on("submit", Urb.submitContactForm), 
        t(".field input, .field textarea", Urb.$contactForm).on("keyup", function() {
            t(this).closest(".field").toggleClass("active", this.value.length > 0 || t(this).is(":focus"));
        }).on("blur", function() {
            0 == this.value.length && t(this).closest(".field").removeClass("active");
        });
        var e = Urb.$contactForm.find("#contact_email_address");
        Urb.$contactForm.data("email_address", e), e.on("keyup", function() {
            e.closest(".field").removeClass("error").removeAttr("title");
        });
        var o = Urb.$contactForm.find("#contact_message");
        o.on("focus keyup", function() {
            this.clientHeight < this.scrollHeight && t(this).css("height", this.scrollHeight + "px");
        }).on("blur", function() {
            t(this).removeAttr("style");
        });
    }, Urb.setupMap = function() {
        Urb.log("Urb.setupMap"), google || t(".site-map").remove(), Urb.$mapCanvas.appendTo(Urb.$mapContainer);
        var e = {
            disableDefaultUI: !0,
            draggable: !0,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: !1,
            overviewMapControl: !0,
            rotateControl: !1,
            scaleControl: !1,
            scrollwheel: !1,
            streetViewControl: !1,
            zoom: 14,
            zoomControl: !0,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };
        Urb.$map.data("latitude") && Urb.$map.data("longitude") && (e.center = new google.maps.LatLng(Urb.$map.data("latitude"), Urb.$map.data("longitude")), 
        t.getJSON("/wp-content/themes/urbanrest-wordpress-theme/styles/map.json", function(t) {
            e.styles = t;
            var o = new google.maps.Map(Urb.$mapCanvas.get(0), e), a = new google.maps.Marker({
                icon: {
                    labelOrigin: {
                        x: 30,
                        y: 19
                    },
                    url: "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png"
                },
                label: {
                    fontFamily: "FontAwesome",
                    fontSize: "22px",
                    text: ""
                },
                map: o,
                position: e.center
            }), r = "https://www.google.com/maps/dir//2615+Wolcott+Avenue,+Ferndale,+Michigan,+48220";
            navigator.userAgent.match(/(Apple|Mac|iPhone|iPod|iPad)/i) && (r = "http://maps.apple.com/?daddr=2615+Wolcott+Avenue,+Ferndale,+Michigan,+48220");
            var n = new google.maps.InfoWindow({
                content: Urb.$address.html() + '<br /><a class="map-external-link" href="' + r + '">Get Directions</a>'
            });
            Urb.$map.data("map", o), Urb.$map.data("marker", a), Urb.$map.data("infoWindow", n), 
            google.maps.event.addListener(a, "click", function() {
                n.open(o, a);
            }), n.open(o, a);
        }));
    }, Urb.handleContactFormResponse = function(e) {
        Urb.trackEvent(window.location.pathname, "Contact", "Submit", 1), e && e.success && (Urb.loading(t('button[type="submit"]', Urb.$contactForm), !0), 
        Urb.$contactForm[0].reset());
    }, Urb.submitContactForm = function(e) {
        Urb.log("Urb.submitContactForm"), e.preventDefault(), Urb.validateContactForm() && (Urb.loading(t('button[type="submit"]', Urb.$contactForm)), 
        t.ajax({
            url: Urb.$contactForm.attr("action"),
            data: Urb.$contactForm.serialize(),
            dataType: "json",
            method: Urb.$contactForm.attr("method"),
            complete: Urb.handleContactFormResponse
        }));
    }, Urb.resizeMap = function() {
        if (Urb.$map.hasClass("open")) {
            Urb.$map.addClass("animating");
            var e = (Urb.$window.outerHeight() - o - t("h3", Urb.$map).outerHeight()).toFixed(0);
            t(".map-container, .map-canvas", Urb.$map).css("height", e + "px"), Urb.centerMap(), 
            t("html,body").animate({
                scrollTop: Urb.$window.scrollTop() + e
            }, 666, function() {
                Urb.$map.removeClass("animating");
            });
        }
    }, Urb.toggleMap = function(e) {
        Urb.log("Urb.toggleMap"), e.preventDefault(), t(e.target).blur(), Urb.$map.data("map") || Urb.setupMap(), 
        Urb.$map.toggleClass("open"), Urb.$map.hasClass("open") ? (Urb.resizeMap(), Urb.trackEvent(window.location.pathname, "Map", "Open", 1)) : t(".map-container, .map-canvas", Urb.$map).removeAttr("style");
    }, Urb.validateContactForm = function() {
        Urb.log("Urb.validateContactForm");
        var t = Urb.$contactForm.data("email_address");
        return !(t.val().length < 3 || t.val().indexOf("@") < 0) || (t.closest(".field").addClass("error").attr("title", "Valid email address required."), 
        !1);
    }, Urb.$window.on("scroll", Urb.scrollMap), Urb.$window.on("load", Urb.setupBusinessHours), 
    Urb.$mapLink.on("click", Urb.toggleMap), Urb.$window.on("load", Urb.setupContactForm), 
    Urb.$window.on("resize orientationchange", Urb.resizeMap);
}), jQuery(function(t) {
    Urb.rateBeer = function() {
        Urb.log("Urb.rateBeer");
        var e = t(".rating-actions"), o = t(this);
        return e.addClass("rated"), o.addClass("rated"), o.prevAll(".rate-button").addClass("rated"), 
        o.nextAll(".rate-button").removeClass("rated"), t.ajax({
            type: "POST",
            url: _URB.url,
            data: {
                action: "post-rate",
                nonce: _URB.nonce,
                post_rating: o.val(),
                post_id: o.data("id")
            },
            dataType: "json",
            success: function(t) {
                t.success ? Urb.$aggregateRating.attr("data-user-rating", o.val()) : Urb.log(t);
            }
        }), Urb.shareRating(o.val()), !1;
    }, Urb.setupRatingPoll = function() {
        Urb.log("Urb.setupRatingPoll"), Urb.$aggregateRating = t('[itemprop="aggregateRating"]'), 
        Urb.$beerCheckinModal = t(".modal.checkin-modal");
        var e = t("<h6>Rate this Beer</h6>");
        e.insertAfter(".beer-rating h5");
        var o = t('<div class="rating-actions" />');
        Number(Urb.$aggregateRating.data("user-rating")) > 0 && o.addClass("rated");
        for (var a = 1; a <= 5; a++) {
            var r = t('<button class="rate-button" />');
            r.val(a), r.data("id", Urb.$aggregateRating.data("beer-id")), r.text(1 === a ? "1 Star" : a + " Stars"), 
            r.toggleClass("rated", a <= Number(Urb.$aggregateRating.data("user-rating"))), o.append(r), 
            r.on("click", Urb.rateBeer);
        }
        Urb.$aggregateRating.after(o);
    }, Urb.setupRatingsFrom3rdParties = function() {
        Urb.log("Urb.setupRatingsFrom3rdParties"), t.ajaxSetup({
            beforeSend: function(t) {
                t.setRequestHeader("Authorization", "Basic " + btoa("urbanrest:Greensleeves"));
            }
        }), t.ajax({
            type: "get",
            url: _URB.url,
            data: {
                action: "getrating",
                nonce: _URB.nonce,
                rating_system: "untappd",
                postId: t('[itemprop="aggregateRating"]').data("beer-id")
            },
            dataType: "json",
            success: function(e) {
                var o = Number(t('[itemprop="ratingValue"]', Urb.$aggregateRating).text()), a = Number(t('[itemprop="reviewCount"]', Urb.$aggregateRating).text()), r = o * a;
                if (e.response.beer) {
                    var n = e.response.beer.rating_score, i = e.response.beer.rating_count, s = n * i, l = r + s, c = a + i, d = l / c;
                    Urb.$aggregateRating.attr("data-overall-rating", d.toFixed(1)), t('[itemprop="ratingValue"]', Urb.$aggregateRating).text(d.toFixed(1)), 
                    t('[itemprop="reviewCount"]', Urb.$aggregateRating).text(c.toFixed(0));
                }
            }
        }), t.ajax({
            type: "get",
            url: _URB.url,
            data: {
                action: "getrating",
                nonce: _URB.nonce,
                rating_system: "ratebeer",
                postId: t('[itemprop="aggregateRating"]').data("beer-id")
            },
            dataType: "json",
            success: function(e) {
                var o = Number(t('[itemprop="ratingValue"]', Urb.$aggregateRating).text()), a = Number(t('[itemprop="reviewCount"]', Urb.$aggregateRating).text()), r = o * a;
                if (e) {
                    var n = Number(e.rating_value) / Number(e.best_rating) * 5, i = Number(e.review_count), s = n * i, l = r + s, c = a + i, d = l / c;
                    Urb.$aggregateRating.attr("data-overall-rating", d.toFixed(1)), t('[itemprop="ratingValue"]', Urb.$aggregateRating).text(d.toFixed(1)), 
                    t('[itemprop="reviewCount"]', Urb.$aggregateRating).text(c.toFixed(0));
                }
            }
        }), t.ajax({
            type: "get",
            url: _URB.url,
            data: {
                action: "getrating",
                nonce: _URB.nonce,
                rating_system: "untappd",
                postId: t('[itemprop="aggregateRating"]').data("beer-id")
            },
            dataType: "json",
            success: function(e) {
                var o = Number(t('[itemprop="ratingValue"]', Urb.$aggregateRating).text()), a = Number(t('[itemprop="reviewCount"]', Urb.$aggregateRating).text()), r = o * a;
                if (e) {
                    var n = Number(e.rating_value) / Number(e.best_rating) * 5, i = Number(e.review_count), s = n * i, l = r + s, c = a + i, d = l / c;
                    Urb.$aggregateRating.attr("data-overall-rating", d.toFixed(1)), t('[itemprop="ratingValue"]', Urb.$aggregateRating).text(d.toFixed(1)), 
                    t('[itemprop="reviewCount"]', Urb.$aggregateRating).text(c.toFixed(0));
                }
            }
        });
    }, Urb.shareRating = function(e) {
        Urb.log("Urb.shareRating");
        var o = t(".message", Urb.$beerCheckinModal);
        0 == o.length && (o = t('<div class="message" />'), t(".modal-content", Urb.$beerCheckinModal).prepend(o));
        var a = "Thanks.";
        switch (Number(e)) {
          case 5:
            a = "Wow, Thank You!";
            break;

          case 4:
            a = "Glad You Enjoyed It!";
            break;

          case 3:
            a = "Thanks!";
            break;

          case 2:
            a = "Thank you.";
            break;

          case 1:
            a = "We can do better.";
        }
        o.text(a), Urb.showModal(".modal.checkin-modal");
    }, Urb.$window.on("ajaxloaded load", Urb.setupRatingPoll);
}), jQuery(function(t) {
    Urb.scrollSharing = function() {
        t("main").each(function() {
            var e = t(this);
            Urb.scrollPosition + Urb.$window.height() > e.offset().top + 1.5 * Urb.$pageNavigation.outerHeight() && Urb.scrollPosition + Urb.$window.height() < e.offset().top + e.outerHeight() ? e.find(".page-share, .post-share").addClass("visible") : e.find(".page-share, .post-share").removeClass("visible");
        });
    }, Urb.setupSharing = function() {
        Urb.log("Urb.setupSharing");
        var e = t("main");
        e.length > 0 && t(".page-share, .post-share", e).addClass("visible").bind("click", function() {
            t(".modal.share-modal .shortlink", e).focus();
        });
    }, Urb.$window.on("ajaxloaded load scroll", Urb.scrollSharing), Urb.$window.on("ajaxloaded load", function() {
        setTimeout(Urb.setupSharing, 500);
    });
}), jQuery(function(t) {
    Urb.setupGallery = function() {
        Urb.log("Urb.setupGallery"), t(".gallery .gallery-icon a").magnificPopup({
            type: "image",
            autoFocusLast: !1,
            mainClass: "mfp-fade",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            image: {
                cursor: null
            },
            callbacks: {
                open: function() {
                    Urb.$body.addClass("modal-active");
                },
                beforeClose: function() {
                    Urb.$body.removeClass("modal-active");
                }
            }
        });
    }, Urb.$window.on("ajaxloaded load", Urb.setupGallery);
}), jQuery(function(t) {
    Urb.setupAnalytics = function() {
        Urb.log("Urb.setupAnalytics"), function(t, e, o, a, r, n, i) {
            t.GoogleAnalyticsObject = r, t[r] = t[r] || function() {
                (t[r].q = t[r].q || []).push(arguments);
            }, t[r].l = 1 * new Date(), n = e.createElement(o), i = e.getElementsByTagName(o)[0], 
            n.async = 1, n.src = a, i.parentNode.insertBefore(n, i);
        }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), 
        ga("create", _URB.googleAnalyticsTrackingID, "auto"), ga("require", "linkid", "linkid.js"), 
        ga("set", "anonymizeIp", !0), Urb.trackPageView();
    }, Urb.setupEvents = function() {
        Urb.log("Urb.setupEvents"), t("a").on("click", function(e) {
            var o = t(e.target).closest("a");
            if (1 == o.length && window.location.host != o[0].host && !o.attr("onclick")) {
                e.preventDefault();
                var a = o[0].href, r = function() {
                    document.location = a;
                };
                o.data("event-action") ? Urb.trackEvent(window.location.pathname, o.data("event-action"), o.data("event-label"), 1, r) : Urb.trackEvent(window.location.pathname, "Outbound", a, 1, r), 
                setTimeout(r, 666);
            }
        });
    }, Urb.trackEvent = function(t, e, o, a, r) {
        Urb.log("Urb.trackEvent"), ga("send", {
            hitType: "event",
            eventCategory: t,
            eventAction: e,
            eventLabel: o,
            eventValue: a,
            hitCallback: r
        });
    }, Urb.trackPageView = function() {
        Urb.log("Urb.trackPageView"), setTimeout(function() {
            ga("send", "pageview", window.location.pathname);
        }, 666);
    }, Urb.$window.on("load", Urb.setupAnalytics), Urb.$window.on("ajaxloaded load", Urb.setupEvents), 
    Urb.$window.on("ajaxloaded", Urb.trackPageView);
});
//# sourceMappingURL=script.js.map
