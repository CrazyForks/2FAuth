import{b as r,T as p,e as l,f as m,g as _,m as u,C as b,H as d}from"./app-CuhK3jij.js";/*! 2FAuth version 5.4.2 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */const y=["aria-label","title"],C={__name:"CopyButton",props:{token:String},setup(e){const s=r(),{copy:n}=p({legacy:!0}),c=e;function a(){n(c.token),s.success({text:d("commons.copied_to_clipboard")})}return(o,t)=>{const i=l("FontAwesomeIcon");return m(),_("button",{"aria-label":o.$t("commons.copy_to_clipboard"),title:o.$t("commons.copy_to_clipboard"),class:"button is-like-text is-pulled-right is-small is-text",onClick:t[0]||(t[0]=b(f=>a(),["stop"]))},[u(i,{icon:["fas","copy"]})],8,y)}}};export{C as _};
