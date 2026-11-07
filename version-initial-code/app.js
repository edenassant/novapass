
const $=(s,c=document)=>c.querySelector(s); const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const cartCount=()=>Number(localStorage.getItem('npCart')||0);
function updateCart(){const el=$('#cartCount');if(el)el.textContent=cartCount()}
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1200)}
function nav(url){location.href=url}
document.addEventListener('DOMContentLoaded',()=>{
 updateCart();
 $$('.fake-link[data-href],.cart-pill[data-href]').forEach(x=>x.addEventListener('click',()=>nav(x.dataset.href)));
 const spans=$$('.rotator span'); if(spans.length){let i=0;setInterval(()=>{spans[i].classList.remove('active');i=(i+1)%spans.length;spans[i].classList.add('active')},2600)}
 $$('.fake-button[data-href]').forEach(x=>x.addEventListener('click',()=>nav(x.dataset.href)));
 $$('.ticket-option').forEach(x=>x.addEventListener('click',()=>{$$('.ticket-option').forEach(y=>y.classList.remove('selected'));x.classList.add('selected');const p=$('#selectedPrice');if(p)p.textContent=x.dataset.price+' €'}));
 const add=$('#addTicket'); if(add)add.addEventListener('click',()=>{localStorage.setItem('npCart','1');updateCart();toast('Ajouté !')});
 const modal=$('#infoModal'); const opens=$$('#openInfo,#openConditions'); const close=$('#closeInfo'); if(modal)opens.forEach(open=>open.addEventListener('click',()=>modal.classList.add('open'))); if(close&&modal)close.addEventListener('click',()=>modal.classList.remove('open'));
 $$('.fake-radio').forEach(x=>x.addEventListener('click',()=>{$$('.fake-radio').forEach(y=>y.classList.remove('selected'));x.classList.add('selected')}));
 const pay=$('#payNow'); if(pay)pay.addEventListener('click',()=>{let bad=false;$$('[data-required]').forEach(i=>{const f=i.closest('.field');if(!i.value.trim()){f.classList.add('bad');bad=true}else f.classList.remove('bad')});if(!bad){localStorage.setItem('npCart','0');location.href='confirmation.html'}})
 const clear=$('#clearBooking'); if(clear)clear.addEventListener('click',()=>{localStorage.setItem('npCart','0');location.href='index.html'});
});
