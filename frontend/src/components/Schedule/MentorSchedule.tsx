import { useState } from 'react';
import FeedbackLayout from '../Feedback/FeedbackLayout';
import SmallCalendar from '../Register/MyPageMentorCalendar';
import '../../styles/smallCalendarStyle.css';
import Intro from '../common/Intro';
import Timebtn from '../common/Timebtn';
import { useScheduleStore } from '@/store/schedule';

const MentorSchedule = () => {
  const { EachMentorData } = useScheduleStore((state) => state.states);
  const [time, setTime] = useState('');
  return (
    <FeedbackLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="w-11/12">
          <Intro title="일정 확인하기" sub="일정을 확정짓거나 수정하세요." />
          <div className="w-full h-full flex gap-16 py-16">
            <div className="w-[460px]">
              <SmallCalendar result={EachMentorData} setTime={setTime} isMentor={false} />
              <div className="flex gap-2 flex-wrap">
                {EachMentorData &&
                  EachMentorData.schedules.map((el) => {
                    return (
                      <div>
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
            <div>멘티리스트들 </div>
          </div>
        </div>
      </div>
    </FeedbackLayout>
  );
};

export default MentorSchedule;
