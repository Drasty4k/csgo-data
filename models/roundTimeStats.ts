import { Data, TimePerRound, roundTime } from "../types";
import { dayOfMatch } from "./data";

export const getRoundTimeStats = (parsedData: Data[]) => {
  const timePerRound: TimePerRound[] = [];
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

      timePerRound.push({ round: roundCounter++, lasted: lastedTime });
    }
  });

  const averageRoundTime = totalRoundTime / timePerRound.length + 1;

  return {
    timePerRound,
    averageRoundTime,
  };
};
