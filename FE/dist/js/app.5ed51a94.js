(function(e){function t(t){for(var n,o,i=t[0],c=t[1],u=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var c=r[o];0!==a[c]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},s=[];function o(e){return i.p+"js/"+({dashboard:"dashboard",login:"login"}[e]||e)+"."+{dashboard:"d7c478f6",login:"bcf67799"}[e]+".js"}function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[],r=a[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=n);var s,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=o(e);var u=new Error;s=function(t){c.onerror=c.onload=null,clearTimeout(l);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",u.name="ChunkLoadError",u.type=n,u.request=s,r[1](u)}a[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:c})}),12e4);c.onerror=c.onload=s,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var p=u;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},2001:function(e,t,r){"use strict";var n=r("75e4"),a=r.n(n);a.a},"25b8":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},s=[],o=(r("5c0b"),r("2877")),i={},c=Object(o["a"])(i,a,s,!1,null,null,null),u=c.exports,l=r("8c4f"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"landing-page",attrs:{itemscope:"",itemtype:"http://schema.org/Brand"}},[r("div",{staticClass:"landing-page__splash"},[r("div",{staticClass:"landing-page__banner"},[e._m(0),e._m(1),e.$sweepAccessAllowed?r("div",{staticClass:"landing-page__ctas"},[r("button",{staticClass:"landing-page__ctas-login"},[e.allwd?r("router-link",{attrs:{to:"/dashboard"}},[e._v("Dashboard")]):r("router-link",{attrs:{to:"/login"}},[e._v("Login")])],1),e.allwd?e._e():r("a",{staticClass:"landing-page__ctas-sign-up",attrs:{href:"#signup"}},[e._v("\n          Sign-up\n        ")])]):e._e()])]),e.$sweepAccessAllowed?r("LandingPageContent"):e._e()],1)},d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"landing-page__logo"},[n("img",{staticClass:"brush",attrs:{itemprop:"logo",alt:"Sweepsteaks",src:r("c792")}}),n("img",{staticClass:"steak",attrs:{itemprop:"logo",alt:"Sweepsteaks",src:r("c098")}}),n("img",{staticClass:"steak",attrs:{itemprop:"logo",alt:"Sweepsteaks",src:r("c098")}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"landing-page__title-wrapper"},[r("h1",{staticClass:"landing-page__title"},[e._v("- welcome to -"),r("br"),r("span",{attrs:{itemprop:"name"}},[e._v("SWEEP-STEAKS")])])])}],f=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),m=r("2f62"),h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"landing-content"},[r("SignupForm")],1)},b=[],g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{staticClass:"sign-up",attrs:{id:"signup",autocomplete:"on"}},[r("h2",{staticClass:"sign-up__title"},[e._v("Sign up")]),e._l(e.formFields,(function(t){return r("MyInput",{key:t.label,class:{error:e.$v[t.errClass].$error},attrs:{label:t.label,name:t.name,type:t.type||"text",hint:t.hint,hasError:e.$v[t.errClass].$error,error:e.$v[t.errClass]},on:{blur:function(r){return e.handleInput(t.name,r)}}})})),e._v("\n\n  "+e._s(e.firstServerError)+"\n\n  "),r("button",{staticClass:"sign-up__btn",on:{click:function(t){return t.preventDefault(),e.handleSignup(t)}}},[r("p",[e._v("Sign-up")])])],2)},v=[],_=(r("96cf"),r("3b8d")),w=(r("3b2b"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"input"},[r("label",{attrs:{for:e.name}},[e._v(e._s(e.label))]),e.hint?r("i",{staticClass:"input__hint"},[e._v("\n      "+e._s(e.hint)+"\n    ")]):e._e(),r("span",{staticClass:"input__input-wrapper"},[r("input",e._b({class:{error:e.hasError},attrs:{name:e.name,id:e.name,type:e.type},on:{blur:function(t){return e.$emit("blur",t.target.value)}}},"input",e.$attrs,!1)),!e.error.minLength&&e.error.$params.minLength&&e.hasError?r("p",{staticClass:"input__input-error"},[e._v("\n          "+e._s(e.label)+" must be atleast "+e._s(e.error.$params.minLength.min)+" characters\n        ")]):e._e(),e.hasError&&!1===e.error.isUnique?r("p",{staticClass:"input__input-error"},[e._v("\n          Entered username currently exists, please choose another\n        ")]):e._e(),e.hasError&&!1===e.error.password?r("p",{staticClass:"input__input-error"},[e._v("\n          Password must contain atleast 1 lower & uppercase letter, number, special character and be between 6-20 characters\n        ")]):e._e(),e.hasError&&!1===e.error.userNameFormat?r("p",{staticClass:"input__input-error"},[e._v("\n          Username must contain atleast 2 numbers and be 6 characters long\n        ")]):e._e(),e.hasError&&!1===e.error.email?r("p",{staticClass:"input__input-error"},[e._v("\n          Entered email is invalid\n        ")]):e._e(),!e.error.required&&e.error.$params.required&&e.hasError?r("p",{staticClass:"input__input-error"},[e._v("\n          "+e._s(e.label)+" is required\n        ")]):e._e()])])}),y=[],O={inheritAttrs:!1,props:{label:{type:String,required:!0},hint:{type:String,required:!1},name:{type:String,required:!0},type:{type:String,required:!1,default:"text"},hasError:{type:Boolean,required:!1,default:!1},error:{type:Object,required:!1}}},j=O,E=(r("d28c"),Object(o["a"])(j,w,y,!1,null,"b7e939c6",null)),k=E.exports,C=r("b5ae"),P=r("bc3a"),S=r.n(P),$=S.a.create({baseURL:"https://sweep-steaks.herokuapp.com/api",headers:{"Content-Type":"application/json"}}),x="/users",L={getUserByUserName:function(e){return $.get("".concat(x,"/").concat(e))},isUserNameUnique:function(e){return $.get("".concat(x,"/unique/").concat(e))},getUserLoginState:function(){return $.get("".concat(x,"/current"))},createUser:function(e){var t=JSON.stringify(e);return $.post("".concat(x,"/"),t)},logUserIn:function(e){var t=JSON.stringify(e);return $.post("".concat(x,"/status/login"),t)},logUserOut:function(){return $.patch("".concat(x,"/status/logout"),null,{headers:{authorisation:n["a"].$cookies.get("ssTok")}})},updateUser:function(e,t){return $.post("".concat(x,"/").concat(e),t)},deleteUser:function(e){return $.delete("".concat(x,"/").concat(e))}};function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(Object(r),!0).forEach((function(t){Object(f["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var U={components:{MyInput:k},data:function(){return{firstName:"",lastName:"",email:"",username:"",password:"",formFields:[{name:"firstName",label:"First name",errClass:"firstName"},{name:"lastName",label:"Last name",errClass:"lastName"},{name:"email",label:"Email",errClass:"email"},{name:"username",label:"Username",hint:"Must be atleast 6 characters and include 2 numbers",errClass:"username"},{name:"password",label:"Password",hint:"Password must contain 1 lower & uppercase letter, number and special character and be between 8-20 characters",errClass:"password",type:"password"}]}},validations:{firstName:{required:C["required"],minLength:Object(C["minLength"])(2)},lastName:{required:C["required"],minLength:Object(C["minLength"])(2)},email:{required:C["required"],email:function(e){if(""===e)return!0;var t=/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/g;return t.test(e)}},username:{required:C["required"],minLength:Object(C["minLength"])(6),userNameFormat:function(e){var t=new RegExp(/[0-9]{2}/);return t.test(e)},isUnique:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t){e.next=2;break}return e.abrupt("return",!0);case 2:return e.next=4,L.isUserNameUnique(t);case 4:return r=e.sent,n=r.data,e.abrupt("return",n.unique);case 7:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},password:{required:C["required"],minLength:Object(C["minLength"])(8),password:function(e){if(""===e)return!0;var t=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20})/g;return t.test(e)}}},methods:A({},Object(m["b"])(["signup"]),{handleSignup:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$v.$touch();case 2:this.$v.$error||(t={firstName:this.firstName,lastName:this.lastName,username:this.username,email:this.email,password:this.password},this.signup(t));case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleInput:function(e,t){this[e]=t,this.$v[e].$touch()}}),computed:A({},Object(m["c"])(["firstServerError"]))},D=U,T=(r("2001"),Object(o["a"])(D,g,v,!1,null,"0d1346a6",null)),N=T.exports,R={components:{SignupForm:N}},F=R,I=(r("650a"),Object(o["a"])(F,h,b,!1,null,null,null)),M=I.exports;function W(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?W(Object(r),!0).forEach((function(t){Object(f["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):W(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var J={name:"home",components:{LandingPageContent:M},computed:B({},Object(m["d"])(["allwd"]))},z=J,Z=(r("d8f4"),Object(o["a"])(z,p,d,!1,null,"043a79c2",null)),V=Z.exports,K={hasSeenAnimation:!1,allwd:!1,serverErrors:[]},G=r("5935"),H={UPDATE_ALLWD:function(e,t){e.allwd=t},UPDATE_SERVER_ERR:function(e,t){e.serverErrors=t},updateField:G["b"]},Q={signup:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(t,r){var a,s,o,i,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,e.prev=1,e.next=4,L.createUser(r);case 4:s=e.sent,o=s.data.user,n["a"].$cookies.set("ssTok",o.token),a("UPDATE_ALLWD",o.authenticated),te.push("/dashboard"),e.next=17;break;case 11:for(u in e.prev=11,e.t0=e["catch"](1),i=e.t0.response.data,c=[],i)c.push(i[u].message);a("UPDATE_SERVER_ERR",c);case 17:case"end":return e.stop()}}),e,null,[[1,11]])})));function t(t,r){return e.apply(this,arguments)}return t}(),logUserIn:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(t,r){var a,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,e.prev=1,e.next=4,L.logUserIn(r);case 4:s=e.sent,o=s.data.user,n["a"].$cookies.set("ssTok",o.token),a("UPDATE_ALLWD",o.authenticated),te.push("/dashboard"),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),te.push("/");case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));function t(t,r){return e.apply(this,arguments)}return t}(),logout:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(t){var r,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.prev=1,e.next=4,L.logUserOut();case 4:a=e.sent,s=a.data.user,n["a"].$cookies.set("ssTok",s.token),r("UPDATE_ALLWD",s.authenticated),te.push("/"),e.next=16;break;case 11:e.prev=11,e.t0=e["catch"](1),n["a"].$cookies.set("ssTok",null),r("UPDATE_ALLWD",!1),te.push("/");case 16:case"end":return e.stop()}}),e,null,[[1,11]])})));function t(t){return e.apply(this,arguments)}return t}()},X={firstServerError:function(e){return e.serverErrors[0]},getField:G["a"]};n["a"].use(m["a"]);var Y=new m["a"].Store({state:K,getters:X,actions:Q,mutations:H});n["a"].use(l["a"]);var ee=new l["a"]({mode:"history",base:"",scrollBehavior:function(e){if(!e.hash)return window.scrollTo({top:0,behavior:"smooth"});var t=document.querySelector(e.hash);return t?window.scrollTo({top:t.offsetTop,behavior:"smooth"}):void 0},routes:[{path:"/",name:"home",component:V},{path:"/login",name:"login",component:function(){return r.e("login").then(r.bind(null,"a55b"))}},{path:"/dashboard",name:"dashboard",component:function(){return r.e("dashboard").then(r.bind(null,"7277"))}},{path:"*",redirect:"/"}]});ee.beforeEach((function(e,t,r){if("/"===e.path)r();else if(n["a"].prototype.$sweepAccessAllowed&&Y.state.allwd){if("/login"===e.path)return r("/dashboard");r()}else"/login"===e.path?r():r("/")}));var te=ee,re=r("9483");Object(re["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ne=r("ecee"),ae=r("c074"),se=r("ad3d");ne["c"].add(ae["b"]),ne["c"].add(ae["a"]),n["a"].component("font-awesome-icon",se["a"]);var oe=r("1dce"),ie=r.n(oe),ce=(r("4917"),r("d225")),ue=r("b0b4"),le=function(){function e(){Object(ce["a"])(this,e)}return Object(ue["a"])(e,null,[{key:"enableFeatureFlags",value:function(){var e=n["a"].$cookies.keys(),t=new RegExp(/sweep/);e.forEach((function(e){var r=e.match(t);r&&(n["a"].prototype["$".concat(e)]=!0)}))}}]),e}(),pe=r("2b27"),de=r.n(pe);n["a"].use(de.a),n["a"].use(ie.a);var fe="sweepsteaks.co.uk";n["a"].$cookies.config(21600,null,fe,!0),le.enableFeatureFlags(),n["a"].config.productionTip=!1;var me=new n["a"]({router:te,store:Y,render:function(e){return e(u)}});me.$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("e332"),a=r.n(n);a.a},"650a":function(e,t,r){"use strict";var n=r("fab8"),a=r.n(n);a.a},"75e4":function(e,t,r){},c098:function(e,t,r){e.exports=r.p+"img/meat.82a3c7cd.svg"},c792:function(e,t,r){e.exports=r.p+"img/broom.6fd4c1b2.svg"},d045:function(e,t,r){},d28c:function(e,t,r){"use strict";var n=r("d045"),a=r.n(n);a.a},d8f4:function(e,t,r){"use strict";var n=r("25b8"),a=r.n(n);a.a},e332:function(e,t,r){},fab8:function(e,t,r){}});
//# sourceMappingURL=app.5ed51a94.js.map