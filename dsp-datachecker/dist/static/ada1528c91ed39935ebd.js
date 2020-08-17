(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{193:function(t,e,r){"use strict";r.r(e),function(t){e.default={mode:"spa",head:{title:t.env.npm_package_name||"",meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:t.env.npm_package_description||""}],link:[{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}]},loading:{color:"#fff"},css:["iview/dist/styles/iview.css"],plugins:["@/plugins/iview"],buildModules:[],modules:["@nuxtjs/axios","@nuxtjs/proxy","cookie-universal-nuxt"],proxy:["https://platform.automizelyapi.com/suppliers","https://product.automizelyapi.com/dropshipping"],build:{publicPath:"/static/",extend:function(t,e){}},constants:{platform_url:"https://platform.automizelyapi.com",product_url:"https://product.automizelyapi.com"}}}.call(this,r(79))},195:function(t,e,r){var content=r(201);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(36).default)("2ea44529",content,!1,{sourceMap:!1})},200:function(t,e,r){"use strict";var n=r(195);r.n(n).a},201:function(t,e,r){(e=r(35)(!1)).push([t.i,".container[data-v-60dbb3f2]{margin:0 auto;min-height:100vh}.title[data-v-60dbb3f2]{font-family:Quicksand,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;display:block;font-weight:300;font-size:30px;color:#35495e;letter-spacing:1px}.subtitle[data-v-60dbb3f2]{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links[data-v-60dbb3f2]{padding-top:15px}.json-card[data-v-60dbb3f2]{height:600px;overflow-y:scroll}",""]),t.exports=e},205:function(t,e,r){"use strict";r.r(e);r(37),r(21),r(38),r(25),r(22),r(23),r(24),r(14),r(39),r(34);var n=r(5),o=r(80),c=r(192),l=r.n(c),d=r(199),m=r.n(d);function _(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var v=r(193),h={components:{Logo:o.a,jsonView:l.a,JsonCSV:m.a},data:function(){return{exportData:[],dropshippingList:[],supplierList:{},vendorList:{},am_api_key:"",reqData:{order_numbers:"",app_key:"automizely-store",app_platform:"shopify",organization_id:"b82f5a20ae024f5f82f2a90e8a54bc35"},orderStatus:"normal",orderStatusMap:[{name:"normal"},{name:"abnormal"}],ordersItemsColumns:[{title:"图片",width:150,align:"center",slot:"image"},{title:"单价",slot:"unit_price",width:"90px"},{title:"数量",key:"quantity",width:"90px"}],ordersColumns:[{title:"订单平台",key:"platform",width:"110px"},{title:"下单金额",key:"price",width:"90px"},{title:"运费",key:"shipping_price",width:"80px"},{title:"下单时间",slot:"date"},{title:"订单id",key:"order_id"},{title:"订单状态",key:"order_status",width:"100px"},{title:"支付状态",key:"financial_status",width:"100px"}],orderList:[],requestEnv:"production",requestEnvMap:{dev:{product_url:"",platform_url:""},release:{product_url:"https://release-incy-platform.automizelyapi.io",platform_url:"https://release-incy-product.automizelyapi.io"},production:{product_url:"https://platform.automizelyapi.com",platform_url:"https://product.automizelyapi.com"}},block_modal:!1,modal_loading:!1,block_order_ids:[]}},created:function(){console.log(v.default.constants.platform_url),console.log(v.default.constants.product_url),this.initApiKey(),this.searchStart()},methods:{initApiKey:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(r=t).am_api_key=r.$cookies.get("am-api-key");case 2:case"end":return e.stop()}}),e)})))()},searchStart:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=t).am_api_key&&r.$cookies.set("am-api-key",r.am_api_key),e.next=4,r.getDropshippingList();case 4:e.sent;case 5:case"end":return e.stop()}}),e)})))()},getDropshippingList:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,l,d,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={app_key:(r=t).reqData.app_key,app_platform:r.reqData.app_platform,organization_id:r.reqData.organization_id,limit:100},r.reqData.order_numbers&&(n.order_numbers=r.reqData.order_numbers),e.next=5,t.$axios.$get(r.requestEnvMap[r.requestEnv].platform_url+"/dropshipping/v1/orders",{params:n,headers:{"am-api-key":r.am_api_key,"am-organization-id":r.reqData.organization_id}});case 5:if((o=e.sent).data.orders){e.next=8;break}return e.abrupt("return","");case 8:c=[],l=_(o.data.orders);try{for(l.s();!(d=l.n()).done;)m=d.value,c.push(r.supplementContent(m))}catch(t){l.e(t)}finally{l.f()}return e.next=13,Promise.all(c).then((function(t){}));case 13:return e.next=15,r.sortData(o.data.orders);case 15:return e.next=17,r.sortExportData(o.data.orders);case 17:case"end":return e.stop()}}),e)})))()},sortExportData:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,l,d,m,f,v,h,y,k,x,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=e,o=[],!(t.length<=0)){r.next=4;break}return r.abrupt("return");case 4:c=_(t),r.prev=5,c.s();case 7:if((l=c.n()).done){r.next=33;break}if(d=l.value,m=!0,d.vendor_orders&&!(d.vendor_orders.length<=0)){r.next=12;break}return r.abrupt("continue",31);case 12:f=_(d.vendor_orders),r.prev=13,f.s();case 15:if((v=f.n()).done){r.next=23;break}if((h=v.value).items&&!(h.items.length<=0)){r.next=19;break}return r.abrupt("continue",21);case 19:y=_(h.items);try{for(y.s();!(k=y.n()).done;)x=k.value,data={"Order ID":m?d.id:" ","Order Number":m?d.order_name:" ","Order Price":m?h.order_total.amount/100:" ","Order Price (cost)":m?h.order_total_cost.amount/100:" ","Shipping Price (cost)":h.shipping_total_cost.amount/100,"Order ID (vendor)":h.external_vendor_order_id,"Item ID (Automizely)":x.id||" ","Item ID (Eprolo)":x.external_vendor_item_id||" ","Item Sku (Automizely)":x.sku||" ","Item Name (Eprolo)":x.title||" ","Item price USD (cost)":x.unit_price_cost.amount/100||" ","Item qty":x.quantity,Status:d.order_status,"Fulfillment Status (dropshipping)":d.fulfillment_status,"Financial Status (vendor)":h.financial_status,"Created Time":d.created_at},m=!1,o.push(data)}catch(t){y.e(t)}finally{y.f()}case 21:r.next=15;break;case 23:r.next=28;break;case 25:r.prev=25,r.t0=r.catch(13),f.e(r.t0);case 28:return r.prev=28,f.f(),r.finish(28);case 31:r.next=7;break;case 33:r.next=38;break;case 35:r.prev=35,r.t1=r.catch(5),c.e(r.t1);case 38:return r.prev=38,c.f(),r.finish(38);case 41:n.exportData=o;case 42:case"end":return r.stop()}}),r,null,[[5,35,38,41],[13,25,28,31]])})))()},sortData:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,l,d,m,f,v,h,y,k;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n=e,o=_(t);try{for(o.s();!(c=o.n()).done;){if(l=c.value,d=[{platform:"dropshipping",price:l.order_total.amount/100,date:l.created_at,order_id:l.id,shipping_price:l.shipping_total.amount/100,order_status:l.order_status,financial_status:l.financial_status}],l.supplier_order&&(m=l.supplier_order,d.push({platform:"Supplier",price:m.order_total.amount/100,date:m.created_at,order_id:m.id,shipping_price:m.shipping_total.amount/100,order_status:m.order_status,financial_status:m.financial_status})),f=0,v=0,l.vendor_orders){h=_(l.vendor_orders);try{for(h.s();!(y=h.n()).done;)k=y.value,d.push({platform:"Vendor",price:k.order_total_cost.amount/100,date:k.created_at,order_id:k.id,shipping_price:k.shipping_total_cost.amount/100,order_status:k.order_status,financial_status:k.financial_status}),f+=k.order_total.amount,v+=k.order_total_cost.amount}catch(t){h.e(t)}finally{h.f()}}d.push({platform:"利润",price:(f-v)/100,date:"",order_id:"",shipping_price:"",order_status:""}),l.buyer="姓名: ".concat(l.shipping_address.first_name," ").concat(l.shipping_address.last_name,"  |  电话：").concat(l.shipping_address.phone.country_code,"-").concat(l.shipping_address.phone.number," | 地址: ").concat(l.shipping_address.address_line_1,", ").concat(l.shipping_address.city,", ").concat(l.shipping_address.state," ").concat(l.shipping_address.postal_code," | email: ").concat(l.shipping_address.email),l.list_content=d}}catch(t){o.e(t)}finally{o.f()}n.dropshippingList=t;case 4:case"end":return r.stop()}}),r)})))()},supplementContent:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,l,d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e,o=t.id,r.next=4,n.getSuppliersList(o);case 4:if(c=r.sent){r.next=7;break}return r.abrupt("return","");case 7:return t.supplier_order=c,l=c.id,r.next=11,n.getVendorList(l);case 11:if(d=r.sent){r.next=14;break}return r.abrupt("return","");case 14:t.vendor_orders=d;case 15:case"end":return r.stop()}}),r)})))()},getSuppliersList:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=e,t){r.next=4;break}return n.supplierList={},r.abrupt("return","");case 4:return r.next=6,e.$axios.$get(n.requestEnvMap[n.requestEnv].product_url+"/suppliers/v1/orders",{params:{business_order_ids:t},headers:{"am-api-key":n.am_api_key,"am-organization-id":n.reqData.organization_id}});case 6:if((o=r.sent).data.orders){r.next=9;break}return r.abrupt("return","");case 9:return r.abrupt("return",o.data.orders[0]);case 10:case"end":return r.stop()}}),r)})))()},getVendorList:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=e,t){r.next=4;break}return n.vendorList={},r.abrupt("return","");case 4:return r.next=6,e.$axios.$get(n.requestEnvMap[n.requestEnv].product_url+"/suppliers/v1/vendors-orders",{params:{supplier_order_id:t},headers:{"am-api-key":n.am_api_key,"am-organization-id":n.reqData.organization_id}});case 6:if((o=r.sent).data.orders){r.next=9;break}return r.abrupt("return",[]);case 9:return r.abrupt("return",o.data.orders);case 10:case"end":return r.stop()}}),r)})))()},showBlockOrderModal:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:(n=e).block_order_ids=[],o=_(t);try{for(o.s();!(c=o.n()).done;)l=c.value,n.block_order_ids.push(l.id)}catch(t){o.e(t)}finally{o.f()}n.block_modal=!0;case 5:case"end":return r.stop()}}),r)})))()},blockOrder:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((r=t).block_order_ids[0]){e.next=4;break}return alert("订单不存在"),e.abrupt("return",!1);case 4:r.modal_loading=!0,n=_(r.block_order_ids),e.prev=6,n.s();case 8:if((o=n.n()).done){e.next=15;break}return c=o.value,e.next=12,t.$axios.$post(r.requestEnvMap[r.requestEnv].product_url+"/suppliers/v1/vendors-orders/"+c+"/block",{status:"blocked",remark:"block order"},{params:{},headers:{"am-api-key":r.am_api_key,"am-organization-id":r.reqData.organization_id}});case 12:e.sent;case 13:e.next=8;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(6),n.e(e.t0);case 20:return e.prev=20,n.f(),e.finish(20);case 23:r.modal_loading=!1,r.block_modal=!1,t.$Message.info("拦截成功");case 26:case"end":return e.stop()}}),e,null,[[6,17,20,23]])})))()}},filters:{formatDate:function(t){if(!t)return"";var e=new Date(t),r=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var o=e.getDate();o=o<10?"0"+o:o;var c=e.getHours();c=c<10?"0"+c:c;var l=e.getMinutes();l=l<10?"0"+l:l;var s=e.getSeconds();return r+"-"+n+"-"+o+" "+c+":"+l+":"+(s=s<10?"0"+s:s)}}},y=(r(200),r(13)),component=Object(y.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[t._m(0),t._v(" "),r("div",[r("Modal",{attrs:{width:"360"},model:{value:t.block_modal,callback:function(e){t.block_modal=e},expression:"block_modal"}},[r("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[r("Icon",{attrs:{type:"ios-information-circle"}}),t._v(" "),r("span",[t._v("拦截订单确认")])],1),t._v(" "),r("div",{staticStyle:{"text-align":"center"}},[r("p",[t._v("是否订单出现了什么异常，需要拦截此订单？")])]),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{attrs:{type:"error",size:"large",long:"",loading:t.modal_loading},on:{click:t.blockOrder}},[t._v("确认拦截")])],1)])],1),t._v(" "),r("div",{staticStyle:{padding:"16px",width:"100% !important",margin:"0 !important"}},[r("Input",{staticStyle:{width:"220px"},attrs:{type:"password",placeholder:"am-api-key"},model:{value:t.am_api_key,callback:function(e){t.am_api_key=e},expression:"am_api_key"}}),t._v(" "),r("Input",{staticStyle:{width:"180px"},attrs:{placeholder:"app_key"},model:{value:t.reqData.app_key,callback:function(e){t.$set(t.reqData,"app_key",e)},expression:"reqData.app_key"}}),t._v(" "),r("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"app platform"},model:{value:t.reqData.app_platform,callback:function(e){t.$set(t.reqData,"app_platform",e)},expression:"reqData.app_platform"}}),t._v(" "),r("Input",{staticStyle:{width:"240px"},attrs:{placeholder:"organization id"},model:{value:t.reqData.organization_id,callback:function(e){t.$set(t.reqData,"organization_id",e)},expression:"reqData.organization_id"}}),t._v(" "),r("Select",{staticStyle:{width:"100px"},model:{value:t.requestEnv,callback:function(e){t.requestEnv=e},expression:"requestEnv"}},t._l(t.requestEnvMap,(function(e,n){return r("Option",{key:n,attrs:{value:n}},[t._v(t._s(n))])})),1),t._v(" "),r("Select",{staticStyle:{width:"100px"},model:{value:t.orderStatus,callback:function(e){t.orderStatus=e},expression:"orderStatus"}},t._l(t.orderStatusMap,(function(e){return r("Option",{key:e.name,attrs:{value:e.name}},[t._v(t._s(e.name))])})),1),t._v(" "),r("div",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[r("Input",{staticStyle:{width:"220px"},attrs:{search:"","enter-button":"",placeholder:"订单Id"},on:{"on-search":t.searchStart},model:{value:t.reqData.order_numbers,callback:function(e){t.$set(t.reqData,"order_numbers",e)},expression:"reqData.order_numbers"}})],1),t._v(" "),r("div",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[r("JsonCSV",{attrs:{data:t.exportData,name:"billing.csv"}},[r("Button",{attrs:{type:"primary"},on:{click:t.exportBilling}},[t._v("账单导出")])],1)],1)],1),t._v(" "),r("div",{staticStyle:{display:"flex"}},[r("div",{staticStyle:{padding:"6px",background:"#fff",width:"94%",margin:"0 auto"}},[r("List",{attrs:{"item-layout":"vertical",border:"true"}},t._l(t.dropshippingList,(function(e){return r("ListItem",{key:e.title},[r("ListItemMeta",{attrs:{avatar:e.avatar,title:e.order_name,description:e.buyer}}),t._v(" "),r("div",{staticStyle:{width:"850px"}},[r("Table",{attrs:{stripe:"",columns:t.ordersColumns,data:e.list_content},scopedSlots:t._u([{key:"date",fn:function(e){var r=e.row;e.index;return[t._v("\n                      "+t._s(t._f("formatDate")(r.date))+"\n                    ")]}}],null,!0)})],1),t._v(" "),r("template",{slot:"action"},[r("li",[r("Button",{attrs:{size:"small",type:"warning"},on:{click:function(r){return t.showBlockOrderModal(e.vendor_orders)}}},[t._v("拦截订单")])],1),t._v(" "),r("li",[r("Button",{attrs:{size:"small",type:"error"}},[t._v("取消订单")])],1)]),t._v(" "),r("template",{slot:"extra"},[r("div",{staticStyle:{"margin-top":"54px"}},[r("h3",[t._v("商品信息")]),t._v(" "),r("Table",{attrs:{stripe:"",columns:t.ordersItemsColumns,data:e.items},scopedSlots:t._u([{key:"image",fn:function(e){var n=e.row;e.index;return t._l(n.image_urls,(function(t){return r("img",{attrs:{src:t,width:"70px"}})}))}},{key:"unit_price",fn:function(e){var r=e.row;e.index;return[t._v("\n                      $"+t._s(r.unit_price.amount/100)+"\n                    ")]}}],null,!0)})],1)])],2)})),1)],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{padding:"16px"}},[e("h1",{staticClass:"title"},[this._v("\n      dsp order manager\n    ")])])}],!1,null,"60dbb3f2",null);e.default=component.exports}}]);