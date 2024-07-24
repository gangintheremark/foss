import Intro from '@components/common/Intro';
import { FILE_SIZE_MAX_LIMIT } from '@constants/todayRange';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TdayList } from 'types/calendar';
import SmallCalendar from './SmallCalendar';
import Timebtn from '@components/common/Timebtn';
import RegisterBtn from '@components/common/RegisterBtn';
import MentorIntro from './MentorIntro';

const MenteeRegisterForm = ({ isMentor }: { isMentor: boolean }) => {
  // 이거 추후에 zustand로 바꿀 것
  const [result, setResult] = useState<TdayList>({
    day: dayjs(Date()).format('YYYY-MM-DD'),
    time: [],
  });
  const [time, setTime] = useState('');
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
  return (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 미팅을 신청해보세요." />
      <div className="flex gap-12">
        <div className=" min-w-[432px] px-8 mr-4">
          {/* 여기 추후에 그... 데이터 받아서 업데이트 할 예정 */}
          <MentorIntro />
        </div>
        <div className="flex flex-col">
          <SmallCalendar
            result={result}
            setResult={setResult}
            setTime={setTime}
            isMentor={isMentor}
          />
          <div className="mb-9 flex flex-col gap-3">
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
              * 파일은 최대 50MB까지 업로드하실 수 있습니다.
            </div>
          </div>
          <div className="mb-16">
            <RegisterBtn width="w-3/4 min-w-[438px]" height="h-[50px]" fontSize="text-lg" />
          </div>
        </div>
        <div>
          {result.time.map((el) => {
            return (
              <div className="mb-4">
                <Timebtn
                  fontSize="xl"
                  width="w-32"
                  height="h-11"
                  text={el}
                  value={time}
                  onClick={() => setTime(el)}
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
