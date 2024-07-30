import { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import apiClient from './../../utils/util';

const ApplicationStatus = ({ title }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await apiClient.get('/schedules/mentees', {
          params: { month: 7 },
        });
        
        const data = response.data;
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          console.error('Expected an array but got:', data);
          setSchedules([]);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setSchedules([]);
      }
    };

    fetchSchedules();
  }, []);

  const handleFileDownload = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <table className="mx-20 text-center border-separate border-spacing-4">
        <thead>
          <tr>
            <th className="w-20">No</th>
            <th className="w-60">멘토 정보</th>
            <th className="w-52">일시</th>
            <th className="w-36">자기소개서</th>
            <th className="w-20"></th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              schedule.mentors.map((mentor, subIndex) => (
                <tr key={mentor.scheduleId}>
                  <td>{index + 1}.{subIndex + 1}</td>
                  <td>
                    <span>{mentor.companyName}</span>
                    <span> {mentor.department} </span>
                    <span style={{ boxShadow: 'inset 0 -7px 0 rgb(76, 205, 198, 0.5)' }}>
                      <b>{mentor.mentorName}</b>
                    </span>
                  </td>
                  <td>{schedule.day} {mentor.time}</td>
                  <td>
                    <TbFileDownload
                      className="ml-14 cursor-pointer"
                      size={"1.4rem"}
                      onClick={() => handleFileDownload(mentor.fileUrl)}
                    />
                  </td>
                  <td>
                    <div className="bg-[#4CCDC6] text-white hover:bg-[#3AB8B2] rounded-2xl px-1 py-1 cursor-pointer">
                      취소
                    </div>
                  </td>
                </tr>
              ))
            ))
          ) : (
            <tr>
              <td colSpan="5">No schedules available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ApplicationStatus;
