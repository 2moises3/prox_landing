export default function EcosystemFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="wordmark" href="/">
          PROXVEL
        </a>
        <p>
          Hecho para descubrir el Perú.
          <br />
          Un proyecto de{" "}
          <a href="https://m3biznovatech.com" target="_blank" rel="noreferrer">
            M3Biznovatech ↗
          </a>
        </p>
        <a href="mailto:soporte@m3biznovatech.com">Hablemos ↗</a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          <a href="https://m3biznovatech.com" target="_blank" rel="noreferrer">
            M3Biznovatech
          </a>
        </span>
        <nav aria-label="Enlaces del pie">
          <a href="/app.html">La app</a>
          <a href="/privacidad.html">Privacidad</a>
          <a href="/terminos.html">Términos y condiciones</a>
          <a href="/mis-datos.html">Mis datos</a>
          <a href="/#faq">Preguntas frecuentes</a>
        </nav>
      </div>
    </footer>
  );
}
