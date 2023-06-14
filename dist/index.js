"use strict";(()=>{var v=()=>{let e=window.location.href;[...document.querySelectorAll("[data-copy-url]")].forEach(i=>{i.addEventListener("click",()=>{navigator.clipboard.writeText(e)})})};var y=(e,n,i={})=>{let t=document.createElement(e);return Object.entries(i).forEach(([s,r])=>{if(s==="class"){t.classList.add(r);return}if(s==="dataset"){Object.entries(r).forEach(([o,a])=>{t.dataset[o]=a});return}if(s==="text"){t.textContent=r;return}if(s==="callback"){t.onload=r;return}t.setAttribute(s,r)}),n.appendChild(t),t};var T=()=>{y("script",document.head,{src:"https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js",callback:e});function e(){[...document.querySelectorAll(".splide")].forEach(i=>{new Splide(i,{type:"loop",gap:"2.5rem",perPage:3,perMove:1,breakpoints:{991:{perPage:2,gap:"2.5rem"},767:{perPage:1,gap:"2.5rem"}}}).mount()})}};var w=e=>{let n=new URL(window.location.href);n.searchParams.set("market",e),history.pushState({},"",n.toString()),sessionStorage.setItem("market",e)};var k=(e,n,i)=>{i=Math.max(0,Math.min(i,e.children.length)),i===e.children.length?e.appendChild(n):(e.insertBefore(n,e.children[i]),[...e.childNodes].indexOf(n)!==i&&e.insertBefore(n,e.children[i]))};var S=(e,n)=>{n.forEach(i=>{let{priorityIn:t}=i.dataset;if(t===e){let{priorityOrder:s}=i.dataset,r=i.parentElement;if(!s||!r)return;k(r,i,Number(s)-1)}})};var H=e=>fetch(e).then(n=>n.text()).then(n=>new DOMParser().parseFromString(n,"text/html"));var q=(e,n)=>{let i=n.map(t=>t.dataset.targetFor);H(e.link).then(t=>{i.map(r=>{let o=t.querySelector(`[data-child-for="${r}"]`);return{parent:r,element:o}}).forEach(({parent:r,element:o})=>{let a=document.querySelector(`[data-target-for="${r}"]`);a&&o&&a.replaceChildren(o)})}).catch(t=>console.error(t))};var A=(e,n)=>document.createComment(`Placeholder for element with market: ${n}`);var b={};var x=(e,n,i)=>{n.forEach(t=>{var r;let{showIn:s}=t.dataset;if(s&&s!=="Global"){if(s===e&&b[e])b[e].forEach(({placeholder:o,element:a})=>{o.replaceWith(a)}),delete b[e];else if(s!==e){let o=A(t,s);t.replaceWith(o),b[s]||(b[s]=[]);let a=Array.from(((r=t.parentElement)==null?void 0:r.children)||[]).indexOf(t);b[s].push({placeholder:o,element:t,originalIndex:a})}}})};var C=e=>{let i=new URLSearchParams(window.location.search).get("market"),t=i||sessionStorage.getItem("market");console.log(i),console.log(sessionStorage.getItem("market")),console.log(t),!(!t||!Array.from(e.options).some(r=>r.value===t))&&(e.value=t,e.dispatchEvent(new Event("change")))};var E=(e,n=document)=>{let i=n.querySelectorAll(e);return i.length?[...i]:[]};var j=()=>{let e=document.querySelector('[data-localise="market-select"]'),n=document.querySelector('[data-localise="market-list"]'),i=document.querySelector('[data-localise="selector-language"]'),t=E('[data-localise="selector-icon"]');if(!e||!n||!i||!t.length)return;let s=E('[data-localise="market-link"]',n),r=E('[data-localise="market-icon"]',n),o=s.filter(l=>!!l.textContent).map((l,f)=>({id:l.textContent,link:l.href,icon:r[f]})),a=E("[data-target-for]"),c=E("[data-show-in]"),m=E("[data-hide-in]"),d=E("[data-priority-in][data-priority-order]"),p={targetElements:a,showInElements:c,priorityInElements:d,hideInElements:m};e.addEventListener("change",l=>{let{value:f}=l.target,u=o.find(h=>h.id===f);u&&(w(u.id),q(u,p.targetElements),x(u.id,p.showInElements,!0),x(u.id,p.hideInElements,!1),S(u.id,p.priorityInElements),t.forEach(h=>{h.src=u.icon.src,h.alt=u.icon.alt}))}),e.addEventListener("marketSelectReady",()=>{C(e),x(e.value,p.showInElements),S(e.value,p.priorityInElements)});let g=o.length;if(e.options.length===g){let l=new Event("marketSelectReady");e.dispatchEvent(l)}else new MutationObserver((f,u)=>{if(e.options.length===o.length){u.disconnect();let h=new Event("marketSelectReady");e.dispatchEvent(h)}}).observe(e,{childList:!0})};var I=()=>{console.log("about"),document.querySelectorAll("select").forEach(r=>{let{mirrorValue:o}=r.dataset;if(!o)return;let a=document.querySelector(`[data-mirror-target="${o}"]`);r.addEventListener("change",c=>{var d;let{value:m}=c.target;m===""&&(m=(d=c.target.dataset.mirrorDefault)!=null?d:""),a.textContent=m,setTimeout(()=>{window.scrollBy(0,1),window.scrollBy(0,-1)},200)})});let n=document.querySelector('select[name="Leadership"]'),i=document.querySelectorAll('.w-dyn-item [fs-cmsfilter-field="market"]'),t=[];i.forEach(r=>{r.textContent&&t.push(r.textContent)}),new Set(t.sort()).forEach(r=>{let o=new Option(r,r);n&&n.add(o)}),y("script",document.head,{src:"https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js",async:!0})};var D=()=>{console.log("jobs"),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",async s=>{let[r]=s,{listInstance:o}=r,[a]=o.items,c=a.element,m=await e();o.clearItems();let d=m.map(g=>n(g,c));await o.addItems(d);let p=r.form.querySelectorAll('[data-element="filter-list"]');for(let g of p){let l=g.querySelector('[data-element="filter"]');if(!l)return;let f=l.parentElement;if(!f)return;l.remove();let{property:u}=g.dataset;if(!u)return;let h=i(m,u);for(let V of h){let M=t(V,l);M&&f.append(M)}}r.storeFiltersData()}]);let e=async()=>{let s={emea:{api:"groupmemea_jobfeedapi_key",sc:"a1d19b3f3a21cdde1558794436300152",subsidiaryName:"Acceleration"},northAmerica:{api:"groupmnorthamerica_jobfeedapi_key",sc:"60497c5c1cfa4d58341ec4060be40b2f",subsidiaryName:"GroupM%20Nexus%20Acceleration"}},r=[];Object.values(s).forEach(a=>{r.push(`https://api.jobvite.com/api/v2/job?api=${a.api}&sc=${a.sc}&subsidiaryName=${a.subsidiaryName}`)});let o=r.map(a=>fetch(a));return Promise.all(o).then(a=>Promise.all(a.map(c=>c.json()))).then(a=>a.reduce((m,d)=>m.concat(d.requisitions),[])).catch(a=>{console.error(a)})},n=(s,r)=>{let o=r.cloneNode(!0),a=o.querySelector('[data-job="title"]'),c=o.querySelector('[data-job="description"]'),m=o.querySelector('[data-job="country"]'),d=o.querySelector('[data-job="department"]'),p=o.querySelector('[data-job="apply"]');return a&&(a.textContent=s.title),c&&(c.textContent=s.briefDescription),m&&(m.textContent=s.location),d&&(d.textContent=s.category),p&&(p.href=s.detailLink),o},i=(s,r)=>{let o=new Set;for(let a of s)o.add(a[r]);return[...o]},t=(s,r)=>{let o=r.cloneNode(!0),a=o.querySelector("span"),c=o.querySelector("input");if(!(!a||!c))return a.textContent=s,c.value=s,o}};var L=(e,n)=>(Array.isArray(n)||(n=[n]),n.map(t=>e.dispatchEvent(new Event(t,{bubbles:!0}))).every(t=>t));var P=()=>{console.log("modals");let e=[...document.querySelectorAll("[data-modal-button]")],n=[...document.querySelectorAll("[data-modal-trigger]")];[...document.querySelectorAll(".splide__arrows")].forEach(r=>{r.addEventListener("click",()=>{e=[...document.querySelectorAll("[data-modal-button]")],t()})});let t=()=>{e.forEach(r=>{r.removeEventListener("click",s),r.addEventListener("click",s)})},s=r=>{let a=r.currentTarget.dataset.modalButton,c=n.find(m=>m.dataset.modalTrigger===a);L(c,"click")};t()};var F=()=>{D(),P()};var N=()=>{console.log("resources");let e=document.querySelector('[fs-cmsfilter-element="filters"]');[...e==null?void 0:e.querySelectorAll("input")].forEach(t=>{let s=t.dataset.inputName,r=s.toLowerCase().replace(/\s+/g,"-");t.name=s,t.id=r,t.nextElementSibling.setAttribute("for",t.id)}),[...document.querySelectorAll('[data-filter="dropdown"]')].forEach(t=>{let s=t.querySelector('[data-filter-toggle="text"]'),r=t.querySelector('[data-filter-toggle="select"]'),o=t.querySelector('[data-filter-toggle="selected"]'),a=t.querySelector('[data-filter-toggle="additional"]'),c=[s,r,o,a];[...t.querySelectorAll("input")].forEach(d=>{d.addEventListener("change",p=>{c.forEach(f=>f.style.display="none");let l=[...t.querySelectorAll("input:checked")].map(f=>f.dataset.inputName);console.log(l),l.length===0?s.style.display="block":l.length===1?(o.textContent=l[0],o.style.display="inline"):l.length>1&&(o.textContent=`${l[0]},\xA0`,o.style.display="inline",a.textContent=`+${l.length-1}`,a.style.display="inline")})})})};var O=()=>{let e=0;y("script",document.head,{src:"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js",defer:!0,callback:t}),y("script",document.head,{src:"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js",defer:!0,callback:t});let n=document.querySelector('[data-sticky="vertical-center"]'),i=`${(window.innerHeight-n.offsetHeight)/2}px`;n.style.top=i;function t(){if(e+=1,e!==2)return;gsap.registerPlugin(ScrollTrigger);let s=document.querySelector(".capabilities_header"),r=[...document.querySelectorAll(".capabilities_list-item")],o=[...document.querySelectorAll(".capabilities_illustration")];gsap.matchMedia().add("(min-width: 768px)",()=>{r.forEach((c,m)=>{let d=gsap.timeline({scrollTrigger:{trigger:c,start:"top 50%",end:"bottom 50%",scrub:1}}),p=o.find(g=>g.classList.contains(`is-${m+1}`));d.to(p,{opacity:1,duration:1})})})}};var R=()=>{let{pathname:e}=window.location;switch(e){case"/about-us":I();break;case"/services":O();break;case"/resources":N();break;case"/careers":F();break}};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{console.log("index"),j(),R(),document.querySelector(".splide")&&T(),document.querySelector("[data-copy-url]")&&v()});})();
