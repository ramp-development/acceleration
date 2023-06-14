"use strict";(()=>{var v=()=>{let e=window.location.href;[...document.querySelectorAll("[data-copy-url]")].forEach(l=>{l.addEventListener("click",()=>{navigator.clipboard.writeText(e)})})};var b=(e,n,l={})=>{let t=document.createElement(e);return Object.entries(l).forEach(([s,o])=>{if(s==="class"){t.classList.add(o);return}if(s==="dataset"){Object.entries(o).forEach(([r,a])=>{t.dataset[r]=a});return}if(s==="text"){t.textContent=o;return}if(s==="callback"){t.onload=o;return}t.setAttribute(s,o)}),n.appendChild(t),t};var T=()=>{b("script",document.head,{src:"https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js",callback:e});function e(){[...document.querySelectorAll(".splide")].forEach(l=>{new Splide(l,{type:"loop",gap:"2.5rem",perPage:3,perMove:1,breakpoints:{991:{perPage:2,gap:"2.5rem"},767:{perPage:1,gap:"2.5rem"}}}).mount()})}};var w=e=>{let n=new URL(window.location.href);n.searchParams.set("market",e),history.pushState({},"",n.toString()),sessionStorage.setItem("market",e)};var k=(e,n,l)=>{l=Math.max(0,Math.min(l,e.children.length)),l===e.children.length?e.appendChild(n):(e.insertBefore(n,e.children[l]),[...e.childNodes].indexOf(n)!==l&&e.insertBefore(n,e.children[l]))};var S=(e,n)=>{n.forEach(l=>{let{priorityIn:t}=l.dataset;if(t===e){let{priorityOrder:s}=l.dataset,o=l.parentElement;if(!s||!o)return;k(o,l,Number(s)-1)}})};var H=e=>fetch(e).then(n=>n.text()).then(n=>new DOMParser().parseFromString(n,"text/html"));var q=(e,n)=>{let l=n.map(t=>t.dataset.targetFor);H(e.link).then(t=>{l.map(o=>{let r=t.querySelector(`[data-child-for="${o}"]`);return{parent:o,element:r}}).forEach(({parent:o,element:r})=>{let a=document.querySelector(`[data-target-for="${o}"]`);a&&r&&a.replaceChildren(r)})}).catch(t=>console.error(t))};var A=(e,n)=>document.createComment(`Placeholder for element with market: ${n}`);var y={};var x=(e,n,l)=>{n.forEach(t=>{var o;let{showIn:s}=t.dataset;if(s&&s!=="Global"){if(s===e&&y[e])y[e].forEach(({placeholder:r,element:a})=>{r.replaceWith(a)}),delete y[e];else if(s!==e){let r=A(t,s);t.replaceWith(r),y[s]||(y[s]=[]);let a=Array.from(((o=t.parentElement)==null?void 0:o.children)||[]).indexOf(t);y[s].push({placeholder:r,element:t,originalIndex:a})}}})};var C=e=>{let l=new URLSearchParams(window.location.search).get("market"),t=l||sessionStorage.getItem("market");console.log(l),console.log(sessionStorage.getItem("market")),console.log(t),!(!t||!Array.from(e.options).some(o=>o.value===t))&&(e.value=t,e.dispatchEvent(new Event("change")))};var E=(e,n=document)=>{let l=n.querySelectorAll(e);return l.length?[...l]:[]};var I=()=>{let e=document.querySelector('[data-localise="market-select"]'),n=document.querySelector('[data-localise="market-list"]'),l=document.querySelector('[data-localise="selector-language"]'),t=E('[data-localise="selector-icon"]');if(!e||!n||!l||!t.length)return;let s=E('[data-localise="market-link"]',n),o=E('[data-localise="market-icon"]',n),r=s.filter(i=>!!i.textContent).map((i,f)=>({id:i.textContent,link:i.href,icon:o[f]})),a=E("[data-target-for]"),c=E("[data-show-in]"),m=E("[data-hide-in]"),d=E("[data-priority-in][data-priority-order]"),p={targetElements:a,showInElements:c,priorityInElements:d,hideInElements:m};e.addEventListener("change",i=>{let{value:f}=i.target,u=r.find(h=>h.id===f);u&&(w(u.id),q(u,p.targetElements),x(u.id,p.showInElements,!0),x(u.id,p.hideInElements,!1),S(u.id,p.priorityInElements),t.forEach(h=>{h.src=u.icon.src,h.alt=u.icon.alt}))}),e.addEventListener("marketSelectReady",()=>{C(e),x(e.value,p.showInElements),S(e.value,p.priorityInElements)});let g=r.length;if(e.options.length===g){let i=new Event("marketSelectReady");e.dispatchEvent(i)}else new MutationObserver((f,u)=>{if(e.options.length===r.length){u.disconnect();let h=new Event("marketSelectReady");e.dispatchEvent(h)}}).observe(e,{childList:!0})};var j=()=>{console.log("about"),document.querySelectorAll("select").forEach(o=>{let{mirrorValue:r}=o.dataset,a=null;r&&(a=document.querySelector(`[data-mirror-target="${r}"]`)),o.addEventListener("change",c=>{var m;if(a){let{value:d}=c.target;d===""&&(d=(m=c.target.dataset.mirrorDefault)!=null?m:""),a.textContent=d}setTimeout(()=>{window.scrollBy(0,1),window.scrollBy(0,-1)},200)})});let n=document.querySelector('select[name="Leadership"]'),l=document.querySelectorAll('.w-dyn-item [fs-cmsfilter-field="market"]'),t=[];l.forEach(o=>{o.textContent&&t.push(o.textContent)}),new Set(t.sort()).forEach(o=>{let r=new Option(o,o);n&&n.add(r)})};var D=()=>{console.log("jobs"),window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsfilter",async s=>{let[o]=s,{listInstance:r}=o,[a]=r.items,c=a.element,m=await e();r.clearItems();let d=m.map(g=>n(g,c));await r.addItems(d);let p=o.form.querySelectorAll('[data-element="filter-list"]');for(let g of p){let i=g.querySelector('[data-element="filter"]');if(!i)return;let f=i.parentElement;if(!f)return;i.remove();let{property:u}=g.dataset;if(!u)return;let h=l(m,u);for(let V of h){let M=t(V,i);M&&f.append(M)}}o.storeFiltersData()}]);let e=async()=>{let s={emea:{api:"groupmemea_jobfeedapi_key",sc:"a1d19b3f3a21cdde1558794436300152",subsidiaryName:"Acceleration"},northAmerica:{api:"groupmnorthamerica_jobfeedapi_key",sc:"60497c5c1cfa4d58341ec4060be40b2f",subsidiaryName:"GroupM%20Nexus%20Acceleration"}},o=[];Object.values(s).forEach(a=>{o.push(`https://api.jobvite.com/api/v2/job?api=${a.api}&sc=${a.sc}&subsidiaryName=${a.subsidiaryName}`)});let r=o.map(a=>fetch(a));return Promise.all(r).then(a=>Promise.all(a.map(c=>c.json()))).then(a=>a.reduce((m,d)=>m.concat(d.requisitions),[])).catch(a=>{console.error(a)})},n=(s,o)=>{let r=o.cloneNode(!0),a=r.querySelector('[data-job="title"]'),c=r.querySelector('[data-job="description"]'),m=r.querySelector('[data-job="country"]'),d=r.querySelector('[data-job="department"]'),p=r.querySelector('[data-job="apply"]');return a&&(a.textContent=s.title),c&&(c.textContent=s.briefDescription),m&&(m.textContent=s.location),d&&(d.textContent=s.category),p&&(p.href=s.detailLink),r},l=(s,o)=>{let r=new Set;for(let a of s)r.add(a[o]);return[...r]},t=(s,o)=>{let r=o.cloneNode(!0),a=r.querySelector("span"),c=r.querySelector("input");if(!(!a||!c))return a.textContent=s,c.value=s,r}};var L=(e,n)=>(Array.isArray(n)||(n=[n]),n.map(t=>e.dispatchEvent(new Event(t,{bubbles:!0}))).every(t=>t));var P=()=>{console.log("modals");let e=[...document.querySelectorAll("[data-modal-button]")],n=[...document.querySelectorAll("[data-modal-trigger]")];[...document.querySelectorAll(".splide__arrows")].forEach(o=>{o.addEventListener("click",()=>{e=[...document.querySelectorAll("[data-modal-button]")],t()})});let t=()=>{e.forEach(o=>{o.removeEventListener("click",s),o.addEventListener("click",s)})},s=o=>{let a=o.currentTarget.dataset.modalButton,c=n.find(m=>m.dataset.modalTrigger===a);L(c,"click")};t()};var F=()=>{D(),P()};var N=()=>{console.log("resources");let e=document.querySelector('[fs-cmsfilter-element="filters"]');[...e==null?void 0:e.querySelectorAll("input")].forEach(t=>{let s=t.dataset.inputName,o=s.toLowerCase().replace(/\s+/g,"-");t.name=s,t.id=o,t.nextElementSibling.setAttribute("for",t.id)}),[...document.querySelectorAll('[data-filter="dropdown"]')].forEach(t=>{let s=t.querySelector('[data-filter-toggle="text"]'),o=t.querySelector('[data-filter-toggle="select"]'),r=t.querySelector('[data-filter-toggle="selected"]'),a=t.querySelector('[data-filter-toggle="additional"]'),c=[s,o,r,a];[...t.querySelectorAll("input")].forEach(d=>{d.addEventListener("change",p=>{c.forEach(f=>f.style.display="none");let i=[...t.querySelectorAll("input:checked")].map(f=>f.dataset.inputName);console.log(i),i.length===0?s.style.display="block":i.length===1?(r.textContent=i[0],r.style.display="inline"):i.length>1&&(r.textContent=`${i[0]},\xA0`,r.style.display="inline",a.textContent=`+${i.length-1}`,a.style.display="inline")})})})};var O=()=>{let e=0;b("script",document.head,{src:"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js",defer:!0,callback:t}),b("script",document.head,{src:"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js",defer:!0,callback:t});let n=document.querySelector('[data-sticky="vertical-center"]'),l=`${(window.innerHeight-n.offsetHeight)/2}px`;n.style.top=l;function t(){if(e+=1,e!==2)return;gsap.registerPlugin(ScrollTrigger);let s=document.querySelector(".capabilities_header"),o=[...document.querySelectorAll(".capabilities_list-item")],r=[...document.querySelectorAll(".capabilities_illustration")];gsap.matchMedia().add("(min-width: 768px)",()=>{o.forEach((c,m)=>{let d=gsap.timeline({scrollTrigger:{trigger:c,start:"top 50%",end:"bottom 50%",scrub:1}}),p=r.find(g=>g.classList.contains(`is-${m+1}`));d.to(p,{opacity:1,duration:1})})})}};var R=()=>{let{pathname:e}=window.location;switch(e){case"/about-us":j();break;case"/services":O();break;case"/resources":N();break;case"/careers":F();break}};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{console.log("index"),I(),R(),document.querySelector(".splide")&&T(),document.querySelector("[data-copy-url]")&&v()});})();
