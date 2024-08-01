// import { tmpCompanies } from '@/constants/tmpCompanies';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { choseongIncludes, hangulIncludes } from 'es-hangul';
// import { Company } from '@/constants/tmpCompanies';

// const CompanySearch = () => {
//   const [selectedIndex, setSelectedIndex] = useState<number>(0);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const nav = useNavigate();

//   const convertEnglishToLowerCase = (str: string) => {
//     return str
//       .split('')
//       .map((char) => (/[A-Z]/.test(char) ? char.toLowerCase() : char))
//       .join('');
//   };

//   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value;

//     const newCompanies = tmpCompanies.filter((company) => {
//       const convertedCompanyName = convertEnglishToLowerCase(company.name);
//       const convertedInput = convertEnglishToLowerCase(input);

//       if (!convertedInput) return false;

//       return (
//         choseongIncludes(convertedCompanyName, convertedInput) ||
//         hangulIncludes(
//           convertEnglishToLowerCase(convertedCompanyName),
//           convertEnglishToLowerCase(convertedInput)
//         )
//       );
//     });

//     setCompanies(newCompanies.slice(0, 10));
//   };

//   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     switch (e.key) {
//       case 'ArrowDown':
//         e.preventDefault();
//         setSelectedIndex((prev) => Math.min(prev + 1, companies.length - 1));
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         setSelectedIndex((prev) => Math.max(prev - 1, 0));
//         break;
//       case 'Enter':
//         nav(`/company/${companies[selectedIndex].name}`);
//         break;
//       case 'Escape':
//         setCompanies([]);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div>
//       <input
//         className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         onChange={onChangeInput}
//         onKeyDown={onKeyDown}
//       />
//       {companies.map((company, index) => (
//         <div
//           className={`px-4 py-2 border-b last:border-b-0 cursor-pointer transition-colors duration-200 ease-in-out ${
//             selectedIndex === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100'
//           }`}
//           key={company.id}
//           onClick={() => nav(`/company/${company.name}`)}
//           onMouseEnter={() => setSelectedIndex(index)}
//         >
//           {company.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompanySearch;

import React from 'react';
import useCompanySearch from './CompanySearchUse';
import CompanyList from './CompanyList';
import { useNavigate } from 'react-router-dom';

const CompanyNav: React.FC = () => {
  const navigate = useNavigate();

  const handleCompanySelect = (companyName: string) => {
    navigate(`/company/${companyName}`);
  };

  const { selectedIndex, setSelectedIndex, companies, onChangeInput } =
    useCompanySearch(handleCompanySelect);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e.target.value);
  };

  return (
    <div>
      <input
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={handleInputChange}
      />
      <CompanyList
        companies={companies}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onSelectCompany={handleCompanySelect}
      />
    </div>
  );
};

export default CompanyNav;
