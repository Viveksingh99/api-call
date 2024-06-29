import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface SearchState {
  searchResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchResult: null,
  loading: false,
  error: null,
};

// Define the type for the search parameters
interface SearchParams {
  ipAddress: string;
  currencyCode: string;
  searchCriteria: any;
  qsParams: any[];
  languageCode: string;
  paxInfoId: number;
  reservationType: number;
  userAgent: string;
  sid: string;
  browserInfo: any;
}

export const searchFlights = createAsyncThunk(
  'search/searchFlights',
  async (searchParams: SearchParams, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const requestBody = {
      ...searchParams,
      token,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Search/search-flights`,
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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action: PayloadAction<any>) => {
        state.searchResult = action.payload;
        state.loading = false;
      })
      .addCase(searchFlights.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
