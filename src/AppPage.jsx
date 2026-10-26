import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import SiteHeader from "./components/SiteHeader";
import EcosystemFooter from "./components/EcosystemFooter";
import { useApkDownload } from "./hooks/useApkDownload";

function AppPreview() {
  const stage = useRef(null),
    reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-16, 14]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  return (
    <div className="app-preview" ref={stage}>
      <div className="app-orbit" aria-hidden="true" />
      <motion.div
        className="app-phone-pair"
        style={reduce ? {} : { rotateY, rotateX, y }}
      >
        <div className="app-teaser-phone app-teaser-back">
          <div className="app-phone-screen">
            <img
              src="/screens/welcome.webp"
              alt="Bienvenida a PROXVEL"
              width="860"
              height="1800"
            />
          </div>
        </div>
        <div className="app-teaser-phone app-teaser-front">
          <div className="app-phone-screen">
            <img
              src="/screens/explore.webp"
              alt="Vista parcial del catálogo de destinos de PROXVEL"
              width="860"
              height="1800"
            />
            <div className="app-screen-fade" />
          </div>
        </div>
      </motion.div>
      <span className="app-preview-note">
        Una mirada a la app. El resto empieza contigo.
      </span>
    </div>
  );
}
export default function AppPage() {
  const apk = useApkDownload();
  return (
    <>
      <SiteHeader page="app" />
      <main className="app-page">
        <section className="app-intro">
          <div className="app-intro-copy">
            <span className="eyebrow">PROXVEL / BETA PARA ANDROID</span>
            <h1>
              Menos vueltas.
              <br />
              <span>Más descubrimientos.</span>
            </h1>
            <p>
              El Perú tiene muchas historias. Encuentra destinos que conecten
              con tu manera de viajar y guarda los que te gustaría conocer.
            </p>
            <div className="app-actions">
              <a className="button button-dark" href={apk}>
                Descargar la app ↗
              </a>
              <a href="#dentro">Conoce un poco más ↓</a>
            </div>
            <span className="app-small-note">
              14 destinos para empezar. Una experiencia en evolución.
            </span>
          </div>
          <AppPreview />
        </section>
        <section className="app-benefits" id="dentro">
          <div className="app-section-heading">
            <span className="eyebrow">LO ESENCIAL, CERCA</span>
            <h2>
              Tu viaje empieza
              <br />
              <span>con lo que te mueve.</span>
            </h2>
            <p>Una pequeña muestra de lo que puedes hacer en PROXVEL.</p>
          </div>
          <div className="app-benefit-grid">
            {[
              [
                "01",
                "Descubre a tu ritmo.",
                "Explora el catálogo de destinos del Perú y consulta sus detalles antes de elegir.",
                "Explorar",
              ],
              [
                "02",
                "Dale tu toque.",
                "Indica tus intereses, el mes de viaje y tus preferencias de clima y afluencia para obtener recomendaciones.",
                "Personalizar",
              ],
              [
                "03",
                "Guarda esa idea.",
                "Reúne tus favoritos y vuelve a ellos cuando quieras preparar tu siguiente salida.",
                "Volver",
              ],
            ].map(([n, title, text, tag]) => (
              <article key={n}>
                <span className="app-feature-number">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>{tag}</small>
              </article>
            ))}
          </div>
        </section>
        <section className="app-detail-section">
          <div className="app-detail-window">
            <div className="app-detail-phone">
              <img
                src="/screens/preferences.webp"
                alt="Selección de preferencias y estilo de viaje en PROXVEL"
                loading="lazy"
                width="860"
                height="1800"
              />
            </div>
            <span>Tu estilo. Tus preferencias.</span>
          </div>
          <div>
            <span className="eyebrow">RECOMENDACIONES CON CONTEXTO</span>
            <h2>
              No todos viajamos
              <br />
              <span>de la misma forma.</span>
            </h2>
            <p>
              Tus intereses son el punto de partida. PROXVEL los combina con
              información de los destinos, clima y afluencia para ayudarte a
              comparar opciones.
            </p>
            <p>
              Las recomendaciones orientan tu elección. Los horarios, accesos y
              condiciones del lugar deben confirmarse antes de viajar.
            </p>
            <a href="/atlas.html" className="app-text-link">
              Empieza por el atlas del Perú ↗
            </a>
          </div>
        </section>
        <section className="app-download" id="descargar">
          <div>
            <span className="eyebrow">LA PRÓXIMA HISTORIA ES TUYA</span>
            <h2>Llévate PROXVEL.</h2>
            <p>
              Descarga la beta para Android. El botón y el QR siempre apuntan a
              la última versión publicada.
            </p>
            <a className="button button-dark" href={apk}>
              Descargar APK ↗
            </a>
            <small>
              Android te pedirá confirmar la instalación. La beta puede cambiar
              y presentar errores.
            </small>
          </div>
          <div className="app-qr">
            <QRCodeSVG
              value={apk}
              size={192}
              marginSize={2}
              level="M"
              bgColor="#ffffff"
              fgColor="#000000"
              title="Código QR permanente para descargar la última versión de PROXVEL"
            />
            <span>Escanea con tu Android. Siempre recibirás la versión publicada.</span>
          </div>
        </section>
        <section className="app-trust">
          <span className="eyebrow">UN MISMO ECOSISTEMA</span>
          <h2>
            También importa
            <br />
            <span>cómo cuidamos tu experiencia.</span>
          </h2>
          <p>
            Consulta los mismos documentos de privacidad, términos y gestión de
            datos disponibles en la app.
          </p>
          <div>
            <a href="/privacidad.html">Política de privacidad ↗</a>
            <a href="/terminos.html">Términos y condiciones ↗</a>
            <a href="/mis-datos.html">Mis datos y eliminación de cuenta ↗</a>
          </div>
          <small>
            Las imágenes muestran pantallas renderizadas con la interfaz de
            Flutter. Pueden variar según la versión.
          </small>
        </section>
      </main>
      <EcosystemFooter />
    </>
  );
}
