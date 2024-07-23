const CompanyInfo = ({ name, imageUrl, backgroud_color }) => {
  return (
    <div className={`${backgroud_color} p-16`}>
      <div>{name}와/과 부담없이 foss 어떠세요?</div>
      <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full object-cover border" />
      <div>{backgroud_color}</div>
    </div>
  );
};

export default CompanyInfo;
