module.exports=function(t){var e={},r={0:0};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.e=function(e){if(0!==r[e]){var n=require("./"+{1:"f88be3ce6c18b27b5cd9",2:"4d219b08672c0c52ac9b",3:"f7f11a8996056365ff7c"}[e]+".js"),o=n.modules,c=n.ids;for(var l in o)t[l]=o[l];for(var i=0;i<c.length;i++)r[c[i]]=0}return Promise.all([])},n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(object,t){return Object.prototype.hasOwnProperty.call(object,t)},n.p="/_nuxt/",n.oe=function(t){process.nextTick((function(){throw t}))},n(n.s=30)}([function(t,e){t.exports=require("vue")},function(t,e,r){"use strict";var n=r(2);const o=["required","minLength","format","unique","password"];e.a={required:t=>n.helpers.withParams({errMsg:t+" field is required"},data=>n.helpers.req(data)),minLength:(t,e)=>n.helpers.withParams({errMsg:`${t} must be atleat ${e} characters`},data=>data.length>=e),nameFormat:t=>n.helpers.withParams({errMsg:t+" can only contain letters"},t=>{if(""===t)return!0;return!/[±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]/g.test(t)}),emailFormat:()=>n.helpers.withParams({errMsg:"Email must be valid format"},t=>{if(""===t)return!0;return/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g.test(t)}),usernameFormat:()=>n.helpers.withParams({errMsg:"Username must contain atleast 2 numbers and no symbols"},t=>new RegExp(/[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,][0-9]{2}/).test(t)),usernameUnique:t=>n.helpers.withParams({errMsg:"Username already exists"},async e=>{if(""===e)return!0;try{const{data:data}=await t.isUserNameUnique(e);return data.unique}catch(t){return!1}}),passwordFormat:()=>n.helpers.withParams({errMsg:"Password must contain atleast 1 lower & uppercase letter, number, special character and be atleast 8 characters"},t=>{if(""===t)return!0;return/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/g.test(t)}),createErrorMessages(t){const e=[];for(const r in t)if(!t[r]&&o.includes(r)){e.push(t.$params[r].errMsg);break}return e}}},function(t,e){t.exports=require("vuelidate/lib/validators")},function(t,e,r){"use strict";function n(t,e,r,n,o,c,l,d){var h,f="function"==typeof t?t.options:t;if(e&&(f.render=e,f.staticRenderFns=r,f._compiled=!0),n&&(f.functional=!0),c&&(f._scopeId="data-v-"+c),l?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},f._ssrRegister=h):o&&(h=d?function(){o.call(this,(f.functional?this.parent:this).$root.$options.shadowRoot)}:o),h)if(f.functional){f._injectStyles=h;var m=f.render;f.render=function(t,e){return h.call(e),m(t,e)}}else{var x=f.beforeCreate;f.beforeCreate=x?[].concat(x,h):[h]}return{exports:t,options:f}}r.d(e,"a",(function(){return n}))},function(t,e){t.exports=require("vue-router")},function(t,e){t.exports=require("axios")},function(t,e,r){var content=r(34);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var n=r(13).default;t.exports.__inject__=function(t){n("72daabed",content,!0,t)}},function(t,e,r){var content=r(36);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var n=r(13).default;t.exports.__inject__=function(t){n("3191d5ad",content,!0,t)}},function(t,e,r){var content=r(38);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var n=r(13).default;t.exports.__inject__=function(t){n("20f4381e",content,!0,t)}},function(t,e){t.exports=require("vuex-map-fields")},function(t,e){t.exports=require("vue-no-ssr")},function(t,e){t.exports=require("@fortawesome/fontawesome-svg-core")},function(t,e,r){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var content=function(t,e){var content=t[1]||"",r=t[3];if(!r)return content;if(e&&"function"==typeof btoa){var n=(c=r,l=btoa(unescape(encodeURIComponent(JSON.stringify(c)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(data," */")),o=r.sources.map((function(source){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(source," */")}));return[content].concat(o).concat([n]).join("\n")}var c,l,data;return[content].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(content,"}"):content})).join("")},e.i=function(t,r,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(o[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);n&&o[d[0]]||(r&&(d[2]?d[2]="".concat(r," and ").concat(d[2]):d[2]=r),e.push(d))}},e}},function(t,e,r){"use strict";function n(t,e,r,n){if(n||"undefined"==typeof __VUE_SSR_CONTEXT__||(n=__VUE_SSR_CONTEXT__),n){n.hasOwnProperty("styles")||(Object.defineProperty(n,"styles",{enumerable:!0,get:function(){return o(n._styles)}}),n._renderStyles=o);var c=n._styles||(n._styles={});e=function(t,e){for(var r=[],n={},i=0;i<e.length;i++){var o=e[i],c=o[0],l={id:t+":"+i,css:o[1],media:o[2],sourceMap:o[3]};n[c]?n[c].parts.push(l):r.push(n[c]={id:c,parts:[l]})}return r}(t,e),r?function(t,e){for(var i=0;i<e.length;i++)for(var r=e[i].parts,n=0;n<r.length;n++){var o=r[n],c=o.media||"default",style=t[c];style?style.ids.indexOf(o.id)<0&&(style.ids.push(o.id),style.css+="\n"+o.css):t[c]={ids:[o.id],css:o.css,media:o.media}}}(c,e):function(t,e){for(var i=0;i<e.length;i++)for(var r=e[i].parts,n=0;n<r.length;n++){var o=r[n];t[o.id]={ids:[o.id],css:o.css,media:o.media}}}(c,e)}}function o(t){var e="";for(var r in t){var style=t[r];e+='<style data-vue-ssr-id="'+style.ids.join(" ")+'"'+(style.media?' media="'+style.media+'"':"")+">"+style.css+"</style>"}return e}r.r(e),r.d(e,"default",(function(){return n}))},function(t,e){t.exports=require("vuex")},function(t,e,r){"use strict";r.r(e),e.default=()=>({hasSeenAnimation:!1,allwd:!1,loginError:null})},function(t,e,r){"use strict";r.r(e);var n=r(9);e.default={UPDATE_ALLWD(t,e){t.allwd=e},UPDATE_LOGIN_ERROR(t,e){t.loginError=e},updateField:n.updateField}},function(t,e,r){"use strict";r.r(e),e.default={async signup({commit:t},e){try{const r=(await this.$UserApi.createUser(e)).data.user;this.$cookie.set("ssTok",r.token),t("UPDATE_ALLWD",r.authenticated),window.$nuxt.$router.push("/dashboard")}catch(e){const r=e.response.data,n=[];for(const t in r)n.push(r[t].message);t("UPDATE_SERVER_ERR",n)}},async logUserIn({commit:t},e){try{const r=(await this.$UserApi.logUserIn(e)).data.user;t("UPDATE_LOGIN_ERROR",null),t("UPDATE_ALLWD",r.authenticated),this.$cookie.set("ssTok",r.token,43200),window.$nuxt.$router.push("/dashboard")}catch(e){t("UPDATE_LOGIN_ERROR",e.response.data)}},async logout({commit:t}){try{const e=(await this.$UserApi.logUserOut()).data.user;this.$cookie.remove("ssTok"),t("UPDATE_ALLWD",e.authenticated)}catch(e){this.$cookie.remove("ssTok"),t("UPDATE_ALLWD",!1)}window.$nuxt.$router.push("/")}}},function(t,e,r){"use strict";r.r(e);var n=r(9);e.default={getField:n.getField}},function(t,e){t.exports=require("vue-client-only")},function(t,e){t.exports=require("@fortawesome/free-regular-svg-icons")},function(t,e){t.exports=require("querystring")},function(t,e){t.exports=require("node-fetch")},function(t,e){t.exports=require("vue-meta")},function(t,e){t.exports=require("defu")},function(t,e){t.exports=require("vue-cookies")},function(t,e){t.exports=require("@fortawesome/free-solid-svg-icons")},function(t,e){t.exports=require("@fortawesome/vue-fontawesome")},function(t,e){t.exports=require("vuelidate")},function(t,e){t.exports=require("@vue/composition-api")},function(t,e,r){t.exports=r(43)},function(t,e,r){"use strict";r.r(e),e.default=function({store:t,app:e,redirect:r}){t.state.allwd||r("/login")}},function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return c}));var n=r(0),o=r.n(n);function c(){const t=this.$cookie.keys(),e=new RegExp(/sweep/);t.forEach(t=>{t.match(e)&&(o.a.prototype["$"+t]=!0)})}},function(t,e,r){"use strict";r.r(e);var n=r(6),o=r.n(n);for(var c in n)"default"!==c&&function(t){r.d(e,t,(function(){return n[t]}))}(c);e.default=o.a},function(t,e,r){(e=r(12)(!1)).push([t.i,".__nuxt-error-page{padding:1rem;background:#f7f8fb;color:#47494e;text-align:center;display:flex;justify-content:center;align-items:center;flex-direction:column;font-family:sans-serif;font-weight:100!important;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;position:absolute;top:0;left:0;right:0;bottom:0}.__nuxt-error-page .error{max-width:450px}.__nuxt-error-page .title{font-size:1.5rem;margin-top:15px;color:#47494e;margin-bottom:8px}.__nuxt-error-page .description{color:#7f828b;line-height:21px;margin-bottom:10px}.__nuxt-error-page a{color:#7f828b!important;text-decoration:none}.__nuxt-error-page .logo{position:fixed;left:12px;bottom:12px}",""]),t.exports=e},function(t,e,r){"use strict";r.r(e);var n=r(7),o=r.n(n);for(var c in n)"default"!==c&&function(t){r.d(e,t,(function(){return n[t]}))}(c);e.default=o.a},function(t,e,r){(e=r(12)(!1)).push([t.i,".nuxt-progress{position:fixed;top:0;left:0;right:0;height:2px;width:0;opacity:1;transition:width .1s,opacity .4s;background-color:#fff;z-index:999999}.nuxt-progress.nuxt-progress-notransition{transition:none}.nuxt-progress-failed{background-color:red}",""]),t.exports=e},function(t,e,r){"use strict";r.r(e);var n=r(8),o=r.n(n);for(var c in n)"default"!==c&&function(t){r.d(e,t,(function(){return n[t]}))}(c);e.default=o.a},function(t,e,r){var n=r(12),o=r(39),c=r(40);e=n(!1);var l=o(c);e.push([t.i,"*{box-sizing:border-box;margin:0}html{background-color:#fc3342;scroll-behavior:smooth}#__layout,#__nuxt,body,html{height:100%}form{max-width:400px;margin:15px auto;background:#ffbf00;border-radius:5px;width:95%;padding:15px 20px;border:3px solid #c09000}form.error{border-color:#fc3342}h1{color:#fc3342;font-size:23vw;text-align:left;margin-bottom:10px}@media (min-width:700px){h1{font-size:21vh}}h2{font-size:3.7vh;text-align:left;color:#3d3d3d}h3{color:#fc3342;font-size:5.1vw}@media (min-width:1025px){h3{font-size:3.1vh}}:focus{outline:none}.sweep-steaks{font-family:Arimo,sans-serif,Helvetica,Arial;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;background:url("+l+") no-repeat top fixed;background-size:310% auto;height:100vh;min-width:100vw;overflow-x:hidden;overflow-y:scroll}@media (min-width:700px){.sweep-steaks{height:100%;background-size:cover}}",""]),t.exports=e},function(t,e,r){"use strict";t.exports=function(t,e){return e||(e={}),"string"!=typeof(t=t&&t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},function(t,e,r){t.exports=r.p+"img/9439f71.svg"},function(t,e,r){"use strict";r.r(e),r.d(e,"state",(function(){return d})),r.d(e,"actions",(function(){return h})),r.d(e,"getters",(function(){return f})),r.d(e,"mutations",(function(){return m}));var n=r(15),o=r(16),c=r(17),l=r(18);const d=n.default,h=c.default,f=l.default,m=o.default},function(t,e){},function(t,e,r){"use strict";r.r(e);var n=r(21),o=r(0),c=r.n(o),l=r(22),d=r.n(l);const h={};h.auth=r(31),h.auth=h.auth.default||h.auth,h.featureFlags=r(32),h.featureFlags=h.featureFlags.default||h.featureFlags;var f=h;function m(t){return t.then(t=>t.default||t)}function x(t){return t.options&&t._Ctor===t||(t.options?(t._Ctor=t,t.extendOptions=t.options):(t=c.a.extend(t))._Ctor=t,!t.options.name&&t.options.__file&&(t.options.name=t.options.__file)),t}function v(t,e=!1,r="components"){return Array.prototype.concat.apply([],t.matched.map((t,n)=>Object.keys(t[r]).map(o=>(e&&e.push(n),t[r][o]))))}function y(t,e){return Promise.all(function(t,e){return Array.prototype.concat.apply([],t.matched.map((t,r)=>Object.keys(t.components).reduce((n,o)=>(t.components[o]?n.push(e(t.components[o],t.instances[o],t,o,r)):delete t.components[o],n),[])))}(t,async(t,r,n,o)=>("function"!=typeof t||t.options||(t=await t()),n.components[o]=t=x(t),"function"==typeof e?e(t,r,n,o):t)))}async function _(t){if(t)return await y(t),{...t,meta:v(t).map((e,r)=>({...e.options.meta,...(t.matched[r]||{}).meta}))}}async function w(t,e){t.context||(t.context={isStatic:!1,isDev:!1,isHMR:!1,app:t,store:t.store,payload:e.payload,error:e.error,base:"/",env:{BASE_URL:"http://localhost:3000"}},e.req&&(t.context.req=e.req),e.res&&(t.context.res=e.res),e.ssrContext&&(t.context.ssrContext=e.ssrContext),t.context.redirect=(e,path,r)=>{if(!e)return;t.context._redirected=!0;let n=typeof path;"number"==typeof e||"undefined"!==n&&"object"!==n||(r=path||{},n=typeof(path=e),e=302),"object"===n&&(path=t.router.resolve(path).route.fullPath),/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)?t.context.next({path:path,query:r,status:e}):(path=function(t,e){let r;const n=t.indexOf("://");-1!==n?(r=t.substring(0,n),t=t.substring(n+3)):t.startsWith("//")&&(t=t.substring(2));let o,c=t.split("/"),l=(r?r+"://":"//")+c.shift(),path=c.filter(Boolean).join("/");c=path.split("#"),2===c.length&&([path,o]=c);l+=path?"/"+path:"",e&&"{}"!==JSON.stringify(e)&&(l+=(2===t.split("?").length?"&":"?")+function(t){return Object.keys(t).sort().map(e=>{const r=t[e];return null==r?"":Array.isArray(r)?r.slice().map(t=>[e,"=",t].join("")).join("&"):e+"="+r}).filter(Boolean).join("&")}(e));return l+=o?"#"+o:"",l}(path,r),t.context.next({path:path,status:e}))},t.context.beforeNuxtRender=t=>e.beforeRenderFns.push(t));const[r,n]=await Promise.all([_(e.route),_(e.from)]);e.route&&(t.context.route=r),e.from&&(t.context.from=n),t.context.next=e.next,t.context._redirected=!1,t.context._errored=!1,t.context.isHMR=!1,t.context.params=t.context.route.params||{},t.context.query=t.context.route.query||{}}function $(t,e){return!t.length||e._redirected||e._errored?Promise.resolve():C(t[0],e).then(()=>$(t.slice(1),e))}function C(t,e){let r;return r=2===t.length?new Promise(r=>{t(e,(function(t,data){t&&e.error(t),r(data=data||{})}))}):t(e),r&&r instanceof Promise&&"function"==typeof r.then?r:Promise.resolve(r)}function k(t,e){return function(t,e){const r=new Array(t.length);for(let i=0;i<t.length;i++)"object"==typeof t[i]&&(r[i]=new RegExp("^(?:"+t[i].pattern+")$",O(e)));return function(e,n){let path="";const data=e||{},o=(n||{}).pretty?j:encodeURIComponent;for(let i=0;i<t.length;i++){const e=t[i];if("string"==typeof e){path+=e;continue}const n=data[e.name||"pathMatch"];let c;if(null==n){if(e.optional){e.partial&&(path+=e.prefix);continue}throw new TypeError('Expected "'+e.name+'" to be defined')}if(Array.isArray(n)){if(!e.repeat)throw new TypeError('Expected "'+e.name+'" to not repeat, but received `'+JSON.stringify(n)+"`");if(0===n.length){if(e.optional)continue;throw new TypeError('Expected "'+e.name+'" to not be empty')}for(let t=0;t<n.length;t++){if(c=o(n[t]),!r[i].test(c))throw new TypeError('Expected all "'+e.name+'" to match "'+e.pattern+'", but received `'+JSON.stringify(c)+"`");path+=(0===t?e.prefix:e.delimiter)+c}}else{if(c=e.asterisk?j(n,!0):o(n),!r[i].test(c))throw new TypeError('Expected "'+e.name+'" to match "'+e.pattern+'", but received "'+c+'"');path+=e.prefix+c}}return path}}(function(t,e){const r=[];let n=0,o=0,path="";const c=e&&e.delimiter||"/";let l;for(;null!=(l=S.exec(t));){const e=l[0],d=l[1],h=l.index;if(path+=t.slice(o,h),o=h+e.length,d){path+=d[1];continue}const f=t[o],m=l[2],x=l[3],v=l[4],y=l[5],_=l[6],w=l[7];path&&(r.push(path),path="");const $=null!=m&&null!=f&&f!==m,C="+"===_||"*"===_,k="?"===_||"*"===_,E=l[2]||c,pattern=v||y;r.push({name:x||n++,prefix:m||"",delimiter:E,optional:k,repeat:C,partial:$,asterisk:Boolean(w),pattern:pattern?A(pattern):w?".*":"[^"+T(E)+"]+?"})}o<t.length&&(path+=t.substr(o));path&&r.push(path);return r}(t,e),e)}function E(t){let e;if(t.message||"string"==typeof t)e=t.message||t;else try{e=JSON.stringify(t,null,2)}catch(r){e=`[${t.constructor.name}]`}return{...t,message:e,statusCode:t.statusCode||t.status||t.response&&t.response.status||500}}const S=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function j(t,e){const r=e?/[?#]/g:/[/?#]/g;return encodeURI(t).replace(r,t=>"%"+t.charCodeAt(0).toString(16).toUpperCase())}function T(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function A(t){return t.replace(/([=!:$/()])/g,"\\$1")}function O(t){return t&&t.sensitive?"":"i"}async function P(){if(!this._fetchOnServer)return;try{await this.$options.fetch.call(this)}catch(t){this.$fetchState.error=E(t)}this.$fetchState.pending=!1,this._fetchKey=this.$ssrContext.nuxt.fetch.length,(this.$vnode.data.attrs=this.$vnode.data.attrs||{})["data-fetch-key"]=this._fetchKey,this.$ssrContext.nuxt.fetch.push(this.$fetchState.error?{_error:this.$fetchState.error}:this._data)}var U={beforeCreate(){var t;(t=this).$options&&"function"==typeof t.$options.fetch&&!t.$options.fetch.length&&("function"==typeof this.$options.fetchOnServer?this._fetchOnServer=!1!==this.$options.fetchOnServer.call(this):this._fetchOnServer=!1!==this.$options.fetchOnServer,c.a.util.defineReactive(this,"$fetchState",{pending:!0,error:null,timestamp:Date.now()}),function(t,e,r){t.$options[e]||(t.$options[e]=[]),t.$options[e].includes(r)||t.$options[e].push(r)}(this,"serverPrefetch",P))}},R=r(23),L=r.n(R),N=r(19),F=r.n(N),D=r(10),M=r.n(D),z=r(4),I=r.n(z);const B=()=>{},V=I.a.prototype.push;I.a.prototype.push=function(t,e=B,r){return V.call(this,t,e,r)},c.a.use(I.a);const K={mode:"history",base:decodeURI("/"),linkActiveClass:"nuxt-link-active",linkExactActiveClass:"nuxt-link-exact-active",scrollBehavior:function(t,e,r){let n=!1;const o=v(t);(o.length<2&&o.every(t=>!1!==t.options.scrollToTop)||o.some(t=>t.options.scrollToTop))&&(n={x:0,y:0}),r&&(n=r);const c=window.$nuxt;return t.path===e.path&&t.hash!==e.hash&&c.$nextTick(()=>c.$emit("triggerScroll")),new Promise(e=>{c.$once("triggerScroll",()=>{if(t.hash){let e=t.hash;void 0!==window.CSS&&void 0!==window.CSS.escape&&(e="#"+window.CSS.escape(e.substr(1)));try{document.querySelector(e)&&(n={selector:e})}catch(t){console.warn("Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).")}}e(n)})})},routes:[{path:"/dashboard",component:()=>m(r.e(1).then(r.bind(null,74))),name:"dashboard"},{path:"/login",component:()=>m(r.e(3).then(r.bind(null,75))),name:"login"},{path:"/",component:()=>m(r.e(2).then(r.bind(null,73))),name:"index"}],fallback:!1};var H={name:"NuxtChild",functional:!0,props:{nuxtChildKey:{type:String,default:""},keepAlive:Boolean,keepAliveProps:{type:Object,default:void 0}},render(t,{parent:e,data:data,props:r}){const n=e.$createElement;data.nuxtChild=!0;const o=e,c=e.$nuxt.nuxt.transitions,l=e.$nuxt.nuxt.defaultTransition;let d=0;for(;e;)e.$vnode&&e.$vnode.data.nuxtChild&&d++,e=e.$parent;data.nuxtChildDepth=d;const h=c[d]||l,f={};W.forEach(t=>{void 0!==h[t]&&(f[t]=h[t])});const m={};if(J.forEach(t=>{"function"==typeof h[t]&&(m[t]=h[t].bind(o))}),!1===h.css){const t=m.leave;(!t||t.length<2)&&(m.leave=(e,r)=>{t&&t.call(o,e),o.$nextTick(r)})}let x=n("routerView",data);return r.keepAlive&&(x=n("keep-alive",{props:r.keepAliveProps},[x])),n("transition",{props:f,on:m},[x])}};const W=["name","mode","appear","css","type","duration","enterClass","leaveClass","appearClass","enterActiveClass","enterActiveClass","leaveActiveClass","appearActiveClass","enterToClass","leaveToClass","appearToClass"],J=["beforeEnter","enter","afterEnter","enterCancelled","beforeLeave","leave","afterLeave","leaveCancelled","beforeAppear","appear","afterAppear","appearCancelled"];var X={name:"NuxtError",props:{error:{type:Object,default:null}},computed:{statusCode(){return this.error&&this.error.statusCode||500},message(){return this.error.message||"Error"}},head(){return{title:this.message,meta:[{name:"viewport",content:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"}]}}},G=r(3);var Z=Object(G.a)(X,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"__nuxt-error-page"},[t._ssrNode('<div class="error">',"</div>",[t._ssrNode('<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"></path></svg> <div class="title">'+t._ssrEscape(t._s(t.message))+"</div> "),404===t.statusCode?t._ssrNode('<p class="description">',"</p>",[r("NuxtLink",{staticClass:"error-link",attrs:{to:"/"}},[t._v("Back to the home page")])],1):t._e(),t._ssrNode(' <div class="logo"><a href="https://nuxtjs.org" target="_blank" rel="noopener">Nuxt.js</a></div>')],2)])}),[],!1,(function(t){var e=r(33);e.__inject__&&e.__inject__(t)}),null,"7e67c2de").exports,Q={name:"Nuxt",components:{NuxtChild:H,NuxtError:Z},props:{nuxtChildKey:{type:String,default:void 0},keepAlive:Boolean,keepAliveProps:{type:Object,default:void 0},name:{type:String,default:"default"}},errorCaptured(t){this.displayingNuxtError&&(this.errorFromNuxtError=t,this.$forceUpdate())},computed:{routerViewKey(){if(void 0!==this.nuxtChildKey||this.$route.matched.length>1)return this.nuxtChildKey||k(this.$route.matched[0].path)(this.$route.params);const[t]=this.$route.matched;if(!t)return this.$route.path;const e=t.components.default;if(e&&e.options){const{options:t}=e;if(t.key)return"function"==typeof t.key?t.key(this.$route):t.key}return/\/$/.test(t.path)?this.$route.path:this.$route.path.replace(/\/$/,"")}},beforeCreate(){c.a.util.defineReactive(this,"nuxt",this.$root.$options.nuxt)},render(t){return this.nuxt.err?this.errorFromNuxtError?(this.$nextTick(()=>this.errorFromNuxtError=!1),t("div",{},[t("h2","An error occured while showing the error page"),t("p","Unfortunately an error occured and while showing the error page another error occured"),t("p","Error details: "+this.errorFromNuxtError.toString()),t("nuxt-link",{props:{to:"/"}},"Go back to home")])):(this.displayingNuxtError=!0,this.$nextTick(()=>this.displayingNuxtError=!1),t(Z,{props:{error:this.nuxt.err}})):t("NuxtChild",{key:this.routerViewKey,props:this.$props})}},Y={name:"NuxtLoading",data:()=>({percent:0,show:!1,canSucceed:!0,reversed:!1,skipTimerCount:0,rtl:!1,throttle:200,duration:5e3,continuous:!1}),computed:{left(){return!(!this.continuous&&!this.rtl)&&(this.rtl?this.reversed?"0px":"auto":this.reversed?"auto":"0px")}},beforeDestroy(){this.clear()},methods:{clear(){clearInterval(this._timer),clearTimeout(this._throttle),this._timer=null},start(){return this.clear(),this.percent=0,this.reversed=!1,this.skipTimerCount=0,this.canSucceed=!0,this.throttle?this._throttle=setTimeout(()=>this.startTimer(),this.throttle):this.startTimer(),this},set(t){return this.show=!0,this.canSucceed=!0,this.percent=Math.min(100,Math.max(0,Math.floor(t))),this},get(){return this.percent},increase(t){return this.percent=Math.min(100,Math.floor(this.percent+t)),this},decrease(t){return this.percent=Math.max(0,Math.floor(this.percent-t)),this},pause(){return clearInterval(this._timer),this},resume(){return this.startTimer(),this},finish(){return this.percent=this.reversed?0:100,this.hide(),this},hide(){return this.clear(),setTimeout(()=>{this.show=!1,this.$nextTick(()=>{this.percent=0,this.reversed=!1})},500),this},fail(t){return this.canSucceed=!1,this},startTimer(){this.show||(this.show=!0),void 0===this._cut&&(this._cut=1e4/Math.floor(this.duration)),this._timer=setInterval(()=>{this.skipTimerCount>0?this.skipTimerCount--:(this.reversed?this.decrease(this._cut):this.increase(this._cut),this.continuous&&(this.percent>=100||this.percent<=0)&&(this.skipTimerCount=1,this.reversed=!this.reversed))},100)}},render(t){let e=t(!1);return this.show&&(e=t("div",{staticClass:"nuxt-progress",class:{"nuxt-progress-notransition":this.skipTimerCount>0,"nuxt-progress-failed":!this.canSucceed},style:{width:this.percent+"%",left:this.left}})),e}};var tt=Object(G.a)(Y,void 0,void 0,!1,(function(t){var e=r(35);e.__inject__&&e.__inject__(t)}),null,"0c4cfedc").exports;const et={_default:x(Object(G.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sweep-steaks"},[e("nuxt")],1)}),[],!1,(function(t){var e=r(37);e.__inject__&&e.__inject__(t)}),null,"a9e9b3c0").exports)};var nt={render(t,e){const r=t("NuxtLoading",{ref:"loading"}),n=t(this.layout||"nuxt"),o=t("div",{domProps:{id:"__layout"},key:this.layoutName},[n]),c=t("transition",{props:{name:"layout",mode:"out-in"},on:{beforeEnter(t){window.$nuxt.$nextTick(()=>{window.$nuxt.$emit("triggerScroll")})}}},[o]);return t("div",{domProps:{id:"__nuxt"}},[r,c])},data:()=>({isOnline:!0,layout:null,layoutName:"",nbFetching:0}),beforeCreate(){c.a.util.defineReactive(this,"nuxt",this.$options.nuxt)},created(){c.a.prototype.$nuxt=this,this.error=this.nuxt.error,this.context=this.$options.context},mounted(){this.$loading=this.$refs.loading},watch:{"nuxt.err":"errorChanged"},computed:{isOffline(){return!this.isOnline},isFetching(){return this.nbFetching>0}},methods:{refreshOnlineStatus(){0},async refresh(){const t=function(t,e=!1){return v(t,e,"instances")}(this.$route);if(!t.length)return;this.$loading.start();const e=t.map(t=>{const p=[];if(t.$options.fetch&&t.$options.fetch.length&&p.push(C(t.$options.fetch,this.context)),t.$fetch)p.push(t.$fetch());else for(const component of function t(e,r=[]){const n=e.$children||[];for(const e of n)e.$fetch?r.push(e):e.$children&&t(e,r);return r}(t.$vnode.componentInstance))p.push(component.$fetch());return t.$options.asyncData&&p.push(C(t.$options.asyncData,this.context).then(e=>{for(const r in e)c.a.set(t.$data,r,e[r])})),Promise.all(p)});try{await Promise.all(e)}catch(t){this.$loading.fail(t),function(t){c.a.config.errorHandler&&c.a.config.errorHandler(t)}(t),this.error(t)}this.$loading.finish()},errorChanged(){this.nuxt.err&&this.$loading&&(this.$loading.fail&&this.$loading.fail(this.nuxt.err),this.$loading.finish&&this.$loading.finish())},setLayout(t){return t&&et["_"+t]||(t="default"),this.layoutName=t,this.layout=et["_"+t],this.layout},loadLayout:t=>(t&&et["_"+t]||(t="default"),Promise.resolve(et["_"+t]))},components:{NuxtLoading:tt}},ot=r(14),st=r.n(ot);c.a.use(st.a);const it=["state","getters","actions","mutations"];let at={};at=function(t,e){if((t=t.default||t).commit)throw new Error(`[nuxt] ${e} should export a method that returns a Vuex instance.`);return"function"!=typeof t&&(t=Object.assign({},t)),ut(t,e)}(r(41),"store/index.js"),at.modules=at.modules||{},lt(r(17),"actions.js"),lt(r(18),"getters.js"),lt(r(16),"mutations.js"),lt(r(15),"state.js");const ct=at instanceof Function?at:()=>new st.a.Store(Object.assign({strict:!1},at));function ut(t,e){if(t.state&&"function"!=typeof t.state){console.warn("'state' should be a method that returns an object in "+e);const r=Object.assign({},t.state);t=Object.assign({},t,{state:()=>r})}return t}function lt(t,e){t=t.default||t;const r=e.replace(/\.(js|mjs|ts)$/,"").split("/");let n=r[r.length-1];const o="store/"+e;if(t="state"===n?function(t,e){if("function"!=typeof t){console.warn(e+" should export a method that returns an object");const r=Object.assign({},t);return()=>r}return ut(t,e)}(t,o):ut(t,o),it.includes(n)){const e=n;return void ht(pt(at,r,{isProperty:!0}),t,e)}"index"===n&&(r.pop(),n=r[r.length-1]);const c=pt(at,r);for(const e of it)ht(c,t[e],e);!1===t.namespaced&&delete c.namespaced}function pt(t,e,{isProperty:r=!1}={}){if(!e.length||r&&1===e.length)return t;const n=e.shift();return t.modules[n]=t.modules[n]||{},t.modules[n].namespaced=!0,t.modules[n].modules=t.modules[n].modules||{},pt(t.modules[n],e,{isProperty:r})}function ht(t,e,r){e&&("state"===r?t.state=e||t.state:t[r]=Object.assign({},t[r],e))}r(42);var ft=r(5),mt=r.n(ft),gt=r(24),xt=r.n(gt);"undefined"!=typeof window&&window.$nuxt;const vt={setBaseURL(t){this.defaults.baseURL=t},setHeader(t,e,r="common"){for(let n of Array.isArray(r)?r:[r]){if(!e)return void delete this.defaults.headers[n][t];this.defaults.headers[n][t]=e}},setToken(t,e,r="common"){const n=t?(e?e+" ":"")+t:null;this.setHeader("Authorization",n,r)},onRequest(t){this.interceptors.request.use(e=>t(e)||e)},onResponse(t){this.interceptors.response.use(e=>t(e)||e)},onRequestError(t){this.interceptors.request.use(void 0,e=>t(e)||Promise.reject(e))},onResponseError(t){this.interceptors.response.use(void 0,e=>t(e)||Promise.reject(e))},onError(t){this.onRequestError(t),this.onResponseError(t)},create(t){return yt(xt()(t,this.defaults))}};for(let t of["request","delete","get","head","options","post","put","patch"])vt["$"+t]=function(){return this[t].apply(this,arguments).then(t=>t&&t.data)};const yt=t=>{const e=mt.a.create(t);return e.CancelToken=mt.a.CancelToken,e.isCancel=mt.a.isCancel,(t=>{for(let e in vt)t[e]=vt[e].bind(t)})(e),_t(e),e},_t=t=>{};var wt=(t,e)=>{const r={baseURL:process.env._AXIOS_BASE_URL_||"http://localhost:3000/",headers:{common:{Accept:"application/json, text/plain, */*"},delete:{},get:{},head:{},post:{},put:{},patch:{}}};if(t.req&&t.req.headers){const e={...t.req.headers};for(let t of["accept","host","cf-ray","cf-connecting-ip","content-length","content-md5","content-type"])delete e[t];r.headers.common={...e,...r.headers.common}}r.headers.common["accept-encoding"]="gzip, deflate";const n=yt(r);t.$axios=n,e("axios",n)},bt=r(25),$t=r.n(bt),Ct=function(t,e){e("cookie",$t.a)},kt=r(11),Et=r(20),St=r(26),jt=r(27);kt.library.add(Et.faQuestionCircle),kt.library.add(Et.faTimesCircle),kt.library.add(St.faCircleNotch),c.a.component("font-awesome-icon",jt.FontAwesomeIcon);const qt="/competitions";var Tt=function({app:t,$axios:e,store:r},n){const o=e.create({baseURL:"https://sweep-steaks.herokuapp.com/api",headers:{"Content-Type":"application/json"},withCredentials:!0});n("CompApi",function(t){return{getAllCompetitions:()=>t.get(qt+"/"),getCopetitionById:e=>t.get(`${qt}/${e}`),createCompetition:e=>t.post(qt+"/",e),updateCompetition:(e,r)=>t.post(`${qt}/${e}`,r),deleteCompetition:e=>t.delete(`${qt}/${e}`)}}(o)),n("UserApi",function(t,e,r){return{getUserByUserName:e=>t.get("/users/"+e),isUserNameUnique:e=>t.get("/users/unique/"+e),async getUserLoginState(){if(!e.get("ssTok"))return!1;try{const{data:data}=await t.get("/users/status/");return r.commit("UPDATE_ALLWD",data.user.authenticated),e.set("ssTok",data.user.token,43200),data.user.authenticated}catch(t){return!1}},createUser(e){const r=JSON.stringify(e);return t.post("/users/",r)},logUserIn(e){const r=JSON.stringify(e);return t.post("/users/status/login",r)},logUserOut:()=>t.patch("/users/status/logout",null,{headers:{authorisation:e.get("ssTok")}}),updateUser:(e,r)=>t.post("/users/"+e,r),deleteUser:e=>t.delete("/users/"+e)}}(o,t.$cookie,r))},At=r(28),Ot=r.n(At),Pt=r(1);c.a.use(Ot.a);var Ut=function({app:t,$axios:e,store:r},n){var o;n("SignUpValidations",(o=t.$UserApi,{firstName:{required:Pt.a.required("First name"),minLength:Pt.a.minLength("First name",2),format:Pt.a.nameFormat("First name")},lastName:{required:Pt.a.required("Last name"),minLength:Pt.a.minLength("Last name",2),format:Pt.a.nameFormat("Last name")},email:{required:Pt.a.required("Email"),format:Pt.a.emailFormat()},username:{required:Pt.a.required("Username"),minLength:Pt.a.minLength("Username",6),format:Pt.a.usernameFormat(),unique:Pt.a.usernameUnique(o)},password:{required:Pt.a.required("Password"),minLength:Pt.a.minLength("Password",8),password:Pt.a.passwordFormat()}})),n("LoginValidations",{username:{required:Pt.a.required("Username"),minLength:Pt.a.minLength("Username",6),format:Pt.a.usernameFormat()},password:{required:Pt.a.required("Password"),minLength:Pt.a.minLength("Password",8),password:Pt.a.passwordFormat()}})},Rt=r(29),Lt=r.n(Rt);c.a.use(Lt.a),c.a.component(F.a.name,F.a),c.a.component(M.a.name,{...M.a,render:(t,e)=>M.a.render(t,e)}),c.a.component(H.name,H),c.a.component("NChild",H),c.a.component(Q.name,Q),c.a.use(L.a,{keyName:"head",attribute:"data-n-head",ssrAttribute:"data-n-head-ssr",tagIDKeyName:"hid"});const Nt={name:"page",mode:"out-in",appear:!1,appearClass:"appear",appearActiveClass:"appear-active",appearToClass:"appear-to"};async function Ft(t){const e=await new I.a(K),r=ct(t);r.$router=e;const n=r.registerModule;r.registerModule=(path,t,e)=>n.call(r,path,t,Object.assign({preserveState:!1},e));const o={head:{title:"newapp",meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:"Sweepsteaks-ssr-app"},{hid:"mobile-web-app-capable",name:"mobile-web-app-capable",content:"yes"},{hid:"apple-mobile-web-app-title",name:"apple-mobile-web-app-title",content:"vue-sweepstakes"},{hid:"author",name:"author",content:"SampsonM"},{hid:"theme-color",name:"theme-color",content:"#ffbf00"},{hid:"og:type",name:"og:type",property:"og:type",content:"website"},{hid:"og:title",name:"og:title",property:"og:title",content:"vue-sweepstakes"},{hid:"og:site_name",name:"og:site_name",property:"og:site_name",content:"vue-sweepstakes"},{hid:"og:description",name:"og:description",property:"og:description",content:"Sweepsteaks-ssr-app"}],link:[{rel:"icon",type:"image/x-icon",href:"/favicon.png"},{rel:"manifest",href:"/_nuxt/manifest.bb918bdb.json"},{rel:"shortcut icon",href:"./img/icons/favicon-16x16.png"},{rel:"apple-touch-icon",href:"./img/icons/favicon-32x32.png",sizes:"32x32"}],style:[],script:[],htmlAttrs:{lang:"en"}},store:r,router:e,nuxt:{defaultTransition:Nt,transitions:[Nt],setTransitions(t){return Array.isArray(t)||(t=[t]),t=t.map(t=>t=t?"string"==typeof t?Object.assign({},Nt,{name:t}):Object.assign({},Nt,t):Nt),this.$options.nuxt.transitions=t,t},err:null,dateErr:null,error(e){e=e||null,o.context._errored=Boolean(e),e=e?E(e):null;let r=o.nuxt;return this&&(r=this.nuxt||this.$options.nuxt),r.dateErr=Date.now(),r.err=e,t&&(t.nuxt.error=e),e}},...nt};r.app=o;const l=t?t.next:t=>o.router.push(t);let d;if(t)d=e.resolve(t.url).route;else{const path=function(base,t){let path=decodeURI(window.location.pathname);return"hash"===t?window.location.hash.replace(/^#\//,""):(base&&0===path.indexOf(base)&&(path=path.slice(base.length)),(path||"/")+window.location.search+window.location.hash)}(e.options.base,e.options.mode);d=e.resolve(path).route}await w(o,{store:r,route:d,next:l,error:o.nuxt.error.bind(o),payload:t?t.payload:void 0,req:t?t.req:void 0,res:t?t.res:void 0,beforeRenderFns:t?t.beforeRenderFns:void 0,ssrContext:t});const h=function(t,e){if(!t)throw new Error("inject(key, value) has no key provided");if(void 0===e)throw new Error(`inject('${t}', value) has no value provided`);o[t="$"+t]=e,r[t]=o[t];const n="__nuxt_"+t+"_installed__";c.a[n]||(c.a[n]=!0,c.a.use(()=>{Object.prototype.hasOwnProperty.call(c.a,t)||Object.defineProperty(c.a.prototype,t,{get(){return this.$root.$options[t]}})}))};return await wt(o.context,h),await Ct(o.context,h),await Tt(o.context,h),await Ut(o.context,h),t&&t.url&&await new Promise((r,n)=>{e.push(t.url,r,()=>{const n=e.afterEach(async(e,c,l)=>{t.url=e.fullPath,o.context.route=await _(e),o.context.params=e.params||{},o.context.query=e.query||{},n(),r()})})}),{store:r,app:o,router:e}}var Dt={name:"NuxtLink",extends:c.a.component("RouterLink"),props:{prefetch:{type:Boolean,default:!0},noPrefetch:{type:Boolean,default:!1}}};c.a.config.optionMergeStrategies.serverPrefetch=c.a.config.optionMergeStrategies.created,c.a.__nuxt__fetch__mixin__||(c.a.mixin(U),c.a.__nuxt__fetch__mixin__=!0),c.a.component(Dt.name,Dt),c.a.component("NLink",Dt),global.fetch||(global.fetch=d.a);const Mt=()=>new c.a({render:t=>t("div")});const zt=t=>e=>{if(t.redirected=e,!t.res)return void(t.nuxt.serverRendered=!1);e.query=Object(n.stringify)(e.query),e.path=e.path+(e.query?"?"+e.query:"");e.path.startsWith("http"),e.path!==t.url?(t.res.writeHead(e.status,{Location:e.path}),t.res.end()):t.redirected=!1};e.default=async t=>{t.redirected=!1,t.next=zt(t),t.beforeRenderFns=[],t.nuxt={layout:"default",data:[],fetch:[],error:null,state:null,serverRendered:!0,routePath:""};const{app:e,router:r,store:n}=await Ft(t),o=new c.a(e);t.nuxt.routePath=e.context.route.path,t.meta=o.$meta(),t.asyncData={};const l=async()=>{await Promise.all(t.beforeRenderFns.map(e=>C(e,{Components:m,nuxtState:t.nuxt}))),t.rendered=()=>{t.nuxt.state=n.state}},d=async()=>{const r=(Z.options||Z).layout,n="function"==typeof r?r.call(Z,e.context):r;return t.nuxt.layout=n||"default",await o.loadLayout(n),o.setLayout(n),await l(),o},h=()=>(e.context.error({statusCode:404,path:t.url,message:"This page could not be found"}),d()),m=v(r.match(t.url));if(n._actions&&n._actions.nuxtServerInit)try{await n.dispatch("nuxtServerInit",e.context)}catch(t){throw console.debug("Error occurred when calling nuxtServerInit: ",t.message),t}if(t.redirected)return Mt();if(t.nuxt.error)return d();let y=[];if(y=y.map(t=>"function"==typeof t?t:("function"!=typeof f[t]&&e.context.error({statusCode:500,message:"Unknown middleware "+t}),f[t])),await $(y,e.context),t.redirected)return Mt();if(t.nuxt.error)return d();let _=m.length?m[0].options.layout:Z.layout;if("function"==typeof _&&(_=_(e.context)),await o.loadLayout(_),t.nuxt.error)return d();if(_=o.setLayout(_),t.nuxt.layout=o.layoutName,y=[],_=x(_),_.options.middleware&&(y=y.concat(_.options.middleware)),m.forEach(t=>{t.options.middleware&&(y=y.concat(t.options.middleware))}),y=y.map(t=>"function"==typeof t?t:("function"!=typeof f[t]&&e.context.error({statusCode:500,message:"Unknown middleware "+t}),f[t])),await $(y,e.context),t.redirected)return Mt();if(t.nuxt.error)return d();let w=!0;try{for(const t of m)if("function"==typeof t.options.validate&&(w=await t.options.validate(e.context),!w))break}catch(t){return e.context.error({statusCode:t.statusCode||"500",message:t.message}),d()}if(!w)return t._generate&&(t.nuxt.serverRendered=!1),h();if(!m.length)return h();const k=await Promise.all(m.map(r=>{const n=[];if(r.options.asyncData&&"function"==typeof r.options.asyncData){const o=C(r.options.asyncData,e.context);o.then(e=>(t.asyncData[r.cid]=e,function(t,e){if(!e&&t.options.__hasNuxtData)return;const r=t.options._originDataFn||t.options.data||function(){return{}};t.options._originDataFn=r,t.options.data=function(){const data=r.call(this,this);return this.$ssrContext&&(e=this.$ssrContext.asyncData[t.cid]),{...data,...e}},t.options.__hasNuxtData=!0,t._Ctor&&t._Ctor.options&&(t._Ctor.options.data=t.options.data)}(r),e)),n.push(o)}else n.push(null);return r.options.fetch&&r.options.fetch.length?n.push(r.options.fetch(e.context)):n.push(null),Promise.all(n)}));return t.nuxt.data=k.map(t=>t[0]||{}),t.redirected?Mt():t.nuxt.error?d():(await l(),o)}}]);