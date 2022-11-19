import Image from "next/image";

const Error = () => {
  return (
    <div className=" flex flex-col  items-center bg-gray-600 h-screen w-screen space-y-10">
      <h1 className="text-3xl font-bold text-red-500 uppercase mt-10">
        An Error has occured, try to refresh the page or come back later
      </h1>
      <Image
        src="/cserror.jpg"
        width={1180}
        height={950}
        alt="error image"
        className="rounded-[30px]"
      />
    </div>
  );
};

export default Error;
