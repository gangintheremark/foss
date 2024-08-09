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
import ErrorCompo from '../common/ErrorCompo';
import { useScheduleStore } from '@/store/schedule';

const MenteeRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get('mentorId');
  const mentorId = parseInt(params as string);

  useEffect(() => {
    // 로컬 스토리지에서 이메일 확인 및 리디렉션 로직 추가
    const email = localStorage.getItem('user-storage-email');
    if (!email) {
      MySwal.fire({
        icon: 'warning',
        text: '이메일을 지정해주세요.',
        showConfirmButton: true,
      }).then(() => {
        router('/my-page'); // 마이페이지로 이동
      });
    } else if (!isMentor && (!params || isNaN(mentorId))) {
      router('/', { replace: true });
    }
  }, [isMentor, params, mentorId, router]);

  const [result, setResult] = useState<IMenteeCalendar<TMenteeSchedule> | undefined>();
  const { RegisterDayTime } = useScheduleStore((state) => state.states);
  const { data, error, isLoading } = useQuery({
    queryKey: QUERY_KEY.MENTEE_REQ(mentorId),
    queryFn: () => getMentorScheduleForMentee(mentorId),
    enabled: !!params && !!mentorId,
  });
  const mentorInfo = data ? data.mentorInfo : MenTeeRegisterData.mentorInfo;
  const [time, setTime] = useState(() => (RegisterDayTime.isCheck ? RegisterDayTime.time : ''));
  const [id, setId] = useState(() => (RegisterDayTime.isCheck ? RegisterDayTime.scheduleId : 0));
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
          text: '동일한 시간대에 신청하신 일정이 있습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        MySwal.fire({
          icon: 'success',
          text: '성공적으로 지원되었습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
        router('/register');
      }
    } else {
      MySwal.fire({
        icon: 'error',
        text: '파일을 같이 첨부해주세요.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (error) {
    return <ErrorCompo text="존재하지 않는 멘토입니다" />;
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
              <Link
                to="https://foss-bucket.s3.ap-northeast-2.amazonaws.com/7c59562c-d471-4857-a2dd-1d15c01d7d4b.docx"
                target="_blank"
              >
                <Folder />
              </Link>
              포트폴리오
            </div>
            <div className="relative">
              <label htmlFor="file-upload">
                <div className="border-[1px] border-[#D5D7D9] border-solid rounded h-10 min-w-[435px] w-3/4 px-3 py-2 truncate">
                  {!fileText ? (
                    <div className="absolute top-2 left-3 text-[#B1B3B5]">
                      이력서 & 자기소개 제출 <span className="text-red-700">*</span>
                    </div>
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
              text="등록하기"
              onClick={result && result.schedules && id !== 0 ? () => onPost(id) : () => {}}
            />
          </div>
        </div>
        <div>
          {result?.schedules?.map((e) => (
            <div key={e.scheduleId} className="mb-4">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MenteeRegisterForm;
