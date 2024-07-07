import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import scheduleReducer from './slices/scheduleSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    schedule: scheduleReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
