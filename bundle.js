!function n(t,e,o){function c(u,i){if(!e[u]){if(!t[u]){var a="function"==typeof require&&require;if(!i&&a)return a(u,!0);if(r)return r(u,!0);var d=new Error("Cannot find module '"+u+"'");throw d.code="MODULE_NOT_FOUND",d}var m=e[u]={exports:{}};t[u][0].call(m.exports,(function(n){return c(t[u][1][n]||n)}),m,m.exports,n,t,e,o)}return e[u].exports}for(var r="function"==typeof require&&require,u=0;u<o.length;u++)c(o[u]);return c}({1:[function(n,t,e){const o={generateId:(n=>{let t=0;return(n="component",e)=>`${n}-${e??t++}`})(),handle_handle(n,t,e){t in n?n[t](e):console.trace("There is no handle for",t,", emitted by",e.head[0],"\nFull msg:",JSON.stringify(e))},make_listen:n=>function(t){const{type:e}=t;o.handle_handle(n,e,t)},make_protocol(n,t){const e=o.make_listen(n);return function(n,o){t&&t(n,o);return e}}};t.exports=o},{}],2:[function(n,t,e){const o=n("./ui/Tracks");document.body.append(o({}))},{"./ui/Tracks":7}],3:[function(n,t,e){const o=n("./Component");t.exports=o("ui-add-track",{},(function(n,t){const e=document.createElement("button");e.textContent=n.text??"Add Track";const o=document.createElement("style");o.textContent=n.theme??"\n        button {\n            padding: 1em;\n            outline: none;\n        }\n    ";t&&(e.onclick=n=>t({type:"new-track"}));return[o,e]}))},{"./Component":4}],4:[function(n,t,e){const{generateId:o,make_listen:c}=n("../component/Component");t.exports=function(n,t,e){const r=c(t);return function(t={},c){const u=document.createElement("div"),i=u.attachShadow({mode:"closed"}),a=o(n),d=c?c(r,a):void 0;i.append(...e(t,d?n=>d(Object.assign(n,{head:[a]})):void 0));return u}}},{"../component/Component":1}],5:[function(n,t,e){const o=n("./Component");t.exports=o("ui-counter",{},(function(n={}){let t=n.value??0;const e=document.createElement("button");e.textContent="+";const o=document.createElement("button");o.textContent="-";const c=document.createElement("span");c.textContent=t;e.onclick=n=>{c.textContent=++t};o.onclick=n=>{c.textContent=--t};const r=document.createElement("style");r.textContent=n.theme??"\n    :host {\n        display: inline-block;\n        outline: red;\n        margin: 0.5em;\n    }\n    span {\n        margin: 0.5em;\n    }\n    ";return[r,o,c,e]}))},{"./Component":4}],6:[function(n,t,e){const o=n("./Component"),c=n("./Counter");t.exports=o("ui-track",{},(function(n,t){const e=document.createElement("input");e.placeholder="Track";e.textContent=n.label??"Track";const o=document.createElement("style");o.textContent=n.theme??"\n    input {\n        padding-right: 0.5em;\n    }\n    ";const r=c(),u=document.createElement("button");u.textContent="X";u.onclick=n=>{t&&t({type:"delete"})};return[o,e,r,u]}))},{"./Component":4,"./Counter":5}],7:[function(n,t,e){const{make_protocol:o}=n("../component/Component"),c=n("./Component"),r=n("./Track"),u=n("./AddTrack"),i=n=>o({"new-track"(t){const e=document.createElement("li");e.append(r(t.data,(n=>o({delete(t){const e=n.tracks_id.findIndex((n=>n===t.head[0]));n.list.children[e].remove();n.tracks_id.splice(e,1)}},((t,e)=>n.tracks_id.push(e))))(n)));n.list.append(e)}});t.exports=c("ui-tracks",{},(function(n){const t=document.createElement("ul"),e=u({},i({list:t,tracks_id:[]})),o=document.createElement("style");o.textContent=n.theme??"\n        button {\n            padding: 1em;\n            outline: none;\n        }\n    ";return[o,e,t]}))},{"../component/Component":1,"./AddTrack":3,"./Component":4,"./Track":6}]},{},[2]);
