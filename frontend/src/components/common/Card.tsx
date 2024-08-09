import { ICard } from 'types/type';
// 리뷰랑 피드백 카드 레이아웃 비슷한 것끼리 묶음 (나의 리뷰 카드는 따로 빼둔 것으로 스타일 적용하시면 됩니다.)
const Card = (props: ICard) => {
  return (
    <div onClick={props.onClick} className="card-layout w-72 h-70 cursor-pointer">
      {props.children}
      <div className="flex items-center gap-1.5 mt-4">
        <div className="w-[55px] h-[55px]">
          <img src={props.profileImg} className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="font-bold">
          <div className="text-sm font-bold">{props.name}</div>
          <div className="text-xs text-[rgba(28,31,41,0.64)]">{props.companyName}</div>
          <div className="text-xs text-[rgba(28,31,41,0.64)] font-normal">{props.department}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
