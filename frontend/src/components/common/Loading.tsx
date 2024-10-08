import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute w-full h-screen">
      <ClipLoader size={50} color={'#4CCDC6'} />
    </div>
  );
};

export default Loading;
