import { dataObject } from "../types";

export const getTotalDamageOfMatch = (parsedData: dataObject[]) => {
    
  let totalDamage: number = 0;

  parsedData.map(({ info }) => {
    const foundAttack = info.toLowerCase().includes("attacked");

    if (foundAttack) {
      const damage = Number(info.split("(damage ")[1].split('"')[1]);
      totalDamage += damage;
    }
  });

  return totalDamage;
};
