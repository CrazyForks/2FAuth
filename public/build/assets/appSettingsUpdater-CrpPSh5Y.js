import{a7 as u,b as a,H as i}from"./app-CYV6HkYG.js";/*! 2FAuth version 5.3.0 - Copyright (c) 2024 Bubka - https://github.com/Bubka/2FAuth */async function c(n,e,o=!1){let s=null,r=null;return await u.update(n,e,{returnError:!0}).then(t=>{s=e,a().success({type:"is-success",text:i("settings.forms.setting_saved")})}).catch(t=>{o&&t.response.status===422?r=t:a().error(t)}),{data:s,error:r}}export{c as u};
