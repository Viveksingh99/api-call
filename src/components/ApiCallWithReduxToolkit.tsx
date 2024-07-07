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
      const searchParams = {
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

      dispatch(searchFlights(searchParams));
    }
  }, [dispatch, token]);
  console.log(searchResult, "searchResult");
  return (
    <>
      <div className="flex flex-wrap">
        {authLoading && <div>Fetching token...</div>}
        {searchLoading && <div>Searching flights...</div>}
        {authError && <div>Error fetching token: {authError}</div>}
        {searchError && <div>Error searching flights: {searchError}</div>}
        {searchResult?.availableFlights.map((item: any, index: any) => {
          return <div key={index}>
            {item.itinerary.flightDirection}
            <br/>
            {item.itinerary.flightKey}
            </div>;
        })}
      </div>
    </>
  );
};

export default ApiCallWithReduxToolkit;
