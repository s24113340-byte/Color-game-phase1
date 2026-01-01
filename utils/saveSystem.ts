export type ChampionUpgrades = Record<string, {
  power: number;
  defense: number;
  speed: number;
  magic: number;
}>;

export type CampaignProgress = {
  highestLevelUnlocked: number;
  completedLevels: number[];
  upgradePoints: number;
  totalScore: number;
};

export type SaveData = {
  campaignProgress: CampaignProgress;
  championUpgrades: ChampionUpgrades;
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
  };
  lastSaved?: string;
  version?: string;
};

const SAVE_KEY = 'colorGameRoyale_save';

export function saveGame(saveData: SaveData): boolean {
  try {
    const dataToSave = {
      ...saveData,
      lastSaved: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save game:', error);
    return false;
  }
}

export function loadGame(): SaveData | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;
    const parsed = JSON.parse(savedData) as SaveData;
    return parsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load game:', error);
    return null;
  }
}

export function getDefaultSaveData(): SaveData {
  return {
    campaignProgress: {
      highestLevelUnlocked: 1,
      completedLevels: [],
      upgradePoints: 0,
      totalScore: 0,
    },
    championUpgrades: {
      ren: { power: 0, defense: 0, speed: 0, magic: 0 },
      rei: { power: 0, defense: 0, speed: 0, magic: 0 },
    },
    settings: {
      soundEnabled: true,
      musicEnabled: true,
    },
  };
}

export function updateCampaignProgress(currentSave: SaveData, levelCompleted: number, scoreEarned: number, championId?: string): SaveData {
  const newSave = { ...currentSave } as SaveData;
  if (levelCompleted >= newSave.campaignProgress.highestLevelUnlocked) {
    newSave.campaignProgress.highestLevelUnlocked = levelCompleted + 1;
  }
  if (!newSave.campaignProgress.completedLevels.includes(levelCompleted)) {
    newSave.campaignProgress.completedLevels.push(levelCompleted);
  }
  newSave.campaignProgress.upgradePoints += levelCompleted * 10;
  newSave.campaignProgress.totalScore += scoreEarned;
  return newSave;
}

export function applyUpgrade(currentSave: SaveData, championId: string, stat: 'power' | 'defense' | 'speed' | 'magic', cost: number): SaveData {
  const newSave = { ...currentSave } as SaveData;
  newSave.campaignProgress.upgradePoints -= cost;
  if (!newSave.championUpgrades[championId]) {
    newSave.championUpgrades[championId] = { power: 0, defense: 0, speed: 0, magic: 0 };
  }
  // @ts-ignore safe index
  newSave.championUpgrades[championId][stat] = (newSave.championUpgrades[championId][stat] || 0) + 1;
  return newSave;
}
