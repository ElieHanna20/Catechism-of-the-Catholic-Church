(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function c(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=c(r);fetch(r.href,n)}})();const q=(e,t,c,o,r,n,i,u,x,v)=>{document.querySelector("mark")&&x(t,c,r,n,i,u);const g=e.trim();if(g.length===0)return;const p=g.replace(/([.*+?^${}()|[\]\\])/g,"\\$1"),S=t.split(p).join(`<mark>${p}</mark>`);r.innerHTML=S;const b=document.querySelectorAll("mark");o.length=0,o.push(...b),c.currentIndex=0,console.log(u),v(c,o,u),i.classList.remove("hidden"),n.classList.remove("hidden")},y=(e,t,c,o,r,n)=>{t.currentIndex=0,e=e.split("<mark>").join("").split("</mark>").join(""),c.innerHTML=e,r.classList.add("hidden"),o.classList.add("hidden"),n.innerText=""},m=(e,t,c)=>{e.currentIndex>=t.length?e.currentIndex=0:e.currentIndex<0&&(e.currentIndex=t.length-1);const o=t[e.currentIndex];o?(o.scrollIntoView({behavior:"smooth",block:"center"}),c.innerText=`${e.currentIndex+1} / ${t.length}`):console.warn("Element at currentIndex is undefined:",e.currentIndex)},T=document.querySelector("#sidebar"),k=document.querySelector(".toggle-btn"),w=document.getElementById("search-input"),l=document.querySelector("main"),d=document.querySelector("#input-count"),a=document.querySelector("#down"),h=document.querySelector("#up");let L=l.innerHTML,I=0;const s={currentIndex:0};let f=[];try{a.addEventListener("click",e=>{e.stopPropagation(),++s.currentIndex,m(s,f,d)})}catch(e){console.error("An error occurred with the down button:",e)}try{h.addEventListener("click",e=>{e.stopPropagation(),s.currentIndex--,m(s,f,d)})}catch(e){console.error("An error occurred with the up button:",e)}try{w.addEventListener("input",e=>{clearTimeout(I),I=setTimeout(()=>{const t=e.target.value;if(t.trim().length===0&&document.querySelector("mark")){y(L,s,l,h,a,d);return}q(t,L,s,f,l,h,a,d,y,m)},500)})}catch(e){console.error("An error occurred with the keyup event listener:",e)}k.addEventListener("click",()=>{T.classList.toggle("hidden")});
