import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import path from "path";

import {
  dataWithRoundsOnly,
  dayOfMatch,
  getTeams,
  parseData,
} from "../../utils/data";
import { getRoundTimeStats } from "../../utils/roundTimeStats";
import {
  getDamageDonePerRound,
  getTotalDamageOfMatch,
} from "../../utils/damageStats";
import { getKillsInfo, getTotalKillsOfMatch } from "../../utils/killStats";
import {
  getTotalBombPlantedOnMatch,
  getTotalBombPlantedPerSite,
} from "../../utils/bombStats";
import { getTotalMoneySpentOfMatch } from "../../utils/moneyStats";
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

  const timeInfo = getRoundTimeStats(parsedData);

  const teams = getTeams(parsedData);

  const matchInfo = {
    teams,
    dayOfMatch,
  };

  const damagePerRound = getDamageDonePerRound(parsedData);
  const totalDamageOfMatch = getTotalDamageOfMatch(parsedData);
  const damageInfo = {
    damagePerRound,
    totalDamageOfMatch,
  };

  const killsPerRound = getKillsInfo(parsedData);
  const totalKillsOfMatch = getTotalKillsOfMatch(parsedData);
  const killsInfo = {
    killsPerRound,
    totalKillsOfMatch,
  };

  const bombPlantedPerSite = getTotalBombPlantedPerSite(parsedData);
  const totalBombPlantedOfMatch = getTotalBombPlantedOnMatch(parsedData);
  const bombInfo = {
    bombPlantedPerSite,
    totalBombPlantedOfMatch,
  };

  const totalMoneySpentOfMatch = getTotalMoneySpentOfMatch(parsedData);

  res.status(200).json({
    allData: parsedData,
    timeInfo,
    matchInfo,
    damageInfo,
    killsInfo,
    bombInfo,
    totalMoneySpentOfMatch,
  });
}
