import { Data } from "../types";

// import { findStartAndEndRoundsIndex } from "./data";

// export const getMoneySpentOnEachRound = (parsedData: dataObject[]) => {
//   const moneySpentPerRound: MoneySpent[] = [];

//   const roundsIndex = findStartAndEndRoundsIndex(parsedData);
//   roundsIndex.map(({ round, index: { start, end } }) => {
//     const spentPerRound: { CT: number; TERRORIST: number } = {
//       CT: 0,
//       TERRORIST: 0,
//     };
//     let totalSpentPerRound = 0;
//     for (let i = start; i < end; i++) {
//       const { info } = parsedData[i];
//       const moneyChanged = info.toLowerCase().includes("money change");
//       const isCT = info.toLowerCase().includes("<ct>");
//       const moneySpent = Number(info.split("-")[1]?.split("=")[0].trim());
//       if (moneyChanged && moneySpent) {
//         totalSpentPerRound += moneySpent;

//         if (moneyChanged && isCT) {
//           spentPerRound.CT += moneySpent;
//         } else {
//           spentPerRound.TERRORIST += moneySpent;
//         }
//       }
//     }
//     moneySpentPerRound.push({ round, spentPerRound, totalSpentPerRound });
//   });

//   return moneySpentPerRound;
// };

const getTotalMoneySpentOfMatch = (parsedData: Data[]) => {
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

export const getMoneyInfo = (parsedData: Data[]) => {
  const totalMoneySpentOfMatch = getTotalMoneySpentOfMatch(parsedData);

  return  {
    totalMoneySpentOfMatch
  }
}
