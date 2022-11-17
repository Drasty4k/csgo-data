import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
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
    <div className={styles.container}>
      <p>{averageRoundTime}</p>
      {rounds.map((element, index) => (
        <div key={index}>
          <p>{element.round}</p>
          <p>{element.lasted}</p>
        </div>
      ))}
      {CSdata.length > 0 &&
        CSdata.map((element, index) => <p key={index}>{element.info}</p>)}
    </div>
  );
}
