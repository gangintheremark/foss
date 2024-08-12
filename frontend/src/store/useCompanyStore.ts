import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Company {
  id: number;
  name: string;
  logoImg: string;
  backgroundColor: string;
  content1: string;
  content2: string;
}

interface CompanyState {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  clearCompanies: () => void;
}

const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      companies: [],
      setCompanies: (companies: Company[]) => set({ companies }),
      clearCompanies: () => set({ companies: [] }),
    }),
    {
      name: 'company-storage',
    }
  )
);

export default useCompanyStore;
