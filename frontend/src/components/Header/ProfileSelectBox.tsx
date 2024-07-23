import React from 'react';

interface ProfileSelectBoxProps {
  className?: string;
}

const ProfileSelectBox: React.FC<ProfileSelectBoxProps> = ({ className }) => {
  return (
    <div className={`relative z-50`}>
      <div className="absolute top-[30px] right-0 w-[281px] h-[180.63px] bg-[#DBEFFF]">
        <div className="w-[281px] h-[180.23px] absolute top-[11.40px] bg-[#D3ECFF] rounded-2xl shadow" />
      </div>
      <div className="absolute top-[50px] right-[0px] w-[223px] h-[180px] flex flex-col gap-1 ">
        <div className="flex flex-col gap-1  pb-4">
          <div className="flex  gap-1">
            <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal">
              회원 정보 수정
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1  pb-4 ">
          <div className="flex  gap-1">
            <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal">
              신청 현황
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1  pb-4">
          <div className="flex  gap-1">
            <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal">
              피드백목록
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 pb-4">
          <div className="flex  gap-1">
            <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal">
              작성한 리뷰 목록
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-1  pb-4 ">
          <div className="flex  gap-1">
            <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal">
              Interactive Reports
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileSelectBox;
