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

const MentorSchedule = () => {
  const { EachMentorData, MenteeList } = useScheduleStore((state) => state.states);
  const { resetMenteeList } = useScheduleStore((state) => state.actions);
  const [time, setTime] = useState('');
  useEffect(() => {
    resetMenteeList();
  }, [time]);
  return (
    <FeedbackLayout>
      <Bgblur className="absolute bottom-0 left-0" />
      <div className="flex flex-col justify-center items-center">
        <div className="w-11/12">
          <Intro title="일정 확인하기" sub="일정을 확정짓거나 수정하세요." />
          <div className="w-full h-full flex gap-16 py-16">
            <div className="w-[460px] z-10">
              <SmallCalendar result={EachMentorData} setTime={setTime} isMentor={true} />
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
                    {EachMentorData.schedules.map((el) => (
                      <MenteeListCard props={el} time={time} key={el.scheduleId} />
                    ))}
                    <div className="flex justify-around">
                      <RegisterBtn
                        width="w-1/3 min-w-[100px]"
                        height="h-[50px]"
                        fontSize="text-lg"
                        disabled={MenteeList.length === 0}
                      />
                      <button
                        className="bg-purple text-white rounded text-lg h-[50px] w-1/3 mx-auto mt-3"
                        onClick={() => alert('일정 취소하는 버튼')}
                      >
                        삭제하기
                      </button>
                    </div>
                  </>
                ) : (
                  <div>시간을 선택해주세요</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeedbackLayout>
  );
};

export default MentorSchedule;
