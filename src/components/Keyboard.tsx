import React from 'react';
import { Box, Text } from 'ink';
import { KEYBOARD_ROWS } from '../constants.js';
import { tileAccentColor } from '../utils.js';
import type { TileStatus, LetterStatuses } from '../types.js';

interface KeyboardKeyProps {
  readonly letter: string;
  readonly status: TileStatus | undefined;
}

function KeyboardKey({ letter, status }: KeyboardKeyProps) {
  const accent = status ? tileAccentColor(status) : undefined;
  return (
    <Box marginRight={1}>
      <Text
        color={accent ?? 'white'}
        bold={!!accent}
        dimColor={status === 'absent'}
      >
        {letter}
      </Text>
    </Box>
  );
}

export interface KeyboardProps {
  readonly letterStatuses: LetterStatuses;
}

export function Keyboard({ letterStatuses }: KeyboardProps) {
  return (
    <Box flexDirection="column" marginTop={1}>
      {KEYBOARD_ROWS.map((row, i) => (
        <Box key={i} justifyContent="center">
          {row.map((key) => (
            <KeyboardKey
              key={key}
              letter={key}
              status={letterStatuses[key.toLowerCase()]}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
