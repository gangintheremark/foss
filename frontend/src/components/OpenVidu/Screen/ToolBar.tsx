import React from 'react';

const Toolbar = () => {
  return (
    <div className="w-full h-16 bg-[#282828] flex items-center justify-center p-4">
      <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">버튼 1</button>
      <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">버튼 2</button>
      <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">버튼 3</button>
    </div>
  );
};

export default Toolbar;
