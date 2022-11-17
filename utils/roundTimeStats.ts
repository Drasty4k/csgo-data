import { dataObject, rounds, roundTime } from "../types";
import { dayOfMatch } from "./data";

export const getRoundTimeStats = (parsedData: dataObject[]) => {
  const rounds: rounds[] = [];
  let roundTime: roundTime = {
    start: "",
    end: "",
  };
  let totalRoundTime = 0;

  let roundCounter = 1;
  parsedData.map(({ timestamp, info }) => {
    const hasRoundStart = info.toLowerCase().includes("round_start");
    if (hasRoundStart) {
      roundTime.start = timestamp;
      return;
    }

    const hasRoundEnd = info.toLowerCase().includes("round_end");
    if (hasRoundEnd) {
      roundTime.end = timestamp;

      let startTime = new Date(`${dayOfMatch} ${roundTime.start}`).getTime();
      let endTime = new Date(`${dayOfMatch} ${roundTime.end}`).getTime();

      const lastedTime = endTime - startTime;

      totalRoundTime += lastedTime;

      rounds.push({ round: roundCounter++, lasted: lastedTime });
    }
  });

  const averageRoundTime = totalRoundTime / rounds.length + 1;

  return {
    rounds,
    averageRoundTime,
  };
};
