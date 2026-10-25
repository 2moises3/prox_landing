import { useEffect, useMemo, useState } from "react";
import SiteHeader from "./components/SiteHeader";
import catalog from "./data/catalog.json";
import peru from "./data/peru.json";
import { useApkDownload } from "./hooks/useApkDownload";

const names = {
  ollantaytambo: "Ollantaytambo",
  catarata_ahuashiyacu: "Ahuashiyacu",
  chan_chan: "Chan Chan",
  ciudadela_kuelap: "Kuélap",
  huaca_luna: "Huaca de la Luna",
  huaca_pucllana: "Huaca Pucllana",
  lineas_nazca: "Líneas de Nasca",
  machu_picchu: "Machu Picchu",
  museo_sipan: "Tumbas Reales de Sipán",
  parque_aguas: "Circuito Mágico del Agua",
  parque_huascaran: "Huascarán",
  reserva_paracas: "Paracas",
  valle_colca: "Valle del Colca",
  ventanillas_otuzco: "Otuzco",
};
const photos = {
  machu_picchu: "machupicchu",
  reserva_paracas: "paracas",
  valle_colca: "colca",
  ciudadela_kuelap: "kuelap",
  huaca_pucllana: "huaca-pucllana",
  museo_sipan: "sipan",
  lineas_nazca: "nasca",
  parque_aguas: "circuito-magico",
  catarata_ahuashiyacu: "Viagens Catarata",
};
const project = (lon, lat) => [170 + (lon + 82) * 34, 45 - lat * 34];
const rings =
  peru.type === "Polygon" ? peru.coordinates : peru.coordinates.flat();
const outline = rings
  .map(
    (r) =>
      r
        .map(
          ([lon, lat], i) =>
            `${i ? "L" : "M"}${project(lon, lat)
              .map((v) => v.toFixed(2))
              .join(",")}`,
        )
        .join(" ") + "Z",
  )
  .join(" ");
const ordered = [...catalog].sort((a, b) => b.latitude - a.latitude);
const left = ordered.filter((d) => d.longitude < -76.5);
const right = ordered.filter((d) => d.longitude >= -76.5);
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const initialId = () =>
  catalog.find((d) => d.destination_id === window.location.hash.slice(1))
    ?.destination_id || "machu_picchu";
