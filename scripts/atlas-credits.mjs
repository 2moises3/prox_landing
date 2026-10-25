import fs from 'node:fs/promises';
const ds=JSON.parse(await fs.readFile('src/data/catalog.json','utf8'));
const titles=ds.map(d=>'File:'+decodeURIComponent(new URL(d.cover_image_url).pathname.split('/').at(-2))).join('|');
const q=new URLSearchParams({action:'query',format:'json',prop:'imageinfo',iiprop:'extmetadata',titles});
const r=await fetch('https://commons.wikimedia.org/w/api.php?'+q,{headers:{'User-Agent':'PROXVEL/1.0 (soporte@m3biznovatech.com)'}});if(!r.ok)throw Error(r.status);const j=await r.json();await fs.writeFile('src/data/atlas-credits.json',JSON.stringify(j.query.pages,null,2));console.log(Object.keys(j.query.pages).length,'credits');
