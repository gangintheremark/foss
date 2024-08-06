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
import { getMentorSchedule } from '@/apis/register';
import { QUERY_KEY } from '@/constants/queryKey';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import Loading from '../common/Loading';
import ErrorCompo from '../common/ErrorCompo';
import { useMentorConfirm } from '@/hooks/apis/mutations/useMentorConfirm';
import MentorCancleBtn from './MentorCancleBtn';

const MentorSchedule = () => {
  const { EachMentorData, MenteeList, TotalMentorData } = useScheduleStore((state) => state.states);
  const { resetMenteeList, setTotalData, resetMentorData } = useScheduleStore(
    (state) => state.actions
  );
  const [time, setTime] = useState('');
  const [id, setId] = useState(-1);
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.MENTOR_CHECK(parseInt(dayjs().format('M'))),
    queryFn: () => getMentorSchedule(parseInt(dayjs().format('M'))),
  });
  const { mutate } = useMentorConfirm(id, MenteeList);
  useEffect(() => {
    if (data) {
      setTotalData(data);
    }
  }, [data, setTotalData]);
  useEffect(() => {
    resetMenteeList();
  }, [time]);
  if (error) {
    return (
      <>
        <ErrorCompo text="해당 정보를 찾을 수 없습니다" />
      </>
    );
  }
  const handleConfirm = async (scheduleId: number): Promise<void> => {
    await new Promise<void>((resolve) => {
      setId(scheduleId);
      resolve();
    });
    await mutate();
    setId(-1);
    resetMentorData();
    resetMenteeList();
    setTime('');
  };
  return (
    <FeedbackLayout>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="w-11/12">
              <Intro title="일정 확인하기" sub="일정을 확정짓거나 수정하세요." />
              <div className="w-full h-full flex gap-16 py-4">
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
                              width="w-28"
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
                  <div className="mb-3 font-bold text-lg">📌 멘티들을 선택 후 일정을 확정해주세요</div>
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
                                    width="w-1/3"
                                    height="h-[40px]"
                                    fontSize="text-lg"
                                    disabled={MenteeList.length === 0}
                                    onClick={() => handleConfirm(el.scheduleId)}
                                  />
                                  <MentorCancleBtn id={el.scheduleId} />
                                </div>
                              </div>
                            )
                        )}
                      </>
                    ) : (
                      <div className='text-center'>날짜와 시간을 선택해주세요</div>
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
