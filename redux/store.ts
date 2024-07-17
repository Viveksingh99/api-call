import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import scheduleReducer from './slices/scheduleSlice';
import selectFlightReducer from './slices/selectFlightSlice';
import signupReducer from './slices/signupSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    schedule: scheduleReducer,
    selectFlight: selectFlightReducer,
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
