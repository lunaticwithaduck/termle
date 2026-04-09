import React from 'react';
import { Box } from 'ink';
import { WORD_LENGTH } from '../constants.js';
import { Tile } from './Tile.js';
import type { TileStatus, RevealPhase } from '../types.js';

export interface RowProps {
  readonly guess: string | null;
  readonly evaluation: readonly TileStatus[] | null;
  readonly isActive: boolean;
  readonly currentInput: string;
  readonly shakeOffset: number;
  readonly revealProgress: number;
  readonly winBounceFrame: number | null;
  readonly jumpFrame: number;
}

export function Row({
  guess,
  evaluation,
  isActive,
  currentInput,
  shakeOffset,
  revealProgress,
  winBounceFrame,
  jumpFrame,
}: RowProps) {
  const letters: string[] = isActive
    ? currentInput.padEnd(WORD_LENGTH, ' ').split('')
    : guess
    ? guess.split('')
    : Array<string>(WORD_LENGTH).fill(' ');

  return (
    <Box marginLeft={shakeOffset} marginBottom={0}>
      {letters.map((letter, i) => {
        let revealPhase: RevealPhase = 2;
        if (evaluation !== null && revealProgress <= WORD_LENGTH * 2) {
          const tileReveal = revealProgress - i * 2;
          if (tileReveal <= 0) revealPhase = 0;
          else if (tileReveal === 1) revealPhase = 1;
          else revealPhase = 2;
        }

        const bounceFrame =
          winBounceFrame !== null ? winBounceFrame + i * 2 : undefined;

        const relFrame = jumpFrame - i;
        const jumpedUp =
          evaluation?.[i] === 'correct' && relFrame >= 0 && relFrame < 2;

        return (
          <Tile
            key={i}
            letter={letter}
            status={evaluation?.[i] ?? null}
            revealPhase={revealPhase}
            bounceFrame={bounceFrame}
            jumpedUp={jumpedUp}
          />
        );
      })}
    </Box>
  );
}
