import { TdayList } from 'types/calendar';

const TimeBtn = ({ props }: { props: TdayList | undefined }) => {
  return (
    <>
      {props ? (
        <div className="flex gap-2.5">
          {props.time.map((el) => {
            return (
              <button className="w-16 h-10 border-2" key={el}>
                {el}
              </button>
            );
          })}
        </div>
      ) : (
        <div>되는 날짜를 선택해주세요</div>
      )}
    </>
  );
};

export default TimeBtn;
