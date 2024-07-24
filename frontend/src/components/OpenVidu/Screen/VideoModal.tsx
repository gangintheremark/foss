import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedMeeting: any) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiTUVOVEVFIiwibmFtZSI6Iuq5gO2YleuvvCIsImlkIjoxLCJpYXQiOjE3MjE2MjYwODYsImV4cCI6MTcyMTk4NjA4Nn0.xSOVTbuNUZ2dcPGFnjYseLUX1OaGhKXt0lnmcdBdHPKoU1lqAt9uwHS6QtnYFgvD';
  const [meetings, setMeetings] = useState<any[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const response = await axios.get(
          `http://localhost:8080/schedules/mentors/time?day=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
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
        <p className="mb-4">일정을 선택하세요</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="mb-4">
            {meetings.map((meeting) => (
              <li
                key={meeting.scheduleId}
                className={`p-2 cursor-pointer ${
                  selectedMeeting?.scheduleId === meeting.scheduleId ? 'bg-blue-100' : ''
                }`}
                onClick={() => setSelectedMeeting(meeting)}
              >
                {meeting.time} - {meeting.mentorName}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => selectedMeeting && onConfirm(selectedMeeting)}
          >
            Confirm
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
