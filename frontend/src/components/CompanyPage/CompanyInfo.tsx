const CompanyInfo = ({ name, josa, imageUrl, backgroud_color, content1, content2 }) => {
  const formatContent = (content) => {
    return content.split('\n').map((str) => <div>{str}</div>);
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
          <div className="mx-4">
            {name}
            {josa} 부담없이 foss 어떠세요?
          </div>
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
