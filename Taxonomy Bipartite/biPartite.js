! function() {
    var t = {
            version: "1.4.0"
        },
        e = 2 * Math.PI,
        n = Math.PI,
        r = Math.PI / 2;

    function a(t) {
        return t.height
    }

    function i(t) {
        return t.width
    }

    function o(t) {
        return t.height / 2
    }

    function u(t) {
        return t.width / 2
    }

    function c(t) {
        return t.key
    }

    function l(t) {
        var e;
        return function(n) {
            return arguments.length ? (e = n, t) : e
        }
    }

    function d(t, e) {
        var n;
        return function(r) {
            return arguments.length ? (n = r, t) : void 0 !== n ? n : e
        }
    }

    function s(t, e, n, r, a, i) {
        if (a <= 0 || r <= 0) return 0;
        var o = t.concat().sort(d3.ascending),
            u = r - o.length * e + (i ? e : 0),
            c = [],
            l = 0,
            d = 0;
        return d3.range(o.length).forEach(function(t) {
            d = (u - n * t) / (a -= o[t - 1] || 0), l += o[t] * d <= n ? 1 : 0, c.push(d)
        }), c[l]
    }

    function f(t, e, n, r, a) {
        var i = r,
            o = d3.sum(t),
            u = s(t, e, n, a - r, o, !1);
        return t.map(function(t) {
            var r = u * t,
                a = (r < n ? n : r) / 2;
            return {
                c: (i += 2 * a + e) - a,
                v: r,
                w: a,
                value: t,
                percent: t / (o || 1)
            }
        })
    }

    function p(t) {
        function e(t, e) {
            return [t * Math.cos(e), t * Math.sin(e)]
        }
        var r = e(t[0], t[2]),
            a = e(t[0], t[3]),
            i = e(t[1], t[2]),
            o = e(t[1], t[3]);
        return ["M", r, "A", t[0], t[0], "0", t[3] - t[2] > n ? 1 : 0, "1", a, "L", o, "A", t[1], t[1], "0", t[3] - t[2] > n ? 1 : 0, "0", i, "z"].join(" ")
    }

    function h(t, r, a, i, o, u) {
        var c = p(t, r),
            l = p(t, a),
            d = p(i, o),
            s = p(i, u);
        return "M" + c + f(t, l, a - r) + (r == o && a == u ? h(c, r, a, i) : h(d, a, o, i) + f(i, s, u - o) + h(c, r, u, t)) + "Z";

        function f(t, e, r) {
            return "A" + t + "," + t + " 0 " + +(r > n) + ",1 " + e
        }

        function p(t, e) {
            return [t * Math.cos(e), t * Math.sin(e)]
        }

        function h(t, r, a, i) {
            var o = (a += a < r ? e : 0) - r,
                u = 1 - (o > n ? e - o : o) / n;
            u = Math.pow(u, 5);
            var c = (a + r) / 2 - (a - r > n ? n : 0);
            return "Q" + u * i * Math.cos(c) + "," + u * i * Math.sin(c) + " " + t
        }
    }

    function v() {
        return d3.scaleOrdinal().range(d3.schemeCategory10)
    }

    function y(t, e) {
        ret = [];
        for (var n = e; n > e - t; n--) ret.push(n < 0 ? n + t : n);
        return ret
    }
    t.maps = {
        uscountyurl: "https://gist.githubusercontent.com/NPashaP/bf60b406b22a3bdf98f4483fddafdbb5/raw/5d9013e746e916eefe467750f7a11df91a3dc74f/us.json"
    }, t.biPartite = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p, h, g, v, y, m = !0;

        function b(t) {
            s = t, x(), y = b.bars(), s.select(".viz-biPartite").remove();
            var e = s.append("g").attr("class", "viz-biPartite");
            e.selectAll(".viz-biPartite-subBar").data(y.subBars).enter().append("g").attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).attr("class", "viz-biPartite-subBar").append("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z).style("fill", function(t) {
                return d(t)
            }), e.selectAll(".viz-biPartite-edge").data(y.edges).enter().append("path").attr("class", "viz-biPartite-edge").attr("d", function(t) {
                return t.path
            }).style("fill-opacity", b.edgeOpacity()).style("fill", function(t) {
                return d(t)
            }), e.selectAll(".viz-biPartite-mainBar").data(y.mainBars).enter().append("g").attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).attr("class", "viz-biPartite-mainBar").append("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z).style("fill-opacity", 0).on("mouseover", b.mouseover).on("mouseout", b.mouseout).on("click", b.onClick).on("tab", b.onClick2)
        }

        function x() {
            m && (b.fill(), b.keyPrimary(), b.sortPrimary(), b.keySecondary(), b.sortSecondary(), b.value(), b.width(), b.height(), b.barSize(), b.min(), b.orient(), b.pad(), b.duration(), b.edgeOpacity(), b.edgeMode(), m = !1)
        }

        function A(t) {
            return -t.width
        }

        function k(t) {
            return -t.height
        }

        function w(t) {
            return 2 * t.width
        }

        function z(t) {
            return 2 * t.height
        }
        return b.data = function(t) {
            return arguments.length ? (l = t, m = !0, b) : l
        }, b.fill = function(t) {
            return arguments.length ? (d = t, m = !0, b) : d || (e = d3.scaleOrdinal(d3.schemeCategory10), d = function(t) {
                return e(t.primary)
            });
            var e
        }, b.keyPrimary = function(e) {
            return arguments.length ? (t = e, m = !0, b) : t || (t = function(t) {
                return t[0]
            })
        }, b.sortPrimary = function(t) {
            return arguments.length ? (h = t, m = !0, b) : h || (h = d3.ascending)
        }, b.keySecondary = function(t) {
            return arguments.length ? (e = t, m = !0, b) : e || (e = function(t) {
                return t[1]
            })
        }, b.sortSecondary = function(t) {
            return arguments.length ? (g = t, m = !0, b) : g || (g = d3.ascending)
        }, b.value = function(t) {
            return arguments.length ? (n = t, m = !0, b) : n || (n = function(t) {
                return t[2]
            })
        }, b.width = function(t) {
            return arguments.length ? (r = t, m = !0, b) : r || (r = "vertical" == b.orient() ? 400 : 600)
        }, b.height = function(t) {
            return arguments.length ? (a = t, m = !0, b) : a || (a = "vertical" == b.orient() ? 600 : 400)
        }, b.barSize = function(t) {
            return arguments.length ? (o = t, m = !0, b) : o || (o = 35)
        }, b.min = function(t) {
            return arguments.length ? (u = t, m = !0, b) : void 0 === u ? u = 0 : u
        }, b.orient = function(t) {
            return arguments.length ? (i = t, m = !0, b) : void 0 === i ? i = "vertical" : i
        }, b.pad = function(t) {
            return arguments.length ? (c = t, m = !0, b) : void 0 === c ? c = 1 : c
        }, b.duration = function(t) {
            return arguments.length ? (p = t, m = !0, b) : void 0 === p ? p = 500 : p
        }, b.edgeOpacity = function(t) {
            return arguments.length ? (f = t, m = !0, b) : void 0 === f ? f = .4 : f
        }, b.edgeMode = function(t) {
            return arguments.length ? (v = t, m = !0, b) : v || (v = "curved")
        }, b.bars = function(t) {
            var e, n = {
                    primary: [],
                    secondary: []
                },
                r = {
                    primary: [],
                    secondary: []
                },
                a = {
                    primary: b.keyPrimary(),
                    secondary: b.keySecondary()
                },
                i = b.orient();
            return u("primary"), u("secondary"), c("primary"), c("secondary"), e = b.min() / 2, n.primary.forEach(function(t) {
                t.height < e && (t.height = e)
            }), n.secondary.forEach(function(t) {
                t.height < e && (t.height = e)
            }), {
                mainBars: n.primary.concat(n.secondary),
                subBars: r.primary.concat(r.secondary),
                edges: function() {
                    var t = d3.map(r.secondary, function(t) {
                            return t.index
                        }),
                        e = b.edgeMode();
                    return r.primary.map(function(n) {
                        var r = t.get(n.index);
                        return {
                            path: "vertical" === i ? function(t, n, r, a, i, o, u, c) {
                                if ("straight" == e) return ["M", t, ",", n, "L", r, ",", a, "L", i, ",", o, "L", u, ",", c, "z"].join("");
                                var l = (t + r) / 2,
                                    d = (i + u) / 2;
                                return ["M", t, ",", n, "C", l, ",", n, " ", l, ",", a, ",", r, ",", a, "L", i, ",", o, "C", d, ",", o, " ", d, ",", c, ",", u, ",", c, "z"].join("")
                            }(n.x + n.width, n.y + n.height, r.x - r.width, r.y + r.height, r.x - r.width, r.y - r.height, n.x + n.width, n.y - n.height) : function(t, n, r, a, i, o, u, c) {
                                if ("straight" == e) return ["M", t, ",", n, "L", r, ",", a, "L", i, ",", o, "L", u, ",", c, "z"].join("");
                                var l = (n + a) / 2,
                                    d = (o + c) / 2;
                                return ["M", t, ",", n, "C", t, ",", l, " ", r, ",", l, ",", r, ",", a, "L", i, ",", o, "C", i, ",", d, " ", u, ",", d, ",", u, ",", c, "z"].join("")
                            }(n.x - n.width, n.y + n.height, r.x - r.width, r.y - r.height, r.x + r.width, r.y - r.height, n.x + n.width, n.y + n.height),
                            primary: n.primary,
                            secondary: n.secondary,
                            value: n.value,
                            percent: n.percent
                        }
                    })
                }()
            };

            function o(e, n) {
                return void 0 === t || t.part === n || a[t.part](e) === t.key
            }

            function u(t) {
                function e(e) {
                    return o(e, t) ? b.value()(e) : 0
                }
                var r = d3.nest().key("primary" == t ? b.keyPrimary() : b.keySecondary()).sortKeys("primary" == t ? b.sortPrimary() : b.sortSecondary()).rollup(function(t) {
                        return d3.sum(t, e)
                    }).entries(l),
                    a = d(r, b.pad(), b.min(), 0, "vertical" == i ? b.height() : b.width()),
                    u = b.barSize();
                r.forEach(function(e, r) {
                    n[t].push({
                        x: "horizontal" == i ? (a[r].s + a[r].e) / 2 : "primary" == t ? u / 2 : b.width() - u / 2,
                        y: "vertical" == i ? (a[r].s + a[r].e) / 2 : "primary" == t ? u / 2 : b.height() - u / 2,
                        height: "vertical" == i ? (a[r].e - a[r].s) / 2 : u / 2,
                        width: "horizontal" == i ? (a[r].e - a[r].s) / 2 : u / 2,
                        part: t,
                        key: e.key,
                        value: e.value,
                        percent: a[r].p
                    })
                })
            }

            function c(t) {
                function e(e) {
                    return o(e, t) ? b.value()(e) : 0
                }
                var a = d3.map(n[t], function(t) {
                    return t.key
                });
                d3.nest().key("primary" == t ? b.keyPrimary() : b.keySecondary()).sortKeys("primary" == t ? b.sortPrimary() : b.sortSecondary()).key("secondary" == t ? b.keyPrimary() : b.keySecondary()).sortKeys("secondary" == t ? b.sortPrimary() : b.sortSecondary()).rollup(function(t) {
                    return d3.sum(t, e)
                }).entries(b.data()).forEach(function(e) {
                    var n = a.get(e.key),
                        o = d(e.values, 0, 0, "vertical" == i ? n.y - n.height : n.x - n.width, "vertical" == i ? n.y + n.height : n.x + n.width),
                        u = b.barSize();
                    e.values.forEach(function(a, c) {
                        r[t].push({
                            x: "vertical" == i ? "primary" == t ? u / 2 : b.width() - u / 2 : (o[c].s + o[c].e) / 2,
                            y: "horizontal" == i ? "primary" == t ? u / 2 : b.height() - u / 2 : (o[c].s + o[c].e) / 2,
                            height: ("vertical" == i ? o[c].e - o[c].s : u) / 2,
                            width: ("horizontal" == i ? o[c].e - o[c].s : u) / 2,
                            part: t,
                            primary: "primary" == t ? e.key : a.key,
                            secondary: "primary" == t ? a.key : e.key,
                            value: a.value,
                            percent: o[c].p * n.percent,
                            index: "primary" == t ? e.key + "|" + a.key : a.key + "|" + e.key
                        })
                    })
                })
            }

            function d(t, e, n, r, a) {
                var i = n / (a - r - 2 * t.length * e),
                    o = 0,
                    u = 0,
                    c = d3.sum(t, function(t) {
                        return t.value
                    });
                t.forEach(function(t) {
                    t.value < i * c && (o += 1, u += t.value)
                });
                var l = c < 1e-5 ? 0 : (a - r - 2 * t.length * e - o * n) / (c - u),
                    d = r,
                    s = [];
                return t.forEach(function(t) {
                    var r = t.value * l;
                    s.push({
                        s: d + e + (r < n ? .5 * (n - r) : 0),
                        e: d + e + (r < n ? .5 * (n + r) : r),
                        p: c < 1e-5 ? 0 : t.value / c
                    }), d += 2 * e + (r < n ? n : r)
                }), s
            }
        }, b.update = function(t) {
            return l = t, x(), y = b.bars(), s.selectAll(".viz-biPartite-subBar").data(y.subBars).transition().duration(p).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z), s.selectAll(".viz-biPartite-edge").data(y.edges).transition().duration(p).attr("d", function(t) {
                return t.path
            }).style("fill-opacity", b.edgeOpacity()), s.selectAll(".viz-biPartite-mainBar").data(y.mainBars).transition().duration(p).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z).style("fill-opacity", 0), b
        }, b.onClick = function(t) {

			s.selectAll(".viz-biPartite-mainBar").select("rect").style("stroke-opacity", 0), s.selectAll(".viz-biPartite-subBar").data(y.subBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z), s.selectAll(".viz-biPartite-edge").data(y.edges).transition().duration(b.duration()).style("fill-opacity", b.edgeOpacity()).attr("d", function(t) {
                return t.path
            }), s.selectAll(".viz-biPartite-mainBar").data(y.mainBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z)

            var e = b.bars(t);
            s.selectAll(".viz-biPartite-mainBar").filter(function(e) {
                return e.part === t.part && e.key === t.key
            }).select("rect").style("stroke-opacity", 1), s.selectAll(".viz-biPartite-subBar").data(e.subBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z);
            var n = s.selectAll(".viz-biPartite-edge").data(e.edges);
            n.filter(function(e) {
                return e[t.part] === t.key
            }).transition().duration(b.duration()).style("fill-opacity", b.edgeOpacity()).attr("d", function(t) {
                return t.path
            }), n.filter(function(e) {
                return e[t.part] !== t.key
            }).transition().duration(b.duration()).style("fill-opacity", 0).attr("d", function(t) {
                return t.path
            }), s.selectAll(".viz-biPartite-mainBar").data(e.mainBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z)
        }, b.onClick2 = function(t) {
			s.selectAll(".viz-biPartite-mainBar").select("rect").style("stroke-opacity", 0), s.selectAll(".viz-biPartite-subBar").data(y.subBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z), s.selectAll(".viz-biPartite-edge").data(y.edges).transition().duration(b.duration()).style("fill-opacity", b.edgeOpacity()).attr("d", function(t) {
                return t.path
            }), s.selectAll(".viz-biPartite-mainBar").data(y.mainBars).transition().duration(b.duration()).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).select("rect").attr("x", A).attr("y", k).attr("width", w).attr("height", z)            
        }, b
    }, t.gg = function() {
        var e, r, a, i, o, u, c, l, d, s, f, p, h, g, v, y, m, b, x, A = {
            innerRadius: 20,
            outerRadius: 150,
            angleOffset: .7,
            startAngle: -1.5 * n,
            endAngle: .5 * n,
            minorTickStart: .9,
            minorTickEnd: .95,
            majorTickStart: .82,
            majorTickEnd: .95,
            needleColor: "#de2c2c",
            innerFaceColor: "#999999",
            faceColor: "#666666",
            domain: [0, 100],
            duration: 500,
            ease: "cubicInOut",
            ticks: d3.range(0, 101, 2),
            majorTicks: function(t) {
                return t % 10 == 0
            },
            labelLocation: .7
        };

        function k(t) {
            f = t, t.each(function() {
                var t = d3.select(this),
                    e = k.scale(),
                    r = k.minorTickStart(),
                    a = k.minorTickEnd(),
                    i = k.majorTickStart(),
                    o = k.majorTickEnd(),
                    u = k.ticks(),
                    c = k.majorTicks(),
                    l = k.labelLocation(),
                    d = k.outerRadius();
                t.append("circle").attr("r", d).style("fill", "url(#vizgg3" + p + ")").attr("class", "face"), t.append("circle").attr("r", k.innerRadius()).style("fill", "url(#vizgg2" + p + ")").style("filter", "url(#vizgg5" + p + ")").attr("class", "innerFace"), t.append("g").selectAll("line").data(u).enter().append("line").attr("class", function(t) {
                    return c(t) ? "majorTicks" : "minorTicks"
                }).attr("x1", function(t) {
                    return d * (c(t) ? i : r) * Math.cos(e(t))
                }).attr("y1", function(t) {
                    return d * (c(t) ? i : r) * Math.sin(e(t))
                }).attr("x2", function(t) {
                    return d * (c(t) ? o : a) * Math.cos(e(t))
                }).attr("y2", function(t) {
                    return d * (c(t) ? o : a) * Math.sin(e(t))
                }), t.selectAll("text").data(u.filter(c)).enter().append("text").attr("class", "label").attr("x", function(t) {
                    return d * l * Math.cos(e(t))
                }).attr("y", function(t) {
                    return d * l * Math.sin(e(t))
                }).attr("dy", 3).text(function(t) {
                    return t
                });
                var s = k.outerRadius() / A.outerRadius,
                    f = 180 * k.scale()(k.value()) / n + 90;
                t.append("g").attr("transform", "translate(1,1)").selectAll(".needleshadow").data([0]).enter().append("g").attr("transform", "rotate(" + f + ")").attr("class", "needleshadow").append("path").attr("d", ["m 0", -130 * s, 5 * s, 175 * s, -10 * s, "0,z"].join(",")).style("filter", "url(#vizgg6" + p + ")"), t.selectAll(".needle").data([0]).enter().append("g").attr("transform", "rotate(" + f + ")").attr("class", "needle").append("polygon").attr("points", [-.5 * s, -130 * s, .5 * s, -130 * s, 5 * s, 45 * s, -5 * s, 45 * s].join(",")).style("fill", "url(#vizgg4" + p + ")")
            })
        }
        return k.scale = function() {
            return d3.scale.linear().domain(k.domain()).range([A.startAngle + k.angleOffset(), A.endAngle - k.angleOffset()])
        }, k.innerRadius = function(t) {
            return arguments.length ? (e = t, k) : void 0 !== e ? e : A.innerRadius
        }, k.outerRadius = function(t) {
            return arguments.length ? (r = t, k) : void 0 !== r ? r : A.outerRadius
        }, k.angleOffset = function(t) {
            return arguments.length ? (l = t, k) : void 0 !== l ? l : A.angleOffset
        }, k.labelLocation = function(t) {
            return arguments.length ? (x = t, k) : void 0 !== x ? x : A.labelLocation
        }, k.ticks = function(t) {
            return arguments.length ? (h = t, k) : void 0 !== h ? h : A.ticks
        }, k.majorTicks = function(t) {
            return arguments.length ? (g = t, k) : void 0 !== g ? g : A.majorTicks
        }, k.minorTickStart = function(t) {
            return arguments.length ? (v = t, k) : void 0 !== v ? v : A.minorTickStart
        }, k.minorTickEnd = function(t) {
            return arguments.length ? (y = t, k) : void 0 !== y ? y : A.minorTickEnd
        }, k.majorTickStart = function(t) {
            return arguments.length ? (m = t, k) : void 0 !== m ? m : A.majorTickStart
        }, k.majorTickEnd = function(t) {
            return arguments.length ? (b = t, k) : void 0 !== b ? b : A.majorTickEnd
        }, k.needleColor = function(t) {
            return arguments.length ? (a = t, k) : void 0 !== a ? a : A.needleColor
        }, k.innerFaceColor = function(t) {
            return arguments.length ? (i = t, k) : void 0 !== i ? i : A.innerFaceColor
        }, k.faceColor = function(t) {
            return arguments.length ? (o = t, k) : void 0 !== o ? o : A.faceColor
        }, k.domain = function(t) {
            return arguments.length ? (u = t, k) : void 0 !== u ? u : A.domain
        }, k.duration = function(t) {
            return arguments.length ? (d = t, k) : void 0 !== d ? d : A.duration
        }, k.ease = function(t) {
            return arguments.length ? (s = t, k) : void 0 !== s ? s : A.ease
        }, k.value = function(t) {
            return arguments.length ? (c = t, k) : void 0 !== c ? c : .5 * (A.domain[0] + A.domain[1])
        }, k.defs = function(e, n) {
            var r = e.append("defs");
            p = n;
            var a = k.needleColor(),
                i = k.innerFaceColor(),
                o = k.faceColor(),
                u = t.defs(r).lG().id("vizgg1" + n).sel();
            t.defs(u).stop().offset("0").stopColor(a), t.defs(u).stop().offset("1").stopColor(d3.rgb(a).darker(1));
            var c = t.defs(r).rG().id("vizgg2" + n).fx("35%").fy("65%").r("65%").spreadMethod("pad").sel();
            t.defs(c).stop().offset("0").stopColor(i), t.defs(c).stop().offset("1").stopColor(d3.rgb(i).darker(2));
            var l = t.defs(r).rG().id("vizgg3" + n).fx("35%").fy("65%").r("65%").spreadMethod("pad").sel();
            t.defs(l).stop().offset("0").stopColor(o), t.defs(l).stop().offset("1").stopColor(d3.rgb(o).darker(2)), t.defs(r).lG().id("vizgg4" + n).gradientUnits("userSpaceOnUse").y1("80").x1("-10").y2("80").x2("10").xlink("#vizgg1" + n);
            var d = t.defs(r).filter().id("vizgg5" + n).sel();
            t.defs(d).feFlood().result("flood").floodColor("rgb(0,0,0)").floodOpacity("0.6"), t.defs(d).feComposite().result("composite1").operator("in").in2("SourceGraphic").in("flood"), t.defs(d).feGaussianBlur().result("blur").stdDeviation("2").in("composite1"), t.defs(d).feOffset().result("offset").dy("2").dx("2"), t.defs(d).feComposite().result("composite2").operator("over").in2("offset").in("SourceGraphic");
            var s = t.defs(r).filter().x("-0.3").y("-0.3").height("1.8").width("1.8").id("vizgg6" + n).sel();
            t.defs(s).feGaussianBlur().stdDeviation("2")
        }, k.setNeedle = function(t) {
            var e = 180 * k.scale()(t) / n + 90,
                r = 180 * k.scale()(k.value()) / n + 90,
                a = k.ease();

            function i(t, e) {
                return d3.interpolateString("rotate(" + t + ")", "rotate(" + e + ")")
            }
            f.selectAll(".needle").data([t]).transition().duration(k.duration()).attrTween("transform", function(t) {
                return i(r, e)
            }).ease(a), f.selectAll(".needleshadow").data([t]).transition().duration(k.duration()).attrTween("transform", function(t) {
                return i(r, e)
            }).ease(a).each("end", function() {
                angle = t
            }), k.value(t)
        }, k
    }, t.chord = function() {
        var t, n, a, i, o, u, c, l, d, g, m, b, x, A, k, w, z, S, M, P = 0;

        function C(t) {
            k = t, L(), k.select(".viz-chord").remove();
            var a = k.append("g").attr("class", "viz-chord");
            a.append("g").attr("class", "viz-chord-groups").selectAll(".group").data(S).enter().append("path").attr("class", "group").on("mouseover", C.mouseover).on("mouseout", C.mouseout).style("fill", function(t) {
                return n(t.source)
            }).style("stroke", function(t) {
                return n(t.source)
            }).attr("d", function(t) {
                return p([o, u, t.startAngle, t.endAngle])
            }).each(function(t) {
                this._current = t
            }), a.append("g").attr("class", "viz-chord-chords").selectAll(".chord").data(w).enter().append("path").attr("class", "chord").each(function(t) {
                this._current = t
            }).attr("d", function(t) {
                return h(o, t.startAngle, t.endAngle, o, t.endStartAngle, t.endEndAngle)
            }).style("fill", function(t) {
                return n(t.target)
            }).style("opacity", i).style("stroke", function(t) {
                return n(t.target)
            }).style("display", function(t) {
                return t.display ? "inline" : "none"
            }), a.append("g").attr("class", "viz-chord-labels").selectAll(".label").data(S.filter(function(t) {
                return "g" == t.type
            })).enter().append("text").attr("class", "label").on("mouseover", C.mouseover).on("mouseout", C.mouseout).attr("x", function(t) {
                return t.labelx
            }).attr("y", function(t) {
                return t.labely
            }).text(A).style("text-anchor", function(t) {
                var n = E(t);
                return n < r || n > e - r ? "start" : "end"
            }).each(function(t) {
                this._current = t
            })
        }

        function L() {
            keys = [], C.source(), C.target(), C.sort(), C.duration(), C.chordOpacity(), C.innerRadius(), C.outerRadius(), C.value(), C.padAngle(), C.labelPadding(), C.sort(), C.startAngle(), C.label(), C.fill(), t.forEach(function(t) {
                -1 == keys.indexOf(c(t)) && keys.push(c(t)), -1 == keys.indexOf(l(t)) && keys.push(l(t))
            }), keys = keys.sort(b), subgrp = {}, chordExist = {}, keys.forEach(function(t) {
                subgrp[t] = {}, chordExist[t] = {}, keys.forEach(function(e) {
                    subgrp[t][e] = 0, chordExist[t][e] = !1
                })
            }), t.forEach(function(t) {
                var e = c(t),
                    n = l(t);
                subgrp[e][n] += d(t), chordExist[e][n] = !0
            }), S = [], keys.forEach(function(t, e) {
                S.push({
                    source: t,
                    type: "gs",
                    value: 0,
                    skipPad: !0,
                    index: e
                }), S.push({
                    source: t,
                    type: "g",
                    value: d3.sum(keys, function(e) {
                        return subgrp[t][e]
                    }),
                    skipPad: !1,
                    index: e
                })
            }), _(S, g, P, void 0, x), w = [], S.filter(function(t) {
                return "g" == t.type
            }).forEach(function(t, e) {
                var n = E(t);
                t.labelx = m * u * Math.cos(n), t.labely = m * u * Math.sin(n);
                var r = y(keys.length, e),
                    a = f(r.map(function(e) {
                        return subgrp[t.source][keys[e]]
                    }), 0, 0, t.startAngle, t.endAngle);
                r.forEach(function(n, r) {
                    var i = a[r];
                    w.push({
                        startAngle: i.c - i.v / 2,
                        endAngle: i.c + i.v / 2,
                        value: i.value,
                        source: t.source,
                        target: keys[n],
                        type: "c",
                        display: chordExist[t.source][keys[n]],
                        index: e,
                        subindex: n,
                        indexsubindex: e + "-" + n
                    })
                })
            });
            var e = d3.map(w, function(t) {
                return t.indexsubindex
            });
            w.forEach(function(t) {
                if (t.subindex == t.index) return t.endStartAngle = t.startAngle, void(t.endEndAngle = t.startAngle);
                var n = e.get(t.subindex + "-" + t.index);
                t.endStartAngle = n.startAngle, t.endEndAngle = n.startAngle
            }), reComputeLayout = !1
        }

        function T(t) {
            var n = k.select(".viz-chord"),
                c = t ? M : C.groups();
            n.select(".viz-chord-groups").selectAll(".group").data(c).transition().duration(a).attrTween("d", function(t) {
                var e = d3.interpolate(this._current, t);
                return this._current = e(0),
                    function(t) {
                        return n = e(t), p([o, u, n.startAngle, n.endAngle]);
                        var n
                    }
            }), n.select(".viz-chord-chords").selectAll(".chord").data(t ? z : C.chords()).transition().duration(a).attrTween("d", function(t) {
                var e = d3.interpolate(this._current, t);
                return this._current = e(0),
                    function(t) {
                        return n = e(t), h(o, n.startAngle, n.endAngle, o, n.endStartAngle, n.endEndAngle);
                        var n
                    }
            }).style("opacity", function(t) {
                return t.display ? i : 0
            }), n.select(".viz-chord-labels").selectAll(".label").data(c.filter(function(t) {
                return "g" == t.type
            })).transition().duration(a).attrTween("x", function(t) {
                var e = d3.interpolate(this._current, t);
                return this._current = e(0),
                    function(t) {
                        return m * u * Math.cos(E(e(t)))
                    }
            }).attrTween("y", function(t) {
                var e = d3.interpolate(this._current, t);
                return this._current = e(0),
                    function(t) {
                        return m * u * Math.sin(E(e(t)))
                    }
            }).text(A).style("text-anchor", function(t) {
                var n = E(t);
                return n < r || n > e - r ? "start" : "end"
            })
        }

        function E(t) {
            return function(t) {
                for (; t > e;) t -= e;
                for (; t < 0;) t += e;
                return t
            }((t.startAngle + t.endAngle) / 2)
        }

        function _(t, e, n, r, a) {
            var i = void 0 !== r,
                o = 0;
            if (i) {
                for (var u = !1; o < t.length; o++)
                    if (t[o].source == r && "g" == t[o].type) {
                        u = !0;
                        break
                    } u || console.log("The fixed source '" + r + "' is not a valid key")
            }
            var c = d3.range(t.length);
            i && (c = c.slice(o).concat(c.slice(0, o)));
            var l = t.filter(function(t) {
                    return !(i && t.source === r && "g" == t.type || t.skipPad)
                }).map(function(t) {
                    return t.value
                }),
                d = 2 * Math.PI - (i ? t[o].endAngle - t[o].startAngle + 2 * e : 0),
                f = i ? t[o].endAngle + e : a,
                p = d3.sum(l),
                h = s(l, e, n, d <= 0 ? 0 : d, p, !!i);
            c.slice(i ? 1 : 0).forEach(function(r) {
                var a = h * t[r].value,
                    i = (a < n ? n - a : 0) / 2;
                t[r].startAngle = f, t[r].endAngle = f + a, t[r].padAngle = i, t[r].percent = t[r].value / (p || 1), f += a + i + (t[r].skipPad ? 0 : e)
            })
        }
        return C.data = function(e) {
            return arguments.length ? (t = e, reComputeLayout = !0, C) : t
        }, C.fill = function(t) {
            return arguments.length ? (n = t, C) : void 0 !== n ? n : n = v()
        }, C.duration = function(t) {
            return arguments.length ? (a = t, C) : void 0 !== a ? a : a = 500
        }, C.chordOpacity = function(t) {
            return arguments.length ? (i = t, C) : void 0 !== i ? i : i = .7
        }, C.innerRadius = function(t) {
            return arguments.length ? (o = t, reComputeLayout = !0, C) : void 0 !== o ? o : o = 180
        }, C.outerRadius = function(t) {
            return arguments.length ? (u = t, reComputeLayout = !0, C) : void 0 !== u ? u : u = 200
        }, C.source = function(t) {
            return arguments.length ? (c = t, reComputeLayout = !0, C) : void 0 !== c ? c : c = function(t) {
                return t[0]
            }
        }, C.target = function(t) {
            return arguments.length ? (l = t, reComputeLayout = !0, C) : void 0 !== l ? l : l = function(t) {
                return t[1]
            }
        }, C.value = function(t) {
            return arguments.length ? (d = t, reComputeLayout = !0, C) : void 0 !== d ? d : d = function(t) {
                return t[2]
            }
        }, C.padAngle = function(t) {
            return arguments.length ? (g = t, reComputeLayout = !0, C) : void 0 !== g ? g : g = .03
        }, C.labelPadding = function(t) {
            return arguments.length ? (m = t, C) : void 0 !== m ? m : m = 1.02
        }, C.sort = function(t) {
            return arguments.length ? (b = t, reComputeLayout = !0, C) : void 0 !== b ? b : b = d3.ascending
        }, C.startAngle = function(t) {
            return arguments.length ? (x = t, reComputeLayout = !0, C) : void 0 !== x ? x : x = 0
        }, C.chords = function() {
            return reComputeLayout && L(), w
        }, C.groups = function() {
            return reComputeLayout && L(), S
        }, C.label = function(t) {
            return arguments.length ? (A = t, C) : void 0 !== A ? A : A = function(t) {
                return t.source + " (" + t.value + ")"
            }
        }, C.mouseover = function(t) {
            ! function(t) {
                var n = S.filter(function(e) {
                    return e.source == t && "g" == e.type
                })[0];

                function r(t) {
                    return t.endAngle + t.startAngle
                }
                M = [], keys.forEach(function(e, r) {
                    M.push({
                        source: e,
                        startAngle: n.startAngle,
                        endAngle: n.endAngle,
                        padAngle: n.padAngle,
                        percent: n.percent,
                        type: "gs",
                        value: e == t ? subgrp[e][e] : 0,
                        skipPad: e != t || !chordExist[e][e],
                        index: r
                    }), e == t ? M.push({
                        source: e,
                        startAngle: n.startAngle,
                        endAngle: n.endAngle,
                        padAngle: n.padAngle,
                        percent: n.percent,
                        type: "g",
                        value: n.value,
                        skipPad: !1,
                        index: r
                    }) : M.push({
                        source: e,
                        type: "g",
                        value: subgrp[t][e],
                        skipPad: !1,
                        index: r
                    })
                }), _(M, g, P, t, x);
                var a = r(n);
                S.forEach(function(t, n) {
                    var i = M[n],
                        o = r(t) < a;
                    i.startAngle -= o ? e : 0, i.endAngle -= o ? e : 0
                }), z = [], M.filter(function(t) {
                    return "g" == t.type
                }).forEach(function(e, n) {
                    var r = E(e);
                    e.labelx = m * u * Math.cos(r), e.labely = m * u * Math.sin(r);
                    var a = y(keys.length, n),
                        i = a.map(function(n) {
                            var r = keys[n];
                            return e.source == t ? subgrp[e.source][r] : r == t ? subgrp[r][e.source] : 0
                        }),
                        o = f(i, 0, 0, e.startAngle, e.endAngle);
                    a.forEach(function(r, a) {
                        var i = o[a];
                        z.push({
                            startAngle: i.c - i.v / 2,
                            endAngle: i.c + i.v / 2,
                            value: i.value,
                            source: e.source,
                            target: keys[r],
                            type: "c",
                            display: e.source === t,
                            index: n,
                            subindex: r,
                            indexsubindex: n + "-" + r
                        })
                    })
                });
                var i = d3.map(z.map(function(t) {
                        return {
                            startAngle: t.startAngle,
                            endAngle: t.endAngle,
                            indexsubindex: t.indexsubindex
                        }
                    }), function(t) {
                        return t.indexsubindex
                    }),
                    o = d3.map(M.filter(function(t) {
                        return "gs" == t.type
                    }), function(t) {
                        return t.source
                    });
                z.forEach(function(e) {
                    if (e.subindex == e.index) {
                        var n = o.get(e.source);
                        return e.endStartAngle = n.startAngle, void(e.endEndAngle = n.endAngle)
                    }
                    var r = i.get(e.subindex + "-" + e.index);
                    e.endStartAngle = r.startAngle, e.endEndAngle = r.endAngle, e.source !== t && (e.startAngle = e.endAngle, e.endEndAngle = e.endStartAngle)
                })
            }(t.source), T(1)
        }, C.mouseout = function(t) {
            T(0)
        }, C.update = function(e) {
            t = e, L(), T(0)
        }, C
    }, t.defs = function(t) {
        var e = {},
            n = t;
        return e.sel = function() {
            return n
        }, e.lG = function() {
            return n = n.append("linearGradient"), e
        }, e.rG = function() {
            return n = n.append("radialGradient"), e
        }, e.stop = function() {
            return n = n.append("stop"), e
        }, e.filter = function() {
            return n = n.append("filter"), e
        }, e.feFlood = function() {
            return n = n.append("feFlood"), e
        }, e.feComposite = function() {
            return n = n.append("feComposite"), e
        }, e.feOffset = function() {
            return n = n.append("feOffset"), e
        }, e.feGaussianBlur = function() {
            return n = n.append("feGaussianBlur"), e
        }, e.result = function(t) {
            return n = n.attr("result", t), e
        }, e.floodColor = function(t) {
            return n = n.attr("flood-color", t), e
        }, e.floodOpacity = function(t) {
            return n = n.attr("flood-opacity", t), e
        }, e.stdDeviation = function(t) {
            return n = n.attr("stdDeviation", t), e
        }, e.operator = function(t) {
            return n = n.attr("operator", t), e
        }, e.height = function(t) {
            return n = n.attr("height", t), e
        }, e.width = function(t) {
            return n = n.attr("width", t), e
        }, e.in = function(t) {
            return n = n.attr("in", t), e
        }, e.in2 = function(t) {
            return n = n.attr("in2", t), e
        }, e.id = function(t) {
            return n = n.attr("id", t), e
        }, e.fx = function(t) {
            return n = n.attr("fx", t), e
        }, e.fy = function(t) {
            return n = n.attr("fy", t), e
        }, e.dx = function(t) {
            return n = n.attr("dx", t), e
        }, e.dy = function(t) {
            return n = n.attr("dy", t), e
        }, e.x1 = function(t) {
            return n = n.attr("x1", t), e
        }, e.y1 = function(t) {
            return n = n.attr("y1", t), e
        }, e.x2 = function(t) {
            return n = n.attr("x2", t), e
        }, e.y2 = function(t) {
            return n = n.attr("y2", t), e
        }, e.x = function(t) {
            return n = n.attr("x", t), e
        }, e.y = function(t) {
            return n = n.attr("y", t), e
        }, e.r = function(t) {
            return n = n.attr("r", t), e
        }, e.spreadMethod = function(t) {
            return n = n.attr("spreadMethod", t), e
        }, e.gradientUnits = function(t) {
            return n = n.attr("gradientUnits", t), e
        }, e.xlink = function(t) {
            return n = n.attr("xlink:href", t), e
        }, e.offset = function(t) {
            return n = n.attr("offset", t), e
        }, e.stopColor = function(t) {
            return n = n.attr("stop-color", t), e
        }, e.path = function() {
            return n = n.append("path"), e
        }, e.d = function(t) {
            return n = n.attr("d", t), e
        }, e
    }, t.legend = function() {
        var t, e, n, r, l, d, s, f, p, h, g, v, y, m;

        function b(n) {
            (t = n).select(".viz-legend").remove(), b.rows(), legend_cols(), b.width(), b.height(), b.paddingInner(), b.paddingLabel(), b.rowScale(), b.colScale(), b.size(), b.fill(), b.draw(), b.onMouseOver(), b.onMouseOut();
            var a = h.bandwidth(),
                i = (g.bandwidth(), d3.range(e.length).map(function(t) {
                    var n = t % r,
                        i = (t - n) / r;
                    return {
                        x: g(n),
                        y: h(i),
                        width: f,
                        height: a,
                        key: e[t]
                    }
                }));
            t.append("g").attr("class", "viz-legend").selectAll(".legend-item").data(i).enter().append("g").attr("class", "legend-item").attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).on("mouseover", function(t) {
                return m(t.key)
            }).on("mouseout", function(t) {
                return y(t.key)
            }).each(v)
        }
        return b.data = function(t) {
            return arguments.length ? (e = t, b) : e
        }, b.rowScale = function(t) {
            return void 0 !== h ? h : h = d3.scaleBand().domain(d3.range(b.rows())).range([0, b.height()]).paddingInner(b.paddingInner())
        }, b.colScale = function(t) {
            return void 0 !== g ? g : g = d3.scaleBand().domain(d3.range(legend_cols())).range([0, b.width()])
        }, b.rows = function(t) {
            return arguments.length ? (n = t, b) : void 0 !== n ? Math.min(n, b.data().length) : n = b.data().length
        }, legend_cols = function() {
            return r = Math.ceil(b.data().length / (b.rows() > 0 ? n : 1))
        }, b.width = function(t) {
            return arguments.length ? (l = t, b) : void 0 !== l ? l : l = 100
        }, b.height = function(t) {
            var e = b.rows();
            return arguments.length ? (height = t, b) : "undefined" != typeof height ? height : height = 12 * e + 12 * (e > 0 ? e - 1 : 0)
        }, b.paddingInner = function(t) {
            return arguments.length ? (d = t, b) : void 0 !== d ? d : d = n > 1 ? .5 : 0
        }, b.paddingLabel = function(t) {
            return arguments.length ? (s = t, b) : void 0 !== s ? s : s = 6
        }, b.size = function(t) {
            return arguments.length ? (f = t, b) : void 0 !== f ? f : f = 12
        }, b.onMouseOver = function(t) {
            return arguments.length ? (m = t, b) : void 0 !== m ? m : m = function() {}
        }, b.onMouseOut = function(t) {
            return arguments.length ? (y = t, b) : void 0 !== y ? y : y = function() {}
        }, b.fill = function(t) {
            return arguments.length ? (p = t, b) : void 0 !== p ? p : p = d3.scaleOrdinal().range(d3.schemeCategory10)
        }, b.rect = function(t) {
            d3.select(this).append("rect").attr("class", "legend-icon").attr("height", a).attr("width", i).style("fill", function(t) {
                return p(t.key)
            }), d3.select(this).append("text").attr("x", function(t) {
                return f + s
            }).attr("y", o).attr("dy", 6).text(c)
        }, b.circle = function(t) {
            d3.select(this).append("circle").attr("class", "legend-icon").attr("r", 9).attr("cx", u).attr("cy", o).style("fill", function(t) {
                return p(t.key)
            }), d3.select(this).append("text").attr("x", function(t) {
                return f + s
            }).attr("y", o).attr("dy", 6).text(c)
        }, b.draw = function(t) {
            return arguments.length ? (v = t, b) : void 0 !== v ? v : v = b.rect
        }, b
    }, t.uscs = function() {
        function e(n) {
            g = n,
                function() {
                    if (void 0 !== t.maps.uscounties.stateByAbb) return;
                    t.maps.uscounties.stateByFIPS = {}, t.maps.uscounties.stateByAbb = {}, t.maps.uscounties.states.forEach(function(e) {
                        t.maps.uscounties.stateByFIPS[e.FP] = e, t.maps.uscounties.stateByAbb[e.ABB] = e
                    })
                }(), n.each(function() {
                    var n = d3.select(this),
                        r = e.state(),
                        a = t.maps.uscounties.stateByAbb[r],
                        i = t.maps.uscounties.objects.counties.geometries.filter(function(t) {
                            return t.properties.SFP === a.FP
                        }),
                        o = topojson.feature(t.maps.uscounties, {
                            type: "GeometryCollection",
                            geometries: i
                        }).features,
                        u = e.data();
                    if (void 0 !== u) {
                        var c = d3.map(u, e.countyFIPS());
                        o.forEach(function(t) {
                            t.data = c.get("" + t.properties.SFP + t.properties.CFP)
                        })
                    }
                    var l = d3.geoMercator().rotate(a.r).fitSize([e.width(), e.height()], topojson.merge(t.maps.uscounties, i)),
                        d = d3.geoPath().projection(l),
                        s = n.append("g").attr("class", "counties"),
                        f = n.append("path").attr("class", "county-border"),
                        p = n.append("path").attr("class", "state-border"),
                        h = n.append("g").attr("class", "county-name");
                    p.datum(topojson.merge(t.maps.uscounties, i)).attr("d", d), s = s.selectAll("path").data(o).enter().append("path").attr("d", d);
                    var g = e.fill();
                    void 0 !== g && s.style("fill", function(t) {
                        return g(t.data)
                    }), h.selectAll("text").data(topojson.feature(t.maps.uscounties, {
                        type: "GeometryCollection",
                        geometries: i
                    }).features).enter().append("text").attr("transform", function(t) {
                        return "translate(" + l([t.properties.LON, t.properties.LAT]) + ")"
                    }).text(function(t) {
                        return t.properties.CNM
                    }), f.datum(topojson.mesh(t.maps.uscounties, {
                        type: "GeometryCollection",
                        geometries: i
                    }, function(t, e) {
                        return t !== e
                    })).attr("d", d)
                })
        }
        return e.data = l(e), e.state = l(e), e.width = d(e, 960), e.height = d(e, 960), e.fill = d(e, void 0), e.countyFIPS = d(e, function(t) {
            return t[0]
        }), e
    }, t.calendar = function() {
        var t, e, n, r, a, i, o, u, c, l, d = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            s = [3, 7, 11.5, 15.5, 20, 24.5, 28.5, 33.5, 37.5, 42, 46.5, 50.5],
            f = ["S", "M", "T", "W", "T", "F", "S"];

        function p(t) {
            g = t, t.each(function() {
                var t = d3.select(this),
                    e = p.cellWidth(),
                    n = p.cellHeight(),
                    r = p.date(),
                    a = p.value(),
                    i = p.data(),
                    o = p.yearPadding(),
                    u = p.fill(),
                    c = p.valueLabel(),
                    l = t.selectAll(".cal-year").data(d3.range(p.minYear(), p.maxYear() + 1)).enter().append("g").attr("class", "cal-year").attr("transform", function(t, e) {
                        return "translate(0," + (o + 7 * n) * e + ")"
                    });
                l.append("text").attr("transform", "translate(-6," + 3.5 * n + ")rotate(-90)").attr("class", "cal-year-label").text(function(t) {
                    return t
                }), l.filter(function(t, e) {
                    return !e
                }).selectAll(".cal-month-label").data(d).enter().append("text").attr("class", "cal-month-label").attr("transform", function(t, n) {
                    return "translate(" + e * s[n] + ",-6)"
                }).text(function(t) {
                    return t
                }), l.filter(function(t, e) {
                    return !e
                }).selectAll(".cal-day-label").data(f).enter().append("text").attr("class", "cal-day-label").attr("transform", function(t, r) {
                    return "translate(" + (53 * e + 6) + "," + (n * (r + .5) + 6) + ")"
                }).text(function(t) {
                    return t
                });
                var h = l.append("g").selectAll(".cal-day").data(function(t) {
                    return d3.timeDays(new Date(t, 0, 1), new Date(t + 1, 0, 1))
                }).enter().append("g").attr("class", "cal-day cal-day-empty").attr("transform", function(t) {
                    return "translate(" + (d3.timeWeek.count(d3.timeYear(t), t) + .5) * e + "," + (t.getDay() + .5) * n + ")"
                }).datum(function(t) {
                    return t
                }).append("rect").attr("x", -.5 * e).attr("y", -.5 * n).attr("width", e).attr("height", n);
                l.append("g").selectAll(".cal-month").data(function(t) {
                    return d3.timeMonths(new Date(t, 0, 1), new Date(t + 1, 0, 1))
                }).enter().append("path").attr("class", "cal-month").attr("d", function(t) {
                    var r = new Date(t.getFullYear(), t.getMonth() + 1, 0),
                        a = t.getDay(),
                        i = d3.timeWeek.count(d3.timeYear(t), t),
                        o = r.getDay(),
                        u = d3.timeWeek.count(d3.timeYear(r), r);
                    return "M" + (i + 1) * e + "," + a * n + "H" + i * e + "V" + 7 * n + "H" + u * e + "V" + (o + 1) * n + "H" + (u + 1) * e + "V0H" + (i + 1) * e + "Z"
                });
                var g = d3.nest().key(r).rollup(function(t) {
                    return a(t[0])
                }).object(i);
                h.filter(function(t) {
                    return t in g
                }).attr("class", "cal-day cal-day-filled").style("fill", function(t) {
                    return u(g[t])
                }).append("title").text(function(t) {
                    return d3.timeFormat("%Y-%m-%d")(t) + ": " + c(g[t])
                })
            })
        }
        return p.data = function(e) {
            return arguments.length ? (t = e, p) : t
        }, p.cellWidth = function(t) {
            return arguments.length ? (o = t, p) : void 0 !== o ? o : 17
        }, p.cellHeight = function(t) {
            return arguments.length ? (u = t, p) : void 0 !== u ? u : 17
        }, p.date = function(t) {
            return arguments.length ? (e = t, p) : void 0 !== e ? e : function(t) {
                return t.date
            }
        }, p.value = function(t) {
            return arguments.length ? (n = t, p) : void 0 !== n ? n : function(t) {
                return t.value
            }
        }, p.valueLabel = function(t) {
            return arguments.length ? (l = t, p) : void 0 !== l ? l : function(t) {
                return t
            }
        }, p.fill = function(t) {
            return arguments.length ? (r = t, p) : void 0 !== r ? r : (e = p.value(), d3.scaleLinear().domain(d3.extent(p.data().map(function(t) {
                return e(t)
            }))).range(["#deebf7", "#08306b"]));
            var e
        }, p.minYear = function(t) {
            return arguments.length ? (a = t, p) : void 0 !== a ? a : (e = p.date(), d3.min(p.data().map(function(t) {
                return e(t).getFullYear()
            })));
            var e
        }, p.maxYear = function(t) {
            return arguments.length ? (i = t, p) : void 0 !== i ? i : (e = p.date(), d3.max(p.data().map(function(t) {
                return e(t).getFullYear()
            })));
            var e
        }, p.yearPadding = function(t) {
            return arguments.length ? (c = t, p) : void 0 !== c ? c : 40
        }, p
    }, t.pc = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p = {},
            h = {};

        function g(u) {
            u,
            u.each(function() {
                var u = d3.select(this);
                g.dimensionScale(), g.width(), g.height(), g.outerPadding(), g.dimensionScale(), g.valueScale(), g.dimensionAxes(), g.brushSize(), g.dimensionLabelPadding(), e.forEach(function(t) {
                    h[t] = null
                }), d = u.append("g").attr("class", "background").selectAll("path").data(t).enter().append("path").attr("d", v), s = u.append("g").attr("class", "foreground").selectAll("path").data(t).enter().append("path").attr("d", v);
                var f = u.selectAll(".dimension").data(e).enter().append("g").attr("class", "dimension").attr("transform", function(t) {
                    return "translate(" + r(t) + ")"
                }).call(d3.drag().on("start", function(t) {
                    p[t] = r(t), d.attr("visibility", "hidden")
                }).on("drag", function(t) {
                    p[t] = Math.min(i, Math.max(0, d3.event.x)), s.attr("d", v), e.sort(function(t, e) {
                        return y(t) - y(e)
                    }), r.domain(e), f.attr("transform", function(t) {
                        return "translate(" + y(t) + ")"
                    })
                }).on("end", function(t) {
                    delete p[t], d3.select(this).transition().duration(500).attr("transform", "translate(" + r(t) + ")"), s.transition().duration(500).attr("d", v), d.attr("d", v).transition().delay(500).duration(0).attr("visibility", null)
                }));

                function v(t) {
                    return g.path()(e.map(function(e) {
                        return [y(e), a[e](t[e])]
                    }))
                }

                function y(t) {
                    var e = p[t];
                    return null == e ? r(t) : e
                }

                function m() {
                    h[this.__data__] = d3.event.selection;
                    var t = e.filter(function(t) {
                            return h[t]
                        }),
                        n = t.map(function(t) {
                            return h[t].map(a[t].invert, a[t])
                        });
                    s.style("display", function(e) {
                        return t.every(function(t, r) {
                            return n[r][1] <= e[t] && e[t] <= n[r][0]
                        }) ? null : "none"
                    })
                }
                f.append("g").attr("class", "axis").each(function(t) {
                    d3.select(this).call(c[t])
                }).append("text").style("text-anchor", "middle").attr("y", n).text(function(t) {
                    return t
                }), f.append("g").attr("class", "brush").each(function(t) {
                    d3.select(this).call(a[t].brush = d3.brushY().extent([
                        [-l / 2, 0],
                        [l / 2, o]
                    ]).on("end", m))
                })
            })
        }
        return g.path = function(t) {
            return arguments.length ? (f = t, g) : void 0 !== f ? f : f = g.bezier
        }, g.bezier = function(t) {
            var e = [],
                n = g.brushSize();
            return t.forEach(function(r, a) {
                e.push(0 == a ? "M" + (r[0] - n) + "," + r[1] + "h" + 2 * n : "C" + (r[0] + t[a - 1][0]) / 2 + "," + t[a - 1][1] + " " + (r[0] + t[a - 1][0]) / 2 + "," + r[1] + "," + r[0] + "," + r[1] + "h" + n)
            }), e.join("")
        }, g.lineSegments = function(t) {
            var e = g.brushSize();
            return t.map(function(t, n) {
                return "M" + (t[0] - e) + "," + t[1] + "h" + 2 * e
            }).join("")
        }, g.data = function(e) {
            return arguments.length ? (t = e, g) : t
        }, g.dimensions = function(n) {
            return arguments.length ? (e = n, g) : void 0 !== e ? e : e = d3.keys(t[0].sort(d3.ascending))
        }, g.width = function(t) {
            return arguments.length ? (i = t, g) : void 0 !== i ? i : i = 900
        }, g.height = function(t) {
            return arguments.length ? (o = t, g) : void 0 !== o ? o : o = 600
        }, g.outerPadding = function(t) {
            return arguments.length ? (u = t, g) : void 0 !== u ? u : u = .1
        }, g.dimensionScale = function(t) {
            return arguments.length ? (r = t, g) : void 0 !== r ? r : r = d3.scalePoint().padding(g.outerPadding()).range([0, g.width()]).domain(e)
        }, g.valueScale = function(t) {
            if (!arguments.length) {
                if (void 0 !== a) return a;
                var e = {},
                    n = g.data(),
                    r = g.height();
                return g.dimensions().forEach(function(t) {
                    e[t] = d3.scaleLinear().domain(d3.extent(n, function(e) {
                        return +e[t]
                    })).range([r, 0])
                }), a = e
            }
            return a = t, g
        }, g.dimensionAxes = function(t) {
            if (!arguments.length) {
                var e = g.valueScale(),
                    n = {};
                return void 0 !== c ? g.dimensions().forEach(function(t) {
                    n[t] = c[t].scale(e[t])
                }) : g.dimensions().forEach(function(t) {
                    n[t] = d3.axisLeft().scale(e[t])
                }), c = n
            }
            return c = t, g
        }, g.brushSize = function(t) {
            return arguments.length ? (l = t, g) : void 0 !== l ? l : l = 12
        }, g.dimensionLabelPadding = function(t) {
            return arguments.length ? (n = t, g) : void 0 !== n ? n : n = -9
        }, g
    }, t.area = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p;

        function h(e) {
            (t = e).select(".viz-area").remove();
            var n = t.append("g").attr("class", "viz-area"),
                r = h.points(),
                a = d3.area().curve(h.curve()).defined(function(t) {
                    return t.defined
                }).x0(function(t) {
                    return t.x0
                }).x1(function(t) {
                    return t.x1
                }).y0(function(t) {
                    return t.y0
                }).y1(function(t) {
                    return t.y1
                });
            n.append("path").datum(r).attr("class", "area").attr("d", a)
        }
        return h.data = function(t) {
            return arguments.length ? (e = t, h) : e
        }, h.path = function() {
            return d3.area().curve(h.curve()).defined(function(t) {
                return t.defined
            }).x0(function(t) {
                return t.x0
            }).x1(function(t) {
                return t.x1
            }).y0(function(t) {
                return t.y0
            }).y1(function(t) {
                return t.y1
            })(h.points())
        }, h.transition = function() {
            var e = t.select(".viz-area"),
                n = h.points(),
                r = d3.area().curve(h.curve()).defined(function(t) {
                    return t.defined
                }).x0(function(t) {
                    return t.x0
                }).x1(function(t) {
                    return t.x1
                }).y0(function(t) {
                    return t.y0
                }).y1(function(t) {
                    return t.y1
                });
            e.select(".area").datum(n).transition().duration(s).ease(f).attr("d", r)
        }, h.curve = function(t) {
            return arguments.length ? (d = t, h) : void 0 !== d ? d : d = d3.curveLinear
        }, h.duration = function(t) {
            return arguments.length ? (s = t, h) : void 0 !== s ? s : s = 1e3
        }, h.ease = function(t) {
            return arguments.length ? (f = t, h) : void 0 !== f ? f : f = d3.easeLinear
        }, h.width = function(t) {
            return arguments.length ? (n = t, h) : void 0 !== n ? n : (h.orient(), n = "bottom" == p || "top" == p ? 880 : 420)
        }, h.height = function(t) {
            return arguments.length ? (r = t, h) : void 0 !== r ? r : (h.orient(), r = "bottom" == p || "top" == p ? 420 : 880)
        }, h.key = function(t) {
            return arguments.length ? (a = "function" == typeof t ? t : function() {
                return t
            }, h) : a || (a = function(t) {
                return t.key
            })
        }, h.value1 = function(t) {
            return arguments.length ? (o = "function" == typeof t ? t : function() {
                return +t
            }, h) : o || (o = function(t) {
                return t.value
            })
        }, h.value0 = function(t) {
            return arguments.length ? (i = "function" == typeof t ? t : function() {
                return +t
            }, h) : i || (i = function(t) {
                return 0
            })
        }, h.keyScale = function(t) {
            if (arguments.length) return u = t, h;
            var e = {
                bottom: [0, h.width()],
                top: [0, h.width()],
                left: [0, h.height()],
                right: [0, h.height()]
            } [h.orient()];
            return u || (u = d3.scaleLinear().domain(d3.extent(h.data().map(h.key()))).range(e))
        }, h.valueScale = function(t) {
            if (arguments.length) return c = t, h;
            var e, n, r = {
                bottom: [h.height(), 0],
                top: [0, h.height()],
                left: [0, h.width()],
                right: [h.width(), 0]
            } [h.orient()];
            return c || (c = d3.scaleLinear().domain((e = d3.extent(h.data().map(h.value0())), n = d3.extent(h.data().map(h.value1())), [d3.min([e[0], n[0]]), d3.max([e[1], n[1]])])).range(r))
        }, h.defined = function(t) {
            return arguments.length ? (l = t, h) : l || (l = function() {
                return !0
            })
        }, h.orient = function(t) {
            return arguments.length ? (p = t, h) : p || (p = "bottom")
        }, h.points = function() {
            var t, e;
            return h.orient(), h.key(), h.value0(), h.value1(), h.keyScale(), h.valueScale(), h.defined(), h.duration(), h.curve(), h.ease(), h.width(), h.height(), "bottom" == p || "top" == p ? (x0 = function(t, e) {
                return u(a(t, e))
            }, x1 = function(t, e) {
                return u(a(t, e))
            }, t = function(t, e) {
                return c(i(t, e))
            }, e = function(t, e) {
                return c(o(t, e))
            }) : (x0 = function(t, e) {
                return c(i(t, e))
            }, x1 = function(t, e) {
                return c(o(t, e))
            }, t = function(t, e) {
                return u(a(t, e))
            }, e = function(t, e) {
                return u(a(t, e))
            }), h.data().map(function(n, r) {
                var a = {
                    defined: l(n, r),
                    data: n
                };
                return a.x0 = a.defined ? x0(n, r) : u.range()[0], a.x1 = a.defined ? x1(n, r) : u.range()[0], a.y0 = a.defined ? t(n, r) : c.range()[0], a.y1 = a.defined ? e(n, r) : c.range()[1], a
            })
        }, h
    }, t.line = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f;

        function p(e) {
            (t = e).select(".viz-line").remove();
            var n = t.append("g").attr("class", "viz-line"),
                r = p.points(),
                a = d3.line().curve(p.curve()).defined(function(t) {
                    return t.defined
                }).x(function(t) {
                    return t.x
                }).y(function(t) {
                    return t.y
                });
            n.append("path").datum(r).attr("class", "line").attr("d", a)
        }
        return p.data = function(t) {
            return arguments.length ? (e = t, refresh = !0, p) : e
        }, p.transition = function() {
            var e = t.select(".viz-line"),
                n = p.points(),
                r = d3.line().curve(p.curve()).defined(function(t) {
                    return t.defined
                }).x(function(t) {
                    return t.x
                }).y(function(t) {
                    return t.y
                });
            e.select(".line").datum(n).transition().duration(d).ease(s).attr("d", r)
        }, p.curve = function(t) {
            return arguments.length ? (l = t, p) : void 0 !== l ? l : l = d3.curveLinear
        }, p.duration = function(t) {
            return arguments.length ? (d = t, p) : void 0 !== d ? d : d = 1e3
        }, p.ease = function(t) {
            return arguments.length ? (s = t, p) : void 0 !== s ? s : s = d3.easeLinear
        }, p.width = function(t) {
            return arguments.length ? (n = t, p) : void 0 !== n ? n : (p.orient(), n = "bottom" == f || "top" == f ? 880 : 420)
        }, p.height = function(t) {
            return arguments.length ? (r = t, p) : void 0 !== r ? r : (p.orient(), r = "bottom" == f || "top" == f ? 420 : 880)
        }, p.key = function(t) {
            return arguments.length ? (a = t, p) : void 0 !== a ? a : a = function(t) {
                return t.key
            }
        }, p.value = function(t) {
            return arguments.length ? (i = t, p) : void 0 !== i ? i : i = function(t) {
                return t.value
            }
        }, p.keyScale = function(t) {
            if (arguments.length) return o = t, p;
            var e = {
                bottom: [0, p.width()],
                top: [0, p.width()],
                left: [0, p.height()],
                right: [0, p.height()]
            } [p.orient()];
            return o || (o = d3.scaleLinear().domain(d3.extent(p.data().map(p.key()))).range(e))
        }, p.valueScale = function(t) {
            if (arguments.length) return u = t, p;
            var e = {
                bottom: [p.height(), 0],
                top: [0, p.height()],
                left: [0, p.width()],
                right: [p.width(), 0]
            } [p.orient()];
            return u || (u = d3.scaleLinear().domain(d3.extent(p.data().map(p.value()))).range(e))
        }, p.defined = function(t) {
            return arguments.length ? (c = t, p) : void 0 !== c ? i : c = function() {
                return !0
            }
        }, p.orient = function(t) {
            return arguments.length ? (f = t, p) : f || (f = "bottom")
        }, p.points = function() {
            var t, e;
            return p.orient(), p.key(), p.value(), p.keyScale(), p.valueScale(), p.defined(), p.duration(), p.curve(), p.ease(), p.width(), p.height(), "bottom" == f || "top" == f ? (t = function(t, e) {
                return o(a(t, e))
            }, e = function(t, e) {
                return u(i(t, e))
            }) : (t = function(t, e) {
                return u(i(t, e))
            }, e = function(t, e) {
                return o(a(t, e))
            }), p.data().map(function(n, r) {
                var a = {
                    defined: c(n, r),
                    data: n
                };
                return a.x = t(n, r), a.y = a.defined ? e(n, r) : u.range()[0], a
            })
        }, p
    }, t.point = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p, h, g, v = !0,
            y = {
                bottom: 1,
                top: 2,
                left: 3,
                right: 4
            };

        function m(e) {
            (t = e).select(".viz-point").remove(), t.append("g").attr("class", "viz-point").selectAll(".point").data(m.points()).enter().append("g").attr("class", "point").attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            }).each(f)
        }

        function b() {
            v && (m.orient(), m.key(), m.value(), m.keyScale(), m.valueScale(), m.defined(), m.duration(), m.curve(), m.ease(), m.width(), m.height(), m.drawPoints(), h = m.data().map(function(t, e) {
                var n = {
                    defined: c(t, e),
                    data: t,
                    selected: !1
                };
                return n.x = o(a(t, e)), n.y = n.defined ? u(i(t, e)) : u.range()[0], n
            }), p = d3.quadtree().x(function(t) {
                return t.x
            }).y(function(t) {
                return t.y
            }).addAll(h).extent([
                [o.range()[0], u.range()[0]],
                [o.range()[1] + 1, u.range()[1] + 1]
            ]), v = !1)
        }
        return m.transition = function() {
            t.select(".viz-point").selectAll(".point").data(m.points()).transition().duration(d).ease(s).attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            })
        }, m.data = function(t) {
            return arguments.length ? (e = t, v = !0, m) : e
        }, m.orient = function(t) {
            return arguments.length ? (g = y[t], m) : g || (g = 1)
        }, m.curve = function(t) {
            return arguments.length ? (l = t, m) : void 0 !== l ? l : l = d3.curveLinear
        }, m.duration = function(t) {
            return arguments.length ? (d = t, m) : void 0 !== d ? d : d = 1e3
        }, m.ease = function(t) {
            return arguments.length ? (s = t, m) : void 0 !== s ? s : s = d3.easeLinear
        }, m.width = function(t) {
            return arguments.length ? (n = t, v = !0, m) : void 0 !== n ? n : (v = !0, n = 880)
        }, m.height = function(t) {
            return arguments.length ? (r = t, v = !0, m) : void 0 !== r ? r : (v = !0, r = 420)
        }, m.key = function(t) {
            return arguments.length ? (a = t, v = !0, m) : a || (v = !0, a = function(t) {
                return t.key
            })
        }, m.value = function(t) {
            return arguments.length ? (i = t, v = !0, m) : i || (v = !0, i = function(t) {
                return t.value
            })
        }, m.keyScale = function(t) {
            if (!arguments.length) {
                var e = {
                    1: [0, m.width()],
                    2: [0, m.width()],
                    3: [0, m.height()],
                    4: [0, m.height()]
                } [g];
                return o || (v = !0, o = d3.scaleLinear().domain(d3.extent(m.data().map(m.key()))).range(e))
            }
            return o = t, v = !0, m
        }, m.valueScale = function(t) {
            if (!arguments.length) {
                var e = {
                    1: [m.height(), 0],
                    2: [0, m.height()],
                    3: [0, m.width()],
                    4: [m.width(), 0]
                } [g];
                return u || (v = !0, u = d3.scaleLinear().domain(d3.extent(m.data().map(m.value()))).range(e))
            }
            return u = t, v = !0, m
        }, m.defined = function(t) {
            return arguments.length ? (c = t, v = !0, m) : c || (v = !0, c = function() {
                return !0
            })
        }, m.drawPoints = function(t) {
            return arguments.length ? (f = t, m) : f || (f = function() {
                d3.select(this).append("circle").attr("r", 6)
            })
        }, m.points = function() {
            return b(), h
        }, m.tree = function() {
            return b(), p
        }, m.filterRect = function(t) {
            if (h.forEach(function(t) {
                    t.selected = !1
                }), !t) return m;
            var e = t[0][0],
                n = t[0][1],
                r = t[1][0],
                a = t[1][1];
            return p.visit(function(t, i, o, u, c) {
                var l = t.data;
                return l && (l.selected = l.x >= e && l.x < r && l.y >= n && l.y < a), i >= r || o >= a || u < e || c < n
            }), m
        }, m
    }, t.bar = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p, h, g, v;

        function y(e) {
            (t = e).select(".viz-bar").remove(), t.append("g").attr("class", "viz-bar").selectAll(".bar").data(y.bars()).enter().append("rect").attr("class", "bar").attr("x", function(t) {
                return t.x
            }).attr("y", function(t) {
                return t.y
            }).attr("width", function(t) {
                return t.width
            }).attr("height", function(t) {
                return t.height
            })
        }
        return y.data = function(t) {
            return arguments.length ? (e = t, y) : e
        }, y.transition = function() {
            t.select(".viz-bar").selectAll(".bar").data(y.bars()).transition().duration(s).ease(f).attr("x", function(t) {
                return t.x
            }).attr("y", function(t) {
                return t.y
            }).attr("width", function(t) {
                return t.width
            }).attr("height", function(t) {
                return t.height
            })
        }, y.curve = function(t) {
            return arguments.length ? (d = t, y) : void 0 !== d ? d : d = d3.curveLinear
        }, y.duration = function(t) {
            return arguments.length ? (s = t, y) : void 0 !== s ? s : s = 1e3
        }, y.ease = function(t) {
            return arguments.length ? (f = t, y) : void 0 !== f ? f : f = d3.easeLinear
        }, y.width = function(t) {
            return arguments.length ? (n = t, y) : void 0 !== n ? n : (y.orient(), n = 880)
        }, y.height = function(t) {
            return arguments.length ? (r = t, y) : void 0 !== r ? r : (y.orient(), r = 420)
        }, y.key = function(t) {
            return arguments.length ? (a = "function" == typeof t ? t : function() {
                return t
            }, y) : a || (a = function(t) {
                return t.key
            })
        }, y.value1 = function(t) {
            return arguments.length ? (o = "function" == typeof t ? t : function() {
                return +t
            }, y) : o || (o = function(t) {
                return t.value
            })
        }, y.value0 = function(t) {
            return arguments.length ? (i = "function" == typeof t ? t : function() {
                return +t
            }, y) : i || (i = function(t) {
                return 0
            })
        }, y.paddingInner = function(t) {
            return arguments.length ? (h = t, y) : void 0 !== h ? h : h = .1
        }, y.paddingOuter = function(t) {
            return arguments.length ? (g = t, y) : void 0 !== g ? g : g = .1
        }, y.align = function(t) {
            return arguments.length ? (p = t, y) : void 0 !== p ? p : p = .5
        }, y.keyScale = function(t) {
            if (arguments.length) return u = t, y;
            var e = {
                bottom: [0, y.width()],
                top: [0, y.width()],
                left: [0, y.height()],
                right: [0, y.height()]
            } [y.orient()];
            return u || (u = d3.scaleBand().domain(y.data().map(y.key())).range(e).paddingInner(y.paddingInner()).paddingOuter(y.paddingOuter())).align(y.align())
        }, y.valueScale = function(t) {
            if (arguments.length) return c = t, y;
            var e, n, r = {
                bottom: [y.height(), 0],
                top: [0, y.height()],
                left: [0, y.width()],
                right: [y.width(), 0]
            } [y.orient()];
            return c || (c = d3.scaleLinear().domain((e = d3.extent(y.data().map(y.value0())), n = d3.extent(y.data().map(y.value1())), [d3.min([e[0], n[0]]), d3.max([e[1], n[1]])])).range(r))
        }, y.defined = function(t) {
            return arguments.length ? (l = t, y) : l || (l = function() {
                return !0
            })
        }, y.orient = function(t) {
            return arguments.length ? (v = t, y) : v || (v = "bottom")
        }, y.bars = function() {
            var t, e, n, r;
            return y.orient(), y.key(), y.value0(), y.value1(), y.keyScale(), y.valueScale(), y.defined(), y.duration(), y.curve(), y.ease(), y.width(), y.height(), "bottom" == v ? (t = function(t, e) {
                return u(a(t, e))
            }, e = function(t, e) {
                return c(o(t, e))
            }, r = function(t, e) {
                return c(i(t, e)) - c(o(t, e))
            }, n = function(t, e) {
                return u.bandwidth()
            }) : "top" == v ? (t = function(t, e) {
                return u(a(t, e))
            }, e = function(t, e) {
                return c(i(t, e))
            }, r = function(t, e) {
                return c(o(t, e)) - c(i(t, e))
            }, n = function(t, e) {
                return u.bandwidth()
            }) : "left" == v ? (t = function(t, e) {
                return c(i(t, e))
            }, e = function(t, e) {
                return u(a(t, e))
            }, r = function(t, e) {
                return u.bandwidth()
            }, n = function(t, e) {
                return c(o(t, e)) - c(i(t, e))
            }) : (t = function(t, e) {
                return c(o(t, e))
            }, e = function(t, e) {
                return u(a(t, e))
            }, r = function(t, e) {
                return u.bandwidth()
            }, n = function(t, e) {
                return c(i(t, e)) - c(o(t, e))
            }), y.data().map(function(a, i) {
                var o = {
                    defined: l(a, i),
                    data: a
                };
                return o.x = o.defined ? t(a, i) : u.range()[0], o.y = o.defined ? e(a, i) : u.range()[0], o.width = o.defined ? n(a, i) : c.range()[0], o.height = o.defined ? r(a, i) : c.range()[1], o
            })
        }, y
    }, t.pie3d = function() {
        var t, r, a, i, o, u, c, l, d, s;

        function f(r) {
            t = r;
            var a = d3.pie().value(f.value()).startAngle(f.startAngle()).endAngle(e + f.startAngle())(f.data()),
                i = t.append("g").attr("class", "viz-pie3d"),
                o = f.fill();
            i.selectAll(".innerSlice").data(a).enter().append("path").attr("class", "innerSlice").style("fill", function(t) {
                return d3.hsl(o(t.data)).darker(.7)
            }).attr("d", function(t) {
                var e = t.startAngle < n ? n : t.startAngle,
                    r = t.endAngle < n ? n : t.endAngle,
                    a = f.eccentricity(),
                    i = f.innerRadius(),
                    o = a * i,
                    u = f.height(),
                    c = i * Math.cos(e),
                    l = o * Math.sin(e),
                    d = i * Math.cos(r),
                    s = o * Math.sin(r);
                return ["M", c, l, "A", i, o, "0 0 1", d, s, "L", d, u + s, "A", i, o, "0 0 0", c, u + l, "z"].join(" ")
            }).each(function(t) {
                this._current = t
            }), i.selectAll(".topSlice").data(a).enter().append("path").attr("class", "topSlice").style("fill", function(t) {
                return o(t.data)
            }).style("stroke", function(t) {
                return o(t.data)
            }).attr("d", function(t) {
                if (t.endAngle - t.startAngle == 0) return "M 0 0";
                var e = f.eccentricity(),
                    r = f.outerRadius(),
                    a = e * r,
                    i = f.innerRadius() / r,
                    o = r * Math.cos(t.startAngle),
                    u = a * Math.sin(t.startAngle),
                    c = r * Math.cos(t.endAngle),
                    l = a * Math.sin(t.endAngle);
                return ["M", o, u, "A", r, a, "0", t.endAngle - t.startAngle > n ? 1 : 0, "1", c, l, "L", i * c, i * l, "A", i * r, i * a, "0", t.endAngle - t.startAngle > n ? 1 : 0, "0", i * o, i * u, "z"].join(" ")
            }).each(function(t) {
                this._current = t
            }), i.selectAll(".outerSlice").data(a).enter().append("path").attr("class", "outerSlice").style("fill", function(t) {
                return d3.hsl(o(t.data)).darker(.7)
            }).attr("d", function(t) {
                var e = t.startAngle > n ? n : t.startAngle,
                    r = t.endAngle > n ? n : t.endAngle,
                    a = f.eccentricity(),
                    i = f.outerRadius(),
                    o = a * i,
                    u = (f.innerRadius(), f.height()),
                    c = i * Math.cos(e),
                    l = o * Math.sin(e),
                    d = i * Math.cos(r),
                    s = o * Math.sin(r);
                return ["M", c, u + l, "A", i, o, "0 0 1", d, u + s, "L", d, s, "A", i, o, "0 0 0", c, l, "z"].join(" ")
            }).each(function(t) {
                this._current = t
            });
            var u = (f.outerRadius() + f.innerRadius()) / 2,
                c = f.eccentricity() * u;
            i.selectAll(".label").data(a).enter().append("text").attr("class", "label").attr("x", function(t) {
                return u * Math.cos(.5 * (t.startAngle + t.endAngle))
            }).attr("y", function(t) {
                return c * Math.sin(.5 * (t.startAngle + t.endAngle))
            }).attr("dy", 6).text(function(t) {
                return f.label()(t)
            }).each(function(t) {
                this._current = t
            })
        }
        return f.data = function(t) {
            return arguments.length ? (r = t, f) : r
        }, f.value = function(t) {
            return arguments.length ? (o = "function" == typeof t ? t : function(e) {
                return +t
            }, f) : void 0 !== o ? o : o = function(t) {
                return t
            }
        }, f.label = function(t) {
            return arguments.length ? (s = "function" == typeof t ? t : function(e) {
                return t
            }, f) : void 0 !== s ? s : s = function(t) {
                return ""
            }
        }, f.fill = function(t) {
            return arguments.length ? (u = t, f) : void 0 !== u ? u : u = v()
        }, f.height = function(t) {
            return arguments.length ? (d = t, f) : void 0 !== d ? d : d = 30
        }, f.innerRadius = function(t) {
            return arguments.length ? (a = t, f) : void 0 !== a ? a : a = 0
        }, f.outerRadius = function(t) {
            return arguments.length ? (i = t, f) : void 0 !== i ? i : i = 200
        }, f.eccentricity = function(t) {
            return arguments.length ? (l = t, f) : void 0 !== l ? l : l = .8
        }, f.startAngle = function(t) {
            return arguments.length ? (c = t, f) : void 0 !== c ? c : c = 0
        }, f
    }, t.pie = function() {
        var t, e, n, r, a, i, o, u, c, l, d, s, f, p, h = !1;

        function g(e) {
            t = e, e.each(function() {
                d3.select(this).select(".viz-pie").remove();
                var t = d3.select(this).append("g").attr("class", "viz-pie"),
                    e = g.fill(),
                    n = g.label(),
                    r = g.d3pie()(g.data()),
                    a = g.arc();
                h && (a = a.startAngle(g.startAngle()).endAngle(g.startAngle())), t.append("g").attr("class", "arcs").selectAll(".arc").data(r).enter().append("path").attr("class", "arc").attr("d", a).style("fill", function(t) {
                    return e(t.data)
                }), t.append("g").attr("class", "labels").selectAll(".label").data(r).enter().append("text").attr("class", "label").attr("transform", function(t) {
                    return "translate(" + a.centroid(t) + ")"
                }).attr("dy", "0.35em").text(function(t) {
                    return h ? "" : n(t.data)
                })
            })
        }
        return g.fold = function() {
            h || (t.each(function() {
                var t = d3.select(this).select(".viz-pie"),
                    e = g.duration(),
                    n = g.arc(),
                    r = (g.label(), g.ease());
                t.select(".arcs").selectAll(".arc").transition().duration(e).attrTween("d", function(t) {
                    var e = g.startAngle()(t.data),
                        a = d3.interpolate(t.startAngle, e),
                        i = d3.interpolate(t.endAngle, e);
                    return function(e) {
                        return t.startAngle = a(r(e)), t.endAngle = i(r(e)), n(t)
                    }
                }), t.select(".labels").selectAll(".label").text(function(t) {
                    return ""
                })
            }), h = !0)
        }, g.unfold = function() {
            h && (t.each(function() {
                var t = d3.select(this).select(".viz-pie"),
                    e = g.duration(),
                    n = g.arc(),
                    r = g.label(),
                    a = g.d3pie()(g.data()),
                    i = g.ease();
                t.select(".arcs").selectAll(".arc").data(a).transition().duration(e).attrTween("d", function(t) {
                    var e = g.startAngle()(t.data),
                        r = d3.interpolate(e, t.startAngle),
                        a = d3.interpolate(e, t.endAngle);
                    return function(e) {
                        return t.startAngle = r(i(e)), t.endAngle = a(i(e)), n(t)
                    }
                }), t.select(".labels").selectAll(".label").data(a).attr("transform", function(t) {
                    return "translate(" + n.centroid(t) + ")"
                }).transition().delay(e).text(function(t) {
                    return r(t.data)
                })
            }), h = !1)
        }, g.createFolded = function() {
            return h = !0, g
        }, g.data = function(t) {
            return arguments.length ? (e = t, g) : e
        }, g.value = function(t) {
            return arguments.length ? (c = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== c ? c : function(t) {
                return t
            }
        }, g.innerRadius = function(t) {
            return arguments.length ? (n = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== n ? n : function(t) {
                return 0
            }
        }, g.outerRadius = function(t) {
            return arguments.length ? (r = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== r ? r : function(t) {
                return 200
            }
        }, g.cornerRadius = function(t) {
            return arguments.length ? (a = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== a ? a : function(t) {
                return 0
            }
        }, g.startAngle = function(t) {
            return arguments.length ? (i = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== i ? i : function(t) {
                return 0
            }
        }, g.endAngle = function(t) {
            return arguments.length ? (o = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== o ? o : function(t) {
                return g.startAngle()(t) + 2 * Math.PI
            }
        }, g.padAngle = function(t) {
            return arguments.length ? (u = "function" == typeof t ? t : function(e) {
                return +t
            }, g) : void 0 !== u ? u : function(t) {
                return 0
            }
        }, g.fill = function(t) {
            return arguments.length ? (l = t, g) : void 0 !== l ? l : l = v()
        }, g.sort = function(t) {
            return arguments.length ? (d = t, g) : void 0 !== d ? d : null
        }, g.label = function(t) {
            return arguments.length ? (s = t, g) : void 0 !== s ? s : function(t) {
                return ""
            }
        }, g.duration = function(t) {
            return arguments.length ? (p = t, g) : void 0 !== p ? p : 500
        }, g.ease = function(t) {
            return arguments.length ? (f = t, g) : void 0 !== f ? f : d3.easeCubicInOut
        }, g.arc = function() {
            return d3.arc().outerRadius(g.outerRadius()).innerRadius(g.innerRadius()).cornerRadius(g.cornerRadius())
        }, g.d3pie = function() {
            return d3.pie().sort(g.sort()).startAngle(g.startAngle()).endAngle(g.endAngle()).padAngle(g.padAngle()).value(g.value())
        }, g
    }, t.form = {}, t.form.select = function() {
        var t, e, n, r, a;

        function i(e) {
            t = e, e.selectAll("option").remove(), e.selectAll("option").data(i.data()).enter().append("option").property("value", i.value()).text(i.text()), e.on("change", i.onChange())
        }
        return i.data = function(t) {
            return arguments.length ? (e = t, i) : e
        }, i.value = function(t) {
            return arguments.length ? (n = t, i) : n || (n = function(t) {
                return t
            })
        }, i.text = function(t) {
            return arguments.length ? (r = t, i) : r || (r = function(t) {
                return t
            })
        }, i.onChange = function(t) {
            return arguments.length ? (a = function() {
                t(i.get())
            }, i) : a || (a = function() {})
        }, i.set = function(e) {
            return t.property("value", e), i
        }, i.get = function() {
            return t.property("value")
        }, i.update = function(n) {
            return e = n, t.selectAll("option").remove(), t.selectAll("option").data(n).enter().append("option").property("value", i.value()).text(i.text()), t.on("change", i.onChange()), i
        }, i
    }, t.form.checkList = function() {
        var t, e, n, r, a, i, o, u, c, l;

        function d(t) {
            e = t, u = d.data().map(d.defaultCheck()), e.classed("button-group", !0).classed("dropdown", !0).append("button").attr("class", "btn btn-secondary  dropdown-toggle").attr("data-toggle", "dropdown").text(d.buttonLabel()), $(e.node()).on("hidden.bs.dropdown", d.onHidden());
            var n = e.append("ul").attr("class", "dropdown-menu");
            d.allNoneButton() && n.append("li").attr("class", "buttons").append("div").attr("class", "row").selectAll("button").data(["All", "None"]).enter().append("button").attr("type", "button").attr("class", "btn btn-secondary btn-sm col-3").text(function(t) {
                return t
            }).on("click", f);
            n.selectAll(".list").data(d.data()).enter().append("li").attr("class", "list").append("a").on("click", s).attr("href", "#").attr("class", "dropdown-item").attr("data-value", d.dataValue()).attr("tabIndex", "-1").each(function(t) {
                d3.select(this).append("input").attr("type", "checkbox").property("checked", d.defaultCheck())
            }).append("span").text(d.optionLabel())
        }

        function s(t, e) {
            var n = d.data().indexOf(t);
            d3.select(this).select("input").property("checked", u[n] = !u[n]), d.onClick()(t, e), d3.event.stopPropagation()
        }

        function f(t) {
            u = "All" == t ? d.data().map(function(t) {
                return !0
            }) : d.data().map(function(t) {
                return !1
            }), e.selectAll(".list").select("input").property("checked", function(t, e) {
                return u[e]
            }), d3.event.stopPropagation()
        }
        return d.data = function(e) {
            return arguments.length ? (t = e, d) : t
        }, d.buttonLabel = function(t) {
            return arguments.length ? (n = t, d) : void 0 !== n ? n : n = "Options"
        }, d.allNoneButton = function(t) {
            return arguments.length ? (l = t, d) : void 0 !== l ? l : l = !0
        }, d.optionLabel = function(t) {
            return arguments.length ? (r = t, d) : void 0 !== r ? r : r = function(t) {
                return t
            }
        }, d.onClick = function(t) {
            return arguments.length ? (a = t, d) : void 0 !== a ? a : a = function(t) {}
        }, d.onHidden = function(t) {
            return arguments.length ? (c = t, d) : void 0 !== c ? c : c = function(t) {}
        }, d.dataValue = function(t) {
            return arguments.length ? (i = t, d) : void 0 !== i ? i : i = function(t) {
                return t
            }
        }, d.defaultCheck = function(t) {
            return arguments.length ? (o = t, d) : void 0 !== o ? o : o = function(t) {
                return !0
            }
        }, d.selectionList = function() {
            return d.data().map(function(t, e) {
                return u[e]
            })
        }, d
    }, t.table = function() {
        var t, e;

        function n(t) {
            g = t, t.each(function() {
                var t = d3.select(this);
                t.append("thead").append("tr").selectAll("th").data(n.header()).enter().append("th").text(function(t) {
                    return t
                }), t.append("tbody").selectAll("tr").data(n.body()).enter().append("tr").selectAll("td").data(function(t) {
                    return t
                }).enter().append("td").text(function(t) {
                    return t
                }), t.append("tfoot").append("tr").selectAll("th").data(n.footer()).enter().append("th").text(function(t) {
                    return t
                })
            })
        }
        return n.body = function(t) {
            return arguments.length ? (tbody = t, n) : tbody
        }, n.header = function(e) {
            return arguments.length ? (t = e, n) : void 0 !== t ? t : []
        }, n.footer = function(t) {
            return arguments.length ? (e = t, n) : void 0 !== e ? e : []
        }, n
    }, t.navTabs = function() {
        var t, e, n, r;

        function a(e) {
            (t = e).selectAll(".viz-navTabs").remove(), t.append("ul").attr("class", "nav nav-tabs viz-navTabs").attr("role", "tablist").selectAll(".nav-item").data(a.data()).enter().append("li").attr("class", "nav-item").append("a").attr("class", "nav-link").classed("active", function(t, e) {
                return 0 == e
            }).attr("data-toggle", "tab").attr("href", a.id()).attr("role", "tab").text(a.text())
        }
        return a.data = function(t) {
            return arguments.length ? (e = t, a) : e
        }, a.id = function(t) {
            return arguments.length ? (n = t, a) : n || (n = function(t) {
                return t.id
            })
        }, a.text = function(t) {
            return arguments.length ? (r = t, a) : r || (r = function(t) {
                return t.text
            })
        }, a.set = function(e) {
            return t.selectAll(".nav-item").each(function(t) {
                d3.select(this).select(".nav-link").classed("active", a.text()(t) == e)
            }), a
        }, a.get = function() {
            var e;
            return t.selectAll(".nav-item").filter(function(t) {
                return d3.select(this).select(".nav-link").classed("active")
            }).each(function(t) {
                e = t
            }), void 0 != e ? a.text()(e) : void 0
        }, a.update = function(n) {
            return e = n, t.selectAll(".viz-navTabs").remove(), t.append("ul").attr("class", "nav nav-tabs viz-navTabs").attr("role", "tablist").selectAll(".nav-item").data(a.data()).enter().append("li").attr("class", "nav-item").append("a").attr("class", "nav-link").attr("data-toggle", "tab").attr("href", a.id()).attr("role", "tab").text(a.text()), a
        }, a
    }, t.leaflet = {
        tiles: {
            OpenStreetMap: {
                WorldStreet: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                satellite: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            },
            OpenTopoMap: {
                url: "http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            },
            Thunderforest: {
                Cycle: "http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
                Transport: "http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png",
                TransportDark: "http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png",
                TransportLandscape: "http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png",
                TransportOutdoors: "http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
                TransportPioneer: "http://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png",
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            },
            OpenMapSurfer: {
                Roads: "http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}",
                Grayscale: "http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}",
                attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            },
            Hydda: {
                Full: "http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",
                Base: "http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png",
                attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            },
            Stamen: {
                Toner: "http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}",
                TonerBackground: "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}",
                TonerLite: "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}",
                Watercolor: "http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
                Terrain: "http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}",
                TerrainBackground: "http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}",
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            },
            Esri: {
                WorldStreetMap: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                WorldImagery: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                WorldTerrain: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                WorldShadedRelief: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
                WorldPhysical: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
                OceanBasemap: "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
                NatGeoWorldMap: "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                WorldGrayCanvas: "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                attribution: "Tiles &copy; Esri &mdash; Source: Esri, National Geographic, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
            },
            Here: {
                normalDay: "http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}",
                hybridDay: "http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}",
                attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>'
            },
            CartoDB: {
                Positron: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                PositronNoLabels: "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                PositronOnlyLabels: "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                DarkMatter: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                DarkMatterNoLabels: "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
                DarkMatterOnlyLabels: "http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }
        }
    }, this.viz = t
}();