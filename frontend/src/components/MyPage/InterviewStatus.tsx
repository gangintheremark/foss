import { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import apiClient from './../../utils/util';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { TMentorInfo } from '@/types/type';
import Loading from '../common/Loading';

const MySwal = withReactContent(Swal);

type MyInterviewSchedule = {
  startedDate: string;
  fileUrl: string;
  restDay: number;
  mentorInfo: TMentorInfo;
};

const ApplicationStatus = ({ title }: { title: string }) => {
  const [interviews, setInterviews] = useState<Array<MyInterviewSchedule>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await apiClient.get('/interviews/mentees', {
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
      return <div className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div> D-Day
      </div>;
    } else {
      return <div className="flex items-center justify-center">
      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div> D-{restDay}
    </div>;
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto w-5/6">
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='bg-neutral-100 text-center'>
              <th scope="col" className="px-3 py-3">NO</th>
              <th scope="col" className="px-6 py-3">회사/직무</th>
              <th scope="col" className="px-6 py-3">멘토</th>
              <th scope="col" className="px-6 py-3">일시</th>
              <th scope="col" className="px-6 py-3">자기소개서</th>
              <th scope="col" className="px-6 py-3">디데이</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                  <td className="px-6 py-4">
                    <span>{interview.mentorInfo.companyName}</span>
                    <span> {interview.mentorInfo.department} </span>
                  </td>
                  <td className="px-6 py-4">
                        <b>{interview.mentorInfo.name}</b>
                  </td>
                  <td className="px-6 py-4">{interview.startedDate}</td>
                  <td className="px-6 py-4">
                      <TbFileDownload
                        className="ml-10 cursor-pointer"
                        size={'1.4rem'}
                        onClick={() => handleFileDownload(interview.fileUrl)}
                      />
                    </td>
                    <td>{formatRestDay(interview.restDay)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='pt-10'>예정된 모의 면접 일정이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationStatus;
