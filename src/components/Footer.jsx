import Icon from './Icon';
import { NAV } from '../data/content';
import logo from '../assets/logo.png';
import { useApkDownload } from '../hooks/useApkDownload';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const apkUrl = useApkDownload();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta glass reveal">
          <div>
            <h2 className="footer__cta-title">
              Tu próxima aventura ya tiene <span className="gold-text">coordenadas</span>
            </h2>
            <p>Únete a la beta y descubre el Perú que encaja contigo.</p>
          </div>
          <a href="#beta" className="btn btn-primary btn-lg">
            <Icon name="compass" size={19} />
            Obtener la beta
          </a>
        </div>

        <div className="footer__main">
          <div className="footer__brand">
            <a href="#top" className="footer__logo">
              <img src={logo} alt="" width="40" height="40" />
              <span>PROXVEL</span>
            </a>
            <p className="footer__tag">
              Inteligencia de viaje hecha para el Perú. Recomendaciones que ponderan tus
              preferencias, seguridad, costo, limpieza, clima, afluencia y afinidad.
            </p>
            <span className="footer__made">
              <Icon name="mapPin" size={15} /> Hecho con orgullo para viajeros del Perú
            </span>
          </div>

          <nav className="footer__nav" aria-label="Enlaces del pie de página">
            <span className="footer__nav-title">Explora</span>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="footer__nav">
            <span className="footer__nav-title">Beta</span>
            <a href={apkUrl}>Descargar APK</a>
            <a href="#beta">Ver QR de descarga</a>
            <span className="footer__soon">
              <Icon name="googlePlay" size={15} /> Google Play (pronto)
            </span>
          </div>

          <div className="footer__nav">
            <span className="footer__nav-title">Contacto</span>
            <a href="mailto:soporte@m3biznovatech.com">soporte@m3biznovatech.com</a>
            <span>Ñaña, Lurigancho-Chosica, Lima, Perú</span>
            <span className="footer__soon">Equipo M3Biznovatech</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} PROXVEL. Todos los derechos reservados por Biznovatech S.A.C. (M3Biznovatech).</span>
          <div className="footer__legal">
            <a href="/privacidad">Privacidad</a>
            <a href="/terminos">Términos</a>
            <a href="/mis-datos">Mis datos y eliminación de cuenta</a>
            <a href="mailto:soporte@m3biznovatech.com">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
