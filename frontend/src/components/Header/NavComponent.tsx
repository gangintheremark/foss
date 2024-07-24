import Logo from '@assets/image/logo.png';
import mento1 from '@assets/image/mento1.png';
import bell from '@assets/image/bell.png';
import React, { useEffect, useState } from 'react';
import UnreadNotificationCount from '@components/Notification/UnreadNotification';
import setupEventSource from '@components/Notification/SseNotification';
import ProfileSelectBox from './ProfileSelectBox';

const Nav: React.FC = () => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiTUVOVEVFIiwibmFtZSI6Iuq5gO2YleuvvCIsImlkIjoxLCJpYXQiOjE3MjE2MjYwODYsImV4cCI6MTcyMTk4NjA4Nn0.xSOVTbuNUZ2dcPGFnjYseLUX1OaGhKXt0lnmcdBdHPKoU1lqAt9uwHS6QtnYFgvD';
  interface Notification {
    content: string;
    targetUrl: string;
    isRead: boolean;
    createdDate: string;
  }

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [sseNotifications, setSseNotifications] = useState<Notification[]>([]);

  const incrementUnreadCount = () => {
    setUnreadCount((prevCount) => {
      const newCount = prevCount + 1;
      console.log('Updated unreadCount:', newCount);
      return newCount;
    });
  };

  const fetchUnreadCount = async () => {
    try {
      const count = await UnreadNotificationCount(token);
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to load unread notification count:', error);
    }
  };

  useEffect(() => {
    const cleanupEventSource = setupEventSource({
      onMessage: (newNotification) => {
        setSseNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        incrementUnreadCount();
      },
      token,
      url: 'http://localhost:8080/sse/subscribe',
    });
    fetchUnreadCount();

    return cleanupEventSource;
  }, [token]);

  return (
    <div>
      <div className="w-full  overflow-hidden">
        <div className="absolute w-full top-0 left-0 bg-white">
          <div className="max-w-8xl h-[60px] flex items-center justify-between px-4 ml-60 mb-8 whitespace-nowrap">
            <img className="h-10" alt="Logo" src={Logo} />
            <div className="flex space-x-8 mr-40">
              <div className="rounded-lg px-4 py-3">
                <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">회사 소개</span>
              </div>
              <div className="rounded-lg px-4 py-3">
                <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">고객센터</span>
              </div>
              <div className="rounded-lg px-4 py-3">
                <button className="font-notoKR_DemiLight text-nav-gray-color text-sm">
                  자주 묻는 질문
                </button>
              </div>
              <div className="rounded-lg px-4 py-3">
                <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">면접일정</span>
              </div>
              <div className="rounded-lg px-4 py-3">
                <span className="font-notoKR_DemiLight text-nav-gray-color text-sm">커뮤니티</span>
              </div>
              <div className="relative rounded-lg pl-20 py-4">
                <img className=" w-[20px] h-[20px] ]" src={bell} />
                {unreadCount > 0 && (
                  <span className="absolute top-[6px] right-[-1px] bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
                <div>
                  {sseNotifications.map((notification) => (
                    <div key={notification.createdDate}>
                      <p>{notification.content}</p>
                      <small>{notification.createdDate}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg pl-2 py-2">
                <div className="w-[35px] h-[35px]">
                  <img className="-[35px] h-[35px] rounded-[50px]" src={mento1} />
                  <ProfileSelectBox className="absolute right-full top-0 ml-2 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
