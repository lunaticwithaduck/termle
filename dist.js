// index.ts
import React2 from "react";
import { render } from "ink";

// src/App.tsx
import { Box as Box7, Text as Text6 } from "ink";

// src/hooks/useWordList.ts
import { useState, useEffect } from "react";

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

// src/constants.ts
var WORD_LENGTH = 5;
var MAX_GUESSES = 6;
var WORDLE_LIST_URL = "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";
var KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "\u232B"]
];
var BOUNCE_FRAMES = [
  "\u2584",
  "\u2585",
  "\u2586",
  "\u2587",
  "\u2588",
  "\u2587",
  "\u2586",
  "\u2585",
  "\u2584"
];
var SPINNER_FRAMES = [
  "\u280B",
  "\u2819",
  "\u2839",
  "\u2838",
  "\u283C",
  "\u2834",
  "\u2826",
  "\u2827",
  "\u2807",
  "\u280F"
];
var STATUS_PRIORITY = {
  correct: 3,
  present: 2,
  absent: 1
};
var SHAKE_DURATION = 6;
var JUMP_TOTAL = 7;
var REVEAL_TOTAL = WORD_LENGTH * 2 + 1;

// src/hooks/useWordList.ts
function useWordList() {
  const [state, setState] = useState({ words: null, error: null });
  useEffect(() => {
    fetch(WORDLE_LIST_URL).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    }).then((text) => {
      const words = text.trim().split("\n").map((w) => w.trim().toLowerCase()).filter((w) => w.length === WORD_LENGTH);
      setState({ words, error: null });
    }).catch((err) => {
      setState({
        words: WORDS,
        error: `Failed to fetch word list (${err.message}), using built-in list.`
      });
    });
  }, []);
  return state;
}

// src/components/LoadingSpinner.tsx
import { Box, Text, useAnimation } from "ink";
import { jsx, jsxs } from "react/jsx-runtime";
function LoadingSpinner() {
  const { frame } = useAnimation({ interval: 80 });
  return /* @__PURE__ */ jsxs(Box, { paddingY: 1, alignItems: "center", flexDirection: "column", children: [
    /* @__PURE__ */ jsx(Text, { bold: true, color: "white", children: " T E R M L E " }),
    /* @__PURE__ */ jsxs(Box, { marginTop: 1, gap: 1, children: [
      /* @__PURE__ */ jsx(Text, { color: "green", children: SPINNER_FRAMES[frame % SPINNER_FRAMES.length] }),
      /* @__PURE__ */ jsx(Text, { color: "gray", children: "Fetching word list\u2026" })
    ] })
  ] });
}

// src/Game.tsx
import { useState as useState5 } from "react";
import { Box as Box6, Text as Text5, useInput, useApp, useAnimation as useAnimation5 } from "ink";

// src/utils.ts
function pickRandom(words) {
  return words[Math.floor(Math.random() * words.length)];
}
function evaluateGuess(guess, target) {
  const result = Array(WORD_LENGTH).fill("absent");
  const targetChars = target.split("");
  const guessChars = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guessChars[i] === targetChars[j]) {
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
function mergeLetterStatuses(current, word, evaluation) {
  const next = { ...current };
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    const incoming = evaluation[i];
    const existing = next[ch];
    if (existing === void 0 || STATUS_PRIORITY[incoming] > STATUS_PRIORITY[existing]) {
      next[ch] = incoming;
    }
  }
  return next;
}

// src/hooks/useShake.ts
import { useState as useState2, useEffect as useEffect2 } from "react";
import { useAnimation as useAnimation2 } from "ink";
function useShake() {
  const [shaking, setShaking] = useState2(false);
  const { frame, reset } = useAnimation2({ interval: 60, isActive: shaking });
  useEffect2(() => {
    if (shaking && frame >= SHAKE_DURATION) {
      setShaking(false);
    }
  }, [frame, shaking]);
  function trigger() {
    reset();
    setShaking(true);
  }
  const offset = shaking ? frame % 2 === 0 ? -1 : 1 : 0;
  return { offset, trigger };
}

// src/hooks/useReveal.ts
import { useState as useState3, useRef, useEffect as useEffect3 } from "react";
import { useAnimation as useAnimation3 } from "ink";
function useReveal(onComplete) {
  const [revealRow, setRevealRow] = useState3(null);
  const pendingRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const { frame, reset } = useAnimation3({
    interval: 150,
    isActive: revealRow !== null
  });
  useEffect3(() => {
    if (revealRow === null || pendingRef.current === null) return;
    if (frame >= REVEAL_TOTAL) {
      const pending = pendingRef.current;
      pendingRef.current = null;
      setRevealRow(null);
      onCompleteRef.current(pending);
    }
  }, [frame, revealRow]);
  function startReveal(rowIndex, pending) {
    pendingRef.current = pending;
    setRevealRow(rowIndex);
    reset();
  }
  function revealProgressForRow(rowIndex) {
    return rowIndex === revealRow ? frame : REVEAL_TOTAL;
  }
  return { revealProgressForRow, startReveal };
}

