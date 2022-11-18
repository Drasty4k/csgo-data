import useSWR from "swr";
import Card from "../components/card";
import Loader from "../components/loader";
import RoundsTimeChart from "../components/rounds-time-chart";
import RoundsDamageChart from "../components/rounds-damage-chart";
import RoundsKillsChart from "../components/rounds-kills-chart";
import SitesBombChart from "../components/sites-bomb-chart";
import { ResponseData } from "../types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data } = useSWR<ResponseData>("/api/parsed-data", fetcher);

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
        <div className="flex justify-between">
          <Card
            title="Average Round Time"
            data={millisToMinutesAndSeconds(
              String(data.timeInfo.averageRoundTime)
            )}
          />
          <Card
            title="Total Kills"
            data={String(data.killsInfo.totalKillsOfMatch)}
          />
          <Card
            title="Total bomb planted"
            data={String(data?.bombInfo.totalBombPlantedOfMatch)}
          />
          <Card
            title="Total Money Spent"
            data={`~${String(data?.totalMoneySpentOfMatch)} $`}
          />
          <Card
            title="Total Damage Done"
            data={String(data.damageInfo.totalDamageOfMatch)}
          />
        </div>
        <RoundsTimeChart timePerRound={data.timeInfo.timePerRound} />
        <RoundsKillsChart killsPerRound={data.killsInfo.killsPerRound} />
        <SitesBombChart bombsPlanted={data.bombInfo.bombPlantedPerSite} />
        <RoundsDamageChart damagePerRound={data.damageInfo.damagePerRound} />
        {data.allData!.length > 0 &&
          data.allData!.map((element, index) => (
            <p key={index}>
              {index} {element.info}
            </p>
          ))}
      </div>
    </div>
  );
}

export function millisToMinutesAndSeconds(millis: string) {
  const minutes = Math.floor(Number(millis) / 60000);
  const seconds = ((Number(millis) % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
