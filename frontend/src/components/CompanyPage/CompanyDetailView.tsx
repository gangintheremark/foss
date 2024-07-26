import { useParams } from 'react-router-dom';

import Nav from '@/components/Header/NavComponent';
import { companies } from '@/constants/tmpCompanies';
import CompanyInfo from './CompanyInfo';
import MentorCardList from '@components/CompanyPage/MentorCardList';

const CompanyDetailPage = () => {
  const { name } = useParams();
  const company = companies.find((company) => company.name === name);

  return (
    <>
      <div>
        <Nav />
      </div>

      <div className="w-full absolute top-[100px]">
        <CompanyInfo {...company} />
      </div>

      <div className="absolute top-[400px]">
        <MentorCardList company={company.name} />
      </div>
    </>
  );
};

export default CompanyDetailPage;
