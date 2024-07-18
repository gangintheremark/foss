import { CalendarEvent } from 'types/calendar';
import UnCheck from '../../assets/svg/UnCheckbox.svg?react';
import Check from '../../assets/svg/Checkbox.svg?react';
import { useNavigate } from 'react-router-dom';

interface Props {
  events: CalendarEvent[];
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
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
          key={event.userId}
          className={`w-full px-6 pt-2.5 pb-[12.5px] flex items-center gap-2.5
        ${idx === props.value ? 'bg-purple-light' : 'white'}
        `}
        >
          <div
            onClick={() => {
              if (idx === props.value) {
                props.setValue(-1);
              } else {
                props.setValue(idx);
              }
            }}
          >
            {idx === props.value ? <Check /> : <UnCheck />}
          </div>
          <div className="w-[50px] h-[50px]">
            <img
              src="https://media.istockphoto.com/id/1477509958/ko/%EC%82%AC%EC%A7%84/%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%AC%B8%EC%9D%98-%EB%98%90%EB%8A%94-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EB%A7%88%EC%BC%80%ED%8C%85-%EA%B0%9C%EB%85%90-%EA%B3%A0%EA%B0%9D-%EC%A7%80%EC%9B%90-%ED%95%AB%EB%9D%BC%EC%9D%B8-%EC%97%B0%EB%9D%BD%EC%B2%98-%EC%82%AC%EB%9E%8C%EB%93%A4-%EC%97%B0%EA%B2%B0-%ED%81%90%EB%B8%8C-%EB%82%98%EB%AC%B4-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%ED%99%94-%EC%A0%84%ED%99%94-%EC%A3%BC%EC%86%8C-%EC%B1%84%ED%8C%85-%EB%A9%94%EC%8B%9C%EC%A7%80-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84%EC%9D%B4-%EC%9E%88%EB%8A%94-%EB%B0%B0%EB%84%88%EC%9E%85%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=dv4p9BIvLU2MqYtmYNa1OxY8cI-J4VH09KtiXnHL_O4="
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className=" text-lg font-medium">{event.title}</div>
            <div className=" text-base text-[#5A5D6C]">{event.desc}</div>
          </div>
        </div>
      ))}
      <div className=" flex justify-end w-full px-[12.5px] pt-[12.5px] border-t-[1px] border-t-gray">
        <button className="text-purple font-semibold" onClick={() => router('/register/mentee')}>
          선택
        </button>
      </div>
    </div>
  );
};
