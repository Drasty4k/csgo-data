import { Data, roundsInfo } from "../types";

export let dayOfMatch: string;

export const parseData = (data: string[]) => {
  const parsedData: Data[] = [];

  data.map((element) => {
    const [first, ...rest] = element.split(" - ")[1].split(": ");
    const timestamp = first.trim();
    const info = rest.join(": ").trim();
    parsedData.push({
      timestamp,
      info,
    });
  });

  dayOfMatch = data[0].split(" ")[0];
  return parsedData;
};

export const dataWithRoundsOnly = (data: string[]) => {
  const parsedData = parseData(data);
  return parsedData.slice(
    findMatchStartIndex(parsedData),
    findMatchEndIndex(parsedData) + 1
  );
};

export const findStartAndEndRoundsIndex = (parsedData: Data[]) => {
  const roundsInfo: roundsInfo[] = [];
  const indexRounds = {
    start: 0,
    end: 0,
  };

  let roundCounter = 1;
  parsedData.map(({ info }, index: number) => {
    const hasRoundStart = info.toLowerCase().includes("round_start");
    if (hasRoundStart) {
      indexRounds.start = index;
      return;
    }

    const hasRoundEnd = info.toLowerCase().includes("round_end");
    if (hasRoundEnd) {
      indexRounds.end = index;

      const { start, end } = indexRounds;

      roundsInfo.push({
        round: roundCounter++,
        index: { start, end },
      });
    }
  });

  return roundsInfo;
};

const findMatchEndIndex = (parsedData: Data[]) => {
  let index = parsedData.length - 1;

  for (index; index >= 0; index--) {
    const gameOver = parsedData[index].info.toLowerCase().includes("game over");
    if (gameOver) {
      break;
    }
  }

  return index;
};

const findMatchStartIndex = (parsedData: Data[]) => {
  let firstRoundIndex = 0;
  let endRoundIndex: number | null = null;

  parsedData.map(({ info }, index: number) => {
    if (endRoundIndex) return;
    const hasRoundStart = info.toLowerCase().includes("round_start");
    if (hasRoundStart) {
      firstRoundIndex = index;
      return;
    }

    const hasRoundEnd = info.toLowerCase().includes("round_end");
    if (hasRoundEnd) {
      endRoundIndex = index;
      return;
    }
  });

  return firstRoundIndex;
};

export const getTeams = (parsedData: Data[]) => {
  let firstTeam: string = "";
  let secondTeam: string = "";

  parsedData.map(({ info }) => {
    const CTTeamFound = info
      .toLowerCase()
      .includes('matchstatus: team playing "ct":');
    const CTTeam = info.split(": ").pop()!;
    if (CTTeamFound) {
      firstTeam = CTTeam;
      return;
    }

    const TERRORISTTeamFound = info
      .toLowerCase()
      .includes('matchstatus: team playing "terrorist":');
    const TERRORISTTeam = info.split(": ").pop()!;

    if (TERRORISTTeamFound) {
      secondTeam = TERRORISTTeam;
      return;
    }
  });

  return `${firstTeam} vs ${secondTeam}`;
};

export const getMatchInfo = (parsedData: Data[]) => {
  const teams = getTeams(parsedData);

  return {
    teams,
    dayOfMatch,
  };
};
