import React from 'react';
import samsungLogo from '@assets/image/samsung.png';
import naverLogo from '@assets/image/naver.png';
import cupangLogo from '@assets/image/cupang.png';
import hyundaiLogo from '@assets/image/hyundai.png';
import woowaLogo from '@assets/image/uwa.png';
import kakaoLogo from '@assets/image/kakao.png';
import carrotLogo from '@assets/image/carrotmarket.png';
import socarLogo from '@assets/image/socar.png';
import lgLogo from '@assets/image/lg.png';
import lineLogo from '@assets/image/line.png';

const companies = [
  { id: 1, name: '삼성전자', imageUrl: samsungLogo },
  { id: 2, name: '네이버', imageUrl: naverLogo },
  { id: 3, name: '쿠팡', imageUrl: cupangLogo },
  { id: 4, name: '현대자동차', imageUrl: hyundaiLogo },
  { id: 5, name: '우아한형제들', imageUrl: woowaLogo },
  { id: 6, name: '카카오', imageUrl: kakaoLogo },
  { id: 7, name: '당근마켓', imageUrl: carrotLogo },
  { id: 8, name: '쏘카', imageUrl: socarLogo },
  { id: 9, name: 'LG전자', imageUrl: lgLogo },
  { id: 10, name: '라인', imageUrl: lineLogo },
];

const CompanyIntro: React.FC = () => {
  return (
    <div className="w-full  overflow-hidden">
      <div className="absolute w-full top-[20px] left-0 bg-white">
        <div className="absolute w-[1440px] h-[273px] top-[1500px] left-0">
          <div className="absolute w-[287px] h-[26px] top-[30px] left-20 font-bold text-[#1c1f29f5] text-3xl leading-[25.6px] whitespace-nowrap">
            기업별 멘토 찾기
          </div>
          <div className="absolute w-[1282px] h-[134px] top-[90px] left-20 border border-gray-50 border-solid rounded-2xl flex">
            {companies.map((company, index) => (
              <div
                key={company.id}
                className={`relative top-[20px] flex-none w-[100px] h-[100px] bg-bg-gray rounded-2xl  ${
                  index !== 0 ? 'mr-[26px]' : 'mr-[26px] ml-[26px]'
                }`}
              >
                <div className="absolute w-10 h-10 rounded-full border-[#5e67eb] border border-solid top-[13px] left-[30px]">
                  <img
                    src={company.imageUrl}
                    alt={company.name}
                    className="w-34 h-34 rounded-full object-cover"
                  />
                </div>
                <div className="absolute top-[50px] inset-0 flex items-center justify-center">
                  <div className="text-[#1c1f29f5] font-Inter_Regular text-sm leading-[25.6px] whitespace-nowrap">
                    {company.name}
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

export default CompanyIntro;
