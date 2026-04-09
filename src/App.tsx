import React from 'react';
import { Box, Text } from 'ink';
import { useWordList } from './hooks/useWordList.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';
import { Game } from './Game.js';

export default function App() {
  const { words, error } = useWordList();

  if (words === null) return <LoadingSpinner />;

  return (
    <Box flexDirection="column">
      {error !== null && (
        <Box justifyContent="center">
          <Text color="yellow">{error}</Text>
        </Box>
      )}
      <Game words={words} />
    </Box>
  );
}
