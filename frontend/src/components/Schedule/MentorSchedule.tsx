import { useEffect, useState } from 'react';
import FeedbackLayout from '../Feedback/FeedbackLayout';
import SmallCalendar from '../Register/MyPageCalendar';
import '../../styles/smallCalendarStyle.css';
import Intro from '../common/Intro';
import Timebtn from '../common/Timebtn';
import Bgblur from '../../assets/svg/mypage/MyPageRegisterBg.svg?react';
import { useScheduleStore } from '@/store/schedule';
import MenteeListCard from './MenteeListCard';
import RegisterBtn from '../common/RegisterBtn';
import { MySwal } from '@/config/config';
import { useNavigate } from 'react-router-dom';
import { deleteMentorSchdule, getMentorSchedule, postMentorSchedule } from '@/apis/register';
import { QUERY_KEY } from '@/constants/queryKey';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import Loading from '../common/Loading';
import ErrorCompo from '../common/ErrorCompo';

const MentorSchedule = () => {
  const { EachMentorData, MenteeList, TotalMentorData } = useScheduleStore((state) => state.states);
  const { resetMenteeList, setTotalData } = useScheduleStore((state) => state.actions);
  const [time, setTime] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.MENTOR_CHECK(parseInt(dayjs().format('M'))),
    queryFn: () => getMentorSchedule(parseInt(dayjs().format('M'))),
  });
  useEffect(() => {
    if (data) {
      setTotalData(data);
    }
  }, [data, setTotalData]);
  useEffect(() => {
    resetMenteeList();
  }, [time]);
  const router = useNavigate();
  // 얘네 두개 mutation적용해야겠다
  const onDelete = async (scheduleId: number) => {
    const data = await deleteMentorSchdule(scheduleId);
    if (data?.status !== 200) {
      MySwal.fire({
        icon: 'error',
        title: '오류가 발생했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      MySwal.fire({
        icon: 'success',
        title: '모의 면접이 취소되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router('/my-page');
  };
  const onPost = async (scheduleId: number, memberIds: Array<number>) => {
    const data = await postMentorSchedule(scheduleId, memberIds);
    if (data?.status !== 200) {
      MySwal.fire({
        icon: 'error',
        title: '오류가 발생했습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      MySwal.fire({
        icon: 'success',
        title: '모의 면접이 확정되었습니다',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router('/my-page');
  };
  if (error) {
    return (
      <>
        <ErrorCompo text="해당 정보를 찾을 수 없습니다" />
      </>
    );
  }
  return (
    <FeedbackLayout>
      <Bgblur className="absolute bottom-0 left-0" />
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="w-11/12">
              <Intro title="일정 확인하기" sub="일정을 확정짓거나 수정하세요." />
              <div className="w-full h-full flex gap-16 py-16">
                <div className="w-[460px] z-10">
                  <SmallCalendar
                    result={EachMentorData}
                    setTime={setTime}
                    isMentor={true}
                    data={TotalMentorData}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {EachMentorData &&
                      EachMentorData.schedules.map((el) => {
                        return (
                          <div key={el.scheduleId}>
                            <Timebtn
                              fontSize="xl"
                              width="w-32"
                              height="h-11"
                              text={el.time}
                              value={time}
                              onClick={() => setTime(el.time)}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <div className="mb-6 font-bold text-2xl">멘티리스트</div>
                  <div className="card-layout w-[350px]">
                    {EachMentorData ? (
                      <>
                        {EachMentorData.schedules.map(
                          (el) =>
                            el.time === time && (
                              <div key={el.scheduleId}>
                                <MenteeListCard
                                  props={el.applies}
                                  time={time}
                                  key={el.scheduleId}
                                />
                                <div className="flex justify-around">
                                  <RegisterBtn
                                    width="w-1/3 min-w-[100px]"
                                    height="h-[50px]"
                                    fontSize="text-lg"
                                    disabled={MenteeList.length === 0}
                                    onClick={() => onPost(el.scheduleId, MenteeList)}
                                  />
                                  <button
                                    className="bg-purple text-white rounded text-lg h-[50px] w-1/3 mx-auto mt-3"
                                    onClick={() => onDelete(el.scheduleId)}
                                  >
                                    삭제하기
                                  </button>
                                </div>
                              </div>
                            )
                        )}
                      </>
                    ) : (
                      <div>시간을 선택해주세요</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </FeedbackLayout>
  );
};

export default MentorSchedule;
