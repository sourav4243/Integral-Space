import styles from './gallery.module.css';
import PhotoCard from './PhotoCard';
import type { Photo } from './photos';

interface Props {
  photos: Photo[];
  reversed: boolean;  // row 2 flows right→left
}

export default function PhotoStrip({ photos, reversed }: Props) {
  const orderedPhotos = reversed ? [...photos].reverse() : photos;

  return (
    <div className={styles.stripWrapper}>
      {/* The horizontal string line (wall-to-wall) */}
      <div className={styles.stringLine} />

      {/* Photos hanging from the string */}
      <div
        className={styles.photosRow}
        style={{ flexDirection: reversed ? 'row-reverse' : 'row' }}
      >
        {orderedPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
