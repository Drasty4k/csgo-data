import { ArrowDownIcon } from "./icons";

type Props = {
  title: string;
  data: string;
  idToScroll?: string;
};

const Card: React.FC<Props> = ({ title, data, idToScroll }) => {
  return (
    <a href={`#${idToScroll}`}>
      <div className="group p-10 bg-gray-800 rounded-3xl text-center space-y-3 hover:bg-[#372f1f] transition hover:cursor-pointer">
        <h3 className="text-2xl text-orange-300 font-bold">{title}</h3>
        <p className="font-bold">{data}</p>
        <ArrowDownIcon
          strokeWidth={2.5}
          width={27}
          height={27}
          className="relative top-5 mx-auto group-hover:animate-bounce transition"
        />
      </div>
    </a>
  );
};

export default Card;
