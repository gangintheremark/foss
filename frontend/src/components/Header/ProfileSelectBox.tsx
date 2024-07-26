import React, { useState, useEffect, useRef } from 'react';

interface Notification {
  content: string;
  targetUrl: string;
  isRead: boolean;
  createdDate: string;
}

interface ProfileSelectBoxProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ProfileSelectBox: React.FC<ProfileSelectBoxProps> = ({ className, isOpen, onClose }) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiTUVOVEVFIiwibmFtZSI6IuOFh-OFhyIsImlkIjoxLCJpYXQiOjE3MjE5ODMxNTAsImV4cCI6MTcyMjAxOTE1MH0.jpE_41HX0wIx0_fw08lu6geBQ4kJSr82FPYRuNaQdGDlvxQD-eZGJSG9Ya6roMIU';

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [sseNotifications, setSseNotifications] = useState<Notification[]>([]);

  // SSE 이벤트 소스 설정 함수
  const setupEventSource = () => {
    const url = 'http://localhost:8080/sse/subscribe';

    const fetchStream = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to connect');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let boundary;
            while ((boundary = buffer.indexOf('\n\n')) >= 0) {
              const eventData = buffer.slice(0, boundary).trim();
              buffer = buffer.slice(boundary + 2);

              if (eventData) {
                const lines = eventData.split('\n');
                lines.forEach((line) => {
                  if (line.startsWith('data:')) {
                    const jsonData = line.substring(5).trim();
                    try {
                      const parsedData = JSON.parse(jsonData);
                      const notificationResponse = parsedData.notificationResponse;
                      const unreadCount = parsedData.unreadCount;

                      if (notificationResponse) {
                        const newNotification: Notification = {
                          content: notificationResponse.content,
                          targetUrl: notificationResponse.targetUrl,
                          createdDate: notificationResponse.createdDate,
                          isRead: notificationResponse.read,
                        };

                        setSseNotifications((prevNotifications) => [
                          ...prevNotifications,
                          newNotification,
                        ]);
                        setUnreadCount((prevCount) => prevCount + 1);
                      }

                      console.log('Unread count:', unreadCount);
                    } catch (error) {
                      console.error('Failed to parse notification:', error);
                    }
                  }
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchStream();
  };

  useEffect(() => {
    setupEventSource();

    return () => {
      // Add any necessary cleanup logic here, if needed
    };
  }, [token]);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`relative z-50 ${className}`} ref={modalRef}>
      <div className="absolute top-[30px] right-0 w-[281px] bg-white p-4 rounded-2xl shadow-lg">
        <div className="space-y-4">
          <div className="text-gray-900 text-base font-semibold font-['Space Grotesk'] leading-normal hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            {sseNotifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              sseNotifications.map((notification) => (
                <div key={notification.createdDate}>
                  <p>{notification.content}</p>
                  <small>{notification.createdDate}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectBox;
