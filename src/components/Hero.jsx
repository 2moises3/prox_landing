import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const skyY = useTransform(progress, [0, 1], [0, 55]);
  const mountainY = useTransform(progress, [0, 1], [0, -28]);
  return (
    <section
      ref={ref}
      className="mountain-hero"
      id="top"
      aria-label="PROXVEL — inicio"
    >
      <motion.div
        className="mountain-hero__sky"
        style={reduce ? {} : { y: skyY }}
        aria-hidden="true"
      />
      <div className="mountain-hero__title-layer">
        <motion.h1
          initial={reduce ? false : { y: "45vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 2.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          PROXVEL
        </motion.h1>
      </div>
      <motion.div
        className="mountain-hero__foreground"
        style={reduce ? {} : { y: mountainY }}
        aria-hidden="true"
      >
        <motion.div
          className="mountain-hero__mountains"
          initial={reduce ? false : { y: 55 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="mountain-hero__shade" aria-hidden="true" />
      <div className="mountain-hero__content">
        <p>
          Descubre el Perú con recomendaciones
          <br className="desktop-break" /> que conectan con tu forma de viajar.
        </p>
        <a href="#destinos" className="button mountain-hero__cta">
          Explorar destinos <span aria-hidden="true">↗</span>
        </a>
        <a href="#descargar" className="mountain-hero__download">
          Descargar para Android <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div
        className="mountain-hero__strip"
        aria-label="Factores para elegir tu destino"
      >
        {[
          "Preferencias",
          "Seguridad",
          "Costo",
          "Limpieza",
          "Clima",
          "Afluencia",
          "Afinidad",
        ].map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
    </section>
  );
}
