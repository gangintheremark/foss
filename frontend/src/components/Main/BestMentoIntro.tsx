import React from 'react';
import mento1 from '@assets/image/mento1.png';
import mento2 from '@assets/image/mento2.png';
import mento3 from '@assets/image/mento3.png';

interface BestMento {
  name: string;
  company: string;
  position: string;
  profileImage: string;
  students: number;
}

const bestmentos: BestMento[] = [
  {
    name: '에드워드님',
    company: '삼성전자',
    position: 'AI 개발자/주니어(3년차)',
    profileImage: mento1,
    students: 288,
  },
  {
    name: '이동기 님',
    company: '네이버',
    position: '백엔드 개발자/주니어(3년차)',
    profileImage: mento2,
    students: 99,
  },
  {
    name: '남경민 님',
    company: '한국주택금융공사',
    position: 'IT/안드로이드 개발자/주니어(3년차)',
    profileImage: mento3,
    students: 169,
  },
];

const BestMentos: React.FC = () => {
  return (
    <div className="w-full  overflow-hidden">
      <div className="absolute w-full top-[80px] left-0 bg-white">
        <div className="absolute w-full h-[940px] top-[2521px] left-0 flex flex-col items-center">
          <div className="absolute w-[287px] h-[26px] top-[30px] left-[100px] font-bold text-[#1c1f29f5] text-3xl leading-[25.6px] whitespace-nowrap">
            멘티들이 도움을 많이 받은 멘토
          </div>

          <div className="absolute top-[100px] left-[150px] flex flex-nowrap  gap-10">
            {bestmentos.map((bestmento, index) => (
              <div key={index} className="w-[350px] flex flex-col items-center mb-10">
                <img
                  className="w-[267px] h-[267px] object-cover mt-4 rounded-full"
                  alt="Profile picture"
                  src={bestmento.profileImage}
                />
                <div className="font-notoKR_Bold font-bold text-[#929292] text-[15px] text-center mt-4">
                  {bestmento.name}
                </div>
                <div className="mt-3 text-center">
                  <div className="font-notoKR_Bold font-bold text-[#212121] text-[20px]">
                    {bestmento.company}
                  </div>
                  <div className="font-notoKR_Bold font-bold text-[#929292] text-[15px] mt-2">
                    {bestmento.position}
                  </div>
                </div>
                <p className="font-notoKR_Bold font-bold text-3xl text-center text-[#191f28] mt-8">
                  {bestmento.students}명 수강
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestMentos;
