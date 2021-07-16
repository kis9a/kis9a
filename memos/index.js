(()=>{var xe=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var fe=xe((cr,ce)=>{"use strict";function C(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}function le(n,e){for(var r="",t=0,a=-1,o=0,s,i=0;i<=n.length;++i){if(i<n.length)s=n.charCodeAt(i);else{if(s===47)break;s=47}if(s===47){if(!(a===i-1||o===1))if(a!==i-1&&o===2){if(r.length<2||t!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var c=r.lastIndexOf("/");if(c!==r.length-1){c===-1?(r="",t=0):(r=r.slice(0,c),t=r.length-1-r.lastIndexOf("/")),a=i,o=0;continue}}else if(r.length===2||r.length===1){r="",t=0,a=i,o=0;continue}}e&&(r.length>0?r+="/..":r="..",t=2)}else r.length>0?r+="/"+n.slice(a+1,i):r=n.slice(a+1,i),t=i-a-1;a=i,o=0}else s===46&&o!==-1?++o:o=-1}return r}function ze(n,e){var r=e.dir||e.root,t=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+t:r+n+t:t}var B={resolve:function(){for(var e="",r=!1,t,a=arguments.length-1;a>=-1&&!r;a--){var o;a>=0?o=arguments[a]:(t===void 0&&(t=process.cwd()),o=t),C(o),o.length!==0&&(e=o+"/"+e,r=o.charCodeAt(0)===47)}return e=le(e,!r),r?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(C(e),e.length===0)return".";var r=e.charCodeAt(0)===47,t=e.charCodeAt(e.length-1)===47;return e=le(e,!r),e.length===0&&!r&&(e="."),e.length>0&&t&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return C(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,r=0;r<arguments.length;++r){var t=arguments[r];C(t),t.length>0&&(e===void 0?e=t:e+="/"+t)}return e===void 0?".":B.normalize(e)},relative:function(e,r){if(C(e),C(r),e===r||(e=B.resolve(e),r=B.resolve(r),e===r))return"";for(var t=1;t<e.length&&e.charCodeAt(t)===47;++t);for(var a=e.length,o=a-t,s=1;s<r.length&&r.charCodeAt(s)===47;++s);for(var i=r.length,c=i-s,l=o<c?o:c,h=-1,f=0;f<=l;++f){if(f===l){if(c>l){if(r.charCodeAt(s+f)===47)return r.slice(s+f+1);if(f===0)return r.slice(s+f)}else o>l&&(e.charCodeAt(t+f)===47?h=f:f===0&&(h=0));break}var u=e.charCodeAt(t+f),g=r.charCodeAt(s+f);if(u!==g)break;u===47&&(h=f)}var v="";for(f=t+h+1;f<=a;++f)(f===a||e.charCodeAt(f)===47)&&(v.length===0?v+="..":v+="/..");return v.length>0?v+r.slice(s+h):(s+=h,r.charCodeAt(s)===47&&++s,r.slice(s))},_makeLong:function(e){return e},dirname:function(e){if(C(e),e.length===0)return".";for(var r=e.charCodeAt(0),t=r===47,a=-1,o=!0,s=e.length-1;s>=1;--s)if(r=e.charCodeAt(s),r===47){if(!o){a=s;break}}else o=!1;return a===-1?t?"/":".":t&&a===1?"//":e.slice(0,a)},basename:function(e,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');C(e);var t=0,a=-1,o=!0,s;if(r!==void 0&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var i=r.length-1,c=-1;for(s=e.length-1;s>=0;--s){var l=e.charCodeAt(s);if(l===47){if(!o){t=s+1;break}}else c===-1&&(o=!1,c=s+1),i>=0&&(l===r.charCodeAt(i)?--i==-1&&(a=s):(i=-1,a=c))}return t===a?a=c:a===-1&&(a=e.length),e.slice(t,a)}else{for(s=e.length-1;s>=0;--s)if(e.charCodeAt(s)===47){if(!o){t=s+1;break}}else a===-1&&(o=!1,a=s+1);return a===-1?"":e.slice(t,a)}},extname:function(e){C(e);for(var r=-1,t=0,a=-1,o=!0,s=0,i=e.length-1;i>=0;--i){var c=e.charCodeAt(i);if(c===47){if(!o){t=i+1;break}continue}a===-1&&(o=!1,a=i+1),c===46?r===-1?r=i:s!==1&&(s=1):r!==-1&&(s=-1)}return r===-1||a===-1||s===0||s===1&&r===a-1&&r===t+1?"":e.slice(r,a)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return ze("/",e)},parse:function(e){C(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return r;var t=e.charCodeAt(0),a=t===47,o;a?(r.root="/",o=1):o=0;for(var s=-1,i=0,c=-1,l=!0,h=e.length-1,f=0;h>=o;--h){if(t=e.charCodeAt(h),t===47){if(!l){i=h+1;break}continue}c===-1&&(l=!1,c=h+1),t===46?s===-1?s=h:f!==1&&(f=1):s!==-1&&(f=-1)}return s===-1||c===-1||f===0||f===1&&s===c-1&&s===i+1?c!==-1&&(i===0&&a?r.base=r.name=e.slice(1,c):r.base=r.name=e.slice(i,c)):(i===0&&a?(r.name=e.slice(1,s),r.base=e.slice(1,c)):(r.name=e.slice(i,s),r.base=e.slice(i,c)),r.ext=e.slice(s,c)),i>0?r.dir=e.slice(0,i-1):a&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};B.posix=B;ce.exports=B});var F=1,E=3,J={},R=[],we="http://www.w3.org/2000/svg",G=n=>n,ke=R.map,D=Array.isArray,Ce=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:setTimeout,Y=n=>{var e="";if(typeof n=="string")return n;if(D(n))for(var r=0,t;r<n.length;r++)(t=Y(n[r]))&&(e+=(e&&" ")+t);else for(var r in n)n[r]&&(e+=(e&&" ")+r);return e},_e=(n,e)=>{for(var r in{...n,...e})if(typeof(D(n[r])?n[r][0]:n[r])=="function")e[r]=n[r];else if(n[r]!==e[r])return!0},Me=(n,e=R,r)=>{for(var t=[],a=0,o,s;a<n.length||a<e.length;a++)o=n[a],s=e[a],t.push(s&&s!==!0?!o||s[0]!==o[0]||_e(s[1],o[1])?[s[0],s[1],(o&&o[2](),s[0](r,s[1]))]:o:o&&o[2]());return t},b=n=>n==null?n:n.key,S=(n,e,r,t,a,o)=>{if(e!=="key")if(e==="style")for(var s in{...r,...t})r=t==null||t[s]==null?"":t[s],s[0]==="-"?n[e].setProperty(s,r):n[e][s]=r;else e[0]==="o"&&e[1]==="n"?((n.events||(n.events={}))[e=e.slice(2)]=t)?r||n.addEventListener(e,a):n.removeEventListener(e,a):!o&&e!=="list"&&e!=="form"&&e in n?n[e]=t??"":t==null||t===!1||e==="class"&&!(t=Y(t))?n.removeAttribute(e):n.setAttribute(e,t)},O=(n,e,r)=>{var t=n.props,a=n.type===E?document.createTextNode(n.tag):(r=r||n.tag==="svg")?document.createElementNS(we,n.tag,{is:t.is}):document.createElement(n.tag,{is:t.is});for(var o in t)S(a,o,null,t[o],e,r);for(var s=0;s<n.children.length;s++)a.appendChild(O(n.children[s]=$(n.children[s]),e,r));return n.node=a},z=(n,e,r,t,a,o)=>{if(r!==t)if(r!=null&&r.type===E&&t.type===E)r.tag!==t.tag&&(e.nodeValue=t.tag);else if(r==null||r.tag!==t.tag)e=n.insertBefore(O(t=$(t),a,o),e),r!=null&&n.removeChild(r.node);else{var s,i,c,l,h=r.props,f=t.props,u=r.children,g=t.children,v=0,p=0,x=u.length-1,w=g.length-1;o=o||t.tag==="svg";for(var d in{...h,...f})(d==="value"||d==="selected"||d==="checked"?e[d]:h[d])!==f[d]&&S(e,d,h[d],f[d],a,o);for(;p<=w&&v<=x&&!((c=b(u[v]))==null||c!==b(g[p]));)z(e,u[v].node,u[v],g[p]=$(g[p++],u[v++]),a,o);for(;p<=w&&v<=x&&!((c=b(u[x]))==null||c!==b(g[w]));)z(e,u[x].node,u[x],g[w]=$(g[w--],u[x--]),a,o);if(v>x)for(;p<=w;)e.insertBefore(O(g[p]=$(g[p++]),a,o),(i=u[v])&&i.node);else if(p>w)for(;v<=x;)e.removeChild(u[v++].node);else{for(var _={},M={},d=v;d<=x;d++)(c=u[d].key)!=null&&(_[c]=u[d]);for(;p<=w;){if(c=b(i=u[v]),l=b(g[p]=$(g[p],i)),M[c]||l!=null&&l===b(u[v+1])){c==null&&e.removeChild(i.node),v++;continue}l==null||r.type===F?(c==null&&(z(e,i&&i.node,i,g[p],a,o),p++),v++):(c===l?(z(e,i.node,i,g[p],a,o),M[l]=!0,v++):(s=_[l])!=null?(z(e,e.insertBefore(s.node,i&&i.node),s,g[p],a,o),M[l]=!0):z(e,i&&i.node,null,g[p],a,o),p++)}for(;v<=x;)b(i=u[v++])==null&&e.removeChild(i.node);for(var d in _)M[d]==null&&e.removeChild(_[d].node)}}return t.node=e},Ae=(n,e)=>{for(var r in n)if(n[r]!==e[r])return!0;for(var r in e)if(n[r]!==e[r])return!0},$=(n,e)=>n!==!0&&n!==!1&&n?typeof n.tag=="function"?((!e||e.memo==null||Ae(e.memo,n.memo))&&((e=n.tag(n.memo)).memo=n.memo),e):n:k(""),X=n=>n.nodeType===E?k(n.nodeValue,n):U(n.nodeName.toLowerCase(),J,ke.call(n.childNodes,X),F,n),U=(n,e,r,t,a)=>({tag:n,props:e,key:e.key,children:r,type:t,node:a});var k=(n,e)=>U(n,J,R,E,e),m=(n,e,r=R)=>U(n,e,D(r)?r:[r]),Q=({node:n,view:e,subscriptions:r,dispatch:t=G,init:a=J})=>{var o=n&&X(n),s=[],i,c,l=u=>{i!==u&&((i=u)==null&&(t=r=h=G),r&&(s=Me(s,r(i),t)),e&&!c&&Ce(h,c=!0))},h=()=>n=z(n.parentNode,n,o,o=e(i),f,c=!1),f=function(u){t(this.events[u.type],u)};return(t=t((u,g)=>typeof u=="function"?t(u(i,g)):D(u)?typeof u[0]=="function"?t(u[0],u[1]):u.slice(1).map(v=>v&&v!==!0&&v[0](t,v[1]),l(u[0])):l(u)))(a),t};var be={"":["<em>","</em>"],_:["<strong>","</strong>"],"~":["<s>","</s>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};function Z(n){return n.replace(RegExp("^"+(n.match(/^(\t| )+/)||"")[0],"gm"),"")}function I(n){return(n+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function y(n,e){let r=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)|((?:(?:^|\n+)(?:\|.*))+)/gm,t=[],a="",o=e||{},s=0,i,c,l,h,f;function u(A){var L=be[A.replace(/\*/g,"_")[1]||""],j=t[t.length-1]==A;return L?L[1]?(t[j?"pop":"push"](A),L[j|0]):L[0]:A}function g(){let A="";for(;t.length;)A+=u(t[t.length-1]);return A}for(n=n.replace(/^\[(.+?)\]:\s*(.+)$/gm,(A,L,j)=>(o[L.toLowerCase()]=j,"")).replace(/^\n+|\n+$/g,"");l=r.exec(n);){if(c=n.substring(s,l.index),s=r.lastIndex,i=l[0],!c.match(/[^\\](\\\\)*\\$/)){if(l[3]||l[4])i='<pre class="code '+(l[4]?"poetry":l[2].toLowerCase())+'">'+Z(I(l[3]||l[4]).replace(/^\n+|\n+$/g,""))+"</pre>";else if(l[6])f=l[6],f.match(/\./)&&(l[5]=l[5].replace(/^\d+/gm,"")),h=y(Z(l[5].replace(/^\s*[>*+.-]/gm,""))),f===">"?f="blockquote":(f=f.match(/\./)?"ol":"ul",h=h.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),i="<"+f+">"+h+"</"+f+">";else if(l[8])i=`<img src="${I(l[8])}" alt="${I(l[7])}">`;else if(l[10])a=a.replace("<a>",`<a href="${I(l[11]||o[c.toLowerCase()])}">`),i=g()+"</a>";else if(l[9])i="<a>";else if(l[12]||l[14])f="h"+(l[14]?l[14].length:l[13][0]==="="?1:2),i="<"+f+">"+y(l[12]||l[15],o)+"</"+f+">";else if(l[16])i="<code>"+I(l[16])+"</code>";else if(l[17]||l[1])i=u(l[17]||"--");else if(l[18]){for(var v=l[18].split(`
`),p=v.length,x="",w="td>";p--;){if(v[p].match(/^\|\s+---+.*$/)){w="th>";continue}for(var d=v[p].split(/\|\s*/),_=d.length,M="";_--;)M=(d[_]?`<${w+y(d[_])}</${w}`:"")+M;x=`<tr>${M}</tr>`+x,w="td>"}i=`<table>${x}</table>`}}a+=c,a+=i}return(a+n.substring(s)+g()).trim()}var H='<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>',N='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',K='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>',V='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>',ee='<svg class="w-6 h-6" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" style="--darkreader-inline-fill:none; --darkreader-inline-stroke:currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';var re='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>',ne='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>',te='<svg class="w-6 h-6" data-darkreader-inline-fill="" fill="currentColor" style="--darkreader-inline-fill:currentColor;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>';var se='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg>',ae='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path></svg>',q='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>',oe='<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>';var T=[{name:"home",href:"/",icon:ne},{name:"images",href:"/images/",icon:re},{name:"tools",href:"/tools/",icon:ae},{name:"memos",href:"/memos/",icon:q},{name:"waka",href:"/waka/",icon:te},{name:"comps",href:"/components/",icon:se}];var ie=(n,e={as:"",active:!0})=>{let r=T.find(t=>t.name==n);return r||(r={name:n,href:"#",icon:""}),m("a",{class:`link-icon ${e.active?"":"disable"}`,href:r.href,innerHTML:r.icon},[m("span",{},[k(e.as||r.name.toUpperCase())])])};var Le=fe(),ue=()=>{let e=(window.location.pathname+window.location.search).split("/"),r="/";e&&e.forEach(o=>{if(o!==""){r=o;return}});let t=o=>(o=Le.normalize(o),o.replaceAll("/","")),a=T.find(o=>t(r)===t(o.href));return a||(a={name:""}),m("div",{class:"header-wrapper"},[m("header",{},[m("nav",{},[m("h1",{class:"logo-text",onclick:ve},k("KIS9A")),m("div",{class:"logo-image"},[m("img",{src:"/assets/logo.png",alt:"kis9a.png",onclick:ve})]),m("div",{class:"menu-icon link-icon",innerHTML:oe,onclick:$e},k("menu")),m("div",{class:`links ${window.innerWidth<600?"none":""}`},T.map(o=>ie(o.name,{active:o.name!==a.name})))])])])},ve=n=>(window.open("https://nav.kis9a.com","_blank"),{...n}),$e=n=>(document.getElementsByClassName("links")[0].classList.toggle("none"),{...n});function me(n,e){var r={},t;for(t in n)r[t]=n[t];for(t in e)r[t]=e[t];return r}function ye(n,e){fetch(e.url,e.options).then(function(r){if(!r.ok)throw r;return r}).then(function(r){return r[e.response]()}).then(function(r){n(e.action,r)}).catch(function(r){n(e.error,r)})}function W(n){return[ye,me({options:{},response:"json",error:n.action},n)]}var he=(n,e={time:1e3})=>{let r=document.createElement("div");r.setAttribute("id","toast"),r.setAttribute("class","show"),r.appendChild(document.createTextNode(n)),r.className="show",document.body.appendChild(r),setTimeout(function(){r.className=r.className.replace("show","")},e.time)};var Be=W({url:"/data/memos-indexes.json",response:"json",action:(n,e)=>(P[0].indexes=e,{...n,indexes:e||[]})}),ge=n=>W({url:`/data/memos/${n}`,response:"text",action:(e,r)=>({...e,content:{...e.content,name:n,content:r},contents:[...e.contents,{name:n,content:r}]})}),Ee=(n,e)=>{let r=e.target.innerHTML;if(!n.contents.every(a=>a.name!==r)){let a=n.contents.find(o=>o.name===r);return{...n,content:a}}return[n,ge(r)]},Ie=(n,e)=>{let r=e.target.value,t=qe(n,r);return r===""?{...n,inputValue:r,indexes:t,showIndexes:!1}:{...n,inputValue:r,indexes:t,showIndexes:!0}},Te=n=>n.inputValue===""?{...n,showIndexes:!1}:{...n},je=(n,e)=>{let r=e.target.value,t=n.contents.map(a=>(a.name=="memo"&&(a.content=r),a));return{...n,content:{...n.content,content:r},contents:t}},Re=(n,e)=>{if(n.content.name==e){let r=0;n.contents.forEach((t,a)=>{t.name==e&&(r=a)}),n.content=n.contents[r-1]}return n.contents=n.contents.filter(r=>r.name!==e),{...n}},De=(n,e)=>{if(n.content.name==e)return{...n};let r=n.contents.find(t=>t.name===e);return r?{...n,content:r}:{...n}},qe=(n,e)=>(e||(n.indexes=P[0].indexes),P[0].indexes.filter(t=>!!~t.name.indexOf(e))),Pe=n=>({...n,showIndexes:!n.showIndexes}),Je=n=>{let e=n.contents.find(t=>t.name==="memo");e.content="";let r=[{...e}];return{...n,content:e,contents:r}},Oe=n=>{let e=document.createElement("input");return e.value=location.href,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),he("Copied to clipboard share url"),{...n}},Ue=n=>({...n,rawMode:!n.rawMode}),We=n=>(document.body.scrollTop=0,document.documentElement.scrollTop=0,n),pe={indexes:"",content:{name:"memo",content:""},contents:[{name:"memo",content:""}],inputValue:"",showIndexes:!1,rawMode:!1},Fe=n=>new String(n).substring(n.lastIndexOf("/")+1),Ge=Be,Ye=[n=>{let r=Fe(Xe),t=pe.content;r&&r!=="memo"&&n(o=>(t=o.contents.find(s=>s.name===r),t?{...o,content:t}:(t=ge(r),[o,t])))}],Se=()=>window.location.href,Xe=Se(),de=JSON.parse(window.localStorage.getItem("app")),Qe=de||pe,P=[Qe,Ge,Ye];onscroll=function(){let n=document.getElementById("top");var e=document.documentElement.scrollTop||document.body.scrollTop;e>500?n.classList.remove("hide"):n.classList.add("hide")};Q({init:P,view:({indexes:n,content:e,contents:r,inputValue:t,showIndexes:a,rawMode:o})=>m("div",{class:"container"},[ue(),m("main",{},[m("div",{class:"tabs"},[m("div",{class:"tab svg-clear tab-clear",onclick:Je,innerHTML:K}),m("div",{class:"tab svg-share tab-share",onclick:()=>Oe,innerHTML:V}),m("div",{class:"tab svg-share tab-share",onclick:()=>Ue,innerHTML:ee}),...r&&r.map(s=>m("div",{class:`tab ${e.name===s.name?"selected":""}`},[m("span",{onclick:()=>[De,s.name],class:"tab-label memo-tab-label",innerHTML:s.name==="memo"?q:""},s.name!=="memo"?k(s.name):k("")),s.name!=="memo"&&m("div",{onclick:()=>[Re,s.name],innerHTML:N,class:"svg-close tab-close"})]))]),m("div",{class:"inputs"},[m("input",{type:"text",value:t,oninput:Ie,onfocus:Te,class:"index-search"}),m("div",{class:"index-toggle-button",onclick:Pe,innerHTML:`${a?"&#9660":"&#9650"}`})]),m("div",{class:`indexes  ${a?"showIndexes":"hide"}`},n&&n.map(s=>m("span",{class:"index",onclick:Ee},k(s.name)))),e.name==="memo"&&m("div",{class:"tab-memo"},[m("textarea",{rows:15,value:e.content||" ",oninput:je,class:"content tab-memo-input"})]),e.name!=="memo"&&m("div",{class:`content ${e.content?"":"no-content"}`,innerHTML:o?e.content:y(e.content)}),m("div",{id:"top",class:"svg-top hide",innerHTML:H,onclick:We})])]),subscriptions:n=>{let e=n.content&&n.content.name;e&&e!=="memo"?window.location.href=`#/${e}`:e=="memo"&&(window.location.href="#/"),window.localStorage.setItem("app",JSON.stringify(n))},node:document.getElementById("app")});})();
