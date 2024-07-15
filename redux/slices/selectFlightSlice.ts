import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface SelectFlightState {
  selectFlightResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: SelectFlightState = {
  selectFlightResult: null,
  loading: false,
  error: null,
};

interface SelectFlightParams {
  paxInfoId: number;
  languageCode: string;
  currency: string;
  flights: { flightOfferKey: string; cabinClass: string }[];
  discountInfo: null | {
    discountCode: string;
    programCode: string;
    programLevel: string;
    discountType: number;
  };
}

export const fetchSelectFlights = createAsyncThunk(
  'selectFlight/fetchSelectFlights',
  async (selectFlightParams: SelectFlightParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const requestBody = {
      ...selectFlightParams,
      token,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Search/select-flights`,
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

const selectFlightSlice = createSlice({
  name: 'selectFlight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectFlights.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectFlightResult = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelectFlights.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default selectFlightSlice.reducer;
