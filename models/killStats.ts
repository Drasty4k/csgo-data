import { Data, KillsPerRound } from "../types";
import { findStartAndEndRoundsIndex } from "./data";

const getKillsPerRound = (parsedData: Data[]) => {
  const killsInfo: KillsPerRound[] = [];

  const roundsIndex = findStartAndEndRoundsIndex(parsedData);
  roundsIndex.map(({ round, index: { start, end } }) => {
    const killsPerRound: { [key: string]: number } = {};
    let totalKillsPerRound = 0;
    for (let i = start; i < end; i++) {
      const { info } = parsedData[i];
      const foundAttack = info.toLowerCase().includes('killed "');

      if (foundAttack) {
        totalKillsPerRound++;
        const playerName = info.split('"')[1].split("<")[0].trim();
        if (killsPerRound[playerName]) {
          killsPerRound[playerName]++;
        } else {
          killsPerRound[playerName] = 1;
        }
      }
    }
    killsInfo.push({ round, killsPerRound, totalKillsPerRound });
  });

  return killsInfo;
};

const getTotalKillsOfMatch = (parsedData: Data[]) => {
  return getKillsPerRound(parsedData).reduce(
    (partialSum, a) => partialSum + a.totalKillsPerRound,
    0
  );
};

export const getKillsInfo = (parsedData: Data[]) => {
  const killsPerRound = getKillsPerRound(parsedData);
  const totalKillsOfMatch = getTotalKillsOfMatch(parsedData);

  return {
    killsPerRound,
    totalKillsOfMatch,
  };
};
