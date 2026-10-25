import fs from 'node:fs/promises';
const source=await fs.readFile('../proxvel_app/lib/core/legal/legal_texts.dart','utf8');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>s.replace(/\\'/g,"'").replace(/\\n/g,'\n').replace(/\\\\/g,'\\');
for(const [variable,id] of [['privacyPolicy','privacidad'],['termsOfUse','terminos'],['myData','mis-datos']]){
 const start=source.indexOf('const LegalDoc '+variable+' ='); const end=source.indexOf('const LegalDoc ',start+10);const chunk=source.slice(start,end===-1?undefined:end);
 const blocks=[...chunk.matchAll(/LegalBlock\.(h|p)\('((?:\\.|[^'\\])*)'\)|LegalBlock\.ul\(\[([\s\S]*?)\]\)/g)];
 if(blocks.length<5)throw Error('Legal parse failed '+id);
 const html=blocks.map(b=>b[1]?`<${b[1]==='h'?'h2':'p'}>${esc(decode(b[2]))}</${b[1]==='h'?'h2':'p'}>`:'<ul>'+[...b[3].matchAll(/'((?:\\.|[^'\\])*)'/g)].map(v=>'<li>'+esc(decode(v[1]))+'</li>').join('')+'</ul>').join('\n');
 const path='public/'+id+'.html';let s=await fs.readFile(path,'utf8');
 const marker=/<p class="meta">[\s\S]*?<\/p>/;if(!marker.test(s))throw Error('Meta missing');const pos=s.match(marker);const from=pos.index+pos[0].length;const to=s.indexOf('<nav class="docs"',from);if(to<0)throw Error('Docs missing');s=s.slice(0,from)+'\n'+html+'\n'+s.slice(to);await fs.writeFile(path,s);console.log(id,blocks.length,'blocks synced from Flutter');
}
