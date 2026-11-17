/**
 * 10 curated 3D sticker segments distributed across two architectural lines:
 * Line 1: "Maximilianus" (4 segments)
 * Line 2: "Louis Vigo" (6 segments)
 * Centered directly over letterforms (-18% / 6%) with personal micro-captions
 * and transient sinking ("tenggelam") physics when cursor leaves.
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
            caption: 'VISUAL STORYTELLER',
            src: '/assets/stickers/camera.webp',
            rotate: -12,
            offsetY: '-18%',
          },
          {
            id: 1,
            text: 'xim',
            label: 'Brand & Color Systems',
            caption: '7+ YEARS IN BRANDING',
            src: '/assets/stickers/palette.webp',
            rotate: 10,
            offsetY: '6%',
          },
          {
            id: 2,
            text: 'ili',
            label: 'Motion & Direction',
            caption: 'CREATIVE DIRECTION',
            src: '/assets/stickers/clapperboard.webp',
            rotate: -8,
            offsetY: '-18%',
          },
          {
            id: 3,
            text: 'anus',
            label: 'Digital Product & UI/UX',
            caption: 'UI/UX & DIGITAL CRAFT',
            src: '/assets/stickers/laptop.webp',
            rotate: 11,
            offsetY: '6%',
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
            caption: 'ESSENTIAL 75 DAILY',
            src: '/assets/stickers/keyboard.webp',
            rotate: -10,
            offsetY: '-18%',
          },
          {
            id: 5,
            text: 'u',
            label: 'Daily Miles',
            caption: 'MORNING MILES RUNNER',
            src: '/assets/stickers/running-shoe.webp',
            rotate: 13,
            offsetY: '6%',
          },
          {
            id: 6,
            text: 'is',
            label: 'Sonic Rhythm',
            caption: 'ON REPEAT: FKJ & NIKI',
            src: '/assets/stickers/headphones.webp',
            rotate: -9,
            offsetY: '-18%',
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
            caption: 'BALATRO STRATEGIST',
            src: '/assets/stickers/cards.webp',
            rotate: 9,
            offsetY: '6%',
          },
          {
            id: 8,
            text: 'g',
            label: 'Figo Heritage',
            caption: 'NAMED AFTER LUIS FIGO',
            src: '/assets/stickers/soccer-ball.webp',
            rotate: -14,
            offsetY: '-18%',
          },
          {
            id: 9,
            text: 'o',
            label: 'Creative Fuel',
            caption: 'FUELED BY ESPRESSO',
            src: '/assets/stickers/coffee.webp',
            rotate: 11,
            offsetY: '6%',
          },
        ],
      },
    ],
  },
];

export const ALL_SEGMENTS = stickerLines.reduce((acc, line) => {
  line.words.forEach((word) => {
    word.segments.forEach((seg) => {
      acc[seg.id] = seg;
    });
  });
  return acc;
}, {});

export const TOTAL_STICKERS = Object.keys(ALL_SEGMENTS).length;

/**
 * Warm browser cache for all 10 sticker WebP files on mount
 * so hover/touch reveals have zero network latency.
 */
export function preloadStickers() {
  if (typeof window === 'undefined') return;
  Object.values(ALL_SEGMENTS).forEach(({ src }) => {
    const img = new window.Image();
    img.src = src;
  });
}
