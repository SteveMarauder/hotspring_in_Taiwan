import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const context=vm.createContext({window:{}});vm.runInContext(await readFile(new URL('../dist/photos.js',import.meta.url),'utf8'),context);
const failed=[];const entries=Object.entries(context.window.YU_PHOTOS);
for(let i=0;i<entries.length;i+=3)await Promise.all(entries.slice(i,i+3).map(async([id,p])=>{try{const r=await fetch(p.src,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(`HTTP ${r.status}`);if(!r.headers.get('content-type')?.startsWith('image/'))throw Error('Not an image');const bytes=(await r.arrayBuffer()).byteLength;if(bytes<1000)throw Error('Suspiciously small image');console.log(`PASS ${id}: ${bytes} bytes`)}catch(e){failed.push(id);console.error(`FAIL ${id}: ${e.message}`)}}));
if(failed.length)process.exitCode=1;else console.log(`PASS: all ${entries.length} official property photos load successfully.`);
