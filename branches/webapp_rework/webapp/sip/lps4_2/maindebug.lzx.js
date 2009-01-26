var $runtime = "dhtml";
var $dhtml = true;
var $as3 = false;
var $as2 = false;
var $swf10 = false;
var $j2me = false;
var $debug = true;
var $js1 = true;
var $backtrace = false;
var $swf7 = false;
var $swf9 = false;
var $swf8 = false;
var $svg = false;
var $profile = false;
var _enterSipGate = null;
var hib = null;
var _hibRtmpConnection = null;
canvas = new LzCanvas(null, {__LZproxied: "solo", _dbg_filename: "maindebug.lzx", _dbg_lineno: 2, appbuilddate: "2009-01-26T15:31:39Z", bgcolor: 16777215, embedfonts: true, fontname: "Verdana,Vera,sans-serif", fontsize: 11, fontstyle: "plain", height: "100%", lpsbuild: "branches/4.2@12209 (12209)", lpsbuilddate: "2008-12-19T17:15:24Z", lpsrelease: "Production", lpsversion: "4.2.0", runtime: "dhtml", width: "100%"});
/* -*- file: base/colors.lzx#29.5 -*- */
lz.colors.offwhite = 15921906;
lz.colors.gray10 = 1710618;
lz.colors.gray20 = 3355443;
lz.colors.gray30 = 5066061;
lz.colors.gray40 = 6710886;
lz.colors.gray50 = 8355711;
lz.colors.gray60 = 10066329;
lz.colors.gray70 = 11776947;
lz.colors.gray80 = 13421772;
lz.colors.gray90 = 15066597;
/* -*- file: #40 -*- */
lz.colors.iceblue1 = 3298963;
lz.colors.iceblue2 = 5472718;
lz.colors.iceblue3 = 12240085;
lz.colors.iceblue4 = 14017779;
lz.colors.iceblue5 = 15659509;
/* -*- file: #46 -*- */
lz.colors.palegreen1 = 4290113;
lz.colors.palegreen2 = 11785139;
lz.colors.palegreen3 = 12637341;
lz.colors.palegreen4 = 13888170;
lz.colors.palegreen5 = 15725032;
/* -*- file: #52 -*- */
lz.colors.gold1 = 9331721;
lz.colors.gold2 = 13349195;
lz.colors.gold3 = 15126388;
lz.colors.gold4 = 16311446;
/* -*- file: #57 -*- */
lz.colors.sand1 = 13944481;
lz.colors.sand2 = 14276546;
lz.colors.sand3 = 15920859;
lz.colors.sand4 = 15986401;
/* -*- file: #62 -*- */
lz.colors.ltpurple1 = 6575768;
lz.colors.ltpurple2 = 12038353;
lz.colors.ltpurple3 = 13353453;
lz.colors.ltpurple4 = 15329264;
/* -*- file: #67 -*- */
lz.colors.grayblue = 12501704;
lz.colors.graygreen = 12635328;
lz.colors.graypurple = 10460593;
/* -*- file: #71 -*- */
lz.colors.ltblue = 14540287;
lz.colors.ltgreen = 14548957;
/* -*- file: -*- */
/* -*- file: base/basefocusview.lzx#3.1 -*- */
/* -*- file: #4 -*- */
/* -*- file: #3 -*- */
Class.make("$lzc$class_basefocusview", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "active", void 0, "$lzc$set_active", function $lzc$set_active (active_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/basefocusview.lzx#8.79 -*- */
setActive(active_$1)
}}
/* -*- file:  -*- */
, "target", void 0, "$lzc$set_target", function $lzc$set_target (target_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#10.79 -*- */
setTarget(target_$1)
}}
/* -*- file:  -*- */
, "duration", void 0, "_animatorcounter", void 0, "ontarget", void 0, "_nexttarget", void 0, "onactive", void 0, "_xydelegate", void 0, "_widthdel", void 0, "_heightdel", void 0, "_delayfadeoutDL", void 0, "_dofadeout", void 0, "_onstopdel", void 0, "reset", function reset () {
with (this) {
/* -*- file: base/basefocusview.lzx#37.13 -*- */
this.setAttribute("x", 0);
this.setAttribute("y", 0);
this.setAttribute("width", Debug.evalCarefully("base/basefocusview.lzx", 39, function  () {
/* -*- file: #39 -*- */
return canvas
}
/* -*- file:  -*- */
, this).width);
/* -*- file: base/basefocusview.lzx#40.13 -*- */
this.setAttribute("height", Debug.evalCarefully("base/basefocusview.lzx", 40, function  () {
/* -*- file: #40 -*- */
return canvas
}
/* -*- file:  -*- */
, this).height);
/* -*- file: base/basefocusview.lzx#41.13 -*- */
setTarget(null)
}}
/* -*- file:  -*- */
, "setActive", function setActive (isactive_$1) {
/* -*- file: base/basefocusview.lzx#46.13 -*- */
this.active = isactive_$1;
if (this.onactive) {
/* -*- file: #47 -*- */
this.onactive.sendEvent(isactive_$1)
}}
/* -*- file:  -*- */
, "doFocus", function doFocus (v_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#57.13 -*- */
this._dofadeout = false;
/* -*- file: #60 -*- */
this.bringToFront();
/* -*- file: #63 -*- */
if (this.target) {
/* -*- file: #63 -*- */
this.setTarget(null)
};
/* -*- file: #66 -*- */
this.setAttribute("visibility", this.active ? "visible" : "hidden");
/* -*- file: #70 -*- */
this._nexttarget = v_$1;
/* -*- file: #72 -*- */
if (Debug.evalCarefully("base/basefocusview.lzx", 72, function  () {
/* -*- file: #72 -*- */
return visible
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basefocusview.lzx#72.31 -*- */
/* -*- file: #77 -*- */
this._animatorcounter += 1;
/* -*- file: #80 -*- */
var rct_$2 = null;
var nx_$3;
/* -*- file: #81 -*- */
var ny_$4;
/* -*- file: #81 -*- */
var nw_$5;
/* -*- file: #81 -*- */
var nh_$6;
if (v_$1["getFocusRect"]) {
/* -*- file: #82 -*- */
rct_$2 = v_$1.getFocusRect()
};
/* -*- file: #83 -*- */
if (rct_$2) {
/* -*- file: #83 -*- */
/* -*- file: #84 -*- */
nx_$3 = rct_$2[0];
/* -*- file: #84 -*- */
ny_$4 = rct_$2[1];
/* -*- file: #84 -*- */
nw_$5 = rct_$2[2];
/* -*- file: #84 -*- */
nh_$6 = rct_$2[3]
} else {
/* -*- file: #85 -*- */
/* -*- file: #86 -*- */
nx_$3 = v_$1.getAttributeRelative("x", Debug.evalCarefully("base/basefocusview.lzx", 86, function  () {
/* -*- file: #86 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#87.21 -*- */
ny_$4 = v_$1.getAttributeRelative("y", Debug.evalCarefully("base/basefocusview.lzx", 87, function  () {
/* -*- file: #87 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#88.21 -*- */
nw_$5 = v_$1.getAttributeRelative("width", Debug.evalCarefully("base/basefocusview.lzx", 88, function  () {
/* -*- file: #88 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#89.21 -*- */
nh_$6 = v_$1.getAttributeRelative("height", Debug.evalCarefully("base/basefocusview.lzx", 89, function  () {
/* -*- file: #89 -*- */
return canvas
}
/* -*- file:  -*- */
, this))
};
/* -*- file: base/basefocusview.lzx#92.17 -*- */
var anm_$7 = this.animate("x", nx_$3, Debug.evalCarefully("base/basefocusview.lzx", 92, function  () {
/* -*- file: #92 -*- */
return duration
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#93.17 -*- */
this.animate("y", ny_$4, Debug.evalCarefully("base/basefocusview.lzx", 93, function  () {
/* -*- file: #93 -*- */
return duration
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#94.17 -*- */
this.animate("width", nw_$5, Debug.evalCarefully("base/basefocusview.lzx", 94, function  () {
/* -*- file: #94 -*- */
return duration
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#95.17 -*- */
this.animate("height", nh_$6, Debug.evalCarefully("base/basefocusview.lzx", 95, function  () {
/* -*- file: #95 -*- */
return duration
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#98.17 -*- */
if (this.capabilities["minimize_opacity_changes"]) {
/* -*- file: #98 -*- */
/* -*- file: #99 -*- */
this.setAttribute("visibility", "visible")
} else {
/* -*- file: #100 -*- */
/* -*- file: #101 -*- */
this.animate("opacity", 1, 500)
};
/* -*- file: #105 -*- */
if (!this._onstopdel) {
/* -*- file: #105 -*- */
this._onstopdel = new (Debug.evalCarefully("base/basefocusview.lzx", 105, function  () {
/* -*- file: #105 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "stopanim")
};
/* -*- file: base/basefocusview.lzx#106.17 -*- */
this._onstopdel.register(anm_$7, "onstop")
};
/* -*- file: #109 -*- */
if (this._animatorcounter < 1) {
/* -*- file: #109 -*- */
/* -*- file: #110 -*- */
this.setTarget(this._nexttarget);
/* -*- file: #112 -*- */
var rct_$2 = null;
var nx_$3;
/* -*- file: #113 -*- */
var ny_$4;
/* -*- file: #113 -*- */
var nw_$5;
/* -*- file: #113 -*- */
var nh_$6;
if (v_$1["getFocusRect"]) {
/* -*- file: #114 -*- */
rct_$2 = v_$1.getFocusRect()
};
/* -*- file: #115 -*- */
if (rct_$2) {
/* -*- file: #115 -*- */
/* -*- file: #116 -*- */
nx_$3 = rct_$2[0];
/* -*- file: #116 -*- */
ny_$4 = rct_$2[1];
/* -*- file: #116 -*- */
nw_$5 = rct_$2[2];
/* -*- file: #116 -*- */
nh_$6 = rct_$2[3]
} else {
/* -*- file: #117 -*- */
/* -*- file: #118 -*- */
nx_$3 = v_$1.getAttributeRelative("x", Debug.evalCarefully("base/basefocusview.lzx", 118, function  () {
/* -*- file: #118 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#119.21 -*- */
ny_$4 = v_$1.getAttributeRelative("y", Debug.evalCarefully("base/basefocusview.lzx", 119, function  () {
/* -*- file: #119 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#120.21 -*- */
nw_$5 = v_$1.getAttributeRelative("width", Debug.evalCarefully("base/basefocusview.lzx", 120, function  () {
/* -*- file: #120 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#121.21 -*- */
nh_$6 = v_$1.getAttributeRelative("height", Debug.evalCarefully("base/basefocusview.lzx", 121, function  () {
/* -*- file: #121 -*- */
return canvas
}
/* -*- file:  -*- */
, this))
};
/* -*- file: base/basefocusview.lzx#124.17 -*- */
this.setAttribute("x", nx_$3);
this.setAttribute("y", ny_$4);
this.setAttribute("width", nw_$5);
this.setAttribute("height", nh_$6)
}}}
/* -*- file:  -*- */
, "stopanim", function stopanim (ignore_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#136.13 -*- */
this._animatorcounter -= 1;
if (this._animatorcounter < 1) {
/* -*- file: #137 -*- */
/* -*- file: #143 -*- */
this._dofadeout = true;
if (!this._delayfadeoutDL) {
this._delayfadeoutDL = new (Debug.evalCarefully("base/basefocusview.lzx", 145, function  () {
/* -*- file: #145 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "fadeout")
};
/* -*- file: base/basefocusview.lzx#146.1 -*- */
Debug.evalCarefully("base/basefocusview.lzx", 146, function  () {
/* -*- file: #146 -*- */
return lz
}
/* -*- file:  -*- */
, this).Timer.addTimer(this._delayfadeoutDL, 1000);
/* -*- file: base/basefocusview.lzx#147.17 -*- */
this.setTarget(Debug.evalCarefully("base/basefocusview.lzx", 147, function  () {
/* -*- file: #147 -*- */
return _nexttarget
}
/* -*- file:  -*- */
, this));
/* -*- file: base/basefocusview.lzx#148.17 -*- */
this._onstopdel.unregisterAll()
}}}
/* -*- file:  -*- */
, "fadeout", function fadeout (ignore_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#155.13 -*- */
if (Debug.evalCarefully("base/basefocusview.lzx", 155, function  () {
/* -*- file: #155 -*- */
return _dofadeout
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basefocusview.lzx#155.29 -*- */
/* -*- file: #156 -*- */
if (this.capabilities["minimize_opacity_changes"]) {
/* -*- file: #156 -*- */
/* -*- file: #157 -*- */
this.setAttribute("visibility", "hidden")
} else {
/* -*- file: #158 -*- */
/* -*- file: #159 -*- */
this.animate("opacity", 0, 500)
}};
/* -*- file: #162 -*- */
this._delayfadeoutDL.unregisterAll()
}}
/* -*- file:  -*- */
, "setTarget", function setTarget (newtarget_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#167.13 -*- */
this.target = newtarget_$1;
if (!this._xydelegate) {
/* -*- file: #168 -*- */
/* -*- file: #169 -*- */
this._xydelegate = new (Debug.evalCarefully("base/basefocusview.lzx", 169, function  () {
/* -*- file: #169 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "followXY")
} else {
/* -*- file: base/basefocusview.lzx#170.20 -*- */
/* -*- file: #171 -*- */
this._xydelegate.unregisterAll()
};
/* -*- file: #174 -*- */
if (!this._widthdel) {
/* -*- file: #174 -*- */
/* -*- file: #175 -*- */
this._widthdel = new (Debug.evalCarefully("base/basefocusview.lzx", 175, function  () {
/* -*- file: #175 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "followWidth")
} else {
/* -*- file: base/basefocusview.lzx#176.20 -*- */
/* -*- file: #177 -*- */
this._widthdel.unregisterAll()
};
/* -*- file: #180 -*- */
if (!this._heightdel) {
/* -*- file: #180 -*- */
/* -*- file: #181 -*- */
this._heightdel = new (Debug.evalCarefully("base/basefocusview.lzx", 181, function  () {
/* -*- file: #181 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "followHeight")
} else {
/* -*- file: base/basefocusview.lzx#182.20 -*- */
/* -*- file: #183 -*- */
this._heightdel.unregisterAll()
};
/* -*- file: #186 -*- */
if (this.target == null) {
/* -*- file: #186 -*- */
return
};
/* -*- file: #190 -*- */
var p_$2 = newtarget_$1;
var i_$3 = 0;
while (p_$2 != Debug.evalCarefully("base/basefocusview.lzx", 192, function  () {
/* -*- file: #192 -*- */
return canvas
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basefocusview.lzx#192.35 -*- */
/* -*- file: #193 -*- */
this._xydelegate.register(p_$2, "onx");
this._xydelegate.register(p_$2, "ony");
p_$2 = p_$2.immediateparent;
i_$3++
};
/* -*- file: #199 -*- */
this._widthdel.register(newtarget_$1, "onwidth");
this._heightdel.register(newtarget_$1, "onheight");
/* -*- file: #202 -*- */
followXY(null);
followWidth(null);
followHeight(null)
}}
/* -*- file:  -*- */
, "followXY", function followXY (ignore_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#209.13 -*- */
var rct_$2 = null;
if (Debug.evalCarefully("base/basefocusview.lzx", 210, function  () {
/* -*- file: #210 -*- */
return target
}
/* -*- file:  -*- */
, this)["getFocusRect"]) {
/* -*- file: base/basefocusview.lzx#210.46 -*- */
rct_$2 = Debug.evalCarefully("base/basefocusview.lzx", 210, function  () {
/* -*- file: #210 -*- */
return target
}
/* -*- file:  -*- */
, this).getFocusRect()
};
/* -*- file: base/basefocusview.lzx#211.16 -*- */
if (rct_$2) {
/* -*- file: #211 -*- */
/* -*- file: #212 -*- */
this.setAttribute("x", rct_$2[0]);
this.setAttribute("y", rct_$2[1])
} else {
/* -*- file: #214 -*- */
/* -*- file: #215 -*- */
this.setAttribute("x", this.target.getAttributeRelative("x", Debug.evalCarefully("base/basefocusview.lzx", 215, function  () {
/* -*- file: #215 -*- */
return canvas
}
/* -*- file:  -*- */
, this)));
/* -*- file: base/basefocusview.lzx#216.17 -*- */
this.setAttribute("y", this.target.getAttributeRelative("y", Debug.evalCarefully("base/basefocusview.lzx", 216, function  () {
/* -*- file: #216 -*- */
return canvas
}
/* -*- file:  -*- */
, this)))
}}}
, "followWidth", function followWidth (ignore_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#222.13 -*- */
var rct_$2 = null;
if (Debug.evalCarefully("base/basefocusview.lzx", 223, function  () {
/* -*- file: #223 -*- */
return target
}
/* -*- file:  -*- */
, this)["getFocusRect"]) {
/* -*- file: base/basefocusview.lzx#223.46 -*- */
rct_$2 = Debug.evalCarefully("base/basefocusview.lzx", 223, function  () {
/* -*- file: #223 -*- */
return target
}
/* -*- file:  -*- */
, this).getFocusRect()
};
/* -*- file: base/basefocusview.lzx#224.16 -*- */
if (rct_$2) {
/* -*- file: #224 -*- */
/* -*- file: #225 -*- */
this.setAttribute("width", rct_$2[2])
} else {
/* -*- file: #226 -*- */
/* -*- file: #227 -*- */
this.setAttribute("width", this.target.width)
}}}
/* -*- file:  -*- */
, "followHeight", function followHeight (ignore_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#233.13 -*- */
var rct_$2 = null;
if (Debug.evalCarefully("base/basefocusview.lzx", 234, function  () {
/* -*- file: #234 -*- */
return target
}
/* -*- file:  -*- */
, this)["getFocusRect"]) {
/* -*- file: base/basefocusview.lzx#234.46 -*- */
rct_$2 = Debug.evalCarefully("base/basefocusview.lzx", 234, function  () {
/* -*- file: #234 -*- */
return target
}
/* -*- file:  -*- */
, this).getFocusRect()
};
/* -*- file: base/basefocusview.lzx#235.16 -*- */
if (rct_$2) {
/* -*- file: #235 -*- */
/* -*- file: #236 -*- */
this.setAttribute("height", rct_$2[3])
} else {
/* -*- file: #237 -*- */
/* -*- file: #238 -*- */
this.setAttribute("height", this.target.height)
}}}
/* -*- file:  -*- */
, "$lzc$handle_onfocus_reference$$base$2Fbasefocusview$2Elzx_243_63_$m25", function $lzc$handle_onfocus_reference$$base$2Fbasefocusview$2Elzx_243_63_$m25 () {
with (this) {
/* -*- file: base/basefocusview.lzx#243.111 -*- */
var $lzc$reference_$1 = Debug.evalCarefully("base/basefocusview.lzx", 244, function  () {
return lz
}
/* -*- file:  -*- */
, this).Focus;
/* -*- file: base/basefocusview.lzx#247.1 -*- */
if (Debug.evalCarefully("base/basefocusview.lzx", 247, function  () {
/* -*- file: #247 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)["$lzsc$isa"] ? Debug.evalCarefully("base/basefocusview.lzx", 247, function  () {
/* -*- file: base/basefocusview.lzx#247.66 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this).$lzsc$isa($lzc$reference_$1) : $lzc$reference_$1 instanceof Debug.evalCarefully("base/basefocusview.lzx", 247, function  () {
/* -*- file: base/basefocusview.lzx#247.66 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basefocusview.lzx#247.36 -*- */
/* -*- file: #248 -*- */
return $lzc$reference_$1
} else {
/* -*- file: #249 -*- */
/* -*- file: #250 -*- */
Debug.evalCarefully("base/basefocusview.lzx", 250, function  () {
/* -*- file: #250 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("Invalid event sender: lz.Focus => %w (for event onfocus)", $lzc$reference_$1)
}}}
, "$lzc$handle_onfocus$$base$2Fbasefocusview$2Elzx_243_63_$m25", function $lzc$handle_onfocus$$base$2Fbasefocusview$2Elzx_243_63_$m25 (v_$1) {
with (this) {
/* -*- file: base/basefocusview.lzx#244.13 -*- */
this.setActive(Debug.evalCarefully("base/basefocusview.lzx", 244, function  () {
/* -*- file: #244 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.focuswithkey);
/* -*- file: base/basefocusview.lzx#245.13 -*- */
if (v_$1) {
/* -*- file: #245 -*- */
/* -*- file: #246 -*- */
this.doFocus(v_$1)
} else {
/* -*- file: #247 -*- */
/* -*- file: #248 -*- */
this.reset();
if (this.active) {
/* -*- file: #249 -*- */
/* -*- file: #250 -*- */
this.setActive(false)
}}}}
/* -*- file:  -*- */
], ["tagname", "basefocusview", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: base/basefocusview.lzx#3.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/basefocusview.lzx#4.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #4 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #4 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 258, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onstop", "stopanim", null, "onfocus", "$lzc$handle_onfocus$$base$2Fbasefocusview$2Elzx_243_63_$m25", "$lzc$handle_onfocus_reference$$base$2Fbasefocusview$2Elzx_243_63_$m25"], _animatorcounter: 0, _dbg_filename: "base/basefocusview.lzx", _dbg_lineno: 4, _delayfadeoutDL: null, _dofadeout: false, _heightdel: null, _nexttarget: null, _onstopdel: null, _widthdel: null, _xydelegate: null, active: false, duration: 400, initstage: "late", onactive: Debug.evalCarefully("base/basefocusview.lzx", 21, function  () {
/* -*- file: base/basefocusview.lzx#21.65 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), ontarget: Debug.evalCarefully("base/basefocusview.lzx", 17, function  () {
/* -*- file: base/basefocusview.lzx#17.65 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), options: {ignorelayout: true}, target: null, visible: false}, Debug.evalCarefully("", 8, function  () {
return $lzc$class_basefocusview
}
, this).attributes)
}}}
;
/* -*- file: base/basefocusview.lzx#4.40 -*- */
$lzsc$temp._dbg_name = "base/basefocusview.lzx#4/1";
/* -*- file: #4 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_basefocusview);
LzResourceLibrary.lzfocusbracket_topleft_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_top_lft.png"], width: 7, height: 7};
LzResourceLibrary.lzfocusbracket_topleft_shdw_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_top_lft_shdw.png"], width: 9, height: 9};
LzResourceLibrary.lzfocusbracket_topright_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_top_rt.png"], width: 7, height: 7};
LzResourceLibrary.lzfocusbracket_topright_shdw_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_top_rt_shdw.png"], width: 9, height: 9};
LzResourceLibrary.lzfocusbracket_bottomleft_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_bot_lft.png"], width: 7, height: 7};
LzResourceLibrary.lzfocusbracket_bottomleft_shdw_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_bot_lft_shdw.png"], width: 9, height: 9};
LzResourceLibrary.lzfocusbracket_bottomright_rsrc = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_bot_rt.png"], width: 7, height: 7};
LzResourceLibrary.lzfocusbracket_bottomright_shdw = {ptype: "sr", frames: ["lps/components/lz/resources/focus/focus_bot_rt_shdw.png"], width: 9, height: 9};
/* -*- file: lz/focusoverlay.lzx#29.1 -*- */
/* -*- file: #30 -*- */
/* -*- file: #29 -*- */
Class.make("$lzc$class_$m85", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32", function $lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", -Debug.evalCarefully("", 30, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32", function $lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32 () {
with (this) {
return( [Debug.evalCarefully("", 30, function  () {
return classroot
}
, this), "offset"])
}}
, "$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33", function $lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("y", -Debug.evalCarefully("", 30, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33", function $lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33 () {
with (this) {
return( [Debug.evalCarefully("", 30, function  () {
return classroot
}
, this), "offset"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 31, opacity: 0.25, resource: "lzfocusbracket_topleft_shdw_rsrc", x: 1, y: 1}, "class": LzView}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 32, resource: "lzfocusbracket_topleft_rsrc"}, "class": LzView}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/focusoverlay.lzx#36.1 -*- */
/* -*- file: #37 -*- */
/* -*- file: #36 -*- */
Class.make("$lzc$class_$m86", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46", function $lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", Debug.evalCarefully("", 37, function  () {
return parent
}
, this).width - Debug.evalCarefully("", 37, function  () {
return width
}
, this) + Debug.evalCarefully("", 37, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46", function $lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46 () {
with (this) {
return( [Debug.evalCarefully("", 37, function  () {
return parent
}
, this), "width", this, "width", Debug.evalCarefully("", 37, function  () {
return classroot
}
, this), "offset"])
}}
, "$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47", function $lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("y", -Debug.evalCarefully("", 37, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47", function $lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47 () {
with (this) {
return( [Debug.evalCarefully("", 37, function  () {
return classroot
}
, this), "offset"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 38, opacity: 0.25, resource: "lzfocusbracket_topright_shdw_rsrc", x: 1, y: 1}, "class": LzView}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 39, resource: "lzfocusbracket_topright_rsrc"}, "class": LzView}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/focusoverlay.lzx#43.1 -*- */
/* -*- file: #44 -*- */
/* -*- file: #43 -*- */
Class.make("$lzc$class_$m87", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60", function $lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", -Debug.evalCarefully("", 44, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60", function $lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60 () {
with (this) {
return( [Debug.evalCarefully("", 44, function  () {
return classroot
}
, this), "offset"])
}}
, "$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61", function $lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("y", Debug.evalCarefully("", 43, function  () {
return parent
}
, this).height - Debug.evalCarefully("", 43, function  () {
return height
}
, this) + Debug.evalCarefully("", 43, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61", function $lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61 () {
with (this) {
return( [Debug.evalCarefully("", 44, function  () {
return parent
}
, this), "height", this, "height", Debug.evalCarefully("", 44, function  () {
return classroot
}
, this), "offset"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 45, opacity: 0.25, resource: "lzfocusbracket_bottomleft_shdw_rsrc", x: 1, y: 1}, "class": LzView}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 46, resource: "lzfocusbracket_bottomleft_rsrc"}, "class": LzView}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/focusoverlay.lzx#50.1 -*- */
/* -*- file: #51 -*- */
/* -*- file: #50 -*- */
Class.make("$lzc$class_$m88", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74", function $lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", Debug.evalCarefully("", 51, function  () {
return parent
}
, this).width - Debug.evalCarefully("", 51, function  () {
return width
}
, this) + Debug.evalCarefully("", 51, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74", function $lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74 () {
with (this) {
return( [Debug.evalCarefully("", 51, function  () {
return parent
}
, this), "width", this, "width", Debug.evalCarefully("", 51, function  () {
return classroot
}
, this), "offset"])
}}
, "$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75", function $lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("y", Debug.evalCarefully("", 51, function  () {
return parent
}
, this).height - Debug.evalCarefully("", 51, function  () {
return height
}
, this) + Debug.evalCarefully("", 51, function  () {
return classroot
}
, this).offset)
}}
, "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75", function $lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75 () {
with (this) {
return( [Debug.evalCarefully("", 51, function  () {
return parent
}
, this), "height", this, "height", Debug.evalCarefully("", 51, function  () {
return classroot
}
, this), "offset"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 52, opacity: 0.25, resource: "lzfocusbracket_bottomright_shdw", x: 1, y: 1}, "class": LzView}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 53, resource: "lzfocusbracket_bottomright_rsrc"}, "class": LzView}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/focusoverlay.lzx#21.1 -*- */
/* -*- file: #22 -*- */
/* -*- file: #21 -*- */
Class.make("$lzc$class_focusoverlay", $lzc$class_basefocusview, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "offset", void 0, "topleft", void 0, "topright", void 0, "bottomleft", void 0, "bottomright", void 0, "doFocus", function doFocus (v_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: lz/focusoverlay.lzx#60.13 -*- */
/* -*- file: #59 -*- */
/* -*- file: #60 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["doFocus"] : this.nextMethod(arguments.callee, "doFocus")).call(this, v_$1);
if (Debug.evalCarefully("lz/focusoverlay.lzx", 61, function  () {
/* -*- file: #61 -*- */
return visible
}
/* -*- file:  -*- */
, this)) {
/* -*- file: lz/focusoverlay.lzx#61.28 -*- */
this.bounce()
}}}
/* -*- file:  -*- */
, "bounce", function bounce () {
with (this) {
/* -*- file: lz/focusoverlay.lzx#66.13 -*- */
this.animate("offset", 12, Debug.evalCarefully("lz/focusoverlay.lzx", 66, function  () {
/* -*- file: #66 -*- */
return duration
}
/* -*- file:  -*- */
, this) / 2);
/* -*- file: lz/focusoverlay.lzx#67.13 -*- */
this.animate("offset", 5, Debug.evalCarefully("lz/focusoverlay.lzx", 67, function  () {
/* -*- file: #67 -*- */
return duration
}
/* -*- file:  -*- */
, this))
}}
], ["tagname", "focusoverlay", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 30, name: "topleft", x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32", "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_30_41_$m32"), y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33", "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_30_41_$m33")}, "class": $lzc$class_$m85}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 37, name: "topright", x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46", "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_37_42_$m46"), y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47", "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_37_42_$m47")}, "class": $lzc$class_$m86}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 44, name: "bottomleft", x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60", "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_44_67_$m60"), y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61", "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_44_67_$m61")}, "class": $lzc$class_$m87}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 51, name: "bottomright", x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74", "$lzc$dependencies_x$$lz$2Ffocusoverlay$2Elzx_51_67_$m74"), y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75", "$lzc$dependencies_y$$lz$2Ffocusoverlay$2Elzx_51_67_$m75")}, "class": $lzc$class_$m88}], $lzc$class_basefocusview["children"]), "attributes", new LzInheritedHash($lzc$class_basefocusview.attributes)]);
/* -*- file: lz/focusoverlay.lzx#21.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: lz/focusoverlay.lzx#22.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #22 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #22 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 73, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "lz/focusoverlay.lzx", _dbg_lineno: 22, offset: 5}, Debug.evalCarefully("", 30, function  () {
return $lzc$class_focusoverlay
}
, this).attributes)
}}}
;
/* -*- file: lz/focusoverlay.lzx#22.40 -*- */
$lzsc$temp._dbg_name = "lz/focusoverlay.lzx#22/1";
/* -*- file: #22 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_focusoverlay);
/* -*- file: base/componentmanager.lzx#12.1 -*- */
/* -*- file: #13 -*- */
/* -*- file: #12 -*- */
Class.make("$lzc$class__componentmanager", LzNode, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "focusclass", void 0, "keyhandlers", void 0, "lastsdown", void 0, "lastedown", void 0, "defaults", void 0, "currentdefault", void 0, "defaultstyle", void 0, "ondefaultstyle", void 0, "init", function init () {
/* -*- file: -*- */
with (this) {
/* -*- file: base/componentmanager.lzx#44.13 -*- */
var fclass_$1 = this.focusclass;
/* -*- file: #46 -*- */
if (typeof Debug.evalCarefully("base/componentmanager.lzx", 46, function  () {
/* -*- file: #46 -*- */
return canvas
}
/* -*- file:  -*- */
, this).focusclass != "undefined") {
/* -*- file: base/componentmanager.lzx#46.63 -*- */
/* -*- file: #47 -*- */
fclass_$1 = Debug.evalCarefully("base/componentmanager.lzx", 47, function  () {
/* -*- file: #47 -*- */
return canvas
}
/* -*- file:  -*- */
, this).focusclass
};
/* -*- file: base/componentmanager.lzx#50.13 -*- */
if (fclass_$1 != null) {
/* -*- file: #50 -*- */
/* -*- file: #51 -*- */
Debug.evalCarefully("base/componentmanager.lzx", 51, function  () {
/* -*- file: #51 -*- */
return canvas
}
/* -*- file:  -*- */
, this).__focus = new (Debug.evalCarefully("base/componentmanager.lzx", 51, function  () {
/* -*- file: base/componentmanager.lzx#51.68 -*- */
return lz
}
/* -*- file:  -*- */
, this)[fclass_$1])(Debug.evalCarefully("base/componentmanager.lzx", 51, function  () {
/* -*- file: base/componentmanager.lzx#51.68 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: base/componentmanager.lzx#52.1 -*- */
Debug.evalCarefully("base/componentmanager.lzx", 52, function  () {
/* -*- file: #52 -*- */
return canvas
}
/* -*- file:  -*- */
, this).__focus.reset()
};
/* -*- file: base/componentmanager.lzx#54.13 -*- */
/* -*- file: #53 -*- */
/* -*- file: #54 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["init"] : this.nextMethod(arguments.callee, "init")).call(this)
}}
/* -*- file:  -*- */
, "_lastkeydown", void 0, "upkeydel", void 0, "$lzc$handle_onkeydown_reference$$base$2Fcomponentmanager$2Elzx_61_82_$m101", function $lzc$handle_onkeydown_reference$$base$2Fcomponentmanager$2Elzx_61_82_$m101 () {
with (this) {
/* -*- file: base/componentmanager.lzx#61.84 -*- */
var $lzc$reference_$1 = Debug.evalCarefully("base/componentmanager.lzx", 62, function  () {
return lz
}
/* -*- file:  -*- */
, this).Keys;
/* -*- file: base/componentmanager.lzx#65.1 -*- */
if (Debug.evalCarefully("base/componentmanager.lzx", 65, function  () {
/* -*- file: #65 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)["$lzsc$isa"] ? Debug.evalCarefully("base/componentmanager.lzx", 65, function  () {
/* -*- file: base/componentmanager.lzx#65.68 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this).$lzsc$isa($lzc$reference_$1) : $lzc$reference_$1 instanceof Debug.evalCarefully("base/componentmanager.lzx", 65, function  () {
/* -*- file: base/componentmanager.lzx#65.68 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/componentmanager.lzx#65.36 -*- */
/* -*- file: #66 -*- */
return $lzc$reference_$1
} else {
/* -*- file: #67 -*- */
/* -*- file: #68 -*- */
Debug.evalCarefully("base/componentmanager.lzx", 68, function  () {
/* -*- file: #68 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("Invalid event sender: lz.Keys => %w (for event onkeydown)", $lzc$reference_$1)
}}}
, "dispatchKeyDown", function dispatchKeyDown (key_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#64.13 -*- */
var callupdel_$2 = false;
if (key_$1 == 32) {
/* -*- file: #65 -*- */
/* -*- file: #66 -*- */
this.lastsdown = null;
var foc_$3 = Debug.evalCarefully("base/componentmanager.lzx", 67, function  () {
/* -*- file: #67 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus();
/* -*- file: base/componentmanager.lzx#68.17 -*- */
if (foc_$3 instanceof Debug.evalCarefully("base/componentmanager.lzx", 68, function  () {
/* -*- file: #68 -*- */
return lz
}
/* -*- file:  -*- */
, this).basecomponent) {
/* -*- file: base/componentmanager.lzx#68.55 -*- */
/* -*- file: #69 -*- */
foc_$3.doSpaceDown();
this.lastsdown = foc_$3
};
callupdel_$2 = true
} else {
/* -*- file: #73 -*- */
if (key_$1 == 13 && this.currentdefault) {
/* -*- file: #73 -*- */
/* -*- file: #74 -*- */
this.lastedown = this.currentdefault;
this.currentdefault.doEnterDown();
callupdel_$2 = true
}};
if (callupdel_$2) {
/* -*- file: #78 -*- */
/* -*- file: #79 -*- */
if (!this.upkeydel) {
/* -*- file: #79 -*- */
this.upkeydel = new (Debug.evalCarefully("base/componentmanager.lzx", 79, function  () {
/* -*- file: #79 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "dispatchKeyTimer")
};
/* -*- file: base/componentmanager.lzx#80.17 -*- */
this._lastkeydown = key_$1;
Debug.evalCarefully("base/componentmanager.lzx", 81, function  () {
/* -*- file: #81 -*- */
return lz
}
/* -*- file:  -*- */
, this).Timer.addTimer(this.upkeydel, 50)
}}}
, "dispatchKeyTimer", function dispatchKeyTimer (ignore_$1) {
/* -*- file: base/componentmanager.lzx#88.13 -*- */
if (this._lastkeydown == 32 && this.lastsdown != null) {
/* -*- file: #88 -*- */
/* -*- file: #89 -*- */
this.lastsdown.doSpaceUp();
this.lastsdown = null
} else {
/* -*- file: #91 -*- */
if (this._lastkeydown == 13 && this.currentdefault && this.currentdefault == this.lastedown) {
/* -*- file: #93 -*- */
this.currentdefault.doEnterUp()
}}}
/* -*- file:  -*- */
, "findClosestDefault", function findClosestDefault (who_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#100.13 -*- */
if (!this.defaults) {
/* -*- file: #100 -*- */
/* -*- file: #101 -*- */
return null
};
var lastpar_$2 = null;
var lastbut_$3 = null;
/* -*- file: #106 -*- */
var buts_$4 = this.defaults;
who_$1 = who_$1 || Debug.evalCarefully("base/componentmanager.lzx", 107, function  () {
/* -*- file: #107 -*- */
return canvas
}
/* -*- file:  -*- */
, this);
/* -*- file: base/componentmanager.lzx#108.13 -*- */
var mode_$5 = Debug.evalCarefully("base/componentmanager.lzx", 108, function  () {
/* -*- file: #108 -*- */
return lz
}
/* -*- file:  -*- */
, this).ModeManager.getModalView();
/* -*- file: base/componentmanager.lzx#109.13 -*- */
for (var i_$6 = 0;i_$6 < buts_$4.length;i_$6++) {
/* -*- file: #109 -*- */
/* -*- file: #110 -*- */
var tbut_$7 = buts_$4[i_$6];
/* -*- file: #112 -*- */
if (mode_$5 && !tbut_$7.childOf(mode_$5)) {
/* -*- file: #112 -*- */
/* -*- file: #113 -*- */
continue
};
/* -*- file: #116 -*- */
var par_$8 = this.findCommonParent(tbut_$7, who_$1);
if (par_$8 && (!lastpar_$2 || par_$8.nodeLevel > lastpar_$2.nodeLevel)) {
/* -*- file: #117 -*- */
/* -*- file: #118 -*- */
lastpar_$2 = par_$8;
lastbut_$3 = tbut_$7
}};
/* -*- file: #122 -*- */
return lastbut_$3
}}
/* -*- file:  -*- */
, "findCommonParent", function findCommonParent (v1_$1, v2_$2) {
/* -*- file: base/componentmanager.lzx#127.13 -*- */
while (v1_$1.nodeLevel > v2_$2.nodeLevel) {
/* -*- file: #127 -*- */
/* -*- file: #128 -*- */
v1_$1 = v1_$1.immediateparent;
if (!v1_$1.visible) {
/* -*- file: #129 -*- */
return null
}};
/* -*- file: #132 -*- */
while (v2_$2.nodeLevel > v1_$1.nodeLevel) {
/* -*- file: #132 -*- */
/* -*- file: #133 -*- */
v2_$2 = v2_$2.immediateparent;
if (!v2_$2.visible) {
/* -*- file: #134 -*- */
return null
}};
/* -*- file: #137 -*- */
while (v1_$1 != v2_$2) {
/* -*- file: #137 -*- */
/* -*- file: #138 -*- */
v1_$1 = v1_$1.immediateparent;
v2_$2 = v2_$2.immediateparent;
if (!v1_$1.visible || !v2_$2.visible) {
/* -*- file: #140 -*- */
return null
}};
/* -*- file: #143 -*- */
return v1_$1
}
/* -*- file:  -*- */
, "makeDefault", function makeDefault (who_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#148.13 -*- */
if (!this.defaults) {
/* -*- file: #148 -*- */
this.defaults = []
};
/* -*- file: #149 -*- */
this.defaults.push(who_$1);
this.checkDefault(Debug.evalCarefully("base/componentmanager.lzx", 150, function  () {
/* -*- file: #150 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus())
}}
, "unmakeDefault", function unmakeDefault (who_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#156.13 -*- */
if (!this.defaults) {
/* -*- file: #156 -*- */
return
};
/* -*- file: #157 -*- */
for (var i_$2 = 0;i_$2 < this.defaults.length;i_$2++) {
/* -*- file: #157 -*- */
/* -*- file: #158 -*- */
if (this.defaults[i_$2] == who_$1) {
/* -*- file: #158 -*- */
/* -*- file: #159 -*- */
this.defaults.splice(i_$2, 1);
this.checkDefault(Debug.evalCarefully("base/componentmanager.lzx", 160, function  () {
/* -*- file: #160 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus());
/* -*- file: base/componentmanager.lzx#161.21 -*- */
return
}}}}
/* -*- file:  -*- */
, "$lzc$handle_onfocus_reference$$base$2Fcomponentmanager$2Elzx_167_77_$m102", function $lzc$handle_onfocus_reference$$base$2Fcomponentmanager$2Elzx_167_77_$m102 () {
with (this) {
/* -*- file: base/componentmanager.lzx#167.99 -*- */
var $lzc$reference_$1 = Debug.evalCarefully("base/componentmanager.lzx", 168, function  () {
return lz
}
/* -*- file:  -*- */
, this).Focus;
/* -*- file: base/componentmanager.lzx#171.1 -*- */
if (Debug.evalCarefully("base/componentmanager.lzx", 171, function  () {
/* -*- file: #171 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)["$lzsc$isa"] ? Debug.evalCarefully("base/componentmanager.lzx", 171, function  () {
/* -*- file: base/componentmanager.lzx#171.69 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this).$lzsc$isa($lzc$reference_$1) : $lzc$reference_$1 instanceof Debug.evalCarefully("base/componentmanager.lzx", 171, function  () {
/* -*- file: base/componentmanager.lzx#171.69 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/componentmanager.lzx#171.36 -*- */
/* -*- file: #172 -*- */
return $lzc$reference_$1
} else {
/* -*- file: #173 -*- */
/* -*- file: #174 -*- */
Debug.evalCarefully("base/componentmanager.lzx", 174, function  () {
/* -*- file: #174 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("Invalid event sender: lz.Focus => %w (for event onfocus)", $lzc$reference_$1)
}}}
, "checkDefault", function checkDefault (who_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#171.13 -*- */
if (!(who_$1 instanceof Debug.evalCarefully("base/componentmanager.lzx", 171, function  () {
/* -*- file: #171 -*- */
return lz
}
/* -*- file:  -*- */
, this).basecomponent) || !who_$1.doesenter) {
/* -*- file: base/componentmanager.lzx#172.35 -*- */
/* -*- file: #174 -*- */
if (who_$1 instanceof Debug.evalCarefully("base/componentmanager.lzx", 174, function  () {
/* -*- file: #174 -*- */
return lz
}
/* -*- file:  -*- */
, this).inputtext && who_$1.multiline) {
/* -*- file: base/componentmanager.lzx#175.39 -*- */
/* -*- file: #176 -*- */
who_$1 = null
} else {
/* -*- file: #177 -*- */
/* -*- file: #178 -*- */
who_$1 = this.findClosestDefault(who_$1)
}};
/* -*- file: #182 -*- */
if (who_$1 == this.currentdefault) {
/* -*- file: #182 -*- */
return
};
if (this.currentdefault) {
/* -*- file: #184 -*- */
/* -*- file: #185 -*- */
this.currentdefault.setAttribute("hasdefault", false)
};
/* -*- file: #188 -*- */
this.currentdefault = who_$1;
/* -*- file: #190 -*- */
if (who_$1) {
/* -*- file: #190 -*- */
/* -*- file: #191 -*- */
who_$1.setAttribute("hasdefault", true)
}}}
/* -*- file:  -*- */
, "$lzc$handle_onmode_reference$$base$2Fcomponentmanager$2Elzx_196_75_$m103", function $lzc$handle_onmode_reference$$base$2Fcomponentmanager$2Elzx_196_75_$m103 () {
with (this) {
/* -*- file: base/componentmanager.lzx#196.84 -*- */
var $lzc$reference_$1 = Debug.evalCarefully("base/componentmanager.lzx", 197, function  () {
return lz
}
/* -*- file:  -*- */
, this).ModeManager;
/* -*- file: base/componentmanager.lzx#200.1 -*- */
if (Debug.evalCarefully("base/componentmanager.lzx", 200, function  () {
/* -*- file: #200 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)["$lzsc$isa"] ? Debug.evalCarefully("base/componentmanager.lzx", 200, function  () {
/* -*- file: base/componentmanager.lzx#200.69 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this).$lzsc$isa($lzc$reference_$1) : $lzc$reference_$1 instanceof Debug.evalCarefully("base/componentmanager.lzx", 200, function  () {
/* -*- file: base/componentmanager.lzx#200.69 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/componentmanager.lzx#200.36 -*- */
/* -*- file: #201 -*- */
return $lzc$reference_$1
} else {
/* -*- file: #202 -*- */
/* -*- file: #203 -*- */
Debug.evalCarefully("base/componentmanager.lzx", 203, function  () {
/* -*- file: #203 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("Invalid event sender: lz.ModeManager => %w (for event onmode)", $lzc$reference_$1)
}}}
, "$lzc$handle_onmode$$base$2Fcomponentmanager$2Elzx_196_75_$m103", function $lzc$handle_onmode$$base$2Fcomponentmanager$2Elzx_196_75_$m103 (who_$1) {
with (this) {
/* -*- file: base/componentmanager.lzx#208.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #209 -*- */
who_$1 = null
};
/* -*- file: #201 -*- */
if (Debug.evalCarefully("base/componentmanager.lzx", 201, function  () {
/* -*- file: #201 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus() == null) {
/* -*- file: base/componentmanager.lzx#201.47 -*- */
/* -*- file: #202 -*- */
this.checkDefault(null)
}}}
/* -*- file:  -*- */
, "setDefaultStyle", function setDefaultStyle (def_$1) {
/* -*- file: base/componentmanager.lzx#207.13 -*- */
this.defaultstyle = def_$1;
if (this.ondefaultstyle) {
/* -*- file: #208 -*- */
this.ondefaultstyle.sendEvent(def_$1)
}}
/* -*- file:  -*- */
, "getDefaultStyle", function getDefaultStyle () {
with (this) {
/* -*- file: base/componentmanager.lzx#212.13 -*- */
if (this.defaultstyle == null) {
/* -*- file: #212 -*- */
/* -*- file: #213 -*- */
this.defaultstyle = new (Debug.evalCarefully("base/componentmanager.lzx", 213, function  () {
/* -*- file: #213 -*- */
return lz
}
/* -*- file:  -*- */
, this).style)(Debug.evalCarefully("base/componentmanager.lzx", 213, function  () {
/* -*- file: base/componentmanager.lzx#213.69 -*- */
return canvas
}
/* -*- file:  -*- */
, this), {isdefault: true})
};
/* -*- file: base/componentmanager.lzx#215.13 -*- */
return this.defaultstyle
}}
/* -*- file:  -*- */
], ["tagname", "_componentmanager", "attributes", new LzInheritedHash(LzNode.attributes)]);
/* -*- file: base/componentmanager.lzx#12.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/componentmanager.lzx#13.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #13 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #13 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 221, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onkeydown", "dispatchKeyDown", "$lzc$handle_onkeydown_reference$$base$2Fcomponentmanager$2Elzx_61_82_$m101", "onfocus", "checkDefault", "$lzc$handle_onfocus_reference$$base$2Fcomponentmanager$2Elzx_167_77_$m102", "onmode", "$lzc$handle_onmode$$base$2Fcomponentmanager$2Elzx_196_75_$m103", "$lzc$handle_onmode_reference$$base$2Fcomponentmanager$2Elzx_196_75_$m103"], _dbg_filename: "base/componentmanager.lzx", _dbg_lineno: 13, _lastkeydown: 0, currentdefault: null, defaults: null, defaultstyle: null, focusclass: "focusoverlay", keyhandlers: null, lastedown: null, lastsdown: null, ondefaultstyle: Debug.evalCarefully("base/componentmanager.lzx", 38, function  () {
/* -*- file: base/componentmanager.lzx#38.68 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), upkeydel: null}, Debug.evalCarefully("", 64, function  () {
return $lzc$class__componentmanager
}
, this).attributes)
}}}
;
/* -*- file: base/componentmanager.lzx#13.40 -*- */
$lzsc$temp._dbg_name = "base/componentmanager.lzx#13/1";
/* -*- file: #13 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class__componentmanager);
/* -*- file: base/style.lzx#7.1 -*- */
/* -*- file: #8 -*- */
/* -*- file: #7 -*- */
Class.make("$lzc$class_style", LzNode, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "isstyle", void 0, "$lzc$bind_canvascolor$$base$2Fstyle$2Elzx_16_62_$m107", function $lzc$bind_canvascolor$$base$2Fstyle$2Elzx_16_62_$m107 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("canvascolor", Debug.evalCarefully("", 16, function  () {
return LzColorUtils
}
, this).convertColor("null"))
}}
, "canvascolor", void 0, "$lzc$set_canvascolor", function $lzc$set_canvascolor (canvascolor_$1) {
with (this) {
/* -*- file: base/style.lzx#16.67 -*- */
setCanvasColor(canvascolor_$1)
}}
/* -*- file:  -*- */
, "$lzc$bind_textcolor$$base$2Fstyle$2Elzx_20_71_$m108", function $lzc$bind_textcolor$$base$2Fstyle$2Elzx_20_71_$m108 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("textcolor", Debug.evalCarefully("", 20, function  () {
return LzColorUtils
}
, this).convertColor("gray10"))
}}
, "textcolor", void 0, "$lzc$set_textcolor", function $lzc$set_textcolor (textcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#20.98 -*- */
setStyleAttr(textcolor_$1, "textcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_textfieldcolor$$base$2Fstyle$2Elzx_24_81_$m109", function $lzc$bind_textfieldcolor$$base$2Fstyle$2Elzx_24_81_$m109 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("textfieldcolor", Debug.evalCarefully("", 24, function  () {
return LzColorUtils
}
, this).convertColor("white"))
}}
, "textfieldcolor", void 0, "$lzc$set_textfieldcolor", function $lzc$set_textfieldcolor (textfieldcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#24.206 -*- */
setStyleAttr(textfieldcolor_$1, "textfieldcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_texthilitecolor$$base$2Fstyle$2Elzx_29_82_$m110", function $lzc$bind_texthilitecolor$$base$2Fstyle$2Elzx_29_82_$m110 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("texthilitecolor", Debug.evalCarefully("", 29, function  () {
return LzColorUtils
}
, this).convertColor("iceblue1"))
}}
, "texthilitecolor", void 0, "$lzc$set_texthilitecolor", function $lzc$set_texthilitecolor (texthilitecolor_$1) {
with (this) {
/* -*- file: base/style.lzx#29.85 -*- */
setStyleAttr(texthilitecolor_$1, "texthilitecolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_textselectedcolor$$base$2Fstyle$2Elzx_34_86_$m111", function $lzc$bind_textselectedcolor$$base$2Fstyle$2Elzx_34_86_$m111 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("textselectedcolor", Debug.evalCarefully("", 34, function  () {
return LzColorUtils
}
, this).convertColor("black"))
}}
, "textselectedcolor", void 0, "$lzc$set_textselectedcolor", function $lzc$set_textselectedcolor (textselectedcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#34.89 -*- */
setStyleAttr(textselectedcolor_$1, "textselectedcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_textdisabledcolor$$base$2Fstyle$2Elzx_38_86_$m112", function $lzc$bind_textdisabledcolor$$base$2Fstyle$2Elzx_38_86_$m112 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("textdisabledcolor", Debug.evalCarefully("", 38, function  () {
return LzColorUtils
}
, this).convertColor("gray60"))
}}
, "textdisabledcolor", void 0, "$lzc$set_textdisabledcolor", function $lzc$set_textdisabledcolor (textdisabledcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#38.91 -*- */
setStyleAttr(textdisabledcolor_$1, "textdisabledcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_basecolor$$base$2Fstyle$2Elzx_43_70_$m113", function $lzc$bind_basecolor$$base$2Fstyle$2Elzx_43_70_$m113 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("basecolor", Debug.evalCarefully("", 43, function  () {
return LzColorUtils
}
, this).convertColor("offwhite"))
}}
, "basecolor", void 0, "$lzc$set_basecolor", function $lzc$set_basecolor (basecolor_$1) {
with (this) {
/* -*- file: base/style.lzx#43.81 -*- */
setStyleAttr(basecolor_$1, "basecolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_bgcolor$$base$2Fstyle$2Elzx_49_66_$m114", function $lzc$bind_bgcolor$$base$2Fstyle$2Elzx_49_66_$m114 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("bgcolor", Debug.evalCarefully("", 49, function  () {
return LzColorUtils
}
, this).convertColor("white"))
}}
, "bgcolor", void 0, "$lzc$set_bgcolor", function $lzc$set_bgcolor (bgcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#49.370 -*- */
setStyleAttr(bgcolor_$1, "bgcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_hilitecolor$$base$2Fstyle$2Elzx_54_75_$m115", function $lzc$bind_hilitecolor$$base$2Fstyle$2Elzx_54_75_$m115 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("hilitecolor", Debug.evalCarefully("", 54, function  () {
return LzColorUtils
}
, this).convertColor("iceblue4"))
}}
, "hilitecolor", void 0, "$lzc$set_hilitecolor", function $lzc$set_hilitecolor (hilitecolor_$1) {
with (this) {
/* -*- file: base/style.lzx#54.170 -*- */
setStyleAttr(hilitecolor_$1, "hilitecolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_selectedcolor$$base$2Fstyle$2Elzx_58_79_$m116", function $lzc$bind_selectedcolor$$base$2Fstyle$2Elzx_58_79_$m116 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("selectedcolor", Debug.evalCarefully("", 58, function  () {
return LzColorUtils
}
, this).convertColor("iceblue3"))
}}
, "selectedcolor", void 0, "$lzc$set_selectedcolor", function $lzc$set_selectedcolor (selectedcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#58.131 -*- */
setStyleAttr(selectedcolor_$1, "selectedcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_disabledcolor$$base$2Fstyle$2Elzx_62_79_$m117", function $lzc$bind_disabledcolor$$base$2Fstyle$2Elzx_62_79_$m117 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("disabledcolor", Debug.evalCarefully("", 62, function  () {
return LzColorUtils
}
, this).convertColor("gray30"))
}}
, "disabledcolor", void 0, "$lzc$set_disabledcolor", function $lzc$set_disabledcolor (disabledcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#62.81 -*- */
setStyleAttr(disabledcolor_$1, "disabledcolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_bordercolor$$base$2Fstyle$2Elzx_67_74_$m118", function $lzc$bind_bordercolor$$base$2Fstyle$2Elzx_67_74_$m118 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("bordercolor", Debug.evalCarefully("", 67, function  () {
return LzColorUtils
}
, this).convertColor("gray40"))
}}
, "bordercolor", void 0, "$lzc$set_bordercolor", function $lzc$set_bordercolor (bordercolor_$1) {
with (this) {
/* -*- file: base/style.lzx#67.225 -*- */
setStyleAttr(bordercolor_$1, "bordercolor")
}}
/* -*- file:  -*- */
, "$lzc$bind_bordersize$$base$2Fstyle$2Elzx_72_59_$m119", function $lzc$bind_bordersize$$base$2Fstyle$2Elzx_72_59_$m119 ($lzc$ignore_$1) {
this.setAttribute("bordersize", 1)
}
, "bordersize", void 0, "$lzc$set_bordersize", function $lzc$set_bordersize (bordersize_$1) {
with (this) {
/* -*- file: base/style.lzx#72.204 -*- */
setStyleAttr(bordersize_$1, "bordersize")
}}
/* -*- file:  -*- */
, "$lzc$bind_menuitembgcolor$$base$2Fstyle$2Elzx_76_23_$m120", function $lzc$bind_menuitembgcolor$$base$2Fstyle$2Elzx_76_23_$m120 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("menuitembgcolor", Debug.evalCarefully("", 76, function  () {
return textfieldcolor
}
, this))
}}
, "menuitembgcolor", void 0, "isdefault", void 0, "$lzc$set_isdefault", function $lzc$set_isdefault (isdefault_$1) {
with (this) {
/* -*- file: base/style.lzx#79.82 -*- */
_setdefault(isdefault_$1)
}}
/* -*- file:  -*- */
, "onisdefault", void 0, "_setdefault", function _setdefault (def_$1) {
with (this) {
/* -*- file: base/style.lzx#87.9 -*- */
this.isdefault = def_$1;
if (Debug.evalCarefully("base/style.lzx", 88, function  () {
/* -*- file: #88 -*- */
return isdefault
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/style.lzx#88.24 -*- */
/* -*- file: #89 -*- */
Debug.evalCarefully("base/style.lzx", 89, function  () {
/* -*- file: #89 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.setDefaultStyle(this);
/* -*- file: base/style.lzx#90.13 -*- */
if (this["canvascolor"] != null) {
/* -*- file: #90 -*- */
/* -*- file: #91 -*- */
Debug.evalCarefully("base/style.lzx", 91, function  () {
/* -*- file: #91 -*- */
return canvas
}
/* -*- file:  -*- */
, this).setAttribute("bgcolor", this.canvascolor)
}};
/* -*- file: base/style.lzx#94.9 -*- */
if (this.onisdefault) {
/* -*- file: #94 -*- */
this.onisdefault.sendEvent(this)
}}}
/* -*- file:  -*- */
, "onstylechanged", void 0, "setStyleAttr", function setStyleAttr (val_$1, prop_$2) {
/* -*- file: base/style.lzx#103.9 -*- */
this[prop_$2] = val_$1;
if (this["on" + prop_$2]) {
/* -*- file: #104 -*- */
this["on" + prop_$2].sendEvent(prop_$2)
};
/* -*- file: #105 -*- */
if (this.onstylechanged) {
/* -*- file: #105 -*- */
this.onstylechanged.sendEvent(this)
}}
/* -*- file:  -*- */
, "setCanvasColor", function setCanvasColor (newcolor_$1) {
with (this) {
/* -*- file: base/style.lzx#111.13 -*- */
if (this.isdefault && newcolor_$1 != null) {
/* -*- file: #111 -*- */
Debug.evalCarefully("base/style.lzx", 111, function  () {
/* -*- file: #111 -*- */
return canvas
}
/* -*- file:  -*- */
, this).setAttribute("bgcolor", newcolor_$1)
};
/* -*- file: base/style.lzx#112.13 -*- */
this.canvascolor = newcolor_$1;
if (this.onstylechanged) {
/* -*- file: #113 -*- */
this.onstylechanged.sendEvent(this)
}}}
/* -*- file:  -*- */
, "extend", function extend (args_$1) {
with (this) {
/* -*- file: base/style.lzx#121.9 -*- */
var temp_$2 = new (Debug.evalCarefully("base/style.lzx", 121, function  () {
/* -*- file: #121 -*- */
return lz
}
/* -*- file:  -*- */
, this).style)();
/* -*- file: base/style.lzx#123.9 -*- */
temp_$2.canvascolor = this.canvascolor;
temp_$2.textcolor = this.textcolor;
temp_$2.textfieldcolor = this.textfieldcolor;
temp_$2.texthilitecolor = this.texthilitecolor;
temp_$2.textselectedcolor = this.textselectedcolor;
temp_$2.textdisabledcolor = this.textdisabledcolor;
temp_$2.basecolor = this.basecolor;
temp_$2.bgcolor = this.bgcolor;
temp_$2.hilitecolor = this.hilitecolor;
temp_$2.selectedcolor = this.selectedcolor;
temp_$2.disabledcolor = this.disabledcolor;
temp_$2.bordercolor = this.bordercolor;
temp_$2.bordersize = this.bordersize;
temp_$2.menuitembgcolor = this.menuitembgcolor;
temp_$2.isdefault = this.isdefault;
/* -*- file: #139 -*- */
for (var p_$3 in args_$1) {
/* -*- file: #139 -*- */
/* -*- file: #140 -*- */
temp_$2[p_$3] = args_$1[p_$3]
};
/* -*- file: #143 -*- */
new (Debug.evalCarefully("base/style.lzx", 143, function  () {
/* -*- file: #143 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(temp_$2, "_forwardstylechanged", this, "onstylechanged");
/* -*- file: base/style.lzx#144.9 -*- */
return temp_$2
}}
/* -*- file:  -*- */
, "_forwardstylechanged", function _forwardstylechanged (v_$1) {
/* -*- file: base/style.lzx#151.9 -*- */
if (this.onstylechanged) {
/* -*- file: #151 -*- */
this.onstylechanged.sendEvent(this)
}}
/* -*- file:  -*- */
], ["tagname", "style", "attributes", new LzInheritedHash(LzNode.attributes)]);
/* -*- file: base/style.lzx#7.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/style.lzx#8.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #8 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #8 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 157, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/style.lzx", _dbg_lineno: 8, basecolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_basecolor$$base$2Fstyle$2Elzx_43_70_$m113"), bgcolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_bgcolor$$base$2Fstyle$2Elzx_49_66_$m114"), bordercolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_bordercolor$$base$2Fstyle$2Elzx_67_74_$m118"), bordersize: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_bordersize$$base$2Fstyle$2Elzx_72_59_$m119"), canvascolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_canvascolor$$base$2Fstyle$2Elzx_16_62_$m107"), disabledcolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_disabledcolor$$base$2Fstyle$2Elzx_62_79_$m117"), hilitecolor: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_hilitecolor$$base$2Fstyle$2Elzx_54_75_$m115"), isdefault: false, isstyle: true, menuitembgcolor: new (Debug.evalCarefully("", 15, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_menuitembgcolor$$base$2Fstyle$2Elzx_76_23_$m120"), onisdefault: Debug.evalCarefully("base/style.lzx", 82, function  () {
/* -*- file: base/style.lzx#82.57 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onstylechanged: Debug.evalCarefully("base/style.lzx", 98, function  () {
/* -*- file: base/style.lzx#98.57 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), selectedcolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_selectedcolor$$base$2Fstyle$2Elzx_58_79_$m116"), textcolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_textcolor$$base$2Fstyle$2Elzx_20_71_$m108"), textdisabledcolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_textdisabledcolor$$base$2Fstyle$2Elzx_38_86_$m112"), textfieldcolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_textfieldcolor$$base$2Fstyle$2Elzx_24_81_$m109"), texthilitecolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_texthilitecolor$$base$2Fstyle$2Elzx_29_82_$m110"), textselectedcolor: new (Debug.evalCarefully("", 102, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_textselectedcolor$$base$2Fstyle$2Elzx_34_86_$m111")}, Debug.evalCarefully("", 102, function  () {
return $lzc$class_style
}
, this).attributes)
}}}
;
/* -*- file: base/style.lzx#8.40 -*- */
$lzsc$temp._dbg_name = "base/style.lzx#8/1";
/* -*- file: #8 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_style);
/* -*- file: base/style.lzx#245.18 -*- */
canvas.LzInstantiateView({"class": lz.script, attrs: {script: (function  () {
/* -*- file: #245 -*- */
var $lzsc$temp = function  () {
/* -*- file: -*- */
/* -*- file: base/style.lzx#247.1 -*- */
Debug.evalCarefully("base/style.lzx", 247, function  () {
/* -*- file: #247 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service = new (Debug.evalCarefully("base/style.lzx", 247, function  () {
/* -*- file: base/style.lzx#247.58 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager)(Debug.evalCarefully("base/style.lzx", 247, function  () {
/* -*- file: base/style.lzx#247.58 -*- */
return canvas
}
/* -*- file:  -*- */
, this), null, null, true)
}
;
/* -*- file: base/style.lzx#245.40 -*- */
$lzsc$temp._dbg_name = "base/style.lzx#245/80";
/* -*- file: #245 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()}}, 1);
/* -*- file: base/basecomponent.lzx#7.1 -*- */
/* -*- file: #8 -*- */
/* -*- file: #7 -*- */
Class.make("$lzc$class_statictext", LzText, ["_dbg_filename", void 0, "_dbg_lineno", void 0], ["tagname", "statictext", "attributes", new LzInheritedHash(LzText.attributes)]);
/* -*- file: #7 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/basecomponent.lzx#8.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #8 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #8 -*- */
/* -*- file: -*- */
/* -*- file: base/basecomponent.lzx#13.1 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 13, function  () {
/* -*- file: #13 -*- */
return LzNode
}
/* -*- file:  -*- */
, this).mergeAttributes({_dbg_filename: "base/basecomponent.lzx", _dbg_lineno: 8}, Debug.evalCarefully("", 12, function  () {
return $lzc$class_statictext
}
, this).attributes)
}}}
;
/* -*- file: base/basecomponent.lzx#8.40 -*- */
$lzsc$temp._dbg_name = "base/basecomponent.lzx#8/1";
/* -*- file: #8 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_statictext);
/* -*- file: base/basecomponent.lzx#34.1 -*- */
/* -*- file: #35 -*- */
/* -*- file: #34 -*- */
Class.make("$lzc$class_basecomponent", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "enabled", void 0, "$lzc$set_focusable", function $lzc$set_focusable (focusable_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/basecomponent.lzx#46.85 -*- */
_setFocusable(focusable_$1)
}}
/* -*- file:  -*- */
, "_focusable", void 0, "onfocusable", void 0, "text", void 0, "doesenter", void 0, "$lzc$set_doesenter", function $lzc$set_doesenter (doesenter_$1) {
/* -*- file: base/basecomponent.lzx#64.65 -*- */
this._setDoesEnter(doesenter_$1)
}
/* -*- file:  -*- */
, "$lzc$bind__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134", function $lzc$bind__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134 ($lzc$ignore_$1) {
this.setAttribute("_enabled", this.enabled && (this._parentcomponent ? this._parentcomponent._enabled : true))
}
, "$lzc$dependencies__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134", function $lzc$dependencies__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134 () {
return [this, "enabled", this, "_parentcomponent", this._parentcomponent, "_enabled"]
}
, "_enabled", void 0, "$lzc$set__enabled", function $lzc$set__enabled (_enabled_$1) {
/* -*- file: base/basecomponent.lzx#75.58 -*- */
this._setEnabled(_enabled_$1)
}
/* -*- file:  -*- */
, "_parentcomponent", void 0, "_initcomplete", void 0, "isdefault", void 0, "$lzc$set_isdefault", function $lzc$set_isdefault (isdefault_$1) {
/* -*- file: base/basecomponent.lzx#92.129 -*- */
this._setIsDefault(isdefault_$1)
}
/* -*- file:  -*- */
, "onisdefault", void 0, "hasdefault", void 0, "_setEnabled", function _setEnabled (isEnabled_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#104.13 -*- */
this._enabled = isEnabled_$1;
var newFocusable_$2 = this._enabled && this._focusable;
if (newFocusable_$2 != this.focusable) {
/* -*- file: #106 -*- */
/* -*- file: #107 -*- */
this.focusable = newFocusable_$2;
if (this.onfocusable.ready) {
/* -*- file: #108 -*- */
this.onfocusable.sendEvent()
}};
if (Debug.evalCarefully("base/basecomponent.lzx", 110, function  () {
/* -*- file: #110 -*- */
return _initcomplete
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basecomponent.lzx#110.32 -*- */
_showEnabled()
};
/* -*- file: #111 -*- */
if (this.on_enabled.ready) {
/* -*- file: #111 -*- */
this.on_enabled.sendEvent()
}}}
/* -*- file:  -*- */
, "_setFocusable", function _setFocusable (isFocusable_$1) {
/* -*- file: base/basecomponent.lzx#117.13 -*- */
this._focusable = isFocusable_$1;
if (this.enabled) {
/* -*- file: #118 -*- */
/* -*- file: #119 -*- */
this.focusable = this._focusable;
if (this.onfocusable.ready) {
/* -*- file: #120 -*- */
this.onfocusable.sendEvent()
}} else {
/* -*- file: #121 -*- */
/* -*- file: #122 -*- */
this.focusable = false
}}
/* -*- file:  -*- */
, "construct", function construct (parent_$1, args_$2) {
with (this) {
/* -*- file: base/basecomponent.lzx#129.13 -*- */
/* -*- file: #128 -*- */
/* -*- file: #129 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["construct"] : this.nextMethod(arguments.callee, "construct")).call(this, parent_$1, args_$2);
/* -*- file: #132 -*- */
var p_$3 = this.immediateparent;
while (p_$3 != Debug.evalCarefully("base/basecomponent.lzx", 133, function  () {
/* -*- file: #133 -*- */
return canvas
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basecomponent.lzx#133.33 -*- */
/* -*- file: #134 -*- */
if (p_$3 instanceof Debug.evalCarefully("base/basecomponent.lzx", 134, function  () {
/* -*- file: #134 -*- */
return lz
}
/* -*- file:  -*- */
, this).basecomponent) {
/* -*- file: base/basecomponent.lzx#134.52 -*- */
/* -*- file: #135 -*- */
this._parentcomponent = p_$3;
break
};
p_$3 = p_$3.immediateparent
}}}
/* -*- file:  -*- */
, "init", function init () {
with (this) {
/* -*- file: base/basecomponent.lzx#145.13 -*- */
/* -*- file: #144 -*- */
/* -*- file: #145 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["init"] : this.nextMethod(arguments.callee, "init")).call(this);
this._initcomplete = true;
this._mousedownDel = new (Debug.evalCarefully("base/basecomponent.lzx", 147, function  () {
/* -*- file: #147 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "_doMousedown", this, "onmousedown");
/* -*- file: base/basecomponent.lzx#150.13 -*- */
if (this.styleable) {
/* -*- file: #150 -*- */
/* -*- file: #151 -*- */
_usestyle()
};
if (!this["_enabled"]) {
/* -*- file: #153 -*- */
_showEnabled()
}}}
/* -*- file:  -*- */
, "_doMousedown", function _doMousedown (e_$1) {

}
, "doSpaceDown", function doSpaceDown () {
/* -*- file: base/basecomponent.lzx#164.13 -*- */
return false
}
/* -*- file:  -*- */
, "doSpaceUp", function doSpaceUp () {
/* -*- file: base/basecomponent.lzx#170.13 -*- */
return false
}
/* -*- file:  -*- */
, "doEnterDown", function doEnterDown () {
/* -*- file: base/basecomponent.lzx#176.13 -*- */
return false
}
/* -*- file:  -*- */
, "doEnterUp", function doEnterUp () {
/* -*- file: base/basecomponent.lzx#182.13 -*- */
return false
}
/* -*- file:  -*- */
, "_setIsDefault", function _setIsDefault (def_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#190.13 -*- */
this.isdefault = this["isdefault"] == true;
/* -*- file: #192 -*- */
if (this.isdefault == def_$1) {
/* -*- file: #192 -*- */
return
};
if (def_$1) {
/* -*- file: #194 -*- */
/* -*- file: #195 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 195, function  () {
/* -*- file: #195 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.makeDefault(this)
} else {
/* -*- file: base/basecomponent.lzx#196.20 -*- */
/* -*- file: #197 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 197, function  () {
/* -*- file: #197 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.unmakeDefault(this)
};
/* -*- file: base/basecomponent.lzx#200.13 -*- */
this.isdefault = def_$1;
if (this.onisdefault.ready) {
/* -*- file: #201 -*- */
/* -*- file: #202 -*- */
this.onisdefault.sendEvent(def_$1)
}}}
/* -*- file:  -*- */
, "_setDoesEnter", function _setDoesEnter (doe_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#208.13 -*- */
this.doesenter = doe_$1;
if (Debug.evalCarefully("base/basecomponent.lzx", 209, function  () {
/* -*- file: #209 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus() == this) {
/* -*- file: base/basecomponent.lzx#209.48 -*- */
/* -*- file: #210 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 210, function  () {
/* -*- file: #210 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.checkDefault(this)
}}}
, "updateDefault", function updateDefault () {
with (this) {
/* -*- file: base/basecomponent.lzx#217.1 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 217, function  () {
/* -*- file: #217 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.checkDefault(Debug.evalCarefully("base/basecomponent.lzx", 217, function  () {
/* -*- file: base/basecomponent.lzx#217.66 -*- */
return lz
}
/* -*- file:  -*- */
, this).Focus.getFocus())
}}
, "$lzc$bind_style$$base$2Fbasecomponent$2Elzx_224_80_$m140", function $lzc$bind_style$$base$2Fbasecomponent$2Elzx_224_80_$m140 ($lzc$ignore_$1) {
this.setAttribute("style", null)
}
, "style", void 0, "$lzc$set_style", function $lzc$set_style (style_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#224.1 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 224, function  () {
/* -*- file: #224 -*- */
return styleable
}
/* -*- file:  -*- */
, this) ? setStyle(style_$1) : (this.style = null)
}}
, "styleable", void 0, "_style", void 0, "onstyle", void 0, "_styledel", void 0, "_otherstyledel", void 0, "setStyle", function setStyle (s_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#244.13 -*- */
if (!Debug.evalCarefully("base/basecomponent.lzx", 244, function  () {
/* -*- file: #244 -*- */
return styleable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basecomponent.lzx#244.29 -*- */
return
};
/* -*- file: #247 -*- */
if (s_$1 != null && !s_$1["isstyle"]) {
/* -*- file: #247 -*- */
/* -*- file: #248 -*- */
var old_style_$2 = this._style;
if (!old_style_$2) {
/* -*- file: #249 -*- */
/* -*- file: #250 -*- */
if (this._parentcomponent) {
/* -*- file: #250 -*- */
old_style_$2 = this._parentcomponent.style
} else {
/* -*- file: #251 -*- */
old_style_$2 = Debug.evalCarefully("base/basecomponent.lzx", 251, function  () {
/* -*- file: #251 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.getDefaultStyle()
}};
/* -*- file: base/basecomponent.lzx#253.17 -*- */
s_$1 = old_style_$2.extend(s_$1)
};
this._style = s_$1;
/* -*- file: #257 -*- */
if (s_$1 == null) {
/* -*- file: #257 -*- */
/* -*- file: #258 -*- */
if (!this._otherstyledel) {
/* -*- file: #258 -*- */
/* -*- file: #259 -*- */
this._otherstyledel = new (Debug.evalCarefully("base/basecomponent.lzx", 259, function  () {
/* -*- file: #259 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "_setstyle")
} else {
/* -*- file: base/basecomponent.lzx#260.24 -*- */
/* -*- file: #261 -*- */
this._otherstyledel.unregisterAll()
};
/* -*- file: #264 -*- */
if (this._parentcomponent && this._parentcomponent.styleable) {
/* -*- file: #264 -*- */
/* -*- file: #265 -*- */
this._otherstyledel.register(this._parentcomponent, "onstyle");
/* -*- file: #267 -*- */
s_$1 = this._parentcomponent.style
} else {
/* -*- file: #268 -*- */
/* -*- file: #269 -*- */
this._otherstyledel.register(Debug.evalCarefully("base/basecomponent.lzx", 269, function  () {
/* -*- file: #269 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service, "ondefaultstyle");
/* -*- file: base/basecomponent.lzx#271.21 -*- */
s_$1 = Debug.evalCarefully("base/basecomponent.lzx", 271, function  () {
/* -*- file: #271 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.getDefaultStyle()
}} else {
/* -*- file: base/basecomponent.lzx#273.20 -*- */
if (this._otherstyledel) {
/* -*- file: #273 -*- */
/* -*- file: #274 -*- */
this._otherstyledel.unregisterAll();
this._otherstyledel = null
}};
_setstyle(s_$1)
}}
/* -*- file:  -*- */
, "_usestyle", function _usestyle (e_$1) {
/* -*- file: base/basecomponent.lzx#284.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #285 -*- */
e_$1 = null
};
/* -*- file: #284 -*- */
if (this._initcomplete && this["style"] && this.style.isinited) {
/* -*- file: #284 -*- */
/* -*- file: #288 -*- */
this._applystyle(this.style)
}}
/* -*- file:  -*- */
, "_setstyle", function _setstyle (s_$1) {
with (this) {
/* -*- file: base/basecomponent.lzx#296.13 -*- */
if (!this._styledel) {
/* -*- file: #296 -*- */
/* -*- file: #297 -*- */
this._styledel = new (Debug.evalCarefully("base/basecomponent.lzx", 297, function  () {
/* -*- file: #297 -*- */
return LzDelegate
}
/* -*- file:  -*- */
, this))(this, "_usestyle")
} else {
/* -*- file: base/basecomponent.lzx#298.20 -*- */
/* -*- file: #299 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 299, function  () {
/* -*- file: #299 -*- */
return _styledel
}
/* -*- file:  -*- */
, this).unregisterAll()
};
/* -*- file: base/basecomponent.lzx#301.13 -*- */
if (s_$1) {
/* -*- file: #301 -*- */
/* -*- file: #302 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 302, function  () {
/* -*- file: #302 -*- */
return _styledel
}
/* -*- file:  -*- */
, this).register(s_$1, "onstylechanged")
};
/* -*- file: base/basecomponent.lzx#305.13 -*- */
this.style = s_$1;
_usestyle();
if (this.onstyle.ready) {
/* -*- file: #307 -*- */
this.onstyle.sendEvent(this.style)
}}}
/* -*- file:  -*- */
, "_applystyle", function _applystyle (s_$1) {

}
, "setTint", function setTint (v_$1, color_$2, brightness_$3) {
with (this) {
/* -*- file: base/basecomponent.lzx#320.14 -*- */
switch (arguments.length) {
case 2:
/* -*- file: #321 -*- */
brightness_$3 = 0
};
/* -*- file: #328 -*- */
if (v_$1.capabilities.colortransform) {
/* -*- file: #328 -*- */
/* -*- file: #329 -*- */
if (color_$2 != "" && color_$2 != null) {
/* -*- file: #329 -*- */
/* -*- file: #330 -*- */
var rgb_$4 = color_$2;
var red_$5 = rgb_$4 >> 16 & 255;
var green_$6 = rgb_$4 >> 8 & 255;
var blue_$7 = rgb_$4 & 255;
/* -*- file: #335 -*- */
red_$5 += 51;
green_$6 += 51;
blue_$7 += 51;
/* -*- file: #339 -*- */
red_$5 = red_$5 / 255 * 100;
green_$6 = green_$6 / 255 * 100;
blue_$7 = blue_$7 / 255 * 100;
/* -*- file: #343 -*- */
v_$1.setColorTransform({ra: red_$5, ga: green_$6, ba: blue_$7, rb: brightness_$3, gb: brightness_$3, bb: brightness_$3})
}}}}
/* -*- file:  -*- */
, "on_enabled", void 0, "_showEnabled", function _showEnabled () {

}
, "acceptValue", function acceptValue (data_$1, type_$2) {
/* -*- file: base/basecomponent.lzx#365.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #366 -*- */
type_$2 = null
};
/* -*- file: #373 -*- */
this.setAttribute("text", data_$1)
}
/* -*- file:  -*- */
, "presentValue", function presentValue (type_$1) {
/* -*- file: base/basecomponent.lzx#379.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #380 -*- */
type_$1 = null
};
/* -*- file: #387 -*- */
return this.text
}
/* -*- file:  -*- */
, "$lzc$presentValue_dependencies", function $lzc$presentValue_dependencies (who_$1, self_$2, type_$3) {
/* -*- file: base/basecomponent.lzx#393.14 -*- */
switch (arguments.length) {
case 2:
/* -*- file: #394 -*- */
type_$3 = null
};
/* -*- file: #394 -*- */
return [this, "text"]
}
/* -*- file:  -*- */
, "applyData", function applyData (d_$1) {
/* -*- file: base/basecomponent.lzx#401.13 -*- */
this.acceptValue(d_$1)
}
/* -*- file:  -*- */
, "updateData", function updateData () {
/* -*- file: base/basecomponent.lzx#408.13 -*- */
return this.presentValue()
}
/* -*- file:  -*- */
, "destroy", function destroy () {
with (this) {
/* -*- file: base/basecomponent.lzx#414.13 -*- */
if (this["isdefault"] && this.isdefault) {
/* -*- file: #414 -*- */
/* -*- file: #415 -*- */
Debug.evalCarefully("base/basecomponent.lzx", 415, function  () {
/* -*- file: #415 -*- */
return lz
}
/* -*- file:  -*- */
, this)._componentmanager.service.unmakeDefault(this)
};
/* -*- file: base/basecomponent.lzx#417.13 -*- */
if (this._otherstyledel) {
/* -*- file: #417 -*- */
/* -*- file: #418 -*- */
this._otherstyledel.unregisterAll();
this._otherstyledel = null
};
if (this._styledel) {
/* -*- file: #421 -*- */
/* -*- file: #422 -*- */
this._styledel.unregisterAll();
this._styledel = null
};
/* -*- file: #424 -*- */
/* -*- file: #425 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["destroy"] : this.nextMethod(arguments.callee, "destroy")).call(this)
}}
/* -*- file:  -*- */
, "toString", function toString () {
/* -*- file: base/basecomponent.lzx#432.13 -*- */
var idstring_$1 = "";
var namestring_$2 = "";
var textstring_$3 = "";
if (this["id"] != null) {
/* -*- file: #435 -*- */
idstring_$1 = "  id=" + this.id
};
/* -*- file: #436 -*- */
if (this["name"] != null) {
/* -*- file: #436 -*- */
namestring_$2 = ' named "' + this.name + '"'
};
/* -*- file: #437 -*- */
if (this["text"] && this.text != "") {
/* -*- file: #437 -*- */
textstring_$3 = "  text=" + this.text
};
/* -*- file: #438 -*- */
return this.constructor.tagname + namestring_$2 + idstring_$1 + textstring_$3
}
/* -*- file:  -*- */
], ["tagname", "basecomponent", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: base/basecomponent.lzx#34.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/basecomponent.lzx#35.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #35 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #35 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 445, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/basecomponent.lzx", _dbg_lineno: 35, _enabled: new (Debug.evalCarefully("", 39, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134", "$lzc$dependencies__enabled$$base$2Fbasecomponent$2Elzx_75_57_$m134"), _focusable: true, _initcomplete: false, _otherstyledel: null, _parentcomponent: null, _style: null, _styledel: null, doesenter: false, enabled: true, focusable: true, hasdefault: false, on_enabled: Debug.evalCarefully("base/basecomponent.lzx", 352, function  () {
/* -*- file: base/basecomponent.lzx#352.66 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onfocusable: Debug.evalCarefully("base/basecomponent.lzx", 53, function  () {
/* -*- file: base/basecomponent.lzx#53.65 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onisdefault: Debug.evalCarefully("base/basecomponent.lzx", 96, function  () {
/* -*- file: base/basecomponent.lzx#96.65 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onstyle: Debug.evalCarefully("base/basecomponent.lzx", 232, function  () {
/* -*- file: base/basecomponent.lzx#232.66 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), style: new (Debug.evalCarefully("", 236, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_style$$base$2Fbasecomponent$2Elzx_224_80_$m140"), styleable: true, text: ""}, Debug.evalCarefully("", 62, function  () {
return $lzc$class_basecomponent
}
, this).attributes)
}}}
;
/* -*- file: base/basecomponent.lzx#35.40 -*- */
$lzsc$temp._dbg_name = "base/basecomponent.lzx#35/1";
/* -*- file: #35 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_basecomponent);
/* -*- file: base/basebutton.lzx#3.1 -*- */
/* -*- file: #4 -*- */
/* -*- file: #3 -*- */
Class.make("$lzc$class_basebutton", $lzc$class_basecomponent, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "normalResourceNumber", void 0, "overResourceNumber", void 0, "downResourceNumber", void 0, "disabledResourceNumber", void 0, "$lzc$bind_maxframes$$base$2Fbasebutton$2Elzx_38_84_$m155", function $lzc$bind_maxframes$$base$2Fbasebutton$2Elzx_38_84_$m155 ($lzc$ignore_$1) {
/* -*- file: -*- */
this.setAttribute("maxframes", this.totalframes)
}
, "maxframes", void 0, "resourceviewcount", void 0, "$lzc$set_resourceviewcount", function $lzc$set_resourceviewcount (resourceviewcount_$1) {
/* -*- file: base/basebutton.lzx#43.95 -*- */
this.setResourceViewCount(resourceviewcount_$1)
}
/* -*- file:  -*- */
, "respondtomouseout", void 0, "$lzc$bind_reference$$base$2Fbasebutton$2Elzx_51_96_$m158", function $lzc$bind_reference$$base$2Fbasebutton$2Elzx_51_96_$m158 ($lzc$ignore_$1) {
this.setAttribute("reference", this)
}
, "reference", void 0, "$lzc$set_reference", function $lzc$set_reference (reference_$1) {
with (this) {
/* -*- file: base/basebutton.lzx#51.109 -*- */
setreference(reference_$1)
}}
/* -*- file:  -*- */
, "onresourceviewcount", void 0, "_msdown", void 0, "_msin", void 0, "setResourceViewCount", function setResourceViewCount (rvc_$1) {
/* -*- file: base/basebutton.lzx#67.13 -*- */
this.resourceviewcount = rvc_$1;
if (this._initcomplete) {
/* -*- file: #68 -*- */
/* -*- file: #69 -*- */
if (rvc_$1 > 0) {
/* -*- file: #69 -*- */
/* -*- file: #70 -*- */
if (this.subviews) {
/* -*- file: #70 -*- */
/* -*- file: #71 -*- */
this.maxframes = this.subviews[0].totalframes;
if (this.onresourceviewcount) {
/* -*- file: #72 -*- */
/* -*- file: #73 -*- */
this.onresourceviewcount.sendEvent()
}}}}}
/* -*- file:  -*- */
, "_callShow", function _callShow () {
/* -*- file: base/basebutton.lzx#82.13 -*- */
if (this._msdown && this._msin && this.maxframes >= this.downResourceNumber) {
this.showDown()
} else {
/* -*- file: #84 -*- */
if (this._msin && this.maxframes >= this.overResourceNumber) {
this.showOver()
} else {
/* -*- file: #86 -*- */
this.showUp()
}}}
/* -*- file:  -*- */
, "$lzc$handle_onmode_reference$$base$2Fbasebutton$2Elzx_89_68_$m163", function $lzc$handle_onmode_reference$$base$2Fbasebutton$2Elzx_89_68_$m163 () {
with (this) {
/* -*- file: base/basebutton.lzx#89.71 -*- */
var $lzc$reference_$1 = Debug.evalCarefully("base/basebutton.lzx", 90, function  () {
return lz
}
/* -*- file:  -*- */
, this).ModeManager;
/* -*- file: base/basebutton.lzx#93.1 -*- */
if (Debug.evalCarefully("base/basebutton.lzx", 93, function  () {
/* -*- file: #93 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)["$lzsc$isa"] ? Debug.evalCarefully("base/basebutton.lzx", 93, function  () {
/* -*- file: base/basebutton.lzx#93.62 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this).$lzsc$isa($lzc$reference_$1) : $lzc$reference_$1 instanceof Debug.evalCarefully("base/basebutton.lzx", 93, function  () {
/* -*- file: base/basebutton.lzx#93.62 -*- */
return LzEventable
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/basebutton.lzx#93.36 -*- */
/* -*- file: #94 -*- */
return $lzc$reference_$1
} else {
/* -*- file: #95 -*- */
/* -*- file: #96 -*- */
Debug.evalCarefully("base/basebutton.lzx", 96, function  () {
/* -*- file: #96 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("Invalid event sender: lz.ModeManager => %w (for event onmode)", $lzc$reference_$1)
}}}
, "$lzc$handle_onmode$$base$2Fbasebutton$2Elzx_89_68_$m163", function $lzc$handle_onmode$$base$2Fbasebutton$2Elzx_89_68_$m163 (m_$1) {
/* -*- file: base/basebutton.lzx#91.13 -*- */
if (m_$1 && (this._msdown || this._msin) && !this.childOf(m_$1)) {
/* -*- file: #93 -*- */
this._msdown = false;
this._msin = false;
this._callShow()
}}
/* -*- file:  -*- */
, "$lzc$set_frame", function $lzc$set_frame (r_$1) {
with (this) {
/* -*- file: base/basebutton.lzx#104.13 -*- */
if (this.resourceviewcount > 0) {
/* -*- file: #104 -*- */
/* -*- file: #105 -*- */
for (var i_$2 = 0;i_$2 < Debug.evalCarefully("base/basebutton.lzx", 105, function  () {
/* -*- file: #105 -*- */
return resourceviewcount
}
/* -*- file:  -*- */
, this);i_$2++) {
/* -*- file: base/basebutton.lzx#105.61 -*- */
/* -*- file: #106 -*- */
this.subviews[i_$2].setAttribute("frame", r_$1)
}} else {
/* -*- file: #109 -*- */
/* -*- file: #108 -*- */
/* -*- file: #109 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["$lzc$set_frame"] : this.nextMethod(arguments.callee, "$lzc$set_frame")).call(this, r_$1)
}}}
/* -*- file:  -*- */
, "doSpaceDown", function doSpaceDown () {
/* -*- file: base/basebutton.lzx#116.13 -*- */
if (this._enabled) {
/* -*- file: #116 -*- */
/* -*- file: #117 -*- */
this.showDown()
}}
/* -*- file:  -*- */
, "doSpaceUp", function doSpaceUp () {
/* -*- file: base/basebutton.lzx#125.13 -*- */
if (this._enabled) {
/* -*- file: #125 -*- */
/* -*- file: #126 -*- */
this.onclick.sendEvent();
this.showUp()
}}
/* -*- file:  -*- */
, "doEnterDown", function doEnterDown () {
/* -*- file: base/basebutton.lzx#134.13 -*- */
if (this._enabled) {
/* -*- file: #134 -*- */
/* -*- file: #135 -*- */
this.showDown()
}}
/* -*- file:  -*- */
, "doEnterUp", function doEnterUp () {
/* -*- file: base/basebutton.lzx#141.13 -*- */
if (this._enabled) {
/* -*- file: #141 -*- */
/* -*- file: #142 -*- */
if (this.onclick) {
/* -*- file: #142 -*- */
/* -*- file: #143 -*- */
this.onclick.sendEvent()
};
this.showUp()
}}
/* -*- file:  -*- */
, "$lzc$handle_ontotalframes$$base$2Fbasebutton$2Elzx_150_39_$m164", function $lzc$handle_ontotalframes$$base$2Fbasebutton$2Elzx_150_39_$m164 ($lzc$ignore_$1) {
/* -*- file: base/basebutton.lzx#151.13 -*- */
if (this.isinited) {
/* -*- file: #151 -*- */
/* -*- file: #152 -*- */
this.maxframes = this.totalframes;
this._callShow()
}}
/* -*- file:  -*- */
, "init", function init () {
with (this) {
/* -*- file: base/basebutton.lzx#160.13 -*- */
/* -*- file: #159 -*- */
/* -*- file: #160 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["init"] : this.nextMethod(arguments.callee, "init")).call(this);
this.setResourceViewCount(this.resourceviewcount);
this._callShow()
}}
/* -*- file:  -*- */
, "$lzc$handle_onmouseover$$base$2Fbasebutton$2Elzx_165_37_$m165", function $lzc$handle_onmouseover$$base$2Fbasebutton$2Elzx_165_37_$m165 ($lzc$ignore_$1) {
/* -*- file: base/basebutton.lzx#166.13 -*- */
this.setAttribute("_msin", true);
this._callShow()
}
/* -*- file:  -*- */
, "$lzc$handle_onmouseout$$base$2Fbasebutton$2Elzx_170_36_$m166", function $lzc$handle_onmouseout$$base$2Fbasebutton$2Elzx_170_36_$m166 ($lzc$ignore_$1) {
/* -*- file: base/basebutton.lzx#171.13 -*- */
this.setAttribute("_msin", false);
this._callShow()
}
/* -*- file:  -*- */
, "$lzc$handle_onmousedown$$base$2Fbasebutton$2Elzx_175_37_$m167", function $lzc$handle_onmousedown$$base$2Fbasebutton$2Elzx_175_37_$m167 ($lzc$ignore_$1) {
/* -*- file: base/basebutton.lzx#176.13 -*- */
this.setAttribute("_msdown", true);
this._callShow()
}
/* -*- file:  -*- */
, "$lzc$handle_onmouseup$$base$2Fbasebutton$2Elzx_180_35_$m168", function $lzc$handle_onmouseup$$base$2Fbasebutton$2Elzx_180_35_$m168 ($lzc$ignore_$1) {
/* -*- file: base/basebutton.lzx#181.13 -*- */
this.setAttribute("_msdown", false);
this._callShow()
}
/* -*- file:  -*- */
, "_showEnabled", function _showEnabled () {
with (this) {
/* -*- file: base/basebutton.lzx#188.1 -*- */
Debug.evalCarefully("base/basebutton.lzx", 188, function  () {
/* -*- file: #188 -*- */
return reference
}
/* -*- file:  -*- */
, this).setAttribute("clickable", this._enabled);
/* -*- file: base/basebutton.lzx#189.13 -*- */
showUp()
}}
/* -*- file:  -*- */
, "showDown", function showDown (sd_$1) {
/* -*- file: base/basebutton.lzx#196.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #197 -*- */
sd_$1 = null
};
/* -*- file: #197 -*- */
this.setAttribute("frame", this.downResourceNumber)
}
/* -*- file:  -*- */
, "showUp", function showUp (sd_$1) {
/* -*- file: base/basebutton.lzx#203.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #204 -*- */
sd_$1 = null
};
/* -*- file: #204 -*- */
if (!this._enabled && this.disabledResourceNumber) {
/* -*- file: #204 -*- */
/* -*- file: #205 -*- */
this.setAttribute("frame", this.disabledResourceNumber)
} else {
/* -*- file: #206 -*- */
/* -*- file: #207 -*- */
this.setAttribute("frame", this.normalResourceNumber)
}}
/* -*- file:  -*- */
, "showOver", function showOver (sd_$1) {
/* -*- file: base/basebutton.lzx#215.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #216 -*- */
sd_$1 = null
};
/* -*- file: #216 -*- */
this.setAttribute("frame", this.overResourceNumber)
}
/* -*- file:  -*- */
, "setreference", function setreference (r_$1) {
/* -*- file: base/basebutton.lzx#221.14 -*- */
this.reference = r_$1;
if (r_$1 != this) {
/* -*- file: #222 -*- */
this.setAttribute("clickable", false)
}}
/* -*- file:  -*- */
, "_applystyle", function _applystyle (s_$1) {
with (this) {
/* -*- file: base/basebutton.lzx#227.13 -*- */
setTint(this, s_$1.basecolor)
}}
/* -*- file:  -*- */
], ["tagname", "basebutton", "attributes", new LzInheritedHash($lzc$class_basecomponent.attributes)]);
/* -*- file: base/basebutton.lzx#3.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/basebutton.lzx#4.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #4 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #4 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 233, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onmode", "$lzc$handle_onmode$$base$2Fbasebutton$2Elzx_89_68_$m163", "$lzc$handle_onmode_reference$$base$2Fbasebutton$2Elzx_89_68_$m163", "ontotalframes", "$lzc$handle_ontotalframes$$base$2Fbasebutton$2Elzx_150_39_$m164", null, "onmouseover", "$lzc$handle_onmouseover$$base$2Fbasebutton$2Elzx_165_37_$m165", null, "onmouseout", "$lzc$handle_onmouseout$$base$2Fbasebutton$2Elzx_170_36_$m166", null, "onmousedown", "$lzc$handle_onmousedown$$base$2Fbasebutton$2Elzx_175_37_$m167", null, "onmouseup", "$lzc$handle_onmouseup$$base$2Fbasebutton$2Elzx_180_35_$m168", null], _dbg_filename: "base/basebutton.lzx", _dbg_lineno: 4, _msdown: false, _msin: false, clickable: true, disabledResourceNumber: 4, downResourceNumber: 3, focusable: false, maxframes: new (Debug.evalCarefully("", 12, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_maxframes$$base$2Fbasebutton$2Elzx_38_84_$m155"), normalResourceNumber: 1, onclick: Debug.evalCarefully("base/basebutton.lzx", 57, function  () {
/* -*- file: base/basebutton.lzx#57.62 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onresourceviewcount: Debug.evalCarefully("base/basebutton.lzx", 54, function  () {
/* -*- file: base/basebutton.lzx#54.62 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), overResourceNumber: 2, reference: new (Debug.evalCarefully("", 23, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_reference$$base$2Fbasebutton$2Elzx_51_96_$m158"), resourceviewcount: 0, respondtomouseout: true, styleable: false}, Debug.evalCarefully("", 8, function  () {
return $lzc$class_basebutton
}
, this).attributes)
}}}
;
/* -*- file: base/basebutton.lzx#4.40 -*- */
$lzsc$temp._dbg_name = "base/basebutton.lzx#4/1";
/* -*- file: #4 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_basebutton);
/* -*- file: base/swatchview.lzx#5.1 -*- */
/* -*- file: #6 -*- */
/* -*- file: #5 -*- */
Class.make("$lzc$class_swatchview", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "ctransform", void 0, "color", void 0, "construct", function construct (parent_$1, args_$2) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/swatchview.lzx#17.9 -*- */
/* -*- file: #16 -*- */
/* -*- file: #17 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["construct"] : this.nextMethod(arguments.callee, "construct")).call(this, parent_$1, args_$2);
if (args_$2["width"] == null) {
/* -*- file: #18 -*- */
/* -*- file: #19 -*- */
args_$2["width"] = this.immediateparent.width
};
if (args_$2["height"] == null) {
/* -*- file: #21 -*- */
/* -*- file: #22 -*- */
args_$2["height"] = this.immediateparent.height
};
if (args_$2["fgcolor"] == null && args_$2["bgcolor"] == null) {
/* -*- file: #24 -*- */
/* -*- file: #25 -*- */
args_$2["fgcolor"] = 16777215
}}}
/* -*- file:  -*- */
, "$lzc$set_fgcolor", function $lzc$set_fgcolor (c_$1) {
/* -*- file: base/swatchview.lzx#35.9 -*- */
this.setAttribute("bgcolor", c_$1)
}
/* -*- file:  -*- */
, "$lzc$set_bgcolor", function $lzc$set_bgcolor (c_$1) {
with (this) {
/* -*- file: base/swatchview.lzx#42.9 -*- */
this.color = c_$1;
if (this.ctransform != null) {
/* -*- file: #43 -*- */
/* -*- file: #44 -*- */
var red_$2 = c_$1 >> 16 & 255;
var green_$3 = c_$1 >> 8 & 255;
var blue_$4 = c_$1 & 255;
red_$2 = red_$2 * Debug.evalCarefully("base/swatchview.lzx", 47, function  () {
/* -*- file: #47 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["ra"] / 100 + Debug.evalCarefully("base/swatchview.lzx", 47, function  () {
/* -*- file: base/swatchview.lzx#47.62 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["rb"];
/* -*- file: base/swatchview.lzx#48.14 -*- */
red_$2 = Math.min(red_$2, 255);
/* -*- file: #50 -*- */
green_$3 = green_$3 * Debug.evalCarefully("base/swatchview.lzx", 50, function  () {
/* -*- file: #50 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["ga"] / 100 + Debug.evalCarefully("base/swatchview.lzx", 50, function  () {
/* -*- file: base/swatchview.lzx#50.62 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["gb"];
/* -*- file: base/swatchview.lzx#51.14 -*- */
green_$3 = Math.min(green_$3, 255);
/* -*- file: #53 -*- */
blue_$4 = blue_$4 * Debug.evalCarefully("base/swatchview.lzx", 53, function  () {
/* -*- file: #53 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["ba"] / 100 + Debug.evalCarefully("base/swatchview.lzx", 53, function  () {
/* -*- file: base/swatchview.lzx#53.62 -*- */
return ctransform
}
/* -*- file:  -*- */
, this)["bb"];
/* -*- file: base/swatchview.lzx#54.14 -*- */
blue_$4 = Math.min(blue_$4, 255);
/* -*- file: #56 -*- */
c_$1 = blue_$4 + (green_$3 << 8) + (red_$2 << 16)
};
/* -*- file: #59 -*- */
/* -*- file: #58 -*- */
/* -*- file: #59 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["$lzc$set_bgcolor"] : this.nextMethod(arguments.callee, "$lzc$set_bgcolor")).call(this, c_$1)
}}
/* -*- file:  -*- */
, "setColorTransform", function setColorTransform (o_$1) {
/* -*- file: base/swatchview.lzx#68.9 -*- */
this.ctransform = o_$1;
this.setAttribute("bgcolor", this.color)
}
/* -*- file:  -*- */
], ["tagname", "swatchview", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: base/swatchview.lzx#5.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/swatchview.lzx#6.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #6 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #6 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 75, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/swatchview.lzx", _dbg_lineno: 6, color: 16777215, ctransform: null}, Debug.evalCarefully("", 12, function  () {
return $lzc$class_swatchview
}
, this).attributes)
}}}
;
/* -*- file: base/swatchview.lzx#6.40 -*- */
$lzsc$temp._dbg_name = "base/swatchview.lzx#6/1";
/* -*- file: #6 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_swatchview);
LzResourceLibrary.lzbutton_face_rsc = {ptype: "sr", frames: ["lps/components/lz/resources/button/simpleface_up.png", "lps/components/lz/resources/button/simpleface_mo.png", "lps/components/lz/resources/button/simpleface_dn.png", "lps/components/lz/resources/button/autoPng/simpleface_dsbl.png"], width: 2, height: 18};
LzResourceLibrary.lzbutton_bezel_inner_rsc = {ptype: "sr", frames: ["lps/components/lz/resources/autoPng/bezel_inner_up.png", "lps/components/lz/resources/autoPng/bezel_inner_up.png", "lps/components/lz/resources/autoPng/bezel_inner_dn.png", "lps/components/lz/resources/autoPng/outline_dsbl.png"], width: 500, height: 500};
LzResourceLibrary.lzbutton_bezel_outer_rsc = {ptype: "sr", frames: ["lps/components/lz/resources/autoPng/bezel_outer_up.png", "lps/components/lz/resources/autoPng/bezel_outer_up.png", "lps/components/lz/resources/autoPng/bezel_outer_dn.png", "lps/components/lz/resources/autoPng/transparent.png", "lps/components/lz/resources/autoPng/default_outline.png"], width: 500, height: 500};
/* -*- file: lz/button.lzx#153.1 -*- */
/* -*- file: #154 -*- */
/* -*- file: #153 -*- */
Class.make("$lzc$class_$m259", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fbutton$2Elzx_154_116_$m197", function $lzc$bind_width$$lz$2Fbutton$2Elzx_154_116_$m197 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 154, function  () {
return parent
}
, this).width - 1)
}}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_154_116_$m197", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_154_116_$m197 () {
with (this) {
return( [Debug.evalCarefully("", 154, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_154_116_$m198", function $lzc$bind_height$$lz$2Fbutton$2Elzx_154_116_$m198 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 154, function  () {
return parent
}
, this).height - 1)
}}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_154_116_$m198", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_154_116_$m198 () {
with (this) {
return( [Debug.evalCarefully("", 154, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#154.1 -*- */
/* -*- file: #155 -*- */
/* -*- file: #154 -*- */
Class.make("$lzc$class_$m260", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fbutton$2Elzx_155_116_$m205", function $lzc$bind_width$$lz$2Fbutton$2Elzx_155_116_$m205 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 155, function  () {
return parent
}
, this).width - 3)
}}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_155_116_$m205", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_155_116_$m205 () {
with (this) {
return( [Debug.evalCarefully("", 155, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_155_116_$m206", function $lzc$bind_height$$lz$2Fbutton$2Elzx_155_116_$m206 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 155, function  () {
return parent
}
, this).height - 3)
}}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_155_116_$m206", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_155_116_$m206 () {
with (this) {
return( [Debug.evalCarefully("", 155, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#157.1 -*- */
/* -*- file: #158 -*- */
/* -*- file: #157 -*- */
Class.make("$lzc$class_$m261", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fbutton$2Elzx_158_76_$m214", function $lzc$bind_width$$lz$2Fbutton$2Elzx_158_76_$m214 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 158, function  () {
return parent
}
, this).width - 4)
}}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_158_76_$m214", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_158_76_$m214 () {
with (this) {
return( [Debug.evalCarefully("", 158, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_158_76_$m215", function $lzc$bind_height$$lz$2Fbutton$2Elzx_158_76_$m215 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 158, function  () {
return parent
}
, this).height - 4)
}}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_158_76_$m215", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_158_76_$m215 () {
with (this) {
return( [Debug.evalCarefully("", 158, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#160.1 -*- */
/* -*- file: #161 -*- */
/* -*- file: #160 -*- */
Class.make("$lzc$class_$m262", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Fbutton$2Elzx_161_115_$m222", function $lzc$bind_x$$lz$2Fbutton$2Elzx_161_115_$m222 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", Debug.evalCarefully("", 161, function  () {
return parent
}
, this).parent.width - 2)
}}
, "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_161_115_$m222", function $lzc$dependencies_x$$lz$2Fbutton$2Elzx_161_115_$m222 () {
with (this) {
return( [Debug.evalCarefully("", 161, function  () {
return parent
}
, this).parent, "width"])
}}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_161_115_$m225", function $lzc$bind_height$$lz$2Fbutton$2Elzx_161_115_$m225 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 161, function  () {
return parent
}
, this).parent.height - 2)
}}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_161_115_$m225", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_161_115_$m225 () {
with (this) {
return( [Debug.evalCarefully("", 161, function  () {
return parent
}
, this).parent, "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#161.1 -*- */
/* -*- file: #162 -*- */
/* -*- file: #161 -*- */
Class.make("$lzc$class_$m263", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_y$$lz$2Fbutton$2Elzx_162_116_$m230", function $lzc$bind_y$$lz$2Fbutton$2Elzx_162_116_$m230 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("y", Debug.evalCarefully("", 162, function  () {
return parent
}
, this).parent.height - 2)
}}
, "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_162_116_$m230", function $lzc$dependencies_y$$lz$2Fbutton$2Elzx_162_116_$m230 () {
with (this) {
return( [Debug.evalCarefully("", 162, function  () {
return parent
}
, this).parent, "height"])
}}
, "$lzc$bind_width$$lz$2Fbutton$2Elzx_162_116_$m231", function $lzc$bind_width$$lz$2Fbutton$2Elzx_162_116_$m231 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 162, function  () {
return parent
}
, this).parent.width - 3)
}}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_162_116_$m231", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_162_116_$m231 () {
with (this) {
return( [Debug.evalCarefully("", 162, function  () {
return parent
}
, this).parent, "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#165.1 -*- */
/* -*- file: #166 -*- */
/* -*- file: #165 -*- */
Class.make("$lzc$class_$m264", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Fbutton$2Elzx_166_127_$m240", function $lzc$bind_x$$lz$2Fbutton$2Elzx_166_127_$m240 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", Debug.evalCarefully("", 166, function  () {
return parent
}
, this).parent.width - 1)
}}
, "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_166_127_$m240", function $lzc$dependencies_x$$lz$2Fbutton$2Elzx_166_127_$m240 () {
with (this) {
return( [Debug.evalCarefully("", 166, function  () {
return parent
}
, this).parent, "width"])
}}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_166_127_$m243", function $lzc$bind_height$$lz$2Fbutton$2Elzx_166_127_$m243 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 166, function  () {
return parent
}
, this).parent.height)
}}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_166_127_$m243", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_166_127_$m243 () {
with (this) {
return( [Debug.evalCarefully("", 166, function  () {
return parent
}
, this).parent, "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#166.1 -*- */
/* -*- file: #167 -*- */
/* -*- file: #166 -*- */
Class.make("$lzc$class_$m265", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_y$$lz$2Fbutton$2Elzx_167_130_$m249", function $lzc$bind_y$$lz$2Fbutton$2Elzx_167_130_$m249 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("y", Debug.evalCarefully("", 167, function  () {
return parent
}
, this).parent.height - 1)
}}
, "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_167_130_$m249", function $lzc$dependencies_y$$lz$2Fbutton$2Elzx_167_130_$m249 () {
with (this) {
return( [Debug.evalCarefully("", 167, function  () {
return parent
}
, this).parent, "height"])
}}
, "$lzc$bind_width$$lz$2Fbutton$2Elzx_167_130_$m250", function $lzc$bind_width$$lz$2Fbutton$2Elzx_167_130_$m250 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 167, function  () {
return parent
}
, this).parent.width - 1)
}}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_167_130_$m250", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_167_130_$m250 () {
with (this) {
return( [Debug.evalCarefully("", 167, function  () {
return parent
}
, this).parent, "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/button.lzx#174.1 -*- */
/* -*- file: #175 -*- */
/* -*- file: #174 -*- */
Class.make("$lzc$class_$m266", LzText, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_x$$lz$2Fbutton$2Elzx_175_28_$m255", function $lzc$bind_x$$lz$2Fbutton$2Elzx_175_28_$m255 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("x", Debug.evalCarefully("", 175, function  () {
return parent
}
, this).text_x + Debug.evalCarefully("", 175, function  () {
return parent
}
, this).titleshift)
}}
, "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_175_28_$m255", function $lzc$dependencies_x$$lz$2Fbutton$2Elzx_175_28_$m255 () {
with (this) {
return( [Debug.evalCarefully("", 175, function  () {
return parent
}
, this), "text_x", Debug.evalCarefully("", 175, function  () {
return parent
}
, this), "titleshift"])
}}
, "$lzc$bind_y$$lz$2Fbutton$2Elzx_175_28_$m256", function $lzc$bind_y$$lz$2Fbutton$2Elzx_175_28_$m256 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("y", Debug.evalCarefully("", 175, function  () {
return parent
}
, this).text_y + Debug.evalCarefully("", 175, function  () {
return parent
}
, this).titleshift)
}}
, "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_175_28_$m256", function $lzc$dependencies_y$$lz$2Fbutton$2Elzx_175_28_$m256 () {
with (this) {
return( [Debug.evalCarefully("", 175, function  () {
return parent
}
, this), "text_y", Debug.evalCarefully("", 175, function  () {
return parent
}
, this), "titleshift"])
}}
, "$lzc$bind_text$$lz$2Fbutton$2Elzx_175_28_$m257", function $lzc$bind_text$$lz$2Fbutton$2Elzx_175_28_$m257 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("text", Debug.evalCarefully("", 175, function  () {
return parent
}
, this).text)
}}
, "$lzc$dependencies_text$$lz$2Fbutton$2Elzx_175_28_$m257", function $lzc$dependencies_text$$lz$2Fbutton$2Elzx_175_28_$m257 () {
with (this) {
return( [Debug.evalCarefully("", 175, function  () {
return parent
}
, this), "text"])
}}
, "$classrootdepth", void 0], ["tagname", "text", "attributes", new LzInheritedHash(LzText.attributes)]);
/* -*- file: lz/button.lzx#34.1 -*- */
/* -*- file: #35 -*- */
/* -*- file: #34 -*- */
Class.make("$lzc$class_button", $lzc$class_basebutton, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "text_padding_x", void 0, "text_padding_y", void 0, "$lzc$bind_text_x$$lz$2Fbutton$2Elzx_50_70_$m181", function $lzc$bind_text_x$$lz$2Fbutton$2Elzx_50_70_$m181 ($lzc$ignore_$1) {
/* -*- file: -*- */
this.setAttribute("text_x", this.width / 2 - this._title.width / 2)
}
, "$lzc$dependencies_text_x$$lz$2Fbutton$2Elzx_50_70_$m181", function $lzc$dependencies_text_x$$lz$2Fbutton$2Elzx_50_70_$m181 () {
return [this, "width", this._title, "width"]
}
, "text_x", void 0, "$lzc$bind_text_y$$lz$2Fbutton$2Elzx_53_72_$m182", function $lzc$bind_text_y$$lz$2Fbutton$2Elzx_53_72_$m182 ($lzc$ignore_$1) {
this.setAttribute("text_y", this.height / 2 - this._title.height / 2)
}
, "$lzc$dependencies_text_y$$lz$2Fbutton$2Elzx_53_72_$m182", function $lzc$dependencies_text_y$$lz$2Fbutton$2Elzx_53_72_$m182 () {
return [this, "height", this._title, "height"]
}
, "text_y", void 0, "$lzc$bind_width$$lz$2Fbutton$2Elzx_56_83_$m183", function $lzc$bind_width$$lz$2Fbutton$2Elzx_56_83_$m183 ($lzc$ignore_$1) {
this.setAttribute("width", this._title.width + 2 * this.text_padding_x)
}
, "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_56_83_$m183", function $lzc$dependencies_width$$lz$2Fbutton$2Elzx_56_83_$m183 () {
return [this._title, "width", this, "text_padding_x"]
}
, "$lzc$bind_height$$lz$2Fbutton$2Elzx_58_85_$m184", function $lzc$bind_height$$lz$2Fbutton$2Elzx_58_85_$m184 ($lzc$ignore_$1) {
this.setAttribute("height", this._title.height + 2 * this.text_padding_y)
}
, "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_58_85_$m184", function $lzc$dependencies_height$$lz$2Fbutton$2Elzx_58_85_$m184 () {
return [this._title, "height", this, "text_padding_y"]
}
, "buttonstate", void 0, "$lzc$bind_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186", function $lzc$bind_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186 ($lzc$ignore_$1) {
this.setAttribute("titleshift", this.buttonstate == 1 ? 0 : 1)
}
, "$lzc$dependencies_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186", function $lzc$dependencies_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186 () {
return [this, "buttonstate"]
}
, "titleshift", void 0, "leftalign", void 0, "_showEnabled", function _showEnabled () {
with (this) {
/* -*- file: lz/button.lzx#74.9 -*- */
showUp();
setAttribute("clickable", Debug.evalCarefully("lz/button.lzx", 75, function  () {
/* -*- file: #75 -*- */
return _enabled
}
/* -*- file:  -*- */
, this))
}}
, "showDown", function showDown (sd_$1) {
with (this) {
/* -*- file: lz/button.lzx#81.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #82 -*- */
sd_$1 = null
};
/* -*- file: #83 -*- */
if (this.hasdefault) {
/* -*- file: #83 -*- */
/* -*- file: #84 -*- */
this._outerbezel.setAttribute("frame", 5)
} else {
/* -*- file: #85 -*- */
/* -*- file: #86 -*- */
this._outerbezel.setAttribute("frame", this.downResourceNumber)
};
this._face.setAttribute("frame", this.downResourceNumber);
this._innerbezel.setAttribute("frame", this.downResourceNumber);
setAttribute("buttonstate", 2)
}}
/* -*- file:  -*- */
, "showUp", function showUp (sd_$1) {
with (this) {
/* -*- file: lz/button.lzx#97.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #98 -*- */
sd_$1 = null
};
/* -*- file: #96 -*- */
if (Debug.evalCarefully("lz/button.lzx", 96, function  () {
/* -*- file: #96 -*- */
return _enabled
}
/* -*- file:  -*- */
, this)) {
/* -*- file: lz/button.lzx#96.23 -*- */
/* -*- file: #97 -*- */
if (this.hasdefault) {
/* -*- file: #97 -*- */
/* -*- file: #98 -*- */
this._outerbezel.setAttribute("frame", 5)
} else {
/* -*- file: #99 -*- */
/* -*- file: #100 -*- */
this._outerbezel.setAttribute("frame", this.normalResourceNumber)
};
this._face.setAttribute("frame", this.normalResourceNumber);
this._innerbezel.setAttribute("frame", this.normalResourceNumber);
if (this.style) {
/* -*- file: #104 -*- */
this._title.setAttribute("fgcolor", this.style.textcolor)
}} else {
/* -*- file: #105 -*- */
/* -*- file: #106 -*- */
if (this.style) {
/* -*- file: #106 -*- */
this._title.setAttribute("fgcolor", this.style.textdisabledcolor)
};
/* -*- file: #107 -*- */
this._face.setAttribute("frame", this.disabledResourceNumber);
this._outerbezel.setAttribute("frame", this.disabledResourceNumber);
this._innerbezel.setAttribute("frame", this.disabledResourceNumber)
};
/* -*- file: #112 -*- */
setAttribute("buttonstate", 1)
}}
/* -*- file:  -*- */
, "showOver", function showOver (sd_$1) {
with (this) {
/* -*- file: lz/button.lzx#118.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #119 -*- */
sd_$1 = null
};
/* -*- file: #117 -*- */
if (this.hasdefault) {
/* -*- file: #117 -*- */
/* -*- file: #118 -*- */
this._outerbezel.setAttribute("frame", 5)
} else {
/* -*- file: #119 -*- */
/* -*- file: #120 -*- */
this._outerbezel.setAttribute("frame", this.overResourceNumber)
};
this._face.setAttribute("frame", this.overResourceNumber);
this._innerbezel.setAttribute("frame", this.overResourceNumber);
setAttribute("buttonstate", 1)
}}
/* -*- file:  -*- */
, "$lzc$handle_onhasdefault$$lz$2Fbutton$2Elzx_127_34_$m190", function $lzc$handle_onhasdefault$$lz$2Fbutton$2Elzx_127_34_$m190 ($lzc$ignore_$1) {
with (this) {
/* -*- file: lz/button.lzx#129.9 -*- */
if (this._initcomplete) {
/* -*- file: #129 -*- */
/* -*- file: #130 -*- */
if (this.buttonstate == 1) {
/* -*- file: #130 -*- */
showUp()
}}}}
/* -*- file:  -*- */
, "_applystyle", function _applystyle (s_$1) {
with (this) {
/* -*- file: lz/button.lzx#137.9 -*- */
if (this.style != null) {
/* -*- file: #137 -*- */
/* -*- file: #138 -*- */
this.textcolor = s_$1.textcolor;
this.textdisabledcolor = s_$1.textdisabledcolor;
if (Debug.evalCarefully("lz/button.lzx", 140, function  () {
/* -*- file: #140 -*- */
return enabled
}
/* -*- file:  -*- */
, this)) {
/* -*- file: lz/button.lzx#140.26 -*- */
/* -*- file: #141 -*- */
Debug.evalCarefully("lz/button.lzx", 141, function  () {
/* -*- file: #141 -*- */
return _title
}
/* -*- file:  -*- */
, this).setAttribute("fgcolor", s_$1.textcolor)
} else {
/* -*- file: lz/button.lzx#142.20 -*- */
/* -*- file: #143 -*- */
Debug.evalCarefully("lz/button.lzx", 143, function  () {
/* -*- file: #143 -*- */
return _title
}
/* -*- file:  -*- */
, this).setAttribute("fgcolor", s_$1.textdisabledcolor)
};
/* -*- file: lz/button.lzx#145.13 -*- */
setTint(Debug.evalCarefully("lz/button.lzx", 145, function  () {
/* -*- file: #145 -*- */
return _outerbezel
}
/* -*- file:  -*- */
, this), s_$1.basecolor);
/* -*- file: lz/button.lzx#146.13 -*- */
setTint(Debug.evalCarefully("lz/button.lzx", 146, function  () {
/* -*- file: #146 -*- */
return _innerbezel
}
/* -*- file:  -*- */
, this), s_$1.basecolor);
/* -*- file: lz/button.lzx#147.13 -*- */
setTint(Debug.evalCarefully("lz/button.lzx", 147, function  () {
/* -*- file: #147 -*- */
return _face
}
/* -*- file:  -*- */
, this), s_$1.basecolor)
}}}
, "_outerbezel", void 0, "_innerbezel", void 0, "_face", void 0, "_innerbezelbottom", void 0, "_outerbezelbottom", void 0, "_title", void 0], ["tagname", "button", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 154, bgcolor: LzColorUtils.convertColor("0x919191"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fbutton$2Elzx_154_116_$m198", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_154_116_$m198"), name: "_outerbezel", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fbutton$2Elzx_154_116_$m197", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_154_116_$m197"), x: 0, y: 0}, "class": $lzc$class_$m259}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 155, bgcolor: LzColorUtils.convertColor("0xffffff"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fbutton$2Elzx_155_116_$m206", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_155_116_$m206"), name: "_innerbezel", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fbutton$2Elzx_155_116_$m205", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_155_116_$m205"), x: 1, y: 1}, "class": $lzc$class_$m260}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 158, height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fbutton$2Elzx_158_76_$m215", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_158_76_$m215"), name: "_face", resource: "lzbutton_face_rsc", stretches: "both", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fbutton$2Elzx_158_76_$m214", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_158_76_$m214"), x: 2, y: 2}, "class": $lzc$class_$m261}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 160, name: "_innerbezelbottom"}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "lz/button.lzx", _dbg_lineno: 161, bgcolor: LzColorUtils.convertColor("0x585858"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fbutton$2Elzx_161_115_$m225", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_161_115_$m225"), width: 1, x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Fbutton$2Elzx_161_115_$m222", "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_161_115_$m222"), y: 1}, "class": $lzc$class_$m262}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/button.lzx", _dbg_lineno: 162, bgcolor: LzColorUtils.convertColor("0x585858"), height: 1, width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fbutton$2Elzx_162_116_$m231", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_162_116_$m231"), x: 1, y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Fbutton$2Elzx_162_116_$m230", "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_162_116_$m230")}, "class": $lzc$class_$m263}], "class": LzView}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 165, name: "_outerbezelbottom"}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "lz/button.lzx", _dbg_lineno: 166, bgcolor: LzColorUtils.convertColor("0xffffff"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fbutton$2Elzx_166_127_$m243", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_166_127_$m243"), opacity: 0.7, width: 1, x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Fbutton$2Elzx_166_127_$m240", "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_166_127_$m240"), y: 0}, "class": $lzc$class_$m264}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/button.lzx", _dbg_lineno: 167, bgcolor: LzColorUtils.convertColor("0xffffff"), height: 1, opacity: 0.7, width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fbutton$2Elzx_167_130_$m250", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_167_130_$m250"), x: 0, y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Fbutton$2Elzx_167_130_$m249", "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_167_130_$m249")}, "class": $lzc$class_$m265}], "class": LzView}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/button.lzx", _dbg_lineno: 175, name: "_title", resize: true, text: new LzAlwaysExpr("$lzc$bind_text$$lz$2Fbutton$2Elzx_175_28_$m257", "$lzc$dependencies_text$$lz$2Fbutton$2Elzx_175_28_$m257"), x: new LzAlwaysExpr("$lzc$bind_x$$lz$2Fbutton$2Elzx_175_28_$m255", "$lzc$dependencies_x$$lz$2Fbutton$2Elzx_175_28_$m255"), y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Fbutton$2Elzx_175_28_$m256", "$lzc$dependencies_y$$lz$2Fbutton$2Elzx_175_28_$m256")}, "class": $lzc$class_$m266}], $lzc$class_basebutton["children"]), "attributes", new LzInheritedHash($lzc$class_basebutton.attributes)]);
/* -*- file: lz/button.lzx#34.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: lz/button.lzx#35.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #35 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #35 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 160, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onhasdefault", "$lzc$handle_onhasdefault$$lz$2Fbutton$2Elzx_127_34_$m190", null], _dbg_filename: "lz/button.lzx", _dbg_lineno: 35, buttonstate: 1, clickable: true, doesenter: true, focusable: true, height: new (Debug.evalCarefully("", 43, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_height$$lz$2Fbutton$2Elzx_58_85_$m184", "$lzc$dependencies_height$$lz$2Fbutton$2Elzx_58_85_$m184"), leftalign: false, maxframes: 4, pixellock: true, styleable: true, text_padding_x: 11, text_padding_y: 4, text_x: new (Debug.evalCarefully("", 50, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_text_x$$lz$2Fbutton$2Elzx_50_70_$m181", "$lzc$dependencies_text_x$$lz$2Fbutton$2Elzx_50_70_$m181"), text_y: new (Debug.evalCarefully("", 50, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_text_y$$lz$2Fbutton$2Elzx_53_72_$m182", "$lzc$dependencies_text_y$$lz$2Fbutton$2Elzx_53_72_$m182"), titleshift: new (Debug.evalCarefully("", 50, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186", "$lzc$dependencies_titleshift$$lz$2Fbutton$2Elzx_66_28_$m186"), width: new (Debug.evalCarefully("", 50, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_width$$lz$2Fbutton$2Elzx_56_83_$m183", "$lzc$dependencies_width$$lz$2Fbutton$2Elzx_56_83_$m183")}, Debug.evalCarefully("", 50, function  () {
return $lzc$class_button
}
, this).attributes)
}}}
;
/* -*- file: lz/button.lzx#35.40 -*- */
$lzsc$temp._dbg_name = "lz/button.lzx#35/1";
/* -*- file: #35 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_button);
/* -*- file: base/basevaluecomponent.lzx#4.1 -*- */
/* -*- file: #5 -*- */
/* -*- file: #4 -*- */
Class.make("$lzc$class_basevaluecomponent", $lzc$class_basecomponent, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "value", void 0, "type", void 0, "getValue", function getValue () {
/* -*- file: -*- */
/* -*- file: base/basevaluecomponent.lzx#19.13 -*- */
return this.value == null ? this.text : this.value
}
/* -*- file:  -*- */
, "$lzc$getValue_dependencies", function $lzc$getValue_dependencies (who_$1, self_$2) {
/* -*- file: base/basevaluecomponent.lzx#29.11 -*- */
return [this, "value", this, "text"]
}
/* -*- file:  -*- */
, "acceptValue", function acceptValue (data_$1, type_$2) {
/* -*- file: base/basevaluecomponent.lzx#35.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #36 -*- */
type_$2 = null
};
/* -*- file: #40 -*- */
if (type_$2 == null) {
/* -*- file: #40 -*- */
type_$2 = this.type
};
/* -*- file: #41 -*- */
this.acceptAttribute("value", type_$2, data_$1)
}
/* -*- file:  -*- */
, "presentValue", function presentValue (type_$1) {
/* -*- file: base/basevaluecomponent.lzx#47.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #48 -*- */
type_$1 = null
};
/* -*- file: #52 -*- */
if (type_$1 == null) {
/* -*- file: #52 -*- */
type_$1 = this.type
};
return this.presentTypeValue(type_$1, this.getValue())
}
/* -*- file:  -*- */
, "$lzc$presentValue_dependencies", function $lzc$presentValue_dependencies (who_$1, self_$2, type_$3) {
/* -*- file: base/basevaluecomponent.lzx#60.14 -*- */
switch (arguments.length) {
case 2:
/* -*- file: #61 -*- */
type_$3 = null
};
return [this, "type"].concat(this.$lzc$getValue_dependencies(who_$1, self_$2))
}
/* -*- file:  -*- */
], ["tagname", "basevaluecomponent", "attributes", new LzInheritedHash($lzc$class_basecomponent.attributes)]);
/* -*- file: base/basevaluecomponent.lzx#4.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/basevaluecomponent.lzx#5.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #5 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #5 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 69, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/basevaluecomponent.lzx", _dbg_lineno: 5, type: "", value: null}, Debug.evalCarefully("", 14, function  () {
return $lzc$class_basevaluecomponent
}
, this).attributes)
}}}
;
/* -*- file: base/basevaluecomponent.lzx#5.40 -*- */
$lzsc$temp._dbg_name = "base/basevaluecomponent.lzx#5/1";
/* -*- file: #5 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_basevaluecomponent);
/* -*- file: base/baseformitem.lzx#6.1 -*- */
/* -*- file: #7 -*- */
/* -*- file: #6 -*- */
Class.make("$lzc$class_baseformitem", $lzc$class_basevaluecomponent, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "_parentform", void 0, "submitname", void 0, "$lzc$bind_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275", function $lzc$bind_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("submit", Debug.evalCarefully("", 20, function  () {
return enabled
}
, this))
}}
, "$lzc$dependencies_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275", function $lzc$dependencies_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275 () {
return [this, "enabled"]
}
, "submit", void 0, "changed", void 0, "$lzc$set_changed", function $lzc$set_changed (changed_$1) {
/* -*- file: base/baseformitem.lzx#25.58 -*- */
this.setChanged(changed_$1)
}
/* -*- file:  -*- */
, "$lzc$set_value", function $lzc$set_value (value_$1) {
/* -*- file: base/baseformitem.lzx#29.98 -*- */
this.setValue(value_$1, false)
}
/* -*- file:  -*- */
, "onchanged", void 0, "onvalue", void 0, "rollbackvalue", void 0, "ignoreform", void 0, "init", function init () {
with (this) {
/* -*- file: base/baseformitem.lzx#47.13 -*- */
if (this.submitname == "") {
/* -*- file: #47 -*- */
this.submitname = this.name
};
/* -*- file: #48 -*- */
if (this.submitname == "") {
/* -*- file: #48 -*- */
/* -*- file: #49 -*- */
/* -*- file: #50 -*- */
Debug.evalCarefully("base/baseformitem.lzx", 50, function  () {
/* -*- file: #50 -*- */
return Debug
}
/* -*- file:  -*- */
, this).error("name required for form submit", this);
/* -*- file: base/baseformitem.lzx#52.17 -*- */
return
};
/* -*- file: #53 -*- */
/* -*- file: #54 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["init"] : this.nextMethod(arguments.callee, "init")).call(this)
}}
/* -*- file:  -*- */
, "destroy", function destroy () {
with (this) {
/* -*- file: base/baseformitem.lzx#58.13 -*- */
if (this._parentform) {
this._parentform.removeFormItem(this)
};
/* -*- file: #60 -*- */
/* -*- file: #59 -*- */
/* -*- file: #60 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["destroy"] : this.nextMethod(arguments.callee, "destroy")).apply(this, arguments)
}}
/* -*- file:  -*- */
, "$lzc$handle_oninit$$base$2Fbaseformitem$2Elzx_63_32_$m282", function $lzc$handle_oninit$$base$2Fbaseformitem$2Elzx_63_32_$m282 ($lzc$ignore_$1) {
/* -*- file: base/baseformitem.lzx#63.13 -*- */
var fp_$2 = this.findForm();
if (fp_$2 != null) {
/* -*- file: #64 -*- */
/* -*- file: #65 -*- */
fp_$2.addFormItem(this);
this._parentform = fp_$2
}}
/* -*- file:  -*- */
, "setChanged", function setChanged (changed_$1, skipform_$2) {
with (this) {
/* -*- file: base/baseformitem.lzx#73.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #74 -*- */
skipform_$2 = null
};
/* -*- file: #81 -*- */
if (!this._initcomplete) {
/* -*- file: #81 -*- */
/* -*- file: #82 -*- */
this.changed = false;
return
};
/* -*- file: #86 -*- */
var oldchanged_$3 = this.changed;
this.changed = changed_$1;
/* -*- file: #90 -*- */
if (this.changed != oldchanged_$3) {
/* -*- file: #90 -*- */
/* -*- file: #91 -*- */
if (this.onchanged) {
/* -*- file: #91 -*- */
this.onchanged.sendEvent(this.changed)
}};
/* -*- file: #95 -*- */
if (!skipform_$2 && this.changed && !Debug.evalCarefully("base/baseformitem.lzx", 95, function  () {
/* -*- file: #95 -*- */
return ignoreform
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/baseformitem.lzx#95.61 -*- */
/* -*- file: #97 -*- */
if (this["_parentform"] && this._parentform["changed"] != undefined && !this._parentform.changed) {
/* -*- file: #99 -*- */
/* -*- file: #100 -*- */
this._parentform.setChanged(changed_$1, false)
}};
/* -*- file: #104 -*- */
if (!skipform_$2 && !this.changed && !Debug.evalCarefully("base/baseformitem.lzx", 104, function  () {
/* -*- file: #104 -*- */
return ignoreform
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/baseformitem.lzx#104.58 -*- */
/* -*- file: #106 -*- */
if (this["_parentform"] && this._parentform["changed"] != undefined && this._parentform.changed) {
/* -*- file: #108 -*- */
/* -*- file: #109 -*- */
this._parentform.setChanged(changed_$1, true)
}}}}
/* -*- file:  -*- */
, "rollback", function rollback () {
/* -*- file: base/baseformitem.lzx#117.13 -*- */
if (this.rollbackvalue != this["value"]) {
/* -*- file: #117 -*- */
/* -*- file: #118 -*- */
this.setAttribute("value", this.rollbackvalue)
};
this.setAttribute("changed", false)
}
/* -*- file:  -*- */
, "commit", function commit () {
/* -*- file: base/baseformitem.lzx#125.13 -*- */
this.rollbackvalue = this.value;
this.setAttribute("changed", false)
}
/* -*- file:  -*- */
, "setValue", function setValue (v_$1, isinitvalue_$2) {
/* -*- file: base/baseformitem.lzx#132.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #133 -*- */
isinitvalue_$2 = null
};
/* -*- file: #133 -*- */
var didchange_$3 = this.value != v_$1;
this.value = v_$1;
if (isinitvalue_$2 || !this._initcomplete) {
/* -*- file: #135 -*- */
/* -*- file: #136 -*- */
this.rollbackvalue = v_$1
};
this.setChanged(didchange_$3 && !isinitvalue_$2 && this.rollbackvalue != v_$1);
if (this["onvalue"]) {
/* -*- file: #139 -*- */
this.onvalue.sendEvent(v_$1)
}}
/* -*- file:  -*- */
, "acceptValue", function acceptValue (data_$1, type_$2) {
/* -*- file: base/baseformitem.lzx#146.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #147 -*- */
type_$2 = null
};
/* -*- file: #148 -*- */
if (type_$2 == null) {
/* -*- file: #148 -*- */
type_$2 = this.type
};
/* -*- file: #149 -*- */
this.setValue(this.acceptTypeValue(type_$2, data_$1), true)
}
/* -*- file:  -*- */
, "findForm", function findForm () {
with (this) {
/* -*- file: base/baseformitem.lzx#155.13 -*- */
if (Debug.evalCarefully("base/baseformitem.lzx", 155, function  () {
/* -*- file: #155 -*- */
return _parentform
}
/* -*- file:  -*- */
, this) != null) {
/* -*- file: base/baseformitem.lzx#156.17 -*- */
return( Debug.evalCarefully("base/baseformitem.lzx", 156, function  () {
/* -*- file: #156 -*- */
return _parentform
}
/* -*- file:  -*- */
, this))
} else {
/* -*- file: base/baseformitem.lzx#157.18 -*- */
/* -*- file: #158 -*- */
var p_$1 = this.immediateparent;
var fp_$2 = null;
while (p_$1 != Debug.evalCarefully("base/baseformitem.lzx", 160, function  () {
/* -*- file: #160 -*- */
return canvas
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/baseformitem.lzx#160.37 -*- */
/* -*- file: #161 -*- */
if (p_$1["formdata"]) {
/* -*- file: #161 -*- */
/* -*- file: #162 -*- */
fp_$2 = p_$1;
break
};
p_$1 = p_$1.immediateparent
};
return fp_$2
}}}
/* -*- file:  -*- */
, "toXML", function toXML (convert_$1) {
with (this) {
/* -*- file: base/baseformitem.lzx#176.13 -*- */
var val_$2 = this.value;
if (convert_$1) {
/* -*- file: #177 -*- */
/* -*- file: #179 -*- */
if (typeof val_$2 == "boolean") {
/* -*- file: #179 -*- */
val_$2 = val_$2 - 0
}};
/* -*- file: #182 -*- */
if (this.submitname == "") {
/* -*- file: #182 -*- */
/* -*- file: #183 -*- */
Debug.evalCarefully("base/baseformitem.lzx", 183, function  () {
/* -*- file: #183 -*- */
return Debug
}
/* -*- file:  -*- */
, this).format("WARNING: submitname not given for object %w (baseformitem.toXML)\n", this)
};
/* -*- file: base/baseformitem.lzx#186.13 -*- */
return( Debug.evalCarefully("base/baseformitem.lzx", 186, function  () {
/* -*- file: #186 -*- */
return lz
}
/* -*- file:  -*- */
, this).Browser.xmlEscape(this.submitname) + '="' + Debug.evalCarefully("base/baseformitem.lzx", 186, function  () {
/* -*- file: base/baseformitem.lzx#186.65 -*- */
return lz
}
/* -*- file:  -*- */
, this).Browser.xmlEscape(val_$2) + '"')
}}
], ["tagname", "baseformitem", "attributes", new LzInheritedHash($lzc$class_basevaluecomponent.attributes)]);
/* -*- file: base/baseformitem.lzx#6.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/baseformitem.lzx#7.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #7 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #7 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 192, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["oninit", "$lzc$handle_oninit$$base$2Fbaseformitem$2Elzx_63_32_$m282", null], _dbg_filename: "base/baseformitem.lzx", _dbg_lineno: 7, _parentform: null, changed: false, ignoreform: false, onchanged: Debug.evalCarefully("base/baseformitem.lzx", 33, function  () {
/* -*- file: base/baseformitem.lzx#33.64 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onvalue: Debug.evalCarefully("base/baseformitem.lzx", 36, function  () {
/* -*- file: base/baseformitem.lzx#36.64 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), rollbackvalue: null, submit: new (Debug.evalCarefully("", 43, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275", "$lzc$dependencies_submit$$base$2Fbaseformitem$2Elzx_20_69_$m275"), submitname: "", value: null}, Debug.evalCarefully("", 33, function  () {
return $lzc$class_baseformitem
}
, this).attributes)
}}}
;
/* -*- file: base/baseformitem.lzx#7.40 -*- */
$lzsc$temp._dbg_name = "base/baseformitem.lzx#7/1";
/* -*- file: #7 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_baseformitem);
/* -*- file: lz/edittext.lzx#3.1 -*- */
/* -*- file: #4 -*- */
/* -*- file: #3 -*- */
Class.make("$lzc$class__internalinputtext", LzInputText, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "construct", function construct (parent_$1, args_$2) {
/* -*- file: -*- */
with (this) {
/* -*- file: lz/edittext.lzx#7.13 -*- */
if (parent_$1["textwidth"] != null) {
/* -*- file: #7 -*- */
args_$2.textwidth = parent_$1.textwidth
};
/* -*- file: #8 -*- */
if (parent_$1["_initialtext"] != null) {
/* -*- file: #8 -*- */
args_$2.text = parent_$1._initialtext
};
/* -*- file: #9 -*- */
if (parent_$1["password"] != null) {
/* -*- file: #9 -*- */
args_$2.password = parent_$1.password
};
/* -*- file: #10 -*- */
if (parent_$1["multiline"] != null) {
/* -*- file: #10 -*- */
args_$2.multiline = parent_$1.multiline
};
/* -*- file: #11 -*- */
/* -*- file: #10 -*- */
/* -*- file: #11 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["construct"] : this.nextMethod(arguments.callee, "construct")).call(this, parent_$1, args_$2)
}}
/* -*- file:  -*- */
], ["tagname", "_internalinputtext", "attributes", new LzInheritedHash(LzInputText.attributes)]);
/* -*- file: lz/edittext.lzx#3.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: lz/edittext.lzx#4.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #4 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #4 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 17, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "lz/edittext.lzx", _dbg_lineno: 4}, Debug.evalCarefully("", 8, function  () {
return $lzc$class__internalinputtext
}
, this).attributes)
}}}
;
/* -*- file: lz/edittext.lzx#4.40 -*- */
$lzsc$temp._dbg_name = "lz/edittext.lzx#4/1";
/* -*- file: #4 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class__internalinputtext);
/* -*- file: lz/edittext.lzx#171.1 -*- */
/* -*- file: #172 -*- */
/* -*- file: #171 -*- */
Class.make("$lzc$class_$m395", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_172_67_$m312", function $lzc$bind_width$$lz$2Fedittext$2Elzx_172_67_$m312 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 172, function  () {
return immediateparent
}
, this).width)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_172_67_$m312", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_172_67_$m312 () {
with (this) {
return( [Debug.evalCarefully("", 171, function  () {
return immediateparent
}
, this), "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#172.1 -*- */
/* -*- file: #173 -*- */
/* -*- file: #172 -*- */
Class.make("$lzc$class_$m396", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_height$$lz$2Fedittext$2Elzx_173_67_$m318", function $lzc$bind_height$$lz$2Fedittext$2Elzx_173_67_$m318 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 173, function  () {
return immediateparent
}
, this).height)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_173_67_$m318", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_173_67_$m318 () {
with (this) {
return( [Debug.evalCarefully("", 173, function  () {
return immediateparent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#173.1 -*- */
/* -*- file: #174 -*- */
/* -*- file: #173 -*- */
Class.make("$lzc$class_$m397", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_height$$lz$2Fedittext$2Elzx_174_81_$m324", function $lzc$bind_height$$lz$2Fedittext$2Elzx_174_81_$m324 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 174, function  () {
return immediateparent
}
, this).height)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_174_81_$m324", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_174_81_$m324 () {
with (this) {
return( [Debug.evalCarefully("", 174, function  () {
return immediateparent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#174.1 -*- */
/* -*- file: #175 -*- */
/* -*- file: #174 -*- */
Class.make("$lzc$class_$m398", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_175_83_$m329", function $lzc$bind_width$$lz$2Fedittext$2Elzx_175_83_$m329 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 175, function  () {
return immediateparent
}
, this).width)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_175_83_$m329", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_175_83_$m329 () {
with (this) {
return( [Debug.evalCarefully("", 175, function  () {
return immediateparent
}
, this), "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#169.1 -*- */
/* -*- file: #170 -*- */
/* -*- file: #169 -*- */
Class.make("$lzc$class_$m394", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_170_63_$m303", function $lzc$bind_width$$lz$2Fedittext$2Elzx_170_63_$m303 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 170, function  () {
return parent
}
, this).width)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_170_63_$m303", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_170_63_$m303 () {
with (this) {
return( [Debug.evalCarefully("", 170, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_170_63_$m304", function $lzc$bind_height$$lz$2Fedittext$2Elzx_170_63_$m304 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 170, function  () {
return parent
}
, this).height)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_170_63_$m304", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_170_63_$m304 () {
with (this) {
return( [Debug.evalCarefully("", 170, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, $lzc$bind_applied$$lz$2Fedittext$2Elzx_171_71_$m307: function $lzc$bind_applied$$lz$2Fedittext$2Elzx_171_71_$m307 ($lzc$ignore_$1) {
this.setAttribute("applied", this.classroot.enabled)
}
, $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_171_71_$m307: function $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_171_71_$m307 () {
/* -*- file: lz/edittext.lzx#171.73 -*- */
return [this.classroot, "enabled"]
}
/* -*- file:  -*- */
, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 171, applied: new LzAlwaysExpr("$lzc$bind_applied$$lz$2Fedittext$2Elzx_171_71_$m307", "$lzc$dependencies_applied$$lz$2Fedittext$2Elzx_171_71_$m307"), pooling: true}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 172, bgcolor: LzColorUtils.convertColor("0x989898"), height: 1, width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_172_67_$m312", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_172_67_$m312")}, "class": $lzc$class_$m395}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 173, bgcolor: LzColorUtils.convertColor("0x989898"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_173_67_$m318", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_173_67_$m318"), width: 1}, "class": $lzc$class_$m396}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 174, align: "right", bgcolor: LzColorUtils.convertColor("0xe1e1e1"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_174_81_$m324", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_174_81_$m324"), width: 1}, "class": $lzc$class_$m397}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 175, bgcolor: LzColorUtils.convertColor("0xe1e1e1"), height: 1, valign: "bottom", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_175_83_$m329", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_175_83_$m329")}, "class": $lzc$class_$m398}], "class": LzState}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#180.1 -*- */
/* -*- file: #181 -*- */
/* -*- file: #180 -*- */
Class.make("$lzc$class_$m400", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_181_82_$m345", function $lzc$bind_width$$lz$2Fedittext$2Elzx_181_82_$m345 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 181, function  () {
return parent
}
, this).width - 1)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_181_82_$m345", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_181_82_$m345 () {
with (this) {
return( [Debug.evalCarefully("", 181, function  () {
return parent
}
, this), "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#181.1 -*- */
/* -*- file: #182 -*- */
/* -*- file: #181 -*- */
Class.make("$lzc$class_$m401", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_height$$lz$2Fedittext$2Elzx_182_67_$m351", function $lzc$bind_height$$lz$2Fedittext$2Elzx_182_67_$m351 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 182, function  () {
return immediateparent
}
, this).height)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_182_67_$m351", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_182_67_$m351 () {
with (this) {
return( [Debug.evalCarefully("", 182, function  () {
return immediateparent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#182.1 -*- */
/* -*- file: #183 -*- */
/* -*- file: #182 -*- */
Class.make("$lzc$class_$m402", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_183_83_$m356", function $lzc$bind_width$$lz$2Fedittext$2Elzx_183_83_$m356 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 183, function  () {
return immediateparent
}
, this).width)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_183_83_$m356", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_183_83_$m356 () {
with (this) {
return( [Debug.evalCarefully("", 183, function  () {
return immediateparent
}
, this), "width"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#185.1 -*- */
/* -*- file: #186 -*- */
/* -*- file: #185 -*- */
Class.make("$lzc$class_$m403", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_186_70_$m365", function $lzc$bind_width$$lz$2Fedittext$2Elzx_186_70_$m365 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 186, function  () {
return immediateparent
}
, this).width)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_186_70_$m365", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_186_70_$m365 () {
with (this) {
return( [Debug.evalCarefully("", 186, function  () {
return immediateparent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_186_70_$m366", function $lzc$bind_height$$lz$2Fedittext$2Elzx_186_70_$m366 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 186, function  () {
return immediateparent
}
, this).height)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_186_70_$m366", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_186_70_$m366 () {
with (this) {
return( [Debug.evalCarefully("", 186, function  () {
return immediateparent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#186.1 -*- */
/* -*- file: #187 -*- */
/* -*- file: #186 -*- */
Class.make("$lzc$class_$m404", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_187_110_$m372", function $lzc$bind_width$$lz$2Fedittext$2Elzx_187_110_$m372 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 187, function  () {
return parent
}
, this).width - 2)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_187_110_$m372", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_187_110_$m372 () {
with (this) {
return( [Debug.evalCarefully("", 187, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_187_110_$m373", function $lzc$bind_height$$lz$2Fedittext$2Elzx_187_110_$m373 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 187, function  () {
return parent
}
, this).height - 2)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_187_110_$m373", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_187_110_$m373 () {
with (this) {
return( [Debug.evalCarefully("", 187, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#178.1 -*- */
/* -*- file: #179 -*- */
/* -*- file: #178 -*- */
Class.make("$lzc$class_$m399", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_179_79_$m336", function $lzc$bind_width$$lz$2Fedittext$2Elzx_179_79_$m336 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 179, function  () {
return parent
}
, this).width - 2)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_179_79_$m336", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_179_79_$m336 () {
with (this) {
return( [Debug.evalCarefully("", 179, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_179_79_$m337", function $lzc$bind_height$$lz$2Fedittext$2Elzx_179_79_$m337 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 179, function  () {
return parent
}
, this).height - 2)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_179_79_$m337", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_179_79_$m337 () {
with (this) {
return( [Debug.evalCarefully("", 179, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, $lzc$bind_applied$$lz$2Fedittext$2Elzx_180_71_$m340: function $lzc$bind_applied$$lz$2Fedittext$2Elzx_180_71_$m340 ($lzc$ignore_$1) {
this.setAttribute("applied", this.classroot.enabled)
}
, $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_180_71_$m340: function $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_180_71_$m340 () {
/* -*- file: lz/edittext.lzx#180.82 -*- */
return [this.classroot, "enabled"]
}
/* -*- file:  -*- */
, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 180, applied: new LzAlwaysExpr("$lzc$bind_applied$$lz$2Fedittext$2Elzx_180_71_$m340", "$lzc$dependencies_applied$$lz$2Fedittext$2Elzx_180_71_$m340"), pooling: true}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 181, bgcolor: LzColorUtils.convertColor("0x262626"), height: 1, width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_181_82_$m345", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_181_82_$m345")}, "class": $lzc$class_$m400}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 182, bgcolor: LzColorUtils.convertColor("0x262626"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_182_67_$m351", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_182_67_$m351"), width: 1}, "class": $lzc$class_$m401}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 183, bgcolor: LzColorUtils.convertColor("0xefefef"), height: 1, valign: "bottom", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_183_83_$m356", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_183_83_$m356")}, "class": $lzc$class_$m402}], "class": LzState}, {attrs: {$classrootdepth: 2, $lzc$bind_applied$$lz$2Fedittext$2Elzx_185_73_$m360: function $lzc$bind_applied$$lz$2Fedittext$2Elzx_185_73_$m360 ($lzc$ignore_$1) {
/* -*- file: lz/edittext.lzx#185.81 -*- */
this.setAttribute("applied", !this.classroot.enabled)
}
/* -*- file:  -*- */
, $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_185_73_$m360: function $lzc$dependencies_applied$$lz$2Fedittext$2Elzx_185_73_$m360 () {
/* -*- file: lz/edittext.lzx#185.81 -*- */
return [this.classroot, "enabled"]
}
/* -*- file:  -*- */
, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 185, applied: new LzAlwaysExpr("$lzc$bind_applied$$lz$2Fedittext$2Elzx_185_73_$m360", "$lzc$dependencies_applied$$lz$2Fedittext$2Elzx_185_73_$m360"), pooling: true}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 186, bgcolor: LzColorUtils.convertColor("0xa4a4a4"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_186_70_$m366", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_186_70_$m366"), width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_186_70_$m365", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_186_70_$m365")}, "class": $lzc$class_$m403}, {attrs: {$classrootdepth: 2, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 187, bgcolor: LzColorUtils.convertColor("0xffffff"), height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_187_110_$m373", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_187_110_$m373"), width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_187_110_$m372", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_187_110_$m372"), x: 1, y: 1}, "class": $lzc$class_$m404}], "class": LzState}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#190.1 -*- */
/* -*- file: #191 -*- */
/* -*- file: #190 -*- */
Class.make("$lzc$class_$m405", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_width$$lz$2Fedittext$2Elzx_191_80_$m379", function $lzc$bind_width$$lz$2Fedittext$2Elzx_191_80_$m379 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 191, function  () {
return parent
}
, this).width - 3)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_191_80_$m379", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_191_80_$m379 () {
with (this) {
return( [Debug.evalCarefully("", 191, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_191_80_$m380", function $lzc$bind_height$$lz$2Fedittext$2Elzx_191_80_$m380 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 191, function  () {
return parent
}
, this).height - 4)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_191_80_$m380", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_191_80_$m380 () {
with (this) {
return( [Debug.evalCarefully("", 191, function  () {
return parent
}
, this), "height"])
}}
, "$classrootdepth", void 0], ["tagname", "view", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: lz/edittext.lzx#197.1 -*- */
/* -*- file: #198 -*- */
/* -*- file: #197 -*- */
Class.make("$lzc$class_$m406", $lzc$class__internalinputtext, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_password$$lz$2Fedittext$2Elzx_198_48_$m384", function $lzc$bind_password$$lz$2Fedittext$2Elzx_198_48_$m384 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("password", Debug.evalCarefully("", 198, function  () {
return parent
}
, this).password)
}}
, "$lzc$bind_y$$lz$2Fedittext$2Elzx_198_48_$m386", function $lzc$bind_y$$lz$2Fedittext$2Elzx_198_48_$m386 ($lzc$ignore_$1) {
this.setAttribute("y", this.classroot.text_y)
}
, "$lzc$dependencies_y$$lz$2Fedittext$2Elzx_198_48_$m386", function $lzc$dependencies_y$$lz$2Fedittext$2Elzx_198_48_$m386 () {
return [this.classroot, "text_y"]
}
, "$lzc$bind_width$$lz$2Fedittext$2Elzx_198_48_$m387", function $lzc$bind_width$$lz$2Fedittext$2Elzx_198_48_$m387 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("width", Debug.evalCarefully("", 198, function  () {
return parent
}
, this).width - 4)
}}
, "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_198_48_$m387", function $lzc$dependencies_width$$lz$2Fedittext$2Elzx_198_48_$m387 () {
with (this) {
return( [Debug.evalCarefully("", 198, function  () {
return parent
}
, this), "width"])
}}
, "$lzc$bind_height$$lz$2Fedittext$2Elzx_198_48_$m388", function $lzc$bind_height$$lz$2Fedittext$2Elzx_198_48_$m388 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("height", Debug.evalCarefully("", 198, function  () {
return parent
}
, this).height - Debug.evalCarefully("", 198, function  () {
return y
}
, this) - 2)
}}
, "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_198_48_$m388", function $lzc$dependencies_height$$lz$2Fedittext$2Elzx_198_48_$m388 () {
with (this) {
return( [Debug.evalCarefully("", 198, function  () {
return parent
}
, this), "height", this, "y"])
}}
, "$lzc$handle_onfocus$$lz$2Fedittext$2Elzx_200_46_$m389", function $lzc$handle_onfocus$$lz$2Fedittext$2Elzx_200_46_$m389 (s_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#201.18 -*- */
if (Debug.evalCarefully("lz/edittext.lzx", 201, function  () {
/* -*- file: #201 -*- */
return parent
}
/* -*- file:  -*- */
, this)["onfocus"]) {
/* -*- file: lz/edittext.lzx#201.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 201, function  () {
/* -*- file: #201 -*- */
return parent
}
/* -*- file:  -*- */
, this).onfocus.sendEvent(s_$1)
}}}
, "$lzc$handle_onblur$$lz$2Fedittext$2Elzx_203_45_$m390", function $lzc$handle_onblur$$lz$2Fedittext$2Elzx_203_45_$m390 (s_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#204.18 -*- */
if (Debug.evalCarefully("lz/edittext.lzx", 204, function  () {
/* -*- file: #204 -*- */
return parent
}
/* -*- file:  -*- */
, this)["onblur"]) {
/* -*- file: lz/edittext.lzx#204.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 204, function  () {
/* -*- file: #204 -*- */
return parent
}
/* -*- file:  -*- */
, this).onblur.sendEvent(s_$1)
}}}
, "$lzc$handle_onkeyup$$lz$2Fedittext$2Elzx_206_47_$m391", function $lzc$handle_onkeyup$$lz$2Fedittext$2Elzx_206_47_$m391 (kc_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#207.19 -*- */
if (Debug.evalCarefully("lz/edittext.lzx", 207, function  () {
/* -*- file: #207 -*- */
return parent
}
/* -*- file:  -*- */
, this)["onkeyup"]) {
/* -*- file: lz/edittext.lzx#207.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 207, function  () {
/* -*- file: #207 -*- */
return parent
}
/* -*- file:  -*- */
, this).onkeyup.sendEvent(kc_$1)
};
/* -*- file: lz/edittext.lzx#208.19 -*- */
if (kc_$1 == 13 && Debug.evalCarefully("lz/edittext.lzx", 208, function  () {
/* -*- file: #208 -*- */
return parent
}
/* -*- file:  -*- */
, this).doesenter) {
/* -*- file: lz/edittext.lzx#208.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 208, function  () {
/* -*- file: #208 -*- */
return parent
}
/* -*- file:  -*- */
, this).doEnterUp()
}}}
, "$lzc$handle_onkeydown$$lz$2Fedittext$2Elzx_211_49_$m392", function $lzc$handle_onkeydown$$lz$2Fedittext$2Elzx_211_49_$m392 (kc_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#212.19 -*- */
if (Debug.evalCarefully("lz/edittext.lzx", 212, function  () {
/* -*- file: #212 -*- */
return parent
}
/* -*- file:  -*- */
, this)["onkeydown"]) {
/* -*- file: lz/edittext.lzx#212.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 212, function  () {
/* -*- file: #212 -*- */
return parent
}
/* -*- file:  -*- */
, this).onkeydown.sendEvent(kc_$1)
};
/* -*- file: lz/edittext.lzx#213.19 -*- */
if (kc_$1 == 13 && Debug.evalCarefully("lz/edittext.lzx", 213, function  () {
/* -*- file: #213 -*- */
return parent
}
/* -*- file:  -*- */
, this).doesenter) {
/* -*- file: lz/edittext.lzx#213.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 213, function  () {
/* -*- file: #213 -*- */
return parent
}
/* -*- file:  -*- */
, this).doEnterDown()
}}}
, "getFocusRect", function getFocusRect () {
with (this) {
/* -*- file: lz/edittext.lzx#218.17 -*- */
return( Debug.evalCarefully("lz/edittext.lzx", 218, function  () {
/* -*- file: #218 -*- */
return parent
}
/* -*- file:  -*- */
, this).getFocusRect())
}}
, "$lzc$handle_ontext$$lz$2Fedittext$2Elzx_220_36_$m393", function $lzc$handle_ontext$$lz$2Fedittext$2Elzx_220_36_$m393 ($lzc$ignore_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#221.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 221, function  () {
/* -*- file: #221 -*- */
return parent
}
/* -*- file:  -*- */
, this).text = this.getText();
/* -*- file: lz/edittext.lzx#222.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 222, function  () {
/* -*- file: #222 -*- */
return parent
}
/* -*- file:  -*- */
, this).setValue(Debug.evalCarefully("lz/edittext.lzx", 222, function  () {
/* -*- file: lz/edittext.lzx#222.59 -*- */
return parent
}
/* -*- file:  -*- */
, this).text, false)
}}
, "$classrootdepth", void 0], ["tagname", "_internalinputtext", "attributes", new LzInheritedHash($lzc$class__internalinputtext.attributes)]);
/* -*- file: lz/edittext.lzx#23.1 -*- */
/* -*- file: #24 -*- */
/* -*- file: #23 -*- */
Class.make("$lzc$class_edittext", $lzc$class_baseformitem, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "multiline", void 0, "password", void 0, "resizable", void 0, "$lzc$bind_text_y$$lz$2Fedittext$2Elzx_49_102_$m294", function $lzc$bind_text_y$$lz$2Fedittext$2Elzx_49_102_$m294 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("text_y", Debug.evalCarefully("", 49, function  () {
return multiline
}
, this) ? 2 : this.height / 2 - this.field.getTextHeight() / 2 - 3)
}}
, "$lzc$dependencies_text_y$$lz$2Fedittext$2Elzx_49_102_$m294", function $lzc$dependencies_text_y$$lz$2Fedittext$2Elzx_49_102_$m294 () {
return [this, "multiline", this, "height"].concat(this.field["$lzc$getTextHeight_dependencies"] ? this.field["$lzc$getTextHeight_dependencies"](this, this.field) : [])
}
, "text_y", void 0, "maxlength", void 0, "pattern", void 0, "$lzc$set_fgcolor", function $lzc$set_fgcolor (fgcolor_$1) {

}
, "_fgcolor", void 0, "_initialtext", void 0, "init", function init () {
with (this) {
/* -*- file: lz/edittext.lzx#76.13 -*- */
if (!this.hassetwidth) {
/* -*- file: #76 -*- */
/* -*- file: #77 -*- */
if (typeof this.textwidth == "undefined") {
/* -*- file: #77 -*- */
/* -*- file: #78 -*- */
this.textwidth = 100
};
setAttribute("width", this.textwidth + 6)
};
/* -*- file: #81 -*- */
/* -*- file: #82 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["init"] : this.nextMethod(arguments.callee, "init")).call(this);
if (this._initialtext != null) {
/* -*- file: #83 -*- */
/* -*- file: #84 -*- */
this.setAttribute("text", this._initialtext)
};
/* -*- file: #87 -*- */
Debug.evalCarefully("lz/edittext.lzx", 87, function  () {
/* -*- file: #87 -*- */
return field
}
/* -*- file:  -*- */
, this).setAttribute("maxlength", this.maxlength);
/* -*- file: lz/edittext.lzx#88.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 88, function  () {
/* -*- file: #88 -*- */
return field
}
/* -*- file:  -*- */
, this).setAttribute("pattern", this.pattern)
}}
, "setText", function setText (t_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#96.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 96, function  () {
/* -*- file: #96 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("edittext.setText is deprecated. Use setAttribute instead");
/* -*- file: lz/edittext.lzx#97.13 -*- */
this.setAttribute("text", t_$1)
}}
/* -*- file:  -*- */
, "$lzc$set_text", function $lzc$set_text (t_$1) {
/* -*- file: lz/edittext.lzx#102.13 -*- */
this.text = t_$1;
if (this._initcomplete) {
/* -*- file: #103 -*- */
/* -*- file: #104 -*- */
this.setValue(t_$1, true);
this.field.setAttribute("text", this.value);
if (this["ontext"]) {
/* -*- file: #106 -*- */
this.ontext.sendEvent()
}} else {
/* -*- file: #107 -*- */
/* -*- file: #108 -*- */
this._initialtext = t_$1
}}
/* -*- file:  -*- */
, "clearText", function clearText () {
/* -*- file: lz/edittext.lzx#114.13 -*- */
this.setAttribute("text", "")
}
/* -*- file:  -*- */
, "setMaxlength", function setMaxlength (n_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#120.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 120, function  () {
/* -*- file: #120 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("edittext.setMaxlength is deprecated. Use setAttribute instead");
/* -*- file: lz/edittext.lzx#121.11 -*- */
this.setAttribute("maxlength", n_$1)
}}
/* -*- file:  -*- */
, "setPattern", function setPattern (r_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#128.1 -*- */
Debug.evalCarefully("lz/edittext.lzx", 128, function  () {
/* -*- file: #128 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("edittext.setPattern is deprecated. Use setAttribute instead");
/* -*- file: lz/edittext.lzx#129.11 -*- */
this.setAttribute("pattern", r_$1)
}}
/* -*- file:  -*- */
, "$lzc$set_maxlength", function $lzc$set_maxlength (n_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#134.13 -*- */
if (this["maxlength"] === n_$1) {
/* -*- file: #134 -*- */
return
};
/* -*- file: #135 -*- */
this.maxlength = n_$1;
if (this.isinited) {
/* -*- file: #136 -*- */
Debug.evalCarefully("lz/edittext.lzx", 136, function  () {
/* -*- file: #136 -*- */
return field
}
/* -*- file:  -*- */
, this).setAttribute("maxlength", n_$1)
};
/* -*- file: lz/edittext.lzx#137.13 -*- */
if (this["onmaxlength"]) {
/* -*- file: #137 -*- */
this.onmaxlength.sendEvent(n_$1)
}}}
/* -*- file:  -*- */
, "$lzc$set_pattern", function $lzc$set_pattern (n_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#142.13 -*- */
if (this["pattern"] === n_$1) {
/* -*- file: #142 -*- */
return
};
/* -*- file: #143 -*- */
this.pattern = n_$1;
if (this.isinited) {
/* -*- file: #144 -*- */
Debug.evalCarefully("lz/edittext.lzx", 144, function  () {
/* -*- file: #144 -*- */
return field
}
/* -*- file:  -*- */
, this).setAttribute("pattern", n_$1)
};
/* -*- file: lz/edittext.lzx#145.13 -*- */
if (this["onpattern"]) {
/* -*- file: #145 -*- */
this.onpattern.sendEvent(n_$1)
}}}
/* -*- file:  -*- */
, "setSelection", function setSelection (start_$1, end_$2) {
with (this) {
/* -*- file: lz/edittext.lzx#151.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #152 -*- */
end_$2 = null
};
/* -*- file: #157 -*- */
Debug.evalCarefully("lz/edittext.lzx", 157, function  () {
/* -*- file: #157 -*- */
return field
}
/* -*- file:  -*- */
, this).setSelection(start_$1, end_$2)
}}
, "getFocusRect", function getFocusRect () {
with (this) {
/* -*- file: lz/edittext.lzx#162.12 -*- */
var fx_$1 = this.getAttributeRelative("x", Debug.evalCarefully("lz/edittext.lzx", 162, function  () {
/* -*- file: #162 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: lz/edittext.lzx#163.12 -*- */
var fy_$2 = this.getAttributeRelative("y", Debug.evalCarefully("lz/edittext.lzx", 163, function  () {
/* -*- file: #163 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: lz/edittext.lzx#164.12 -*- */
var fw_$3 = this.getAttributeRelative("width", Debug.evalCarefully("lz/edittext.lzx", 164, function  () {
/* -*- file: #164 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: lz/edittext.lzx#165.12 -*- */
var fh_$4 = this.getAttributeRelative("height", Debug.evalCarefully("lz/edittext.lzx", 165, function  () {
/* -*- file: #165 -*- */
return canvas
}
/* -*- file:  -*- */
, this));
/* -*- file: lz/edittext.lzx#166.12 -*- */
return [fx_$1, fy_$2, fw_$3, fh_$4]
}}
/* -*- file:  -*- */
, "_outerbezel", void 0, "_innerbezel", void 0, "_face", void 0, "field", void 0, "getText", function getText () {
/* -*- file: lz/edittext.lzx#230.13 -*- */
if (this._initcomplete) {
/* -*- file: #230 -*- */
/* -*- file: #231 -*- */
return this.field.getText()
} else {
/* -*- file: #232 -*- */
/* -*- file: #233 -*- */
return this._initialtext
}}
/* -*- file:  -*- */
, "applyData", function applyData (d_$1) {
/* -*- file: lz/edittext.lzx#246.13 -*- */
this.field.applyData(d_$1)
}
/* -*- file:  -*- */
, "acceptValue", function acceptValue (d_$1, type_$2) {
/* -*- file: lz/edittext.lzx#252.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #253 -*- */
type_$2 = null
};
/* -*- file: #251 -*- */
this.applyData(d_$1)
}
/* -*- file:  -*- */
, "updateData", function updateData () {
/* -*- file: lz/edittext.lzx#262.13 -*- */
this.updateText();
return this.text
}
/* -*- file:  -*- */
, "updateText", function updateText () {
/* -*- file: lz/edittext.lzx#269.13 -*- */
this.setAttribute("text", this.field.getText())
}
/* -*- file:  -*- */
, "getValue", function getValue () {
/* -*- file: lz/edittext.lzx#275.13 -*- */
return this.field.getText()
}
/* -*- file:  -*- */
, "$lzc$getValue_dependencies", function $lzc$getValue_dependencies (who_$1, self_$2) {
/* -*- file: lz/edittext.lzx#282.11 -*- */
self_$2 = this.field;
return self_$2.$lzc$getText_dependencies(who_$1, self_$2)
}
/* -*- file:  -*- */
, "_showEnabled", function _showEnabled () {
with (this) {
/* -*- file: lz/edittext.lzx#289.13 -*- */
if (Debug.evalCarefully("lz/edittext.lzx", 289, function  () {
/* -*- file: #289 -*- */
return _enabled
}
/* -*- file:  -*- */
, this)) {
/* -*- file: lz/edittext.lzx#289.27 -*- */
/* -*- file: #290 -*- */
this.field.setAttribute("enabled", true);
this.field.setAttribute("fgcolor", this.style != null ? this.style.textcolor : null);
this._face.setAttribute("opacity", 1);
this._outerbezel.setAttribute("frame", 1);
this._innerbezel.setAttribute("frame", 1)
} else {
/* -*- file: #295 -*- */
/* -*- file: #296 -*- */
this.field.setAttribute("enabled", false);
this.field.setAttribute("width", this.width - 6);
this.field.setAttribute("height", this.height - 6);
this.field.setAttribute("fgcolor", this.style != null ? this.style.textdisabledcolor : null);
this._face.setAttribute("opacity", 0.65);
this._outerbezel.setAttribute("frame", 2);
this._innerbezel.setAttribute("frame", 2)
}}}
/* -*- file:  -*- */
, "_applystyle", function _applystyle (s_$1) {
with (this) {
/* -*- file: lz/edittext.lzx#308.13 -*- */
if (this.style != null) {
/* -*- file: #308 -*- */
/* -*- file: #310 -*- */
Debug.evalCarefully("lz/edittext.lzx", 310, function  () {
/* -*- file: #310 -*- */
return _face
}
/* -*- file:  -*- */
, this).setAttribute("bgcolor", s_$1.textfieldcolor)
}}}
], ["tagname", "edittext", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 170, height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_170_63_$m304", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_170_63_$m304"), name: "_outerbezel", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_170_63_$m303", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_170_63_$m303")}, "class": $lzc$class_$m394}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 179, height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_179_79_$m337", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_179_79_$m337"), name: "_innerbezel", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_179_79_$m336", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_179_79_$m336"), x: 1, y: 1}, "class": $lzc$class_$m399}, {attrs: {$classrootdepth: 1, _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 191, height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_191_80_$m380", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_191_80_$m380"), name: "_face", width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_191_80_$m379", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_191_80_$m379"), x: 2, y: 2}, "class": $lzc$class_$m405}, {attrs: {$classrootdepth: 1, $delegates: ["onfocus", "$lzc$handle_onfocus$$lz$2Fedittext$2Elzx_200_46_$m389", null, "onblur", "$lzc$handle_onblur$$lz$2Fedittext$2Elzx_203_45_$m390", null, "onkeyup", "$lzc$handle_onkeyup$$lz$2Fedittext$2Elzx_206_47_$m391", null, "onkeydown", "$lzc$handle_onkeydown$$lz$2Fedittext$2Elzx_211_49_$m392", null, "ontext", "$lzc$handle_ontext$$lz$2Fedittext$2Elzx_220_36_$m393", null], _dbg_filename: "lz/edittext.lzx", _dbg_lineno: 198, height: new LzAlwaysExpr("$lzc$bind_height$$lz$2Fedittext$2Elzx_198_48_$m388", "$lzc$dependencies_height$$lz$2Fedittext$2Elzx_198_48_$m388"), name: "field", password: new LzOnceExpr("$lzc$bind_password$$lz$2Fedittext$2Elzx_198_48_$m384"), width: new LzAlwaysExpr("$lzc$bind_width$$lz$2Fedittext$2Elzx_198_48_$m387", "$lzc$dependencies_width$$lz$2Fedittext$2Elzx_198_48_$m387"), x: 3, y: new LzAlwaysExpr("$lzc$bind_y$$lz$2Fedittext$2Elzx_198_48_$m386", "$lzc$dependencies_y$$lz$2Fedittext$2Elzx_198_48_$m386")}, "class": $lzc$class_$m406}], $lzc$class_baseformitem["children"]), "attributes", new LzInheritedHash($lzc$class_baseformitem.attributes)]);
/* -*- file: lz/edittext.lzx#23.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: lz/edittext.lzx#24.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #24 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #24 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 317, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "lz/edittext.lzx", _dbg_lineno: 24, _fgcolor: 0, _initialtext: "", fgcolor: Debug.evalCarefully("lz/edittext.lzx", 65, function  () {
/* -*- file: lz/edittext.lzx#65.58 -*- */
return LzColorUtils
}
/* -*- file:  -*- */
, this).convertColor("0x0"), focusable: false, height: 26, maxlength: null, multiline: false, password: false, pattern: "", text_y: new (Debug.evalCarefully("", 64, function  () {
return LzAlwaysExpr
}
, this))("$lzc$bind_text_y$$lz$2Fedittext$2Elzx_49_102_$m294", "$lzc$dependencies_text_y$$lz$2Fedittext$2Elzx_49_102_$m294"), width: 106}, Debug.evalCarefully("", 49, function  () {
return $lzc$class_edittext
}
, this).attributes)
}}}
;
/* -*- file: lz/edittext.lzx#24.40 -*- */
$lzsc$temp._dbg_name = "lz/edittext.lzx#24/1";
/* -*- file: #24 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_edittext);
/* -*- file: utils/layouts/simplelayout.lzx#1.1 -*- */
/* -*- file: #2 -*- */
/* -*- file: #1 -*- */
Class.make("$lzc$class_simplelayout", LzLayout, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "axis", void 0, "$lzc$set_axis", function $lzc$set_axis (axis_$1) {
/* -*- file: -*- */
/* -*- file: utils/layouts/simplelayout.lzx#5.127 -*- */
this.setAxis(axis_$1)
}
/* -*- file:  -*- */
, "inset", void 0, "$lzc$set_inset", function $lzc$set_inset (inset_$1) {
/* -*- file: utils/layouts/simplelayout.lzx#11.80 -*- */
this.inset = inset_$1;
/* -*- file: #11 -*- */
if (this.subviews && this.subviews.length) {
/* -*- file: #11 -*- */
this.update()
};
/* -*- file: #11 -*- */
if (this["oninset"]) {
/* -*- file: #11 -*- */
this.oninset.sendEvent(this.inset)
}}
/* -*- file:  -*- */
, "spacing", void 0, "$lzc$set_spacing", function $lzc$set_spacing (spacing_$1) {
/* -*- file: utils/layouts/simplelayout.lzx#17.143 -*- */
this.spacing = spacing_$1;
/* -*- file: #17 -*- */
if (this.subviews && this.subviews.length) {
/* -*- file: #17 -*- */
this.update()
};
/* -*- file: #17 -*- */
if (this["onspacing"]) {
/* -*- file: #17 -*- */
this.onspacing.sendEvent(this.spacing)
}}
/* -*- file:  -*- */
, "setAxis", function setAxis (a_$1) {
/* -*- file: utils/layouts/simplelayout.lzx#21.9 -*- */
if (this["axis"] == null || this.axis != a_$1) {
/* -*- file: #21 -*- */
/* -*- file: #22 -*- */
this.axis = a_$1;
this.sizeAxis = a_$1 == "x" ? "width" : "height";
/* -*- file: #25 -*- */
if (this.subviews.length) {
/* -*- file: #25 -*- */
this.update()
};
/* -*- file: #26 -*- */
if (this["onaxis"]) {
/* -*- file: #26 -*- */
this.onaxis.sendEvent(this.axis)
}}}
/* -*- file:  -*- */
, "addSubview", function addSubview (newsub_$1) {
with (this) {
/* -*- file: utils/layouts/simplelayout.lzx#32.9 -*- */
this.updateDelegate.register(newsub_$1, "on" + this.sizeAxis);
this.updateDelegate.register(newsub_$1, "onvisible");
/* -*- file: #36 -*- */
if (!this.locked) {
/* -*- file: #36 -*- */
/* -*- file: #37 -*- */
var rv_$2 = null;
var sv_$3 = this.subviews;
for (var i_$4 = sv_$3.length - 1;i_$4 >= 0;--i_$4) {
/* -*- file: #39 -*- */
/* -*- file: #40 -*- */
if (sv_$3[i_$4].visible) {
/* -*- file: #40 -*- */
/* -*- file: #41 -*- */
rv_$2 = sv_$3[i_$4];
break
}};
/* -*- file: #46 -*- */
if (rv_$2) {
/* -*- file: #46 -*- */
/* -*- file: #47 -*- */
var p_$5 = rv_$2[this.axis] + rv_$2[this.sizeAxis] + this.spacing
} else {
/* -*- file: #48 -*- */
/* -*- file: #49 -*- */
var p_$5 = this.inset
};
/* -*- file: #52 -*- */
newsub_$1.setAttribute(this.axis, p_$5)
};
/* -*- file: #53 -*- */
/* -*- file: #54 -*- */
(arguments.callee.superclass ? arguments.callee.superclass.prototype["addSubview"] : this.nextMethod(arguments.callee, "addSubview")).call(this, newsub_$1)
}}
/* -*- file:  -*- */
, "update", function update (v_$1) {
/* -*- file: utils/layouts/simplelayout.lzx#60.14 -*- */
switch (arguments.length) {
case 0:
/* -*- file: #61 -*- */
v_$1 = null
};
if (this.locked) {
/* -*- file: #63 -*- */
return
};
/* -*- file: #64 -*- */
var l_$2 = this.subviews.length;
var c_$3 = this.inset;
/* -*- file: #67 -*- */
for (var i_$4 = 0;i_$4 < l_$2;i_$4++) {
/* -*- file: #67 -*- */
/* -*- file: #68 -*- */
var s_$5 = this.subviews[i_$4];
if (!s_$5.visible) {
/* -*- file: #69 -*- */
continue
};
/* -*- file: #70 -*- */
if (s_$5[this.axis] != c_$3) {
/* -*- file: #70 -*- */
/* -*- file: #71 -*- */
s_$5.setAttribute(this.axis, c_$3)
};
c_$3 += this.spacing + s_$5[this.sizeAxis]
}}
/* -*- file:  -*- */
], ["tagname", "simplelayout", "attributes", new LzInheritedHash(LzLayout.attributes)]);
/* -*- file: utils/layouts/simplelayout.lzx#1.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: utils/layouts/simplelayout.lzx#2.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #2 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #2 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 81, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "utils/layouts/simplelayout.lzx", _dbg_lineno: 2, axis: "y", inset: 0, spacing: 0}, Debug.evalCarefully("", 21, function  () {
return $lzc$class_simplelayout
}
, this).attributes)
}}}
;
/* -*- file: utils/layouts/simplelayout.lzx#2.40 -*- */
$lzsc$temp._dbg_name = "utils/layouts/simplelayout.lzx#2/1";
/* -*- file: #2 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_simplelayout);
/* -*- file: debugger/library.lzx#11.1 -*- */
/* -*- file: #12 -*- */
/* -*- file: #11 -*- */
Class.make("$lzc$class_debug", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0], ["tagname", "debug", "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: #11 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: debugger/library.lzx#12.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #12 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #12 -*- */
/* -*- file: -*- */
/* -*- file: debugger/library.lzx#17.1 -*- */
Debug.evalCarefully("debugger/library.lzx", 17, function  () {
/* -*- file: #17 -*- */
return LzNode
}
/* -*- file:  -*- */
, this).mergeAttributes({_dbg_filename: "debugger/library.lzx", _dbg_lineno: 12}, Debug.evalCarefully("", 16, function  () {
return $lzc$class_debug
}
, this).attributes)
}}}
;
/* -*- file: debugger/library.lzx#12.40 -*- */
$lzsc$temp._dbg_name = "debugger/library.lzx#12/1";
/* -*- file: #12 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_debug);
/* -*- file: base/remote/rtmpConnection.lzx#3.1 -*- */
/* -*- file: #4 -*- */
/* -*- file: #3 -*- */
Class.make("$lzc$class_rtmpConnection", LzNode, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "debug", void 0, "onconnect", void 0, "onerror", void 0, "lastCalled", void 0, "src", void 0, "connect", function connect () {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#18.13 -*- */
this._nc = new (Debug.evalCarefully("base/remote/rtmpConnection.lzx", 18, function  () {
/* -*- file: #18 -*- */
return NetConnection
}
/* -*- file:  -*- */
, this))();
/* -*- file: base/remote/rtmpConnection.lzx#21.13 -*- */
this._nc.t = this;
/* -*- file: #23 -*- */
var ok_$1 = this._nc.connect(Debug.evalCarefully("base/remote/rtmpConnection.lzx", 23, function  () {
/* -*- file: #23 -*- */
return src
}
/* -*- file:  -*- */
, this) == "null" ? null : Debug.evalCarefully("base/remote/rtmpConnection.lzx", 23, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#23.73 -*- */
return src
}
/* -*- file:  -*- */
, this));
/* -*- file: base/remote/rtmpConnection.lzx#24.13 -*- */
if (this.debug) {
/* -*- file: #24 -*- */
/* -*- file: #25 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 25, function  () {
/* -*- file: #25 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("Ok:", ok_$1)
};
/* -*- file: base/remote/rtmpConnection.lzx#28.1 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 28, function  () {
/* -*- file: #28 -*- */
return canvas
}
/* -*- file:  -*- */
, this).currentNC = this._nc;
/* -*- file: base/remote/rtmpConnection.lzx#30.13 -*- */
this._nc.onStatus = function  (info_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#31.17 -*- */
this.t._onStatus(info_$1)
}
/* -*- file:  -*- */
;
/* -*- file: base/remote/rtmpConnection.lzx#34.1 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 34, function  () {
/* -*- file: #34 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("devRtmpConnection/registerMethods()");
/* -*- file: base/remote/rtmpConnection.lzx#36.25 -*- */
this.registerMethods()
}}
/* -*- file:  -*- */
, "_onStatus", function _onStatus (info_$1) {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#40.13 -*- */
if (this.debug) {
/* -*- file: #40 -*- */
/* -*- file: #41 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 41, function  () {
/* -*- file: #41 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("devrtmpconnection", this, "_onStatus", info_$1.code)
};
/* -*- file: base/remote/rtmpConnection.lzx#44.13 -*- */
var msg_$2 = "";
/* -*- file: #46 -*- */
switch (info_$1.code) {
/* -*- file: #48 -*- */
case "NetConnection.Connect.Success":
/* -*- file: #48 -*- */
/* -*- file: #50 -*- */
msg_$2 = info_$1.code;
s = 2;
break;;default:
/* -*- file: #55 -*- */
/* -*- file: #56 -*- */
msg_$2 = info_$1.code;
s = 0;
break
};
/* -*- file: #63 -*- */
this.setAttribute("status", msg_$2);
/* -*- file: #65 -*- */
if (Debug.evalCarefully("base/remote/rtmpConnection.lzx", 65, function  () {
/* -*- file: #65 -*- */
return s
}
/* -*- file:  -*- */
, this) == 2) {
/* -*- file: base/remote/rtmpConnection.lzx#65.25 -*- */
/* -*- file: #66 -*- */
this.onconnect.sendEvent()
} else {
/* -*- file: #67 -*- */
/* -*- file: #68 -*- */
this.onerror.sendEvent()
}}}
/* -*- file:  -*- */
, "disconnect", function disconnect () {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#75.1 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 75, function  () {
/* -*- file: #75 -*- */
return canvas
}
/* -*- file:  -*- */
, this).currentNC = null;
/* -*- file: base/remote/rtmpConnection.lzx#76.13 -*- */
this._nc.close()
}}
/* -*- file:  -*- */
, "registerMethods", function registerMethods () {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#88.17 -*- */
if (this.subnodes != null) {
/* -*- file: #88 -*- */
/* -*- file: #90 -*- */
for (var i_$1 = 0;i_$1 < this.subnodes.length;i_$1++) {
/* -*- file: #90 -*- */
/* -*- file: #92 -*- */
if (this.subnodes[i_$1] instanceof Debug.evalCarefully("base/remote/rtmpConnection.lzx", 92, function  () {
/* -*- file: #92 -*- */
return lz
}
/* -*- file:  -*- */
, this).netremotecall) {
/* -*- file: base/remote/rtmpConnection.lzx#92.78 -*- */
/* -*- file: #93 -*- */
var t_$2 = hib;
this._nc[this.subnodes[i_$1].funcname] = function  (args_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#95.37 -*- */
return hib.remoteCallMethod(arguments.callee, args_$1)
}
/* -*- file:  -*- */

}}}}}
, "remoteCallMethod", function remoteCallMethod (callee_$1, args_$2) {
/* -*- file: base/remote/rtmpConnection.lzx#109.13 -*- */
for (var eg_$3 in this._nc) {
/* -*- file: #109 -*- */
/* -*- file: #110 -*- */
if (this._nc[eg_$3] == callee_$1) {
/* -*- file: #110 -*- */
/* -*- file: #111 -*- */
if (this.debug) {
/* -*- file: #111 -*- */
/* -*- file: #113 -*- */

};
/* -*- file: #114 -*- */
return this.callFuntion(eg_$3, args_$2)
}}}
/* -*- file:  -*- */
, "callFuntion", function callFuntion (funcname_$1, args_$2) {
/* -*- file: base/remote/rtmpConnection.lzx#126.13 -*- */
for (var i_$3 = 0;i_$3 < this.subnodes.length;i_$3++) {
/* -*- file: #126 -*- */
/* -*- file: #127 -*- */
if (this.subnodes[i_$3].funcname == funcname_$1) {
/* -*- file: #127 -*- */
/* -*- file: #128 -*- */
return this.subnodes[i_$3].onResult(args_$2)
}}}
/* -*- file:  -*- */
, "callRPC", function callRPC (func_$1, obj_$2, params_$3) {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#135.9 -*- */
if (this.debug) {
/* -*- file: #135 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 135, function  () {
/* -*- file: #135 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("*** call: func, obj, params", func_$1, obj_$2, typeof params_$3, params_$3.length)
};
/* -*- file: base/remote/rtmpConnection.lzx#136.9 -*- */
if (params_$3.length != 0) {
/* -*- file: #136 -*- */
/* -*- file: #138 -*- */
ASSetPropFlags(Debug.evalCarefully("base/remote/rtmpConnection.lzx", 138, function  () {
/* -*- file: #138 -*- */
return _global
}
/* -*- file:  -*- */
, this), null, 8, 1);
/* -*- file: base/remote/rtmpConnection.lzx#141.25 -*- */
if (params_$3.length == 1) {
/* -*- file: #141 -*- */
/* -*- file: #142 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0])
} else {
/* -*- file: #143 -*- */
if (params_$3.length == 2) {
/* -*- file: #143 -*- */
/* -*- file: #144 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1])
} else {
/* -*- file: #145 -*- */
if (params_$3.length == 3) {
/* -*- file: #145 -*- */
/* -*- file: #146 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2])
} else {
/* -*- file: #147 -*- */
if (params_$3.length == 4) {
/* -*- file: #147 -*- */
/* -*- file: #148 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3])
} else {
/* -*- file: #149 -*- */
if (params_$3.length == 5) {
/* -*- file: #149 -*- */
/* -*- file: #150 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4])
} else {
/* -*- file: #151 -*- */
if (params_$3.length == 6) {
/* -*- file: #151 -*- */
/* -*- file: #152 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5])
} else {
/* -*- file: #153 -*- */
if (params_$3.length == 7) {
/* -*- file: #153 -*- */
/* -*- file: #154 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6])
} else {
/* -*- file: #155 -*- */
if (params_$3.length == 8) {
/* -*- file: #155 -*- */
/* -*- file: #156 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7])
} else {
/* -*- file: #157 -*- */
if (params_$3.length == 9) {
/* -*- file: #157 -*- */
/* -*- file: #158 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8])
} else {
/* -*- file: #159 -*- */
if (params_$3.length == 10) {
/* -*- file: #159 -*- */
/* -*- file: #160 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9])
} else {
/* -*- file: #161 -*- */
if (params_$3.length == 11) {
/* -*- file: #161 -*- */
/* -*- file: #162 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10])
} else {
/* -*- file: #163 -*- */
if (params_$3.length == 12) {
/* -*- file: #163 -*- */
/* -*- file: #164 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11])
} else {
/* -*- file: #165 -*- */
if (params_$3.length == 13) {
/* -*- file: #165 -*- */
/* -*- file: #166 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12])
} else {
/* -*- file: #167 -*- */
if (params_$3.length == 14) {
/* -*- file: #167 -*- */
/* -*- file: #168 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13])
} else {
/* -*- file: #169 -*- */
if (params_$3.length == 15) {
/* -*- file: #169 -*- */
/* -*- file: #170 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14])
} else {
/* -*- file: #171 -*- */
if (params_$3.length == 16) {
/* -*- file: #171 -*- */
/* -*- file: #172 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14], params_$3[15])
} else {
/* -*- file: #173 -*- */
if (params_$3.length == 17) {
/* -*- file: #173 -*- */
/* -*- file: #174 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14], params_$3[15], params_$3[16])
} else {
/* -*- file: #175 -*- */
if (params_$3.length == 18) {
/* -*- file: #175 -*- */
/* -*- file: #176 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14], params_$3[15], params_$3[16], params_$3[17])
} else {
/* -*- file: #177 -*- */
if (params_$3.length == 19) {
/* -*- file: #177 -*- */
/* -*- file: #178 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14], params_$3[15], params_$3[16], params_$3[17], params_$3[18])
} else {
/* -*- file: #179 -*- */
if (params_$3.length == 20) {
/* -*- file: #179 -*- */
/* -*- file: #180 -*- */
this._nc.call(func_$1, obj_$2, params_$3[0], params_$3[1], params_$3[2], params_$3[3], params_$3[4], params_$3[5], params_$3[6], params_$3[7], params_$3[8], params_$3[9], params_$3[10], params_$3[11], params_$3[12], params_$3[13], params_$3[14], params_$3[15], params_$3[16], params_$3[17], params_$3[18], params_$3[19])
}}}}}}}}}}}}}}}}}}}}} else {
/* -*- file: #183 -*- */
this._nc.call(func_$1, obj_$2)
}}}
/* -*- file:  -*- */
], ["tagname", "rtmpConnection", "attributes", new LzInheritedHash(LzNode.attributes)]);
/* -*- file: base/remote/rtmpConnection.lzx#3.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#4.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #4 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #4 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 190, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/remote/rtmpConnection.lzx", _dbg_lineno: 4, debug: true, lastCalled: null, onconnect: Debug.evalCarefully("base/remote/rtmpConnection.lzx", 8, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#8.72 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onerror: Debug.evalCarefully("base/remote/rtmpConnection.lzx", 9, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#9.72 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), src: ""}, Debug.evalCarefully("", 19, function  () {
return $lzc$class_rtmpConnection
}
, this).attributes)
}}}
;
/* -*- file: base/remote/rtmpConnection.lzx#4.40 -*- */
$lzsc$temp._dbg_name = "base/remote/rtmpConnection.lzx#4/1";
/* -*- file: #4 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_rtmpConnection);
/* -*- file: base/remote/rtmpConnection.lzx#195.1 -*- */
/* -*- file: #196 -*- */
/* -*- file: #195 -*- */
Class.make("$lzc$class_netremotecall", LzNode, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_funcname$$base$2Fremote$2FrtmpConnection$2Elzx_200_72_$m423", function $lzc$bind_funcname$$base$2Fremote$2FrtmpConnection$2Elzx_200_72_$m423 ($lzc$ignore_$1) {
/* -*- file: -*- */
this.setAttribute("funcname", null)
}
, "funcname", void 0, "remotecontext", void 0, "dataobject", void 0, "onerror", void 0, "callRPC", function callRPC (params_$1) {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#214.13 -*- */
if (this.funcname == null) {
/* -*- file: #214 -*- */
/* -*- file: #216 -*- */
if (this.onerror) {
/* -*- file: #216 -*- */
this.onerror.sendEvent("No funcname given")
};
/* -*- file: #217 -*- */
return
};
/* -*- file: #220 -*- */
if (params_$1 == null) {
/* -*- file: #220 -*- */
/* -*- file: #221 -*- */
params_$1 = [];
/* -*- file: #223 -*- */
var subnodes_$2 = this.subnodes;
if (subnodes_$2 != null) {
/* -*- file: #224 -*- */
/* -*- file: #225 -*- */
var i_$3;
var n_$4 = subnodes_$2.length;
for (i_$3 = 0;i_$3 < n_$4;i_$3++) {
/* -*- file: #227 -*- */
/* -*- file: #230 -*- */
var tsi_$5 = subnodes_$2[i_$3];
if (tsi_$5["getValue"] != null && tsi_$5.getValue["prototype"] != null) {
/* -*- file: #233 -*- */
params_$1[i_$3] = tsi_$5.getValue()
} else {
/* -*- file: #234 -*- */
/* -*- file: #235 -*- */
params_$1[i_$3] = tsi_$5.value
}}}} else {
/* -*- file: #240 -*- */
if (params_$1.__proto__ != Array.prototype) {
/* -*- file: #240 -*- */
/* -*- file: #242 -*- */
return -1
}};
/* -*- file: #246 -*- */
var rtmpObject_$6 = null;
if (this.parent instanceof Debug.evalCarefully("base/remote/rtmpConnection.lzx", 247, function  () {
/* -*- file: #247 -*- */
return lz
}
/* -*- file:  -*- */
, this).rtmpConnection) {
/* -*- file: base/remote/rtmpConnection.lzx#247.58 -*- */
/* -*- file: #248 -*- */
rtmpObject_$6 = this.parent
} else {
/* -*- file: #249 -*- */
if (this.remotecontext instanceof Debug.evalCarefully("base/remote/rtmpConnection.lzx", 249, function  () {
/* -*- file: #249 -*- */
return lz
}
/* -*- file:  -*- */
, this).rtmpConnection) {
/* -*- file: base/remote/rtmpConnection.lzx#249.72 -*- */
/* -*- file: #250 -*- */
rtmpObject_$6 = this.remotecontext
} else {
/* -*- file: #251 -*- */
/* -*- file: #252 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 252, function  () {
/* -*- file: #252 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("ERROR: no remotecontext availible abort call")
}};
/* -*- file: base/remote/rtmpConnection.lzx#256.13 -*- */
if (rtmpObject_$6.debug) {
/* -*- file: #256 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 256, function  () {
/* -*- file: #256 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("call", this, rtmpObject_$6, rtmpObject_$6.status)
};
/* -*- file: base/remote/rtmpConnection.lzx#257.13 -*- */
rtmpObject_$6.lastCalled = this;
rtmpObject_$6.callRPC(this.funcname, this, params_$1)
}}
/* -*- file:  -*- */
, "onResult", function onResult (value_$1) {
with (this) {
/* -*- file: base/remote/rtmpConnection.lzx#271.13 -*- */
if (this.dataobject != null) {
/* -*- file: #271 -*- */
/* -*- file: #272 -*- */
if (this.dataobject instanceof Debug.evalCarefully("base/remote/rtmpConnection.lzx", 272, function  () {
/* -*- file: #272 -*- */
return LzDataset
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/remote/rtmpConnection.lzx#272.61 -*- */
/* -*- file: #274 -*- */
var element_$2 = Debug.evalCarefully("base/remote/rtmpConnection.lzx", 274, function  () {
/* -*- file: #274 -*- */
return LzDataElement
}
/* -*- file:  -*- */
, this).valueToElement(value_$1);
/* -*- file: base/remote/rtmpConnection.lzx#275.21 -*- */
this.dataobject.setData(element_$2.childNodes)
} else {
/* -*- file: #276 -*- */
if (this.dataobject instanceof Debug.evalCarefully("base/remote/rtmpConnection.lzx", 276, function  () {
/* -*- file: #276 -*- */
return LzDataElement
}
/* -*- file:  -*- */
, this)) {
/* -*- file: base/remote/rtmpConnection.lzx#276.72 -*- */
/* -*- file: #277 -*- */
var element_$2 = Debug.evalCarefully("base/remote/rtmpConnection.lzx", 277, function  () {
/* -*- file: #277 -*- */
return LzDataElement
}
/* -*- file:  -*- */
, this).valueToElement(value_$1);
/* -*- file: base/remote/rtmpConnection.lzx#278.21 -*- */
this.dataobject.appendChild(element_$2)
} else {
/* -*- file: #279 -*- */
/* -*- file: #280 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 280, function  () {
/* -*- file: #280 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("dataobject is not LzDataset or LzDataElement: ", this, this.dataobject, Debug.evalCarefully("base/remote/rtmpConnection.lzx", 280, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#280.74 -*- */
return delegate
}
/* -*- file:  -*- */
, this))
}}};
/* -*- file: base/remote/rtmpConnection.lzx#283.13 -*- */
this.ondata.sendEvent(value_$1)
}}
/* -*- file:  -*- */
], ["tagname", "netremotecall", "attributes", new LzInheritedHash(LzNode.attributes)]);
/* -*- file: base/remote/rtmpConnection.lzx#195.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#196.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #196 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #196 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 290, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "base/remote/rtmpConnection.lzx", _dbg_lineno: 196, dataobject: null, funcname: new (Debug.evalCarefully("", 208, function  () {
return LzOnceExpr
}
, this))("$lzc$bind_funcname$$base$2Fremote$2FrtmpConnection$2Elzx_200_72_$m423"), ondata: Debug.evalCarefully("base/remote/rtmpConnection.lzx", 207, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#207.74 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), onerror: Debug.evalCarefully("base/remote/rtmpConnection.lzx", 210, function  () {
/* -*- file: base/remote/rtmpConnection.lzx#210.74 -*- */
return LzDeclaredEvent
}
/* -*- file:  -*- */
, this), remotecontext: null}, Debug.evalCarefully("", 206, function  () {
return $lzc$class_netremotecall
}
, this).attributes)
}}}
;
/* -*- file: base/remote/rtmpConnection.lzx#196.40 -*- */
$lzsc$temp._dbg_name = "base/remote/rtmpConnection.lzx#196/1";
/* -*- file: #196 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_netremotecall);
/* -*- file: base/remote/rtmpConnection.lzx#295.1 -*- */
/* -*- file: #296 -*- */
/* -*- file: #295 -*- */
Class.make("$lzc$class_netparam", LzNode, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "value", void 0], ["tagname", "netparam", "attributes", new LzInheritedHash(LzNode.attributes)]);
/* -*- file: #295 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#296.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #296 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #296 -*- */
/* -*- file: -*- */
/* -*- file: base/remote/rtmpConnection.lzx#302.1 -*- */
Debug.evalCarefully("base/remote/rtmpConnection.lzx", 302, function  () {
/* -*- file: #302 -*- */
return LzNode
}
/* -*- file:  -*- */
, this).mergeAttributes({_dbg_filename: "base/remote/rtmpConnection.lzx", _dbg_lineno: 296, value: null}, Debug.evalCarefully("", 303, function  () {
return $lzc$class_netparam
}
, this).attributes)
}}}
;
/* -*- file: base/remote/rtmpConnection.lzx#296.40 -*- */
$lzsc$temp._dbg_name = "base/remote/rtmpConnection.lzx#296/1";
/* -*- file: #296 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_netparam);
/* -*- file: base/remote/hibRtmpConnection.lzx#21.1 -*- */
/* -*- file: #22 -*- */
/* -*- file: #21 -*- */
Class.make("$lzc$class_$m463", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_23_45_$m442", function $lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_23_45_$m442 (value_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#25.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 25, function  () {
/* -*- file: #25 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/incoming [", value_$1, "]")
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#28.1 -*- */
/* -*- file: #29 -*- */
/* -*- file: #28 -*- */
Class.make("$lzc$class_$m464", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_30_45_$m447", function $lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_30_45_$m447 (value_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#32.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 32, function  () {
/* -*- file: #32 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/incoming [", value_$1, "]")
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#35.1 -*- */
/* -*- file: #36 -*- */
/* -*- file: #35 -*- */
Class.make("$lzc$class_$m465", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_37_45_$m452", function $lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_37_45_$m452 (value_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#39.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 39, function  () {
/* -*- file: #39 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/connected [", value_$1, "]")
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#42.1 -*- */
/* -*- file: #43 -*- */
/* -*- file: #42 -*- */
Class.make("$lzc$class_$m466", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_44_45_$m457", function $lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_44_45_$m457 (value_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#46.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 46, function  () {
/* -*- file: #46 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/registrationSucess [", value_$1, "]")
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#49.1 -*- */
/* -*- file: #50 -*- */
/* -*- file: #49 -*- */
Class.make("$lzc$class_$m467", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_51_45_$m462", function $lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_51_45_$m462 (value_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#53.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 53, function  () {
/* -*- file: #53 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/registrationFailure [", value_$1, "]")
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#4.1 -*- */
/* -*- file: #5 -*- */
/* -*- file: #4 -*- */
Class.make("$lzc$class_hibRtmpConnection", $lzc$class_rtmpConnection, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "returnObjectConnect", void 0, "$lzc$handle_onconnect$$base$2Fremote$2FhibRtmpConnection$2Elzx_9_32_$m436", function $lzc$handle_onconnect$$base$2Fremote$2FhibRtmpConnection$2Elzx_9_32_$m436 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#10.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 10, function  () {
/* -*- file: #10 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("hibRtmpConnection/onconnect");
/* -*- file: base/remote/hibRtmpConnection.lzx#11.9 -*- */
this.returnObjectConnect.onconnect.sendEvent()
}}
/* -*- file:  -*- */
, "$lzc$handle_onerror$$base$2Fremote$2FhibRtmpConnection$2Elzx_13_30_$m437", function $lzc$handle_onerror$$base$2Fremote$2FhibRtmpConnection$2Elzx_13_30_$m437 ($lzc$ignore_$1) {
with (this) {
/* -*- file: base/remote/hibRtmpConnection.lzx#15.1 -*- */
Debug.evalCarefully("base/remote/hibRtmpConnection.lzx", 15, function  () {
/* -*- file: #15 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("error ", this.status, this.src, this.lastCalled);
/* -*- file: base/remote/hibRtmpConnection.lzx#16.13 -*- */
if (this.returnObjectConnect != null) {
/* -*- file: #16 -*- */
/* -*- file: #17 -*- */
this.returnObjectConnect.onerror.sendEvent("ERROR:" + this.status + " SRC: " + this.src + " RPC: " + this.lastCalled)
}}}
/* -*- file:  -*- */
, "incoming", void 0, "callState", void 0, "connected", void 0, "registrationSucess", void 0, "registrationFailure", void 0], ["tagname", "hibRtmpConnection", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_23_45_$m442", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 22, funcname: "incoming", name: "incoming"}, "class": $lzc$class_$m463}, {attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_30_45_$m447", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 29, funcname: "callState", name: "callState"}, "class": $lzc$class_$m464}, {attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_37_45_$m452", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 36, funcname: "connected", name: "connected"}, "class": $lzc$class_$m465}, {attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_44_45_$m457", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 43, funcname: "registrationSucess", name: "registrationSucess"}, "class": $lzc$class_$m466}, {attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$base$2Fremote$2FhibRtmpConnection$2Elzx_51_45_$m462", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 50, funcname: "registrationFailure", name: "registrationFailure"}, "class": $lzc$class_$m467}], $lzc$class_rtmpConnection["children"]), "attributes", new LzInheritedHash($lzc$class_rtmpConnection.attributes)]);
/* -*- file: base/remote/hibRtmpConnection.lzx#4.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: base/remote/hibRtmpConnection.lzx#5.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #5 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #5 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 30, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onconnect", "$lzc$handle_onconnect$$base$2Fremote$2FhibRtmpConnection$2Elzx_9_32_$m436", null, "onerror", "$lzc$handle_onerror$$base$2Fremote$2FhibRtmpConnection$2Elzx_13_30_$m437", null], _dbg_filename: "base/remote/hibRtmpConnection.lzx", _dbg_lineno: 5, debug: false, returnObjectConnect: null, src: ""}, Debug.evalCarefully("", 9, function  () {
return $lzc$class_hibRtmpConnection
}
, this).attributes)
}}}
;
/* -*- file: base/remote/hibRtmpConnection.lzx#5.40 -*- */
$lzsc$temp._dbg_name = "base/remote/hibRtmpConnection.lzx#5/1";
/* -*- file: #5 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_hibRtmpConnection);
/* -*- file: modules/phone/enterSipGate.lzx#16.1 -*- */
/* -*- file: #17 -*- */
/* -*- file: #16 -*- */
Class.make("$lzc$class_$m487", LzText, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_17_81_$m478", function $lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_17_81_$m478 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("text", Debug.evalCarefully("", 17, function  () {
return parent
}
, this).fieldLabel)
}}
, "$classrootdepth", void 0], ["tagname", "text", "attributes", new LzInheritedHash(LzText.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#18.1 -*- */
/* -*- file: #19 -*- */
/* -*- file: #18 -*- */
Class.make("$lzc$class_$m488", $lzc$class_edittext, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_password$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m484", function $lzc$bind_password$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m484 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("password", Debug.evalCarefully("", 19, function  () {
return parent
}
, this).password)
}}
, "$lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m486", function $lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m486 ($lzc$ignore_$1) {
with (this) {
this.setAttribute("text", Debug.evalCarefully("", 19, function  () {
return parent
}
, this).fieldText)
}}
, "$classrootdepth", void 0], ["tagname", "edittext", "children", LzNode.mergeChildren([], $lzc$class_edittext["children"]), "attributes", new LzInheritedHash($lzc$class_edittext.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#3.1 -*- */
/* -*- file: #4 -*- */
/* -*- file: #3 -*- */
Class.make("$lzc$class_inputTextFieldPair", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "fieldLabel", void 0, "fieldText", void 0, "$lzc$set_fieldText", function $lzc$set_fieldText (fieldText_$1) {
/* -*- file: -*- */
/* -*- file: modules/phone/enterSipGate.lzx#6.149 -*- */
this.setText(fieldText_$1)
}
/* -*- file:  -*- */
, "password", void 0, "getText", function getText () {
/* -*- file: modules/phone/enterSipGate.lzx#9.9 -*- */
return this._text.getText()
}
/* -*- file:  -*- */
, "setText", function setText (t_$1) {
/* -*- file: modules/phone/enterSipGate.lzx#12.9 -*- */
this.fieldText = t_$1;
if (this.isinited) {
/* -*- file: #13 -*- */
/* -*- file: #14 -*- */
this._text.setAttribute("text", t_$1)
}}
/* -*- file:  -*- */
, "_text", void 0], ["tagname", "inputTextFieldPair", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 17, fontsize: 11, resize: true, text: new LzOnceExpr("$lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_17_81_$m478"), x: 4}, "class": $lzc$class_$m487}, {attrs: {$classrootdepth: 1, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 19, fontsize: 11, name: "_text", password: new LzOnceExpr("$lzc$bind_password$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m484"), text: new LzOnceExpr("$lzc$bind_text$$modules$2Fphone$2FenterSipGate$2Elzx_19_62_$m486"), width: 160, x: 120}, "class": $lzc$class_$m488}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#3.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: modules/phone/enterSipGate.lzx#4.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #4 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #4 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 22, function  () {
return LzNode
}
, this).mergeAttributes({_dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 4, fieldLabel: "", fieldText: "", password: false}, Debug.evalCarefully("", 11, function  () {
return $lzc$class_inputTextFieldPair
}
, this).attributes)
}}}
;
/* -*- file: modules/phone/enterSipGate.lzx#4.40 -*- */
$lzsc$temp._dbg_name = "modules/phone/enterSipGate.lzx#4/1";
/* -*- file: #4 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_inputTextFieldPair);
/* -*- file: modules/phone/enterSipGate.lzx#50.1 -*- */
/* -*- file: #51 -*- */
/* -*- file: #50 -*- */
Class.make("$lzc$class_$m562", $lzc$class_netparam, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "getValue", function getValue () {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#52.75 -*- */
return( Debug.evalCarefully("modules/phone/enterSipGate.lzx", 52, function  () {
/* -*- file: #52 -*- */
return parent
}
/* -*- file:  -*- */
, this).username)
}}
, "$classrootdepth", void 0], ["tagname", "netparam", "attributes", new LzInheritedHash($lzc$class_netparam.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#52.1 -*- */
/* -*- file: #53 -*- */
/* -*- file: #52 -*- */
Class.make("$lzc$class_$m563", $lzc$class_netparam, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "getValue", function getValue () {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#53.95 -*- */
return( Debug.evalCarefully("modules/phone/enterSipGate.lzx", 53, function  () {
/* -*- file: #53 -*- */
return parent
}
/* -*- file:  -*- */
, this).password)
}}
, "$classrootdepth", void 0], ["tagname", "netparam", "attributes", new LzInheritedHash($lzc$class_netparam.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#53.1 -*- */
/* -*- file: #54 -*- */
/* -*- file: #53 -*- */
Class.make("$lzc$class_$m564", $lzc$class_netparam, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "getValue", function getValue () {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#54.77 -*- */
return( Debug.evalCarefully("modules/phone/enterSipGate.lzx", 54, function  () {
/* -*- file: #54 -*- */
return parent
}
/* -*- file:  -*- */
, this).realm)
}}
, "$classrootdepth", void 0], ["tagname", "netparam", "attributes", new LzInheritedHash($lzc$class_netparam.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#54.1 -*- */
/* -*- file: #55 -*- */
/* -*- file: #54 -*- */
Class.make("$lzc$class_$m565", $lzc$class_netparam, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "getValue", function getValue () {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#55.106 -*- */
return( Debug.evalCarefully("modules/phone/enterSipGate.lzx", 55, function  () {
/* -*- file: #55 -*- */
return parent
}
/* -*- file:  -*- */
, this).proxy)
}}
, "$classrootdepth", void 0], ["tagname", "netparam", "attributes", new LzInheritedHash($lzc$class_netparam.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#46.1 -*- */
/* -*- file: #47 -*- */
/* -*- file: #46 -*- */
Class.make("$lzc$class_$m561", $lzc$class_netremotecall, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$bind_remotecontext$$modules$2Fphone$2FenterSipGate$2Elzx_47_102_$m499", function $lzc$bind_remotecontext$$modules$2Fphone$2FenterSipGate$2Elzx_47_102_$m499 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
this.setAttribute("remotecontext", Debug.evalCarefully("", 46, function  () {
return canvas
}
, this)._hibRtmpConnection)
}}
, "username", void 0, "password", void 0, "realm", void 0, "proxy", void 0, "$lzc$handle_ondata$$modules$2Fphone$2FenterSipGate$2Elzx_56_45_$m512", function $lzc$handle_ondata$$modules$2Fphone$2FenterSipGate$2Elzx_56_45_$m512 (value_$1) {
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#57.1 -*- */
Debug.evalCarefully("modules/phone/enterSipGate.lzx", 57, function  () {
/* -*- file: #57 -*- */
return Debug
}
/* -*- file:  -*- */
, this).write("login: ", value_$1)
}}
, "$classrootdepth", void 0], ["tagname", "netremotecall", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 52}, "class": $lzc$class_$m562}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 53}, "class": $lzc$class_$m563}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 54}, "class": $lzc$class_$m564}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 55}, "class": $lzc$class_$m565}], $lzc$class_netremotecall["children"]), "attributes", new LzInheritedHash($lzc$class_netremotecall.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#74.1 -*- */
/* -*- file: #75 -*- */
/* -*- file: #74 -*- */
Class.make("$lzc$class_$m566", $lzc$class_button, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "$lzc$handle_onclick$$modules$2Fphone$2FenterSipGate$2Elzx_75_75_$m560", function $lzc$handle_onclick$$modules$2Fphone$2FenterSipGate$2Elzx_75_75_$m560 ($lzc$ignore_$1) {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#75.1 -*- */
Debug.evalCarefully("modules/phone/enterSipGate.lzx", 75, function  () {
/* -*- file: #75 -*- */
return parent
}
/* -*- file:  -*- */
, this).doLogin()
}}
, "$classrootdepth", void 0], ["tagname", "button", "children", LzNode.mergeChildren([], $lzc$class_button["children"]), "attributes", new LzInheritedHash($lzc$class_button.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#21.1 -*- */
/* -*- file: #22 -*- */
/* -*- file: #21 -*- */
Class.make("$lzc$class_enterSipGate", LzView, ["_dbg_filename", void 0, "_dbg_lineno", void 0, "doLogin", function doLogin () {
/* -*- file: -*- */
with (this) {
/* -*- file: modules/phone/enterSipGate.lzx#26.1 -*- */
Debug.evalCarefully("modules/phone/enterSipGate.lzx", 26, function  () {
/* -*- file: #26 -*- */
return canvas
}
/* -*- file:  -*- */
, this)._hibRtmpConnection.setAttribute("src", this._fieldValues.red5url.getText());
/* -*- file: modules/phone/enterSipGate.lzx#27.1 -*- */
Debug.evalCarefully("modules/phone/enterSipGate.lzx", 27, function  () {
/* -*- file: #27 -*- */
return canvas
}
/* -*- file:  -*- */
, this)._hibRtmpConnection.returnObjectConnect = this;
/* -*- file: modules/phone/enterSipGate.lzx#28.1 -*- */
Debug.evalCarefully("modules/phone/enterSipGate.lzx", 28, function  () {
/* -*- file: #28 -*- */
return canvas
}
/* -*- file:  -*- */
, this)._hibRtmpConnection.connect()
}}
, "$lzc$handle_onconnect$$modules$2Fphone$2FenterSipGate$2Elzx_32_31_$m493", function $lzc$handle_onconnect$$modules$2Fphone$2FenterSipGate$2Elzx_32_31_$m493 ($lzc$ignore_$1) {
/* -*- file: modules/phone/enterSipGate.lzx#33.9 -*- */
this.login.username = this._fieldValues.username.getText();
this.login.password = this._fieldValues.password.getText();
this.login.realm = this._fieldValues.realm.getText();
this.login.proxy = this._fieldValues.proxy.getText();
this.login.callRPC()
}
/* -*- file:  -*- */
, "$lzc$handle_onerror$$modules$2Fphone$2FenterSipGate$2Elzx_40_44_$m494", function $lzc$handle_onerror$$modules$2Fphone$2FenterSipGate$2Elzx_40_44_$m494 (tString_$1) {
/* -*- file: modules/phone/enterSipGate.lzx#41.9 -*- */
this.message.setAttribute("text", tString_$1)
}
/* -*- file:  -*- */
, "login", void 0, "_fieldValues", void 0, "message", void 0], ["tagname", "enterSipGate", "children", LzNode.mergeChildren([{attrs: {$classrootdepth: 1, $delegates: ["ondata", "$lzc$handle_ondata$$modules$2Fphone$2FenterSipGate$2Elzx_56_45_$m512", null], _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 47, funcname: "login", name: "login", password: "", proxy: "", realm: "", remotecontext: new LzOnceExpr("$lzc$bind_remotecontext$$modules$2Fphone$2FenterSipGate$2Elzx_47_102_$m499"), username: ""}, "class": $lzc$class_$m561}, {attrs: {$classrootdepth: 1, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 61, layout: {axis: "y", spacing: 2}, mailbox: void 0, name: "_fieldValues", password: void 0, proxy: void 0, realm: void 0, red5url: void 0, username: void 0}, children: [{attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 63, fieldLabel: "Username", fieldText: "849229368", name: "username"}, "class": $lzc$class_inputTextFieldPair}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 64, fieldLabel: "Password", fieldText: "8YfWa3", name: "password", password: true}, "class": $lzc$class_inputTextFieldPair}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 65, fieldLabel: "Mailbox", name: "mailbox"}, "class": $lzc$class_inputTextFieldPair}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 66, fieldLabel: "SIP Realm", fieldText: "voiptalk.org", name: "realm"}, "class": $lzc$class_inputTextFieldPair}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 67, fieldLabel: "SIP Server", fieldText: "voiptalk.org", name: "proxy"}, "class": $lzc$class_inputTextFieldPair}, {attrs: {$classrootdepth: 2, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 68, fieldLabel: "Red5 URL", fieldText: "rtmp://localhost:1935/sip", name: "red5url"}, "class": $lzc$class_inputTextFieldPair}], "class": LzView}, {attrs: {$classrootdepth: 1, _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 73, fgcolor: LzColorUtils.convertColor("0xff3300"), fontsize: 11, name: "message", resize: true, text: "Enter your SIP Provider Data", x: 4}, "class": LzText}, {attrs: {$classrootdepth: 1, $delegates: ["onclick", "$lzc$handle_onclick$$modules$2Fphone$2FenterSipGate$2Elzx_75_75_$m560", null], _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 75, clickable: true, text: "Login", width: 100, x: 180}, "class": $lzc$class_$m566}], LzView["children"]), "attributes", new LzInheritedHash(LzView.attributes)]);
/* -*- file: modules/phone/enterSipGate.lzx#21.1 -*- */
(function  () {
var $lzsc$temp = function  ($lzsc$c_$1) {
/* -*- file: -*- */
/* -*- file: modules/phone/enterSipGate.lzx#22.22 -*- */
with ($lzsc$c_$1) {
/* -*- file: #22 -*- */
with ($lzsc$c_$1.prototype) {
/* -*- file: #22 -*- */
/* -*- file: -*- */
Debug.evalCarefully("", 50, function  () {
return LzNode
}
, this).mergeAttributes({$delegates: ["onconnect", "$lzc$handle_onconnect$$modules$2Fphone$2FenterSipGate$2Elzx_32_31_$m493", null, "onerror", "$lzc$handle_onerror$$modules$2Fphone$2FenterSipGate$2Elzx_40_44_$m494", null], _dbg_filename: "modules/phone/enterSipGate.lzx", _dbg_lineno: 22, layout: {axis: "y", inset: 4, spacing: 2}, width: 300}, Debug.evalCarefully("", 26, function  () {
return $lzc$class_enterSipGate
}
, this).attributes)
}}}
;
/* -*- file: modules/phone/enterSipGate.lzx#22.40 -*- */
$lzsc$temp._dbg_name = "modules/phone/enterSipGate.lzx#22/1";
/* -*- file: #22 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)()($lzc$class_enterSipGate);
/* -*- file: maindebug.lzx#10.189 -*- */
canvas.LzInstantiateView({attrs: {$lzc$bind_name: (function  () {
/* -*- file: #10 -*- */
var $lzsc$temp = function  ($lzc$node_$1, $lzc$bind_$2) {
/* -*- file: -*- */
/* -*- file: maindebug.lzx#10.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #11 -*- */
$lzc$bind_$2 = true
};
/* -*- file: #11 -*- */
if ($lzc$bind_$2) {
/* -*- file: #11 -*- */
/* -*- file: #12 -*- */
if (_enterSipGate && _enterSipGate !== $lzc$node_$1) {
/* -*- file: #12 -*- */
/* -*- file: #13 -*- */
Debug.evalCarefully("maindebug.lzx", 13, function  () {
/* -*- file: #13 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("Redefining #_enterSipGate from %w to %w", _enterSipGate, $lzc$node_$1)
};
/* -*- file: maindebug.lzx#16.3 -*- */
_enterSipGate = $lzc$node_$1
} else {
if (_enterSipGate === $lzc$node_$1) {
/* -*- file: #18 -*- */
/* -*- file: #19 -*- */
_enterSipGate = null
}}}
/* -*- file:  -*- */
;
/* -*- file: maindebug.lzx#10.40 -*- */
$lzsc$temp._dbg_name = "maindebug.lzx#10/239";
/* -*- file: #10 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)(), _dbg_filename: "maindebug.lzx", _dbg_lineno: 10, name: "_enterSipGate"}, "class": $lzc$class_enterSipGate}, 79);
/* -*- file: maindebug.lzx#12.80 -*- */
canvas.LzInstantiateView({attrs: {$lzc$bind_id: (function  () {
/* -*- file: #12 -*- */
var $lzsc$temp = function  ($lzc$node_$1, $lzc$bind_$2) {
/* -*- file: -*- */
/* -*- file: maindebug.lzx#12.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #13 -*- */
$lzc$bind_$2 = true
};
/* -*- file: #13 -*- */
if ($lzc$bind_$2) {
/* -*- file: #13 -*- */
/* -*- file: #14 -*- */
if (hib && hib !== $lzc$node_$1) {
/* -*- file: #14 -*- */
/* -*- file: #15 -*- */
Debug.evalCarefully("maindebug.lzx", 15, function  () {
/* -*- file: #15 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("Redefining #hib from %w to %w", hib, $lzc$node_$1)
};
/* -*- file: maindebug.lzx#18.3 -*- */
$lzc$node_$1.id = "hib";
hib = $lzc$node_$1
} else {
if (hib === $lzc$node_$1) {
/* -*- file: #21 -*- */
/* -*- file: #22 -*- */
hib = null;
/* -*- file: #24 -*- */
$lzc$node_$1.id = null
}}}
/* -*- file:  -*- */
;
/* -*- file: maindebug.lzx#12.40 -*- */
$lzsc$temp._dbg_name = "maindebug.lzx#12/128";
/* -*- file: #12 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)(), $lzc$bind_name: (function  () {
/* -*- file: maindebug.lzx#27.17 -*- */
var $lzsc$temp = function  ($lzc$node_$1, $lzc$bind_$2) {
/* -*- file: -*- */
/* -*- file: maindebug.lzx#27.14 -*- */
switch (arguments.length) {
case 1:
/* -*- file: #28 -*- */
$lzc$bind_$2 = true
};
/* -*- file: #28 -*- */
if ($lzc$bind_$2) {
/* -*- file: #28 -*- */
/* -*- file: #29 -*- */
if (_hibRtmpConnection && _hibRtmpConnection !== $lzc$node_$1) {
/* -*- file: #29 -*- */
/* -*- file: #30 -*- */
Debug.evalCarefully("maindebug.lzx", 30, function  () {
/* -*- file: #30 -*- */
return Debug
}
/* -*- file:  -*- */
, this).warn("Redefining #_hibRtmpConnection from %w to %w", _hibRtmpConnection, $lzc$node_$1)
};
/* -*- file: maindebug.lzx#33.3 -*- */
_hibRtmpConnection = $lzc$node_$1
} else {
if (_hibRtmpConnection === $lzc$node_$1) {
/* -*- file: #35 -*- */
/* -*- file: #36 -*- */
_hibRtmpConnection = null
}}}
/* -*- file:  -*- */
;
/* -*- file: maindebug.lzx#27.40 -*- */
$lzsc$temp._dbg_name = "maindebug.lzx#27/20";
/* -*- file: #27 -*- */
return $lzsc$temp
}
/* -*- file:  -*- */
)(), _dbg_filename: "maindebug.lzx", _dbg_lineno: 12, id: "hib", name: "_hibRtmpConnection"}, "class": $lzc$class_hibRtmpConnection}, 6);
lz["basefocusview"] = $lzc$class_basefocusview;
lz["focusoverlay"] = $lzc$class_focusoverlay;
lz["_componentmanager"] = $lzc$class__componentmanager;
lz["style"] = $lzc$class_style;
lz["statictext"] = $lzc$class_statictext;
lz["basecomponent"] = $lzc$class_basecomponent;
lz["basebutton"] = $lzc$class_basebutton;
lz["swatchview"] = $lzc$class_swatchview;
lz["button"] = $lzc$class_button;
lz["basevaluecomponent"] = $lzc$class_basevaluecomponent;
lz["baseformitem"] = $lzc$class_baseformitem;
lz["_internalinputtext"] = $lzc$class__internalinputtext;
lz["edittext"] = $lzc$class_edittext;
lz["simplelayout"] = $lzc$class_simplelayout;
lz["debug"] = $lzc$class_debug;
lz["rtmpConnection"] = $lzc$class_rtmpConnection;
lz["netremotecall"] = $lzc$class_netremotecall;
lz["netparam"] = $lzc$class_netparam;
lz["hibRtmpConnection"] = $lzc$class_hibRtmpConnection;
lz["inputTextFieldPair"] = $lzc$class_inputTextFieldPair;
lz["enterSipGate"] = $lzc$class_enterSipGate;
__LzDebug.makeDebugWindow();
canvas.initDone();