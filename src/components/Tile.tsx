import React from 'react';
import { Box, Text } from 'ink';
import { BOUNCE_FRAMES } from '../constants.js';
import { tileAccentColor } from '../utils.js';
import type { TileStatus, RevealPhase } from '../types.js';

export interface TileProps {
  readonly letter: string;
  readonly status: TileStatus | null;
  readonly revealPhase?: RevealPhase;
  readonly bounceFrame?: number;
  readonly jumpedUp?: boolean;
}

export function Tile({
  letter,
  status,
  revealPhase = 2,
  bounceFrame,
  jumpedUp = false,
}: TileProps) {
  const showColor = revealPhase === 2 && status !== null;
  const accent = showColor ? tileAccentColor(status) : undefined;
  const borderColor = accent ?? (letter.trim() ? 'white' : 'gray');

  const displayLetter = revealPhase === 1 ? ' ' : letter.toUpperCase() || ' ';
  const finalLetter =
    bounceFrame !== undefined
      ? BOUNCE_FRAMES[bounceFrame % BOUNCE_FRAMES.length]
      : displayLetter;

  return (
    <Box
      borderStyle="single"
      borderColor={borderColor}
      width={5}
      height={3}
      alignItems={jumpedUp ? 'flex-start' : 'center'}
      justifyContent="center"
      marginRight={1}
    >
      <Text bold={showColor} color={accent ?? 'white'}>
        {' '}{finalLetter}{' '}
      </Text>
    </Box>
  );
}
