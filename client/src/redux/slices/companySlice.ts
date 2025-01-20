import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CompanyApis } from "@/services/CompanyApis";

// Initial state
const initialState: ICompanyState = {
  companies: [],
  totalCount: 0,
  loading: false,
  error: null,
  page: 1,
  size: 100,
  categoriesId: null,
};

// Fetch companies with pagination and filtering
export const fetchCompanies = createAsyncThunk<
  ICompanyResponse,
  { categoriesId: string; size?: number; page?: number },
  { state: RootState }
>(
  "companies/fetchCompanies",
  async ({ categoriesId, size = 100, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await CompanyApis.company_list({
        categoriesId,
        size,
        page,
      });
      console.log("response", response);
      return {
        metadata: response.data.metadata || [],
        totalCount: response.data.totalCount || 0,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch companies"
      );
    }
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoriesId = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<ICompanyResponse>) => {
          state.loading = false;
          state.error = null;
          state.totalCount = action.payload.totalCount;
          state.companies = action.payload.metadata;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategoryId, setPage, setSize } = companySlice.actions;
export default companySlice.reducer;
