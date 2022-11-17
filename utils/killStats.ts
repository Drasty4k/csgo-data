import { dataObject } from "../types";

export const getTotalKillsOfMatch = (parsedData: dataObject[]) => {
  let totalKills = 0;

  let killCounter = 1;
  parsedData.map(({ info }) => {
    const foundAttack = info.toLowerCase().includes('killed "');

    if (foundAttack) {
      totalKills = killCounter++;
    }
  });

  return totalKills;
};
