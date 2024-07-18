import React, { useState, useEffect } from 'react';

import blueTalkImage from '@assets/image/말풍1.jpg';
import pinkTalkImage from '@assets/image/말풍2.jpg';
import meetingImage from '@assets/image/미팅아이콘.jpg';
import robot from '@assets/image/robot.jpg';
import kakaoIcon from '@assets/image/kakaoicon.jpg';
import naverIcon from '@assets/image/navericon.jpg';
import googleIcon from '@assets/image/googleicon.jpg';

const Login: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const handleImageLoad = () => {
      setImagesLoaded(true);
    };

    const images = [robot, meetingImage, blueTalkImage, pinkTalkImage];
    let loadedCount = 0;

    const checkAllImagesLoaded = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        handleImageLoad();
      }
    };

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = checkAllImagesLoaded;
    });

    return () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image;
        img.onload = null;
      });
    };
  }, []);

  const kakoLink = `http://localhost:8080/oauth2/authorization/kakao`;

  const kakaoSocialLogin = () => {
    window.location.href = kakoLink;
  };

  return (
    <div
      className={`top-0 w-[1440px] h-[950px] relative overflow-hidden bg-white flex flex-col ${
        imagesLoaded ? 'block' : 'hidden'
      }`}
    >
      <svg
        width={820}
        height={723}
        viewBox="0 0 820 723"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[-93px] top-[326px] opacity-60"
        preserveAspectRatio="none"
      >
        <g opacity="0.6" filter="url(#filter0_dif_301_224)">
          <ellipse
            cx={314}
            cy={494}
            rx={406}
            ry={394}
            fill="#2670DF"
            fillOpacity="0.4"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_dif_301_224"
            x={-192}
            y={0}
            width={1012}
            height={988}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_301_224" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_301_224"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius={20}
              operator="erode"
              in="SourceAlpha"
              result="effect2_innerShadow_301_224"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_301_224" />
            <feGaussianBlur stdDeviation={50} result="effect3_foregroundBlur_301_224" />
          </filter>
        </defs>
      </svg>
      {imagesLoaded && (
        <>
          <img
            src={robot}
            className="w-[367px] h-[403px] absolute left-[1173px] top-[622px] object-cover"
          />
          <img
            src={meetingImage}
            className="w-[367px] h-[270px] absolute left-[129px] top-[511px] object-cover"
          />
          <img
            src={blueTalkImage}
            className="w-[142px] h-[130px] absolute left-[563px] top-[385px] object-cover"
          />
          <img
            src={pinkTalkImage}
            className="w-[150px] h-[143.2px] absolute left-[393px] top-[346px] object-cover"
          />
        </>
      )}

      <div
        className={`flex flex-col absolute left-[93px] top-[100px] ${
          imagesLoaded ? 'block' : 'hidden'
        }`}
      >
        <p className="w-[451px] text-[42.953086853027344px] font-black text-left text-black">
          Welcome!
        </p>
        <p className="w-[451px] text-[42.953086853027344px] font-black text-left text-[#2670df]">
          Foss
        </p>
        <p className="w-[700px] text-[25px] font-black text-left text-black">
          면접을 준비하고 싶은 당신에게 꼭 필요한 웹 서비스
        </p>
      </div>

      <div
        className={`flex flex-col absolute left-[863px] top-[180px] w-[400px] h-[76px] space-y-2 ${
          imagesLoaded ? 'block' : 'hidden'
        }`}
      >
        <p className="text-[28px] font-semibold text-left text-[#27272e]">
          오늘도 함께 면접준비할까요?
        </p>
        <p className="text-base text-left text-[#27272e]">
          AI와 멘토의 피드백을 통해 면접을 연습하세요
        </p>
      </div>

      <div
        className={`flex flex-col items-center absolute left-[874.5px] top-[359.5px] space-y-4 ${
          imagesLoaded ? 'block' : 'hidden'
        }`}
      >
        <div
          className="relative w-[423px] h-[66px] flex items-center bg-[#FEE500] border border-[#eee] rounded-md"
          onClick={kakaoSocialLogin}
        >
          <img src={kakaoIcon} className="w-[47px] h-[47px] ml-3 rounded-md object-cover" />
          <p className="flex-grow text-[17px] font-semibold text-center text-[#393939]">
            카카오로 시작하기
          </p>
        </div>
        <div className="relative w-[423px] h-[66px] flex items-center bg-neutral-100 border border-[#eee] rounded-md">
          <img src={googleIcon} className="w-[20px] h-[20px] ml-7 object-cover" />
          <p className="flex-grow text-[17px] font-semibold text-center text-[#494747]">
            구글로 시작하기
          </p>
        </div>
        <div className="relative w-[423px] h-[66px] flex items-center bg-[#03c75a] rounded-md">
          <img src={naverIcon} className="w-[50px] h-[50px] ml-4 object-none" />
          <p className="flex-grow text-lg font-bold text-center text-white">네이버로 시작하기</p>
        </div>
      </div>

      <div
        className={`flex flex-col absolute left-[875px] top-[619px] gap-2.5 p-2.5 ${
          imagesLoaded ? 'block' : 'hidden'
        }`}
      >
        <p className="text-[15px] text-center">
          <span className="font-semibold text-center text-[#d2d2d4]">
            소셜 계정을 통해 바로 이용이 가능하며
          </span>
          <br />
          <span className="font-semibold text-center text-[#d2d2d4]">첫 로그인시 </span>
          <span className="font-black text-center text-[#72b1b7]">이용약관</span>
          <span className="font-semibold text-center text-[#d2d2d4]"> 및 </span>
          <span className="font-bold text-center text-[#72b1b7]">개인정보처리방침 </span>
          <span className="font-semibold text-center text-[#d2d2d4]">동의로 간주됩니다.</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
