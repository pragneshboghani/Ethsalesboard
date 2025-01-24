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


export interface IDeveloper {
  _id: string
  firstName: string
  lastName: string
  email: string
  mobileCode: string
  mobileNumber: string
  education: IEducation[]
  experience: IExperience[]
  profile: IProfile[]
  status: string
  createdAt: string
  updatedAt: string
  __v: number
  currentPosition: string
  expeditedSalary: string
}

export interface IEducation {
  instituteName: string
  degree: string
  fieldOfStudy: string
  startYear: string
  endYear: string
  _id: string
}

export interface IExperience {
  companyName: string
  jobTitle: string
  startDate: string
  endDate: string
  description: string
  _id: string
}

export interface IProfile {
  fileName: string
  fileURL: string
  _id: string
}
