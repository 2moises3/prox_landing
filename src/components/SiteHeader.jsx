import { useEffect, useState } from "react";
export default function SiteHeader({
  home = false,
  page = home ? "home" : "atlas",
}) {
  const [overHero, setOverHero] = useState(home);
  useEffect(() => {
    if (!home) return;
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-78px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [home]);
  return (
    <header
      className={`site-header ${home ? "site-header--overlay" : ""} ${overHero ? "site-header--clear" : ""}`}
    >
      <a
        className="wordmark"
        href={home ? "#top" : "/"}
        aria-label="PROXVEL, inicio"
      >
        <img src="/logo.png" alt="" width="32" height="32" />
        PROXVEL<span className="beta-label">BETA</span>
      </a>
      <nav aria-label="Principal">
        <a href="/" aria-current={page === "home" ? "page" : undefined}>
          Home
        </a>
        <a
          href="/atlas.html"
          aria-current={page === "atlas" ? "page" : undefined}
        >
          Atlas de destinos
        </a>
        <a href="/app.html" aria-current={page === "app" ? "page" : undefined}>
          La app
        </a>
      </nav>
      <a className="nav-download" href={home ? "#descargar" : "/#descargar"}>
        Descargar <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
