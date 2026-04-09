import { WORD_LENGTH, STATUS_PRIORITY } from './constants.js';
import type { TileStatus, LetterStatuses } from './types.js';

export function pickRandom(words: readonly string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function evaluateGuess(guess: string, target: string): TileStatus[] {
  const result: TileStatus[] = Array(WORD_LENGTH).fill('absent');
  const targetChars = target.split('');
  const guessChars = guess.split('');
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessChars[i] === targetChars[j]) {
        result[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }
  return result;
}

export function tileAccentColor(status: TileStatus | null): string | undefined {
  if (status === 'correct') return 'green';
  if (status === 'present') return 'yellow';
  if (status === 'absent') return 'gray';
  return undefined;
}

export function mergeLetterStatuses(
  current: LetterStatuses,
  word: string,
  evaluation: TileStatus[],
): LetterStatuses {
  const next = { ...current };
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    const incoming = evaluation[i];
    const existing = next[ch];
    if (existing === undefined || STATUS_PRIORITY[incoming] > STATUS_PRIORITY[existing]) {
      next[ch] = incoming;
    }
  }
  return next;
}
