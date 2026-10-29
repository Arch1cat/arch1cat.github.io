(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('.service-photo-slider').forEach(gallery=>{
 const slides=$$('.hero-photo-slide',gallery),dots=$$('.photo-dot',gallery),pause=$('.photo-pause',gallery);
 let current=0,busy=false,userPaused=reduced,hovered=false,visible=true,timer=null,finishTimer=null;
 const schedule=()=>{clearTimeout(timer);if(!userPaused&&!hovered&&visible&&!document.hidden)timer=setTimeout(()=>show((current+1)%slides.length),4200)};
 const updateDots=()=>dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-pressed',String(i===current))});
 function show(index,initial=false){
  if(busy||(!initial&&index===current))return;
  clearTimeout(timer);busy=true;
  const old=current;current=index;slides[index].classList.add('entering');updateDots();
  const finish=()=>{clearTimeout(finishTimer);slides.forEach((slide,i)=>{slide.classList.toggle('active',i===current);slide.classList.remove('entering')});busy=false;schedule()};
  if(reduced)finish();else finishTimer=setTimeout(finish,950);
 }
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
 pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Play photo slideshow':'Pause photo slideshow');
 pause.addEventListener('click',()=>{userPaused=!userPaused;pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Play photo slideshow':'Pause photo slideshow');schedule()});
 gallery.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;clearTimeout(timer)}});gallery.addEventListener('pointerleave',()=>{hovered=false;schedule()});
 gallery.addEventListener('focusin',()=>{hovered=true;clearTimeout(timer)});gallery.addEventListener('focusout',e=>{if(!gallery.contains(e.relatedTarget)){hovered=false;schedule()}});
 document.addEventListener('visibilitychange',schedule);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.05}).observe(gallery);
 const first=$('img',slides[0]);if(first.complete)show(0,true);else{first.addEventListener('load',()=>show(0,true),{once:true});first.addEventListener('error',()=>show(0,true),{once:true})}
});
function choices(buttonSelector,outputSelector,attribute){
 $$(buttonSelector).forEach(button=>button.addEventListener('click',()=>{
  const parent=button.closest('section');$$(buttonSelector,parent).forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
  const output=$(outputSelector,parent);if(output){output.textContent=button.dataset[attribute];if(!reduced&&output.animate)output.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'})}
 }));
}
choices('[data-editorial]','.editorial-answer','editorial');choices('[data-estimate]','.estimate-answer','estimate');choices('[data-cycle]','.cycle-answer','cycle');choices('[data-choice]','.choice-answer','choice');
$$('[data-fold]').forEach(button=>button.addEventListener('click',()=>{$$('[data-fold]',button.closest('section')).forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-expanded',String(b===button))})}));
$$('.detail-drawer,.notebook-lines details').forEach(detail=>{const summary=$('summary',detail);let animation=null,targetOpen=false;summary.addEventListener('click',e=>{if(reduced||!detail.animate)return;e.preventDefault();const start=detail.offsetHeight;animation?.cancel();targetOpen=!targetOpen;if(targetOpen)detail.open=true;const end=targetOpen?detail.scrollHeight:summary.offsetHeight;detail.style.overflow='hidden';animation=detail.animate({height:[`${start}px`,`${end}px`]}, {duration:350,easing:'cubic-bezier(.2,.7,.2,1)'});animation.onfinish=()=>{detail.open=targetOpen;detail.style.overflow='';animation=null}})});
const dialog=$('.gallery-dialog');let lastGalleryButton;
if(dialog){$$('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{lastGalleryButton=button;$('img',dialog).src=button.dataset.lightbox;$('img',dialog).alt=button.dataset.caption;$('p',dialog).textContent=button.dataset.caption;dialog.showModal();$('.lightbox-close',dialog).focus()}));$('.lightbox-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>lastGalleryButton?.focus())}
})();

(() => {
 const dialog=document.querySelector('.journal-dialog');let trigger;
 if(dialog){document.querySelectorAll('[data-journal]').forEach(button=>button.addEventListener('click',()=>{trigger=button;dialog.querySelector('.journal-content').replaceChildren(document.getElementById(button.dataset.journal).content.cloneNode(true));dialog.showModal();dialog.querySelector('.journal-close').focus()}));dialog.querySelector('.journal-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>trigger?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}})}
 document.querySelectorAll('[data-route]').forEach(button=>button.addEventListener('click',()=>{const section=button.closest('section');section.querySelectorAll('[data-route]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});section.querySelectorAll('[data-route-copy]').forEach(p=>p.textContent=p.dataset[button.dataset.route])}));
 document.querySelectorAll('.specialist-info').forEach(detail=>{let animation=null,targetOpen=detail.open;detail.querySelector('summary').addEventListener('click',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||!detail.animate)return;e.preventDefault();const from=detail.offsetHeight;animation?.cancel();targetOpen=!targetOpen;if(targetOpen)detail.open=true;const to=targetOpen?detail.scrollHeight:detail.querySelector('summary').offsetHeight;detail.style.overflow='hidden';animation=detail.animate({height:[from+'px',to+'px']},{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'});animation.onfinish=()=>{detail.open=targetOpen;detail.style.overflow='';animation=null}})});
})();
