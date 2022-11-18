import { DamageDonePerRound, dataObject } from "../types";
import { findStartAndEndRoundsIndex } from "./data";

export const getDamageDonePerRound = (parsedData: dataObject[]) => {
  const damageDonePerRound: DamageDonePerRound[] = [];

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

export const getTotalDamageOfMatch = (parsedData: dataObject[]) => {
  return getDamageDonePerRound(parsedData).reduce(
    (partialSum, a) => partialSum + a.totalDamagePerRound,
    0
  );
};
