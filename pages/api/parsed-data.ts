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
import { getTotalKillsOfMatch } from "../../utils/killStats";
import { getTotalBombPlanted } from "../../utils/bombStats";
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

  const totalBombPlanted = getTotalBombPlanted(datawithRounds);

  const totalMoneySpentOfMatch = getTotalMoneySpentOfMatch(datawithRounds)

  console.log(findStartAndEndRoundsIndex(datawithRounds))

  res.status(200).json({
    allData: datawithRounds,
    rounds,
    averageRoundTime,
    infoMatch,
    totalDamageOfMatch,
    totalKillsOfMatch,
    totalBombPlanted,
    totalMoneySpentOfMatch
  });
}
