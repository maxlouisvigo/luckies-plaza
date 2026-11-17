/**
 * 10 curated 3D sticker segments distributed across "Maximilianus Louis Vigo"
 * Grouped by word so mobile/desktop line-wrapping never breaks mid-word.
 */
export const stickerWords = [
  {
    word: 'Maximilianus',
    segments: [
      {
        id: 0,
        text: 'Ma',
        label: 'Visual Photography',
        src: '/assets/stickers/camera.webp',
        rotate: -12,
        offsetY: '-22%',
      },
      {
        id: 1,
        text: 'xim',
        label: 'Brand & Color Systems',
        src: '/assets/stickers/palette.webp',
        rotate: 10,
        offsetY: '18%',
      },
      {
        id: 2,
        text: 'ili',
        label: 'Motion & Direction',
        src: '/assets/stickers/clapperboard.webp',
        rotate: -8,
        offsetY: '-24%',
      },
      {
        id: 3,
        text: 'anus',
        label: 'Digital Product & UI/UX',
        src: '/assets/stickers/laptop.webp',
        rotate: 12,
        offsetY: '16%',
      },
    ],
  },
  {
    word: 'Louis',
    segments: [
      {
        id: 4,
        text: 'Lo',
        label: 'Mechanical Craft',
        src: '/assets/stickers/keyboard.webp',
        rotate: -10,
        offsetY: '-20%',
      },
      {
        id: 5,
        text: 'u',
        label: 'Daily Miles',
        src: '/assets/stickers/running-shoe.webp',
        rotate: 14,
        offsetY: '20%',
      },
      {
        id: 6,
        text: 'is',
        label: 'Sonic Rhythm',
        src: '/assets/stickers/headphones.webp',
        rotate: -11,
        offsetY: '-22%',
      },
    ],
  },
  {
    word: 'Vigo',
    segments: [
      {
        id: 7,
        text: 'Vi',
        label: 'Strategic Play',
        src: '/assets/stickers/cards.webp',
        rotate: 9,
        offsetY: '18%',
      },
      {
        id: 8,
        text: 'g',
        label: 'Figo Heritage',
        src: '/assets/stickers/soccer-ball.webp',
        rotate: -13,
        offsetY: '-20%',
      },
      {
        id: 9,
        text: 'o',
        label: 'Creative Fuel',
        src: '/assets/stickers/coffee.webp',
        rotate: 11,
        offsetY: '16%',
      },
    ],
  },
];

export const TOTAL_STICKERS = stickerWords.reduce(
  (sum, word) => sum + word.segments.length,
  0
);

/**
 * Warm browser cache for all 10 sticker WebP files on mount
 * so hover/touch reveals have zero network latency.
 */
export function preloadStickers() {
  if (typeof window === 'undefined') return;
  stickerWords.forEach(({ segments }) => {
    segments.forEach(({ src }) => {
      const img = new window.Image();
      img.src = src;
    });
  });
}
