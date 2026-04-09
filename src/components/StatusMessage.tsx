import React from 'react';
import { Box, Text } from 'ink';
import type { GameState } from '../types.js';

export interface StatusMessageProps {
  readonly message: string;
  readonly gameState: GameState;
  readonly guessCount: number;
  readonly target: string;
}

export function StatusMessage({
  message,
  gameState,
  guessCount,
  target,
}: StatusMessageProps) {
  return (
    <>
      <Box height={1} marginTop={1}>
        {message ? (
          <Text color="red" bold>{message}</Text>
        ) : (
          <Text> </Text>
        )}
      </Box>

      {gameState === 'won' && (
        <Box flexDirection="column" alignItems="center">
          <Text color="green" bold>You got it in {guessCount}!</Text>
          <Text color="gray">Enter to play again · Q to quit</Text>
        </Box>
      )}
      {gameState === 'lost' && (
        <Box flexDirection="column" alignItems="center">
          <Text color="red" bold>The word was: {target.toUpperCase()}</Text>
          <Text color="gray">Enter to play again · Q to quit</Text>
        </Box>
      )}
    </>
  );
}
