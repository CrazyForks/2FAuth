import{_ as P}from"./AdminTabs-Bl1-NjaF.js";import{a4 as W,S as V,r as f,e as p,f as r,g as c,h as e,n as T,i as s,t as n,m as a,p as w,j as k,l as L,U as j,R as D,a as q,b as S,a2 as G,a1 as J,o as K,F as O,E as Q,H as X}from"./app-CYV6HkYG.js";import{u as E}from"./appSettingsUpdater-CrpPSh5Y.js";import{_ as Y}from"./CopyButton-CDpmfULX.js";/*! 2FAuth version 5.3.0 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */const v=W("web"),$={getSystemInfos(o={}){return v.get("system/infos",{...o})},getLastRelease(o={}){return v.get("system/latestRelease",{...o})},sendTestEmail(o={}){return v.post("system/test-email",{...o})},clearCache(o={}){return v.get("system/clear-cache",{...o})},optimize(o={}){return v.get("system/optimize",{...o})}},Z={class:"columns is-mobile is-vcentered"},ee={class:"column is-narrow"},se={class:"column"},te=e("span",{class:"release-flag"},null,-1),ne={class:"is-size-7",href:"https://github.com/Bubka/2FAuth/releases"},ae={key:1,class:"has-text-grey"},oe={key:2,class:"has-text-grey"},le={__name:"VersionChecker",setup(o){const d=V(),g=f(!1),m=f();async function _(){g.value=!0,m.value=void 0,await $.getLastRelease({returnError:!0}).then(l=>{d.latestRelease=l.data.newRelease,m.value=l.data.newRelease===null?null:l.data.newRelease===!1}).catch(()=>{m.value=null}),g.value=!1}return(l,h)=>{const b=p("FontAwesomeIcon");return r(),c("div",Z,[e("div",ee,[e("button",{type:"button",class:T([s(g)?"is-loading":"","button is-link is-rounded is-small"]),onClick:_},n(l.$t("admin.check_now")),3)]),e("div",se,[a(s(j),null,{default:w(({mode:y})=>[s(d).latestRelease?(r(),c("span",{key:0,class:T(["mt-2",y=="dark"?"has-text-warning":"has-text-warning-dark"])},[te,k(n(l.$t("admin.x_is_available",{version:s(d).latestRelease}))+" ",1),e("a",ne,n(l.$t("admin.view_on_github")),1)],2)):L("",!0),s(m)?(r(),c("span",ae,[a(b,{icon:["fas","check"],class:"mr-1 has-text-success"}),k(" "+n(l.$t("commons.you_are_up_to_date")),1)])):s(m)===null?(r(),c("span",oe,[a(b,{icon:["fas","times"],class:"mr-1 has-text-danger"}),k(n(l.$t("errors.check_failed_try_later")),1)])):L("",!0)]),_:1})])])}}},ie={class:"options-tabs"},re={class:"title is-4 pt-4 has-text-grey-light"},ce={class:"field"},ue=["innerHTML"],de=["innerHTML"],me=["innerHTML"],_e={class:"columns is-mobile is-vcentered"},he={class:"column is-narrow"},pe={class:"icon is-small"},fe={class:"field"},ge=["innerHTML"],be=["innerHTML"],ye={class:"title is-4 pt-5 has-text-grey-light"},ve={class:"title is-4 pt-5 has-text-grey-light"},ke={class:"field"},$e=["innerHTML"],Te=["innerHTML"],Ce={class:"field mb-5 is-grouped"},we={class:"control"},Le={class:"field"},Fe=["innerHTML"],Me={key:0,class:"about-debug box is-family-monospace is-size-7"},He=["value"],Se={class:"has-text-grey"},Ee={key:1,class:"about-debug box is-family-monospace is-size-7 has-text-warning-dark"},Ie={__name:"AppSetup",setup(o){const d=D("2fauth"),g=q(),m=S(),_=V(),l=G(d.prefix+"returnTo","accounts"),h=f(),b=f(null),y=f(!1),C=f(!1),R=d.config.subdirectory+"/up",U=location.hostname+d.config.subdirectory+"/up";function B(){y.value=!0,$.sendTestEmail().finally(()=>{y.value=!1})}function I(){C.value=!0,$.clearCache().then(t=>{S().success({type:"is-success",text:X("admin.cache_cleared")})}).finally(()=>{C.value=!1})}return J(t=>{t.name.startsWith("admin.")||m.clear()}),K(async()=>{await _.fetch(),$.getSystemInfos({returnError:!0}).then(t=>{h.value=t.data.common}).catch(()=>{h.value=null})}),(t,u)=>{const F=p("FormCheckbox"),A=p("FontAwesomeIcon"),N=p("FormWrapper"),x=p("ButtonBackCloseCancel"),z=p("VueFooter");return r(),c("div",null,[a(P,{activeTab:"admin.appSetup"}),e("div",ie,[a(N,null,{default:w(()=>{var M;return[e("form",null,[e("h4",re,n(t.$t("settings.general")),1),a(F,{modelValue:s(_).checkForUpdate,"onUpdate:modelValue":[u[0]||(u[0]=i=>s(_).checkForUpdate=i),u[1]||(u[1]=i=>s(E)("checkForUpdate",i))],fieldName:"checkForUpdate",label:"commons.check_for_update",help:"commons.check_for_update_help"},null,8,["modelValue"]),a(le),e("div",ce,[e("label",{class:"label",innerHTML:t.$t("admin.forms.test_email.label")},null,8,ue),e("p",{class:"help",innerHTML:t.$t("admin.forms.test_email.help")},null,8,de),e("p",{class:"help",innerHTML:t.$t("admin.forms.test_email.email_will_be_send_to_x",{email:s(g).email})},null,8,me)]),e("div",_e,[e("div",he,[e("button",{type:"button",class:T([s(y)?"is-loading":"","button is-link is-rounded is-small"]),onClick:B},[e("span",pe,[a(A,{icon:["far","paper-plane"]})]),e("span",null,n(t.$t("commons.send")),1)],2)])]),e("div",fe,[e("label",{class:"label",innerHTML:t.$t("admin.forms.health_endpoint.label")},null,8,ge),e("p",{class:"help",innerHTML:t.$t("admin.forms.health_endpoint.help")},null,8,be)]),e("div",null,[e("a",{target:"_blank",href:R},n(U))]),e("h4",ye,n(t.$t("settings.security")),1),a(F,{modelValue:s(_).useEncryption,"onUpdate:modelValue":[u[2]||(u[2]=i=>s(_).useEncryption=i),u[3]||(u[3]=i=>s(E)("useEncryption",i))],fieldName:"useEncryption",label:"admin.forms.use_encryption.label",help:"admin.forms.use_encryption.help"},null,8,["modelValue"])]),e("h4",ve,n(t.$t("commons.environment")),1),e("div",ke,[e("label",{class:"label",innerHTML:t.$t("admin.forms.cache_management.label")},null,8,$e),e("p",{class:"help",innerHTML:t.$t("admin.forms.cache_management.help")},null,8,Te)]),e("div",Ce,[e("p",we,[e("button",{type:"button",class:T([s(C)?"is-loading":"","button is-link is-rounded is-small"]),onClick:I},n(t.$t("commons.clear")),3)])]),e("div",Le,[e("label",{class:"label",innerHTML:t.$t("admin.variables")},null,8,Fe)]),s(h)?(r(),c("div",Me,[a(Y,{id:"btnCopyEnvVars",token:(M=s(b))==null?void 0:M.innerText},null,8,["token"]),e("ul",{ref_key:"listInfos",ref:b,id:"listInfos"},[(r(!0),c(O,null,Q(s(h),(i,H)=>(r(),c("li",{value:i,key:H},[e("b",null,n(H),1),k(": "),e("span",Se,n(i),1)],8,He))),128))],512)])):s(h)===null?(r(),c("div",Ee,n(t.$t("errors.error_during_data_fetching")),1)):L("",!0)]}),_:1})]),a(z,{showButtons:!0},{default:w(()=>[a(x,{returnTo:{name:s(l)},action:"close"},null,8,["returnTo"])]),_:1})])}}};export{Ie as default};
