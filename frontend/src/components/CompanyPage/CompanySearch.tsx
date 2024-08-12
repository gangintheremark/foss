import React, { useState } from 'react';
import useCompanySearch from './CompanySearchUse';
import CompanyList from './CompanyList';

interface CompanySearchProps {
  onCompanySelect: (companyName: string) => void;
}

const CompanySearch: React.FC<CompanySearchProps> = ({ onCompanySelect }) => {
  const {
    selectedIndex,
    setSelectedIndex,
    curCompanies,
    onChangeInput,
    handleSelectCompany,
    selectedCompanyName,
    setSelectedCompanyName,
  } = useCompanySearch((companyName: string) => {
    setSelectedCompanyName(companyName);
    onCompanySelect(companyName);
  });

  const [isListVisible, setIsListVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e.target.value);
    setIsListVisible(true);
  };

  const handleInputClick = () => {
    if (selectedCompanyName) {
      onChangeInput(selectedCompanyName);
      setIsListVisible(true);
    }
  };

  const handleCompanySelect = (company: string) => {
    handleSelectCompany(company);
    onCompanySelect(company);
    setIsListVisible(false);
  };

  return (
    <div>
      <input
        className="block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={handleInputChange}
        onClick={handleInputClick}
        value={selectedCompanyName}
      />
      {isListVisible && curCompanies.length > 0 && (
        <CompanyList
          companies={curCompanies}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onSelectCompany={handleCompanySelect}
        />
      )}
    </div>
  );
};

export default CompanySearch;
