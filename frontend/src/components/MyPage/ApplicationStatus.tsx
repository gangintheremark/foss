import { useEffect, useState } from 'react';
import { TbFileDownload } from 'react-icons/tb';
import apiClient from './../../utils/util';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { TMentorInfo } from '@/types/type';

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
            <th className="w-60">멘토 정보</th>
            <th className="w-52">일시</th>
            <th className="w-36">자기소개서</th>
            <th className="w-20"></th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <tr key={schedule.scheduleId}>
                <td>{index + 1}</td>
                <td>
                  <span>{schedule.mentorInfo.companyName}</span>
                  <span> {schedule.mentorInfo.department} </span>
                  <span style={{ boxShadow: 'inset 0 -7px 0 rgb(76, 205, 198, 0.5)' }}>
                    <b>{schedule.mentorInfo.name}</b>
                  </span>
                </td>
                <td>{schedule.date}</td>
                <td>
                  <TbFileDownload
                    className="ml-14 cursor-pointer"
                    size={'1.4rem'}
                    onClick={() => handleFileDownload(schedule.fileUrl)}
                  />
                </td>
                <td>
                  <div
                    className="bg-[#4CCDC6] text-white hover:bg-[#3AB8B2] rounded-2xl px-1 py-1 cursor-pointer"
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
              <td colSpan={5}>No schedules available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ApplicationStatus;
