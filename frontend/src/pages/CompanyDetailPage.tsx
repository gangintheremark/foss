import Nav from '@/components/Header/NavComponent';
import { companies } from '@/constants/tmpCompanies';
import { useParams } from 'react-router-dom';
const CompanyDetailPage = () => {
  const { name } = useParams();

  const company = companies.find((company) => company.name === name);

  return (
    <div className="w-screen">
      <Nav />
      <div className="w-full absolute  top-[100px] ">
        <div className={`${company.backgroud_color} p-16`}>
          <div>{company.name}와/과 부담없이 foss 어떠세요?</div>
          <img
            src={company.imageUrl}
            alt={company.name}
            className="w-16 h-16 rounded-full object-cover border"
          />
          {company.backgroud_color}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
