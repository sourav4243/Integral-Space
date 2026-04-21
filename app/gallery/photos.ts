export type Photo = {
  id: number;
  src: string;
  caption: string;
  tilt: number;         // initial rotation in degrees
  swayDuration: number; // animation duration in seconds
  swayDelay: number;    // animation delay in seconds
  orientation: 'landscape' | 'portrait'; // to handle sizes differently
};

export const CLOUD_NAME = 'dk8hb1vdy';

export function getCloudinaryUrl(publicPath: string) {
  const filename = publicPath.split('/').pop();
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/v1/${filename}`;
}

export const GALLERY_ROWS: Photo[][] = [
  // Row 1: Landscape (3 photos)
  [
    { id: 1, src: getCloudinaryUrl('landscape/photo1_mbcjr1.jpg'), caption: 'a quiet moment', tilt: -3, swayDuration: 4.2, swayDelay: 0.0, orientation: 'landscape' },
    { id: 2, src: getCloudinaryUrl('landscape/photo2_nrfjof.jpg'), caption: 'golden hour', tilt: 2, swayDuration: 3.8, swayDelay: 0.6, orientation: 'landscape' },
    { id: 6, src: getCloudinaryUrl('landscape/photo6_svoafp.jpg'), caption: 'borrowed light', tilt: -1, swayDuration: 5.0, swayDelay: 0.2, orientation: 'landscape' },
  ],
  // Row 2: Portrait (4 photos)
  [
    { id: 3, src: getCloudinaryUrl('portrait/photo3_qlh0lh.jpg'), caption: 'still life', tilt: 3, swayDuration: 4.6, swayDelay: 1.2, orientation: 'portrait' },
    { id: 4, src: getCloudinaryUrl('portrait/photo4_zp63n9.jpg'), caption: 'the in-between', tilt: -2, swayDuration: 3.5, swayDelay: 0.3, orientation: 'portrait' },
    { id: 5, src: getCloudinaryUrl('portrait/photo5_h3bnzl.jpg'), caption: 'through the lens', tilt: 4, swayDuration: 4.0, swayDelay: 0.8, orientation: 'portrait' },
    { id: 7, src: getCloudinaryUrl('portrait/photo7_ag2yee.jpg'), caption: 'caught in time', tilt: -3, swayDuration: 3.7, swayDelay: 1.5, orientation: 'portrait' },
  ],
];