function DestinationPhoto({ destination }) {
  const [failed, setFailed] = useState(false);
  const local = photos[destination.destination_id];
  return (
    <div className={`atlas-photo ${failed ? "atlas-photo--empty" : ""}`}>
      {!failed && (
        <img
          src={local ? `/images/${local}.webp` : destination.cover_image_url}
          alt={destination.destination}
          onError={() => setFailed(true)}
          width="600"
          height="400"
        />
      )}
      {failed && (
        <span>
          PERÚ
          <br />
          <small>{destination.region}</small>
        </span>
      )}
      <span className="atlas-photo-tag">{destination.category}</span>
    </div>
  );
}
export default function Atlas() {
  const [selected, setSelected] = useState(initialId);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [category, setCategory] = useState("Todos");
  const apk = useApkDownload();
  useEffect(() => {
    const change = () => setSelected(initialId());
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const filtered = useMemo(
    () =>
      catalog.filter(
        (d) =>
          (category === "Todos" || d.category === category) &&
          normalize(`${d.destination} ${d.city} ${d.region}`).includes(
            normalize(query),
          ),
      ),
    [query, category],
  );
  useEffect(() => {
    if (
      filtered.length &&
      !filtered.some((d) => d.destination_id === selected)
    ) {
      setSelected(filtered[0].destination_id);
      window.history.replaceState(null, "", `#${filtered[0].destination_id}`);
    }
  }, [filtered, selected]);
  const visible = new Set(filtered.map((d) => d.destination_id));
  const destination = catalog.find((d) => d.destination_id === selected);
  const select = (id) => {
    setSelected(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const coord = (n, negative, positive) =>
    `${Math.abs(n).toFixed(4)}° ${n < 0 ? negative : positive}`;
  return (
    <>
      <a className="skip-link" href="#atlas">
        Saltar al atlas
      </a>
      <SiteHeader />
      <main className="atlas-page" id="atlas">
        <div className="atlas-intro">
          <div>
            <a className="atlas-back" href="/">
              ← Volver a PROXVEL
            </a>
            <span className="eyebrow">EL PERÚ, PUNTO POR PUNTO</span>
            <h1>
              Un mapa.
              <br />
              <span>Muchas próximas historias.</span>
            </h1>
          </div>
          <div className="atlas-intro-note">
            <span className="atlas-count">
              14<span> / DESTINOS</span>
            </span>
            <p>
              Una selección de lugares para empezar a explorar. Elige un punto y
              descubre dónde comienza tu próxima escapada.
            </p>
          </div>
        </div>
        <div className="atlas-controls">
          <label className="atlas-search">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Buscar destino, ciudad o región"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca un destino, ciudad o región"
              type="search"
            />
          </label>
          <div className="atlas-categories" aria-label="Filtrar por categoría">
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
        </div>
        <div className="atlas-workspace">
          <section
            className="atlas-map-panel"
            aria-label="Mapa de destinos del Perú"
          >
            <div className="atlas-map-top">
              <span>PERÚ / ATLAS DE DESTINOS</span>
              <span aria-live="polite">
                {filtered.length} de {catalog.length} lugares
              </span>
            </div>
            <div className="map-tools">
              <span>Amplía el mapa para leer las etiquetas.</span>
              <div>
                <button
                  aria-label="Alejar mapa"
                  disabled={zoom <= 1}
                  onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
                >
                  −
                </button>
                <span aria-live="polite">{Math.round(zoom * 100)}%</span>
                <button
                  aria-label="Acercar mapa"
                  disabled={zoom >= 2.5}
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.5))}
                >
                  +
                </button>
                <button
                  aria-label="Restablecer mapa"
                  onClick={() => setZoom(1)}
                >
                  ↺
                </button>
              </div>
            </div>
            <div
              className="atlas-map-scroll"
              tabIndex="0"
              role="region"
              aria-label="Mapa ampliable; desplázate para explorar"
            >
              <svg
                className="peru-map"
                style={{ width: `${zoom * 100}%` }}
                viewBox="0 0 820 760"
                aria-label="Selecciona un destino en el mapa del Perú"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    width="34"
                    height="34"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M34 0H0V34"
                      fill="none"
                      stroke="#e7e9e6"
                      strokeWidth=".5"
                    />
                  </pattern>
                </defs>
                <rect width="820" height="760" fill="url(#map-grid)" />
                <path
                  d={outline}
                  fill="#e9ede6"
                  stroke="#a6b3a4"
                  strokeWidth="1.2"
                />
                <text x="410" y="265" className="map-country">
                  PERÚ
                </text>
                <text
                  x="210"
                  y="590"
                  className="map-ocean"
                  transform="rotate(-55 210 590)"
                >
                  OCÉANO PACÍFICO
                </text>
                <g className="map-north" aria-hidden="true">
                  <text x="745" y="52" textAnchor="middle">
                    N
                  </text>
                  <path d="M745 63l-6 23 6-5 6 5Z" fill="#263d39" />
                </g>
                {ordered.map((d) => {
                  const west = d.longitude < -76.5;
                  const side = west ? left : right;
                  const i = side.indexOf(d);
                  const [x, y] = project(d.longitude, d.latitude);
                  const ly = 115 + i * (west ? 58 : 88);
                  const lx = west ? 170 : 650;
                  const isSelected = d.destination_id === selected;
                  const shown = visible.has(d.destination_id);
                  return (
                    <g
                      key={d.destination_id}
                      onClick={() => {
                        if (shown) select(d.destination_id);
                      }}
                      className={`map-location ${isSelected ? "is-selected" : ""} ${shown ? "" : "is-filtered"}`}
                    >
                      <path
                        className="map-leader"
                        d={`M${x},${y} L${west ? x - 22 : x + 22},${ly} H${lx}`}
                        fill="none"
                      />
                      <circle
                        className="map-point-halo"
                        cx={x}
                        cy={y}
                        r={isSelected ? 12 : 6}
                      />
                      <circle
                        className="map-point"
                        cx={x}
                        cy={y}
                        r={isSelected ? 5 : 3}
                      />
                      {shown && (
                        <g
                          role="button"
                          tabIndex="0"
                          aria-label={`Ver ${d.destination}, ${d.region}`}
                          aria-pressed={isSelected}
                          onClick={() => select(d.destination_id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              select(d.destination_id);
                            }
                          }}
                          className="map-label"
                        >
                          <rect
                            x={west ? 12 : 650}
                            y={ly - 23}
                            width="158"
                            height="45"
                            rx="5"
                          />
                          <text
                            x={west ? 158 : 662}
                            y={ly - 2}
                            textAnchor={west ? "end" : "start"}
                          >
                            {names[d.destination_id]}
                          </text>
                          <text
                            className="map-region"
                            x={west ? 158 : 662}
                            y={ly + 13}
                            textAnchor={west ? "end" : "start"}
                          >
                            {d.region}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="atlas-map-bottom">
              <span>
                <i /> Destino seleccionado
              </span>
              <span>Las líneas señalan ubicaciones; no son rutas.</span>
            </div>
            <p className="map-credit">
              Mapa de referencia ·{" "}
              <a
                href="https://www.naturalearthdata.com/about/terms-of-use/"
                target="_blank"
                rel="noreferrer"
              >
                Natural Earth
              </a>
              . Ubicaciones del catálogo PROXVEL.
            </p>
          </section>
          <aside
            className="atlas-detail"
            aria-labelledby="detail-title"
            hidden={!filtered.length}
          >
            <DestinationPhoto key={selected} destination={destination} />
            <div className="atlas-detail-body">
              <span className="eyebrow">
                {destination.region} / {destination.city}
              </span>
              <h2 id="detail-title" aria-live="polite">
                {destination.destination}
              </h2>
              <p className="atlas-coordinates">
                {coord(destination.latitude, "S", "N")} &nbsp; / &nbsp;{" "}
                {coord(destination.longitude, "O", "E")}
              </p>
              <dl>
                <div>
                  <dt>Experiencia</dt>
                  <dd>{destination.category}</dd>
                </div>
                <div>
                  <dt>Costo orientativo</dt>
                  <dd>{destination.cost_level || "No disponible"}</dd>
                </div>
              </dl>
              <p className="atlas-detail-note">
                Explora este destino en PROXVEL y descubre cómo encaja con tus
                preferencias. El nivel de costo es una referencia, no un precio
                de entrada.
              </p>
              <a className="button button-dark" href={apk}>
                Descargar PROXVEL <span aria-hidden="true">↗</span>
              </a>
              <a
                className="atlas-maps-link"
                href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                Abrir ubicación en Google Maps ↗
              </a>
            </div>
          </aside>
        </div>
        <section className="atlas-directory" aria-labelledby="directory-title">
          <div className="atlas-directory-heading">
            <h2 id="directory-title">Cada punto, una posibilidad.</h2>
            <p>También puedes elegir un destino desde esta lista.</p>
          </div>
          {filtered.length === 0 ? (
            <div className="atlas-empty">
              <h3>No encontramos destinos con esos filtros.</h3>
              <button
                className="button button-outline"
                onClick={() => {
                  setQuery("");
                  setCategory("Todos");
                }}
              >
                Ver todos los destinos
              </button>
            </div>
          ) : (
            <div className="atlas-directory-grid">
              {filtered.map((d) => (
                <button
                  key={d.destination_id}
                  className={selected === d.destination_id ? "is-selected" : ""}
                  aria-pressed={selected === d.destination_id}
                  onClick={() => {
                    select(d.destination_id);
                    document.querySelector(".atlas-detail").scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    });
                  }}
                >
                  <span>{String(catalog.indexOf(d) + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{d.destination}</strong>
                    <small>
                      {d.region} · {d.category}
                    </small>
                  </div>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
        <div className="atlas-footnote">
          <p>
            Catálogo consultado el 25 de octubre de 2026. Comprueba horarios,
            accesos y condiciones actuales con fuentes oficiales antes de
            viajar.
          </p>
          <a href="/#descargar">Llévate el Perú en PROXVEL ↗</a>
        </div>
      </main>
    </>
  );
}
