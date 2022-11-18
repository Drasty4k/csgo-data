import { useEffect, useState } from "react";
import Card from "../components/card";
import RoundsChart from "../components/rounds-chart";
import {
  rounds,
  infoMatch,
  dataObject,
  KillsInfo,
  BombPlantedPerSite,
  DamageDonePerRound,
} from "../types";

export default function Home() {
  const [CSdata, setCSData] = useState<dataObject[]>([]);
  const [rounds, setRounds] = useState<rounds[]>([]);
  const [averageRoundTime, setAverageRoundTime] = useState<string>("");
  const [infoMatch, setInfoMatch] = useState<infoMatch>();
  const [totalDamageOfMatch, setTotalDamageOfMatch] = useState<number>();
  const [totalKillsOfMatch, setTotalKillsOfMatch] = useState<number>();
  const [totalBombPlantedOfMatch, setTotalBombPlantedOfMatch] =
    useState<number>();
  const [totalBombPlantedOnSites, setTotalBombPlantedOnSites] =
    useState<BombPlantedPerSite>();
  const [totalMoneySpentOfMatch, setTotalMoneySpentOfMatch] =
    useState<number>();
  const [killsInfoPerRound, setKillsInfoPerRound] = useState<KillsInfo[]>();
  const [damageDonePerRound, setDamageDonePerRound] =
    useState<DamageDonePerRound[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/parsed-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      setCSData(newData.allData);
      setRounds(newData.rounds);
      setAverageRoundTime(newData.averageRoundTime);
      setInfoMatch(newData.infoMatch);
      setTotalDamageOfMatch(newData.totalDamageOfMatch);
      setDamageDonePerRound(newData.damageDonePerRound);
      setTotalKillsOfMatch(newData.totalKillsOfMatch);
      setTotalBombPlantedOfMatch(newData.totalBombPlantedOfMatch);
      setTotalBombPlantedOnSites(newData.totalBombPlantedOnSites);
      setTotalMoneySpentOfMatch(newData.totalMoneySpentOfMatch);
      setKillsInfoPerRound(newData.killsInfoPerRound);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-600 text-white">
      <div className="container mx-auto py-5 space-y-6">
        <div className="text-center">
          <h1 className="text-[1.7rem] font-bold">{infoMatch?.teams}</h1>
          <h3 className="text-l font-semibold">{infoMatch?.dayOfMatch}</h3>
        </div>
        <div className="flex justify-between">
          <Card
            title="Average Round Time"
            data={millisToMinutesAndSeconds(averageRoundTime)}
          />
          <Card title="Total Kills" data={String(totalKillsOfMatch)} />
          <Card
            title="Total bomb planted"
            data={String(totalBombPlantedOfMatch)}
          />
          <Card
            title="Total Money Spent"
            data={`${String(totalMoneySpentOfMatch)} $`}
          />
          <Card title="Total Damage Done" data={String(totalDamageOfMatch)} />
        </div>
        <RoundsChart rounds={rounds} />
        <div>
          {killsInfoPerRound?.map(
            ({ round, killsPerRound, totalKillsPerRound }, index: number) => (
              <div key={index}>
                <p>{round}</p>
                <p>
                  {Object.entries(killsPerRound)?.map((element, index) => (
                    <>
                      <span key={index}>
                        {element[0]}: {element[1]}
                      </span>
                      <br />
                    </>
                  ))}
                </p>
                <p>{totalKillsPerRound}</p>
              </div>
            )
          )}
        </div>
        <div>
          <h2>Bomb Planted Per Site</h2>
          {totalBombPlantedOnSites &&
            Object.entries(totalBombPlantedOnSites!).map((element, index) => (
              <p key={index}>
                {element[0]}: {element[1]}
              </p>
            ))}
        </div>
        <div>
          {damageDonePerRound?.map(
            ({ round, damagePerRound, totalDamagePerRound }, index: number) => (
              <div key={index}>
                <p>{round}</p>
                <p>
                  {Object.entries(damagePerRound)?.map((element, index) => (
                    <>
                      <span key={index}>
                        {element[0]}: {element[1]}
                      </span>
                      <br />
                    </>
                  ))}
                </p>
                <p>{totalDamagePerRound}</p>
              </div>
            )
          )}
        </div>
        {CSdata.length > 0 &&
          CSdata.map((element, index) => (
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
