import {readFile,stat} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const context=vm.createContext({window:{}});
for(const name of ['data.js','photos.js','i18n.js'])vm.runInContext(await readFile(new URL(name,root),'utf8'),context,{filename:name});
const {areas,hotels}=context.window.YU_DATA, translations=context.window.YU_I18N;
assert.equal(areas.length,19);assert.equal(hotels.length,12);
assert.equal(new Set(areas.map(a=>a.id)).size,areas.length);assert.equal(new Set(hotels.map(h=>h.id)).size,hotels.length);
for(const [key,values]of Object.entries(translations)){assert.equal(values.length,4,key);assert.ok(values.every(v=>typeof v==='string'&&v.trim()),key)}
for(const item of [...areas,...hotels]){
 for(const locale of ['zh-TW','en','ja','ko'])assert.ok(item.name[locale]?.trim(),`${item.id} ${locale}`);
 if(item.url)assert.equal(new URL(item.url).protocol,'https:');
 if(item.offer){assert.ok(item.offer.min>0&&item.offer.max>=item.offer.min);assert.ok(['bath','package'].includes(item.offer.kind));for(const locale of ['zh-TW','en','ja','ko'])assert.ok(item.offer.detail[locale]);}
}
for(const h of hotels)assert.ok(areas.some(a=>a.id===h.area),h.id);
const photos=context.window.YU_PHOTOS;
assert.equal(Object.keys(photos).length,hotels.length);
for(const h of hotels){const p=photos[h.id];assert.ok(p,`Missing photo ${h.id}`);assert.equal(new URL(p.src).protocol,'https:');assert.equal(new URL(p.source).protocol,'https:');assert.ok(p.credit?.trim());assert.ok(translations[p.kind],`Missing photo caption ${h.id}`);}
for(const a of areas){assert.ok(a.lat>=21.8&&a.lat<=25.5);assert.ok(a.lng>=120&&a.lng<=122);}
const html=await readFile(new URL('index.html',root),'utf8'),app=await readFile(new URL('app.js',root),'utf8');
for(const key of [...html.matchAll(/data-(?:t|placeholder)="([^"]+)"/g)].map(m=>m[1]))assert.ok(translations[key],`Missing translation: ${key}`);
for(const key of [...app.matchAll(/\bt\('([^']+)'/g)].map(m=>m[1]))assert.ok(translations[key],`Missing app translation: ${key}`);
for(const file of ['app.js','data.js','photos.js','i18n.js','styles.css','assets/leaflet.js','assets/leaflet.css','assets/favicon.svg','assets/spring-hero.webp'])assert.ok((await stat(new URL(file,root))).size>0,file);
new vm.Script(app,{filename:'app.js'});
console.log(`PASS: ${areas.length} area locations, ${hotels.length} properties, ${Object.keys(translations).length} complete four-language messages; valid price conditions, references and local assets.`);
