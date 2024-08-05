import Robo from '@assets/image/robot.jpg';

const ErrorCompo = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <img src={Robo} width={100} height={100} />
      <div>{text}</div>
    </div>
  );
};

export default ErrorCompo;
