import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import SiteHeader from "./components/SiteHeader";
import catalog from "./data/catalog.json";
import peru from "./data/peru.json";
import regions from "./data/peru-regions.json";
import interests from "./data/atlas-interests.json";
import media from "./data/atlas-media.json";
import gallery from "./data/atlas-gallery.json";
import EcosystemFooter from "./components/EcosystemFooter";
import { useApkDownload } from "./hooks/useApkDownload";

const names = [
  "Ollantaytambo",
  "Ahuashiyacu",
  "Chan Chan",
  "Kuélap",
  "Huaca de la Luna",
  "Huaca Pucllana",
  "Líneas de Nasca",
  "Machu Picchu",
  "Tumbas Reales de Sipán",
  "Circuito Mágico del Agua",
  "Huascarán",
  "Paracas",
  "Valle del Colca",
  "Ventanillas de Otuzco",
];
const local = {
  machu_picchu: "machupicchu",
  reserva_paracas: "paracas",
  valle_colca: "colca",
  ciudadela_kuelap: "kuelap",
  huaca_pucllana: "huaca-pucllana",
  museo_sipan: "sipan",
  lineas_nazca: "nasca",
  parque_aguas: "circuito-magico",
};
const descriptions = [
  "Terrazas de piedra y arquitectura inca en el Valle Sagrado. Una invitación a observar el paisaje a través de su historia.",
  "El agua y la vegetación protagonizan esta escapada cerca de Tarapoto. Un encuentro con la naturaleza de San Martín.",
  "Muros de adobe, relieves y espacios abiertos para acercarte al legado de la cultura Chimú.",
  "Arquitectura de piedra en las alturas de Amazonas. Descubre una de las expresiones del legado Chachapoya.",
  "Una mirada al mundo Moche a través de su arquitectura ceremonial y sus relieves.",
  "Un encuentro con la historia prehispánica en medio de Miraflores. Otra manera de explorar Lima.",
  "Trazos sobre el desierto que invitan a descubrir el patrimonio de Nasca y Palpa.",
  "Terrazas, caminos y arquitectura inca entre montañas. Un paisaje donde naturaleza e historia se encuentran.",
  "Un recorrido por el legado de Sipán y la cultura Moche, en Lambayeque.",
  "Agua y luz para descubrir otra faceta de Lima. Una experiencia urbana en el Parque de la Reserva.",
  "Montañas y paisajes altoandinos de Áncash. Una invitación a conocer la naturaleza de la Cordillera Blanca.",
  "El desierto se encuentra con el océano en la costa de Ica. Paisajes para mirar el Perú desde otra perspectiva.",
  "Un valle de paisajes andinos en Arequipa. Territorio, naturaleza y vida local para explorar con calma.",
  "Nichos tallados en roca que acercan al patrimonio funerario prehispánico de Cajamarca.",
];
const destinations = catalog.map((d, i) => ({
  ...d,
  name: names[i],
  description: descriptions[i],
  pin: media[d.destination_id]?.pin || d.cover_image_url,
  tags: (
    interests.find((r) => r.destination_id === d.destination_id)?.intereses ||
    ""
  )
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean),
  video: (gallery[d.destination_id] || []).find((asset) => asset.type === "video") ||
    (d.destination_id === "machu_picchu" ? {
      src: "/media/machu-picchu-nando-freitas.mp4",
      author: "Nando Freitas / Pexels",
      credit: "https://www.pexels.com/video/breathtaking-views-of-machu-picchu-in-peru-29070674/",
    } : null),
  images: [
    media[d.destination_id]?.image || d.cover_image_url,
    ...(gallery[d.destination_id] || []).filter((asset) => asset.type === "image").map((asset) => asset.src),
    ...(local[d.destination_id]
      ? [`/images/${local[d.destination_id]}.webp`]
      : []),
  ].filter(Boolean),
}));
const project = (lon, lat) => [65 + (lon + 82) * 43, 30 - lat * 43];
const rings =
  peru.type === "Polygon" ? peru.coordinates : peru.coordinates.flat();
const outline = rings
  .map(
    (r) =>
      r
        .map(
          ([lon, lat], i) => `${i ? "L" : "M"}${project(lon, lat).join(",")}`,
        )
        .join(" ") + "Z",
  )
  .join(" ");
const boundaries = regions
  .map((g) =>
    (g.type === "Polygon" ? g.coordinates : g.coordinates.flat())
      .map(
        (r) =>
          r
            .map(
              ([lon, lat], i) =>
                `${i ? "L" : "M"}${project(lon, lat).join(",")}`,
            )
            .join(" ") + "Z",
      )
      .join(" "),
  )
  .join(" ");
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const fromHash = () =>
  destinations.find((d) => d.destination_id === window.location.hash.slice(1))
    ?.destination_id || null;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const initialView = { x: 0, y: 0, z: 1 };
