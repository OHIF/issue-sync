!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=50)}({45:function(e,t,n){const r=n(46),o=n(47);function s(e){console.log(`[dotenv][DEBUG] ${e}`)}const i="\n",a=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,c=/\\n/g,u=/\n|\r|\r\n/;function l(e,t){const n=Boolean(t&&t.debug),r={};return e.toString().split(u).forEach(function(e,t){const o=e.match(a);if(null!=o){const e=o[1];let t=o[2]||"";const n=t.length-1,s='"'===t[0]&&'"'===t[n];"'"===t[0]&&"'"===t[n]||s?(t=t.substring(1,n),s&&(t=t.replace(c,i))):t=t.trim(),r[e]=t}else n&&s(`did not match key and value when parsing line ${t+1}: ${e}`)}),r}e.exports.config=function(e){let t=o.resolve(process.cwd(),".env"),n="utf8",i=!1;e&&(null!=e.path&&(t=e.path),null!=e.encoding&&(n=e.encoding),null!=e.debug&&(i=!0));try{const e=l(r.readFileSync(t,{encoding:n}),{debug:i});return Object.keys(e).forEach(function(t){Object.prototype.hasOwnProperty.call(process.env,t)?i&&s(`"${t}" is already defined in \`process.env\` and will not be overwritten`):process.env[t]=e[t]}),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=l},46:function(e,t){e.exports=require("fs")},47:function(e,t){e.exports=require("path")},50:function(e,t,n){n(45).config();const r=n(51);t.handler=async function(e,t){try{const{ATL_API_TOKEN:t}=process.env,n=new r({apiToken:t}),o=JSON.parse(e.body),{action:s,issue:i,repository:a,organization:c,sender:u}=o;if("opened"===s&&void 0!==i){const{html_url:e,title:t,body:r}=i,{full_name:o}=a,{login:s}=u,c=`URL: [${e}](${e})\r\n\r\n ${r}`,l=await n.createIssue(t,c,["triage",`gh-repo:${o}`,`gh-reporter:${s}`]);return{statusCode:200,body:JSON.stringify(l)}}return{statusCode:200,body:"Issue not open"}}catch(e){return{statusCode:500,body:"ERR: "+JSON.stringify({msg:e.message||e})}}}},51:function(e,t,n){const r=n(52);e.exports=class{constructor(e){this.API_CONFIG={token:e.apiToken},this.createIssue=r.bind(this,this.API_CONFIG)}}},52:function(e,t){function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}e.exports=async function(e,t,r,o=[]){const s=n({token:void 0,user:"danny.brown@radicalimaging.com",baseUrl:"https://radicalimaging.atlassian.net"},e),i=function(e,t,n=[]){return{update:{},fields:{summary:e,issuetype:{id:"10109"},project:{id:"10004"},description:{type:"doc",version:1,content:[{type:"paragraph",content:[{text:t,type:"text"}]}]},reporter:{id:"5cfa837ab87c300f36eb9549"},labels:n}}}(t,r,o);var a,c,u,l;return(await(a=s.baseUrl,c=s.user,u=s.token,l=i,axios.post(`${a}/rest/api/3/issue`,l,{auth:{username:c,password:u},headers:{Accept:"application/json","Content-Type":"application/json"}}))).data}}}));