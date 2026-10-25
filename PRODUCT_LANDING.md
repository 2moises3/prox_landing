# Landing de producto

- Catálogo: snapshot público del backend del 25/10/2026, 14 destinos y 10 regiones (`src/data/catalog.json`). Actualizar el snapshot cuando cambie el catálogo; las cifras se calculan desde ese archivo.
- Capturas: widgets originales de Flutter, renderizados a 430 × 900 (exportación 2x). No son capturas de un dispositivo Android. Bienvenida, contenido de Explorar y hoja de filtros. Catálogo público; fotografías locales correspondientes a cada destino; sin sesión personal, favoritos inventados ni porcentajes de afinidad.
- Generador local: `../proxvel_app/test/render/landing_capture_test.dart`. Necesita Vite en 127.0.0.1:5173 para cargar las fotografías. Ejecutar `flutter test test/render/landing_capture_test.dart --no-pub` desde la app. Convertir los PNG a WebP con sharp (calidad 88) y publicar solo los WebP.
- Descarga: todos los botones y el QR usan `useApkDownload`, que conserva la URL estable `/api/v1/releases/latest/download`. El APK no se almacena en esta landing.
- Movimiento: perspectiva CSS y Framer Motion vinculados al scroll. `prefers-reduced-motion` desactiva el movimiento; la composición sigue visible.
- Los archivos legales y el Footer anteriores tienen trabajo local pendiente ajeno al rediseño. Se conservan sin modificaciones ni publicación. Los enlaces a esas rutas todavía devuelven 404 en producción, por lo que el nuevo footer ofrece el contacto de soporte hasta que se publiquen.

## Atlas y contenido (25/10/2026)
- `/atlas.html` es una segunda entrada de Vite, disponible por URL directa sin reglas SPA ni cambios a los archivos legales locales.
- Mapa SVG equirectangular compartiendo proyección para el contorno y los destinos. Geometría: Natural Earth, `ne_110m_admin_0_countries.geojson`, país Peru; dominio público: https://www.naturalearthdata.com/about/terms-of-use/. Archivo original: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson. Cartografía simplificada de referencia; no sirve para navegación.
- Coordenadas contrastadas con el catálogo público de producción. Las líneas son conectores de etiquetas, nunca rutas. Filtros por categoría, búsqueda sin tildes y selección accesible por teclado. El hash permite enlazar cada destino.
- Auditoría de contenido: `proxvel_backend/app/services/thesis_engine.py` y `app/data/tesis_v3/referencia.json` usan intereses, perfil, clima y afluencia; los aspectos ponderados son costos, atención/servicio y atractivos. Se retiraron seguridad y limpieza de las características anunciadas y metadatos.
- El header de inicio observa la intersección del hero; es transparente sobre la imagen y blanco en el resto. No se cambian el tamaño ni las animaciones del título PROXVEL.
