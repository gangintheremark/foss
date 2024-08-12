import React from 'react';

const MeetingIntro: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="absolute w-full top-[80px] bg-white">
        <div className="absolute w-full h-[940px] top-[2521px] left-0 mr-20 p-10 flex flex-col items-center">
          <div className="flex items-center justify-between w-full px-10 ml-40 mt-40">
            <div className="font-bold text-[#1c1f29f5] text-[46.9px] leading-[25.6px] whitespace-nowrap w-[457px] h-[210px]">
              <div>현업자들이</div>
              <div className="my-10">
                직접
                <span className="text-main-color"> 면접</span>을 진행하고{' '}
              </div>
              <div>
                상세한
                <span className="text-main-color"> 피드백</span>을 제공합니다.
              </div>
            </div>
            <div className="relative w-1/2 min-h-[600px] flex justify-center py-16 mr-32">
              <div
                className="relative bg-laptop bg-no-repeat bg-center"
                style={{ width: '600px', height: '400px', backgroundSize: 'contain' }}
              >

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingIntro;
