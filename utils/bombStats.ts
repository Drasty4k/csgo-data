import { dataObject } from "../types";

export const getTotalBombPlanted = (parsedData: dataObject[]) => {
  let totalBombPlanted = 0;

  let bombCounter = 1;
  parsedData.map(({ info }) => {
    const bombPlanted = info.toLowerCase().includes("planted_the_bomb");
    if (bombPlanted) {
      totalBombPlanted = bombCounter++;
    }
  });

  return totalBombPlanted;
};
