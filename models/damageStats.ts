import { DamagePerRound, Data } from "../types";
import { findStartAndEndRoundsIndex } from "./data";

const getDamageDonePerRound = (parsedData: Data[]) => {
  const damageDonePerRound: DamagePerRound[] = [];

  const roundsIndex = findStartAndEndRoundsIndex(parsedData);
  roundsIndex.map(({ round, index: { start, end } }) => {
    const damagePerRound: { [key: string]: number } = {};
    let totalDamagePerRound = 0;

    for (let i = start; i < end; i++) {
      const { info } = parsedData[i];
      const foundAttack = info.toLowerCase().includes("attacked");

      if (foundAttack) {
        const damage = Number(info.split("(damage ")[1].split('"')[1]);
        totalDamagePerRound += damage;
        const playerName = info.split('"')[1].split("<")[0].trim();
        if (damagePerRound[playerName]) {
          damagePerRound[playerName] += damage;
        } else {
          damagePerRound[playerName] = damage;
        }
      }
    }
    damageDonePerRound.push({ round, damagePerRound, totalDamagePerRound });
  });

  return damageDonePerRound;
};

const getTotalDamageOfMatch = (parsedData: Data[]) => {
  return getDamageDonePerRound(parsedData).reduce(
    (partialSum, a) => partialSum + a.totalDamagePerRound,
    0
  );
};

export const getDamageInfo = (parsedData: Data[]) => {
  const damagePerRound = getDamageDonePerRound(parsedData);
  const totalDamageOfMatch = getTotalDamageOfMatch(parsedData);

  return {
    damagePerRound,
    totalDamageOfMatch,
  };
};
