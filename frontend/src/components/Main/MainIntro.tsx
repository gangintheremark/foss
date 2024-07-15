import React from 'react';
import mainIntro from '@assets/image/mainintro.png';
import scrollDown from '@assets/image/scrollDown.png';

const MainIntro: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="absolute w-full top-[60px] left-0 bg-white">
        <img className="w-full h-[855px] object-cover" alt="mainIntro" src={mainIntro} />
        <div className="flex flex-col items-center justify-center h-[803px]">
          <p className="w-[670px] h-[185px] font-notoKR_Bold font-bold text-black text-[62px] leading-[92.4px] text-center absolute left-[210px] top-[339px]">
            AI와 전문가 피드백으로 면접을 한번에
          </p>
          <img
            className="w-[50px] h-[50px] absolute top-[780px]"
            alt="Scroll down btn"
            src={scrollDown}
          />
        </div>
        <div className="flex items-center justify-center w-full h-[600px] absolute top-[855px] bg-bg-gray">
          <p className="w-[726px] h-[154px] font-notoKR_Bold font-bold text-[#191f28] text-[29.9px] text-center leading-[51.2px]">
            당신의 면접을 위한 담당자를 지금 바로 찾아보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainIntro;
