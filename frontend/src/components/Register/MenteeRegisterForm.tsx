import Intro from '@components/common/Intro';
import { FILE_SIZE_MAX_LIMIT } from '@constants/todayRange';
import { useEffect, useState } from 'react';
import { IMenteeCalendar, TMenteeSchedule } from 'types/calendar';
import SmallCalendar from './SmallCalendar';
import Timebtn from '@components/common/Timebtn';
import RegisterBtn from '@components/common/RegisterBtn';
import MentorIntro from './MentorIntro';
import { MenTeeRegisterData } from '@/constants/testData';
import Folder from '../../assets/svg/mypage/document.svg?react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getMentorScheduleForMentee, postMenteeSchedule } from '@/apis/register';
import { MySwal } from '@/config/config';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import Loading from '../common/Loading';

const MenteeRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  const router = useNavigate();
  // 이거 추후에 zustand로 바꿀 것
  const [searchParams] = useSearchParams();
  const params = searchParams.get('mentorId');
  const mentorId = parseInt(params as string);
  useEffect(() => {
    if (!isMentor && (!params || isNaN(mentorId))) {
      router('/', { replace: true });
    }
  }, []);
  const [result, setResult] = useState<IMenteeCalendar<TMenteeSchedule> | undefined>();
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.MENTEE_REQ(mentorId),
    queryFn: () => getMentorScheduleForMentee(mentorId),
    enabled: !!params && !!mentorId,
  });
  const mentorInfo = data ? data.mentorInfo : MenTeeRegisterData.mentorInfo;
  const [time, setTime] = useState('');
  const [id, setId] = useState(0);
  // 이건 reducer 처리해서 알아서 할 것...
  const [fileText, setFileText] = useState<File>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) {
      return;
    }
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 50MB입니다. ');
      return;
    }
    setFileText(files);
  };
  const onPost = async (scheduleId: number) => {
    if (fileText && time !== '') {
      const data = await postMenteeSchedule(scheduleId, fileText);
      if (data?.status !== 200) {
        MySwal.fire({
          icon: 'error',
          title: '오류가 발생했습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        MySwal.fire({
          icon: 'success',
          title: '성공적으로 지원되었습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      router('/');
    } else {
      MySwal.fire('파일을 같이 첨부해주세요');
    }
  };
  if (error) {
    return <></>;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 미팅을 신청해보세요." />
      <div className="flex gap-12">
        <div className=" min-w-[432px] px-8 mr-4">
          <MentorIntro
            profileImg={mentorInfo.profileImg}
            selfProduce={mentorInfo.selfProduce}
            fileUrl={mentorInfo.fileUrl}
            name={mentorInfo.name}
            companyName={mentorInfo.companyName}
            department={mentorInfo.department}
          />
        </div>
        <div className="flex flex-col">
          <SmallCalendar
            result={result}
            setResult={setResult}
            setTime={setTime}
            isMentor={isMentor}
            isRegister={true}
            data={data}
          />
          <div className="mb-9 flex flex-col gap-3">
            <div className="flex gap-2 items-center text-[#B1B3B5]  text-sm">
              <Link to={mentorInfo.fileUrl} target="_blank">
                <Folder />
              </Link>
              포트폴리오
            </div>
            <div className="relative">
              <label htmlFor="file-upload">
                <div className="border-[1px] border-[#D5D7D9] border-solid rounded h-10 min-w-[435px] w-3/4 px-3 py-2 truncate">
                  {!fileText ? (
                    <>
                      <div className="absolute top-2 left-3 text-[#B1B3B5]">
                        이력서 & 자기소개 제출 <span className="text-red-700">*</span>
                      </div>
                    </>
                  ) : (
                    fileText.name
                  )}
                </div>
              </label>
              <input id="file-upload" type="file" name="file" onChange={onChange} />
            </div>
            <div className="text-sm text-[#B1B3B5]">
              * 포트폴리오를 다운 받아 작성해주십시오.
              <br />* 파일은 최대 50MB까지 업로드하실 수 있습니다.
            </div>
          </div>
          <div className="mb-16">
            <RegisterBtn
              width="w-3/4 min-w-[438px]"
              height="h-[50px]"
              fontSize="text-lg"
              onClick={result && result.schedules && id !== 0 ? () => onPost(id) : () => {}}
            />
          </div>
        </div>
        <div>
          {result &&
            result.schedules &&
            result.schedules.map((e) => {
              return (
                <div className="mb-4">
                  <Timebtn
                    fontSize="xl"
                    width="w-32"
                    height="h-11"
                    text={e.time}
                    value={time}
                    onClick={() => {
                      setTime(e.time);
                      setId(e.scheduleId);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MenteeRegisterForm;
