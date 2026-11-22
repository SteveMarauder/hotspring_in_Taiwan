import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=new URL('../docs/',import.meta.url),base='/hotspring_in_Taiwan/';
for(const locale of ['zh-TW','en','ja','ko']){
 const html=await readFile(new URL(locale+'/index.html',root),'utf8');
 assert.ok(html.includes(`<html lang="${locale}">`));assert.ok(html.includes(`name="yu-base" content="${base}"`));
 assert.equal([...html.matchAll(/hreflang=/g)].length,5);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)){assert.ok(match[1].startsWith(base),match[1]);const p=match[1].slice(base.length);if(!p.endsWith('/'))assert.ok((await stat(new URL(p,root))).size>0,p)}
}
const css=await readFile(new URL('styles.css',root),'utf8');assert.ok(!css.includes("url('/assets/"));assert.ok(css.includes(base+'assets/spring-hero.webp'));
for(const file of ['app.js','photos.js','data.js','i18n.js'])new vm.Script(await readFile(new URL(file,root),'utf8'),{filename:file});
const bundled=await readFile(new URL('../preview.html',root),'utf8').catch(error=>{if(error.code==='ENOENT')return null;throw error});
if(bundled){const code=[...bundled.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert.equal(code.length,1);new vm.Script(code[0][1]);assert.ok(code[0][1].includes('window.YU_PHOTOS='));}
console.log('PASS: 4 Pages routes, project asset paths and canonical/alternate metadata.'+(bundled?' Standalone photo bundle also verified.':' Optional standalone preview is not generated.'));
