import{u as C,V as $,r as w,o as z,a1 as b,e as c,f as l,k as F,p as u,h as o,t as a,m as s,j as _,i,g as m,F as G,E as V,n as R,U as E,l as h}from"./app-CuhK3jij.js";import{u as N}from"./bus-BalNs30H.js";/*! 2FAuth version 5.4.2 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */const I={class:"title has-text-grey-dark"},L={class:"is-size-7-mobile"},W={class:"mt-3 mb-6"},A={key:0},T=["onClick","title"],x={class:"is-family-primary is-size-6 is-size-7-mobile has-text-grey"},M={class:"mt-2 is-size-7 is-pulled-right"},S={key:1,class:"has-text-centered"},U={class:"is-size-4"},J={__name:"Groups",setup(j){C();const t=$(),f=N(),p=w(!1);return z(async()=>{p.value=t.isEmpty,await t.fetch().finally(()=>{p.value=!1})}),b((e,g)=>{var n;e.name=="editGroup"&&(f.editedGroupName=(n=t.items.find(d=>d.id==e.params.groupId))==null?void 0:n.name)}),(e,g)=>{const n=c("FontAwesomeIcon"),d=c("RouterLink"),k=c("ButtonBackCloseCancel"),y=c("VueFooter"),v=c("ResponsiveWidthWrapper");return l(),F(v,null,{default:u(()=>[o("h1",I,a(e.$t("groups.groups")),1),o("div",L,a(e.$t("groups.manage_groups_legend")),1),o("div",W,[s(d,{class:"is-link mt-5",to:{name:"createGroup"}},{default:u(()=>[s(n,{icon:["fas","plus-circle"]}),_(" "+a(e.$t("groups.create_group")),1)]),_:1})]),i(t).isEmpty?h("",!0):(l(),m("div",A,[(l(!0),m(G,null,V(i(t).withoutTheAllGroup,r=>(l(),m("div",{key:r.id,class:"group-item is-size-5 is-size-6-mobile"},[_(a(r.name)+" ",1),s(i(E),null,{default:u(({mode:B})=>[o("button",{class:R(["button tag is-pulled-right",B=="dark"?"is-dark":"is-white"]),onClick:q=>i(t).delete(r.id),title:e.$t("commons.delete")},a(e.$t("commons.delete")),11,T)]),_:2},1024),s(d,{to:{name:"editGroup",params:{groupId:r.id}},class:"has-text-grey px-1",title:e.$t("commons.rename")},{default:u(()=>[s(n,{icon:["fas","pen-square"]})]),_:2},1032,["to","title"]),o("span",x,a(e.$t("groups.x_accounts",{count:r.twofaccounts_count})),1)]))),128)),o("div",M,a(e.$t("groups.deleting_group_does_not_delete_accounts")),1)])),i(p)&&i(t).isEmpty?(l(),m("div",S,[o("span",U,[s(n,{icon:["fas","spinner"],spin:""})])])):h("",!0),s(y,{showButtons:!0},{default:u(()=>[s(k,{returnTo:{name:"accounts"},action:"close"})]),_:1})]),_:1})}}};export{J as default};
