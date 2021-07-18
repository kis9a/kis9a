(()=>{var de=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ce=de((mr,le)=>{"use strict";function C(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function ie(t,e){for(var r="",n=0,a=-1,i=0,o,s=0;s<=t.length;++s){if(s<t.length)o=t.charCodeAt(s);else{if(o===47)break;o=47}if(o===47){if(!(a===s-1||i===1))if(a!==s-1&&i===2){if(r.length<2||n!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var c=r.lastIndexOf("/");if(c!==r.length-1){c===-1?(r="",n=0):(r=r.slice(0,c),n=r.length-1-r.lastIndexOf("/")),a=s,i=0;continue}}else if(r.length===2||r.length===1){r="",n=0,a=s,i=0;continue}}e&&(r.length>0?r+="/..":r="..",n=2)}else r.length>0?r+="/"+t.slice(a+1,s):r=t.slice(a+1,s),n=s-a-1;a=s,i=0}else o===46&&i!==-1?++i:i=-1}return r}function Me(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+t+n:n}var B={resolve:function(){for(var e="",r=!1,n,a=arguments.length-1;a>=-1&&!r;a--){var i;a>=0?i=arguments[a]:(n===void 0&&(n=process.cwd()),i=n),C(i),i.length!==0&&(e=i+"/"+e,r=i.charCodeAt(0)===47)}return e=ie(e,!r),r?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(C(e),e.length===0)return".";var r=e.charCodeAt(0)===47,n=e.charCodeAt(e.length-1)===47;return e=ie(e,!r),e.length===0&&!r&&(e="."),e.length>0&&n&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return C(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,r=0;r<arguments.length;++r){var n=arguments[r];C(n),n.length>0&&(e===void 0?e=n:e+="/"+n)}return e===void 0?".":B.normalize(e)},relative:function(e,r){if(C(e),C(r),e===r||(e=B.resolve(e),r=B.resolve(r),e===r))return"";for(var n=1;n<e.length&&e.charCodeAt(n)===47;++n);for(var a=e.length,i=a-n,o=1;o<r.length&&r.charCodeAt(o)===47;++o);for(var s=r.length,c=s-o,l=i<c?i:c,h=-1,f=0;f<=l;++f){if(f===l){if(c>l){if(r.charCodeAt(o+f)===47)return r.slice(o+f+1);if(f===0)return r.slice(o+f)}else i>l&&(e.charCodeAt(n+f)===47?h=f:f===0&&(h=0));break}var u=e.charCodeAt(n+f),g=r.charCodeAt(o+f);if(u!==g)break;u===47&&(h=f)}var m="";for(f=n+h+1;f<=a;++f)(f===a||e.charCodeAt(f)===47)&&(m.length===0?m+="..":m+="/..");return m.length>0?m+r.slice(o+h):(o+=h,r.charCodeAt(o)===47&&++o,r.slice(o))},_makeLong:function(e){return e},dirname:function(e){if(C(e),e.length===0)return".";for(var r=e.charCodeAt(0),n=r===47,a=-1,i=!0,o=e.length-1;o>=1;--o)if(r=e.charCodeAt(o),r===47){if(!i){a=o;break}}else i=!1;return a===-1?n?"/":".":n&&a===1?"//":e.slice(0,a)},basename:function(e,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');C(e);var n=0,a=-1,i=!0,o;if(r!==void 0&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var s=r.length-1,c=-1;for(o=e.length-1;o>=0;--o){var l=e.charCodeAt(o);if(l===47){if(!i){n=o+1;break}}else c===-1&&(i=!1,c=o+1),s>=0&&(l===r.charCodeAt(s)?--s==-1&&(a=o):(s=-1,a=c))}return n===a?a=c:a===-1&&(a=e.length),e.slice(n,a)}else{for(o=e.length-1;o>=0;--o)if(e.charCodeAt(o)===47){if(!i){n=o+1;break}}else a===-1&&(i=!1,a=o+1);return a===-1?"":e.slice(n,a)}},extname:function(e){C(e);for(var r=-1,n=0,a=-1,i=!0,o=0,s=e.length-1;s>=0;--s){var c=e.charCodeAt(s);if(c===47){if(!i){n=s+1;break}continue}a===-1&&(i=!1,a=s+1),c===46?r===-1?r=s:o!==1&&(o=1):r!==-1&&(o=-1)}return r===-1||a===-1||o===0||o===1&&r===a-1&&r===n+1?"":e.slice(r,a)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return Me("/",e)},parse:function(e){C(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return r;var n=e.charCodeAt(0),a=n===47,i;a?(r.root="/",i=1):i=0;for(var o=-1,s=0,c=-1,l=!0,h=e.length-1,f=0;h>=i;--h){if(n=e.charCodeAt(h),n===47){if(!l){s=h+1;break}continue}c===-1&&(l=!1,c=h+1),n===46?o===-1?o=h:f!==1&&(f=1):o!==-1&&(f=-1)}return o===-1||c===-1||f===0||f===1&&o===c-1&&o===s+1?c!==-1&&(s===0&&a?r.base=r.name=e.slice(1,c):r.base=r.name=e.slice(s,c)):(s===0&&a?(r.name=e.slice(1,o),r.base=e.slice(1,c)):(r.name=e.slice(s,o),r.base=e.slice(s,c)),r.ext=e.slice(o,c)),s>0?r.dir=e.slice(0,s-1):a&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};B.posix=B;le.exports=B});var G=1,E=3,U={},R=[],xe="http://www.w3.org/2000/svg",Y=t=>t,we=R.map,q=Array.isArray,ke=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:setTimeout,X=t=>{var e="";if(typeof t=="string")return t;if(q(t))for(var r=0,n;r<t.length;r++)(n=X(t[r]))&&(e+=(e&&" ")+n);else for(var r in t)t[r]&&(e+=(e&&" ")+r);return e},Ce=(t,e)=>{for(var r in{...t,...e})if(typeof(q(t[r])?t[r][0]:t[r])=="function")e[r]=t[r];else if(t[r]!==e[r])return!0},ye=(t,e=R,r)=>{for(var n=[],a=0,i,o;a<t.length||a<e.length;a++)i=t[a],o=e[a],n.push(o&&o!==!0?!i||o[0]!==i[0]||Ce(o[1],i[1])?[o[0],o[1],(i&&i[2](),o[0](r,o[1]))]:i:i&&i[2]());return n},M=t=>t==null?t:t.key,Q=(t,e,r,n,a,i)=>{if(e!=="key")if(e==="style")for(var o in{...r,...n})r=n==null||n[o]==null?"":n[o],o[0]==="-"?t[e].setProperty(o,r):t[e][o]=r;else e[0]==="o"&&e[1]==="n"?((t.events||(t.events={}))[e=e.slice(2)]=n)?r||t.addEventListener(e,a):t.removeEventListener(e,a):!i&&e!=="list"&&e!=="form"&&e in t?t[e]=n??"":n==null||n===!1||e==="class"&&!(n=X(n))?t.removeAttribute(e):t.setAttribute(e,n)},O=(t,e,r)=>{var n=t.props,a=t.type===E?document.createTextNode(t.tag):(r=r||t.tag==="svg")?document.createElementNS(xe,t.tag,{is:n.is}):document.createElement(t.tag,{is:n.is});for(var i in n)Q(a,i,null,n[i],e,r);for(var o=0;o<t.children.length;o++)a.appendChild(O(t.children[o]=L(t.children[o]),e,r));return t.node=a},A=(t,e,r,n,a,i)=>{if(r!==n)if(r!=null&&r.type===E&&n.type===E)r.tag!==n.tag&&(e.nodeValue=n.tag);else if(r==null||r.tag!==n.tag)e=t.insertBefore(O(n=L(n),a,i),e),r!=null&&t.removeChild(r.node);else{var o,s,c,l,h=r.props,f=n.props,u=r.children,g=n.children,m=0,p=0,x=u.length-1,w=g.length-1;i=i||n.tag==="svg";for(var d in{...h,...f})(d==="value"||d==="selected"||d==="checked"?e[d]:h[d])!==f[d]&&Q(e,d,h[d],f[d],a,i);for(;p<=w&&m<=x&&!((c=M(u[m]))==null||c!==M(g[p]));)A(e,u[m].node,u[m],g[p]=L(g[p++],u[m++]),a,i);for(;p<=w&&m<=x&&!((c=M(u[x]))==null||c!==M(g[w]));)A(e,u[x].node,u[x],g[w]=L(g[w--],u[x--]),a,i);if(m>x)for(;p<=w;)e.insertBefore(O(g[p]=L(g[p++]),a,i),(s=u[m])&&s.node);else if(p>w)for(;m<=x;)e.removeChild(u[m++].node);else{for(var y={},_={},d=m;d<=x;d++)(c=u[d].key)!=null&&(y[c]=u[d]);for(;p<=w;){if(c=M(s=u[m]),l=M(g[p]=L(g[p],s)),_[c]||l!=null&&l===M(u[m+1])){c==null&&e.removeChild(s.node),m++;continue}l==null||r.type===G?(c==null&&(A(e,s&&s.node,s,g[p],a,i),p++),m++):(c===l?(A(e,s.node,s,g[p],a,i),_[l]=!0,m++):(o=y[l])!=null?(A(e,e.insertBefore(o.node,s&&s.node),o,g[p],a,i),_[l]=!0):A(e,s&&s.node,null,g[p],a,i),p++)}for(;m<=x;)M(s=u[m++])==null&&e.removeChild(s.node);for(var d in y)_[d]==null&&e.removeChild(y[d].node)}}return n.node=e},_e=(t,e)=>{for(var r in t)if(t[r]!==e[r])return!0;for(var r in e)if(t[r]!==e[r])return!0},L=(t,e)=>t!==!0&&t!==!1&&t?typeof t.tag=="function"?((!e||e.memo==null||_e(e.memo,t.memo))&&((e=t.tag(t.memo)).memo=t.memo),e):t:k(""),Z=t=>t.nodeType===E?k(t.nodeValue,t):J(t.nodeName.toLowerCase(),U,we.call(t.childNodes,Z),G,t),J=(t,e,r,n,a)=>({tag:t,props:e,key:e.key,children:r,type:n,node:a});var k=(t,e)=>J(t,U,R,E,e),v=(t,e,r=R)=>J(t,e,q(r)?r:[r]),S=({node:t,view:e,subscriptions:r,dispatch:n=Y,init:a=U})=>{var i=t&&Z(t),o=[],s,c,l=u=>{s!==u&&((s=u)==null&&(n=r=h=Y),r&&(o=ye(o,r(s),n)),e&&!c&&ke(h,c=!0))},h=()=>t=A(t.parentNode,t,i,i=e(s),f,c=!1),f=function(u){n(this.events[u.type],u)};return(n=n((u,g)=>typeof u=="function"?n(u(s,g)):q(u)?typeof u[0]=="function"?n(u[0],u[1]):u.slice(1).map(m=>m&&m!==!0&&m[0](n,m[1]),l(u[0])):l(u)))(a),n};var be={"":["<em>","</em>"],_:["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function H(t){return t.replace(RegExp("^"+(t.match(/^(\t| )+/)||"")[0],"gm"),"")}function T(t){return(t+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function $(t,e){let r=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)|((?:(?:^|\n+)(?:\|.*))+)/gm,n=[],a="",i=e||{},o=0,s,c,l,h,f;function u(b){var z=be[b.replace(/\*/g,"_")[1]||""],D=n[n.length-1]==b;return z?z[1]?(n[D?"pop":"push"](b),z[D|0]):z[0]:b}function g(){let b="";for(;n.length;)b+=u(n[n.length-1]);return b}for(t=t.replace(/^\[(.+?)\]:\s*(.+)$/gm,(b,z,D)=>(i[z.toLowerCase()]=D,"")).replace(/^\n+|\n+$/g,"");l=r.exec(t);){if(c=t.substring(o,l.index),o=r.lastIndex,s=l[0],!c.match(/[^\\](\\\\)*\\$/)){if(l[3]||l[4])s='<pre class="code '+(l[4]?"poetry":l[2].toLowerCase())+'">'+H(T(l[3]||l[4]).replace(/^\n+|\n+$/g,""))+"</pre>";else if(l[6])f=l[6],f.match(/\./)&&(l[5]=l[5].replace(/^\d+/gm,"")),h=$(H(l[5].replace(/^\s*[>*+.-]/gm,""))),f===">"?f="blockquote":(f=f.match(/\./)?"ol":"ul",h=h.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),s="<"+f+">"+h+"</"+f+">";else if(l[8])s=`<img src="${T(l[8])}" alt="${T(l[7])}">`;else if(l[10])a=a.replace("<a>",`<a href="${T(l[11]||i[c.toLowerCase()])}">`),s=g()+"</a>";else if(l[9])s="<a>";else if(l[12]||l[14])f="h"+(l[14]?l[14].length:l[13][0]==="="?1:2),s="<"+f+">"+$(l[12]||l[15],i)+"</"+f+">";else if(l[16])s="<code>"+T(l[16])+"</code>";else if(l[17]||l[1])s=u(l[17]||"--");else if(l[18]){for(var m=l[18].split(`
`),p=m.length,x="",w="td>";p--;){if(m[p].match(/^\|\s+---+.*$/)){w="th>";continue}for(var d=m[p].split(/\|\s*/),y=d.length,_="";y--;)_=(d[y]?`<${w+$(d[y])}</${w}`:"")+_;x=`<tr>${_}</tr>`+x,w="td>"}s=`<table>${x}</table>`}}a+=c,a+=s}return(a+t.substring(o)+g()).trim()}var N='<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>',K='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',V='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>',ee='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>',re='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';var te='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>',ne='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>',ae='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>';var F='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>';var oe='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>';var j=[{name:"home",href:"/",icon:ne},{name:"memos",href:"/memos/",icon:F},{name:"images",href:"/images/",icon:te},{name:"waka",href:"/waka/",icon:ae}];var se=(t,e={as:"",active:!0})=>{let r=j.find(n=>n.name==t);return r||(r={name:t,href:"#",icon:""}),v("a",{class:`link-icon ${e.active?"":"disable"}`,href:r.href,innerHTML:r.icon},[v("span",{},[k(e.as||r.name.toUpperCase())])])};var Ae=ce(),fe=()=>{let e=(window.location.pathname+window.location.search).split("/"),r="/";e&&e.forEach(i=>{if(i!==""){r=i;return}});let n=i=>(i=Ae.normalize(i),i.replaceAll("/","")),a=j.find(i=>n(r)===n(i.href));return a||(a={name:""}),v("div",{class:"header-wrapper"},[v("header",{},[v("nav",{},[v("h1",{class:"logo-text",onclick:ue},k("KIS9A")),v("div",{class:"logo-image"},[v("img",{src:"/assets/logo.png",alt:"kis9a.png",onclick:ue})]),v("div",{class:"links"},j.map(i=>se(i.name,{active:i.name!==a.name})))])])])},ue=t=>(window.open("https://nav.kis9a.com","_blank"),{...t});function me(t,e){var r={},n;for(n in t)r[n]=t[n];for(n in e)r[n]=e[n];return r}function ze(t,e){fetch(e.url,e.options).then(function(r){if(!r.ok)throw r;return r}).then(function(r){return r[e.response]()}).then(function(r){t(e.action,r)}).catch(function(r){t(e.error,r)})}function P(t){return[ze,me({options:{},response:"json",error:t.action},t)]}var ve=(t,e={time:1600,width:"320px",bottom:"10px",right:"10px",left:"auto",top:"auto",bg:"#f4f4f4"})=>{let r=document.createElement("div");r.style.background=e.bg,r.style.bottom=e.bottom,r.style.left=e.left,r.style.right=e.right,r.style.top=e.top,r.style.width=e.width,r.style.position="fixed",r.style.padding="1.2rem 1.6rem",r.style.fontSize="1.6rem",r.style.borderRadius="1rem 0.5rem 0rem 0.5rem",r.style.border="2px solid #e6e6e6",Le(r,500),setTimeout(()=>{$e(r,500),setTimeout(()=>{document.body.removeChild(r),r.style.display="none"},500)},e.time),r.appendChild(document.createTextNode(t)),document.body.appendChild(r)};function Le(t,e){t.style.opacity=0;var r=+new Date,n=function(){t.style.opacity=+t.style.opacity+(new Date-r)/e,r=+new Date,+t.style.opacity<1&&(window.requestAnimationFrame&&requestAnimationFrame(n)||setTimeout(n,16))};n()}function $e(t,e){t.style.opacity=1;var r=+new Date,n=function(){t.style.opacity=+t.style.opacity-(new Date-r)/e,r=+new Date,+t.style.opacity>0&&(window.requestAnimationFrame&&requestAnimationFrame(n)||setTimeout(n,16))};n()}var Be=P({url:"/data/memos-indexes.json",response:"json",action:(t,e)=>(I[0].indexes=e,{...t,indexes:e||[]})}),he=P({url:"/data/memos-categories.json",response:"json",action:(t,e)=>(I[0].categories=e,{...t,categories:e||[]})}),ge=t=>P({url:`/data/memos/${t}`,response:"text",action:(e,r)=>({...e,content:{...e.content,name:t,content:r},contents:[...e.contents,{name:t,content:r}]})}),Ee=(t,e)=>{let r=e.target.innerHTML;if(!t.contents.every(a=>a.name!==r)){let a=t.contents.find(i=>i.name===r);return{...t,content:a}}return[t,ge(r)]},Te=(t,e)=>{let r=e.target.value,n=Fe(t,r);return r===""?{...t,inputValue:r,indexes:n,showIndexes:!1}:{...t,inputValue:r,indexes:n,showIndexes:!0}},je=t=>t.inputValue===""?{...t,showIndexes:!1}:{...t},Ie=(t,e)=>{let r=e.target.value,n=t.contents.map(a=>(a.name=="memo"&&(a.content=r),a));return{...t,content:{...t.content,content:r},contents:n}},De=(t,e)=>{if(t.content.name==e){let r=0;t.contents.forEach((n,a)=>{n.name==e&&(r=a)}),t.content=t.contents[r-1]}return t.contents=t.contents.filter(r=>r.name!==e),{...t}},W=t=>{switch(t.name){case"memo":return"memo";case"category":return"category";default:return"default"}},Re=(t,e)=>{let r=[];return e.files.forEach(n=>{let a={name:n,upd_t:""};r.push(a)}),{...t,indexes:r,showIndexes:!0}},qe=(t,e)=>{if(t.content.name==e)return{...t};let r=t.contents.find(n=>n.name===e);return r?{...t,content:r}:{...t}},Fe=(t,e)=>(e||(t.indexes=I[0].indexes),I[0].indexes.filter(n=>!!~n.name.indexOf(e))),Pe=t=>({...t,showIndexes:!t.showIndexes}),Ue=t=>{let e=t.contents.find(n=>n.name==="memo");e.content="";let r=[{...e}];return{...t,content:e,contents:r}},Oe=t=>{let e=document.createElement("input");return e.value=location.href,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),ve("Copied to clipboard share url"),{...t}},Je=t=>({...t,rawMode:!t.rawMode}),We=t=>(document.body.scrollTop=0,document.documentElement.scrollTop=0,t),pe={indexes:"",content:{name:"memo",content:""},contents:[{name:"category",content:""},{name:"memo",content:""}],categories:[],inputValue:"",showIndexes:!1,rawMode:!1},Ge=t=>new String(t).substring(t.lastIndexOf("/")+1),Ye=Be,Xe=he,Qe=[t=>{let r=Ge(Se),n=pe.content;r&&r!=="memo"&&t(i=>(n=i.contents.find(o=>o.name===r),n?{...i,content:n}:(n=ge(r),[i,n])))}],Ze=()=>window.location.href,Se=Ze(),I=[pe,Ye,Qe,Xe];onscroll=()=>{let t=document.getElementById("top");var e=document.documentElement.scrollTop||document.body.scrollTop;e>500?t.classList.remove("hide"):t.classList.add("hide")};S({init:I,view:({indexes:t,content:e,contents:r,categories:n,inputValue:a,showIndexes:i,rawMode:o})=>v("div",{class:"container"},[fe(),v("main",{},[v("div",{class:"content"},[v("div",{class:"tabs"},[v("div",{class:"tab",onclick:Ue,innerHTML:V}),v("div",{class:"tab",onclick:()=>Oe,innerHTML:ee}),v("div",{class:"tab",onclick:()=>Je,innerHTML:re}),v("div",{class:"tab index-toggle-button",onclick:Pe,innerHTML:`${i?"&#9660":"&#9650"}`}),v("input",{type:"text",value:a,oninput:Te,onfocus:je,class:"index-search",ariaLabel:"index-search-input"}),...r&&r.map(s=>v("div",{class:`tab${e.name===s.name?" selected":""}`,onclick:()=>[qe,s.name],innerHTML:s.name==="memo"?F:s.name=="category"?oe:""},[s.name!=="memo"&&s.name!=="category"&&v("span",{class:"tab-label"},k(s.name)),s.name!=="memo"&&s.name!=="category"&&v("div",{onclick:()=>[De,s.name],innerHTML:K,class:"tab-close"})]))]),v("div",{class:`indexes  ${i?"showIndexes":"hide"}`},t&&t.map(s=>v("span",{class:"index",onclick:Ee},k(s.name)))),W(e)==="memo"&&v("div",{class:"tab-memo"},[v("textarea",{rows:15,value:e.content||"",oninput:Ie,class:"content tab-memo-input",ariaLabel:"tab-memo-input"})]),W(e)==="category"&&v("div",{class:"tab-content tab-category"},he&&n.map(s=>s.files&&s.files.length>1&&v("div",{class:"category",onclick:[Re,s],style:{fontSize:`${8+s.files.length*4}px`}},k(s.name)))),W(e)==="default"&&v("div",{class:`tab-content ${e.content?"":"no-content"}`,innerHTML:o?e.content:$(e.content)}),v("div",{id:"top",class:"svg-top hide",innerHTML:N,onclick:We})])])]),subscriptions:t=>{let e=t.content&&t.content.name;e&&e!=="memo"?window.location.href=`#/${e}`:e=="memo"&&(window.location.href="#/")},node:document.getElementById("app")});})();
