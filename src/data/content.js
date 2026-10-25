/* ============================================================
   PROXVEL — Contenido y modelo de recomendación (ES)
   Todo el copy en español y los datos de los destinos.
   ============================================================ */

export const BRAND = {
  name: 'PROXVEL',
  tagline: 'Tu próximo destino, recomendado con inteligencia.',
  // El backend redirige al APK de la versión publicada desde el dashboard.
  betaApkUrl: 'https://proxback-production.up.railway.app/api/v1/releases/latest/download',
};

export const NAV = [
  { label: 'El motor', href: '#motor' },
  { label: 'Factores', href: '#factores' },
  { label: 'Destinos', href: '#destinos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Preguntas', href: '#faq' },
];

/* ---- Barra de confianza ---- */
export const STATS = [
  { value: 7, suffix: '', label: 'factores ponderados por viaje' },
  { value: 24, suffix: '+', label: 'regiones del Perú analizadas' },
  { value: 96, suffix: '%', label: 'precisión de afinidad promedio' },
  { value: 3, suffix: 's', label: 'para tu recomendación ideal' },
];

/* ---- Los 7 criterios (sección Criterios) ---- */
export const CRITERIA = [
  {
    id: 'preferencias',
    icon: 'sliders',
    label: 'Preferencias del viajero',
    desc: 'Tus intereses —aventura, cultura, gastronomía, naturaleza o descanso— definen el peso de cada factor.',
    accent: '#e9c46a',
    image: '/images/machupicchu.webp',
  },
  {
    id: 'seguridad',
    icon: 'shield',
    label: 'Seguridad',
    desc: 'Índices por zona, rutas confiables y alertas relevantes para que viajes con tranquilidad.',
    accent: '#5fc27e',
    image: '/images/santa-catalina.webp',
  },
  {
    id: 'costo',
    icon: 'coins',
    label: 'Costo',
    desc: 'Presupuesto estimado de estadía, transporte y actividades, ajustado a tu rango de gasto.',
    accent: '#e9c46a',
    image: '/images/lima-centro.webp',
  },
  {
    id: 'limpieza',
    icon: 'sparkles',
    label: 'Limpieza',
    desc: 'Estándares de higiene y conservación reportados por viajeros y autoridades locales.',
    accent: '#74e0d2',
    image: '/images/paracas.webp',
  },
  {
    id: 'clima',
    icon: 'sun',
    label: 'Clima',
    desc: 'Pronóstico y temporada ideal: PROXVEL te dice cuándo cada destino se ve mejor.',
    accent: '#57a8df',
    image: '/images/nasca.webp',
  },
  {
    id: 'afluencia',
    icon: 'users',
    label: 'Afluencia',
    desc: 'Nivel de gente esperado, para que elijas entre tranquilidad absoluta o ambiente vibrante.',
    accent: '#e08a52',
    image: '/images/kuelap.webp',
  },
  {
    id: 'afinidad',
    icon: 'target',
    label: 'Afinidad de destino',
    desc: 'Cuánto encaja un destino con tu perfil, combinando todos los factores anteriores.',
    accent: '#d4a24a',
    image: '/images/colca.webp',
  },
];

/* ---- Factores medibles (usados en tarjetas y motor) ---- */
export const FACTORS = [
  { id: 'seguridad', label: 'Seguridad', icon: 'shield' },
  { id: 'costo', label: 'Costo', icon: 'coins' },
  { id: 'limpieza', label: 'Limpieza', icon: 'sparkles' },
  { id: 'clima', label: 'Clima', icon: 'sun' },
  { id: 'afluencia', label: 'Tranquilidad', icon: 'users' },
  { id: 'afinidad', label: 'Afinidad', icon: 'target' },
];

/* ---- Destinos del Perú ----
   scores 0–100 (más alto = mejor para el viajero).
   'afluencia' = nivel de tranquilidad (alto = menos gente).            */
