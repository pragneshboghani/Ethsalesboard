import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CompanyApis } from "@/services/CompanyApis";

// Define types
interface DashboardData {
  _id: string;
  category: string;
  count: number;
  successCount: number;
  failureCount: number;
  noFieldCount: number;
  subcategory: string;
}

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

// Fetch dashboard data
export const fetchDashboardData = createAsyncThunk<
  DashboardData,
  void,
  { state: RootState }
>("dashboard/fetchDashboardData", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await CompanyApis.company_category_list();
    return response?.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch dashboard data"
    );
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (state, action: PayloadAction<DashboardData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
