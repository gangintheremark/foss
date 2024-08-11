import { useState, useCallback } from 'react';
import { choseongIncludes, hangulIncludes } from 'es-hangul';
import { Company } from '@/constants/tmpCompanies';
import { tmpCompanies } from '@/constants/tmpCompanies';

const useCompanySearch = (onSelectCompany: (companyName: string) => void) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');

  const convertEnglishToLowerCase = (str: string): string => {
    return str
      .split('')
      .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
      .join('');
  };

  const onChangeInput = useCallback((input: string) => {
    setSelectedCompanyName(input);
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
  }, []);

  const handleSelectCompany = (companyName: string) => {
    onSelectCompany(companyName);
    setSelectedCompanyName(companyName);
    setCompanies([]);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    companies,
    onChangeInput,
    handleSelectCompany,
    selectedCompanyName,
    setSelectedCompanyName,
  };
};

export default useCompanySearch;
