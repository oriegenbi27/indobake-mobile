(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["submission"],{"1f7e":function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"pa-4"},[i("div",{staticClass:"d-flex fill-width align-center d-flex align-center pb-1"},[i("div",{staticClass:"d-flex align-center text-h6 black--text"},[i("v-icon",{staticClass:"mr-2"},[t._v(" mdi-clipboard-text-outline ")]),t._v(" Installment ")],1)]),t.data.length?t._e():i("v-card",{staticClass:"pa-4 my-2 text-center",attrs:{flat:""}},[t._v(" No data ")]),t._l(t.data,(function(a,e){return i("v-card",{key:"cicilan-"+e,staticClass:"pa-4 my-2 elevation-1"},[i("div",{staticClass:"d-flex justify-space-between align-center fill-width pb-1"},[i("div",{staticClass:"grey--text text--darken-2"},[t._v(" "+t._s(t.$localDT(a.created,"display"))+" ")]),i("div",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.$price(t.GetCicilanProducts(a.products).total))+" ")])]),i("div",{staticClass:"d-flex justify-space-between align-center fill-width mb-2"},[i("div",{staticClass:"grey--text text--darken-2"},[t._v(" #"+t._s(t.GenID(a.id))+" ")]),i("div",{staticClass:"caption"},[t._v(" "+t._s(0===parseInt(a.status)?"Pending":1===parseInt(a.status)?"Processed":2===parseInt(a.status)?"Completed":"Declined")+" ")])]),i("v-divider",{staticClass:"my-2"}),i("div",{staticClass:"subtitle-2 mb-2"},[t._v(" Installment Products : "),i("div",{staticClass:"pt-2",staticStyle:{"line-height":"100%"}},t._l(t.GetCicilanProducts(a.products).products,(function(e,s){return i("v-chip",{key:"cicilan-"+s+"-"+a.id,staticClass:"mr-2 my-0 my-1",attrs:{small:""}},[t._v(" "+t._s(e.name)+" ")])})),1),a.notes?i("div",{staticClass:"d-flex fill-width align-center pt-2"},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v(" mdi-comment-alert-outline ")]),t._v(" "+t._s(a.notes||"-")+" ")],1):t._e()])],1)})),i("div",[i("div",{staticClass:"d-flex fill-width align-center justify-center",staticStyle:{position:"fixed",bottom:"72px",left:"0px"}},[i("v-btn",{staticClass:"text-capitalize rounded-lg",attrs:{color:"orange",dark:""},on:{click:function(a){return a.preventDefault(),t.CICILAN_SHOW()}}},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v(" mdi-account-cash-outline ")]),t._v(" Installment ")],1)],1),i("v-dialog",{attrs:{persistent:"",scrollable:"","max-width":"320"},model:{value:t.dialogCicilan.show,callback:function(a){t.$set(t.dialogCicilan,"show",a)},expression:"dialogCicilan.show"}},[t.dialogCicilan.data?i("v-card",[i("v-card-title",{staticClass:"d-flex fill-width text-h6 align-center justify-space-between"},[t._v(" Installment Request "),i("v-icon",{on:{click:function(a){a.preventDefault(),t.dialogCicilan.show=!1}}},[t._v(" mdi-close ")])],1),i("v-divider"),i("v-card-text",{staticClass:"pt-4 pb-4",staticStyle:{"max-height":"420px"}},[i("div",{staticClass:"d-flex fill-width align-center flex-column justify-center body-2 mb-4 grey--text text--darken-1"},[i("img",{staticClass:"mt-3 mb-5",staticStyle:{height:"40px"},attrs:{src:"/adira.png"}}),i("div",{staticClass:"font-weight-bold mb-1 fill-width subtitle-2 black--text"},[t._v(" Pengajuan installment bersama Adira ")]),i("div",{staticClass:"mb-1 fill-width body-2"},[t._v(" Indobake bekerjasama dengan Adira agar dapat memudahkan teman-teman dalam mengajukan kredit. ")]),i("div",{staticClass:"mb-1 fill-width body-2"},[t._v(" Harap mengisi data diri dengan benar agar dapat mempercepat proses pengajuan installment. ")]),i("div",{staticClass:"mb-1 fill-width body-2"},[t._v(" Setelah pengiriman data, pihak Adira akan menghubungi anda untuk pelaksanaan konfirmasi data. ")])]),i("v-text-field",{staticClass:"mb-4",attrs:{label:"Full Name",color:"primary","hide-details":"",dense:"",outlined:""},model:{value:t.dialogCicilan.data.customer_name,callback:function(a){t.$set(t.dialogCicilan.data,"customer_name",a)},expression:"dialogCicilan.data.customer_name"}}),i("v-text-field",{staticClass:"mb-4",attrs:{label:"No. KTP",color:"primary","hide-details":"",dense:"",outlined:""},on:{keypress:t.$NumberOnly},model:{value:t.dialogCicilan.data.customer_nik,callback:function(a){t.$set(t.dialogCicilan.data,"customer_nik",a)},expression:"dialogCicilan.data.customer_nik"}}),i("v-textarea",{staticClass:"rounded-lg accent",attrs:{label:"Full Address",color:"primary",rows:"2",outlined:"",dense:"","hide-details":""},model:{value:t.dialogCicilan.data.customer_address,callback:function(a){t.$set(t.dialogCicilan.data,"customer_address",a)},expression:"dialogCicilan.data.customer_address"}}),i("div",{staticClass:"d-flex fill-width justify-space-between py-4"},[i("v-btn",{attrs:{color:t.dialogCicilan.data.customer_ktp?"green":"primary",outlined:"",small:"",dark:"",depressed:""},on:{click:function(a){return a.preventDefault(),t.TakePicture("customer_ktp")}}},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v(" "+t._s(t.dialogCicilan.data.customer_ktp?"mdi-check-circle":"mdi-card-account-details")+" ")]),t._v(" KTP ")],1),i("v-btn",{staticClass:"text-capitalize",attrs:{color:t.dialogCicilan.data.customer_ktp_selfie?"green":"primary",outlined:"",small:"",dark:""},on:{click:function(a){return a.preventDefault(),t.TakePicture("customer_ktp_selfie")}}},[i("v-icon",{staticClass:"mr-2",attrs:{small:"",depressed:""}},[t._v(" "+t._s(t.dialogCicilan.data.customer_ktp_selfie?"mdi-check-circle":"mdi-camera-account")+" ")]),t._v(" Selfie + KTP ")],1)],1),i("v-divider"),i("div",{staticClass:"pt-4"},[i("v-autocomplete",{staticClass:"rounded-lg accent",attrs:{items:t.dataProductCicilan,"item-text":"name",dense:"",label:"Select Product",outlined:"","hide-details":"","return-object":""},model:{value:t.dialogCicilan.productActive,callback:function(a){t.$set(t.dialogCicilan,"productActive",a)},expression:"dialogCicilan.productActive"}}),i("v-divider"),i("div",{staticClass:"d-flex flex-column fill-width py-2 px-0"},[i("div",{staticClass:"font-weight-bold d-flex align-center pt-2"},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v(" mdi-view-list ")]),t._v(" Installment Products ")],1),t.dialogCicilan.data.products.length?t._e():i("div",{staticClass:"px-4 py-2 text-center red--text caption"},[t._v(" no product selected ")]),t._l(t.dialogCicilan.data.products,(function(a,e){return i("v-card",{key:"product-cicilan-"+e,staticClass:"px-4 py-2 my-2 elevation-1 p-relative"},[t._v(" "+t._s(a.name)+" "),i("div",{staticClass:"d-flex fill-width align-center justify-space-between caption font-weight-bold"},[t._v(" "+t._s(t.$price(a.price))+" "),i("v-icon",{attrs:{color:"red"},on:{click:function(a){return a.preventDefault(),t.dialogCicilan.data.products.splice(e,1)}}},[t._v(" mdi-close ")])],1)])})),i("v-divider",{staticClass:"mt-2 mb-3"}),i("div",{staticClass:"pa-4 accent text-center font-weight-bold black--text elevation-1"},[t._v(" "+t._s(t.$price(t.dataProductCicilanTotal))+" ")])],2),i("v-divider",{staticClass:"mt-2"})],1),i("div",{staticClass:"d-flex align-start fill-width py-2 px-2 orange--text text--darken-2"},[i("v-checkbox",{attrs:{"hide-details":""},scopedSlots:t._u([{key:"label",fn:function(){return[i("div",[t._v(" Saya dengan ini menyetujui "),i("span",{on:{click:function(t){t.stopPropagation()}}},[i("span",{staticClass:"primary--text",on:{click:function(a){a.preventDefault(),t.dialogCicilan.terms=!0}}},[t._v("syarat dan ketentuan")])]),t._v(" yang berlaku. ")])]},proxy:!0}],null,!1,3901562785),model:{value:t.dialogCicilan.agree,callback:function(a){t.$set(t.dialogCicilan,"agree",a)},expression:"dialogCicilan.agree"}})],1)],1),i("v-divider"),i("v-card-actions",{staticClass:"py-4"},[i("v-spacer"),i("v-btn",{staticClass:"text-capitalize rounded-lg px-4",attrs:{color:"primary lighten-1",depressed:""},on:{click:function(a){return t.CICILAN_PROCESS()}}},[t._v(" Apply Now ")]),i("v-spacer")],1),t.$store.state.setting?i("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.dialogCicilan.terms,callback:function(a){t.$set(t.dialogCicilan,"terms",a)},expression:"dialogCicilan.terms"}},[i("v-card",{staticClass:"rounded-0"},[i("v-toolbar",{attrs:{dark:"",color:"primary"}},[i("v-toolbar-title",[t._v("Syarat dan Ketentuan")]),i("v-spacer"),i("v-toolbar-items",[i("v-btn",{attrs:{dark:"",text:""},on:{click:function(a){t.dialogCicilan.terms=!1}}},[t._v(" Close ")])],1)],1),i("pre",{staticClass:"d-block pa-4",staticStyle:{"font-family":"Arial","word-wrap":"break-word","white-space":"pre-wrap"},domProps:{innerHTML:t._s(t.$store.state.setting.terms_installment||"-")}})],1)],1):t._e()],1):t._e()],1)],1)],2)},s=[],l=i("1da1"),n=(i("96cf"),i("7db0"),i("d3b7"),i("b0c0"),i("4de4"),{name:"Submission",components:{},data:function(){return{data:[],total:0,dialogCicilan:{show:!1,data:null,terms:!1,agree:!0,productActive:null}}},computed:{dataProductCicilan:function(){return this.$store.state.product.data},dataProductCicilanTotal:function(){if(this.dialogCicilan.data){for(var t=this.dialogCicilan.data.products,a=0,i=0;i<t.length;i++)a+=parseInt(t[i].price)||0;return a}return 0}},watch:{"dialogCicilan.productActive":function(t){if(t&&this.dialogCicilan.data){var a=this.dialogCicilan.data.products.find((function(a){return parseInt(a.id)===parseInt(t.id)}));a?this.$store.commit("SNACKBAR",{show:!0,text:"This product already on the list!"}):this.dialogCicilan.data.products.push({id:t.id,name:t.name,images:t.images,price:parseInt(t.price)})}this.dialogCicilan.productActive=null},$route:{immediate:!0,handler:function(t,a){"Submission"===t.name&&this.LoadCicilan()}}},mounted:function(){},methods:{TakePicture:function(t){var a=this;return Object(l["a"])(regeneratorRuntime.mark((function i(){var e;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,a.$Camera().getPhoto({quality:95,width:450,allowEditing:!1,source:a.$CameraSource().Camera,resultType:a.$CameraResultType().DataUrl});case 2:return e=i.sent,i.next=5,a.$store.dispatch("UPLOAD_FILE",{file:e.dataUrl}).then((function(i){i?i.data.data.res?"customer_ktp"===t?a.dialogCicilan.data.customer_ktp=i.data.data.secure_url:"customer_ktp_selfie"===t?a.dialogCicilan.data.customer_ktp_selfie=i.data.data.secure_url:a.$store.commit("SNACKBAR",{show:!0,text:"Invalid origin!"}):a.$store.commit("SNACKBAR",{show:!0,text:"Failed!"}):a.$store.commit("SNACKBAR",{show:!0,text:"Upload failed!"})}));case 5:case"end":return i.stop()}}),i)})))()},GetCicilanProducts:function(t){for(var a=this.$StrToArray(t),i=0,e=0;e<a.length;e++)i+=parseInt(a[e].price)||0;return{products:a,total:i}},GenID:function(t){return parseInt(t)<10?"00000"+t:parseInt(t)<100?"0000"+t:parseInt(t)<1e3?"000"+t:parseInt(t)<1e4?"00"+t:parseInt(t)<1e5?"0"+t:t},LoadCicilan:function(){var t=this;this.$store.dispatch("PENGAJUAN_CICILAN_GET").then((function(a){a.status?(t.data=a.data.data.data||[],t.total=parseInt(a.data.data.total)):t.$store.commit("SNACKBAR",{show:!0,text:"Something went wrong!"})}))},CICILAN_SHOW:function(){var t=this.data.filter((function(t){return 0===parseInt(t.status)||1===parseInt(t.status)}));if(t.length)return this.$store.commit("SNACKBAR",{show:!0,text:"Ops, you still have installments in progress!"}),!1;this.dialogCicilan.productActive=0,this.dialogCicilan.agree=!0,this.dialogCicilan.terms=!1,this.dialogCicilan.data=Object.assign({},{id:null,user:this.$store.state.user.id,product:0,products:[],notes:"",customer_name:"",customer_nik:"",customer_address:"",customer_ktp:"",customer_ktp_selfie:"",status:0}),this.dialogCicilan.show=!0},CICILAN_PROCESS:function(){var t=this;if(!this.dialogCicilan.data)return!1;if(this.dataProductCicilanTotal<=0)return this.$store.commit("SNACKBAR",{show:!0,text:"Ops, no installment product selected!"}),!1;if(!this.dialogCicilan.data.customer_name)return this.$store.commit("SNACKBAR",{show:!0,text:"Please input your name!"}),!1;if(!this.dialogCicilan.data.customer_nik)return this.$store.commit("SNACKBAR",{show:!0,text:"Please input NIK/KTP Number!"}),!1;if(!this.dialogCicilan.data.customer_address)return this.$store.commit("SNACKBAR",{show:!0,text:"Please input Address!"}),!1;if(!this.dialogCicilan.data.customer_ktp)return this.$store.commit("SNACKBAR",{show:!0,text:"Please upload your KTP!"}),!1;if(!this.dialogCicilan.data.customer_ktp_selfie)return this.$store.commit("SNACKBAR",{show:!0,text:"Please upload your Selfie with KTP!"}),!1;if(!this.dialogCicilan.agree)return this.$store.commit("SNACKBAR",{show:!0,text:"Please agree to the installment terms and conditions!"}),!1;var a=Object.assign({},this.dialogCicilan.data);a.products=this.$ArrayToStr(a.products),this.$store.dispatch("PENGAJUAN_CICILAN_PROCESS",a).then((function(a){a.status?(t.dialogCicilan.show=!1,"exist"===a.data.data?t.$store.commit("SNACKBAR",{show:!0,text:"Ops, you still have installments in progress!"}):(t.LoadCicilan(),t.$store.commit("SNACKBAR",{show:!0,text:"Terimakasih, selanjutnya pihak Adira akan menghubungi anda untuk konfirmasi data."}))):t.$store.commit("SNACKBAR",{show:!0,text:"Something went wrong!"})}))}}}),r=n,c=i("2877"),o=Object(c["a"])(r,e,s,!1,null,null,null);a["default"]=o.exports}}]);
//# sourceMappingURL=submission.d24c09f4.js.map