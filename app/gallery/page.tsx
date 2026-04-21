import type { Metadata } from 'next';
import { Playfair_Display, Caveat } from 'next/font/google';
import { GALLERY_ROWS } from './photos';
import GalleryHeader from './GalleryHeader';
import PhotoStrip from './PhotoStrip';
import styles from './gallery.module.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Dark Room — Sourav's Gallery",
  description: "A personal photo gallery — moments I wanted to keep forever.",
};

export default function GalleryPage() {
  return (
    <div className={`${styles.page} ${playfair.variable} ${caveat.variable}`}>

      {/* Header: wooden beam + Edison bulbs + title */}
      <GalleryHeader />

      {/* Three string rows of hanging photos */}
      <main className={styles.gallery}>
        {GALLERY_ROWS.map((row, i) => (
          <PhotoStrip
            key={i}
            photos={row}
            reversed={i % 2 === 1}
          />
        ))}
      </main>

      {/* Decorative footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLine} />
        <p className={styles.footerText}>all photographs — sourav</p>
      </footer>

    </div>
  );
}
