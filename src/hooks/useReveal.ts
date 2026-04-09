import { useState, useRef, useEffect } from 'react';
import { useAnimation } from 'ink';
import { REVEAL_TOTAL } from '../constants.js';
import type { PendingReveal } from '../types.js';

interface RevealResult {
  readonly revealProgressForRow: (rowIndex: number) => number;
  readonly startReveal: (rowIndex: number, pending: PendingReveal) => void;
}

export function useReveal(onComplete: (pending: PendingReveal) => void): RevealResult {
  const [revealRow, setRevealRow] = useState<number | null>(null);
  const pendingRef = useRef<PendingReveal | null>(null);
  // Always call with latest callback without re-triggering effects
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const { frame, reset } = useAnimation({
    interval: 150,
    isActive: revealRow !== null,
  });

  useEffect(() => {
    if (revealRow === null || pendingRef.current === null) return;
    if (frame >= REVEAL_TOTAL) {
      const pending = pendingRef.current;
      pendingRef.current = null;
      setRevealRow(null);
      onCompleteRef.current(pending);
    }
  }, [frame, revealRow]);

  function startReveal(rowIndex: number, pending: PendingReveal): void {
    pendingRef.current = pending;
    setRevealRow(rowIndex);
    reset();
  }

  function revealProgressForRow(rowIndex: number): number {
    return rowIndex === revealRow ? frame : REVEAL_TOTAL;
  }

  return { revealProgressForRow, startReveal };
}
