import { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import apiClient from '../../utils/util';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { TMenteeInfo } from '@/types/type';

const MySwal = withReactContent(Swal);

type MyInterviewSchedule = {
  interviewId: number;
  startedDate: string;
  restDay: number;
  mentees: TMenteeInfo[];
};

const ApplicationStatus = ({ title }: { title: string }) => {
  const [interviews, setInterviews] = useState<Array<MyInterviewSchedule>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await apiClient.get('/interviews/mentors', {
          params: { month: dayjs().format('M') },
        });

        const data = response.data as Array<MyInterviewSchedule>;
        setInterviews(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleFileDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const formatRestDay = (restDay: number) => {
    if (restDay === 0) {
      return <span className="mx-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">D-Day</span>;
    } else {
      return <span className="mx-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">D-{restDay}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={'#4CCDC6'} />
      </div>
    );
  }

  return (
    <>
      <table className="text-center border-separate border-spacing-4">
        <thead>
          <tr>
            <th className="w-20">No</th>
            <th className="w-52">일시</th>
            <th className="w-60">멘티 정보</th>
            <th className="w-20">디데이</th>
          </tr>
        </thead>
        <tbody>
          {interviews.length > 0 ? (
            interviews.map((interview, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{interview.startedDate}</td>
                <td>
                  {interview.mentees.map((mentee, menteeIndex) => (
                    <div key={menteeIndex} className="flex items-center justify-center">
                      <span>{mentee.name}</span>
                      <TbFileDownload
                        className="ml-2 cursor-pointer"
                        size={'1.4rem'}
                        onClick={() => handleFileDownload(mentee.fileUrl)}
                      />
                    </div>
                  ))}
                </td>
                <td>{formatRestDay(interview.restDay)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>예정된 모의 면접 일정이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ApplicationStatus;
