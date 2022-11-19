import useSWR from "swr";
import Card from "../components/card";
import Loader from "../components/loader";
import RoundsTimeChart from "../components/rounds-time-chart";
import RoundsDamageChart from "../components/rounds-damage-chart";
import RoundsKillsChart from "../components/rounds-kills-chart";
import SitesBombChart from "../components/sites-bomb-chart";
import { ResponseData } from "../types";
import ScrollArrow from "../components/scroll-arrow";
import Error from "../components/error";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR<ResponseData>("/api/parsed-data", fetcher);

  if (error) {
    return <Error />;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-600 text-white">
      <div className="container mx-auto py-5 space-y-6">
        <div className="text-center">
          <h1 className="text-[1.7rem] font-bold">{data.matchInfo.teams}</h1>
          <h3 className="text-l font-semibold">{data.matchInfo.dayOfMatch}</h3>
        </div>
        <div className="space-x-10 lg:space-x-0 lg:flex justify-between flex-wrap">
          <Card
            title="Average Round Time"
            idToScroll="RoundsTime"
            data={millisToMinutesAndSeconds(
              String(data.timeInfo.averageRoundTime)
            )}
          />
          <Card
            title="Total Kills"
            idToScroll="RoundsKills"
            data={String(data.killsInfo.totalKillsOfMatch)}
          />
          <Card
            title="Total bomb planted"
            idToScroll="SitesBomb"
            data={String(data.bombInfo.totalBombPlantedOfMatch)}
          />
          <Card
            title="Total Damage Done"
            idToScroll="RoundsDamage"
            data={String(data.damageInfo.totalDamageOfMatch)}
          />
          <Card
            title="Total Money Spent"
            data={`~${String(data.moneyInfo.totalMoneySpentOfMatch)} $`}
          />
        </div>
        <RoundsTimeChart
          id="RoundsTime"
          timePerRound={data.timeInfo.timePerRound}
        />
        <RoundsKillsChart
          id="RoundsKills"
          killsPerRound={data.killsInfo.killsPerRound}
        />
        <SitesBombChart
          id="SitesBomb"
          bombsPlanted={data.bombInfo.bombPlantedPerSite}
        />
        <RoundsDamageChart
          id="RoundsDamage"
          damagePerRound={data.damageInfo.damagePerRound}
        />
      </div>
      <ScrollArrow />
    </div>
  );
}

export function millisToMinutesAndSeconds(millis: string) {
  const minutes = Math.floor(Number(millis) / 60000);
  const seconds = ((Number(millis) % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
