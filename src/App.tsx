import React from 'react';
import { Box, Text } from 'ink';
import { useWordList } from './hooks/useWordList.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';
import { Game } from './Game.js';

export default function App() {
  const { words, error } = useWordList();

  if (error !== null) {
    return (
      <Box paddingY={1} flexDirection="column" alignItems="center">
        <Text bold color="white"> T E R M L E </Text>
        <Box marginTop={1}>
          <Text color="red">Could not load word list: {error}</Text>
        </Box>
        <Text color="gray">Check your internet connection and try again.</Text>
      </Box>
    );
  }

  if (words === null) return <LoadingSpinner />;

  return <Game words={words} />;
}
