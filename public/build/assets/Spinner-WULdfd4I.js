import{a6 as p,e as l,f as n,g as t,h as e,m as a,t as c,l as r,k as d}from"./app-CuhK3jij.js";/*! 2FAuth version 5.4.2 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */const _={key:0},m={key:0,class:"spinner-container"},y={class:"spinner-wrapper"},u={id:"icnSpinnerFull",class:"is-size-1 spinner"},f={key:1,class:"spinner-overlay-container"},h={class:"spinner-wrapper"},v={id:"icnSpinnerFull",class:"is-size-1 spinner"},g={key:3,class:"has-text-centered mt-6"},k={id:"icnSpinner",class:"is-size-4"},S={__name:"Spinner",props:{isVisible:Boolean,type:{type:String,default:"inline"},message:{type:String,default:"commons.generating_otp"}},setup(s){return(o,w)=>{const i=l("FontAwesomeIcon");return s.isVisible?(n(),t("div",_,[s.type=="fullscreen"?(n(),t("div",m,[e("div",y,[e("span",u,[a(i,{icon:["fas","spinner"],spin:""})]),e("span",null,c(o.$t(s.message)),1)])])):r("",!0),s.type=="fullscreen-overlay"?(n(),t("div",f,[e("div",h,[e("span",v,[a(i,{icon:["fas","spinner"],spin:""})]),e("span",null,c(o.$t(s.message)),1)])])):s.type=="raw"?(n(),d(i,{key:2,icon:["fas","spinner"],spin:""})):(n(),t("div",g,[e("span",k,[a(i,{icon:["fas","spinner"],spin:""})])]))])):r("",!0)}}},V=p(S,[["__scopeId","data-v-56b21d53"]]);export{V as S};
