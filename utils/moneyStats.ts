import { dataObject } from "../types";

export const getTotalMoneySpentOfMatch = (parsedData: dataObject[]) => {
  let totalMoneySpent = 0;

  parsedData.map(({ info }) => {
    const foundAttack = info.toLowerCase().includes("money change");

    const moneySpent = Number(info.split("-")[1]?.split("=")[0].trim());
    if (foundAttack && moneySpent) {
      totalMoneySpent += moneySpent;
    }
  });

  return totalMoneySpent;
};
