import { millisToMinutesAndSeconds } from "../pages";
import { TimePerRound } from "../types";

type Props = {
  rounds: TimePerRound[];
};

const RoundsChart: React.FC<Props> = ({ rounds }) => {
  return (
    <div className=" bg-gray-800 rounded-3xl p-6 pb-8 ">
      <h2 className="text-center text-2xl text-orange-300 font-bold mb-6">
        Rounds Time
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {rounds.map(({ round, lasted }, index: number) => {
          const stringRound = String(round);
          const stringLasted = millisToMinutesAndSeconds(String(lasted));
          return (
            <div className="relative px-8 space-y-2" key={index}>
              <span
                className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-2/3 bg-[#f89e3f2d] rounded-t-[6px]"
                style={{
                  height: `${Number(stringLasted.split(":").join("")) / 4}px`,
                }}
              />
              <p className="z-20">Round {stringRound}</p>
              <p className="z-20">Lasted {stringLasted}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoundsChart;
