import { useState, useCallback } from 'react';
import { choseongIncludes, hangulIncludes } from 'es-hangul';
// import { Company } from '@/constants/tmpCompanies';
// import { tmpCompanies } from '@/constants/tmpCompanies';
import { Company } from '@/store/useCompanyStore';
import useCompanyStore from '@/store/useCompanyStore';

const useCompanySearch = (onSelectCompany: (companyName: string) => void) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [curCompanies, setCurCompanies] = useState<Company[]>([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const { companies } = useCompanyStore();

  const convertEnglishToLowerCase = (str: string): string => {
    return str
      .split('')
      .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
      .join('');
  };

  const onChangeInput = useCallback((input: string) => {
    setSelectedCompanyName(input);
    const newCompanies = companies.filter((company) => {
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

    setCurCompanies(newCompanies.slice(0, 10));
  }, []);

  const handleSelectCompany = (companyName: string) => {
    onSelectCompany(companyName);
    setSelectedCompanyName(companyName);
    setCurCompanies([]);
  };

  return {
    selectedIndex,
    setSelectedIndex,
    curCompanies,
    onChangeInput,
    handleSelectCompany,
    selectedCompanyName,
    setSelectedCompanyName,
  };
};

export default useCompanySearch;
