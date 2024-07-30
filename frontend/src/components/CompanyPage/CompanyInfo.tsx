import { josa } from 'es-hangul';

const CompanyInfo = ({ name, imageUrl, backgroud_color, content1, content2 }) => {
  const formatContent = (content) => {
    return content.split('\n').map((str) => <div>{str}</div>);
  };

  // 영어 대문자를 전부 소문자로 바꿈
  const convertEnglishToLowerCase = (str) => {
    return str
      .split('')
      .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
      .join('');
  };

  // 마지막 글자가 한글이면 josa 함수 바로 적용
  // 마지막 글자가 영어면 받침이 있는 경우와 없는 경우 정규식으로 나눔
  const putJosa = (str) => {
    const lastChar = convertEnglishToLowerCase(str[str.length - 1]);

    if (/^[l-n]$/.test(lastChar)) {
      return josa(str, '과/과');
    } else {
      return josa(str, '와/과');
    }
  };

  return (
    <>
      <div className={`flex ${backgroud_color} px-8 pt-16 pb-32`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 bg-white border rounded-xl ml-16 mr-8"
        />
        <div className="flex flex-col text-white">
          <div className="font-bold text-4xl mx-4 mb-4">{name}</div>
          <div className="mx-4">{putJosa(name)} 부담없이 foss 어떠세요?</div>
        </div>
      </div>
      <div className="border rounded-xl shadow-xl m-24 p-16">
        <div>{formatContent(content1)}</div>
        <br />
        <div>{formatContent(content2)}</div>
      </div>
    </>
  );
};

export default CompanyInfo;
