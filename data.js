/* Java Sutra - scripts. Blocks are in the same order as in the original single file. */

/* ===== script (line 46130 of original) ===== */
(function () {
  var KW = /\b(class|interface|abstract|final|native|private|protected|public|static|void|new|extends|implements|instanceof|this|super|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|throws|synchronized|volatile|transient|import|package|return|enum|assert|int|long|short|byte|char|float|double|boolean|null|true|false)\b/g;
  function hl(src) {
    var esc = src.replace(/&(?!lt;|gt;|amp;)/g, "&amp;");
    var out = [], re = /("(?:[^"\\\n]|\\.)*")|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\b\d+\b)/g, last = 0, m;
    while ((m = re.exec(esc))) {
      out.push(kw(esc.slice(last, m.index)));
      out.push(m[1] ? '<span class="s">' + m[1] + "</span>" : m[2] ? '<span class="c">' + m[2] + "</span>" : '<span class="n">' + m[3] + "</span>");
      last = re.lastIndex;
    }
    out.push(kw(esc.slice(last)));
    return out.join("");
  }
  function kw(t) { return t.replace(KW, '<span class="k">$1</span>'); }
  document.querySelectorAll(".part:not(#part-notes) pre:not(.ascii):not(.plain) code").forEach(function (el) { el.innerHTML = hl(el.innerHTML); });

  var M = [
    { n: "start()", g: "Run", d: "Starts a new thread. It internally causes run() to execute on the new thread.", c: "t.start();" },
    { n: "run()", g: "Run", d: "Contains the code executed by the thread. Calling run() directly does not create a new thread.", c: "public void run() {\n    System.out.println(\"Running\");\n}" },
    { n: "sleep()", g: "Run", d: "Pauses the currently executing thread. 1000 milliseconds = 1 second.", c: "try {\n    Thread.sleep(2000);\n} catch (InterruptedException e) {\n    e.printStackTrace();\n}" },
    { n: "join()", g: "Run", d: "Makes one thread wait for another thread to finish.", c: "Thread t = new Thread(() -> {\n    System.out.println(\"Thread running\");\n});\n\nt.start();\nt.join();\n\nSystem.out.println(\"Main finished\");" },
    { n: "isAlive()", g: "Inspect", d: "Checks whether a thread is still running. Returns true or false.", c: "System.out.println(t.isAlive());" },
    { n: "currentThread()", g: "Inspect", d: "Returns the currently executing thread.", c: "Thread t = Thread.currentThread();\nSystem.out.println(t.getName());" },
    { n: "getState()", g: "Inspect", d: "Returns the current state: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING or TERMINATED.", c: "System.out.println(t.getState());" },
    { n: "getName() / setName()", g: "Inspect", d: "Returns or changes the thread's name.", c: "System.out.println(t.getName());\nt.setName(\"MyThread\");" },
    { n: "getId() / threadId()", g: "Inspect", d: "Returns the thread's ID. getId() is deprecated in modern Java releases; use threadId() in newer Java APIs.", c: "System.out.println(t.getId());" },
    { n: "getPriority()", g: "Priority", d: "Returns the thread's priority. The default is 5.", c: "System.out.println(t.getPriority());" },
    { n: "setPriority()", g: "Priority", d: "Changes the thread's priority. Range is 1 (MIN) to 10 (MAX), with 5 as NORM.", c: "t.setPriority(8);\nt.setPriority(Thread.MAX_PRIORITY);" },
    { n: "interrupt()", g: "Interrupt", d: "Requests a thread to stop waiting or sleeping, or otherwise respond to interruption. A sleeping thread gets an InterruptedException.", c: "t.interrupt();\n\n// inside the thread:\nThread.sleep(5000);" },
    { n: "isInterrupted()", g: "Interrupt", d: "Checks whether the thread has been interrupted. Does not clear the flag.", c: "System.out.println(t.isInterrupted());" },
    { n: "interrupted()", g: "Interrupt", d: "Checks and clears the interruption status of the current thread.", c: "Thread.interrupted();" },
    { n: "setDaemon()", g: "Daemon", d: "Makes a thread a daemon. Must be called before start().", c: "t.setDaemon(true);" },
    { n: "isDaemon()", g: "Daemon", d: "Checks whether a thread is a daemon.", c: "System.out.println(t.isDaemon());" }
  ];
  var groups = ["All", "Run", "Inspect", "Priority", "Interrupt", "Daemon"], cur = "All";
  var list = document.getElementById("mlist"), q = document.getElementById("mq"), chips = document.getElementById("mchips"), empty = document.getElementById("mempty");
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  groups.forEach(function (g) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = g; b.setAttribute("aria-pressed", g === cur);
    b.addEventListener("click", function () { cur = g; chips.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x.textContent === g); }); render(); });
    chips.appendChild(b);
  });
  function render() {
    var term = q.value.trim().toLowerCase(), n = 0;
    list.innerHTML = "";
    M.forEach(function (m) {
      if (cur !== "All" && m.g !== cur) return;
      if (term && (m.n + " " + m.d).toLowerCase().indexOf(term) < 0) return;
      n++;
      var el = document.createElement("div");
      el.className = "card method";
      el.innerHTML = '<header><h3>' + esc(m.n) + '</h3><span class="tag">' + m.g + '</span></header><p>' + esc(m.d) + '</p><pre><code>' + hl(esc(m.c)) + '</code></pre>';
      list.appendChild(el);
    });
    empty.hidden = n > 0;
  }
  q.addEventListener("input", render); render();

  var C = [
    ["start()", "Start thread"], ["run()", "Execute thread task"], ["sleep()", "Pause current thread"], ["join()", "Wait for another thread"],
    ["isAlive()", "Check if thread is alive"], ["getName()", "Get name"], ["setName()", "Set name"],
    ["getId()", "Get thread ID (deprecated in modern Java)"], ["threadId()", "Get thread ID in modern Java"],
    ["getPriority()", "Get priority"], ["setPriority()", "Set priority"], ["currentThread()", "Get current thread"],
    ["getState()", "Get thread state"], ["interrupt()", "Interrupt / request interruption"],
    ["isInterrupted()", "Check interruption status"], ["interrupted()", "Check and clear current thread's interrupt status"],
    ["setDaemon()", "Make daemon thread"], ["isDaemon()", "Check daemon status"], ["getThreadGroup()", "Get thread group"],
    ["getStackTrace()", "Get stack trace"], ["setUncaughtExceptionHandler()", "Set handler for uncaught exceptions"],
    ["getUncaughtExceptionHandler()", "Get uncaught exception handler"]
  ];
  var cb = document.getElementById("cbody"), cq = document.getElementById("cq");
  function renderC() {
    var t = cq.value.trim().toLowerCase();
    cb.innerHTML = C.filter(function (r) { return !t || (r[0] + " " + r[1]).toLowerCase().indexOf(t) >= 0; })
      .map(function (r) { return "<tr><td><code>" + r[0] + "</code></td><td>" + r[1] + "</td></tr>"; }).join("") || '<tr><td colspan="2">No rows match.</td></tr>';
  }
  cq.addEventListener("input", renderC); renderC();

  document.querySelectorAll("[data-m]").forEach(function (el) {
    el.className = "pills small";
    el.innerHTML = el.getAttribute("data-m").split("|").map(function (m) { return '<span class="pill">' + esc(m) + "</span>"; }).join("");
  });

  var parts = { oops: document.getElementById("part-oops"), collections: document.getElementById("part-collections"), threads: document.getElementById("part-threads"), notes: document.getElementById("part-notes") };
  var segs = { oops: document.getElementById("seg-oops"), collections: document.getElementById("seg-collections"), threads: document.getElementById("seg-threads"), notes: document.getElementById("seg-notes") };

  /* Full Notes: one book part is built from its template at a time */
  var notesIdx = JSON.parse(document.getElementById("notes-index").textContent);
  var notesCur = 0;
  function markNotesNav() {
    nav.querySelectorAll("a").forEach(function (a) {
      var on = +a.getAttribute("data-n") === notesCur;
      a.classList.toggle("on", on);
      if (on) nav.scrollLeft += a.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - a.offsetWidth) / 2;
    });
  }
  function showNotesPart(n, fromUser) {
    var tpl = document.getElementById("tpl-b" + n);
    if (!tpl) return;
    var mount = document.getElementById("notes-mount");
    mount.innerHTML = "";
    mount.appendChild(tpl.content.cloneNode(true));
    mount.querySelectorAll("pre:not(.ascii):not(.plain) code").forEach(function (el) { el.innerHTML = hl(el.innerHTML); });
    notesCur = n;
    markNotesNav();
    try { localStorage.setItem("java-notes-bookpart", String(n)); } catch (e) {}
    if (fromUser) window.scrollTo(0, 0);
  }
  function buildNotesNav() {
    if (io) { io.disconnect(); io = null; }
    nav.innerHTML = "";
    notesIdx.forEach(function (p) {
      var a = document.createElement("a");
      a.href = "#";
      a.setAttribute("data-n", p.n);
      a.textContent = p.n + " · " + p.t.replace(/ in Java$/, "");
      a.addEventListener("click", function (ev) { ev.preventDefault(); showNotesPart(p.n, true); });
      nav.appendChild(a);
    });
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-go]");
    if (b) showNotesPart(+b.getAttribute("data-go"), true);
  });
  var nav = document.getElementById("nav"), io = null;

  function buildNav(part) {
    nav.innerHTML = "";
    if (io) io.disconnect();
    var secs = Array.prototype.slice.call(part.querySelectorAll("section"));
    secs.forEach(function (s) {
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.innerHTML = s.getAttribute("data-nav") || (function (h) { var c = h.cloneNode(true); c.querySelectorAll("button").forEach(function (x) { x.remove(); }); return c.textContent.trim(); })(s.querySelector("h2"));
      nav.appendChild(a);
    });
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) nav.querySelectorAll("a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      secs.forEach(function (s) { io.observe(s); });
    }
  }
  function show(p, fromUser) {
    Object.keys(parts).forEach(function (k) {
      parts[k].hidden = k !== p;
      segs[k].setAttribute("aria-pressed", k === p);
    });
    if (p === "notes") {
      buildNotesNav();
      if (!notesCur) {
        var sp = 1;
        try { var sv = parseInt(localStorage.getItem("java-notes-bookpart"), 10); if (sv && document.getElementById("tpl-b" + sv)) sp = sv; } catch (e) {}
        showNotesPart(sp, false);
      } else markNotesNav();
    } else buildNav(parts[p]);
    if (fromUser) { window.scrollTo(0, 0); try { localStorage.setItem("java-notes-part", p); } catch (e) {} }
  }
  Object.keys(segs).forEach(function (k) { segs[k].addEventListener("click", function () { show(k, true); }); });
  var start = "oops";
  try { var saved = localStorage.getItem("java-notes-part"); if (saved && parts[saved]) start = saved; } catch (e) {}
  show(start, false);
})();
;

/* ===== script (line 46354 of original) ===== */
(function(){
var $=function(s){return document.querySelector(s)},R=document.documentElement,idx=[],done=new Set(),TOT=0;
try{done=new Set(JSON.parse(localStorage.getItem('jdone')||'[]'))}catch(e){}
var side=document.createElement('aside');side.id='side';var nav=$('#nav');var ht=$('header.top');ht.parentNode.insertBefore(side,ht);side.appendChild(nav);
var pc=document.createElement('span');pc.id='pc';$('.toprow').insertBefore(pc,$('.seg'));
var rp=$('#rp');addEventListener('scroll',function(){var h=R.scrollHeight-innerHeight;rp.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
$('#fu').onclick=function(){scrollTo({top:0,behavior:'smooth'})};
$('#ft').onclick=function(){var d=R.dataset.theme?R.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;R.dataset.theme=d?'light':'dark'};
var sz=0;$('#fa').onclick=function(){sz=(sz+1)%4;R.style.fontSize=(100+sz*8)+'%'};
var last='';function upd(){var h=done.size+'/'+TOT;if(h===last)return;last=h;pc.innerHTML=done.size+' / '+TOT+' learned<i><b style="width:'+(TOT?done.size/TOT*100:0)+'%"></b></i>'}
function save(){try{localStorage.setItem('jdone',JSON.stringify([...done]))}catch(e){}}
document.querySelectorAll('template[id^="tpl-b"]').forEach(function(t){var n=+t.id.slice(5),ch=(t.content.querySelector('h2')||{}).textContent||'';
t.content.querySelectorAll('h3[id]').forEach(function(h){TOT++;idx.push({n:n,id:h.id,t:h.textContent.trim(),c:ch.trim()})})});
document.querySelectorAll('.part:not(#part-notes) section').forEach(function(s){var h=s.querySelector('h2');if(h)idx.push({p:s.id,t:h.textContent.trim(),c:'Quick reference'})});
function key(h){var c=h.closest('.card');return h.id||('q:'+(h.closest('section')||{}).id+':'+h.textContent.trim())}
function ticks(){document.querySelectorAll('h3[id],.part:not(#part-notes) .card>header h3').forEach(function(h){if(h.dataset.ok)return;h.dataset.ok=1;var k=key(h),b=document.createElement('button');b.className='ok';b.title='Mark learned';b.textContent=done.has(k)?'✓':'';var box=h.closest('.card')||h;if(done.has(k))box.classList.add('dn');
b.onclick=function(e){e.preventDefault();e.stopPropagation();done.has(k)?done.delete(k):done.add(k);b.textContent=done.has(k)?'✓':'';box.classList.toggle('dn',done.has(k));save();upd()};h.appendChild(b)})}
function pn(){document.querySelectorAll('article.book:not([data-pn])').forEach(function(a){a.dataset.pn=1;var m=/Part (\d+) of (\d+)/.exec(a.textContent.slice(0,80));if(!m)return;var n=+m[1],t=+m[2],d=document.createElement('div');d.className='pn';
function bt(l,to){var b=document.createElement('button');b.textContent=l;b.onclick=function(){var x=document.querySelector('#nav a[data-n="'+to+'"]');if(x){x.click();scrollTo(0,0)}};return b}
d.appendChild(n>1?bt('← Part '+(n-1),n-1):document.createElement('span'));if(n<t)d.appendChild(bt('Part '+(n+1)+' →',n+1));a.appendChild(d)})}
function cp(){document.querySelectorAll('pre:not([data-cp])').forEach(function(p){p.dataset.cp=1;var b=document.createElement('button');b.className='cpy';b.textContent='Copy';b.onclick=function(){try{navigator.clipboard.writeText(p.innerText.replace(/Copy$/,'').trimEnd())}catch(x){}b.textContent='Copied!';setTimeout(function(){b.textContent='Copy'},1200)};p.appendChild(b)})}
function all(){ticks();pn();cp();upd()}
all();var pend=0;new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;all()},60)}).observe(document.body,{childList:true,subtree:true});
var sx=$('#sx'),si=$('#si'),sr=$('#sr'),res=[],fi=0;
function open(){sx.classList.add('on');si.value='';draw('');si.focus()}
function close(){sx.classList.remove('on')}
function draw(q){q=q.toLowerCase().trim();res=(q?idx.filter(function(x){return(x.t+' '+x.c).toLowerCase().indexOf(q)>=0}):idx.slice(0,12)).slice(0,40);fi=0;
sr.innerHTML=res.map(function(x,i){return '<a href="#" data-i="'+i+'" class="'+(i?'':'f')+'"><span>'+x.t.replace(/</g,'&lt;')+'</span><small>'+x.c.replace(/</g,'&lt;')+'</small></a>'}).join('')||'<div id="sh">No matches</div>'}
function go(x){close();
if(x.p){var m=x.p.charAt(0)=='o'?'oops':x.p.charAt(0)=='c'?'collections':'threads';$('#seg-'+m).click();setTimeout(function(){var e=document.getElementById(x.p);e&&e.scrollIntoView({behavior:'smooth'})},80);return}
$('#seg-notes').click();
setTimeout(function(){var a=document.querySelector('#nav a[data-n="'+x.n+'"]');if(a)a.click();
var tries=0,iv=setInterval(function(){var e=document.getElementById(x.id);if(e||++tries>25){clearInterval(iv);if(e){e.scrollIntoView({behavior:'smooth',block:'start'});e.style.outline='2px solid var(--accent)';setTimeout(function(){e.style.outline=''},2200)}}},80)},120)}
$('#fs').onclick=open;si.oninput=function(){draw(si.value)};
sx.onclick=function(e){if(e.target===sx)close()};
sr.onclick=function(e){var a=e.target.closest('a');if(a){e.preventDefault();go(res[+a.dataset.i])}};
function mv(d){var l=sr.querySelectorAll('a');if(!l.length)return;l[fi].classList.remove('f');fi=(fi+d+l.length)%l.length;l[fi].classList.add('f');l[fi].scrollIntoView({block:'nearest'})}
addEventListener('keydown',function(e){var ty=/INPUT|TEXTAREA/.test((e.target||{}).tagName);
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();open();return}
if(e.key=='/'&&!ty){e.preventDefault();open();return}
if(!sx.classList.contains('on'))return;
if(e.key=='Escape')close();else if(e.key=='ArrowDown'){e.preventDefault();mv(1)}else if(e.key=='ArrowUp'){e.preventDefault();mv(-1)}else if(e.key=='Enter'&&res[fi]){e.preventDefault();go(res[fi])}});
})();
;

/* ===== script (line 46451 of original) ===== */
(function(){
var $=function(s){return document.querySelector(s)},B=document.body;
var mn=document.createElement('button');mn.id='mn';mn.setAttribute('aria-label','Sections');mn.textContent='☰';$('.toprow').appendChild(mn);
function sync(){document.querySelectorAll('#bt button').forEach(function(b){var s=$('#seg-'+b.dataset.t);b.classList.toggle('on',s&&s.getAttribute('aria-pressed')=='true')})}
document.querySelectorAll('#bt button').forEach(function(b){b.onclick=function(){$('#seg-'+b.dataset.t).click();B.classList.remove('dr');scrollTo(0,0);setTimeout(sync,50)}});
document.querySelectorAll('.seg button').forEach(function(b){new MutationObserver(sync).observe(b,{attributes:true,attributeFilter:['aria-pressed']})});sync();
mn.onclick=function(){B.classList.toggle('dr')};$('#bd').onclick=function(){B.classList.remove('dr')};
$('#nav').addEventListener('click',function(e){if(e.target.closest('a')&&innerWidth<=1000)setTimeout(function(){B.classList.remove('dr')},120)});
var x0,y0,t0;
addEventListener('touchstart',function(e){var t=e.touches[0];x0=t.clientX;y0=t.clientY;t0=e.target},{passive:true});
addEventListener('touchend',function(e){if(innerWidth>1000||B.classList.contains('dr')||!t0||!t0.closest)return;
if(t0.closest('pre,.tablewrap,.tw,table,#sx,input,#bt'))return;
var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Math.abs(dx)<90||Math.abs(dx)<2*Math.abs(dy))return;
var pb=document.querySelectorAll('article.book .pn button');if(!pb.length)return;
var b=dx<0?pb[pb.length-1]:(pb.length>1?pb[0]:null);if(dx<0&&pb.length==1&&pb[0].textContent.indexOf('←')==0)return;if(dx>0&&pb.length==1&&pb[0].textContent.indexOf('←')!=0)return;
if(b)b.click()},{passive:true});
})();
;

/* ===== script (line 46479 of original) ===== */
(function(){
var tot={};
document.querySelectorAll('template[id^="tpl-b"]').forEach(function(t){tot[t.id.slice(5)]=t.content.querySelectorAll('h3[id]').length});
function get(){try{return JSON.parse(localStorage.getItem('jdone')||'[]')}catch(e){return[]}}
function refresh(){var d={};get().forEach(function(k){var m=/^b(\d+)-/.exec(k);if(m)d[m[1]]=(d[m[1]]||0)+1});
document.querySelectorAll('#nav a[data-n]').forEach(function(a){var n=a.getAttribute('data-n'),c=d[n]||0,t=tot[n]||0,sp=a.querySelector('.cp2');
if(!sp){sp=document.createElement('span');sp.className='cp2';a.insertBefore(sp,a.firstChild)}
var v=c+'/'+t;if(sp.textContent!==v){sp.textContent=v;sp.classList.toggle('full',t>0&&c>=t)}})}
var nv=document.getElementById('nav'),pend=0;
new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;refresh()},80)}).observe(nv,{childList:true});
document.addEventListener('click',function(e){if(e.target.closest('.ok'))setTimeout(refresh,80)},true);
refresh();
})();
;

/* ===== script (line 46502 of original) ===== */
(function(){
var K='abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|true|false|try|uses|var|void|volatile|while|with|record|sealed|permits|yield';
var RE=new RegExp('(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)\')|(@[A-Za-z_]\\w*)|\\b('+K+')\\b|\\b(\\d[\\d_.]*[LlFfDd]?)\\b|\\b([A-Z][A-Za-z0-9_]*)\\b|(--?[a-z][\\w-]*)|\\b([a-z_]\\w*)(?=\\()','g');
function esc(x){return x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function one(c){if(c.dataset.hl)return;c.dataset.hl=1;var t=c.textContent;if(t.length>20000)return;
c.innerHTML=esc(t).replace(RE,function(m,cm,st,an,kw,nu,ty,fl,fn){return cm?'<span class="t-c">'+cm+'</span>':st?'<span class="t-s">'+st+'</span>':an?'<span class="t-a">'+an+'</span>':kw?'<span class="t-k">'+kw+'</span>':nu?'<span class="t-n">'+nu+'</span>':ty?'<span class="t-t">'+ty+'</span>':fl?'<span class="t-n">'+fl+'</span>':'<span class="t-f">'+fn+'</span>'})}
function all(){document.querySelectorAll('pre:not(.ascii) > code:not([data-hl])').forEach(one)}
var pend=0;new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;all()},80)}).observe(document.body,{childList:true,subtree:true});all();
})();
;

/* ===== script (line 46524 of original) ===== */
(function(){
var tr=document.querySelector('.toprow'),mn=document.getElementById('mn'),hb=document.createElement('div');hb.className='hb';
function mk(i,t,id){var b=document.createElement('button');b.type='button';b.textContent=i;b.title=t;b.setAttribute('aria-label',t);b.onclick=function(){document.getElementById(id).click()};hb.appendChild(b)}
mk('🔍','Search (Ctrl+K)','fs');mk('◐','Theme','ft');mk('Aa','Text size','fa');
tr.insertBefore(hb,mn||null);
})();
;

/* ===== script (line 46551 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},fs=17,wd=1,serif=false,speaking=false,cur=null,WS=[680,820,1000];
var hb=$('.hb'),btn=document.createElement('button');btn.id='hrd';btn.type='button';btn.title='Reader mode';btn.setAttribute('aria-label','Reader mode');btn.textContent='📖';btn.onclick=function(){toggle()};hb.insertBefore(btn,hb.firstChild);
function apply(){B.style.setProperty('--rfs',fs+'px');B.style.setProperty('--rw',WS[wd]+'px');B.style.setProperty('--rff',serif?'Georgia,"Times New Roman",serif':'Inter,system-ui,sans-serif');$('#rf').textContent=serif?'Sans':'Serif'}
function toggle(on){on=on===undefined?!B.classList.contains('rd'):on;B.classList.toggle('rd',on);btn.classList.toggle('on',on);if(!on)stop();else{document.body.classList.remove('dr');apply()}}
$('#rm').onclick=function(){fs=Math.max(13,fs-1);apply()};$('#rp2').onclick=function(){fs=Math.min(26,fs+1);apply()};
$('#rf').onclick=function(){serif=!serif;apply()};$('#rw2').onclick=function(){wd=(wd+1)%3;apply()};$('#rx').onclick=function(){toggle(false)};
addEventListener('keydown',function(e){if(e.key=='Escape'&&B.classList.contains('rd')&&!$('#sx').classList.contains('on'))toggle(false)});
/* read aloud */
var synth=window.speechSynthesis;
function secs(){var n=document.querySelectorAll('article.book h3[id]');if(n.length)return[].slice.call(n);return[].slice.call(document.querySelectorAll('.part section')).filter(function(x){return x.offsetParent})}
function first(){var l=secs(),pick=l[0];l.forEach(function(h){if(h.getBoundingClientRect().top<=160)pick=h});return pick}
function textOf(h){var nodes=[],t='';
if(h.tagName=='H3'){nodes.push(h);var e=h.nextElementSibling;while(e&&!(e.tagName=='H3'&&e.id)){nodes.push(e);e=e.nextElementSibling}}else nodes=[h];
nodes.forEach(function(n){var c=n.cloneNode(true);c.querySelectorAll('pre,button,table,details,script,style,.ok,.cpy').forEach(function(x){x.remove()});t+=' '+c.textContent+'. '});
return t.replace(/\s+/g,' ').trim()}
function chunks(t){var out=[],re=/[^.!?]+[.!?]*\s*/g,m,buf='';while((m=re.exec(t))){if((buf+m[0]).length>180){if(buf)out.push(buf);buf=m[0]}else buf+=m[0]}if(buf)out.push(buf);return out}
function say(h){if(!speaking||!h)return stop();cur=h;h.classList.add('rdnow');h.scrollIntoView({behavior:'smooth',block:'start'});
var q=chunks(textOf(h)),i=0;function nx(){if(!speaking)return;if(i>=q.length){h.classList.remove('rdnow');var l=secs(),k=l.indexOf(h);if(k>=0&&k<l.length-1)return say(l[k+1]);return stop()}
var u=new SpeechSynthesisUtterance(q[i++]);u.lang='en-US';u.rate=.98;u.onend=nx;u.onerror=function(ev){if(ev&&(ev.error=='interrupted'||ev.error=='canceled'))return;stop();var r=$('#rl');r.textContent='No voice';setTimeout(function(){r.textContent='🔊 Listen'},1800)};synth.speak(u)}nx()}
function start(){if(!synth){$('#rl').textContent='No voice';return}speaking=true;$('#rl').textContent='⏸ Stop';$('#rl').classList.add('on');synth.cancel();say(first())}
function stop(){speaking=false;if(synth)synth.cancel();if(cur)cur.classList.remove('rdnow');var r=$('#rl');r.textContent='🔊 Listen';r.classList.remove('on')}
$('#rl').onclick=function(){speaking?stop():start()};
})();
;

/* ===== script (line 46577 of original) ===== */
(function(){
var D={
"Java Sutra":"जावा सूत्र","JAVA · INTERVIEW PREP":"जावा · इंटरव्यू की तैयारी","Java · Interview prep":"जावा · इंटरव्यू की तैयारी",
"Three reference sets in one place: object-oriented programming, the Collection Framework, and threads with their methods and states.":"तीन रेफ़रेंस एक जगह: ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग, कलेक्शन फ्रेमवर्क, और थ्रेड्स उनके मेथड्स व स्टेट्स के साथ।",
"OOPs":"OOPs","Collections":"कलेक्शन्स","Threads":"थ्रेड्स","Full Notes":"पूरे नोट्स","Notes":"नोट्स",
"Core Java":"कोर जावा","Java Basics":"जावा बेसिक्स","Control Statements":"कंट्रोल स्टेटमेंट्स","Arrays":"ऐरे","Strings":"स्ट्रिंग्स","OOP":"OOP","Important OOP Concepts":"महत्वपूर्ण OOP कॉन्सेप्ट्स","Packages & Access Modifiers":"पैकेज और एक्सेस मॉडिफायर","Exception Handling":"एक्सेप्शन हैंडलिंग","Wrapper Classes":"रैपर क्लासेस","Object Class":"ऑब्जेक्ट क्लास","Interfaces":"इंटरफेस","Collections Framework":"कलेक्शन्स फ्रेमवर्क","Generics":"जेनेरिक्स","Java I/O (Input / Output)":"जावा I/O (इनपुट / आउटपुट)","Java NIO (New I/O)":"जावा NIO (न्यू I/O)","Multithreading":"मल्टीथ्रेडिंग","Java 8 Features":"जावा 8 फीचर्स","Java Date & Time API":"जावा डेट और टाइम API","Functional Programming":"फंक्शनल प्रोग्रामिंग","Java Reflection API":"जावा रिफ्लेक्शन API","Annotations":"एनोटेशन्स","Enum":"एनम","Inner Classes":"इनर क्लासेस","JDBC":"JDBC","Java Networking":"जावा नेटवर्किंग","Java GUI Programming":"जावा GUI प्रोग्रामिंग","Java Memory Management":"जावा मेमोरी मैनेजमेंट","Garbage Collection":"गार्बेज कलेक्शन","JVM Internals":"JVM की आंतरिक संरचना","Java Modules (JPMS)":"जावा मॉड्यूल्स (JPMS)",
"Overview":"ओवरव्यू","Class & Object":"क्लास और ऑब्जेक्ट","Encapsulation":"एनकैप्सुलेशन","Inheritance":"इनहेरिटेंस","Polymorphism":"पॉलीमॉर्फिज़्म","Abstraction":"एब्स्ट्रैक्शन","Methods, this, super":"मेथड्स, this, super","Access":"एक्सेस","Relationships":"रिलेशनशिप्स","Casting":"कास्टिंग","Keywords":"कीवर्ड्स","List":"लिस्ट","Set":"सेट","Queue & Deque":"क्यू और डीक्यू","Map":"मैप","Comparable & Comparator":"Comparable और Comparator","Utility classes":"यूटिलिटी क्लासेस","Comparisons":"तुलना","Most Imp":"सबसे ज़रूरी",
"Types of threads":"थ्रेड के प्रकार","Ways to create a thread":"थ्रेड बनाने के तरीके","Important thread methods":"ज़रूरी थ्रेड मेथड्स","Thread states":"थ्रेड की अवस्थाएँ","Deprecated thread methods":"डिप्रिकेटेड थ्रेड मेथड्स","Method cheat sheet":"मेथड चीट शीट","Most important for Java interviews":"जावा इंटरव्यू के लिए सबसे ज़रूरी",
"OOPs in Java":"जावा में OOP","Class, object and constructor":"क्लास, ऑब्जेक्ट और कंस्ट्रक्टर","Methods, this and super":"मेथड्स, this और super","Access modifiers":"एक्सेस मॉडिफायर","Association, aggregation, composition":"असोसिएशन, एग्रीगेशन, कम्पोजिशन","Upcasting and downcasting":"अपकास्टिंग और डाउनकास्टिंग","Important OOP keywords":"ज़रूरी OOP कीवर्ड्स","Java Collection Framework":"जावा कलेक्शन फ्रेमवर्क","Queue and Deque":"क्यू और डीक्यू","Important collection interfaces":"ज़रूरी कलेक्शन इंटरफेस","Comparable and Comparator":"Comparable और Comparator","Collections and Arrays utility classes":"Collections और Arrays यूटिलिटी क्लासेस","Side-by-side comparisons":"आमने-सामने तुलना","Quick complete hierarchy":"पूरी हायरार्की एक नज़र में",
"pillar":"स्तंभ","blueprint":"ब्लूप्रिंट","instance":"इंस्टेंस","contract":"अनुबंध","legacy, synchronized":"लेगेसी, सिंक्रोनाइज़्ड","insertion order":"इन्सर्शन ऑर्डर","sorted":"सॉर्टेड","resizable array":"रीसाइज़ेबल ऐरे",
"Learned":"सीखा","Listen":"सुनें","Stop":"रोकें","Serif":"सेरिफ़","Sans":"सैंस","Created by ABHINAV MAURYA":"अभिनव मौर्य द्वारा निर्मित","On this page":"इस पेज पर"};
var EX={"OOPs in Java": "जावा में OOP", "Object-Oriented Programming": "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग", "is an approach where a program is designed using classes and objects.": "एक ऐसा तरीका है जिसमें प्रोग्राम को क्लास और ऑब्जेक्ट की मदद से डिज़ाइन किया जाता है।", "Wrapping data and methods together in a class and controlling access to the data.": "डेटा और मेथड्स को एक क्लास में समेटना और डेटा तक पहुँच को नियंत्रित करना।", "One class acquires the properties and behavior of another class.": "एक क्लास दूसरी क्लास की प्रॉपर्टीज़ और व्यवहार (बिहेवियर) प्राप्त करती है।", "One name can have multiple forms.": "एक नाम के कई रूप हो सकते हैं।", "Hiding implementation details and showing only essential functionality.": "इम्प्लीमेंटेशन की जानकारी छुपाना और केवल ज़रूरी कार्यक्षमता दिखाना।", "Supporting concepts": "सहायक कॉन्सेप्ट्स", "Class": "क्लास", "Object": "ऑब्जेक्ट", "Constructor": "कंस्ट्रक्टर", "Interface": "इंटरफेस", "Association": "असोसिएशन", "Aggregation": "एग्रीगेशन", "Composition": "कम्पोजिशन", "Class, object and constructor": "क्लास, ऑब्जेक्ट और कंस्ट्रक्टर", "blueprint": "ब्लूप्रिंट", "A class is a blueprint or template for creating objects.": "क्लास ऑब्जेक्ट बनाने के लिए एक ब्लूप्रिंट या टेम्पलेट है।", "→ class": "→ क्लास", "→ data members": "→ डेटा मेंबर्स", "→ method": "→ मेथड", "instance": "इंस्टेंस", "An object is an instance of a class.": "ऑब्जेक्ट किसी क्लास का इंस्टेंस होता है।", "→ reference variable": "→ रेफ़रेंस वेरिएबल", "→ creates the object": "→ ऑब्जेक्ट बनाता है", "A constructor is a special member used to initialize an object.": "कंस्ट्रक्टर एक विशेष मेंबर है जो ऑब्जेक्ट को इनिशियलाइज़ करने के लिए इस्तेमाल होता है।", "Default": "डिफ़ॉल्ट", "If you define no constructor, Java provides a default one.": "अगर आप कोई कंस्ट्रक्टर नहीं बनाते, तो जावा खुद एक डिफ़ॉल्ट कंस्ट्रक्टर दे देता है।", "No-argument": "नो-आर्गुमेंट", "A constructor explicitly written without parameters.": "ऐसा कंस्ट्रक्टर जिसे बिना पैरामीटर के स्पष्ट रूप से लिखा गया हो।", "Parameterized": "पैरामीटराइज़्ड", "Constructor overloading": "कंस्ट्रक्टर ओवरलोडिंग", "Wrapping data and methods together in a class and controlling access to the data. It is usually achieved with": "डेटा और मेथड्स को एक क्लास में समेटना और डेटा तक पहुँच को नियंत्रित करना। यह आमतौर पर", "variables and": "वेरिएबल्स और", "getter and setter methods.": "getter व setter मेथड्स की मदद से हासिल किया जाता है।", "Data security": "डेटा सुरक्षा", "Data hiding": "डेटा हाइडिंग", "Controlled access": "नियंत्रित पहुँच", "Easier maintenance": "आसान रखरखाव", "Inheritance allows one class to acquire the properties and behavior of another class.": "इनहेरिटेंस से एक क्लास दूसरी क्लास की प्रॉपर्टीज़ और व्यवहार प्राप्त कर सकती है।", "Types of inheritance": "इनहेरिटेंस के प्रकार", "Single": "सिंगल", "Multilevel": "मल्टीलेवल", "Hierarchical": "हायरार्किकल", "Multiple": "मल्टीपल", "via interfaces": "इंटरफेस के ज़रिए", "Java does not support multiple inheritance through classes, but it can be achieved through interfaces.": "जावा क्लासेस के ज़रिए मल्टीपल इनहेरिटेंस सपोर्ट नहीं करता, लेकिन इसे इंटरफेस के ज़रिए हासिल किया जा सकता है।", "Hybrid": "हाइब्रिड", "A combination of two or more inheritance types. Java doesn't support hybrid inheritance through classes, but interfaces can be used to achieve similar structures.": "दो या अधिक इनहेरिटेंस प्रकारों का मेल। जावा क्लासेस के ज़रिए हाइब्रिड इनहेरिटेंस सपोर्ट नहीं करता, पर इंटरफेस से मिलती-जुलती संरचना बनाई जा सकती है।", "Poly": "Poly", "means many and": "का मतलब है अनेक और", "morphism": "morphism", "means forms. One name can have multiple forms.": "का मतलब है रूप। यानी एक नाम के कई रूप हो सकते हैं।", "Compile-time": "कम्पाइल-टाइम", "method overloading": "मेथड ओवरलोडिंग", "Same method name, different parameters.": "मेथड का नाम वही, पैरामीटर अलग।", "Overload by changing the number, type or order of parameters:": "पैरामीटर की संख्या, टाइप या क्रम बदलकर ओवरलोड करें:", "Runtime": "रनटाइम", "method overriding": "मेथड ओवरराइडिंग", "A child class provides its own implementation of a parent method.": "चाइल्ड क्लास पैरेंट क्लास की मेथड का अपना इम्प्लीमेंटेशन देती है।", "Return type alone is not enough.": "केवल रिटर्न टाइप काफ़ी नहीं है।", "Changing only the return type does not create method overloading, so this does not compile:": "सिर्फ़ रिटर्न टाइप बदलने से मेथड ओवरलोडिंग नहीं बनती, इसलिए यह कोड कम्पाइल नहीं होता:", "Dynamic method dispatch": "डायनामिक मेथड डिस्पैच", "The mechanism behind runtime method overriding. The JVM decides at runtime which overridden method executes.": "रनटाइम मेथड ओवरराइडिंग के पीछे की प्रक्रिया। JVM रनटाइम पर तय करता है कि कौन-सी ओवरराइड की गई मेथड चलेगी।", "Hiding implementation details and showing only essential functionality. Java provides it mainly through an abstract class and an interface.": "इम्प्लीमेंटेशन की जानकारी छुपाना और केवल ज़रूरी कार्यक्षमता दिखाना। जावा इसे मुख्य रूप से एब्स्ट्रैक्ट क्लास और इंटरफेस के ज़रिए देता है।", "Abstract class": "एब्स्ट्रैक्ट क्लास", "An abstract class can contain:": "एब्स्ट्रैक्ट क्लास में ये हो सकते हैं:", "Abstract methods": "एब्स्ट्रैक्ट मेथड्स", "Concrete methods": "कंक्रीट मेथड्स", "Variables": "वेरिएबल्स", "Constructors": "कंस्ट्रक्टर्स", "Static methods": "स्टैटिक मेथड्स", "Final methods": "फ़ाइनल मेथड्स", "An interface defines a contract that implementing classes must follow.": "इंटरफेस एक अनुबंध (कॉन्ट्रैक्ट) तय करता है जिसका पालन इम्प्लीमेंट करने वाली क्लासेस को करना होता है।", "A class can implement multiple interfaces:": "एक क्लास कई इंटरफेस इम्प्लीमेंट कर सकती है:", "Methods, this and super": "मेथड्स, this और super", "A method is a block of code that performs a specific task.": "मेथड कोड का एक ब्लॉक है जो कोई विशेष काम करता है।", "Types of methods": "मेथड्स के प्रकार", "Instance": "इंस्टेंस", "Called using an object.": "ऑब्जेक्ट की मदद से कॉल की जाती है।", "Static": "स्टैटिक", "Called using the class.": "क्लास की मदद से कॉल की जाती है।", "Abstract": "एब्स्ट्रैक्ट", "Has no implementation in the abstract class or interface declaration.": "एब्स्ट्रैक्ट क्लास या इंटरफेस की घोषणा में इसका कोई इम्प्लीमेंटेशन नहीं होता।", "Final": "फ़ाइनल", "Cannot be overridden.": "ओवरराइड नहीं की जा सकती।", "Native": "नेटिव", "Declared with": "इसे", "and implemented outside Java, typically through JNI.": "के साथ घोषित किया जाता है और इसका इम्प्लीमेंटेशन जावा के बाहर होता है, आमतौर पर JNI के ज़रिए।", "current object": "मौजूदा ऑब्जेक्ट", "Access the current object's variable:": "मौजूदा ऑब्जेक्ट के वेरिएबल तक पहुँचें:", "Call a current class method, or a current class constructor:": "मौजूदा क्लास की मेथड या मौजूदा क्लास का कंस्ट्रक्टर कॉल करें:", "parent part": "पैरेंट वाला हिस्सा", "refers to the parent class part of the current object.": "मौजूदा ऑब्जेक्ट के पैरेंट क्लास वाले हिस्से को दर्शाता है।", "Access modifiers": "एक्सेस मॉडिफायर", "Java has four access levels.": "जावा में चार एक्सेस लेवल होते हैं।", "Modifier": "मॉडिफायर", "Same class": "वही क्लास", "Same package": "वही पैकेज", "Subclass": "सबक्लास", "Other package": "दूसरा पैकेज", "Yes": "हाँ", "Yes**": "हाँ**", "Limited": "सीमित", "* A private member isn't directly accessible in a subclass.": "* प्राइवेट मेंबर सबक्लास में सीधे एक्सेस नहीं किया जा सकता।", "** A default (package-private) member is accessible to classes in the same package.": "** डिफ़ॉल्ट (पैकेज-प्राइवेट) मेंबर उसी पैकेज की क्लासेस के लिए उपलब्ध होता है।", "Association, aggregation, composition": "असोसिएशन, एग्रीगेशन, कम्पोजिशन", "relationship": "संबंध", "A relationship between two classes. A teacher can be associated with students.": "दो क्लासेस के बीच का संबंध। एक टीचर कई स्टूडेंट्स से जुड़ा हो सकता है।", "weak has-a": "कमज़ोर has-a", "The teacher can exist independently of the department.": "टीचर डिपार्टमेंट के बिना भी स्वतंत्र रूप से मौजूद रह सकता है।", "strong has-a": "मज़बूत has-a", "The room is considered part of the house.": "कमरा घर का हिस्सा माना जाता है।", "Upcasting and downcasting": "अपकास्टिंग और डाउनकास्टिंग", "Upcasting": "अपकास्टिंग", "automatic": "अपने-आप", "Converting a child reference to a parent reference.": "चाइल्ड रेफ़रेंस को पैरेंट रेफ़रेंस में बदलना।", "Downcasting": "डाउनकास्टिंग", "explicit": "स्पष्ट रूप से", "Converting a parent reference back to a child reference.": "पैरेंट रेफ़रेंस को वापस चाइल्ड रेफ़रेंस में बदलना।", "Use": "जब ऑब्जेक्ट का असली टाइप पक्का न हो, तब", "when the actual object type isn't certain:": "का उपयोग करें:", "Important OOP keywords": "ज़रूरी OOP कीवर्ड्स", "Keyword": "कीवर्ड", "Purpose": "उद्देश्य", "Create class": "क्लास बनाना", "Instance of class": "क्लास का इंस्टेंस", "Inherit a class": "क्लास को इनहेरिट करना", "Implement interface": "इंटरफेस इम्प्लीमेंट करना", "Define interface": "इंटरफेस परिभाषित करना", "Define abstraction": "एब्स्ट्रैक्शन परिभाषित करना", "Prevent modification, extension or overriding": "बदलाव, एक्सटेंशन या ओवरराइडिंग रोकना", "Current object": "मौजूदा ऑब्जेक्ट", "Parent class": "पैरेंट क्लास", "Class-level member": "क्लास-लेवल मेंबर", "Class-level access": "क्लास-लेवल एक्सेस", "Controlled inheritance or package access": "नियंत्रित इनहेरिटेंस या पैकेज एक्सेस", "Accessible broadly": "व्यापक रूप से उपलब्ध", "Create object": "ऑब्जेक्ट बनाना", "Check object type": "ऑब्जेक्ट का टाइप जाँचना", "is a concept, not a Java keyword. Java has no": "एक कॉन्सेप्ट है, जावा का कीवर्ड नहीं। जावा में कोई", "reserved word.": "रिज़र्व्ड शब्द नहीं है।", "The whole OOPs structure": "पूरा OOPs ढाँचा", "For Java interviews, learn these first": "जावा इंटरव्यू के लिए इन्हें पहले सीखें", "Overloading": "ओवरलोडिंग", "Overriding": "ओवरराइडिंग", "Abstract Class": "एब्स्ट्रैक्ट क्लास", "Access Modifiers": "एक्सेस मॉडिफायर", "Association / Aggregation / Composition": "असोसिएशन / एग्रीगेशन / कम्पोजिशन", "Java Collection Framework": "जावा कलेक्शन फ्रेमवर्क", "Java Collection Framework (JCF)": "जावा कलेक्शन फ्रेमवर्क (JCF)", "is a set of interfaces, classes and methods used to store and manipulate groups of objects.": "इंटरफेस, क्लासेस और मेथड्स का एक समूह है जो ऑब्जेक्ट्स के समूहों को स्टोर और मैनेज करने के लिए इस्तेमाल होता है।", "Main hierarchy": "मुख्य हायरार्की", "is separate from": "अलग है", "Main types": "मुख्य प्रकार", "Type": "प्रकार", "Stores": "क्या स्टोर करता है", "Allows duplicates": "डुप्लिकेट की अनुमति", "Ordering": "क्रम", "Objects": "ऑब्जेक्ट्स", "Usually insertion order": "आमतौर पर इन्सर्शन ऑर्डर", "Depends on implementation": "इम्प्लीमेंटेशन पर निर्भर", "Usually yes": "आमतौर पर हाँ", "Processing order": "प्रोसेसिंग क्रम", "Key-value pairs": "की-वैल्यू जोड़ियाँ", "Keys: no": "कीज़: नहीं", "Values: yes": "वैल्यूज़: हाँ", "List": "लिस्ट", "stores elements in a sequence and allows duplicates.": "एलिमेंट्स को क्रम में स्टोर करती है और डुप्लिकेट की अनुमति देती है।", "resizable array": "रीसाइज़ होने वाला ऐरे", "Uses a resizable array internally.": "अंदर से रीसाइज़ होने वाला ऐरे इस्तेमाल करती है।", "Important methods": "ज़रूरी मेथड्स", "doubly linked list": "डबली लिंक्ड लिस्ट", "Uses a doubly linked list. It implements": "यह डबली लिंक्ड लिस्ट इस्तेमाल करती है। यह इम्प्लीमेंट करती है", "and": "और", "legacy, synchronized": "लेगेसी, सिंक्रोनाइज़्ड", "A legacy dynamic-array implementation. It is synchronized.": "लेगेसी डायनामिक-ऐरे इम्प्लीमेंटेशन। यह सिंक्रोनाइज़्ड है।", "LIFO": "LIFO", "Follows Last In, First Out.": "Last In, First Out यानी जो आख़िर में आया वह पहले निकलता है।", "For modern Java code,": "आधुनिक जावा कोड में", "is generally preferred over the legacy": "को लेगेसी", "class.": "क्लास पर प्राथमिकता दी जाती है।", "does not allow duplicate elements.": "डुप्लिकेट एलिमेंट्स की अनुमति नहीं देता।", "unique, unordered": "यूनिक, बिना क्रम के", "Stores unique elements and does not guarantee insertion order.": "यूनिक एलिमेंट्स स्टोर करता है और इन्सर्शन ऑर्डर की गारंटी नहीं देता।", "insertion order": "इन्सर्शन ऑर्डर", "Maintains insertion order while preventing duplicates.": "डुप्लिकेट रोकते हुए इन्सर्शन ऑर्डर बनाए रखता है।", "sorted": "सॉर्टेड", "Stores unique elements in sorted order.": "यूनिक एलिमेंट्स को सॉर्टेड क्रम में स्टोर करता है।", "is generally used to process elements in": "सामान्यतः एलिमेंट्स को इस क्रम में प्रोसेस करने के लिए इस्तेमाल होती है:", "order, First In, First Out.": "क्रम, यानी First In, First Out (जो पहले आया वह पहले निकला)।", "priority order": "प्राथमिकता क्रम", "Processes elements according to their priority or order rather than insertion order.": "एलिमेंट्स को इन्सर्शन ऑर्डर के बजाय उनकी प्राथमिकता या क्रम के अनुसार प्रोसेस करती है।", "On an empty queue": "खाली क्यू पर", "Method": "मेथड", "Result": "नतीजा", "Exception": "एक्सेप्शन", "double ended queue": "दोनों सिरों वाली क्यू", "You can insert and remove elements from both ends.": "आप दोनों सिरों से एलिमेंट्स जोड़ और हटा सकते हैं।", "A resizable-array implementation of": "का रीसाइज़ होने वाला ऐरे इम्प्लीमेंटेशन।", ". It can be used as a stack, a queue, or a deque.": "इसे स्टैक, क्यू या डीक्यू के रूप में इस्तेमाल किया जा सकता है।", "stores data as key → value. Keys must be unique; values can be duplicated.": "डेटा को key → value के रूप में स्टोर करता है। कीज़ यूनिक होनी चाहिए; वैल्यूज़ दोहराई जा सकती हैं।", "Map basics": "मैप की बुनियादी बातें", "hashing": "हैशिंग", "Stores key-value pairs using hashing.": "हैशिंग का उपयोग करके की-वैल्यू जोड़ियाँ स्टोर करता है।", "Maintains insertion order. It can also be configured for access-order, which is useful for LRU-style caches.": "इन्सर्शन ऑर्डर बनाए रखता है। इसे access-order के लिए भी कॉन्फ़िगर किया जा सकता है, जो LRU-स्टाइल कैश के लिए उपयोगी है।", "sorted keys": "सॉर्टेड कीज़", "Stores keys in sorted order.": "कीज़ को सॉर्टेड क्रम में स्टोर करता है।", "A legacy synchronized key-value collection.": "एक लेगेसी सिंक्रोनाइज़्ड की-वैल्यू कलेक्शन।", "Does not allow": "इसमें", "keys.": "कीज़ की अनुमति नहीं है।", "values.": "वैल्यूज़ की अनुमति नहीं है।", "Synchronized.": "सिंक्रोनाइज़्ड।", "Legacy class.": "लेगेसी क्लास।", "For new code,": "नए कोड के लिए", "or appropriate concurrent collections are generally preferred.": "या उपयुक्त कंकरेंट कलेक्शन्स को आमतौर पर प्राथमिकता दी जाती है।", "multi-threaded": "मल्टी-थ्रेडेड", "Used when multiple threads need to work with a map concurrently. It is part of": "जब कई थ्रेड्स को एक साथ मैप के साथ काम करना हो तब इस्तेमाल होता है। यह इसका हिस्सा है:", "Common methods": "आम मेथड्स", "Important collection interfaces": "ज़रूरी कलेक्शन इंटरफेस", "Provides:": "देता है:", "Common methods:": "आम मेथड्स:", "List interface": "लिस्ट इंटरफेस", "adds methods such as:": "ये मेथड्स जोड़ता है:", "Set interface": "सेट इंटरफेस", "Common methods inherited from": "से मिलने वाली आम मेथड्स", "'s main purpose is no duplicate elements.": "का मुख्य उद्देश्य डुप्लिकेट एलिमेंट्स न रखना है।", "Queue interface": "क्यू इंटरफेस", "→ insert": "→ जोड़ना", "→ remove": "→ हटाना", "→ view": "→ देखना", "Deque interface": "डीक्यू इंटरफेस", "make a": "से", "behave like a stack.": "स्टैक की तरह व्यवहार करता है।", "Map interface": "मैप इंटरफेस", "traverse": "ट्रैवर्स करना", "Used to traverse a collection.": "कलेक्शन को ट्रैवर्स (एक-एक करके पार) करने के लिए इस्तेमाल होता है।", "both directions": "दोनों दिशाओं में", "Works specifically with lists and supports movement in both directions.": "खास तौर पर लिस्ट के साथ काम करता है और दोनों दिशाओं में चलने की सुविधा देता है।", "Comparable and Comparator": "Comparable और Comparator", "natural ordering": "प्राकृतिक क्रम", "Used for natural ordering of objects. Main method:": "ऑब्जेक्ट्स के प्राकृतिक क्रम (natural ordering) के लिए इस्तेमाल होता है। मुख्य मेथड:", "custom ordering": "कस्टम क्रम", "Used for custom ordering. Main method:": "कस्टम क्रम के लिए इस्तेमाल होता है। मुख्य मेथड:", "Useful methods": "काम की मेथड्स", "Collections and Arrays utility classes": "Collections और Arrays यूटिलिटी क्लासेस", "Don't confuse them.": "इन्हें आपस में न मिलाएँ।", "is an interface.": "एक इंटरफेस है।", "is a utility class.": "एक यूटिलिटी क्लास है।", "static methods": "स्टैटिक मेथड्स", "for arrays": "ऐरे के लिए", "Collection vs Collections": "Collection बनाम Collections", "Utility class": "यूटिलिटी क्लास", "Part of the collection hierarchy": "कलेक्शन हायरार्की का हिस्सा", "Contains static utility methods": "स्टैटिक यूटिलिटी मेथड्स रखती है", "extend it": "इसे एक्सटेंड करते हैं", ", etc.": "आदि।", "Side-by-side comparisons": "आमने-सामने तुलना", "ArrayList vs LinkedList": "ArrayList बनाम LinkedList", "Dynamic array": "डायनामिक ऐरे", "Doubly linked list": "डबली लिंक्ड लिस्ट", "Fast random access": "तेज़ रैंडम एक्सेस", "Slower random access": "धीमा रैंडम एक्सेस", "generally O(1)": "आमतौर पर O(1)", "generally O(n)": "आमतौर पर O(n)", "Insertion or removal in the middle can be costly": "बीच में इन्सर्ट या रिमूव करना महँगा हो सकता है", "Can be efficient when the position or node is already known": "जब पोज़ीशन या नोड पहले से पता हो तब कुशल हो सकती है", "Usually preferred for general list usage": "सामान्य लिस्ट उपयोग के लिए आमतौर पर यही पसंद की जाती है", "Useful for frequent deque operations": "बार-बार होने वाले डीक्यू ऑपरेशन्स के लिए उपयोगी", "HashSet vs LinkedHashSet vs TreeSet": "HashSet बनाम LinkedHashSet बनाम TreeSet", "Feature": "विशेषता", "Duplicates": "डुप्लिकेट", "Insertion order": "इन्सर्शन ऑर्डर", "Sorted order": "सॉर्टेड क्रम", "Typical performance": "सामान्य परफ़ॉर्मेंस", "Fast": "तेज़", "One null generally allowed": "एक null की अनुमति आमतौर पर होती है", "Generally no null with natural ordering": "नेचुरल ऑर्डरिंग में आमतौर पर null नहीं", "HashMap vs LinkedHashMap vs TreeMap": "HashMap बनाम LinkedHashMap बनाम TreeMap", "Key-value": "की-वैल्यू", "Sorted keys": "सॉर्टेड कीज़", "Typical basic operation": "सामान्य बेसिक ऑपरेशन", "O(1) average": "औसतन O(1)", "Null key": "Null की", "One generally allowed": "एक की अनुमति आमतौर पर होती है", "Generally not with natural ordering": "नेचुरल ऑर्डरिंग में आमतौर पर नहीं", "Quick complete hierarchy": "पूरी हायरार्की एक नज़र में", "Most important for Java interviews": "जावा इंटरव्यू के लिए सबसे ज़रूरी", "The basic rule": "बुनियादी नियम", "Duplicate + ordered": "डुप्लिकेट + क्रमबद्ध", "Unique": "यूनिक", "Key + value": "की + वैल्यू", "Types of threads": "थ्रेड के प्रकार", "User thread": "यूज़र थ्रेड", "A normal thread created by the programmer.": "प्रोग्रामर द्वारा बनाया गया सामान्य थ्रेड।", "Daemon thread": "डेमन थ्रेड", "background": "बैकग्राउंड", "A background thread that supports user threads. It does not keep the JVM alive once all user threads have finished.": "एक बैकग्राउंड थ्रेड जो यूज़र थ्रेड्स की मदद करता है। सभी यूज़र थ्रेड्स खत्म होने के बाद यह JVM को चालू नहीं रखता।", "Garbage collection": "गार्बेज कलेक्शन", "Background monitoring": "बैकग्राउंड मॉनिटरिंग", "Background services": "बैकग्राउंड सर्विसेज़", "Ways to create a thread": "थ्रेड बनाने के तरीके", "A. Extend Thread": "A. Thread को एक्सटेंड करना", "B. Implement Runnable": "B. Runnable इम्प्लीमेंट करना", "C. Lambda": "C. लैम्ब्डा", "D. Callable": "D. Callable", "suits tasks that need to return a result or throw checked exceptions. It is normally used with": "उन कामों के लिए सही है जिन्हें नतीजा लौटाना हो या चेक्ड एक्सेप्शन फेंकने हों। इसे आमतौर पर इसके साथ इस्तेमाल किया जाता है:", "Important thread methods": "ज़रूरी थ्रेड मेथड्स", "Run": "चलाना", "Starts a new thread. It internally causes run() to execute on the new thread.": "नया थ्रेड शुरू करता है। यह अंदर से नए थ्रेड पर run() को चलवाता है।", "Contains the code executed by the thread. Calling run() directly does not create a new thread.": "वह कोड रखता है जिसे थ्रेड चलाता है। run() को सीधे कॉल करने से नया थ्रेड नहीं बनता।", "Pauses the currently executing thread. 1000 milliseconds = 1 second.": "फ़िलहाल चल रहे थ्रेड को रोकता है। 1000 मिलीसेकंड = 1 सेकंड।", "Makes one thread wait for another thread to finish.": "एक थ्रेड को दूसरे थ्रेड के खत्म होने तक इंतज़ार कराता है।", "Inspect": "जाँच", "Checks whether a thread is still running. Returns true or false.": "जाँचता है कि थ्रेड अभी चल रहा है या नहीं। true या false लौटाता है।", "Returns the currently executing thread.": "फ़िलहाल चल रहे थ्रेड को लौटाता है।", "Returns the current state: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING or TERMINATED.": "मौजूदा स्टेट लौटाता है: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING या TERMINATED।", "Returns or changes the thread's name.": "थ्रेड का नाम लौटाता या बदलता है।", "Returns the thread's ID. getId() is deprecated in modern Java releases; use threadId() in newer Java APIs.": "थ्रेड की ID लौटाता है। आधुनिक जावा में getId() डिप्रिकेटेड है; नए API में threadId() इस्तेमाल करें।", "Priority": "प्राथमिकता", "Returns the thread's priority. The default is 5.": "थ्रेड की प्राथमिकता लौटाता है। डिफ़ॉल्ट 5 है।", "Changes the thread's priority. Range is 1 (MIN) to 10 (MAX), with 5 as NORM.": "थ्रेड की प्राथमिकता बदलता है। रेंज 1 (MIN) से 10 (MAX) है, और 5 NORM है।", "Interrupt": "इंटरप्ट", "Requests a thread to stop waiting or sleeping, or otherwise respond to interruption. A sleeping thread gets an InterruptedException.": "थ्रेड से इंतज़ार या स्लीप रोकने, या इंटरप्शन पर प्रतिक्रिया देने का अनुरोध करता है। सोता हुआ थ्रेड InterruptedException पाता है।", "Checks whether the thread has been interrupted. Does not clear the flag.": "जाँचता है कि थ्रेड इंटरप्ट हुआ है या नहीं। फ़्लैग को साफ़ नहीं करता।", "Checks and clears the interruption status of the current thread.": "मौजूदा थ्रेड की इंटरप्शन स्थिति जाँचता है और उसे साफ़ कर देता है।", "Daemon": "डेमन", "Makes a thread a daemon. Must be called before start().": "थ्रेड को डेमन बनाता है। इसे start() से पहले कॉल करना ज़रूरी है।", "Checks whether a thread is a daemon.": "जाँचता है कि थ्रेड डेमन है या नहीं।", "No method matches that filter.": "इस फ़िल्टर से कोई मेथड मेल नहीं खाती।", "Priority constants": "प्रायॉरिटी कॉन्स्टेंट्स", "Constant": "कॉन्स्टेंट", "Value": "वैल्यू", "5 (default)": "5 (डिफ़ॉल्ट)", "Thread states": "थ्रेड की अवस्थाएँ", "A Java thread is in exactly one of six states at any moment, as reported by": "जावा थ्रेड किसी भी समय ठीक छह अवस्थाओं में से एक में होता है, जैसा कि इससे पता चलता है:", "created, not started": "बना है, शुरू नहीं हुआ", "ready or running": "तैयार या चल रहा है", "finished": "खत्म हुआ", "run() ends": "run() खत्म होने पर", "waiting for monitor lock": "मॉनिटर लॉक का इंतज़ार", "waiting indefinitely": "अनिश्चित समय तक इंतज़ार", "waiting for a set time": "तय समय तक इंतज़ार", "State": "अवस्था", "Meaning": "मतलब", "Thread created but not started": "थ्रेड बन गया है लेकिन शुरू नहीं हुआ", "Ready or running under JVM scheduling": "तैयार या JVM शेड्यूलिंग के तहत चल रहा है", "Waiting to acquire a monitor lock": "मॉनिटर लॉक पाने का इंतज़ार कर रहा है", "Waiting indefinitely": "अनिश्चित समय तक इंतज़ार", "Waiting for a specified time": "तय समय तक इंतज़ार", "Thread has finished": "थ्रेड खत्म हो चुका है", "These are not methods of": "ये इनके मेथड्स नहीं हैं:", ". They belong to": "। ये इसके हैं:", ", and they matter a great deal in multithreading. They are normally used inside synchronized code.": "और मल्टीथ्रेडिंग में इनका बहुत महत्व है। इन्हें आमतौर पर synchronized कोड के अंदर इस्तेमाल किया जाता है।", "Makes a thread wait and releases the object's monitor.": "थ्रेड को इंतज़ार कराता है और ऑब्जेक्ट का मॉनिटर छोड़ देता है।", "Wakes one waiting thread.": "एक इंतज़ार कर रहे थ्रेड को जगाता है।", "Wakes all threads waiting on that object's monitor.": "उस ऑब्जेक्ट के मॉनिटर पर इंतज़ार कर रहे सभी थ्रेड्स को जगाता है।", "Deprecated thread methods": "डिप्रिकेटेड थ्रेड मेथड्स", "can cause serious synchronization and consistency problems, so they should not be used.": "गंभीर सिंक्रोनाइज़ेशन और कंसिस्टेंसी समस्याएँ पैदा कर सकती हैं, इसलिए इनका उपयोग नहीं करना चाहिए।", "Avoid": "इनसे बचें", "Use instead, as needed": "ज़रूरत के अनुसार इसके बजाय इस्तेमाल करें", "Method cheat sheet": "मेथड चीट शीट", "Start thread": "थ्रेड शुरू करना", "Execute thread task": "थ्रेड का काम चलाना", "Pause current thread": "मौजूदा थ्रेड को रोकना", "Wait for another thread": "दूसरे थ्रेड का इंतज़ार करना", "Check if thread is alive": "जाँचना कि थ्रेड जीवित है या नहीं", "Get name": "नाम पाना", "Set name": "नाम सेट करना", "Get thread ID (deprecated in modern Java)": "थ्रेड ID पाना (आधुनिक जावा में डिप्रिकेटेड)", "Get thread ID in modern Java": "आधुनिक जावा में थ्रेड ID पाना", "Get priority": "प्राथमिकता पाना", "Set priority": "प्राथमिकता सेट करना", "Get current thread": "मौजूदा थ्रेड पाना", "Get thread state": "थ्रेड की अवस्था पाना", "Interrupt / request interruption": "इंटरप्ट करना / इंटरप्शन का अनुरोध करना", "Check interruption status": "इंटरप्शन स्थिति जाँचना", "Check and clear current thread's interrupt status": "मौजूदा थ्रेड की इंटरप्ट स्थिति जाँचना और साफ़ करना", "Make daemon thread": "डेमन थ्रेड बनाना", "Check daemon status": "डेमन स्थिति जाँचना", "Get thread group": "थ्रेड ग्रुप पाना", "Get stack trace": "स्टैक ट्रेस पाना", "Set handler for uncaught exceptions": "अनकॉट एक्सेप्शन के लिए हैंडलर सेट करना", "Get uncaught exception handler": "अनकॉट एक्सेप्शन हैंडलर पाना", "Thread methods": "थ्रेड मेथड्स", "Synchronization": "सिंक्रोनाइज़ेशन", "No": "नहीं"};for(var k in EX)D[k]=EX[k];var saved=[],lang='en',B=document.body,$=function(s){return document.querySelector(s)};
try{lang=localStorage.getItem('jlang')||'en'}catch(e){}
var SC='.part:not(#part-notes),.brand,header.top,.seg,#nav,#bt,#rt,.part:not(#part-notes) h2,.part:not(#part-notes) h3,.part:not(#part-notes) .tag,article.book > header,article.book .toc summary,.part-pager button,.pn button,footer,#pc,#sh';
function hi(t){var m,x=t.trim();if(!x)return null;
if(D[x])return D[x];
if(m=/^(\d+) · (.+)$/.exec(x))return D[m[2]]?m[1]+' · '+D[m[2]]:null;
if(m=/^PART (\d+) OF (\d+)$/i.exec(x))return 'भाग '+m[1]+' / '+m[2];
if(m=/^\((\d+) sections\)$/.exec(x))return '('+m[1]+' खंड)';
if(m=/^(←|→)?\s*Part (\d+):\s*(.+?)\s*(→)?$/.exec(x))return (m[1]||'')+' भाग '+m[2]+': '+(D[m[3]]||m[3])+(m[4]?' →':'');
if(m=/^← Part (\d+)$/.exec(x))return '← भाग '+m[1];if(m=/^Part (\d+) →$/.exec(x))return 'भाग '+m[1]+' →';
if(m=/^(\d+) \/ (\d+) learned$/.exec(x))return m[1]+' / '+m[2]+' सीखे';
if(m=/^🔊 Listen$/.exec(x))return '🔊 सुनें';if(x=='⏸ Stop')return '⏸ रोकें';
return null}
function walk(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,list=[];while(n=w.nextNode())list.push(n);
list.forEach(function(n){if(n.__hi===n.nodeValue)return;if(n.parentElement&&n.parentElement.closest('pre,code,script,style'))return;var r=hi(n.nodeValue);if(r){var lead=n.nodeValue.match(/^\s*/)[0],tr=n.nodeValue.match(/\s*$/)[0];if(n.__en===undefined){n.__en=n.nodeValue;saved.push(n)}n.nodeValue=lead+r+tr;n.__hi=n.nodeValue}})}
var ATT=[['#si','placeholder','खोजें: विषय, मेथड, कीवर्ड…','Search topics, methods, keywords…'],['#hrd','title','रीडर मोड','Reader mode'],['#hrd','aria-label','रीडर मोड','Reader mode']];
function setAtt(h){ATT.forEach(function(a){var e=$(a[0]);if(e)e.setAttribute(a[1],h?a[2]:a[3])});
document.querySelectorAll('.hb button').forEach(function(b){var m={'🔍':['खोजें','Search (Ctrl+K)'],'◐':['थीम','Theme'],'Aa':['टेक्स्ट साइज़','Text size']}[b.textContent];if(m)b.title=h?m[0]:m[1]});
document.querySelectorAll('.ok').forEach(function(e){e.title=h?'सीखा हुआ चिह्नित करें':'Mark learned'});
var si=$('#si');if(si)si.placeholder=h?'सभी 31 अध्यायों में खोजें…':'Search all 31 chapters and 2,290+ topics…';var sh=$('#sh');
$('#rm').title=h?'छोटा टेक्स्ट':'Smaller text';$('#rp2').title=h?'बड़ा टेक्स्ट':'Bigger text';$('#rl').title=h?'ज़ोर से पढ़ें':'Read aloud';$('#rx').title=h?'रीडर बंद करें (Esc)':'Exit reader (Esc)'}
function apply(){if(lang!=='hi')return;SC.split(',').forEach(function(sel){});document.querySelectorAll(SC).forEach(walk);setAtt(true)}
function setLang(l){lang=l;try{localStorage.setItem('jlang',l)}catch(e){}
B.classList.toggle('hi',l=='hi');document.documentElement.lang=l=='hi'?'hi':'en';
if(l=='hi')apply();else{saved.forEach(function(n){if(n.__en!==undefined){n.nodeValue=n.__en;n.__en=undefined;n.__hi=undefined}});saved=[];setAtt(false)}
btn.textContent=l=='hi'?'EN':'हि';btn.title=l=='hi'?'Switch to English':'हिंदी में बदलें'}
var btn=document.createElement('button');btn.id='hlg';btn.type='button';btn.setAttribute('aria-label','Language');var hb=$('.hb');hb.insertBefore(btn,hb.firstChild);
btn.onclick=function(){setLang(lang=='hi'?'en':'hi')};
var pend=0;new MutationObserver(function(){if(lang!=='hi'||pend)return;pend=1;setTimeout(function(){pend=0;apply()},90)}).observe(B,{childList:true,subtree:true});
setLang(lang);
})();
;

/* ===== script (line 46628 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},synth=window.speechSynthesis,spk=false,cur=null,rate=1,RATES=[.8,1,1.25,1.5],ri=1,voices=[],tk=0;
function loadV(){try{voices=synth.getVoices()||[]}catch(e){}}loadV();if(synth)synth.onvoiceschanged=loadV;
var old=$('#rl'),rl=old.cloneNode(true);old.replaceWith(rl);
function mk(id,txt,title){var b=document.createElement('button');b.id=id;b.type='button';b.textContent=txt;b.title=title;return b}
var rt=$('#rt'),sp=function(){var e=document.createElement('span');e.className='sp2';return e};
var bp=mk('rprev','⏮','Previous section'),bn=mk('rnext','⏭','Next section'),bs=mk('rspd','1×','Speed'),bl=mk('rlang','','Language');
rt.insertBefore(bp,rl);rt.insertBefore(bn,rl.nextSibling);rt.insertBefore(bs,bn.nextSibling);rt.insertBefore(sp(),bs.nextSibling);rt.insertBefore(bl,$('#rx'));
function isHi(){return B.classList.contains('hi')}
function lab(){bl.textContent=isHi()?'English':'हिंदी';bl.title=isHi()?'Switch to English':'हिंदी में बदलें';rl.textContent=spk?(isHi()?'⏸ रोकें':'⏸ Stop'):(isHi()?'🔊 सुनें':'🔊 Listen')}
function toast(t){var x=$('#rtoast');x.textContent=t;x.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(function(){x.style.display='none'},2600)}
function pick(hi){var l=voices.filter(function(v){return hi?/^hi/i.test(v.lang):/^en/i.test(v.lang)});if(!hi){var i=l.filter(function(v){return/^en-IN/i.test(v.lang)});if(i.length)l=i}return l[0]||null}
function secs(){var n=document.querySelectorAll('article.book h3[id]');if(n.length)return[].slice.call(n);return[].slice.call(document.querySelectorAll('.part section')).filter(function(x){return x.offsetParent})}
function first(){var l=secs(),p=l[0];l.forEach(function(h){if(h.getBoundingClientRect().top<=160)p=h});return p}
function textOf(h){var nodes=[],t='';if(h.tagName=='H3'){nodes.push(h);var e=h.nextElementSibling;while(e&&!(e.tagName=='H3'&&e.id)){nodes.push(e);e=e.nextElementSibling}}else nodes=[h];
nodes.forEach(function(n){var c=n.cloneNode(true);c.querySelectorAll('pre,button,details,script,style,.ok,.cpy,.cp2').forEach(function(x){x.remove()});c.querySelectorAll('*').forEach(function(e){e.insertAdjacentText('afterend',' ')});c.querySelectorAll('tr').forEach(function(r){r.insertAdjacentText('beforeend','. ')});c.querySelectorAll('td,th').forEach(function(x){x.insertAdjacentText('beforeend',', ')});t+=' '+c.textContent+'. '});
return t.replace(/\s+/g,' ').trim()}
function chunks(t){var out=[],re=/[^.!?।]+[.!?।]*\s*/g,m,b='';while((m=re.exec(t))){if((b+m[0]).length>170){if(b)out.push(b);b=m[0]}else b+=m[0]}if(b)out.push(b);return out}
function mark(h,on){if(h)h.classList.toggle('rdnow',on)}
function goto(h){mark(cur,false);cur=h;mark(h,true);h.scrollIntoView({behavior:'smooth',block:'start'})}
function nextPage(cb){var my=tk;
var a=$('article.book .pn button:last-child,.part-pager button:last-child');
if($('#part-notes')&&$('#part-notes').offsetParent){if(a&&a.textContent.indexOf('→')>=0){var id0=(document.querySelector('article.book h3[id]')||{}).id;a.click();var n=0,iv=setInterval(function(){var h=document.querySelector('article.book h3[id]');if(my!=tk){clearInterval(iv);return}if((h&&h.id!==id0)||++n>40){clearInterval(iv);if(h&&h.id!==id0)cb(h);else stop()}},120);return}stop();return}
var order=['oops','collections','threads'],vis=['oops','collections','threads'].filter(function(k){var e=$('#part-'+k);return e&&e.offsetParent})[0],i=order.indexOf(vis);
if(i>=0&&i<order.length-1){$('#seg-'+order[i+1]).click();setTimeout(function(){if(my!=tk)return;var l=secs();l.length?cb(l[0]):stop()},500);return}stop()}
function speak(h){if(!spk||!h)return;var my=tk;goto(h);var q=chunks(textOf(h)),i=0;
function nx(){if(!spk||my!=tk)return;if(i>=q.length){var l=secs(),k=l.indexOf(h);if(k>=0&&k<l.length-1)return speak(l[k+1]);return nextPage(speak)}
var txt=q[i++],hi=/[\u0900-\u097F]/.test(txt),u=new SpeechSynthesisUtterance(txt),v=pick(hi);u.lang=hi?'hi-IN':'en-IN';if(v){try{u.voice=v}catch(e){}u.lang=v.lang}else if(hi&&!nx.w){nx.w=1;toast(isHi()?'इस डिवाइस पर हिंदी आवाज़ नहीं मिली':'No Hindi voice found on this device')}
u.rate=rate;u.onend=nx;u.onerror=function(ev){if(ev&&(ev.error=='interrupted'||ev.error=='canceled'))return;if(my!=tk)return;stop();toast('No voice available')};synth.speak(u)}
nx()}
function start(h){if(!synth){toast('Read-aloud is not supported in this browser');return}tk++;spk=true;rl.classList.add('on');lab();synth.cancel();speak(h||first())}
function stop(){tk++;spk=false;if(synth)synth.cancel();mark(cur,false);rl.classList.remove('on');lab()}
function skip(d){var l=secs(),k=l.indexOf(cur||first());k=Math.max(0,Math.min(l.length-1,k+d));if(spk){tk++;synth.cancel();speak(l[k])}else{goto(l[k])}}
rl.onclick=function(){spk?stop():start()};bp.onclick=function(){skip(-1)};bn.onclick=function(){skip(1)};
bs.onclick=function(){ri=(ri+1)%RATES.length;rate=RATES[ri];bs.textContent=rate+'×';if(spk){var c=cur;tk++;synth.cancel();speak(c)}};
bl.onclick=function(){var was=spk,c=cur;if(was){tk++;spk=false;synth.cancel()}$('#hlg').click();setTimeout(function(){lab();if(was){spk=true;rl.classList.add('on');speak(c||first())}},250)};
new MutationObserver(function(){if(!B.classList.contains('rd')&&spk)stop();lab()}).observe(B,{attributes:true,attributeFilter:['class']});
lab();
})();
;

/* ===== script (line 46712 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},H=document.createElement('section');H.id='home';
var wrap=$('.wrap');wrap.insertBefore(H,$('.bar').nextSibling);
function L(e,h){return B.classList.contains('hi')?h:e}
var CH=[[1,'Core Java','कोर जावा'],[2,'Java Basics','जावा बेसिक्स'],[3,'Control Statements','कंट्रोल स्टेटमेंट्स'],[4,'Arrays','ऐरे'],[5,'Strings','स्ट्रिंग्स'],[6,'OOP','OOP'],[7,'Important OOP Concepts','महत्वपूर्ण OOP कॉन्सेप्ट्स'],[8,'Packages & Access Modifiers','पैकेज और एक्सेस मॉडिफायर'],[9,'Exception Handling','एक्सेप्शन हैंडलिंग'],[10,'Wrapper Classes','रैपर क्लासेस'],[11,'Object Class','ऑब्जेक्ट क्लास'],[12,'Interfaces','इंटरफेस'],[13,'Collections Framework','कलेक्शन्स फ्रेमवर्क'],[14,'Generics','जेनेरिक्स'],[15,'Java I/O','जावा I/O'],[16,'Java NIO','जावा NIO'],[17,'Multithreading','मल्टीथ्रेडिंग'],[18,'Java 8 Features','जावा 8 फीचर्स'],[19,'Date & Time API','डेट और टाइम API'],[20,'Functional Programming','फंक्शनल प्रोग्रामिंग'],[21,'Reflection API','रिफ्लेक्शन API'],[22,'Annotations','एनोटेशन्स'],[23,'Enum','एनम'],[24,'Inner Classes','इनर क्लासेस'],[25,'JDBC','JDBC'],[26,'Networking','नेटवर्किंग'],[27,'GUI Programming','GUI प्रोग्रामिंग'],[28,'Memory Management','मेमोरी मैनेजमेंट'],[29,'Garbage Collection','गार्बेज कलेक्शन'],[30,'JVM Internals','JVM की आंतरिक संरचना'],[31,'Java Modules (JPMS)','जावा मॉड्यूल्स (JPMS)']];
var GR=[['Foundations','बुनियाद',[1,2,3,4,5]],['Object-Oriented Java','ऑब्जेक्ट-ओरिएंटेड जावा',[6,7,8,9,10,11,12]],['Data & I/O','डेटा और I/O',[13,14,15,16]],['Concurrency & Modern Java','कंकरेंसी और मॉडर्न जावा',[17,18,19,20]],['Advanced APIs','एडवांस्ड APIs',[21,22,23,24,25,26,27]],['Runtime & Internals','रनटाइम और इंटरनल्स',[28,29,30,31]]];
var tot={},topics=[];
document.querySelectorAll('template[id^="tpl-b"]').forEach(function(t){var n=+t.id.slice(5),c=0;t.content.querySelectorAll('h3[id]').forEach(function(h){c++;topics.push({n:n,id:h.id,t:h.textContent.trim()})});tot[n]=c});
function done(){try{return JSON.parse(localStorage.getItem('jdone')||'[]')}catch(e){return[]}}
function last(){try{return+localStorage.getItem('jlast')||0}catch(e){return 0}}
function leave(){B.classList.remove('home');sync()}
function goHome(){B.classList.add('home');B.classList.remove('dr');scrollTo(0,0);render();sync()}
function openCh(n,id){leave();$('#seg-notes').click();setTimeout(function(){var a=$('#nav a[data-n="'+n+'"]');if(a)a.click();var k=0,iv=setInterval(function(){var e=id&&document.getElementById(id);if(!id||e||++k>30){clearInterval(iv);if(e){e.scrollIntoView({block:'start'});e.style.outline='2px solid var(--accent)';setTimeout(function(){e.style.outline=''},2200)}else scrollTo(0,0)}},80)},160)}
function openTab(k){leave();$('#seg-'+k).click();scrollTo(0,0)}
function render(){if(!B.classList.contains('home'))return;
var d=done(),per={};d.forEach(function(k){var m=/^b(\d+)-/.exec(k);if(m)per[m[1]]=(per[m[1]]||0)+1});
var T=0;for(var k in tot)T+=tot[k];var D=d.filter(function(k){return/^b\d+-/.test(k)}).length,pc=T?Math.round(D/T*100):0,ls=last(),lc=CH[ls-1];
var day=Math.floor(Date.now()/864e5),tp=topics[day%topics.length]||topics[0];
var cont=ls&&lc?'<h3>'+L('Continue learning','पढ़ाई जारी रखें')+'</h3><div class="t">'+L('Part ','भाग ')+ls+' · '+L(lc[1],lc[2])+'</div><div class="hm-bar"><i style="width:'+Math.round((per[ls]||0)/(tot[ls]||1)*100)+'%"></i></div><p>'+(per[ls]||0)+' / '+tot[ls]+' '+L('topics learned','टॉपिक सीखे')+'</p><button class="hm-btn" data-ch="'+ls+'">'+L('Resume →','जारी रखें →')+'</button>'
 :'<h3>'+L('Start here','यहाँ से शुरू करें')+'</h3><div class="t">'+L('Part 1 · Core Java','भाग 1 · कोर जावा')+'</div><p>'+L('New to Java? Begin with the basics and move chapter by chapter.','जावा में नए हैं? बुनियाद से शुरू करें और अध्याय-दर-अध्याय आगे बढ़ें।')+'</p><button class="hm-btn" data-ch="1">'+L('Begin →','शुरू करें →')+'</button>';
var html='<div class="hm-hero"><div class="k">'+L('Java Sutra · by Abhinav · Interview prep','जावा सूत्र · अभिनव द्वारा · इंटरव्यू की तैयारी')+'</div><h1>'+L('Learn Java, from zero to interview-ready','जावा सीखें, ज़ीरो से इंटरव्यू-रेडी तक')+'</h1><p>'+L('Your compact rulebook for Java: 31 chapters, 2,290+ topics, quick-reference cards and a reader that talks. In English and Hindi.','जावा का आपका संक्षिप्त नियम-पुस्तक: 31 अध्याय, 2,290+ टॉपिक, क्विक-रेफ़रेंस कार्ड्स और बोलकर पढ़ने वाला रीडर। हिंदी और अंग्रेज़ी दोनों में।')+'</p><div class="hm-cta"><button class="hm-p" data-ch="'+(ls||1)+'">'+(ls?L('Continue learning','पढ़ाई जारी रखें'):L('Start learning','सीखना शुरू करें'))+'</button><button class="hm-s" id="hmS">🔍 '+L('Search topics','टॉपिक खोजें')+'</button></div></div>'
+'<div class="hm-stats"><div class="hm-st"><b>31</b><span>'+L('Chapters','अध्याय')+'</span></div><div class="hm-st"><b>'+T.toLocaleString()+'</b><span>'+L('Topics','टॉपिक')+'</span></div><div class="hm-st"><b>3</b><span>'+L('Quick-reference tabs','क्विक-रेफ़रेंस टैब')+'</span></div><div class="hm-st"><b>2</b><span>'+L('Languages','भाषाएँ')+'</span></div></div>'
+'<div class="hm-row"><div class="hm-card">'+cont+'</div><div class="hm-card"><h3>'+L('Your progress','आपकी प्रगति')+'</h3><div class="hm-prog"><div class="hm-ring" style="--p:'+pc+'" data-t="'+pc+'%"></div><div><div class="t">'+D+' / '+T+'</div><p style="margin:0">'+L('topics marked learned','टॉपिक सीखे हुए चिह्नित')+'</p></div></div></div></div>'
+'<div class="hm-row" style="margin-top:14px"><div class="hm-card"><h3>'+L('Topic of the day','आज का टॉपिक')+'</h3><div class="t">'+tp.t.replace(/</g,'&lt;')+'</div><p>'+L('Part ','भाग ')+tp.n+' · '+L(CH[tp.n-1][1],CH[tp.n-1][2])+'</p><button class="hm-btn" data-ch="'+tp.n+'" data-id="'+tp.id+'">'+L('Read it →','पढ़ें →')+'</button></div><div class="hm-card"><h3>'+L('Interview tip','इंटरव्यू टिप')+'</h3><div class="t">'+L('Master the core order','सही क्रम में सीखें')+'</div><p style="margin:0">'+L('Class → Object → Constructor → Inheritance → Overriding → Abstraction → Collections → Threads.','Class → Object → Constructor → Inheritance → Overriding → Abstraction → Collections → Threads।')+'</p></div></div>'
+'<div class="hm-h">'+L('Quick reference','क्विक रेफ़रेंस')+'<small>'+L('Fast revision cards for interviews','इंटरव्यू से पहले तेज़ रिवीज़न कार्ड्स')+'</small></div><div class="hm-quick"><button class="hm-q" data-tab="oops"><div class="e">🧱</div><b>OOPs</b><span>'+L('4 pillars, constructors, casting','4 स्तंभ, कंस्ट्रक्टर, कास्टिंग')+'</span></button><button class="hm-q" data-tab="collections"><div class="e">📦</div><b>'+L('Collections','कलेक्शन्स')+'</b><span>'+L('List, Set, Queue, Map','List, Set, Queue, Map')+'</span></button><button class="hm-q" data-tab="threads"><div class="e">🧵</div><b>'+L('Threads','थ्रेड्स')+'</b><span>'+L('Methods, states, wait/notify','मेथड्स, स्टेट्स, wait/notify')+'</span></button><button class="hm-q" data-ch="1"><div class="e">📘</div><b>'+L('Full Notes','पूरे नोट्स')+'</b><span>'+L('All 31 chapters in depth','सभी 31 अध्याय विस्तार से')+'</span></button></div>'
;
GR.forEach(function(g){html+='<div class="hm-g">'+L(g[0],g[1])+'</div><div class="hm-chs">'+g[2].map(function(n){var c=CH[n-1],x=per[n]||0,f=x>=tot[n];return'<button class="hm-ch'+(f?' full':'')+'" data-ch="'+n+'"><span class="n">'+(n<10?'0':'')+n+'</span><b>'+L(c[1],c[2])+'</b><div class="hm-bar" style="margin:6px 0 2px"><i style="width:'+Math.round(x/tot[n]*100)+'%"></i></div><small>'+x+' / '+tot[n]+'</small></button>'}).join('')+'</div>'});
H.innerHTML=html}
H.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.id=='hmS'){document.getElementById('fs').click();return}
if(b.dataset.tab)openTab(b.dataset.tab);else if(b.dataset.ch)openCh(+b.dataset.ch,b.dataset.id)});
['oops','collections','threads','notes'].forEach(function(k){$('#seg-'+k).addEventListener('click',function(e){if(e.isTrusted||true)leave()},true)});
document.querySelectorAll('#bt button').forEach(function(b){b.addEventListener('click',function(){if(!b.dataset.home)leave()},true)});
var hb=$('.hb'),hh=document.createElement('button');hh.id='hhome';hh.type='button';hh.textContent='🏠';hh.title='Home';hh.setAttribute('aria-label','Home');hh.onclick=goHome;hb.insertBefore(hh,hb.firstChild);
var bt=$('#bt'),hm=document.createElement('button');hm.dataset.t='home';hm.dataset.home=1;hm.innerHTML='<span>🏠</span>Home';hm.onclick=goHome;bt.insertBefore(hm,bt.firstChild);
$('.brand').style.cursor='pointer';$('.brand').onclick=goHome;
function sync(){var h=B.classList.contains('home');hm.classList.toggle('on',h);hh.classList.toggle('on',h);if(h)document.querySelectorAll('#bt button:not([data-home])').forEach(function(b){b.classList.remove('on')})}
new MutationObserver(function(){var n=$('#part-notes'),a=$('article.book .eyebrow');if(n&&n.offsetParent&&a){var m=/(\d+)/.exec(a.textContent);if(m)try{localStorage.setItem('jlast',m[1])}catch(e){}}}).observe(B,{childList:true,subtree:true});
var hKey=function(){return(B.classList.contains('home')?1:0)+'|'+(B.classList.contains('hi')?1:0)},hPrev=hKey();
new MutationObserver(function(){var k=hKey();if(k!==hPrev){hPrev=k;render()}sync()}).observe(B,{attributes:true,attributeFilter:['class']});
document.addEventListener('click',function(e){if(e.target.closest('.ok'))setTimeout(render,100)},true);
goHome();
})();
;

/* ===== script (line 46803 of original) ===== */
(function(){
var B=document.body,H=document.getElementById('home'),was=false,tm;
function count(){if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;H.querySelectorAll('.hm-st b').forEach(function(b){var t=b.textContent,n=parseInt(t.replace(/\D/g,''),10);if(!n)return;var t0=performance.now(),loc=/,/.test(t);(function f(now){var k=Math.min(1,(now-t0)/1000),e=1-Math.pow(1-k,3),v=Math.round(n*e);b.textContent=loc?v.toLocaleString():v;if(k<1)requestAnimationFrame(f)})(t0)})}
function stag(){H.querySelectorAll('.hm-ch,.hm-q').forEach(function(e,i){e.style.setProperty('--i',i)})}
function enter(){H.classList.remove('enter');void H.offsetWidth;stag();H.classList.add('enter');count();clearTimeout(tm);tm=setTimeout(function(){H.classList.remove('enter')},2600)}
function chk(){var h=B.classList.contains('home');if(h&&!was)setTimeout(enter,30);was=h}
new MutationObserver(chk).observe(B,{attributes:true,attributeFilter:['class']});
setTimeout(function(){if(B.classList.contains('home')){was=true;enter()}},60);
})();
;

/* ===== script (line 46851 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},sample=null,turns=[],ctl=null,busy=false,deep=false;
function hi(){return B.classList.contains('hi')}function L(e,h){return hi()?h:e}
var btn=document.createElement('button');btn.id='cbBtn';btn.type='button';btn.textContent='💬';btn.title='Ask AI';btn.setAttribute('aria-label','Ask AI tutor');btn.style.display='';
var fab=$('.fab');fab.insertBefore(btn,fab.firstChild);
var P=$('#cb'),M=$('#cbm'),I=$('#cbi'),S=$('#cbs'),CH=$('#cbc');
var RULES="You are a friendly, precise Java tutor built into the study website 'Java Sutra' (by Abhinav Maurya) (31 chapters: Core Java, OOP, Collections, Multithreading, Java 8, JDBC, JVM internals, Modules and more). Rules: be concise (under about 220 words unless asked for more); explain simply first, then the detail; use short Java examples inside ```java code fences; use bullets for lists; for interview prep mention what interviewers usually ask; if asked for a quiz, give 3 numbered MCQs and put the answers at the end. Use the PAGE CONTEXT when it helps. If the user writes in Hindi, Devanagari or Hinglish, reply in the same style (keep Java keywords and code in English). If a question is unrelated to Java or programming, politely steer back. Never invent facts: if unsure, say so.";
function esc(x){return x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function inl(x){return esc(x).replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>')}
function md(t){var out='',parts=t.split(/```/);parts.forEach(function(seg,i){if(i%2){var nl=seg.indexOf('\n'),code=nl>=0&&/^[\w+#-]*$/.test(seg.slice(0,nl).trim())?seg.slice(nl+1):seg;out+='<pre><code>'+esc(code.replace(/\n$/,''))+'</code></pre>'}else{var lines=seg.split('\n'),list=null,para=[];function fl(){if(para.length){out+='<p>'+para.join('<br>')+'</p>';para=[]}}function cl(){if(list){out+='</'+list+'>';list=null}}
lines.forEach(function(l){var m=/^\s*([-*•]|\d+[.)])\s+(.*)/.exec(l);if(m){fl();var tg=/\d/.test(m[1])?'ol':'ul';if(list!==tg){cl();out+='<'+tg+'>';list=tg}out+='<li>'+inl(m[2])+'</li>'}else if(!l.trim()){cl();fl()}else{cl();para.push(inl(l.replace(/^#+\s*/,'')))}});cl();fl()}});return out}
function add(role,html,cls){var d=document.createElement('div');d.className='cbx '+role+(cls?' '+cls:'');d.innerHTML=html;M.appendChild(d);M.scrollTop=M.scrollHeight;return d}
function ctx(){var parts=[],h=B.classList.contains('home');if(B.classList.contains('jsq'))return 'The user is on the JavaSquadz section: a GitHub repository (abhinavmaurya12/JavaSquadz) of Java practice programs covering Core Java, OOP, arrays, strings, patterns, exception handling, multithreading, file handling, I/O streams, networking, AWT/Swing, garbage collection, packages, collections, serialization and reflection.';
if(h){return 'The user is on the Home page of the site (overview, learning path of 31 chapters).'}
var art=document.querySelector('article.book');
if(art&&art.offsetParent){var t=(art.querySelector('h2')||{}).textContent||'',ey=(art.querySelector('.eyebrow')||{}).textContent||'';parts.push('Chapter: '+ey.trim()+' '+t.trim());
var hs=[].slice.call(art.querySelectorAll('h3[id]')),cur=hs[0];hs.forEach(function(x){if(x.getBoundingClientRect().top<=200)cur=x});
if(cur){var txt=cur.textContent+'. ',e=cur.nextElementSibling;while(e&&!(e.tagName=='H3'&&e.id)&&txt.length<4500){var c=e.cloneNode(true);c.querySelectorAll('.ok,.cpy,button').forEach(function(z){z.remove()});txt+=' '+c.textContent;e=e.nextElementSibling}parts.push('Section the user is reading: '+txt.replace(/\s+/g,' ').slice(0,4500))}}
else{var part=[].slice.call(document.querySelectorAll('.part')).filter(function(x){return x.offsetParent})[0];if(part){var secs=[].slice.call(part.querySelectorAll('section')),cur2=secs[0];secs.forEach(function(x){if(x.getBoundingClientRect().top<=200)cur2=x});parts.push('Quick-reference tab: '+((part.querySelector('h2')||{}).textContent||''));if(cur2){var c2=cur2.cloneNode(true);c2.querySelectorAll('.ok,.cpy,button').forEach(function(z){z.remove()});parts.push('Section on screen: '+c2.textContent.replace(/\s+/g,' ').slice(0,4000))}}}
return parts.join('\n')}
function chips(){var h=B.classList.contains('home');var a=h?[[L('What should I learn first?','सबसे पहले क्या सीखूँ?'),'I am a beginner. Give me a clear 6-step study plan for these notes.'],[L('Top 10 interview topics','टॉप 10 इंटरव्यू टॉपिक'),'List the 10 most asked Java interview topics with a one-line reason each.'],[L('Explain OOP simply','OOP आसान भाषा में'),'Explain the 4 pillars of OOP simply with one tiny example each.']]
:[[L('Explain this simply','यह आसान भाषा में समझाओ'),'Explain the section I am reading in simple words with one small example.'],[L('Interview questions','इंटरव्यू प्रश्न'),'Give 3 likely interview questions on what I am reading, with short model answers.'],[L('Quiz me','मेरा क्विज़ लो'),'Quiz me with 3 multiple-choice questions on what I am reading. Put the answers at the end.'],[L('Explain in Hindi','हिंदी में समझाओ'),'इस सेक्शन को आसान हिंदी (Hinglish) में समझाओ, कोड और keywords अंग्रेज़ी में रखो।'],[L('Common mistakes','आम गलतियाँ'),'What are the most common mistakes beginners make with this topic?']];
if(mode()==='local'){a=[[L('What is polymorphism?','Polymorphism क्या है?'),'polymorphism'],[L('ArrayList vs LinkedList','ArrayList बनाम LinkedList'),'arraylist linkedlist'],[L('JVM architecture','JVM आर्किटेक्चर'),'jvm architecture'],[L('Thread states','थ्रेड स्टेट्स'),'thread states'],[L('Show current section','अभी का सेक्शन'),'@cur']]}
CH.innerHTML='';a.forEach(function(x){var b=document.createElement('button');b.textContent=x[0];b.onclick=function(){if(x[1]==='@cur')return showCur();send(x[1],x[0])};CH.appendChild(b)})}
function lab(){$('#cbT').textContent=L('Java Tutor AI','जावा ट्यूटर AI');$('#cbS').textContent=L('Knows the page you are on','आप जिस पेज पर हैं उसे जानता है');I.placeholder=L('Ask anything about Java…','जावा के बारे में कुछ भी पूछें…');var mm=mode();$('#cbnote').textContent=mm==='local'?L('Offline mode: answers come from the notes. Tap ⚙ to add an API key for AI answers.','ऑफ़लाइन मोड: जवाब नोट्स से आते हैं। AI जवाबों के लिए ⚙ में API key जोड़ें।'):L('AI can make mistakes. Check important facts in the notes.','AI गलतियाँ कर सकता है। ज़रूरी बातें नोट्स में जाँचें।')+(mm==='api'?L(' (Using your API key)',' (आपकी API key से)'):'');$('#cbkT').textContent=L('Use your own Anthropic API key','अपनी Anthropic API key इस्तेमाल करें');$('#cbkP').textContent=L('Needed only when this page is opened outside Claude (for example the exported file). Saved in this browser only and sent only to Anthropic.','सिर्फ़ तब चाहिए जब पेज Claude के बाहर खुले (जैसे एक्सपोर्ट की हुई फ़ाइल)। सिर्फ़ इसी ब्राउज़र में सेव होती है और सिर्फ़ Anthropic को भेजी जाती है।');$('#cbkS').textContent=L('Save','सेव');$('#cbkR').textContent=L('Remove','हटाएँ');$('#cbX').title=L('New chat','नई चैट');$('#cbC').title=L('Close','बंद करें');$('#cbD').title=L('Deeper thinking (slower)','गहरी सोच (धीमी)');btn.title=L('Ask AI','AI से पूछें');chips()}
function greet(){M.innerHTML='';add('a','<p>'+(hi()?'नमस्ते! 👋 मैं आपका जावा ट्यूटर हूँ। आप जो पढ़ रहे हैं, मैं उसे देख सकता हूँ — कुछ भी पूछिए।':'Hi! 👋 I\'m your Java tutor. I can see the part of the notes you\'re reading — ask me anything.')+'</p>');turns=[]}
function openC(){P.classList.add('on');btn.style.display='none';lab();setTimeout(function(){I.focus()},250)}
function closeC(){P.classList.remove('on');btn.style.display=''}
function fix(code,e){var m={not_granted:L('AI is turned off for this page. Allow it when asked, or reload the page to try again.','इस पेज के लिए AI बंद है। पूछे जाने पर अनुमति दें या पेज रीलोड करें।'),sampling_disabled:L('AI is not available on this account.','इस अकाउंट पर AI उपलब्ध नहीं है।'),rate_limited:L('Too many questions or your usage limit was reached. Try again in a little while.','बहुत ज़्यादा प्रश्न या उपयोग सीमा पूरी हो गई। थोड़ी देर बाद कोशिश करें।'),session_expired:L('Please sign in to Claude again.','कृपया Claude में दोबारा साइन इन करें।'),prompt_too_large:L('That was too long. Try a shorter question.','यह बहुत लंबा था। छोटा प्रश्न पूछें।'),refused:L('I can\'t help with that one. Try asking differently.','इसमें मैं मदद नहीं कर सकता। अलग तरह से पूछें।'),empty_completion:L('No answer came back. Try rephrasing.','कोई जवाब नहीं आया। दोबारा पूछें।')};return m[code]||L('Something went wrong. Please try again.','कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें।')}
function setBusy(b){busy=b;S.textContent=b?'■':'➤';S.classList.toggle('stop',b);S.title=b?'Stop':'Send';I.disabled=false}
function send(q,shown){q=(q||'').trim();if(!q||busy)return;if(!P.classList.contains('on'))openC();var md_=mode();if(md_==='local')return localSend(q,shown);if(md_==='api')return apiSend(q,shown);if(!sample)return;
add('u',esc(shown||q).replace(/\n/g,'<br>'));I.value='';I.style.height='auto';
var a=add('a','<span class="cbt"><i></i><i></i><i></i></span>');setBusy(true);ctl=new AbortController();
var langHint=hi()?'The site is currently in Hindi mode; prefer simple Hindi/Hinglish unless the user writes in English.':'The site is in English mode.';
var input=[{role:'user',content:RULES+'\n'+langHint}].concat(turns.slice(-10),[{role:'user',content:'PAGE CONTEXT:\n'+ctx()+'\n\nQUESTION:\n'+q}]);
var opts={cache:false,signal:ctl.signal,modelTier:deep?'default':'quick',onText:function(o){a.innerHTML=md(o.text);M.scrollTop=M.scrollHeight}};
sample(input,opts).then(function(r){a.innerHTML=md(r.text);turns.push({role:'user',content:q},{role:'assistant',content:r.text});if(r.truncated)add('e',L('Answer was cut short. Ask for less at a time.','जवाब अधूरा रह गया। एक बार में कम पूछें।'))}).catch(function(e){var code=e&&e.code;if(code=='cancelled'){if(e.text){a.innerHTML=md(e.text)}else a.remove();return}
if(e&&e.text){a.innerHTML=md(e.text)+'<p><i>…</i></p>'}else a.remove();if(code!=='cancelled')add('e',fix(code,e))}).then(function(){setBusy(false);ctl=null;M.scrollTop=M.scrollHeight})}
function key(){try{return localStorage.getItem('jcbkey')||''}catch(e){return ''}}
function mode(){return sample?'ai':(key()?'api':'local')}
var IDX=null,STOP={};'the a an is are of in on to and or what how why does do explain about java between difference vs with for tell me give example examples mean means simply section this that it its'.split(' ').forEach(function(w){STOP[w]=1});
function buildIdx(){if(IDX)return IDX;IDX=[];document.querySelectorAll('template[id^="tpl-b"]').forEach(function(t){var n=+t.id.slice(5),ch='Part '+n+' · '+(((t.content.querySelector('h2')||{}).textContent)||'').trim(),cur=null,art=t.content.querySelector('article'),kids=[].slice.call(art?art.children:t.content.children);kids.forEach(function(e){if(e.tagName=='H3'&&e.id){cur={n:n,id:e.id,t:e.textContent.trim(),ch:ch,tx:''};IDX.push(cur)}else if(cur&&cur.tx.length<1600&&!e.matches('details,nav')){cur.tx+=' '+e.textContent}})});
document.querySelectorAll('.part:not(#part-notes) section').forEach(function(sc){var h=sc.querySelector('h2');if(h)IDX.push({q:sc.id,t:h.textContent.trim(),ch:L('Quick reference','क्विक रेफ़रेंस'),tx:sc.textContent.slice(0,1400)})});
IDX.forEach(function(x){x.lt=x.t.toLowerCase();x.lx=(x.tx||'').toLowerCase().replace(/\s+/g,' ')});return IDX}
function toks(q){return q.toLowerCase().replace(/[^a-z0-9_#+. ]/g,' ').split(/\s+/).filter(function(w){return w.length>1&&!STOP[w]})}
function goTo(x){closeC();B.classList.remove('home');
if(x.q){var e=document.getElementById(x.q),pt=e&&e.closest('.part');if(pt){$('#seg-'+pt.id.replace('part-','')).click();setTimeout(function(){var el=document.getElementById(x.q);el&&el.scrollIntoView({block:'start'})},220)}return}
$('#seg-notes').click();setTimeout(function(){var a=$('#nav a[data-n="'+x.n+'"]');a&&a.click();var k=0,iv=setInterval(function(){var el=document.getElementById(x.id);if(el||++k>30){clearInterval(iv);if(el){el.scrollIntoView({block:'start'});el.style.outline='2px solid var(--accent)';setTimeout(function(){el.style.outline=''},2200)}}},80)},160)}
function showCur(){if(!P.classList.contains('on'))openC();add('u',L('Show current section','अभी का सेक्शन'));var c=ctx();add('a','<p>'+esc(c.replace(/\s+/g,' ').slice(0,700))+'…</p>')}
function localSend(q,shown){add('u',esc(shown||q).replace(/\n/g,'<br>'));I.value='';I.style.height='auto';var tk=toks(shown||q);
if(!tk.length){add('a','<p>'+L('Type a topic, for example <b>polymorphism</b> or <b>HashMap</b>.','कोई टॉपिक लिखें, जैसे <b>polymorphism</b> या <b>HashMap</b>।')+'</p>');return}
var idx=buildIdx(),ph=tk.join(' '),sc=idx.map(function(x){var s0=0;tk.forEach(function(w){if(x.lt.indexOf(w)>=0)s0+=6;var c=0,p=-1;while(c<3&&(p=x.lx.indexOf(w,p+1))>=0)c++;s0+=c});if(x.lt.indexOf(ph)>=0)s0+=10;return{x:x,s:s0}}).filter(function(r){return r.s>=4}).sort(function(a,b){return b.s-a.s}).slice(0,3);
if(!sc.length){add('a','<p>'+L('I couldn\'t find that in the notes. Try a shorter keyword, or add an API key (⚙) for full AI answers.','यह मुझे नोट्स में नहीं मिला। छोटा कीवर्ड आज़माएँ या पूरे AI जवाबों के लिए API key (⚙) जोड़ें।')+'</p>');return}
var d=add('a','<p>'+L('Here is what the notes say:','नोट्स में यह मिला:')+'</p>');
sc.forEach(function(r){var x=r.x,sn=(x.tx||'').replace(/\s+/g,' ').replace(x.t,'').trim().slice(0,260),b=document.createElement('div');b.className='cbr';b.innerHTML='<b>'+esc(x.t)+'</b><small>'+esc(x.ch)+'</small><p>'+esc(sn)+'…</p>';var o=document.createElement('button');o.textContent=L('Open section →','सेक्शन खोलें →');o.onclick=function(){goTo(x)};b.appendChild(o);d.appendChild(b)});M.scrollTop=M.scrollHeight}
function apiSend(q,shown){add('u',esc(shown||q).replace(/\n/g,'<br>'));I.value='';I.style.height='auto';var a=add('a','<span class="cbt"><i></i><i></i><i></i></span>');setBusy(true);ctl=new AbortController();var full='';
var sys=RULES+'\n'+(hi()?'The site is currently in Hindi mode; prefer simple Hindi/Hinglish unless the user writes in English.':'The site is in English mode.'),msgs=turns.slice(-10).concat([{role:'user',content:'PAGE CONTEXT:\n'+ctx()+'\n\nQUESTION:\n'+q}]);
fetch('https://api.anthropic.com/v1/messages',{method:'POST',signal:ctl.signal,headers:{'content-type':'application/json','x-api-key':key(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:deep?'claude-sonnet-5-5':'claude-haiku-4-5-20251001',max_tokens:1200,stream:true,system:sys,messages:msgs})}).then(function(r){if(!r.ok)return r.json().catch(function(){return{}}).then(function(j){throw{code:'http'+r.status,msg:(j.error&&j.error.message)||''}});var rd=r.body.getReader(),dec=new TextDecoder(),buf='';
function pump(){return rd.read().then(function(o){if(o.done)return;buf+=dec.decode(o.value,{stream:true});var ls=buf.split('\n');buf=ls.pop();ls.forEach(function(l){if(l.indexOf('data:')!==0)return;try{var j=JSON.parse(l.slice(5));if(j.type=='content_block_delta'&&j.delta&&j.delta.text){full+=j.delta.text;a.innerHTML=md(full);M.scrollTop=M.scrollHeight}}catch(e){}});return pump()})}
return pump()}).then(function(){if(!full){a.remove();add('e',L('No answer came back. Try rephrasing.','कोई जवाब नहीं आया। दोबारा पूछें।'))}else turns.push({role:'user',content:q},{role:'assistant',content:full})}).catch(function(e){if(e&&e.name=='AbortError'){if(full)turns.push({role:'user',content:q},{role:'assistant',content:full});else a.remove();return}
a.remove();var m=e&&e.code=='http401'?L('Your API key was rejected. Check it in ⚙.','आपकी API key अस्वीकार हो गई। ⚙ में जाँचें।'):e&&e.code=='http429'?L('Rate limit reached. Try again soon.','सीमा पूरी हो गई। थोड़ी देर बाद कोशिश करें।'):e&&e.code?L('The API returned an error ','API से त्रुटि मिली ')+e.code.replace('http','')+(e.msg?': '+e.msg:''):L('Could not reach the AI (no internet or blocked). Showing notes search instead.','AI तक नहीं पहुँच सके (इंटरनेट नहीं या ब्लॉक)। नोट्स खोज दिखा रहे हैं।');add('e',esc(m));if(!e||!e.code)localSend(q,shown)}).then(function(){setBusy(false);ctl=null})}
window.sutraAsk=function(sys,user){if(sample)return sample([{role:'user',content:sys},{role:'user',content:user}],{cache:false,modelTier:'quick'}).then(function(r){return r.text});
if(key())return fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:1800,system:sys,messages:[{role:'user',content:user}]})}).then(function(r){return r.ok?r.json():Promise.reject({code:'http'+r.status})}).then(function(j){return(j.content||[]).map(function(c){return c.text||''}).join('')});
return Promise.reject({code:'none'})};
$('#cbK').onclick=function(){var k=$('#cbk');k.classList.toggle('on');if(k.classList.contains('on'))$('#cbkv').value=key()};
$('#cbkS').onclick=function(){var v=$('#cbkv').value.trim();try{if(v)localStorage.setItem('jcbkey',v);else localStorage.removeItem('jcbkey')}catch(e){}$('#cbk').classList.remove('on');lab();add('a','<p>'+(v?L('API key saved. AI answers are on.','API key सेव हो गई। AI जवाब चालू हैं।'):L('No key entered.','कोई key नहीं डाली।'))+'</p>')};
$('#cbkR').onclick=function(){try{localStorage.removeItem('jcbkey')}catch(e){}$('#cbkv').value='';$('#cbk').classList.remove('on');lab();add('a','<p>'+L('API key removed. Back to notes search.','API key हटा दी गई। नोट्स खोज पर वापस।')+'</p>')};
S.onclick=function(){if(busy&&ctl){ctl.abort();return}send(I.value)};
I.addEventListener('keydown',function(e){if(e.key=='Enter'&&!e.shiftKey){e.preventDefault();send(I.value)}});
I.addEventListener('input',function(){I.style.height='auto';I.style.height=Math.min(110,I.scrollHeight)+'px'});
btn.onclick=openC;$('#cbC').onclick=closeC;$('#cbX').onclick=function(){if(ctl)ctl.abort();greet();setBusy(false)};
$('#cbD').onclick=function(){deep=!deep;this.classList.toggle('on',deep);this.title=deep?L('Deep thinking ON (slower)','गहरी सोच चालू (धीमी)'):L('Deeper thinking (slower)','गहरी सोच (धीमी)')};
addEventListener('keydown',function(e){if(e.key=='Escape'&&P.classList.contains('on')&&!$('#sx').classList.contains('on'))closeC()});
/* selection helper */
var sb=$('#cbsel'),selTxt='';
function chkSel(){var s=getSelection(),t=s?String(s).trim():'';if(P.classList.contains('on')||t.length<3||t.length>500){sb.style.display='none';return}var n=s.anchorNode&&(s.anchorNode.nodeType==1?s.anchorNode:s.anchorNode.parentElement);if(!n||!n.closest||!n.closest('.wrap')||n.closest('#cb,#bt,.bar,input,textarea')){sb.style.display='none';return}
var r=s.getRangeAt(0).getBoundingClientRect();selTxt=t;sb.style.display='block';sb.style.top=(scrollY+Math.max(8,r.top-44))+'px';sb.style.left=Math.max(8,Math.min(innerWidth-120,scrollX+r.left))+'px';sb.textContent='✨ '+L('Ask AI','AI से पूछें')}
document.addEventListener('mouseup',function(){setTimeout(chkSel,10)});document.addEventListener('keyup',function(e){if(e.key=='Shift')chkSel()});document.addEventListener('touchend',function(){setTimeout(chkSel,350)});
document.addEventListener('selectionchange',function(){if(!String(getSelection()).trim())sb.style.display='none'});
sb.addEventListener('mousedown',function(e){e.preventDefault()});
sb.onclick=function(){var t=selTxt;sb.style.display='none';getSelection().removeAllRanges();openC();send('Explain this clearly with a small example:\n"'+t+'"',L('Explain: ','समझाओ: ')+'"'+(t.length>140?t.slice(0,140)+'…':t)+'"')};
new MutationObserver(function(){if(P.classList.contains('on'))lab();else chips()}).observe(B,{attributes:true,attributeFilter:['class']});
greet();
(window.claude&&claude.use?claude.use('sample'):Promise.resolve(null)).then(function(f){if(f){sample=f;lab()}}).catch(function(){});
})();
;

/* ===== script (line 46944 of original) ===== */
(function(){var b=document.querySelector('.bar .brand');if(!b||b.parentElement.classList.contains('bbox'))return;
var w=document.createElement('div');w.className='bbox';b.parentNode.insertBefore(w,b);w.appendChild(b);
var v=document.createElement('small');v.className='bver';v.textContent='WebPage Vr. 2.2.6';v.title='Version 2.2.6';w.appendChild(v)})();
;

/* ===== script (line 46949 of original) ===== */
(function(){var b=document.getElementById('hrd');if(!b)return;b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>'})();
;

/* ===== script (line 46989 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},R='https://github.com/abhinavmaurya12/JavaSquadz',J=document.createElement('section');J.id='jsq';
$('.wrap').insertBefore(J,$('#home')?$('#home').nextSibling:$('.bar').nextSibling);
function L(e,h){return B.classList.contains('hi')?h:e}
function fl(n){return R+'/tree/main/'+encodeURIComponent(n).replace(/%28/g,'(').replace(/%29/g,')')}
var TOP=[
['☕','Core Java','कोर जावा','Java fundamentals, variables, data types, operators, methods and basic programming','जावा की बुनियाद: वेरिएबल, डेटा टाइप, ऑपरेटर, मेथड और बेसिक प्रोग्रामिंग','PracticeHome'],
['🔀','Control Flow','कंट्रोल फ़्लो','if-else, loops, switch, break, continue','if-else, लूप्स, switch, break, continue','loop'],
['🔢','Arrays','ऐरे','1D arrays, array operations, searching, sorting and practice problems','1D ऐरे, ऐरे ऑपरेशन, सर्चिंग, सॉर्टिंग और प्रैक्टिस प्रॉब्लम','Array'],
['🔤','Strings','स्ट्रिंग्स','String handling, StringBuilder, StringBuffer and string-based programs','स्ट्रिंग हैंडलिंग, StringBuilder, StringBuffer और स्ट्रिंग प्रोग्राम','String Handling'],
['🧩','OOP','OOP','Classes, objects, constructors, inheritance and polymorphism','क्लास, ऑब्जेक्ट, कंस्ट्रक्टर, इनहेरिटेंस और पॉलीमॉर्फिज़्म','Oops'],
['🔒','Encapsulation','एनकैप्सुलेशन','Access modifiers, getters, setters and data hiding','एक्सेस मॉडिफायर, getter, setter और डेटा हाइडिंग','Oops'],
['🎯','Abstraction','एब्स्ट्रैक्शन','Abstract classes and interfaces','एब्स्ट्रैक्ट क्लास और इंटरफेस','Oops'],
['🔼','this & super','this और super','Constructor and inheritance-based examples','कंस्ट्रक्टर और इनहेरिटेंस पर आधारित उदाहरण','This'],
['🔁','Patterns','पैटर्न','Star patterns, number patterns and nested-loop programs','स्टार पैटर्न, नंबर पैटर्न और नेस्टेड-लूप प्रोग्राम','basicPattern'],
['⚠️','Exception Handling','एक्सेप्शन हैंडलिंग','try-catch, finally, throw, throws and exception practice','try-catch, finally, throw, throws और एक्सेप्शन प्रैक्टिस','ExceptionHandling'],
['🧵','Multithreading','मल्टीथ्रेडिंग','Threads, Runnable, lifecycle, synchronization and threading programs','थ्रेड, Runnable, लाइफ़साइकिल, सिंक्रोनाइज़ेशन और थ्रेडिंग प्रोग्राम','Maltitreading'],
['📂','File Handling','फ़ाइल हैंडलिंग','Creating, reading, writing and manipulating files','फ़ाइल बनाना, पढ़ना, लिखना और बदलना','Files_handle'],
['🌊','I/O Streams','I/O स्ट्रीम','Byte streams, character streams and Java I/O','बाइट स्ट्रीम, कैरेक्टर स्ट्रीम और जावा I/O','IO_Stream'],
['🌐','Network I/O','नेटवर्क I/O','Java networking and network-based programming','जावा नेटवर्किंग और नेटवर्क आधारित प्रोग्रामिंग','Network_IO'],
['🖥️','AWT & Swing','AWT और Swing','GUI components, windows, event handling and desktop applications','GUI कॉम्पोनेंट, विंडो, इवेंट हैंडलिंग और डेस्कटॉप ऐप','Java_AWT_SWING_Code'],
['♻️','Garbage Collection','गार्बेज कलेक्शन','Object lifecycle and garbage collection concepts','ऑब्जेक्ट लाइफ़साइकिल और गार्बेज कलेक्शन कॉन्सेप्ट','GarbageCollection'],
['📦','Packages','पैकेज','Creating, organizing and using Java packages','जावा पैकेज बनाना, व्यवस्थित करना और इस्तेमाल करना','package'],
['🧰','Collections','कलेक्शन्स','Java Collections Framework and collection-based practice','जावा कलेक्शन्स फ्रेमवर्क और कलेक्शन आधारित प्रैक्टिस',null],
['🔐','Serialization','सीरियलाइज़ेशन','Object serialization and deserialization','ऑब्जेक्ट सीरियलाइज़ेशन और डीसीरियलाइज़ेशन','Serialization'],
['🔍','Reflection','रिफ्लेक्शन','Java Reflection API and runtime class/member inspection','जावा रिफ्लेक्शन API और रनटाइम पर क्लास/मेंबर की जाँच','Reflection'],
['📝','Java Q&A','जावा Q&A','Core Java questions and concept-based learning','कोर जावा प्रश्न और कॉन्सेप्ट आधारित पढ़ाई','(Oops_core_java)Que&Ans'],
['💻','UI Assignments','UI असाइनमेंट','Java GUI and practical programming assignments','जावा GUI और प्रैक्टिकल प्रोग्रामिंग असाइनमेंट','UI_Assignment'],
['🧪','Practice Programs','प्रैक्टिस प्रोग्राम','Java coding exercises and hands-on programming practice','जावा कोडिंग अभ्यास और हाथों-हाथ प्रोग्रामिंग प्रैक्टिस','PracticeHome']];
var FD=[['(Oops_core_java)Que&Ans','Core Java questions and answers for concept revision and practice.','रिवीज़न और प्रैक्टिस के लिए कोर जावा प्रश्न-उत्तर।'],['Annotation','Java annotation programs.','जावा एनोटेशन प्रोग्राम।'],['Array','Programs based on Java arrays, array operations and array practice.','जावा ऐरे, ऐरे ऑपरेशन और ऐरे प्रैक्टिस के प्रोग्राम।'],['Enum','Java enum programs.','जावा एनम प्रोग्राम।'],['ExceptionHandling','Programs demonstrating Java exception handling concepts.','जावा एक्सेप्शन हैंडलिंग के उदाहरण प्रोग्राम।'],['Files_handle','Programs for working with files in Java.','जावा में फ़ाइलों के साथ काम करने के प्रोग्राम।'],['Friday','Additional Java practice programs.','अतिरिक्त जावा प्रैक्टिस प्रोग्राम।'],['GarbageCollection','Examples and practice related to Java garbage collection.','जावा गार्बेज कलेक्शन के उदाहरण और प्रैक्टिस।'],['Generics','Java generics programs.','जावा जेनेरिक्स प्रोग्राम।'],['IO_Stream','Java input/output streams and file-based I/O programs.','जावा इनपुट/आउटपुट स्ट्रीम और फ़ाइल आधारित I/O प्रोग्राम।'],['Java_AWT_SWING_Code','Java AWT and Swing GUI programming examples.','जावा AWT और Swing GUI प्रोग्रामिंग के उदाहरण।'],['Maltitreading','Multithreading programs and thread-related concepts.','मल्टीथ्रेडिंग प्रोग्राम और थ्रेड से जुड़े कॉन्सेप्ट।'],['Network_IO','Java network and networking-related I/O programs.','जावा नेटवर्क और नेटवर्किंग से जुड़े I/O प्रोग्राम।'],['New folder','Additional programming practice and learning files.','अतिरिक्त प्रोग्रामिंग प्रैक्टिस और सीखने की फ़ाइलें।'],['Oops','Object-Oriented Programming concepts and examples.','ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग के कॉन्सेप्ट और उदाहरण।'],['PracticeHome','General Java programming practice and experiments.','सामान्य जावा प्रोग्रामिंग प्रैक्टिस और प्रयोग।'],['Reflection','Java Reflection and runtime inspection examples.','जावा रिफ्लेक्शन और रनटाइम जाँच के उदाहरण।'],['Serialization','Serialization and deserialization programs.','सीरियलाइज़ेशन और डीसीरियलाइज़ेशन प्रोग्राम।'],['String Handling','String-related Java programs and practice.','स्ट्रिंग से जुड़े जावा प्रोग्राम और प्रैक्टिस।'],['Super','Programs demonstrating the Java super keyword.','जावा super कीवर्ड दिखाने वाले प्रोग्राम।'],['Switch&Continue','Programs covering switch, break, continue and related control-flow concepts.','switch, break, continue और कंट्रोल-फ़्लो के प्रोग्राम।'],['This','Programs demonstrating the Java this keyword.','जावा this कीवर्ड दिखाने वाले प्रोग्राम।'],['Threading','Thread-related Java programming practice.','थ्रेड से जुड़ी जावा प्रोग्रामिंग प्रैक्टिस।'],['UI_Assignment','Java-based UI and GUI assignments.','जावा आधारित UI और GUI असाइनमेंट।'],['Wrapper_Classes','Java wrapper class programs.','जावा रैपर क्लास प्रोग्राम।'],['basicPattern','Basic star and number pattern programs.','बेसिक स्टार और नंबर पैटर्न प्रोग्राम।'],['loop','Loop-based programming exercises.','लूप आधारित प्रोग्रामिंग अभ्यास।'],['p1','Java programming practice files.','जावा प्रोग्रामिंग प्रैक्टिस फ़ाइलें।'],['package','Java package creation and package-related examples.','जावा पैकेज बनाने और पैकेज से जुड़े उदाहरण।']];
function render(){var A=function(u,t,c){return'<a class="'+c+'" href="'+u+'" target="_blank" rel="noopener noreferrer">'+t+'</a>'};
var h='<div class="js-hero"><div class="k">'+L('GitHub · Java programming · Core Java · OOP · DSA · Practice','GitHub · जावा प्रोग्रामिंग · कोर जावा · OOP · DSA · प्रैक्टिस')+'</div><h1>☕ JavaSquadz</h1><p>'+L('A public Java repository for learning Java through practical coding, concept implementation, problem solving and continuous practice. Learn Java by writing code, understanding concepts and solving problems.','एक पब्लिक जावा रिपॉज़िटरी जहाँ प्रैक्टिकल कोडिंग, कॉन्सेप्ट इम्प्लीमेंटेशन, प्रॉब्लम सॉल्विंग और लगातार प्रैक्टिस से जावा सीखी जाती है। कोड लिखकर, कॉन्सेप्ट समझकर और प्रॉब्लम हल करके जावा सीखें।')+'</p><div class="js-cta">'+A(R,L('Open on GitHub ↗','GitHub पर खोलें ↗'),'p')+A('https://abhinavmaurya12.github.io/javapath-react/','🚀 JavaPath ↗','s')+'</div></div>'
+'<div class="js-st"><div><b>'+TOP.length+'</b><span>'+L('Topics covered','टॉपिक कवर')+'</span></div><div><b>'+FD.length+'</b><span>'+L('Code folders','कोड फ़ोल्डर')+'</span></div><div><b>2</b><span>'+L('Quick-learn notes','क्विक-लर्न नोट्स')+'</span></div><div><b>'+L('Active','सक्रिय')+'</b><span>'+L('Actively maintained','लगातार अपडेट')+'</span></div></div>'
+'<div class="js-bar"><input id="jsf" type="search" placeholder="'+L('Filter topics and folders…','टॉपिक और फ़ोल्डर फ़िल्टर करें…')+'"></div>'
+'<div class="js-h" data-sec>📚 '+L('Topics covered','कवर किए गए टॉपिक')+'<small>'+L('Tap a topic to open its folder on GitHub','किसी टॉपिक पर टैप करके GitHub पर उसका फ़ोल्डर खोलें')+'</small></div><div class="js-g" data-sec>'
+TOP.map(function(t){var u=t[5]?fl(t[5]):R;return A(u,'<span class="e">'+t[0]+'</span><b>'+L(t[1],t[2])+'</b><p>'+L(t[3],t[4])+'</p>'+(t[5]?'<code>'+t[5]+'/</code>':'')+'<span class="go">'+L('Open on GitHub ↗','GitHub पर खोलें ↗')+'</span>','js-c')}).join('')+'</div>'
+'<div class="js-h" data-sec>📁 '+L('Main directory overview','मुख्य डायरेक्टरी ओवरव्यू')+'<small>'+L('Every code folder in the repository','रिपॉज़िटरी का हर कोड फ़ोल्डर')+'</small></div><div class="js-g" data-sec>'
+FD.map(function(f){return A(fl(f[0]),'<span class="e">📂</span><b>'+f[0].replace(/</g,'&lt;')+'</b><p>'+L(f[1],f[2])+'</p><span class="go">'+L('Open folder ↗','फ़ोल्डर खोलें ↗')+'</span>','js-c')}).join('')+'</div>'
+'<div class="js-h">📖 '+L('Learning notes','लर्निंग नोट्स')+'<small>'+L('Quick-reference text files for revision','रिवीज़न के लिए क्विक-रेफ़रेंस टेक्स्ट फ़ाइलें')+'</small></div><div class="js-g">'
+A(R+'/blob/main/JAVA%20COMPLETE%20QUICK%20LEARN.txt','<span class="e">📄</span><b>JAVA COMPLETE QUICK LEARN.txt</b><p>'+L('Java learning notes and quick-reference material.','जावा लर्निंग नोट्स और क्विक-रेफ़रेंस सामग्री।')+'</p><span class="go">'+L('Open file ↗','फ़ाइल खोलें ↗')+'</span>','js-c')+A(R+'/blob/main/Java%20Quick%20Learn.txt','<span class="e">📄</span><b>Java Quick Learn.txt</b><p>'+L('Short Java revision notes.','जावा के छोटे रिवीज़न नोट्स।')+'</p><span class="go">'+L('Open file ↗','फ़ाइल खोलें ↗')+'</span>','js-c')+'</div>'
+'<div class="js-h">▶️ '+L('Run the programs','प्रोग्राम चलाएँ')+'</div><div class="js-two"><div class="js-box"><h3>1. '+L('Clone the repository','रिपॉज़िटरी क्लोन करें')+'</h3><pre><code>git clone '+R+'.git</code></pre><h3>2. '+L('Compile a Java file','जावा फ़ाइल कम्पाइल करें')+'</h3><pre><code>javac FileName.java</code></pre><h3>3. '+L('Run the program','प्रोग्राम चलाएँ')+'</h3><pre><code>java ClassName</code></pre><p style="margin:8px 0 0;color:var(--muted);font-size:13px">'+L('Example: javac Array_home25.java then java Array_home25. A public class name must match the file name. Open the repo in IntelliJ IDEA, Eclipse, VS Code or NetBeans.','उदाहरण: javac Array_home25.java फिर java Array_home25। public क्लास का नाम फ़ाइल के नाम से मेल खाना चाहिए। रिपॉज़िटरी को IntelliJ IDEA, Eclipse, VS Code या NetBeans में खोलें।')+'</p></div>'
+'<div class="js-box"><h3>🔄 '+L('Git workflow','Git वर्कफ़्लो')+'</h3><pre><code>git pull origin main\ngit add .\ngit commit -m "Update Java practice programs"\ngit push origin main</code></pre><h3>🎯 '+L('Goals','लक्ष्य')+'</h3><ul><li>'+L('Strengthen Java fundamentals','जावा की बुनियाद मज़बूत करना')+'</li><li>'+L('Improve problem-solving skills','प्रॉब्लम-सॉल्विंग बेहतर करना')+'</li><li>'+L('Practice through real code','असली कोड से प्रैक्टिस')+'</li><li>'+L('Prepare for DSA and interviews','DSA और इंटरव्यू की तैयारी')+'</li><li>'+L('Build a base for Advanced Java','एडवांस्ड जावा की नींव बनाना')+'</li></ul></div></div>'
+'<div class="js-h">🛠️ '+L('Technologies & concepts','टेक्नोलॉजी और कॉन्सेप्ट')+'</div><div class="js-tags">'+['☕ Java','🧰 JDK','🧩 OOP','🔢 Arrays','🔤 Strings','🔁 Control Flow','🧰 Collections','🧵 Multithreading','📂 File Handling','🌊 Java I/O','🌐 Network I/O','🔐 Serialization','🔍 Reflection','♻️ Garbage Collection','📦 Packages','🖥️ AWT','🎨 Swing','IntelliJ IDEA','VS Code','Eclipse','NetBeans','Git','GitHub'].map(function(x){return'<span>'+x+'</span>'}).join('')+'</div>'
+'<div class="js-quote">'+L('Don\'t just read Java. Write Java.<br>Don\'t just memorize concepts. Implement them.<br>Don\'t just solve one problem. Learn the pattern behind it.','सिर्फ़ जावा पढ़ें नहीं, जावा लिखें।<br>सिर्फ़ कॉन्सेप्ट रटें नहीं, उन्हें लागू करें।<br>सिर्फ़ एक प्रॉब्लम हल न करें, उसके पीछे का पैटर्न सीखें।')+'</div>'
+'<div class="js-h">👨‍💻 '+L('About & connect','परिचय और संपर्क')+'</div><div class="js-two"><div class="js-box"><h3>Abhinav Maurya</h3><p style="margin:0;color:var(--muted)">'+L('Java Full Stack Developer · Java Learner · Web Developer. Focused on Java, DSA, React, web development and problem solving, learning through consistent coding.','Java Full Stack Developer · जावा लर्नर · वेब डेवलपर। जावा, DSA, React, वेब डेवलपमेंट और प्रॉब्लम सॉल्विंग पर फ़ोकस, लगातार कोडिंग से सीखना।')+'</p></div><div class="js-box"><h3>🔗 '+L('Links','लिंक')+'</h3><ul><li>'+A('https://github.com/abhinavmaurya12','🐙 GitHub','')+'</li><li>'+A(R,'☕ JavaSquadz','')+'</li><li>'+A('https://abhinavmaurya12.github.io/javapath-react/','🚀 JavaPath','')+'</li></ul><p style="margin:8px 0 0;color:var(--muted);font-size:13px">⭐ '+L('If it helps you, give the repo a star.','काम आए तो रिपॉज़िटरी को स्टार दें।')+'</p></div></div>';
var f=document.getElementById('jsf'),v=f?f.value:'';J.innerHTML=h;f=document.getElementById('jsf');if(v){f.value=v;filt()}f.oninput=filt}
function filt(){var q=document.getElementById('jsf').value.toLowerCase().trim();J.querySelectorAll('.js-g[data-sec] .js-c').forEach(function(c){c.style.display=(!q||c.textContent.toLowerCase().indexOf(q)>=0)?'':'none'})}
function openJ(){B.classList.remove('home','dr');B.classList.add('jsq');render();scrollTo(0,0);J.classList.remove('enter');void J.offsetWidth;J.classList.add('enter');setTimeout(function(){J.classList.remove('enter')},1500)}
function leaveJ(){B.classList.remove('jsq')}
var pill=document.createElement('button');pill.id='seg-jsq';pill.type='button';pill.setAttribute('aria-pressed','false');pill.textContent='☕ JavaSquadz';pill.onclick=openJ;$('.seg').appendChild(pill);
['oops','collections','threads','notes'].forEach(function(k){var e=$('#seg-'+k);e&&e.addEventListener('click',leaveJ,true)});
document.querySelectorAll('#bt button').forEach(function(b){b.addEventListener('click',leaveJ,true)});
[$('.brand'),$('#hhome')].forEach(function(e){e&&e.addEventListener('click',leaveJ,true)});
var row=document.createElement('button');row.type='button';row.className='jsqrow';row.textContent='☕ JavaSquadz · GitHub';row.onclick=openJ;$('#side').insertBefore(row,$('#side').firstChild);
var H=$('#home');function addCard(){if(!H||H.querySelector('[data-jsq]')||!H.querySelector('.hm-quick'))return;var b=document.createElement('button');b.className='hm-q';b.dataset.jsq=1;b.innerHTML='<div class="e">☕</div><b>JavaSquadz</b><span>'+L('All GitHub topics & code folders','GitHub के सभी टॉपिक और कोड फ़ोल्डर')+'</span>';H.querySelector('.hm-quick').appendChild(b)}
if(H){H.addEventListener('click',function(e){if(e.target.closest('[data-jsq]'))openJ()});new MutationObserver(function(){addCard()}).observe(H,{childList:true,subtree:true});addCard()}
new MutationObserver(function(){pill.classList.toggle('on',B.classList.contains('jsq'));pill.setAttribute('aria-pressed',B.classList.contains('jsq')?'true':'false');if(B.classList.contains('jsq'))render()}).observe(B,{attributes:true,attributeFilter:['class']});
})();
;

/* ===== script (line 47049 of original) ===== */
(function(){
var B=document.body,seg=document.querySelector('.seg'),hh=document.getElementById('hhome');if(!seg||!hh)return;
var b=document.createElement('button');b.id='seg-home';b.type='button';b.setAttribute('aria-pressed','false');b.onclick=function(){hh.click()};seg.insertBefore(b,seg.firstChild);
function sync(){var hi=B.classList.contains('hi'),h=B.classList.contains('home');b.textContent=hi?'🏠 होम':'🏠 Home';b.classList.toggle('on',h);b.setAttribute('aria-pressed',h?'true':'false')}
new MutationObserver(sync).observe(B,{attributes:true,attributeFilter:['class']});sync();
})();
;

/* ===== script (line 47060 of original) ===== */
(function(){var H=document.getElementById('home');if(!H)return;
function add(){var c=H.querySelector('.hm-cta');if(!c||c.querySelector('[data-jsq]'))return;var b=document.createElement('button');b.type='button';b.className='hm-s';b.dataset.jsq='1';b.textContent='☕ JavaSquadz';c.appendChild(b)}
new MutationObserver(add).observe(H,{childList:true,subtree:true});add()})();
;

/* ===== script (line 47123 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},K=$('#kid'),F=$('#kidf'),BB=$('#kidb');
function hi(){return B.classList.contains('hi')}function L(e,h){return hi()?h:e}
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
try{if(localStorage.getItem('jkid')==='off')B.classList.add('kidoff')}catch(e){}
var fab=$('.fab'),t=document.createElement('button');t.id='kidT';t.type='button';t.textContent='⚽';t.title='Show / hide Sutra Boy';t.setAttribute('aria-label','Toggle animated boy');fab.insertBefore(t,$('#fu'));
function badge(){t.dataset.v=B.classList.contains('kidoff')?'':(voiceOn?'1':'0');t.title=B.classList.contains('kidoff')?'Sutra Boy: hidden (tap to show)':(voiceOn?'Sutra Boy: talking (tap to mute)':'Sutra Boy: muted (tap to hide)')}
t.onclick=function(){var off=B.classList.contains('kidoff');
if(off){B.classList.remove('kidoff');voiceOn=true;try{localStorage.setItem('jkid','on');localStorage.setItem('jkidv','on')}catch(e){}last=performance.now();loop();badge();say(L('I\'m back, and now I can talk! ⚽','मैं वापस आ गया, और अब बोल भी सकता हूँ! ⚽'),3000)}
else if(voiceOn){voiceOn=false;try{localStorage.setItem('jkidv','off')}catch(e){}try{synth&&synth.cancel()}catch(e){}badge();say(L('Okay, silent mode 🔇','ठीक है, चुप मोड 🔇'),2000,true)}
else{B.classList.add('kidoff');try{localStorage.setItem('jkid','off')}catch(e){}badge()}};
badge();
var x=40,dir=1,mode='run',until=0,bt=0,last=performance.now(),scrolling=0,raf=0,idle=performance.now()+9000,W=innerWidth;
function setMode(m,ms){mode=m;K.className=m;until=performance.now()+(ms||0)}
var synth=window.speechSynthesis,voices=[],ua=false,voiceOn=true;
try{if(localStorage.getItem('jkidv')==='off')voiceOn=false}catch(e){}
function lv(){try{voices=synth.getVoices()||[]}catch(e){}}lv();if(synth)synth.onvoiceschanged=lv;
['pointerdown','keydown','touchstart'].forEach(function(n){addEventListener(n,function(){ua=true},{once:true,capture:true,passive:true})});
function pickV(h){var l=voices.filter(function(v){return h?/^hi/i.test(v.lang):/^en/i.test(v.lang)});if(!h){var i=l.filter(function(v){return/^en-IN/i.test(v.lang)});if(i.length)l=i}return l[0]||null}
function talk(txt){if(!voiceOn||!synth||!ua||document.hidden||B.classList.contains('kidoff')||B.classList.contains('rd'))return;if(synth.speaking||synth.pending)return;
var clean=txt.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'').replace(/\s+/g,' ').trim();if(!clean)return;
var h=/[\u0900-\u097F]/.test(clean),u=new SpeechSynthesisUtterance(clean),v=pickV(h);u.lang=h?'hi-IN':'en-IN';if(v){try{u.voice=v}catch(e){}u.lang=v.lang}u.pitch=1.65;u.rate=1.06;u.volume=.95;try{synth.speak(u)}catch(e){}}
function say(txt,ms,mute){BB.textContent=txt;try{flip()}catch(e){}BB.classList.add('on');clearTimeout(bt);bt=setTimeout(function(){BB.classList.remove('on')},ms||2600);if(!mute)talk(txt)}
function dirNow(){var t=getComputedStyle(F).transform,a=1;if(t&&t!=='none'){var v=parseFloat(t.split('(')[1]);if(!isNaN(v))a=v}return a<0?-1:1}
function flip(){var d=dirNow(),w=BB.offsetWidth,kl=K.getBoundingClientRect().left,bl=d>0?46:(K.offsetWidth-46-w),abs=kl+bl;abs=Math.max(6,Math.min(innerWidth-6-w,abs));BB.style.left=(abs-kl)+'px'}
function place(){}
function setP(){var max=Math.max(0,innerWidth-K.offsetWidth);K.style.setProperty('--kw',max+'px');K.style.setProperty('--kd',Math.max(6,2*max/(innerWidth<700?60:78))+'s')}
var IDLE=[['Keep going, you\'re doing great! 💪','लगे रहो, आप बढ़िया कर रहे हो! 💪'],['Code a little every day ☕','रोज़ थोड़ा कोड लिखो ☕'],['Practice makes perfect ⚽','प्रैक्टिस से ही परफ़ेक्ट बनते हैं ⚽'],['Tick topics as you learn ✅','सीखते जाओ और टिक लगाओ ✅'],['Try the Reader mode 🔊','रीडर मोड आज़माओ 🔊'],['Ask the AI tutor 💬','AI ट्यूटर से पूछो 💬']];
function loop(){}
setInterval(function(){if(B.classList.contains('kidoff')||document.hidden||RM)return;var now=performance.now();
if(mode==='run'){if(now>idle){setMode('juggle',3400);say(L('Watch this! ⚽','देखो ये! ⚽'));idle=now+11000+Math.random()*7000}}
else if(now>until&&mode!=='x'){setMode('run');if(Math.random()<.6){var m=IDLE[Math.floor(Math.random()*IDLE.length)];say(L(m[0],m[1]))}}},400);
setInterval(function(){if(BB.classList.contains('on'))flip()},80);
setP();var rz=0;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(setP,200)});addEventListener('orientationchange',function(){setTimeout(setP,300)});
function cheer(txt){if(B.classList.contains('kidoff')||RM)return;setMode('cheer',900);say(txt,2200);idle=performance.now()+9000}
addEventListener('scroll',function(){scrolling=performance.now()+400},{passive:true});
document.addEventListener('visibilitychange',function(){last=performance.now();loop()});
document.addEventListener('click',function(e){var o=e.target.closest&&e.target.closest('.ok');if(o){setTimeout(function(){var d=o.closest('.card')||o.closest('h3');if(d&&d.classList.contains('dn'))cheer(L('Nice! Topic learned 🎉','शाबाश! टॉपिक सीखा 🎉'))},140)}
if(e.target.closest&&e.target.closest('#cbBtn'))say(L('Ask away! 💬','पूछिए! 💬'),2200)},true);
window.sutraSay=say;badge();flip();place();
if(RM){setMode('juggle');x=20;place()}else{setMode('run');setTimeout(function(){say(L('Hi! I\'m Sutra Boy ⚽','नमस्ते! मैं सूत्र बॉय हूँ ⚽'),3000)},1500);loop()}
})();
;

/* ===== script (line 47180 of original) ===== */
(function(){
var B=document.body,fab=document.querySelector('.fab');if(!fab)return;
var M=[['cbBtn','💬','Ask AI','AI'],['kidT','⚽','Sutra','सूत्र'],['fu','↑','Top','ऊपर']];
M.forEach(function(m){var b=document.getElementById(m[0]);if(!b)return;b.innerHTML='<span class="fi">'+m[1]+'</span><small data-en="'+m[2]+'" data-hi="'+m[3]+'">'+m[2]+'</small>'});
function lab(){var h=B.classList.contains('hi');fab.querySelectorAll('small[data-en]').forEach(function(s){s.textContent=h?s.dataset.hi:s.dataset.en})}
new MutationObserver(lab).observe(B,{attributes:true,attributeFilter:['class']});lab();
})();
;

/* ===== script (line 47188 of original) ===== */
(function(){var ft=document.getElementById('ft');if(!ft)return;ft.addEventListener('click',function(){setTimeout(function(){try{localStorage.setItem('jtheme',document.documentElement.dataset.theme==='dark'?'dark':'light')}catch(e){}},30)})})();
;

/* ===== script (line 47213 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},P=$('#pl'),A=$('#pla'),H=$('#home');
function L(e,h){return B.classList.contains('hi')?h:e}
var kb=$('#kid .kb'),kball=$('#kid .ball');
if(kb)$('#plbi').appendChild(kb.cloneNode(true));
if(kball)$('#plball').appendChild(kball.cloneNode(true));
var BL=$('#plball'),BY=$('#plboy'),ov=$('#plov'),run=false,bx=0,by=0,vx=0,vy=0,rot=0,score=0,best=0,boyX=0,aw=300,ah=400,R=24,GR=44,last=0,raf=0;
try{best=+localStorage.getItem('jplbest')||0}catch(e){}
function lab(){$('#plT').textContent=L('Play with Sutra Boy','सूत्र बॉय के साथ खेलो');$('#plL1').textContent=L('Score','स्कोर');$('#plL2').textContent=L('Best','बेस्ट');$('#plS').textContent=score;$('#plB').textContent=best;$('#plF').textContent=L('Tap the ball to kick it up. Don\'t let it touch the grass!','गेंद पर टैप करके उसे ऊपर उछालो। उसे घास को छूने न दो!')}
function say(t){try{window.sutraSay&&window.sutraSay(t,2200)}catch(e){}}
function paint(){BL.style.transform='translate('+(bx-R)+'px,'+(by-R)+'px) rotate('+rot+'deg)';BY.style.transform='translateX('+(boyX-40)+'px)'}
function reset(){aw=A.clientWidth;ah=A.clientHeight;bx=aw/2+(Math.random()-.5)*60;by=70;vx=(Math.random()-.5)*80;vy=0;rot=0;score=0;boyX=aw/2;lab();paint()}
function showOv(msg,btn){$('#plm').innerHTML=msg;$('#plgo').textContent=btn;ov.classList.remove('off')}
function start(){reset();ov.classList.add('off');run=true;last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
function over(){run=false;var nb=score>best;if(nb){best=score;try{localStorage.setItem('jplbest',best)}catch(e){}}lab();
showOv('<div style="font-size:40px">'+(nb&&score>0?'🏆':'⚽')+'</div><div style="font-size:20px">'+L('Game over!','गेम ओवर!')+'</div><div>'+L('Score','स्कोर')+' <b>'+score+'</b> · '+L('Best','बेस्ट')+' <b>'+best+'</b></div>'+(nb&&score>0?'<div>'+L('New best! 🎉','नया बेस्ट! 🎉')+'</div>':''),L('Play again','दोबारा खेलो'));
say(nb&&score>2?L('New best score! You are a champion!','नया बेस्ट स्कोर! आप चैंपियन हो!'):L('Nice try! You scored '+score,'अच्छा खेले! आपका स्कोर '+score))}
function loop(now){if(!run)return;var dt=Math.min(.033,(now-last)/1000);last=now;aw=A.clientWidth;ah=A.clientHeight;var g=Math.min(2200,1300+score*18);vy+=g*dt;bx+=vx*dt;by+=vy*dt;rot+=vx*dt*.7;
if(bx<R){bx=R;vx=Math.abs(vx)*.8}if(bx>aw-R){bx=aw-R;vx=-Math.abs(vx)*.8}if(by<R){by=R;vy=Math.abs(vy)*.4}
boyX+=(bx-boyX)*Math.min(1,dt*6);boyX=Math.max(40,Math.min(aw-40,boyX));
if(by>ah-GR-R+6){paint();over();return}
paint();raf=requestAnimationFrame(loop)}
A.addEventListener('pointerdown',function(e){if(!run||e.target.closest('#plov'))return;var r=A.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;
if(Math.hypot(px-bx,py-by)<=R+34){vy=-(560+Math.min(score,40)*4);vx=Math.max(-380,Math.min(380,(bx-px)*7+(Math.random()-.5)*120));score++;$('#plS').textContent=score;
var j=$('#plbi');j.classList.remove('jmp');void j.offsetWidth;j.classList.add('jmp');
var f=document.createElement('div');f.className='plp';f.textContent='+1';f.style.left=(bx-8)+'px';f.style.top=(by-30)+'px';A.appendChild(f);setTimeout(function(){f.remove()},700);
if(score%5===0)say(score%10===0?L(score+' kicks! Amazing!',score+' किक! कमाल!'):L(score+' kicks! Great!',score+' किक! बढ़िया!'))}});
$('#plgo').onclick=start;
function openG(){lab();B.classList.add('playing');P.classList.add('on');reset();showOv('<div style="font-size:42px">⚽</div><div>'+L('Tap the ball to keep it in the air!','गेंद पर टैप करके उसे हवा में रखो!')+'</div>',L('Kick off ⚽','शुरू करें ⚽'));say(L('Let\'s play!','चलो खेलें!'))}
function closeG(){run=false;cancelAnimationFrame(raf);P.classList.remove('on');B.classList.remove('playing')}
$('#plX').onclick=closeG;P.addEventListener('pointerdown',function(e){if(e.target===P)closeG()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&P.classList.contains('on'))closeG()});
function addBtn(){var c=H&&H.querySelector('.hm-cta');if(!c)return;var b=c.querySelector('[data-play]');if(!b){b=document.createElement('button');b.type='button';b.className='hm-s';b.dataset.play='1';c.appendChild(b)}var tx='⚽ '+L('Play with Sutra Boy','सूत्र बॉय के साथ खेलो');if(b.textContent!==tx)b.textContent=tx}
if(H){H.addEventListener('click',function(e){if(e.target.closest('[data-play]'))openG()});new MutationObserver(addBtn).observe(H,{childList:true,subtree:true});addBtn()}
new MutationObserver(function(){addBtn();if(P.classList.contains('on')){lab()}}).observe(B,{attributes:true,attributeFilter:['class']});
})();
;

/* ===== script (line 47339 of original) ===== */
(function(){
var B=document.body,$=function(s){return document.querySelector(s)},H=$('#home'),M=$('#tlm'),BD=$('#tlb');
function L(e,h){return B.classList.contains('hi')?h:e}
var PARTS={oops:{id:'part-oops',tag:'oop',en:'OOPs',hi:'OOPs',nm:'OOPs in Java'},collections:{id:'part-collections',tag:'coll',en:'Collections',hi:'कलेक्शन्स',nm:'Collections Framework'},threads:{id:'part-threads',tag:'thread',en:'Threads',hi:'थ्रेड्स',nm:'Threads in Java'}};
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}function ld(k,d){try{return JSON.parse(localStorage.getItem(k)||'')||d}catch(e){return d}}
function say(t){try{window.sutraSay&&window.sutraSay(t,2400)}catch(e){}}
var timer=null;function openM(t){clearInterval(timer);timer=null;$('#tlt').textContent=t;M.classList.add('on');B.classList.add('playing')}
function closeM(){clearInterval(timer);timer=null;M.classList.remove('on');B.classList.remove('playing')}
$('#tlx').onclick=closeM;M.addEventListener('pointerdown',function(e){if(e.target===M)closeM()});addEventListener('keydown',function(e){if(e.key==='Escape'&&M.classList.contains('on'))closeM()});
function goSec(n,id){closeM();B.classList.remove('home','jsq');$('#seg-notes').click();setTimeout(function(){var a=$('#nav a[data-n="'+n+'"]');a&&a.click();var k=0,iv=setInterval(function(){var e=document.getElementById(id);if(e||++k>30){clearInterval(iv);if(e){e.scrollIntoView({block:'start'});e.style.outline='2px solid var(--accent)';setTimeout(function(){e.style.outline=''},2200)}}},80)},160)}
/* ---------- QUIZ ---------- */
var BANK=[
['oop','Which OOP concept hides data using private fields and public getters/setters?',['Polymorphism','Encapsulation','Inheritance','Abstraction'],1,'Encapsulation wraps data and controls access to it.'],
['oop','Method overloading is resolved at…',['Compile time','Runtime','Class-loading time','Garbage collection'],0,'Overloading is compile-time polymorphism; overriding is runtime.'],
['oop','Can a Java class extend more than one class?',['Yes','No, but it can implement many interfaces','Only abstract classes','Only final classes'],1,'Java has no multiple inheritance through classes; interfaces fill the gap.'],
['oop','Which keyword prevents a method from being overridden?',['static','abstract','final','private only'],2,'A final method cannot be overridden in a subclass.'],
['oop','What does super() do inside a constructor?',['Calls the parent constructor','Creates a new object','Calls the same class constructor','Ends the constructor'],0,'super() invokes the parent class constructor.'],
['coll','Which collection does NOT allow duplicate elements?',['ArrayList','LinkedList','HashSet','Vector'],2,'A Set stores unique elements.'],
['coll','How many null keys can a HashMap hold?',['None','One','Two','Unlimited'],1,'HashMap allows one null key (Hashtable allows none).'],
['coll','Which Map keeps keys in insertion order?',['HashMap','TreeMap','LinkedHashMap','Hashtable'],2,'LinkedHashMap maintains insertion order.'],
['coll','What is the usual time complexity of ArrayList.get(i)?',['O(n)','O(log n)','O(1)','O(n log n)'],2,'ArrayList is array-backed, so random access is O(1).'],
['coll','Which interface is used for natural ordering of objects?',['Comparator','Comparable','Iterable','Collection'],1,'Comparable defines natural order with compareTo().'],
['thread','Which method actually starts a new thread?',['run()','start()','begin()','execute()'],1,'start() creates the new call stack; run() alone runs in the current thread.'],
['thread','What is the state of a thread right after creation, before start()?',['NEW','RUNNABLE','BLOCKED','WAITING'],0,'NEW means created but not started.'],
['thread','wait(), notify() and notifyAll() belong to which class?',['Thread','Runnable','Object','System'],2,'They are methods of Object and are used inside synchronized code.'],
['thread','Calling run() directly on a Thread object…',['Starts a new thread','Runs in the current thread','Throws an exception','Does nothing'],1,'No new thread is created; the code runs in the caller thread.'],
['thread','Which keyword lets only one thread enter a block at a time?',['volatile','transient','synchronized','static'],2,'synchronized acquires the object monitor.'],
['str','String in Java is…',['Mutable','Immutable','A primitive','Always null'],1,'Strings are immutable; use StringBuilder to modify.'],
['exc','Which of these is a checked exception?',['NullPointerException','ArithmeticException','IOException','ArrayIndexOutOfBoundsException'],2,'IOException must be handled or declared.'],
['exc','The finally block runs…',['Only on error','Almost always, even after return','Never after return','Only if no exception'],1,'It runs in nearly all cases except System.exit() or a JVM crash.'],
['jvm','Where does the JVM store objects?',['Stack','Heap','Register','Method area only'],1,'Objects live on the heap; local variables and frames on the stack.'],
['jvm','What does garbage collection reclaim?',['Unreachable objects','All objects','Local variables','Class files'],0,'Objects no longer reachable from GC roots are freed.'],
['jvm','Java is platform independent because of…',['Bytecode and the JVM','The compiler only','The OS','Source code sharing'],0,'javac produces bytecode that any JVM can run.'],
['jvm','The Java Platform Module System (JPMS) was introduced in…',['Java 7','Java 8','Java 9','Java 11'],2,'Modules arrived in Java 9 with module-info.java.']];
function tagFor(n){if(n==6||n==7||n==11||n==12)return'oop';if(n==13||n==14)return'coll';if(n==17)return'thread';if(n==5)return'str';if(n==9)return'exc';if(n>=28)return'jvm';return''}
function pickBank(tag,k){var l=BANK.filter(function(q){return!tag||q[0]===tag});if(l.length<k)l=BANK.slice();l=l.slice().sort(function(){return Math.random()-.5}).slice(0,k);return l.map(function(q){return{q:q[1],o:q[2],a:q[3],w:q[4]}})}
function runQuiz(title,qs,key,note){var i=0,sc=0;openM(title);
function show(){if(i>=qs.length)return end();var q=qs[i];BD.innerHTML='<div class="tlp"><i style="width:'+(i/qs.length*100)+'%"></i></div><small style="color:var(--muted)">'+L('Question','प्रश्न')+' '+(i+1)+' / '+qs.length+(note?' · '+note:'')+'</small><div class="tlq">'+esc(q.q)+'</div><div id="tlop"></div><div id="tlfb"></div>';
q.o.forEach(function(t,k){var b=document.createElement('button');b.className='tlo';b.textContent=t;b.onclick=function(){pick(k)};$('#tlop').appendChild(b)});
function pick(k){var bs=BD.querySelectorAll('.tlo');bs.forEach(function(x,j){x.disabled=true;if(j===q.a)x.classList.add('ok');else if(j===k)x.classList.add('bad')});if(k===q.a)sc++;
$('#tlfb').innerHTML='<div class="tlw">'+(k===q.a?'✅ '+L('Correct!','सही!'):'❌ '+L('Not quite.','सही नहीं।'))+' '+esc(q.w||'')+'</div><button class="tlbtn" id="tlnx">'+(i+1>=qs.length?L('See result','नतीजा देखें'):L('Next →','अगला →'))+'</button>';$('#tlnx').onclick=function(){i++;show()}}}
function end(){var pct=Math.round(sc/qs.length*100),h=ld('jquiz',{});if(key&&(h[key]||0)<pct){h[key]=pct;sv('jquiz',h)}
BD.innerHTML='<div class="tlres"><div class="big">'+sc+' / '+qs.length+'</div><div style="font-size:18px;font-weight:700;margin:4px 0">'+(pct>=80?'🏆 '+L('Excellent!','शानदार!'):pct>=50?'👍 '+L('Good job!','अच्छा किया!'):'💪 '+L('Keep practicing!','अभ्यास जारी रखो!'))+'</div><p style="color:var(--muted)">'+L('Score','स्कोर')+' '+pct+'%</p><button class="tlbtn" id="tlag">'+L('Try again','दोबारा')+'</button><button class="tlbtn g" id="tlcl">'+L('Close','बंद करें')+'</button></div>';
$('#tlag').onclick=function(){i=0;sc=0;show()};$('#tlcl').onclick=closeM;say(pct>=80?L('Wow! You aced it!','वाह! आपने कमाल कर दिया!'):L('Nice try! Keep going!','अच्छी कोशिश! लगे रहो!'))}
show()}
function chapterText(n){var t=document.getElementById('tpl-b'+n);if(!t)return'';var out=[];t.content.querySelectorAll('h3[id],p,li').forEach(function(e){if(e.closest('pre'))return;var x=e.textContent.trim();if(x)out.push(x)});var all=out.join('\n'),len=all.length;if(len<=6000)return all;var st=Math.floor(Math.random()*(len-6000));return all.slice(st,st+6000)}
function chapQuiz(n,name){var tag=tagFor(n),title='🧠 '+L('Quiz','क्विज़')+' · '+name;openM(title);
if(!window.sutraAsk){runQuiz(title,pickBank(tag,5),'c'+n,L('General Java questions (offline)','सामान्य जावा प्रश्न (ऑफ़लाइन)'));return}
BD.innerHTML='<div class="tlsp"><i></i>'+L('Writing questions from this chapter…','इस अध्याय से प्रश्न बना रहे हैं…')+'</div>';
var sys='You write accurate Java multiple-choice quizzes. Reply with ONLY a JSON array, no markdown fences, no text before or after. Each item: {"q":"question","o":["A","B","C","D"],"a":correctIndex0to3,"w":"one-sentence explanation"}. Exactly 4 options, one correct, plausible distractors, mix easy and medium difficulty.'+(B.classList.contains('hi')?' Write in simple Hindi/Hinglish but keep Java keywords and code in English.':'');
window.sutraAsk(sys,'Create 5 multiple-choice questions based on these notes from the chapter "'+name+'":\n\n'+chapterText(n)).then(function(txt){var a=txt.indexOf('['),b=txt.lastIndexOf(']'),qs=JSON.parse(txt.slice(a,b+1)).filter(function(q){return q&&q.q&&Array.isArray(q.o)&&q.o.length===4&&q.a>=0&&q.a<4}).map(function(q){return{q:q.q,o:q.o,a:q.a,w:q.w}});if(qs.length<3)throw 0;runQuiz(title,qs.slice(0,5),'c'+n,'AI')}).catch(function(e){runQuiz(title,pickBank(tag,5),'c'+n,L('AI unavailable ('+aiWhy(e)+') · general Java questions','AI उपलब्ध नहीं ('+aiWhy(e)+') · सामान्य जावा प्रश्न'))})}
function mixQuiz(){runQuiz('🧠 '+L('Quick Java quiz','क्विक जावा क्विज़'),pickBank('',8),'mix',L('Mixed topics','मिले-जुले टॉपिक'))}
/* ---------- EXPLAINERS ---------- */
function steps(title,caps,paint,reset,extra){openM(title);BD.innerHTML=extra+'<div class="tlcap" id="tlc"></div><div><button class="tlbtn" id="tlp">▶ '+L('Play','चलाएँ')+'</button><button class="tlbtn g" id="tls">⏭ '+L('Step','अगला')+'</button><button class="tlbtn g" id="tlr">↺ '+L('Reset','रीसेट')+'</button></div>';
var i=-1;function go(k){i=k;paint(i);$('#tlc').innerHTML=caps[i]}function nx(){if(i>=caps.length-1){clearInterval(timer);timer=null;$('#tlp').textContent='▶ '+L('Play','चलाएँ');return false}go(i+1);return true}
function rs(){clearInterval(timer);i=-1;reset();$('#tlc').innerHTML=L('Press <b>Play</b> or <b>Step</b> to begin.','शुरू करने के लिए <b>चलाएँ</b> या <b>अगला</b> दबाएँ।');$('#tlp').textContent='▶ '+L('Play','चलाएँ')}
$('#tlp').onclick=function(){if(timer){clearInterval(timer);timer=null;$('#tlp').textContent='▶ '+L('Play','चलाएँ');return}if(i>=caps.length-1)rs();$('#tlp').textContent='⏸ '+L('Pause','रोकें');nx();timer=setInterval(function(){if(!nx()){timer=null}},2400)};
$('#tls').onclick=function(){clearInterval(timer);timer=null;$('#tlp').textContent='▶ '+L('Play','चलाएँ');if(i>=caps.length-1)rs();else nx()};$('#tlr').onclick=rs;rs()}
var ST={NEW:[16,118],RUNNABLE:[205,118],TERMINATED:[394,118],BLOCKED:[205,18],WAITING:[40,222],TIMED_WAITING:[370,222]};
function threadAnim(){var names=Object.keys(ST),svg='<svg class="tlsvg" viewBox="0 0 520 290">';
[['NEW','RUNNABLE','start()'],['RUNNABLE','TERMINATED','run() ends'],['RUNNABLE','BLOCKED','lock busy'],['RUNNABLE','WAITING','wait()'],['RUNNABLE','TIMED_WAITING','sleep(ms)']].forEach(function(l){var a=ST[l[0]],b=ST[l[1]];svg+='<line class="lk" x1="'+(a[0]+55)+'" y1="'+(a[1]+22)+'" x2="'+(b[0]+55)+'" y2="'+(b[1]+22)+'"/><text class="lb" x="'+((a[0]+b[0])/2+55)+'" y="'+((a[1]+b[1])/2+18)+'">'+l[2]+'</text>'});
names.forEach(function(n){var p=ST[n];svg+='<rect class="stb" data-s="'+n+'" x="'+p[0]+'" y="'+p[1]+'" width="110" height="44" rx="12"/><text x="'+(p[0]+55)+'" y="'+(p[1]+26)+'">'+n+'</text>'});
svg+='<circle id="tok" r="9" cx="0" cy="0" fill="#e8590c" stroke="#fff" stroke-width="2.5" style="transform:translate(60px,118px)"/></svg>';
var seq=['NEW','RUNNABLE','BLOCKED','RUNNABLE','WAITING','RUNNABLE','TIMED_WAITING','RUNNABLE','TERMINATED'];
var caps=[L('<code>Thread t = new Thread(task);</code> The thread object exists but has not started.','<code>Thread t = new Thread(task);</code> थ्रेड ऑब्जेक्ट बन गया है लेकिन शुरू नहीं हुआ।'),L('<code>t.start()</code> The thread is now <b>RUNNABLE</b>, ready or running under the JVM scheduler.','<code>t.start()</code> अब थ्रेड <b>RUNNABLE</b> है, JVM शेड्यूलर के तहत तैयार या चल रहा है।'),L('It reaches a <code>synchronized</code> block but another thread holds the lock, so it is <b>BLOCKED</b>.','यह <code>synchronized</code> ब्लॉक तक पहुँचा लेकिन लॉक दूसरे थ्रेड के पास है, इसलिए <b>BLOCKED</b>।'),L('The lock is released and acquired, so it is <b>RUNNABLE</b> again.','लॉक मिल गया, इसलिए यह फिर <b>RUNNABLE</b> है।'),L('<code>obj.wait()</code> The thread waits indefinitely and releases the monitor: <b>WAITING</b>.','<code>obj.wait()</code> थ्रेड अनिश्चित समय तक इंतज़ार करता है और मॉनिटर छोड़ देता है: <b>WAITING</b>।'),L('Another thread calls <code>obj.notify()</code>. It wakes up and is <b>RUNNABLE</b>.','दूसरा थ्रेड <code>obj.notify()</code> कॉल करता है। यह जागकर <b>RUNNABLE</b> हो जाता है।'),L('<code>Thread.sleep(1000)</code> Waits for a fixed time: <b>TIMED_WAITING</b>.','<code>Thread.sleep(1000)</code> तय समय तक इंतज़ार: <b>TIMED_WAITING</b>।'),L('The time is over, so it is <b>RUNNABLE</b> again.','समय पूरा हुआ, इसलिए फिर <b>RUNNABLE</b>।'),L('<code>run()</code> finished. The thread is <b>TERMINATED</b> and cannot be restarted.','<code>run()</code> खत्म हुआ। थ्रेड <b>TERMINATED</b> है और दोबारा शुरू नहीं हो सकता।')];
steps('🧵 '+L('Thread lifecycle','थ्रेड लाइफ़साइकिल'),caps,function(i){var s=seq[i],p=ST[s];$('#tok').style.transform='translate('+(p[0]+55)+'px,'+(p[1]+22)+'px)';BD.querySelectorAll('.stb').forEach(function(r){r.classList.toggle('on',r.dataset.s===s)})},function(){$('#tok').style.transform='translate(60px,118px)';BD.querySelectorAll('.stb').forEach(function(r){r.classList.remove('on')})},svg)}
function gcAnim(){var live=[1,0,1,1,0,0,1,0,1,0,0,1],hold='<div class="gcr">'+L('HEAP (objects in memory)','HEAP (मेमोरी में ऑब्जेक्ट्स)')+'</div><div class="gch" id="gch"></div>',els=[];
var caps=[L('<b>1. Allocate</b> — the program creates objects with <code>new</code>. They fill the heap.','<b>1. Allocate</b> — प्रोग्राम <code>new</code> से ऑब्जेक्ट बनाता है। वे heap भरते हैं।'),L('<b>2. Mark</b> — the GC starts from GC roots (stack variables, statics) and marks every <b>reachable</b> object green.','<b>2. Mark</b> — GC, GC roots (stack वेरिएबल, static) से शुरू करके हर <b>पहुँच-योग्य</b> ऑब्जेक्ट को हरा चिह्नित करता है।'),L('<b>3. Sweep</b> — objects that were never marked are unreachable, so their memory is reclaimed.','<b>3. Sweep</b> — जो ऑब्जेक्ट चिह्नित नहीं हुए वे unreachable हैं, उनकी मेमोरी वापस ली जाती है।'),L('<b>4. Compact</b> — survivors slide together so free memory is one big block again.','<b>4. Compact</b> — बचे हुए ऑब्जेक्ट साथ आ जाते हैं ताकि खाली मेमोरी फिर एक बड़ा ब्लॉक बने।')];
steps('♻️ '+L('Garbage collection','गार्बेज कलेक्शन'),caps,function(i){if(i===0)els.forEach(function(e,k){setTimeout(function(){e.classList.add('in')},k*70)});if(i===1)els.forEach(function(e,k){if(live[k]){e.classList.add('mk');e.textContent='✓'}});if(i===2)els.forEach(function(e,k){if(!live[k])e.classList.add('sw')});if(i===3)els.forEach(function(e,k){if(!live[k])e.classList.add('gone')})},function(){var c=$('#gch');c.innerHTML='';els=live.map(function(){var d=document.createElement('div');d.className='gco';c.appendChild(d);return d})},hold)}
/* ---------- BOOKMARKS & NOTES ---------- */
function bms(){return ld('jbm',[])}function nts(){return ld('jnotes',{})}
function chapOf(el){var a=el.closest('article.book'),m=a&&/(\d+)/.exec((a.querySelector('.eyebrow')||{}).textContent||'');return m?+m[1]:0}
function decorate(){document.querySelectorAll('article.book h3[id]:not([data-bn])').forEach(function(h){h.dataset.bn=1;var n=chapOf(h),title=h.textContent.replace(/[✓★✎]/g,'').trim(),b=document.createElement('button'),t=document.createElement('button');
b.className='bm'+(bms().some(function(x){return x.id===h.id})?' on':'');b.textContent='★';b.title=L('Bookmark','बुकमार्क');t.className='nt'+(nts()[h.id]?' on':'');t.textContent='✎';t.title=L('My note','मेरा नोट');
b.onclick=function(e){e.preventDefault();e.stopPropagation();var l=bms(),k=l.findIndex(function(x){return x.id===h.id});if(k>=0)l.splice(k,1);else l.unshift({id:h.id,n:n,t:title});sv('jbm',l);b.classList.toggle('on',k<0);lib();if(k<0)say(L('Bookmarked!','बुकमार्क हो गया!'))};
t.onclick=function(e){e.preventDefault();e.stopPropagation();noteEd(h.id,n,title,t)};h.appendChild(b);h.appendChild(t)})}
function noteEd(id,n,title,btn,p){var all=nts();openM('✎ '+L('My note','मेरा नोट'));BD.innerHTML='<div style="color:var(--muted);font-size:13px;margin-bottom:8px">'+esc(title)+'</div><textarea class="tln" id="tlta" placeholder="'+L('Write your own note for this section…','इस सेक्शन के लिए अपना नोट लिखें…')+'">'+esc((all[id]||{}).tx||'')+'</textarea><div style="margin-top:10px"><button class="tlbtn" id="tlsv">'+L('Save','सेव')+'</button><button class="tlbtn g" id="tldl">'+L('Delete','हटाएँ')+'</button></div>';
$('#tlsv').onclick=function(){var v=$('#tlta').value.trim(),a=nts();if(v)a[id]={n:n,t:title,tx:v,p:p};else delete a[id];sv('jnotes',a);if(btn)btn.classList.toggle('on',!!v);closeM();lib();if(v)say(L('Note saved!','नोट सेव हो गया!'))};
$('#tldl').onclick=function(){var a=nts();delete a[id];sv('jnotes',a);if(btn)btn.classList.remove('on');closeM();lib()};setTimeout(function(){$('#tlta').focus()},200)}
/* ---------- HOME + CHAPTER BUTTONS ---------- */
function libHtml(){var b=bms().slice(0,6),n=nts(),ids=Object.keys(n).slice(0,6);
return'<div class="lib"><div class="hm-card"><h3>★ '+L('Bookmarks','बुकमार्क')+'</h3>'+(b.length?'<ul>'+b.map(function(x){return'<li><button '+(x.p?'data-pgo':'data-go')+'="'+x.id+'" data-n="'+x.n+'" data-p="'+(x.p||'')+'">'+esc(x.t)+'</button><small>'+where(x)+'</small></li>'}).join('')+'</ul>':'<p>'+L('Tap ★ next to any topic to save it here.','किसी भी टॉपिक के पास ★ दबाकर उसे यहाँ सेव करें।')+'</p>')+'</div><div class="hm-card"><h3>✎ '+L('My notes','मेरे नोट्स')+'</h3>'+(ids.length?'<ul>'+ids.map(function(k){var x=n[k];return'<li><button '+(x.p?'data-pgo':'data-go')+'="'+k+'" data-n="'+x.n+'" data-p="'+(x.p||'')+'">'+esc(x.t)+'</button><small>'+(x.p?where(x)+' · ':'')+''+esc(x.tx.slice(0,90))+(x.tx.length>90?'…':'')+'</small></li>'}).join('')+'</ul>':'<p>'+L('Tap ✎ next to any topic to write your own note.','किसी भी टॉपिक के पास ✎ दबाकर अपना नोट लिखें।')+'</p>')+'</div></div>'}
function lib(){var l=$('#tlib');if(l)l.innerHTML=libHtml()}
function tools(){if(!H)return;wnInject();var q=H.querySelector('.hm-quick:not([data-tools])');if(!q||H.querySelector('[data-tools]'))return;var qb=ld('jquiz',{}),best=qb.mix;
q.insertAdjacentHTML('afterend','<div class="hm-h" data-tools>🧰 '+L('Study tools','स्टडी टूल्स')+'<small>'+L('Quizzes, animations, bookmarks and notes','क्विज़, एनिमेशन, बुकमार्क और नोट्स')+'</small></div><div class="hm-quick" data-tools><button class="hm-q" data-act="quiz"><div class="e">🧠</div><b>'+L('Quick quiz','क्विक क्विज़')+'</b><span>'+L('8 mixed questions','8 मिले-जुले प्रश्न')+(best?' · '+L('best','बेस्ट')+' '+best+'%':'')+'</span></button><button class="hm-q" data-act="thr"><div class="e">🧵</div><b>'+L('Thread lifecycle','थ्रेड लाइफ़साइकिल')+'</b><span>'+L('Watch the states move','स्टेट्स को चलते देखें')+'</span></button><button class="hm-q" data-act="gc"><div class="e">♻️</div><b>'+L('Garbage collection','गार्बेज कलेक्शन')+'</b><span>'+L('Mark, sweep, compact','Mark, sweep, compact')+'</span></button></div><div id="tlib" data-tools style="margin-top:14px">'+libHtml()+'</div>')}
if(H){H.addEventListener('click',function(e){var a=e.target.closest('[data-act]'),g=e.target.closest('[data-go],[data-pgo]');if(a){var k=a.dataset.act;k==='quiz'?mixQuiz():k==='thr'?threadAnim():gcAnim()}else if(g)(g.dataset.pgo?goPart(g.dataset.p,g.dataset.pgo):goSec(+g.dataset.n,g.dataset.go))});new MutationObserver(tools).observe(H,{childList:true,subtree:true});tools()}
function chapBtns(){var a=document.querySelector('article.book');if(!a||a.querySelector('.qzb'))return;var hd=a.querySelector('header,.part-head')||a.querySelector('h2');if(!hd)return;var n=+((/(\d+)/.exec((a.querySelector('.eyebrow')||{}).textContent||'')||[])[1]),name=(a.querySelector('h2')||{}).textContent||'';if(!n)return;
var w=document.createElement('div');var q=document.createElement('button');q.className='qzb';q.textContent='🧠 '+L('Quiz this chapter','इस अध्याय का क्विज़');q.onclick=function(){chapQuiz(n,name.trim())};w.appendChild(q);
if(n===17||n===30){var t=document.createElement('button');t.className='tlx';t.textContent='🧵 '+L('Thread lifecycle animation','थ्रेड लाइफ़साइकिल एनिमेशन');t.onclick=threadAnim;w.appendChild(t)}
if(n===29||n===28){var g=document.createElement('button');g.className='tlx';g.textContent='♻️ '+L('Garbage collection animation','गार्बेज कलेक्शन एनिमेशन');g.onclick=gcAnim;w.appendChild(g)}
hd.insertAdjacentElement('afterend',w)}
var pend=0;new MutationObserver(function(){if(pend)return;pend=1;setTimeout(function(){pend=0;decorate();chapBtns();partDec()},90)}).observe(B,{childList:true,subtree:true});decorate();chapBtns();
new MutationObserver(function(){var h=$('#home');if(h){h.querySelectorAll('[data-tools]').forEach(function(e){e.remove()});tools()}}).observe(B,{attributes:true,attributeFilter:['class']});

/* ---------- OOPs / COLLECTIONS / THREADS (non-notes sections) ---------- */
function where(x){if(x.p&&PARTS[x.p])return L(PARTS[x.p].en,PARTS[x.p].hi);return L('Part ','भाग ')+x.n}
function goPart(p,id){closeM();B.classList.remove('home','jsq');var sg=$('#seg-'+p);sg&&sg.click();var k=0,iv=setInterval(function(){var e=document.getElementById(id);if(e&&!e.closest('[hidden]')||++k>30){clearInterval(iv);if(e){e.scrollIntoView({block:'start'});e.style.outline='2px solid var(--accent)';setTimeout(function(){e.style.outline=''},2200)}}},80)}
function partText(p){var root=document.getElementById(PARTS[p].id);if(!root)return'';var out=[];root.querySelectorAll('section h2,section h3,section p,section li,section td,section th').forEach(function(e){if(e.closest('pre'))return;var x=e.textContent.replace(/[★✎✓]/g,'').replace(/Copy$/,'').trim();if(x)out.push(x)});var all=out.join('\n'),len=all.length;if(len<=6000)return all;var st=Math.floor(Math.random()*(len-6000));return all.slice(st,st+6000)}
function partQuiz(p){var P=PARTS[p],name=L(P.en,P.hi),title='🧠 '+L('Quiz','क्विज़')+' · '+name;openM(title);var key='p-'+p;
if(!window.sutraAsk){runQuiz(title,pickBank(P.tag,5),key,L('General Java questions (offline)','सामान्य जावा प्रश्न (ऑफ़लाइन)'));return}
BD.innerHTML='<div class="tlsp"><i></i>'+L('Writing questions from this section…','इस सेक्शन से प्रश्न बना रहे हैं…')+'</div>';
var sys='You write accurate Java multiple-choice quizzes. Reply with ONLY a JSON array, no markdown fences, no text before or after. Each item: {"q":"question","o":["A","B","C","D"],"a":correctIndex0to3,"w":"one-sentence explanation"}. Exactly 4 options, one correct, plausible distractors, mix easy and medium difficulty.'+(B.classList.contains('hi')?' Write in simple Hindi/Hinglish but keep Java keywords and code in English.':'');
window.sutraAsk(sys,'Create 5 multiple-choice questions based on these notes from the section "'+P.nm+'":\n\n'+partText(p)).then(function(txt){var a=txt.indexOf('['),b=txt.lastIndexOf(']'),qs=JSON.parse(txt.slice(a,b+1)).filter(function(q){return q&&q.q&&Array.isArray(q.o)&&q.o.length===4&&q.a>=0&&q.a<4}).map(function(q){return{q:q.q,o:q.o,a:q.a,w:q.w}});if(qs.length<3)throw 0;runQuiz(title,qs.slice(0,5),key,'AI')}).catch(function(e){runQuiz(title,pickBank(P.tag,5),key,L('AI unavailable ('+aiWhy(e)+') · general Java questions','AI उपलब्ध नहीं ('+aiWhy(e)+') · सामान्य जावा प्रश्न'))})}
function partLabels(){document.querySelectorAll('[data-pq]').forEach(function(b){var p=b.dataset.pq,best=(ld('jquiz',{}))['p-'+p];b.textContent='🧠 '+L('Quiz this section','इस सेक्शन का क्विज़')+(best?' · '+best+'%':'')});
document.querySelectorAll('[data-pthr]').forEach(function(b){b.textContent='🧵 '+L('Thread lifecycle animation','थ्रेड लाइफ़साइकिल एनिमेशन')});
document.querySelectorAll('.part:not(#part-notes) .bm').forEach(function(b){b.title=L('Bookmark','बुकमार्क')});document.querySelectorAll('.part:not(#part-notes) .nt').forEach(function(b){b.title=L('My note','मेरा नोट')})}
function partDec(){Object.keys(PARTS).forEach(function(p){var root=document.getElementById(PARTS[p].id);if(!root)return;
if(!root.querySelector('[data-pq]')){var w=document.createElement('div');w.className='partbar';var q=document.createElement('button');q.className='qzb';q.dataset.pq=p;q.onclick=function(){partQuiz(p)};w.appendChild(q);
if(p==='threads'){var t=document.createElement('button');t.className='tlx';t.dataset.pthr='1';t.onclick=threadAnim;w.appendChild(t)}
root.insertBefore(w,root.firstElementChild);partLabels()}
root.querySelectorAll('section[id] > h2:not([data-bn])').forEach(function(h){h.dataset.bn=1;var id=h.parentElement.id,title=h.textContent.trim(),b=document.createElement('button'),t=document.createElement('button');
b.className='bm'+(bms().some(function(x){return x.id===id})?' on':'');b.textContent='★';b.title=L('Bookmark','बुकमार्क');t.className='nt'+(nts()[id]?' on':'');t.textContent='✎';t.title=L('My note','मेरा नोट');
b.onclick=function(e){e.preventDefault();e.stopPropagation();var l=bms(),k=l.findIndex(function(x){return x.id===id});if(k>=0)l.splice(k,1);else l.unshift({id:id,n:0,p:p,t:title});sv('jbm',l);b.classList.toggle('on',k<0);lib();if(k<0)say(L('Bookmarked!','बुकमार्क हो गया!'))};
t.onclick=function(e){e.preventDefault();e.stopPropagation();noteEd(id,0,title,t,p)};h.appendChild(b);h.appendChild(t)})})}
new MutationObserver(function(){partLabels();lib()}).observe(B,{attributes:true,attributeFilter:['class']});
partDec();

/* ---------- WHAT'S NEW ---------- */
var WN_VER='2.2.6';
var WN=[
['▶','Run in Java Editor on every problem','हर प्रॉब्लम पर Java Editor में रन करें','Every CodeArena problem now has a Run in Java Editor button that opens your code in the Java Editor, ready to compile and run. React problems open a Java starter with the same title.','हर CodeArena प्रॉब्लम में अब Run in Java Editor बटन है, जो आपका कोड Java Editor में खोलता है, कंपाइल और रन के लिए तैयार। React प्रॉब्लम के लिए उसी नाम का Java स्टार्टर खुलता है।'],
['🌐','HTML, CSS and JS editor','HTML, CSS और JS एडिटर','HTML/CSS and JavaScript problems in CodeArena now open with HTML, CSS and JS tabs, a live preview and a console. Press Run or Ctrl+Enter. Your code is saved for each problem, and Reset brings back the starter.','CodeArena की HTML/CSS और JavaScript प्रॉब्लम में अब HTML, CSS और JS टैब, लाइव प्रीव्यू और कंसोल मिलता है। Run या Ctrl+Enter दबाएँ। आपका कोड हर प्रॉब्लम के लिए सेव रहता है, और Reset से स्टार्टर कोड लौट आता है।'],
['🧭','A steadier header','ज़्यादा स्थिर हेडर','On desktop, Java Editor and CodeArena now sit in the header menu next to JavaSquadz instead of the Home hero. The header is solid, one row and the same in every section, and its buttons no longer zoom when you click them.','डेस्कटॉप पर Java Editor और CodeArena अब Home हीरो की जगह हेडर मेन्यू में JavaSquadz के पास हैं। हेडर ठोस, एक पंक्ति का और हर सेक्शन में एक जैसा है, और बटन दबाने पर अब ज़ूम नहीं होते।'],
['⌨️','Java Editor','जावा एडिटर','Write Java in a built-in editor with File, Edit, Format, Run and Help menus, line numbers, and Save or Open. Compile and Run use a real Java compiler online, with an input box for Scanner programs. Open it from the Home page or the Editor button.','फ़ाइल, एडिट, फ़ॉर्मेट, रन और हेल्प मेन्यू, लाइन नंबर और Save/Open वाले बिल्ट-इन एडिटर में जावा लिखें। Compile और Run ऑनलाइन असली Java कंपाइलर से चलते हैं, और Scanner प्रोग्राम के लिए इनपुट बॉक्स भी है। इसे Home पेज या Editor बटन से खोलें।'],
['↕️','Resizable editor panels','साइज़ बदलने वाले एडिटर पैनल','Drag the grip bars to make the code, input and output boxes as big or small as you like. Double-click a bar to reset it. Your sizes are remembered.','ग्रिप बार को खींचकर कोड, इनपुट और आउटपुट बॉक्स को अपनी पसंद के साइज़ में करें। रीसेट के लिए बार पर डबल-क्लिक करें। आपके साइज़ याद रखे जाते हैं।'],
['📚','Steadier chapter list','स्थिर चैप्टर लिस्ट','The side list of chapters in Full Notes no longer jumps or shifts when you hover, switch chapters, or your progress counts change.','Full Notes की साइड चैप्टर लिस्ट अब होवर करने, अध्याय बदलने या प्रोग्रेस काउंट बदलने पर हिलती या खिसकती नहीं।'],
['⌘','Command palette and progress map','कमांड पैलेट और प्रोग्रेस मैप','Press Ctrl or Cmd + K anywhere to jump to a chapter, a topic or an action. Home now shows a progress map with one square per chapter once you start learning, and the hero search suggests topics as you type.','कहीं भी Ctrl या Cmd + K दबाकर किसी अध्याय, टॉपिक या एक्शन पर जाएँ। सीखना शुरू करने पर होम पर हर अध्याय का एक वर्ग वाला प्रोग्रेस मैप दिखता है, और हीरो सर्च टाइप करते ही टॉपिक सुझाती है।'],
['🎨','A more premium look','ज़्यादा प्रीमियम लुक','A soft animated glow behind every page, frosted header and bottom bar, gradient chapter titles, glowing code blocks, polished tables, a cursor spotlight on cards, counting stats and a day streak.','हर पेज के पीछे हल्की एनिमेटेड चमक, फ्रॉस्टेड हेडर और बॉटम बार, ग्रेडिएंट चैप्टर टाइटल, चमकते कोड ब्लॉक, सुंदर टेबल, कार्ड पर कर्सर स्पॉटलाइट, गिनती वाले स्टैट्स और डे स्ट्रीक।'],
['🔊','Reader on every page and a Home menu','हर पेज पर रीडर और होम मेन्यू','Listen now reads the Home and JavaSquadz pages too, not only the notes. On phones, the menu button on Home opens a real menu with links to every section, your study data and the tools.','अब Listen सिर्फ़ नोट्स ही नहीं, होम और JavaSquadz पेज भी पढ़ता है। फ़ोन पर होम का मेन्यू बटन हर सेक्शन, स्टडी डेटा और टूल्स के लिंक वाला असली मेन्यू खोलता है।'],
['🏠','A premium Home page','नया प्रीमियम होम पेज','Search from the hero, jump in with Explore Java Topics, pick a path (Core Java, Advanced Java, DSA foundations or Interview preparation), follow the beginner-to-expert roadmap, and see the chapters you opened last.','हीरो से सर्च करें, Explore Java Topics से शुरू करें, अपना रास्ता चुनें (Core Java, Advanced Java, DSA foundations या Interview preparation), beginner से expert रोडमैप देखें, और आख़िरी खोले अध्याय पाएँ।'],
['🦶','A fuller footer','पूरा फ़ूटर','Quick links to every section, shortcuts for backup, import and print, your real chapter and topic counts, and colours that follow the light and dark theme.','हर सेक्शन के क्विक लिंक, बैकअप, इम्पोर्ट और प्रिंट के शॉर्टकट, असली अध्याय और टॉपिक गिनती, और लाइट/डार्क थीम के साथ बदलते रंग।'],
['🔧','Fixes','सुधार','Closing an animation no longer scrolls the Home page, and the roadmap and path cards now fill in correctly on a fresh desktop load.','एनिमेशन बंद करने पर अब होम पेज स्क्रॉल नहीं होता, और ताज़ा डेस्कटॉप लोड पर रोडमैप और पाथ कार्ड अब सही भरते हैं।'],
['✨','A fresh, deeper look','नया, गहरा लुक','A soft animated glow behind the page, a frosted header, a moving hero gradient, and cards that light up under your cursor.','पेज के पीछे हल्की एनिमेटेड चमक, फ्रॉस्टेड हेडर, चलता हुआ hero ग्रेडिएंट, और कर्सर के नीचे चमकने वाले कार्ड।'],
['🎞','Smoother motion','और स्मूद मोशन','Sections glide in as you scroll, the numbers on top count up, buttons give a little ripple, and chapters fade in when you open them.','स्क्रॉल करने पर सेक्शन स्मूद तरीके से आते हैं, ऊपर के नंबर गिनते हुए बढ़ते हैं, बटन दबाने पर हल्की तरंग उठती है, और अध्याय खुलते समय फेड-इन होते हैं।'],
['🧑‍💻','Code windows and chapter progress','कोड विंडो और अध्याय प्रोग्रेस','Code blocks now look like little editor windows, and each chapter in the side list shows a progress bar for the topics you have learned.','कोड ब्लॉक अब छोटी एडिटर विंडो जैसे दिखते हैं, और साइड लिस्ट में हर अध्याय सीखे हुए टॉपिक की प्रोग्रेस बार दिखाता है।'],
['🗂','Backup and import','बैकअप और इम्पोर्ट','Export your bookmarks, notes, progress and best scores as a file, then import it on another device. Your AI key is never included.','अपने बुकमार्क, नोट्स, प्रोग्रेस और बेस्ट स्कोर को फ़ाइल में एक्सपोर्ट करें, फिर दूसरे डिवाइस पर इम्पोर्ट करें। आपकी AI key कभी शामिल नहीं होती।'],
['#','Search and tag your notes','नोट्स खोजें और टैग करें','Add tags like revise or important to a note, then search your notes or filter by tag on Home.','नोट में revise या important जैसे टैग जोड़ें, फिर Home पर नोट्स खोजें या टैग से फ़िल्टर करें।'],
['🖨','Print or PDF cheat sheet','प्रिंट या PDF चीट शीट','Turn your bookmarked topics and notes into a printable cheat sheet. Choose Save as PDF in the print window to make a PDF.','अपने बुकमार्क किए टॉपिक और नोट्स की प्रिंट करने योग्य चीट शीट बनाएँ। PDF के लिए प्रिंट विंडो में Save as PDF चुनें।'],
['↩','Resume where you left off','जहाँ छोड़ा था वहीं से जारी रखें','The Resume button on the Continue learning card on Home now takes you back to the exact topic you were reading in Full Notes.','Home के Continue learning कार्ड का Resume बटन अब आपको Full Notes में उसी टॉपिक पर ले जाता है जो आप पढ़ रहे थे।'],
['🕘',"What's new history",'नया क्या है का इतिहास','This list now keeps earlier versions too. The latest release is open and older ones fold away.','यह सूची अब पुराने वर्ज़न भी रखती है। नया रिलीज़ खुला रहता है और पुराने सिमटे रहते हैं।'],
['📲','Install as an app','ऐप की तरह इंस्टॉल करें','Install Java Sutra on your phone or computer. When the page is hosted with its sw.js file, it opens offline after one online visit.','Java Sutra को फ़ोन या कंप्यूटर पर इंस्टॉल करें। पेज जब sw.js फ़ाइल के साथ होस्ट हो, तो एक बार ऑनलाइन खोलने के बाद यह ऑफ़लाइन खुलता है।'],
['▶','Run and predict the output','आउटपुट चलाएँ और अनुमान लगाएँ','Code examples now have ▶ Run, which shows the real output captured by running the code on Java 21, and 🤔 Predict the output, where you guess first and then check.','कोड उदाहरणों में अब ▶ Run है, जो Java 21 पर चलाकर मिला असली आउटपुट दिखाता है, और 🤔 आउटपुट का अनुमान, जहाँ पहले आप अनुमान लगाते हैं फिर जाँचते हैं।'],
['🎬','Five more animations','पाँच और एनिमेशन','HashMap internals, ArrayList vs LinkedList, the String pool, overloading vs overriding, and try / catch / finally. Find them on Home and on the related chapters and tabs.','HashMap इंटरनल्स, ArrayList बनाम LinkedList, String pool, overloading बनाम overriding, और try / catch / finally। Home और संबंधित अध्यायों व टैब पर मिलेंगे।'],
['💡','Explain this to me','मुझे समझाओ','Tap 💡 next to a topic to get a simpler explanation or another example from the AI.','किसी टॉपिक के पास 💡 दबाकर AI से आसान व्याख्या या एक और उदाहरण पाएँ।'],
['🧠','Quizzes everywhere','हर जगह क्विज़','Quiz any Full Notes chapter, or the OOPs, Collections and Threads tabs. AI writes 5 questions from the text; offline questions are used if AI is unavailable. Home has an 8-question Quick quiz.','किसी भी Full Notes अध्याय, या OOPs, Collections और Threads टैब का क्विज़ दें। AI टेक्स्ट से 5 प्रश्न बनाता है; AI न हो तो ऑफ़लाइन प्रश्न आते हैं। Home पर 8 प्रश्नों का क्विक क्विज़ है।'],
['★','Bookmarks and notes','बुकमार्क और नोट्स','Use ★ to bookmark and ✎ to write your own note on any topic, in Full Notes and in the OOPs, Collections and Threads tabs. They show up on Home and jump you back to the spot.','किसी भी टॉपिक पर ★ से बुकमार्क और ✎ से अपना नोट बनाएँ, Full Notes और OOPs, Collections, Threads टैब में। वे Home पर दिखते हैं और सीधे उसी जगह ले जाते हैं।'],
['🧵','Animated explainers','एनिमेटेड एक्सप्लेनर','Thread lifecycle and Garbage collection animations with Play, Step and Reset. Find them in the Study tools row on Home and on the related pages.','थ्रेड लाइफ़साइकिल और गार्बेज कलेक्शन एनिमेशन, Play, Step और Reset के साथ। Home की Study tools पंक्ति और संबंधित पेजों पर मिलेंगे।'],
['🔲','Clearer ★ and ✎ buttons','साफ़ ★ और ✎ बटन','Bookmark and note buttons now have a visible border, and an amber or coloured border once used.','बुकमार्क और नोट बटन पर अब साफ़ बॉर्डर है, और इस्तेमाल के बाद एम्बर या रंगीन बॉर्डर दिखता है।'],
['🇮🇳','Hindi switch','हिंदी स्विच','All the new tools switch with the हि button. Offline quiz questions are English only.','सभी नए टूल हि बटन से बदलते हैं। ऑफ़लाइन क्विज़ प्रश्न केवल अंग्रेज़ी में हैं।']];
function wnSeen(){try{return localStorage.getItem('jwn')===WN_VER}catch(e){return true}}
function wnMark(){try{localStorage.setItem('jwn',WN_VER)}catch(e){}H&&H.querySelectorAll('.wn-dot').forEach(function(d){d.classList.add('seen')})}
function wnList(){return WN.map(function(x){return'<li><span class="e">'+x[0]+'</span><div><b>'+L(x[1],x[2])+'</b><p>'+L(x[3],x[4])+'</p></div></li>'}).join('')}
function wnOpen(){wnMark();openM('✨ '+L("What's new",'नया क्या है')+' · v'+WN_VER);BD.innerHTML='<ul class="wnl">'+wnList()+'</ul><button class="tlbtn" id="wncl">'+L('Got it','समझ गया')+'</button>';$('#wncl').onclick=closeM}
function wnInject(){if(!H||typeof WN==='undefined'||!WN)return;var cta=H.querySelector('.hm-cta');
if(cta&&!cta.querySelector('[data-wn]')){var b=document.createElement('button');b.className='hm-s';b.dataset.wn='1';b.dataset.wnx='';b.innerHTML='✨ '+L("What's new",'नया क्या है')+' <span class="wn-dot'+(wnSeen()?' seen':'')+'">NEW</span>';b.onclick=wnOpen;cta.appendChild(b)}
}
var wnHi=B.classList.contains('hi');new MutationObserver(function(){var h=B.classList.contains('hi');if(h===wnHi)return;wnHi=h;if(H){H.querySelectorAll('[data-wnx]').forEach(function(e){e.remove()});wnInject()}}).observe(B,{attributes:true,attributeFilter:['class']});
wnInject();
/* keep the hero buttons in one fixed order, whichever script adds them first */
var ctaT=0;function ctaOrder(){var c=H&&H.querySelector('.hm-cta');if(!c)return;var rank=function(e){return e.classList.contains('hm-p')?0:e.dataset.cont?0.5:e.id==='hmS'?1:e.dataset.jsq?2:e.dataset.play?3:e.dataset.wn?4:e.dataset.inst?4.5:5};
var k=[].slice.call(c.children),w=k.slice().sort(function(a,b){return rank(a)-rank(b)});if(w.some(function(e,i){return e!==k[i]}))w.forEach(function(e){c.appendChild(e)})}
if(H)new MutationObserver(function(){if(ctaT)return;ctaT=setTimeout(function(){ctaT=0;ctaOrder()},30)}).observe(H,{childList:true,subtree:true});
ctaOrder();

/* ===== v2.1.7: RUN CODE / PREDICT, MORE ANIMATIONS, EXPLAIN THIS ===== */
function aiWhy(e){var c=e&&e.code;return c==='none'?L('not connected','कनेक्ट नहीं'):c==='http401'?L('key rejected','key अस्वीकार'):c==='http429'?L('rate limit','सीमा पूरी'):c&&/^http/.test(c)?L('error ','त्रुटि ')+c.replace('http',''):L('no connection','कनेक्शन नहीं')}
function aiMsg(e){var c=e&&e.code;return c==='none'?L('The AI is not connected yet. Add your API key in the chat ⚙ box and try again.','AI अभी कनेक्ट नहीं है। चैट के ⚙ बॉक्स में अपनी API key डालकर दोबारा कोशिश करें।'):c==='http401'?L('Your API key was rejected. Check it in the chat ⚙ box.','आपकी API key अस्वीकार हो गई। चैट के ⚙ बॉक्स में जाँचें।'):c==='http429'?L('The AI rate limit was reached. Try again in a minute.','AI की सीमा पूरी हो गई। एक मिनट बाद कोशिश करें।'):c&&/^http/.test(c)?L('The AI returned an error ','AI से त्रुटि मिली ')+c.replace('http',''):L('Could not reach the AI (no internet, or the connection is blocked).','AI तक नहीं पहुँच सके (इंटरनेट नहीं या कनेक्शन ब्लॉक है)।')}
function needKey(e){var c=e&&e.code;return c==='none'||c==='http401'}
document.addEventListener('click',function(ev){var b=ev.target.closest('[data-aik]');if(b){ev.preventDefault();openAiSettings()}});
var JSO={};try{JSO=JSON.parse(document.getElementById('jsout').textContent)}catch(e){}
function nrm(t){return t.replace(/[ \t\r\n\u00a0]+/g,'')}
function fnv(t){var h=0x811c9dc5;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return('00000000'+h.toString(16)).slice(-8)}
function preCode(pre){var c=pre.querySelector('code');return((c||pre).textContent).replace(/\s+$/,'').replace(/Copy$/,'')}
function knownOut(code){var v=JSO[fnv(nrm(code))];if(v===undefined)return null;if(typeof v==='number')return{n:v};if(typeof v==='string')return{o:v,e:''};return{o:v[0],e:v[1]||'',s:v[2]==='s',c:v[2]==='c',b:v[2]==='b'}}
function fmtOut(r){var t=r.o.replace(/\s+$/,'');if(r.e)t+=(t?'\n':'')+r.e;return t||L('(no output)','(कोई आउटपुट नहीं)')}
function aiOut(code){if(!window.sutraAsk)return Promise.reject({code:'none'});var sys='You act as a Java compiler and runtime. Given a Java snippet, reply with ONLY the exact text it prints to the console, nothing else: no explanation, no markdown fences. If it would fail to compile or throws an exception, print the one error line Java would show. If the snippet is only a fragment, assume the obvious surrounding context.';
return window.sutraAsk(sys,code.slice(0,3500)).then(function(t){return String(t).replace(/^```[a-z]*\n?/i,'').replace(/```\s*$/,'').replace(/\s+$/,'')})}
function getOut(code,cb){var k=knownOut(code);
if(k&&k.n===undefined)return cb({real:true,sample:k.s,ctx:k.c,below:k.b,text:fmtOut(k)});
if(k&&k.n===0)return cb({info:L('Nothing to run yet: this snippet only defines classes or methods. A println inside them prints only when some code calls them, and this snippet has no main method or calling code.','अभी चलाने को कुछ नहीं: यह snippet सिर्फ़ classes या methods बनाता है। इनके अंदर का println तभी चलता है जब कोई code इन्हें call करे, और इस snippet में main method या call करने वाला code नहीं है।')});
if(k&&k.n===2)return cb({info:L('This example needs keyboard input, files, a network or a window, so it cannot run inside the notes.','इस उदाहरण को keyboard input, files, network या window चाहिए, इसलिए यह नोट्स के अंदर नहीं चल सकता।')});
aiOut(code).then(function(t){cb({real:false,text:t||L('(no output)','(कोई आउटपुट नहीं)')})}).catch(function(e){cb({info:L('This is a code fragment that depends on code shown elsewhere, so it cannot run on its own. ','यह एक code fragment है जो कहीं और दिखाए code पर निर्भर है, इसलिए अकेले नहीं चल सकता। ')+(e&&e.code==='none'?L('Connect the AI to get a predicted output.','AI कनेक्ट करने पर अनुमानित आउटपुट मिलेगा।'):aiMsg(e)),key:needKey(e)})})}
function outHtml(r){if(r.info||r.err)return'<div class="rtag '+(r.info?'note':'bad')+'">'+(r.info?'ℹ️ ':'')+esc(r.info||r.err)+'</div>'+(r.key?'<div style="padding:8px 10px"><button class="rbn" data-aik="1">⚙ '+L('Open AI chat settings','AI चैट सेटिंग खोलें')+'</button></div>':'');return'<div class="rtag'+(r.real?'':' ai')+'">'+(r.real?(r.below?'✔ '+L('Real output when run together with the example below it (this snippet only defines the classes)','नीचे वाले उदाहरण के साथ चलाने पर असली आउटपुट (यह snippet सिर्फ़ classes बनाता है)'):r.ctx?'✔ '+L('Real output when run together with the code block above it (these notes continue that example)','ऊपर के code ब्लॉक के साथ चलाने पर असली आउटपुट (ये नोट्स उसी उदाहरण को आगे बढ़ाते हैं)'):r.sample?'✔ '+L('Real output from one run on Java 21 · may differ between runs (threads, time or random values)','Java 21 पर एक रन का असली आउटपुट · हर रन में अलग हो सकता है (threads, समय या random values)'):'✔ '+L('Real output · run on Java 21','असली आउटपुट · Java 21 पर चलाया')):'🤖 '+L('AI-predicted · may be wrong','AI का अनुमान · गलत हो सकता है'))+'</div><div class="rout">'+esc(r.text)+'</div>'}
function runDec(){document.querySelectorAll('pre:not([data-rn])').forEach(function(pre){pre.dataset.rn=1;if(pre.closest('#tlm'))return;var code=preCode(pre);if(!/System\.(out|err)/.test(code))return;
var bar=document.createElement('div');bar.className='runbar';var run=document.createElement('button'),pr=document.createElement('button'),box=document.createElement('div');
run.className='rbn';run.dataset.rl='run';pr.className='rbn g';pr.dataset.rl='pred';box.className='runout';box.hidden=true;run.textContent='▶ '+L('Run','चलाएँ');pr.textContent='🤔 '+L('Predict the output','आउटपुट का अनुमान लगाएँ');
run.onclick=function(){if(!box.hidden){box.hidden=true;return}box.hidden=false;box.innerHTML='<div class="rtag">'+L('Running…','चल रहा है…')+'</div>';getOut(code,function(r){box.innerHTML=outHtml(r)})};
pr.onclick=function(){predict(code)};bar.appendChild(run);bar.appendChild(pr);bar.appendChild(box);pre.insertAdjacentElement('afterend',bar)})}
function predict(code){openM('🤔 '+L('Predict the output','आउटपुट का अनुमान लगाएँ'));BD.innerHTML='<pre class="tlcode" data-cp="1" data-rn="1">'+esc(code)+'</pre><textarea class="tln" id="pdg" placeholder="'+L('Type what you think it prints…','आपको क्या लगता है यह क्या प्रिंट करेगा…')+'"></textarea><div style="margin-top:10px"><button class="tlbtn" id="pdr">'+L('Reveal','दिखाएँ')+'</button></div><div id="pdo"></div>';
$('#pdr').onclick=function(){var g=$('#pdg').value;$('#pdo').innerHTML='<div class="rtag">'+L('Checking…','जाँच रहे हैं…')+'</div>';getOut(code,function(r){if(r.err||r.info){$('#pdo').innerHTML=outHtml(r);return}
var sq=function(t){return t.replace(/\s+/g,' ').trim()},ok=sq(g)&&sq(g)===sq(r.text);
$('#pdo').innerHTML='<div class="tlw">'+(ok?'✅ '+L('Exactly right!','बिल्कुल सही!'):'❌ '+L('Not quite. Compare below.','सही नहीं। नीचे मिलाएँ।'))+'</div><div class="rtag">'+L('Your answer','आपका जवाब')+'</div><div class="rout">'+esc(g||L('(empty)','(खाली)'))+'</div><div style="height:8px"></div>'+outHtml(r);if(ok)say(L('Great prediction!','शानदार अनुमान!'))})}}

/* ---------- more animated explainers ---------- */
function hmAnim(){var ex='<div class="an-hm" id="anhm">'+[0,1,2,3,4,5,6,7].map(function(i){return'<div class="an-b" data-i="'+i+'"><span class="an-i">'+i+'</span><div class="an-ch"></div></div>'}).join('')+'</div><div class="an-out" id="anout"></div>';
var caps=[L('A <b>HashMap</b> is an array of <b>buckets</b>. Each bucket can hold a chain of nodes. (We draw 8 buckets; a real one starts with 16.)','<b>HashMap</b> बकेट्स का एक array है। हर बकेट में नोड्स की चेन हो सकती है। (हम 8 बकेट दिखा रहे हैं; असली में 16 से शुरू होते हैं।)'),
L('<code>put("Ravi",1)</code> — <code>hashCode()</code> is turned into an index (<code>hash &amp; (n-1)</code>). Here it is <b>3</b>, so the node goes into bucket 3.','<code>put("Ravi",1)</code> — <code>hashCode()</code> से index बनता है (<code>hash &amp; (n-1)</code>)। यहाँ यह <b>3</b> है, इसलिए नोड बकेट 3 में जाता है।'),
L('<code>put("Mona",2)</code> — index <b>6</b>, an empty bucket, so the node is placed directly.','<code>put("Mona",2)</code> — index <b>6</b>, खाली बकेट, इसलिए नोड सीधे रख दिया जाता है।'),
L('<code>put("Amit",3)</code> — index is <b>3</b> again: a <b>collision</b>! "Amit" is linked after "Ravi" in the same bucket.','<code>put("Amit",3)</code> — index फिर <b>3</b> है: <b>collision</b>! "Amit" उसी बकेट में "Ravi" के बाद जुड़ जाता है।'),
L('<code>get("Amit")</code> — go to bucket 3, then walk the chain using <code>equals()</code>: "Ravi" no, "Amit" yes. Returns 3.','<code>get("Amit")</code> — बकेट 3 पर जाएँ, फिर <code>equals()</code> से चेन में चलें: "Ravi" नहीं, "Amit" हाँ। 3 मिलता है।'),
L('Long chains (8+ nodes in a table of 64+) become balanced trees. When size passes <b>75%</b> of capacity, the table doubles and nodes are spread again. Indexes here are illustrative.','लंबी चेन (64+ टेबल में 8+ नोड) संतुलित ट्री बन जाती हैं। साइज़ क्षमता का <b>75%</b> पार करे तो टेबल दोगुनी होती है और नोड फिर बाँटे जाते हैं। यहाँ index सिर्फ़ उदाहरण हैं।')];
function put(el,i,txt,cls){var c=el.querySelector('.an-ch');if(c.children.length){var a=document.createElement('div');a.className='an-ar';a.textContent='↓';c.appendChild(a)}var n=document.createElement('div');n.className='an-n'+(cls?' '+cls:'');n.textContent=txt;c.appendChild(n);return n}
function render(i){var bs=BD.querySelectorAll('.an-b');bs.forEach(function(b){b.classList.remove('hl','an-pulse');b.querySelector('.an-ch').innerHTML=''});$('#anout').textContent='';if(i<1)return;
put(bs[3],3,'Ravi');if(i===1)bs[3].classList.add('hl');if(i>=2){put(bs[6],6,'Mona');if(i===2)bs[6].classList.add('hl')}
if(i>=3){put(bs[3],3,'Amit');if(i===3)bs[3].classList.add('hl')}
if(i===4){bs[3].classList.add('hl');var ns=bs[3].querySelectorAll('.an-n');ns[0].classList.add('miss');ns[1].classList.add('hit');$('#anout').textContent='get("Amit") → 3'}
if(i===5)bs.forEach(function(b){b.classList.add('an-pulse')})}
steps('🗂️ '+L('HashMap internals','HashMap इंटरनल्स'),caps,render,function(){render(-1)},ex)}
function listAnim(){var ex='<div class="an-lbl">ArrayList</div><div class="an-row" id="anal"></div><div class="an-lbl">LinkedList</div><div class="an-row" id="anll"></div>';
var caps=[L('Both hold A, B, C, D. <b>ArrayList</b> is one resizable array. <b>LinkedList</b> is nodes connected by pointers.','दोनों में A, B, C, D हैं। <b>ArrayList</b> एक resizable array है। <b>LinkedList</b> पॉइंटर से जुड़े नोड्स हैं।'),
L('<code>get(2)</code> on ArrayList jumps straight to index 2 (simple address maths): <b>O(1)</b>.','ArrayList पर <code>get(2)</code> सीधे index 2 पर पहुँचता है (साधारण address गणित): <b>O(1)</b>।'),
L('<code>get(2)</code> on LinkedList starts at the head and follows <code>next</code> pointers: A, B, then C. That is <b>O(n)</b>.','LinkedList पर <code>get(2)</code> head से शुरू होकर <code>next</code> पॉइंटर फ़ॉलो करता है: A, B, फिर C। यह <b>O(n)</b> है।'),
L('<code>add(1,"X")</code> on ArrayList: B, C, D must <b>shift right</b> to make room. That is <b>O(n)</b>.','ArrayList पर <code>add(1,"X")</code>: जगह बनाने के लिए B, C, D को <b>दाएँ शिफ्ट</b> करना पड़ता है। यह <b>O(n)</b> है।'),
L('<code>add(1,"X")</code> on LinkedList: once the spot is found, just <b>re-link two pointers</b>. Nothing shifts.','LinkedList पर <code>add(1,"X")</code>: जगह मिलते ही बस <b>दो पॉइंटर री-लिंक</b> होते हैं। कुछ शिफ्ट नहीं होता।'),
L('Rule of thumb: use <b>ArrayList</b> by default (fast reads, cache-friendly). Pick LinkedList only for heavy insert/remove at the ends.','सामान्य नियम: डिफ़ॉल्ट रूप से <b>ArrayList</b> लें (तेज़ read, cache-friendly)। LinkedList सिर्फ़ सिरों पर ज़्यादा insert/remove के लिए।')];
function cell(t,c){return'<div class="an-c'+(c?' '+c:'')+'">'+t+'</div>'}
function render(i){var a=[['A'],['B'],['C'],['D']].map(function(x){return[x[0],'']}),l=a.map(function(x){return[x[0],'']});
if(i===1)a[2][1]='hit';
if(i===2){l[0][1]='walk';l[1][1]='walk';l[2][1]='hit'}
if(i>=3){}
var ah='',lh='';
if(i===3||i===5&&0){a=[['A',''],['X','new'],['B','shift'],['C','shift'],['D','shift']]}
ah=a.map(function(x){return cell(x[0],x[1])}).join('');
var ls=l;if(i===4){ls=[['A','walk'],['X','new'],['B','walk'],['C',''],['D','']]}
lh=ls.map(function(x,k){return(k?'<span class="an-a">→</span>':'')+cell(x[0],x[1])}).join('');
if(i===5){ah=[['A'],['B'],['C'],['D']].map(function(x){return cell(x[0],'')}).join('');}
$('#anal').innerHTML=ah;$('#anll').innerHTML=lh}
steps('↔️ ArrayList vs LinkedList',caps,render,function(){render(0)},ex)}
function poolAnim(){var ex='<svg class="ansv" viewBox="0 0 520 300"><defs><marker id="anah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#c2255c"/></marker></defs>'
+'<text x="70" y="18">Stack</text><rect class="bx" x="10" y="26" width="120" height="230" rx="10"/>'
+['a','b','c'].map(function(v,k){return'<rect class="bx on" x="24" y="'+(50+k*60)+'" width="92" height="34" rx="8"/><text x="70" y="'+(72+k*60)+'">'+v+'</text>'}).join('')
+'<text x="370" y="18">String pool (inside heap)</text><rect class="bx" x="230" y="26" width="280" height="110" rx="10"/><text x="370" y="148" class="lbl">'+L('Normal heap','सामान्य heap')+'</text><rect class="bx" x="230" y="154" width="280" height="102" rx="10"/>'
+'<g class="obj" id="ano1"><rect class="bx on" x="300" y="62" width="140" height="40" rx="8"/><text x="370" y="87">"java"</text></g><g class="obj" id="ano2"><rect class="bx on" x="300" y="190" width="140" height="40" rx="8"/><text x="370" y="215">"java"</text></g>'
+'<line class="pt" id="anpa" x1="116" y1="67" x2="298" y2="80" marker-end="url(#anah)"/><line class="pt" id="anpb" x1="116" y1="127" x2="298" y2="86" marker-end="url(#anah)"/><line class="pt" id="anpc2" x1="116" y1="187" x2="298" y2="208" marker-end="url(#anah)"/><line class="pt" id="anpc1" x1="116" y1="182" x2="298" y2="94" marker-end="url(#anah)"/>'
+'<text id="anres" x="260" y="286" class="lbl"></text></svg>';
var caps=[L('Three variables, one stack. The <b>String pool</b> lives inside the heap and stores literals so they can be shared.','तीन variable, एक stack। <b>String pool</b> heap के अंदर होता है और literals को शेयर करने के लिए रखता है।'),
L('<code>String a = "java";</code> — the pool has no "java" yet, so it creates one and <code>a</code> points to it.','<code>String a = "java";</code> — pool में अभी "java" नहीं है, इसलिए बनता है और <code>a</code> उसे point करता है।'),
L('<code>String b = "java";</code> — the pool already has "java", so <code>b</code> points to the <b>same object</b>. No new memory.','<code>String b = "java";</code> — pool में "java" पहले से है, इसलिए <code>b</code> <b>उसी ऑब्जेक्ट</b> को point करता है। नई मेमोरी नहीं।'),
L('<code>String c = new String("java");</code> — <code>new</code> always creates a <b>new object in the normal heap</b>, outside the pool.','<code>String c = new String("java");</code> — <code>new</code> हमेशा सामान्य heap में <b>नया ऑब्जेक्ट</b> बनाता है, pool के बाहर।'),
L('<code>==</code> compares references, <code>equals()</code> compares text. So <code>a==b</code> is true, <code>a==c</code> is false, <code>a.equals(c)</code> is true.','<code>==</code> reference मिलाता है, <code>equals()</code> टेक्स्ट। इसलिए <code>a==b</code> true, <code>a==c</code> false, <code>a.equals(c)</code> true।'),
L('<code>c = c.intern();</code> — <code>intern()</code> returns the pooled "java", so <code>c</code> now points to the pool object. The heap copy can be garbage collected.','<code>c = c.intern();</code> — <code>intern()</code> pool वाला "java" देता है, इसलिए <code>c</code> अब pool ऑब्जेक्ट को point करता है। heap की कॉपी garbage collect हो सकती है।')];
function render(i){var g=function(id,on){var e=$('#'+id);if(e)e.classList.toggle('v',on)};g('ano1',i>=1);g('ano2',i>=3&&i<5);g('anpa',i>=1);g('anpb',i>=2);g('anpc2',i>=3&&i<5);g('anpc1',i>=5);
$('#anres').textContent=i===4?'a == b → true    a == c → false    a.equals(c) → true':''}
steps('🔤 '+L('String pool','String pool'),caps,render,function(){render(-1)},ex)}
function overAnim(){var ex='<div class="an-pn"><div class="an-p" id="anp1"><h4>'+L('Overloading (compile time)','Overloading (कंपाइल टाइम)')+'</h4><span class="an-m" data-m="0">add(int, int)</span><span class="an-m" data-m="1">add(double, double)</span><span class="an-m" data-m="2">add(int, int, int)</span></div>'
+'<div class="an-p" id="anp2"><h4>'+L('Overriding (runtime)','Overriding (रनटाइम)')+'</h4><span class="an-m" data-m="3">Animal a = new Dog();</span><span class="an-m" data-m="4">Animal.sound()</span><span class="an-m" data-m="5">Dog.sound()</span></div></div><div class="an-out" id="anout"></div>';
var caps=[L('<b>Overloading</b>: same name, different parameters, same class. <b>Overriding</b>: same signature in a subclass.','<b>Overloading</b>: नाम वही, parameters अलग, एक ही class। <b>Overriding</b>: subclass में वही signature।'),
L('<code>add(2, 3)</code> — the <b>compiler</b> looks at the argument types (int, int) and picks <code>add(int, int)</code> before the program even runs.','<code>add(2, 3)</code> — <b>compiler</b> argument types (int, int) देखकर program चलने से पहले ही <code>add(int, int)</code> चुन लेता है।'),
L('<code>add(2.5, 3.5)</code> — the arguments are doubles, so the compiler picks <code>add(double, double)</code>.','<code>add(2.5, 3.5)</code> — arguments double हैं, इसलिए compiler <code>add(double, double)</code> चुनता है।'),
L('<code>a.sound()</code> — the reference type is <b>Animal</b>. At compile time Java only checks that Animal has a <code>sound()</code> method.','<code>a.sound()</code> — reference type <b>Animal</b> है। कंपाइल टाइम पर Java बस देखता है कि Animal में <code>sound()</code> है या नहीं।'),
L('At runtime the JVM checks the <b>actual object</b>: it is a Dog, so <code>Dog.sound()</code> runs. This is <b>dynamic dispatch</b>.','रनटाइम पर JVM <b>असली ऑब्जेक्ट</b> देखता है: यह Dog है, इसलिए <code>Dog.sound()</code> चलता है। इसे <b>dynamic dispatch</b> कहते हैं।'),
L('Overloading = compile-time (static) polymorphism. Overriding = runtime (dynamic) polymorphism.','Overloading = कंपाइल-टाइम (static) polymorphism। Overriding = रनटाइम (dynamic) polymorphism।')];
function render(i){BD.querySelectorAll('.an-m').forEach(function(m){m.classList.remove('on')});BD.querySelectorAll('.an-p').forEach(function(p){p.classList.remove('hl')});var on=function(n){var m=BD.querySelector('.an-m[data-m="'+n+'"]');m&&m.classList.add('on')};var out='';
if(i===1){on(0);$('#anp1').classList.add('hl');out='→ add(int, int)'}if(i===2){on(1);$('#anp1').classList.add('hl');out='→ add(double, double)'}
if(i===3){on(3);on(4);$('#anp2').classList.add('hl')}if(i===4){on(3);on(5);$('#anp2').classList.add('hl');out='Dog barks'}
if(i===5){$('#anp1').classList.add('hl');$('#anp2').classList.add('hl')}$('#anout').textContent=out}
steps('🎭 '+L('Overloading vs overriding','Overloading बनाम overriding'),caps,render,function(){render(0)},ex)}
var EXP={TRY:[20,120],CATCH:[205,20],FINALLY:[205,210],AFTER:[390,120],CALLER:[390,230]};
function excAnim(){var svg='<svg class="ansv" viewBox="0 0 520 290">';
[['TRY','CATCH','exception'],['TRY','FINALLY','no exception'],['CATCH','FINALLY',''],['FINALLY','AFTER','normal'],['FINALLY','CALLER','uncaught']].forEach(function(l){var a=EXP[l[0]],b=EXP[l[1]];svg+='<line class="lkk" x1="'+(a[0]+55)+'" y1="'+(a[1]+22)+'" x2="'+(b[0]+55)+'" y2="'+(b[1]+22)+'"/>'+(l[2]?'<text class="lbl" x="'+((a[0]+b[0])/2+55)+'" y="'+((a[1]+b[1])/2+16)+'">'+l[2]+'</text>':'')});
Object.keys(EXP).forEach(function(n){var p=EXP[n];svg+='<rect class="bx" data-s="'+n+'" x="'+p[0]+'" y="'+p[1]+'" width="110" height="44" rx="12"/><text x="'+(p[0]+55)+'" y="'+(p[1]+27)+'">'+(n==='AFTER'?'next code':n==='CALLER'?'caller':n.toLowerCase()+' {}')+'</text>'});
svg+='<circle id="antok" r="9" cx="0" cy="0" fill="#e8590c" stroke="#fff" stroke-width="2.5" style="transform:translate(75px,142px)"/></svg>';
var seq=['TRY','FINALLY','AFTER','TRY','CATCH','FINALLY','AFTER','TRY','FINALLY','CALLER'];
var caps=[L('<b>Scenario 1: no exception.</b> Execution enters the <code>try</code> block.','<b>स्थिति 1: कोई exception नहीं।</b> Execution <code>try</code> ब्लॉक में जाता है।'),
L('The try block finishes normally, so <code>catch</code> is skipped and <code>finally</code> runs.','try ब्लॉक सामान्य रूप से ख़त्म होता है, इसलिए <code>catch</code> छूट जाता है और <code>finally</code> चलता है।'),
L('After <code>finally</code>, the program continues with the next code.','<code>finally</code> के बाद program अगले code पर चलता है।'),
L('<b>Scenario 2: exception caught.</b> A line in <code>try</code> throws, say <code>ArithmeticException</code>. The rest of try is skipped.','<b>स्थिति 2: exception पकड़ा गया।</b> <code>try</code> की कोई लाइन throw करती है, जैसे <code>ArithmeticException</code>। try का बाकी हिस्सा छूट जाता है।'),
L('A matching <code>catch</code> handles it.','मेल खाता <code>catch</code> उसे संभालता है।'),
L('<code>finally</code> still runs, whatever happened before.','<code>finally</code> फिर भी चलता है, पहले जो भी हुआ हो।'),
L('Then the program continues normally.','फिर program सामान्य रूप से आगे बढ़ता है।'),
L('<b>Scenario 3: no matching catch.</b> The exception type does not match any <code>catch</code>.','<b>स्थिति 3: कोई मेल खाता catch नहीं।</b> Exception का प्रकार किसी <code>catch</code> से नहीं मिलता।'),
L('<code>finally</code> still runs first (it skips only on <code>System.exit()</code> or a JVM crash).','<code>finally</code> फिर भी पहले चलता है (यह सिर्फ़ <code>System.exit()</code> या JVM क्रैश पर छूटता है)।'),
L('Then the exception <b>propagates to the caller</b>, which must handle it or the program stops.','फिर exception <b>caller तक पहुँचता है</b>, जिसे उसे संभालना होगा वरना program रुक जाता है।')];
steps('🛡️ try / catch / finally',caps,function(i){var s=seq[i],p=EXP[s],t=$('#antok');t.style.transform='translate('+(p[0]+55)+'px,'+(p[1]+22)+'px)';t.setAttribute('fill',(i===3||i===4||i>=7)?'#e03131':'#e8590c');BD.querySelectorAll('.bx[data-s]').forEach(function(r){r.classList.toggle('on',r.dataset.s===s)})},function(){var t=$('#antok');t.style.transform='translate(75px,142px)';t.setAttribute('fill','#e8590c');BD.querySelectorAll('.bx[data-s]').forEach(function(r){r.classList.remove('on')})},svg)}
var ANS=[['hm','🗂️','HashMap internals','HashMap इंटरनल्स','Buckets and collisions','बकेट और collision',hmAnim],['ll','↔️','ArrayList vs LinkedList','ArrayList बनाम LinkedList','Shift or re-link?','शिफ्ट या री-लिंक?',listAnim],['sp','🔤','String pool','String pool','Same literal, one object','एक literal, एक ऑब्जेक्ट',poolAnim],['ov','🎭','Overloading vs overriding','Overloading बनाम overriding','Compile time or runtime?','कंपाइल टाइम या रनटाइम?',overAnim],['ex','🛡️','try / catch / finally','try / catch / finally','Follow the exception','Exception का रास्ता देखें',excAnim]];
function anById(id){for(var i=0;i<ANS.length;i++)if(ANS[i][0]===id)return ANS[i]}
function anLabel(b){var a=anById(b.dataset.an);if(a)b.textContent=a[1]+' '+L(a[2],a[3])+' '+L('animation','एनिमेशन')}
function anBtn(id){var a=anById(id),b=document.createElement('button');b.className='tlx';b.dataset.an=id;b.onclick=a[6];anLabel(b);return b}
function animHome(){if(!H)return;var tl=H.querySelector('.hm-quick[data-tools]');if(!tl)return;var sec=H.querySelector('#animsec');
if(!sec){sec=document.createElement('div');sec.id='animsec';sec.dataset.wnx='';sec.style.marginTop='14px';sec.innerHTML='<div class="hm-h">🎬 '+L('More animated explainers','और एनिमेटेड एक्सप्लेनर')+'<small>'+L('Watch how it works, step by step','स्टेप-बाय-स्टेप देखें यह कैसे काम करता है')+'</small></div><div class="hm-quick">'+ANS.map(function(a){return'<button class="hm-q" data-anh="'+a[0]+'"><div class="e">'+a[1]+'</div><b>'+L(a[2],a[3])+'</b><span>'+L(a[4],a[5])+'</span></button>'}).join('')+'</div>';
sec.addEventListener('click',function(e){var b=e.target.closest('[data-anh]');if(b)anById(b.dataset.anh)[6]()})}
if(tl.nextElementSibling!==sec)tl.insertAdjacentElement('afterend',sec)}
var CHAN={5:['sp'],6:['ov'],7:['ov'],9:['ex'],13:['hm','ll']},PARTAN={oops:['ov'],collections:['hm','ll']};
function animChap(){var a=document.querySelector('article.book');if(a&&!a.querySelector('[data-an]')){var n=+((/(\d+)/.exec((a.querySelector('.eyebrow')||{}).textContent||'')||[])[1]);var w=a.querySelector('.qzb');w=w&&w.parentElement;if(w&&CHAN[n])CHAN[n].forEach(function(id){w.appendChild(anBtn(id))})}
Object.keys(PARTAN).forEach(function(p){var bar=document.querySelector('#'+PARTS[p].id+' .partbar');if(bar&&!bar.querySelector('[data-an]'))PARTAN[p].forEach(function(id){bar.appendChild(anBtn(id))})})}
/* ---------- explain this to me ---------- */
function topicText(h){var out=[];if(h.tagName==='H2'){var c=h.parentElement.cloneNode(true);c.querySelectorAll('button,.runbar,.cpy').forEach(function(x){x.remove()});out.push(c.textContent)}else{var e=h.nextElementSibling,n=0;while(e&&!/^H[23]$/.test(e.tagName)&&n<14){var c2=e.cloneNode(true);c2.querySelectorAll('button,.runbar,.cpy').forEach(function(x){x.remove()});out.push(c2.textContent);e=e.nextElementSibling;n++}}
return out.join('\n').replace(/\n{3,}/g,'\n\n').replace(/[ \t]{2,}/g,' ').slice(0,3500)}
function md(t){t=esc(t);t=t.replace(/```[a-z]*\n?([\s\S]*?)```/g,function(m,c){return'<pre class="exco" data-cp="1" data-rn="1">'+c.trim()+'</pre>'});t=t.replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');return t.replace(/\n/g,'<br>')}
var EXC={};
function recap(h){var t=topicText(h).split('\n').map(function(x){return x.trim()}).filter(function(x){return x.length>25}),out=[],n=0;for(var i=0;i<t.length&&n<420;i++){out.push(t[i]);n+=t[i].length}return out.slice(0,4)}
function openAiSettings(){closeM();var c=$('#cbBtn');if(c)c.click();setTimeout(function(){var k=$('#cbk'),kb=$('#cbK');if(kb&&k&&!k.classList.contains('on'))kb.click()},350)}
var EXH=null;
function fail(o,e){var c=e&&e.code,msg=aiMsg(e);
var r=EXH?recap(EXH):[];var h='<div class="tlw">'+esc(msg)+'</div>';
if(needKey(e))h+='<button class="tlbtn g" id="exk">⚙ '+L('Open AI chat settings','AI चैट सेटिंग खोलें')+'</button>';
if(r.length)h+='<div class="rtag" style="margin-top:12px">📖 '+L('Meanwhile, the key points from the notes','इस बीच, नोट्स के मुख्य बिंदु')+'</div><div class="exr">'+r.map(function(x){return'<p style="margin:6px 0">'+esc(x)+'</p>'}).join('')+'</div>';
o.innerHTML=h;var kb=$('#exk');if(kb)kb.onclick=openAiSettings}
function explainOpen(h){EXH=h;var c=h.cloneNode(true);c.querySelectorAll('button').forEach(function(x){x.remove()});var title=c.textContent.trim(),text=topicText(h);openM('💡 '+L('Explain this to me','मुझे समझाओ'));
BD.innerHTML='<div class="exh">'+esc(title)+'</div><div><button class="tlbtn" data-m="simple">🧒 '+L('Explain simply','आसान भाषा में समझाओ')+'</button><button class="tlbtn g" data-m="example">🧪 '+L('Another example','एक और उदाहरण')+'</button></div><div id="exo" class="exo"></div>';
function ask(mode){var key=title+'|'+mode+'|'+(B.classList.contains('hi')?'hi':'en'),o=$('#exo');if(EXC[key]){o.innerHTML=EXC[key];return}
o.innerHTML='<div class="tlsp"><i></i>'+L('Thinking…','सोच रहे हैं…')+'</div>';
var sys='You are a friendly Java tutor helping a beginner prepare for interviews. Keep the answer under 170 words. Use plain language and, when it helps, one real-world analogy. Include at most one small Java code block in a fenced block. No headings, no preamble.'+(B.classList.contains('hi')?' Answer in simple Hinglish (Hindi in Roman or Devanagari mix) but keep Java terms and code in English.':''),
usr=(mode==='simple'?'Explain this topic in much simpler words, as if to someone new to programming.':'Give ONE new short, runnable Java example for this topic that is different from the notes. Show its output in a comment, then explain it in 2 or 3 lines.')+'\n\nTopic: '+title+'\n\nNotes:\n'+text;
if(!window.sutraAsk){fail(o,{code:'none'});return}
window.sutraAsk(sys,usr).then(function(t){var html='<div class="rtag ai">🤖 '+L('AI explanation · may contain mistakes','AI की व्याख्या · गलतियाँ हो सकती हैं')+'</div><div class="exr">'+md(String(t))+'</div>';EXC[key]=html;o.innerHTML=html}).catch(function(e){fail(o,e)})}
BD.querySelectorAll('[data-m]').forEach(function(b){b.onclick=function(){ask(b.dataset.m)}})}
function exDec(){document.querySelectorAll('article.book h3[id] .bm, .part:not(#part-notes) section[id] > h2 .bm').forEach(function(bm){var h=bm.parentElement;if(h.querySelector('.ex'))return;var x=document.createElement('button');x.className='ex';x.textContent='💡';x.title=L('Explain this to me','मुझे समझाओ');x.onclick=function(e){e.preventDefault();e.stopPropagation();explainOpen(h)};h.appendChild(x)})}
function placeLib(){if(!H)return;var tl=H.querySelector('#tlib'),row=H.querySelector('.hm-row');if(!tl||!row)return;if(tl.nextElementSibling!==row){tl.style.margin='14px 0';row.parentNode.insertBefore(tl,row)}}
function v217(){runDec();animChap();animHome();exDec();placeLib()}
var v217t=0;new MutationObserver(function(){if(v217t)return;v217t=setTimeout(function(){v217t=0;v217()},120)}).observe(B,{childList:true,subtree:true});
var hi217=B.classList.contains('hi');new MutationObserver(function(){var h=B.classList.contains('hi');if(h===hi217)return;hi217=h;document.querySelectorAll('[data-an]').forEach(anLabel);document.querySelectorAll('.runbar .rbn').forEach(function(b){b.textContent=b.dataset.rl==='run'?'▶ '+L('Run','चलाएँ'):'🤔 '+L('Predict the output','आउटपुट का अनुमान लगाएँ')});document.querySelectorAll('.ex').forEach(function(b){b.title=L('Explain this to me','मुझे समझाओ')});document.querySelectorAll('.qzb:not([data-pq])').forEach(function(b){b.textContent='🧠 '+L('Quiz this chapter','इस अध्याय का क्विज़')})}).observe(B,{attributes:true,attributeFilter:['class']});
v217();


/* ===== v2.1.8: CONTINUE WHERE YOU LEFT OFF, WHAT'S NEW HISTORY, INSTALL AS APP ===== */
var POS=ld('jpos',null),trT=0;
function actPart(){var ps=document.querySelectorAll('.part');for(var i=0;i<ps.length;i++)if(!ps[i].hidden&&ps[i].offsetParent!==null)return ps[i];return null}
function hText(h){var c=h.cloneNode(true);c.querySelectorAll('button').forEach(function(x){x.remove()});return c.textContent.trim()}
function track(){if(!H||B.classList.contains('home')||M.classList.contains('on'))return;var p=actPart();if(!p)return;var notes=p.id==='part-notes',hs=p.querySelectorAll(notes?'article.book h3[id]':'section[id] > h2'),cur=null;
for(var i=0;i<hs.length;i++){if(hs[i].getBoundingClientRect().top<=Math.max(150,innerHeight*.35))cur=hs[i];else break}
var o;if(notes){var a=p.querySelector('article.book .eyebrow'),m=a&&/(\d+)/.exec(a.textContent);if(!m)return;var h1=p.querySelector('article.book h1');o={p:'notes',n:+m[1],id:cur?cur.id:'',t:cur?hText(cur):(h1?h1.textContent:'')}}
else{var k=p.id.replace('part-','');if(!PARTS[k])return;o={p:k,n:0,id:cur?(cur.closest('section[id]')||{}).id||'':'',t:cur?hText(cur):L(PARTS[k].en,PARTS[k].hi)}}
o.t=(o.t||'').replace(/\s+/g,' ').trim().slice(0,70);
if(!POS||POS.p!==o.p||POS.n!==o.n||POS.id!==o.id){POS=o;sv('jpos',o);contInject()}}
function contLabel(){return'↩ '+L('Continue','जारी रखें')+(POS&&POS.t?' · '+(POS.t.length>26?POS.t.slice(0,25)+'…':POS.t):'')}
function contInject(){}
function goPos(){if(!POS)return;if(POS.p==='notes')goSec(POS.n,POS.id||'_none');else goPart(POS.p,POS.id||'_none')}
if(H)H.addEventListener('click',function(e){var b=e.target.closest('.hm-btn[data-ch]');if(b&&POS&&POS.p==='notes'&&POS.id&&+b.dataset.ch===POS.n){e.stopPropagation();e.preventDefault();goPos()}},true);
window.addEventListener('scroll',function(){if(!trT)trT=setTimeout(function(){trT=0;track()},500)},{passive:true});
document.addEventListener('visibilitychange',track);window.addEventListener('pagehide',track);
/* ---------- what's new history ---------- */
function wnItems(a){return'<ul class="wnl">'+a.map(function(x){return'<li><span class="e">'+x[0]+'</span><div><b>'+L(x[1],x[2])+'</b><p>'+L(x[3],x[4])+'</p></div></li>'}).join('')+'</ul>'}
function wnOpen(){wnMark();openM('✨ '+L("What's new",'नया क्या है'));var rel=[['2.2.6',WN.slice(0,3)],['2.2.5',WN.slice(3,6)],['2.2.4',WN.slice(6,9)],['2.2.3',WN.slice(9,12)],['2.2.0',WN.slice(12,15)],['2.1.9',WN.slice(15,18)],['2.1.8',WN.slice(18,21)],['2.1.7',WN.slice(21,24)],['2.1.'+'6',WN.slice(24)]];
BD.innerHTML=rel.map(function(r,i){return i===0?'<div class="wnv">v'+r[0]+' · '+L('Latest','नया')+'</div>'+wnItems(r[1]):'<details class="wnd"><summary>v'+r[0]+'</summary>'+wnItems(r[1])+'</details>'}).join('')+'<button class="tlbtn" id="wncl">'+L('Got it','समझ गया')+'</button>';$('#wncl').onclick=closeM}
/* ---------- install as app / offline ---------- */
/* Put the public link of your hosted Java Sutra site here (for example your GitHub Pages link). People who open the downloaded file get a button that takes them there to install. */
var APP_URL='';
var SWV='jsutra-v2.2.6',OFFST='unknown',DEFP=null,ICON192='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAAPrElEQVR42u3de3BU1RkA8O/cfWR3A5tsXsS8hDwwRNSAgAYQFUSUjgqO7ahjS6ut9Q+1jo7UTutYH3V0pjpjp6PUF51qlbHVQYSCbxCNhAjEEEgghDxIyHuTbLKvu4/TP/Z1NwT2nsNuyNl8568I692bsz/unsd3vo/03DWDUgAAAAIUAEjwvygJ/CGN/AxAA39LAEDx4uD/CAA09EPgDxUvJgBAg68Mvzh02eCLieI2wi8Ovib0YqK4jXE3GXnryG2Mv8lxv9GENxn1G4Wuhv0zcf9I2Duo53z6R8LeQT38/QMgYe+gHm49AETC3kE93HooEAl7B/Vw6wEACXsH9XDrocFBNPYO6uHSA4RI2Duoh1tPZBqPvYN6OPQEp/HYO6iHTw8AkbB3UA+3HgqRMRDqQT3MeoAEx0CoB/Xw6AmMgVAP6uHUE9jKQD2oh1NPaBCNelAPl57QbjzqQT1cekILiagH9XDpoSQqnAP1oB42PaAI50A9qIdZDw2Fc6Ae1MOjJ/gEQj2oh09PJKQV9aAeDj2UEAn1oB5uPRDYykA9qIdPDwUioR7Uw60nNIhGPaiHS09oNx71oB4uPZFpPOpBPRx6AqcyUA/q4dRDo8M5UA/qYdMDinAO1IN6mPVEnUxFPaiHVQ+ET2WgHtTDoSewlYF6UA+nHgCQUA/q4dYT3o1HPaiHRw+N5EhEPaiHXU9kGo96UA+HnuATCPWgHj49QIiEelAPt57wGAj1oB4ePRAdzoF6UA+bHmU4B+pBPcx6AgmmUA/q4dQDhEioB/Vw64kKaUU9qIdVj/JkKupBPcx6aHgvDPWgHg49wfxAqAf18OlRhnOgHtTDrCeSYAr1oB4OPQBEi3qY9UjEVDon9bJLjCWFxtkFuiyLLjNdMhokvQ4k4nfJfpfb75L9btkzOCL3WeWeQXefVe6xOls6ne3d1OtPGj0UQCu0HtBorti7G9S15gc3jtYc5NdDSNrSKzNvWmG57irNzNSzvYvGZNCYDIGfjXPyx/0t9fqcbacdzZ2O5o7RQ82jP57wOlzi6gk8gQR+9hAgoL5xP3tAyrplZd6vf2a4OB/OrxGtxlRaaCothJurAID6/PZjHaOHjvdt3Tta3yKcHgpEK/43F9snyKrHMLuo+C+PplaUQQIa0UgzKmbPqJjtc7ht9S3C6QFCtEkw7kmcHsvqFcXPPCIZUmAymnh6AEA7bfQAq56sdWvmPPkQSAQmpwmoJ3IyVeQ5l/pPiEGPuerK2U8+iHrOrUdZbEXoGTvzN8W59WjM5uLnHiWSBJPdBNMTzs6BeqJm7AUPb9BlpKOemHogXC9M4NVCxm+KmHr0uVnZt92AetTooYRoRV9rZvQTe60569bVRKtVe0G/31bTMLLvsP1Ym6uz3zM44nfLftlL9HqN0aDLTNPnZBhn5xmL82bML0ktL5L0urMvUYmnJ7iQKPhORTz1AJCM1ctUXnDw0+r2l99xd/af2T/UKfudssc66jjeOfRtfeBdiFaXtrg8/ZorMlZUmkrzJ7w9sfQEp/Hi6iHMw6AYerRpM02lF6u5UPe/Pml78Z9M/UM93qHqhqHqI60vvJdyUVbWTUty77jOVJYfWaMSTQ8FohV+lzR+egDAVF4CJPZl5Z6B9r++cz794+4e7Nq8q3PzLnNl2aw7VnjHnCLqASDaJNhjZ9oLO3eERkpBrqovr8/2UZ8/LhEaI3UtI3UtguqJ1MpIfj2gKr5H5ezd3T2QrPE9THogfCpD4Pie+OkBAMlgUHMpyWRAPeGtjCSIDmPdLjhrBAv1etVcKX1ZJeoJbmVMFz0TbKlOsIvsHR5VcwXzwvKc21eiHkWxFZEjU+OlB4B4hmwqr1P6zAOzf79Bm2aeznpCIa2oJ3STzpZTaq8lkbwNP8m980brl7WDX9QOVTd4h8emmx4goWm8+FHxcdADFOzH2r1DNq3FrFZRii5r7dKstUuBUmdr9+iPJ8aOtI42nBxr6vA75KTXQwOnMsTVw74dHyt6jtKR/Ycz1yxjvzAxFucZi/Ny1q8AAOrzO1pOjx1pHas/OXKo2X6sy+/zJ58eANBOh2ePWj0AAKTnvZ08gMa9k0ZKnVuQOrdg1vprAMBndw3XNFr3Ngx8cdDdN5I0eqgyuYKo57nYBkGxo+dsBxpttUfiG6uhSTVkrlxQ9tTPq755ufLdJ3LXLSMp+iTQE5VoXNDTgMyBoyrin9pe3Ox3exIT9kPSF8+d9+J9S79+sei+NZJeJ7QeIKFE44KfJWV7CMWMYLE3trU89VpC48f0mebSx++o2vmsZek8cfUEEkyhngnW4vs/2dvxyvuJDkM05GcufOt3JY/cpqj8J5IeCN630OfYE6An8Bad//io+Ym/+5zuBMeykjkP3Dx34+0i6qHhemFCZ0Fg+riY4p/6tn1Tt+7xob11iX4UXfzLVXnrrhZOD0SKraCes6yHuTp6j97/QsOGZ4erDyfUUMXTdxnzMsTSExwDiZ2BhWkKxhs9N1xzpOHe5w+sfazz9W2uzv5EAJL02jn33yiWnuBWhrh6CGc4B2cEi7Olu+2lLa0vbTGVFVqWXZ62uNy8oEyXaY6Xofz1Vze/+qm7zyaKHgjGRIuf/YlhJToe8U+O452O411dm3cCEENRzswFZebKUnNlaWp5IdFo+B9COk3OiopTH9aIoocqkyskux5ISOwlgLOj39Ex0Pvx9xSIZExJqyxNu6o8Y/l88+VzOAxlLCnr+HC/KHpC58Kmix5IdN5Cv8tj3ddo3dd08pWPDXmZueuqCu5ZqWf5jstYVCKQHqoo+y2kHrZwDkisnnGfnLPb2vra/6pX/bHz/T3qbzIl20wDccYi6IFQ2e/k1wOTqye8rOx1yU1Pv9/1n2/Vb+PrZhhF0UMBpGTIuMs4EZv8EznNf92qfndWa0kVRY+yVgbqSWBcs2xzDB86qfYhJBFR9ITDOQTO9s28En2BznO5uodU3qXP5RVFD4XxJ1MF08O8jhhLj3amqeK1jalzC+MeFa9JNai8T3nEKYoeCCUaF1UPYR1Ex3z2AMm4fkHGtZV92787tWmb48TpuOihhMwsV5VjWh6y+1weUfRQEgiqF75OBVM8YoxvLgAAieTcujznlmWDXx3qenvncG3TeerJWl5hKspWc49jJ/sE0gNAtNNFD6gf90QidTJXLcxctdBxouv0lq/7dtTIg6McekyFWfOfu1vl/VnrTwmkJ5KhTNwaOczzsJij5jOaqTS/9E/3lPzh7uH9TQOfH7R+d9TR1qtGD2g1+bcuuWTjel2aSeUd9u87IZCe0F6Y0BWWuEJazznnOusSn6WqwlJVAQDuniHb4dbRox32Ez2ubqurd9hrd/vcHkmnk4x6wyxLanFu+qLSnFWXG2alq787edjRX3NSID2RBFOC6mGchqmfscfacMi1ZOdaslcvjG9IUPt/91OfXyA9wQRT4ld3Y5uInaeeBDWv3d3yTrVYeiC0lYF6gDPxdPxa498+c1vtYumJ1MoQVA9T9FYkq2GMteYL0Hp2N7VuqRFODyhPZYhYl1Sakar+Q/K5ZDU7FZOvx1rXceCJD/x+EE7PuETj4lW11VkYYrWC++Eq9rkm9dnz9dEfNn7gdXlF1HPmyVTBaiKnzitW/1F5rLaYerxjzsbHNvXvqvXZXYmm4xlz1T+/rebhf4urB0gw0bioFbXNiy5VPQDyyf0jsffY/dC7vaZ3+36i11qqLs26YUHmistSci1xpjPqav/oh+a39shDDhHHPdEJpoTVo5lhylq7XOVn5ursBz9Vv8dOZd/AnsMD3zRQAMNFmWkLS9MWlKQtKJlZXkA0nHXEvA554Pvm7q+Odn1+xOeUhZuxT/QWRCuoHqBQ8MBPJaPaaqZjDa3cERqu7iHnjtqeHT9QQiS9zlCYZSrKMRVmG4uyjYWZ+oyZGlOK1pSiMeo1phSikajX55e9nlGXbB1z9dvsHYNjrf3DRzpHmnoopWLtVJxbTzjJpnh6Mm9cmrfhFvX/+m11zXGJ7/HJXntLr72lT8Rz7HHXE9jKEEyPpNNd9Kvbih68E1hSJFp3102HnKmTrCc0iJ7yeoher0s3G4vz0xbPz153vT4ng2nwYW/qcLX3op6461GeTJ2KetKuvmLeG38+/1nP6Xc/Qz2J0BNK75IM+1xnj5HoG+rbVo16EqGHhk9lTNFxTzwAtb30gd8lo55E6AmeC5vqc67z2WbaXde79VvUkyA9E5xMTSY9ro7e4xs3hX8L1BN3PUCiT6ZOwfUe7ubuGqj/xfOeYTvqSZyeqJqpU1IP50PIdvB440OvyP021JNQPcFiK1NWD8cDyO+SO17d2vnmDur1o55E64HAVsYU1kOY6PR8uKfzje3u04M4ap4cPTR0sHCq6qGq3IwcODawq2ZgZ43X5sT1nsnUAyT0FTb19VCvzy97/E63PDji6R92nepznOgaa2wfrW/xy17c57ogeigAOXTVtVNYD1a1ndJ6IgmmUA/q4dATTDCFelAPnx6qqDKEelAPsx4I1spAPaiHSw8lipOpqAf1sOoBRaJx1IN6mPUEz8ajHtTDpwcAJNSDerj1RJX9Rj2oh1UPDZf9Rj2oh0NPZBqPelAPh57QIBr1oB4uPQBEQj2oh1tPKMUd6kE9XHoCYyDUg3o49UROZaAe1MOhh4bCOVAP6uHRE6gbL6SelcfehKRrmxdtEksPBSC1C9eIpef6Y29BUre3F78uih5lzVRxvrmSvwmjh5LQXhh+c02ddm/tb0TRA9HhHAKMmmF6NFH0KMM5RJlzTZMmhh4aXfZbgBn7l+W/TXo7by55WxQ9oCj7LdB6z/QYRIughwKQ/ZVrRVwtXN34Kj57LrgeIITsr1yLa8241synhyrCOVAP6mHWE0rzi3pQD5ceUJ5MRT2oh1VPpGYq6kE9HHqAEAn1oB5uPeHsHKgH9fDoCYW0oh7Uw6WHnlH2G/WgHgY9kWk86kE9HHpAUfYb9aAeZj2UBAbRqAf1cOmB6HAO1IN62PRQRTgH6kE9zHogfDIV9aAeDj3BJxDqQT18eoAQCfWgHm49ipBW1IN62PXQ0FYG6kE9PHpgorLfqAf1qNVDzyj7jXpQD4MeiC77jXpQD5seqij7jXpQD7OeqETjqAf1sOoZF86BelAPmx6qCOdAPaiHWQ8EY6JRD+rh0hNIMIV6UA+nHsXJVNSDetj1BMdAqAf18Ok5W9lv1IN6VOmBicp+ox7Uo1YPPaPsN+pBPQx6ILrsN+pBPWx6qKLsN+pBPcx6wnmiUQ/q4dFDo8M5UA/qYdOjrJWBelAPsx4g406moh7Uw6In+mQq6kE9jHoUJ1NRD+ph10OB/B8Dl4GuIaHEtAAAAABJRU5ErkJggg==',ICON512='data:image/png;base64,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';
function isSA(){try{return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}}
(function(){var web=/^https?:$/.test(location.protocol);if(!web){OFFST='local';return}
try{var base=location.origin+location.pathname,m={id:base,name:'Java Sutra',short_name:'Java Sutra',description:'Java interview prep notes, quizzes and animations',start_url:base,scope:base.replace(/[^\/]*$/,''),display:'standalone',background_color:'#fff7ed',theme_color:'#e8590c',icons:[{src:ICON192,sizes:'192x192',type:'image/png',purpose:'any'},{src:ICON512,sizes:'512x512',type:'image/png',purpose:'any'},{src:ICON512,sizes:'512x512',type:'image/png',purpose:'maskable'}]};
var l=document.createElement('link');l.rel='manifest';l.href=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:'application/manifest+json'}));document.head.appendChild(l)}catch(e){}
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').then(function(){return navigator.serviceWorker.ready}).then(function(){OFFST='ready';return caches.open(SWV)}).then(function(c){return c.add(location.href.split('#')[0])}).catch(function(){if(OFFST!=='ready')OFFST='nosw'})}else OFFST='nosupport'})();
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();DEFP=e;instInject()});
window.addEventListener('appinstalled',function(){DEFP=null;document.querySelectorAll('[data-inst]').forEach(function(b){b.remove()});say(L('App installed!','ऐप इंस्टॉल हो गया!'))});
function instInject(){if(!H||isSA())return;var cta=H.querySelector('.hm-cta');if(!cta)return;var b=cta.querySelector('[data-inst]');if(!b){b=document.createElement('button');b.className='hm-s';b.dataset.inst='1';b.dataset.wnx='';b.onclick=instClick;cta.appendChild(b)}var t='📲 '+(OFFST==='local'?L('Get the app','ऐप पाएँ'):L('Install app','ऐप इंस्टॉल करें'));if(b.textContent!==t)b.textContent=t}
function instClick(){if(DEFP){DEFP.prompt();DEFP.userChoice.then(function(){DEFP=null;document.querySelectorAll('[data-inst]').forEach(function(b){b.remove()})});return}instInfo()}
function instInfo(){openM('📲 '+(OFFST==='local'?L('Get Java Sutra as an app','Java Sutra को ऐप की तरह पाएँ'):L('Install Java Sutra','Java Sutra इंस्टॉल करें')));
if(OFFST==='local'){var go=APP_URL?'<a class="tlbtn" id="insgo" href="'+esc(APP_URL)+'" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">🌐 '+L('Open the website to install','इंस्टॉल के लिए वेबसाइट खोलें')+'</a>':'';
BD.innerHTML='<div class="tlw">'+L('The app can be installed from the Java Sutra website, not from a saved file. Tap the button, then choose Install on the website.','ऐप Java Sutra वेबसाइट से इंस्टॉल होता है, सेव की हुई फ़ाइल से नहीं। बटन दबाएँ, फिर वेबसाइट पर Install चुनें।')+(APP_URL?'':' '+L('Ask the person who shared this file for the website link.','जिसने यह फ़ाइल भेजी है उससे वेबसाइट का लिंक माँगें।'))+'</div><div style="margin-top:12px">'+go+'<button class="tlbtn g" id="insx">'+L('Close','बंद करें')+'</button></div>';$('#insx').onclick=closeM;return}
var st=OFFST==='ready'?'<div class="tlw">✅ '+L('Offline ready. After this visit the app opens without internet.','ऑफ़लाइन तैयार। इस विज़िट के बाद ऐप बिना इंटरनेट के खुलेगा।')+'</div>':OFFST==='nosw'?'<div class="tlw">ℹ️ '+L('Offline use is not available on this website yet, but you can still install the app.','इस वेबसाइट पर ऑफ़लाइन उपयोग अभी उपलब्ध नहीं है, पर आप ऐप इंस्टॉल कर सकते हैं।')+'</div>':'<div class="tlw">'+L('Getting ready for offline use…','ऑफ़लाइन उपयोग के लिए तैयार हो रहा है…')+'</div>';
BD.innerHTML=st+'<ul class="wnl"><li><span class="e">🤖</span><div><b>Android · Chrome</b><p>'+L('Tap ⋮ and choose Install app (or Add to Home screen).','⋮ दबाएँ और Install app (या Add to Home screen) चुनें।')+'</p></div></li><li><span class="e">🍎</span><div><b>iPhone · Safari</b><p>'+L('Tap Share, then Add to Home Screen.','Share दबाएँ, फिर Add to Home Screen।')+'</p></div></li><li><span class="e">💻</span><div><b>'+L('Computer · Chrome or Edge','कंप्यूटर · Chrome या Edge')+'</b><p>'+L('Click the install icon at the right end of the address bar.','एड्रेस बार के दाएँ सिरे पर इंस्टॉल आइकन दबाएँ।')+'</p></div></li></ul><button class="tlbtn" id="insx">'+L('Got it','समझ गया')+'</button>';$('#insx').onclick=closeM}
function v218(){track();contInject();instInject()}
var v218t=0;new MutationObserver(function(){if(v218t)return;v218t=setTimeout(function(){v218t=0;v218()},250)}).observe(B,{childList:true,subtree:true});
new MutationObserver(function(){setTimeout(v218,200)}).observe(B,{attributes:true,attributeFilter:['class']});
v218();

/* ===== v2.1.9: BACKUP + IMPORT, TAGS + SEARCH FOR NOTES, PRINT CHEAT SHEET ===== */
var BK_KEYS=['jbm','jnotes','jquiz','jdone','jlast','jpos','jplbest','jlang','jtheme','java-notes-bookpart','java-notes-part'];
var NQ='',NTAG='',NALL=false,PRESET=['revise','important','doubt','interview'];
function tagL(t){return t==='revise'?L('revise','दोहराना'):t==='important'?L('important','ज़रूरी'):t==='doubt'?L('doubt','संदेह'):t==='interview'?L('interview','इंटरव्यू'):t}
function cleanTags(a){var o=[];(Array.isArray(a)?a:[]).forEach(function(t){t=String(t).toLowerCase().replace(/[<>&"'#]/g,'').replace(/\s+/g,' ').trim().slice(0,20);if(t&&o.indexOf(t)<0&&o.length<8)o.push(t)});return o}
/* ---------- note editor with tags ---------- */
function noteEd(id,n,title,btn,p){var all=nts(),cur=all[id]||{},tags=cleanTags(cur.g);openM('✎ '+L('My note','मेरा नोट'));
BD.innerHTML='<div style="color:var(--muted);font-size:13px;margin-bottom:8px">'+esc(title)+'</div><textarea class="tln" id="tlta" placeholder="'+L('Write your own note for this section…','इस सेक्शन के लिए अपना नोट लिखें…')+'">'+esc(cur.tx||'')+'</textarea><div class="ntg-lbl">'+L('Tags','टैग')+'</div><div class="ntg-row" id="ntgr"></div><input id="ntgi" class="ntq" maxlength="20" placeholder="'+L('Add your own tag and press Enter','अपना टैग जोड़ें और Enter दबाएँ')+'"><div style="margin-top:12px"><button class="tlbtn" id="tlsv">'+L('Save','सेव')+'</button><button class="tlbtn g" id="tldl">'+L('Delete','हटाएँ')+'</button></div>';
function draw(){var l=PRESET.concat(tags.filter(function(t){return PRESET.indexOf(t)<0}));$('#ntgr').innerHTML=l.map(function(t){return'<button class="ntgc'+(tags.indexOf(t)>=0?' on':'')+'" data-t="'+esc(t)+'">#'+esc(tagL(t))+'</button>'}).join('')}
draw();$('#ntgr').onclick=function(e){var b=e.target.closest('[data-t]');if(!b)return;var t=b.dataset.t,i=tags.indexOf(t);if(i>=0)tags.splice(i,1);else if(tags.length<8)tags.push(t);draw()};
$('#ntgi').onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();var v=cleanTags([this.value])[0];if(v&&tags.indexOf(v)<0&&tags.length<8){tags.push(v);draw()}this.value=''}};
$('#tlsv').onclick=function(){var v=$('#tlta').value.trim(),a=nts(),extra=cleanTags([$('#ntgi').value])[0];if(extra&&tags.indexOf(extra)<0&&tags.length<8)tags.push(extra);if(v)a[id]={n:n,t:title,tx:v,p:p||cur.p,g:tags};else delete a[id];sv('jnotes',a);if(btn)btn.classList.toggle('on',!!v);closeM();lib();if(v)say(L('Note saved!','नोट सेव हो गया!'))};
$('#tldl').onclick=function(){var a=nts();delete a[id];sv('jnotes',a);if(btn)btn.classList.remove('on');closeM();lib()};setTimeout(function(){$('#tlta').focus()},200)}
/* ---------- library panel: search + tags + data tools ---------- */
function notesFiltered(){var n=nts(),q=(NQ||'').trim().toLowerCase();return Object.keys(n).filter(function(k){var x=n[k];if(NTAG&&cleanTags(x.g).indexOf(NTAG)<0)return false;if(!q)return true;return(x.t+' '+x.tx+' '+cleanTags(x.g).join(' ')).toLowerCase().indexOf(q)>=0})}
function noteLi(k,x){var g=cleanTags(x.g);return'<li><button '+(x.p?'data-pgo':'data-go')+'="'+esc(k)+'" data-n="'+x.n+'" data-p="'+(x.p||'')+'">'+esc(x.t)+'</button><small>'+(x.p?where(x)+' · ':'')+esc(x.tx.slice(0,90))+(x.tx.length>90?'…':'')+'</small>'+(g.length?'<span class="ntl">'+g.map(function(t){return'<i>#'+esc(tagL(t))+'</i>'}).join('')+'</span>':'')+'</li>'}
function notesList(){var n=nts(),all=Object.keys(n);if(!all.length)return'<p>'+L('Tap ✎ next to any topic to write your own note.','किसी भी टॉपिक के पास ✎ दबाकर अपना नोट लिखें।')+'</p>';var ks=notesFiltered();if(!ks.length)return'<p>'+L('No notes match your search.','आपकी खोज से कोई नोट नहीं मिला।')+'</p>';
return'<ul>'+ks.slice(0,NALL?ks.length:6).map(function(k){return noteLi(k,n[k])}).join('')+'</ul>'+(ks.length>6?'<button class="ntmore" data-nall="1">'+(NALL?L('Show less','कम दिखाएँ'):L('Show all','सब दिखाएँ')+' ('+ks.length+')')+'</button>':'')}
function tagBar(){var n=nts(),ks=Object.keys(n);if(!ks.length)return'';var cnt={};ks.forEach(function(k){cleanTags(n[k].g).forEach(function(t){cnt[t]=(cnt[t]||0)+1})});var ts=Object.keys(cnt);
return'<input class="ntq" id="nsq" type="search" value="'+esc(NQ||'')+'" placeholder="🔍 '+L('Search my notes','मेरे नोट्स खोजें')+'">'+(ts.length?'<div class="ntg-row">'+ts.map(function(t){return'<button class="ntgc'+(NTAG===t?' on':'')+'" data-ntag="'+esc(t)+'">#'+esc(tagL(t))+' <b>'+cnt[t]+'</b></button>'}).join('')+'</div>':'')}
function dataBar(){return'<div class="hm-card dbar"><h3>🗂 '+L('My study data','मेरा स्टडी डेटा')+'</h3><p>'+L('Back up your bookmarks, notes, progress and quiz scores to move them to another device, or print them as a cheat sheet.','अपने बुकमार्क, नोट्स, प्रोग्रेस और क्विज़ स्कोर का बैकअप लें ताकि दूसरे डिवाइस पर ले जा सकें, या उन्हें चीट शीट की तरह प्रिंट करें।')+'</p><div class="dbtn"><button class="rbn" data-dact="export">⬇ '+L('Export backup','बैकअप एक्सपोर्ट')+'</button><button class="rbn" data-dact="import">⬆ '+L('Import backup','बैकअप इम्पोर्ट')+'</button><button class="rbn g" data-dact="print">🖨 '+L('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट')+'</button></div></div>'}
function libHtml(){var b=bms().slice(0,6);
return'<div class="lib"><div class="hm-card"><h3>★ '+L('Bookmarks','बुकमार्क')+'</h3>'+(b.length?'<ul>'+b.map(function(x){return'<li><button '+(x.p?'data-pgo':'data-go')+'="'+esc(x.id)+'" data-n="'+x.n+'" data-p="'+(x.p||'')+'">'+esc(x.t)+'</button><small>'+where(x)+'</small></li>'}).join('')+'</ul>':'<p>'+L('Tap ★ next to any topic to save it here.','किसी भी टॉपिक के पास ★ दबाकर उसे यहाँ सेव करें।')+'</p>')+'</div><div class="hm-card"><h3>✎ '+L('My notes','मेरे नोट्स')+'</h3>'+tagBar()+'<div id="nlist">'+notesList()+'</div></div></div>'+dataBar()}
document.addEventListener('input',function(e){if(e.target&&e.target.id==='nsq'){NQ=e.target.value;var l=$('#nlist');if(l)l.innerHTML=notesList()}});
document.addEventListener('click',function(e){var t=e.target.closest('[data-ntag]');if(t){NTAG=NTAG===t.dataset.ntag?'':t.dataset.ntag;lib();return}
if(e.target.closest('[data-nall]')){NALL=!NALL;lib();return}
var d=e.target.closest('[data-dact]');if(d){var k=d.dataset.dact;k==='export'?bkExport():k==='import'?bkImport():printSheet()}});
/* ---------- export / import ---------- */
function bkRead(){var d={};BK_KEYS.forEach(function(k){var r=null;try{r=localStorage.getItem(k)}catch(e){}if(r===null)return;try{d[k]=JSON.parse(r)}catch(e){d[k]=r}});return d}
function bkExport(){var d=bkRead(),n=nts(),o={app:'java-sutra',v:1,date:new Date().toISOString(),data:d},blob=new Blob([JSON.stringify(o,null,1)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='java-sutra-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);say(L('Backup downloaded!','बैकअप डाउनलोड हो गया!'))}
function str(x,m){return typeof x==='string'?x.slice(0,m):''}
function bkClean(o){if(!o||o.app!=='java-sutra'||!o.data||typeof o.data!=='object')return null;var d=o.data,r={};
if(Array.isArray(d.jbm))r.jbm=d.jbm.slice(0,500).filter(function(x){return x&&typeof x.id==='string'&&x.id.length<=80}).map(function(x){return{id:x.id,n:+x.n||0,p:str(x.p,20),t:str(x.t,200)}});
if(d.jnotes&&typeof d.jnotes==='object'&&!Array.isArray(d.jnotes)){r.jnotes={};Object.keys(d.jnotes).slice(0,1000).forEach(function(k){var x=d.jnotes[k];if(/^[\w.-]{1,80}$/.test(k)&&x&&typeof x.tx==='string'&&x.tx.trim())r.jnotes[k]={n:+x.n||0,t:str(x.t,200),tx:str(x.tx,5000),p:str(x.p,20),g:cleanTags(x.g)}})}
if(d.jquiz&&typeof d.jquiz==='object'&&!Array.isArray(d.jquiz)){r.jquiz={};Object.keys(d.jquiz).slice(0,200).forEach(function(k){var v=+d.jquiz[k];if(k.length<=40&&isFinite(v))r.jquiz[k]=Math.max(0,Math.min(100,Math.round(v)))})}
if(Array.isArray(d.jdone))r.jdone=d.jdone.slice(0,6000).filter(function(x){return(typeof x==='string'&&x.length<=80)||typeof x==='number'});
if(d.jpos&&typeof d.jpos==='object')r.jpos={p:str(d.jpos.p,20),n:+d.jpos.n||0,id:str(d.jpos.id,80),t:str(d.jpos.t,80)};
['jplbest','jlast'].forEach(function(k){if(d[k]!==undefined&&isFinite(+d[k]))r[k]=Math.max(0,Math.floor(+d[k]))});
['jlang','jtheme','java-notes-bookpart','java-notes-part'].forEach(function(k){if(d[k]!==undefined&&(typeof d[k]==='string'||typeof d[k]==='number')&&String(d[k]).length<=12)r[k]=d[k]});
return r}
function bkSummary(r){var nb=(r.jbm||[]).length,nn=Object.keys(r.jnotes||{}).length,nd=(r.jdone||[]).length,nq=Object.keys(r.jquiz||{}).length;return[[L('Bookmarks','बुकमार्क'),nb],[L('Notes','नोट्स'),nn],[L('Topics marked learned','सीखे हुए टॉपिक'),nd],[L('Quiz best scores','क्विज़ बेस्ट स्कोर'),nq]]}
function bkApply(r,mode){var put=function(k,v){try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch(e){}};
BK_KEYS.forEach(function(k){if(r[k]===undefined)return;
if(mode==='replace'){put(k,r[k]);return}
var cur;try{cur=localStorage.getItem(k)}catch(e){cur=null}var has=cur!==null&&cur!=='';
if(k==='jbm'){var l=bms(),ids={};l.forEach(function(x){ids[x.id]=1});r.jbm.forEach(function(x){if(!ids[x.id])l.push(x)});put(k,l)}
else if(k==='jnotes'){var a=nts();Object.keys(r.jnotes).forEach(function(id){var x=r.jnotes[id],y=a[id];if(!y)a[id]=x;else{var g=cleanTags((y.g||[]).concat(x.g||[]));if(y.tx.trim()!==x.tx.trim())y.tx=(y.tx+'\n\n— '+L('imported','इम्पोर्ट किया')+' —\n'+x.tx).slice(0,5000);y.g=g}});put(k,a)}
else if(k==='jquiz'){var q=ld('jquiz',{});Object.keys(r.jquiz).forEach(function(s){q[s]=Math.max(+q[s]||0,r.jquiz[s])});put(k,q)}
else if(k==='jdone'){var set={};var cd=ld('jdone',[]);cd.concat(r.jdone).forEach(function(x){set[x]=x});put(k,Object.keys(set).map(function(x){return set[x]}))}
else if(k==='jplbest'){put(k,String(Math.max(+cur||0,r[k])))}
else if(!has)put(k,r[k])})}
function bkImport(){var f=document.createElement('input');f.type='file';f.accept='application/json,.json';f.onchange=function(){var file=f.files&&f.files[0];if(!file)return;if(file.size>3e6){bkBad(L('That file is too large to be a Java Sutra backup.','यह फ़ाइल Java Sutra बैकअप के लिए बहुत बड़ी है।'));return}
var rd=new FileReader();rd.onload=function(){var r=null;try{r=bkClean(JSON.parse(rd.result))}catch(e){}if(!r){bkBad(L('This is not a Java Sutra backup file.','यह Java Sutra बैकअप फ़ाइल नहीं है।'));return}bkAsk(r)};rd.readAsText(file)};f.click()}
function bkBad(m){openM('⬆ '+L('Import backup','बैकअप इम्पोर्ट'));BD.innerHTML='<div class="tlw">'+esc(m)+'</div><div style="margin-top:12px"><button class="tlbtn g" id="bkx">'+L('Close','बंद करें')+'</button></div>';$('#bkx').onclick=closeM}
function bkAsk(r){openM('⬆ '+L('Import backup','बैकअप इम्पोर्ट'));
BD.innerHTML='<p style="margin:0 0 10px">'+L('This backup contains:','इस बैकअप में है:')+'</p><ul class="wnl">'+bkSummary(r).map(function(x){return'<li><div><b>'+x[1]+'</b> '+esc(x[0])+'</div></li>'}).join('')+'</ul><p style="color:var(--muted);font-size:13px">'+L('Merge keeps what you already have and adds the backup. Replace overwrites your data with the backup.','Merge आपके मौजूदा डेटा में बैकअप जोड़ता है। Replace आपके डेटा को बैकअप से बदल देता है।')+'</p><div><button class="tlbtn" id="bkm">'+L('Merge (recommended)','Merge (सुझाया गया)')+'</button><button class="tlbtn g" id="bkr">'+L('Replace','Replace')+'</button><button class="tlbtn g" id="bkc">'+L('Cancel','रद्द करें')+'</button></div>';
function go(mode){bkApply(r,mode);BD.innerHTML='<div class="tlw">✅ '+L('Backup imported. Reloading…','बैकअप इम्पोर्ट हो गया। रीलोड हो रहा है…')+'</div>';setTimeout(function(){location.reload()},900)}
$('#bkm').onclick=function(){go('merge')};$('#bkr').onclick=function(){go('replace')};$('#bkc').onclick=closeM}
/* ---------- print / PDF cheat sheet ---------- */
function pjClean(c){c.querySelectorAll('button,input,select,textarea,script,iframe,.runbar,.cpy').forEach(function(e){e.remove()});c.querySelectorAll('[id]').forEach(function(e){e.removeAttribute('id')});c.querySelectorAll('details').forEach(function(d){d.open=true});return c}
function pjBody(x,id){try{if(x.p){var s=document.getElementById(id);if(s&&s.tagName==='SECTION'){var c=pjClean(s.cloneNode(true)),h=c.querySelector('h2');if(h)h.remove();return c.innerHTML}}else if(x.n){var t=document.getElementById('tpl-b'+x.n),h3=t&&t.content.getElementById(id);if(h3){var o=document.createElement('div'),e=h3.nextElementSibling,k=0;while(e&&!/^H[23]$/.test(e.tagName)&&k<30){o.appendChild(e.cloneNode(true));e=e.nextElementSibling;k++}return pjClean(o).innerHTML}}}catch(e){}return''}
function pjItem(id,x,note,withBody){var g=note?cleanTags(note.g):[];return'<section class="pj-t"><h3>'+esc(x.t)+'</h3><div class="pj-w">'+esc(x.p&&PARTS[x.p]?L(PARTS[x.p].en,PARTS[x.p].hi):L('Chapter ','अध्याय ')+x.n)+(g.length?' · '+g.map(function(t){return'#'+esc(tagL(t))}).join(' '):'')+'</div>'+(note?'<div class="pj-n"><b>'+L('My note','मेरा नोट')+':</b> '+esc(note.tx).replace(/\n/g,'<br>')+'</div>':'')+(withBody?'<div class="pj-b">'+pjBody(x,id)+'</div>':'')+'</section>'}
function printSheet(){var b=bms(),n=nts(),tags={};Object.keys(n).forEach(function(k){cleanTags(n[k].g).forEach(function(t){tags[t]=1})});
if(!b.length&&!Object.keys(n).length){openM('🖨 '+L('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट'));BD.innerHTML='<div class="tlw">'+L('Nothing to print yet. Tap ★ on a topic to bookmark it, or ✎ to write a note.','अभी प्रिंट करने को कुछ नहीं। टॉपिक पर ★ दबाकर बुकमार्क करें, या ✎ से नोट लिखें।')+'</div>';return}
openM('🖨 '+L('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट'));
BD.innerHTML='<label class="pjo"><input type="checkbox" id="pjb" checked> ★ '+L('Bookmarked topics','बुकमार्क किए टॉपिक')+' ('+b.length+')</label><label class="pjo"><input type="checkbox" id="pjn" checked> ✎ '+L('My notes','मेरे नोट्स')+' ('+Object.keys(n).length+')</label><label class="pjo"><input type="checkbox" id="pjc" checked> '+L('Include topic text and code','टॉपिक का टेक्स्ट और code शामिल करें')+'</label>'
+(Object.keys(tags).length?'<label class="pjo">'+L('Only notes tagged','सिर्फ़ इस टैग वाले नोट्स')+' <select id="pjt"><option value="">'+L('all','सभी')+'</option>'+Object.keys(tags).map(function(t){return'<option value="'+esc(t)+'">#'+esc(tagL(t))+'</option>'}).join('')+'</select></label>':'')
+'<p style="color:var(--muted);font-size:13px;margin:10px 0">'+L('A print window opens. To make a PDF, choose Save as PDF as the printer.','प्रिंट विंडो खुलेगी। PDF बनाने के लिए प्रिंटर में Save as PDF चुनें।')+'</p><button class="tlbtn" id="pjgo">🖨 '+L('Print / Save as PDF','प्रिंट / PDF सेव')+'</button><button class="tlbtn g" id="pjx">'+L('Cancel','रद्द करें')+'</button>';
$('#pjx').onclick=closeM;$('#pjgo').onclick=function(){var wb=$('#pjb').checked,wn=$('#pjn').checked,wc=$('#pjc').checked,tg=$('#pjt')?$('#pjt').value:'';closeM();setTimeout(function(){doPrint(wb,wn,wc,tg)},250)}}
function doPrint(wb,wn,wc,tg){var b=bms(),n=nts(),h='<h1>Java Sutra · '+L('My cheat sheet','मेरी चीट शीट')+'</h1><div class="pj-d">'+new Date().toLocaleDateString()+'</div>',shown={},count=0;
if(wb&&b.length){h+='<h2>★ '+L('Bookmarked topics','बुकमार्क किए टॉपिक')+'</h2>';b.forEach(function(x){var nn=n[x.id];if(tg&&!(nn&&cleanTags(nn.g).indexOf(tg)>=0))return;shown[x.id]=1;count++;h+=pjItem(x.id,x,nn,wc)})}
if(wn){var ks=Object.keys(n).filter(function(k){return!shown[k]&&(!tg||cleanTags(n[k].g).indexOf(tg)>=0)});if(ks.length){h+='<h2>✎ '+L('My notes','मेरे नोट्स')+'</h2>';ks.forEach(function(k){count++;h+=pjItem(k,n[k],n[k],wc)})}}
if(!count){h+='<p>'+L('Nothing matched your choices.','आपके चुनाव से कुछ नहीं मिला।')+'</p>'}
var el=document.getElementById('jprint');if(!el){el=document.createElement('div');el.id='jprint';document.body.appendChild(el)}el.innerHTML=h;B.classList.add('jprinting');
var done=function(){B.classList.remove('jprinting');el.innerHTML=''};window.addEventListener('afterprint',done,{once:true});setTimeout(function(){window.print()},150)}
function v219(){}
})();
;

/* ===== script (line 47826 of original) ===== */
(function(){
var B=document.body,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
/* header shadow once the page scrolls */
function sc(){B.classList.toggle('scrolled',(window.scrollY||0)>6)}window.addEventListener('scroll',sc,{passive:true});sc();
/* cursor spotlight on cards */
var raf=0,tg=null,px=0,py=0;document.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var t=e.target.closest&&e.target.closest('.hm-card,.hm-q,.hm-ch');if(!t)return;tg=t;px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(function(){raf=0;var r=tg.getBoundingClientRect();tg.style.setProperty('--mx',(px-r.left)+'px');tg.style.setProperty('--my',(py-r.top)+'px')})},{passive:true});
/* press ring on buttons */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.rbn,.tlbtn,.hm-s,.hm-p,.hm-btn,.seg button,.hb button,.qzb,.tlx');if(!b||RM)return;b.classList.remove('uxp');void b.offsetWidth;b.classList.add('uxp');setTimeout(function(){b.classList.remove('uxp')},600)});
/* reveal on scroll (Home blocks) */
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rv1');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -5% 0px'}):null;
function reveal(){if(RM||!io)return;var list=document.querySelectorAll('#home .hm-row>*,#home .hm-quick>*,#home .hm-stats>*,#home .hm-chs>*,#home .hm-h,#home .hm-g,#home .lib>*,#home .dbar,#home #animsec');
list.forEach(function(el,i){if(el.dataset.rv)return;el.dataset.rv=1;var r=el.getBoundingClientRect();
if(r.top<window.innerHeight*.95){el.style.animation='uxIn .7s cubic-bezier(.2,.8,.2,1) '+Math.min(i,9)*55+'ms both';el.addEventListener('animationend',function f(){el.style.animation='';el.removeEventListener('animationend',f)});return}
el.classList.add('rv0');el.style.setProperty('--d',(i%4)*70+'ms');io.observe(el)})}
/* hero numbers count up */
function countUp(){document.querySelectorAll('#home .hm-st b').forEach(function(b){if(b.dataset.cu)return;var t=b.textContent.trim(),m=/^[\d,]+$/.exec(t);if(!m)return;b.dataset.cu=1;if(RM)return;var to=+t.replace(/,/g,''),fmt=t.indexOf(',')>=0,st=null;
(function f(ts){if(!st)st=ts;var p=Math.min(1,(ts-st)/1000),v=Math.round(to*(1-Math.pow(1-p,3)));b.textContent=fmt?v.toLocaleString('en-US'):String(v);if(p<1)requestAnimationFrame(f)})(performance.now())})}
/* chapter progress bars in the side nav */
function navProg(){document.querySelectorAll('#nav a').forEach(function(a){var m=/(\d+)\s*\/\s*(\d+)\s*$/.exec(a.textContent);if(m){var p=+m[2]?Math.round(+m[1]/+m[2]*100):0;if(a.style.getPropertyValue('--p')!==String(p))a.style.setProperty('--p',p)}})}
var t=0;function run(){reveal();countUp();navProg()}
new MutationObserver(function(){if(t)return;t=setTimeout(function(){t=0;run()},150)}).observe(B,{childList:true,subtree:true});run();
})();
;

/* ===== script#prem-js (line 47978 of original) ===== */
(function(){try{
var B=document.body,H=document.getElementById('home');if(!H)return;var Q=22,tm,tt;
function hi(){return B.classList.contains('hi')}
function T(e,h){return hi()&&h?h:e}
function J(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function names(){var n={};document.querySelectorAll('template[id^="tpl-b"]').forEach(function(x){var h=x.content.querySelector('h2');if(h)n[x.id.slice(5)]=h.textContent.replace(/\s+/g,' ').trim()});return n}
function tpl(){var t={};document.querySelectorAll('template[id^="tpl-b"]').forEach(function(x){t[x.id.slice(5)]=x.content.querySelectorAll('h3[id]').length});return t}
function openSearch(q){var b=[].slice.call(document.querySelectorAll('.hb button')).filter(function(x){return x.textContent.trim()==='🔍'})[0];if(!b)return;b.click();setTimeout(function(){var si=document.getElementById('si');if(si){si.value=q||'';si.dispatchEvent(new Event('input',{bubbles:true}))}},60)}
function track(){var a=document.querySelector('article.book .eyebrow'),p=document.getElementById('part-notes');if(!a||!p||!p.offsetParent)return;var m=/(\d+)/.exec(a.textContent);if(!m)return;var n=+m[1],r=J('jrecent','[]');if(r[0]===n)return;r=r.filter(function(x){return x!==n});r.unshift(n);try{localStorage.setItem('jrecent',JSON.stringify(r.slice(0,6)))}catch(e){}}
function build(){
var n=names(),t=tpl(),per={},d=J('jdone','[]'),last=+localStorage.getItem('jlast')||0;
d.forEach(function(k){var m=/^b(\d+)-/.exec(k);if(m)per[m[1]]=(per[m[1]]||0)+1});
var chs=Object.keys(n).length,tops=0;for(var k in t)tops+=t[k];
function rng(a,b){var o=[];for(var i=a;i<=b;i++)if(n[i])o.push(i);return o}
function sm(a,o){return a.reduce(function(s,i){return s+(o[i]||0)},0)}
function chip(i){return'<button class="pm-chip" data-ch="'+i+'">'+i+' · '+esc(n[i])+(per[i]?' <em>'+per[i]+'/'+(t[i]||0)+'</em>':'')+'</button>'}
var core=rng(1,12),adv=rng(13,31),dsa=[4,5,13].filter(function(i){return n[i]});
function card(ic,h,p,ids,btn){var td=sm(ids,per),tt2=sm(ids,t);return'<div class="hm-card pm-card"><div class="pm-ic">'+ic+'</div><h3>'+h+'</h3><p>'+p+'</p><div class="pm-meta">'+ids.length+' '+T('chapters','अध्याय')+' · '+tt2.toLocaleString()+' '+T('topics','टॉपिक')+'</div>'+(td?'<div class="hm-bar"><i style="width:'+Math.round(td/tt2*100)+'%"></i></div><div class="pm-meta">'+td+' / '+tt2+' '+T('learned','सीखे')+'</div>':'')+'<div class="pm-act">'+btn+'</div></div>'}
function go(id,txt){return'<button class="hm-btn" data-ch="'+id+'">'+txt+'</button>'}
var h='<div id="prem"><nav class="pm-jump" aria-label="Sections"><button data-jump="pm-paths">'+T('Paths','रास्ते')+'</button><button data-jump="pm-road">'+T('Roadmap','रोडमैप')+'</button><button data-jump="pm-prac">'+T('Practice','प्रैक्टिस')+'</button><button data-jump="pmfoot">'+T('Links','लिंक')+'</button></nav>';
var tl=0;for(var q0 in per)tl+=per[q0];
if(tl)h+='<section class="pm" id="pm-prog"><div class="hm-h">'+T('Your progress map','आपका प्रोग्रेस मैप')+'<small>'+tl+' '+T('topics learned','टॉपिक सीखे')+'</small></div><div class="pm-heat">'+Object.keys(n).map(function(i){var f=(per[i]||0)/(t[i]||1);return'<button type="button" class="pm-cell" data-ch="'+i+'" style="--f:'+f.toFixed(2)+'" title="'+i+' · '+esc(n[i])+' — '+(per[i]||0)+'/'+(t[i]||0)+'">'+i+'</button>'}).join('')+'</div><p class="pm-meta">'+T('Each square is a chapter. A deeper colour means more topics learned.','हर वर्ग एक अध्याय है। गहरा रंग यानी ज़्यादा टॉपिक सीखे।')+'</p></section>';
var rec=J('jrecent','[]').filter(function(x){return n[x]});
if(rec.length)h+='<section class="pm"><div class="hm-h">'+T('Recently accessed','हाल ही में देखे गए')+'<small>'+T('Chapters you opened last','आपके खोले हुए अध्याय')+'</small></div><div>'+rec.map(chip).join('')+'</div></section>';
h+='<section class="pm" id="pm-paths"><div class="hm-h">'+T('Choose your path','अपना रास्ता चुनें')+'<small>'+T('Four ways into the notes','नोट्स में आने के चार रास्ते')+'</small></div><div class="pm-grid">'
+card('☕',T('Core Java','कोर जावा'),T('Syntax, control flow, arrays, strings, OOP, exceptions and interfaces.','सिंटैक्स, कंट्रोल फ़्लो, ऐरे, स्ट्रिंग्स, OOP, एक्सेप्शन और इंटरफ़ेस।'),core,go(core[0],T('Start Core Java →','कोर जावा शुरू करें →')))
+card('🚀',T('Advanced Java','एडवांस्ड जावा'),T('Collections, generics, I/O, multithreading, Java 8, JDBC, memory, GC and the JVM.','कलेक्शन्स, जेनेरिक्स, I/O, मल्टीथ्रेडिंग, Java 8, JDBC, मेमोरी, GC और JVM।'),adv,go(adv[0],T('Open Advanced Java →','एडवांस्ड जावा खोलें →')))
+card('🧩',T('DSA foundations','DSA की बुनियाद'),T('Arrays, Strings and the Collections Framework from the notes. Code practice lives in the JavaSquadz repository.','नोट्स से Arrays, Strings और Collections Framework। कोड प्रैक्टिस JavaSquadz रिपॉज़िटरी में है।'),dsa,go(dsa[0],T('Start with Arrays →','Arrays से शुरू करें →'))+'<a class="pm-a" href="https://github.com/abhinavmaurya12/JavaSquadz" target="_blank" rel="noopener">JavaSquadz ↗</a>')
+'<div class="hm-card pm-card"><div class="pm-ic">🎯</div><h3>'+T('Interview preparation','इंटरव्यू की तैयारी')+'</h3><p>'+T('A mixed quiz of '+Q+' questions on OOP, Collections, Strings, Exceptions, Threads and the JVM.',Q+' प्रश्नों की मिक्स्ड क्विज़: OOP, Collections, Strings, Exceptions, Threads और JVM।')+'</p><div class="pm-meta">'+Q+' '+T('quiz questions','क्विज़ प्रश्न')+'</div><div class="pm-act"><button class="hm-btn" data-act="quiz">'+T('Start the quiz →','क्विज़ शुरू करें →')+'</button></div></div>'
+'</div></section>';
var st=[[T('Beginner','शुरुआती'),rng(1,5)],[T('Intermediate','मध्यम'),rng(6,12)],[T('Advanced','एडवांस्ड'),rng(13,20)],[T('Expert','एक्सपर्ट'),rng(21,31)]];
h+='<section class="pm" id="pm-road"><div class="hm-h">'+T('Learning roadmap','लर्निंग रोडमैप')+'<small>'+T('Beginner to expert, in chapter order','शुरुआती से एक्सपर्ट तक, अध्याय क्रम में')+'</small></div><div class="pm-road">'+st.map(function(s,i){return'<div class="pm-stage s'+i+'"><div class="pm-n">'+(i+1)+'</div><h4>'+s[0]+'</h4><div class="pm-meta">'+s[1].length+' '+T('chapters','अध्याय')+' · '+sm(s[1],t).toLocaleString()+' '+T('topics','टॉपिक')+'</div>'+(sm(s[1],per)?'<div class="hm-bar"><i style="width:'+Math.round(sm(s[1],per)/sm(s[1],t)*100)+'%"></i></div>':'')+'<div class="pm-chs">'+s[1].map(chip).join('')+'</div>'+(s[1].length>4?'<button type="button" class="pm-more" data-more="'+(s[1].length-4)+'" aria-expanded="false">+'+(s[1].length-4)+' '+T('more','और')+'</button>':'')+'</div>'}).join('')+'</div></section>';
var iv=[5,6,7,9,13,17,30].filter(function(i){return n[i]});
h+='<section class="pm" id="pm-prac"><div class="hm-h">'+T('Practice and interview resources','प्रैक्टिस और इंटरव्यू संसाधन')+'<small>'+T('Built from what is in the notes','नोट्स में मौजूद सामग्री से')+'</small></div><div class="pm-grid">'
+'<div class="hm-card pm-card"><h3>'+T('Mixed interview quiz','मिक्स्ड इंटरव्यू क्विज़')+'</h3><p>'+Q+' '+T('questions, six topic areas, instant explanations.','प्रश्न, छह टॉपिक क्षेत्र, तुरंत व्याख्या।')+'</p><div class="pm-act"><button class="hm-btn" data-act="quiz">'+T('Try it →','आज़माएँ →')+'</button></div></div>'
+'<div class="hm-card pm-card"><h3>'+T('Interview-favourite chapters','इंटरव्यू के पसंदीदा अध्याय')+'</h3><div>'+iv.map(chip).join('')+'</div></div>'
+'<div class="hm-card pm-card"><h3>'+T('Run it, predict it','चलाएँ, अनुमान लगाएँ')+'</h3><p>'+T('Code examples in the notes have Run and Predict-the-output buttons. Try them in Collections.','नोट्स के कोड उदाहरणों में Run और Predict-the-output बटन हैं। Collections में आज़माएँ।')+'</p><div class="pm-act">'+go(13,T('Open Collections →','Collections खोलें →'))+'</div></div></div></section></div>';
var rows=H.querySelectorAll('.hm-row');(rows[rows.length-1]||H.querySelector('.hm-stats')).insertAdjacentHTML('afterend',h);
var hp=H.querySelector('.hm-hero p');if(hp)hp.textContent=T('Your compact rulebook for Java: '+chs+' chapters, '+tops.toLocaleString()+' topics, quick-reference cards, animated explainers and a reader that talks. In English and Hindi.','जावा का आपका संक्षिप्त नियम-पुस्तक: '+chs+' अध्याय, '+tops.toLocaleString()+' टॉपिक, क्विक-रेफ़रेंस कार्ड्स, एनिमेटेड एक्सप्लेनर और बोलकर पढ़ने वाला रीडर। हिंदी और अंग्रेज़ी दोनों में।');
var p=H.querySelector('.hm-p');if(p)p.textContent=last&&n[last]?T('Continue Learning','पढ़ाई जारी रखें'):T('Start Learning','सीखना शुरू करें');
var ex=H.querySelector('#hmS');if(ex)ex.textContent='🧭 '+T('Explore Java Topics','जावा टॉपिक देखें');
var cta=H.querySelector('.hm-cta');if(cta)cta.insertAdjacentHTML('afterend','<div class="pm-search"><input id="pmQ" type="search" autocomplete="off" aria-label="Search" role="combobox" aria-expanded="false" placeholder="'+T('Search Java concepts, collections, interview questions…','जावा कॉन्सेप्ट, कलेक्शन्स, इंटरव्यू प्रश्न खोजें…')+'"><div class="pm-sr" id="pmSr" role="listbox" hidden></div><button type="button" data-q="">'+T('Search','खोजें')+'</button></div><div class="pm-sugg"><span>'+T('Try:','आज़माएँ:')+'</span><button data-q="interview">'+T('Interview questions','इंटरव्यू प्रश्न')+'</button><button data-q="array">'+T('Arrays and DSA basics','Arrays और DSA')+'</button><button data-q="HashMap">HashMap</button><button data-q="thread">'+T('Multithreading','मल्टीथ्रेडिंग')+'</button></div>');
var sts=H.querySelector('.hm-stats');if(sts)sts.innerHTML=[[chs,T('Chapters','अध्याय')],[tops.toLocaleString(),T('Topics','टॉपिक')],[Q,T('Quiz questions','क्विज़ प्रश्न')],[document.querySelectorAll('[id^="part-"]:not(#part-notes)').length,T('Quick-reference tabs','क्विक-रेफ़रेंस टैब')]].map(function(s){return'<div class="hm-st"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('');
if(!H.querySelector('#pmfoot'))H.insertAdjacentHTML('beforeend',footHTML(n,t,chs,tops,per,last))}
function footHTML(n,t,chs,tops,per,last){
var learned=0;for(var k in per)learned+=per[k];
var v=((document.querySelector('.bver')||{}).textContent||'').trim();
function b(a,x){return'<button type="button" class="fx-l" '+a+'>'+x+'</button>'}
function ex(u,x){return'<a class="fx-l" href="'+u+'" target="_blank" rel="noopener">'+x+' ↗</a>'}
function col(h,items){return'<nav class="fx-c" aria-label="'+h+'"><h5>'+h+'</h5>'+items.join('')+'</nav>'}
var lv=[[1,T('Beginner','शुरुआती')],[6,T('Intermediate','मध्यम')],[13,T('Advanced','एडवांस्ड')],[21,T('Expert','एक्सपर्ट')]].filter(function(x){return n[x[0]]});
var st=[[chs,T('chapters','अध्याय')],[tops.toLocaleString(),T('topics','टॉपिक')],[Q,T('quiz questions','क्विज़ प्रश्न')]];if(learned)st.push([learned,T('topics learned by you','आपके सीखे टॉपिक')]);
return'<footer id="pmfoot" class="fx"><div class="fx-top"><div class="fx-brand"><div class="fx-logo">☕ Java Sutra</div><p>'+T('A compact Java rulebook by Abhinav. Notes, quick-reference cards, animated explainers and a quiz, in English and Hindi.','अभिनव द्वारा जावा का संक्षिप्त नियम-पुस्तक: नोट्स, क्विक-रेफ़रेंस कार्ड्स, एनिमेटेड एक्सप्लेनर और क्विज़, हिंदी और अंग्रेज़ी में।')+'</p>'+(last&&n[last]?b('data-ch="'+last+'"','▶ '+T('Continue: ','जारी रखें: ')+last+' · '+esc(n[last])):'')+'</div><div class="fx-stats">'+st.map(function(s){return'<div><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('')+'</div></div>'
+'<div class="fx-cols">'
+col(T('Learn','सीखें'),lv.map(function(x){return b('data-ch="'+x[0]+'"',x[1])}))
+col(T('Explore','एक्सप्लोर'),[b('data-fx="seg:home"',T('Home','होम')),b('data-fx="seg:oops"','OOPs'),b('data-fx="seg:collections"','Collections'),b('data-fx="seg:threads"','Threads'),b('data-fx="seg:notes"',T('Full Notes','पूरे नोट्स')),b('data-fx="seg:jsq"','☕ JavaSquadz')])
+col(T('Practice','प्रैक्टिस'),[b('data-act="quiz"',T('Mixed interview quiz','मिक्स्ड इंटरव्यू क्विज़')),b('data-q=""',T('Search topics','टॉपिक खोजें'))].concat(n[13]?[b('data-ch="13"',T('Run and predict (Collections)','Run और Predict (Collections)'))]:[],n[9]?[b('data-ch="9"',esc(n[9]))]:[],n[17]?[b('data-ch="17"',esc(n[17]))]:[]))
+col(T('Your study data','आपका स्टडी डेटा'),[b('data-fx="click:Export backup"',T('Export backup','बैकअप एक्सपोर्ट')),b('data-fx="click:Import backup"',T('Import backup','बैकअप इम्पोर्ट')),b('data-fx="click:Print"',T('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट')),b('data-fx="sel:[data-wn]"',T("What's new",'नया क्या है')),b('data-fx="sel:[data-inst]"',T('Get the app','ऐप पाएँ'))])
+col(T('Project','प्रोजेक्ट'),[ex('https://github.com/abhinavmaurya12/JavaSquadz','JavaSquadz repo'),ex('https://github.com/abhinavmaurya12','GitHub · abhinavmaurya12'),ex('https://abhinavmaurya12.github.io/javapath-react/','JavaPath (React)')])
+'</div><div class="fx-bar"><span>'+T('Made by Abhinav','अभिनव द्वारा निर्मित')+(v?' · '+esc(v):'')+'</span><span class="fx-tools">'+b('data-fx="id:ft"','◐ '+T('Theme','थीम'))+b('data-fx="id:hlg"','हि / EN')+b('data-cpal=""','⌘ K '+T('Command palette','कमांड पैलेट'))+b('data-fx="top:"','↑ '+T('Back to top','ऊपर जाएँ'))+'</span></div></footer>'}
H.addEventListener('click',function(e){var x=e.target.closest('[data-fx]');if(!x)return;e.preventDefault();var a=x.dataset.fx,i=a.indexOf(':'),k=a.slice(0,i),w=a.slice(i+1),el;
if(k==='top'){scrollTo({top:0,behavior:'smooth'});return}
if(k==='seg')el=document.getElementById('seg-'+w);else if(k==='id')el=document.getElementById(w);else if(k==='sel')el=H.querySelector(w);else if(k==='click')el=[].slice.call(H.querySelectorAll('button')).filter(function(q){return!q.closest('#pmfoot')&&q.textContent.indexOf(w)>=0})[0];
el&&el.click()});

var IX=null,SP=null,act=-1;
function ix(){if(IX)return IX;IX=[];document.querySelectorAll('template[id^="tpl-b"]').forEach(function(x){var c=x.id.slice(5);x.content.querySelectorAll('h3[id]').forEach(function(h){var t=h.textContent.replace(/\s+/g,' ').trim();IX.push({id:h.id,c:c,t:t,l:t.toLowerCase()})})});return IX}
function hl(t,q){var i=t.toLowerCase().indexOf(q);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length))}
function srHide(){var b=document.getElementById('pmSr');if(b){b.hidden=true;b.innerHTML=''}act=-1}
function srShow(raw){var b=document.getElementById('pmSr');if(!b)return;var q=raw.trim().toLowerCase();if(q.length<2){srHide();return}
var n=names(),r=[];ix().forEach(function(x){var i=x.l.indexOf(q);if(i>=0)r.push([i===0?0:/[\s(\/-]/.test(x.l.charAt(i-1))?1:2,x])});
r.sort(function(a,b){return a[0]-b[0]||a[1].t.length-b[1].t.length});r=r.slice(0,7);act=-1;
b.innerHTML=r.map(function(m){var x=m[1];return'<button type="button" class="pm-r" role="option" data-ch="'+x.c+'" data-id="'+x.id+'">'+hl(x.t,q)+'<small>'+T('Part ','भाग ')+x.c+' · '+esc(n[x.c]||'')+'</small></button>'}).join('')+'<button type="button" class="pm-r pm-all" data-q="'+esc(raw.trim())+'">'+T('Search everything for ','सब कुछ खोजें: ')+'“'+esc(raw.trim())+'” ↵</button>';b.hidden=false}
function spy(){if(SP)SP.disconnect();if(!('IntersectionObserver' in window))return;var bs=H.querySelectorAll('.pm-jump [data-jump]');SP=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)[].forEach.call(bs,function(b){b.classList.toggle('on',b.dataset.jump===e.target.id)})})},{rootMargin:'-30% 0px -60% 0px'});[].forEach.call(bs,function(b){var t=document.getElementById(b.dataset.jump);t&&SP.observe(t)})}
function rv(){if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.06});[].forEach.call(H.querySelectorAll('#prem .pm-card,#prem .pm-stage,#prem .hm-h,#pmfoot'),function(el,i){el.classList.add('pm-rv');el.style.animationDelay=(i%4)*70+'ms';io.observe(el)})}
H.addEventListener('input',function(e){if(e.target.id==='pmQ')srShow(e.target.value)});
H.addEventListener('keydown',function(e){if(e.target.id!=='pmQ')return;var b=document.getElementById('pmSr'),o=b?b.querySelectorAll('.pm-r'):[];
if(e.key==='ArrowDown'||e.key==='ArrowUp'){if(!o.length)return;e.preventDefault();act=(act+(e.key==='ArrowDown'?1:-1)+o.length)%o.length;[].forEach.call(o,function(x,i){x.classList.toggle('on',i===act)});o[act].scrollIntoView({block:'nearest'})}
else if(e.key==='Enter'){e.preventDefault();if(act>=0&&o[act])o[act].click();else openSearch(e.target.value)}
else if(e.key==='Escape')srHide()});
H.addEventListener('click',function(e){var pc=e.target.closest('.pm-click');if(pc&&!e.target.closest('a,button')){var pb=pc.querySelector('.hm-btn');pb&&pb.click();return}var j=e.target.closest('[data-jump]');if(j){var t=document.getElementById(j.dataset.jump);t&&t.scrollIntoView({behavior:'smooth',block:'start'});return}
var m=e.target.closest('[data-more]');if(m){var c=m.previousElementSibling,o=c.classList.toggle('open');m.setAttribute('aria-expanded',o);m.textContent=o?T('Show less','कम दिखाएँ'):'+'+m.dataset.more+' '+T('more','और')}});
document.addEventListener('click',function(e){if(!e.target.closest('.pm-search')||e.target.closest('.pm-r'))srHide()});

function fix(){if(!H.querySelector('.hm-hero'))return;if(!H.querySelector('#prem')){build();rv();spy();[].forEach.call(H.querySelectorAll('#pm-paths .pm-card,#pm-prac .pm-card'),function(c){if(c.querySelector('.hm-btn'))c.classList.add('pm-click')})}var f=H.querySelector('#pmfoot');if(f&&H.lastElementChild!==f)H.appendChild(f)}
H.addEventListener('click',function(e){var q=e.target.closest('[data-q]');if(q){e.preventDefault();var i=document.getElementById('pmQ');openSearch(q.dataset.q||(i&&i.value)||'');return}var x=e.target.closest('#hmS');if(x){e.stopImmediatePropagation();e.preventDefault();var s=document.getElementById('pm-paths');s&&s.scrollIntoView({behavior:'smooth',block:'start'})}},true);

new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(fix,60)}).observe(H,{childList:true});
new MutationObserver(function(){clearTimeout(tt);tt=setTimeout(track,400)}).observe(B,{childList:true,subtree:true});
setTimeout(fix,250);
}catch(err){console.error('premium home',err)}})();
;

/* ===== script#cpal-js (line 48070 of original) ===== */
(function(){try{
var H=document.getElementById('home'),B=document.body;if(!H)return;var root,inp,box,items=[],act=0,IXc=null;
function hi(){return B.classList.contains('hi')}function T(e,h){return hi()&&h?h:e}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function nm(){var n={};document.querySelectorAll('template[id^="tpl-b"]').forEach(function(x){var h=x.content.querySelector('h2');if(h)n[x.id.slice(5)]=h.textContent.replace(/\s+/g,' ').trim()});return n}
function tps(){if(IXc)return IXc;IXc=[];document.querySelectorAll('template[id^="tpl-b"]').forEach(function(x){var c=x.id.slice(5);x.content.querySelectorAll('h3[id]').forEach(function(h){var t=h.textContent.replace(/\s+/g,' ').trim();IXc.push({id:h.id,c:c,t:t,l:t.toLowerCase()})})});return IXc}
function go(c,id){var b=document.createElement('button');b.dataset.ch=c;if(id)b.dataset.id=id;H.appendChild(b);b.click();b.remove()}
function ck(f){return function(){var e=f();e&&e.click()}}
function bt(t){return function(){return[].slice.call(H.querySelectorAll('button')).filter(function(b){return!b.closest('#pmfoot')&&b.textContent.indexOf(t)>=0})[0]}}
function sg(i){return function(){return document.getElementById(i)}}
function acts(){return[['🏠',T('Home','होम'),ck(sg('seg-home'))],['🧱','OOPs',ck(sg('seg-oops'))],['📦','Collections',ck(sg('seg-collections'))],['🧵','Threads',ck(sg('seg-threads'))],['📘',T('Full Notes','पूरे नोट्स'),ck(sg('seg-notes'))],['☕','JavaSquadz',ck(sg('seg-jsq'))],['🎯',T('Mixed interview quiz','मिक्स्ड इंटरव्यू क्विज़'),ck(function(){return H.querySelector('[data-act=quiz]')})],['◐',T('Toggle theme','थीम बदलें'),ck(sg('ft'))],['हि',T('Switch language','भाषा बदलें'),ck(sg('hlg'))],['⬇',T('Export backup','बैकअप एक्सपोर्ट'),ck(bt('Export backup'))],['⬆',T('Import backup','बैकअप इम्पोर्ट'),ck(bt('Import backup'))],['🖨',T('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट'),ck(bt('Print'))],['✨',T("What's new",'नया क्या है'),ck(function(){return H.querySelector('[data-wn]')})]]}
function build(q){q=q.trim().toLowerCase();var n=nm(),o=[];
acts().forEach(function(a){if(!q||a[1].toLowerCase().indexOf(q)>=0)o.push({g:T('Actions','एक्शन'),ic:a[0],t:a[1],s:'',run:a[2]})});
if(!q){var r=[];try{r=JSON.parse(localStorage.getItem('jrecent')||'[]')}catch(e){}r.filter(function(i){return n[i]}).slice(0,4).forEach(function(i){o.unshift({g:T('Recent chapters','हाल के अध्याय'),ic:'🕘',t:i+' · '+n[i],s:'',run:function(){go(i)}})});o.sort(function(a,b){return(a.g===T('Actions','एक्शन'))-(b.g===T('Actions','एक्शन'))})}
else{Object.keys(n).forEach(function(i){if((i+' '+n[i]).toLowerCase().indexOf(q)>=0||('part '+i)===q)o.push({g:T('Chapters','अध्याय'),ic:'📖',t:i+' · '+n[i],s:'',run:function(){go(i)}})});
if(q.length>=2){var m=[];tps().forEach(function(x){var i=x.l.indexOf(q);if(i>=0)m.push([i===0?0:/[\s(\/-]/.test(x.l.charAt(i-1))?1:2,x])});m.sort(function(a,b){return a[0]-b[0]||a[1].t.length-b[1].t.length}).slice(0,7).forEach(function(z){var x=z[1];o.push({g:T('Topics','टॉपिक'),ic:'#',t:x.t,s:T('Part ','भाग ')+x.c+' · '+(n[x.c]||''),run:function(){go(x.c,x.id)}})})}}
return o}
function paint(){var q=inp.value;items=build(q);act=0;var g='',h='';items.forEach(function(it,i){if(it.g!==g){g=it.g;h+='<div class="cp-g">'+esc(g)+'</div>'}h+='<button type="button" class="cp-i'+(i===0?' on':'')+'" data-i="'+i+'"><span class="cp-ic">'+esc(it.ic)+'</span><span>'+esc(it.t)+(it.s?'<small>'+esc(it.s)+'</small>':'')+'</span></button>'});box.innerHTML=h||'<div class="cp-e">'+T('No matches','कोई मैच नहीं')+'</div>'}
function mark(){[].forEach.call(box.querySelectorAll('.cp-i'),function(b,i){b.classList.toggle('on',i===act)});var a=box.querySelector('.cp-i.on');a&&a.scrollIntoView({block:'nearest'})}
function close(){root&&(root.hidden=true)}
function run(i){var it=items[i];if(!it)return;close();setTimeout(it.run,30)}
function open(){if(!root){root=document.createElement('div');root.id='cpal';root.hidden=true;root.innerHTML='<div class="cp-bd"></div><div class="cp-p" role="dialog" aria-modal="true" aria-label="Command palette"><input class="cp-in" type="text" autocomplete="off" spellcheck="false"><div class="cp-l"></div><div class="cp-f"></div></div>';B.appendChild(root);inp=root.querySelector('.cp-in');box=root.querySelector('.cp-l');
root.querySelector('.cp-bd').onclick=close;box.addEventListener('click',function(e){var b=e.target.closest('.cp-i');b&&run(+b.dataset.i)});box.addEventListener('mousemove',function(e){var b=e.target.closest('.cp-i');if(b&&+b.dataset.i!==act){act=+b.dataset.i;mark()}});
inp.addEventListener('input',paint);inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();act=Math.min(items.length-1,act+1);mark()}else if(e.key==='ArrowUp'){e.preventDefault();act=Math.max(0,act-1);mark()}else if(e.key==='Enter'){e.preventDefault();run(act)}else if(e.key==='Escape'){e.preventDefault();close()}})}
inp.placeholder=T('Jump to a chapter, topic or action…','किसी अध्याय, टॉपिक या एक्शन पर जाएँ…');root.querySelector('.cp-f').textContent=T('↑↓ navigate · Enter open · Esc close','↑↓ चुनें · Enter खोलें · Esc बंद');root.hidden=false;inp.value='';paint();inp.focus()}
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();e.stopPropagation();root&&!root.hidden?close():open()}},true);
document.addEventListener('click',function(e){if(e.target.closest('[data-cpal]')){e.preventDefault();open()}});
}catch(err){console.error('palette',err)}})();
;

/* ===== script#hmn-js (line 48098 of original) ===== */
(function(){try{
var H=document.getElementById('home'),B=document.body,mn=document.getElementById('mn');if(!H||!mn)return;var root,bd;
function T(e,h){return B.classList.contains('hi')&&h?h:e}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function $i(i){return function(){return document.getElementById(i)}}
function ck(f){return function(){var e=f();e&&e.click()}}
function bt(t){return function(){return[].slice.call(H.querySelectorAll('button')).filter(function(b){return!b.closest('#pmfoot')&&!b.closest('#hmn')&&b.textContent.indexOf(t)>=0})[0]}}
function jump(id){return function(){var e=document.getElementById(id);e&&e.scrollIntoView({behavior:'smooth',block:'start'})}}
function hdr(ic){return function(){return[].slice.call(document.querySelectorAll('.hb button')).filter(function(b){return b.textContent.trim()===ic})[0]}}
function groups(){var p=H.querySelector('.hm-p'),pl=p?p.textContent.trim():T('Start Learning','सीखना शुरू करें');
var jm=[['🧭',T('Choose your path','अपना रास्ता चुनें'),'pm-paths'],['🗺️',T('Learning roadmap','लर्निंग रोडमैप'),'pm-road'],['📊',T('Your progress map','आपका प्रोग्रेस मैप'),'pm-prog'],['🎯',T('Practice and interview','प्रैक्टिस और इंटरव्यू'),'pm-prac'],['🔗',T('Links and footer','लिंक और फ़ूटर'),'pmfoot']].filter(function(x){return document.getElementById(x[2])}).map(function(x){return[x[0],x[1],jump(x[2])]});
return[[T('On this page','इस पेज पर'),jm],
[T('Browse','ब्राउज़ करें'),[['🧱','OOPs',ck($i('seg-oops'))],['📦','Collections',ck($i('seg-collections'))],['🧵','Threads',ck($i('seg-threads'))],['📘',T('Full Notes','पूरे नोट्स'),ck($i('seg-notes'))],['☕','JavaSquadz',ck($i('seg-jsq'))]]],
[T('Learn','सीखें'),[['▶',pl,ck(function(){return H.querySelector('.hm-p')})],['🎯',T('Mixed interview quiz','मिक्स्ड इंटरव्यू क्विज़'),ck(function(){return H.querySelector('[data-act=quiz]')})],['🔍',T('Search topics','टॉपिक खोजें'),ck(hdr('🔍'))],['⌘',T('Command palette','कमांड पैलेट'),function(){var e=document.createElement('i');e.dataset.cpal='';B.appendChild(e);e.click();e.remove()}]]],
[T('Your study data','आपका स्टडी डेटा'),[['⬇',T('Export backup','बैकअप एक्सपोर्ट'),ck(bt('Export backup'))],['⬆',T('Import backup','बैकअप इम्पोर्ट'),ck(bt('Import backup'))],['🖨',T('Print / PDF cheat sheet','प्रिंट / PDF चीट शीट'),ck(bt('Print'))]]],
[T('App','ऐप'),[['◐',T('Toggle theme','थीम बदलें'),ck($i('ft'))],['हि',T('Switch language','भाषा बदलें'),ck($i('hlg'))],['✨',T("What's new",'नया क्या है'),ck(function(){return H.querySelector('[data-wn]')})],['📲',T('Get the app','ऐप पाएँ'),ck(function(){return H.querySelector('[data-inst]')})]]],
[T('Project','प्रोजेक्ट'),[['↗','JavaSquadz repo','https://github.com/abhinavmaurya12/JavaSquadz'],['↗','GitHub · abhinavmaurya12','https://github.com/abhinavmaurya12'],['↗','JavaPath (React)','https://abhinavmaurya12.github.io/javapath-react/']]]]}
function close(){if(!root||root.hidden)return;root.classList.remove('on');document.documentElement.classList.remove('hmn-lock');mn.setAttribute('aria-expanded','false');setTimeout(function(){root.hidden=true},220)}
function open(){if(!root){root=document.createElement('div');root.id='hmn';root.hidden=true;root.innerHTML='<div class="hmn-bd"></div><aside class="hmn-p" role="dialog" aria-modal="true"><div class="hmn-h"><b>☕ Java Sutra</b><button type="button" class="hmn-x" aria-label="Close">✕</button></div><div class="hmn-b"></div></aside>';B.appendChild(root);
root.querySelector('.hmn-bd').onclick=close;root.querySelector('.hmn-x').onclick=close;
root.querySelector('.hmn-b').addEventListener('click',function(e){var b=e.target.closest('.hmn-i');if(!b)return;if(b.tagName==='A'){close();return}var f=b._f;close();f&&setTimeout(f,120)})}
var h='',i;groups().forEach(function(g){if(!g[1].length)return;h+='<div class="hmn-g">'+esc(g[0])+'</div>';g[1].forEach(function(x){h+=typeof x[2]==='string'?'<a class="hmn-i" href="'+x[2]+'" target="_blank" rel="noopener"><span>'+x[0]+'</span>'+esc(x[1])+'</a>':'<button type="button" class="hmn-i" data-k="'+(i=(i||0)+1)+'"><span>'+x[0]+'</span>'+esc(x[1])+'</button>'})});
var bx=root.querySelector('.hmn-b');bx.innerHTML=h;var k=0;groups().forEach(function(g){g[1].forEach(function(x){if(typeof x[2]!=='string'){k++;var el=bx.querySelector('[data-k="'+k+'"]');if(el)el._f=x[2]}})});
root.hidden=false;document.documentElement.classList.add('hmn-lock');mn.setAttribute('aria-expanded','true');requestAnimationFrame(function(){root.classList.add('on')})}
document.addEventListener('click',function(e){if(!e.target.closest('#mn')||!B.classList.contains('home'))return;e.stopImmediatePropagation();e.preventDefault();root&&!root.hidden?close():open()},true);
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
new MutationObserver(function(){if(!B.classList.contains('home'))close()}).observe(B,{attributes:true,attributeFilter:['class']});
}catch(err){console.error('home menu',err)}})();
;

/* ===== script#polish-js (line 48126 of original) ===== */
(function(){try{
var H=document.getElementById('home'),B=document.body,tm;if(!H)return;
function T(e,h){return B.classList.contains('hi')&&h?h:e}
function day(d){var z=new Date(d);return z.getFullYear()+'-'+('0'+(z.getMonth()+1)).slice(-2)+'-'+('0'+z.getDate()).slice(-2)}
function streak(){var v=[];try{v=JSON.parse(localStorage.getItem('jvis')||'[]')}catch(e){}var d=new Date();d.setHours(12,0,0,0);d=+d;var t=day(d);if(v.indexOf(t)<0){v.push(t);v=v.slice(-90);try{localStorage.setItem('jvis',JSON.stringify(v))}catch(e){}}var n=0;while(v.indexOf(day(d))>=0){n++;d-=864e5}return n}
var S=streak(),calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function cu(b){var raw=b.textContent,v=+raw.replace(/,/g,'');if(!(v>0))return;var t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/900);b.textContent=k<1?Math.round(v*(1-Math.pow(1-k,3))).toLocaleString():raw;if(k<1)requestAnimationFrame(f)})(t0)}
function polish(){var h=H.querySelector('.hm-hero');if(!h)return;
if(!h.querySelector('.pm-aur'))h.insertAdjacentHTML('afterbegin','<i class="pm-aur"></i><i class="pm-aur b"></i>');
if(S>=2&&!h.querySelector('.pm-streak')){var c=h.querySelector('.pm-sugg')||h.querySelector('.hm-cta');c&&c.insertAdjacentHTML('afterend','<div class="pm-streak">🔥 '+S+T('-day streak: you opened Java Sutra '+S+' days in a row','-दिन की स्ट्रीक: आपने लगातार '+S+' दिन Java Sutra खोला')+'</div>')}
if(!calm&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);cu(e.target)}})});[].forEach.call(H.querySelectorAll('.hm-st b:not([data-cu])'),function(b){b.dataset.cu=1;io.observe(b)})}}
H.addEventListener('pointermove',function(e){var c=e.target.closest('.pm-card,.pm-stage,.hm-st,.hm-card');if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(polish,120)}).observe(H,{childList:true});setTimeout(polish,450);
}catch(err){console.error('polish',err)}})();
;

/* ===== script#ux-js (line 48140 of original) ===== */
(function(){try{var B=document.body;if(!document.getElementById('ux-amb')){var a=document.createElement('div');a.id='ux-amb';a.setAttribute('aria-hidden','true');a.innerHTML='<i></i><i></i>';B.insertBefore(a,B.firstChild)}
function bn(){if(document.querySelector('.ux-bn'))return;var c=[].slice.call(document.querySelectorAll('nav,div,footer')).filter(function(e){if(e.querySelectorAll('button').length!==5||getComputedStyle(e).position!=='fixed')return false;var r=e.getBoundingClientRect();return r.bottom>=innerHeight-2&&r.width>0});if(c[0])c[0].classList.add('ux-bn')}
bn();addEventListener('resize',bn);setTimeout(bn,800)}catch(e){console.error('ux',e)}})();
;

/* ===== script#rdx-js (line 48143 of original) ===== */
(function(){try{
var B=document.body,synth=window.speechSynthesis,tok=0,on=false,cur=null;
function mode(){return B.classList.contains('home')?'home':B.classList.contains('jsq')?'jsq':''}
function btn(){return document.getElementById('rl')}
function clean(el){var c=el.cloneNode(true);c.querySelectorAll('*').forEach(function(x){if(/^(H[1-6])$/.test(x.tagName)||/(^|\s)(js-h|hm-h)(\s|$)/.test(x.className+''))x.append('. ');else if(!/^(EM|CODE|I|MARK|SUP|SUB)$/.test(x.tagName))x.append(' ')});c.querySelectorAll('pre,table,script,style,input,svg,.pm-aur,.pm-n,.pm-ic,.pm-jump,.pm-sr,.hm-bar,.pm-more,.pm-chip em,button:not(.pm-chip)').forEach(function(x){x.remove()});return c.textContent.replace(/[›↗→▶]/g,' ').replace(/\s+/g,' ').trim()}
function chunks(t){var out=[],re=/[^.!?।]+[.!?।]*\s*/g,m,buf='';while((m=re.exec(t))){if((buf+m[0]).length>180){if(buf)out.push(buf);buf=m[0]}else buf+=m[0]}if(buf)out.push(buf);return out}
function units(m){var u=[];if(m==='home'){var H=document.getElementById('home');if(!H)return u;[].forEach.call(H.querySelectorAll('.hm-hero,.hm-stats,.hm-row,#prem section.pm'),function(e){if(e.offsetParent!==null)u.push([e])})}
else{var J=document.getElementById('jsq');if(!J)return u;var g=[];[].forEach.call(J.children,function(e){if(e.offsetParent===null)return;if(e.classList.contains('js-h')){if(g.length)u.push(g);g=[e]}else g.push(e)});if(g.length)u.push(g)}
return u}
function pick(L){for(var i=0;i<L.length;i++){if(L[i][0].getBoundingClientRect().bottom>120)return i}return 0}
function stop(){on=false;tok++;try{synth&&synth.cancel()}catch(e){}if(cur)cur.forEach(function(x){x.classList.remove('rdnow')});cur=null;var r=btn();if(r){r.textContent='🔊 Listen';r.classList.remove('on')}}
function run(L,i,t){if(t!==tok)return;if(i>=L.length)return stop();cur=L[i];cur.forEach(function(x){x.classList.add('rdnow')});cur[0].scrollIntoView({behavior:'smooth',block:'start'});
var q=chunks(cur.map(clean).join('. ')),k=0;(function nx(){if(t!==tok)return;if(k>=q.length){cur.forEach(function(x){x.classList.remove('rdnow')});return run(L,i+1,t)}
var u=new SpeechSynthesisUtterance(q[k++]);u.lang=B.classList.contains('hi')?'hi-IN':'en-US';u.rate=.98;u.onend=nx;u.onerror=function(ev){if(ev&&(ev.error==='interrupted'||ev.error==='canceled'))return;stop()};synth.speak(u)})()}
document.addEventListener('click',function(e){var b=e.target.closest('#rl');if(!b||!mode())return;e.stopImmediatePropagation();e.preventDefault();
if(on){stop();return}if(!synth){b.textContent='No voice';return}
var L=units(mode());if(!L.length)return;on=true;tok++;b.textContent='⏸ Stop';b.classList.add('on');synth.cancel();run(L.slice(pick(L)),0,tok)},true);
new MutationObserver(function(){if(on&&(!B.classList.contains('rd')||!mode()))stop()}).observe(B,{attributes:true,attributeFilter:['class']});
addEventListener('pagehide',stop);
}catch(err){console.error('reader ext',err)}})();
;

/* ===== script#cloud-cfg (line 48164 of original) ===== */
/* Cross-device accounts: paste your Supabase Project URL and anon public key between the quotes (see java-sutra-supabase-setup.sql). Leave empty to keep accounts on this browser only. */
window.JS_CLOUD={url:"",key:""};
;

/* ===== script#auth-js (line 48166 of original) ===== */
(function(){try{
var B=document.body,KEYS=['jbm','jnotes','jdone','jlast','jrecent','jvis','jpos','jplbest'],FREE=10,root;
var CFG=window.JS_CLOUD||{},SB=String(CFG.url||'').replace(/\/+$/,''),CLOUD=!!(SB&&CFG.key);
function L(e,h){return B.classList.contains('hi')&&h?h:e}
function noop(){}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function J(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}}
function W(k,v){try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch(e){}}
function hex(b){return[].map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2)}).join('')}
function rnd(n){var a=new Uint8Array(n);try{crypto.getRandomValues(a)}catch(e){for(var i=0;i<n;i++)a[i]=Math.random()*256}return hex(a)}
function hash(pw,salt){var enc=new TextEncoder();if(window.crypto&&crypto.subtle)return crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveBits']).then(function(k){return crypto.subtle.deriveBits({name:'PBKDF2',salt:enc.encode(salt),iterations:120000,hash:'SHA-256'},k,256)}).then(hex);var h=5381,t=salt+pw;for(var i=0;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0;return Promise.resolve('w'+(h>>>0).toString(16))}
function snapObj(){var o={};KEYS.forEach(function(k){var v=localStorage.getItem(k);if(v!==null)o[k]=v});return o}
function applyObj(o){KEYS.forEach(function(k){localStorage.removeItem(k)});for(var k in o){if(KEYS.indexOf(k)>=0&&typeof o[k]==='string')localStorage.setItem(k,o[k])}}
function norm(o){o=o||{};return JSON.stringify(Object.keys(o).sort().map(function(k){return[k,o[k]]}))}
function statsOf(o){function P(k,d){try{return JSON.parse(o[k]||d)}catch(e){return JSON.parse(d)}}return{done:P('jdone','[]').length,bm:P('jbm','[]'),nt:P('jnotes','{}'),last:o.jlast||'',rec:P('jrecent','[]'),o:o}}
function fd(t){return t?new Date(t).toLocaleString():'-'}

/* ================= LOCAL ADAPTER (this browser only) ================= */
var LA={
users:function(){return J('jusers','[]')},
sid:function(){return localStorage.getItem('jsess')||''},
me:function(){var i=LA.sid();return LA.users().filter(function(u){return u.id===i})[0]||null},
snap:function(id){W('judata:'+id,snapObj())},
data:function(id){if(id===LA.sid())LA.snap(id);return J('judata:'+id,'{}')},
signup:function(nm,em,pw){var us=LA.users();if(us.some(function(u){return u.email===em}))return Promise.reject(new Error('An account with this email already exists.'));var salt=rnd(12);return hash(pw,salt).then(function(h){var u={id:'u'+Date.now().toString(36)+rnd(2),name:nm,email:em,salt:salt,hash:h,role:us.length?'user':'admin',created:Date.now(),last:Date.now()};us.push(u);W('jusers',us);LA.snap(u.id);localStorage.setItem('jsess',u.id);return{ok:1}})},
login:function(em,pw){var us=LA.users(),u=us.filter(function(x){return x.email===em})[0],bad=new Error('Incorrect email or password.');if(!u)return Promise.reject(bad);return hash(pw,u.salt).then(function(h){if(h!==u.hash)throw bad;u.last=Date.now();W('jusers',us);applyObj(J('judata:'+u.id,'{}'));localStorage.setItem('jsess',u.id);return{ok:1}})},
logout:function(){var u=LA.me();if(u)LA.snap(u.id);applyObj({});localStorage.removeItem('jsess');return Promise.resolve()},
rename:function(n){var u=LA.me(),us=LA.users();us.forEach(function(x){if(x.id===u.id)x.name=n});W('jusers',us);return Promise.resolve()},
remove:function(){var u=LA.me();W('jusers',LA.users().filter(function(x){return x.id!==u.id}));localStorage.removeItem('judata:'+u.id);applyObj({});localStorage.removeItem('jsess');return Promise.resolve()},
list:function(){return Promise.resolve(LA.users().map(function(u){return{id:u.id,name:u.name,email:u.email,role:u.role,created:u.created,last:u.last,o:LA.data(u.id)}}))},
setRole:function(id,role){var us=LA.users(),t=us.filter(function(x){return x.id===id})[0];if(!t)return Promise.reject(new Error('User not found.'));if(role!=='admin'&&t.role==='admin'&&us.filter(function(x){return x.role==='admin'}).length<2)return Promise.reject(new Error('There must be at least one admin.'));t.role=role;W('jusers',us);return Promise.resolve()},
removeUser:function(id){W('jusers',LA.users().filter(function(x){return x.id!==id}));localStorage.removeItem('judata:'+id);return Promise.resolve()},
tick:function(){var u=LA.me();u&&LA.snap(u.id)},
beacon:function(){LA.tick()}
};

/* ================= CLOUD ADAPTER (Supabase: works on every device) ================= */
var CS={get:function(){return J('jcloud','null')},set:function(s){W('jcloud',s)},clear:function(){localStorage.removeItem('jcloud');localStorage.removeItem('jcme');localStorage.removeItem('jsrv')}};
var lastPushed='',refreshing=null;
function friendly(r,j){var m=(j&&(j.error_description||j.msg||j.message||j.error))||'';var l=String(m).toLowerCase();
if(l.indexOf('invalid login')>=0)return'Incorrect email or password.';
if(l.indexOf('not confirmed')>=0)return'Please confirm your email first. Check your inbox for the link.';
if(l.indexOf('already registered')>=0||l.indexOf('already been registered')>=0)return'An account with this email already exists.';
if(r.status===429||l.indexOf('rate limit')>=0)return'Too many attempts. Please wait a minute and try again.';
return m||('Request failed ('+r.status+')')}
function raw(path,opt,tok){opt=opt||{};var h={'apikey':CFG.key,'Content-Type':'application/json','Authorization':'Bearer '+(tok||CFG.key)};for(var k in (opt.headers||{}))h[k]=opt.headers[k];
return fetch(SB+path,{method:opt.method||'GET',headers:h,body:opt.body!==undefined?JSON.stringify(opt.body):undefined,keepalive:!!opt.keepalive}).then(function(r){return r.text().then(function(t){var j=null;try{j=t?JSON.parse(t):null}catch(e){}if(!r.ok){var e=new Error(friendly(r,j));e.status=r.status;throw e}return j})},function(){throw new Error('Cannot reach the server. Check your internet connection.')})}
function sess(j){var old=CS.get()||{},s={at:j.access_token,rt:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000,uid:(j.user&&j.user.id)||old.uid};CS.set(s);return s}
function token(){var s=CS.get();if(!s)return Promise.reject(new Error('Not logged in.'));if(Date.now()<s.exp-60000)return Promise.resolve(s.at);if(refreshing)return refreshing;
refreshing=raw('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:s.rt}}).then(function(j){refreshing=null;return sess(j).at},function(e){refreshing=null;if(e.status===400||e.status===401||e.status===403)CS.clear();throw e});return refreshing}
function rest(path,opt){return token().then(function(t){return raw(path,opt,t)})}
function cacheMe(r){W('jcme',{id:r.id,name:r.name,email:r.email,role:r.role,created:Date.parse(r.created_at)||0,last:Date.parse(r.last_login)||0})}
function mapRow(r){return{id:r.id,name:r.name,email:r.email,role:r.role,created:Date.parse(r.created_at)||0,last:Date.parse(r.last_login)||0,o:r.data||{}}}
var CA={
me:function(){return CS.get()?J('jcme','null'):null},
profile:function(){var s=CS.get();if(!s)return Promise.resolve(null);return rest('/rest/v1/profiles?select=*&id=eq.'+encodeURIComponent(s.uid)).then(function(a){var r=a&&a[0];if(!r)throw new Error('Profile not found. Run the SQL setup file in Supabase first.');cacheMe(r);return r})},
pushNow:function(force){var s=CS.get(),u=CA.me();if(!s||!u)return Promise.resolve();var o=snapObj(),n=norm(o);if(!force&&n===lastPushed)return Promise.resolve();
return rest('/rest/v1/profiles?id=eq.'+encodeURIComponent(u.id)+'&select=updated_at',{method:'PATCH',headers:{Prefer:'return=representation'},body:{data:o}}).then(function(a){lastPushed=n;if(a&&a[0])localStorage.setItem('jsrv',a[0].updated_at||'')})},
beacon:function(){var s=CS.get(),u=CA.me();if(!s||!u||Date.now()>s.exp)return;var o=snapObj();if(norm(o)===lastPushed)return;try{fetch(SB+'/rest/v1/profiles?id=eq.'+encodeURIComponent(u.id),{method:'PATCH',keepalive:true,headers:{'apikey':CFG.key,'Authorization':'Bearer '+s.at,'Content-Type':'application/json'},body:JSON.stringify({data:o})}).catch(noop)}catch(e){}},
tick:function(){CA.pushNow().catch(noop)},
signup:function(nm,em,pw){return raw('/auth/v1/signup',{method:'POST',body:{email:em,password:pw,data:{name:nm}}}).then(function(j){if(j&&j.access_token){sess(j);return CA.profile().then(function(){return CA.pushNow(true)}).then(function(){return{ok:1}})}return{pending:1}})},
login:function(em,pw){return raw('/auth/v1/token?grant_type=password',{method:'POST',body:{email:em,password:pw}}).then(function(j){sess(j);return CA.profile()}).then(function(r){var rd=r.data||{},p;if(Object.keys(rd).length){applyObj(rd);localStorage.setItem('jsrv',r.updated_at||'');lastPushed=norm(rd);p=Promise.resolve()}else p=CA.pushNow(true);return p.then(function(){return rest('/rest/v1/profiles?id=eq.'+encodeURIComponent(r.id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:{last_login:new Date().toISOString()}}).catch(noop)}).then(function(){return{ok:1}})})},
logout:function(){var s=CS.get();var p=Promise.race([CA.pushNow().catch(noop),new Promise(function(r){setTimeout(r,1800)})]);return p.then(function(){if(s)raw('/auth/v1/logout',{method:'POST',keepalive:true},s.at).catch(noop);CS.clear();applyObj({})})},
rename:function(n){var u=CA.me();return rest('/rest/v1/profiles?id=eq.'+encodeURIComponent(u.id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:{name:n}}).then(function(){u.name=n;W('jcme',u)})},
remove:function(){return rest('/rest/v1/rpc/delete_me',{method:'POST',body:{}}).then(function(){CS.clear();applyObj({})})},
list:function(){return rest('/rest/v1/profiles?select=*&order=created_at.asc').then(function(a){return(a||[]).map(mapRow)})},
setRole:function(id,role){return rest('/rest/v1/rpc/admin_set_role',{method:'POST',body:{uid:id,new_role:role}})},
removeUser:function(id){return rest('/rest/v1/rpc/admin_delete_user',{method:'POST',body:{uid:id}})},
forgot:function(em){return raw('/auth/v1/recover',{method:'POST',body:{email:em}})}
};
var A=CLOUD?CA:LA;

/* ---- modal helpers ---- */
function close(){root&&root.remove();root=null}
function modal(h,wide){close();root=document.createElement('div');root.id='ukm';root.innerHTML='<div class="uk-bd"></div><div class="uk-p'+(wide?' wide':'')+'" role="dialog" aria-modal="true"><button class="uk-x" aria-label="Close">✕</button>'+h+'</div>';B.appendChild(root);root.querySelector('.uk-bd').onclick=close;root.querySelector('.uk-x').onclick=close;return root}
addEventListener('keydown',function(e){if(e.key==='Escape')close()});
function err(m,ok){var e=document.getElementById('uker');if(e){e.textContent=m;e.style.color=ok?'var(--ok,#2b8a3e)':''}}
function say(h,btn){modal('<h3>'+h[0]+'</h3><p class="uk-sub">'+h[1]+'</p>'+(btn?'<div class="uk-row"><button class="uk-go" data-u="login">Log in</button></div>':''))}

/* ---- login / signup ---- */
function authUI(mode){var su=mode==='signup',first=!CLOUD&&LA.users().length===0;
var note=CLOUD?L('Your account and progress sync across all your devices.','आपका अकाउंट और प्रोग्रेस सभी डिवाइस पर सिंक होता है।'):(su&&first?'The first account created on this device becomes the admin. ':'')+'Accounts and progress are stored in this browser only.';
var r=modal('<h3>'+(su?L('Create your account','अपना अकाउंट बनाएँ'):L('Welcome back','वापस स्वागत है'))+'</h3><div class="uk-tabs"><button data-t="login" class="'+(su?'':'on')+'">'+L('Log in','लॉग इन')+'</button><button data-t="signup" class="'+(su?'on':'')+'">'+L('Sign up','साइन अप')+'</button></div><div class="uk-f">'+(su?'<label>'+L('Name','नाम')+'<input id="ukn" autocomplete="name" maxlength="40"></label>':'')+'<label>Email<input id="uke" type="email" autocomplete="email"></label><label>'+L('Password','पासवर्ड')+'<input id="ukp" type="password" autocomplete="'+(su?'new-password':'current-password')+'"></label><div class="uk-err" id="uker" role="alert"></div><button class="uk-go" id="ukgo">'+(su?L('Create account','अकाउंट बनाएँ'):L('Log in','लॉग इन'))+'</button>'+(CLOUD&&!su?'<button type="button" class="uk-del" id="ukfg" style="color:var(--muted);display:block;margin-top:8px">'+L('Forgot password?','पासवर्ड भूल गए?')+'</button>':'')+'</div><p class="uk-note">'+note+'</p>');
[].forEach.call(r.querySelectorAll('.uk-tabs button'),function(b){b.onclick=function(){authUI(b.dataset.t)}});
r.querySelector('#ukgo').onclick=function(){submit(su)};r.querySelector('.uk-f').addEventListener('keydown',function(e){if(e.key==='Enter')submit(su)});
var fg=r.querySelector('#ukfg');if(fg)fg.onclick=function(){var em=(document.getElementById('uke').value||'').trim().toLowerCase();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return err('Enter your email above first.');A.forgot(em).then(function(){err('Reset link sent. Check your inbox.',1)}).catch(function(e){err(e.message)})};
setTimeout(function(){var i=r.querySelector('input');i&&i.focus()},60)}
function submit(su){var em=(document.getElementById('uke').value||'').trim().toLowerCase(),pw=document.getElementById('ukp').value,nm=su?(document.getElementById('ukn').value||'').trim():'';
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return err('Enter a valid email address.');if(pw.length<6)return err('Password must be at least 6 characters.');if(su&&nm.length<2)return err('Enter your name.');
var go=document.getElementById('ukgo'),lb=go.textContent;go.disabled=true;go.textContent='Please wait…';err('');
(su?A.signup(nm,em,pw):A.login(em,pw)).then(function(r){if(r&&r.pending){say(['Check your email','We sent a confirmation link to <b>'+esc(em)+'</b>. Open it, then come back here and log in.'],1)}else location.reload()}).catch(function(e){if(!document.getElementById('ukgo'))return;go.disabled=false;go.textContent=lb;err(e&&e.message||'Something went wrong. Try again.')})}
function resetUI(at){var r=modal('<h3>Set a new password</h3><div class="uk-f"><label>New password<input id="ukp" type="password" autocomplete="new-password"></label><div class="uk-err" id="uker" role="alert"></div><button class="uk-go" id="ukgo">Update password</button></div>');
r.querySelector('#ukgo').onclick=function(){var pw=document.getElementById('ukp').value;if(pw.length<6)return err('Password must be at least 6 characters.');raw('/auth/v1/user',{method:'PUT',body:{password:pw}},at).then(function(){say(['Password updated','You can now log in with your new password.'],1)}).catch(function(e){err(e.message)})}}

/* ---- profile ---- */
function profile(){var u=A.me();if(!u)return authUI('login');var s=statsOf(snapObj());
var r=modal('<div class="uk-av">'+esc(u.name.charAt(0).toUpperCase())+'</div><h3>'+esc(u.name)+'</h3><p class="uk-sub">'+esc(u.email)+' · <span class="uk-badge">'+esc(u.role)+'</span></p><p class="uk-sub">'+(CLOUD?'☁ Synced across all your devices':'💾 Saved on this browser only')+'</p><div class="uk-grid"><div><b>'+s.done+'</b>topics learned</div><div><b>'+s.bm.length+'</b>bookmarks</div><div><b>'+Object.keys(s.nt).length+'</b>notes</div><div><b>'+(s.last||'-')+'</b>last chapter</div></div><p class="uk-sub">Member since '+esc(fd(u.created))+'</p><label class="uk-l">Display name<input id="ukn2" value="'+esc(u.name)+'" maxlength="40"></label><div class="uk-row"><button class="uk-go" data-a="save">Save name</button>'+(u.role==='admin'?'<button class="uk-go alt" data-a="admin">Admin panel</button>':'')+'<button class="uk-go alt" data-a="out">Log out</button></div><button class="uk-del" data-a="del">Delete my account</button>');
r.onclick=function(e){var a=e.target.closest('[data-a]');if(!a)return;a=a.dataset.a;
if(a==='out')A.logout().then(function(){location.reload()});
else if(a==='admin')adminUI();
else if(a==='save'){var n=(document.getElementById('ukn2').value||'').trim();if(n.length<2)return;A.rename(n).then(function(){hdr();profile()}).catch(function(e){alert(e.message)})}
else if(a==='del'&&confirm('Delete your account and all saved progress? This cannot be undone.')){A.remove().then(function(){location.reload()}).catch(function(e){alert(e.message)})}}}

/* ---- admin ---- */
function adminUI(){var u=A.me();if(!u||u.role!=='admin')return;var ld=modal('<h3>Admin panel</h3><p class="uk-note">Loading users…</p>',true);
A.list().then(function(rows){if(root!==ld)return;drawAdmin(rows)}).catch(function(e){if(root!==ld)return;modal('<h3>Admin panel</h3><p class="uk-note warn">'+esc(e.message)+'</p>')})}
function drawAdmin(rows){var u=A.me(),tot=0,nts=0;rows.forEach(function(x){if(x.id===u.id)x.o=snapObj();x.s=statsOf(x.o||{});tot+=x.s.done;nts+=Object.keys(x.s.nt).length});
var h='<h3>Admin panel</h3><p class="uk-note warn">'+(CLOUD?'Live data from the cloud database, all devices. Passwords are never visible.':'Shows accounts stored in <b>this browser only</b>. Passwords are never shown or exported.')+'</p><div class="uk-grid"><div><b>'+rows.length+'</b>users</div><div><b>'+rows.filter(function(x){return x.role==='admin'}).length+'</b>admins</div><div><b>'+tot+'</b>topics learned (all)</div><div><b>'+nts+'</b>notes (all)</div></div><div class="uk-row"><button class="uk-go" data-a="exp">Export all user data</button></div><div class="uk-tw"><table class="uk-t"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Last login</th><th>Learned</th><th>Bkmk</th><th>Notes</th><th></th></tr></thead><tbody>'+
rows.map(function(x){var self=x.id===u.id;return'<tr data-id="'+esc(x.id)+'"><td>'+esc(x.name)+(self?' (you)':'')+'</td><td>'+esc(x.email)+'</td><td>'+esc(x.role)+'</td><td>'+esc(fd(x.created))+'</td><td>'+esc(fd(x.last))+'</td><td>'+x.s.done+'</td><td>'+x.s.bm.length+'</td><td>'+Object.keys(x.s.nt).length+'</td><td class="uk-ac"><button data-a="view">View</button>'+(self?'':'<button data-a="role">'+(x.role==='admin'?'Make user':'Make admin')+'</button><button data-a="rm">Delete</button>')+'</td></tr><tr class="uk-dt" hidden><td colspan="9"></td></tr>'}).join('')+'</tbody></table></div>';
var r=modal(h,true);r.onclick=function(e){var a=e.target.closest('[data-a]');if(!a)return;var tr=a.closest('tr'),id=tr&&tr.dataset.id,k=a.dataset.a,row=rows.filter(function(x){return x.id===id})[0];
if(k==='exp'){var o={exported:new Date().toISOString(),note:'Passwords and API keys excluded.',users:rows.map(function(x){return{id:x.id,name:x.name,email:x.email,role:x.role,created:x.created,last:x.last,data:x.o}})},bl=new Blob([JSON.stringify(o,null,1)],{type:'application/json'}),l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download='java-sutra-users-'+new Date().toISOString().slice(0,10)+'.json';B.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(l.href);l.remove()},1500)}
else if(k==='view'&&row){var d=tr.nextElementSibling,s=row.s;if(!d.hidden){d.hidden=true;return}d.hidden=false;d.firstChild.innerHTML='<b>Last chapter:</b> '+esc(s.last||'-')+' · <b>Recent:</b> '+esc(s.rec.join(', ')||'-')+'<br><b>Bookmarks:</b> '+(s.bm.map(function(b){return esc(b.t)}).join('; ')||'-')+'<br><b>Notes:</b> '+(Object.keys(s.nt).map(function(n){return esc((s.nt[n].t||n)+': '+String(s.nt[n].tx||'').slice(0,160))}).join(' | ')||'-')}
else if(k==='role'&&row){A.setRole(id,row.role==='admin'?'user':'admin').then(adminUI).catch(function(e){alert(e.message)})}
else if(k==='rm'&&confirm('Delete this user and their saved data?')){A.removeUser(id).then(adminUI).catch(function(e){alert(e.message)})}}}

/* ---- header button ---- */
function hdr(){var hb=document.querySelector('.hb');if(!hb)return;var u=A.me(),b=document.getElementById('uacct');if(!b){b=document.createElement('button');b.id='uacct';b.type='button';hb.insertBefore(b,hb.firstChild)}b.className=u?'in':'';b.title=u?u.name:'Log in';b.setAttribute('aria-label',b.title);b.innerHTML=u?'<span>'+esc(u.name.charAt(0).toUpperCase())+'</span>':'👤';b.onclick=function(){A.me()?profile():authUI('login')}}

/* ---- quick-reference tabs (OOPs, Collections, Threads): first 40% of topics open, the rest need a login ---- */
function nL(n){return Math.round(n*.6)}
function tpanel(n,t){return'<div class="uk-lock"><div class="uk-li">🔒</div><div><b>'+L(n+' more topics are locked','आगे के '+n+' टॉपिक लॉक हैं')+'</b><p>'+L('You are viewing the first '+(t-n)+' of '+t+' topics. Log in or create a free account to unlock the rest.','आप '+t+' में से पहले '+(t-n)+' टॉपिक देख रहे हैं। बाकी खोलने के लिए लॉग इन करें या मुफ़्त अकाउंट बनाएँ।')+'</p><div class="uk-row"><button class="uk-go" data-u="login">'+L('Log in','लॉग इन')+'</button><button class="uk-go alt" data-u="signup">'+L('Create account','अकाउंट बनाएँ')+'</button></div></div></div>'}
function lockParts(){if(A.me())return;['part-oops','part-collections','part-threads'].forEach(function(id){var p=document.getElementById(id);if(!p||p.dataset.lk)return;p.dataset.lk='1';var ss=[].slice.call(p.querySelectorAll(':scope > section'));if(ss.length<2)return;var X=ss.slice(ss.length-nL(ss.length));X[0].insertAdjacentHTML('beforebegin',tpanel(X.length,ss.length));X.forEach(function(s){[].forEach.call(document.querySelectorAll('a[href="#'+s.id+'"]'),function(l){l.classList.add('lk');l.dataset.u='login'});s.remove()})})}
/* ---- chapter lock: chapters 1-FREE are open, the rest need a login ---- */
function chNum(a){var e=a.querySelector('.eyebrow'),m=e&&/(\d+)/.exec(e.textContent);if(m)return+m[1];var h=a.querySelector('h3[id]');m=h&&/^b(\d+)-/.exec(h.id);return m?+m[1]:0}
function gate(n){var tot=document.querySelectorAll('template[id^="tpl-b"]').length||31;return'<div class="uk-lock uk-gate"><div class="uk-li">🔒</div><div><b>'+L('Chapter '+n+' is locked','अध्याय '+n+' लॉक है')+'</b><p>'+L('Chapters 1 to '+FREE+' are free for everyone. Log in or create a free account to unlock all '+tot+' chapters'+(CLOUD?' and keep your progress on every device.':'.'),'अध्याय 1 से '+FREE+' सबके लिए मुफ़्त हैं। सभी '+tot+' अध्याय खोलने के लिए लॉग इन करें या मुफ़्त अकाउंट बनाएँ'+(CLOUD?' और अपनी प्रोग्रेस हर डिवाइस पर पाएँ।':'।'))+'</p><div class="uk-row"><button class="uk-go" data-u="login">'+L('Log in','लॉग इन')+'</button><button class="uk-go alt" data-u="signup">'+L('Create account','अकाउंट बनाएँ')+'</button></div></div></div>'}
function lockArticle(a){if(a.dataset.lk||A.me())return;var n=chNum(a);if(!n||n<=FREE){a.dataset.lk='0';return}a.dataset.lk='1';
[].slice.call(a.children).forEach(function(c){if(!c.classList.contains('part-head')&&!c.classList.contains('part-pager'))c.remove()});
var g=document.createElement('div');g.innerHTML=gate(n);var hd=a.querySelector('.part-head');if(hd)hd.after(g.firstChild);else a.insertBefore(g.firstChild,a.firstChild)}
function marks(){[].forEach.call(document.querySelectorAll('#nav a[data-n]:not(.lk)'),function(a){if(+a.dataset.n>FREE)a.classList.add('lk')});[].forEach.call(document.querySelectorAll('.pm-chip[data-ch]:not(.lk)'),function(c){if(+c.dataset.ch>FREE)c.classList.add('lk')})}
function sweep(){if(A.me())return;[].forEach.call(document.querySelectorAll('article.book:not([data-lk])'),lockArticle);marks()}
document.addEventListener('click',function(e){var b=e.target.closest('[data-u]');if(b){e.preventDefault();e.stopPropagation();authUI(b.dataset.u)}},true);

/* ---- cloud boot: session check, pull from other devices, password-reset link ---- */
function boot(){if(!CS.get())return;CA.profile().then(function(r){hdr();var rd=r.data||{},ls=norm(snapObj()),rs=norm(rd);if(rs===ls){lastPushed=ls;localStorage.setItem('jsrv',r.updated_at||'');return}
if(Object.keys(rd).length&&r.updated_at!==localStorage.getItem('jsrv')&&!sessionStorage.getItem('jpulled')){sessionStorage.setItem('jpulled','1');applyObj(rd);localStorage.setItem('jsrv',r.updated_at||'');location.reload()}}).catch(function(){if(!CS.get()){applyObj({});location.reload()}})}
function recovery(){var h=location.hash||'';if(h.indexOf('type=recovery')<0||h.indexOf('access_token=')<0)return;var p=new URLSearchParams(h.replace(/^#/,'')),at=p.get('access_token');try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}if(at)resetUI(at)}

hdr();lockParts();sweep();new MutationObserver(sweep).observe(B,{childList:true,subtree:true});
if(CLOUD){boot();recovery()}
setInterval(function(){A.tick()},15000);addEventListener('pagehide',function(){A.beacon()});
}catch(err){console.error('auth',err)}})();
;

/* ===== script#jed-js (line 48390 of original) ===== */
(function(){try{
var B=document.body,$=function(s){return document.getElementById(s)};
var root=$('jed'),ta=$('jd-ta'),gut=$('jd-g'),out=$('jd-out'),tag=$('jd-tag'),ttl=$('jd-title'),fileIn=$('jd-file'),colIn=$('jd-col');
if(!root||!ta)return;
var NAME='Java Editor',fname='',dirty=false,KEY='jed-draft';
var MENUS=[
['File',[['New','Ctrl+N'],['Open…','Ctrl+O'],['Save','Ctrl+S'],['Save As…'],'-',['Print…'],'-',['Exit']]],
['Edit',[['Cut','Ctrl+X'],['Copy','Ctrl+C'],['Paste','Ctrl+V'],['Delete'],'-',['Select All','Ctrl+A'],['Time & Date']]],
['Format',[['Color']]],
['Run',[['Compile'],['Run'],'-',['Run server…']]],
['Help',[['About Editor']]]];
var mh='';
MENUS.forEach(function(m){mh+='<div class="jd-m"><button class="jd-mb" type="button">'+m[0]+'</button><div class="jd-dd">'+m[1].map(function(i){return i==='-'?'<hr>':'<button type="button" data-c="'+i[0].replace('…','')+'">'+i[0]+(i[1]?'<kbd>'+i[1]+'</kbd>':'')+'</button>'}).join('')+'</div></div>'});
$('jd-menus').innerHTML=mh;
function title(){ttl.textContent=NAME+' : '+(fname||'Untitled')+(dirty?' *':'')}
function lines(){var n=ta.value.split('\n').length,s='';for(var i=1;i<=n;i++)s+=i+'\n';gut.textContent=s.slice(0,-1)}
function changed(){dirty=true;title();lines();try{localStorage.setItem(KEY,ta.value)}catch(e){}}
function setCode(t,name){ta.value=t;fname=name||'';dirty=false;title();lines();ta.scrollTop=0;try{localStorage.setItem(KEY,t)}catch(e){}}
function say(t,kind,lab){out.textContent=t;tag.hidden=!lab;if(lab){tag.textContent=lab;tag.className='jd-tag'+(kind?' '+kind:'')}}
function cls(){var m=/public\s+(?:final\s+|abstract\s+)?(?:class|interface|enum|record)\s+([A-Za-z_$][\w$]*)/.exec(ta.value)||/(?:class|interface|enum|record)\s+([A-Za-z_$][\w$]*)/.exec(ta.value);return m?m[1]:'Main'}
function template(n){return 'import java.lang.*;\n\npublic class '+n+'\n{\n\tpublic static void main(String[] args)\n\t{\n\t\t\n\t}\n}\n'}
function confirmLose(){return !dirty||confirm('Text has been changed.\nDiscard your changes?')}
function insert(t){var s=ta.selectionStart,e=ta.selectionEnd;ta.setRangeText(t,s,e,'end');changed();ta.focus()}
function download(name,text){var a=document.createElement('a'),u=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove()},500)}
function fileName(){var n=cls()+'.java';return n}
var A={
New:function(){if(!confirmLose())return;var n=prompt('Please enter the class name','HelloWorld');if(n===null)return;n=n.trim().replace(/[^\w$]/g,'');if(!n||/^\d/.test(n))n='Main';setCode(template(n),'');say('New class '+n+' created.')},
Open:function(){if(!confirmLose())return;fileIn.value='';fileIn.click()},
Save:function(){var n=fname||fileName();download(n,ta.value);fname=n;dirty=false;title();say('File has been saved now ('+n+').')},
'Save As':function(){var n=prompt('Save as file name',fname||fileName());if(!n)return;n=n.trim();if(!/\.[A-Za-z0-9]+$/.test(n))n+='.java';download(n,ta.value);fname=n;dirty=false;title();say('File has been saved now ('+n+').')},
Print:function(){var d=document.createElement('div');d.id='jed-print';d.style.cssText='position:absolute;left:0;top:0;width:100%;background:#fff;color:#000;z-index:-1';var p=document.createElement('pre');p.style.cssText='font:12px/1.4 monospace;white-space:pre-wrap;margin:0';p.textContent=ta.value;d.appendChild(p);document.body.appendChild(d);root.style.display='none';setTimeout(function(){window.print();setTimeout(function(){d.remove();root.style.display=''},300)},50)},
Exit:function(){if(!confirmLose())return;close()},
Cut:function(){ta.focus();if(ta.selectionStart===ta.selectionEnd)return;document.execCommand('cut');changed()},
Copy:function(){ta.focus();if(ta.selectionStart===ta.selectionEnd)return;if(!document.execCommand('copy')&&navigator.clipboard)navigator.clipboard.writeText(ta.value.slice(ta.selectionStart,ta.selectionEnd))},
Paste:function(){ta.focus();if(navigator.clipboard&&navigator.clipboard.readText)navigator.clipboard.readText().then(insert,function(){say('Paste was blocked by the browser. Press Ctrl+V instead.')});else say('Press Ctrl+V to paste.')},
Delete:function(){ta.focus();if(ta.selectionStart===ta.selectionEnd)return;ta.setRangeText('',ta.selectionStart,ta.selectionEnd,'end');changed()},
'Select All':function(){ta.focus();ta.select()},
'Time & Date':function(){insert(new Date().toString())},
Color:function(){colIn.click()},
Compile:function(){compile()},'Run server':function(){setServer()},
Run:function(){run()},
'About Editor':function(){alert('Java Editor, a web version of Editor2015.\nWrite Java, save it, and press Compile or Run.\nCompile and Run send your code to an online Java compiler (Judge0), so you need an internet connection.')}
};
colIn.addEventListener('input',function(){ta.style.setProperty('--jd-fg',colIn.value);ta.style.color=colIn.value;out.style.color=colIn.value});
fileIn.addEventListener('change',function(){var f=fileIn.files&&fileIn.files[0];if(!f)return;var r=new FileReader();r.onload=function(){setCode(String(r.result).replace(/\r\n/g,'\n'),f.name);say('Opened '+f.name+'.')};r.readAsText(f)});
/* menus */
var menus=[].slice.call(root.querySelectorAll('.jd-m'));
function closeMenus(){menus.forEach(function(m){m.classList.remove('open')})}
menus.forEach(function(m){var b=m.querySelector('.jd-mb'),d=m.querySelector('.jd-dd');b.addEventListener('click',function(e){e.stopPropagation();var was=m.classList.contains('open');closeMenus();if(!was){m.classList.add('open');var r=b.getBoundingClientRect();d.style.top=r.bottom+4+'px';d.style.left=Math.max(6,Math.min(r.left,innerWidth-d.offsetWidth-6))+'px'}});
d.addEventListener('click',function(e){var x=e.target.closest('button[data-c]');if(!x)return;e.stopPropagation();closeMenus();var c=x.getAttribute('data-c');if(A[c])A[c]()})});
root.addEventListener('click',function(e){if(!e.target.closest('.jd-m'))closeMenus()});
$('jd-new').onclick=A.New;$('jd-compile').onclick=function(){compile()};$('jd-run').onclick=function(){run()};
$('jd-clr').onclick=function(){say('')};
$('jd-close').onclick=A.Exit;
/* editor behaviour */
ta.addEventListener('input',changed);
ta.addEventListener('scroll',function(){gut.scrollTop=ta.scrollTop});
ta.addEventListener('keydown',function(e){
if(e.key==='Tab'){e.preventDefault();var s=ta.selectionStart;ta.setRangeText('    ',s,ta.selectionEnd,'end');changed();return}
if(e.key==='Enter'){var s2=ta.selectionStart,v=ta.value,ls=v.lastIndexOf('\n',s2-1)+1,ind=/^[ \t]*/.exec(v.slice(ls,s2))[0];if(/\{\s*$/.test(v.slice(ls,s2)))ind+='    ';e.preventDefault();ta.setRangeText('\n'+ind,s2,ta.selectionEnd,'end');changed();return}
var k=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&!e.altKey){if(k==='s'){e.preventDefault();A.Save()}else if(k==='o'){e.preventDefault();A.Open()}else if(k==='n'){e.preventDefault();A.New()}}});
document.addEventListener('keydown',function(e){if(!root.classList.contains('on'))return;if(e.key==='Escape'){var o=menus.some(function(m){return m.classList.contains('open')});if(o){closeMenus();e.stopPropagation()}}},true);
/* compile / run (AI-simulated, or real saved output for known note examples) */
function nrm(t){return t.replace(/[ \t\r\n\u00a0]+/g,'')}
function fnv(t){var h=0x811c9dc5;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return('00000000'+h.toString(16)).slice(-8)}
function known(code){try{var j=JSON.parse(document.getElementById('jsout').textContent),v=j[fnv(nrm(code))];if(typeof v==='string')return v;if(v&&typeof v==='object'&&v[0]!==undefined)return (v[0]+(v[1]?(v[0]?'\n':'')+v[1]:''))||'(no output)'}catch(e){}return null}
function aiErr(e){var c=e&&e.code;return c==='none'?'The AI is not connected yet. Open the chat panel, tap the gear icon and add your API key, then try again.':c==='http401'?'Your API key was rejected. Check it in the chat gear box.':c==='http429'?'The AI rate limit was reached. Try again in a minute.':c&&/^http/.test(c)?'The AI returned an error '+c.replace('http',''):'Could not reach the AI (no internet, or the connection is blocked).'}
var busy=false;
function lock(b){busy=b;$('jd-compile').disabled=b;$('jd-run').disabled=b}
function strip(t){return String(t).replace(/^```[a-z]*\n?/i,'').replace(/```\s*$/,'').replace(/\s+$/,'')}
function ask(sys,code){if(!window.sutraAsk)return Promise.reject({code:'none'});return window.sutraAsk(sys,code.slice(0,6000)).then(strip)}
var DEF='https://ce.judge0.com',LID=null;
function base(){var u='';try{u=localStorage.getItem('jed-server')||''}catch(e){}return(u||DEF).replace(/\/+$/,'')}
function b64(t){return btoa(unescape(encodeURIComponent(t)))}
function unb64(t){if(!t)return'';try{return decodeURIComponent(escape(atob(String(t).replace(/\s/g,''))))}catch(e){try{return atob(t)}catch(x){return''}}}
function fetchT(url,opt,ms){var c=window.AbortController?new AbortController():null,t=setTimeout(function(){c&&c.abort()},ms||30000);opt=opt||{};if(c)opt.signal=c.signal;return fetch(url,opt).then(function(r){clearTimeout(t);return r},function(e){clearTimeout(t);throw e})}
function langId(){if(LID)return Promise.resolve(LID);return fetchT(base()+'/languages',{},12000).then(function(r){return r.json()}).then(function(l){var j=l.filter(function(x){return/^Java \(/.test(x.name)}).sort(function(a,b){return b.id-a.id})[0];LID=j?j.id:91;return LID},function(){LID=91;return LID})}
/* find the class that holds main(); the online compiler wants it called Main */
function prep(code){var mi=code.search(/static\s+void\s+main\s*\(/),orig=null;if(mi>=0){var re=/\b(?:class|interface|enum|record)\s+([A-Za-z_$][\w$]*)/g,m,last=null,head=code.slice(0,mi);while((m=re.exec(head)))last=m[1];if(last&&last!=='Main'&&!/\bclass\s+Main\b/.test(code)){orig=last;code=code.replace(new RegExp('\\b'+last.replace(/\$/g,'\\$')+'\\b','g'),'Main')}}return{code:code,orig:orig}}
function back(t,o){return o?t.replace(/\bMain\b/g,o):t}
function remote(code,stdin){var pr=prep(code);return langId().then(function(id){return fetchT(base()+'/submissions?base64_encoded=true&wait=true',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({source_code:b64(pr.code),language_id:id,stdin:b64(stdin||'')})},45000)}).then(function(r){if(r.status===429)throw{code:'rate'};if(!r.ok&&r.status!==201)throw{code:'http'+r.status};return r.json()}).then(function(j){return poll(j,0)}).then(function(j){j.__o=pr.orig;return j})}
function poll(j,n){if(j&&j.status&&j.status.id>2)return j;if(!j||!j.token||n>25)throw{code:'wait'};return new Promise(function(r){setTimeout(r,1000)}).then(function(){return fetchT(base()+'/submissions/'+j.token+'?base64_encoded=true',{},15000)}).then(function(r){return r.json()}).then(function(x){return poll(x,n+1)})}
function netErr(e){var c=e&&e.code;return c==='rate'?'The online Java server is busy (rate limit). Wait a few seconds and press Run again.':c==='wait'?'The online Java server took too long. Try again.':c&&/^http/.test(c)?'The online Java server returned an error '+c.replace('http','')+'.':'Could not reach the online Java server. Check your internet connection. (If you opened this page inside Claude, open the exported index.html in your browser instead, because Claude blocks outside connections.)'}
function result(j){var o=j.__o,so=back(unb64(j.stdout),o),se=back(unb64(j.stderr),o),co=back(unb64(j.compile_output),o),ms=back(j.message?unb64(j.message):'',o),id=j.status&&j.status.id;
var info=(j.time?j.time+'s':'')+(j.memory?' · '+Math.round(j.memory/1024)+' MB':'');
if(id===6)return{text:co||'Compilation failed.',bad:true,lab:'Compilation error'};
var t=so;if(se)t+=(t&&!/\n$/.test(t)?'\n':'')+se;if(ms&&!se)t+=(t?'\n':'')+ms;
if(id===5)t+=(t?'\n':'')+'Time limit exceeded.';
if(!t)t='(no output)';
return{text:t,bad:id>=5&&id!==6&&id<=12,lab:'Real output · Java on Judge0'+(info?' · '+info:'')}}
function viaAI(code,compileOnly){var sys=compileOnly?'You act as the javac compiler for Java 21. Reply with ONLY what javac would print. If it compiles with no errors, reply exactly: Compilation Successful. Otherwise print the errors in javac format. No explanation, no markdown.':'You act as a Java compiler and runtime (Java 21). Reply with ONLY the exact text the program prints to the console, nothing else: no explanation, no markdown fences. If it fails to compile or throws an exception, print the error lines Java would show.';return ask(sys,code)}
function go(compileOnly){if(busy)return;var code=ta.value;if(!code.trim()){say('Please write some Java code first.');return}
if(!compileOnly){var k=known(code);if(k!==null){say(k,'real','Real output · run on Java 21');return}}
lock(true);say(compileOnly?'Compiling…':'Running…','','Online Java server');
var stdin=$('jd-in').value;
remote(code,stdin).then(function(j){var r=result(j);if(compileOnly){if(j.status&&j.status.id===6)say(r.text,'bad','Compilation error');else say('Compilation Successful '+(fname||fileName()),'real','Real javac · Judge0')}else say(r.text,r.bad?'bad':'real',r.lab)},function(e){
if(window.sutraAsk){say('Online server unavailable. Asking the AI tutor instead…','','AI-simulated');return viaAI(code,compileOnly).then(function(t){var ok=compileOnly&&/^Compilation Successful/i.test(t);say(t||'(no output)',ok?'real':'','AI-predicted · may be wrong')},function(e2){say(netErr(e),'bad','Server unavailable')})}
say(netErr(e),'bad','Server unavailable')}).then(function(){lock(false)})}
function compile(){go(true)}
function run(){go(false)}
function setServer(){var cur='';try{cur=localStorage.getItem('jed-server')||''}catch(e){}var u=prompt('Java run server (Judge0 API address).\nLeave empty to use the default: '+DEF,cur);if(u===null)return;u=u.trim();try{if(u)localStorage.setItem('jed-server',u);else localStorage.removeItem('jed-server')}catch(e){}LID=null;say(u?'Run server set to '+u:'Using the default run server ('+DEF+').')}
/* resizable panes: drag the grips, or focus one and use the arrow keys */
(function(){var main=root.querySelector('.jd-main'),bot=root.querySelector('.jd-bot'),inn=root.querySelector('.jd-in'),h1=$('jd-h1'),h2=$('jd-h2'),BH=260,IH=84;
function num(k,d){try{var v=parseInt(localStorage.getItem(k),10);return v>0?v:d}catch(e){return d}}
var bh=num('jed-bh',0),ih=num('jed-ih',0);
function clamp(){var mh=main.clientHeight;if(!mh)return;var maxB=Math.max(110,mh-80-10);bh=Math.min(Math.max(bh||Math.round(mh*.38),110),maxB);var maxI=Math.max(44,bh-10-30-34-30);ih=Math.min(Math.max(ih||IH,44),maxI);bot.style.setProperty('--bh',bh+'px');inn.style.setProperty('--ih',ih+'px')}
function save(){try{localStorage.setItem('jed-bh',bh);localStorage.setItem('jed-ih',ih)}catch(e){}}
function drag(h,fn){h.addEventListener('pointerdown',function(e){if(e.button!==undefined&&e.button>0)return;e.preventDefault();h.setPointerCapture(e.pointerId);h.classList.add('drag');B.classList.add('jed-drag');
function mv(ev){fn(ev.clientY);clamp()}
function up(){h.classList.remove('drag');B.classList.remove('jed-drag');h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);h.removeEventListener('pointercancel',up);save()}
h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up)})}
drag(h1,function(y){bh=Math.round(main.getBoundingClientRect().bottom-y-5)});
drag(h2,function(y){ih=Math.round(y-5-inn.getBoundingClientRect().top)});
h1.addEventListener('dblclick',function(){bh=0;clamp();save()});
h2.addEventListener('dblclick',function(){ih=0;clamp();save()});
function key(h,get,set){h.addEventListener('keydown',function(e){var d=e.key==='ArrowUp'?-24:e.key==='ArrowDown'?24:0;if(!d)return;e.preventDefault();set(get()+(h===h1?-d:d));clamp();save()})}
key(h1,function(){return bh},function(v){bh=v});key(h2,function(){return ih},function(v){ih=v});
addEventListener('resize',clamp);
new MutationObserver(function(){if(root.classList.contains('on'))setTimeout(clamp,0)}).observe(root,{attributes:true,attributeFilter:['class']});
})();
/* open / close */
function open(){root.classList.add('on');B.classList.add('jed-open');setTimeout(function(){ta.focus()},60)}
function close(){closeMenus();root.classList.remove('on');B.classList.remove('jed-open')}
window.openJavaEditor=open;
/* lets Code Arena send a problem's code straight into the editor */
window.loadJavaEditor=function(code){code=String(code).replace(/\r\n/g,'\n');if(dirty&&ta.value!==code&&!confirm('Replace the code currently in the Java Editor with this problem\'s code?'))return;setCode(code,'');say('');open()};
/* Home hero button (re-added whenever Home is redrawn) */
var HM=document.getElementById('home'),ht=0;
function heroBtn(){var c=HM&&HM.querySelector('.hm-cta');if(!c||c.querySelector('[data-jed]'))return;var x=document.createElement('button');x.type='button';x.className='hm-s';x.dataset.jed='1';x.textContent='⌨️ Java Editor';x.addEventListener('click',open);c.appendChild(x)}
if(HM){new MutationObserver(function(){if(ht)return;ht=setTimeout(function(){ht=0;heroBtn()},60)}).observe(HM,{childList:true,subtree:true});heroBtn()}
/* floating button */
var fab=document.querySelector('.fab');
if(fab&&!$('jedBtn')){var b=document.createElement('button');b.id='jedBtn';b.type='button';b.title='Java Editor';b.setAttribute('aria-label','Java Editor');b.innerHTML='<span class="fi">⌨️</span><small>Editor</small>';b.addEventListener('click',open);var fu=$('fu');fab.insertBefore(b,fu||null)}
/* start */
var saved='';try{saved=localStorage.getItem(KEY)||''}catch(e){}
setCode(saved||template('HelloWorld').replace('\t\t\n','\t\tSystem.out.println("Hello, Java!");\n'),'');dirty=false;title();
}catch(err){console.error('jed',err)}})();
;

/* ===== script#tl-js (line 48553 of original) ===== */
(function(){try{
var B=document.body,H=document.getElementById('home');if(!H)return;
function L(e,h){return B.classList.contains('hi')?h:e}
var topics=[];document.querySelectorAll('template[id^="tpl-b"]').forEach(function(t){var n=+t.id.slice(5);t.content.querySelectorAll('h3[id]').forEach(function(h){topics.push({n:n,id:h.id,t:h.textContent.trim(),l:h.textContent.toLowerCase()})})});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function J(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}}
var grp='all',q='',tm=0;
function chapters(){var out=[],g='';[].slice.call(H.children).forEach(function(c){if(c.classList.contains('hm-g'))g=c.textContent.trim();else if(c.classList.contains('hm-chs'))c.querySelectorAll('button.hm-ch').forEach(function(b){var m=/(\d+)\s*\/\s*(\d+)/.exec((b.querySelector('small')||{}).textContent||'');out.push({n:+b.dataset.ch,name:b.querySelector('b').textContent,g:g,x:m?+m[1]:0,t:m?+m[2]:0})})});return out}
function card(c){var p=c.t?Math.round(c.x/c.t*100):0;return'<button type="button" class="tl-c'+(c.t&&c.x>=c.t?' full':'')+'" data-ch="'+c.n+'"><span class="tl-n">'+(c.n<10?'0':'')+c.n+' · '+esc(c.g)+'</span><b>'+esc(c.name)+'</b><div class="tl-bar"><i style="width:'+p+'%"></i></div><small>'+c.x+' / '+c.t+' '+L('topics learned','टॉपिक सीखे')+'</small></button>'}
function fill(){var box=H.querySelector('.tl');if(!box)return;var cs=chapters(),ql=q.toLowerCase(),map={};cs.forEach(function(c){map[c.n]=c});
var hits={};if(ql)topics.forEach(function(t){if(t.l.indexOf(ql)>-1)hits[t.n]=(hits[t.n]||0)+1});
var list=cs.filter(function(c){return(grp==='all'||c.g===grp)&&(!ql||c.name.toLowerCase().indexOf(ql)>-1||hits[c.n])});
var h='';var rec=J('jrecent','[]').filter(function(n){return map[n]}).slice(0,4);
if(!ql&&grp==='all'&&rec.length)h+='<div class="tl-h">'+L('Recently visited','हाल में देखे गए')+'</div><div class="tl-g">'+rec.map(function(n){return card(map[n])}).join('')+'</div>';
h+='<div class="tl-h">'+(ql||grp!=='all'?list.length+' '+L('chapters','अध्याय'):L('All chapters','सभी अध्याय'))+'</div>';
h+=list.length?'<div class="tl-g">'+list.map(card).join('')+'</div>':'<div class="tl-e">'+L('No chapter matches. Try another word or choose All.','कोई अध्याय नहीं मिला। दूसरा शब्द आज़माएँ या All चुनें।')+'</div>';
if(ql){var th=topics.filter(function(t){return t.l.indexOf(ql)>-1&&(grp==='all'||(map[t.n]&&map[t.n].g===grp))});if(th.length){h+='<div class="tl-h">'+L('Topics','टॉपिक')+' ('+th.length+(th.length>12?', '+L('showing 12','12 दिखाए गए'):'')+')</div><div class="tl-ts">'+th.slice(0,12).map(function(t){return'<button type="button" class="tl-t" data-ch="'+t.n+'" data-id="'+esc(t.id)+'"><b style="font-weight:600">'+esc(t.t)+'</b><span>'+L('Part ','भाग ')+t.n+'</span></button>'}).join('')+'</div>'}}
box.querySelector('.tl-body').innerHTML=h;
var live=box.querySelector('.tl-live');live.textContent=ql?list.length+' '+L('chapters found','अध्याय मिले'):''}
function build(){if(H.querySelector('.tl'))return;var cs=chapters();if(!cs.length)return;var gs=[];cs.forEach(function(c){if(gs.indexOf(c.g)<0)gs.push(c.g)});
var d=document.createElement('section');d.className='tl';d.setAttribute('aria-label',L('Topic library','टॉपिक लाइब्रेरी'));
d.innerHTML='<div class="hm-h">'+L('Topic library','टॉपिक लाइब्रेरी')+'<small>'+L('Search chapters and topics, or filter by group','अध्याय और टॉपिक खोजें, या ग्रुप से फ़िल्टर करें')+'</small></div><div class="tl-top"><input class="tl-q" type="search" placeholder="'+L('Search '+topics.length.toLocaleString()+' topics…',topics.length.toLocaleString()+' टॉपिक खोजें…')+'" aria-label="'+L('Search topics','टॉपिक खोजें')+'" value="'+esc(q)+'"></div><div class="tl-fs" role="group" aria-label="'+L('Filter by group','ग्रुप से फ़िल्टर')+'"><button type="button" class="tl-f" data-g="all" aria-pressed="'+(grp==='all')+'">'+L('All','सभी')+'</button>'+gs.map(function(g){return'<button type="button" class="tl-f" data-g="'+esc(g)+'" aria-pressed="'+(grp===g)+'">'+esc(g)+'</button>'}).join('')+'</div><div class="tl-live" aria-live="polite" style="position:absolute;left:-9999px"></div><div class="tl-body"></div>';
var first=H.querySelector('.hm-g'),at=first&&first.previousElementSibling&&first.previousElementSibling.classList.contains('hm-h')?first.previousElementSibling:first;
H.insertBefore(d,at||null);fill();
d.querySelector('.tl-q').addEventListener('input',function(e){var v=e.target.value.trim();clearTimeout(tm);tm=setTimeout(function(){q=v;fill()},150)});
d.querySelector('.tl-fs').addEventListener('click',function(e){var b=e.target.closest('.tl-f');if(!b)return;grp=b.dataset.g;d.querySelectorAll('.tl-f').forEach(function(x){x.setAttribute('aria-pressed',x===b)});fill()})}
var pend=0;new MutationObserver(function(){if(pend)return;pend=setTimeout(function(){pend=0;build()},60)}).observe(H,{childList:true});build();
}catch(err){console.error('tl',err)}})();
;

/* ===== script#et-js (line 48807 of original) ===== */
(function(){try{
/* Put your email here to turn the Contact section into a working form
   (it opens the visitor's mail app addressed to you). Leave '' to show GitHub links instead. */
var CONTACT_EMAIL='';
var GH='https://github.com/abhinavmaurya12',REPO='https://github.com/abhinavmaurya12/JavaSquadz';
var B=document.body,H=document.getElementById('home');if(!H)return;
function L(e,h){return B.classList.contains('hi')?h:e}
var TOP=[
['OO',6,'OOPs in Java','OOP','Encapsulation, inheritance, polymorphism and abstraction, plus constructors, interfaces and access modifiers.','इनकैप्सुलेशन, इनहेरिटेंस, पॉलिमॉर्फ़िज़्म और एब्स्ट्रैक्शन, साथ में कंस्ट्रक्टर, इंटरफ़ेस और एक्सेस मॉडिफ़ायर।'],
['CF',13,'Collections','कलेक्शन्स','List, Set, Queue and Map, with ArrayList vs LinkedList and HashMap comparisons.','List, Set, Queue और Map, साथ में ArrayList बनाम LinkedList और HashMap की तुलना।'],
['TH',17,'Threads','थ्रेड्स','Thread states, creation, synchronization, wait/notify and executors.','थ्रेड स्टेट्स, थ्रेड बनाना, सिंक्रोनाइज़ेशन, wait/notify और एक्ज़ीक्यूटर्स।'],
['J8',18,'Java 8 Features','जावा 8 फ़ीचर्स','Lambdas, Stream API, Optional and functional interfaces.','लैम्ब्डा, Stream API, Optional और फ़ंक्शनल इंटरफ़ेस।'],
['DB',25,'JDBC','JDBC','Drivers, PreparedStatement, transactions and CRUD with the DAO pattern.','ड्राइवर, PreparedStatement, ट्रांज़ैक्शन और DAO पैटर्न के साथ CRUD।'],
['VM',30,'JVM Internals','JVM की आंतरिक संरचना','Class loaders, memory areas, JIT and garbage collection.','क्लास लोडर, मेमोरी एरिया, JIT और गार्बेज कलेक्शन।']
];
function topics(){
  var s=document.createElement('section');s.id='et-topics';s.className='et-sec et-rv';s.setAttribute('data-et','1');
  s.innerHTML='<span class="et-tag">'+L('Popular topics','लोकप्रिय टॉपिक')+'</span><h2 class="et-h2">'+L('What you will learn','आप क्या सीखेंगे')+'</h2>'
  +'<p class="et-sub">'+L('Jump straight into the chapters interviewers ask about most, then go deeper with the full notes.','सबसे ज़्यादा पूछे जाने वाले अध्यायों से सीधे शुरू करें, फिर पूरे नोट्स में गहराई तक जाएँ।')+'</p>'
  +'<div class="et-grid">'+TOP.map(function(t){return'<button type="button" class="et-tc" data-ch="'+t[1]+'"><span class="et-ic">'+t[0]+'</span><b class="et-t">'+L(t[2],t[3])+'</b><span class="et-d">'+L(t[4],t[5])+'</span><span class="et-link">'+L('Read notes →','नोट्स पढ़ें →')+'</span></button>'}).join('')+'</div>';
  return s}
function how(){
  var s=document.createElement('section');s.id='et-how';s.className='et-sec et-band et-rv';s.setAttribute('data-et','1');
  s.innerHTML='<div class="et-split"><div><span class="et-tag">'+L('How it works','यह कैसे काम करता है')+'</span><h2 class="et-h2">'+L('Learn, run, revise','सीखें, चलाएँ, दोहराएँ')+'</h2>'
  +'<div class="et-steps">'
  +'<div class="et-step"><h4>'+L('Read the concept','कॉन्सेप्ट पढ़ें')+'</h4><p>'+L('Short, focused explanations without the fluff.','छोटी, सटीक व्याख्या, बिना फ़ालतू बातों के।')+'</p></div>'
  +'<div class="et-step"><h4>'+L('Run the example','उदाहरण चलाएँ')+'</h4><p>'+L('Predict the output, then use Run on the code examples to check yourself.','पहले आउटपुट का अनुमान लगाएँ, फिर कोड उदाहरणों पर Run दबाकर जाँचें।')+'</p></div>'
  +'<div class="et-step"><h4>'+L('Quick revision','क्विक रिवीज़न')+'</h4><p>'+L('Take the interview quiz, mark topics learned and watch your progress grow.','इंटरव्यू क्विज़ दें, सीखे हुए टॉपिक चिह्नित करें और अपनी प्रगति देखें।')+'</p></div>'
  +'</div></div>'
  +'<div class="et-codewrap"><pre class="et-code" data-rn="1"><code><span class="et-k">class</span> Dog <span class="et-k">extends</span> Animal {\n    <span class="et-k">@Override</span>\n    <span class="et-k">void</span> sound() {\n        System.out.println(<span class="et-s">"Dog barks"</span>);\n    }\n}\nAnimal a = <span class="et-k">new</span> Dog();\na.sound();   <span class="et-c">// ?</span></code></pre>'
  +'<div class="et-run"><button type="button" data-etrun>▶ '+L('Run','चलाएँ')+'</button><span>'+L('Predict the output first.','पहले आउटपुट का अनुमान लगाएँ।')+'</span></div>'
  +'<div class="et-out" hidden>Dog barks</div></div></div>';
  return s}
function about(){
  var s=document.createElement('section');s.id='et-about';s.className='et-sec et-rv';s.setAttribute('data-et','1');
  s.innerHTML='<div class="et-split et-abt"><div><span class="et-tag">'+L('About','परिचय')+'</span><h2 class="et-h2">'+L('Notes by Abhinav Maurya','अभिनव मौर्य के नोट्स')+'</h2>'
  +'<p class="et-lead">'+L('Java Sutra started as personal study notes and grew into a full reference for students and job seekers. It is organised chapter by chapter, from Core Java basics to JPMS, so you always know what to learn next.','जावा सूत्र निजी स्टडी नोट्स के रूप में शुरू हुआ और अब छात्रों और नौकरी चाहने वालों के लिए एक पूरा रेफ़रेंस बन गया है। यह अध्याय-दर-अध्याय व्यवस्थित है, कोर जावा की बुनियाद से JPMS तक, ताकि आपको हमेशा पता रहे कि आगे क्या सीखना है।')+'</p>'
  +'<button type="button" class="et-cta" data-etgo="et-contact">'+L('Say Hello','नमस्ते कहें')+'</button></div>'
  +'<div class="et-card"><h3>'+L('Study tools','स्टडी टूल्स')+'</h3><p>'+L('Bookmarks, personal notes, a progress tracker and a topic of the day help you keep going.','बुकमार्क, निजी नोट्स, प्रोग्रेस ट्रैकर और आज का टॉपिक आपको लगातार आगे बढ़ाते हैं।')+'</p><p>'+L('Light and dark themes are included.','लाइट और डार्क थीम शामिल हैं।')+'</p></div></div>';
  return s}
function contact(){
  var s=document.createElement('section');s.id='et-contact';s.className='et-sec et-band et-rv';s.setAttribute('data-et','1');
  var left=CONTACT_EMAIL
   ?'<form class="et-form" id="et-form"><textarea name="msg" rows="6" required placeholder="'+L('Enter message','अपना संदेश लिखें')+'"></textarea><input name="nm" required placeholder="'+L('Enter your name','अपना नाम लिखें')+'"><input name="em" type="email" required placeholder="'+L('Enter email address','अपना ईमेल लिखें')+'"><button class="et-cta" type="submit">'+L('Send Message','संदेश भेजें')+'</button><p class="et-ok" id="et-ok" role="status"></p></form>'
   :'<div class="et-card"><h3>'+L('Say hello on GitHub','GitHub पर संपर्क करें')+'</h3><p>'+L('Found a mistake, or want a topic covered next? Reach Abhinav through GitHub.','कोई गलती मिली, या चाहते हैं कि अगला कौन-सा टॉपिक जुड़े? GitHub पर अभिनव से संपर्क करें।')+'</p><div class="et-links"><a class="et-cta" href="'+GH+'" target="_blank" rel="noopener">GitHub ↗</a><a class="et-cta o" href="'+REPO+'" target="_blank" rel="noopener">JavaSquadz '+L('repo','रेपो')+' ↗</a></div></div>';
  s.innerHTML='<span class="et-tag">'+L('Contact','संपर्क')+'</span><h2 class="et-h2">'+L('Get in touch','संपर्क करें')+'</h2><div class="et-ct">'+left
  +'<div class="et-info"><p><b>'+L('Questions or feedback?','सवाल या सुझाव?')+'</b><span>'+L('Tell us which topic you want covered next.','बताइए कि आप अगला कौन-सा टॉपिक चाहते हैं।')+'</span></p>'
  +'<p><b>'+L('Topics','टॉपिक')+'</b><span>OOPs · Collections · Threads · Java 8 · JDBC</span></p>'
  +'<p><b>'+L('Author','लेखक')+'</b><span>Abhinav Maurya</span></p></div></div>';
  return s}

var io=null;
if('IntersectionObserver' in window)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
function watch(el){if(io)io.observe(el);else el.classList.add('in')}

function inject(){
  if(!B.classList.contains('home')||!H.querySelector('.hm-hero'))return;
  var br=document.querySelector('.brand');if(br&&!br.querySelector('b')&&/^\s*Java\s*Sutra\s*$/i.test(br.textContent))br.innerHTML='Java <b>Sutra</b>';
  var prem=H.querySelector('#prem');
  if(prem&&!H.querySelector('#et-topics')){var t=topics();prem.parentNode.insertBefore(t,prem);watch(t)}
  if(!H.querySelector('#et-how')||!H.querySelector('#et-about')||!H.querySelector('#et-contact')){
    ['#et-how','#et-about','#et-contact'].forEach(function(q){var o=H.querySelector(q);if(o)o.remove()});
    var foot=H.querySelector('#pmfoot'),els=[how(),about(),contact()];
    els.forEach(function(el){if(foot)H.insertBefore(el,foot);else H.appendChild(el);watch(el)})}
}
var tm=0;
new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(inject,140)}).observe(H,{childList:true});
new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(inject,200)}).observe(B,{attributes:true,attributeFilter:['class']});
[300,800,1600].forEach(function(ms){setTimeout(inject,ms)});

H.addEventListener('click',function(e){
  var r=e.target.closest&&e.target.closest('[data-etrun]');
  if(r){var o=r.closest('.et-codewrap').querySelector('.et-out');o.hidden=!o.hidden;return}
  var g=e.target.closest&&e.target.closest('[data-etgo]');
  if(g){var x=document.getElementById(g.getAttribute('data-etgo'));x&&x.scrollIntoView({behavior:'smooth',block:'start'})}
});
H.addEventListener('submit',function(e){
  var f=e.target.closest&&e.target.closest('#et-form');if(!f||!CONTACT_EMAIL)return;e.preventDefault();
  var n=f.elements.nm.value.trim(),em=f.elements.em.value.trim(),m=f.elements.msg.value.trim();
  location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('Java Sutra'+(n?' · '+n:''))+'&body='+encodeURIComponent(m+'\n\n— '+n+(em?' <'+em+'>':''));
  document.getElementById('et-ok').textContent=L('Opening your email app…','आपका ईमेल ऐप खुल रहा है…');
});
}catch(err){console.error('etrain home',err)}})();
;

/* ===== script#ca-js (line 48892 of original) ===== */
(function(){try{
var CATS=['HTML/CSS','JavaScript','React','Java Basic','Java Intermediate','Java Hard','Arrays','Strings','Linked List','Stack & Queue','Advanced DSA','Interview'];
var TOP='Semantic HTML;Selectors;Forms;Flexbox;CSS Grid;Positioning;Layout;Responsive Design;Tables;CSS Variables;DOM Manipulation;Dynamic UI;Calculator;Modal;Tabs;Search/filter;LocalStorage;Dynamic UI;Events;Validation;useState;useEffect;Props;Conditional rendering;Lists;Forms;API fetching;Custom hooks;Component communication;Events'.split(';');
var DT=['Java Basics','Java Intermediate','Java Hard','Arrays','Strings','Linked List','Stack & Queue','Advanced DSA','Mixed Interview'];
var TT=[
'Semantic HTML Structure;CSS Selectors Practice;Form with Validation Styling;Flexbox Card Layout;CSS Grid Gallery;Sticky Header Navigation;Two-Column Layout;Media Query Responsive Text;Table Styling;CSS Variable Theme Switcher',
'Counter Widget;To-Do List;Simple Calculator;Modal Dialog;Tabbed Content;Search and Filter List;LocalStorage Counter;Dark/Light Theme Toggle;Event Delegation List;Form Validation',
'Counter with useState;Effect Counter;Props Greeting;Conditional Rendering Banner;Todo List with State;Controlled Form;Fetch Data from API;Custom Hook useCounter;Theme Toggle with Context;Search Filter with Debounce',
'Hello World;Variable Assignment;String Input with Scanner;If Else Grade Check;Switch Day of Week;For Loop Sum;While Loop Countdown;Do While Menu;Method Addition;Even Odd Check;Nested Loop Star Triangle;Multiplication Table;Factorial of a Number;Sum of Digits;Reverse a Number;Prime Number Check;Pyramid Pattern;Fibonacci Sequence;Armstrong Number;Greatest of Three Numbers',
'Array Max Element;String Reverse;Array Copy;Palindrome Check;Count Vowels;Method Overloading Example;Class and Object;Constructor Overloading;Static Variable;This Keyword;Inheritance Example;Super Keyword Usage;Encapsulation with Getters Setters;Abstract Class;Interface Implementation;Exception Handling;ArrayList Basics;Method Overriding;This vs Super;IS-A vs HAS-A',
'Diamond Pattern;Hollow Square Pattern;Number Pattern Pyramid;Kadane Algorithm Maximum Subarray;Two Sum Pair;Polymorphism with Method Overriding;Interface vs Abstract Class;Constructor Chaining;Real World OOP Design;String Buffer vs Builder;Hollow Diamond Pattern;Multiple Inheritance via Interfaces;Method Overriding Rules;Encapsulation with Validation;Interface Default Methods;Polymorphism with Interfaces;Static vs Instance Members;Super Constructor Call;Object Composition Example;Abstract vs Interface Comparison',
'Maximum Element;Minimum Element;Reverse Array;Linear Search;Duplicate Element;Sort Array Ascending;Frequency Count;Two Sum;Prefix Sum;Sliding Window Sum;Two Pointers Pair Sum;Subarray Maximum Sum;Rotate Array;Merge Two Sorted Arrays;Missing Number;Majority Element;Best Time to Buy and Sell Stock;Container With Most Water;Product of Array Except Self;Search in Rotated Sorted Array',
'Reverse String;Palindrome Check;Character Frequency;Anagram Check;Duplicate Characters;String Compression;Longest Substring Without Repeating Characters;String Rotation Check;Count Words;Substring Search;Longest Palindrome Substring;String to Integer;Remove Vowels;First Non-Repeating Character;String Multiplication;Group Anagrams;String Matching Rabin-Karp;Text Justification;Valid Parentheses;Longest Common Prefix',
'Create and Traverse Linked List;Insert at End;Delete a Node;Search in Linked List;Find Middle Node;Reverse Linked List;Detect Cycle;Remove Duplicates;Merge Two Sorted Lists;Find Nth Node from End;Intersection of Two Lists;Add Two Numbers as Lists;Copy List with Random Pointers;Doubly Linked List Insert;Doubly Linked List Delete;Circular Linked List Insert;Detect Loop in Linked List;Swap Nodes in Pairs;Rotate Linked List;Flatten Multilevel List',
'Stack Push and Pop;Balanced Parentheses;Reverse a Stack;Min Stack;Next Greater Element;Evaluate Postfix Expression;Queue Using Stacks;Implement Circular Queue;Priority Queue with Heap;Sliding Window Maximum;Stack Using Queues;Sort a Stack;Queue Implementation with Array;Deque Implementation;First Non-Repeating Character in Stream;Next Smaller Element;Largest Rectangle in Histogram;Queue Reconstruction by Height;Implement Two Stacks in One Array;Generate Binary Numbers Using Queue',
'Basic Binary Search;First Occurrence in Sorted Array;Search in Rotated Sorted Array;Tree Traversal (Inorder);Tree Height;BST Search;BFS Graph Traversal;DFS Graph Traversal;Connected Components;Fibonacci with DP;Climbing Stairs DP;0/1 Knapsack;Longest Common Subsequence;Min Heap Operations;Kth Largest Element;HashMap Frequency Count;HashSet Duplicate Detection;Activity Selection Greedy;Merge Intervals;House Robber DP',
'Reverse an Array In Place;Check Anagram;Find Middle of Linked List;Factorial Using Recursion;Linear Search;Bubble Sort Array;String Builder Concatenation;Reverse a String;Stack Push Pop Sequence;Two Sum Pair Check'];
var DIF='eemmhmmmehemmmmmmhhhemeemmhhhheeeeeeeeeemmmmmhhhhheeemmmmmmmmmmhhhhhhhhhhhhhhhhhhhhhhhhhhheeeemmmmmmmhhhhhhhhheeemmmhmemhmehhhhhheeeeemmhmhhhhheemhhhhemmhhhhmhhhheehhhhheemhememmhemhhemeemhheeeeemmeme';
var P=[],id=0;
TT.forEach(function(b,ci){b.split(';').forEach(function(t){id++;P.push({id:id,t:t,c:CATS[ci],tp:id<=30?TOP[id-1]:DT[ci-3],d:DIF[id-1]})})});
var DN={e:'Easy',m:'Medium',h:'Hard'};
var S={}; // detailed statements: id:[description, example]
function s(ids,a,b){ids.split(',').forEach(function(i){S[i]=[a,b]})}
s('31','Print Hello, World! to the console.','Output:\nHello, World!');
s('36','Read n and print the sum of all integers from 1 to n using a for loop.','Input: n = 5\nOutput: 15');
s('40','Given an integer, print "Even" if it is even, otherwise "Odd".','Input: 7\nOutput: Odd');
s('43,194','Compute n! (the product of 1..n). Use a loop (or recursion for the interview version).','Input: n = 5\nOutput: 120');
s('46','Given n, print true if n is prime, otherwise false. A prime has exactly two divisors: 1 and itself.','Input: 7  -> true\nInput: 1  -> false');
s('48','Print the first n terms of the Fibonacci sequence, starting 0, 1.','Input: n = 6\nOutput: 0 1 1 2 3 5');
s('52,111,198','Reverse a string without using StringBuilder.reverse().','Input: "java"\nOutput: "avaj"');
s('54,112','Return true if the string reads the same forwards and backwards.','Input: "madam"\nOutput: true');
s('74,102','Find the contiguous subarray with the largest sum and return that sum (Kadane\'s algorithm, O(n)).','Input: [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6  ([4,-1,2,1])');
s('75,98,200','Given an int array and a target, return the indices of the two numbers that add up to the target. Exactly one solution exists.','Input: nums = [2,7,11,15], target = 9\nOutput: [0, 1]');
s('91,92','Return the largest (or smallest) element of an integer array.','Input: [3, 9, 2]\nOutput: 9  (max)');
s('93,191','Reverse an array in place using two pointers, without a second array.','Input: [1,2,3,4]\nOutput: [4,3,2,1]');
s('94,195','Return the index of target in the array, or -1 if it is absent.','Input: [4,2,7], target = 7\nOutput: 2');
s('114,192','Return true if the two strings contain the same letters with the same counts.','Input: "listen", "silent"\nOutput: true');
s('129','Given a string of ()[]{} brackets, return true if every bracket is closed in the correct order.','Input: "({[]})"  -> true\nInput: "(]"      -> false');
s('136','Reverse a singly linked list and return the new head.','Input: 1->2->3->null\nOutput: 3->2->1->null');
s('171','Given a sorted array and a target, return its index using binary search in O(log n), or -1.','Input: [1,3,5,7,9], target = 7\nOutput: 3');
s('196','Sort an integer array in ascending order using bubble sort.','Input: [5,1,4,2]\nOutput: [1,2,4,5]');
var JAVA={'Java Basic':1,'Java Intermediate':1,'Java Hard':1,'Arrays':1,'Strings':1,'Linked List':1,'Stack & Queue':1,'Advanced DSA':1,'Interview':1};
function starter(p){
  if(JAVA[p.c])return 'public class Main {\n    public static void main(String[] args) {\n        // '+p.t+'\n        \n    }\n}\n';
  if(p.c==='JavaScript')return '// '+p.t+'\n\n';
  if(p.c==='React')return 'import { useState } from "react";\n\nexport default function App() {\n  // '+p.t+'\n  return <div />;\n}\n';
  return '<!-- '+p.t+' -->\n<!DOCTYPE html>\n<html>\n<body>\n\n</body>\n</html>\n';}
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
var B=document.body,root=document.createElement('div');root.id='ca';document.body.appendChild(root);
var F={q:'',d:'',c:''},cur=0;
function done(){try{return JSON.parse(localStorage.getItem('ca_done')||'[]')}catch(e){return[]}}
function save(a){try{localStorage.setItem('ca_done',JSON.stringify(a))}catch(e){}}
function top(x){return '<div class="ca-top"><b>⚔️ Code<i>Arena</i></b>'+(x||'')+'<button class="ca-x" data-x aria-label="Close">✕</button></div>'}
function list(){
  var dn=done(),n={e:0,m:0,h:0},tot={e:0,m:0,h:0};
  P.forEach(function(p){tot[p.d]++;if(dn.indexOf(p.id)>-1)n[p.d]++});
  var rows=P.filter(function(p){return(!F.d||p.d===F.d)&&(!F.c||p.c===F.c)&&(!F.q||(p.t+' '+p.tp+' '+p.c).toLowerCase().indexOf(F.q.toLowerCase())>-1)});
  root.innerHTML=top()+'<div class="ca-body"><div class="ca-w"><div class="ca-sum"><div><b>'+dn.length+' / 200</b>Solved</div><div><b class="ca-e">'+n.e+' / '+tot.e+'</b>Easy</div><div><b class="ca-m">'+n.m+' / '+tot.m+'</b>Medium</div><div><b class="ca-h">'+n.h+' / '+tot.h+'</b>Hard</div></div>'
  +'<div class="ca-tools"><input id="caq" type="search" placeholder="Search 200 problems…" value="'+esc(F.q)+'"><select id="cad"><option value="">All difficulty</option><option value="e">Easy</option><option value="m">Medium</option><option value="h">Hard</option></select><button class="ca-pill" data-rnd>🎲 Pick random</button></div>'
  +'<div class="ca-cats"><button class="ca-pill'+(F.c?'':' on')+'" data-c="">All</button>'+CATS.map(function(c){return'<button class="ca-pill'+(F.c===c?' on':'')+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'</div>'
  +'<div>'+(rows.length?rows.map(function(p){var ok=dn.indexOf(p.id)>-1;return'<button class="ca-row" data-p="'+p.id+'"><span class="ca-ok">'+(ok?'✓':'')+'</span><small>'+p.id+'</small><span>'+esc(p.t)+'</span><small class="c">'+esc(p.c)+'</small><span class="ca-'+p.d+'">'+DN[p.d]+'</span></button>'}).join(''):'<p style="padding:24px;color:var(--muted)">No problems match.</p>')+'</div></div></div>';
  root.querySelector('#cad').value=F.d;}
function view(i){
  var p=P[i-1];if(!p)return;cur=i;var st=S[i],ok=done().indexOf(i)>-1;
  root.innerHTML=top('<button class="ca-b o" data-back>← Problems</button>')+'<div class="ca-body"><div class="ca-view"><div class="ca-pane"><h2>'+p.id+'. '+esc(p.t)+'</h2><span class="ca-tag ca-'+p.d+'">'+DN[p.d]+'</span><span class="ca-tag">'+esc(p.c)+'</span>'+(p.tp!==p.c?'<span class="ca-tag">'+esc(p.tp)+'</span>':'')
  +'<p>'+(st?esc(st[0]):'Write your own solution for <b>'+esc(p.t)+'</b> ('+esc(p.tp)+'). Think about the input and expected output first, then code it in the editor.')+'</p>'
  +(st?'<p><b>Example</b></p><div class="ca-ex">'+esc(st[1])+'</div>':'')
  +'<div class="ca-act"><button class="ca-b o" data-nav="-1">← Prev</button><button class="ca-b o" data-nav="1">Next →</button></div></div>'
  +'<div class="ca-pane"><textarea id="cac" spellcheck="false">'+esc(starter(p))+'</textarea><div class="ca-act">'+'<button class="ca-b" data-run>▶ Run in Java Editor</button>'+'<button class="ca-b o" data-done>'+(ok?'✓ Solved (click to undo)':'Mark as solved')+'</button></div>'+(JAVA[p.c]?'':'<p style="font-size:12px;color:var(--muted);margin:8px 0 0">The Java Editor only runs Java, so for this '+esc(p.c)+' problem it opens a Java starter with the same title.</p>')+'</div></div></div>';
  if(WEB[p.c])webInit(p,ok);
  root.querySelector('textarea').addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();var t=e.target,s0=t.selectionStart;t.value=t.value.slice(0,s0)+'    '+t.value.slice(t.selectionEnd);t.selectionStart=t.selectionEnd=s0+4;t.dispatchEvent(new Event('input',{bubbles:true}))}})}
/* ---- HTML / CSS / JS editor for the web problems ---- */
var WEB={'HTML/CSS':1,'JavaScript':1},WS=null,WT=0;
function wkey(id){return 'ca_web_'+id}
function wstart(p){var t=p.t;return p.c==='JavaScript'?{h:'<div id="app"></div>\n',c:'',j:'// '+t+'\n\n',t:'j'}:{h:'<!-- '+t+' -->\n\n',c:'/* '+t+' */\n\n',j:'',t:'h'}}
function wload(p){var s=wstart(p);try{var d=JSON.parse(localStorage.getItem(wkey(p.id))||'null');if(d&&typeof d==='object'){['h','c','j'].forEach(function(k){if(typeof d[k]==='string')s[k]=d[k]});if(d.t==='h'||d.t==='c'||d.t==='j')s.t=d.t}}catch(e){}return s}
function wsave(){try{localStorage.setItem(wkey(WS.id),JSON.stringify({h:WS.h,c:WS.c,j:WS.j,t:WS.t}))}catch(e){}}
function wlog(kind,txt){var c=root.querySelector('.cw-con');if(!c)return;var d=document.createElement('div');d.className='cw-l '+kind;d.textContent=txt;c.appendChild(d);while(c.childNodes.length>200)c.removeChild(c.firstChild);c.scrollTop=c.scrollHeight}
var WINST='(function(){function f(v){if(typeof v==="string")return v;if(v instanceof Error)return v.name+": "+v.message;if(typeof v==="function")return String(v);var r;try{r=JSON.stringify(v)}catch(e){r=undefined}return r===undefined?String(v):r}'
+'function s(k,a){try{parent.postMessage({ca:1,k:k,m:[].map.call(a,f).join(" ")},"*")}catch(e){}}'
+'["log","info","warn","error","debug"].forEach(function(k){var o=console[k];console[k]=function(){s(k==="info"||k==="debug"?"log":k,arguments);try{o.apply(console,arguments)}catch(e){}}});'
+'window.addEventListener("error",function(e){s("error",[e.message])});'
+'window.addEventListener("unhandledrejection",function(e){s("error",["Unhandled promise rejection: "+f(e.reason)])});})();';
function wrun(){var fr=root.querySelector('.cw-fr');if(!fr||!WS)return;var c=root.querySelector('.cw-con');if(c)c.textContent='';
  var js=WS.j.replace(/<\/script/gi,'<\\/script');
  fr.srcdoc='<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script>'+WINST+'<\/script><style>body{font-family:system-ui,sans-serif;margin:12px;color:#222}</style><style>'+WS.c+'</style></head><body>'+WS.h+'<script>'+js+'\n<\/script></body></html>'}
function wtab(t,init){var pane=root.querySelectorAll('.ca-pane')[1],ta=pane.querySelector('textarea');if(!init)WS[WS.t]=ta.value;WS.t=t;ta.value=WS[t];ta.placeholder={h:'HTML (goes inside <body>)',c:'CSS',j:'JavaScript'}[t];[].forEach.call(pane.querySelectorAll('.cw-t'),function(b){b.classList.toggle('on',b.dataset.tab===t)});if(!init){wsave();ta.focus()}}
function webInit(p,ok){WS=wload(p);WS.id=p.id;WS.live=p.c==='HTML/CSS';var pane=root.querySelectorAll('.ca-pane')[1];
  pane.innerHTML='<div class="cw-tabs"><button class="cw-t" data-tab="h">HTML</button><button class="cw-t" data-tab="c">CSS</button><button class="cw-t" data-tab="j">JS</button><span class="cw-sp"></span><button class="ca-b" data-wrun title="Ctrl+Enter">▶ Run</button></div>'
  +'<textarea id="cac" class="cw-ta" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>'
  +'<div class="cw-lab">Preview</div><iframe class="cw-fr" title="Preview" sandbox="allow-scripts allow-modals allow-forms"></iframe>'
  +'<div class="cw-lab">Console<button type="button" data-wclr>Clear</button></div><div class="cw-con" aria-live="polite"></div>'
  +'<div class="ca-act"><button class="ca-b o" data-done>'+(ok?'✓ Solved (click to undo)':'Mark as solved')+'</button><button class="ca-b o" data-wreset>↺ Reset code</button></div>';
  wtab(WS.t,true);
  pane.querySelector('textarea').addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();wrun()}});
  if(WS.live)wrun()}
root.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!WS)return;
  if(b.dataset.tab)wtab(b.dataset.tab);
  else if(b.hasAttribute('data-wrun'))wrun();
  else if(b.hasAttribute('data-wclr')){var c=root.querySelector('.cw-con');if(c)c.textContent=''}
  else if(b.hasAttribute('data-wreset')){if(confirm('Reset this problem to the starter code?')){try{localStorage.removeItem(wkey(WS.id))}catch(x){}view(WS.id)}}});
root.addEventListener('input',function(e){var t=e.target;if(!WS||!t.classList||!t.classList.contains('cw-ta'))return;WS[WS.t]=t.value;wsave();if(WS.live){clearTimeout(WT);WT=setTimeout(wrun,500)}});
window.addEventListener('message',function(e){var d=e.data;if(!d||d.ca!==1)return;var fr=root.querySelector('.cw-fr');if(!fr||e.source!==fr.contentWindow)return;wlog(d.k==='error'?'err':d.k==='warn'?'warn':'log',String(d.m))});
function open(){root.classList.add('on');B.style.overflow='hidden';list()}
function close(){root.classList.remove('on');B.style.overflow=''}
root.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-x'))close();
  else if(b.hasAttribute('data-back'))list();
  else if(b.dataset.p)view(+b.dataset.p);
  else if(b.hasAttribute('data-c')){F.c=b.dataset.c;list()}
  else if(b.hasAttribute('data-rnd'))view(1+Math.floor(Math.random()*200));
  else if(b.dataset.nav)view(Math.min(200,Math.max(1,cur+ +b.dataset.nav)));
  else if(b.hasAttribute('data-done')){var d=done(),k=d.indexOf(cur);if(k>-1)d.splice(k,1);else d.push(cur);save(d);view(cur)}
  else if(b.hasAttribute('data-run')){var p0=P[cur-1],code=JAVA[p0.c]?root.querySelector('#cac').value:'public class Main {\n    public static void main(String[] args) {\n        // '+p0.t+'\n        \n    }\n}\n';
    if(window.loadJavaEditor)window.loadJavaEditor(code);else{(document.getElementById('jedBtn')||document.querySelector('[data-jed]')).click();setTimeout(function(){var ta=document.getElementById('jd-ta');if(ta){ta.value=code;ta.dispatchEvent(new Event('input',{bubbles:true}))}},350)}}});
root.addEventListener('input',function(e){if(e.target.id==='caq'){F.q=e.target.value;var p=e.target.selectionStart;list();var q=root.querySelector('#caq');q.focus();q.setSelectionRange(p,p)}});
root.addEventListener('change',function(e){if(e.target.id==='cad'){F.d=e.target.value;list()}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('on')&&!document.querySelector('#jed.on'))close()});
/* entry points on Home: hero button + footer link */
var H=document.getElementById('home');
function add(){if(!H)return;var c=H.querySelector('.hm-cta');if(c&&!c.querySelector('[data-ca]')){var b=document.createElement('button');b.type='button';b.className='hm-s';b.setAttribute('data-ca','1');b.textContent='⚔️ CodeArena';c.appendChild(b)}
  var n=H.querySelector('.fx-c[aria-label="Practice"]');if(n&&!n.querySelector('[data-ca]')){var a=document.createElement('button');a.type='button';a.className='fx-l';a.setAttribute('data-ca','1');a.textContent='⚔️ CodeArena (200 problems)';n.appendChild(a)}}
if(H){H.addEventListener('click',function(e){if(e.target.closest('[data-ca]'))open()});var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(add,150)}).observe(H,{childList:true,subtree:true});[300,900,1800].forEach(function(m){setTimeout(add,m)})}
window.openCodeArena=open;
/* nav pills next to Home / OOPs / Collections / Threads / Full Notes / JavaSquadz (the nav row is hidden on mobile, so this is desktop-only) */
(function(){var seg=document.querySelector('.seg');if(!seg||document.getElementById('seg-jed'))return;
function mk(id,tx,fn){var b=document.createElement('button');b.id=id;b.type='button';b.textContent=tx;b.onclick=fn;return b}
seg.appendChild(mk('seg-jed','⌨️ Java Editor',function(){if(window.openJavaEditor)window.openJavaEditor()}));
seg.appendChild(mk('seg-ca','⚔️ CodeArena',open))})();
}catch(err){console.error('codearena',err)}})();
;
