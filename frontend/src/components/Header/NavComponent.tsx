import React, { useEffect, useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import useUserStore from '@store/useUserStore';
import ProfileSelectBox from './ProfileSelectBox';
import { useNavigate } from 'react-router-dom';
import Logo from '@assets/image/logo.png';
import bell from '@assets/image/bell.png';
import Swal from 'sweetalert2';
import { useScheduleStore } from '@/store/schedule';

const Nav: React.FC = () => {
  // interface Notification {
  //   content: string;
  //   targetUrl: string;
  //   isRead: boolean;
  //   createdDate: string;
  // }

  const [isProfileSelectBoxOpen, setIsProfileSelectBoxOpen] = useState(false);

  // const [sseNotifications, setSseNotifications] = useState<Notification[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string>(window.location.pathname);
  const { resetRegister } = useScheduleStore((state) => state.actions);
  const router = useNavigate();

  const { isLoggedIn, unreadCount, setTokens, fetchUnreadCount, logout } = useAuthStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      setTokens: state.setTokens,
      unreadCount: state.unreadCount,
      clearTokens: state.clearTokens,
      logout: state.logout,
      fetchUnreadCount: state.fetchUnreadCount,
    })
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      fetchUnreadCount();
    }
  }, [setTokens, fetchUnreadCount]);

  useEffect(() => {
    if (!router.name.includes('/register/mentee')) {
      resetRegister();
    }
  });

  const { profileImg } = useUserStore((state) => ({
    profileImg: state.profileImg,
  }));

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      icon: 'success',
      text: '로그아웃되었습니다.',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
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

  const handleNavClick = (path: string) => {
    setActiveButton(path);
    nav(path);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="absolute w-full top-0 left-0 bg-white">
        <div className="max-w-8xl h-[60px] flex items-center justify-between px-4 ml-60 mb-8 whitespace-nowrap">
          <img
            className="h-10 cursor-pointer"
            alt="Logo"
            src={Logo}
            onClick={() => handleNavClick('/')}
          />
          <div className="flex space-x-8 mr-40">
            <div className="rounded-lg px-4 py-3">
              <button
                className={`font-notoKR_DemiLight text-sm ${activeButton === '/company'
                    ? 'text-main-color'
                    : 'text-nav-gray-color hover:text-main-color'
                  }`}
                onClick={() => handleNavClick('/company')}
              >
                기업 검색
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              <button
                className={`font-notoKR_DemiLight text-sm ${activeButton === '/register'
                    ? 'text-main-color'
                    : 'text-nav-gray-color hover:text-main-color'
                  }`}
                onClick={() => handleNavClick('/register')}
              >
                면접 신청
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              <button
                className={`font-notoKR_DemiLight text-sm ${activeButton === '/register/mentor'
                    ? 'text-main-color'
                    : 'text-nav-gray-color hover:text-main-color'
                  }`}
                onClick={() => handleNavClick('/register/mentor')}
              >
                면접 등록
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              <button
                className={`font-notoKR_DemiLight text-sm ${activeButton === '/community'
                    ? 'text-main-color'
                    : 'text-nav-gray-color hover:text-main-color'
                  }`}
                onClick={() => handleNavClick('/community')}
              >
                경험 나눔
              </button>
            </div>
            <div className="rounded-lg px-4 py-3">
              <button
                className={`font-notoKR_DemiLight text-sm ${activeButton === '/review'
                    ? 'text-main-color'
                    : 'text-nav-gray-color hover:text-main-color'
                  }`}
                onClick={() => handleNavClick('/review')}
              >
                멘토 리뷰
              </button>
            </div>
            {isLoggedIn ? (
              <>
                <div className="relative rounded-lg pl-20 py-3">
                  <img
                    className="cursor-pointer"
                    src={bell}
                    onClick={handleBellClick}
                    style={{ width: "26px", height: "26px", objectFit: "contain" }}
                  />

                  {unreadCount > 0 && (
                    <span className="absolute top-[2px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                      className="w-[35px] h-[35px] rounded-[50px] cursor-pointer"
                      src={profileImg || 'assets/image/robot.jpg'}
                      alt="Profile"
                      onClick={() => handleNavClick('/my-page')}
                    />
                  </div>
                </div>
                <div className="rounded-lg px-4 py-3">
                  <button
                    className="font-notoKR_DemiLight text-nav-gray-color text-sm hover:text-main-color"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-lg px-4 py-3 pl-10">
                <button
                  className="font-notoKR_DemiLight text-nav-gray-color text-sm hover:text-main-color"
                  onClick={() => handleNavClick('/login')}
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
