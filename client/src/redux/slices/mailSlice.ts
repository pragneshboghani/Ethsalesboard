import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { MailApis } from "@/services/MailApis";
import { IMail } from "@/dto/mail";

interface MailState {
  data: IMail[]; // Supports multiple mail templates
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MailState = {
  data: [],
  loading: false,
  error: null,
};

// Fetch mail templates
type FetchMailTemplatesResponse = IMail[];

export const fetchMailTemplates = createAsyncThunk<
  FetchMailTemplatesResponse,
  void,
  { state: RootState }
>("mail/fetchMailTemplates", async (_, { rejectWithValue }) => {
  try {
    const response = await MailApis.get_mail_templates(); // Replace with your actual API call
    return response?.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch mail templates"
    );
  }
});

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addMailTemplate: (state, action: PayloadAction<IMail>) => {
      return {
        ...state,
        data: state.data ? [...state.data, action.payload] : [action.payload],
      };
    },
    updateMailTemplate: (state, action: PayloadAction<IMail>) => {
      console.log(action.payload._id);
      return {
        ...state,
        data: state.data
          ? state.data.map((item: IMail) =>
              item._id === action.payload._id ? action.payload : item
            )
          : [action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMailTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMailTemplates.fulfilled,
        (state, action: PayloadAction<FetchMailTemplatesResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMailTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMailTemplate, updateMailTemplate } = mailSlice.actions;

export default mailSlice.reducer;