// The tip is the geographic anchor; photo and circular head share one center.
const pinShape = "M0 0C-7-10-26-29-26-38A26 26 0 1 1 26-38C26-29 7-10 0 0Z";
function Photo({ src, alt = "", ...props }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? (
    <span className="photo-unavailable">{alt || "PROXVEL"}</span>
  ) : (
    <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />
  );
}

function PeruMap({ items, view, setView, onSelect }) {
  const [pinUnit, setPinUnit] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const svg = useRef(null),
    drag = useRef(null),
    moved = useRef(false);
  const point = (event) => {
    const p = new DOMPoint(event.clientX, event.clientY);
    return p.matrixTransform(svg.current.getScreenCTM().inverse());
  };
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height)
        setPinUnit(0.9 / Math.min(width / 620, height / 860));
    });
    observer.observe(svg.current);
    return () => observer.disconnect();
  }, []);
  const zoomAt = (amount, p = { x: 310, y: 430 }) =>
    setView((v) => {
      const z = clamp(v.z * amount, 1, 96);
      return {
        z,
        x: p.x - ((p.x - v.x) * z) / v.z,
        y: p.y - ((p.y - v.y) * z) / v.z,
      };
    });
  useEffect(() => {
    const el = svg.current;
    const wheel = (e) => {
      e.preventDefault();
      zoomAt(Math.exp(-e.deltaY * 0.002), point(e));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, []);
  // Nearby destinations remain geographically anchored; clusters zoom into their true coordinates.
  const groups = [];
  for (const d of items) {
    const [x, y] = project(d.longitude, d.latitude);
    const g = groups.find(
      (g) => Math.hypot(g.x - x, g.y - y) * view.z < 49 * pinUnit,
    );
    if (g) g.items.push(d);
    else groups.push({ x, y, items: [d] });
  }
  const activeGroup = groups.find((g) => g.items[0].destination_id === (hovered || focused));
  const activate = (g) => {
    if (moved.current) return;
    if (g.items.length === 1) onSelect(g.items[0].destination_id);
    else {
      const points = g.items.map((d) => project(d.longitude, d.latitude));
      const distance = Math.min(
        ...points.flatMap((p, i) =>
          points.slice(i + 1).map((q) => Math.hypot(p[0] - q[0], p[1] - q[1])),
        ),
      );
      const z = Math.min(
        96,
        Math.max(view.z * 2, (65 * pinUnit) / Math.max(distance, 1)),
      );
      const cx = points.reduce((n, p) => n + p[0], 0) / points.length,
        cy = points.reduce((n, p) => n + p[1], 0) / points.length;
      setView({ z, x: 310 - cx * z, y: 430 - cy * z });
    }
  };
  return (
    <div className="atlas-map-canvas">
      <svg
        ref={svg}
        viewBox="0 0 620 860"
        role="group"
        aria-label="Mapa interactivo del Perú"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          moved.current = false;
          if (e.target.closest(".photo-pin")) return;
          drag.current = { p: point(e), v: view };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const p = point(e),
            dx = p.x - drag.current.p.x,
            dy = p.y - drag.current.p.y;
          if (Math.hypot(dx, dy) > 4) moved.current = true;
          if (moved.current)
            setView({
              ...drag.current.v,
              x: drag.current.v.x + dx,
              y: drag.current.v.y + dy,
            });
        }}
        onPointerUp={(e) => {
          drag.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <defs>
          {destinations.map((d) => (
            <clipPath id={`pin-${d.destination_id}`} key={d.destination_id}>
              <circle cy="-38" r="20" />
            </clipPath>
          ))}
        </defs>
        <g transform={`translate(${view.x} ${view.y}) scale(${view.z})`}>
          <path
            className="peru-outline"
            d={outline}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={boundaries}
            fill="none"
            stroke="#999e9f"
            strokeWidth=".45"
            vectorEffect="non-scaling-stroke"
          />
          <text x="355" y="350" className="map-peru">
            P E R Ú
          </text>
          <text
            x="64"
            y="570"
            transform="rotate(-64 64 570)"
            className="map-ocean"
          >
            OCÉANO PACÍFICO
          </text>
          {groups.map((g) => {
            const d = g.items[0],
              count = g.items.length;
            return (
              <g
                key={d.destination_id}
                transform={`translate(${g.x} ${g.y}) scale(${pinUnit / view.z})`}
                className="photo-pin"
                role="button"
                tabIndex="0"
                aria-label={
                  count > 1
                    ? `Acercar ${count} destinos: ${g.items.map((d) => d.name).join(", ")}`
                    : `Explorar ${d.name}`
                }
                onPointerEnter={() => setHovered(d.destination_id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setFocused(d.destination_id)}
                onBlur={() => setFocused(null)}
                onClick={(e) => { e.currentTarget.focus(); activate(g); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    moved.current = false;
                    activate(g);
                  }
                }}
              >
                <title>{g.items.map((d) => d.name).join(" · ")}</title>
                <path
                  className="pin-shell"
                  d={pinShape}
                />
                <circle cy="-38" r="20" fill="#dedbd5" />
                <image
                  href={d.pin}
                  x="-20"
                  y="-58"
                  width="40"
                  height="40"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#pin-${d.destination_id})`}
                />
                {count > 1 && (
                  <g className="pin-count">
                    <circle cx="22" cy="-60" r="12" />
                    <text x="22" y="-56" textAnchor="middle">
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
        {/* SVG paint order: labels always render after every marker. */}
        {activeGroup && (() => {
          const label = activeGroup.items.length > 1 ? "Acerca para elegir" : activeGroup.items[0].name;
          const width = Math.max(150, label.length * 6.5 + 28) * pinUnit;
          const x = clamp(activeGroup.x * view.z + view.x, width / 2 + 8, 620 - width / 2 - 8);
          const y = clamp(activeGroup.y * view.z + view.y - 80 * pinUnit, 32 * pinUnit, 828);
          return (
            <g className="pin-tooltip" transform={`translate(${x} ${y})`} aria-hidden="true">
              <rect x={-width / 2} y={-27 * pinUnit} width={width} height={30 * pinUnit} rx={15 * pinUnit} />
              <text textAnchor="middle" y={-8 * pinUnit} style={{ fontSize: 11 * pinUnit }}>{label}</text>
            </g>
          );
        })()}
      </svg>
      <span className="map-compass" aria-hidden="true">
        N<br />↑
      </span>
      <div className="atlas-zoom">
        <button
          onClick={() => zoomAt(1.6)}
          disabled={view.z >= 96}
          aria-label="Acercar mapa"
        >
          +
        </button>
        <button
          onClick={() => zoomAt(1 / 1.6)}
          disabled={view.z <= 1}
          aria-label="Alejar mapa"
        >
          −
        </button>
        <button
          onClick={() => setView(initialView)}
          aria-label="Ver todo el Perú"
        >
          ⤢
        </button>
      </div>
      <span className="map-zoom-level" aria-live="polite">
        {Math.round(view.z * 100)}%
      </span>
    </div>
  );
}

function Cinema({ destination: d, onBack }) {
  const reduce = useReducedMotion(),
    [frame, setFrame] = useState(0),
    [playing, setPlaying] = useState(!reduce),
    [available, setAvailable] = useState(d.images);
  const [videoMode, setVideoMode] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const video = useRef(null);
  const [loaded, setLoaded] = useState([]);
  const heading = useRef(null),
    apk = useApkDownload();
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);
  useEffect(() => {
    if (
      !playing ||
      videoMode ||
      available.length < 2 ||
      loaded.length < available.length
    )
      return;
    const timer = setInterval(() => {
      if (!document.hidden) setFrame((f) => (f + 1) % available.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [playing, videoMode, available.length, loaded.length]);
  useEffect(() => {
    const el = video.current;
    if (!el || !videoMode) return;
    const sync = () => {
      if (playing && !document.hidden) el.play().catch(() => setPlaying(false));
      else el.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [playing, videoMode]);
  useEffect(() => {
    if (videoMode && window.matchMedia("(max-width: 700px)").matches) {
      video.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "center" });
    }
  }, [videoMode, reduce]);
  const tags = d.tags;
  const profiles = [
    ...(tags.some((t) => ["cultura", "historia", "académico"].includes(t))
      ? ["Cultural"]
      : []),
    ...(tags.includes("naturaleza") ? ["Naturalista"] : []),
    ...(tags.includes("aventura") ? ["Aventurero"] : []),
    ...(tags.includes("urbano") ? ["Urbano recreativo"] : []),
    ...(tags.includes("familiar") ? ["Familiar"] : []),
    ...(tags.includes("gastronomía") ? ["Gastronómico"] : []),
  ];
  return (
    <motion.section
      className={`atlas-cinema ${playing ? "is-playing" : ""}`}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.7 }}
      aria-label={`Explorando ${d.name}`}
    >
      <div className="cinema-background" aria-hidden="true">
        {available.map((src, i) => (
          <img
            key={src}
            className={frame % available.length === i ? "active" : ""}
            src={src}
            alt=""
            onLoad={() =>
              setLoaded((previous) =>
                previous.includes(src) ? previous : [...previous, src],
              )
            }
            onError={() => {
              setAvailable((a) => a.filter((s) => s !== src));
              setFrame(0);
            }}
          />
        ))}
      </div>
      {videoMode && (
        <div className="cinema-video-panel">
          <video
            ref={video}
            src={d.video.src}
            muted
            playsInline
            preload="metadata"
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
            }}
            onError={() => {
              setVideoMode(false);
              setVideoFailed(true);
            }}
          />
          <span>{d.name} · <a href={d.video.credit} target="_blank" rel="noreferrer">{d.video.author}</a></span>
        </div>
      )}
      <div className="cinema-shade" />
      <button className="cinema-back" onClick={onBack}>
        ← Volver al atlas <span>ESC</span>
      </button>
      <motion.div className="cinema-copy" initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <span className="eyebrow">{d.region} / PERÚ</span>
        <h1 ref={heading} tabIndex="-1">
          {d.name}
        </h1>
        <p className="cinema-description">{d.description}</p>
        <div className="cinema-interests">
          <span className="eyebrow">UNA EXPERIENCIA DE</span>
          <div>
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        {profiles.length > 0 && (
          <div className="cinema-profiles">
            <span>Para viajeros con espíritu</span>
            <strong>{profiles.join(" · ")}</strong>
            <small>
              Orientación por intereses del catálogo. Tu afinidad personalizada
              se calcula en la app.
            </small>
          </div>
        )}
        <div className="cinema-facts">
          <span>{d.category}</span>
          <span>Costo orientativo: {d.cost_level}</span>
        </div>
        <a className="cinema-download" href={apk}>
          Descargar PROXVEL <span>↗</span>
        </a>
        <a
          className="cinema-location"
          href={`https://www.google.com/maps/search/?api=1&query=${d.latitude},${d.longitude}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver ubicación ↗
        </a>
      </motion.div>
      <button
        className="cinema-minimap"
        onClick={onBack}
        aria-label="Ampliar mapa y elegir otro destino"
      >
        <span>
          ← VOLVER AL ATLAS <b>⤢</b>
        </span>
        <svg viewBox="0 0 620 860" aria-hidden="true">
          <defs>
            {destinations.map((p) => (
              <clipPath id={`mini-${p.destination_id}`} key={p.destination_id}>
                <circle cy="-38" r="20" />
              </clipPath>
            ))}
          </defs>
          <path d={outline} fill="none" stroke="currentColor" strokeWidth="2" />
          <path d={boundaries} fill="none" stroke="#9a9e9e" strokeWidth=".8" />
          {destinations.map((p) => {
            const [x, y] = project(p.longitude, p.latitude);
            return (
              <g key={p.destination_id} transform={`translate(${x} ${y})`}>
                <path
                  d={pinShape}
                  fill={p.destination_id === d.destination_id ? "#b68c45" : "white"}
                  stroke={
                    p.destination_id === d.destination_id
                      ? "#b68c45"
                      : "#bdc0bd"
                  }
                  strokeWidth={p.destination_id === d.destination_id ? 7 : 2}
                />
                <image
                  href={p.pin}
                  x="-20"
                  y="-58"
                  width="40"
                  height="40"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#mini-${p.destination_id})`}
                />
              </g>
            );
          })}
        </svg>
        <small>
          {d.region} · {d.name}
        </small>
      </button>
      {videoFailed && <p className="cinema-media-error" role="status">No pudimos reproducir el video. Puedes seguir explorando las fotografías.</p>}
      <div className="cinema-gallery" aria-label={`Galería de ${d.name}`}>
        {available.map((src, i) => (
          <button
            key={src}
            aria-label={`Ver fotografía ${i + 1} de ${d.name}`}
            aria-pressed={!videoMode && frame % available.length === i}
            onClick={() => {
              setVideoMode(false);
              setFrame(i);
              setPlaying(false);
            }}
          >
            <Photo src={src} />
          </button>
        ))}
        {d.video && !videoFailed && (
          <button
            className="gallery-video"
            aria-label={`Ver video de ${d.name}`}
            aria-pressed={videoMode}
            onClick={() => {
              setVideoMode(true);
              setPlaying(true);
            }}
          >
            ▷ Video
          </button>
        )}
        {available.length > 0 && (
          <button
            className="gallery-pause"
            onClick={() => setPlaying((p) => !p)}
            aria-label={
              videoMode
                ? playing
                  ? "Pausar video"
                  : "Reproducir video"
                : playing
                  ? "Pausar movimiento y fotografías"
                  : "Reproducir movimiento y fotografías"
            }
          >
            {playing ? "Ⅱ" : "▷"}
          </button>
        )}
        <span>
          {videoMode ? "VIDEO" : available.length
            ? `${String((frame % available.length) + 1).padStart(2, "0")} / ${String(available.length).padStart(2, "0")}`
            : "Fotografía no disponible"}
        </span>
      </div>
      <a
        className="cinema-source"
        href="/fuentes.html"
        target="_blank"
        rel="noreferrer"
      >
        Fotografías y créditos ↗
      </a>
    </motion.section>
  );
}

export default function Atlas() {
  const [selected, setSelected] = useState(fromHash),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("Todos"),
    [view, setView] = useState(initialView);
  const returnFocus = useRef(null);
  const reduce = useReducedMotion();
  const transition = useRef(null);
  const changeScene = (id) => {
    const update = () => {
      flushSync(() => setSelected(id));
      if (id) window.scrollTo({ top: 0, behavior: "instant" });
      else returnFocus.current?.focus({ preventScroll: true });
    };
    transition.current?.skipTransition();
    if (reduce || !document.startViewTransition) {
      update();
      return;
    }
    const next = document.startViewTransition(update);
    transition.current = next;
    // A navigation can interrupt a snapshot; the state update still completes.
    next.finished.catch(() => {}).finally(() => {
      if (transition.current === next) transition.current = null;
    });
  };
  const select = (id) => {
    returnFocus.current = document.activeElement;
    window.history.pushState(null, "", `#${id}`);
    changeScene(id);
  };
  const back = () => {
    window.history.replaceState(null, "", window.location.pathname);
    changeScene(null);
  };
  useEffect(() => {
    const change = () => changeScene(fromHash());
    window.addEventListener("popstate", change);
    window.addEventListener("hashchange", change);
    return () => {
      window.removeEventListener("popstate", change);
      window.removeEventListener("hashchange", change);
    };
  }, [reduce]);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape" && selected) back();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [selected]);
  const filtered = destinations.filter(
    (d) =>
      (category === "Todos" || category === d.category) &&
      normalize(`${d.name} ${d.region} ${d.city}`).includes(normalize(query)),
  );
  return (
    <div className={`atlas-experience ${selected ? "is-cinematic" : ""}`}>
      <SiteHeader />
      <main className="atlas-overview" hidden={!!selected}>
        <section className="atlas-editorial">
          <a className="atlas-home" href="/">
            ← PROXVEL
          </a>
          <span className="eyebrow">EL PERÚ, PUNTO POR PUNTO</span>
          <h1>
            Perú, por
            <br />
            <em>descubrir.</em>
          </h1>
          <p>
            14 destinos. Muchas formas de viajar.
            <br />
            Elige dónde empieza tu próxima historia.
          </p>
          <label className="atlas-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Destino, ciudad o región"
              aria-label="Buscar destino, ciudad o región"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="atlas-filters" aria-label="Categorías">
            {["Todos", ...new Set(catalog.map((d) => d.category))].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="atlas-result-count" aria-live="polite">
            {filtered.length} lugares para explorar
          </p>
          <div className="atlas-place-list">
            {filtered.map((d) => (
              <button
                key={d.destination_id}
                onClick={() => select(d.destination_id)}
              >
                <Photo src={d.pin} loading="lazy" />
                <span>
                  {d.name}
                  <small>{d.region}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
            {!filtered.length && (
              <div className="atlas-empty">
                <p>No encontramos destinos con esos filtros.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("Todos");
                  }}
                >
                  Ver todos los destinos
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="atlas-cartography" aria-label="Explorar el mapa">
          <PeruMap
            items={filtered}
            view={view}
            setView={setView}
            onSelect={select}
          />
          <div className="atlas-map-caption">
            <span>Rueda para acercar · Arrastra para explorar</span>
            <small>Los pines con número reúnen destinos cercanos.</small>
          </div>
          <a
            className="atlas-map-credit"
            href="https://www.naturalearthdata.com/about/terms-of-use/"
            target="_blank"
            rel="noreferrer"
          >
            Cartografía: Natural Earth · Catálogo PROXVEL
          </a>
        </section>
      </main>
      {!selected && <EcosystemFooter />}
      {selected && (
        <Cinema
          key={selected}
          destination={destinations.find((d) => d.destination_id === selected)}
          onBack={back}
        />
      )}
    </div>
  );
}
