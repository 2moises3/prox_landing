import fs from 'node:fs/promises';
import sharp from 'sharp';
const manifest = JSON.parse(await fs.readFile('src/data/atlas-gallery.json', 'utf8'));
for (const item of Object.values(manifest).flat()) {
  const target = `public${item.src}`;
  try { await fs.access(target); console.log('EXISTS', target); continue; } catch {}
  const response = await fetch(item.source, { headers: { 'User-Agent': 'PROXVEL/1.0 (tourism media; soporte@m3biznovatech.com)' } });
  if (!response.ok) throw new Error(`${response.status}: ${item.source}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (item.type === 'image') {
    await sharp(bytes).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
  } else {
    await fs.writeFile(target, bytes);
  }
  console.log('SAVED', target, (await fs.stat(target)).size);
}
