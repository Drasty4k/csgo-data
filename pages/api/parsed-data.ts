import type { NextApiRequest, NextApiResponse } from "next";

import { dataWithRoundsOnly, getMatchInfo } from "../../models/data";
import { getRoundTimeStats } from "../../models/roundTimeStats";
import { getDamageInfo } from "../../models/damageStats";
import { getKillsInfo } from "../../models/killStats";
import { getBombInfo } from "../../models/bombStats";
import { getMoneyInfo } from "../../models/moneyStats";
import { ResponseData } from "../../types";

const fetchData = async () => {
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
  const data = await fetchData();

  const parsedData = dataWithRoundsOnly(data);

  const matchInfo = getMatchInfo(parsedData);
  const timeInfo = getRoundTimeStats(parsedData);
  const damageInfo = getDamageInfo(parsedData);
  const killsInfo = getKillsInfo(parsedData);
  const bombInfo = getBombInfo(parsedData);
  const moneyInfo = getMoneyInfo(parsedData);

  res.status(200).json({
    matchInfo,
    timeInfo,
    damageInfo,
    killsInfo,
    bombInfo,
    moneyInfo,
  });
}
