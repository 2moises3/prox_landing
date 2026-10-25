import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import catalog from "./data/catalog.json";
import { useApkDownload } from "./hooks/useApkDownload";
import "./product.css";
import Hero from "./components/Hero";
import SiteHeader from "./components/SiteHeader";
import EcosystemFooter from "./components/EcosystemFooter";

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
const featuredIds = [
  "machu_picchu",
  "reserva_paracas",
  "ciudadela_kuelap",
  "valle_colca",
];
const featured = featuredIds
  .map((id) => catalog.find((d) => d.destination_id === id))
  .filter(Boolean);
const Arrow = () => <span aria-hidden="true">↗</span>;
function Phone({ screen, label, className = "" }) {
  return (
    <div className={`device ${className}`}>
      <div className="device-camera" aria-hidden="true" />
      <img
        src={`/screens/${screen}.webp`}
        alt={label}
        width="860"
        height="1800"
        loading="lazy"
      />
      <div className="device-bar" aria-hidden="true" />
    </div>
  );
}
function ProductStage() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-19, 0, 16]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [9, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [65, -65]);
  return (
    <section
      className="product-section"
      id="app"
      ref={ref}
      aria-labelledby="app-title"
    >
      <div className="section-heading">
        <span className="eyebrow">DISEÑADA PARA EXPLORAR</span>
        <h2 id="app-title">
          El viaje empieza
          <br />
          <span>en tus manos.</span>
        </h2>
        <p>Menos tiempo buscando. Más motivos para salir.</p>
      </div>
      <div className="stage">
        <span className="stage-word" aria-hidden="true">
          EXPLORA
        </span>
        <motion.div
          className="devices"
          style={reduce ? {} : { rotateY, rotateX, y }}
        >
          <Phone
            screen="welcome"
            label="Pantalla de bienvenida de PROXVEL"
            className="device-left"
          />
          <Phone
            screen="explore"
            label="Catálogo de destinos en la sección Explorar de PROXVEL"
            className="device-center"
          />
          <Phone
            screen="filters"
            label="Filtros de búsqueda de la app PROXVEL"
            className="device-right"
          />
        </motion.div>
      </div>
      <p className="capture-note">
        Interfaz de la app, renderizada con Flutter. Las pantallas pueden variar
        según la versión.
      </p>
      <div className="product-points">
        <div>
          <span>01 / EXPLORA</span>
          <h3>Un país por descubrir.</h3>
          <p>
            Encuentra destinos, conoce sus detalles y empieza a imaginar tu
            próxima escapada.
          </p>
        </div>
        <div>
          <span>02 / PERSONALIZA</span>
          <h3>Tu forma de viajar importa.</h3>
          <p>
            Configura tus preferencias para recibir recomendaciones que
            consideren lo que buscas.
          </p>
        </div>
        <div>
          <span>03 / ELIGE</span>
          <h3>Decide con más contexto.</h3>
          <p>
            Compara clima, afluencia y costo. Guarda tus favoritos para volver a
            ellos.
          </p>
        </div>
      </div>
    </section>
  );
}
export default function App() {
  const apkUrl = useApkDownload();

  const regions = new Set(catalog.map((d) => d.region)).size;
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader home />
      <main id="contenido">
        <Hero />
        <div className="catalog-strip">
          <p>
            Un buen viaje comienza
            <br />
            <strong>con una buena elección.</strong>
          </p>
          <div>
            <strong>{catalog.length}</strong>
            <span>destinos en el catálogo</span>
          </div>
          <div>
            <strong>{regions}</strong>
            <span>regiones para explorar</span>
          </div>
          <div>
            <strong>Tu estilo.</strong>
            <span>El punto de partida</span>
          </div>
        </div>
        <ProductStage />
        <section className="personalization" id="caracteristicas">
          <div>
            <span className="eyebrow">NO TODOS VIAJAMOS IGUAL</span>
            <h2>
              No es solo
              <br />a dónde vas.
              <br />
              <span>Es lo que buscas.</span>
            </h2>
            <p>
              PROXVEL tiene en cuenta tus preferencias para ayudarte a elegir.
              Porque un destino increíble también tiene que encajar contigo.
            </p>
            <a className="text-link" href="#descargar">
              Encuentra tu próxima escapada <Arrow />
            </a>
          </div>
          <div className="feature-grid">
            {[
              ["◎", "Afinidad", "Tus intereses como punto de partida."],
              ["☀", "Clima", "Referencia estacional según el mes."],
              ["↔", "Afluencia", "Referencia mensual, no un aforo en vivo."],
              ["◈", "Costo", "Nivel orientativo para comparar."],
              ["◇", "Atención", "Valoraciones sobre atención y servicio."],
              ["✧", "Atractivos", "Valoraciones de la experiencia turística."],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <span className="feature-icon" aria-hidden="true">
                  {icon}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="destinations" id="destinos">
          <div className="section-row">
            <div>
              <span className="eyebrow">CERCA DE TU PRÓXIMA HISTORIA</span>
              <h2>
                {catalog.length} destinos.
                <br />
                <span>Muchas formas de vivirlos.</span>
              </h2>
            </div>
            <p>
              Historia, naturaleza y paisajes que se quedan contigo. Empieza por
              un lugar que despierte tu curiosidad.
            </p>
          </div>
          <div className="destination-grid">
            {featured.map((d, i) => (
              <a
                className="destination"
                key={d.destination_id}
                href={`/atlas.html#${d.destination_id}`}
              >
                <div className="destination-photo">
                  <img
                    src={`/images/${photos[d.destination_id]}.webp`}
                    alt={d.destination}
                    loading="lazy"
                    width="600"
                    height="750"
                  />
                  <span className="destination-number">0{i + 1}</span>
                </div>
                <span className="eyebrow">{d.region}</span>
                <h3>
                  {d.destination
                    .replace("Santuario Histórico de ", "")
                    .replace("Reserva Nacional de ", "")
                    .replace("Ciudadela de ", "")}
                </h3>
                <p>{d.category}</p>
              </a>
            ))}
          </div>
          <a
            className="button button-outline catalog-toggle"
            href="/atlas.html"
          >
            Explorar el atlas de los 14 destinos <Arrow />
          </a>
        </section>
        <section className="how-section" id="como-funciona">
          <span className="eyebrow">DE LA IDEA AL PRÓXIMO DESTINO</span>
          <h2>Así de sencillo.</h2>
          <div className="steps">
            {[
              [
                "01",
                "Cuéntanos cómo viajas.",
                "Crea tu cuenta y configura tus preferencias de viaje.",
              ],
              [
                "02",
                "Descubre tus opciones.",
                "Explora el catálogo o consulta las recomendaciones para ti.",
              ],
              [
                "03",
                "Haz tuyo el viaje.",
                "Revisa los detalles, consulta el mapa y guarda tus favoritos.",
              ],
            ].map(([n, title, body]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="download-section" id="descargar">
          <div>
            <span className="eyebrow">TU PRÓXIMA HISTORIA TE ESPERA</span>
            <h2>
              Sal de lo de siempre.
              <br />
              <span>Llévate PROXVEL.</span>
            </h2>
            <p>Descarga la beta para Android y empieza a descubrir.</p>
            <a className="button button-dark" href={apkUrl}>
              Descargar última versión <Arrow />
            </a>
            <p className="download-help">
              Archivo APK para Android. Tu dispositivo te pedirá confirmar la
              instalación.
            </p>
          </div>
          <div className="qr-panel">
            <QRCodeSVG
              value={apkUrl}
              size={160}
              marginSize={2}
              level="M"
              title="Código QR para descargar la última versión de PROXVEL"
            />
            <strong>Escanea. Descarga. Explora.</strong>
            <span>Apunta la cámara de tu Android.</span>
          </div>
        </section>
        <section className="faq-section" id="faq">
          <h2>Antes de salir.</h2>
          {[
            [
              "¿Cómo instalo la app?",
              "Descarga el APK desde el botón o el QR, abre el archivo en tu Android y sigue las indicaciones del sistema. Si te lo solicita, permite la instalación desde el navegador que usaste.",
            ],
            [
              "¿Cómo recibo nuevas versiones?",
              "El botón y el QR apuntan a la última versión publicada. En la app también puedes consultar las actualizaciones desde tu perfil. Android te pedirá confirmar la instalación.",
            ],
            [
              "¿Está disponible para iPhone?",
              "Por ahora, esta beta está disponible para Android.",
            ],
            [
              "¿Qué significan las recomendaciones?",
              "Son una ayuda para comparar destinos según tus preferencias y los datos disponibles. Revisa las condiciones actuales del lugar antes de viajar.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <EcosystemFooter />
    </>
  );
}
