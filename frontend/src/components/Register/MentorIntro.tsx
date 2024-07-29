import { TMentorInfo } from '@/types/type';

type Props = {
  selfProduce: string;
  fileUrl: string;
} & TMentorInfo;

const MentorIntro = (props: Props) => {
  return (
    <>
      <div className="h-[213px] w-full flex flex-col gap-3 font-notoKR font-black text-[#929292]">
        <img
          src="https://media.istockphoto.com/id/1477509958/ko/%EC%82%AC%EC%A7%84/%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%AC%B8%EC%9D%98-%EB%98%90%EB%8A%94-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EB%A7%88%EC%BC%80%ED%8C%85-%EA%B0%9C%EB%85%90-%EA%B3%A0%EA%B0%9D-%EC%A7%80%EC%9B%90-%ED%95%AB%EB%9D%BC%EC%9D%B8-%EC%97%B0%EB%9D%BD%EC%B2%98-%EC%82%AC%EB%9E%8C%EB%93%A4-%EC%97%B0%EA%B2%B0-%ED%81%90%EB%B8%8C-%EB%82%98%EB%AC%B4-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%ED%99%94-%EC%A0%84%ED%99%94-%EC%A3%BC%EC%86%8C-%EC%B1%84%ED%8C%85-%EB%A9%94%EC%8B%9C%EC%A7%80-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84%EC%9D%B4-%EC%9E%88%EB%8A%94-%EB%B0%B0%EB%84%88%EC%9E%85%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=dv4p9BIvLU2MqYtmYNa1OxY8cI-J4VH09KtiXnHL_O4="
          className="w-full h-full object-cover"
        />
        <div className=" text-base">{props.name}</div>
        <div className="text-3xl text-black">{props.companyName}</div>
        <div className="mb-4 text-base ">{props.department}</div>
        <div className=" whitespace-pre-wrap font-bold text-sm">{props.selfProduce}</div>
      </div>
    </>
  );
};

export default MentorIntro;
