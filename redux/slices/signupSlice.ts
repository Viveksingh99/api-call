import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface ProfileInfo {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  mobileNumber: string;
  emailAddress: string;
  password: string;
  mobileCode: string;
  isSubscribeNewsLetter: boolean;
}

interface SignupState {
  signupResult: any;
  loading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  signupResult: null,
  loading: false,
  error: null,
};

interface SignupParams {
  token: string;
  languageCode: string;
  profileInfo: ProfileInfo;
}

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (signupParams: SignupParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mock/profile/signup`,
        signupParams,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.signupResult = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default signupSlice.reducer;
