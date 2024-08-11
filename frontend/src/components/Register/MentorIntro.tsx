import { TMentorInfo, TCareerResponse } from '@/types/type';

type Props = {
  selfProduce: string;
  fileUrl: string;
  careers?: TCareerResponse[]; 
} & TMentorInfo;

const MentorIntro = (props: Props) => {
  console.log(props.careers);
  
  return (
    <>
      <div className="h-auto w-full flex flex-col gap-3 font-notoKR font-black text-[#929292]">
        <img src={props.profileImg} className="w-60 h-60 object-cover rounded-3xl" />
        <div className="text-base">{props.name}</div>
        <div className="text-3xl text-black">{props.companyName}</div>
        <div className="mb-2 text-base">{props.department}</div>
        <div className='text-sm text-black'>
          <table className="table-auto w-full text-left">
            <tbody>
              {(props.careers || []).map((career: TCareerResponse, index: number) => (
                <tr key={index}>
                  <td> <div className="h-2.5 w-2.5 rounded-full bg-main-color me-2"></div></td>
                  <td className="px-2 py-2">{career.companyName}</td>
                  <td className="px-2 py-2">{career.department}</td>
                  <td className="px-4 py-2">{career.startedDate} - {career.endedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-md text-gray-700" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: props.selfProduce }} />
        </div>
      
      </div>
    </>
  );
};

export default MentorIntro;
