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

## Atlas cinematográfico — vista previa local (2026-10-25)

- Mapa SVG gris con contorno Natural Earth 50m y divisiones administrativas Natural Earth 10m (dominio público). Coordenadas del catálogo existente; regiones redondeadas a cuatro decimales para reducir tamaño.
- Pines fotográficos. Agrupación por proximidad en pantalla, zoom a la distancia necesaria para separar los destinos, rueda centrada en el cursor y arrastre. Límite 96x para separar los puntos cercanos incluso en pantallas pequeñas; tamaño de pin constante en pantalla.
- Escena por destino: fotografías del catálogo y activos existentes, transición, movimiento suave, controles de pausa/foto, mapa de retorno, enlace de ubicación y descarga estable. Se preservan zoom, búsqueda y filtro al volver.
- Intereses importados de `proxvel_backend/app/data/tesis_v3/destinos.csv`. Perfiles editoriales derivados de esos intereses, identificados como orientación; no representan una puntuación personalizada ni ejecutan el motor de recomendaciones.
- Se excluye `Viagens Catarata.webp` del atlas: no se pudo confirmar que correspondiera a Ahuashiyacu. Se utiliza la portada identificada por el catálogo.
- Respeta movimiento reducido y pausa el avance del carrusel cuando la pestaña está oculta. Las fotos de un destino se cargan al abrirlo; los pines usan la primera imagen.
- No se añadieron videos: las tomas gratuitas consultadas de Machu Picchu eran verticales y no se seleccionaron para el fondo panorámico. Esta versión utiliza fotografía animada, no video real. No se usan imágenes generadas para representar destinos.
- Fuentes cartográficas: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson ; términos: https://www.naturalearthdata.com/about/terms-of-use/
- Candidatos de video revisados, NO integrados: Pexels 32001018 (James Seguil, 2160x3840), 18317478 (Silvana YM, 1080x1920), 29070674 (Nando Freitas, 1080x1920). https://www.pexels.com/license/
- Pendiente de validación visual por el propietario antes de commit/push. No se incluyen los cambios legales ajenos a este trabajo.

## Ampliación del ecosistema — 25 de octubre de 2026

- Nueva página `/app.html`: capturas Flutter parciales en perspectiva 3D, información de funciones reales, QR y enlace de descarga común. Home conserva sus secciones y hero.
- Navegación Home / Atlas de destinos / La app; estado activo blanco y subrayado sobre fondos cinematográficos, y oscuro sobre blanco. Navegación visible también en móvil.
- Footer compartido con M3Biznovatech y enlace a https://m3biznovatech.com. Enlaces a los documentos existentes de privacidad, términos y mis datos; presentación legal blanca y navegación coherente. Se sincronizaron los bloques de contenido con la fuente Flutter existente mediante scripts/sync-legal-from-app.mjs, sin introducir nuevas condiciones ni cambiar la versión legal.
- Fotografías descargadas de sus originales del catálogo: exportación WebP de hasta 2400 px, sin ampliar artificialmente; pines de 144 px. Manifiesto `src/data/atlas-media.json`; autores/licencias en `/fuentes.html` y metadatos de Wikimedia en `src/data/atlas-credits.json`.
- Video real opcional de Machu Picchu, Nando Freitas, Pexels 29070674, 1080x1920, duración 4.87 s. Solo se carga al pulsar Video; conserva formato vertical, controles nativos, reproducción silenciosa inicial y créditos. Archivo de 8.3 MB.
- Corrección del salto: la animación de escala permanece montada para todas las imágenes; el cambio de foto solo modifica opacidad. Pausa cambia `animation-play-state`, no reinicia transformación. El carrusel espera que las fotos estén cargadas.
- Hallazgo pendiente de contenido: privacidad web y Flutter coinciden en versión 1.0, pero mencionan servidor local; el servicio ya utiliza Railway. Requiere revisión coordinada de proveedor y versión/aceptación legal, fuera de estos cambios de presentación.
- Sin commit ni push: pendiente de validación del propietario.
