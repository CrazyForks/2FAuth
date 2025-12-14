import{D as r,O as p,c as l,m as u,e as y,f as d,I as b,x as _}from"./app-CsCdPRLz.js";import{c as f}from"./createLucideIcon-B_q_KK3i.js";/*! 2FAuth version 6.0.0 - Copyright (c) 2025 Bubka - https://github.com/Bubka/2FAuth *//**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=f("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),m=["aria-label","title"],g={__name:"CopyButton",props:{token:String},setup(e){const{t:c}=r(),i=_(),{copy:s}=p({legacy:!0}),a=e;function n(){s(a.token),i.success({text:c("notification.copied_to_clipboard")})}return(t,o)=>(u(),l("button",{type:"button","aria-label":t.$t("label.copy_to_clipboard"),title:t.$t("tooltip.copy_to_clipboard"),class:"button is-like-text is-pulled-right is-text",onClick:o[0]||(o[0]=b(x=>n(),["stop"]))},[y(d(k))],8,m))}};export{g as _};
