import { tmpCompanies } from '@/constants/tmpCompanies';
import { Company } from '@/constants/tmpCompanies';
import { useParams } from 'react-router-dom';
import CompanyInfo from './CompanyInfo';
import MentorCardList from '@components/CompanyPage/MentorCardList';

const CompanyDetailView = () => {
  const { name } = useParams();

  const company: Company | any = tmpCompanies.find((company) => company.name === name);

  return (
    <>
      <div className="relative w-full absolute top-[100px]">
        <CompanyInfo {...company} />
      </div>

      <div className="relative absolute top-[100px]">
        <MentorCardList company={company.name} />
      </div>
    </>
  );
};

export default CompanyDetailView;
