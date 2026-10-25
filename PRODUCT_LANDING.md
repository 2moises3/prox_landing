# Landing de producto

- Catálogo: snapshot público del backend del 25/10/2026, 14 destinos y 10 regiones (`src/data/catalog.json`). Actualizar el snapshot cuando cambie el catálogo; las cifras se calculan desde ese archivo.
- Capturas: widgets originales de Flutter, renderizados a 430 × 900 (exportación 2x). No son capturas de un dispositivo Android. Bienvenida, contenido de Explorar y hoja de filtros. Catálogo público; fotografías locales correspondientes a cada destino; sin sesión personal, favoritos inventados ni porcentajes de afinidad.
- Generador local: `../proxvel_app/test/render/landing_capture_test.dart`. Necesita Vite en 127.0.0.1:5173 para cargar las fotografías. Ejecutar `flutter test test/render/landing_capture_test.dart --no-pub` desde la app. Convertir los PNG a WebP con sharp (calidad 88) y publicar solo los WebP.
- Descarga: todos los botones y el QR usan `useApkDownload`, que conserva la URL estable `/api/v1/releases/latest/download`. El APK no se almacena en esta landing.
- Movimiento: perspectiva CSS y Framer Motion vinculados al scroll. `prefers-reduced-motion` desactiva el movimiento; la composición sigue visible.
- Los archivos legales y el Footer anteriores tienen trabajo local pendiente ajeno al rediseño. Se conservan sin modificaciones ni publicación. Los enlaces a esas rutas todavía devuelven 404 en producción, por lo que el nuevo footer ofrece el contacto de soporte hasta que se publiquen.