export const DESTINATIONS = [
  {
    id: 'machupicchu',
    name: 'Machu Picchu',
    region: 'Cusco · Andes',
    scene: 'machupicchu',
    tags: ['Cultura', 'Historia', 'Aventura'],
    blurb: 'La ciudadela inca entre nubes. Conservación impecable y rutas guiadas que equilibran asombro y seguridad.',
    quote: 'Donde la niebla toca las piedras y el tiempo se detiene.',
    scores: { seguridad: 88, costo: 52, limpieza: 92, clima: 78, afluencia: 38, afinidad: 96 },
  },
  {
    id: 'lima-centro',
    name: 'Centro Histórico de Lima',
    region: 'Lima · Plaza Mayor',
    scene: 'lima-centro',
    tags: ['Cultura', 'Gastronomía', 'Historia'],
    blurb: 'La Plaza Mayor que vio nacer la república. Arquitectura colonial, cevicherías de culto y la energía de una metrópoli en plena efervescencia.',
    quote: 'La capital que se come el mundo desde sus calles coloniales.',
    scores: { seguridad: 72, costo: 84, limpieza: 74, clima: 68, afluencia: 38, afinidad: 88 },
  },
  {
    id: 'circuito-magico',
    name: 'Circuito Mágico del Agua',
    region: 'Lima · Parque de la Reserva',
    scene: 'circuito-magico',
    tags: ['Relax', 'Cultura'],
    blurb: 'El espectáculo de agua y luz más grande del mundo según el Guinness. Doce fuentes interactivas que convierten la noche limeña en magia pura.',
    quote: 'Agua y luz convierten la noche limeña en pura magia.',
    scores: { seguridad: 88, costo: 95, limpieza: 86, clima: 68, afluencia: 55, afinidad: 78 },
  },
  {
    id: 'huaca-pucllana',
    name: 'Huaca Pucllana',
    region: 'Lima · Miraflores',
    scene: 'huaca-pucllana',
    tags: ['Cultura', 'Historia'],
    blurb: 'Una pirámide preínca de adobe en pleno Miraflores. Mil quinientos años de historia a metros del Pacífico, iluminada de noche con un ambiente único.',
    quote: 'Una pirámide de mil años en el corazón de Miraflores.',
    scores: { seguridad: 88, costo: 90, limpieza: 90, clima: 68, afluencia: 76, afinidad: 82 },
  },
  {
    id: 'santa-catalina',
    name: 'Monasterio de Santa Catalina',
    region: 'Arequipa · Centro Histórico',
    scene: 'santa-catalina',
    tags: ['Historia', 'Cultura', 'Relax'],
    blurb: 'Una ciudad dentro de la ciudad, fundada en 1579. Calles ocre y azul, silencio colonial y el volcán Misti asomando por encima de los muros.',
    quote: 'Una ciudad dentro de la ciudad, pintada de ocre y silencio.',
    scores: { seguridad: 92, costo: 74, limpieza: 94, clima: 88, afluencia: 68, afinidad: 90 },
  },
  {
    id: 'colca',
    name: 'Valle del Colca',
    region: 'Arequipa · Cañón del Colca',
    scene: 'colca',
    tags: ['Naturaleza', 'Aventura', 'Relax'],
    blurb: 'Uno de los cañones más profundos del planeta. Termas escondidas, pueblos andinos intactos y el vuelo del cóndor como espectáculo cotidiano.',
    quote: 'El cañón más profundo del Perú, visto desde las alas del cóndor.',
    scores: { seguridad: 80, costo: 70, limpieza: 86, clima: 76, afluencia: 80, afinidad: 88 },
  },
  {
    id: 'nasca',
    name: 'Líneas de Nasca',
    region: 'Ica · Pampas de Jumana',
    scene: 'nasca',
    tags: ['Historia', 'Cultura', 'Aventura'],
    blurb: 'Geoglifos trazados hace más de dos mil años sobre el desierto, solo visibles desde el aire. Un misterio arqueológico declarado Patrimonio de la Humanidad.',
    quote: 'Figuras trazadas hace dos mil años que solo se ven desde el cielo.',
    scores: { seguridad: 80, costo: 60, limpieza: 84, clima: 92, afluencia: 74, afinidad: 84 },
  },
  {
    id: 'paracas',
    name: 'Reserva Nacional de Paracas',
    region: 'Ica · Costa del Pacífico',
    scene: 'paracas',
    tags: ['Naturaleza', 'Playa', 'Aventura'],
    blurb: 'Donde el desierto rojo se funde con el Pacífico. Lobos marinos, flamencos, el Candelabro preínca y las Islas Ballestas a pocos minutos en bote.',
    quote: 'Donde el desierto rojo se funde con el océano Pacífico.',
    scores: { seguridad: 84, costo: 74, limpieza: 90, clima: 86, afluencia: 72, afinidad: 86 },
  },
  {
    id: 'sipan',
    name: 'Museo Tumbas Reales del Señor de Sipán',
    region: 'Lambayeque · Costa Norte',
    scene: 'sipan',
    tags: ['Historia', 'Cultura'],
    blurb: 'El descubrimiento arqueológico más importante del siglo XX en América. El oro, la turquesa y la iconografía moche del Señor de Sipán, exhibidos con nivel de museo mundial.',
    quote: 'El oro de los mochicas, la tumba más rica descubierta en América.',
    scores: { seguridad: 86, costo: 92, limpieza: 94, clima: 84, afluencia: 85, afinidad: 80 },
  },
  {
    id: 'kuelap',
    name: 'Ciudadela de Kuélap',
    region: 'Amazonas · Chachapoyas',
    scene: 'kuelap',
    tags: ['Historia', 'Naturaleza', 'Aventura'],
    blurb: 'La fortaleza de piedra que los incas nunca pudieron conquistar. Torres circulares emergiendo del bosque de nubes, accesibles en teleférico sobre la selva amazónica.',
    quote: 'La fortaleza de piedra que los incas nunca pudieron conquistar.',
    scores: { seguridad: 76, costo: 68, limpieza: 88, clima: 62, afluencia: 92, afinidad: 90 },
  },
];

