// Shared renderer for the study questions pages.
// Expects a global PREP_DATA = [{ cat, q, a:[bullets], table?, code?, tip?, level? }].
// Optional table: { caption, headers:[text], rows:[[text]] }; first column contains row headings.
// Answers are always shown; a table of contents (keywords highlighted) is rendered above the list.
// level is 'Core' (default) or 'Advanced'.
// Bullet text supports `inline code` and **bold**.
(function(){
  // Display order groups by level, then category (first appearance), then original position,
  // so questions appended later to an existing category still show under that category.
  const raw = PREP_DATA.map((x,i)=>({...x, level:x.level||'Core', id:i+1}));
  const catRank = new Map();
  raw.forEach(d=>{ if(!catRank.has(d.cat)) catRank.set(d.cat, catRank.size); });
  const lvlRank = l => l==='Advanced' ? 1 : 0;
  const data = raw.slice().sort((a,b)=> lvlRank(a.level)-lvlRank(b.level) || catRank.get(a.cat)-catRank.get(b.cat) || a.id-b.id);
  data.forEach((d,i)=>{ d.num = i+1; });
  const $ = id => document.getElementById(id);
  let order = data;

  const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmt = s => esc(s)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');

  // Keyword highlighting for the table of contents: every token that isn't a generic question word is a key word.
  const STOP = new Set(`a an the and or nor but of to in on at for with without from into onto by as about over under
    between among within through vs vs. versus is are was were be been being am do does did done doing has have had
    can could will would should shall may might must what what's which who whom whose why when where how how's
    you your yours we our us i me my it its it's this that these those there their them they he she his her
    difference differences different explain describe define definition mean means meaning tell walk give example
    examples e.g e.g. i.e etc use used uses using usage work works working happen happens main key common commonly
    type types kind kinds way ways some any all each every both either one two three own same other others another
    also than then so only just more most less very much many not no yes if else instead does get gets make makes
    create implement handle find fix avoid prevent improve investigate decide choose pick compare comparison need
    needs needed should role purpose benefit benefits advantage advantages pros cons important best practice
    practices exactly really good bad right wrong new old something someone like such too out up down off again
    approach approaches look looks keep keeps call called name names list given end know matter matters evaluate
    detect mitigate reduce protect monitor support supports happens behave behaves`.split(/\s+/).filter(Boolean));
  const kwHtml = q => esc(q).replace(/[@#\w][\w#+@.\-\/()'’]*[\w#+)]|[@#\w]/g,
    t => STOP.has(t.toLowerCase()) || /^\d$/.test(t) ? t : `<mark>${t}</mark>`);

  const cats = [...new Set(data.map(d=>d.cat))];
  const count = f => data.filter(f).length;
  $('cat').innerHTML = '<option value="">All topics</option>' +
    cats.map(c=>`<option value="${esc(c)}">${esc(c)} (${count(d=>d.cat===c)})</option>`).join('');
  $('level').innerHTML = `<option value="">All levels (${data.length})</option>` +
    ['Core','Advanced'].map(l=>`<option value="${l}">${l} (${count(d=>d.level===l)})</option>`).join('');

  function cardHtml(d){
    return `<div class="card" id="q${d.num}">
      <div class="qrow"><span class="qnum">Q${d.num}</span><div class="q">${fmt(d.q)}</div>${d.level==='Advanced'?'<span class="lvl">Advanced</span>':''}</div>
      <div class="answer">
        <ul>${d.a.map(b=>`<li>${fmt(b)}</li>`).join('')}</ul>
        ${d.table ? `<div class="answer-table-wrap" role="region" aria-label="${esc(d.table.caption)}" tabindex="0">
          <table class="answer-table">
            <caption>${fmt(d.table.caption)}</caption>
            <thead><tr>${d.table.headers.map(h=>`<th scope="col">${fmt(h)}</th>`).join('')}</tr></thead>
            <tbody>${d.table.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${fmt(cell)}</th>`:`<td>${fmt(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>` : ''}
        ${d.code ? `<pre><code>${esc(d.code)}</code></pre>` : ''}
        ${d.tip ? `<div class="tip">💡 ${fmt(d.tip)}</div>` : ''}
      </div>
      <div class="actions">
        <a class="to-toc" href="#toc">↑ Contents</a>
      </div>
    </div>`;
  }

  // Word-style table of contents, always in the original grouped order (independent of filters/shuffle).
  const toc = document.createElement('nav');
  toc.id = 'toc';
  $('list').before(toc);
  const groups = [];
  data.forEach(d=>{
    const g = groups[groups.length-1];
    if(g && g.cat===d.cat && g.level===d.level) g.items.push(d); else groups.push({cat:d.cat, level:d.level, items:[d]});
  });
  let tocOpen = localStorage.getItem('prep-toc-open') !== '0';
  function renderToc(){
    toc.innerHTML = `<details${tocOpen?' open':''}><summary>Table of Contents <span class="toc-count">${data.length} questions</span></summary>
      <div class="toc-body">${groups.map(g=>`<div class="toc-group">
        <div class="toc-cat">${esc(g.cat)}${g.level==='Advanced'?' <span class="lvl">Advanced</span>':''}</div>
        <ol>${g.items.map(d=>`<li><a href="#q${d.num}" data-num="${d.num}"><span class="toc-num">Q${d.num}</span><span class="toc-q">${kwHtml(d.q)}</span></a></li>`).join('')}</ol>
      </div>`).join('')}</div></details>`;
    toc.querySelector('details').addEventListener('toggle', e=>{
      if($('search').value.trim()) return; // auto-collapse while searching shouldn't change the saved preference
      tocOpen = e.target.open; localStorage.setItem('prep-toc-open', tocOpen?'1':'0');
    });
  }

  // Collapse the TOC while a search term is entered; restore the saved state once the search is cleared.
  function syncTocWithSearch(){
    const det = toc.querySelector('details');
    det.open = $('search').value.trim() ? false : tocOpen;
  }

  function goTo(num, smooth){
    let el = document.getElementById('q'+num);
    if(!el){ // hidden by search/filters → clear them so the question is visible
      $('search').value=''; $('cat').value=''; $('level').value='';
      syncTocWithSearch(); render(); el = document.getElementById('q'+num);
    }
    if(!el) return;
    el.scrollIntoView({behavior: smooth?'smooth':'auto', block:'start'});
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    history.replaceState(null,'','#q'+num);
  }
  toc.addEventListener('click', e=>{
    const a = e.target.closest('a[data-num]'); if(!a) return;
    e.preventDefault(); goTo(+a.dataset.num, true);
  });

  // Keep anchor targets below the sticky header.
  const setHdr = ()=> document.documentElement.style.setProperty('--hdr', document.querySelector('header').offsetHeight+'px');
  window.addEventListener('resize', setHdr);

  function render(){
    const term = $('search').value.trim().toLowerCase();
    const cat = $('cat').value;
    const level = $('level').value;
    // Search matches the question text only, not answers or code.
    const text = d => d.q.toLowerCase();
    const base = order.filter(d => (!cat || d.cat===cat) && (!level || d.level===level));
    let list = base.filter(d => !term || text(d).includes(term));
    // No exact-phrase hit → match all words in any order (e.g. "ref vs in vs out" finds "ref vs out vs in").
    if(!list.length && term){
      const words = term.split(/\s+/);
      list = base.filter(d => words.every(w => text(d).includes(w)));
    }
    let html = '';
    if(order === data){
      let last = null;
      list.forEach(d=>{ if(d.cat!==last){ html += `<div class="cat-title">${esc(d.cat)}</div>`; last=d.cat; } html += cardHtml(d); });
    } else {
      html = list.map(cardHtml).join('');
    }
    $('list').innerHTML = html || '<div class="empty">No questions match.</div>';
  }

  $('search').oninput = ()=>{ syncTocWithSearch(); render(); window.scrollTo(0, 0); };
  $('cat').onchange = render;
  $('level').onchange = render;
  $('shuffle').onclick = e=>{
    if(order===data){
      order = data.slice().sort(()=>Math.random()-.5);
      e.target.textContent='Original order';
    } else { order = data; e.target.textContent='Shuffle'; }
    render();
  };

  setHdr();
  renderToc();
  render();
  const m = location.hash.match(/^#q(\d+)$/);
  if(m) goTo(+m[1], false);
})();
