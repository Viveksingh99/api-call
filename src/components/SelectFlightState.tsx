// components/SelectFlightComponent.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchToken } from "../../redux/slices/authSlice";
import { fetchSelectFlights } from "../../redux/slices/selectFlightSlice";

const SelectFlightComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    token,
    loading: authLoading,
    error: authError,
  } = useSelector((state: RootState) => state.auth);
  const {
    selectFlightResult,
    loading: selectFlightLoading,
    error: selectFlightError,
  } = useSelector((state: RootState) => state.selectFlight);

  useEffect(() => {
    // Trigger fetchSelectFlights when token becomes available
    if (token) {
      const selectFlightParams = {
        paxInfoId: 0,
        languageCode: "en-GB",
        currency: "EUR",
        flights: [
          { flightOfferKey: "BO_1_FL_2_FG_1", cabinClass: "ST" },
          { flightOfferKey: "BO_2_FL_4_FG_1", cabinClass: "ST" },
        ],
        discountInfo: {
          discountCode: "",
          programCode: "",
          programLevel: "",
          discountType: 0,
        },
      };

      dispatch(fetchSelectFlights(selectFlightParams));
    }
  }, [dispatch, token]);
  console.log(token, "token");
  console.log(selectFlightResult, "selectFlightResult");
  return (
    <>
      <div>SelectFlightComponent</div>
      {authLoading && <div>Fetching token...</div>}
      {selectFlightLoading && <div>Selecting flights...</div>}
      {authError && <div>Error fetching token: {authError}</div>}
      {selectFlightError && (
        <div>Error selecting flights: {selectFlightError}</div>
      )}
      {selectFlightResult && (
        <div>Select Flight Result: {JSON.stringify(selectFlightResult)}</div>
      )}
    </>
  );
};

export default SelectFlightComponent;
