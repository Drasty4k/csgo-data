import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import path from "path";

import {
  dataWithRoundsOnly,
  dayOfMatch,
  findStartAndEndRoundsIndex,
  getTeams,
  parseData,
} from "../../utils/data";
import { getRoundTimeStats } from "../../utils/roundTimeStats";
import { getTotalDamageOfMatch } from "../../utils/damageStats";
import { getKillsInfo, getTotalKillsOfMatch } from "../../utils/killStats";
import { getTotalBombPlantedOnMatch, getTotalBombPlantedOnSites } from "../../utils/bombStats";
import { getTotalMoneySpentOfMatch } from "../../utils/moneyStats";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readFileSync(path.join(__dirname, "data.txt"))
    .toString()
    .split("\n");

  const parsedData = parseData(data);

  const datawithRounds = dataWithRoundsOnly(parsedData);

  const { rounds, averageRoundTime } = getRoundTimeStats(datawithRounds);

  const teams = getTeams(datawithRounds);

  const infoMatch = {
    teams,
    dayOfMatch,
  };

  const totalDamageOfMatch = getTotalDamageOfMatch(datawithRounds);

  const totalKillsOfMatch = getTotalKillsOfMatch(datawithRounds);
  const killsInfoPerRound = getKillsInfo(datawithRounds)

  const totalBombPlantedOfMatch = getTotalBombPlantedOnMatch(datawithRounds);
  const totalBombPlantedOnSites = getTotalBombPlantedOnSites(datawithRounds)

  const totalMoneySpentOfMatch = getTotalMoneySpentOfMatch(datawithRounds)

  console.log(getTotalBombPlantedOnSites(datawithRounds))

  res.status(200).json({
    allData: datawithRounds,
    rounds,
    averageRoundTime,
    infoMatch,
    totalDamageOfMatch,
    totalKillsOfMatch,
    totalBombPlantedOfMatch,
    totalBombPlantedOnSites,
    totalMoneySpentOfMatch,
    killsInfoPerRound
  });
}
