import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/connect`,
        {
          clientID: "zjg!7Vu#6t@4Eb!9y@9m",
          appKey: "c#ch*uf1DX!Zz4Gc#T@u4hT!A",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
