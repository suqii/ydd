(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d99f6ea"],{3441:function(t,i,n){"use strict";var o=n("e99b"),s=n("3250"),e=n("8078"),r=n("0926"),c=[].sort,a=[1,2,3];o(o.P+o.F*(r((function(){a.sort(void 0)}))||!r((function(){a.sort(null)}))||!n("95b6")(c)),"Array",{sort:function(t){return void 0===t?c.call(e(this)):c.call(e(this),s(t))}})},"78a5":function(t,i,n){"use strict";n.r(i);var o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"city_body"},[n("div",{staticClass:"city_list"},[t.isLoading?n("Loading"):n("Scroller",{ref:"city_List"},[n("div",[n("div",{staticClass:"city_hot"},[n("h2",[t._v("热门城市")]),n("ul",{staticClass:"clearfix"},t._l(t.hotList,(function(i){return n("li",{key:i.id,on:{tap:function(n){return t.handleToCity(i.nm,i.id)}}},[t._v(t._s(i.nm))])})),0)]),n("div",{ref:"city_sort",staticClass:"city_sort"},t._l(t.cityList,(function(i){return n("div",{key:i.index},[n("h2",[t._v(t._s(i.index))]),n("ul",t._l(i.list,(function(i){return n("li",{key:i.id,on:{tap:function(n){return t.handleToCity(i.nm,i.id)}}},[t._v(t._s(i.nm))])})),0)])})),0)])])],1),n("div",{staticClass:"city_index"},[n("ul",t._l(t.cityList,(function(i,o){return n("li",{key:i.index,on:{touchstart:function(i){return t.handleToIndex(o)}}},[t._v(t._s(i.index))])})),0)])])},s=[],e=(n("3441"),{name:"City",data:function(){return{cityList:[],hotList:[],isLoading:!0}},mounted:function(){var t=this,i=window.localStorage.getItem("cityList"),n=window.localStorage.getItem("hotList");i&&n?(this.cityList=JSON.parse(i),this.hotList=JSON.parse(n),this.isLoading=!1):this.axios.get("/api/city").then((function(i){var n=i.data.msg;if("ok"===n){t.isLoading=!1;var o=i.data.data.cities,s=t.formatCityList(o),e=s.cityList,r=s.hotList;t.cityList=e,t.hotList=r,window.localStorage.setItem("cityList",JSON.stringify(e)),window.localStorage.setItem("hotList",JSON.stringify(r))}}))},methods:{formatCityList:function(t){for(var i=[],n=[],o=0;o<t.length;o++)1===t[o].isHot&&(n.push(t[o]),console.log("热门城市"));for(o=0;o<t.length;o++){var s=t[o].py.substring(0,1).toUpperCase();if(r(s))i.push({index:s,list:[{nm:t[o].nm,id:t[o].id}]});else for(var e=0;e<i.length;e++)i[e].index===s&&i[e].list.push({nm:t[o].nm,id:t[o].id})}function r(t){for(var n=0;n<i.length;n++)if(i[n].index===t)return!1;return!0}return i.sort((function(t,i){return t.index>i.index?1:t.index<i.index?-1:0})),console.log(n),{cityList:i,hotList:n}},handleToIndex:function(t){var i=this.$refs.city_sort.getElementsByTagName("h2");this.$refs.city_List.toScrollTop(-i[t].offsetTop)},handleToCity:function(t,i){this.$store.commit("city/CITY_INFO",{nm:t,id:i}),window.localStorage.setItem("nowNm",t),window.localStorage.setItem("nowId",i),this.$router.push("/movie/nowPlaying")}}}),r=e,c=(n("91c4"),n("cba8")),a=Object(c["a"])(r,o,s,!1,null,"167597a2",null);i["default"]=a.exports},"8f58":function(t,i,n){},"91c4":function(t,i,n){"use strict";n("8f58")},"95b6":function(t,i,n){"use strict";var o=n("0926");t.exports=function(t,i){return!!t&&o((function(){i?t.call(null,(function(){}),1):t.call(null)}))}}}]);
//# sourceMappingURL=chunk-1d99f6ea.b6f7a6b0.js.map