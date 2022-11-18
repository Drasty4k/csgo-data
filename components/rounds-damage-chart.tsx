import { DamagePerRound } from "../types";

type Props = {
  damagePerRound: DamagePerRound[];
};

const RoundsDamageChart: React.FC<Props> = ({ damagePerRound }) => {
  return (
    <div className="bg-gray-800 rounded-3xl p-6 pb-8 text-center">
      <h2 className="text-center text-2xl text-orange-300 font-bold mb-6">
        Rounds Damage
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {damagePerRound?.map(
          ({ round, damagePerRound, totalDamagePerRound }, index: number) => (
            <div key={index} className="px-8">
              <p className="font-bold">Round {round}</p>
              <p className="my-4 bg-red-700 rounded-xl px-2 font-bold text-sm">
                Total Damage: {totalDamagePerRound}
              </p>
              <p>
                {Object.entries(damagePerRound)?.map((element, index) => (
                  <>
                    <span key={index}>
                      {element[0]}: <b>{element[1]}</b>
                    </span>
                    <br />
                  </>
                ))}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RoundsDamageChart;