// src/hooks/useJump.ts
import { useState as useState4, useEffect as useEffect4 } from "react";
import { useAnimation as useAnimation4 } from "ink";
function useJump() {
  const [jumpRow, setJumpRow] = useState4(null);
  const { frame, reset } = useAnimation4({ interval: 80, isActive: jumpRow !== null });
  useEffect4(() => {
    if (jumpRow !== null && frame >= JUMP_TOTAL) {
      setJumpRow(null);
    }
  }, [frame, jumpRow]);
  function startJump(rowIndex) {
    reset();
    setJumpRow(rowIndex);
  }
  function jumpFrameForRow(rowIndex) {
    return rowIndex === jumpRow ? frame : -1;
  }
  return { jumpFrameForRow, startJump };
}

// src/components/Row.tsx
import { Box as Box3 } from "ink";

// src/components/Tile.tsx
import { Box as Box2, Text as Text2 } from "ink";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Tile({
  letter,
  status,
  revealPhase = 2,
  bounceFrame,
  jumpedUp = false
}) {
  const showColor = revealPhase === 2 && status !== null;
  const accent = showColor ? tileAccentColor(status) : void 0;
  const borderColor = accent ?? (letter.trim() ? "white" : "gray");
  const displayLetter = revealPhase === 1 ? " " : letter.toUpperCase() || " ";
  const finalLetter = bounceFrame !== void 0 ? BOUNCE_FRAMES[bounceFrame % BOUNCE_FRAMES.length] : displayLetter;
  return /* @__PURE__ */ jsx2(
    Box2,
    {
      borderStyle: "single",
      borderColor,
      width: 5,
      height: 3,
      alignItems: jumpedUp ? "flex-start" : "center",
      justifyContent: "center",
      marginRight: 1,
      children: /* @__PURE__ */ jsxs2(Text2, { bold: showColor, color: accent ?? "white", children: [
        " ",
        finalLetter,
        " "
      ] })
    }
  );
}

// src/components/Row.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(Box3, { marginLeft: shakeOffset, marginBottom: 0, children: letters.map((letter, i) => {
    let revealPhase = 2;
    if (evaluation !== null && revealProgress <= WORD_LENGTH * 2) {
      const tileReveal = revealProgress - i * 2;
      if (tileReveal <= 0) revealPhase = 0;
      else if (tileReveal === 1) revealPhase = 1;
      else revealPhase = 2;
    }
    const bounceFrame = winBounceFrame !== null ? winBounceFrame + i * 2 : void 0;
    const relFrame = jumpFrame - i;
    const jumpedUp = evaluation?.[i] === "correct" && relFrame >= 0 && relFrame < 2;
    return /* @__PURE__ */ jsx3(
      Tile,
      {
        letter,
        status: evaluation?.[i] ?? null,
        revealPhase,
        bounceFrame,
        jumpedUp
      },
      i
    );
  }) });
}

// src/components/Keyboard.tsx
import { Box as Box4, Text as Text3 } from "ink";
import { jsx as jsx4 } from "react/jsx-runtime";
function KeyboardKey({ letter, status }) {
  const accent = status ? tileAccentColor(status) : void 0;
  return /* @__PURE__ */ jsx4(Box4, { marginRight: 1, children: /* @__PURE__ */ jsx4(
    Text3,
    {
      color: accent ?? "white",
      bold: !!accent,
      dimColor: status === "absent",
      children: letter
    }
  ) });
}
function Keyboard({ letterStatuses }) {
  return /* @__PURE__ */ jsx4(Box4, { flexDirection: "column", marginTop: 1, children: KEYBOARD_ROWS.map((row, i) => /* @__PURE__ */ jsx4(Box4, { justifyContent: "center", children: row.map((key) => /* @__PURE__ */ jsx4(
    KeyboardKey,
    {
      letter: key,
      status: letterStatuses[key.toLowerCase()]
    },
    key
  )) }, i)) });
}

