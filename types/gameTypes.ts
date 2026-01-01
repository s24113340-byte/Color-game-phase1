export type Color = {
  id: string;
  name: string;
  hex: string;
  faction: string;
  emoji?: string;
};

export type Champion = {
  id: string;
  name: string;
  title?: string;
  class?: string;
  description?: string;
  faction?: string;
  stats: {
    power: number;
    defense: number;
    speed: number;
    magic: number;
    [key: string]: number;
  };
  abilities?: string[];
  colors?: {
    primary: string;
    secondary?: string;
    glow?: string;
  };
  sprite?: string;
  upgrades?: Record<string, number>;
};

export type GameState = {
  phase: string;
  gameMode: string | null;
  champion: Champion | null;
  selectedLevel: number | null;
  score: number;
  coins: number;
  hasInsertedCoin: boolean;
  timer: number;
  bonusTime: number;
  streak: number;
  bets: Record<string, number>;
  droppedBalls: any[];
  isDropping: boolean;
  canSkipResults: boolean;
  resultsTimer: ReturnType<typeof setTimeout> | null;
  shadowMeter: number;
  elementalBalance: Record<string, number>;
  umbraActive: boolean;
  umbraAbility: string | null;
  umbraRageMode: boolean;
  umbraFinalBoss: boolean;
  poisonedSquares: string[];
  frozen: boolean;
  round: number;
  maxRounds: number;
  factionBuffActive: string | null;
  payoutMultiplier: number;
  ending: string | null;
  isPaused: boolean;
  musicOn: boolean;
  soundOn: boolean;
};
