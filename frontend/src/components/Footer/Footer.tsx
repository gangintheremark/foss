import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute w-[1440px] h-[216px] top-[3400px] left-[0px] bg-neutral-50 mb-50">
      <div className="flex flex-col items-center mt-6  p-4">
        <div className="font-normal text-[#1c1f29a3] text-[11.6px] text-center leading-[19.2px] mb-4">
          대표: 5조
          <br />
          대표번호: 010-8862-7195
          <br />
          문의: anjs134@naver.com
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <div className="font-bold text-[#1c1f29cc] text-xs leading-[25.6px]">사이트 문의</div>
          <div className="font-normal text-[#1c1f29f5] text-[11px] leading-[25.6px] underline">
            문의하기
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
