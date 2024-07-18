import Timebtn from '@components/common/Timebtn';
import { TdayList } from 'types/calendar';

interface Props {
  props: TdayList | undefined;
  value: string;
  setStateValue: React.Dispatch<React.SetStateAction<string>>;
}

const MentorTimeBtn = (props: Props) => {
  return (
    <>
      {props.props ? (
        <div className="flex gap-4 flex-wrap">
          {props.props.time.map((el) => {
            return (
              <Timebtn
                width="w-16"
                height="h-6"
                fontSize="xs"
                text={el}
                value={props.value}
                onClick={() => props.setStateValue(el)}
              />
            );
          })}
        </div>
      ) : (
        <div>날짜를 선택해주세요</div>
      )}
    </>
  );
};

export default MentorTimeBtn;
