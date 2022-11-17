import { useEffect, useState } from "react";
import Card from "../components/card";
import RoundsChart from "../components/rounds-chart";
import { rounds, infoMatch, dataObject } from "../types";

export default function Home() {
  const [CSdata, setCSData] = useState<dataObject[]>([]);
  const [rounds, setRounds] = useState<rounds[]>([]);
  const [averageRoundTime, setAverageRoundTime] = useState<string>("");
  const [infoMatch, setInfoMatch] = useState<infoMatch>();
  const [totalDamageOfMatch, setTotalDamageOfMatch] = useState<number>();
  const [totalKillsOfMatch, setTotalKillsOfMatch] = useState<number>();

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
      setTotalKillsOfMatch(newData.totalKillsOfMatch);
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
          <Card title="Total bomb planted" data={"0"} />
          <Card title="Total Money Spent" data={"0"} />
          <Card title="Total Damage Done" data={String(totalDamageOfMatch)} />
        </div>
        <RoundsChart rounds={rounds} />
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