// src/components/StatusMessage.tsx
import { Box as Box5, Text as Text4 } from "ink";
import { Fragment, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function StatusMessage({
  message,
  gameState,
  guessCount,
  target
}) {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx5(Box5, { height: 1, marginTop: 1, children: message ? /* @__PURE__ */ jsx5(Text4, { color: "red", bold: true, children: message }) : /* @__PURE__ */ jsx5(Text4, { children: " " }) }),
    gameState === "won" && /* @__PURE__ */ jsxs3(Box5, { flexDirection: "column", alignItems: "center", children: [
      /* @__PURE__ */ jsxs3(Text4, { color: "green", bold: true, children: [
        "You got it in ",
        guessCount,
        "!"
      ] }),
      /* @__PURE__ */ jsx5(Text4, { color: "gray", children: "Enter to play again \xB7 Q to quit" })
    ] }),
    gameState === "lost" && /* @__PURE__ */ jsxs3(Box5, { flexDirection: "column", alignItems: "center", children: [
      /* @__PURE__ */ jsxs3(Text4, { color: "red", bold: true, children: [
        "The word was: ",
        target.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx5(Text4, { color: "gray", children: "Enter to play again \xB7 Q to quit" })
    ] })
  ] });
}

// src/Game.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function Game({ words }) {
  const { exit } = useApp();
  const [wordSet] = useState5(() => new Set(words));
  const [target, setTarget] = useState5(() => pickRandom(words));
  const [guesses, setGuesses] = useState5([]);
  const [evaluations, setEvaluations] = useState5([]);
  const [currentInput, setCurrentInput] = useState5("");
  const [gameState, setGameState] = useState5("playing");
  const [message, setMessage] = useState5("");
  const [letterStatuses, setLetterStatuses] = useState5({});
  const [bouncing, setBouncing] = useState5(false);
  const { frame: bounceFrame } = useAnimation5({ interval: 80, isActive: bouncing });
  const { offset: shakeOffset, trigger: triggerShake } = useShake();
  const { jumpFrameForRow, startJump } = useJump();
  const { revealProgressForRow, startReveal } = useReveal(
    (pending) => {
      const finishedRow = pending.guesses.length - 1;
      const hasCorrect = pending.evaluations[finishedRow].some((s) => s === "correct");
      setGuesses([...pending.guesses]);
      setEvaluations(pending.evaluations.map((e) => [...e]));
      setLetterStatuses(pending.letterStatuses);
      setGameState(pending.nextState);
      if (pending.nextState === "won") {
        setBouncing(true);
      } else if (hasCorrect) {
        startJump(finishedRow);
      }
    }
  );
  function restart() {
    setTarget(pickRandom(words));
    setGuesses([]);
    setEvaluations([]);
    setCurrentInput("");
    setGameState("playing");
    setMessage("");
    setLetterStatuses({});
    setBouncing(false);
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
      const newLetterStatuses = mergeLetterStatuses(letterStatuses, word, evaluation);
      const nextState = word === target ? "won" : newGuesses.length >= MAX_GUESSES ? "lost" : "playing";
      setGuesses(newGuesses);
      setEvaluations(newEvals);
      setCurrentInput("");
      setMessage("");
      setGameState("revealing");
      startReveal(newGuesses.length - 1, {
        guesses: newGuesses,
        evaluations: newEvals,
        letterStatuses: newLetterStatuses,
        nextState
      });
      return;
    }
    if (/^[a-zA-Z]$/.test(input) && currentInput.length < WORD_LENGTH) {
      setCurrentInput((prev) => prev + input.toLowerCase());
      setMessage("");
    }
  });
  const activeRow = gameState === "playing" || gameState === "revealing" ? guesses.length : -1;
  return /* @__PURE__ */ jsxs4(Box6, { flexDirection: "column", alignItems: "center", paddingY: 1, children: [
    /* @__PURE__ */ jsx6(Text5, { bold: true, color: "white", children: " T E R M L E " }),
    /* @__PURE__ */ jsx6(Box6, { marginTop: 1, flexDirection: "column", children: Array(MAX_GUESSES).fill(null).map((_, i) => {
      const isWonRow = gameState === "won" && i === guesses.length - 1;
      return /* @__PURE__ */ jsx6(
        Row,
        {
          guess: guesses[i] ?? null,
          evaluation: evaluations[i] ?? null,
          isActive: i === activeRow && gameState === "playing",
          currentInput: i === activeRow ? currentInput : "",
          shakeOffset: i === activeRow && gameState === "playing" ? shakeOffset : 0,
          revealProgress: revealProgressForRow(i),
          winBounceFrame: isWonRow && bouncing ? bounceFrame : null,
          jumpFrame: jumpFrameForRow(i)
        },
        i
      );
    }) }),
    /* @__PURE__ */ jsx6(
      StatusMessage,
      {
        message,
        gameState,
        guessCount: guesses.length,
        target
      }
    ),
    /* @__PURE__ */ jsx6(Keyboard, { letterStatuses }),
    /* @__PURE__ */ jsx6(Box6, { marginTop: 1, children: /* @__PURE__ */ jsx6(Text5, { color: "gray", dimColor: true, children: "Type letters \xB7 Enter to guess \xB7 Backspace to delete \xB7 Ctrl+C to quit" }) })
  ] });
}

// src/App.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function App() {
  const { words, error } = useWordList();
  if (words === null) return /* @__PURE__ */ jsx7(LoadingSpinner, {});
  return /* @__PURE__ */ jsxs5(Box7, { flexDirection: "column", children: [
    error !== null && /* @__PURE__ */ jsx7(Box7, { justifyContent: "center", children: /* @__PURE__ */ jsx7(Text6, { color: "yellow", children: error }) }),
    /* @__PURE__ */ jsx7(Game, { words })
  ] });
}

// index.ts
render(React2.createElement(App));
