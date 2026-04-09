import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, useInput, useApp, useAnimation } from 'ink';
import { WORDS as FALLBACK_WORDS } from './words.js';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const WORDLE_LIST_URL =
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';

const KEYBOARD_ROWS: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const BOUNCE_FRAMES = ['▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄'];

type TileStatus = 'correct' | 'present' | 'absent';
type GameState = 'playing' | 'revealing' | 'won' | 'lost';
type LetterStatuses = Record<string, TileStatus>;

function pickRandom(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function evaluateGuess(guess: string, target: string): TileStatus[] {
  const result: TileStatus[] = Array(WORD_LENGTH).fill('absent');
  const targetArr = target.split('');
  const guessArr = guess.split('');
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessArr[i] === targetArr[j]) {
        result[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }
  return result;
}

function tileAccentColor(status: TileStatus | null): string | undefined {
  if (status === 'correct') return 'green';
  if (status === 'present') return 'yellow';
  if (status === 'absent') return 'gray';
  return undefined;
}

// ─── Tile ────────────────────────────────────────────────────────────────────

interface TileProps {
  letter: string;
  status: TileStatus | null;
  /** 0 = hidden (pre-reveal), 1 = flipping (mid-flip, no color), 2 = revealed */
  revealPhase?: 0 | 1 | 2;
  bounceFrame?: number;
  /** true when this tile should be shifted to the top of its box (jump-up phase) */
  jumpedUp?: boolean;
}

function Tile({ letter, status, revealPhase = 2, bounceFrame, jumpedUp = false }: TileProps) {
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

// ─── Row ─────────────────────────────────────────────────────────────────────

interface RowProps {
  guess: string | null;
  evaluation: TileStatus[] | null;
  isActive: boolean;
  currentInput: string;
  shakeOffset: number;
  /** how many tiles have completed their reveal (0–5) */
  revealProgress: number;
  winBounceFrame: number | null;
  /** current jump animation frame for this row (-1 = not jumping) */
  jumpFrame: number;
}

function Row({
  guess,
  evaluation,
  isActive,
  currentInput,
  shakeOffset,
  revealProgress,
  winBounceFrame,
  jumpFrame,
}: RowProps) {
  const letters = isActive
    ? currentInput.padEnd(WORD_LENGTH, ' ').split('')
    : guess
    ? guess.split('')
    : Array(WORD_LENGTH).fill(' ');

  return (
    <Box marginLeft={shakeOffset} marginBottom={0}>
      {letters.map((letter, i) => {
        let revealPhase: 0 | 1 | 2 = 2;
        if (evaluation && revealProgress <= WORD_LENGTH * 2) {
          const tileReveal = revealProgress - i * 2;
          if (tileReveal <= 0) revealPhase = 0;
          else if (tileReveal === 1) revealPhase = 1;
          else revealPhase = 2;
        }

        const bounceFrame =
          winBounceFrame !== null ? winBounceFrame + i * 2 : undefined;

        // Stagger each tile by its index: tile i jumps when jumpFrame >= i
        // It's "up" for 2 frames then back down
        const relFrame = jumpFrame - i;
        const jumpedUp =
          evaluation?.[i] === 'correct' &&
          relFrame >= 0 &&
          relFrame < 2;

        return (
          <Tile
            key={i}
            letter={letter}
            status={evaluation ? evaluation[i] : null}
            revealPhase={revealPhase}
            bounceFrame={bounceFrame}
            jumpedUp={jumpedUp}
          />
        );
      })}
    </Box>
  );
}

// ─── Keyboard ────────────────────────────────────────────────────────────────

function KeyboardKey({
  letter,
  status,
}: {
  letter: string;
  status: TileStatus | undefined;
}) {
  const accent = status ? tileAccentColor(status) : undefined;
  return (
    <Box marginRight={1}>
      <Text color={accent ?? 'white'} bold={!!accent} dimColor={status === 'absent'}>
        {letter}
      </Text>
    </Box>
  );
}

function Keyboard({ letterStatuses }: { letterStatuses: LetterStatuses }) {
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

// ─── Game ────────────────────────────────────────────────────────────────────

const SHAKE_DURATION = 6; // frames at 60ms = ~360ms

function Game({ words }: { words: string[] }) {
  const { exit } = useApp();
  const [wordSet] = useState<Set<string>>(() => new Set(words));
  const [target, setTarget] = useState(() => pickRandom(words));
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<TileStatus[][]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [message, setMessage] = useState('');
  const [letterStatuses, setLetterStatuses] = useState<LetterStatuses>({});

  // Shake state
  const [shaking, setShaking] = useState(false);
  const shakeFramesLeft = useRef(0);
  const { frame: shakeFrame, reset: resetShake } = useAnimation({
    interval: 60,
    isActive: shaking,
  });

  // Reveal state: which row is being revealed, and how far along (0 to WORD_LENGTH*2)
  const [revealRow, setRevealRow] = useState<number | null>(null);
  const pendingResult = useRef<{
    guesses: string[];
    evals: TileStatus[][];
    letterStatuses: LetterStatuses;
    nextState: GameState;
  } | null>(null);
  const { frame: revealFrame, reset: resetReveal } = useAnimation({
    interval: 150,
    isActive: revealRow !== null,
  });

  // Win bounce
  const [bouncing, setBouncing] = useState(false);
  const { frame: bounceFrame } = useAnimation({
    interval: 80,
    isActive: bouncing,
  });

  // Per-row correct-tile jump
  const [jumpRow, setJumpRow] = useState<number | null>(null);
  const { frame: jumpFrame, reset: resetJump } = useAnimation({
    interval: 80,
    isActive: jumpRow !== null,
  });
  const JUMP_TOTAL = WORD_LENGTH + 2; // stagger across tiles + 2 frames of "up"

  // Handle shake ticking
  useEffect(() => {
    if (!shaking) return;
    shakeFramesLeft.current = SHAKE_DURATION;
  }, [shaking]);

  useEffect(() => {
    if (!shaking) return;
    shakeFramesLeft.current -= 1;
    if (shakeFramesLeft.current <= 0) setShaking(false);
  }, [shakeFrame]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle reveal ticking — each step advances by 1 (two steps per tile: flip + reveal)
  const revealTotal = WORD_LENGTH * 2 + 1;
  useEffect(() => {
    if (revealRow === null || !pendingResult.current) return;
    if (revealFrame >= revealTotal) {
      const { guesses: g, evals: e, letterStatuses: ls, nextState } =
        pendingResult.current;
      const finishedRowIndex = g.length - 1;
      const hasCorrect = e[finishedRowIndex].some((s) => s === 'correct');
      pendingResult.current = null;
      setGuesses(g);
      setEvaluations(e);
      setLetterStatuses(ls);
      setRevealRow(null);
      setGameState(nextState);
      if (nextState === 'won') {
        setBouncing(true);
      } else if (hasCorrect) {
        setJumpRow(finishedRowIndex);
        resetJump();
      }
    }
  }, [revealFrame, revealRow]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (jumpRow === null) return;
    if (jumpFrame >= JUMP_TOTAL) setJumpRow(null);
  }, [jumpFrame, jumpRow, JUMP_TOTAL]);

  function restart() {
    setTarget(pickRandom(words));
    setGuesses([]);
    setEvaluations([]);
    setCurrentInput('');
    setGameState('playing');
    setMessage('');
    setLetterStatuses({});
    setBouncing(false);
    pendingResult.current = null;
    setRevealRow(null);
    setJumpRow(null);
  }

  useInput((input, key) => {
    if (gameState === 'revealing') return;

    if (gameState !== 'playing') {
      if (key.return) restart();
      if (input === 'q' || input === 'Q') exit();
      return;
    }

    if (key.ctrl && input === 'c') { exit(); return; }

    if (key.backspace || key.delete) {
      setCurrentInput((prev) => prev.slice(0, -1));
      setMessage('');
      return;
    }

    if (key.return) {
      if (currentInput.length < WORD_LENGTH) {
        setMessage('Not enough letters!');
        triggerShake();
        return;
      }
      const word = currentInput.toLowerCase();
      if (!wordSet.has(word)) {
        setMessage('Not in word list!');
        triggerShake();
        return;
      }

      const evaluation = evaluateGuess(word, target);
      const newGuesses = [...guesses, word];
      const newEvals = [...evaluations, evaluation];

      const nextLetterStatuses = { ...letterStatuses };
      const priority: Record<TileStatus, number> = {
        correct: 3,
        present: 2,
        absent: 1,
      };
      word.split('').forEach((ch, i) => {
        const s = evaluation[i];
        if (
          !nextLetterStatuses[ch] ||
          priority[s] > priority[nextLetterStatuses[ch]]
        )
          nextLetterStatuses[ch] = s;
      });

      const nextState: GameState =
        word === target
          ? 'won'
          : newGuesses.length >= MAX_GUESSES
          ? 'lost'
          : 'playing';

      // Store pending result; start reveal animation
      pendingResult.current = {
        guesses: newGuesses,
        evals: newEvals,
        letterStatuses: nextLetterStatuses,
        nextState,
      };
      setCurrentInput('');
      setMessage('');
      // Add the guess to display immediately (without colors)
      setGuesses(newGuesses);
      setEvaluations([...evaluations, evaluation]); // evaluation stored but tiles hidden until revealed
      setGameState('revealing');
      setRevealRow(newGuesses.length - 1);
      resetReveal();
      return;
    }

    if (/^[a-zA-Z]$/.test(input) && currentInput.length < WORD_LENGTH) {
      setCurrentInput((prev) => prev + input.toLowerCase());
      setMessage('');
    }
  });

  function triggerShake() {
    resetShake();
    setShaking(true);
  }

  const activeRow =
    gameState === 'playing' || gameState === 'revealing' ? guesses.length : -1;
  const shakeOffset = shaking ? (shakeFrame % 2 === 0 ? -1 : 1) : 0;

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Text bold color="white">
        {' W O R D L E '}
      </Text>

      <Box marginTop={1} flexDirection="column">
        {Array(MAX_GUESSES)
          .fill(null)
          .map((_, i) => {
            const isRevealing = i === revealRow;
            const rowRevealProgress = isRevealing ? revealFrame : WORD_LENGTH * 2 + 1;

            const isWonRow =
              gameState === 'won' &&
              i === guesses.length - 1;

            return (
              <Row
                key={i}
                guess={guesses[i] ?? null}
                evaluation={evaluations[i] ?? null}
                isActive={i === activeRow && gameState === 'playing'}
                currentInput={i === activeRow ? currentInput : ''}
                shakeOffset={i === activeRow && gameState === 'playing' ? shakeOffset : 0}
                revealProgress={rowRevealProgress}
                winBounceFrame={isWonRow && bouncing ? bounceFrame : null}
                jumpFrame={jumpRow === i ? jumpFrame : -1}
              />
            );
          })}
      </Box>

      <Box height={1} marginTop={1}>
        {message ? (
          <Text color="red" bold>
            {message}
          </Text>
        ) : (
          <Text> </Text>
        )}
      </Box>

      {gameState === 'won' && (
        <Box flexDirection="column" alignItems="center">
          <Text color="green" bold>
            You got it in {guesses.length}!
          </Text>
          <Text color="gray">Enter to play again · Q to quit</Text>
        </Box>
      )}
      {gameState === 'lost' && (
        <Box flexDirection="column" alignItems="center">
          <Text color="red" bold>
            The word was: {target.toUpperCase()}
          </Text>
          <Text color="gray">Enter to play again · Q to quit</Text>
        </Box>
      )}

      <Keyboard letterStatuses={letterStatuses} />

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Type letters · Enter to guess · Backspace to delete · Ctrl+C to quit
        </Text>
      </Box>
    </Box>
  );
}

// ─── Loading / Root ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const { frame } = useAnimation({ interval: 80 });
  return (
    <Box paddingY={1} alignItems="center" flexDirection="column">
      <Text bold color="white">
        {' W O R D L E '}
      </Text>
      <Box marginTop={1} gap={1}>
        <Text color="green">{SPINNER[frame % SPINNER.length]}</Text>
        <Text color="gray">Fetching word list…</Text>
      </Box>
    </Box>
  );
}

export default function App() {
  const [words, setWords] = useState<string[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch(WORDLE_LIST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const list = text
          .trim()
          .split('\n')
          .map((w) => w.trim().toLowerCase())
          .filter((w) => w.length === WORD_LENGTH);
        setWords(list);
      })
      .catch((err: Error) => {
        setLoadError(
          `Failed to fetch word list (${err.message}), using built-in list.`
        );
        setWords(FALLBACK_WORDS);
      });
  }, []);

  if (!words) return <LoadingSpinner />;

  return (
    <Box flexDirection="column">
      {loadError && (
        <Box justifyContent="center">
          <Text color="yellow">{loadError}</Text>
        </Box>
      )}
      <Game words={words} />
    </Box>
  );
}
