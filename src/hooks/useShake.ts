import { useState, useEffect } from 'react';
import { useAnimation } from 'ink';
import { SHAKE_DURATION } from '../constants.js';

interface ShakeResult {
  readonly offset: number;
  readonly trigger: () => void;
}

export function useShake(): ShakeResult {
  const [shaking, setShaking] = useState(false);
  const { frame, reset } = useAnimation({ interval: 60, isActive: shaking });

  useEffect(() => {
    if (shaking && frame >= SHAKE_DURATION) {
      setShaking(false);
    }
  }, [frame, shaking]);

  function trigger() {
    reset();
    setShaking(true);
  }

  const offset = shaking ? (frame % 2 === 0 ? -1 : 1) : 0;
  return { offset, trigger };
}
