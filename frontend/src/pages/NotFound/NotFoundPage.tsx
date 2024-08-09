import Robo from '@assets/image/robot.jpg';

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <img src={Robo} width={128} height={128} alt="Robot" />
        <div className="text-xl font-black">존재하지 않는 페이지입니다.</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
