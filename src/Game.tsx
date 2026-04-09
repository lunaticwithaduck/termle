import React, { useState } from 'react';
import { Box, Text, useInput, useApp, useAnimation } from 'ink';
import { MAX_GUESSES, WORD_LENGTH } from './constants.js';
import { evaluateGuess, mergeLetterStatuses, pickRandom } from './utils.js';
import { useShake } from './hooks/useShake.js';
import { useReveal } from './hooks/useReveal.js';
import { useJump } from './hooks/useJump.js';
import { Row } from './components/Row.js';
import { Keyboard } from './components/Keyboard.js';
import { StatusMessage } from './components/StatusMessage.js';
import type { TileStatus, LetterStatuses, GameState, PendingReveal } from './types.js';

interface GameProps {
  readonly words: readonly string[];
}

export function Game({ words }: GameProps) {
  const { exit } = useApp();
  const [wordSet] = useState<ReadonlySet<string>>(() => new Set(words));
  const [target, setTarget] = useState(() => pickRandom(words));
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<TileStatus[][]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [message, setMessage] = useState('');
  const [letterStatuses, setLetterStatuses] = useState<LetterStatuses>({});

  const [bouncing, setBouncing] = useState(false);
  const { frame: bounceFrame } = useAnimation({ interval: 80, isActive: bouncing });

  const { offset: shakeOffset, trigger: triggerShake } = useShake();
  const { jumpFrameForRow, startJump } = useJump();
  const { revealProgressForRow, startReveal } = useReveal(
    (pending: PendingReveal) => {
      const finishedRow = pending.guesses.length - 1;
      const hasCorrect = pending.evaluations[finishedRow].some((s) => s === 'correct');
      setGuesses([...pending.guesses]);
      setEvaluations(pending.evaluations.map((e) => [...e]));
      setLetterStatuses(pending.letterStatuses);
      setGameState(pending.nextState);
      if (pending.nextState === 'won') {
        setBouncing(true);
      } else if (hasCorrect) {
        startJump(finishedRow);
      }
    },
  );

  function restart(): void {
    setTarget(pickRandom(words));
    setGuesses([]);
    setEvaluations([]);
    setCurrentInput('');
    setGameState('playing');
    setMessage('');
    setLetterStatuses({});
    setBouncing(false);
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
      const newLetterStatuses = mergeLetterStatuses(letterStatuses, word, evaluation);
      const nextState: GameState =
        word === target ? 'won' : newGuesses.length >= MAX_GUESSES ? 'lost' : 'playing';

      setGuesses(newGuesses);
      setEvaluations(newEvals);
      setCurrentInput('');
      setMessage('');
      setGameState('revealing');
      startReveal(newGuesses.length - 1, {
        guesses: newGuesses,
        evaluations: newEvals,
        letterStatuses: newLetterStatuses,
        nextState,
      });
      return;
    }

    if (/^[a-zA-Z]$/.test(input) && currentInput.length < WORD_LENGTH) {
      setCurrentInput((prev) => prev + input.toLowerCase());
      setMessage('');
    }
  });

  const activeRow =
    gameState === 'playing' || gameState === 'revealing' ? guesses.length : -1;

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Text bold color="white"> T E R M L E </Text>

      <Box marginTop={1} flexDirection="column">
        {Array(MAX_GUESSES).fill(null).map((_, i) => {
          const isWonRow = gameState === 'won' && i === guesses.length - 1;
          return (
            <Row
              key={i}
              guess={guesses[i] ?? null}
              evaluation={evaluations[i] ?? null}
              isActive={i === activeRow && gameState === 'playing'}
              currentInput={i === activeRow ? currentInput : ''}
              shakeOffset={i === activeRow && gameState === 'playing' ? shakeOffset : 0}
              revealProgress={revealProgressForRow(i)}
              winBounceFrame={isWonRow && bouncing ? bounceFrame : null}
              jumpFrame={jumpFrameForRow(i)}
            />
          );
        })}
      </Box>

      <StatusMessage
        message={message}
        gameState={gameState}
        guessCount={guesses.length}
        target={target}
      />

      <Keyboard letterStatuses={letterStatuses} />

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Type letters · Enter to guess · Backspace to delete · Ctrl+C to quit
        </Text>
      </Box>
    </Box>
  );
}
