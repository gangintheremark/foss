import { CalendarEvent } from 'types/calendar';
import UnCheck from '../../assets/svg/UnCheckbox.svg?react';
import Check from '../../assets/svg/Checkbox.svg?react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  events: CalendarEvent[];
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  mentorId: number;
  setMentorId: React.Dispatch<React.SetStateAction<number>>;
}

export const EventList = (props: Props) => {
  const router = useNavigate();
  // 여기서 zustand로 선택한 사람들 담게 하고.. 아니면 초기화를 시키고..
  // BigCalendar에서 날짜가 바뀌면 또 reset되는 거 만들기
  return (
    <div
      className="w-full py-3 rounded-md border-[1px] border-gray border-solid shadow-toggle
    "
    >
      <div className="px-6 pb-[12.5px]">선택</div>
      {props.events.map((event, idx) => (
        <div
          key={event.mentorId}
          className={`w-full px-6 pt-2.5 pb-[12.5px] flex items-center gap-2.5
        ${idx === props.value ? 'bg-main-color-light' : 'white'}
        `}
        >
          <div
            onClick={() => {
              if (idx === props.value) {
                props.setValue(-1);
                props.setMentorId(0);
              } else {
                props.setValue(idx);
                props.setMentorId(event.mentorId);
              }
            }}
          >
            {idx === props.value ? <Check /> : <UnCheck />}
          </div>
          <div className="w-[50px] h-[50px]">
            <img src={event.profileImg} className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="w-3/4">
            <div className=" font-medium flex justify-between items-center">
              <div className="text-lg">{event.title}</div>
              <div className="text-base">{dayjs(event.start).format('HH : mm')}</div>
            </div>
            <div className=" text-base text-[#5A5D6C]">{event.desc}</div>
            <div className=" text-sm text-[#5A5D6C]">{event.applicantCount}명 지원</div>
          </div>
        </div>
      ))}
      <div className=" flex justify-end w-full px-[12.5px] pt-[12.5px] border-t-[1px] border-t-gray">
        <button
          className="text-main-color-active font-semibold"
          onClick={
            props.mentorId !== 0
              ? () => router(`/register/mentee?mentorId=${props.mentorId}`)
              : () => {
                  alert('멘토를 선택해주세요');
                }
          }
        >
          선택
        </button>
      </div>
    </div>
  );
};
