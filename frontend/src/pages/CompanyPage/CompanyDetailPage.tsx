import Nav from '@/components/Header/NavComponent';
import CompanyDetailView from '@components/CompanyPage/CompanyDetailView';

const CompanyDetailPage = () => {
  return (
    <div className="w-screen h-screen">
      <div>
        <Nav />
      </div>

      <CompanyDetailView />
    </div>
  );
};

export default CompanyDetailPage;
