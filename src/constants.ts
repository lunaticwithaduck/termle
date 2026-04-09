import type { TileStatus } from './types.js';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
export const WORDLE_LIST_URL =
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
] as const;

export const BOUNCE_FRAMES = [
  '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄',
] as const;

export const SPINNER_FRAMES = [
  '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏',
] as const;

export const STATUS_PRIORITY: Record<TileStatus, number> = {
  correct: 3,
  present: 2,
  absent: 1,
};

export const SHAKE_DURATION = 6;  // frames at 60 ms ≈ 360 ms
export const JUMP_TOTAL = 7;      // stagger (5) + 2 frames of "up"
export const REVEAL_TOTAL = WORD_LENGTH * 2 + 1;
