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
 // choix du billet avec la souris ou le clavier
 $$('input[name="billet"]').forEach(r=>r.addEventListener('change',()=>{
  $$('.ticket-option').forEach(o=>o.classList.toggle('selected',o.querySelector('input').checked));
  const p=$('#selectedPrice'); if(p)p.textContent=r.closest('.ticket-option').dataset.price+' €';
 }));
 // on garde le billet choisi pour l'afficher sur la page paiement
 const add=$('#addTicket'); if(add)add.addEventListener('click',()=>{
  localStorage.setItem('npCart','1');
  const choix=$('input[name="billet"]:checked');
  if(choix){const o=choix.closest('.ticket-option');localStorage.setItem('npBillet',o.querySelector('.row b').textContent);localStorage.setItem('npPrix',o.dataset.price)}
  updateCart();toast('Ajouté !')});
 // fenêtre Aide : on ferme avec fermer, OK ou Échap
 const modal=$('#infoModal');
 if(modal){
  let lastFocus=null;
  const openModal=()=>{lastFocus=document.activeElement;modal.classList.add('open');const c=$('#closeInfo');if(c)c.focus()};
  const closeModal=()=>{modal.classList.remove('open');if(lastFocus)lastFocus.focus()};
  $$('#openInfo,#openConditions').forEach(b=>b.addEventListener('click',openModal));
  $$('#closeInfo,#closeInfo2').forEach(b=>b.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
 }
 $$('.fake-radio').forEach(x=>x.addEventListener('click',()=>{$$('.fake-radio').forEach(y=>y.classList.remove('selected'));x.classList.add('selected')}));
 // paiement : vérifie les champs et met le curseur sur la première erreur
 const pay=$('#payNow');
 if(pay)pay.addEventListener('click',()=>{
  let first=null;
  $$('[data-required]').forEach(i=>{
   const f=i.closest('.field'); const err=f.querySelector('.error');
   const bad=!i.value.trim()||(i.type==='email'&&!i.validity.valid);
   f.classList.toggle('bad',bad);
   if(bad){i.setAttribute('aria-invalid','true');if(err)i.setAttribute('aria-describedby',err.id);if(!first)first=i}
   else{i.removeAttribute('aria-invalid');i.removeAttribute('aria-describedby')}
  });
  if(first){first.focus()}else{localStorage.setItem('npCart','0');location.href='confirmation.html'}
 });

 // le total change avec le billet choisi et le retrait sur place
 const total=$('#totalPrice');
 if(total){
  const billet=localStorage.getItem('npBillet')||'Standard';
  const prix=Number(localStorage.getItem('npPrix')||29);
  const euros=n=>n.toFixed(2).replace('.',',')+' €';
  $('#billetNom').textContent='Neon Nights × 1 ('+billet+')';
  $('#billetPrix').textContent=euros(prix);
  const majTotal=()=>{
   const surPlace=$('input[name="retrait"]:checked').value==='sur-place';
   const montant=prix+4.90+(surPlace?2:0);
   total.textContent=euros(montant);
   const row=$('#retraitRow'); if(row)row.hidden=!surPlace;
   if(pay)pay.textContent='Payer '+euros(montant)+' maintenant';
  };
  majTotal();
  $$('input[name="retrait"]').forEach(r=>r.addEventListener('change',majTotal));
 }
 const clear=$('#clearBooking'); if(clear)clear.addEventListener('click',()=>{localStorage.setItem('npCart','0');location.href='index.html'});
});