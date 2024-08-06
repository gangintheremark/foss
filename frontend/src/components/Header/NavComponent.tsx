import Logo from '@assets/image/logo.png';
import mento1 from '@assets/image/mento1.png';
import bell from '@assets/image/bell.png';
import React, { useEffect, useState } from 'react';
import useAuthStore from '@store/useAuthStore';

import ProfileSelectBox from './ProfileSelectBox';
import { useNavigate } from 'react-router-dom';


const Nav: React.FC = () => {
  interface Notification {
    content: string;
    targetUrl: string;
    isRead: boolean;
    createdDate: string;
  }

  const [isProfileSelectBoxOpen, setIsProfileSelectBoxOpen] = useState(false);

  const [sseNotifications, setSseNotifications] = useState<Notification[]>([]);

  const { isLoggedIn, setTokens, unreadCount, clearTokens, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setTokens: state.setTokens,
    unreadCount: state.unreadCount,
    clearTokens: state.clearTokens,
    logout: state.logout,
  }));
  console.log(unreadCount);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }
  }, [setTokens]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleBellClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isProfileSelectBoxOpen) {
      toggleProfileSelectBox();
    }
  };

  const toggleProfileSelectBox = () => {
    setIsProfileSelectBoxOpen((prev) => !prev);
  };

  const nav = useNavigate();

  return (
    <div className="w-full  overflow-hidden">
      <div className="absolute w-full top-0 left-0 bg-white">
        <div className="max-w-8xl h-[60px] flex items-center justify-between px-4 ml-60 mb-8 whitespace-nowrap">
          <img
            className="h-10 cursor-pointer"
            alt="Logo"
            src={Logo}
            onClick={() => {
              nav('/');
            }}
          />
          <div className="flex space-x-8 mr-40">
            {/* <div className="rounded-lg px-4 py-3">
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/about-us');
                }}
              >
                회사 소개
              </button>
            </div> */}
            {/* <div className="rounded-lg px-4 py-3">
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/support');
                }}
              >
                고객센터
              </button>
            </div> */}
            <div className="rounded-lg px-4 py-3">
              {/* <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">
                자주 묻는 질문
              </span> */}
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/company');
                }}
              >
                기업 검색
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              {/* <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">면접일정</span> */}
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/register');
                }}
              >
                면접일정
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              {/* <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">면접 등록</span> */}
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/register/mentor');
                }}
              >
                면접등록
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              {/* <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">커뮤니티</span> */}
              <button
                className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                onClick={() => {
                  nav('/community');
                }}
              >
                자유게시판
              </button>
            </div>
            {isLoggedIn ? (
              <>
                <div className="relative rounded-lg pl-20 py-4">
                  <img className=" w-[20px] h-[20px] ]" src={bell} onClick={handleBellClick} />
                  {unreadCount > 0 && (
                    <span className="absolute top-[6px] right-[-1px] bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  <ProfileSelectBox
                    isOpen={isProfileSelectBoxOpen}
                    onClose={() => setIsProfileSelectBoxOpen(false)}
                  />
                </div>
                <div className="rounded-lg pl-2 py-2">
                  <div className="w-[35px] h-[35px]">
                    <img
                      className="-[35px] h-[35px] rounded-[50px] cursor-pointer"
                      src={mento1}
                      onClick={() => {
                        nav('/my-page');
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg px-4 py-3">
                  <button
                    className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-lg px-4 py-3 pl-10">
                <button
                  className="font-notoKR_DemiLight text-nav-gray-color text-sm"
                  onClick={() => {
                    nav('/login');
                  }}
                >
                  로그인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
