import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Developer } from "@/dto/company";
import { DeveloperApis } from "@/services/DeveloperApis";

// Define API endpoints
const API_BASE_URL = "https://api.example.com/developers"; // Replace with your actual API

// Async thunks
export const fetchDevelopers = createAsyncThunk<
  Developer[],
  void,
  { state: RootState }
>("developers/fetchDevelopers", async (_, { rejectWithValue }) => {
  try {
    const response = await DeveloperApis.developer_list();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch developers"
    );
  }
});

export const addDeveloper = createAsyncThunk<
  Developer,
  Developer,
  { state: RootState }
>("developers/addDeveloper", async (developer, { rejectWithValue }) => {
  try {
    const response = await DeveloperApis.create_developer(developer);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to add developer");
  }
});

export const updateDeveloper = createAsyncThunk<
  Developer,
  { id: string; body: Developer },
  { state: RootState }
>("developers/updateDeveloper", async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await DeveloperApis.update_developer_put(id, body);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to update developer"
    );
  }
});

export const deleteDeveloper = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("developers/deleteDeveloper", async (email, { rejectWithValue }) => {
  try {
    // await axios.delete(`${API_BASE_URL}/${email}`);
    // return email;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to delete developer"
    );
  }
});

// Define the state
interface DeveloperState {
  developers: Developer[];
  activeDeveloper: Developer | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: DeveloperState = {
  developers: [],
  activeDeveloper: null,
  loading: false,
  error: null,
};

const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    setActiveDeveloper: (state, action: PayloadAction<Developer | null>) => {
      state.activeDeveloper = action.payload;
    },
    addDeveloperReducer: (state, action: PayloadAction<Developer>) => {
      state.developers.push(action.payload);
    },
    updateDeveloperReducer: (state, action: PayloadAction<Developer>) => {
      const index = state.developers.findIndex(
        (dev) => dev._id === action.payload._id
      );
      if (index >= 0) {
        state.developers[index] = action.payload;
      } else {
        state.developers.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDevelopers.fulfilled,
        (state, action: PayloadAction<Developer[]>) => {
          state.loading = false;
          state.developers = action.payload;
        }
      )
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        addDeveloper.fulfilled,
        (state, action: PayloadAction<Developer>) => {
          state.developers.unshift(action.payload);
        }
      )
      .addCase(
        updateDeveloper.fulfilled,
        (state, action: PayloadAction<Developer>) => {
          const index = state.developers.findIndex(
            (dev) => dev.email === action.payload.email
          );
          if (index !== -1) {
            state.developers[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteDeveloper.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.developers = state.developers.filter(
            (dev) => dev.email !== action.payload
          );
        }
      );
  },
});

export const {
  setActiveDeveloper,
  addDeveloperReducer,
  updateDeveloperReducer,
} = developerSlice.actions;
export default developerSlice.reducer;
