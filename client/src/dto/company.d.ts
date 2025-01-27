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
  _id: any;
  metadata: ICompany[];
  totalCount: number;
}

export interface Developer {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileCode: string;
  mobileNumber: string;
  currentPosition: string;
  expeditedSalary: string;
  education?: Education[];
  experience?: Experience[];
  profile?: Profile[];
  documents?: IDocuments;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description?: string;
  salary?: string;
  resignationDate?: string;
  resignReason?: string;
  noticePeriod?: string;
}

export interface Profile {
  fileName: string;
  fileURL: string;
}

export interface IDocument {
  _id: string;
  developerId: string;
  docPath: string;
  docCategory: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDocuments {
  CERTIFICATES: Array<IDocument>;
  RESUME: Array<IDocument>;
  COLLAGE_DOC: Array<IDocument>;
  PAST_COMPANY_DOCS: Array<IDocument>;
  PERSONAL_DOC: Array<IDocument>;
  COVER_LETTER: Array<IDocument>;
}
