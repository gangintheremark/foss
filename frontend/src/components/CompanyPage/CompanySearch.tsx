<<<<<<< HEAD
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
    companies,
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
      {isListVisible && companies.length > 0 && (
        <CompanyList
          companies={companies}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onSelectCompany={handleCompanySelect}
        />
      )}
=======
import { tmpCompanies } from '@/constants/tmpCompanies';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { choseongIncludes, hangulIncludes } from 'es-hangul';
import { Company } from '@/constants/tmpCompanies';

const CompanySearch = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const nav = useNavigate();

  const convertEnglishToLowerCase = (str: string) => {
    return str
      .split('')
      .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
      .join('');
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const newCompanies = tmpCompanies.filter((company) => {
      const convertedCompanyName = convertEnglishToLowerCase(company.name);
      const convertedInput = convertEnglishToLowerCase(input);

      if (!convertedInput) return false;

      return (
        choseongIncludes(convertedCompanyName, convertedInput) ||
        hangulIncludes(
          convertEnglishToLowerCase(convertedCompanyName),
          convertEnglishToLowerCase(convertedInput)
        )
      );
    });

    setCompanies(newCompanies.slice(0, 10));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, companies.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        nav(`/company/${companies[selectedIndex].name}`);
        break;
      case 'Escape':
        setCompanies([]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <input
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
      />
      {companies.map((company, index) => (
        <div
          className={`px-4 py-2 border-b last:border-b-0 cursor-pointer transition-colors duration-200 ease-in-out ${
            selectedIndex === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100'
          }`}
          key={company.id}
          onClick={() => nav(`/company/${company.name}`)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          {company.name}
        </div>
      ))}
>>>>>>> develop
    </div>
  );
};

export default CompanySearch;
