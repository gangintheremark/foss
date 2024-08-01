import Nav from '@/components/Header/NavComponent';
import CompanyNav from './CompanyNav';

const CompanyView = () => {
  return (
    <>
      <div>
        <Nav />
      </div>

      <div className="bg-[#4CCDC6] relative w-full absolute top-[100px] p-32"></div>

      <div className="relative absolute top-[200px] left-1/2 transform -translate-x-1/2 w-1/2">
        <CompanyNav />
      </div>

      <div className="absolute top-[800px]">
        경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계경계
      </div>
    </>
  );
};

export default CompanyView;
