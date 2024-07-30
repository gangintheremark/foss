import FeedbackLayout from '../Feedback/FeedbackLayout';
import Bgblur from '../../assets/svg/mypage/MyPageRegisterBg.svg?react';
import Intro from '../common/Intro';
import SmallCalendar from '../Register/MyPageCalendar';
import { useState } from 'react';
import { useScheduleStore } from '@/store/schedule';
import MentorProfile from '../common/MentorProfile';

const MenteeSchedule = () => {
  const { EachMenteeData } = useScheduleStore((state) => state.states);
  const [time, setTime] = useState('');
  return (
    <FeedbackLayout>
      <Bgblur className="absolute bottom-0 left-0" />
      <div className="flex flex-col justify-center items-center">
        <div className="w-11/12">
          <Intro title="일정 확인하기" sub="일정을 확정짓거나 수정하세요." />
          <div className="w-full h-full flex gap-16 py-16">
            <div className="w-[460px] z-10">
              <SmallCalendar menteeResult={EachMenteeData} setTime={setTime} isMentor={false} />
            </div>
            <div>
              <div className="mb-6 font-bold text-2xl">멘티리스트</div>
              {EachMenteeData ? (
                <div className="w-full px-6 pt-2.5 pb-[12.5px] flex flex-col items-center gap-2.5">
                  {EachMenteeData.schedules.map((el) => (
                    <MentorProfile
                      key={el.scheduleId}
                      time={el.time}
                      mentorInfo={el.mentorInfo}
                      scheduleId={el.scheduleId}
                    />
                  ))}
                </div>
              ) : (
                <div>시간을 선택해주세요</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FeedbackLayout>
  );
};

export default MenteeSchedule;
