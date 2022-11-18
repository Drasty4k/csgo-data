import { BombPlantedPerSite } from "../types";

type Props = {
  bombsPlanted: BombPlantedPerSite;
};

const SitesBombChart: React.FC<Props> = ({ bombsPlanted }) => {
  return (
    <div className="bg-gray-800 rounded-3xl p-6 pb-8 text-center">
      <h2 className="text-center text-2xl text-orange-300 font-bold mb-6">
        Bomb Planted Per Site
      </h2>
      <div className="flex text-center mx-auto justify-center space-x-36">
        {bombsPlanted &&
          Object.entries(bombsPlanted!).map((element, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">{element[0]} Site</h2>
              <p className=" bg-red-700 rounded-xl px-2 font-bold text-sm">
                {element[1]} Bombs Planted
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SitesBombChart;
