import { BombPlantedPerSite, dataObject } from "../types";

export const getTotalBombPlantedOnSites = (parsedData: dataObject[]) => {
  const plantsPerSite: BombPlantedPerSite = { A: 0, B: 0 };

  parsedData.map(({ info }) => {
    const bombPlanted = info.toLowerCase().includes("planted_the_bomb");

    if (bombPlanted) {
      const site = info.split("bombsite")[1].trim() as "A" | "B";

      if (site === "A") {
        plantsPerSite.A++;
      } else {
        plantsPerSite.B++;
      }
    }
  });

  return plantsPerSite;
};

export const getTotalBombPlantedOnMatch = (parsedData: dataObject[]) => {
  return Object.values(getTotalBombPlantedOnSites(parsedData)).reduce(
    (partialSum, a) => partialSum + a,
    0
  );
};
