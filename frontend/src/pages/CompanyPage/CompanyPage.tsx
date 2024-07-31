import Nav from '@/components/Header/NavComponent';
import CompanyView from '@components/CompanyPage/CompanyView';

const CompanyPage = () => {
  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <CompanyView />
    </div>
  );
};

export default CompanyPage;
