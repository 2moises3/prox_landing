import Icon from './Icon';
import { QRCodeSVG } from 'qrcode.react';
import { useApkDownload } from '../hooks/useApkDownload';
import './BetaAccess.css';

export default function BetaAccess() {
  const apkUrl = useApkDownload();
  return (
    <section className="beta" id="beta">
      <div className="container beta__container reveal">
        <div className="beta__content">
          <span className="eyebrow">Accede a PROXVEL</span>
          <h2 className="beta__title">
            La inteligencia de PROXVEL,<br />
            <span className="gold-text">en tu mano.</span>
          </h2>
          <p className="beta__sub">
            Descarga la app Android y lleva el motor de recomendación contigo.
            Gratis durante toda la beta — sin compromisos.
          </p>

          <ul className="beta__perks">
            <li><Icon name="check" size={16} /> Acceso completo sin costo</li>
            <li><Icon name="check" size={16} /> Recomendaciones en tiempo real</li>
            <li><Icon name="lock" size={16} /> Tus datos se mantienen privados</li>
          </ul>

          <div className="beta__actions">
            <a href={apkUrl} className="btn btn-primary btn-lg beta__download-btn">
              <Icon name="smartphone" size={18} />
              Descargar APK
            </a>
            <div className="beta__qr">
              <QRCodeSVG value={new URL(apkUrl, window.location.origin).href} size={136} marginSize={1} />
              <span>Escanea para descargar en Android</span>
            </div>
            <span className="beta__soon">
              <Icon name="googlePlay" size={18} />
              Próximamente en Google Play
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
