// index.ts
import React2 from "react";
import { render } from "ink";

// src/App.tsx
import { useState, useEffect, useRef } from "react";
import { Box, Text, useInput, useApp, useAnimation } from "ink";

// src/words.ts
var WORDS = [
  "about",
  "above",
  "abuse",
  "actor",
  "acute",
  "admit",
  "adopt",
  "adult",
  "after",
  "again",
  "agent",
  "agree",
  "ahead",
  "alarm",
  "album",
  "alert",
  "alike",
  "alive",
  "alley",
  "allow",
  "alone",
  "along",
  "alter",
  "angel",
  "anger",
  "angle",
  "angry",
  "anime",
  "ankle",
  "annex",
  "anvil",
  "apart",
  "apple",
  "apply",
  "arena",
  "argue",
  "arise",
  "armor",
  "array",
  "arrow",
  "aside",
  "asked",
  "asset",
  "atlas",
  "attic",
  "audio",
  "audit",
  "avoid",
  "awake",
  "award",
  "aware",
  "awful",
  "badly",
  "baker",
  "basic",
  "basis",
  "beach",
  "began",
  "begin",
  "being",
  "below",
  "bench",
  "birth",
  "black",
  "blade",
  "blame",
  "bland",
  "blank",
  "blast",
  "blaze",
  "bleed",
  "blend",
  "bless",
  "blind",
  "block",
  "blood",
  "bloom",
  "blown",
  "blues",
  "blunt",
  "blurt",
  "board",
  "bonus",
  "boost",
  "bound",
  "brain",
  "brand",
  "brave",
  "bread",
  "break",
  "breed",
  "brief",
  "bring",
  "broad",
  "broke",
  "brook",
  "brown",
  "brush",
  "build",
  "built",
  "burst",
  "buyer",
  "cabin",
  "cache",
  "camel",
  "candy",
  "cargo",
  "carry",
  "catch",
  "cause",
  "caves",
  "cease",
  "chain",
  "chair",
  "chalk",
  "chaos",
  "charm",
  "chase",
  "cheap",
  "check",
  "cheek",
  "chess",
  "chest",
  "chief",
  "child",
  "china",
  "choke",
  "chord",
  "chunk",
  "civic",
  "civil",
  "claim",
  "clash",
  "class",
  "clean",
  "clear",
  "click",
  "cliff",
  "cling",
  "clock",
  "clone",
  "close",
  "cloud",
  "coach",
  "coast",
  "cobra",
  "comet",
  "comic",
  "coral",
  "count",
  "court",
  "cover",
  "crack",
  "craft",
  "crane",
  "crash",
  "crazy",
  "cream",
  "creek",
  "crime",
  "cross",
  "crowd",
  "crown",
  "cruel",
  "crush",
  "curve",
  "cycle",
  "daily",
  "dance",
  "datum",
  "dealt",
  "death",
  "debut",
  "delta",
  "dense",
  "depot",
  "depth",
  "derby",
  "devil",
  "digit",
  "dirty",
  "disco",
  "donor",
  "doubt",
  "dough",
  "draft",
  "drain",
  "drama",
  "drawn",
  "dream",
  "dress",
  "drift",
  "drink",
  "drive",
  "drone",
  "drove",
  "drums",
  "dryer",
  "dwarf",
  "early",
  "earth",
  "eight",
  "elite",
  "ember",
  "empty",
  "enemy",
  "enjoy",
  "enter",
  "entry",
  "equal",
  "error",
  "essay",
  "event",
  "every",
  "exact",
  "exist",
  "extra",
  "fable",
  "faith",
  "false",
  "fancy",
  "fatal",
  "fault",
  "feast",
  "fence",
  "ferry",
  "fetch",
  "fever",
  "fiber",
  "field",
  "fifth",
  "fifty",
  "fight",
  "final",
  "first",
  "fixed",
  "fjord",
  "flame",
  "flash",
  "fleet",
  "flesh",
  "float",
  "floor",
  "flour",
  "fluid",
  "flute",
  "focus",
  "force",
  "forge",
  "forth",
  "forum",
  "found",
  "frame",
  "fresh",
  "front",
  "frost",
  "fruit",
  "funny",
  "gauge",
  "giant",
  "given",
  "glade",
  "gland",
  "glare",
  "glass",
  "globe",
  "gloom",
  "glory",
  "gloss",
  "glove",
  "going",
  "grace",
  "grade",
  "grain",
  "grand",
  "grant",
  "graph",
  "grasp",
  "grass",
  "grave",
  "graze",
  "great",
  "greed",
  "green",
  "greet",
  "grief",
  "grind",
  "groan",
  "gross",
  "group",
  "grove",
  "grown",
  "guard",
  "guess",
  "guest",
  "guide",
  "guild",
  "guilt",
  "guise",
  "gusto",
  "happy",
  "harsh",
  "haven",
  "heart",
  "heavy",
  "hence",
  "herbs",
  "hinge",
  "hippo",
  "hired",
  "holly",
  "honey",
  "horse",
  "hotel",
  "house",
  "human",
  "hurry",
  "hyena",
  "ideal",
  "image",
  "imply",
  "inbox",
  "index",
  "indie",
  "infer",
  "inner",
  "input",
  "inter",
  "irony",
  "issue",
  "ivory",
  "jaunt",
  "jewel",
  "joker",
  "joust",
  "judge",
  "juice",
  "juicy",
  "jumbo",
  "juror",
  "karma",
  "kebab",
  "keeps",
  "knife",
  "knock",
  "knoll",
  "known",
  "label",
  "lance",
  "large",
  "laser",
  "later",
  "laugh",
  "layer",
  "learn",
  "lease",
  "least",
  "leave",
  "legal",
  "lemon",
  "level",
  "light",
  "lilac",
  "limit",
  "linen",
  "liner",
  "liver",
  "llama",
  "local",
  "lodge",
  "logic",
  "loose",
  "lotus",
  "lover",
  "lower",
  "loyal",
  "lucky",
  "lunar",
  "lusty",
  "magic",
  "major",
  "maker",
  "manor",
  "maple",
  "match",
  "mayor",
  "media",
  "mercy",
  "metal",
  "might",
  "minor",
  "minus",
  "model",
  "money",
  "month",
  "moral",
  "morse",
  "mossy",
  "motor",
  "mount",
  "mouse",
  "mouth",
  "movie",
  "mulch",
  "music",
  "naive",
  "naval",
  "nerve",
  "never",
  "night",
  "ninja",
  "noble",
  "noise",
  "north",
  "noted",
  "novel",
  "nurse",
  "nymph",
  "oasis",
  "ocean",
  "offer",
  "often",
  "onion",
  "onset",
  "opera",
  "order",
  "other",
  "outer",
  "oxide",
  "ozone",
  "paint",
  "panel",
  "panic",
  "paper",
  "party",
  "pasta",
  "patch",
  "pause",
  "peace",
  "pearl",
  "pedal",
  "penny",
  "perch",
  "phase",
  "phone",
  "photo",
  "piano",
  "pilot",
  "pixel",
  "pizza",
  "place",
  "plain",
  "plane",
  "plant",
  "plate",
  "plaza",
  "plead",
  "pluck",
  "plumb",
  "plume",
  "point",
  "polar",
  "poppy",
  "porch",
  "power",
  "press",
  "price",
  "pride",
  "prime",
  "print",
  "prior",
  "prize",
  "probe",
  "prone",
  "proof",
  "prose",
  "proud",
  "prowl",
  "proxy",
  "pulse",
  "punch",
  "purse",
  "queen",
  "query",
  "quest",
  "queue",
  "quick",
  "quiet",
  "quota",
  "quote",
  "radar",
  "radio",
  "rainy",
  "raise",
  "rally",
  "ranch",
  "range",
  "rapid",
  "ratio",
  "reach",
  "ready",
  "realm",
  "rebel",
  "refer",
  "reign",
  "relax",
  "relay",
  "remix",
  "repay",
  "reply",
  "rider",
  "ridge",
  "right",
  "rigid",
  "risky",
  "rival",
  "river",
  "robin",
  "robot",
  "rocky",
  "rouge",
  "rough",
  "round",
  "royal",
  "rugby",
  "ruler",
  "rural",
  "sadly",
  "saint",
  "salad",
  "sauce",
  "scale",
  "scare",
  "scene",
  "scope",
  "score",
  "scout",
  "screw",
  "seize",
  "sense",
  "seven",
  "shade",
  "shake",
  "shall",
  "shame",
  "shape",
  "share",
  "shark",
  "sharp",
  "sheen",
  "sheep",
  "sheer",
  "sheet",
  "shelf",
  "shell",
  "shift",
  "shine",
  "shirt",
  "shock",
  "shore",
  "short",
  "shout",
  "sight",
  "sigma",
  "silly",
  "since",
  "sixth",
  "sixty",
  "skate",
  "skill",
  "skull",
  "slash",
  "slate",
  "slave",
  "sleek",
  "sleep",
  "sleet",
  "slice",
  "slide",
  "slope",
  "sloth",
  "smart",
  "smell",
  "smile",
  "smoke",
  "snake",
  "solar",
  "solve",
  "sonic",
  "sorry",
  "sound",
  "south",
  "space",
  "spare",
  "spark",
  "speak",
  "spear",
  "speck",
  "speed",
  "spend",
  "spice",
  "spike",
  "spine",
  "spoil",
  "spoon",
  "sport",
  "spray",
  "squad",
  "stack",
  "staff",
  "stage",
  "stain",
  "stake",
  "stale",
  "stall",
  "stamp",
  "stand",
  "stark",
  "start",
  "state",
  "stave",
  "steal",
  "steam",
  "steel",
  "steep",
  "steer",
  "stern",
  "stick",
  "stiff",
  "still",
  "stock",
  "stomp",
  "stone",
  "stood",
  "store",
  "storm",
  "story",
  "stove",
  "strap",
  "straw",
  "stray",
  "strip",
  "strut",
  "stuck",
  "study",
  "stuff",
  "stunt",
  "style",
  "sugar",
  "suite",
  "sunny",
  "super",
  "surge",
  "swamp",
  "swarm",
  "swear",
  "sweep",
  "sweet",
  "swept",
  "swift",
  "swirl",
  "swoop",
  "sword",
  "swore",
  "table",
  "taken",
  "taste",
  "teach",
  "teams",
  "teeth",
  "thank",
  "theme",
  "there",
  "thick",
  "thing",
  "think",
  "third",
  "thorn",
  "those",
  "three",
  "threw",
  "throw",
  "thumb",
  "tiger",
  "tight",
  "timer",
  "tired",
  "title",
  "today",
  "token",
  "topic",
  "total",
  "touch",
  "tough",
  "towel",
  "tower",
  "toxic",
  "track",
  "trade",
  "trail",
  "train",
  "trait",
  "trash",
  "treat",
  "trend",
  "trial",
  "tribe",
  "trick",
  "tried",
  "troop",
  "trove",
  "truck",
  "truly",
  "trunk",
  "trust",
  "truth",
  "tulip",
  "tumor",
  "tuner",
  "tummy",
  "tuple",
  "turbo",
  "twirl",
  "twist",
  "tying",
  "ulcer",
  "ultra",
  "uncle",
  "under",
  "unify",
  "union",
  "unity",
  "until",
  "upper",
  "upset",
  "urban",
  "usage",
  "usual",
  "utter",
  "valid",
  "value",
  "valve",
  "vapor",
  "vault",
  "video",
  "vigor",
  "viral",
  "virus",
  "visor",
  "visit",
  "vista",
  "vital",
  "vivid",
  "vixen",
  "voice",
  "voila",
  "voter",
  "vroom",
  "wager",
  "waste",
  "watch",
  "water",
  "weary",
  "wedge",
  "weigh",
  "weird",
  "whale",
  "whack",
  "wheat",
  "wheel",
  "where",
  "which",
  "while",
  "white",
  "whole",
  "whose",
  "wider",
  "windy",
  "witch",
  "witty",
  "woman",
  "world",
  "worry",
  "worse",
  "worst",
  "worth",
  "wrath",
  "wrist",
  "wrong",
  "yacht",
  "yearn",
  "yield",
  "young",
  "youth",
  "zebra"
];

