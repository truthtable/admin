import{o as jf}from"./idb-81bdbf9b.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=function(n,t){if(!n)throw Cn(t)},Cn=function(n){return new Error("Firebase Database ("+du.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=function(n){const t=[];let e=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},zf=function(n){const t=[];let e=0,i=0;for(;e<n.length;){const s=n[e++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[e++];t[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[e++],a=n[e++],l=n[e++],u=((s&7)<<18|(r&63)<<12|(a&63)<<6|l&63)-65536;t[i++]=String.fromCharCode(55296+(u>>10)),t[i++]=String.fromCharCode(56320+(u&1023))}else{const r=n[e++],a=n[e++];t[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|a&63)}}return t.join("")},Po={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=r>>2,p=(r&3)<<4|l>>4;let g=(l&15)<<2|d>>6,A=d&63;u||(A=64,a||(g=64)),i.push(e[f],e[p],e[g],e[A])}return i.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(fu(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):zf(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,r==null||l==null||d==null||p==null)throw new $f;const g=r<<2|l>>4;if(i.push(g),d!==64){const A=l<<4&240|d>>2;if(i.push(A),p!==64){const S=d<<6&192|p;i.push(S)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class $f extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _u=function(n){const t=fu(n);return Po.encodeByteArray(t,!0)},gs=function(n){return _u(n).replace(/\./g,"")},Kr=function(n){try{return Po.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(n){return pu(void 0,n)}function pu(n,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:const e=t;return new Date(e.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return t}for(const e in t)!t.hasOwnProperty(e)||!Hf(e)||(n[e]=pu(n[e],t[e]));return n}function Hf(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qf=()=>Kf().__FIREBASE_DEFAULTS__,Yf=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n={}.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Kr(n[1]);return t&&JSON.parse(t)},bo=()=>{try{return Qf()||Yf()||Xf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jf=n=>{var t,e;return(e=(t=bo())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},mu=n=>{const t=Jf(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),i]:[t.substring(0,e),i]},gu=()=>{var n;return(n=bo())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,i)=>{e?this.reject(e):this.resolve(i),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},i=t||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n),l="";return[gs(JSON.stringify(e)),gs(JSON.stringify(a)),l].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Eu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vu())}function Zf(){var n;const t=(n=bo())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function t_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Tu(){return du.NODE_ADMIN===!0}function e_(){return!Zf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function n_(){try{return typeof indexedDB=="object"}catch{return!1}}function i_(){return new Promise((n,t)=>{try{let e=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var r;t(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_="FirebaseError";class An extends Error{constructor(t,e,i){super(e),this.code=t,this.customData=i,this.name=s_,Object.setPrototypeOf(this,An.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Iu.prototype.create)}}class Iu{constructor(t,e,i){this.service=t,this.serviceName=e,this.errors=i}create(t,...e){const i=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],a=r?r_(r,i):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new An(s,l,i)}}function r_(n,t){return n.replace(o_,(e,i)=>{const s=t[i];return s!=null?String(s):`<${i}?>`})}const o_=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(n){return JSON.parse(n)}function yt(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu=function(n){let t={},e={},i={},s="";try{const r=n.split(".");t=fi(Kr(r[0])||""),e=fi(Kr(r[1])||""),s=r[2],i=e.d||{},delete e.d}catch{}return{header:t,claims:e,data:i,signature:s}},a_=function(n){const t=wu(n),e=t.claims;return!!e&&typeof e=="object"&&e.hasOwnProperty("iat")},l_=function(n){const t=wu(n).claims;return typeof t=="object"&&t.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n,t){return Object.prototype.hasOwnProperty.call(n,t)}function dn(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]}function ql(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function ys(n,t,e){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=t.call(e,n[s],s,n));return i}function Qr(n,t){if(n===t)return!0;const e=Object.keys(n),i=Object.keys(t);for(const s of e){if(!i.includes(s))return!1;const r=n[s],a=t[s];if(Wl(r)&&Wl(a)){if(!Qr(r,a))return!1}else if(r!==a)return!1}for(const s of i)if(!e.includes(s))return!1;return!0}function Wl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(n){const t=[];for(const[e,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(t,e){e||(e=0);const i=this.W_;if(typeof t=="string")for(let p=0;p<16;p++)i[p]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(let p=0;p<16;p++)i[p]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(let p=16;p<80;p++){const g=i[p-3]^i[p-8]^i[p-14]^i[p-16];i[p]=(g<<1|g>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],a=this.chain_[2],l=this.chain_[3],u=this.chain_[4],d,f;for(let p=0;p<80;p++){p<40?p<20?(d=l^r&(a^l),f=1518500249):(d=r^a^l,f=1859775393):p<60?(d=r&a|l&(r|a),f=2400959708):(d=r^a^l,f=3395469782);const g=(s<<5|s>>>27)+d+u+f+i[p]&4294967295;u=l,l=a,a=(r<<30|r>>>2)&4294967295,r=s,s=g}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(t,e){if(t==null)return;e===void 0&&(e=t.length);const i=e-this.blockSize;let s=0;const r=this.buf_;let a=this.inbuf_;for(;s<e;){if(a===0)for(;s<=i;)this.compress_(t,s),s+=this.blockSize;if(typeof t=="string"){for(;s<e;)if(r[a]=t.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(r),a=0;break}}else for(;s<e;)if(r[a]=t[s],++a,++s,a===this.blockSize){this.compress_(r),a=0;break}}this.inbuf_=a,this.total_+=e}digest(){const t=[];let e=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=e&255,e/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)t[i]=this.chain_[s]>>r&255,++i;return t}}function No(n,t){return`${n} failed: ${t} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_=function(n){const t=[];let e=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,N(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(r<<10)+a}s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):s<65536?(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},js=function(n){let t=0;for(let e=0;e<n.length;e++){const i=n.charCodeAt(e);i<128?t++:i<2048?t+=2:i>=55296&&i<=56319?(t+=4,e++):t+=3}return t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n){return n&&n._delegate?n._delegate:n}class fn{constructor(t,e,i){this.name=t,this.instanceFactory=e,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const i=new Ws;if(this.instancesDeferred.set(e,i),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const i=this.normalizeInstanceIdentifier(t?.identifier),s=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(__(t))try{this.getOrInitializeService({instanceIdentifier:Ve})}catch{}for(const[e,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(t=Ve){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ve){return this.instances.has(t)}getOptions(t=Ve){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:e});for(const[r,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&a.resolve(s)}return s}onInit(t,e){var i;const s=this.normalizeInstanceIdentifier(e),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(t),this.onInitCallbacks.set(s,r);const a=this.instances.get(s);return a&&t(a,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const i=this.onInitCallbacks.get(e);if(i)for(const s of i)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:f_(t),options:e}),this.instances.set(t,i),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null}normalizeInstanceIdentifier(t=Ve){return this.component?this.component.multipleInstances?t:Ve:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function f_(n){return n===Ve?void 0:n}function __(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new d_(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const m_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},g_=H.INFO,y_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},v_=(n,t,...e)=>{if(t<n.logLevel)return;const i=new Date().toISOString(),s=y_[t];if(s)console[s](`[${i}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ko{constructor(t){this.name=t,this._logLevel=g_,this._logHandler=v_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in H))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?m_[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...t),this._logHandler(this,H.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...t),this._logHandler(this,H.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,H.INFO,...t),this._logHandler(this,H.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,H.WARN,...t),this._logHandler(this,H.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...t),this._logHandler(this,H.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E_{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(T_(e)){const i=e.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(e=>e).join(" ")}}function T_(n){const t=n.getComponent();return t?.type==="VERSION"}const Yr="@firebase/app",jl="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae=new ko("@firebase/app"),I_="@firebase/app-compat",w_="@firebase/analytics-compat",C_="@firebase/analytics",A_="@firebase/app-check-compat",R_="@firebase/app-check",S_="@firebase/auth",P_="@firebase/auth-compat",b_="@firebase/database",N_="@firebase/data-connect",k_="@firebase/database-compat",D_="@firebase/functions",V_="@firebase/functions-compat",x_="@firebase/installations",O_="@firebase/installations-compat",M_="@firebase/messaging",L_="@firebase/messaging-compat",F_="@firebase/performance",U_="@firebase/performance-compat",B_="@firebase/remote-config",q_="@firebase/remote-config-compat",W_="@firebase/storage",j_="@firebase/storage-compat",z_="@firebase/firestore",$_="@firebase/vertexai-preview",G_="@firebase/firestore-compat",H_="firebase",K_="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr="[DEFAULT]",Q_={[Yr]:"fire-core",[I_]:"fire-core-compat",[C_]:"fire-analytics",[w_]:"fire-analytics-compat",[R_]:"fire-app-check",[A_]:"fire-app-check-compat",[S_]:"fire-auth",[P_]:"fire-auth-compat",[b_]:"fire-rtdb",[N_]:"fire-data-connect",[k_]:"fire-rtdb-compat",[D_]:"fire-fn",[V_]:"fire-fn-compat",[x_]:"fire-iid",[O_]:"fire-iid-compat",[M_]:"fire-fcm",[L_]:"fire-fcm-compat",[F_]:"fire-perf",[U_]:"fire-perf-compat",[B_]:"fire-rc",[q_]:"fire-rc-compat",[W_]:"fire-gcs",[j_]:"fire-gcs-compat",[z_]:"fire-fst",[G_]:"fire-fst-compat",[$_]:"fire-vertex","fire-js":"fire-js",[H_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=new Map,Y_=new Map,Jr=new Map;function zl(n,t){try{n.container.addComponent(t)}catch(e){ae.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function _i(n){const t=n.name;if(Jr.has(t))return ae.debug(`There were multiple attempts to register component ${t}.`),!1;Jr.set(t,n);for(const e of vs.values())zl(e,n);for(const e of Y_.values())zl(e,n);return!0}function Cu(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ve=new Iu("app","Firebase",X_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(t,e,i){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ve.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=K_;function Z_(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const i=Object.assign({name:Xr,automaticDataCollectionEnabled:!1},t),s=i.name;if(typeof s!="string"||!s)throw ve.create("bad-app-name",{appName:String(s)});if(e||(e=gu()),!e)throw ve.create("no-options");const r=vs.get(s);if(r){if(Qr(e,r.options)&&Qr(i,r.config))return r;throw ve.create("duplicate-app",{appName:s})}const a=new p_(s);for(const u of Jr.values())a.addComponent(u);const l=new J_(e,i,a);return vs.set(s,l),l}function Ru(n=Xr){const t=vs.get(n);if(!t&&n===Xr&&gu())return Z_();if(!t)throw ve.create("no-app",{appName:n});return t}function Fe(n,t,e){var i;let s=(i=Q_[n])!==null&&i!==void 0?i:n;e&&(s+=`-${e}`);const r=s.match(/\s|\//),a=t.match(/\s|\//);if(r||a){const l=[`Unable to register library "${s}" with version "${t}":`];r&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ae.warn(l.join(" "));return}_i(new fn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp="firebase-heartbeat-database",ep=1,pi="firebase-heartbeat-store";let Mr=null;function Su(){return Mr||(Mr=jf(tp,ep,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(pi)}catch(e){console.warn(e)}}}}).catch(n=>{throw ve.create("idb-open",{originalErrorMessage:n.message})})),Mr}async function np(n){try{const e=(await Su()).transaction(pi),i=await e.objectStore(pi).get(Pu(n));return await e.done,i}catch(t){if(t instanceof An)ae.warn(t.message);else{const e=ve.create("idb-get",{originalErrorMessage:t?.message});ae.warn(e.message)}}}async function $l(n,t){try{const i=(await Su()).transaction(pi,"readwrite");await i.objectStore(pi).put(t,Pu(n)),await i.done}catch(e){if(e instanceof An)ae.warn(e.message);else{const i=ve.create("idb-set",{originalErrorMessage:e?.message});ae.warn(i.message)}}}function Pu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=1024,sp=30*24*60*60*1e3;class rp{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ap(e),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Gl();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(a=>a.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=sp}),this._storage.overwrite(this._heartbeatsCache))}catch(i){ae.warn(i)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Gl(),{heartbeatsToSend:i,unsentEntries:s}=op(this._heartbeatsCache.heartbeats),r=gs(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return ae.warn(e),""}}}function Gl(){return new Date().toISOString().substring(0,10)}function op(n,t=ip){const e=[];let i=n.slice();for(const s of n){const r=e.find(a=>a.agent===s.agent);if(r){if(r.dates.push(s.date),Hl(e)>t){r.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Hl(e)>t){e.pop();break}i=i.slice(1)}return{heartbeatsToSend:e,unsentEntries:i}}class ap{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return n_()?i_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await np(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return $l(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return $l(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Hl(n){return gs(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(n){_i(new fn("platform-logger",t=>new E_(t),"PRIVATE")),_i(new fn("heartbeat",t=>new rp(t),"PRIVATE")),Fe(Yr,jl,n),Fe(Yr,jl,"esm2017"),Fe("fire-js","")}lp("");var Kl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ue,bu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,m){function v(){}v.prototype=m.prototype,I.D=m.prototype,I.prototype=new v,I.prototype.constructor=I,I.C=function(E,T,C){for(var y=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)y[ee-2]=arguments[ee];return m.prototype[T].apply(E,y)}}function e(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(i,e),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,v){v||(v=0);var E=Array(16);if(typeof m=="string")for(var T=0;16>T;++T)E[T]=m.charCodeAt(v++)|m.charCodeAt(v++)<<8|m.charCodeAt(v++)<<16|m.charCodeAt(v++)<<24;else for(T=0;16>T;++T)E[T]=m[v++]|m[v++]<<8|m[v++]<<16|m[v++]<<24;m=I.g[0],v=I.g[1],T=I.g[2];var C=I.g[3],y=m+(C^v&(T^C))+E[0]+3614090360&4294967295;m=v+(y<<7&4294967295|y>>>25),y=C+(T^m&(v^T))+E[1]+3905402710&4294967295,C=m+(y<<12&4294967295|y>>>20),y=T+(v^C&(m^v))+E[2]+606105819&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(m^T&(C^m))+E[3]+3250441966&4294967295,v=T+(y<<22&4294967295|y>>>10),y=m+(C^v&(T^C))+E[4]+4118548399&4294967295,m=v+(y<<7&4294967295|y>>>25),y=C+(T^m&(v^T))+E[5]+1200080426&4294967295,C=m+(y<<12&4294967295|y>>>20),y=T+(v^C&(m^v))+E[6]+2821735955&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(m^T&(C^m))+E[7]+4249261313&4294967295,v=T+(y<<22&4294967295|y>>>10),y=m+(C^v&(T^C))+E[8]+1770035416&4294967295,m=v+(y<<7&4294967295|y>>>25),y=C+(T^m&(v^T))+E[9]+2336552879&4294967295,C=m+(y<<12&4294967295|y>>>20),y=T+(v^C&(m^v))+E[10]+4294925233&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(m^T&(C^m))+E[11]+2304563134&4294967295,v=T+(y<<22&4294967295|y>>>10),y=m+(C^v&(T^C))+E[12]+1804603682&4294967295,m=v+(y<<7&4294967295|y>>>25),y=C+(T^m&(v^T))+E[13]+4254626195&4294967295,C=m+(y<<12&4294967295|y>>>20),y=T+(v^C&(m^v))+E[14]+2792965006&4294967295,T=C+(y<<17&4294967295|y>>>15),y=v+(m^T&(C^m))+E[15]+1236535329&4294967295,v=T+(y<<22&4294967295|y>>>10),y=m+(T^C&(v^T))+E[1]+4129170786&4294967295,m=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(m^v))+E[6]+3225465664&4294967295,C=m+(y<<9&4294967295|y>>>23),y=T+(m^v&(C^m))+E[11]+643717713&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^m&(T^C))+E[0]+3921069994&4294967295,v=T+(y<<20&4294967295|y>>>12),y=m+(T^C&(v^T))+E[5]+3593408605&4294967295,m=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(m^v))+E[10]+38016083&4294967295,C=m+(y<<9&4294967295|y>>>23),y=T+(m^v&(C^m))+E[15]+3634488961&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^m&(T^C))+E[4]+3889429448&4294967295,v=T+(y<<20&4294967295|y>>>12),y=m+(T^C&(v^T))+E[9]+568446438&4294967295,m=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(m^v))+E[14]+3275163606&4294967295,C=m+(y<<9&4294967295|y>>>23),y=T+(m^v&(C^m))+E[3]+4107603335&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^m&(T^C))+E[8]+1163531501&4294967295,v=T+(y<<20&4294967295|y>>>12),y=m+(T^C&(v^T))+E[13]+2850285829&4294967295,m=v+(y<<5&4294967295|y>>>27),y=C+(v^T&(m^v))+E[2]+4243563512&4294967295,C=m+(y<<9&4294967295|y>>>23),y=T+(m^v&(C^m))+E[7]+1735328473&4294967295,T=C+(y<<14&4294967295|y>>>18),y=v+(C^m&(T^C))+E[12]+2368359562&4294967295,v=T+(y<<20&4294967295|y>>>12),y=m+(v^T^C)+E[5]+4294588738&4294967295,m=v+(y<<4&4294967295|y>>>28),y=C+(m^v^T)+E[8]+2272392833&4294967295,C=m+(y<<11&4294967295|y>>>21),y=T+(C^m^v)+E[11]+1839030562&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^m)+E[14]+4259657740&4294967295,v=T+(y<<23&4294967295|y>>>9),y=m+(v^T^C)+E[1]+2763975236&4294967295,m=v+(y<<4&4294967295|y>>>28),y=C+(m^v^T)+E[4]+1272893353&4294967295,C=m+(y<<11&4294967295|y>>>21),y=T+(C^m^v)+E[7]+4139469664&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^m)+E[10]+3200236656&4294967295,v=T+(y<<23&4294967295|y>>>9),y=m+(v^T^C)+E[13]+681279174&4294967295,m=v+(y<<4&4294967295|y>>>28),y=C+(m^v^T)+E[0]+3936430074&4294967295,C=m+(y<<11&4294967295|y>>>21),y=T+(C^m^v)+E[3]+3572445317&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^m)+E[6]+76029189&4294967295,v=T+(y<<23&4294967295|y>>>9),y=m+(v^T^C)+E[9]+3654602809&4294967295,m=v+(y<<4&4294967295|y>>>28),y=C+(m^v^T)+E[12]+3873151461&4294967295,C=m+(y<<11&4294967295|y>>>21),y=T+(C^m^v)+E[15]+530742520&4294967295,T=C+(y<<16&4294967295|y>>>16),y=v+(T^C^m)+E[2]+3299628645&4294967295,v=T+(y<<23&4294967295|y>>>9),y=m+(T^(v|~C))+E[0]+4096336452&4294967295,m=v+(y<<6&4294967295|y>>>26),y=C+(v^(m|~T))+E[7]+1126891415&4294967295,C=m+(y<<10&4294967295|y>>>22),y=T+(m^(C|~v))+E[14]+2878612391&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~m))+E[5]+4237533241&4294967295,v=T+(y<<21&4294967295|y>>>11),y=m+(T^(v|~C))+E[12]+1700485571&4294967295,m=v+(y<<6&4294967295|y>>>26),y=C+(v^(m|~T))+E[3]+2399980690&4294967295,C=m+(y<<10&4294967295|y>>>22),y=T+(m^(C|~v))+E[10]+4293915773&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~m))+E[1]+2240044497&4294967295,v=T+(y<<21&4294967295|y>>>11),y=m+(T^(v|~C))+E[8]+1873313359&4294967295,m=v+(y<<6&4294967295|y>>>26),y=C+(v^(m|~T))+E[15]+4264355552&4294967295,C=m+(y<<10&4294967295|y>>>22),y=T+(m^(C|~v))+E[6]+2734768916&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~m))+E[13]+1309151649&4294967295,v=T+(y<<21&4294967295|y>>>11),y=m+(T^(v|~C))+E[4]+4149444226&4294967295,m=v+(y<<6&4294967295|y>>>26),y=C+(v^(m|~T))+E[11]+3174756917&4294967295,C=m+(y<<10&4294967295|y>>>22),y=T+(m^(C|~v))+E[2]+718787259&4294967295,T=C+(y<<15&4294967295|y>>>17),y=v+(C^(T|~m))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+C&4294967295}i.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var v=m-this.blockSize,E=this.B,T=this.h,C=0;C<m;){if(T==0)for(;C<=v;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<m;)if(E[T++]=I.charCodeAt(C++),T==this.blockSize){s(this,E),T=0;break}}else for(;C<m;)if(E[T++]=I[C++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=m},i.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var v=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=v&255,v/=256;for(this.u(I),I=Array(16),m=v=0;4>m;++m)for(var E=0;32>E;E+=8)I[v++]=this.g[m]>>>E&255;return I};function r(I,m){var v=l;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=m(I)}function a(I,m){this.h=m;for(var v=[],E=!0,T=I.length-1;0<=T;T--){var C=I[T]|0;E&&C==m||(v[T]=C,E=!1)}this.g=v}var l={};function u(I){return-128<=I&&128>I?r(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return k(d(-I));for(var m=[],v=1,E=0;I>=v;E++)m[E]=I/v|0,v*=4294967296;return new a(m,0)}function f(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return k(f(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=d(Math.pow(m,8)),E=p,T=0;T<I.length;T+=8){var C=Math.min(8,I.length-T),y=parseInt(I.substring(T,T+C),m);8>C?(C=d(Math.pow(m,C)),E=E.j(C).add(d(y))):(E=E.j(v),E=E.add(d(y)))}return E}var p=u(0),g=u(1),A=u(16777216);n=a.prototype,n.m=function(){if(V(this))return-k(this).m();for(var I=0,m=1,v=0;v<this.g.length;v++){var E=this.i(v);I+=(0<=E?E:4294967296+E)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(S(this))return"0";if(V(this))return"-"+k(this).toString(I);for(var m=d(Math.pow(I,6)),v=this,E="";;){var T=ct(v,m).g;v=$(v,T.j(m));var C=((0<v.g.length?v.g[0]:v.h)>>>0).toString(I);if(v=T,S(v))return C+E;for(;6>C.length;)C="0"+C;E=C+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function S(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function V(I){return I.h==-1}n.l=function(I){return I=$(this,I),V(I)?-1:S(I)?0:1};function k(I){for(var m=I.g.length,v=[],E=0;E<m;E++)v[E]=~I.g[E];return new a(v,~I.h).add(g)}n.abs=function(){return V(this)?k(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),v=[],E=0,T=0;T<=m;T++){var C=E+(this.i(T)&65535)+(I.i(T)&65535),y=(C>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);E=y>>>16,C&=65535,y&=65535,v[T]=y<<16|C}return new a(v,v[v.length-1]&-2147483648?-1:0)};function $(I,m){return I.add(k(m))}n.j=function(I){if(S(this)||S(I))return p;if(V(this))return V(I)?k(this).j(k(I)):k(k(this).j(I));if(V(I))return k(this.j(k(I)));if(0>this.l(A)&&0>I.l(A))return d(this.m()*I.m());for(var m=this.g.length+I.g.length,v=[],E=0;E<2*m;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<I.g.length;T++){var C=this.i(E)>>>16,y=this.i(E)&65535,ee=I.i(T)>>>16,Vn=I.i(T)&65535;v[2*E+2*T]+=y*Vn,K(v,2*E+2*T),v[2*E+2*T+1]+=C*Vn,K(v,2*E+2*T+1),v[2*E+2*T+1]+=y*ee,K(v,2*E+2*T+1),v[2*E+2*T+2]+=C*ee,K(v,2*E+2*T+2)}for(E=0;E<m;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=m;E<2*m;E++)v[E]=0;return new a(v,0)};function K(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function J(I,m){this.g=I,this.h=m}function ct(I,m){if(S(m))throw Error("division by zero");if(S(I))return new J(p,p);if(V(I))return m=ct(k(I),m),new J(k(m.g),k(m.h));if(V(m))return m=ct(I,k(m)),new J(k(m.g),m.h);if(30<I.g.length){if(V(I)||V(m))throw Error("slowDivide_ only works with positive integers.");for(var v=g,E=m;0>=E.l(I);)v=te(v),E=te(E);var T=vt(v,1),C=vt(E,1);for(E=vt(E,2),v=vt(v,2);!S(E);){var y=C.add(E);0>=y.l(I)&&(T=T.add(v),C=y),E=vt(E,1),v=vt(v,1)}return m=$(I,T.j(m)),new J(T,m)}for(T=p;0<=I.l(m);){for(v=Math.max(1,Math.floor(I.m()/m.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),C=d(v),y=C.j(m);V(y)||0<y.l(I);)v-=E,C=d(v),y=C.j(m);S(C)&&(C=g),T=T.add(C),I=$(I,y)}return new J(T,I)}n.A=function(I){return ct(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),v=[],E=0;E<m;E++)v[E]=this.i(E)&I.i(E);return new a(v,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),v=[],E=0;E<m;E++)v[E]=this.i(E)|I.i(E);return new a(v,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),v=[],E=0;E<m;E++)v[E]=this.i(E)^I.i(E);return new a(v,this.h^I.h)};function te(I){for(var m=I.g.length+1,v=[],E=0;E<m;E++)v[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(v,I.h)}function vt(I,m){var v=m>>5;m%=32;for(var E=I.g.length-v,T=[],C=0;C<E;C++)T[C]=0<m?I.i(C+v)>>>m|I.i(C+v+1)<<32-m:I.i(C+v);return new a(T,I.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,bu=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Ue=a}).apply(typeof Kl<"u"?Kl:typeof self<"u"?self:typeof window<"u"?window:{});var rs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nu,ni,ku,ds,Zr,Du,Vu,xu;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof rs=="object"&&rs];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=e(this);function s(o,c){if(c)t:{var h=i;o=o.split(".");for(var _=0;_<o.length-1;_++){var w=o[_];if(!(w in h))break t;h=h[w]}o=o[o.length-1],_=h[o],c=c(_),c!=_&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}function r(o,c){o instanceof String&&(o+="");var h=0,_=!1,w={next:function(){if(!_&&h<o.length){var R=h++;return{value:c(R,o[R]),done:!1}}return _=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(o){return o||function(){return r(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,h){return o.call.apply(o.bind,arguments)}function p(o,c,h){if(!o)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,_),o.apply(c,w)}}return function(){return o.apply(c,arguments)}}function g(o,c,h){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function A(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var _=h.slice();return _.push.apply(_,arguments),o.apply(this,_)}}function S(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(_,w,R){for(var D=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)D[tt-2]=arguments[tt];return c.prototype[w].apply(_,D)}}function V(o){const c=o.length;if(0<c){const h=Array(c);for(let _=0;_<c;_++)h[_]=o[_];return h}return[]}function k(o,c){for(let h=1;h<arguments.length;h++){const _=arguments[h];if(u(_)){const w=o.length||0,R=_.length||0;o.length=w+R;for(let D=0;D<R;D++)o[w+D]=_[D]}else o.push(_)}}class ${constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function K(o){return/^[\s\xa0]*$/.test(o)}function J(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function ct(o){return ct[" "](o),o}ct[" "]=function(){};var te=J().indexOf("Gecko")!=-1&&!(J().toLowerCase().indexOf("webkit")!=-1&&J().indexOf("Edge")==-1)&&!(J().indexOf("Trident")!=-1||J().indexOf("MSIE")!=-1)&&J().indexOf("Edge")==-1;function vt(o,c,h){for(const _ in o)c.call(h,o[_],_,o)}function I(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function m(o){const c={};for(const h in o)c[h]=o[h];return c}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let h,_;for(let w=1;w<arguments.length;w++){_=arguments[w];for(h in _)o[h]=_[h];for(let R=0;R<v.length;R++)h=v[R],Object.prototype.hasOwnProperty.call(_,h)&&(o[h]=_[h])}}function T(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function C(o){l.setTimeout(()=>{throw o},0)}function y(){var o=hr;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class ee{constructor(){this.h=this.g=null}add(c,h){const _=Vn.get();_.set(c,h),this.h?this.h.next=_:this.g=_,this.h=_}}var Vn=new $(()=>new cf,o=>o.reset());class cf{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let xn,On=!1,hr=new ee,Ba=()=>{const o=l.Promise.resolve(void 0);xn=()=>{o.then(uf)}};var uf=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){C(h)}var c=Vn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}On=!1};function _e(){this.s=this.s,this.C=this.C}_e.prototype.s=!1,_e.prototype.ma=function(){this.s||(this.s=!0,this.N())},_e.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function At(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}At.prototype.h=function(){this.defaultPrevented=!0};var hf=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return o}();function Mn(o,c){if(At.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,_=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(te){t:{try{ct(c.nodeName);var w=!0;break t}catch{}w=!1}w||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:df[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Mn.aa.h.call(this)}}S(Mn,At);var df={2:"touch",3:"pen",4:"mouse"};Mn.prototype.h=function(){Mn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ln="closure_listenable_"+(1e6*Math.random()|0),ff=0;function _f(o,c,h,_,w){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!_,this.ha=w,this.key=++ff,this.da=this.fa=!1}function qi(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Wi(o){this.src=o,this.g={},this.h=0}Wi.prototype.add=function(o,c,h,_,w){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var D=fr(o,c,_,w);return-1<D?(c=o[D],h||(c.fa=!1)):(c=new _f(c,this.src,R,!!_,w),c.fa=h,o.push(c)),c};function dr(o,c){var h=c.type;if(h in o.g){var _=o.g[h],w=Array.prototype.indexOf.call(_,c,void 0),R;(R=0<=w)&&Array.prototype.splice.call(_,w,1),R&&(qi(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function fr(o,c,h,_){for(var w=0;w<o.length;++w){var R=o[w];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==_)return w}return-1}var _r="closure_lm_"+(1e6*Math.random()|0),pr={};function qa(o,c,h,_,w){if(_&&_.once)return ja(o,c,h,_,w);if(Array.isArray(c)){for(var R=0;R<c.length;R++)qa(o,c[R],h,_,w);return null}return h=vr(h),o&&o[Ln]?o.K(c,h,d(_)?!!_.capture:!!_,w):Wa(o,c,h,!1,_,w)}function Wa(o,c,h,_,w,R){if(!c)throw Error("Invalid event type");var D=d(w)?!!w.capture:!!w,tt=gr(o);if(tt||(o[_r]=tt=new Wi(o)),h=tt.add(c,h,_,D,R),h.proxy)return h;if(_=pf(),h.proxy=_,_.src=o,_.listener=h,o.addEventListener)hf||(w=D),w===void 0&&(w=!1),o.addEventListener(c.toString(),_,w);else if(o.attachEvent)o.attachEvent($a(c.toString()),_);else if(o.addListener&&o.removeListener)o.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return h}function pf(){function o(h){return c.call(o.src,o.listener,h)}const c=mf;return o}function ja(o,c,h,_,w){if(Array.isArray(c)){for(var R=0;R<c.length;R++)ja(o,c[R],h,_,w);return null}return h=vr(h),o&&o[Ln]?o.L(c,h,d(_)?!!_.capture:!!_,w):Wa(o,c,h,!0,_,w)}function za(o,c,h,_,w){if(Array.isArray(c))for(var R=0;R<c.length;R++)za(o,c[R],h,_,w);else _=d(_)?!!_.capture:!!_,h=vr(h),o&&o[Ln]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],h=fr(R,h,_,w),-1<h&&(qi(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=gr(o))&&(c=o.g[c.toString()],o=-1,c&&(o=fr(c,h,_,w)),(h=-1<o?c[o]:null)&&mr(h))}function mr(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Ln])dr(c.i,o);else{var h=o.type,_=o.proxy;c.removeEventListener?c.removeEventListener(h,_,o.capture):c.detachEvent?c.detachEvent($a(h),_):c.addListener&&c.removeListener&&c.removeListener(_),(h=gr(c))?(dr(h,o),h.h==0&&(h.src=null,c[_r]=null)):qi(o)}}}function $a(o){return o in pr?pr[o]:pr[o]="on"+o}function mf(o,c){if(o.da)o=!0;else{c=new Mn(c,this);var h=o.listener,_=o.ha||o.src;o.fa&&mr(o),o=h.call(_,c)}return o}function gr(o){return o=o[_r],o instanceof Wi?o:null}var yr="__closure_events_fn_"+(1e9*Math.random()>>>0);function vr(o){return typeof o=="function"?o:(o[yr]||(o[yr]=function(c){return o.handleEvent(c)}),o[yr])}function Rt(){_e.call(this),this.i=new Wi(this),this.M=this,this.F=null}S(Rt,_e),Rt.prototype[Ln]=!0,Rt.prototype.removeEventListener=function(o,c,h,_){za(this,o,c,h,_)};function Vt(o,c){var h,_=o.F;if(_)for(h=[];_;_=_.F)h.push(_);if(o=o.M,_=c.type||c,typeof c=="string")c=new At(c,o);else if(c instanceof At)c.target=c.target||o;else{var w=c;c=new At(_,o),E(c,w)}if(w=!0,h)for(var R=h.length-1;0<=R;R--){var D=c.g=h[R];w=ji(D,_,!0,c)&&w}if(D=c.g=o,w=ji(D,_,!0,c)&&w,w=ji(D,_,!1,c)&&w,h)for(R=0;R<h.length;R++)D=c.g=h[R],w=ji(D,_,!1,c)&&w}Rt.prototype.N=function(){if(Rt.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],_=0;_<h.length;_++)qi(h[_]);delete o.g[c],o.h--}}this.F=null},Rt.prototype.K=function(o,c,h,_){return this.i.add(String(o),c,!1,h,_)},Rt.prototype.L=function(o,c,h,_){return this.i.add(String(o),c,!0,h,_)};function ji(o,c,h,_){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var w=!0,R=0;R<c.length;++R){var D=c[R];if(D&&!D.da&&D.capture==h){var tt=D.listener,Et=D.ha||D.src;D.fa&&dr(o.i,D),w=tt.call(Et,_)!==!1&&w}}return w&&!_.defaultPrevented}function Ga(o,c,h){if(typeof o=="function")h&&(o=g(o,h));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function Ha(o){o.g=Ga(()=>{o.g=null,o.i&&(o.i=!1,Ha(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class gf extends _e{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ha(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fn(o){_e.call(this),this.h=o,this.g={}}S(Fn,_e);var Ka=[];function Qa(o){vt(o.g,function(c,h){this.g.hasOwnProperty(h)&&mr(c)},o),o.g={}}Fn.prototype.N=function(){Fn.aa.N.call(this),Qa(this)},Fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Er=l.JSON.stringify,yf=l.JSON.parse,vf=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Tr(){}Tr.prototype.h=null;function Ya(o){return o.h||(o.h=o.i())}function Xa(){}var Un={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ir(){At.call(this,"d")}S(Ir,At);function wr(){At.call(this,"c")}S(wr,At);var be={},Ja=null;function zi(){return Ja=Ja||new Rt}be.La="serverreachability";function Za(o){At.call(this,be.La,o)}S(Za,At);function Bn(o){const c=zi();Vt(c,new Za(c))}be.STAT_EVENT="statevent";function tl(o,c){At.call(this,be.STAT_EVENT,o),this.stat=c}S(tl,At);function xt(o){const c=zi();Vt(c,new tl(c,o))}be.Ma="timingevent";function el(o,c){At.call(this,be.Ma,o),this.size=c}S(el,At);function qn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function Wn(){this.g=!0}Wn.prototype.xa=function(){this.g=!1};function Ef(o,c,h,_,w,R){o.info(function(){if(o.g)if(R)for(var D="",tt=R.split("&"),Et=0;Et<tt.length;Et++){var Q=tt[Et].split("=");if(1<Q.length){var St=Q[0];Q=Q[1];var Pt=St.split("_");D=2<=Pt.length&&Pt[1]=="type"?D+(St+"="+Q+"&"):D+(St+"=redacted&")}}else D=null;else D=R;return"XMLHTTP REQ ("+_+") [attempt "+w+"]: "+c+`
`+h+`
`+D})}function Tf(o,c,h,_,w,R,D){o.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+w+"]: "+c+`
`+h+`
`+R+" "+D})}function Xe(o,c,h,_){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+wf(o,h)+(_?" "+_:"")})}function If(o,c){o.info(function(){return"TIMEOUT: "+c})}Wn.prototype.info=function(){};function wf(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var _=h[o];if(!(2>_.length)){var w=_[1];if(Array.isArray(w)&&!(1>w.length)){var R=w[0];if(R!="noop"&&R!="stop"&&R!="close")for(var D=1;D<w.length;D++)w[D]=""}}}}return Er(h)}catch{return c}}var $i={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},nl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Cr;function Gi(){}S(Gi,Tr),Gi.prototype.g=function(){return new XMLHttpRequest},Gi.prototype.i=function(){return{}},Cr=new Gi;function pe(o,c,h,_){this.j=o,this.i=c,this.l=h,this.R=_||1,this.U=new Fn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new il}function il(){this.i=null,this.g="",this.h=!1}var sl={},Ar={};function Rr(o,c,h){o.L=1,o.v=Yi(ne(c)),o.m=h,o.P=!0,rl(o,null)}function rl(o,c){o.F=Date.now(),Hi(o),o.A=ne(o.v);var h=o.A,_=o.R;Array.isArray(_)||(_=[String(_)]),vl(h.i,"t",_),o.C=0,h=o.j.J,o.h=new il,o.g=Ll(o.j,h?c:null,!o.m),0<o.O&&(o.M=new gf(g(o.Y,o,o.g),o.O)),c=o.U,h=o.g,_=o.ca;var w="readystatechange";Array.isArray(w)||(w&&(Ka[0]=w.toString()),w=Ka);for(var R=0;R<w.length;R++){var D=qa(h,w[R],_||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Bn(),Ef(o.i,o.u,o.A,o.l,o.R,o.m)}pe.prototype.ca=function(o){o=o.target;const c=this.M;c&&ie(o)==3?c.j():this.Y(o)},pe.prototype.Y=function(o){try{if(o==this.g)t:{const Pt=ie(this.g);var c=this.g.Ba();const tn=this.g.Z();if(!(3>Pt)&&(Pt!=3||this.g&&(this.h.h||this.g.oa()||Rl(this.g)))){this.J||Pt!=4||c==7||(c==8||0>=tn?Bn(3):Bn(2)),Sr(this);var h=this.g.Z();this.X=h;e:if(ol(this)){var _=Rl(this.g);o="";var w=_.length,R=ie(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ne(this),jn(this);var D="";break e}this.h.i=new l.TextDecoder}for(c=0;c<w;c++)this.h.h=!0,o+=this.h.i.decode(_[c],{stream:!(R&&c==w-1)});_.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Tf(this.i,this.u,this.A,this.l,this.R,Pt,h),this.o){if(this.T&&!this.K){e:{if(this.g){var tt,Et=this.g;if((tt=Et.g?Et.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(tt)){var Q=tt;break e}}Q=null}if(h=Q)Xe(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Pr(this,h);else{this.o=!1,this.s=3,xt(12),Ne(this),jn(this);break t}}if(this.P){h=!0;let qt;for(;!this.J&&this.C<D.length;)if(qt=Cf(this,D),qt==Ar){Pt==4&&(this.s=4,xt(14),h=!1),Xe(this.i,this.l,null,"[Incomplete Response]");break}else if(qt==sl){this.s=4,xt(15),Xe(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else Xe(this.i,this.l,qt,null),Pr(this,qt);if(ol(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Pt!=4||D.length!=0||this.h.h||(this.s=1,xt(16),h=!1),this.o=this.o&&h,!h)Xe(this.i,this.l,D,"[Invalid Chunked Response]"),Ne(this),jn(this);else if(0<D.length&&!this.W){this.W=!0;var St=this.j;St.g==this&&St.ba&&!St.M&&(St.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),xr(St),St.M=!0,xt(11))}}else Xe(this.i,this.l,D,null),Pr(this,D);Pt==4&&Ne(this),this.o&&!this.J&&(Pt==4?Vl(this.j,this):(this.o=!1,Hi(this)))}else qf(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,xt(12)):(this.s=0,xt(13)),Ne(this),jn(this)}}}catch{}finally{}};function ol(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Cf(o,c){var h=o.C,_=c.indexOf(`
`,h);return _==-1?Ar:(h=Number(c.substring(h,_)),isNaN(h)?sl:(_+=1,_+h>c.length?Ar:(c=c.slice(_,_+h),o.C=_+h,c)))}pe.prototype.cancel=function(){this.J=!0,Ne(this)};function Hi(o){o.S=Date.now()+o.I,al(o,o.I)}function al(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=qn(g(o.ba,o),c)}function Sr(o){o.B&&(l.clearTimeout(o.B),o.B=null)}pe.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(If(this.i,this.A),this.L!=2&&(Bn(),xt(17)),Ne(this),this.s=2,jn(this)):al(this,this.S-o)};function jn(o){o.j.G==0||o.J||Vl(o.j,o)}function Ne(o){Sr(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Qa(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Pr(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||br(h.h,o))){if(!o.K&&br(h.h,o)&&h.G==3){try{var _=h.Da.g.parse(c)}catch{_=null}if(Array.isArray(_)&&_.length==3){var w=_;if(w[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)ns(h),ts(h);else break t;Vr(h),xt(18)}}else h.za=w[1],0<h.za-h.T&&37500>w[2]&&h.F&&h.v==0&&!h.C&&(h.C=qn(g(h.Za,h),6e3));if(1>=ul(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else De(h,11)}else if((o.K||h.g==o)&&ns(h),!K(c))for(w=h.Da.g.parse(c),c=0;c<w.length;c++){let Q=w[c];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];const St=Q[3];St!=null&&(h.la=St,h.j.info("VER="+h.la));const Pt=Q[4];Pt!=null&&(h.Aa=Pt,h.j.info("SVER="+h.Aa));const tn=Q[5];tn!=null&&typeof tn=="number"&&0<tn&&(_=1.5*tn,h.L=_,h.j.info("backChannelRequestTimeoutMs_="+_)),_=h;const qt=o.g;if(qt){const ss=qt.g?qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ss){var R=_.h;R.g||ss.indexOf("spdy")==-1&&ss.indexOf("quic")==-1&&ss.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Nr(R,R.h),R.h=null))}if(_.D){const Or=qt.g?qt.g.getResponseHeader("X-HTTP-Session-Id"):null;Or&&(_.ya=Or,it(_.I,_.D,Or))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),_=h;var D=o;if(_.qa=Ml(_,_.J?_.ia:null,_.W),D.K){hl(_.h,D);var tt=D,Et=_.L;Et&&(tt.I=Et),tt.B&&(Sr(tt),Hi(tt)),_.g=D}else kl(_);0<h.i.length&&es(h)}else Q[0]!="stop"&&Q[0]!="close"||De(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?De(h,7):Dr(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Bn(4)}catch{}}var Af=class{constructor(o,c){this.g=o,this.map=c}};function ll(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function cl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function ul(o){return o.h?1:o.g?o.g.size:0}function br(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Nr(o,c){o.g?o.g.add(c):o.h=c}function hl(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}ll.prototype.cancel=function(){if(this.i=dl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function dl(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return V(o.i)}function Rf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],h=o.length,_=0;_<h;_++)c.push(o[_]);return c}c=[],h=0;for(_ in o)c[h++]=o[_];return c}function Sf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const _ in o)c[h++]=_;return c}}}function fl(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Sf(o),_=Rf(o),w=_.length,R=0;R<w;R++)c.call(void 0,_[R],h&&h[R],o)}var _l=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pf(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var _=o[h].indexOf("="),w=null;if(0<=_){var R=o[h].substring(0,_);w=o[h].substring(_+1)}else R=o[h];c(R,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function ke(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof ke){this.h=o.h,Ki(this,o.j),this.o=o.o,this.g=o.g,Qi(this,o.s),this.l=o.l;var c=o.i,h=new Gn;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),pl(this,h),this.m=o.m}else o&&(c=String(o).match(_l))?(this.h=!1,Ki(this,c[1]||"",!0),this.o=zn(c[2]||""),this.g=zn(c[3]||"",!0),Qi(this,c[4]),this.l=zn(c[5]||"",!0),pl(this,c[6]||"",!0),this.m=zn(c[7]||"")):(this.h=!1,this.i=new Gn(null,this.h))}ke.prototype.toString=function(){var o=[],c=this.j;c&&o.push($n(c,ml,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push($n(c,ml,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push($n(h,h.charAt(0)=="/"?kf:Nf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",$n(h,Vf)),o.join("")};function ne(o){return new ke(o)}function Ki(o,c,h){o.j=h?zn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Qi(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function pl(o,c,h){c instanceof Gn?(o.i=c,xf(o.i,o.h)):(h||(c=$n(c,Df)),o.i=new Gn(c,o.h))}function it(o,c,h){o.i.set(c,h)}function Yi(o){return it(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function zn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function $n(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,bf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function bf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var ml=/[#\/\?@]/g,Nf=/[#\?:]/g,kf=/[#\?]/g,Df=/[#\?@]/g,Vf=/#/g;function Gn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function me(o){o.g||(o.g=new Map,o.h=0,o.i&&Pf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Gn.prototype,n.add=function(o,c){me(this),this.i=null,o=Je(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function gl(o,c){me(o),c=Je(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function yl(o,c){return me(o),c=Je(o,c),o.g.has(c)}n.forEach=function(o,c){me(this),this.g.forEach(function(h,_){h.forEach(function(w){o.call(c,w,_,this)},this)},this)},n.na=function(){me(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let _=0;_<c.length;_++){const w=o[_];for(let R=0;R<w.length;R++)h.push(c[_])}return h},n.V=function(o){me(this);let c=[];if(typeof o=="string")yl(this,o)&&(c=c.concat(this.g.get(Je(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},n.set=function(o,c){return me(this),this.i=null,o=Je(this,o),yl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function vl(o,c,h){gl(o,c),0<h.length&&(o.i=null,o.g.set(Je(o,c),V(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var _=c[h];const R=encodeURIComponent(String(_)),D=this.V(_);for(_=0;_<D.length;_++){var w=R;D[_]!==""&&(w+="="+encodeURIComponent(String(D[_]))),o.push(w)}}return this.i=o.join("&")};function Je(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function xf(o,c){c&&!o.j&&(me(o),o.i=null,o.g.forEach(function(h,_){var w=_.toLowerCase();_!=w&&(gl(this,_),vl(this,w,h))},o)),o.j=c}function Of(o,c){const h=new Wn;if(l.Image){const _=new Image;_.onload=A(ge,h,"TestLoadImage: loaded",!0,c,_),_.onerror=A(ge,h,"TestLoadImage: error",!1,c,_),_.onabort=A(ge,h,"TestLoadImage: abort",!1,c,_),_.ontimeout=A(ge,h,"TestLoadImage: timeout",!1,c,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=o}else c(!1)}function Mf(o,c){const h=new Wn,_=new AbortController,w=setTimeout(()=>{_.abort(),ge(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:_.signal}).then(R=>{clearTimeout(w),R.ok?ge(h,"TestPingServer: ok",!0,c):ge(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(w),ge(h,"TestPingServer: error",!1,c)})}function ge(o,c,h,_,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),_(h)}catch{}}function Lf(){this.g=new vf}function Ff(o,c,h){const _=h||"";try{fl(o,function(w,R){let D=w;d(w)&&(D=Er(w)),c.push(_+R+"="+encodeURIComponent(D))})}catch(w){throw c.push(_+"type="+encodeURIComponent("_badmap")),w}}function Xi(o){this.l=o.Ub||null,this.j=o.eb||!1}S(Xi,Tr),Xi.prototype.g=function(){return new Ji(this.l,this.j)},Xi.prototype.i=function(o){return function(){return o}}({});function Ji(o,c){Rt.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Ji,Rt),n=Ji.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,Kn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Hn(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Kn(this)),this.g&&(this.readyState=3,Kn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;El(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function El(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Hn(this):Kn(this),this.readyState==3&&El(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Hn(this))},n.Qa=function(o){this.g&&(this.response=o,Hn(this))},n.ga=function(){this.g&&Hn(this)};function Hn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Kn(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Kn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ji.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Tl(o){let c="";return vt(o,function(h,_){c+=_,c+=":",c+=h,c+=`\r
`}),c}function kr(o,c,h){t:{for(_ in h){var _=!1;break t}_=!0}_||(h=Tl(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):it(o,c,h))}function ot(o){Rt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(ot,Rt);var Uf=/^https?$/i,Bf=["POST","PUT"];n=ot.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,h,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Cr.g(),this.v=this.o?Ya(this.o):Ya(Cr),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){Il(this,R);return}if(o=h||"",h=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var w in _)h.set(w,_[w]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const R of _.keys())h.set(R,_.get(R));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),w=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Bf,c,void 0))||_||w||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,D]of h)this.g.setRequestHeader(R,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Al(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Il(this,R)}};function Il(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,wl(o),Zi(o)}function wl(o){o.A||(o.A=!0,Vt(o,"complete"),Vt(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Vt(this,"complete"),Vt(this,"abort"),Zi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Zi(this,!0)),ot.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Cl(this):this.bb())},n.bb=function(){Cl(this)};function Cl(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ie(o)!=4||o.Z()!=2)){if(o.u&&ie(o)==4)Ga(o.Ea,0,o);else if(Vt(o,"readystatechange"),ie(o)==4){o.h=!1;try{const D=o.Z();t:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var _;if(_=D===0){var w=String(o.D).match(_l)[1]||null;!w&&l.self&&l.self.location&&(w=l.self.location.protocol.slice(0,-1)),_=!Uf.test(w?w.toLowerCase():"")}h=_}if(h)Vt(o,"complete"),Vt(o,"success");else{o.m=6;try{var R=2<ie(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",wl(o)}}finally{Zi(o)}}}}function Zi(o,c){if(o.g){Al(o);const h=o.g,_=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Vt(o,"ready");try{h.onreadystatechange=_}catch{}}}function Al(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ie(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ie(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),yf(c)}};function Rl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qf(o){const c={};o=(o.g&&2<=ie(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<o.length;_++){if(K(o[_]))continue;var h=T(o[_]);const w=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[w]||[];c[w]=R,R.push(h)}I(c,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Sl(o){this.Aa=0,this.i=[],this.j=new Wn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qn("baseRetryDelayMs",5e3,o),this.cb=Qn("retryDelaySeedMs",1e4,o),this.Wa=Qn("forwardChannelMaxRetries",2,o),this.wa=Qn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ll(o&&o.concurrentRequestLimit),this.Da=new Lf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Sl.prototype,n.la=8,n.G=1,n.connect=function(o,c,h,_){xt(0),this.W=o,this.H=c||{},h&&_!==void 0&&(this.H.OSID=h,this.H.OAID=_),this.F=this.X,this.I=Ml(this,null,this.W),es(this)};function Dr(o){if(Pl(o),o.G==3){var c=o.U++,h=ne(o.I);if(it(h,"SID",o.K),it(h,"RID",c),it(h,"TYPE","terminate"),Yn(o,h),c=new pe(o,o.j,c),c.L=2,c.v=Yi(ne(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=Ll(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Hi(c)}Ol(o)}function ts(o){o.g&&(xr(o),o.g.cancel(),o.g=null)}function Pl(o){ts(o),o.u&&(l.clearTimeout(o.u),o.u=null),ns(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function es(o){if(!cl(o.h)&&!o.s){o.s=!0;var c=o.Ga;xn||Ba(),On||(xn(),On=!0),hr.add(c,o),o.B=0}}function Wf(o,c){return ul(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=qn(g(o.Ga,o,c),xl(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const w=new pe(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(w.H=R,R=null),this.P)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var _=this.i[h];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break e}_=void 0}if(_===void 0)break;if(c+=_,4096<c){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=Nl(this,w,c),h=ne(this.I),it(h,"RID",o),it(h,"CVER",22),this.D&&it(h,"X-HTTP-Session-Id",this.D),Yn(this,h),R&&(this.O?c="headers="+encodeURIComponent(String(Tl(R)))+"&"+c:this.m&&kr(h,this.m,R)),Nr(this.h,w),this.Ua&&it(h,"TYPE","init"),this.P?(it(h,"$req",c),it(h,"SID","null"),w.T=!0,Rr(w,h,null)):Rr(w,h,c),this.G=2}}else this.G==3&&(o?bl(this,o):this.i.length==0||cl(this.h)||bl(this))};function bl(o,c){var h;c?h=c.l:h=o.U++;const _=ne(o.I);it(_,"SID",o.K),it(_,"RID",h),it(_,"AID",o.T),Yn(o,_),o.m&&o.o&&kr(_,o.m,o.o),h=new pe(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Nl(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Nr(o.h,h),Rr(h,_,c)}function Yn(o,c){o.H&&vt(o.H,function(h,_){it(c,_,h)}),o.l&&fl({},function(h,_){it(c,_,h)})}function Nl(o,c,h){h=Math.min(o.i.length,h);var _=o.l?g(o.l.Na,o.l,o):null;t:{var w=o.i;let R=-1;for(;;){const D=["count="+h];R==-1?0<h?(R=w[0].g,D.push("ofs="+R)):R=0:D.push("ofs="+R);let tt=!0;for(let Et=0;Et<h;Et++){let Q=w[Et].g;const St=w[Et].map;if(Q-=R,0>Q)R=Math.max(0,w[Et].g-100),tt=!1;else try{Ff(St,D,"req"+Q+"_")}catch{_&&_(St)}}if(tt){_=D.join("&");break t}}}return o=o.i.splice(0,h),c.D=o,_}function kl(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;xn||Ba(),On||(xn(),On=!0),hr.add(c,o),o.v=0}}function Vr(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=qn(g(o.Fa,o),xl(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Dl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=qn(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xt(10),ts(this),Dl(this))};function xr(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Dl(o){o.g=new pe(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=ne(o.qa);it(c,"RID","rpc"),it(c,"SID",o.K),it(c,"AID",o.T),it(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&it(c,"TO",o.ja),it(c,"TYPE","xmlhttp"),Yn(o,c),o.m&&o.o&&kr(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Yi(ne(c)),h.m=null,h.P=!0,rl(h,o)}n.Za=function(){this.C!=null&&(this.C=null,ts(this),Vr(this),xt(19))};function ns(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Vl(o,c){var h=null;if(o.g==c){ns(o),xr(o),o.g=null;var _=2}else if(br(o.h,c))h=c.D,hl(o.h,c),_=1;else return;if(o.G!=0){if(c.o)if(_==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var w=o.B;_=zi(),Vt(_,new el(_,h)),es(o)}else kl(o);else if(w=c.s,w==3||w==0&&0<c.X||!(_==1&&Wf(o,c)||_==2&&Vr(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),w){case 1:De(o,5);break;case 4:De(o,10);break;case 3:De(o,6);break;default:De(o,2)}}}function xl(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function De(o,c){if(o.j.info("Error code "+c),c==2){var h=g(o.fb,o),_=o.Xa;const w=!_;_=new ke(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ki(_,"https"),Yi(_),w?Of(_.toString(),h):Mf(_.toString(),h)}else xt(2);o.G=0,o.l&&o.l.sa(c),Ol(o),Pl(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),xt(2)):(this.j.info("Failed to ping google.com"),xt(1))};function Ol(o){if(o.G=0,o.ka=[],o.l){const c=dl(o.h);(c.length!=0||o.i.length!=0)&&(k(o.ka,c),k(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Ml(o,c,h){var _=h instanceof ke?ne(h):new ke(h);if(_.g!="")c&&(_.g=c+"."+_.g),Qi(_,_.s);else{var w=l.location;_=w.protocol,c=c?c+"."+w.hostname:w.hostname,w=+w.port;var R=new ke(null);_&&Ki(R,_),c&&(R.g=c),w&&Qi(R,w),h&&(R.l=h),_=R}return h=o.D,c=o.ya,h&&c&&it(_,h,c),it(_,"VER",o.la),Yn(o,_),_}function Ll(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new ot(new Xi({eb:h})):new ot(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fl(){}n=Fl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function is(){}is.prototype.g=function(o,c){return new Ut(o,c)};function Ut(o,c){Rt.call(this),this.g=new Sl(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!K(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!K(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Ze(this)}S(Ut,Rt),Ut.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ut.prototype.close=function(){Dr(this.g)},Ut.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Er(o),o=h);c.i.push(new Af(c.Ya++,o)),c.G==3&&es(c)},Ut.prototype.N=function(){this.g.l=null,delete this.j,Dr(this.g),delete this.g,Ut.aa.N.call(this)};function Ul(o){Ir.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}S(Ul,Ir);function Bl(){wr.call(this),this.status=1}S(Bl,wr);function Ze(o){this.g=o}S(Ze,Fl),Ze.prototype.ua=function(){Vt(this.g,"a")},Ze.prototype.ta=function(o){Vt(this.g,new Ul(o))},Ze.prototype.sa=function(o){Vt(this.g,new Bl)},Ze.prototype.ra=function(){Vt(this.g,"b")},is.prototype.createWebChannel=is.prototype.g,Ut.prototype.send=Ut.prototype.o,Ut.prototype.open=Ut.prototype.m,Ut.prototype.close=Ut.prototype.close,xu=function(){return new is},Vu=function(){return zi()},Du=be,Zr={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},$i.NO_ERROR=0,$i.TIMEOUT=8,$i.HTTP_ERROR=6,ds=$i,nl.COMPLETE="complete",ku=nl,Xa.EventType=Un,Un.OPEN="a",Un.CLOSE="b",Un.ERROR="c",Un.MESSAGE="d",Rt.prototype.listen=Rt.prototype.K,ni=Xa,ot.prototype.listenOnce=ot.prototype.L,ot.prototype.getLastError=ot.prototype.Ka,ot.prototype.getLastErrorCode=ot.prototype.Ba,ot.prototype.getStatus=ot.prototype.Z,ot.prototype.getResponseJson=ot.prototype.Oa,ot.prototype.getResponseText=ot.prototype.oa,ot.prototype.send=ot.prototype.ea,ot.prototype.setWithCredentials=ot.prototype.Ha,Nu=ot}).apply(typeof rs<"u"?rs:typeof self<"u"?self:typeof window<"u"?window:{});const Ql="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Nt.UNAUTHENTICATED=new Nt(null),Nt.GOOGLE_CREDENTIALS=new Nt("google-credentials-uid"),Nt.FIRST_PARTY=new Nt("first-party-uid"),Nt.MOCK_USER=new Nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new ko("@firebase/firestore");function Xn(){return qe.logLevel}function x(n,...t){if(qe.logLevel<=H.DEBUG){const e=t.map(Do);qe.debug(`Firestore (${Rn}): ${n}`,...e)}}function le(n,...t){if(qe.logLevel<=H.ERROR){const e=t.map(Do);qe.error(`Firestore (${Rn}): ${n}`,...e)}}function _n(n,...t){if(qe.logLevel<=H.WARN){const e=t.map(Do);qe.warn(`Firestore (${Rn}): ${n}`,...e)}}function Do(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n="Unexpected state"){const t=`FIRESTORE (${Rn}) INTERNAL ASSERTION FAILED: `+n;throw le(t),new Error(t)}function Z(n,t){n||F()}function B(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends An{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class cp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Nt.UNAUTHENTICATED))}shutdown(){}}class up{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class hp{constructor(t){this.t=t,this.currentUser=Nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Z(this.o===void 0);let i=this.i;const s=u=>this.i!==i?(i=this.i,e(u)):Promise.resolve();let r=new Ee;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Ee,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=r;t.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Ee)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(i=>this.i!==t?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Z(typeof i.accessToken=="string"),new Ou(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Z(t===null||typeof t=="string"),new Nt(t)}}class dp{constructor(t,e,i){this.l=t,this.h=e,this.P=i,this.type="FirstParty",this.user=Nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class fp{constructor(t,e,i){this.l=t,this.h=e,this.P=i}getToken(){return Promise.resolve(new dp(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(Nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class _p{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pp{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){Z(this.o===void 0);const i=r=>{r.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const a=r.token!==this.R;return this.R=r.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(r.token):Promise.resolve()};this.o=r=>{t.enqueueRetryable(()=>i(r))};const s=r=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?s(r):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Z(typeof e.token=="string"),this.R=e.token,new _p(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let i=0;i<n;i++)e[i]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let i="";for(;i.length<20;){const s=mp(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<e&&(i+=t.charAt(s[r]%t.length))}return i}}function Y(n,t){return n<t?-1:n>t?1:0}function pn(n,t,e){return n.length===t.length&&n.every((i,s)=>e(i,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return _t.fromMillis(Date.now())}static fromDate(t){return _t.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),i=Math.floor(1e6*(t-1e3*e));return new _t(e,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Y(this.nanoseconds,t.nanoseconds):Y(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(t){this.timestamp=t}static fromTimestamp(t){return new U(t)}static min(){return new U(new _t(0,0))}static max(){return new U(new _t(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(t,e,i){e===void 0?e=0:e>t.length&&F(),i===void 0?i=t.length-e:i>t.length-e&&F(),this.segments=t,this.offset=e,this.len=i}get length(){return this.len}isEqual(t){return mi.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof mi?t.forEach(i=>{e.push(i)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,i=this.limit();e<i;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const i=Math.min(t.length,e.length);for(let s=0;s<i;s++){const r=t.get(s),a=e.get(s);if(r<a)return-1;if(r>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class rt extends mi{construct(t,e,i){return new rt(t,e,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const i of t){if(i.indexOf("//")>=0)throw new O(b.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);e.push(...i.split("/").filter(s=>s.length>0))}return new rt(e)}static emptyPath(){return new rt([])}}const gp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class It extends mi{construct(t,e,i){return new It(t,e,i)}static isValidIdentifier(t){return gp.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),It.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new It(["__name__"])}static fromServerFormat(t){const e=[];let i="",s=0;const r=()=>{if(i.length===0)throw new O(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(i),i=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);i+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(i+=l,s++):(r(),s++)}if(r(),a)throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new It(e)}static emptyPath(){return new It([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(rt.fromString(t))}static fromName(t){return new M(rt.fromString(t).popFirst(5))}static empty(){return new M(rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return rt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new rt(t.slice()))}}function yp(n,t){const e=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=U.fromTimestamp(i===1e9?new _t(e+1,0):new _t(e,i));return new Ce(s,M.empty(),t)}function vp(n){return new Ce(n.readTime,n.key,-1)}class Ce{constructor(t,e,i){this.readTime=t,this.documentKey=e,this.largestBatchId=i}static min(){return new Ce(U.min(),M.empty(),-1)}static max(){return new Ce(U.max(),M.empty(),-1)}}function Ep(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:Y(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ip{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ni(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Tp)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new P((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(t,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(e,r).next(i,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof P?e:P.resolve(e)}catch(e){return P.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):P.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):P.reject(e)}static resolve(t){return new P((e,i)=>{e(t)})}static reject(t){return new P((e,i)=>{i(t)})}static waitFor(t){return new P((e,i)=>{let s=0,r=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++r,a&&r===s&&e()},u=>i(u))}),a=!0,r===s&&e()})}static or(t){let e=P.resolve(!1);for(const i of t)e=e.next(s=>s?P.resolve(s):i());return e}static forEach(t,e){const i=[];return t.forEach((s,r)=>{i.push(e.call(this,s,r))}),this.waitFor(i)}static mapArray(t,e){return new P((i,s)=>{const r=t.length,a=new Array(r);let l=0;for(let u=0;u<r;u++){const d=u;e(t[d]).next(f=>{a[d]=f,++l,l===r&&i(a)},f=>s(f))}})}static doWhile(t,e){return new P((i,s)=>{const r=()=>{t()===!0?e().next(()=>{r()},s):i()};r()})}}function wp(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function ki(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=i=>this.ie(i),this.se=i=>e.writeSequenceNumber(i))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}Vo.oe=-1;function zs(n){return n==null}function Es(n){return n===0&&1/n==-1/0}function Cp(n){return typeof n=="number"&&Number.isInteger(n)&&!Es(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Sn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Lu(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ht=class to{constructor(t,e){this.comparator=t,this.root=e||Te.EMPTY}insert(t,e){return new to(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Te.BLACK,null,null))}remove(t){return new to(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Te.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const i=this.comparator(t,e.key);if(i===0)return e.value;i<0?e=e.left:i>0&&(e=e.right)}return null}indexOf(t){let e=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(t,i.key);if(s===0)return e+i.left.size;s<0?i=i.left:(e+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,i)=>(t(e,i),!1))}toString(){const t=[];return this.inorderTraversal((e,i)=>(t.push(`${e}:${i}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new os(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new os(this.root,t,this.comparator,!1)}getReverseIterator(){return new os(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new os(this.root,t,this.comparator,!0)}},os=class{constructor(t,e,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?i(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(r===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}},Te=class se{constructor(t,e,i,s,r){this.key=t,this.value=e,this.color=i??se.RED,this.left=s??se.EMPTY,this.right=r??se.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,i,s,r){return new se(t??this.key,e??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,i){let s=this;const r=i(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,i),null):r===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return se.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let i,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return se.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const t=this.left.check();if(t!==this.right.check())throw F();return t+(this.isRed()?0:1)}};Te.EMPTY=null,Te.RED=!0,Te.BLACK=!1;Te.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(t,e,i,s,r){return this}insert(t,e,i){return new Te(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.comparator=t,this.data=new ht(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,i)=>(t(e),!1))}forEachInRange(t,e){const i=this.data.getIteratorFrom(t[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let i;for(i=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();i.hasNext();)if(!t(i.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Xl(this.data.getIterator())}getIteratorFrom(t){return new Xl(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(i=>{e=e.add(i)}),e}isEqual(t){if(!(t instanceof wt)||this.size!==t.size)return!1;const e=this.data.getIterator(),i=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new wt(this.comparator);return e.data=t,e}}class Xl{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t){this.fields=t,t.sort(It.comparator)}static empty(){return new jt([])}unionWith(t){let e=new wt(It.comparator);for(const i of this.fields)e=e.add(i);for(const i of t)e=e.add(i);return new jt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return pn(this.fields,t.fields,(e,i)=>e.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Fu("Invalid base64 string: "+r):r}}(t);return new Ct(e)}static fromUint8Array(t){const e=function(s){let r="";for(let a=0;a<s.length;++a)r+=String.fromCharCode(s[a]);return r}(t);return new Ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const i=new Uint8Array(e.length);for(let s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Y(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ct.EMPTY_BYTE_STRING=new Ct("");const Ap=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ae(n){if(Z(!!n),typeof n=="string"){let t=0;const e=Ap.exec(n);if(Z(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:lt(n.seconds),nanos:lt(n.nanos)}}function lt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function We(n){return typeof n=="string"?Ct.fromBase64String(n):Ct.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function Oo(n){const t=n.mapValue.fields.__previous_value__;return xo(t)?Oo(t):t}function gi(n){const t=Ae(n.mapValue.fields.__local_write_time__.timestampValue);return new _t(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t,e,i,s,r,a,l,u,d){this.databaseId=t,this.appId=e,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class yi{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new yi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof yi&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function je(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?xo(n)?4:Pp(n)?9007199254740991:Sp(n)?10:11:F()}function Jt(n,t){if(n===t)return!0;const e=je(n);if(e!==je(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return gi(n).isEqual(gi(t));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const a=Ae(s.timestampValue),l=Ae(r.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,r){return We(s.bytesValue).isEqual(We(r.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,r){return lt(s.geoPointValue.latitude)===lt(r.geoPointValue.latitude)&&lt(s.geoPointValue.longitude)===lt(r.geoPointValue.longitude)}(n,t);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return lt(s.integerValue)===lt(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const a=lt(s.doubleValue),l=lt(r.doubleValue);return a===l?Es(a)===Es(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return pn(n.arrayValue.values||[],t.arrayValue.values||[],Jt);case 10:case 11:return function(s,r){const a=s.mapValue.fields||{},l=r.mapValue.fields||{};if(Yl(a)!==Yl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Jt(a[u],l[u])))return!1;return!0}(n,t);default:return F()}}function vi(n,t){return(n.values||[]).find(e=>Jt(e,t))!==void 0}function mn(n,t){if(n===t)return 0;const e=je(n),i=je(t);if(e!==i)return Y(e,i);switch(e){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,t.booleanValue);case 2:return function(r,a){const l=lt(r.integerValue||r.doubleValue),u=lt(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,t);case 3:return Jl(n.timestampValue,t.timestampValue);case 4:return Jl(gi(n),gi(t));case 5:return Y(n.stringValue,t.stringValue);case 6:return function(r,a){const l=We(r),u=We(a);return l.compareTo(u)}(n.bytesValue,t.bytesValue);case 7:return function(r,a){const l=r.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const f=Y(l[d],u[d]);if(f!==0)return f}return Y(l.length,u.length)}(n.referenceValue,t.referenceValue);case 8:return function(r,a){const l=Y(lt(r.latitude),lt(a.latitude));return l!==0?l:Y(lt(r.longitude),lt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Zl(n.arrayValue,t.arrayValue);case 10:return function(r,a){var l,u,d,f;const p=r.fields||{},g=a.fields||{},A=(l=p.value)===null||l===void 0?void 0:l.arrayValue,S=(u=g.value)===null||u===void 0?void 0:u.arrayValue,V=Y(((d=A?.values)===null||d===void 0?void 0:d.length)||0,((f=S?.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Zl(A,S)}(n.mapValue,t.mapValue);case 11:return function(r,a){if(r===as.mapValue&&a===as.mapValue)return 0;if(r===as.mapValue)return 1;if(a===as.mapValue)return-1;const l=r.fields||{},u=Object.keys(l),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=Y(u[p],f[p]);if(g!==0)return g;const A=mn(l[u[p]],d[f[p]]);if(A!==0)return A}return Y(u.length,f.length)}(n.mapValue,t.mapValue);default:throw F()}}function Jl(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return Y(n,t);const e=Ae(n),i=Ae(t),s=Y(e.seconds,i.seconds);return s!==0?s:Y(e.nanos,i.nanos)}function Zl(n,t){const e=n.values||[],i=t.values||[];for(let s=0;s<e.length&&s<i.length;++s){const r=mn(e[s],i[s]);if(r)return r}return Y(e.length,i.length)}function gn(n){return eo(n)}function eo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const i=Ae(e);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return We(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let i="[",s=!0;for(const r of e.values||[])s?s=!1:i+=",",i+=eo(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(e){const i=Object.keys(e.fields||{}).sort();let s="{",r=!0;for(const a of i)r?r=!1:s+=",",s+=`${a}:${eo(e.fields[a])}`;return s+"}"}(n.mapValue):F()}function no(n){return!!n&&"integerValue"in n}function Mo(n){return!!n&&"arrayValue"in n}function tc(n){return!!n&&"nullValue"in n}function ec(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function fs(n){return!!n&&"mapValue"in n}function Sp(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function ri(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Sn(n.mapValue.fields,(e,i)=>t.mapValue.fields[e]=ri(i)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=ri(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Pp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t){this.value=t}static empty(){return new Bt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let i=0;i<t.length-1;++i)if(e=(e.mapValue.fields||{})[t.get(i)],!fs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ri(e)}setAll(t){let e=It.emptyPath(),i={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const u=this.getFieldsMap(e);this.applyChanges(u,i,s),i={},s=[],e=l.popLast()}a?i[l.lastSegment()]=ri(a):s.push(l.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,i,s)}delete(t){const e=this.field(t.popLast());fs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Jt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let i=0;i<t.length;++i){let s=e.mapValue.fields[t.get(i)];fs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(i)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,i){Sn(e,(s,r)=>t[s]=r);for(const s of i)delete t[s]}clone(){return new Bt(ri(this.value))}}function Uu(n){const t=[];return Sn(n.fields,(e,i)=>{const s=new It([e]);if(fs(i)){const r=Uu(i.mapValue).fields;if(r.length===0)t.push(s);else for(const a of r)t.push(s.child(a))}else t.push(s)}),new jt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,e,i,s,r,a,l){this.key=t,this.documentType=e,this.version=i,this.readTime=s,this.createTime=r,this.data=a,this.documentState=l}static newInvalidDocument(t){return new kt(t,0,U.min(),U.min(),U.min(),Bt.empty(),0)}static newFoundDocument(t,e,i,s){return new kt(t,1,e,U.min(),i,s,0)}static newNoDocument(t,e){return new kt(t,2,e,U.min(),U.min(),Bt.empty(),0)}static newUnknownDocument(t,e){return new kt(t,3,e,U.min(),U.min(),Bt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Bt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof kt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new kt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(t,e){this.position=t,this.inclusive=e}}function nc(n,t,e){let i=0;for(let s=0;s<n.position.length;s++){const r=t[s],a=n.position[s];if(r.field.isKeyField()?i=M.comparator(M.fromName(a.referenceValue),e.key):i=mn(a,e.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function ic(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Jt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(t,e="asc"){this.field=t,this.dir=e}}function bp(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{}class dt extends Bu{constructor(t,e,i){super(),this.field=t,this.op=e,this.value=i}static create(t,e,i){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,i):new kp(t,e,i):e==="array-contains"?new xp(t,i):e==="in"?new Op(t,i):e==="not-in"?new Mp(t,i):e==="array-contains-any"?new Lp(t,i):new dt(t,e,i)}static createKeyFieldInFilter(t,e,i){return e==="in"?new Dp(t,i):new Vp(t,i)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(mn(e,this.value)):e!==null&&je(this.value)===je(e)&&this.matchesComparison(mn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zt extends Bu{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Zt(t,e)}matches(t){return qu(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function qu(n){return n.op==="and"}function Wu(n){return Np(n)&&qu(n)}function Np(n){for(const t of n.filters)if(t instanceof Zt)return!1;return!0}function io(n){if(n instanceof dt)return n.field.canonicalString()+n.op.toString()+gn(n.value);if(Wu(n))return n.filters.map(t=>io(t)).join(",");{const t=n.filters.map(e=>io(e)).join(",");return`${n.op}(${t})`}}function ju(n,t){return n instanceof dt?function(i,s){return s instanceof dt&&i.op===s.op&&i.field.isEqual(s.field)&&Jt(i.value,s.value)}(n,t):n instanceof Zt?function(i,s){return s instanceof Zt&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,a,l)=>r&&ju(a,s.filters[l]),!0):!1}(n,t):void F()}function zu(n){return n instanceof dt?function(e){return`${e.field.canonicalString()} ${e.op} ${gn(e.value)}`}(n):n instanceof Zt?function(e){return e.op.toString()+" {"+e.getFilters().map(zu).join(" ,")+"}"}(n):"Filter"}class kp extends dt{constructor(t,e,i){super(t,e,i),this.key=M.fromName(i.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Dp extends dt{constructor(t,e){super(t,"in",e),this.keys=$u("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Vp extends dt{constructor(t,e){super(t,"not-in",e),this.keys=$u("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function $u(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(i=>M.fromName(i.referenceValue))}class xp extends dt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Mo(e)&&vi(e.arrayValue,this.value)}}class Op extends dt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&vi(this.value.arrayValue,e)}}class Mp extends dt{constructor(t,e){super(t,"not-in",e)}matches(t){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!vi(this.value.arrayValue,e)}}class Lp extends dt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Mo(e)||!e.arrayValue.values)&&e.arrayValue.values.some(i=>vi(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(t,e=null,i=[],s=[],r=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=a,this.endAt=l,this.ue=null}}function sc(n,t=null,e=[],i=[],s=null,r=null,a=null){return new Fp(n,t,e,i,s,r,a)}function Lo(n){const t=B(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(i=>io(i)).join(","),e+="|ob:",e+=t.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),zs(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(i=>gn(i)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(i=>gn(i)).join(",")),t.ue=e}return t.ue}function Fo(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!bp(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!ju(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!ic(n.startAt,t.startAt)&&ic(n.endAt,t.endAt)}function so(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(t,e=null,i=[],s=[],r=null,a="F",l=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Up(n,t,e,i,s,r,a,l){return new $s(n,t,e,i,s,r,a,l)}function Gu(n){return new $s(n)}function rc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Bp(n){return n.collectionGroup!==null}function oi(n){const t=B(n);if(t.ce===null){t.ce=[];const e=new Set;for(const r of t.explicitOrderBy)t.ce.push(r),e.add(r.field.canonicalString());const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new wt(It.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.ce.push(new Is(r,i))}),e.has(It.keyField().canonicalString())||t.ce.push(new Is(It.keyField(),i))}return t.ce}function Kt(n){const t=B(n);return t.le||(t.le=qp(t,oi(n))),t.le}function qp(n,t){if(n.limitType==="F")return sc(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new Is(s.field,r)});const e=n.endAt?new Ts(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Ts(n.startAt.position,n.startAt.inclusive):null;return sc(n.path,n.collectionGroup,t,n.filters,n.limit,e,i)}}function ro(n,t,e){return new $s(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Gs(n,t){return Fo(Kt(n),Kt(t))&&n.limitType===t.limitType}function Hu(n){return`${Lo(Kt(n))}|lt:${n.limitType}`}function nn(n){return`Query(target=${function(e){let i=e.path.canonicalString();return e.collectionGroup!==null&&(i+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(i+=`, filters: [${e.filters.map(s=>zu(s)).join(", ")}]`),zs(e.limit)||(i+=", limit: "+e.limit),e.orderBy.length>0&&(i+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(i+=", startAt: ",i+=e.startAt.inclusive?"b:":"a:",i+=e.startAt.position.map(s=>gn(s)).join(",")),e.endAt&&(i+=", endAt: ",i+=e.endAt.inclusive?"a:":"b:",i+=e.endAt.position.map(s=>gn(s)).join(",")),`Target(${i})`}(Kt(n))}; limitType=${n.limitType})`}function Hs(n,t){return t.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):M.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,t)&&function(i,s){for(const r of oi(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,t)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,t)&&function(i,s){return!(i.startAt&&!function(a,l,u){const d=nc(a,l,u);return a.inclusive?d<=0:d<0}(i.startAt,oi(i),s)||i.endAt&&!function(a,l,u){const d=nc(a,l,u);return a.inclusive?d>=0:d>0}(i.endAt,oi(i),s))}(n,t)}function Wp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ku(n){return(t,e)=>{let i=!1;for(const s of oi(n)){const r=jp(s,t,e);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function jp(n,t,e){const i=n.field.isKeyField()?M.comparator(t.key,e.key):function(r,a,l){const u=a.data.field(r),d=l.data.field(r);return u!==null&&d!==null?mn(u,d):F()}(n.field,t,e);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return F()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,t))return r}}has(t){return this.get(t)!==void 0}set(t,e){const i=this.mapKeyFn(t),s=this.inner[i];if(s===void 0)return this.inner[i]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],t))return i.length===1?delete this.inner[e]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Sn(this.inner,(e,i)=>{for(const[s,r]of i)t(s,r)})}isEmpty(){return Lu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp=new ht(M.comparator);function ce(){return zp}const Qu=new ht(M.comparator);function ii(...n){let t=Qu;for(const e of n)t=t.insert(e.key,e);return t}function Yu(n){let t=Qu;return n.forEach((e,i)=>t=t.insert(e,i.overlayedDocument)),t}function Oe(){return ai()}function Xu(){return ai()}function ai(){return new Pn(n=>n.toString(),(n,t)=>n.isEqual(t))}const $p=new ht(M.comparator),Gp=new wt(M.comparator);function z(...n){let t=Gp;for(const e of n)t=t.add(e);return t}const Hp=new wt(Y);function Kp(){return Hp}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Es(t)?"-0":t}}function Ju(n){return{integerValue:""+n}}function Qp(n,t){return Cp(t)?Ju(t):Uo(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(){this._=void 0}}function Yp(n,t,e){return n instanceof ws?function(s,r){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&xo(r)&&(r=Oo(r)),r&&(a.fields.__previous_value__=r),{mapValue:a}}(e,t):n instanceof Ei?th(n,t):n instanceof Ti?eh(n,t):function(s,r){const a=Zu(s,r),l=oc(a)+oc(s.Pe);return no(a)&&no(s.Pe)?Ju(l):Uo(s.serializer,l)}(n,t)}function Xp(n,t,e){return n instanceof Ei?th(n,t):n instanceof Ti?eh(n,t):e}function Zu(n,t){return n instanceof Cs?function(i){return no(i)||function(r){return!!r&&"doubleValue"in r}(i)}(t)?t:{integerValue:0}:null}class ws extends Ks{}class Ei extends Ks{constructor(t){super(),this.elements=t}}function th(n,t){const e=nh(t);for(const i of n.elements)e.some(s=>Jt(s,i))||e.push(i);return{arrayValue:{values:e}}}class Ti extends Ks{constructor(t){super(),this.elements=t}}function eh(n,t){let e=nh(t);for(const i of n.elements)e=e.filter(s=>!Jt(s,i));return{arrayValue:{values:e}}}class Cs extends Ks{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function oc(n){return lt(n.integerValue||n.doubleValue)}function nh(n){return Mo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Jp(n,t){return n.field.isEqual(t.field)&&function(i,s){return i instanceof Ei&&s instanceof Ei||i instanceof Ti&&s instanceof Ti?pn(i.elements,s.elements,Jt):i instanceof Cs&&s instanceof Cs?Jt(i.Pe,s.Pe):i instanceof ws&&s instanceof ws}(n.transform,t.transform)}class Zp{constructor(t,e){this.version=t,this.transformResults=e}}class Qt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Qt}static exists(t){return new Qt(void 0,t)}static updateTime(t){return new Qt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function _s(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Qs{}function ih(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Bo(n.key,Qt.none()):new Di(n.key,n.data,Qt.none());{const e=n.data,i=Bt.empty();let s=new wt(It.comparator);for(let r of t.fields)if(!s.has(r)){let a=e.field(r);a===null&&r.length>1&&(r=r.popLast(),a=e.field(r)),a===null?i.delete(r):i.set(r,a),s=s.add(r)}return new Ke(n.key,i,new jt(s.toArray()),Qt.none())}}function tm(n,t,e){n instanceof Di?function(s,r,a){const l=s.value.clone(),u=lc(s.fieldTransforms,r,a.transformResults);l.setAll(u),r.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Ke?function(s,r,a){if(!_s(s.precondition,r))return void r.convertToUnknownDocument(a.version);const l=lc(s.fieldTransforms,r,a.transformResults),u=r.data;u.setAll(sh(s)),u.setAll(l),r.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,t,e):function(s,r,a){r.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function li(n,t,e,i){return n instanceof Di?function(r,a,l,u){if(!_s(r.precondition,a))return l;const d=r.value.clone(),f=cc(r.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,i):n instanceof Ke?function(r,a,l,u){if(!_s(r.precondition,a))return l;const d=cc(r.fieldTransforms,u,a),f=a.data;return f.setAll(sh(r)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(n,t,e,i):function(r,a,l){return _s(r.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function em(n,t){let e=null;for(const i of n.fieldTransforms){const s=t.data.field(i.field),r=Zu(i.transform,s||null);r!=null&&(e===null&&(e=Bt.empty()),e.set(i.field,r))}return e||null}function ac(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&pn(i,s,(r,a)=>Jp(r,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Di extends Qs{constructor(t,e,i,s=[]){super(),this.key=t,this.value=e,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ke extends Qs{constructor(t,e,i,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function sh(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const i=n.data.field(e);t.set(e,i)}}),t}function lc(n,t,e){const i=new Map;Z(n.length===e.length);for(let s=0;s<e.length;s++){const r=n[s],a=r.transform,l=t.data.field(r.field);i.set(r.field,Xp(a,l,e[s]))}return i}function cc(n,t,e){const i=new Map;for(const s of n){const r=s.transform,a=e.data.field(s.field);i.set(s.field,Yp(r,a,t))}return i}class Bo extends Qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nm extends Qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(t,e,i,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(t,e){const i=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(t.key)&&tm(r,t,i[s])}}applyToLocalView(t,e){for(const i of this.baseMutations)i.key.isEqual(t.key)&&(e=li(i,t,e,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(t.key)&&(e=li(i,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const i=Xu();return this.mutations.forEach(s=>{const r=t.get(s.key),a=r.overlayedDocument;let l=this.applyToLocalView(a,r.mutatedFields);l=e.has(s.key)?null:l;const u=ih(a,l);u!==null&&i.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(U.min())}),i}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),z())}isEqual(t){return this.batchId===t.batchId&&pn(this.mutations,t.mutations,(e,i)=>ac(e,i))&&pn(this.baseMutations,t.baseMutations,(e,i)=>ac(e,i))}}class qo{constructor(t,e,i,s){this.batch=t,this.commitVersion=e,this.mutationResults=i,this.docVersions=s}static from(t,e,i){Z(t.mutations.length===i.length);let s=function(){return $p}();const r=t.mutations;for(let a=0;a<r.length;a++)s=s.insert(r[a].key,i[a].version);return new qo(t,e,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ut,G;function om(n){switch(n){default:return F();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0}}function rh(n){if(n===void 0)return le("GRPC error has no .code"),b.UNKNOWN;switch(n){case ut.OK:return b.OK;case ut.CANCELLED:return b.CANCELLED;case ut.UNKNOWN:return b.UNKNOWN;case ut.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ut.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ut.INTERNAL:return b.INTERNAL;case ut.UNAVAILABLE:return b.UNAVAILABLE;case ut.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ut.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ut.NOT_FOUND:return b.NOT_FOUND;case ut.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ut.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ut.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ut.ABORTED:return b.ABORTED;case ut.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ut.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ut.DATA_LOSS:return b.DATA_LOSS;default:return F()}}(G=ut||(ut={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm=new Ue([4294967295,4294967295],0);function uc(n){const t=am().encode(n),e=new bu;return e.update(t),new Uint8Array(e.digest())}function hc(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),r=t.getUint32(12,!0);return[new Ue([e,i],0),new Ue([s,r],0)]}class Wo{constructor(t,e,i){if(this.bitmap=t,this.padding=e,this.hashCount=i,e<0||e>=8)throw new si(`Invalid padding: ${e}`);if(i<0)throw new si(`Invalid hash count: ${i}`);if(t.length>0&&this.hashCount===0)throw new si(`Invalid hash count: ${i}`);if(t.length===0&&e!==0)throw new si(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=Ue.fromNumber(this.Ie)}Ee(t,e,i){let s=t.add(e.multiply(Ue.fromNumber(i)));return s.compare(lm)===1&&(s=new Ue([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=uc(t),[i,s]=hc(e);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);if(!this.de(a))return!1}return!0}static create(t,e,i){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),a=new Wo(r,s,e);return i.forEach(l=>a.insert(l)),a}insert(t){if(this.Ie===0)return;const e=uc(t),[i,s]=hc(e);for(let r=0;r<this.hashCount;r++){const a=this.Ee(i,s,r);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),i=t%8;this.bitmap[e]|=1<<i}}class si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(t,e,i,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,i){const s=new Map;return s.set(t,Vi.createSynthesizedTargetChangeForCurrentChange(t,e,i)),new Ys(U.min(),s,new ht(Y),ce(),z())}}class Vi{constructor(t,e,i,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,i){return new Vi(i,e,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(t,e,i,s){this.Re=t,this.removedTargetIds=e,this.key=i,this.Ve=s}}class oh{constructor(t,e){this.targetId=t,this.me=e}}class ah{constructor(t,e,i=Ct.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=i,this.cause=s}}class dc{constructor(){this.fe=0,this.ge=_c(),this.pe=Ct.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=z(),e=z(),i=z();return this.ge.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:i=i.add(s);break;default:F()}}),new Vi(this.pe,this.ye,t,e,i)}Ce(){this.we=!1,this.ge=_c()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,Z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class cm{constructor(t){this.Le=t,this.Be=new Map,this.ke=ce(),this.qe=fc(),this.Qe=new ht(Y)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const i=this.Ge(e);switch(t.state){case 0:this.ze(e)&&i.De(t.resumeToken);break;case 1:i.Oe(),i.Se||i.Ce(),i.De(t.resumeToken);break;case 2:i.Oe(),i.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(i.Ne(),i.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),i.De(t.resumeToken));break;default:F()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((i,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,i=t.me.count,s=this.Je(e);if(s){const r=s.target;if(so(r))if(i===0){const a=new M(r.path);this.Ue(e,a,kt.newNoDocument(a,U.min()))}else Z(i===1);else{const a=this.Ye(e);if(a!==i){const l=this.Ze(t),u=l?this.Xe(l,t,a):1;if(u!==0){this.je(e);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,d)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=e;let a,l;try{a=We(i).toUint8Array()}catch(u){if(u instanceof Fu)return _n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Wo(a,s,r)}catch(u){return _n(u instanceof si?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(t,e,i){return e.me.count===i-this.nt(t,e.targetId)?0:2}nt(t,e){const i=this.Le.getRemoteKeysForTarget(e);let s=0;return i.forEach(r=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${r.path.canonicalString()}`;t.mightContain(l)||(this.Ue(e,r,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((r,a)=>{const l=this.Je(a);if(l){if(r.current&&so(l.target)){const u=new M(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,kt.newNoDocument(u,t))}r.be&&(e.set(a,r.ve()),r.Ce())}});let i=z();this.qe.forEach((r,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(r))}),this.ke.forEach((r,a)=>a.setReadTime(t));const s=new Ys(t,e,this.Qe,this.ke,i);return this.ke=ce(),this.qe=fc(),this.Qe=new ht(Y),s}$e(t,e){if(!this.ze(t))return;const i=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,i),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,i){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),i&&(this.ke=this.ke.insert(e,i))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new dc,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new wt(Y),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||x("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new dc),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function fc(){return new ht(M.comparator)}function _c(){return new ht(M.comparator)}const um=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),hm=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),dm=(()=>({and:"AND",or:"OR"}))();class fm{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function oo(n,t){return n.useProto3Json||zs(t)?t:{value:t}}function As(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function lh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function _m(n,t){return As(n,t.toTimestamp())}function Yt(n){return Z(!!n),U.fromTimestamp(function(e){const i=Ae(e);return new _t(i.seconds,i.nanos)}(n))}function jo(n,t){return ao(n,t).canonicalString()}function ao(n,t){const e=function(s){return new rt(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function ch(n){const t=rt.fromString(n);return Z(_h(t)),t}function lo(n,t){return jo(n.databaseId,t.path)}function Lr(n,t){const e=ch(t);if(e.get(1)!==n.databaseId.projectId)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M(hh(e))}function uh(n,t){return jo(n.databaseId,t)}function pm(n){const t=ch(n);return t.length===4?rt.emptyPath():hh(t)}function co(n){return new rt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function hh(n){return Z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function pc(n,t,e){return{name:lo(n,t),fields:e.value.mapValue.fields}}function mm(n,t){let e;if("targetChange"in t){t.targetChange;const i=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:F()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],r=function(d,f){return d.useProto3Json?(Z(f===void 0||typeof f=="string"),Ct.fromBase64String(f||"")):(Z(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Ct.fromUint8Array(f||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(d){const f=d.code===void 0?b.UNKNOWN:rh(d.code);return new O(f,d.message||"")}(a);e=new ah(i,s,r,l||null)}else if("documentChange"in t){t.documentChange;const i=t.documentChange;i.document,i.document.name,i.document.updateTime;const s=Lr(n,i.document.name),r=Yt(i.document.updateTime),a=i.document.createTime?Yt(i.document.createTime):U.min(),l=new Bt({mapValue:{fields:i.document.fields}}),u=kt.newFoundDocument(s,r,a,l),d=i.targetIds||[],f=i.removedTargetIds||[];e=new ps(d,f,u.key,u)}else if("documentDelete"in t){t.documentDelete;const i=t.documentDelete;i.document;const s=Lr(n,i.document),r=i.readTime?Yt(i.readTime):U.min(),a=kt.newNoDocument(s,r),l=i.removedTargetIds||[];e=new ps([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const i=t.documentRemove;i.document;const s=Lr(n,i.document),r=i.removedTargetIds||[];e=new ps([],r,s,null)}else{if(!("filter"in t))return F();{t.filter;const i=t.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,a=new rm(s,r),l=i.targetId;e=new oh(l,a)}}return e}function gm(n,t){let e;if(t instanceof Di)e={update:pc(n,t.key,t.value)};else if(t instanceof Bo)e={delete:lo(n,t.key)};else if(t instanceof Ke)e={update:pc(n,t.key,t.data),updateMask:Rm(t.fieldMask)};else{if(!(t instanceof nm))return F();e={verify:lo(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(i=>function(r,a){const l=a.transform;if(l instanceof ws)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ei)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ti)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Cs)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw F()}(0,i))),t.precondition.isNone||(e.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:_m(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F()}(n,t.precondition)),e}function ym(n,t){return n&&n.length>0?(Z(t!==void 0),n.map(e=>function(s,r){let a=s.updateTime?Yt(s.updateTime):Yt(r);return a.isEqual(U.min())&&(a=Yt(r)),new Zp(a,s.transformResults||[])}(e,t))):[]}function vm(n,t){return{documents:[uh(n,t.path)]}}function Em(n,t){const e={structuredQuery:{}},i=t.path;let s;t.collectionGroup!==null?(s=i,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=i.popLast(),e.structuredQuery.from=[{collectionId:i.lastSegment()}]),e.parent=uh(n,s);const r=function(d){if(d.length!==0)return fh(Zt.create(d,"and"))}(t.filters);r&&(e.structuredQuery.where=r);const a=function(d){if(d.length!==0)return d.map(f=>function(g){return{field:sn(g.field),direction:wm(g.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=oo(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{_t:e,parent:s}}function Tm(n){let t=pm(n.parent);const e=n.structuredQuery,i=e.from?e.from.length:0;let s=null;if(i>0){Z(i===1);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let r=[];e.where&&(r=function(p){const g=dh(p);return g instanceof Zt&&Wu(g)?g.getFilters():[g]}(e.where));let a=[];e.orderBy&&(a=function(p){return p.map(g=>function(S){return new Is(rn(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(g))}(e.orderBy));let l=null;e.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,zs(g)?null:g}(e.limit));let u=null;e.startAt&&(u=function(p){const g=!!p.before,A=p.values||[];return new Ts(A,g)}(e.startAt));let d=null;return e.endAt&&(d=function(p){const g=!p.before,A=p.values||[];return new Ts(A,g)}(e.endAt)),Up(t,s,a,r,l,"F",u,d)}function Im(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function dh(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const i=rn(e.unaryFilter.field);return dt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=rn(e.unaryFilter.field);return dt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=rn(e.unaryFilter.field);return dt.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=rn(e.unaryFilter.field);return dt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return F()}}(n):n.fieldFilter!==void 0?function(e){return dt.create(rn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Zt.create(e.compositeFilter.filters.map(i=>dh(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}}(e.compositeFilter.op))}(n):F()}function wm(n){return um[n]}function Cm(n){return hm[n]}function Am(n){return dm[n]}function sn(n){return{fieldPath:n.canonicalString()}}function rn(n){return It.fromServerFormat(n.fieldPath)}function fh(n){return n instanceof dt?function(e){if(e.op==="=="){if(ec(e.value))return{unaryFilter:{field:sn(e.field),op:"IS_NAN"}};if(tc(e.value))return{unaryFilter:{field:sn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ec(e.value))return{unaryFilter:{field:sn(e.field),op:"IS_NOT_NAN"}};if(tc(e.value))return{unaryFilter:{field:sn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:sn(e.field),op:Cm(e.op),value:e.value}}}(n):n instanceof Zt?function(e){const i=e.getFilters().map(s=>fh(s));return i.length===1?i[0]:{compositeFilter:{op:Am(e.op),filters:i}}}(n):F()}function Rm(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function _h(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(t,e,i,s,r=U.min(),a=U.min(),l=Ct.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(t){return new ye(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new ye(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new ye(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new ye(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(t){this.ct=t}}function Pm(n){const t=Tm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ro(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(){this.un=new Nm}addToCollectionParentIndex(t,e){return this.un.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(Ce.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(Ce.min())}updateCollectionGroup(t,e,i){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}}class Nm{constructor(){this.index={}}add(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e]||new wt(rt.comparator),r=!s.has(i);return this.index[e]=s.add(i),r}has(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e];return s&&s.has(i)}getEntries(t){return(this.index[t]||new wt(rt.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new yn(0)}static kn(){return new yn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(){this.changes=new Pn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,kt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const i=this.changes.get(e);return i!==void 0?P.resolve(i):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(t,e,i,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=i,this.indexManager=s}getDocument(t,e){let i=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(i=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(i!==null&&li(i.mutation,s,jt.empty(),_t.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.getLocalViewOfDocuments(t,i,z()).next(()=>i))}getLocalViewOfDocuments(t,e,i=z()){const s=Oe();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,i).next(r=>{let a=ii();return r.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const i=Oe();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,z()))}populateOverlays(t,e,i){const s=[];return i.forEach(r=>{e.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(t,s).next(r=>{r.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,i,s){let r=ce();const a=ai(),l=function(){return ai()}();return e.forEach((u,d)=>{const f=i.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof Ke)?r=r.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),li(f.mutation,d,f.mutation.getFieldMask(),_t.now())):a.set(d.key,jt.empty())}),this.recalculateAndSaveOverlays(t,r).next(u=>(u.forEach((d,f)=>a.set(d,f)),e.forEach((d,f)=>{var p;return l.set(d,new Dm(f,(p=a.get(d))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(t,e){const i=ai();let s=new ht((a,l)=>a-l),r=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=e.get(u);if(d===null)return;let f=i.get(u)||jt.empty();f=l.applyToLocalView(d,f),i.set(u,f);const p=(s.get(l.batchId)||z()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,f=u.value,p=Xu();f.forEach(g=>{if(!r.has(g)){const A=ih(e.get(g),i.get(g));A!==null&&p.set(g,A),r=r.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,p))}return P.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.recalculateAndSaveOverlays(t,i))}getDocumentsMatchingQuery(t,e,i,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Bp(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,i,s):this.getDocumentsMatchingCollectionQuery(t,e,i,s)}getNextDocuments(t,e,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,i,s).next(r=>{const a=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,i.largestBatchId,s-r.size):P.resolve(Oe());let l=-1,u=r;return a.next(d=>P.forEach(d,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),r.get(f)?P.resolve():this.remoteDocumentCache.getEntry(t,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(t,d,r)).next(()=>this.computeViews(t,u,d,z())).next(f=>({batchId:l,changes:Yu(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(i=>{let s=ii();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,i,s){const r=e.collectionGroup;let a=ii();return this.indexManager.getCollectionParents(t,r).next(l=>P.forEach(l,u=>{const d=function(p,g){return new $s(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(e,u.child(r));return this.getDocumentsMatchingCollectionQuery(t,d,i,s).next(f=>{f.forEach((p,g)=>{a=a.insert(p,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,i.largestBatchId).next(a=>(r=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,i,r,s))).next(a=>{r.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,kt.newInvalidDocument(f)))});let l=ii();return a.forEach((u,d)=>{const f=r.get(u);f!==void 0&&li(f.mutation,d,jt.empty(),_t.now()),Hs(e,d)&&(l=l.insert(u,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return P.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Yt(s.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:Pm(s.bundledQuery),readTime:Yt(s.readTime)}}(e)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(){this.overlays=new ht(M.comparator),this.Ir=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){const i=Oe();return P.forEach(e,s=>this.getOverlay(t,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(t,e,i){return i.forEach((s,r)=>{this.ht(t,e,r)}),P.resolve()}removeOverlaysForBatchId(t,e,i){const s=this.Ir.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.Ir.delete(i)),P.resolve()}getOverlaysForCollection(t,e,i){const s=Oe(),r=e.length+1,a=new M(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===r&&u.largestBatchId>i&&s.set(u.getKey(),u)}return P.resolve(s)}getOverlaysForCollectionGroup(t,e,i,s){let r=new ht((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>i){let f=r.get(d.largestBatchId);f===null&&(f=Oe(),r=r.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const l=Oe(),u=r.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>l.set(d,f)),!(l.size()>=s)););return P.resolve(l)}ht(t,e,i){const s=this.overlays.get(i.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(i.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new sm(e,i));let r=this.Ir.get(e);r===void 0&&(r=z(),this.Ir.set(e,r)),this.Ir.set(e,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(){this.sessionToken=Ct.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(){this.Tr=new wt(mt.Er),this.dr=new wt(mt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const i=new mt(t,e);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(t,e){t.forEach(i=>this.addReference(i,e))}removeReference(t,e){this.Vr(new mt(t,e))}mr(t,e){t.forEach(i=>this.removeReference(i,e))}gr(t){const e=new M(new rt([])),i=new mt(e,t),s=new mt(e,t+1),r=[];return this.dr.forEachInRange([i,s],a=>{this.Vr(a),r.push(a.key)}),r}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new M(new rt([])),i=new mt(e,t),s=new mt(e,t+1);let r=z();return this.dr.forEachInRange([i,s],a=>{r=r.add(a.key)}),r}containsKey(t){const e=new mt(t,0),i=this.Tr.firstAfterOrEqual(e);return i!==null&&t.isEqual(i.key)}}class mt{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return M.comparator(t.key,e.key)||Y(t.wr,e.wr)}static Ar(t,e){return Y(t.wr,e.wr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new wt(mt.Er)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,i,s){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new im(r,e,i,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new mt(l.key,r)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const i=e+1,s=this.vr(i),r=s<0?0:s;return P.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const i=new mt(e,0),s=new mt(e,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([i,s],a=>{const l=this.Dr(a.wr);r.push(l)}),P.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let i=new wt(Y);return e.forEach(s=>{const r=new mt(s,0),a=new mt(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([r,a],l=>{i=i.add(l.wr)})}),P.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(t,e){const i=e.path,s=i.length+1;let r=i;M.isDocumentKey(r)||(r=r.child(""));const a=new mt(new M(r),0);let l=new wt(Y);return this.br.forEachWhile(u=>{const d=u.key.path;return!!i.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.wr)),!0)},a),P.resolve(this.Cr(l))}Cr(t){const e=[];return t.forEach(i=>{const s=this.Dr(i);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){Z(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return P.forEach(e.mutations,s=>{const r=new mt(s.key,e.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=i})}On(t){}containsKey(t,e){const i=new mt(e,0),s=this.br.firstAfterOrEqual(i);return P.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(t){this.Mr=t,this.docs=function(){return new ht(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const i=e.key,s=this.docs.get(i),r=s?s.size:0,a=this.Mr(e);return this.docs=this.docs.insert(i,{document:e.mutableCopy(),size:a}),this.size+=a-r,this.indexManager.addToCollectionParentIndex(t,i.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const i=this.docs.get(e);return P.resolve(i?i.document.mutableCopy():kt.newInvalidDocument(e))}getEntries(t,e){let i=ce();return e.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():kt.newInvalidDocument(s))}),P.resolve(i)}getDocumentsMatchingQuery(t,e,i,s){let r=ce();const a=e.path,l=new M(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Ep(vp(f),i)<=0||(s.has(f.key)||Hs(e,f))&&(r=r.insert(f.key,f.mutableCopy()))}return P.resolve(r)}getAllFromCollectionGroup(t,e,i,s){F()}Or(t,e){return P.forEach(this.docs,i=>e(i))}newChangeBuffer(t){return new Um(this)}getSize(t){return P.resolve(this.size)}}class Um extends km{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(i)}),P.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(t){this.persistence=t,this.Nr=new Pn(e=>Lo(e),Fo),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new zo,this.targetCount=0,this.kr=yn.Bn()}forEachTarget(t,e){return this.Nr.forEach((i,s)=>e(s)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,i){return i&&(this.lastRemoteSnapshotVersion=i),e>this.Lr&&(this.Lr=e),P.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new yn(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.Kn(e),P.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,i){let s=0;const r=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=e&&i.get(l.targetId)===null&&(this.Nr.delete(a),r.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),P.waitFor(r).next(()=>s)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){const i=this.Nr.get(e)||null;return P.resolve(i)}addMatchingKeys(t,e,i){return this.Br.Rr(e,i),P.resolve()}removeMatchingKeys(t,e,i){this.Br.mr(e,i);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(a=>{r.push(s.markPotentiallyOrphaned(t,a))}),P.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),P.resolve()}getMatchingKeysForTargetId(t,e){const i=this.Br.yr(e);return P.resolve(i)}containsKey(t,e){return P.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(t,e){this.qr={},this.overlays={},this.Qr=new Vo(0),this.Kr=!1,this.Kr=!0,this.$r=new Mm,this.referenceDelegate=t(this),this.Ur=new Bm(this),this.indexManager=new bm,this.remoteDocumentCache=function(s){return new Fm(s)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new Sm(e),this.Gr=new xm(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Om,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let i=this.qr[t.toKey()];return i||(i=new Lm(e,this.referenceDelegate),this.qr[t.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,i){x("MemoryPersistence","Starting transaction:",t);const s=new Wm(this.Qr.next());return this.referenceDelegate.zr(),i(s).next(r=>this.referenceDelegate.jr(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Hr(t,e){return P.or(Object.values(this.qr).map(i=>()=>i.containsKey(t,e)))}}class Wm extends Ip{constructor(t){super(),this.currentSequenceNumber=t}}class $o{constructor(t){this.persistence=t,this.Jr=new zo,this.Yr=null}static Zr(t){return new $o(t)}get Xr(){if(this.Yr)return this.Yr;throw F()}addReference(t,e,i){return this.Jr.addReference(i,e),this.Xr.delete(i.toString()),P.resolve()}removeReference(t,e,i){return this.Jr.removeReference(i,e),this.Xr.add(i.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),P.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(r=>this.Xr.add(r.toString()))}).next(()=>i.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,i=>{const s=M.fromPath(i);return this.ei(t,s).next(r=>{r||e.removeEntry(s,U.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(i=>{i?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return P.or([()=>P.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(t,e,i,s){this.targetId=t,this.fromCache=e,this.$i=i,this.Ui=s}static Wi(t,e){let i=z(),s=z();for(const r of e.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Go(t,e.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return e_()?8:wp(vu())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,i,s){const r={result:null};return this.Yi(t,e).next(a=>{r.result=a}).next(()=>{if(!r.result)return this.Zi(t,e,s,i).next(a=>{r.result=a})}).next(()=>{if(r.result)return;const a=new jm;return this.Xi(t,e,a).next(l=>{if(r.result=l,this.zi)return this.es(t,e,a,l.size)})}).next(()=>r.result)}es(t,e,i,s){return i.documentReadCount<this.ji?(Xn()<=H.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",nn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(Xn()<=H.DEBUG&&x("QueryEngine","Query:",nn(e),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.Hi*s?(Xn()<=H.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",nn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Kt(e))):P.resolve())}Yi(t,e){if(rc(e))return P.resolve(null);let i=Kt(e);return this.indexManager.getIndexType(t,i).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=ro(e,null,"F"),i=Kt(e)),this.indexManager.getDocumentsMatchingTarget(t,i).next(r=>{const a=z(...r);return this.Ji.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,i).next(u=>{const d=this.ts(e,l);return this.ns(e,d,a,u.readTime)?this.Yi(t,ro(e,null,"F")):this.rs(t,d,e,u)}))})))}Zi(t,e,i,s){return rc(e)||s.isEqual(U.min())?P.resolve(null):this.Ji.getDocuments(t,i).next(r=>{const a=this.ts(e,r);return this.ns(e,a,i,s)?P.resolve(null):(Xn()<=H.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),nn(e)),this.rs(t,a,e,yp(s,-1)).next(l=>l))})}ts(t,e){let i=new wt(Ku(t));return e.forEach((s,r)=>{Hs(t,r)&&(i=i.add(r))}),i}ns(t,e,i,s){if(t.limit===null)return!1;if(i.size!==e.size)return!0;const r=t.limitType==="F"?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Xi(t,e,i){return Xn()<=H.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",nn(e)),this.Ji.getDocumentsMatchingQuery(t,e,Ce.min(),i)}rs(t,e,i,s){return this.Ji.getDocumentsMatchingQuery(t,i,s).next(r=>(e.forEach(a=>{r=r.insert(a.key,a)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(t,e,i,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new ht(Y),this._s=new Pn(r=>Lo(r),Fo),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(i)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Vm(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function Gm(n,t,e,i){return new $m(n,t,e,i)}async function ph(n,t){const e=B(n);return await e.persistence.runTransaction("Handle user change","readonly",i=>{let s;return e.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,e.ls(t),e.mutationQueue.getAllMutationBatches(i))).next(r=>{const a=[],l=[];let u=z();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of r){l.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return e.localDocuments.getDocuments(i,u).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:l}))})})}function Hm(n,t){const e=B(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=t.batch.keys(),r=e.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,d,f){const p=d.batch,g=p.keys();let A=P.resolve();return g.forEach(S=>{A=A.next(()=>f.getEntry(u,S)).next(V=>{const k=d.docVersions.get(S);Z(k!==null),V.version.compareTo(k)<0&&(p.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),f.addEntry(V)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(e,i,t,r).next(()=>r.apply(i)).next(()=>e.mutationQueue.performConsistencyCheck(i)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(i,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let u=z();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(t))).next(()=>e.localDocuments.getDocuments(i,s))})}function mh(n){const t=B(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function Km(n,t){const e=B(n),i=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const a=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const l=[];t.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;l.push(e.Ur.removeMatchingKeys(r,f.removedDocuments,p).next(()=>e.Ur.addMatchingKeys(r,f.addedDocuments,p)));let A=g.withSequenceNumber(r.currentSequenceNumber);t.targetMismatches.get(p)!==null?A=A.withResumeToken(Ct.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,i)),s=s.insert(p,A),function(V,k,$){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(g,A,f)&&l.push(e.Ur.updateTargetData(r,A))});let u=ce(),d=z();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(Qm(r,a,t.documentUpdates).next(f=>{u=f.Ps,d=f.Is})),!i.isEqual(U.min())){const f=e.Ur.getLastRemoteSnapshotVersion(r).next(p=>e.Ur.setTargetsMetadata(r,r.currentSequenceNumber,i));l.push(f)}return P.waitFor(l).next(()=>a.apply(r)).next(()=>e.localDocuments.getLocalViewOfDocuments(r,u,d)).next(()=>u)}).then(r=>(e.os=s,r))}function Qm(n,t,e){let i=z(),s=z();return e.forEach(r=>i=i.add(r)),t.getEntries(n,i).next(r=>{let a=ce();return e.forEach((l,u)=>{const d=r.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(U.min())?(t.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(u),a=a.insert(l,u)):x("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function Ym(n,t){const e=B(n);return e.persistence.runTransaction("Get next mutation batch","readonly",i=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(i,t)))}function Xm(n,t){const e=B(n);return e.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return e.Ur.getTargetData(i,t).next(r=>r?(s=r,P.resolve(s)):e.Ur.allocateTargetId(i).next(a=>(s=new ye(t,a,"TargetPurposeListen",i.currentSequenceNumber),e.Ur.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=e.os.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(i.targetId,i),e._s.set(t,i.targetId)),i})}async function uo(n,t,e){const i=B(n),s=i.os.get(t),r=e?"readwrite":"readwrite-primary";try{e||await i.persistence.runTransaction("Release target",r,a=>i.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ki(a))throw a;x("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}i.os=i.os.remove(t),i._s.delete(s.target)}function mc(n,t,e){const i=B(n);let s=U.min(),r=z();return i.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=B(u),g=p._s.get(f);return g!==void 0?P.resolve(p.os.get(g)):p.Ur.getTargetData(d,f)}(i,a,Kt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{r=u})}).next(()=>i.ss.getDocumentsMatchingQuery(a,t,e?s:U.min(),e?r:z())).next(l=>(Jm(i,Wp(t),l),{documents:l,Ts:r})))}function Jm(n,t,e){let i=n.us.get(t)||U.min();e.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.us.set(t,i)}class gc{constructor(){this.activeTargetIds=Kp()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Zm{constructor(){this.so=new gc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,i){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,i){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new gc,Promise.resolve()}handleUserChange(t,e,i){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ls=null;function Fr(){return ls===null?ls=function(){return 268435456+Math.round(2147483648*Math.random())}():ls++,"0x"+ls.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt="WebChannelConnection";class ig extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const i=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+e.host,this.vo=`projects/${s}/databases/${r}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${r}`}get Fo(){return!1}Mo(e,i,s,r,a){const l=Fr(),u=this.xo(e,i.toUriEncodedString());x("RestConnection",`Sending RPC '${e}' ${l}:`,u,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,r,a),this.No(e,u,d,s).then(f=>(x("RestConnection",`Received RPC '${e}' ${l}: `,f),f),f=>{throw _n("RestConnection",`RPC '${e}' ${l} failed with error: `,f,"url: ",u,"request:",s),f})}Lo(e,i,s,r,a,l){return this.Mo(e,i,s,r,a)}Oo(e,i,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Rn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((r,a)=>e[a]=r),s&&s.headers.forEach((r,a)=>e[a]=r)}xo(e,i){const s=eg[e];return`${this.Do}/v1/${i}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,i,s){const r=Fr();return new Promise((a,l)=>{const u=new Nu;u.setWithCredentials(!0),u.listenOnce(ku.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case ds.NO_ERROR:const f=u.getResponseJson();x(bt,`XHR for RPC '${t}' ${r} received:`,JSON.stringify(f)),a(f);break;case ds.TIMEOUT:x(bt,`RPC '${t}' ${r} timed out`),l(new O(b.DEADLINE_EXCEEDED,"Request time out"));break;case ds.HTTP_ERROR:const p=u.getStatus();if(x(bt,`RPC '${t}' ${r} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const A=g?.error;if(A&&A.status&&A.message){const S=function(k){const $=k.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf($)>=0?$:b.UNKNOWN}(A.status);l(new O(S,A.message))}else l(new O(b.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new O(b.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{x(bt,`RPC '${t}' ${r} completed.`)}});const d=JSON.stringify(s);x(bt,`RPC '${t}' ${r} sending request:`,s),u.send(e,"POST",d,i,15)})}Bo(t,e,i){const s=Fr(),r=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=xu(),l=Vu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,e,i),u.encodeInitMessageHeaders=!0;const f=r.join("");x(bt,`Creating RPC '${t}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);let g=!1,A=!1;const S=new ng({Io:k=>{A?x(bt,`Not sending because RPC '${t}' stream ${s} is closed:`,k):(g||(x(bt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),g=!0),x(bt,`RPC '${t}' stream ${s} sending:`,k),p.send(k))},To:()=>p.close()}),V=(k,$,K)=>{k.listen($,J=>{try{K(J)}catch(ct){setTimeout(()=>{throw ct},0)}})};return V(p,ni.EventType.OPEN,()=>{A||(x(bt,`RPC '${t}' stream ${s} transport opened.`),S.yo())}),V(p,ni.EventType.CLOSE,()=>{A||(A=!0,x(bt,`RPC '${t}' stream ${s} transport closed`),S.So())}),V(p,ni.EventType.ERROR,k=>{A||(A=!0,_n(bt,`RPC '${t}' stream ${s} transport errored:`,k),S.So(new O(b.UNAVAILABLE,"The operation could not be completed")))}),V(p,ni.EventType.MESSAGE,k=>{var $;if(!A){const K=k.data[0];Z(!!K);const J=K,ct=J.error||(($=J[0])===null||$===void 0?void 0:$.error);if(ct){x(bt,`RPC '${t}' stream ${s} received error:`,ct);const te=ct.status;let vt=function(v){const E=ut[v];if(E!==void 0)return rh(E)}(te),I=ct.message;vt===void 0&&(vt=b.INTERNAL,I="Unknown error status: "+te+" with message "+ct.message),A=!0,S.So(new O(vt,I)),p.close()}else x(bt,`RPC '${t}' stream ${s} received:`,K),S.bo(K)}}),V(l,Du.STAT_EVENT,k=>{k.stat===Zr.PROXY?x(bt,`RPC '${t}' stream ${s} detected buffering proxy`):k.stat===Zr.NOPROXY&&x(bt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function Ur(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(n){return new fm(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,i=1e3,s=1.5,r=6e4){this.ui=t,this.timerId=e,this.ko=i,this.qo=s,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-i);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(t,e,i,s,r,a,l,u){this.ui=t,this.Ho=i,this.Jo=s,this.connection=r,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new gh(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(le(e.toString()),le("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.Yo===e&&this.P_(i,s)},i=>{t(()=>{const s=new O(b.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(s)})})}P_(t,e){const i=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{i(()=>this.I_(s))}),this.stream.onMessage(s=>{i(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return x("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sg extends yh{constructor(t,e,i,s,r,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,i,s,a),this.serializer=r}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=mm(this.serializer,t),i=function(r){if(!("targetChange"in r))return U.min();const a=r.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Yt(a.readTime):U.min()}(t);return this.listener.d_(e,i)}A_(t){const e={};e.database=co(this.serializer),e.addTarget=function(r,a){let l;const u=a.target;if(l=so(u)?{documents:vm(r,u)}:{query:Em(r,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=lh(r,a.resumeToken);const d=oo(r,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){l.readTime=As(r,a.snapshotVersion.toTimestamp());const d=oo(r,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,t);const i=Im(this.serializer,t);i&&(e.labels=i),this.a_(e)}R_(t){const e={};e.database=co(this.serializer),e.removeTarget=t,this.a_(e)}}class rg extends yh{constructor(t,e,i,s,r,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,i,s,a),this.serializer=r}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return Z(!!t.streamToken),this.lastStreamToken=t.streamToken,Z(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){Z(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=ym(t.writeResults,t.commitTime),i=Yt(t.commitTime);return this.listener.g_(i,e)}p_(){const t={};t.database=co(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(i=>gm(this.serializer,i))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og extends class{}{constructor(t,e,i,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=i,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,a])=>this.connection.Mo(t,ao(e,i),s,r,a)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new O(b.UNKNOWN,r.toString())})}Lo(t,e,i,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(t,ao(e,i),s,a,l,r)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(b.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ag{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(le(e),this.D_=!1):x("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(t,e,i,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o(a=>{i.enqueueAndForget(async()=>{Qe(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=B(u);d.L_.add(4),await xi(d),d.q_.set("Unknown"),d.L_.delete(4),await Js(d)}(this))})}),this.q_=new ag(i,s)}}async function Js(n){if(Qe(n))for(const t of n.B_)await t(!0)}async function xi(n){for(const t of n.B_)await t(!1)}function vh(n,t){const e=B(n);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),Yo(e)?Qo(e):bn(e).r_()&&Ko(e,t))}function Ho(n,t){const e=B(n),i=bn(e);e.N_.delete(t),i.r_()&&Eh(e,t),e.N_.size===0&&(i.r_()?i.o_():Qe(e)&&e.q_.set("Unknown"))}function Ko(n,t){if(n.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(U.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}bn(n).A_(t)}function Eh(n,t){n.Q_.xe(t),bn(n).R_(t)}function Qo(n){n.Q_=new cm({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.N_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),bn(n).start(),n.q_.v_()}function Yo(n){return Qe(n)&&!bn(n).n_()&&n.N_.size>0}function Qe(n){return B(n).L_.size===0}function Th(n){n.Q_=void 0}async function cg(n){n.q_.set("Online")}async function ug(n){n.N_.forEach((t,e)=>{Ko(n,t)})}async function hg(n,t){Th(n),Yo(n)?(n.q_.M_(t),Qo(n)):n.q_.set("Unknown")}async function dg(n,t,e){if(n.q_.set("Online"),t instanceof ah&&t.state===2&&t.cause)try{await async function(s,r){const a=r.cause;for(const l of r.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,t)}catch(i){x("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),i),await Rs(n,i)}else if(t instanceof ps?n.Q_.Ke(t):t instanceof oh?n.Q_.He(t):n.Q_.We(t),!e.isEqual(U.min()))try{const i=await mh(n.localStore);e.compareTo(i)>=0&&await function(r,a){const l=r.Q_.rt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=r.N_.get(d);f&&r.N_.set(d,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const f=r.N_.get(u);if(!f)return;r.N_.set(u,f.withResumeToken(Ct.EMPTY_BYTE_STRING,f.snapshotVersion)),Eh(r,u);const p=new ye(f.target,u,d,f.sequenceNumber);Ko(r,p)}),r.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(i){x("RemoteStore","Failed to raise snapshot:",i),await Rs(n,i)}}async function Rs(n,t,e){if(!ki(t))throw t;n.L_.add(1),await xi(n),n.q_.set("Offline"),e||(e=()=>mh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await Js(n)})}function Ih(n,t){return t().catch(e=>Rs(n,e,t))}async function Zs(n){const t=B(n),e=Re(t);let i=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;fg(t);)try{const s=await Ym(t.localStore,i);if(s===null){t.O_.length===0&&e.o_();break}i=s.batchId,_g(t,s)}catch(s){await Rs(t,s)}wh(t)&&Ch(t)}function fg(n){return Qe(n)&&n.O_.length<10}function _g(n,t){n.O_.push(t);const e=Re(n);e.r_()&&e.V_&&e.m_(t.mutations)}function wh(n){return Qe(n)&&!Re(n).n_()&&n.O_.length>0}function Ch(n){Re(n).start()}async function pg(n){Re(n).p_()}async function mg(n){const t=Re(n);for(const e of n.O_)t.m_(e.mutations)}async function gg(n,t,e){const i=n.O_.shift(),s=qo.from(i,t,e);await Ih(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Zs(n)}async function yg(n,t){t&&Re(n).V_&&await async function(i,s){if(function(a){return om(a)&&a!==b.ABORTED}(s.code)){const r=i.O_.shift();Re(i).s_(),await Ih(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await Zs(i)}}(n,t),wh(n)&&Ch(n)}async function vc(n,t){const e=B(n);e.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const i=Qe(e);e.L_.add(3),await xi(e),i&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await Js(e)}async function vg(n,t){const e=B(n);t?(e.L_.delete(2),await Js(e)):t||(e.L_.add(2),await xi(e),e.q_.set("Unknown"))}function bn(n){return n.K_||(n.K_=function(e,i,s){const r=B(e);return r.w_(),new sg(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:cg.bind(null,n),Ro:ug.bind(null,n),mo:hg.bind(null,n),d_:dg.bind(null,n)}),n.B_.push(async t=>{t?(n.K_.s_(),Yo(n)?Qo(n):n.q_.set("Unknown")):(await n.K_.stop(),Th(n))})),n.K_}function Re(n){return n.U_||(n.U_=function(e,i,s){const r=B(e);return r.w_(),new rg(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:pg.bind(null,n),mo:yg.bind(null,n),f_:mg.bind(null,n),g_:gg.bind(null,n)}),n.B_.push(async t=>{t?(n.U_.s_(),await Zs(n)):(await n.U_.stop(),n.O_.length>0&&(x("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e,i,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new Ee,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,i,s,r){const a=Date.now()+i,l=new Xo(t,e,a,s,r);return l.start(i),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jo(n,t){if(le("AsyncQueue",`${t}: ${n}`),ki(n))return new O(b.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(t){this.comparator=t?(e,i)=>t(e,i)||M.comparator(e.key,i.key):(e,i)=>M.comparator(e.key,i.key),this.keyedMap=ii(),this.sortedSet=new ht(this.comparator)}static emptySet(t){return new an(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,i)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof an)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),i=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const i=new an;return i.comparator=this.comparator,i.keyedMap=t,i.sortedSet=e,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(){this.W_=new ht(M.comparator)}track(t){const e=t.doc.key,i=this.W_.get(e);i?t.type!==0&&i.type===3?this.W_=this.W_.insert(e,t):t.type===3&&i.type!==1?this.W_=this.W_.insert(e,{type:i.type,doc:t.doc}):t.type===2&&i.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&i.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&i.type===0?this.W_=this.W_.remove(e):t.type===1&&i.type===2?this.W_=this.W_.insert(e,{type:1,doc:i.doc}):t.type===0&&i.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):F():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,i)=>{t.push(i)}),t}}class vn{constructor(t,e,i,s,r,a,l,u,d){this.query=t,this.docs=e,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(t,e,i,s,r){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new vn(t,e,an.emptySet(e),a,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Gs(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,i=t.docChanges;if(e.length!==i.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==i[s].type||!e[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class Tg{constructor(){this.queries=Tc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,i){const s=B(e),r=s.queries;s.queries=Tc(),r.forEach((a,l)=>{for(const u of l.j_)u.onError(i)})})(this,new O(b.ABORTED,"Firestore shutting down"))}}function Tc(){return new Pn(n=>Hu(n),Gs)}async function Ig(n,t){const e=B(n);let i=3;const s=t.query;let r=e.queries.get(s);r?!r.H_()&&t.J_()&&(i=2):(r=new Eg,i=t.J_()?0:1);try{switch(i){case 0:r.z_=await e.onListen(s,!0);break;case 1:r.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=Jo(a,`Initialization of query '${nn(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,r),r.j_.push(t),t.Z_(e.onlineState),r.z_&&t.X_(r.z_)&&Zo(e)}async function wg(n,t){const e=B(n),i=t.query;let s=3;const r=e.queries.get(i);if(r){const a=r.j_.indexOf(t);a>=0&&(r.j_.splice(a,1),r.j_.length===0?s=t.J_()?0:1:!r.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(i),e.onUnlisten(i,!0);case 1:return e.queries.delete(i),e.onUnlisten(i,!1);case 2:return e.onLastRemoteStoreUnlisten(i);default:return}}function Cg(n,t){const e=B(n);let i=!1;for(const s of t){const r=s.query,a=e.queries.get(r);if(a){for(const l of a.j_)l.X_(s)&&(i=!0);a.z_=s}}i&&Zo(e)}function Ag(n,t,e){const i=B(n),s=i.queries.get(t);if(s)for(const r of s.j_)r.onError(e);i.queries.delete(t)}function Zo(n){n.Y_.forEach(t=>{t.next()})}var ho,Ic;(Ic=ho||(ho={})).ea="default",Ic.Cache="cache";class Rg{constructor(t,e,i){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=i||{}}X_(t){if(!this.options.includeMetadataChanges){const i=[];for(const s of t.docChanges)s.type!==3&&i.push(s);t=new vn(t.query,t.docs,t.oldDocs,i,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const i=e!=="Offline";return(!this.options._a||!i)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=vn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==ho.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t){this.key=t}}class Rh{constructor(t){this.key=t}}class Sg{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=z(),this.mutatedKeys=z(),this.Aa=Ku(t),this.Ra=new an(this.Aa)}get Va(){return this.Ta}ma(t,e){const i=e?e.fa:new Ec,s=e?e.Ra:this.Ra;let r=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,p)=>{const g=s.get(f),A=Hs(this.query,p)?p:null,S=!!g&&this.mutatedKeys.has(g.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let k=!1;g&&A?g.data.isEqual(A.data)?S!==V&&(i.track({type:3,doc:A}),k=!0):this.ga(g,A)||(i.track({type:2,doc:A}),k=!0,(u&&this.Aa(A,u)>0||d&&this.Aa(A,d)<0)&&(l=!0)):!g&&A?(i.track({type:0,doc:A}),k=!0):g&&!A&&(i.track({type:1,doc:g}),k=!0,(u||d)&&(l=!0)),k&&(A?(a=a.add(A),r=V?r.add(f):r.delete(f)):(a=a.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),r=r.delete(f.key),i.track({type:1,doc:f})}return{Ra:a,fa:i,ns:l,mutatedKeys:r}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,i,s){const r=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort((f,p)=>function(A,S){const V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return V(A)-V(S)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(i),s=s!=null&&s;const l=e&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new vn(this.query,t.Ra,r,a,t.mutatedKeys,u===0,d,!1,!!i&&i.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ec,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=z(),this.Ra.forEach(i=>{this.Sa(i.key)&&(this.da=this.da.add(i.key))});const e=[];return t.forEach(i=>{this.da.has(i)||e.push(new Rh(i))}),this.da.forEach(i=>{t.has(i)||e.push(new Ah(i))}),e}ba(t){this.Ta=t.Ts,this.da=z();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return vn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Pg{constructor(t,e,i){this.query=t,this.targetId=e,this.view=i}}class bg{constructor(t){this.key=t,this.va=!1}}class Ng{constructor(t,e,i,s,r,a){this.localStore=t,this.remoteStore=e,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Pn(l=>Hu(l),Gs),this.Ma=new Map,this.xa=new Set,this.Oa=new ht(M.comparator),this.Na=new Map,this.La=new zo,this.Ba={},this.ka=new Map,this.qa=yn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function kg(n,t,e=!0){const i=Dh(n);let s;const r=i.Fa.get(t);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Da()):s=await Sh(i,t,e,!0),s}async function Dg(n,t){const e=Dh(n);await Sh(e,t,!0,!1)}async function Sh(n,t,e,i){const s=await Xm(n.localStore,Kt(t)),r=s.targetId,a=n.sharedClientState.addLocalQueryTarget(r,e);let l;return i&&(l=await Vg(n,t,r,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&vh(n.remoteStore,s),l}async function Vg(n,t,e,i,s){n.Ka=(p,g,A)=>async function(V,k,$,K){let J=k.view.ma($);J.ns&&(J=await mc(V.localStore,k.query,!1).then(({documents:I})=>k.view.ma(I,J)));const ct=K&&K.targetChanges.get(k.targetId),te=K&&K.targetMismatches.get(k.targetId)!=null,vt=k.view.applyChanges(J,V.isPrimaryClient,ct,te);return Cc(V,k.targetId,vt.wa),vt.snapshot}(n,p,g,A);const r=await mc(n.localStore,t,!0),a=new Sg(t,r.Ts),l=a.ma(r.documents),u=Vi.createSynthesizedTargetChangeForCurrentChange(e,i&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Cc(n,e,d.wa);const f=new Pg(t,e,a);return n.Fa.set(t,f),n.Ma.has(e)?n.Ma.get(e).push(t):n.Ma.set(e,[t]),d.snapshot}async function xg(n,t,e){const i=B(n),s=i.Fa.get(t),r=i.Ma.get(s.targetId);if(r.length>1)return i.Ma.set(s.targetId,r.filter(a=>!Gs(a,t))),void i.Fa.delete(t);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await uo(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),e&&Ho(i.remoteStore,s.targetId),fo(i,s.targetId)}).catch(Ni)):(fo(i,s.targetId),await uo(i.localStore,s.targetId,!0))}async function Og(n,t){const e=B(n),i=e.Fa.get(t),s=e.Ma.get(i.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(i.targetId),Ho(e.remoteStore,i.targetId))}async function Mg(n,t,e){const i=jg(n);try{const s=await function(a,l){const u=B(a),d=_t.now(),f=l.reduce((A,S)=>A.add(S.key),z());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let S=ce(),V=z();return u.cs.getEntries(A,f).next(k=>{S=k,S.forEach(($,K)=>{K.isValidDocument()||(V=V.add($))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,S)).next(k=>{p=k;const $=[];for(const K of l){const J=em(K,p.get(K.key).overlayedDocument);J!=null&&$.push(new Ke(K.key,J,Uu(J.value.mapValue),Qt.exists(!0)))}return u.mutationQueue.addMutationBatch(A,d,$,l)}).next(k=>{g=k;const $=k.applyToLocalDocumentSet(p,V);return u.documentOverlayCache.saveOverlays(A,k.batchId,$)})}).then(()=>({batchId:g.batchId,changes:Yu(p)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Ba[a.currentUser.toKey()];d||(d=new ht(Y)),d=d.insert(l,u),a.Ba[a.currentUser.toKey()]=d}(i,s.batchId,e),await Oi(i,s.changes),await Zs(i.remoteStore)}catch(s){const r=Jo(s,"Failed to persist write");e.reject(r)}}async function Ph(n,t){const e=B(n);try{const i=await Km(e.localStore,t);t.targetChanges.forEach((s,r)=>{const a=e.Na.get(r);a&&(Z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?Z(a.va):s.removedDocuments.size>0&&(Z(a.va),a.va=!1))}),await Oi(e,i,t)}catch(i){await Ni(i)}}function wc(n,t,e){const i=B(n);if(i.isPrimaryClient&&e===0||!i.isPrimaryClient&&e===1){const s=[];i.Fa.forEach((r,a)=>{const l=a.view.Z_(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=B(a);u.onlineState=l;let d=!1;u.queries.forEach((f,p)=>{for(const g of p.j_)g.Z_(l)&&(d=!0)}),d&&Zo(u)}(i.eventManager,t),s.length&&i.Ca.d_(s),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function Lg(n,t,e){const i=B(n);i.sharedClientState.updateQueryState(t,"rejected",e);const s=i.Na.get(t),r=s&&s.key;if(r){let a=new ht(M.comparator);a=a.insert(r,kt.newNoDocument(r,U.min()));const l=z().add(r),u=new Ys(U.min(),new Map,new ht(Y),a,l);await Ph(i,u),i.Oa=i.Oa.remove(r),i.Na.delete(t),ta(i)}else await uo(i.localStore,t,!1).then(()=>fo(i,t,e)).catch(Ni)}async function Fg(n,t){const e=B(n),i=t.batch.batchId;try{const s=await Hm(e.localStore,t);Nh(e,i,null),bh(e,i),e.sharedClientState.updateMutationState(i,"acknowledged"),await Oi(e,s)}catch(s){await Ni(s)}}async function Ug(n,t,e){const i=B(n);try{const s=await function(a,l){const u=B(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,l).next(p=>(Z(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(i.localStore,t);Nh(i,t,e),bh(i,t),i.sharedClientState.updateMutationState(t,"rejected",e),await Oi(i,s)}catch(s){await Ni(s)}}function bh(n,t){(n.ka.get(t)||[]).forEach(e=>{e.resolve()}),n.ka.delete(t)}function Nh(n,t,e){const i=B(n);let s=i.Ba[i.currentUser.toKey()];if(s){const r=s.get(t);r&&(e?r.reject(e):r.resolve(),s=s.remove(t)),i.Ba[i.currentUser.toKey()]=s}}function fo(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const i of n.Ma.get(t))n.Fa.delete(i),e&&n.Ca.$a(i,e);n.Ma.delete(t),n.isPrimaryClient&&n.La.gr(t).forEach(i=>{n.La.containsKey(i)||kh(n,i)})}function kh(n,t){n.xa.delete(t.path.canonicalString());const e=n.Oa.get(t);e!==null&&(Ho(n.remoteStore,e),n.Oa=n.Oa.remove(t),n.Na.delete(e),ta(n))}function Cc(n,t,e){for(const i of e)i instanceof Ah?(n.La.addReference(i.key,t),Bg(n,i)):i instanceof Rh?(x("SyncEngine","Document no longer in limbo: "+i.key),n.La.removeReference(i.key,t),n.La.containsKey(i.key)||kh(n,i.key)):F()}function Bg(n,t){const e=t.key,i=e.path.canonicalString();n.Oa.get(e)||n.xa.has(i)||(x("SyncEngine","New document in limbo: "+e),n.xa.add(i),ta(n))}function ta(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const t=n.xa.values().next().value;n.xa.delete(t);const e=new M(rt.fromString(t)),i=n.qa.next();n.Na.set(i,new bg(e)),n.Oa=n.Oa.insert(e,i),vh(n.remoteStore,new ye(Kt(Gu(e.path)),i,"TargetPurposeLimboResolution",Vo.oe))}}async function Oi(n,t,e){const i=B(n),s=[],r=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((l,u)=>{a.push(i.Ka(u,t,e).then(d=>{var f;if((d||e)&&i.isPrimaryClient){const p=d?!d.fromCache:(f=e?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;i.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=Go.Wi(u.targetId,d);r.push(p)}}))}),await Promise.all(a),i.Ca.d_(s),await async function(u,d){const f=B(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>P.forEach(d,g=>P.forEach(g.$i,A=>f.persistence.referenceDelegate.addReference(p,g.targetId,A)).next(()=>P.forEach(g.Ui,A=>f.persistence.referenceDelegate.removeReference(p,g.targetId,A)))))}catch(p){if(!ki(p))throw p;x("LocalStore","Failed to update sequence numbers: "+p)}for(const p of d){const g=p.targetId;if(!p.fromCache){const A=f.os.get(g),S=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(S);f.os=f.os.insert(g,V)}}}(i.localStore,r))}async function qg(n,t){const e=B(n);if(!e.currentUser.isEqual(t)){x("SyncEngine","User change. New user:",t.toKey());const i=await ph(e.localStore,t);e.currentUser=t,function(r,a){r.ka.forEach(l=>{l.forEach(u=>{u.reject(new O(b.CANCELLED,a))})}),r.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,i.removedBatchIds,i.addedBatchIds),await Oi(e,i.hs)}}function Wg(n,t){const e=B(n),i=e.Na.get(t);if(i&&i.va)return z().add(i.key);{let s=z();const r=e.Ma.get(t);if(!r)return s;for(const a of r){const l=e.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function Dh(n){const t=B(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ph.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Wg.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Lg.bind(null,t),t.Ca.d_=Cg.bind(null,t.eventManager),t.Ca.$a=Ag.bind(null,t.eventManager),t}function jg(n){const t=B(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Fg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Ug.bind(null,t),t}class Ss{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Xs(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return Gm(this.persistence,new zm,t.initialUser,this.serializer)}Ga(t){return new qm($o.Zr,this.serializer)}Wa(t){return new Zm}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ss.provider={build:()=>new Ss};class _o{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>wc(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=qg.bind(null,this.syncEngine),await vg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Tg}()}createDatastore(t){const e=Xs(t.databaseInfo.databaseId),i=function(r){return new ig(r)}(t.databaseInfo);return function(r,a,l,u){return new og(r,a,l,u)}(t.authCredentials,t.appCheckCredentials,i,e)}createRemoteStore(t){return function(i,s,r,a,l){return new lg(i,s,r,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>wc(this.syncEngine,e,0),function(){return yc.D()?new yc:new tg}())}createSyncEngine(t,e){return function(s,r,a,l,u,d,f){const p=new Ng(s,r,a,l,u,d);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const r=B(s);x("RemoteStore","RemoteStore shutting down."),r.L_.add(5),await xi(r),r.k_.shutdown(),r.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}_o.provider={build:()=>new _o};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):le("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(t,e,i,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=i,this.databaseInfo=s,this.user=Nt.UNAUTHENTICATED,this.clientId=Mu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async a=>{x("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(x("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ee;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const i=Jo(e,"Failed to shutdown persistence");t.reject(i)}}),t.promise}}async function Br(n,t){n.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let i=e.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await ph(t.localStore,s),i=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Ac(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Gg(n);x("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(i=>vc(t.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>vc(t.remoteStore,s)),n._onlineComponents=t}async function Gg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x("FirestoreClient","Using user provided OfflineComponentProvider");try{await Br(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;_n("Error using user provided cache. Falling back to memory cache: "+e),await Br(n,new Ss)}}else x("FirestoreClient","Using default OfflineComponentProvider"),await Br(n,new Ss);return n._offlineComponents}async function Vh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x("FirestoreClient","Using user provided OnlineComponentProvider"),await Ac(n,n._uninitializedComponentsProvider._online)):(x("FirestoreClient","Using default OnlineComponentProvider"),await Ac(n,new _o))),n._onlineComponents}function Hg(n){return Vh(n).then(t=>t.syncEngine)}async function Kg(n){const t=await Vh(n),e=t.eventManager;return e.onListen=kg.bind(null,t.syncEngine),e.onUnlisten=xg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Dg.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Og.bind(null,t.syncEngine),e}function Qg(n,t,e={}){const i=new Ee;return n.asyncQueue.enqueueAndForget(async()=>function(r,a,l,u,d){const f=new zg({next:g=>{f.Za(),a.enqueueAndForget(()=>wg(r,p)),g.fromCache&&u.source==="server"?d.reject(new O(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(g)},error:g=>d.reject(g)}),p=new Rg(l,f,{includeMetadataChanges:!0,_a:!0});return Ig(r,p)}(await Kg(n),n.asyncQueue,t,e,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n,t,e){if(!e)throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Yg(n,t,e,i){if(t===!0&&i===!0)throw new O(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Sc(n){if(!M.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Pc(n){if(M.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ea(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(i){return i.constructor?i.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F()}function Ii(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ea(n);throw new O(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(t){var e,i;if(t.host===void 0){if(t.ssl!==void 0)throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Yg("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xh((i=t.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class tr{constructor(t,e,i,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bc(t),t.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new cp;switch(i.type){case"firstParty":return new fp(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const i=Rc.get(e);i&&(x("ComponentProvider","Removing Datastore"),Rc.delete(e),i.terminate())}(this),Promise.resolve()}}function Xg(n,t,e,i={}){var s;const r=(n=Ii(n,tr))._getSettings(),a=`${t}:${e}`;if(r.host!=="firestore.googleapis.com"&&r.host!==a&&_n("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:a,ssl:!1})),i.mockUserToken){let l,u;if(typeof i.mockUserToken=="string")l=i.mockUserToken,u=Nt.MOCK_USER;else{l=yu(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=i.mockUserToken.sub||i.mockUserToken.user_id;if(!d)throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Nt(d)}n._authCredentials=new up(new Ou(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(t,e,i){this.converter=e,this._query=i,this.type="query",this.firestore=t}withConverter(t){return new er(this.firestore,t,this._query)}}class Gt{constructor(t,e,i){this.converter=e,this._key=i,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ie(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Gt(this.firestore,t,this._key)}}class Ie extends er{constructor(t,e,i){super(t,e,Gu(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Gt(this.firestore,null,new M(t))}withConverter(t){return new Ie(this.firestore,t,this._path)}}function RT(n,t,...e){if(n=Xt(n),Oh("collection","path",t),n instanceof tr){const i=rt.fromString(t,...e);return Pc(i),new Ie(n,null,i)}{if(!(n instanceof Gt||n instanceof Ie))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(rt.fromString(t,...e));return Pc(i),new Ie(n.firestore,null,i)}}function Jg(n,t,...e){if(n=Xt(n),arguments.length===1&&(t=Mu.newId()),Oh("doc","path",t),n instanceof tr){const i=rt.fromString(t,...e);return Sc(i),new Gt(n,null,new M(i))}{if(!(n instanceof Gt||n instanceof Ie))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(rt.fromString(t,...e));return Sc(i),new Gt(n.firestore,n instanceof Ie?n.converter:null,new M(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new gh(this,"async_queue_retry"),this.Vu=()=>{const i=Ur();i&&x("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=t;const e=Ur();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=Ur();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new Ee;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!ki(t))throw t;x("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(i=>{this.Eu=i,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(i);throw le("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.du=!1,i))));return this.mu=e,e}enqueueAfterDelay(t,e,i){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=Xo.createAndSchedule(this,t,e,i,r=>this.yu(r));return this.Tu.push(s),s}fu(){this.Eu&&F()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,i)=>e.targetTimeMs-i.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class nr extends tr{constructor(t,e,i,s){super(t,e,i,s),this.type="firestore",this._queue=new Nc,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Nc(t),this._firestoreClient=void 0,await t}}}function ST(n,t){const e=typeof n=="object"?n:Ru(),i=typeof n=="string"?n:t||"(default)",s=Cu(e,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=mu("firestore");r&&Xg(s,...r)}return s}function Mh(n){if(n._terminated)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Zg(n),n._firestoreClient}function Zg(n){var t,e,i;const s=n._freezeSettings(),r=function(l,u,d,f){return new Rp(l,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,xh(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new $g(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const u=l?._online.build();return{_offline:l?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(t){this._byteString=t}static fromBase64String(t){try{return new En(Ct.fromBase64String(t))}catch(e){throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new En(Ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new It(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Y(this._lat,t._lat)||Y(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=/^__.*__$/;class ey{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return this.fieldMask!==null?new Ke(t,this.data,this.fieldMask,e,this.fieldTransforms):new Di(t,this.data,e,this.fieldTransforms)}}function Fh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F()}}class ra{constructor(t,e,i,s,r,a){this.settings=t,this.databaseId=e,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.vu(),this.fieldTransforms=r||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new ra(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const i=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:i,xu:!1});return s.Ou(t),s}Nu(t){var e;const i=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:i,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Ps(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Fh(this.Cu)&&ty.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class ny{constructor(t,e,i){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=i||Xs(t)}Qu(t,e,i,s=!1){return new ra({Cu:t,methodName:e,qu:i,path:It.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function iy(n){const t=n._freezeSettings(),e=Xs(n._databaseId);return new ny(n._databaseId,!!t.ignoreUndefinedProperties,e)}function sy(n,t,e,i,s,r={}){const a=n.Qu(r.merge||r.mergeFields?2:0,t,e,s);Wh("Data must be an object, but it was:",a,i);const l=Bh(i,a);let u,d;if(r.merge)u=new jt(a.fieldMask),d=a.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const g=ry(t,p,e);if(!a.contains(g))throw new O(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);ay(f,g)||f.push(g)}u=new jt(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new ey(new Bt(l),u,d)}function Uh(n,t){if(qh(n=Xt(n)))return Wh("Unsupported field value:",t,n),Bh(n,t);if(n instanceof Lh)return function(i,s){if(!Fh(s.Cu))throw s.Bu(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(i,s){const r=[];let a=0;for(const l of i){let u=Uh(l,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),r.push(u),a++}return{arrayValue:{values:r}}}(n,t)}return function(i,s){if((i=Xt(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Qp(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=_t.fromDate(i);return{timestampValue:As(s.serializer,r)}}if(i instanceof _t){const r=new _t(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:As(s.serializer,r)}}if(i instanceof ia)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof En)return{bytesValue:lh(s.serializer,i._byteString)};if(i instanceof Gt){const r=s.databaseId,a=i.firestore._databaseId;if(!a.isEqual(r))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:jo(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof sa)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Uo(l.serializer,u)})}}}}}}(i,s);throw s.Bu(`Unsupported field value: ${ea(i)}`)}(n,t)}function Bh(n,t){const e={};return Lu(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Sn(n,(i,s)=>{const r=Uh(s,t.Mu(i));r!=null&&(e[i]=r)}),{mapValue:{fields:e}}}function qh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof _t||n instanceof ia||n instanceof En||n instanceof Gt||n instanceof Lh||n instanceof sa)}function Wh(n,t,e){if(!qh(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const i=ea(e);throw i==="an object"?t.Bu(n+" a custom object"):t.Bu(n+" "+i)}}function ry(n,t,e){if((t=Xt(t))instanceof na)return t._internalPath;if(typeof t=="string")return jh(n,t);throw Ps("Field path arguments must be of type string or ",n,!1,void 0,e)}const oy=new RegExp("[~\\*/\\[\\]]");function jh(n,t,e){if(t.search(oy)>=0)throw Ps(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new na(...t.split("."))._internalPath}catch{throw Ps(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Ps(n,t,e,i,s){const r=i&&!i.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(r||a)&&(u+=" (found",r&&(u+=` in field ${i}`),a&&(u+=` in document ${s}`),u+=")"),new O(b.INVALID_ARGUMENT,l+n+u)}function ay(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(t,e,i,s,r){this._firestore=t,this._userDataWriter=e,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new ly(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field($h("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class ly extends zh{data(){return super.data()}}function $h(n,t){return typeof t=="string"?jh(n,t):t instanceof na?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cy(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class uy{convertValue(t,e="none"){switch(je(t)){case 0:return null;case 1:return t.booleanValue;case 2:return lt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(We(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const i={};return Sn(t,(s,r)=>{i[s]=this.convertValue(r,e)}),i}convertVectorValue(t){var e,i,s;const r=(s=(i=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(a=>lt(a.doubleValue));return new sa(r)}convertGeoPoint(t){return new ia(lt(t.latitude),lt(t.longitude))}convertArray(t,e){return(t.values||[]).map(i=>this.convertValue(i,e))}convertServerTimestamp(t,e){switch(e){case"previous":const i=Oo(t);return i==null?null:this.convertValue(i,e);case"estimate":return this.convertTimestamp(gi(t));default:return null}}convertTimestamp(t){const e=Ae(t);return new _t(e.seconds,e.nanos)}convertDocumentKey(t,e){const i=rt.fromString(t);Z(_h(i));const s=new yi(i.get(1),i.get(3)),r=new M(i.popFirst(5));return s.isEqual(e)||le(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hy(n,t,e){let i;return i=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class dy extends zh{constructor(t,e,i,s,r,a){super(t,e,i,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ms(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const i=this._document.data.field($h("DocumentSnapshot.get",t));if(i!==null)return this._userDataWriter.convertValue(i,e.serverTimestamps)}}}class ms extends dy{data(t={}){return super.data(t)}}class fy{constructor(t,e,i,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new cs(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(i=>{t.call(e,new ms(this._firestore,this._userDataWriter,i.key,i,new cs(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new ms(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const u=new ms(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cs(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:_y(l.type),doc:u,oldIndex:d,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function _y(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F()}}class py extends uy{constructor(t){super(),this.firestore=t}convertBytes(t){return new En(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Gt(this.firestore,null,e)}}function PT(n){n=Ii(n,er);const t=Ii(n.firestore,nr),e=Mh(t),i=new py(t);return cy(n._query),Qg(e,n._query).then(s=>new fy(t,i,n,s))}function bT(n){return Gh(Ii(n.firestore,nr),[new Bo(n._key,Qt.none())])}function NT(n,t){const e=Ii(n.firestore,nr),i=Jg(n),s=hy(n.converter,t);return Gh(e,[sy(iy(n.firestore),"addDoc",i._key,s,n.converter!==null,{}).toMutation(i._key,Qt.exists(!1))]).then(()=>i)}function Gh(n,t){return function(i,s){const r=new Ee;return i.asyncQueue.enqueueAndForget(async()=>Mg(await Hg(i),s,r)),r.promise}(Mh(n),t)}(function(t,e=!0){(function(s){Rn=s})(Au),_i(new fn("firestore",(i,{instanceIdentifier:s,options:r})=>{const a=i.getProvider("app").getImmediate(),l=new nr(new hp(i.getProvider("auth-internal")),new pp(i.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yi(d.options.projectId,f)}(a,s),a);return r=Object.assign({useFetchStreams:e},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),Fe(Ql,"4.7.3",t),Fe(Ql,"4.7.3","esm2017")})();const kc="@firebase/database",Dc="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hh="";function my(n){Hh=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(t){this.domStorage_=t,this.prefix_="firebase:"}set(t,e){e==null?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),yt(e))}get(t){const e=this.domStorage_.getItem(this.prefixedName_(t));return e==null?null:fi(e)}remove(t){this.domStorage_.removeItem(this.prefixedName_(t))}prefixedName_(t){return this.prefix_+t}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(t,e){e==null?delete this.cache_[t]:this.cache_[t]=e}get(t){return de(this.cache_,t)?this.cache_[t]:null}remove(t){delete this.cache_[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const t=window[n];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new gy(t)}}catch{}return new yy},Me=Kh("localStorage"),po=Kh("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new ko("@firebase/database"),vy=function(){let n=1;return function(){return n++}}(),Qh=function(n){const t=h_(n),e=new u_;e.update(t);const i=e.digest();return Po.encodeByteArray(i)},Mi=function(...n){let t="";for(let e=0;e<n.length;e++){const i=n[e];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?t+=Mi.apply(null,i):typeof i=="object"?t+=yt(i):t+=i,t+=" "}return t};let Be=null,Vc=!0;const Ey=function(n,t){N(!t||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(ln.logLevel=H.VERBOSE,Be=ln.log.bind(ln),t&&po.set("logging_enabled",!0)):typeof n=="function"?Be=n:(Be=null,po.remove("logging_enabled"))},Dt=function(...n){if(Vc===!0&&(Vc=!1,Be===null&&po.get("logging_enabled")===!0&&Ey(!0)),Be){const t=Mi.apply(null,n);Be(t)}},Li=function(n){return function(...t){Dt(n,...t)}},mo=function(...n){const t="FIREBASE INTERNAL ERROR: "+Mi(...n);ln.error(t)},ue=function(...n){const t=`FIREBASE FATAL ERROR: ${Mi(...n)}`;throw ln.error(t),new Error(t)},Lt=function(...n){const t="FIREBASE WARNING: "+Mi(...n);ln.warn(t)},Ty=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Lt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Yh=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Iy=function(n){if(document.readyState==="complete")n();else{let t=!1;const e=function(){if(!document.body){setTimeout(e,Math.floor(10));return}t||(t=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&e()}),window.attachEvent("onload",e))}},Tn="[MIN_NAME]",ze="[MAX_NAME]",Nn=function(n,t){if(n===t)return 0;if(n===Tn||t===ze)return-1;if(t===Tn||n===ze)return 1;{const e=xc(n),i=xc(t);return e!==null?i!==null?e-i===0?n.length-t.length:e-i:-1:i!==null?1:n<t?-1:1}},wy=function(n,t){return n===t?0:n<t?-1:1},Jn=function(n,t){if(t&&n in t)return t[n];throw new Error("Missing required key ("+n+") in object: "+yt(t))},oa=function(n){if(typeof n!="object"||n===null)return yt(n);const t=[];for(const i in n)t.push(i);t.sort();let e="{";for(let i=0;i<t.length;i++)i!==0&&(e+=","),e+=yt(t[i]),e+=":",e+=oa(n[t[i]]);return e+="}",e},Xh=function(n,t){const e=n.length;if(e<=t)return[n];const i=[];for(let s=0;s<e;s+=t)s+t>e?i.push(n.substring(s,e)):i.push(n.substring(s,s+t));return i};function Ft(n,t){for(const e in n)n.hasOwnProperty(e)&&t(e,n[e])}const Jh=function(n){N(!Yh(n),"Invalid JSON number");const t=11,e=52,i=(1<<t-1)-1;let s,r,a,l,u;n===0?(r=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,a=Math.round(n*Math.pow(2,e-l)-Math.pow(2,e))):(r=0,a=Math.round(n/Math.pow(2,1-i-e))));const d=[];for(u=e;u;u-=1)d.push(a%2?1:0),a=Math.floor(a/2);for(u=t;u;u-=1)d.push(r%2?1:0),r=Math.floor(r/2);d.push(s?1:0),d.reverse();const f=d.join("");let p="";for(u=0;u<64;u+=8){let g=parseInt(f.substr(u,8),2).toString(16);g.length===1&&(g="0"+g),p=p+g}return p.toLowerCase()},Cy=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ay=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ry(n,t){let e="Unknown Error";n==="too_big"?e="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?e="Client doesn't have permission to access the desired data.":n==="unavailable"&&(e="The service is unavailable");const i=new Error(n+" at "+t._path.toString()+": "+e);return i.code=n.toUpperCase(),i}const Sy=new RegExp("^-?(0*)\\d{1,10}$"),Py=-2147483648,by=2147483647,xc=function(n){if(Sy.test(n)){const t=Number(n);if(t>=Py&&t<=by)return t}return null},kn=function(n){try{n()}catch(t){setTimeout(()=>{const e=t.stack||"";throw Lt("Exception was thrown by user callback.",e),t},Math.floor(0))}},Ny=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ci=function(n,t){const e=setTimeout(n,t);return typeof e=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(e):typeof e=="object"&&e.unref&&e.unref(),e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(t,e){this.appName_=t,this.appCheckProvider=e,this.appCheck=e?.getImmediate({optional:!0}),this.appCheck||e?.get().then(i=>this.appCheck=i)}getToken(t){return this.appCheck?this.appCheck.getToken(t):new Promise((e,i)=>{setTimeout(()=>{this.appCheck?this.getToken(t).then(e,i):e(null)},0)})}addTokenChangeListener(t){var e;(e=this.appCheckProvider)===null||e===void 0||e.get().then(i=>i.addTokenListener(t))}notifyForInvalidToken(){Lt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dy{constructor(t,e,i){this.appName_=t,this.firebaseOptions_=e,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(t){return this.auth_?this.auth_.getToken(t).catch(e=>e&&e.code==="auth/token-not-initialized"?(Dt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((e,i)=>{setTimeout(()=>{this.auth_?this.getToken(t).then(e,i):e(null)},0)})}addTokenChangeListener(t){this.auth_?this.auth_.addAuthTokenListener(t):this.authProvider_.get().then(e=>e.addAuthTokenListener(t))}removeTokenChangeListener(t){this.authProvider_.get().then(e=>e.removeAuthTokenListener(t))}notifyForInvalidToken(){let t='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Lt(t)}}class cn{constructor(t){this.accessToken=t}getToken(t){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(t){t(this.accessToken)}removeTokenChangeListener(t){}notifyForInvalidToken(){}}cn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa="5",Zh="v",td="s",ed="r",nd="f",id=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,sd="ls",rd="p",go="ac",od="websocket",ad="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(t,e,i,s,r=!1,a="",l=!1,u=!1){this.secure=e,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=a,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this._host=t.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Me.get("host:"+t)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&Me.set("host:"+this._host,this.internalHost))}toString(){let t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t}toURLString(){const t=this.secure?"https://":"http://",e=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${t}${this.host}/${e}`}}function Vy(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function cd(n,t,e){N(typeof t=="string","typeof type must == string"),N(typeof e=="object","typeof params must == object");let i;if(t===od)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(t===ad)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+t);Vy(n)&&(e.ns=n.namespace);const s=[];return Ft(e,(r,a)=>{s.push(r+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(){this.counters_={}}incrementCounter(t,e=1){de(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=e}get(){return Gf(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr={},Wr={};function la(n){const t=n.toString();return qr[t]||(qr[t]=new xy),qr[t]}function Oy(n,t){const e=n.toString();return Wr[e]||(Wr[e]=t()),Wr[e]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(t,e){this.closeAfterResponse=t,this.onClose=e,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(t,e){for(this.pendingResponses[t]=e;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&kn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc="start",Ly="close",Fy="pLPCommand",Uy="pRTLPCB",ud="id",hd="pw",dd="ser",By="cb",qy="seg",Wy="ts",jy="d",zy="dframe",fd=1870,_d=30,$y=fd-_d,Gy=25e3,Hy=3e4;class on{constructor(t,e,i,s,r,a,l){this.connId=t,this.repoInfo=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=a,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Li(t),this.stats_=la(e),this.urlFn=u=>(this.appCheckToken&&(u[go]=this.appCheckToken),cd(e,ad,u))}open(t,e){this.curSegmentNum=0,this.onDisconnect_=e,this.myPacketOrderer=new My(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Hy)),Iy(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ca((...r)=>{const[a,l,u,d,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===Oc)this.id=l,this.password=u;else if(a===Ly)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...r)=>{const[a,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(a,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[Oc]="t",i[dd]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[By]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Zh]=aa,this.transportSessionId&&(i[td]=this.transportSessionId),this.lastSessionId&&(i[sd]=this.lastSessionId),this.applicationId&&(i[rd]=this.applicationId),this.appCheckToken&&(i[go]=this.appCheckToken),typeof location<"u"&&location.hostname&&id.test(location.hostname)&&(i[ed]=nd);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){on.forceAllow_=!0}static forceDisallow(){on.forceDisallow_=!0}static isAvailable(){return on.forceAllow_?!0:!on.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Cy()&&!Ay()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(t){const e=yt(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const i=_u(e),s=Xh(i,$y);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(t,e){this.myDisconnFrame=document.createElement("iframe");const i={};i[zy]="t",i[ud]=t,i[hd]=e,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(t){const e=yt(t).length;this.bytesReceived+=e,this.stats_.incrementCounter("bytes_received",e)}}class ca{constructor(t,e,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=vy(),window[Fy+this.uniqueCallbackIdentifier]=t,window[Uy+this.uniqueCallbackIdentifier]=e,this.myIFrame=ca.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(l){Dt("frame writing exception"),l.stack&&Dt(l.stack),Dt(l)}}}static createIFrame_(){const t=document.createElement("iframe");if(t.style.display="none",document.body){document.body.appendChild(t);try{t.contentWindow.document||Dt("No IE domain setting required")}catch{const i=document.domain;t.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return t.contentDocument?t.doc=t.contentDocument:t.contentWindow?t.doc=t.contentWindow.document:t.document&&(t.doc=t.document),t}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const t=this.onDisconnect;t&&(this.onDisconnect=null,t())}startLongPoll(t,e){for(this.myID=t,this.myPW=e,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const t={};t[ud]=this.myID,t[hd]=this.myPW,t[dd]=this.currentSerial;let e=this.urlFn(t),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+_d+i.length<=fd;){const a=this.pendingSegs.shift();i=i+"&"+qy+s+"="+a.seg+"&"+Wy+s+"="+a.ts+"&"+jy+s+"="+a.d,s++}return e=e+i,this.addLongPollTag_(e,this.currentSerial),!0}else return!1}enqueueSegment(t,e,i){this.pendingSegs.push({seg:t,ts:e,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(t,e){this.outstandingRequests.add(e);const i=()=>{this.outstandingRequests.delete(e),this.newRequest_()},s=setTimeout(i,Math.floor(Gy)),r=()=>{clearTimeout(s),i()};this.addTag(t,r)}addTag(t,e){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=t,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),e())},i.onerror=()=>{Dt("Long-poll script failed to load: "+t),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=16384,Qy=45e3;let bs=null;typeof MozWebSocket<"u"?bs=MozWebSocket:typeof WebSocket<"u"&&(bs=WebSocket);class Wt{constructor(t,e,i,s,r,a,l){this.connId=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Li(this.connId),this.stats_=la(e),this.connURL=Wt.connectionURL_(e,a,l,s,i),this.nodeAdmin=e.nodeAdmin}static connectionURL_(t,e,i,s,r){const a={};return a[Zh]=aa,typeof location<"u"&&location.hostname&&id.test(location.hostname)&&(a[ed]=nd),e&&(a[td]=e),i&&(a[sd]=i),s&&(a[go]=s),r&&(a[rd]=r),cd(t,od,a)}open(t,e){this.onDisconnect=e,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Me.set("previous_websocket_failure",!0);try{let i;Tu(),this.mySock=new bs(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Wt.forceDisallow_=!0}static isAvailable(){let t=!1;if(typeof navigator<"u"&&navigator.userAgent){const e=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(e);i&&i.length>1&&parseFloat(i[1])<4.4&&(t=!0)}return!t&&bs!==null&&!Wt.forceDisallow_}static previouslyFailed(){return Me.isInMemoryStorage||Me.get("previous_websocket_failure")===!0}markConnectionHealthy(){Me.remove("previous_websocket_failure")}appendFrame_(t){if(this.frames.push(t),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const i=fi(e);this.onMessage(i)}}handleNewFrameCount_(t){this.totalFrames=t,this.frames=[]}extractFrameCount_(t){if(N(this.frames===null,"We already have a frame buffer"),t.length<=6){const e=Number(t);if(!isNaN(e))return this.handleNewFrameCount_(e),null}return this.handleNewFrameCount_(1),t}handleIncomingFrame(t){if(this.mySock===null)return;const e=t.data;if(this.bytesReceived+=e.length,this.stats_.incrementCounter("bytes_received",e.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(e);else{const i=this.extractFrameCount_(e);i!==null&&this.appendFrame_(i)}}send(t){this.resetKeepAlive();const e=yt(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);const i=Xh(e,Ky);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Qy))}sendString_(t){try{this.mySock.send(t)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Wt.responsesRequiredToBeHealthy=2;Wt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(t){this.initTransports_(t)}static get ALL_TRANSPORTS(){return[on,Wt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(t){const e=Wt&&Wt.isAvailable();let i=e&&!Wt.previouslyFailed();if(t.webSocketOnly&&(e||Lt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Wt];else{const s=this.transports_=[];for(const r of wi.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);wi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}wi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=6e4,Xy=5e3,Jy=10*1024,Zy=100*1024,jr="t",Mc="d",tv="s",Lc="r",ev="e",Fc="o",Uc="a",Bc="n",qc="p",nv="h";class iv{constructor(t,e,i,s,r,a,l,u,d,f){this.id=t,this.repoInfo_=e,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=a,this.onReady_=l,this.onDisconnect_=u,this.onKill_=d,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Li("c:"+this.id+":"),this.transportManager_=new wi(e),this.log_("Connection created"),this.start_()}start_(){const t=this.transportManager_.initialTransport();this.conn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(e,i)},Math.floor(0));const s=t.healthyTimeout||0;s>0&&(this.healthyTimeout_=ci(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Zy?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Jy?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(t){return e=>{t===this.conn_?this.onConnectionLost_(e):t===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(t){return e=>{this.state_!==2&&(t===this.rx_?this.onPrimaryMessageReceived_(e):t===this.secondaryConn_?this.onSecondaryMessageReceived_(e):this.log_("message on old connection"))}}sendRequest(t){const e={t:"d",d:t};this.sendData_(e)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(t){if(jr in t){const e=t[jr];e===Uc?this.upgradeIfSecondaryHealthy_():e===Lc?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):e===Fc&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(t){const e=Jn("t",t),i=Jn("d",t);if(e==="c")this.onSecondaryControl_(i);else if(e==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+e)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qc,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Uc,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Bc,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(t){const e=Jn("t",t),i=Jn("d",t);e==="c"?this.onControl_(i):e==="d"&&this.onDataMessage_(i)}onDataMessage_(t){this.onPrimaryResponse_(),this.onMessage_(t)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(t){const e=Jn(jr,t);if(Mc in t){const i=t[Mc];if(e===nv){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(e===Bc){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else e===tv?this.onConnectionShutdown_(i):e===Lc?this.onReset_(i):e===ev?mo("Server Error: "+i):e===Fc?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):mo("Unknown control packet command: "+e)}}onHandshake_(t){const e=t.ts,i=t.v,s=t.h;this.sessionId=t.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,e),aa!==i&&Lt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)}startUpgrade_(t){this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;const e=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(e,i),ci(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Yy))}onReset_(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.host=t,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(t,e){this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(e,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ci(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Xy))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qc,d:{}}}))}onSecondaryConnectionLost_(){const t=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===t||this.rx_===t)&&this.close()}onConnectionLost_(t){this.conn_=null,!t&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Me.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(t){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(t)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{put(t,e,i,s){}merge(t,e,i,s){}refreshAuthToken(t){}refreshAppCheckToken(t){}onDisconnectPut(t,e,i){}onDisconnectMerge(t,e,i){}onDisconnectCancel(t,e){}reportStats(t){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(t){this.allowedEvents_=t,this.listeners_={},N(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...e){if(Array.isArray(this.listeners_[t])){const i=[...this.listeners_[t]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,e)}}on(t,e,i){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:e,context:i});const s=this.getInitialEvent(t);s&&e.apply(i,s)}off(t,e,i){this.validateEventType_(t);const s=this.listeners_[t]||[];for(let r=0;r<s.length;r++)if(s[r].callback===e&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(t){N(this.allowedEvents_.find(e=>e===t),"Unknown event: "+t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns extends md{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Eu()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ns}getInitialEvent(t){return N(t==="online","Unknown event type: "+t),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=32,jc=768;class et{constructor(t,e){if(e===void 0){this.pieces_=t.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=e}toString(){let t="";for(let e=this.pieceNum_;e<this.pieces_.length;e++)this.pieces_[e]!==""&&(t+="/"+this.pieces_[e]);return t||"/"}}function X(){return new et("")}function q(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Se(n){return n.pieces_.length-n.pieceNum_}function nt(n){let t=n.pieceNum_;return t<n.pieces_.length&&t++,new et(n.pieces_,t)}function gd(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function sv(n){let t="";for(let e=n.pieceNum_;e<n.pieces_.length;e++)n.pieces_[e]!==""&&(t+="/"+encodeURIComponent(String(n.pieces_[e])));return t||"/"}function yd(n,t=0){return n.pieces_.slice(n.pieceNum_+t)}function vd(n){if(n.pieceNum_>=n.pieces_.length)return null;const t=[];for(let e=n.pieceNum_;e<n.pieces_.length-1;e++)t.push(n.pieces_[e]);return new et(t,0)}function ft(n,t){const e=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)e.push(n.pieces_[i]);if(t instanceof et)for(let i=t.pieceNum_;i<t.pieces_.length;i++)e.push(t.pieces_[i]);else{const i=t.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&e.push(i[s])}return new et(e,0)}function j(n){return n.pieceNum_>=n.pieces_.length}function Ot(n,t){const e=q(n),i=q(t);if(e===null)return t;if(e===i)return Ot(nt(n),nt(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+n+")")}function ua(n,t){if(Se(n)!==Se(t))return!1;for(let e=n.pieceNum_,i=t.pieceNum_;e<=n.pieces_.length;e++,i++)if(n.pieces_[e]!==t.pieces_[i])return!1;return!0}function zt(n,t){let e=n.pieceNum_,i=t.pieceNum_;if(Se(n)>Se(t))return!1;for(;e<n.pieces_.length;){if(n.pieces_[e]!==t.pieces_[i])return!1;++e,++i}return!0}class rv{constructor(t,e){this.errorPrefix_=e,this.parts_=yd(t,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=js(this.parts_[i]);Ed(this)}}function ov(n,t){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(t),n.byteLength_+=js(t),Ed(n)}function av(n){const t=n.parts_.pop();n.byteLength_-=js(t),n.parts_.length>0&&(n.byteLength_-=1)}function Ed(n){if(n.byteLength_>jc)throw new Error(n.errorPrefix_+"has a key path longer than "+jc+" bytes ("+n.byteLength_+").");if(n.parts_.length>Wc)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Wc+") or object contains a cycle "+xe(n))}function xe(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha extends md{constructor(){super(["visible"]);let t,e;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(e="visibilitychange",t="hidden"):typeof document.mozHidden<"u"?(e="mozvisibilitychange",t="mozHidden"):typeof document.msHidden<"u"?(e="msvisibilitychange",t="msHidden"):typeof document.webkitHidden<"u"&&(e="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,e&&document.addEventListener(e,()=>{const i=!document[t];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new ha}getInitialEvent(t){return N(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=1e3,lv=60*5*1e3,zc=30*1e3,cv=1.3,uv=3e4,hv="server_kill",$c=3;class oe extends pd{constructor(t,e,i,s,r,a,l,u){if(super(),this.repoInfo_=t,this.applicationId_=e,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=a,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=oe.nextPersistentConnectionId_++,this.log_=Li("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Zn,this.maxReconnectDelay_=lv,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u&&!Tu())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ha.getInstance().on("visible",this.onVisible_,this),t.host.indexOf("fblocal")===-1&&Ns.getInstance().on("online",this.onOnline_,this)}sendRequest(t,e,i){const s=++this.requestNumber_,r={r:s,a:t,b:e};this.log_(yt(r)),N(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(t){this.initConnection_();const e=new Ws,s={action:"g",request:{p:t._path.toString(),q:t._queryObject},onComplete:a=>{const l=a.d;a.s==="ok"?e.resolve(l):e.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),e.promise}listen(t,e,i,s){this.initConnection_();const r=t._queryIdentifier,a=t._path.toString();this.log_("Listen called for "+a+" "+r),this.listens.has(a)||this.listens.set(a,new Map),N(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"listen() called for non-default but complete query"),N(!this.listens.get(a).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:e,query:t,tag:i};this.listens.get(a).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(t){const e=this.outstandingGets_[t];this.sendRequest("g",e.request,i=>{delete this.outstandingGets_[t],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),e.onComplete&&e.onComplete(i)})}sendListen_(t){const e=t.query,i=e._path.toString(),s=e._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},a="q";t.tag&&(r.q=e._queryObject,r.t=t.tag),r.h=t.hashFn(),this.sendRequest(a,r,l=>{const u=l.d,d=l.s;oe.warnOnListenWarnings_(u,e),(this.listens.get(i)&&this.listens.get(i).get(s))===t&&(this.log_("listen response",l),d!=="ok"&&this.removeListen_(i,s),t.onComplete&&t.onComplete(d,u))})}static warnOnListenWarnings_(t,e){if(t&&typeof t=="object"&&de(t,"w")){const i=dn(t,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+e._queryParams.getIndex().toString()+'"',r=e._path.toString();Lt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(t)}reduceReconnectDelayIfAdminCredential_(t){(t&&t.length===40||l_(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=zc)}refreshAppCheckToken(t){this.appCheckToken_=t,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const t=this.authToken_,e=a_(t)?"auth":"gauth",i={cred:t};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(e,i,s=>{const r=s.s,a=s.d||"error";this.authToken_===t&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},t=>{const e=t.s,i=t.d||"error";e==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(e,i)})}unlisten(t,e){const i=t._path.toString(),s=t._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),N(t._queryParams.isDefault()||!t._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,t._queryObject,e)}sendUnlisten_(t,e,i,s){this.log_("Unlisten on "+t+" for "+e);const r={p:t},a="n";s&&(r.q=i,r.t=s),this.sendRequest(a,r)}onDisconnectPut(t,e,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",t,e,i):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:e,onComplete:i})}onDisconnectMerge(t,e,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",t,e,i):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:e,onComplete:i})}onDisconnectCancel(t,e){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",t,null,e):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:e})}sendOnDisconnect_(t,e,i,s){const r={p:e,d:i};this.log_("onDisconnect "+t,r),this.sendRequest(t,r,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(t,e,i,s){this.putInternal("p",t,e,i,s)}merge(t,e,i,s){this.putInternal("m",t,e,i,s)}putInternal(t,e,i,s,r){this.initConnection_();const a={p:e,d:i};r!==void 0&&(a.h=r),this.outstandingPuts_.push({action:t,request:a,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+e)}sendPut_(t){const e=this.outstandingPuts_[t].action,i=this.outstandingPuts_[t].request,s=this.outstandingPuts_[t].onComplete;this.outstandingPuts_[t].queued=this.connected_,this.sendRequest(e,i,r=>{this.log_(e+" response",r),delete this.outstandingPuts_[t],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(t){if(this.connected_){const e={c:t};this.log_("reportStats",e),this.sendRequest("s",e,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(t){if("r"in t){this.log_("from server: "+yt(t));const e=t.r,i=this.requestCBHash_[e];i&&(delete this.requestCBHash_[e],i(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}}onDataPush_(t,e){this.log_("handleServerMessage",t,e),t==="d"?this.onDataUpdate_(e.p,e.d,!1,e.t):t==="m"?this.onDataUpdate_(e.p,e.d,!0,e.t):t==="c"?this.onListenRevoked_(e.p,e.q):t==="ac"?this.onAuthRevoked_(e.s,e.d):t==="apc"?this.onAppCheckRevoked_(e.s,e.d):t==="sd"?this.onSecurityDebugPacket_(e):mo("Unrecognized action received from server: "+yt(t)+`
Are you using the latest client?`)}onReady_(t,e){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(t),this.lastSessionId=e,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(t){N(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(t))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)),this.visible_=t}onOnline_(t){t?(this.log_("Browser went online."),this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>uv&&(this.reconnectDelay_=Zn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const t=new Date().getTime()-this.lastConnectionAttemptTime_;let e=Math.max(0,this.reconnectDelay_-t);e=Math.random()*e,this.log_("Trying to reconnect in "+e+"ms"),this.scheduleConnect_(e),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*cv)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),e=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+oe.nextConnectionId_++,r=this.lastSessionId;let a=!1,l=null;const u=function(){l?l.close():(a=!0,i())},d=function(p){N(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:u,sendRequest:d};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,g]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);a?Dt("getToken() completed but was canceled"):(Dt("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=g&&g.token,l=new iv(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,e,i,A=>{Lt(A+" ("+this.repoInfo_.toString()+")"),this.interrupt(hv)},r))}catch(p){this.log_("Failed to get token: "+p),a||(this.repoInfo_.nodeAdmin&&Lt(p),u())}}}interrupt(t){Dt("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(t){Dt("Resuming connection for reason: "+t),delete this.interruptReasons_[t],ql(this.interruptReasons_)&&(this.reconnectDelay_=Zn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(t){const e=t-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:e})}cancelSentTransactions_(){for(let t=0;t<this.outstandingPuts_.length;t++){const e=this.outstandingPuts_[t];e&&"h"in e.request&&e.queued&&(e.onComplete&&e.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(t,e){let i;e?i=e.map(r=>oa(r)).join("$"):i="default";const s=this.removeListen_(t,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(t,e){const i=new et(t).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(e),r.delete(e),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(t,e){Dt("Auth token revoked: "+t+"/"+e),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(t==="invalid_token"||t==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=$c&&(this.reconnectDelay_=zc,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(t,e){Dt("App check token revoked: "+t+"/"+e),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(t==="invalid_token"||t==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=$c&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const t of this.listens.values())for(const e of t.values())this.sendListen_(e);for(let t=0;t<this.outstandingPuts_.length;t++)this.outstandingPuts_[t]&&this.sendPut_(t);for(;this.onDisconnectRequestQueue_.length;){const t=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(t.action,t.pathString,t.data,t.onComplete)}for(let t=0;t<this.outstandingGets_.length;t++)this.outstandingGets_[t]&&this.sendGet_(t)}sendConnectStats_(){const t={};let e="js";t["sdk."+e+"."+Hh.replace(/\./g,"-")]=1,Eu()?t["framework.cordova"]=1:t_()&&(t["framework.reactnative"]=1),this.reportStats(t)}shouldReconnect_(){const t=Ns.getInstance().currentlyOnline();return ql(this.interruptReasons_)&&t}}oe.nextPersistentConnectionId_=0;oe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(t,e){this.name=t,this.node=e}static Wrap(t,e){return new W(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{getCompare(){return this.compare.bind(this)}indexedValueChanged(t,e){const i=new W(Tn,t),s=new W(Tn,e);return this.compare(i,s)!==0}minPost(){return W.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us;class Td extends ir{static get __EMPTY_NODE(){return us}static set __EMPTY_NODE(t){us=t}compare(t,e){return Nn(t.name,e.name)}isDefinedOn(t){throw Cn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(t,e){return!1}minPost(){return W.MIN}maxPost(){return new W(ze,us)}makePost(t,e){return N(typeof t=="string","KeyIndex indexValue must always be a string."),new W(t,us)}toString(){return".key"}}const un=new Td;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(t,e,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let a=1;for(;!t.isEmpty();)if(t=t,a=e?i(t.key,e):1,s&&(a*=-1),a<0)this.isReverse_?t=t.left:t=t.right;else if(a===0){this.nodeStack_.push(t);break}else this.nodeStack_.push(t),this.isReverse_?t=t.right:t=t.left}getNext(){if(this.nodeStack_.length===0)return null;let t=this.nodeStack_.pop(),e;if(this.resultGenerator_?e=this.resultGenerator_(t.key,t.value):e={key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}}}class gt{constructor(t,e,i,s,r){this.key=t,this.value=e,this.color=i??gt.RED,this.left=s??Mt.EMPTY_NODE,this.right=r??Mt.EMPTY_NODE}copy(t,e,i,s,r){return new gt(t??this.key,e??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||!!t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,i){let s=this;const r=i(t,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(t,e,i),null):r===0?s=s.copy(null,e,null,null,null):s=s.copy(null,null,null,null,s.right.insert(t,e,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Mt.EMPTY_NODE;let t=this;return!t.left.isRed_()&&!t.left.left.isRed_()&&(t=t.moveRedLeft_()),t=t.copy(null,null,null,t.left.removeMin_(),null),t.fixUp_()}remove(t,e){let i,s;if(i=this,e(t,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),e(t,i.key)===0){if(i.right.isEmpty())return Mt.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t}moveRedLeft_(){let t=this.colorFlip_();return t.right.left.isRed_()&&(t=t.copy(null,null,null,null,t.right.rotateRight_()),t=t.rotateLeft_(),t=t.colorFlip_()),t}moveRedRight_(){let t=this.colorFlip_();return t.left.left.isRed_()&&(t=t.rotateRight_(),t=t.colorFlip_()),t}rotateLeft_(){const t=this.copy(null,null,gt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight_(){const t=this.copy(null,null,gt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip_(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth_(){const t=this.check_();return Math.pow(2,t)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const t=this.left.check_();if(t!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)}}gt.RED=!0;gt.BLACK=!1;class dv{copy(t,e,i,s,r){return this}insert(t,e,i){return new gt(t,e,null)}remove(t,e){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Mt{constructor(t,e=Mt.EMPTY_NODE){this.comparator_=t,this.root_=e}insert(t,e){return new Mt(this.comparator_,this.root_.insert(t,e,this.comparator_).copy(null,null,gt.BLACK,null,null))}remove(t){return new Mt(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,gt.BLACK,null,null))}get(t){let e,i=this.root_;for(;!i.isEmpty();){if(e=this.comparator_(t,i.key),e===0)return i.value;e<0?i=i.left:e>0&&(i=i.right)}return null}getPredecessorKey(t){let e,i=this.root_,s=null;for(;!i.isEmpty();)if(e=this.comparator_(t,i.key),e===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else e<0?i=i.left:e>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(t){return this.root_.inorderTraversal(t)}reverseTraversal(t){return this.root_.reverseTraversal(t)}getIterator(t){return new hs(this.root_,null,this.comparator_,!1,t)}getIteratorFrom(t,e){return new hs(this.root_,t,this.comparator_,!1,e)}getReverseIteratorFrom(t,e){return new hs(this.root_,t,this.comparator_,!0,e)}getReverseIterator(t){return new hs(this.root_,null,this.comparator_,!0,t)}}Mt.EMPTY_NODE=new dv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(n,t){return Nn(n.name,t.name)}function da(n,t){return Nn(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yo;function _v(n){yo=n}const Id=function(n){return typeof n=="number"?"number:"+Jh(n):"string:"+n},wd=function(n){if(n.isLeafNode()){const t=n.val();N(typeof t=="string"||typeof t=="number"||typeof t=="object"&&de(t,".sv"),"Priority must be a string or number.")}else N(n===yo||n.isEmpty(),"priority of unexpected type.");N(n===yo||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gc;class pt{constructor(t,e=pt.__childrenNodeConstructor.EMPTY_NODE){this.value_=t,this.priorityNode_=e,this.lazyHash_=null,N(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),wd(this.priorityNode_)}static set __childrenNodeConstructor(t){Gc=t}static get __childrenNodeConstructor(){return Gc}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(t){return new pt(this.value_,t)}getImmediateChild(t){return t===".priority"?this.priorityNode_:pt.__childrenNodeConstructor.EMPTY_NODE}getChild(t){return j(t)?this:q(t)===".priority"?this.priorityNode_:pt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(t,e){return null}updateImmediateChild(t,e){return t===".priority"?this.updatePriority(e):e.isEmpty()&&t!==".priority"?this:pt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,e).updatePriority(this.priorityNode_)}updateChild(t,e){const i=q(t);return i===null?e:e.isEmpty()&&i!==".priority"?this:(N(i!==".priority"||Se(t)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,pt.__childrenNodeConstructor.EMPTY_NODE.updateChild(nt(t),e)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(t,e){return!1}val(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let t="";this.priorityNode_.isEmpty()||(t+="priority:"+Id(this.priorityNode_.val())+":");const e=typeof this.value_;t+=e+":",e==="number"?t+=Jh(this.value_):t+=this.value_,this.lazyHash_=Qh(t)}return this.lazyHash_}getValue(){return this.value_}compareTo(t){return t===pt.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof pt.__childrenNodeConstructor?-1:(N(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))}compareToLeafNode_(t){const e=typeof t.value_,i=typeof this.value_,s=pt.VALUE_TYPE_ORDER.indexOf(e),r=pt.VALUE_TYPE_ORDER.indexOf(i);return N(s>=0,"Unknown leaf type: "+e),N(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(t){if(t===this)return!0;if(t.isLeafNode()){const e=t;return this.value_===e.value_&&this.priorityNode_.equals(e.priorityNode_)}else return!1}}pt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cd,Ad;function pv(n){Cd=n}function mv(n){Ad=n}class gv extends ir{compare(t,e){const i=t.node.getPriority(),s=e.node.getPriority(),r=i.compareTo(s);return r===0?Nn(t.name,e.name):r}isDefinedOn(t){return!t.getPriority().isEmpty()}indexedValueChanged(t,e){return!t.getPriority().equals(e.getPriority())}minPost(){return W.MIN}maxPost(){return new W(ze,new pt("[PRIORITY-POST]",Ad))}makePost(t,e){const i=Cd(t);return new W(e,new pt("[PRIORITY-POST]",i))}toString(){return".priority"}}const at=new gv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=Math.log(2);class vv{constructor(t){const e=r=>parseInt(Math.log(r)/yv,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=e(t+1),this.current_=this.count-1;const s=i(this.count);this.bits_=t+1&s}nextBitIsOne(){const t=!(this.bits_&1<<this.current_);return this.current_--,t}}const ks=function(n,t,e,i){n.sort(t);const s=function(u,d){const f=d-u;let p,g;if(f===0)return null;if(f===1)return p=n[u],g=e?e(p):p,new gt(g,p.node,gt.BLACK,null,null);{const A=parseInt(f/2,10)+u,S=s(u,A),V=s(A+1,d);return p=n[A],g=e?e(p):p,new gt(g,p.node,gt.BLACK,S,V)}},r=function(u){let d=null,f=null,p=n.length;const g=function(S,V){const k=p-S,$=p;p-=S;const K=s(k+1,$),J=n[k],ct=e?e(J):J;A(new gt(ct,J.node,V,null,K))},A=function(S){d?(d.left=S,d=S):(f=S,d=S)};for(let S=0;S<u.count;++S){const V=u.nextBitIsOne(),k=Math.pow(2,u.count-(S+1));V?g(k,gt.BLACK):(g(k,gt.BLACK),g(k,gt.RED))}return f},a=new vv(n.length),l=r(a);return new Mt(i||t,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zr;const en={};class re{constructor(t,e){this.indexes_=t,this.indexSet_=e}static get Default(){return N(en&&at,"ChildrenNode.ts has not been loaded"),zr=zr||new re({".priority":en},{".priority":at}),zr}get(t){const e=dn(this.indexes_,t);if(!e)throw new Error("No index defined for "+t);return e instanceof Mt?e:null}hasIndex(t){return de(this.indexSet_,t.toString())}addIndex(t,e){N(t!==un,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=e.getIterator(W.Wrap);let a=r.getNext();for(;a;)s=s||t.isDefinedOn(a.node),i.push(a),a=r.getNext();let l;s?l=ks(i,t.getCompare()):l=en;const u=t.toString(),d=Object.assign({},this.indexSet_);d[u]=t;const f=Object.assign({},this.indexes_);return f[u]=l,new re(f,d)}addToIndexes(t,e){const i=ys(this.indexes_,(s,r)=>{const a=dn(this.indexSet_,r);if(N(a,"Missing index implementation for "+r),s===en)if(a.isDefinedOn(t.node)){const l=[],u=e.getIterator(W.Wrap);let d=u.getNext();for(;d;)d.name!==t.name&&l.push(d),d=u.getNext();return l.push(t),ks(l,a.getCompare())}else return en;else{const l=e.get(t.name);let u=s;return l&&(u=u.remove(new W(t.name,l))),u.insert(t,t.node)}});return new re(i,this.indexSet_)}removeFromIndexes(t,e){const i=ys(this.indexes_,s=>{if(s===en)return s;{const r=e.get(t.name);return r?s.remove(new W(t.name,r)):s}});return new re(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ti;class L{constructor(t,e,i){this.children_=t,this.priorityNode_=e,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&wd(this.priorityNode_),this.children_.isEmpty()&&N(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return ti||(ti=new L(new Mt(da),null,re.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ti}updatePriority(t){return this.children_.isEmpty()?this:new L(this.children_,t,this.indexMap_)}getImmediateChild(t){if(t===".priority")return this.getPriority();{const e=this.children_.get(t);return e===null?ti:e}}getChild(t){const e=q(t);return e===null?this:this.getImmediateChild(e).getChild(nt(t))}hasChild(t){return this.children_.get(t)!==null}updateImmediateChild(t,e){if(N(e,"We should always be passing snapshot nodes"),t===".priority")return this.updatePriority(e);{const i=new W(t,e);let s,r;e.isEmpty()?(s=this.children_.remove(t),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(t,e),r=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?ti:this.priorityNode_;return new L(s,a,r)}}updateChild(t,e){const i=q(t);if(i===null)return e;{N(q(t)!==".priority"||Se(t)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(nt(t),e);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(t){if(this.isEmpty())return null;const e={};let i=0,s=0,r=!0;if(this.forEachChild(at,(a,l)=>{e[a]=l.val(t),i++,r&&L.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):r=!1}),!t&&r&&s<2*i){const a=[];for(const l in e)a[l]=e[l];return a}else return t&&!this.getPriority().isEmpty()&&(e[".priority"]=this.getPriority().val()),e}hash(){if(this.lazyHash_===null){let t="";this.getPriority().isEmpty()||(t+="priority:"+Id(this.getPriority().val())+":"),this.forEachChild(at,(e,i)=>{const s=i.hash();s!==""&&(t+=":"+e+":"+s)}),this.lazyHash_=t===""?"":Qh(t)}return this.lazyHash_}getPredecessorChildName(t,e,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new W(t,e));return r?r.name:null}else return this.children_.getPredecessorKey(t)}getFirstChildName(t){const e=this.resolveIndex_(t);if(e){const i=e.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(t){const e=this.getFirstChildName(t);return e?new W(e,this.children_.get(e)):null}getLastChildName(t){const e=this.resolveIndex_(t);if(e){const i=e.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(t){const e=this.getLastChildName(t);return e?new W(e,this.children_.get(e)):null}forEachChild(t,e){const i=this.resolveIndex_(t);return i?i.inorderTraversal(s=>e(s.name,s.node)):this.children_.inorderTraversal(e)}getIterator(t){return this.getIteratorFrom(t.minPost(),t)}getIteratorFrom(t,e){const i=this.resolveIndex_(e);if(i)return i.getIteratorFrom(t,s=>s);{const s=this.children_.getIteratorFrom(t.name,W.Wrap);let r=s.peek();for(;r!=null&&e.compare(r,t)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(t){return this.getReverseIteratorFrom(t.maxPost(),t)}getReverseIteratorFrom(t,e){const i=this.resolveIndex_(e);if(i)return i.getReverseIteratorFrom(t,s=>s);{const s=this.children_.getReverseIteratorFrom(t.name,W.Wrap);let r=s.peek();for(;r!=null&&e.compare(r,t)>0;)s.getNext(),r=s.peek();return s}}compareTo(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===Fi?-1:0}withIndex(t){if(t===un||this.indexMap_.hasIndex(t))return this;{const e=this.indexMap_.addIndex(t,this.children_);return new L(this.children_,this.priorityNode_,e)}}isIndexed(t){return t===un||this.indexMap_.hasIndex(t)}equals(t){if(t===this)return!0;if(t.isLeafNode())return!1;{const e=t;if(this.getPriority().equals(e.getPriority()))if(this.children_.count()===e.children_.count()){const i=this.getIterator(at),s=e.getIterator(at);let r=i.getNext(),a=s.getNext();for(;r&&a;){if(r.name!==a.name||!r.node.equals(a.node))return!1;r=i.getNext(),a=s.getNext()}return r===null&&a===null}else return!1;else return!1}}resolveIndex_(t){return t===un?null:this.indexMap_.get(t.toString())}}L.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ev extends L{constructor(){super(new Mt(da),L.EMPTY_NODE,re.Default)}compareTo(t){return t===this?0:1}equals(t){return t===this}getPriority(){return this}getImmediateChild(t){return L.EMPTY_NODE}isEmpty(){return!1}}const Fi=new Ev;Object.defineProperties(W,{MIN:{value:new W(Tn,L.EMPTY_NODE)},MAX:{value:new W(ze,Fi)}});Td.__EMPTY_NODE=L.EMPTY_NODE;pt.__childrenNodeConstructor=L;_v(Fi);mv(Fi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=!0;function Tt(n,t=null){if(n===null)return L.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(t=n[".priority"]),N(t===null||typeof t=="string"||typeof t=="number"||typeof t=="object"&&".sv"in t,"Invalid priority type found: "+typeof t),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const e=n;return new pt(e,Tt(t))}if(!(n instanceof Array)&&Tv){const e=[];let i=!1;if(Ft(n,(a,l)=>{if(a.substring(0,1)!=="."){const u=Tt(l);u.isEmpty()||(i=i||!u.getPriority().isEmpty(),e.push(new W(a,u)))}}),e.length===0)return L.EMPTY_NODE;const r=ks(e,fv,a=>a.name,da);if(i){const a=ks(e,at.getCompare());return new L(r,Tt(t),new re({".priority":a},{".priority":at}))}else return new L(r,Tt(t),re.Default)}else{let e=L.EMPTY_NODE;return Ft(n,(i,s)=>{if(de(n,i)&&i.substring(0,1)!=="."){const r=Tt(s);(r.isLeafNode()||!r.isEmpty())&&(e=e.updateImmediateChild(i,r))}}),e.updatePriority(Tt(t))}}pv(Tt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv extends ir{constructor(t){super(),this.indexPath_=t,N(!j(t)&&q(t)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(t){return t.getChild(this.indexPath_)}isDefinedOn(t){return!t.getChild(this.indexPath_).isEmpty()}compare(t,e){const i=this.extractChild(t.node),s=this.extractChild(e.node),r=i.compareTo(s);return r===0?Nn(t.name,e.name):r}makePost(t,e){const i=Tt(t),s=L.EMPTY_NODE.updateChild(this.indexPath_,i);return new W(e,s)}maxPost(){const t=L.EMPTY_NODE.updateChild(this.indexPath_,Fi);return new W(ze,t)}toString(){return yd(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv extends ir{compare(t,e){const i=t.node.compareTo(e.node);return i===0?Nn(t.name,e.name):i}isDefinedOn(t){return!0}indexedValueChanged(t,e){return!t.equals(e)}minPost(){return W.MIN}maxPost(){return W.MAX}makePost(t,e){const i=Tt(t);return new W(e,i)}toString(){return".value"}}const Cv=new wv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(n){return{type:"value",snapshotNode:n}}function In(n,t){return{type:"child_added",snapshotNode:t,childName:n}}function Ci(n,t){return{type:"child_removed",snapshotNode:t,childName:n}}function Ai(n,t,e){return{type:"child_changed",snapshotNode:t,childName:n,oldSnap:e}}function Av(n,t){return{type:"child_moved",snapshotNode:t,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(t){this.index_=t}updateChild(t,e,i,s,r,a){N(t.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=t.getImmediateChild(e);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(a!=null&&(i.isEmpty()?t.hasChild(e)?a.trackChildChange(Ci(e,l)):N(t.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?a.trackChildChange(In(e,i)):a.trackChildChange(Ai(e,i,l))),t.isLeafNode()&&i.isEmpty())?t:t.updateImmediateChild(e,i).withIndex(this.index_)}updateFullNode(t,e,i){return i!=null&&(t.isLeafNode()||t.forEachChild(at,(s,r)=>{e.hasChild(s)||i.trackChildChange(Ci(s,r))}),e.isLeafNode()||e.forEachChild(at,(s,r)=>{if(t.hasChild(s)){const a=t.getImmediateChild(s);a.equals(r)||i.trackChildChange(Ai(s,r,a))}else i.trackChildChange(In(s,r))})),e.withIndex(this.index_)}updatePriority(t,e){return t.isEmpty()?L.EMPTY_NODE:t.updatePriority(e)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(t){this.indexedFilter_=new fa(t.getIndex()),this.index_=t.getIndex(),this.startPost_=Ri.getStartPost_(t),this.endPost_=Ri.getEndPost_(t),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(t){const e=this.startIsInclusive_?this.index_.compare(this.getStartPost(),t)<=0:this.index_.compare(this.getStartPost(),t)<0,i=this.endIsInclusive_?this.index_.compare(t,this.getEndPost())<=0:this.index_.compare(t,this.getEndPost())<0;return e&&i}updateChild(t,e,i,s,r,a){return this.matches(new W(e,i))||(i=L.EMPTY_NODE),this.indexedFilter_.updateChild(t,e,i,s,r,a)}updateFullNode(t,e,i){e.isLeafNode()&&(e=L.EMPTY_NODE);let s=e.withIndex(this.index_);s=s.updatePriority(L.EMPTY_NODE);const r=this;return e.forEachChild(at,(a,l)=>{r.matches(new W(a,l))||(s=s.updateImmediateChild(a,L.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(t,s,i)}updatePriority(t,e){return t}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(t){if(t.hasStart()){const e=t.getIndexStartName();return t.getIndex().makePost(t.getIndexStartValue(),e)}else return t.getIndex().minPost()}static getEndPost_(t){if(t.hasEnd()){const e=t.getIndexEndName();return t.getIndex().makePost(t.getIndexEndValue(),e)}else return t.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rv{constructor(t){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=e=>{const i=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ri(t),this.index_=t.getIndex(),this.limit_=t.getLimit(),this.reverse_=!t.isViewFromLeft(),this.startIsInclusive_=!t.startAfterSet_,this.endIsInclusive_=!t.endBeforeSet_}updateChild(t,e,i,s,r,a){return this.rangedFilter_.matches(new W(e,i))||(i=L.EMPTY_NODE),t.getImmediateChild(e).equals(i)?t:t.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(t,e,i,s,r,a):this.fullLimitUpdateChild_(t,e,i,r,a)}updateFullNode(t,e,i){let s;if(e.isLeafNode()||e.isEmpty())s=L.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<e.numChildren()&&e.isIndexed(this.index_)){s=L.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=e.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;r.hasNext()&&a<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),a++;else break;else continue}}else{s=e.withIndex(this.index_),s=s.updatePriority(L.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let a=0;for(;r.hasNext();){const l=r.getNext();a<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?a++:s=s.updateImmediateChild(l.name,L.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(t,s,i)}updatePriority(t,e){return t}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(t,e,i,s,r){let a;if(this.reverse_){const p=this.index_.getCompare();a=(g,A)=>p(A,g)}else a=this.index_.getCompare();const l=t;N(l.numChildren()===this.limit_,"");const u=new W(e,i),d=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(u);if(l.hasChild(e)){const p=l.getImmediateChild(e);let g=s.getChildAfterChild(this.index_,d,this.reverse_);for(;g!=null&&(g.name===e||l.hasChild(g.name));)g=s.getChildAfterChild(this.index_,g,this.reverse_);const A=g==null?1:a(g,u);if(f&&!i.isEmpty()&&A>=0)return r?.trackChildChange(Ai(e,i,p)),l.updateImmediateChild(e,i);{r?.trackChildChange(Ci(e,p));const V=l.updateImmediateChild(e,L.EMPTY_NODE);return g!=null&&this.rangedFilter_.matches(g)?(r?.trackChildChange(In(g.name,g.node)),V.updateImmediateChild(g.name,g.node)):V}}else return i.isEmpty()?t:f&&a(d,u)>=0?(r!=null&&(r.trackChildChange(Ci(d.name,d.node)),r.trackChildChange(In(e,i))),l.updateImmediateChild(e,i).updateImmediateChild(d.name,L.EMPTY_NODE)):t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=at}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return N(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return N(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Tn}hasEnd(){return this.endSet_}getIndexEndValue(){return N(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return N(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ze}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return N(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===at}copy(){const t=new _a;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.startAfterSet_=this.startAfterSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.endBeforeSet_=this.endBeforeSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t}}function Sv(n){return n.loadsAllData()?new fa(n.getIndex()):n.hasLimit()?new Rv(n):new Ri(n)}function Hc(n){const t={};if(n.isDefault())return t;let e;if(n.index_===at?e="$priority":n.index_===Cv?e="$value":n.index_===un?e="$key":(N(n.index_ instanceof Iv,"Unrecognized index type!"),e=n.index_.toString()),t.orderBy=yt(e),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";t[i]=yt(n.indexStartValue_),n.startNameSet_&&(t[i]+=","+yt(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";t[i]=yt(n.indexEndValue_),n.endNameSet_&&(t[i]+=","+yt(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?t.limitToFirst=n.limit_:t.limitToLast=n.limit_),t}function Kc(n){const t={};if(n.startSet_&&(t.sp=n.indexStartValue_,n.startNameSet_&&(t.sn=n.indexStartName_),t.sin=!n.startAfterSet_),n.endSet_&&(t.ep=n.indexEndValue_,n.endNameSet_&&(t.en=n.indexEndName_),t.ein=!n.endBeforeSet_),n.limitSet_){t.l=n.limit_;let e=n.viewFrom_;e===""&&(n.isViewFromLeft()?e="l":e="r"),t.vf=e}return n.index_!==at&&(t.i=n.index_.toString()),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends pd{constructor(t,e,i,s){super(),this.repoInfo_=t,this.onDataUpdate_=e,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Li("p:rest:"),this.listens_={}}reportStats(t){throw new Error("Method not implemented.")}static getListenId_(t,e){return e!==void 0?"tag$"+e:(N(t._queryParams.isDefault(),"should have a tag if it's not a default query."),t._path.toString())}listen(t,e,i,s){const r=t._path.toString();this.log_("Listen called for "+r+" "+t._queryIdentifier);const a=Ds.getListenId_(t,i),l={};this.listens_[a]=l;const u=Hc(t._queryParams);this.restRequest_(r+".json",u,(d,f)=>{let p=f;if(d===404&&(p=null,d=null),d===null&&this.onDataUpdate_(r,p,!1,i),dn(this.listens_,a)===l){let g;d?d===401?g="permission_denied":g="rest_error:"+d:g="ok",s(g,null)}})}unlisten(t,e){const i=Ds.getListenId_(t,e);delete this.listens_[i]}get(t){const e=Hc(t._queryParams),i=t._path.toString(),s=new Ws;return this.restRequest_(i+".json",e,(r,a)=>{let l=a;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(t){}restRequest_(t,e={},i){return e.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(e.auth=s.accessToken),r&&r.token&&(e.ac=r.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+t+"?ns="+this.repoInfo_.namespace+c_(e);this.log_("Sending REST request for "+a);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+a+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=fi(l.responseText)}catch{Lt("Failed to parse JSON response for "+a+": "+l.responseText)}i(null,u)}else l.status!==401&&l.status!==404&&Lt("Got unsuccessful REST response for "+a+" Status: "+l.status),i(l.status);i=null}},l.open("GET",a,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(){this.rootNode_=L.EMPTY_NODE}getNode(t){return this.rootNode_.getChild(t)}updateSnapshot(t,e){this.rootNode_=this.rootNode_.updateChild(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(){return{value:null,children:new Map}}function Sd(n,t,e){if(j(t))n.value=e,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(t,e);else{const i=q(t);n.children.has(i)||n.children.set(i,Vs());const s=n.children.get(i);t=nt(t),Sd(s,t,e)}}function vo(n,t,e){n.value!==null?e(t,n.value):bv(n,(i,s)=>{const r=new et(t.toString()+"/"+i);vo(s,r,e)})}function bv(n,t){n.children.forEach((e,i)=>{t(i,e)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{constructor(t){this.collection_=t,this.last_=null}get(){const t=this.collection_.get(),e=Object.assign({},t);return this.last_&&Ft(this.last_,(i,s)=>{e[i]=e[i]-s}),this.last_=t,e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc=10*1e3,kv=30*1e3,Dv=5*60*1e3;class Vv{constructor(t,e){this.server_=e,this.statsToReport_={},this.statsListener_=new Nv(t);const i=Qc+(kv-Qc)*Math.random();ci(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const t=this.statsListener_.get(),e={};let i=!1;Ft(t,(s,r)=>{r>0&&de(this.statsToReport_,s)&&(e[s]=r,i=!0)}),i&&this.server_.reportStats(e),ci(this.reportStats_.bind(this),Math.floor(Math.random()*2*Dv))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $t;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})($t||($t={}));function Pd(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function pa(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ma(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(t,e,i){this.path=t,this.affectedTree=e,this.revert=i,this.type=$t.ACK_USER_WRITE,this.source=Pd()}operationForChild(t){if(j(this.path)){if(this.affectedTree.value!=null)return N(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const e=this.affectedTree.subtree(new et(t));return new xs(X(),e,this.revert)}}else return N(q(this.path)===t,"operationForChild called for unrelated child."),new xs(nt(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(t,e){this.source=t,this.path=e,this.type=$t.LISTEN_COMPLETE}operationForChild(t){return j(this.path)?new Si(this.source,X()):new Si(this.source,nt(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t,e,i){this.source=t,this.path=e,this.snap=i,this.type=$t.OVERWRITE}operationForChild(t){return j(this.path)?new $e(this.source,X(),this.snap.getImmediateChild(t)):new $e(this.source,nt(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,i){this.source=t,this.path=e,this.children=i,this.type=$t.MERGE}operationForChild(t){if(j(this.path)){const e=this.children.subtree(new et(t));return e.isEmpty()?null:e.value?new $e(this.source,X(),e.value):new Pi(this.source,X(),e)}else return N(q(this.path)===t,"Can't get a merge for a child not on the path of the operation"),new Pi(this.source,nt(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t,e,i){this.node_=t,this.fullyInitialized_=e,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(t){if(j(t))return this.isFullyInitialized()&&!this.filtered_;const e=q(t);return this.isCompleteForChild(e)}isCompleteForChild(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(t){this.query_=t,this.index_=this.query_._queryParams.getIndex()}}function Ov(n,t,e,i){const s=[],r=[];return t.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&r.push(Av(a.childName,a.snapshotNode))}),ei(n,s,"child_removed",t,i,e),ei(n,s,"child_added",t,i,e),ei(n,s,"child_moved",r,i,e),ei(n,s,"child_changed",t,i,e),ei(n,s,"value",t,i,e),s}function ei(n,t,e,i,s,r){const a=i.filter(l=>l.type===e);a.sort((l,u)=>Lv(n,l,u)),a.forEach(l=>{const u=Mv(n,l,r);s.forEach(d=>{d.respondsTo(l.type)&&t.push(d.createEvent(u,n.query_))})})}function Mv(n,t,e){return t.type==="value"||t.type==="child_removed"||(t.prevName=e.getPredecessorChildName(t.childName,t.snapshotNode,n.index_)),t}function Lv(n,t,e){if(t.childName==null||e.childName==null)throw Cn("Should only compare child_ events.");const i=new W(t.childName,t.snapshotNode),s=new W(e.childName,e.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(n,t){return{eventCache:n,serverCache:t}}function ui(n,t,e,i){return sr(new Ge(t,e,i),n.serverCache)}function bd(n,t,e,i){return sr(n.eventCache,new Ge(t,e,i))}function Eo(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function He(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $r;const Fv=()=>($r||($r=new Mt(wy)),$r);class st{constructor(t,e=Fv()){this.value=t,this.children=e}static fromObject(t){let e=new st(null);return Ft(t,(i,s)=>{e=e.set(new et(i),s)}),e}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(t,e){if(this.value!=null&&e(this.value))return{path:X(),value:this.value};if(j(t))return null;{const i=q(t),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(nt(t),e);return r!=null?{path:ft(new et(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(t){return this.findRootMostMatchingPathAndValue(t,()=>!0)}subtree(t){if(j(t))return this;{const e=q(t),i=this.children.get(e);return i!==null?i.subtree(nt(t)):new st(null)}}set(t,e){if(j(t))return new st(e,this.children);{const i=q(t),r=(this.children.get(i)||new st(null)).set(nt(t),e),a=this.children.insert(i,r);return new st(this.value,a)}}remove(t){if(j(t))return this.children.isEmpty()?new st(null):new st(null,this.children);{const e=q(t),i=this.children.get(e);if(i){const s=i.remove(nt(t));let r;return s.isEmpty()?r=this.children.remove(e):r=this.children.insert(e,s),this.value===null&&r.isEmpty()?new st(null):new st(this.value,r)}else return this}}get(t){if(j(t))return this.value;{const e=q(t),i=this.children.get(e);return i?i.get(nt(t)):null}}setTree(t,e){if(j(t))return e;{const i=q(t),r=(this.children.get(i)||new st(null)).setTree(nt(t),e);let a;return r.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,r),new st(this.value,a)}}fold(t){return this.fold_(X(),t)}fold_(t,e){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ft(t,s),e)}),e(t,this.value,i)}findOnPath(t,e){return this.findOnPath_(t,X(),e)}findOnPath_(t,e,i){const s=this.value?i(e,this.value):!1;if(s)return s;if(j(t))return null;{const r=q(t),a=this.children.get(r);return a?a.findOnPath_(nt(t),ft(e,r),i):null}}foreachOnPath(t,e){return this.foreachOnPath_(t,X(),e)}foreachOnPath_(t,e,i){if(j(t))return this;{this.value&&i(e,this.value);const s=q(t),r=this.children.get(s);return r?r.foreachOnPath_(nt(t),ft(e,s),i):new st(null)}}foreach(t){this.foreach_(X(),t)}foreach_(t,e){this.children.inorderTraversal((i,s)=>{s.foreach_(ft(t,i),e)}),this.value&&e(t,this.value)}foreachChild(t){this.children.inorderTraversal((e,i)=>{i.value&&t(e,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(t){this.writeTree_=t}static empty(){return new Ht(new st(null))}}function hi(n,t,e){if(j(t))return new Ht(new st(e));{const i=n.writeTree_.findRootMostValueAndPath(t);if(i!=null){const s=i.path;let r=i.value;const a=Ot(s,t);return r=r.updateChild(a,e),new Ht(n.writeTree_.set(s,r))}else{const s=new st(e),r=n.writeTree_.setTree(t,s);return new Ht(r)}}}function Yc(n,t,e){let i=n;return Ft(e,(s,r)=>{i=hi(i,ft(t,s),r)}),i}function Xc(n,t){if(j(t))return Ht.empty();{const e=n.writeTree_.setTree(t,new st(null));return new Ht(e)}}function To(n,t){return Ye(n,t)!=null}function Ye(n,t){const e=n.writeTree_.findRootMostValueAndPath(t);return e!=null?n.writeTree_.get(e.path).getChild(Ot(e.path,t)):null}function Jc(n){const t=[],e=n.writeTree_.value;return e!=null?e.isLeafNode()||e.forEachChild(at,(i,s)=>{t.push(new W(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&t.push(new W(i,s.value))}),t}function we(n,t){if(j(t))return n;{const e=Ye(n,t);return e!=null?new Ht(new st(e)):new Ht(n.writeTree_.subtree(t))}}function Io(n){return n.writeTree_.isEmpty()}function wn(n,t){return Nd(X(),n.writeTree_,t)}function Nd(n,t,e){if(t.value!=null)return e.updateChild(n,t.value);{let i=null;return t.children.inorderTraversal((s,r)=>{s===".priority"?(N(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):e=Nd(ft(n,s),r,e)}),!e.getChild(n).isEmpty()&&i!==null&&(e=e.updateChild(ft(n,".priority"),i)),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n,t){return xd(t,n)}function Uv(n,t,e,i,s){N(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:t,snap:e,writeId:i,visible:s}),s&&(n.visibleWrites=hi(n.visibleWrites,t,e)),n.lastWriteId=i}function Bv(n,t){for(let e=0;e<n.allWrites.length;e++){const i=n.allWrites[e];if(i.writeId===t)return i}return null}function qv(n,t){const e=n.allWrites.findIndex(l=>l.writeId===t);N(e>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[e];n.allWrites.splice(e,1);let s=i.visible,r=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const l=n.allWrites[a];l.visible&&(a>=e&&Wv(l,i.path)?s=!1:zt(i.path,l.path)&&(r=!0)),a--}if(s){if(r)return jv(n),!0;if(i.snap)n.visibleWrites=Xc(n.visibleWrites,i.path);else{const l=i.children;Ft(l,u=>{n.visibleWrites=Xc(n.visibleWrites,ft(i.path,u))})}return!0}else return!1}function Wv(n,t){if(n.snap)return zt(n.path,t);for(const e in n.children)if(n.children.hasOwnProperty(e)&&zt(ft(n.path,e),t))return!0;return!1}function jv(n){n.visibleWrites=kd(n.allWrites,zv,X()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function zv(n){return n.visible}function kd(n,t,e){let i=Ht.empty();for(let s=0;s<n.length;++s){const r=n[s];if(t(r)){const a=r.path;let l;if(r.snap)zt(e,a)?(l=Ot(e,a),i=hi(i,l,r.snap)):zt(a,e)&&(l=Ot(a,e),i=hi(i,X(),r.snap.getChild(l)));else if(r.children){if(zt(e,a))l=Ot(e,a),i=Yc(i,l,r.children);else if(zt(a,e))if(l=Ot(a,e),j(l))i=Yc(i,X(),r.children);else{const u=dn(r.children,q(l));if(u){const d=u.getChild(nt(l));i=hi(i,X(),d)}}}else throw Cn("WriteRecord should have .snap or .children")}}return i}function Dd(n,t,e,i,s){if(!i&&!s){const r=Ye(n.visibleWrites,t);if(r!=null)return r;{const a=we(n.visibleWrites,t);if(Io(a))return e;if(e==null&&!To(a,X()))return null;{const l=e||L.EMPTY_NODE;return wn(a,l)}}}else{const r=we(n.visibleWrites,t);if(!s&&Io(r))return e;if(!s&&e==null&&!To(r,X()))return null;{const a=function(d){return(d.visible||s)&&(!i||!~i.indexOf(d.writeId))&&(zt(d.path,t)||zt(t,d.path))},l=kd(n.allWrites,a,t),u=e||L.EMPTY_NODE;return wn(l,u)}}}function $v(n,t,e){let i=L.EMPTY_NODE;const s=Ye(n.visibleWrites,t);if(s)return s.isLeafNode()||s.forEachChild(at,(r,a)=>{i=i.updateImmediateChild(r,a)}),i;if(e){const r=we(n.visibleWrites,t);return e.forEachChild(at,(a,l)=>{const u=wn(we(r,new et(a)),l);i=i.updateImmediateChild(a,u)}),Jc(r).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const r=we(n.visibleWrites,t);return Jc(r).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function Gv(n,t,e,i,s){N(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ft(t,e);if(To(n.visibleWrites,r))return null;{const a=we(n.visibleWrites,r);return Io(a)?s.getChild(e):wn(a,s.getChild(e))}}function Hv(n,t,e,i){const s=ft(t,e),r=Ye(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(e)){const a=we(n.visibleWrites,s);return wn(a,i.getNode().getImmediateChild(e))}else return null}function Kv(n,t){return Ye(n.visibleWrites,t)}function Qv(n,t,e,i,s,r,a){let l;const u=we(n.visibleWrites,t),d=Ye(u,X());if(d!=null)l=d;else if(e!=null)l=wn(u,e);else return[];if(l=l.withIndex(a),!l.isEmpty()&&!l.isLeafNode()){const f=[],p=a.getCompare(),g=r?l.getReverseIteratorFrom(i,a):l.getIteratorFrom(i,a);let A=g.getNext();for(;A&&f.length<s;)p(A,i)!==0&&f.push(A),A=g.getNext();return f}else return[]}function Yv(){return{visibleWrites:Ht.empty(),allWrites:[],lastWriteId:-1}}function Os(n,t,e,i){return Dd(n.writeTree,n.treePath,t,e,i)}function ya(n,t){return $v(n.writeTree,n.treePath,t)}function Zc(n,t,e,i){return Gv(n.writeTree,n.treePath,t,e,i)}function Ms(n,t){return Kv(n.writeTree,ft(n.treePath,t))}function Xv(n,t,e,i,s,r){return Qv(n.writeTree,n.treePath,t,e,i,s,r)}function va(n,t,e){return Hv(n.writeTree,n.treePath,t,e)}function Vd(n,t){return xd(ft(n.treePath,t),n.writeTree)}function xd(n,t){return{treePath:n,writeTree:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(){this.changeMap=new Map}trackChildChange(t){const e=t.type,i=t.childName;N(e==="child_added"||e==="child_changed"||e==="child_removed","Only child changes supported for tracking"),N(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(e==="child_added"&&r==="child_removed")this.changeMap.set(i,Ai(i,t.snapshotNode,s.snapshotNode));else if(e==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(e==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ci(i,s.oldSnap));else if(e==="child_changed"&&r==="child_added")this.changeMap.set(i,In(i,t.snapshotNode));else if(e==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ai(i,t.snapshotNode,s.oldSnap));else throw Cn("Illegal combination of changes: "+t+" occurred after "+s)}else this.changeMap.set(i,t)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{getCompleteChild(t){return null}getChildAfterChild(t,e,i){return null}}const Od=new Zv;class Ea{constructor(t,e,i=null){this.writes_=t,this.viewCache_=e,this.optCompleteServerCache_=i}getCompleteChild(t){const e=this.viewCache_.eventCache;if(e.isCompleteForChild(t))return e.getNode().getImmediateChild(t);{const i=this.optCompleteServerCache_!=null?new Ge(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return va(this.writes_,t,i)}}getChildAfterChild(t,e,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:He(this.viewCache_),r=Xv(this.writes_,s,e,1,i,t);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(n){return{filter:n}}function eE(n,t){N(t.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),N(t.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function nE(n,t,e,i,s){const r=new Jv;let a,l;if(e.type===$t.OVERWRITE){const d=e;d.source.fromUser?a=wo(n,t,d.path,d.snap,i,s,r):(N(d.source.fromServer,"Unknown source."),l=d.source.tagged||t.serverCache.isFiltered()&&!j(d.path),a=Ls(n,t,d.path,d.snap,i,s,l,r))}else if(e.type===$t.MERGE){const d=e;d.source.fromUser?a=sE(n,t,d.path,d.children,i,s,r):(N(d.source.fromServer,"Unknown source."),l=d.source.tagged||t.serverCache.isFiltered(),a=Co(n,t,d.path,d.children,i,s,l,r))}else if(e.type===$t.ACK_USER_WRITE){const d=e;d.revert?a=aE(n,t,d.path,i,s,r):a=rE(n,t,d.path,d.affectedTree,i,s,r)}else if(e.type===$t.LISTEN_COMPLETE)a=oE(n,t,e.path,i,r);else throw Cn("Unknown operation type: "+e.type);const u=r.getChanges();return iE(t,a,u),{viewCache:a,changes:u}}function iE(n,t,e){const i=t.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Eo(n);(e.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&e.push(Rd(Eo(t)))}}function Md(n,t,e,i,s,r){const a=t.eventCache;if(Ms(i,e)!=null)return t;{let l,u;if(j(e))if(N(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const d=He(t),f=d instanceof L?d:L.EMPTY_NODE,p=ya(i,f);l=n.filter.updateFullNode(t.eventCache.getNode(),p,r)}else{const d=Os(i,He(t));l=n.filter.updateFullNode(t.eventCache.getNode(),d,r)}else{const d=q(e);if(d===".priority"){N(Se(e)===1,"Can't have a priority with additional path components");const f=a.getNode();u=t.serverCache.getNode();const p=Zc(i,e,f,u);p!=null?l=n.filter.updatePriority(f,p):l=a.getNode()}else{const f=nt(e);let p;if(a.isCompleteForChild(d)){u=t.serverCache.getNode();const g=Zc(i,e,a.getNode(),u);g!=null?p=a.getNode().getImmediateChild(d).updateChild(f,g):p=a.getNode().getImmediateChild(d)}else p=va(i,d,t.serverCache);p!=null?l=n.filter.updateChild(a.getNode(),d,p,f,s,r):l=a.getNode()}}return ui(t,l,a.isFullyInitialized()||j(e),n.filter.filtersNodes())}}function Ls(n,t,e,i,s,r,a,l){const u=t.serverCache;let d;const f=a?n.filter:n.filter.getIndexedFilter();if(j(e))d=f.updateFullNode(u.getNode(),i,null);else if(f.filtersNodes()&&!u.isFiltered()){const A=u.getNode().updateChild(e,i);d=f.updateFullNode(u.getNode(),A,null)}else{const A=q(e);if(!u.isCompleteForPath(e)&&Se(e)>1)return t;const S=nt(e),k=u.getNode().getImmediateChild(A).updateChild(S,i);A===".priority"?d=f.updatePriority(u.getNode(),k):d=f.updateChild(u.getNode(),A,k,S,Od,null)}const p=bd(t,d,u.isFullyInitialized()||j(e),f.filtersNodes()),g=new Ea(s,p,r);return Md(n,p,e,s,g,l)}function wo(n,t,e,i,s,r,a){const l=t.eventCache;let u,d;const f=new Ea(s,t,r);if(j(e))d=n.filter.updateFullNode(t.eventCache.getNode(),i,a),u=ui(t,d,!0,n.filter.filtersNodes());else{const p=q(e);if(p===".priority")d=n.filter.updatePriority(t.eventCache.getNode(),i),u=ui(t,d,l.isFullyInitialized(),l.isFiltered());else{const g=nt(e),A=l.getNode().getImmediateChild(p);let S;if(j(g))S=i;else{const V=f.getCompleteChild(p);V!=null?gd(g)===".priority"&&V.getChild(vd(g)).isEmpty()?S=V:S=V.updateChild(g,i):S=L.EMPTY_NODE}if(A.equals(S))u=t;else{const V=n.filter.updateChild(l.getNode(),p,S,g,f,a);u=ui(t,V,l.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function tu(n,t){return n.eventCache.isCompleteForChild(t)}function sE(n,t,e,i,s,r,a){let l=t;return i.foreach((u,d)=>{const f=ft(e,u);tu(t,q(f))&&(l=wo(n,l,f,d,s,r,a))}),i.foreach((u,d)=>{const f=ft(e,u);tu(t,q(f))||(l=wo(n,l,f,d,s,r,a))}),l}function eu(n,t,e){return e.foreach((i,s)=>{t=t.updateChild(i,s)}),t}function Co(n,t,e,i,s,r,a,l){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let u=t,d;j(e)?d=i:d=new st(null).setTree(e,i);const f=t.serverCache.getNode();return d.children.inorderTraversal((p,g)=>{if(f.hasChild(p)){const A=t.serverCache.getNode().getImmediateChild(p),S=eu(n,A,g);u=Ls(n,u,new et(p),S,s,r,a,l)}}),d.children.inorderTraversal((p,g)=>{const A=!t.serverCache.isCompleteForChild(p)&&g.value===null;if(!f.hasChild(p)&&!A){const S=t.serverCache.getNode().getImmediateChild(p),V=eu(n,S,g);u=Ls(n,u,new et(p),V,s,r,a,l)}}),u}function rE(n,t,e,i,s,r,a){if(Ms(s,e)!=null)return t;const l=t.serverCache.isFiltered(),u=t.serverCache;if(i.value!=null){if(j(e)&&u.isFullyInitialized()||u.isCompleteForPath(e))return Ls(n,t,e,u.getNode().getChild(e),s,r,l,a);if(j(e)){let d=new st(null);return u.getNode().forEachChild(un,(f,p)=>{d=d.set(new et(f),p)}),Co(n,t,e,d,s,r,l,a)}else return t}else{let d=new st(null);return i.foreach((f,p)=>{const g=ft(e,f);u.isCompleteForPath(g)&&(d=d.set(f,u.getNode().getChild(g)))}),Co(n,t,e,d,s,r,l,a)}}function oE(n,t,e,i,s){const r=t.serverCache,a=bd(t,r.getNode(),r.isFullyInitialized()||j(e),r.isFiltered());return Md(n,a,e,i,Od,s)}function aE(n,t,e,i,s,r){let a;if(Ms(i,e)!=null)return t;{const l=new Ea(i,t,s),u=t.eventCache.getNode();let d;if(j(e)||q(e)===".priority"){let f;if(t.serverCache.isFullyInitialized())f=Os(i,He(t));else{const p=t.serverCache.getNode();N(p instanceof L,"serverChildren would be complete if leaf node"),f=ya(i,p)}f=f,d=n.filter.updateFullNode(u,f,r)}else{const f=q(e);let p=va(i,f,t.serverCache);p==null&&t.serverCache.isCompleteForChild(f)&&(p=u.getImmediateChild(f)),p!=null?d=n.filter.updateChild(u,f,p,nt(e),l,r):t.eventCache.getNode().hasChild(f)?d=n.filter.updateChild(u,f,L.EMPTY_NODE,nt(e),l,r):d=u,d.isEmpty()&&t.serverCache.isFullyInitialized()&&(a=Os(i,He(t)),a.isLeafNode()&&(d=n.filter.updateFullNode(d,a,r)))}return a=t.serverCache.isFullyInitialized()||Ms(i,X())!=null,ui(t,d,a,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(t,e){this.query_=t,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new fa(i.getIndex()),r=Sv(i);this.processor_=tE(r);const a=e.serverCache,l=e.eventCache,u=s.updateFullNode(L.EMPTY_NODE,a.getNode(),null),d=r.updateFullNode(L.EMPTY_NODE,l.getNode(),null),f=new Ge(u,a.isFullyInitialized(),s.filtersNodes()),p=new Ge(d,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=sr(p,f),this.eventGenerator_=new xv(this.query_)}get query(){return this.query_}}function cE(n){return n.viewCache_.serverCache.getNode()}function uE(n,t){const e=He(n.viewCache_);return e&&(n.query._queryParams.loadsAllData()||!j(t)&&!e.getImmediateChild(q(t)).isEmpty())?e.getChild(t):null}function nu(n){return n.eventRegistrations_.length===0}function hE(n,t){n.eventRegistrations_.push(t)}function iu(n,t,e){const i=[];if(e){N(t==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const a=r.createCancelEvent(e,s);a&&i.push(a)})}if(t){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const a=n.eventRegistrations_[r];if(!a.matches(t))s.push(a);else if(t.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function su(n,t,e,i){t.type===$t.MERGE&&t.source.queryId!==null&&(N(He(n.viewCache_),"We should always have a full cache before handling merges"),N(Eo(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=nE(n.processor_,s,t,e,i);return eE(n.processor_,r.viewCache),N(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Ld(n,r.changes,r.viewCache.eventCache.getNode(),null)}function dE(n,t){const e=n.viewCache_.eventCache,i=[];return e.getNode().isLeafNode()||e.getNode().forEachChild(at,(r,a)=>{i.push(In(r,a))}),e.isFullyInitialized()&&i.push(Rd(e.getNode())),Ld(n,i,e.getNode(),t)}function Ld(n,t,e,i){const s=i?[i]:n.eventRegistrations_;return Ov(n.eventGenerator_,t,e,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fs;class fE{constructor(){this.views=new Map}}function _E(n){N(!Fs,"__referenceConstructor has already been defined"),Fs=n}function pE(){return N(Fs,"Reference.ts has not been loaded"),Fs}function mE(n){return n.views.size===0}function Ta(n,t,e,i){const s=t.source.queryId;if(s!==null){const r=n.views.get(s);return N(r!=null,"SyncTree gave us an op for an invalid query."),su(r,t,e,i)}else{let r=[];for(const a of n.views.values())r=r.concat(su(a,t,e,i));return r}}function gE(n,t,e,i,s){const r=t._queryIdentifier,a=n.views.get(r);if(!a){let l=Os(e,s?i:null),u=!1;l?u=!0:i instanceof L?(l=ya(e,i),u=!1):(l=L.EMPTY_NODE,u=!1);const d=sr(new Ge(l,u,!1),new Ge(i,s,!1));return new lE(t,d)}return a}function yE(n,t,e,i,s,r){const a=gE(n,t,i,s,r);return n.views.has(t._queryIdentifier)||n.views.set(t._queryIdentifier,a),hE(a,e),dE(a,e)}function vE(n,t,e,i){const s=t._queryIdentifier,r=[];let a=[];const l=Pe(n);if(s==="default")for(const[u,d]of n.views.entries())a=a.concat(iu(d,e,i)),nu(d)&&(n.views.delete(u),d.query._queryParams.loadsAllData()||r.push(d.query));else{const u=n.views.get(s);u&&(a=a.concat(iu(u,e,i)),nu(u)&&(n.views.delete(s),u.query._queryParams.loadsAllData()||r.push(u.query)))}return l&&!Pe(n)&&r.push(new(pE())(t._repo,t._path)),{removed:r,events:a}}function Fd(n){const t=[];for(const e of n.views.values())e.query._queryParams.loadsAllData()||t.push(e);return t}function hn(n,t){let e=null;for(const i of n.views.values())e=e||uE(i,t);return e}function Ud(n,t){if(t._queryParams.loadsAllData())return rr(n);{const i=t._queryIdentifier;return n.views.get(i)}}function Bd(n,t){return Ud(n,t)!=null}function Pe(n){return rr(n)!=null}function rr(n){for(const t of n.views.values())if(t.query._queryParams.loadsAllData())return t;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Us;function EE(n){N(!Us,"__referenceConstructor has already been defined"),Us=n}function TE(){return N(Us,"Reference.ts has not been loaded"),Us}let IE=1;class ru{constructor(t){this.listenProvider_=t,this.syncPointTree_=new st(null),this.pendingWriteTree_=Yv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function qd(n,t,e,i,s){return Uv(n.pendingWriteTree_,t,e,i,s),s?Ui(n,new $e(Pd(),t,e)):[]}function Le(n,t,e=!1){const i=Bv(n.pendingWriteTree_,t);if(qv(n.pendingWriteTree_,t)){let r=new st(null);return i.snap!=null?r=r.set(X(),!0):Ft(i.children,a=>{r=r.set(new et(a),!0)}),Ui(n,new xs(i.path,r,e))}else return[]}function or(n,t,e){return Ui(n,new $e(pa(),t,e))}function wE(n,t,e){const i=st.fromObject(e);return Ui(n,new Pi(pa(),t,i))}function CE(n,t){return Ui(n,new Si(pa(),t))}function AE(n,t,e){const i=wa(n,e);if(i){const s=Ca(i),r=s.path,a=s.queryId,l=Ot(r,t),u=new Si(ma(a),l);return Aa(n,r,u)}else return[]}function Ao(n,t,e,i,s=!1){const r=t._path,a=n.syncPointTree_.get(r);let l=[];if(a&&(t._queryIdentifier==="default"||Bd(a,t))){const u=vE(a,t,e,i);mE(a)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const d=u.removed;if(l=u.events,!s){const f=d.findIndex(g=>g._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(r,(g,A)=>Pe(A));if(f&&!p){const g=n.syncPointTree_.subtree(r);if(!g.isEmpty()){const A=PE(g);for(let S=0;S<A.length;++S){const V=A[S],k=V.query,$=zd(n,V);n.listenProvider_.startListening(di(k),Bs(n,k),$.hashFn,$.onComplete)}}}!p&&d.length>0&&!i&&(f?n.listenProvider_.stopListening(di(t),null):d.forEach(g=>{const A=n.queryToTagMap.get(ar(g));n.listenProvider_.stopListening(di(g),A)}))}bE(n,d)}return l}function RE(n,t,e,i){const s=wa(n,i);if(s!=null){const r=Ca(s),a=r.path,l=r.queryId,u=Ot(a,t),d=new $e(ma(l),u,e);return Aa(n,a,d)}else return[]}function SE(n,t,e,i){const s=wa(n,i);if(s){const r=Ca(s),a=r.path,l=r.queryId,u=Ot(a,t),d=st.fromObject(e),f=new Pi(ma(l),u,d);return Aa(n,a,f)}else return[]}function ou(n,t,e,i=!1){const s=t._path;let r=null,a=!1;n.syncPointTree_.foreachOnPath(s,(g,A)=>{const S=Ot(g,s);r=r||hn(A,S),a=a||Pe(A)});let l=n.syncPointTree_.get(s);l?(a=a||Pe(l),r=r||hn(l,X())):(l=new fE,n.syncPointTree_=n.syncPointTree_.set(s,l));let u;r!=null?u=!0:(u=!1,r=L.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((A,S)=>{const V=hn(S,X());V&&(r=r.updateImmediateChild(A,V))}));const d=Bd(l,t);if(!d&&!t._queryParams.loadsAllData()){const g=ar(t);N(!n.queryToTagMap.has(g),"View does not exist, but we have a tag");const A=NE();n.queryToTagMap.set(g,A),n.tagToQueryMap.set(A,g)}const f=ga(n.pendingWriteTree_,s);let p=yE(l,t,e,f,r,u);if(!d&&!a&&!i){const g=Ud(l,t);p=p.concat(kE(n,t,g))}return p}function Ia(n,t,e){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(t,(a,l)=>{const u=Ot(a,t),d=hn(l,u);if(d)return d});return Dd(s,t,r,e,!0)}function Ui(n,t){return Wd(t,n.syncPointTree_,null,ga(n.pendingWriteTree_,X()))}function Wd(n,t,e,i){if(j(n.path))return jd(n,t,e,i);{const s=t.get(X());e==null&&s!=null&&(e=hn(s,X()));let r=[];const a=q(n.path),l=n.operationForChild(a),u=t.children.get(a);if(u&&l){const d=e?e.getImmediateChild(a):null,f=Vd(i,a);r=r.concat(Wd(l,u,d,f))}return s&&(r=r.concat(Ta(s,n,i,e))),r}}function jd(n,t,e,i){const s=t.get(X());e==null&&s!=null&&(e=hn(s,X()));let r=[];return t.children.inorderTraversal((a,l)=>{const u=e?e.getImmediateChild(a):null,d=Vd(i,a),f=n.operationForChild(a);f&&(r=r.concat(jd(f,l,u,d)))}),s&&(r=r.concat(Ta(s,n,i,e))),r}function zd(n,t){const e=t.query,i=Bs(n,e);return{hashFn:()=>(cE(t)||L.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?AE(n,e._path,i):CE(n,e._path);{const r=Ry(s,e);return Ao(n,e,null,r)}}}}function Bs(n,t){const e=ar(t);return n.queryToTagMap.get(e)}function ar(n){return n._path.toString()+"$"+n._queryIdentifier}function wa(n,t){return n.tagToQueryMap.get(t)}function Ca(n){const t=n.indexOf("$");return N(t!==-1&&t<n.length-1,"Bad queryKey."),{queryId:n.substr(t+1),path:new et(n.substr(0,t))}}function Aa(n,t,e){const i=n.syncPointTree_.get(t);N(i,"Missing sync point for query tag that we're tracking");const s=ga(n.pendingWriteTree_,t);return Ta(i,e,s,null)}function PE(n){return n.fold((t,e,i)=>{if(e&&Pe(e))return[rr(e)];{let s=[];return e&&(s=Fd(e)),Ft(i,(r,a)=>{s=s.concat(a)}),s}})}function di(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(TE())(n._repo,n._path):n}function bE(n,t){for(let e=0;e<t.length;++e){const i=t[e];if(!i._queryParams.loadsAllData()){const s=ar(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function NE(){return IE++}function kE(n,t,e){const i=t._path,s=Bs(n,t),r=zd(n,e),a=n.listenProvider_.startListening(di(t),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)N(!Pe(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((d,f,p)=>{if(!j(d)&&f&&Pe(f))return[rr(f).query];{let g=[];return f&&(g=g.concat(Fd(f).map(A=>A.query))),Ft(p,(A,S)=>{g=g.concat(S)}),g}});for(let d=0;d<u.length;++d){const f=u[d];n.listenProvider_.stopListening(di(f),Bs(n,f))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(t){this.node_=t}getImmediateChild(t){const e=this.node_.getImmediateChild(t);return new Ra(e)}node(){return this.node_}}class Sa{constructor(t,e){this.syncTree_=t,this.path_=e}getImmediateChild(t){const e=ft(this.path_,t);return new Sa(this.syncTree_,e)}node(){return Ia(this.syncTree_,this.path_)}}const DE=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},au=function(n,t,e){if(!n||typeof n!="object")return n;if(N(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return VE(n[".sv"],t,e);if(typeof n[".sv"]=="object")return xE(n[".sv"],t);N(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},VE=function(n,t,e){switch(n){case"timestamp":return e.timestamp;default:N(!1,"Unexpected server value: "+n)}},xE=function(n,t,e){n.hasOwnProperty("increment")||N(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&N(!1,"Unexpected increment value: "+i);const s=t.node();if(N(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},OE=function(n,t,e,i){return Pa(t,new Sa(e,n),i)},$d=function(n,t,e){return Pa(n,new Ra(t),e)};function Pa(n,t,e){const i=n.getPriority().val(),s=au(i,t.getImmediateChild(".priority"),e);let r;if(n.isLeafNode()){const a=n,l=au(a.getValue(),t,e);return l!==a.getValue()||s!==a.getPriority().val()?new pt(l,Tt(s)):n}else{const a=n;return r=a,s!==a.getPriority().val()&&(r=r.updatePriority(new pt(s))),a.forEachChild(at,(l,u)=>{const d=Pa(u,t.getImmediateChild(l),e);d!==u&&(r=r.updateImmediateChild(l,d))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(t="",e=null,i={children:{},childCount:0}){this.name=t,this.parent=e,this.node=i}}function Na(n,t){let e=t instanceof et?t:new et(t),i=n,s=q(e);for(;s!==null;){const r=dn(i.node.children,s)||{children:{},childCount:0};i=new ba(s,i,r),e=nt(e),s=q(e)}return i}function Dn(n){return n.node.value}function Gd(n,t){n.node.value=t,Ro(n)}function Hd(n){return n.node.childCount>0}function ME(n){return Dn(n)===void 0&&!Hd(n)}function lr(n,t){Ft(n.node.children,(e,i)=>{t(new ba(e,n,i))})}function Kd(n,t,e,i){e&&!i&&t(n),lr(n,s=>{Kd(s,t,!0,i)}),e&&i&&t(n)}function LE(n,t,e){let i=e?n:n.parent;for(;i!==null;){if(t(i))return!0;i=i.parent}return!1}function Bi(n){return new et(n.parent===null?n.name:Bi(n.parent)+"/"+n.name)}function Ro(n){n.parent!==null&&FE(n.parent,n.name,n)}function FE(n,t,e){const i=ME(e),s=de(n.node.children,t);i&&s?(delete n.node.children[t],n.node.childCount--,Ro(n)):!i&&!s&&(n.node.children[t]=e.node,n.node.childCount++,Ro(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE=/[\[\].#$\/\u0000-\u001F\u007F]/,BE=/[\[\].#$\u0000-\u001F\u007F]/,Gr=10*1024*1024,Qd=function(n){return typeof n=="string"&&n.length!==0&&!UE.test(n)},Yd=function(n){return typeof n=="string"&&n.length!==0&&!BE.test(n)},qE=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Yd(n)},WE=function(n,t,e,i){i&&t===void 0||ka(No(n,"value"),t,e)},ka=function(n,t,e){const i=e instanceof et?new rv(e,n):e;if(t===void 0)throw new Error(n+"contains undefined "+xe(i));if(typeof t=="function")throw new Error(n+"contains a function "+xe(i)+" with contents = "+t.toString());if(Yh(t))throw new Error(n+"contains "+t.toString()+" "+xe(i));if(typeof t=="string"&&t.length>Gr/3&&js(t)>Gr)throw new Error(n+"contains a string greater than "+Gr+" utf8 bytes "+xe(i)+" ('"+t.substring(0,50)+"...')");if(t&&typeof t=="object"){let s=!1,r=!1;if(Ft(t,(a,l)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(r=!0,!Qd(a)))throw new Error(n+" contains an invalid key ("+a+") "+xe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ov(i,a),ka(n,l,i),av(i)}),s&&r)throw new Error(n+' contains ".value" child '+xe(i)+" in addition to actual children.")}},Xd=function(n,t,e,i){if(!(i&&e===void 0)&&!Yd(e))throw new Error(No(n,t)+'was an invalid path = "'+e+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},jE=function(n,t,e,i){e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),Xd(n,t,e,i)},zE=function(n,t){if(q(t)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},$E=function(n,t){const e=t.path.toString();if(typeof t.repoInfo.host!="string"||t.repoInfo.host.length===0||!Qd(t.repoInfo.namespace)&&t.repoInfo.host.split(":")[0]!=="localhost"||e.length!==0&&!qE(e))throw new Error(No(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GE{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Da(n,t){let e=null;for(let i=0;i<t.length;i++){const s=t[i],r=s.getPath();e!==null&&!ua(r,e.path)&&(n.eventLists_.push(e),e=null),e===null&&(e={events:[],path:r}),e.events.push(s)}e&&n.eventLists_.push(e)}function Jd(n,t,e){Da(n,e),Zd(n,i=>ua(i,t))}function he(n,t,e){Da(n,e),Zd(n,i=>zt(i,t)||zt(t,i))}function Zd(n,t){n.recursionDepth_++;let e=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;t(r)?(HE(n.eventLists_[i]),n.eventLists_[i]=null):e=!1}}e&&(n.eventLists_=[]),n.recursionDepth_--}function HE(n){for(let t=0;t<n.events.length;t++){const e=n.events[t];if(e!==null){n.events[t]=null;const i=e.getEventRunner();Be&&Dt("event: "+e.toString()),kn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE="repo_interrupt",QE=25;class YE{constructor(t,e,i,s){this.repoInfo_=t,this.forceRestClient_=e,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new GE,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Vs(),this.transactionQueueTree_=new ba,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function XE(n,t,e){if(n.stats_=la(n.repoInfo_),n.forceRestClient_||Ny())n.server_=new Ds(n.repoInfo_,(i,s,r,a)=>{lu(n,i,s,r,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>cu(n,!0),0);else{if(typeof e<"u"&&e!==null){if(typeof e!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{yt(e)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new oe(n.repoInfo_,t,(i,s,r,a)=>{lu(n,i,s,r,a)},i=>{cu(n,i)},i=>{ZE(n,i)},n.authTokenProvider_,n.appCheckProvider_,e),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Oy(n.repoInfo_,()=>new Vv(n.stats_,n.server_)),n.infoData_=new Pv,n.infoSyncTree_=new ru({startListening:(i,s,r,a)=>{let l=[];const u=n.infoData_.getNode(i._path);return u.isEmpty()||(l=or(n.infoSyncTree_,i._path,u),setTimeout(()=>{a("ok")},0)),l},stopListening:()=>{}}),xa(n,"connected",!1),n.serverSyncTree_=new ru({startListening:(i,s,r,a)=>(n.server_.listen(i,r,s,(l,u)=>{const d=a(l,u);he(n.eventQueue_,i._path,d)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function JE(n){const e=n.infoData_.getNode(new et(".info/serverTimeOffset")).val()||0;return new Date().getTime()+e}function Va(n){return DE({timestamp:JE(n)})}function lu(n,t,e,i,s){n.dataUpdateCount++;const r=new et(t);e=n.interceptServerDataCallback_?n.interceptServerDataCallback_(t,e):e;let a=[];if(s)if(i){const u=ys(e,d=>Tt(d));a=SE(n.serverSyncTree_,r,u,s)}else{const u=Tt(e);a=RE(n.serverSyncTree_,r,u,s)}else if(i){const u=ys(e,d=>Tt(d));a=wE(n.serverSyncTree_,r,u)}else{const u=Tt(e);a=or(n.serverSyncTree_,r,u)}let l=r;a.length>0&&(l=cr(n,r)),he(n.eventQueue_,l,a)}function cu(n,t){xa(n,"connected",t),t===!1&&eT(n)}function ZE(n,t){Ft(t,(e,i)=>{xa(n,e,i)})}function xa(n,t,e){const i=new et("/.info/"+t),s=Tt(e);n.infoData_.updateSnapshot(i,s);const r=or(n.infoSyncTree_,i,s);he(n.eventQueue_,i,r)}function tf(n){return n.nextWriteId_++}function tT(n,t,e,i,s){Oa(n,"set",{path:t.toString(),value:e,priority:i});const r=Va(n),a=Tt(e,i),l=Ia(n.serverSyncTree_,t),u=$d(a,l,r),d=tf(n),f=qd(n.serverSyncTree_,t,u,d,!0);Da(n.eventQueue_,f),n.server_.put(t.toString(),a.val(!0),(g,A)=>{const S=g==="ok";S||Lt("set at "+t+" failed: "+g);const V=Le(n.serverSyncTree_,d,!S);he(n.eventQueue_,t,V),sT(n,s,g,A)});const p=of(n,t);cr(n,p),he(n.eventQueue_,p,[])}function eT(n){Oa(n,"onDisconnectEvents");const t=Va(n),e=Vs();vo(n.onDisconnect_,X(),(s,r)=>{const a=OE(s,r,n.serverSyncTree_,t);Sd(e,s,a)});let i=[];vo(e,X(),(s,r)=>{i=i.concat(or(n.serverSyncTree_,s,r));const a=of(n,s);cr(n,a)}),n.onDisconnect_=Vs(),he(n.eventQueue_,X(),i)}function nT(n,t,e){let i;q(t._path)===".info"?i=ou(n.infoSyncTree_,t,e):i=ou(n.serverSyncTree_,t,e),Jd(n.eventQueue_,t._path,i)}function uu(n,t,e){let i;q(t._path)===".info"?i=Ao(n.infoSyncTree_,t,e):i=Ao(n.serverSyncTree_,t,e),Jd(n.eventQueue_,t._path,i)}function iT(n){n.persistentConnection_&&n.persistentConnection_.interrupt(KE)}function Oa(n,...t){let e="";n.persistentConnection_&&(e=n.persistentConnection_.id+":"),Dt(e,...t)}function sT(n,t,e,i){t&&kn(()=>{if(e==="ok")t(null);else{const s=(e||"error").toUpperCase();let r=s;i&&(r+=": "+i);const a=new Error(r);a.code=s,t(a)}})}function ef(n,t,e){return Ia(n.serverSyncTree_,t,e)||L.EMPTY_NODE}function Ma(n,t=n.transactionQueueTree_){if(t||ur(n,t),Dn(t)){const e=sf(n,t);N(e.length>0,"Sending zero length transaction queue"),e.every(s=>s.status===0)&&rT(n,Bi(t),e)}else Hd(t)&&lr(t,e=>{Ma(n,e)})}function rT(n,t,e){const i=e.map(d=>d.currentWriteId),s=ef(n,t,i);let r=s;const a=s.hash();for(let d=0;d<e.length;d++){const f=e[d];N(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=Ot(t,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const l=r.val(!0),u=t;n.server_.put(u.toString(),l,d=>{Oa(n,"transaction put response",{path:u.toString(),status:d});let f=[];if(d==="ok"){const p=[];for(let g=0;g<e.length;g++)e[g].status=2,f=f.concat(Le(n.serverSyncTree_,e[g].currentWriteId)),e[g].onComplete&&p.push(()=>e[g].onComplete(null,!0,e[g].currentOutputSnapshotResolved)),e[g].unwatcher();ur(n,Na(n.transactionQueueTree_,t)),Ma(n,n.transactionQueueTree_),he(n.eventQueue_,t,f);for(let g=0;g<p.length;g++)kn(p[g])}else{if(d==="datastale")for(let p=0;p<e.length;p++)e[p].status===3?e[p].status=4:e[p].status=0;else{Lt("transaction at "+u.toString()+" failed: "+d);for(let p=0;p<e.length;p++)e[p].status=4,e[p].abortReason=d}cr(n,t)}},a)}function cr(n,t){const e=nf(n,t),i=Bi(e),s=sf(n,e);return oT(n,s,i),i}function oT(n,t,e){if(t.length===0)return;const i=[];let s=[];const a=t.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<t.length;l++){const u=t[l],d=Ot(e,u.path);let f=!1,p;if(N(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)f=!0,p=u.abortReason,s=s.concat(Le(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=QE)f=!0,p="maxretry",s=s.concat(Le(n.serverSyncTree_,u.currentWriteId,!0));else{const g=ef(n,u.path,a);u.currentInputSnapshot=g;const A=t[l].update(g.val());if(A!==void 0){ka("transaction failed: Data returned ",A,u.path);let S=Tt(A);typeof A=="object"&&A!=null&&de(A,".priority")||(S=S.updatePriority(g.getPriority()));const k=u.currentWriteId,$=Va(n),K=$d(S,g,$);u.currentOutputSnapshotRaw=S,u.currentOutputSnapshotResolved=K,u.currentWriteId=tf(n),a.splice(a.indexOf(k),1),s=s.concat(qd(n.serverSyncTree_,u.path,K,u.currentWriteId,u.applyLocally)),s=s.concat(Le(n.serverSyncTree_,k,!0))}else f=!0,p="nodata",s=s.concat(Le(n.serverSyncTree_,u.currentWriteId,!0))}he(n.eventQueue_,e,s),s=[],f&&(t[l].status=2,function(g){setTimeout(g,Math.floor(0))}(t[l].unwatcher),t[l].onComplete&&(p==="nodata"?i.push(()=>t[l].onComplete(null,!1,t[l].currentInputSnapshot)):i.push(()=>t[l].onComplete(new Error(p),!1,null))))}ur(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)kn(i[l]);Ma(n,n.transactionQueueTree_)}function nf(n,t){let e,i=n.transactionQueueTree_;for(e=q(t);e!==null&&Dn(i)===void 0;)i=Na(i,e),t=nt(t),e=q(t);return i}function sf(n,t){const e=[];return rf(n,t,e),e.sort((i,s)=>i.order-s.order),e}function rf(n,t,e){const i=Dn(t);if(i)for(let s=0;s<i.length;s++)e.push(i[s]);lr(t,s=>{rf(n,s,e)})}function ur(n,t){const e=Dn(t);if(e){let i=0;for(let s=0;s<e.length;s++)e[s].status!==2&&(e[i]=e[s],i++);e.length=i,Gd(t,e.length>0?e:void 0)}lr(t,i=>{ur(n,i)})}function of(n,t){const e=Bi(nf(n,t)),i=Na(n.transactionQueueTree_,t);return LE(i,s=>{Hr(n,s)}),Hr(n,i),Kd(i,s=>{Hr(n,s)}),e}function Hr(n,t){const e=Dn(t);if(e){const i=[];let s=[],r=-1;for(let a=0;a<e.length;a++)e[a].status===3||(e[a].status===1?(N(r===a-1,"All SENT items should be at beginning of queue."),r=a,e[a].status=3,e[a].abortReason="set"):(N(e[a].status===0,"Unexpected transaction status in abort"),e[a].unwatcher(),s=s.concat(Le(n.serverSyncTree_,e[a].currentWriteId,!0)),e[a].onComplete&&i.push(e[a].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Gd(t,void 0):e.length=r+1,he(n.eventQueue_,Bi(t),s);for(let a=0;a<i.length;a++)kn(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(n){let t="";const e=n.split("/");for(let i=0;i<e.length;i++)if(e[i].length>0){let s=e[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}t+="/"+s}return t}function lT(n){const t={};n.charAt(0)==="?"&&(n=n.substring(1));for(const e of n.split("&")){if(e.length===0)continue;const i=e.split("=");i.length===2?t[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Lt(`Invalid query segment '${e}' in query '${n}'`)}return t}const hu=function(n,t){const e=cT(n),i=e.namespace;e.domain==="firebase.com"&&ue(e.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&e.domain!=="localhost"&&ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),e.secure||Ty();const s=e.scheme==="ws"||e.scheme==="wss";return{repoInfo:new ld(e.host,e.secure,i,s,t,"",i!==e.subdomain),path:new et(e.pathString)}},cT=function(n){let t="",e="",i="",s="",r="",a=!0,l="https",u=443;if(typeof n=="string"){let d=n.indexOf("//");d>=0&&(l=n.substring(0,d-1),n=n.substring(d+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),t=n.substring(0,Math.min(f,p)),f<p&&(s=aT(n.substring(f,p)));const g=lT(n.substring(Math.min(n.length,p)));d=t.indexOf(":"),d>=0?(a=l==="https"||l==="wss",u=parseInt(t.substring(d+1),10)):d=t.length;const A=t.slice(0,d);if(A.toLowerCase()==="localhost")e="localhost";else if(A.split(".").length<=2)e=A;else{const S=t.indexOf(".");i=t.substring(0,S).toLowerCase(),e=t.substring(S+1),r=i}"ns"in g&&(r=g.ns)}return{host:t,port:u,domain:e,subdomain:i,secure:a,scheme:l,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(t,e,i,s){this.eventType=t,this.eventRegistration=e,this.snapshot=i,this.prevName=s}getPath(){const t=this.snapshot.ref;return this.eventType==="value"?t._path:t.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+yt(this.snapshot.exportVal())}}class lf{constructor(t,e,i){this.eventRegistration=t,this.error=e,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(t,e){this.snapshotCallback=t,this.cancelCallback=e}onValue(t,e){this.snapshotCallback.call(null,t,e)}onCancel(t){return N(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,t)}get hasCancelCallback(){return!!this.cancelCallback}matches(t){return this.snapshotCallback===t.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===t.snapshotCallback.userCallback&&this.snapshotCallback.context===t.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(t,e,i,s){this._repo=t,this._path=e,this._queryParams=i,this._orderByCalled=s}get key(){return j(this._path)?null:gd(this._path)}get ref(){return new fe(this._repo,this._path)}get _queryIdentifier(){const t=Kc(this._queryParams),e=oa(t);return e==="{}"?"default":e}get _queryObject(){return Kc(this._queryParams)}isEqual(t){if(t=Xt(t),!(t instanceof La))return!1;const e=this._repo===t._repo,i=ua(this._path,t._path),s=this._queryIdentifier===t._queryIdentifier;return e&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+sv(this._path)}}class fe extends La{constructor(t,e){super(t,e,new _a,!1)}get parent(){const t=vd(this._path);return t===null?null:new fe(this._repo,t)}get root(){let t=this;for(;t.parent!==null;)t=t.parent;return t}}class bi{constructor(t,e,i){this._node=t,this.ref=e,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(t){const e=new et(t),i=qs(this.ref,t);return new bi(this._node.getChild(e),i,at)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(t){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>t(new bi(s,qs(this.ref,i),at)))}hasChild(t){const e=new et(t);return!this._node.getChild(e).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function kT(n,t){return n=Xt(n),n._checkNotDeleted("ref"),t!==void 0?qs(n._root,t):n._root}function qs(n,t){return n=Xt(n),q(n._path)===null?jE("child","path",t,!1):Xd("child","path",t,!1),new fe(n._repo,ft(n._path,t))}function DT(n,t){n=Xt(n),zE("set",n._path),WE("set",t,n._path,!1);const e=new Ws;return tT(n._repo,n._path,t,null,e.wrapCallback(()=>{})),e.promise}class Fa{constructor(t){this.callbackContext=t}respondsTo(t){return t==="value"}createEvent(t,e){const i=e._queryParams.getIndex();return new af("value",this,new bi(t.snapshotNode,new fe(e._repo,e._path),i))}getEventRunner(t){return t.getEventType()==="cancel"?()=>this.callbackContext.onCancel(t.error):()=>this.callbackContext.onValue(t.snapshot,null)}createCancelEvent(t,e){return this.callbackContext.hasCancelCallback?new lf(this,t,e):null}matches(t){return t instanceof Fa?!t.callbackContext||!this.callbackContext?!0:t.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Ua{constructor(t,e){this.eventType=t,this.callbackContext=e}respondsTo(t){let e=t==="children_added"?"child_added":t;return e=e==="children_removed"?"child_removed":e,this.eventType===e}createCancelEvent(t,e){return this.callbackContext.hasCancelCallback?new lf(this,t,e):null}createEvent(t,e){N(t.childName!=null,"Child events should have a childName.");const i=qs(new fe(e._repo,e._path),t.childName),s=e._queryParams.getIndex();return new af(t.type,this,new bi(t.snapshotNode,i,s),t.prevName)}getEventRunner(t){return t.getEventType()==="cancel"?()=>this.callbackContext.onCancel(t.error):()=>this.callbackContext.onValue(t.snapshot,t.prevName)}matches(t){return t instanceof Ua?this.eventType===t.eventType&&(!this.callbackContext||!t.callbackContext||this.callbackContext.matches(t.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function hT(n,t,e,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const u=e,d=(f,p)=>{uu(n._repo,n,l),u(f,p)};d.userCallback=e.userCallback,d.context=e.context,e=d}const a=new uT(e,r||void 0),l=t==="value"?new Fa(a):new Ua(t,a);return nT(n._repo,n,l),()=>uu(n._repo,n,l)}function VT(n,t,e,i){return hT(n,"value",t,e,i)}_E(fe);EE(fe);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT="FIREBASE_DATABASE_EMULATOR_HOST",So={};let fT=!1;function _T(n,t,e,i){n.repoInfo_=new ld(`${t}:${e}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function pT(n,t,e,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Dt("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=hu(r,s),l=a.repoInfo,u,d;typeof process<"u"&&process.env&&(d=process.env[dT]),d?(u=!0,r=`http://${d}?ns=${l.namespace}`,a=hu(r,s),l=a.repoInfo):u=!a.repoInfo.secure;const f=s&&u?new cn(cn.OWNER):new Dy(n.name,n.options,t);$E("Invalid Firebase Database URL",a),j(a.path)||ue("Database URL must point to the root of a Firebase Database (not including a child path).");const p=gT(l,n,f,new ky(n.name,e));return new yT(p,n)}function mT(n,t){const e=So[t];(!e||e[n.key]!==n)&&ue(`Database ${t}(${n.repoInfo_}) has already been deleted.`),iT(n),delete e[n.key]}function gT(n,t,e,i){let s=So[t.name];s||(s={},So[t.name]=s);let r=s[n.toURLString()];return r&&ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new YE(n,fT,e,i),s[n.toURLString()]=r,r}class yT{constructor(t,e){this._repoInternal=t,this.app=e,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(XE(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new fe(this._repo,X())),this._rootInternal}_delete(){return this._rootInternal!==null&&(mT(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(t){this._rootInternal===null&&ue("Cannot call "+t+" on a deleted database.")}}function xT(n=Ru(),t){const e=Cu(n,"database").getImmediate({identifier:t});if(!e._instanceStarted){const i=mu("database");i&&vT(e,...i)}return e}function vT(n,t,e,i={}){n=Xt(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&ue("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new cn(cn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:yu(i.mockUserToken,n.app.options.projectId);r=new cn(a)}_T(s,t,e,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ET(n){my(Au),_i(new fn("database",(t,{instanceIdentifier:e})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return pT(i,s,r,e)},"PUBLIC").setMultipleInstances(!0)),Fe(kc,Dc,n),Fe(kc,Dc,"esm2017")}oe.prototype.simpleListen=function(n,t){this.sendRequest("q",{p:n},t)};oe.prototype.echo=function(n,t){this.sendRequest("echo",{d:n},t)};ET();export{xT as a,NT as b,RT as c,PT as d,Jg as e,bT as f,ST as g,kT as h,Z_ as i,VT as o,Fe as r,DT as s};
