(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["scan"],{"3ebd":function(t,e,n){"use strict";n("de2d")},"4d17":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"dialog-scan white"},[s("div",{staticClass:"scan-area"},[t.$store.state.user?s("div",{staticClass:"fill-height pb-16",staticStyle:{"overflow-y":"auto"}},[t.Aurhenticated||"user"!==t.$store.state.user.role?"user"===t.$store.state.user.role?s("v-card",{staticClass:"d-flex f-width flex-column align-center justify-center px-8 pt-8 pb-4 bg-main",attrs:{flat:""}},[s("div",{staticClass:"font-weight-bold pt-4 pb-1 text-h5",staticStyle:{"font-size":"1.2rem"}},[t._v(" "+t._s(t.$store.state.user.name)+" ")]),s("div",{staticClass:"text-center grey--text text--darken-1 text-truncate",staticStyle:{"font-size":"1.2rem"}},[t._v(" "+t._s(t.$store.state.user.email.toLowerCase())),s("br"),t._v(" "+t._s(t.$store.state.user.phone.toLowerCase())+" ")]),s("div",{staticClass:"d-flex fill-width align-center justify-center mt-2 mb-2 p-relative",staticStyle:{height:"275px"}},[s("canvas",{attrs:{id:"canvas"}}),t.PoinQuantity<1?s("span",{staticClass:"text-center d-flex align-center justify-center px-16 text-h5",staticStyle:{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",background:"rgba(255, 255, 255, .97)"}},[t._v(" Please set point quantity ")]):t._e()]),s("div",{staticClass:"d-flex fill-width align-center justify-center text-h5 font-weight-bold pt-2"},[s("img",{staticClass:"d-flex mr-2",staticStyle:{height:"26px"},attrs:{src:"/logo-h-bake.png"}}),t._v(" Poin : "+t._s(parseInt(t.$store.state.user.poin))+" ")]),s("div",{staticClass:"d-flex flex-column fill-width justify-center align-center py-8 px-16"},[s("div",{staticClass:"mb-2"},[t._v(" Gunakan : ")]),s("v-text-field",{staticClass:"accent d-flex justify-center text-h6 rounded-pill centered-input",attrs:{suffix:"Poin",solo:"","hide-details":"",color:"primary"},on:{keypress:t.$NumberOnly,keyup:function(e){parseInt(t.PoinQuantity)?t.PoinQuantity=parseInt(t.PoinQuantity):t.PoinQuantity=0,t.InitMyQr()}},model:{value:t.PoinQuantity,callback:function(e){t.PoinQuantity=e},expression:"PoinQuantity"}})],1)]):s("v-card",{staticClass:"fill-height d-flex align-center justify-center transparent scanner-frame",attrs:{flat:""}},[s("div",{staticClass:"transparent bg-cover d-flex fill-width fill-height",style:{backgroundImage:"url("+n("8919")+")"}})]):s("div",{staticClass:"pt-16 d-flex f-width flex-column align-center justify-center px-8 pt-8 pb-4 bg-main"},[s("v-text-field",{staticClass:"mb-4 accent d-flex justify-center text-h6 rounded-lg",attrs:{label:"Password",type:"password","hide-details":"",outlined:"",color:"primary"},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.Aurhenticate()}},model:{value:t.AurhenticatedPassword,callback:function(e){t.AurhenticatedPassword=e},expression:"AurhenticatedPassword"}}),s("v-btn",{staticClass:"rounded-pill text-capitalize",attrs:{disabled:t.AurhenticatedLoading,color:"primary",dark:""},on:{click:function(e){return e.preventDefault(),t.Aurhenticate()}}},[t._v(" Show Qr Code ")])],1)],1):t._e(),s("div",{staticStyle:{position:"fixed",bottom:"40px",left:"0px",width:"100%","text-align":"center"}},[s("v-chip",{staticClass:"px-6",attrs:{color:"red",dark:""},on:{click:function(e){return e.preventDefault(),t.$router.go(-1)}}},[t._v(" Close ")])],1)])])},a=[],r=n("1da1"),i=(n("96cf"),n("ac1f"),n("5319"),null),o={props:{show:{type:Boolean,default:!1}},data:function(t){return{Aurhenticated:!1,AurhenticatedLoading:!1,AurhenticatedPassword:"",PoinQuantity:0}},watch:{$route:{immediate:!0,handler:function(t,e){this.PoinQuantity=0,t&&"#show-scan"===t.hash&&"mitra"===this.$store.state.user.role&&this.$BarcodeScanner().prepare(),e&&"#show-scan"===e.hash&&(this.tab=0,this.stopScan())}},show:function(t){this.Aurhenticated=!1,this.AurhenticatedLoading=!1,this.AurhenticatedPassword="",t?this.$store.state.user&&("mitra"===this.$store.state.user.role?this.startScan():this.stopScan()):this.stopScan()}},methods:{Aurhenticate:function(){var t=this;if(this.AurhenticatedLoading=!0,!this.AurhenticatedPassword)return this.$store.commit("SNACKBAR",{show:!0,text:"Please input password!"}),!1;this.$store.dispatch("PASSWORD_AUTH",{pwd:this.AurhenticatedPassword}).then((function(e){e?e.status?e.data.data?(t.InitMyQr(),t.Aurhenticated=!0):t.$store.commit("SNACKBAR",{show:!0,text:"Ops, invalid password!"}):t.$store.commit("SNACKBAR",{show:!0,text:"Ops, something went wrong!"}):t.$store.commit("SNACKBAR",{show:!0,text:"Something went wrong!"}),t.AurhenticatedLoading=!1}))},InitMyQr:function(){var t=this;parseInt(this.PoinQuantity)>parseInt(this.$store.state.user.poin)&&(this.PoinQuantity=parseInt(this.$store.state.user.poin)||0),parseInt(this.PoinQuantity)||(this.PoinQuantity=0),this.PoinQuantity&&(i&&clearInterval(i),i=setInterval((function(){t.CheckPointUpdate()}),2e3)),setTimeout((function(){var e=t.$QrCodeWithLogo({canvas:document.getElementById("canvas"),content:t.$store.state.user.id+":"+t.PoinQuantity,width:275,image:document.getElementById("image"),nodeQrCodeOptions:{color:{dark:"#000"}},logo:{src:"/icon.png",logoRadius:20,logoSize:.15,borderColor:"#fff"}});e.toCanvas().then((function(){}))}),300)},CheckPointUpdate:function(){var t=this;this.$store.dispatch("CHECK_POIN").then((function(e){if(e.status){var n=parseInt(e.data.data)||-1;if(-1!==n&&n!==parseInt(t.$store.state.user.poin)){var s=parseInt(t.$store.state.user.poin)-n;t.$store.commit("SNACKBAR",{show:!0,text:s+" points successfully used!"}),t.$router.go(-1)}}}))},startScan:function(){var t=this;this.didUserGrantPermission().then((function(e){e?t.startScanOpen():t.tab=0}))},startScanOpen:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$BarcodeScanner().hideBackground(),document.body.classList.add("qr-scanner-show"),e.next=4,t.$BarcodeScanner().startScan({targetedFormats:["QR_CODE"]});case 4:n=e.sent,n.hasContent&&t.$router.replace("#indobake:"+n.content);case 6:case"end":return e.stop()}}),e)})))()},stopScan:function(){i&&clearInterval(i),this.$store.dispatch("ME");var t=this.$BarcodeScanner();t&&(t.showBackground(),t.stopScan()),document.body.classList.remove("qr-scanner-show")},didUserGrantPermission:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$BarcodeScanner().checkPermission({force:!1});case 2:if(n=e.sent,!n.granted){e.next=5;break}return e.abrupt("return",!0);case 5:if(!n.denied){e.next=10;break}return e.next=8,t.$Confirm("Need camera permission!","Camera permission denied, enable it in the App Settings ?",{ok:"Open",cancel:"Deny"});case 8:s=e.sent,s&&t.$BarcodeScanner().openAppSettings();case 10:if(n.asked,n.neverAsked,!n.restricted&&!n.unknown){e.next=14;break}return e.abrupt("return",!1);case 14:return e.next=16,t.$BarcodeScanner().checkPermission({force:!0});case 16:if(a=e.sent,a.asked,!a.granted){e.next=20;break}return e.abrupt("return",!0);case 20:return e.abrupt("return",!1);case 21:case"end":return e.stop()}}),e)})))()}}},c=o,u=(n("3ebd"),n("2877")),d=Object(u["a"])(c,s,a,!1,null,null,null);e["default"]=d.exports},8919:function(t,e,n){t.exports=n.p+"img/qr-scanner.29221226.png"},de2d:function(t,e,n){}}]);
//# sourceMappingURL=scan.0004f3e6.js.map