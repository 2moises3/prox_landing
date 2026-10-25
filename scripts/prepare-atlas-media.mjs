import fs from 'node:fs/promises';
import sharp from 'sharp';
const catalog=JSON.parse(await fs.readFile('src/data/catalog.json','utf8'));
const manifest={};
for(const d of catalog){
 try{
 const u=new URL(d.cover_image_url);const pieces=u.pathname.split('/');const file=decodeURIComponent(pieces.at(-2));
 const source='https://upload.wikimedia.org'+pieces.slice(0,-1).join('/').replace('/thumb/','/');
 const r=await fetch(source,{headers:{'User-Agent':'PROXVEL/1.0 (tourism catalogue; soporte@m3biznovatech.com)'}});if(!r.ok)throw Error(r.status);
 const bytes=Buffer.from(await r.arrayBuffer());const info=await sharp(bytes).metadata();
 await sharp(bytes).rotate().resize({width:2400,withoutEnlargement:true}).webp({quality:88}).toFile(`public/media/${d.destination_id}.webp`);
 await sharp(bytes).rotate().resize({width:144,height:144,fit:'cover'}).webp({quality:80}).toFile(`public/media/${d.destination_id}-pin.webp`);
 manifest[d.destination_id]={image:`/media/${d.destination_id}.webp`,pin:`/media/${d.destination_id}-pin.webp`,source,credit:`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,originalWidth:info.width,originalHeight:info.height};
 console.log(d.destination_id,info.width,info.height);
 }catch(e){console.log('FAILED',d.destination_id,e.message);}
}
await fs.writeFile('src/data/atlas-media.json',JSON.stringify(manifest,null,2));
const video=await fetch('https://videos.pexels.com/video-files/29070674/12564706_1080_1920_30fps.mp4');if(!video.ok)throw Error('video '+video.status);await fs.writeFile('public/media/machu-picchu-nando-freitas.mp4',Buffer.from(await video.arrayBuffer()));console.log('Video saved');
