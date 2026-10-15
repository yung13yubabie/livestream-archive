/* 直播紀錄庫 · shared behaviour: progress bar, back-to-top, nav menu, TOC (collapse + scroll-spy),
   video loading/error states, lazy RAW transcript, archive search/filter. No dependencies. */
(function(){
  'use strict';
  var d=document, root=d.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)');
  function $(s,c){return (c||d).querySelector(s)}
  function $$(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  /* reading progress + back to top */
  var bar=d.createElement('div');bar.className='progress';bar.setAttribute('aria-hidden','true');d.body.appendChild(bar);
  var top=d.createElement('button');top.type='button';top.className='btn btn-primary to-top';top.setAttribute('aria-label','回到頁面頂端');
  top.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  d.body.appendChild(top);
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce.matches?'auto':'smooth'});var s=$('.skip');if(s)s.focus({preventScroll:true})});
  var ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){
      var h=root.scrollHeight-root.clientHeight, y=window.scrollY||root.scrollTop;
      bar.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';
      top.classList.toggle('is-visible',y>600);
      ticking=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();

  /* mobile nav menu */
  var nt=$('.nav-toggle'), nav=$('.site-nav');
  if(nt&&nav){
    nt.hidden=false;
    nt.addEventListener('click',function(){var o=nav.classList.toggle('is-open');nt.setAttribute('aria-expanded',o)});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');nt.setAttribute('aria-expanded','false');nt.focus()}});
  }

  /* TOC: open on desktop, collapsed on smaller screens; scroll-spy */
  var toc=$('.toc details');
  if(toc){
    var mq=matchMedia('(min-width:1024px)');
    var apply=function(){toc.open=mq.matches};
    apply();(mq.addEventListener?mq.addEventListener('change',apply):mq.addListener(apply));
    var links=$$('.toc a[href^="#"]'), map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;
      a.addEventListener('click',function(){if(!mq.matches)toc.open=false})});
    if('IntersectionObserver' in window){
      var heads=Object.keys(map).map(function(id){return d.getElementById(id)}).filter(Boolean), cur=null;
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){cur=e.target.id;links.forEach(function(a){a.removeAttribute('aria-current')});
          if(map[cur]){map[cur].setAttribute('aria-current','true')}}});
      },{rootMargin:'-72px 0px -70% 0px'});
      heads.forEach(function(h){io.observe(h)});
    }
  }

  /* video: loading / error states + duration label */
  $$('.vwrap').forEach(function(w){
    var v=$('video',w);if(!v)return;
    w.dataset.state=v.readyState>=1?'ready':'loading';
    v.addEventListener('loadedmetadata',function(){w.dataset.state='ready';var o=w.parentNode.querySelector('[data-duration]');
      if(o&&isFinite(v.duration)){var s=Math.round(v.duration),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;
        o.textContent='長度 '+h+':'+String(m).padStart(2,'0')+':'+String(x).padStart(2,'0')}});
    v.addEventListener('error',function(){w.dataset.state='error'});
    setTimeout(function(){if(w.dataset.state==='loading'&&v.readyState===0)w.dataset.state='error'},20000);
    var r=$('.vstate-error button',w);
    if(r)r.addEventListener('click',function(){w.dataset.state='loading';v.load();setTimeout(function(){if(w.dataset.state==='loading'&&v.readyState===0)w.dataset.state='error'},20000)});
  });

  /* lazy RAW transcript */
  $$('details[data-src]').forEach(function(dt){
    var box=$('.raw-box',dt), loaded=false;
    function load(){
      box.innerHTML='<div role="status" aria-live="polite"><span class="sr-only">載入中</span><div class="skeleton sk-line w-90"></div><div class="skeleton sk-line"></div><div class="skeleton sk-line w-80"></div><div class="skeleton sk-line w-60"></div><div class="skeleton sk-line w-90"></div></div>';
      fetch(dt.dataset.src).then(function(r){if(!r.ok)throw new Error(r.status);return r.text()}).then(function(t){
        var pre=d.createElement('pre');pre.className='raw';pre.tabIndex=0;pre.textContent=t;box.innerHTML='';box.appendChild(pre);loaded=true;
      }).catch(function(){
        box.innerHTML='<div class="callout callout-error" role="alert"><span class="callout-title">無法載入原文</span><p>請改用下方連結下載 .txt。</p><button type="button" class="btn btn-sm">重試</button></div>';
        $('button',box).addEventListener('click',load);
      });
    }
    dt.addEventListener('toggle',function(){if(dt.open&&!loaded)load()});
  });

  /* archive: client-side search / filter over streams.json */
  var host=$('#archive');
  if(host){
    var list=$('#stream-list'), q=$('#q'), plat=$('#platform'), sort=$('#sort'), tagBox=$('#tags'), count=$('#count'),
        empty=$('#empty'), err=$('#error'), sk=$('#skeleton'), data=[], active={}, ready=false;
    function card(s){
      var tags=(s.tags||[]).map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('');
      var links=(s.links||[]).map(function(l){return '<a class="btn btn-sm" href="'+esc(l.href)+'">'+esc(l.label)+'</a>'}).join('');
      return '<li class="card stream-card card-hover">'+
        '<div class="thumb"><img src="'+esc(s.cover)+'" alt="'+esc(s.coverAlt||'')+'" loading="lazy"></div>'+
        '<div class="body"><div class="meta-row"><span class="date">'+esc(s.date)+'</span><span class="chip chip-primary">'+esc(s.platform)+'</span>'+tags+'</div>'+
        '<h3><a href="'+esc(s.url)+'">'+esc(s.title)+'</a></h3><p>'+esc(s.summary)+'</p>'+
        '<dl class="kv-inline"><div><dt>錄製時段</dt><dd>'+esc(s.recorded)+'</dd></div><div><dt>有人聲</dt><dd>'+esc(s.voiced)+'</dd></div><div><dt>完整錄影</dt><dd>'+esc(s.recording)+'</dd></div></dl>'+
        '<div class="btn-row"><a class="btn btn-primary btn-sm" href="'+esc(s.url)+'">開啟活動頁</a>'+links+'</div></div></li>';
    }
    function render(){
      var term=(q.value||'').trim().toLowerCase();
      var rows=data.filter(function(s){
        if(plat.value&&s.platform!==plat.value)return false;
        for(var t in active){if(active[t]&&(s.tags||[]).indexOf(t)<0)return false}
        if(!term)return true;
        return [s.title,s.summary,s.platform,s.date,(s.tags||[]).join(' ')].join(' ').toLowerCase().indexOf(term)>=0;
      }).sort(function(a,b){return sort.value==='asc'?a.date.localeCompare(b.date):b.date.localeCompare(a.date)});
      list.innerHTML=rows.map(card).join('');
      empty.hidden=rows.length>0;
      count.textContent=rows.length?('共 '+rows.length+' 場'+(rows.length<data.length?'（已篩選，全部 '+data.length+' 場）':'')):'沒有符合的直播';
    }
    function setup(){
      var ps={},ts={};data.forEach(function(s){ps[s.platform]=1;(s.tags||[]).forEach(function(t){ts[t]=1})});
      Object.keys(ps).forEach(function(p){var o=d.createElement('option');o.value=p;o.textContent=p;plat.appendChild(o)});
      Object.keys(ts).forEach(function(t){var b=d.createElement('button');b.type='button';b.className='chip';b.textContent=t;b.setAttribute('aria-pressed','false');
        b.addEventListener('click',function(){active[t]=!active[t];b.setAttribute('aria-pressed',active[t]);render()});tagBox.appendChild(b)});
      [q,plat,sort].forEach(function(el){el.addEventListener('input',render);el.addEventListener('change',render)});
      $('#clear').addEventListener('click',function(){q.value='';plat.value='';active={};$$('button.chip',tagBox).forEach(function(b){b.setAttribute('aria-pressed','false')});render();q.focus()});
      $('#toolbar').hidden=false;render();
    }
    function load(){
      err.hidden=true;sk.hidden=false;list.innerHTML='';host.setAttribute('aria-busy','true');
      fetch('streams.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){
        data=j.streams||[];sk.hidden=true;host.setAttribute('aria-busy','false');
        if(!ready){ready=true;setup()}else render();
      }).catch(function(){sk.hidden=true;host.setAttribute('aria-busy','false');err.hidden=false});
    }
    $('#retry').addEventListener('click',load);
    load();
  }
})();
