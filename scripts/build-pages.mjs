import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url),dist=new URL('dist/',root),out=new URL('docs/',root);
const base='/hotspring_in_Taiwan/',origin='https://stevemarauder.github.io';
await mkdir(new URL('assets/',out),{recursive:true});
for(const file of ['app.js','data.js','photos.js','i18n.js'])await copyFile(new URL(file,dist),new URL(file,out));
for(const file of ['leaflet.js','leaflet.css','LEAFLET-LICENSE.txt','favicon.svg','spring-hero.webp'])await copyFile(new URL('assets/'+file,dist),new URL('assets/'+file,out));
let css=await readFile(new URL('styles.css',dist),'utf8');css=css.replaceAll("'/assets/",`'${base}assets/`);await writeFile(new URL('styles.css',out),css);
const template=await readFile(new URL('index.html',dist),'utf8');
const locales={'zh-TW':['湯旅 YU ATLAS｜台灣溫泉地圖','探索台灣溫泉區與飯店實景照片，查看官方參考價格、交通與泡湯資訊。'],en:['YU ATLAS | Taiwan Hot Spring Guide','Explore Taiwan hot springs with real property photos, official reference rates and bathing guides.'],ja:['湯旅 YU ATLAS｜台湾温泉マップ','台湾の温泉地と宿を実景写真で探す。公式参考料金、アクセス、入浴ガイドをご紹介。'],ko:['YU ATLAS｜대만 온천 지도','실제 시설 사진으로 대만 온천과 숙소를 찾아보세요. 공식 참고 요금·교통·온천 가이드를 제공합니다.']};
function page(locale){const[title,description]=locales[locale];const canonical=origin+base+locale+'/';return template.replace('<html lang="zh-TW">',`<html lang="${locale}">`).replace('<meta name="yu-base" content="/">',`<meta name="yu-base" content="${base}">`).replace(/<title>[^<]*<\/title>/,()=>`<title>${title}</title>`).replace(/<meta name="description" content="[^"]*">/,()=>`<meta name="description" content="${description}">`).replaceAll('src="/','src="'+base).replaceAll('href="/','href="'+base).replace('</head>',()=>`<link rel="canonical" href="${canonical}">\n${Object.keys(locales).map(code=>`<link rel="alternate" hreflang="${code}" href="${origin+base+code+'/'}">`).join('\n')}\n<link rel="alternate" hreflang="x-default" href="${origin+base}">\n</head>`)}
await writeFile(new URL('index.html',out),page('zh-TW'));
for(const locale of Object.keys(locales)){await mkdir(new URL(locale+'/',out),{recursive:true});await writeFile(new URL(locale+'/index.html',out),page(locale));}
await writeFile(new URL('404.html',out),page('en'));await writeFile(new URL('.nojekyll',out),'');
await writeFile(new URL('sitemap.xml',out),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(locales).map(locale=>`<url><loc>${origin+base+locale+'/'}<\/loc></url>`).join('')}</urlset>`);
console.log(`Built GitHub Pages static site: ${base} (4 language routes, canonical and alternate links).`);
