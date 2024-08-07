import React, { useState, useEffect } from 'react';
import apiClient from '../../../utils/util';
// import useAuthStore from '@store/useAuthStore';
import moment from 'moment';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedMeeting: any) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleMeetingSelect = (meeting: any) => {
    setSelectedMeeting(meeting);
    console.log('selectedMeeting 설정됨:', meeting);
  };

  const handleCreateClick = () => {
    if (selectedMeeting) {
      console.log('선택된 미팅:', selectedMeeting);
      onConfirm(selectedMeeting);
    } else {
      console.warn('미팅이 선택되지 않았습니다');
    }
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const formattedDate = moment().format('YYYY-MM-DD');

        console.log(formattedDate);
        const response = await apiClient.get(`/interviews/mentors/specific?date=${formattedDate}`);
        console.log('API 응답:', response);
        console.log(response.data[0]);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMeetings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">면접방 만들기</h2>

        {loading ? (
          <p>Loading...</p>
        ) : meetings.length === 0 ? (
          <div>
            <p>일정이 없습니다</p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4">일정을 선택하세요</p>
            <ul className="mb-4">
              {meetings.map((meeting) => (
                <li
                  key={meeting.interviewId}
                  className={`p-2 cursor-pointer ${
                    selectedMeeting?.interviewId === meeting.interviewId ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleMeetingSelect(meeting)}
                >
                  {meeting.startedDate}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCreateClick}
              >
                만들기
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
