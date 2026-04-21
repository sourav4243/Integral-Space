'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';
import type { Photo } from './photos';

interface Props {
  photo: Photo;
}

// Binder clip SVG — dark metal style
function BinderClip() {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clip top bar */}
      <rect x="2"  y="0" width="20" height="7" rx="3.5" fill="#4a3020" />
      <rect x="4"  y="2" width="16" height="4" rx="2"   fill="#2e1c0e" />
      {/* Left arm */}
      <rect x="2"  y="5" width="7"  height="29" rx="3.5" fill="#5a3c24" />
      <rect x="3"  y="6" width="3"  height="16" rx="1.5" fill="#7a5438" opacity="0.5" />
      {/* Right arm */}
      <rect x="15" y="5" width="7"  height="29" rx="3.5" fill="#5a3c24" />
      <rect x="16" y="6" width="3"  height="16" rx="1.5" fill="#7a5438" opacity="0.5" />
    </svg>
  );
}

export default function PhotoCard({ photo }: Props) {
  const [hasError, setHasError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cssVars = {
    '--tilt':       `${photo.tilt}deg`,
    '--sway-dur':   `${photo.swayDuration}s`,
    '--sway-delay': `${photo.swayDelay}s`,
  } as React.CSSProperties;

  return (
    <>
      {/* Hanging photo item */}
      <div
        className={`${styles.photoItem} ${styles[photo.orientation]}`}
        style={cssVars}
        onClick={() => !hasError && setLightboxOpen(true)}
        title={photo.caption}
      >
        {/* Binder clip on string */}
        <div className={styles.clip}>
          <BinderClip />
        </div>

        {/* Short string segment */}
        <div className={styles.stringDangle} />

        {/* Polaroid frame */}
        <div className={styles.polaroid}>
          <div className={styles.imageArea}>
            {hasError ? (
              <div className={styles.placeholder}>
                <span>📸</span>
                <span className={styles.placeholderText}>coming soon</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.caption}
                className={styles.photoImg}
                onError={() => setHasError(true)}
              />
            )}
          </div>

          <div className={styles.captionArea}>
            <span className={styles.caption}>{photo.caption}</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightboxOpen(false)}
        >
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightboxClose}
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className={styles.lightboxImage}
            />
            <span className={styles.lightboxCaption}>{photo.caption}</span>
          </div>
        </div>
      )}
    </>
  );
}
