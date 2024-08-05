import { tmpCompanies } from '@/constants/tmpCompanies';
import { Company } from '@/constants/tmpCompanies';
import { useParams } from 'react-router-dom';
import CompanyInfo from './CompanyInfo';
import MentorCardList from '@components/CompanyPage/MentorCardList';
import Intro from '../common/Intro';

const CompanyDetailView = () => {
  const { name } = useParams();

  const company: Company | any = tmpCompanies.find((company) => company.name === name);

  return (
    <>
      <div className="relative w-full absolute top-[100px]">
        <CompanyInfo {...company} />
      </div>

      <div className="relative w-full absolute top-[100px] ml-20">
        <Intro title={`${company.name}에 다니는 멘토 리스트`} sub='관심있는 멘토의 일정에 신청해보세요' />
      </div>


      <div className="relative absolute top-[100px]">
        <MentorCardList company={company.name} />
      </div>
    </>
  );
};

export default CompanyDetailView;
