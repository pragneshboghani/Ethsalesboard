// Define types
interface ICategory {
  category: string;
  subcategory: string;
}

interface ICompany {
  index: number;
  categoriesId: string;
  page: number;
  companyName: string;
  totalEarning: string;
  hrRate: string;
  employees: string;
  location: string;
  LinkedIn: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  address: string;
  website: string;
  phone_number: string;
  business: string;
  Tel: string[];
  mail: string[];
  isMailSend: boolean;
  isError: boolean;
  errorMessage?: string;
  categoriesIds: string[];
  categories: ICategory[];
}

interface ICompanyState {
  companies: ICompany[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  page: number;
  size: number;
  categoriesId: string | null;
}
interface ICompanyResponse {
  metadata: ICompany[];
  totalCount: number;
}
