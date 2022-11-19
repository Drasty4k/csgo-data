import { BombPlantedPerSite, Data } from "../types";

export const getTotalBombPlantedPerSite = (parsedData: Data[]) => {
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

export const getTotalBombPlantedOnMatch = (parsedData: Data[]) => {
  return Object.values(getTotalBombPlantedPerSite(parsedData)).reduce(
    (partialSum, a) => partialSum + a,
    0
  );
};

export const getBombInfo = (parsedData: Data[]) => {
  const bombPlantedPerSite = getTotalBombPlantedPerSite(parsedData);
  const totalBombPlantedOfMatch = getTotalBombPlantedOnMatch(parsedData);

  return {
    bombPlantedPerSite,
    totalBombPlantedOfMatch,
  };
};
