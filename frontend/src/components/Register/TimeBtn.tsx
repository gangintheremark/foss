import { TdayList } from 'types/calendar';

interface Props {
  props: TdayList | undefined;
  value: string;
  setStateValue: React.Dispatch<React.SetStateAction<string>>;
}

const TimeBtn = (props: Props) => {
  return (
    <>
      {props.props ? (
        <div className="flex gap-4 flex-wrap">
          {props.props.time.map((el) => {
            return (
              <button
                className={`w-16 h-6 rounded border-gray border-solid border-[1px] 
                  ${el === props.value ? 'bg-main-color text-white' : 'bg-white'}
                  flex justify-center items-center text-xs font-medium 
                  hover:bg-main-hover-color active:bg-main-color-active`}
                key={el}
                onClick={() => props.setStateValue(el)}
              >
                {el}
              </button>
            );
          })}
        </div>
      ) : (
        <div>날짜를 선택해주세요</div>
      )}
    </>
  );
};

export default TimeBtn;
