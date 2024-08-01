import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={'#4CCDC6'} />
    </div>
  );
};

export default Loading;
