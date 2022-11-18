import { KillsPerRound } from "../types";

type Props = {
  killsPerRound: KillsPerRound[];
};

const RoundsKillsChart: React.FC<Props> = ({ killsPerRound }) => {
  return (
    <div className="bg-gray-800 rounded-3xl p-6 pb-8 text-center">
      <h2 className="text-center text-2xl text-orange-300 font-bold mb-6">
        Rounds Kills
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {killsPerRound?.map(
          ({ round, killsPerRound, totalKillsPerRound }, index: number) => (
            <div key={index} className="max-h-[250px] px-8">
              <p className="mb-4 font-bold">Round {round}</p>
              <p className="my-4 bg-red-700 rounded-xl px-2 font-bold text-sm">
                Total kills: {totalKillsPerRound}
              </p>
              <p>
                {Object.entries(killsPerRound)?.map((element, index) => (
                  <p key={index}>
                    {element[0]}: <b>{element[1]}</b>
                  </p>
                ))}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RoundsKillsChart;
