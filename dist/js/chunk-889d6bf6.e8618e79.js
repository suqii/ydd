(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-889d6bf6"],{"2eb4":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"peisonal"},[s("div",{staticClass:"header"},[s("div",{staticClass:"userHead"},[s("img",{attrs:{src:t.$store.state.user.userHead,alt:""}})]),s("input",{staticClass:"upload",attrs:{type:"file",name:"file",value:"上传头像"},on:{change:t.handleToUpload}}),s("div",{staticClass:"userInf"},[s("div",{staticClass:"userName"},[t._v(t._s(t.$store.state.user.name))]),s("div",{staticClass:"userTag"},[s("div",{staticClass:"identity"},[s("i",{staticClass:"iconfont"},[t._v("")]),t.$store.state.user.isAdmin?s("p",[t._v("管理员")]):s("p",[t._v("普通用户")])])])])]),t._m(0),s("div",{staticClass:"func"},[t.$store.state.user.isAdmin?s("a",{staticClass:"neumorphism ht",attrs:{href:"/admin",target:"_blank"}},[t._m(1),t._m(2)]):t._e(),t._m(3),t._m(4),t._m(5),t._m(6),s("div",{staticClass:"logout",on:{touchstart:t.handleToLogout}},[t._v("\n      退出登录\n    ")])])])},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"order"},[s("div",{staticClass:"orderTitle"},[s("div",{staticClass:"titleName"},[t._v("我的订单")]),s("div",{staticClass:"allOrder"},[t._v("全部订单>")])]),s("div",{staticClass:"orderItem"},[s("div",{staticClass:"itemList"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("p",[t._v("待付款")])]),s("div",{staticClass:"itemList"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("p",[t._v("待审核")])]),s("div",{staticClass:"itemList"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("p",[t._v("未完成")])]),s("div",{staticClass:"itemList"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("p",[t._v("已完成")])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"left"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("div",{staticClass:"text"},[t._v("后台管理")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"moreBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"neumorphism"},[s("div",{staticClass:"left"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("div",{staticClass:"text"},[t._v("账户")])]),s("div",{staticClass:"moreBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"neumorphism"},[s("div",{staticClass:"left"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("div",{staticClass:"text"},[t._v("我的收藏")])]),s("div",{staticClass:"moreBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"neumorphism"},[s("div",{staticClass:"left"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("div",{staticClass:"text"},[t._v("帮助")])]),s("div",{staticClass:"moreBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"neumorphism"},[s("div",{staticClass:"left"},[s("div",{staticClass:"quareBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])]),s("div",{staticClass:"text"},[t._v("设置")])]),s("div",{staticClass:"moreBtn"},[s("i",{staticClass:"iconfont"},[t._v("")])])])}],n=(s("a450"),s("f753")),c=s.n(n),l=s("7826"),o={name:"center",methods:{handleToLogout:function(){var t=this;this.axios.get("/api/users/logout").then((function(a){var s=a.data.status;0===s&&(localStorage.removeItem("name"),localStorage.removeItem("isAdmin"),localStorage.removeItem("email"),t.$store.commit("user/USER_NAME",{name:"",isAdmin:!1,userHead:""}),t.$router.push("/mine/login"))}))},handleToUpload:function(t){var a=this;console.log("点击了修改头像");var s=t.target.files[0],e=new FormData;e.append("file",s,s.name);var i={headers:{"Content-Type":"multipart/form-data"}};this.axios.post("/api/users/uploadUserHead",e,i).then((function(t){var s=t.data.status,e=a;0===s?Object(l["a"])({title:"信息",content:"上传头像成功",ok:"确定",handleOk:function(){e.$store.commit("user/USER_NAME",{name:e.$store.state.user.name,isAdmin:e.$store.state.user.isAdmin,userHead:t.data.data.userHead+"?"+Math.random()})}}):Object(l["a"])({title:"信息",content:"上传头像失败",ok:"确定"})}))}},beforeRouteEnter:function(t,a,s){c.a.get("/api/users/getUser").then((function(t){var a=t.data.status;console.log(t.data),s(0===a?function(a){localStorage.setItem("name",t.data.data.username),localStorage.setItem("isAdmin",t.data.data.isAdmin),localStorage.setItem("email",t.data.data.email),a.$store.commit("user/USER_NAME",{name:t.data.data.username,isAdmin:t.data.data.isAdmin,userHead:t.data.data.userHead})}:"/mine/login")}))}},r=o,d=(s("30bb"),s("cba8")),u=Object(d["a"])(r,e,i,!1,null,"087fa316",null);a["default"]=u.exports},"30bb":function(t,a,s){"use strict";s("5f1b")},"5f1b":function(t,a,s){},7826:function(t,a,s){"use strict";s.d(a,"a",(function(){return u}));var e=s("430a"),i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"messageBox"},[s("h2",[t._v(t._s(t.title))]),s("p",[t._v(t._s(t.content))]),s("div",{staticClass:"buttons"},[t.cancel?s("div",{staticClass:"button",on:{click:t.handleCancel}},[t._v(t._s(t.cancel))]):t._e(),t.ok?s("div",{staticClass:"button button-primary",on:{click:t.handleOk}},[t._v(t._s(t.ok))]):t._e()])])},n=[],c={name:"MessageBox"},l=c,o=(s("b927"),s("cba8")),r=Object(o["a"])(l,i,n,!1,null,"7dc1a154",null),d=r.exports,u=function(){return function(t){var a={title:"",content:"",cancel:"",ok:"",handleCancel:null,handleOk:null},s=e["default"].extend(d);for(var i in t)a[i]=t[i];var n=new s({el:document.createElement("div"),data:{title:a.title,content:a.content,cancel:a.cancel,ok:a.ok},methods:{handleCancel:function(){a.handleCancel&&a.handleCancel.call(this),document.body.removeChild(n.$el)},handleOk:function(){a.handleOk&&a.handleOk.call(this),document.body.removeChild(n.$el)}}});document.body.appendChild(n.$el)}}()},b927:function(t,a,s){"use strict";s("e5b9")},e5b9:function(t,a,s){}}]);
//# sourceMappingURL=chunk-889d6bf6.e8618e79.js.map