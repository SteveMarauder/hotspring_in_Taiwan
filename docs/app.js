(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const {areas,hotels,checked}=window.YU_DATA;
const photos=window.YU_PHOTOS;
const basePath=document.querySelector('meta[name=yu-base]')?.content||'/';
const langs=['zh-TW','en','ja','ko'];
const languageIndex=l=>langs.indexOf(l);
const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch{return false}}};
const initialParams=new URLSearchParams(location.search);
let storedSaved=[];try{storedSaved=JSON.parse(storage.get('yu-saved')||'[]')}catch{}
const saved=new Set(Array.isArray(storedSaved)?storedSaved.filter(id=>hotels.some(h=>h.id===id)):[]);
const valid=(v,options,fallback)=>options.includes(v)?v:fallback;
function detectLanguage(){const relativePath=location.pathname.startsWith(basePath)?location.pathname.slice(basePath.length):location.pathname.slice(1);const route=relativePath.split('/')[0];if(langs.includes(route))return route;const stored=storage.get('yu-language');if(langs.includes(stored))return stored;if(window.YU_PREVIEW)return 'zh-TW';const browser=(navigator.language||'en').toLowerCase();return browser.startsWith('zh')?'zh-TW':browser.startsWith('ja')?'ja':browser.startsWith('ko')?'ko':'en'}
let lang=detectLanguage();
const state={q:initialParams.get('q')||'',region:valid(initialParams.get('region'),['all','north','central','south','east'],'all'),area:valid(initialParams.get('area'),['all',...areas.map(a=>a.id)],'all'),type:valid(initialParams.get('type'),['all','bath','private','stay'],'all'),budget:valid(initialParams.get('budget'),['all','low','mid','high'],'all'),saved:initialParams.get('saved')==='1',layout:initialParams.get('view')==='list'?'list':'map'};
const t=(key,vars={})=>{let value=window.YU_I18N[key]?.[languageIndex(lang)]??key;for(const[k,v]of Object.entries(vars))value=value.replaceAll(`{${k}}`,v);return value};
const text=v=>typeof v==='string'?v:v?.[lang]||v?.en||'';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const areaFor=h=>areas.find(a=>a.id===h.area);
const money=n=>'NT$'+n.toLocaleString('en-US');
const icons={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',heart:'<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-4 4 1 9 8 15 7-6 12-11 8-15Z"/>',globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6.5h14M5 17.5h14"/>',bath:'<path d="M3 13h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2Zm3 0V5a2 2 0 0 1 4 0M7 21v1m10-1v1M14 8v2m4-4v3"/>',wallet:'<path d="M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7M20 11h-5v5h5"/><path d="M17 13.5h.01"/>',map:'<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2V5Zm6-2v15m6-12v15"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',mountain:'<path d="m2 20 8-15 5 8 3-5 5 12H2Zm5-9 3 3 3-3"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',train:'<rect x="5" y="3" width="14" height="16" rx="4"/><path d="M5 11h14M12 3v8M8 15h.01M16 15h.01M8 19l-2 3m10-3 2 3"/>'};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.info}</svg>`}
function hydrateIcons(){for(const node of $$('[data-icon]'))node.innerHTML=icon(node.dataset.icon)}

function photoMarkup(h,context='card'){
 const p=photos[h.id];
 const image=`<img class="property-photo" data-property-photo="${h.id}" src="${esc(p.src)}" alt="${esc(text(h.name)+' · '+t(p.kind))}" width="960" height="640" loading="${context==='card'?'lazy':'eager'}" decoding="async" referrerpolicy="no-referrer" style="object-position:${esc(p.position||'50% 50%')}"/><span class="photo-failure">${esc(t('photoUnavailable'))}</span>`;
 return context==='card'?`<button class="photo-open" data-detail="${h.id}" aria-label="${esc(t('details')+' · '+text(h.name))}">${image}</button>`:`<div class="photo-open photo-static">${image}</div>`;
}
function photoAttribution(h){const p=photos[h.id];return `<div class="photo-attribution"><span>© ${esc(p.credit)}</span><a href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">${esc(t('photoSource'))}</a><a href="${esc(p.src)}" target="_blank" rel="noopener noreferrer">${esc(t('photoOriginal'))}</a><p>${esc(t('photoNote'))}</p></div>`;}
function normalise(v){return String(v).normalize('NFKC').toLocaleLowerCase().replace(/[\s’'・·-]/g,'')}
function matches(h){
 const a=areaFor(h);
 if(state.region!=='all'&&a.region!==state.region)return false;
 if(state.area!=='all'&&h.area!==state.area)return false;
 if(state.type!=='all'&&!h.types.includes(state.type))return false;
 if(state.saved&&!saved.has(h.id))return false;
 if(state.budget!=='all'){
   if(!h.offer||h.offer.kind!=='bath')return false;
   const price=h.offer.min;
   if(state.budget==='low'&&price>500)return false;
   if(state.budget==='mid'&&(price<=500||price>1500))return false;
   if(state.budget==='high'&&price<=1500)return false;
 }
 const haystack=normalise([...Object.values(h.name),...Object.values(a.name),...Object.values(a.city),a.id,h.id].join(' '));
 return state.q.trim().split(/\s+/).every(part=>haystack.includes(normalise(part)));
}
function syncUrl(){if(window.YU_PREVIEW||location.protocol==='file:')return;const params=new URLSearchParams();for(const key of ['q','region','area','type','budget'])if(state[key]&&state[key]!=='all')params.set(key,state[key]);if(state.saved)params.set('saved','1');if(state.layout==='list')params.set('view','list');const url=`${basePath}${lang}/`+(params.size?'?'+params:'')+location.hash;history.replaceState({},'',url)}
function options(){
 $('#area').innerHTML=`<option value="all">${esc(t('allAreas'))}</option>`+['north','central','south','east'].map(region=>`<optgroup label="${esc(t(region))}">${areas.filter(a=>a.region===region).map(a=>`<option value="${a.id}">${esc(text(a.name))} · ${esc(text(a.city))}</option>`).join('')}</optgroup>`).join('');$('#area').value=state.area;
 $('#type').innerHTML=['all','bath','private','stay'].map(key=>`<option value="${key}">${esc(t(key==='all'?'allTypes':key))}</option>`).join('');$('#type').value=state.type;
 $('#budget').innerHTML=[['all','allBudgets'],['low','budgetLow'],['mid','budgetMid'],['high','budgetHigh']].map(([key,label])=>`<option value="${key}">${esc(t(label))}</option>`).join('');$('#budget').value=state.budget;
}
function card(h){const a=areaFor(h),isSaved=saved.has(h.id);return `<article class="card" data-id="${h.id}"><div class="card-art">${photoMarkup(h)}<span class="card-badge">${esc(t(h.tag))}</span><button class="save-button" data-save="${h.id}" aria-pressed="${isSaved}" aria-label="${esc(t(isSaved?'unsave':'save'))}">${icon('heart')}</button><span class="art-caption">${esc(t(photos[h.id].kind))}</span></div><div class="card-body"><div class="card-location">${icon('pin')}${esc(text(a.city))} · ${esc(text(a.name))}</div><h3>${esc(text(h.name))}</h3>${lang!=='zh-TW'?`<div class="card-original" lang="zh-TW">${esc(h.name['zh-TW'])}</div>`:''}<p class="card-description">${esc(text(h.desc))}</p><div class="card-bottom"><div>${h.offer?`<div class="price-value">${money(h.offer.min)}<small>${esc(t('from'))}</small></div><span class="price-unit">${esc(t(h.offer.kind==='package'?'packageUnit':'perPerson'))}</span>`:`<div class="unknown-price">${esc(t('checkPrice'))}</div><span class="price-unit">${esc(t('dateBased'))}</span>`}</div><button class="detail-button" data-detail="${h.id}">${esc(t('details'))}</button></div></div></article>`}
let map,layer,markerLayer,mapReady=false,tilesLoaded=false,diagram=false,mapTimer,dialogContext=null,toastTimer;
function render({fit=false}={}){
 const results=hotels.filter(matches);
 $('#regions').innerHTML=['all','north','central','south','east'].map(r=>`<button data-region="${r}" aria-pressed="${state.region===r}">${esc(t(r))}</button>`).join('');
 $('#cards').innerHTML=results.map(card).join('');$('#empty').hidden=results.length>0;$('#cards').hidden=results.length===0;
 $('#result-count').textContent=t('results',{n:results.length});
 $('#active-area').textContent=[state.area!=='all'?text(areas.find(a=>a.id===state.area).name):'',state.saved?t('savedOnly'):''].filter(Boolean).join(' · ');
 $('#saved-count').textContent=saved.size;$('#favorites').setAttribute('aria-pressed',String(state.saved));
 const filtered=!!(state.q||state.region!=='all'||state.area!=='all'||state.type!=='all'||state.budget!=='all'||state.saved);
 $('#reset').hidden=!filtered;
 $('#area-source').href=window.YU_DATA.areaSource;
 $('#explorer').classList.toggle('map-mode-hidden',state.layout==='list');
 for(const view of ['map','list']){const button=$(`#${view}-view`);button.classList.toggle('selected',state.layout===view);button.setAttribute('aria-pressed',String(state.layout===view));}
 if(mapReady){drawMap();if(fit)fitMap();if(state.layout==='map')requestAnimationFrame(()=>map.invalidateSize());}
 drawDiagram();syncUrl();
}
function applyLanguage(){
 document.documentElement.lang=lang;document.title=t('title');$('#language').value=lang;
 for(const el of $$('[data-t]')){const key=el.dataset.t;if(key==='hero')el.innerHTML=t(key);else el.textContent=t(key)}
 for(const el of $$('[data-placeholder]'))el.placeholder=t(el.dataset.placeholder);
 $('#search').ariaLabel=t('searchPlaceholder');$('#area').ariaLabel=t('allAreas');$('#type').ariaLabel=t('allTypes');$('#budget').ariaLabel=t('allBudgets');$('#dialog-close').ariaLabel=t('close');$('#map-reset').ariaLabel=t('mapReset');
 $('meta[name=description]').content=t('heroSub');
 options();hydrateIcons();render();
 if(diagram)$('#schematic-toggle').textContent=t('streetMap');
 if(dialogContext)showContext(dialogContext);
}
function reset(){Object.assign(state,{q:'',region:'all',area:'all',type:'all',budget:'all',saved:false});$('#search').value='';options();render({fit:true})}
function toast(key){clearTimeout(toastTimer);$('#toast').textContent=t(key);$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,2100)}
function toggleSaved(id){if(saved.has(id)){saved.delete(id);toast('removed')}else{saved.add(id);toast('added')}storage.set('yu-saved',JSON.stringify([...saved]));render();if(dialogContext?.kind==='hotel')showContext(dialogContext)}
function visibleAreas(){
 const resultAreas=new Set(hotels.filter(matches).map(h=>h.area));
 const restrictive=state.q.trim()||state.type!=='all'||state.budget!=='all'||state.saved;
 return areas.filter(a=>(state.region==='all'||a.region===state.region)&&(state.area==='all'||state.area===a.id)&&(!restrictive||resultAreas.has(a.id)));
}
function fitMap(){if(!map)return;const a=visibleAreas();if(a.length===1)map.setView([a[0].lat,a[0].lng],11,{animate:false});else if(a.length>1)map.fitBounds(a.map(a=>[a.lat,a.lng]),{padding:[45,35],maxZoom:10,animate:false});else map.fitBounds([[21.9,120.2],[25.4,122.0]],{padding:[16,16],animate:false})}
function selectArea(id){state.area=id;state.region='all';$('#area').value=id;render();const a=areas.find(a=>a.id===id);if(map&&!diagram)map.setView([a.lat,a.lng],11,{animate:false});$('#explore').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
function drawMap(){
 if(!mapReady)return;
 markerLayer.clearLayers();
 const groups=[];
 for(const a of visibleAreas()){
   const pos=map.latLngToContainerPoint([a.lat,a.lng]);
   const group=groups.find(g=>g.members.every(m=>{const p=map.latLngToContainerPoint([m.lat,m.lng]);return Math.abs(pos.x-p.x)<80&&Math.abs(pos.y-p.y)<35}));
   if(group)group.members.push(a);else groups.push({members:[a]});
 }
 for(const group of groups){
   const members=group.members;
   if(members.length>1){
     const lat=members.reduce((v,a)=>v+a.lat,0)/members.length,lng=members.reduce((v,a)=>v+a.lng,0)/members.length;
     const marker=L.marker([lat,lng],{icon:L.divIcon({className:'area-pin',html:`<span class="cluster-pin">${members.length}</span>`,iconSize:[36,36],iconAnchor:[18,18]}),title:members.map(a=>text(a.name)).join(', ')}).addTo(markerLayer);
     marker.on('click',()=>map.fitBounds(members.map(a=>[a.lat,a.lng]),{padding:[65,65],maxZoom:14}));
   }else{
     const a=members[0];
     const marker=L.marker([a.lat,a.lng],{icon:L.divIcon({className:'area-pin',html:`<span class="pin-label ${state.area===a.id?'selected':''}">${esc(text(a.name))}</span>`,iconSize:[100,28],iconAnchor:[0,14]}),title:text(a.name),keyboard:true}).addTo(markerLayer);
     marker.on('click',()=>selectArea(a.id));
   }
 }
}
// Simplified original geographic diagram: approximate outline, never for navigation.
const coast=[[121.55,25.30],[121.78,25.17],[121.95,25.12],[121.82,24.85],[121.84,24.62],[121.66,24.30],[121.60,24.08],[121.50,23.75],[121.44,23.47],[121.39,23.17],[121.22,22.91],[121.10,22.69],[120.99,22.56],[120.89,22.36],[120.86,22.12],[120.90,21.93],[120.83,21.91],[120.72,22.02],[120.64,22.27],[120.51,22.50],[120.32,22.62],[120.17,22.88],[120.04,23.12],[120.09,23.43],[120.13,23.70],[120.26,24.02],[120.48,24.32],[120.69,24.60],[120.91,24.82],[121.05,25.04],[121.28,25.11],[121.42,25.24],[121.55,25.30]];
const project=([lng,lat])=>[45+(lng-119.9)*150,30+(25.5-lat)*118];
function drawDiagram(){
 const target=$('#map-fallback');
 const path=coast.map((c,i)=>{const[x,y]=project(c);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+'Z';
 const shown=visibleAreas();
 // Use lettered callouts with leader lines instead of overlapping nearby northern labels.
 const list=shown.map(a=>{const[x,y]=project([a.lng,a.lat]);return {a,x,y,labelX:x+14,labelY:y}}).sort((a,b)=>a.y-b.y);
 let last=-20;
 for(const p of list){p.labelY=Math.max(p.y,last+18);last=p.labelY}
 const pins=list.map(({a,x,y,labelX,labelY})=>`<g class="diagram-area" tabindex="0" role="button" data-area="${a.id}" aria-label="${esc(text(a.name))}"><title>${esc(text(a.name))}</title><path d="M${x},${y}L${labelX},${labelY}" stroke="#729887" stroke-width=".8"/><circle cx="${x}" cy="${y}" r="${state.area===a.id?5:3.5}" fill="${state.area===a.id?'#c96d46':'#28624b'}" stroke="white" stroke-width="1.5"/><rect x="${labelX}" y="${labelY-8}" width="${Math.min(125,Math.max(45,text(a.name).length*(lang==='en'?5.3:9)+12))}" height="17" rx="8" fill="${state.area===a.id?'#174e3f':'#fbfdf9'}" stroke="#bfd0c1" stroke-width=".5"/><text x="${labelX+6}" y="${labelY+3}" font-size="9" fill="${state.area===a.id?'white':'#315b45'}">${esc(text(a.name))}</text></g>`).join('');
 target.innerHTML=`<svg viewBox="0 0 460 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(t('mapTitle'))}"><defs><linearGradient id="land" x2="1" y2="1"><stop stop-color="#e6edce"/><stop offset="1" stop-color="#bfd3bd"/></linearGradient><pattern id="sea-lines" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M0 47H48M47 0V48" stroke="#c7ddd5" stroke-width=".4"/></pattern></defs><rect width="460" height="500" fill="#e3eeeb"/><rect width="460" height="500" fill="url(#sea-lines)"/><path d="${path}" fill="url(#land)" stroke="#8eb2a0" stroke-width="1.1"/><path d="M267 107c-30 72-54 151-96 216M280 119c-32 70-50 149-83 190M247 115c-30 58-39 110-68 176" fill="none" stroke="#99b697" stroke-width="8" opacity=".2"/><text x="54" y="244" fill="#96b5aa" font-family="Georgia,serif" font-size="11" letter-spacing="4" transform="rotate(-65 54 244)">TAIWAN STRAIT</text><text x="345" y="350" fill="#96b5aa" font-family="Georgia,serif" font-size="10" letter-spacing="3" transform="rotate(-65 345 350)">PACIFIC OCEAN</text><path d="M409 48v-22m-4 7 4-7 4 7" fill="none" stroke="#527b68"/><text x="405" y="19" font-size="10" fill="#527b68">N</text>${pins}</svg><span class="diagram-credit">YU ATLAS · ${esc(t('areaPins'))}</span>`;
 target.hidden=!diagram;
}
function setDiagram(on){diagram=on;$('#map').classList.toggle('diagram-mode',on);$('#map-fallback').hidden=!on;$('#schematic-toggle').textContent=t(on?'streetMap':'schematic');if(map){map.closePopup();map.dragging[on?'disable':'enable']();map.scrollWheelZoom.disable();if(on&&map.hasLayer(layer))map.removeLayer(layer);else if(!on&&!map.hasLayer(layer))layer.addTo(map)}drawDiagram()}
function initMap(){
 if(!window.L||window.YU_PREVIEW||location.protocol==='file:'){diagram=true;setDiagram(true);$('#schematic-toggle').hidden=true;return}
 map=L.map('map',{zoomControl:false,scrollWheelZoom:false,attributionControl:true,minZoom:6,maxZoom:17});
 L.control.zoom({position:'topright'}).addTo(map);
 layer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',maxZoom:19});
 layer.on('tileload',()=>{tilesLoaded=true;clearTimeout(mapTimer)});
 layer.addTo(map);markerLayer=L.layerGroup().addTo(map);mapReady=true;
 map.on('moveend zoomend',drawMap);fitMap();drawMap();
 mapTimer=setTimeout(()=>{if(!tilesLoaded)setDiagram(true)},6500);
 $('#map-fallback').hidden=true;
}
const collections={city:{title:'cityTitle',sub:'citySub',icon:'train',ids:['longnice','gaia','royal-jiaoxi']},mountain:{title:'mountainTitle',sub:'mountainSub',icon:'mountain',ids:['hoshinoya','papawaqa','volando']},south:{title:'southTitle',sub:'southSub',icon:'sun',ids:['qingquan','myspa','reikei']}};
function renderCollections(){$('#collection-grid').innerHTML=Object.entries(collections).map(([key,c])=>`<button class="collection" data-collection="${key}">${icon(c.icon)}<h3>${esc(t(c.title))}</h3><p>${esc(t(c.sub))}</p><small>${esc(t('viewCollection'))}</small></button>`).join('')}
function section(title,body){return `<section class="detail-section"><h3>${esc(t(title))}</h3><p>${esc(body)}</p></section>`}
function hotelDetail(h){const a=areaFor(h);return `<div class="dialog-art photo-detail">${photoMarkup(h,'detail')}<span class="art-caption">${esc(t(photos[h.id].kind))}</span></div><div class="dialog-body"><p class="eyebrow">${esc(text(a.city))} / ${esc(text(a.name))}</p><h2 id="dialog-title">${esc(text(h.name))}</h2>${lang!=='zh-TW'?`<p class="dialog-original" lang="zh-TW">${esc(h.name['zh-TW'])}</p>`:''}<p class="dialog-intro">${esc(text(h.desc))}</p>${photoAttribution(h)}<section class="detail-section"><h3>${esc(t('priceConditions'))}</h3>${h.offer?`<span class="price-value">${money(h.offer.min)}–${money(h.offer.max)}</span><p>${esc(text(h.offer.detail))}</p>`:`<p>${esc(t('unknownPrice'))}</p>`}</section>${section('bathRules',(h.rule?text(h.rule)+' '+t('moreRules'):t('unknownRules')))}${section('transport',h.transport?text(h.transport)+' '+t('unknownTransport'):t('unknownTransport'))}<div class="dialog-actions"><a class="primary" href="${esc(h.url)}" target="_blank" rel="noopener noreferrer">${icon('globe')}${esc(t('official'))}</a><a class="secondary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name['zh-TW']+' '+a.city['zh-TW'])}" target="_blank" rel="noopener noreferrer">${esc(t('navigate'))}</a><button class="secondary" data-save="${h.id}">${esc(t(saved.has(h.id)?'unsave':'save'))}</button></div><p class="source-line">${esc(t('source'))}：<a href="${esc(h.source||h.url)}" target="_blank" rel="noopener noreferrer">${esc(new URL(h.source||h.url).hostname)}</a><br>${esc(t('updated'))}<br>${esc(t('unknownTaxes'))}</p></div>`}
function guideDetail(){return `<div class="dialog-body"><p class="eyebrow">YU ATLAS / BEFORE YOU GO</p><h2 id="dialog-title">${esc(t('guide'))}</h2><p class="dialog-intro">${esc(t('guideIntro'))}</p>${section('swimTitle',t('swimText'))}${section('privateTitle',t('privateText'))}${section('reserveTitle',t('reserveText'))}${section('familyTitle',t('familyText'))}</div>`}
function methodDetail(){return `<div class="dialog-body"><p class="eyebrow">YU ATLAS / EDITORIAL NOTES</p><h2 id="dialog-title">${esc(t('methodTitle'))}</h2><p class="dialog-intro">${esc(t('methodIntro'))}</p>${section('methodDataTitle',t('methodData'))}${section('methodRankTitle',t('methodRank'))}${section('methodPriceTitle',t('methodPrice'))}${section('methodMapTitle',t('methodMap'))}<p class="source-line"><a href="${window.YU_DATA.areaSource}" target="_blank" rel="noopener noreferrer">${esc(t('areaSource'))}</a> · <a href="https://operations.osmfoundation.org/policies/tiles/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a></p></div>`}
function collectionDetail(key){const c=collections[key];return `<div class="dialog-body"><p class="eyebrow">${esc(t('editorial'))}</p><h2 id="dialog-title">${esc(t(c.title))}</h2><p class="dialog-intro">${esc(t(c.sub))}</p><p style="font-size:14px;color:var(--muted)">${esc(t('collectionReason'))}</p><div class="ranking-list">${c.ids.map((id,i)=>{const h=hotels.find(h=>h.id===id),a=areaFor(h);return `<button class="ranking-item" data-detail="${id}"><span class="rank">${i+1}</span><span><strong>${esc(text(h.name))}</strong><small>${esc(text(a.name))} · ${esc(text(h.desc))}</small></span></button>`}).join('')}</div><div class="detail-section"><p>${esc(t('methodRank'))}</p></div></div>`}
function showContext(context){dialogContext=context;$('#dialog-content').innerHTML=context.kind==='hotel'?hotelDetail(hotels.find(h=>h.id===context.id)):context.kind==='collection'?collectionDetail(context.id):context.kind==='guide'?guideDetail():methodDetail();const dialog=$('#detail-dialog');if(!dialog.open)dialog.showModal();$('#dialog-content').scrollTop=0;dialog.scrollTop=0;}
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&e.target.matches('[data-property-photo]'))e.target.closest('.photo-open')?.classList.add('photo-missing')},true);
document.addEventListener('click',e=>{
 const save=e.target.closest('[data-save]');if(save){toggleSaved(save.dataset.save);return}
 const detail=e.target.closest('[data-detail]');if(detail){showContext({kind:'hotel',id:detail.dataset.detail});return}
 const guide=e.target.closest('[data-guide]');if(guide){showContext({kind:guide.dataset.guide});return}
 const collection=e.target.closest('[data-collection]');if(collection){showContext({kind:'collection',id:collection.dataset.collection});return}
 const region=e.target.closest('[data-region]');if(region){state.region=region.dataset.region;state.area='all';$('#area').value='all';render({fit:true});return}
});
$('#map-fallback').addEventListener('click',e=>{const area=e.target.closest('[data-area]');if(area){e.stopPropagation();selectArea(area.dataset.area)}});
$('#map-fallback').addEventListener('keydown',e=>{const area=e.target.closest('[data-area]');if(area&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();selectArea(area.dataset.area)}});
$('#search').value=state.q;
$('#search').addEventListener('input',e=>{state.q=e.target.value;render()});
$('#search-form').addEventListener('submit',e=>{e.preventDefault();render({fit:true});$('#explore').scrollIntoView({behavior:'smooth',block:'start'})});
$('#area').addEventListener('change',e=>{state.area=e.target.value;state.region='all';render({fit:true})});
for(const key of ['type','budget'])$(`#${key}`).addEventListener('change',e=>{state[key]=e.target.value;render({fit:true})});
$('#language').addEventListener('change',e=>{lang=e.target.value;storage.set('yu-language',lang);applyLanguage();renderCollections()});
$('#favorites').addEventListener('click',()=>{state.saved=!state.saved;render({fit:true});$('#explore').scrollIntoView({behavior:'smooth'})});
$('#reset').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
for(const view of ['list','map'])$(`#${view}-view`).addEventListener('click',()=>{state.layout=view;render()});
$('#map-reset').addEventListener('click',()=>{state.area='all';$('#area').value='all';render({fit:true})});
$('#schematic-toggle').addEventListener('click',()=>setDiagram(!diagram));
$('#method-link').addEventListener('click',()=>showContext({kind:'method'}));
$('#dialog-close').addEventListener('click',()=>$('#detail-dialog').close());
$('#detail-dialog').addEventListener('close',()=>{dialogContext=null});
$('#detail-dialog').addEventListener('click',e=>{if(e.target===$('#detail-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});
applyLanguage();renderCollections();initMap();
})();
