import styles from './gallery.module.css';
import Link from 'next/link';

function EdisonBulb({ animDelay }: { animDelay: string }) {
  return (
    <div className={styles.bulbWrapper} style={{ animationDelay: animDelay }}>
      <svg width="44" height="90" viewBox="0 0 44 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hanging wire */}
        <line x1="22" y1="0" x2="22" y2="16" stroke="#3a2010" strokeWidth="2.5" strokeLinecap="round" />
        {/* Cap (Edison screw base) */}
        <rect x="14" y="14" width="16" height="8" rx="3" fill="#2e1a0a" />
        <rect x="12" y="17" width="20" height="5" rx="2.5" fill="#3d2412" />
        <line x1="12" y1="19" x2="32" y2="19" stroke="#5a3820" strokeWidth="1" />
        <line x1="12" y1="21" x2="32" y2="21" stroke="#5a3820" strokeWidth="1" />
        {/* Bulb glass */}
        <ellipse cx="22" cy="50" rx="16" ry="22" fill="rgba(255,190,60,0.10)" stroke="rgba(200,140,40,0.25)" strokeWidth="1" />
        {/* Inner glow blob */}
        <ellipse cx="22" cy="48" rx="9" ry="12" fill="rgba(255,170,50,0.18)" />
        {/* Filament */}
        <path d="M17 46 Q19 42 22 46 Q25 42 27 46" stroke="#ffc060" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <line x1="22" y1="46" x2="22" y2="56" stroke="#e8a040" strokeWidth="1.2" />
        {/* Bulb tip */}
        <path d="M17 68 Q22 76 27 68" fill="none" stroke="rgba(200,140,40,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function GalleryHeader() {
  return (
    <header className={styles.header}>
      {/* Wooden top beam */}
      <div className={styles.woodBeam} />

      {/* Back navigation */}
      <Link href="/" className={styles.backLink}>← back</Link>

      {/* Edison bulbs + title */}
      <div className={styles.bulbRow}>
        <EdisonBulb animDelay="0s" />
        <EdisonBulb animDelay="0.3s" />

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>The Gallery Room</h1>
          <p className={styles.subtitle}>a collection of moments</p>
        </div>

        <EdisonBulb animDelay="0.6s" />
        <EdisonBulb animDelay="0.9s" />
      </div>
    </header>
  );
}
