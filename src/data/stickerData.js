/**
 * 10 curated 3D sticker segments distributed across two architectural lines:
 * Line 1: "Maximilianus" (4 segments)
 * Line 2: "Louis Vigo" (6 segments)
 * Strictly alternating upper/lower offsets keep letterforms legible and prevent sticker pile-ups.
 */
export const stickerLines = [
  {
    id: 'line-1',
    words: [
      {
        word: 'Maximilianus',
        segments: [
          {
            id: 0,
            text: 'Ma',
            label: 'Visual Photography',
            src: '/assets/stickers/camera.webp',
            rotate: -12,
            offsetY: '-34%',
          },
          {
            id: 1,
            text: 'xim',
            label: 'Brand & Color Systems',
            src: '/assets/stickers/palette.webp',
            rotate: 10,
            offsetY: '36%',
          },
          {
            id: 2,
            text: 'ili',
            label: 'Motion & Direction',
            src: '/assets/stickers/clapperboard.webp',
            rotate: -8,
            offsetY: '-36%',
          },
          {
            id: 3,
            text: 'anus',
            label: 'Digital Product & UI/UX',
            src: '/assets/stickers/laptop.webp',
            rotate: 11,
            offsetY: '34%',
          },
        ],
      },
    ],
  },
  {
    id: 'line-2',
    words: [
      {
        word: 'Louis',
        segments: [
          {
            id: 4,
            text: 'Lo',
            label: 'Mechanical Craft',
            src: '/assets/stickers/keyboard.webp',
            rotate: -10,
            offsetY: '-36%',
          },
          {
            id: 5,
            text: 'u',
            label: 'Daily Miles',
            src: '/assets/stickers/running-shoe.webp',
            rotate: 13,
            offsetY: '38%',
          },
          {
            id: 6,
            text: 'is',
            label: 'Sonic Rhythm',
            src: '/assets/stickers/headphones.webp',
            rotate: -9,
            offsetY: '-38%',
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
            offsetY: '36%',
          },
          {
            id: 8,
            text: 'g',
            label: 'Figo Heritage',
            src: '/assets/stickers/soccer-ball.webp',
            rotate: -14,
            offsetY: '-34%',
          },
          {
            id: 9,
            text: 'o',
            label: 'Creative Fuel',
            src: '/assets/stickers/coffee.webp',
            rotate: 11,
            offsetY: '38%',
          },
        ],
      },
    ],
  },
];

export const TOTAL_STICKERS = stickerLines.reduce(
  (sum, line) =>
    sum + line.words.reduce((wSum, word) => wSum + word.segments.length, 0),
  0
);

/**
 * Warm browser cache for all 10 sticker WebP files on mount
 * so hover/touch reveals have zero network latency.
 */
export function preloadStickers() {
  if (typeof window === 'undefined') return;
  stickerLines.forEach(({ words }) => {
    words.forEach(({ segments }) => {
      segments.forEach(({ src }) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  });
}
