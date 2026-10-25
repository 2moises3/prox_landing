# PROXVEL — Landing

Sitio de presentación de **PROXVEL**, la app de recomendaciones inteligentes de turismo
para el Perú. Recomienda tu próximo destino ponderando **siete factores**: preferencias del
viajero, seguridad, costo, limpieza, clima, afluencia y afinidad de destino.

Construido con **React + Vite**. Diseño premium en modo oscuro (estilo *Aurora UI*) con
acentos dorados tomados del logo, ilustraciones SVG hechas a medida (sin fotos de stock) y
animaciones ligeras que cargan bien en cualquier dispositivo.

---

## Requisitos

- Node.js 18+ (probado con Node 24)
- npm

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo  → http://localhost:5173
npm run build    # build de producción     → /dist
npm run preview  # previsualizar el build
```

---

## Estructura

```
src/
├─ main.jsx              # punto de entrada (importa index.css primero)
├─ App.jsx               # composición de secciones
├─ index.css            # tokens de diseño, base, utilidades, animaciones
├─ data/content.js       # TODO el copy en español + modelo de datos de destinos
├─ hooks/
│  ├─ useScrollReveal.js # revela elementos .reveal al hacer scroll
│  └─ useInView.js       # dispara contadores y barras al entrar en viewport
├─ assets/logo.png       # logo (compás) optimizado a 320px
└─ components/
   ├─ Background.jsx      # aurora + estrellas + curvas topográficas
   ├─ Navbar.jsx          # nav flotante + menú móvil
   ├─ Hero.jsx + PhoneMockup.jsx
   ├─ StatsBar.jsx        # cifras con count-up
   ├─ Engine.jsx          # MOTOR de recomendación interactivo
   ├─ Criteria.jsx        # los 7 criterios (bento)
   ├─ Destinations.jsx + DestinationCard.jsx + DestinationScene.jsx
   ├─ HowItWorks.jsx      # proceso en 4 pasos
   ├─ BetaAccess.jsx      # QR + captura de correo
   ├─ Faq.jsx
   ├─ Footer.jsx
   ├─ ScoreMeter.jsx      # barra de factor reutilizable
   └─ Icon.jsx            # set de iconos SVG inline (sin emojis)
```

## Cómo personalizar

- **Destinos, puntajes y copy** → `src/data/content.js`. Cada destino tiene `scores`
  (0–100) para los seis factores medibles y `tags` que alimentan la afinidad.
- **Motor de recomendación** → `Engine.jsx` (`scoreFor`). Combina los pesos de cada perfil
  con los puntajes del destino y un bono por coincidencia de etiquetas.
- **Escenas de los destinos** → `DestinationScene.jsx` (ilustraciones SVG por `scene`).
- **Paleta y tipografías** → variables CSS en `src/index.css` (`:root`).

## Notas sobre el acceso beta

- El **código QR** y los enlaces "Descargar APK" apuntan a `BRAND.betaApkUrl` en
  `src/data/content.js`. Es una ruta estable del backend que redirige al APK de
  la última versión Android publicada desde el dashboard; no hay APK en `public/`.
- "Próximamente en Google Play" se muestra como mensaje, sin enlaces a tienda (aún).

## Accesibilidad y rendimiento

- Tipografía base de 16px, contraste alto, foco visible (`:focus-visible`).
- Respeta `prefers-reduced-motion` (desactiva animaciones).
- Iconos SVG inline, sin emojis. Imágenes/ilustraciones vectoriales y livianas.
- Build total ≈ 140 KB gzip (incluye React + generador de QR + logo).
- Responsive verificado en 375 / 768 / 1024 / 1280 px.
