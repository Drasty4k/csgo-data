import { dataObject } from "../types";

export const getTotalKillsOfMatch = (parsedData: dataObject[]) => {
  let totalKills = 0;

  let killCounter = 0;
  parsedData.map(({ info }) => {
    const foundAttack = info.toLowerCase().includes('killed "');

    if (foundAttack) {
      totalKills = killCounter++;
    }
  });

  return totalKills;
};
