"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchToken } from "../../redux/slices/authSlice";
import { searchFlights } from "../../redux/slices/searchSlice";

const ApiCallWithReduxToolkit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    token,
    loading: authLoading,
    error: authError,
  } = useSelector((state: RootState) => state.auth);
  const {
    searchResult,
    loading: searchLoading,
    error: searchError,
  } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    // Fetch token on component mount
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    // Trigger searchFlights when token becomes available
    if (token) {
      dispatch(searchFlights());
    }
  }, [dispatch, token]);

  return (
    <>
      <div>simpleApiCall</div>
      {authLoading && <div>Fetching token...</div>}
      {searchLoading && <div>Searching flights...</div>}
      {authError && <div>Error fetching token: {authError}</div>}
      {searchError && <div>Error searching flights: {searchError}</div>}
      {searchResult && <div>Search Result: {JSON.stringify(searchResult)}</div>}
    </>
  );
};

export default ApiCallWithReduxToolkit;
