import { useState, useEffect } from 'react';
import { WORDS as FALLBACK_WORDS } from '../words.js';
import { WORD_LENGTH, WORDLE_LIST_URL } from '../constants.js';

interface WordListState {
  words: string[] | null;
  error: string | null;
}

export function useWordList(): WordListState {
  const [state, setState] = useState<WordListState>({ words: null, error: null });

  useEffect(() => {
    fetch(WORDLE_LIST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const words = text
          .trim()
          .split('\n')
          .map((w) => w.trim().toLowerCase())
          .filter((w) => w.length === WORD_LENGTH);
        setState({ words, error: null });
      })
      .catch((err: Error) => {
        setState({
          words: FALLBACK_WORDS,
          error: `Failed to fetch word list (${err.message}), using built-in list.`,
        });
      });
  }, []);

  return state;
}
