import { useEffect, useState } from "react";
import Card from "../components/card";
import RoundsChart from "../components/rounds-chart";
import { rounds } from "../types";

type dataObject = {
  timestamp: string;
  info: string;
};

export default function Home() {
  const [CSdata, setCSData] = useState<dataObject[]>([]);
  const [rounds, setRounds] = useState<rounds[]>([]);
  const [averageRoundTime, setAverageRoundTime] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/parsed-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      console.log(newData.allData);
      setCSData(newData.allData);
      setRounds(newData.rounds);
      setAverageRoundTime(newData.averageRoundTime);
    };
    fetchData();
    console.log("CSDATA", CSdata);
  }, []);

  return (
    <div className="bg-gray-600 text-white">
      <div className="container mx-auto py-5 space-y-6">
        <div className="text-center">
          <h1 className="text-[1.7rem] font-bold">
            NAVI GGBET vs TeamVitality
          </h1>
          <h3 className="text-l font-semibold">11/28/2021</h3>
        </div>
        <div className="flex justify-between">
          <Card
            title="Average Round Time"
            data={millisToMinutesAndSeconds(averageRoundTime)}
          />
          <Card title="Average Round Time" data={averageRoundTime} />
          <Card title="Average Round Time" data={averageRoundTime} />
          <Card title="Average Round Time" data={averageRoundTime} />
        </div>
        <RoundsChart rounds={rounds} />
        {CSdata.length > 0 &&
          CSdata.map((element, index) => <p key={index}>{element.info}</p>)}
      </div>
    </div>
  );
}

export function millisToMinutesAndSeconds(millis: string) {
  const minutes = Math.floor(Number(millis) / 60000);
  const seconds = ((Number(millis) % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
