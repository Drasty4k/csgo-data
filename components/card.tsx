import { ArrowDownIcon, InfoIcon, XMarkIcon } from "./icons";
import ReactTooltip from "react-tooltip";

type Props = {
  title: string;
  data: string;
  idToScroll?: string;
};

const Card: React.FC<Props> = ({ title, data, idToScroll }) => {
  return (
    <a href={idToScroll && `#${idToScroll}`}>
      <div className="relative group p-10 bg-gray-800 rounded-3xl text-center space-y-3 hover:bg-[#372f1f] transition hover:cursor-pointer">
        <h3 className="text-2xl text-orange-300 font-bold">{title}</h3>
        {!idToScroll && <Info />}
        <p className="font-bold">{data}</p>
        {idToScroll ? (
          <ArrowDownIcon
            strokeWidth={2.5}
            width={27}
            height={27}
            className="relative top-5 mx-auto group-hover:animate-bounce transition"
          />
        ) : (
          <XMarkIcon
            strokeWidth={2.5}
            width={27}
            height={27}
            className="relative top-5 mx-auto"
          />
        )}
      </div>
    </a>
  );
};

const Info: React.FC = () => (
  <>
    <a data-tip data-for="infoTooltip" className="absolute left-16 top-[68px]">
      <InfoIcon
        strokeWidth={1.5}
        width={30}
        height={30}
        className="hover:fill-orange-800"
      />
    </a>
    <ReactTooltip
      id="infoTooltip"
      effect="solid"
      place="left"
      overridePosition={({ left, top }) => ({
        top: 165,
        left,
      })}
      textColor="#fff"
      backgroundColor="#38475B"
    >
      <span>
        This is an estimated amount
        <br /> (it does not include the spent money on the first round)
      </span>
    </ReactTooltip>
  </>
);

export default Card;
