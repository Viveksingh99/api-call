import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const searchFlights = createAsyncThunk(
  'search/searchFlights',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    const requestBody = {
      token: null,
      ipAddress: "103.248.173.61",
      currencyCode: "EUR",
      searchCriteria: {
        paxInfo: [
          {
            paxType: 1,
            paxKey: "Adult1",
          },
        ],
        journeyInfo: {
          journeyType: 2,
          routeInfo: [
            { depCity: "EVN", arrCity: "BRU", travelDate: "2024-07-15" },

            { depCity: "BRU", arrCity: "EVN", travelDate: "2024-08-29" },
          ],
        },
        promoCode: "",
      },
      qsParams: [
        {
          key: "clickId",
          value: "your-value",
        },
      ],
      languageCode: "en-GB",
      paxInfoId: 0,
      reservationType: 0,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      sid: "d1cbe9ffd2a22694545917e242fca686ae3e23696775287731c8757337b203a4",
      browserInfo: {
        colorDepth: 24,
        timeZoneOffset: -330,
        screenHeight: 824,
        screenWidth: 1536,
      },
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
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.searchResult = action.payload;
        state.loading = false;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
