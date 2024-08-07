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

type MyPageSchedule = {
  scheduleId: number;
  date: string;
  fileUrl: string;
  mentorInfo: TMentorInfo;
};

const ApplicationStatus = ({ title }: { title: string }) => {
  const [schedules, setSchedules] = useState<Array<MyPageSchedule>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await apiClient.get('/schedules/mentees', {
          params: { month: dayjs().format('M') },
        });

        const data = response.data as Array<MyPageSchedule>;
        setSchedules(data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleFileDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCancel = async (scheduleId: number, date: string, mentorName: string) => {
    const result = await MySwal.fire({
      html: `<b>${date} ${mentorName}</b><br>신청을 취소하시겠습니까?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 취소합니다',
      cancelButtonText: '아니요, 유지합니다',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/schedules/mentees/${scheduleId}`);
        setSchedules((prevSchedules) =>
          prevSchedules.filter((schedule) => schedule.scheduleId !== scheduleId)
        );
        MySwal.fire('취소됨', '모의 면접 신청이 취소되었습니다.', 'success');
      } catch (error) {
        console.error('Error cancelling schedule:', error);
        MySwal.fire('오류', '모의 면접 신청을 취소하는 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative overflow-x-auto w-5/6">
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-neutral-100 text-center">
              <th scope="col" className="px-3 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                회사/직무
              </th>
              <th scope="col" className="px-6 py-3">
                멘토
              </th>
              <th scope="col" className="px-6 py-3">
                일시
              </th>
              <th scope="col" className="px-6 py-3">
                자기소개서
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <tr
                  key={schedule.scheduleId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {schedule.mentorInfo.companyName} {schedule.mentorInfo.department}
                  </td>
                  <td className="px-6 py-4">
                    <b>{schedule.mentorInfo.name}</b>
                  </td>
                  <td className="px-6 py-4">{schedule.date}</td>
                  <td className="px-6 py-4">
                    <TbFileDownload
                      className="ml-12 cursor-pointer"
                      size={'1.4rem'}
                      onClick={() => handleFileDownload(schedule.fileUrl)}
                    />
                  </td>
                  <td>
                    <div
                      className="bg-neutral-500 text-center text-white hover:bg-main-color rounded-2xl py-1 m-2 cursor-pointer"
                      onClick={() =>
                        handleCancel(
                          schedule.scheduleId,
                          new Date(schedule.date).toLocaleString(),
                          schedule.mentorInfo.name
                        )
                      }
                    >
                      취소
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="pt-10 text-center">
                  신청한 일정이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationStatus;
