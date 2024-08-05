import React from 'react';
import Nav from '@/components/Header/NavComponent';
import CompanyNav from './CompanyNav';
import FeedbackLayout from '../Feedback/FeedbackLayout';
import CompanyCarousel from './CompanyCarousel'; // Import the new component

const CompanyView: React.FC = () => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="w-2/3 min-w-[960px] relative min-h-[500px] mx-auto my-0">
        <div className="flex flex-col items-center mt-20">
          <div className="w-full">
            <CompanyNav />
          </div>
        </div>
      </div>
      <CompanyCarousel />
    </>
  );
};

export default CompanyView;
