import { useState, useEffect } from 'react';
import { useAnimation } from 'ink';
import { JUMP_TOTAL } from '../constants.js';

interface JumpResult {
  readonly jumpFrameForRow: (rowIndex: number) => number;
  readonly startJump: (rowIndex: number) => void;
}

export function useJump(): JumpResult {
  const [jumpRow, setJumpRow] = useState<number | null>(null);
  const { frame, reset } = useAnimation({ interval: 80, isActive: jumpRow !== null });

  useEffect(() => {
    if (jumpRow !== null && frame >= JUMP_TOTAL) {
      setJumpRow(null);
    }
  }, [frame, jumpRow]);

  function startJump(rowIndex: number): void {
    reset();
    setJumpRow(rowIndex);
  }

  function jumpFrameForRow(rowIndex: number): number {
    return rowIndex === jumpRow ? frame : -1;
  }

  return { jumpFrameForRow, startJump };
}
