import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import path from "path";

import { dataWithRoundsOnly, parseData } from "../../utils/data";
import { getRoundTimeStats } from "../../utils/roundTimeStats";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readFileSync(path.join(__dirname, "data.txt"))
    .toString()
    .split("\n");

  const parsedData = parseData(data);

  const datawithRounds = dataWithRoundsOnly(parsedData);

  const { rounds, averageRoundTime } = getRoundTimeStats(datawithRounds);

  console.log(averageRoundTime, rounds);

  res.status(200).json({ allData: datawithRounds, rounds, averageRoundTime });
}
