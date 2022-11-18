type Props = {
  title: string;
  data: string;
};

const Card: React.FC<Props> = ({ title, data }) => {
  return (
    <div className="p-10 bg-gray-800 rounded-3xl text-center space-y-3">
      <h3 className="text-2xl text-orange-300 font-bold">{title}</h3>
      <p className="font-bold">{data}</p>
    </div>
  );
};

export default Card;
