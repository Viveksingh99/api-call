// redux/slices/scheduleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface ScheduleState {
  scheduleResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  scheduleResult: null,
  loading: false,
  error: null,
};

// Define the type for the search parameters
interface ScheduleParams {
  ipAddress: string;
  currencyCode: string;
  searchCriteria: {
    paxInfo: { paxType: number; paxKey: string }[];
    journeyInfo: {
      journeyType: number;
      routeInfo: {
        depCity: string;
        arrCity: string;
        travelDate: string;
        schedule: { before: number; after: number };
      }[];
    };
    promoCode: string;
  };
  qsParams: { key: string; value: string }[];
  languageCode: string;
  paxInfoId: number;
  reservationType: number;
  userAgent: string;
  sid: string;
  browserInfo: {
    colorDepth: string;
    timeZoneOffset: string;
    screenHeight: string;
    screenWidth: string;
  };
}

export const fetchScheduleFlights = createAsyncThunk(
  'schedule/fetchScheduleFlights',
  async (scheduleParams: ScheduleParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const requestBody = {
      ...scheduleParams,
      token,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Search/schedule-flights`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScheduleFlights.fulfilled, (state, action: PayloadAction<any>) => {
        state.scheduleResult = action.payload;
        state.loading = false;
      })
      .addCase(fetchScheduleFlights.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default scheduleSlice.reducer;
