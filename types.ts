export type ResponseData = {
  allData?: Data[];
  timeInfo: TimeInfo;
  matchInfo: MatchInfo;
  damageInfo: DamageInfo;
  killsInfo: KillsInfo;
  bombInfo: BombInfo;
  totalMoneySpentOfMatch: number;
};

type TimeInfo = {
  timePerRound: TimePerRound[];
  averageRoundTime: number;
};

type MatchInfo = {
  teams: string;
  dayOfMatch: string;
};

type DamageInfo = {
  damagePerRound: DamagePerRound[];
  totalDamageOfMatch: number;
};

type KillsInfo = {
  killsPerRound: KillsPerRound[];
  totalKillsOfMatch: number;
};

type BombInfo = {
  bombPlantedPerSite: BombPlantedPerSite;
  totalBombPlantedOfMatch: number;
};

export type Data = {
  timestamp: string;
  info: string;
};

export type TimePerRound = {
  round: number;
  lasted: number;
};

export type roundTime = {
  start: string;
  end: string;
};

export type infoMatch = {
  teams: string;
  dayOfMatch: string;
};

export type roundsInfo = {
  round: number;
  index: {
    start: number;
    end: number;
  };
};

export type KillsPerRound = {
  round: number;
  killsPerRound: {
    [key: string]: number;
  };
  totalKillsPerRound: number;
};

export type BombPlantedPerSite = {
  A: number;
  B: number;
};

export type DamagePerRound = {
  round: number;
  damagePerRound: {
    [key: string]: number;
  };
  totalDamagePerRound: number;
};

// export type MoneySpent = {
//   round: number;
//   spentPerRound: {
//     CT: number;
//     TERRORIST: number;
//   };
//   totalSpentPerRound: number;
// };
