import { TMentorInfo } from '@/types/type';

type Props = {
  selfProduce: string;
  fileUrl: string;
} & TMentorInfo;

const MentorIntro = (props: Props) => {
  return (
    <>
      <div className="h-[213px] w-full flex flex-col gap-3 font-notoKR font-black text-[#929292]">
        <img src={props.profileImg} className="w-full h-full object-cover" />
        <div className="text-base">{props.name}</div>
        <div className="text-3xl text-black">{props.companyName}</div>
        <div className="mb-4 text-base">{props.department}</div>
        <div className="whitespace-pre-wrap font-bold text-sm" dangerouslySetInnerHTML={{ __html: props.selfProduce?.replace(/\n/g, '<br>') }} />
      </div>

    </>
  );
};

export default MentorIntro;
