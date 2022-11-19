import type { NextApiRequest, NextApiResponse } from "next";

import { dataWithRoundsOnly, dayOfMatch, getTeams } from "../../models/data";
import { getRoundTimeStats } from "../../models/roundTimeStats";
import {
  getDamageDonePerRound,
  getDamageInfo,
  getTotalDamageOfMatch,
} from "../../models/damageStats";
import { getKillsInfo, getTotalKillsOfMatch } from "../../models/killStats";
import {
  getBombInfo,
  getTotalBombPlantedOnMatch,
  getTotalBombPlantedPerSite,
} from "../../models/bombStats";
import { getTotalMoneySpentOfMatch } from "../../models/moneyStats";
import { ResponseData } from "../../types";

const getData = async () => {
  const response = await fetch(
    "https://blast-recruiting.s3.eu-central-1.amazonaws.com/NAVIvsVitaGF-Nuke.txt"
  );

  const data = await response.text();

  return data.toString().split("\n");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await getData();

  const parsedData = dataWithRoundsOnly(data);

  const teams = getTeams(parsedData);

  const matchInfo = {
    teams,
    dayOfMatch,
  };

  const timeInfo = getRoundTimeStats(parsedData);

  const damageInfo = getDamageInfo(parsedData);

  const killsInfo = getKillsInfo(parsedData);

  const bombInfo = getBombInfo(parsedData);

  const totalMoneySpentOfMatch = getTotalMoneySpentOfMatch(parsedData);

  res.status(200).json({
    matchInfo,
    timeInfo,
    damageInfo,
    killsInfo,
    bombInfo,
    totalMoneySpentOfMatch,
  });
}
