'use strict';
const tabs=[...document.querySelectorAll('[role="tab"]')];
const panels=[...document.querySelectorAll('[role="tabpanel"]')];
const key='tech-troubleshooter-checks-v1';
let saved={};
try{const raw=JSON.parse(localStorage.getItem(key)||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw))saved=raw;}catch{}
function show(id,focus=false){
 if(!tabs.some(t=>t.dataset.topic===id))id='wifi';
 tabs.forEach(t=>{const active=t.dataset.topic===id;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;if(active&&focus)t.focus()});
 panels.forEach(p=>p.hidden=p.id!=='panel-'+id);
}
function counts(){
 ['wifi','slow','printer'].forEach(id=>{const all=[...document.querySelectorAll('[data-check^="'+id+'-"]')];const n=all.filter(c=>c.checked).length;document.querySelector('[data-count="'+id+'"]').textContent=n+' of '+all.length+' reviewed'+(n===all.length?' · Ready to retest':'')});
}
function save(){try{localStorage.setItem(key,JSON.stringify(saved))}catch{}counts()}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>{show(t.dataset.topic);history.replaceState(null,'','#'+t.dataset.topic)});
t.addEventListener('keydown',e=>{let j=i;if(e.key==='ArrowRight')j=(i+1)%tabs.length;else if(e.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=tabs.length-1;else return;e.preventDefault();show(tabs[j].dataset.topic,true);history.replaceState(null,'','#'+tabs[j].dataset.topic)})});
document.querySelectorAll('[data-check]').forEach(c=>{c.checked=saved[c.dataset.check]===true;c.addEventListener('change',()=>{saved[c.dataset.check]=c.checked;save()})});
document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-check^="'+b.dataset.reset+'-"]').forEach(c=>{c.checked=false;delete saved[c.dataset.check]});save()}));
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
show(location.hash.slice(1));counts();