/* ---- Perfiles para el motor interactivo ----
   weight = peso de cada factor (0–1). preferTags impulsa la afinidad. */
export const PROFILES = [
  {
    id: 'aventura',
    label: 'Aventurero',
    icon: 'mountain',
    line: 'Busco adrenalina, alturas y rutas poco transitadas.',
    topId: 'kuelap',
    weight: { seguridad: 0.12, costo: 0.12, limpieza: 0.08, clima: 0.18, afluencia: 0.1, afinidad: 0.4 },
    preferTags: ['Aventura', 'Altura', 'Naturaleza'],
  },
  {
    id: 'cultura',
    label: 'Cultural',
    icon: 'landmark',
    line: 'Quiero historia, tradición y patrimonio vivo.',
    topId: 'machupicchu',
    weight: { seguridad: 0.16, costo: 0.1, limpieza: 0.12, clima: 0.1, afluencia: 0.07, afinidad: 0.45 },
    preferTags: ['Cultura', 'Historia'],
  },
  {
    id: 'relax',
    label: 'Relax',
    icon: 'leaf',
    line: 'Necesito calma, buen clima y poca gente.',
    topId: 'paracas',
    weight: { seguridad: 0.16, costo: 0.12, limpieza: 0.18, clima: 0.2, afluencia: 0.22, afinidad: 0.12 },
    preferTags: ['Relax', 'Playa'],
  },
  {
    id: 'gastronomia',
    label: 'Gastronómico',
    icon: 'utensils',
    line: 'Viajo por sabores, mercados y buena mesa.',
    topId: 'lima-centro',
    weight: { seguridad: 0.18, costo: 0.14, limpieza: 0.2, clima: 0.1, afluencia: 0.08, afinidad: 0.3 },
    preferTags: ['Gastronomía', 'Cultura'],
  },
  {
    id: 'familiar',
    label: 'En familia',
    icon: 'family',
    line: 'Priorizo seguridad, limpieza y comodidad.',
    topId: 'circuito-magico',
    weight: { seguridad: 0.28, costo: 0.14, limpieza: 0.24, clima: 0.14, afluencia: 0.1, afinidad: 0.1 },
    preferTags: ['Relax', 'Cultura'],
  },
];

/* ---- Proceso (Cómo funciona en 4 pasos) ---- */
export const STEPS = [
  {
    n: '01',
    icon: 'sliders',
    title: 'Cuéntanos quién eres',
    desc: 'Eliges tu estilo de viaje, presupuesto, fechas y qué te importa más. Toma menos de un minuto.',
  },
  {
    n: '02',
    icon: 'cpu',
    title: 'PROXVEL pondera todo',
    desc: 'El motor cruza seguridad, costo, limpieza, clima y afluencia con tus preferencias en tiempo real.',
  },
  {
    n: '03',
    icon: 'compass',
    title: 'Recibe tu destino ideal',
    desc: 'Una recomendación con su nivel de afinidad y el desglose transparente de cada factor.',
  },
  {
    n: '04',
    icon: 'route',
    title: 'Viaja con confianza',
    desc: 'Guarda tus destinos, compáralos y ajusta tus filtros cuando cambien tus planes.',
  },
];

/* ---- Beneficios cortos (junto al teléfono) ---- */
export const HIGHLIGHTS = [
  { icon: 'cpu', title: 'Motor de afinidad', desc: 'Ponderación inteligente, no listas genéricas.' },
  { icon: 'shield', title: 'Viaje seguro', desc: 'Seguridad por zona en cada recomendación.' },
  { icon: 'globe', title: 'Hecho para el Perú', desc: 'Costa, sierra y selva en un solo lugar.' },
];

/* ---- FAQ ---- */
export const FAQS = [
  {
    q: '¿Cómo decide PROXVEL qué destino recomendarme?',
    a: 'Combinamos siete señales —tus preferencias, seguridad, costo, limpieza, clima, afluencia y afinidad— y las ponderamos según tu perfil. El resultado es una recomendación personalizada con el detalle de cada factor, no una lista genérica.',
  },
  {
    q: '¿De dónde salen los datos de seguridad, clima y costos?',
    a: 'Integramos fuentes oficiales, pronósticos meteorológicos y reportes de la comunidad de viajeros. Cada factor se actualiza para reflejar la realidad del destino al momento de tu consulta.',
  },
  {
    q: '¿La app es gratuita?',
    a: 'La versión beta es totalmente gratuita. Queremos que pruebes el motor de recomendación y nos ayudes a perfeccionarlo antes del lanzamiento oficial.',
  },
  {
    q: '¿Cómo accedo a la beta ahora mismo?',
    a: 'Escanea el código QR o pulsa el botón para descargar el APK de Android. La publicación en Google Play llegará pronto.',
  },
  {
    q: '¿Funciona en cualquier teléfono?',
    a: 'La beta está disponible como APK para Android. PROXVEL está diseñado para ser ligero y fluido, incluso en equipos de gama media.',
  },
];
