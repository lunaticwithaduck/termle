export type TileStatus = 'correct' | 'present' | 'absent';
export type RevealPhase = 0 | 1 | 2;
export type GameState = 'playing' | 'revealing' | 'won' | 'lost';
export type LetterStatuses = Partial<Record<string, TileStatus>>;

export interface PendingReveal {
  readonly guesses: string[];
  readonly evaluations: TileStatus[][];
  readonly letterStatuses: LetterStatuses;
  readonly nextState: GameState;
}