// src/App.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var WORD_LENGTH = 5;
var MAX_GUESSES = 6;
var WORDLE_LIST_URL = "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
var KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "\u232B"]
];
var BOUNCE_FRAMES = ["\u2584", "\u2585", "\u2586", "\u2587", "\u2588", "\u2587", "\u2586", "\u2585", "\u2584"];
function pickRandom(words) {
  return words[Math.floor(Math.random() * words.length)];
}
function evaluateGuess(guess, target) {
  const result = Array(WORD_LENGTH).fill("absent");
  const targetArr = target.split("");
  const guessArr = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessArr[i] === targetArr[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }
  return result;
}
function tileAccentColor(status) {
  if (status === "correct") return "green";
  if (status === "present") return "yellow";
  if (status === "absent") return "gray";
  return void 0;
}
function Tile({ letter, status, revealPhase = 2, bounceFrame, jumpedUp = false }) {
  const showColor = revealPhase === 2 && status !== null;
  const accent = showColor ? tileAccentColor(status) : void 0;
  const borderColor = accent ?? (letter.trim() ? "white" : "gray");
  const displayLetter = revealPhase === 1 ? " " : letter.toUpperCase() || " ";
  const finalLetter = bounceFrame !== void 0 ? BOUNCE_FRAMES[bounceFrame % BOUNCE_FRAMES.length] : displayLetter;
  return /* @__PURE__ */ jsx(
    Box,
    {
      borderStyle: "single",
      borderColor,
      width: 5,
      height: 3,
      alignItems: jumpedUp ? "flex-start" : "center",
      justifyContent: "center",
      marginRight: 1,
      children: /* @__PURE__ */ jsxs(Text, { bold: showColor, color: accent ?? "white", children: [
        " ",
        finalLetter,
        " "
      ] })
    }
  );
}
function Row({
  guess,
  evaluation,
  isActive,
  currentInput,
  shakeOffset,
  revealProgress,
  winBounceFrame,
  jumpFrame
}) {
  const letters = isActive ? currentInput.padEnd(WORD_LENGTH, " ").split("") : guess ? guess.split("") : Array(WORD_LENGTH).fill(" ");
  return /* @__PURE__ */ jsx(Box, { marginLeft: shakeOffset, marginBottom: 0, children: letters.map((letter, i) => {
    let revealPhase = 2;
    if (evaluation && revealProgress <= WORD_LENGTH * 2) {
      const tileReveal = revealProgress - i * 2;
      if (tileReveal <= 0) revealPhase = 0;
      else if (tileReveal === 1) revealPhase = 1;
      else revealPhase = 2;
    }
    const bounceFrame = winBounceFrame !== null ? winBounceFrame + i * 2 : void 0;
    const relFrame = jumpFrame - i;
    const jumpedUp = evaluation?.[i] === "correct" && relFrame >= 0 && relFrame < 2;
    return /* @__PURE__ */ jsx(
      Tile,
      {
        letter,
        status: evaluation ? evaluation[i] : null,
        revealPhase,
        bounceFrame,
        jumpedUp
      },
      i
    );
  }) });
}
function KeyboardKey({
  letter,
  status
}) {
  const accent = status ? tileAccentColor(status) : void 0;
  return /* @__PURE__ */ jsx(Box, { marginRight: 1, children: /* @__PURE__ */ jsx(Text, { color: accent ?? "white", bold: !!accent, dimColor: status === "absent", children: letter }) });
}
function Keyboard({ letterStatuses }) {
  return /* @__PURE__ */ jsx(Box, { flexDirection: "column", marginTop: 1, children: KEYBOARD_ROWS.map((row, i) => /* @__PURE__ */ jsx(Box, { justifyContent: "center", children: row.map((key) => /* @__PURE__ */ jsx(
    KeyboardKey,
    {
      letter: key,
      status: letterStatuses[key.toLowerCase()]
    },
    key
  )) }, i)) });
}
var SHAKE_DURATION = 6;
function Game({ words }) {
  const { exit } = useApp();
  const [wordSet] = useState(() => new Set(words));
  const [target, setTarget] = useState(() => pickRandom(words));
  const [guesses, setGuesses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [message, setMessage] = useState("");
  const [letterStatuses, setLetterStatuses] = useState({});
  const [shaking, setShaking] = useState(false);
  const shakeFramesLeft = useRef(0);
  const { frame: shakeFrame, reset: resetShake } = useAnimation({
    interval: 60,
    isActive: shaking
  });
  const [revealRow, setRevealRow] = useState(null);
  const pendingResult = useRef(null);
  const { frame: revealFrame, reset: resetReveal } = useAnimation({
    interval: 150,
    isActive: revealRow !== null
  });
  const [bouncing, setBouncing] = useState(false);
  const { frame: bounceFrame } = useAnimation({
    interval: 80,
    isActive: bouncing
  });
  const [jumpRow, setJumpRow] = useState(null);
  const { frame: jumpFrame, reset: resetJump } = useAnimation({
    interval: 80,
    isActive: jumpRow !== null
  });
  const JUMP_TOTAL = WORD_LENGTH + 2;
  useEffect(() => {
    if (!shaking) return;
    shakeFramesLeft.current = SHAKE_DURATION;
  }, [shaking]);
  useEffect(() => {
    if (!shaking) return;
    shakeFramesLeft.current -= 1;
    if (shakeFramesLeft.current <= 0) setShaking(false);
  }, [shakeFrame]);
  const revealTotal = WORD_LENGTH * 2 + 1;
  useEffect(() => {
    if (revealRow === null || !pendingResult.current) return;
    if (revealFrame >= revealTotal) {
      const { guesses: g, evals: e, letterStatuses: ls, nextState } = pendingResult.current;
      const finishedRowIndex = g.length - 1;
      const hasCorrect = e[finishedRowIndex].some((s) => s === "correct");
      pendingResult.current = null;
      setGuesses(g);
      setEvaluations(e);
      setLetterStatuses(ls);
      setRevealRow(null);
      setGameState(nextState);
      if (nextState === "won") {
        setBouncing(true);
      } else if (hasCorrect) {
        setJumpRow(finishedRowIndex);
        resetJump();
      }
    }
  }, [revealFrame, revealRow]);
  useEffect(() => {
    if (jumpRow === null) return;
    if (jumpFrame >= JUMP_TOTAL) setJumpRow(null);
  }, [jumpFrame, jumpRow, JUMP_TOTAL]);
  function restart() {
    setTarget(pickRandom(words));
    setGuesses([]);
    setEvaluations([]);
    setCurrentInput("");
    setGameState("playing");
    setMessage("");
    setLetterStatuses({});
    setBouncing(false);
    pendingResult.current = null;
    setRevealRow(null);
    setJumpRow(null);
  }
  useInput((input, key) => {
    if (gameState === "revealing") return;
    if (gameState !== "playing") {
      if (key.return) restart();
      if (input === "q" || input === "Q") exit();
      return;
    }
    if (key.ctrl && input === "c") {
      exit();
      return;
    }
    if (key.backspace || key.delete) {
      setCurrentInput((prev) => prev.slice(0, -1));
      setMessage("");
      return;
    }
    if (key.return) {
      if (currentInput.length < WORD_LENGTH) {
        setMessage("Not enough letters!");
        triggerShake();
        return;
      }
      const word = currentInput.toLowerCase();
      if (!wordSet.has(word)) {
        setMessage("Not in word list!");
        triggerShake();
        return;
      }
      const evaluation = evaluateGuess(word, target);
      const newGuesses = [...guesses, word];
      const newEvals = [...evaluations, evaluation];
      const nextLetterStatuses = { ...letterStatuses };
      const priority = {
        correct: 3,
        present: 2,
        absent: 1
      };
      word.split("").forEach((ch, i) => {
        const s = evaluation[i];
        if (!nextLetterStatuses[ch] || priority[s] > priority[nextLetterStatuses[ch]])
          nextLetterStatuses[ch] = s;
      });
      const nextState = word === target ? "won" : newGuesses.length >= MAX_GUESSES ? "lost" : "playing";
      pendingResult.current = {
        guesses: newGuesses,
        evals: newEvals,
        letterStatuses: nextLetterStatuses,
        nextState
      };
      setCurrentInput("");
      setMessage("");
      setGuesses(newGuesses);
      setEvaluations([...evaluations, evaluation]);
      setGameState("revealing");
      setRevealRow(newGuesses.length - 1);
      resetReveal();
      return;
    }
    if (/^[a-zA-Z]$/.test(input) && currentInput.length < WORD_LENGTH) {
      setCurrentInput((prev) => prev + input.toLowerCase());
      setMessage("");
    }
  });
  function triggerShake() {
    resetShake();
    setShaking(true);
  }
  const activeRow = gameState === "playing" || gameState === "revealing" ? guesses.length : -1;
  const shakeOffset = shaking ? shakeFrame % 2 === 0 ? -1 : 1 : 0;
  return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", alignItems: "center", paddingY: 1, children: [
    /* @__PURE__ */ jsx(Text, { bold: true, color: "white", children: " W O R D L E " }),
    /* @__PURE__ */ jsx(Box, { marginTop: 1, flexDirection: "column", children: Array(MAX_GUESSES).fill(null).map((_, i) => {
      const isRevealing = i === revealRow;
      const rowRevealProgress = isRevealing ? revealFrame : WORD_LENGTH * 2 + 1;
      const isWonRow = gameState === "won" && i === guesses.length - 1;
      return /* @__PURE__ */ jsx(
        Row,
        {
          guess: guesses[i] ?? null,
          evaluation: evaluations[i] ?? null,
          isActive: i === activeRow && gameState === "playing",
          currentInput: i === activeRow ? currentInput : "",
          shakeOffset: i === activeRow && gameState === "playing" ? shakeOffset : 0,
          revealProgress: rowRevealProgress,
          winBounceFrame: isWonRow && bouncing ? bounceFrame : null,
          jumpFrame: jumpRow === i ? jumpFrame : -1
        },
        i
      );
    }) }),
    /* @__PURE__ */ jsx(Box, { height: 1, marginTop: 1, children: message ? /* @__PURE__ */ jsx(Text, { color: "red", bold: true, children: message }) : /* @__PURE__ */ jsx(Text, { children: " " }) }),
    gameState === "won" && /* @__PURE__ */ jsxs(Box, { flexDirection: "column", alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Text, { color: "green", bold: true, children: [
        "You got it in ",
        guesses.length,
        "!"
      ] }),
      /* @__PURE__ */ jsx(Text, { color: "gray", children: "Enter to play again \xB7 Q to quit" })
    ] }),
    gameState === "lost" && /* @__PURE__ */ jsxs(Box, { flexDirection: "column", alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Text, { color: "red", bold: true, children: [
        "The word was: ",
        target.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx(Text, { color: "gray", children: "Enter to play again \xB7 Q to quit" })
    ] }),
    /* @__PURE__ */ jsx(Keyboard, { letterStatuses }),
    /* @__PURE__ */ jsx(Box, { marginTop: 1, children: /* @__PURE__ */ jsx(Text, { color: "gray", dimColor: true, children: "Type letters \xB7 Enter to guess \xB7 Backspace to delete \xB7 Ctrl+C to quit" }) })
  ] });
}
function LoadingSpinner() {
  const SPINNER = ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  const { frame } = useAnimation({ interval: 80 });
  return /* @__PURE__ */ jsxs(Box, { paddingY: 1, alignItems: "center", flexDirection: "column", children: [
    /* @__PURE__ */ jsx(Text, { bold: true, color: "white", children: " W O R D L E " }),
    /* @__PURE__ */ jsxs(Box, { marginTop: 1, gap: 1, children: [
      /* @__PURE__ */ jsx(Text, { color: "green", children: SPINNER[frame % SPINNER.length] }),
      /* @__PURE__ */ jsx(Text, { color: "gray", children: "Fetching word list\u2026" })
    ] })
  ] });
}
function App() {
  const [words, setWords] = useState(null);
  const [loadError, setLoadError] = useState(null);
  useEffect(() => {
    fetch(WORDLE_LIST_URL).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    }).then((text) => {
      const list = text.trim().split("\n").map((w) => w.trim().toLowerCase()).filter((w) => w.length === WORD_LENGTH);
      setWords(list);
    }).catch((err) => {
      setLoadError(
        `Failed to fetch word list (${err.message}), using built-in list.`
      );
      setWords(WORDS);
    });
  }, []);
  if (!words) return /* @__PURE__ */ jsx(LoadingSpinner, {});
  return /* @__PURE__ */ jsxs(Box, { flexDirection: "column", children: [
    loadError && /* @__PURE__ */ jsx(Box, { justifyContent: "center", children: /* @__PURE__ */ jsx(Text, { color: "yellow", children: loadError }) }),
    /* @__PURE__ */ jsx(Game, { words })
  ] });
}

// index.ts
render(React2.createElement(App));
