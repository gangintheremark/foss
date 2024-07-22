import React from 'react';
import starImage from '@assets/image/star.png';
import profileImage from '@assets/image/profile.png';
const count = 5;

const ReviewIntro: React.FC = () => {
  const reviews = [
    {
      name: '이동기',
      timeAgo: '3시간 전',
      content: '너무좋아요',
      position: '백엔드개발자 | 주니어 (3년차)',
      company: '네이버',
      instructor: '강사 2',
    },
    {
      name: '김형민',
      timeAgo: '1시간 전',
      content: '너무좋아요',
      position: 'UX/UI | 시니어 (5년차)',
      company: '삼성물산',
      instructor: '강사 1',
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="absolute w-full top-[20px] left-0 bg-white">
        <div className="absolute w-[1440px] h-[744px] top-[1777px] left-[0px] p-10 flex flex-wrap justify-between">
          <div className="w-[457px] h-[210px] ml-40 mt-40">
            <p className="font-bold text-transparent text-[46.9px] leading-[70px]">
              <span className="text-[#191f28]">우리는</span>
              <br />
              <span className="text-[#2670de]">100,000</span>
              <span className="text-[#191f28]">명의 회원들과 함께하고 있습니다</span>
            </p>
          </div>
          <div className="mt-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[413px] h-[302px] bg-white  shadow-lg rounded-2xl border border-solid border-[#1c1f2914] shadow-[0px 2px 16px #0000000a] mb-6 p-6  pb-0 "
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-[#1c1f29cc] text-sm">{review.name}</div>
                  <div className="flex items-center">
                    {Array.from({ length: count }).map((_, index) => (
                      <img key={index} className="w-3 h-3 mr-1" alt="Review" src={starImage} />
                    ))}
                    <div className="text-xs text-[#1c1f29a3] ml-2">{review.timeAgo}</div>
                  </div>
                </div>
                <div className="text-sm text-[#1c1f29a3] mt-5">{review.content}</div>
                <div className="flex flex-wrap justify-between mt-28 mb-0">
                  <img
                    className="w-8 h-8 rounded-full object-cover mr-3"
                    alt="User profile"
                    src={profileImage}
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-base mb-1">{review.name}</div>
                    <div className="text-[#1c1f29a3] text-sm">
                      <div className="font-bold mb-1">{review.company}</div>
                      <div>{review.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewIntro;
