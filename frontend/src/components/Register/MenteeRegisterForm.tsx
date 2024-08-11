import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Intro from '@components/common/Intro';
import { FILE_SIZE_MAX_LIMIT } from '@constants/todayRange';
import { IMenteeCalendar, TMenteeSchedule } from 'types/calendar';
import SmallCalendar from './SmallCalendar';
import Timebtn from '@components/common/Timebtn';
import RegisterBtn from '@components/common/RegisterBtn';
import MentorIntro from './MentorIntro';
import { MenTeeRegisterData } from '@/constants/testData';
import { FaDownload } from 'react-icons/fa'; // react-icons에서 다운로드 아이콘 불러오기
import { getMentorScheduleForMentee, postMenteeSchedule } from '@/apis/register';
import { MySwal } from '@/config/config';
import Loading from '../common/Loading';
import ErrorCompo from '../common/ErrorCompo';
import { useScheduleStore } from '@/store/schedule';
import useUserStore from '@/store/useUserStore';
import { QUERY_KEY } from '@/constants/queryKey';

const MenteeRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get('mentorId');
  const mentorId = parseInt(params as string);

  const email = useUserStore((state) => state.email);
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    if (!email) {
      MySwal.fire({
        icon: 'warning',
        text: '이메일이 필요합니다. 이메일 설정 후 다시 시도해주세요.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router('/my-page');
      });
    }
  }, [email, router]);

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

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(files.type)) {
      target.value = '';
      MySwal.fire({
        html: `<b>PDF 또는 DOCX 파일만 업로드 가능합니다.</b>`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: '확인',
      });
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
    if (role === 'MENTOR') {
      MySwal.fire({
        icon: 'warning',
        text: '멘토는 면접을 신청할 수 없습니다.',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        router('/');
      });
    } else if (fileText && time !== '') {
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

  if (error || mentorId === 0) {
    return <ErrorCompo text="존재하지 않는 멘토입니다" />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 미팅을 신청해보세요." />
      <div className="flex w-full">
        <div className="min-w-[432px] max-w-[532px] px-8 mr-12">
          <MentorIntro
            profileImg={mentorInfo.profileImg}
            selfProduce={mentorInfo.selfProduce}
            fileUrl={mentorInfo.fileUrl}
            name={mentorInfo.name}
            companyName={mentorInfo.companyName}
            department={mentorInfo.department}
            careers={mentorInfo.careers}
          />
        </div>
        <div className="flex flex-col mr-8">
          {data?.scheduleInfos.length === 0 && (
            <div className="bg-red-100 text-red-500 mb-4 p-4 rounded-2xl text-center">
              해당 멘토가 등록한 일정은 아직 없습니다.
            </div>
          )}
          <SmallCalendar
            result={result}
            setResult={setResult}
            setTime={setTime}
            isMentor={isMentor}
            isRegister={true}
            data={data}
          />
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center text-[#B1B3B5] text-sm">
              <Link
                to="https://foss-bucket.s3.ap-northeast-2.amazonaws.com/7c59562c-d471-4857-a2dd-1d15c01d7d4b.docx"
                target="_blank"
              >
                <FaDownload /> {/* React 아이콘 사용 */}
              </Link>
              이력서 및 자기소개서 양식 다운받기
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
              <input
                id="file-upload"
                type="file"
                name="file"
                accept=".pdf, .docx"
                onChange={onChange}
              />
            </div>
            <div className="text-sm text-[#B1B3B5]">
              * 파일은 최대 50MB까지 업로드하실 수 있습니다.
              <br />* pdf 또는 docx 파일만 업로드하실 수 있습니다.
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
        <div className="w-32 h-screen">
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
