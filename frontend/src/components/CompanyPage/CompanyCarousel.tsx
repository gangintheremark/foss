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
import 'styles/CompanyCarousel.css';

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

const CompanyCarousel: React.FC = () => {
  const totalWidth = companies.length * 120; // 100px width + 20px margin

  return (
    <div className="company-carousel">
      <div className="company-carousel-content" style={{ width: `${totalWidth * 2}px` }}>
        {companies.concat(companies).map((company, index) => (
          <img key={index} src={company.imageUrl} alt={company.name} className="company-logo" />
        ))}
      </div>
    </div>
  );
};

export default CompanyCarousel;
