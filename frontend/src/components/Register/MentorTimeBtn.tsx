import Timebtn from '@components/common/Timebtn';
import { IMenteeCalendar } from 'types/calendar';


interface Props {
  props: IMenteeCalendar<string> | undefined;
  value: string;
  setStateValue: React.Dispatch<React.SetStateAction<string>>;
}

const MentorTimeBtn = (props: Props) => {
  // Helper function to determine if a time is in the morning
  const isMorning = (time: string) => {
    const hour = parseInt(time.split(':')[0], 10);
    return hour < 12;
  };

  const morningSchedules = props.props?.schedules.filter(isMorning) || [];
  const afternoonSchedules = props.props?.schedules.filter((time) => !isMorning(time)) || [];

  return (
    <>
      {props.props ? (
        <div className="space-y-4">
          <div>
            <h2>오전</h2>
            <div className="grid grid-cols-5 gap-4 mt-3">
              {morningSchedules.map((el) => (
                <Timebtn
                  width="w-16"
                  height="h-8"
                  fontSize="sm"
                  text={el}
                  key={el}
                  value={props.value}
                  onClick={() => props.setStateValue(el)}
                />
              ))}
            </div>
          </div>
          <div>
            <h2>오후</h2>
            <div className="grid grid-cols-5 gap-4 mt-3">
              {afternoonSchedules.map((el) => (
                <Timebtn
                  width="w-16"
                  height="h-8"
                  fontSize="sm"
                  text={el}
                  key={el}
                  value={props.value}
                  onClick={() => props.setStateValue(el)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>날짜를 선택해주세요</div>
      )}
    </>
  );
};

export default MentorTimeBtn;
