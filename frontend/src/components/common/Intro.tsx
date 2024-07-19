const Intro = ({ title, sub }: { title: string; sub: string }) => {
  return (
    <div className="w-full mb-9 mt-12 flex flex-col justify-center items-start">
      <div className=" font-bold text-3xl">{title}</div>
      <div className=" font-light text-xl">{sub}</div>
    </div>
  );
};

export default Intro;
