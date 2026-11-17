/**
 * 10 curated 3D persona objects mapped across every individual letter of
 * "Maximilianus Louis Vigo" (21 characters, id 0..20) for bidirectional
 * letter-to-3D swap motion.
 */
export const PERSONA_STICKERS = [
  {
    src: '/assets/stickers/camera.webp',
    label: 'Visual Photography',
    caption: 'VISUAL STORYTELLER',
  },
  {
    src: '/assets/stickers/palette.webp',
    label: 'Brand & Color Systems',
    caption: '7+ YEARS IN BRANDING',
  },
  {
    src: '/assets/stickers/clapperboard.webp',
    label: 'Motion & Direction',
    caption: 'CREATIVE DIRECTION',
  },
  {
    src: '/assets/stickers/laptop.webp',
    label: 'Digital Product & UI/UX',
    caption: 'UI/UX & DIGITAL CRAFT',
  },
  {
    src: '/assets/stickers/keyboard.webp',
    label: 'Mechanical Craft',
    caption: 'ESSENTIAL 75 DAILY',
  },
  {
    src: '/assets/stickers/running-shoe.webp',
    label: 'Daily Miles',
    caption: 'MORNING MILES RUNNER',
  },
  {
    src: '/assets/stickers/headphones.webp',
    label: 'Sonic Rhythm',
    caption: 'ON REPEAT: FKJ & NIKI',
  },
  {
    src: '/assets/stickers/cards.webp',
    label: 'Strategic Play',
    caption: 'BALATRO STRATEGIST',
  },
  {
    src: '/assets/stickers/soccer-ball.webp',
    label: 'Figo Heritage',
    caption: 'NAMED AFTER LUIS FIGO',
  },
  {
    src: '/assets/stickers/coffee.webp',
    label: 'Creative Fuel',
    caption: 'FUELED BY ESPRESSO',
  },
];

const ROTATIONS = [-10, 8, -7, 11, -9, 12, -8, 9, -11, 10];
const WORD_STRINGS = ['Maximilianus', 'Louis', 'Vigo'];

let runningId = 0;

export const stickerWords = WORD_STRINGS.map((word) => ({
  word,
  letters: Array.from(word).map((char) => {
    const id = runningId;
    runningId += 1;
    const sticker = PERSONA_STICKERS[id % PERSONA_STICKERS.length];
    const rotate = ROTATIONS[id % ROTATIONS.length];
    return {
      id,
      char,
      rotate,
      ...sticker,
    };
  }),
}));

export const ALL_LETTERS = stickerWords.reduce((acc, wordObj) => {
  wordObj.letters.forEach((letter) => {
    acc[letter.id] = letter;
  });
  return acc;
}, {});

export const TOTAL_LETTERS = Object.keys(ALL_LETTERS).length;

/**
 * Preload all 10 WebP 3D objects on mount so letter swaps trigger with zero latency.
 */
export function preloadStickers() {
  if (typeof window === 'undefined') return;
  PERSONA_STICKERS.forEach(({ src }) => {
    const img = new window.Image();
    img.src = src;
  });
}
