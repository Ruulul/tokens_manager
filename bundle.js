!function e(t,n,o){function c(a,i){if(!n[a]){if(!t[a]){var d="function"==typeof require&&require;if(!i&&d)return d(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};t[a][0].call(l.exports,(function(e){return c(t[a][1][e]||e)}),l,l.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)c(o[a]);return c}({1:[function(e,t,n){const o={generateId:(e=>{let t=0;return(e="component",n)=>`${e}-${n??t++}`})(),handle_handle(e,t,n){t in e?e[t](n):console.trace("There is no handle for",t,", emitted by",n.head[0],"\nFull msg:",JSON.stringify(n))},make_listen:e=>function(t){o.handle_handle(e,t.type,t)},make_protocol(e,t){const n=o.make_listen(e);return function(e,o){t&&t(e,o);return n}}};t.exports=o},{}],2:[function(e,t,n){const o=e("./ui/Tracks");document.body.append(...o({}))},{"./ui/Tracks":6}],3:[function(e,t,n){const{generateId:o,make_listen:c}=e("../component/Component");t.exports=function(e,t){const n=t?t(c({}),o("ui-add-track")):void 0,r=document.createElement("button");r.textContent=e.text??"Add Track";n&&(r.onclick=async e=>{r.disabled=!0;await n({type:"new-track"});r.disabled=!1});return[r]}},{"../component/Component":1}],4:[function(e,t,n){t.exports=function(e={}){let t=e.value??0;const n=document.createElement("div");n.style.display="inline-block";n.style.margin="0.5em";const o=document.createElement("button");o.textContent="+";const c=document.createElement("button");c.textContent="-";const r=document.createElement("span");r.textContent=t;r.style.margin="0.5em";o.onclick=e=>{r.textContent=++t};c.onclick=e=>{r.textContent=--t};n.append(c,r,o);return[n]}},{}],5:[function(e,t,n){const{make_listen:o,generateId:c}=e("../component/Component"),r=e("./Counter");t.exports=function(e={},t){const n=document.createElement("div"),a=c("ui-track"),i=t?t(o({}),a):void 0,d=document.createElement("input");d.placeholder="Track";d.textContent=e.label??"Track";const u=r(),l=document.createElement("button");l.textContent="X";l.onclick=e=>{i&&i({head:[a],type:"delete"});n.remove()};n.append(d,...u,l);return[n]}},{"../component/Component":1,"./Counter":4}],6:[function(e,t,n){const{make_protocol:o}=e("../component/Component"),c=e("./Track"),r=e("./AddTrack"),a=e=>o({"new-track"(t){const n=document.createElement("li");n.append(...c(t.data,(e=>o({delete(t){const n=e.tracks_id.findIndex((e=>e===t.head[0]));e.list.children[n].remove();e.tracks_id.splice(n,1)}},((t,n)=>e.tracks_id.push(n))))(e)));e.list.append(n)}});t.exports=function(){const e=document.createElement("ul");return[...r({},a({list:e,tracks_id:[]})),e]}},{"../component/Component":1,"./AddTrack":3,"./Track":5}]},{},[2]);
