import React from 'react';
import Logo from '@assets/image/logo.png';

const Nav: React.FC = () => {
  return (
    <div className="w-full  overflow-hidden">
      <div className="absolute w-full top-0 left-0 bg-white">
        <div className="max-w-8xl h-[60px] flex items-center justify-between px-4 ml-60 mb-8">
          <img className="h-10" alt="Logo" src={Logo} />
          <div className="flex space-x-8 mr-96">
            <div className="rounded-lg px-4 py-2">
              <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">회사 소개</span>
            </div>
            <div className="rounded-lg px-4 py-2">
              <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">고객센터</span>
            </div>
            <div className="rounded-lg px-4 py-2">
              <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">
                자주 묻는 질문
              </span>
            </div>
            <div className="rounded-lg px-4 py-2">
              <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">면접일정</span>
            </div>
            <div className="rounded-lg px-4 py-2">
              <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">커뮤니티</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
