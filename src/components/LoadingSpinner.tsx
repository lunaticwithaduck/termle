import React from 'react';
import { Box, Text, useAnimation } from 'ink';
import { SPINNER_FRAMES } from '../constants.js';

export function LoadingSpinner() {
  const { frame } = useAnimation({ interval: 80 });
  return (
    <Box paddingY={1} alignItems="center" flexDirection="column">
      <Text bold color="white"> T E R M L E </Text>
      <Box marginTop={1} gap={1}>
        <Text color="green">{SPINNER_FRAMES[frame % SPINNER_FRAMES.length]}</Text>
        <Text color="gray">Fetching word list…</Text>
      </Box>
    </Box>
  );
}
