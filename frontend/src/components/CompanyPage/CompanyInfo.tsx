// import { josa } from 'es-hangul';
// import { Company } from '@/constants/tmpCompanies';
import { Company } from '@/store/useCompanyStore';

const CompanyInfo: React.FC<Company> = ({ name, logoImg, backgroundColor, content1, content2 }) => {
  const formatContent = (content: string) => {
    return content.split('\n').map((str) => <div>{str}</div>);
  };

  // 영어 대문자를 전부 소문자로 바꿈
  // const convertEnglishToLowerCase = (str) => {
  //   return str
  //     .split('')
  //     .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
  //     .join('');
  // };

  // 마지막 글자가 한글이면 josa 함수 바로 적용
  // 마지막 글자가 영어면 받침이 있는 경우와 없는 경우 정규식으로 나눔
  // const putJosa = (str) => {
  //   const lastChar = convertEnglishToLowerCase(str[str.length - 1]);

  //   if (/^[l-n]$/.test(lastChar)) {
  //     return josa(str, '과/과');
  //   } else {
  //     return josa(str, '와/과');
  //   }
  // };

  return (
    <>
      <div className={`flex ${backgroundColor} px-8 pt-16 pb-10 mb-10`}>
        <img src={logoImg} alt={name} className="w-20 h-20 bg-white rounded-xl ml-16 mr-8" />
        <div className="flex flex-col text-white mx-4">
          <div className="font-bold text-4xl mb-5">{name}</div>
          <div className="rounded-xl w-3/4">
            <div>{formatContent(content1)}</div>
            <br />
            <div>{formatContent(content2)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
