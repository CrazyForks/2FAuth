import{_}from"./AccessLogViewer-ATsuzUAw.js";import{u as f,o as h,r as B,I,e as o,f as g,k,p as u,h as c,t as r,i as v,m as t}from"./app-CuhK3jij.js";import{u as C}from"./bus-BalNs30H.js";import"./SearchBox-Bwo0E13W.js";import"./Spinner-WULdfd4I.js";/*! 2FAuth version 5.4.2 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */const b={class:"title has-text-grey-dark"},y={class:"block is-size-7-mobile"},T={__name:"Access",props:{userId:[Number,String]},setup(i){const l=C();f(),h(async()=>{m()});const e=i,a=B(l.username??"");function m(){I.getById(e.userId,{returnError:!0}).then(s=>{a.value=s.data.info.name})}return(s,S)=>{const n=o("ButtonBackCloseCancel"),d=o("VueFooter"),p=o("ResponsiveWidthWrapper");return g(),k(p,null,{default:u(()=>[c("h1",b,r(s.$t("titles.admin.logs.access")),1),c("div",y,r(s.$t("admin.access_log_legend_for_user",{username:v(a)}))+" (#"+r(e.userId)+") ",1),t(_,{userId:e.userId,lastOnly:!1,showSearch:!0,period:1},null,8,["userId"]),t(d,{showButtons:!0},{default:u(()=>[t(n,{returnTo:{name:"admin.manageUser",params:{userId:e.userId}},action:"back"},null,8,["returnTo"]),t(n,{returnTo:{name:"accounts"},action:"close"})]),_:1})]),_:1})}}};export{T as default};
