import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFlights } from "../../redux/slices/searchSlice";
import { RootState, AppDispatch } from "../../redux/store";

function InputField() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passenger: '',
    promoCode: ''
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event:any) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    // Transform formData to the shape your searchFlights action expects
    const searchParams = {
      ipAddress: "103.248.173.61",
      currencyCode: "EUR",
      searchCriteria: {
        paxInfo: [
          {
            paxType: 1,
            paxKey: formData.passenger,
          },
        ],
        journeyInfo: {
          journeyType: 2,
          routeInfo: [
            { depCity: formData.from, arrCity: formData.to, travelDate: formData.departureDate },
            { depCity: formData.to, arrCity: formData.from, travelDate: formData.returnDate },
          ],
        },
        promoCode: formData.promoCode,
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
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      sid: "d1cbe9ffd2a22694545917e242fca686ae3e23696775287731c8757337b203a4",
      browserInfo: {
        colorDepth: 24,
        timeZoneOffset: -330,
        screenHeight: 824,
        screenWidth: 1536,
      },
    };

    dispatch(searchFlights(searchParams));
  };

  const { searchResult, loading, error } = useSelector((state: RootState) => state.search);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <TextField 
            id="from" 
            label="From" 
            type="search" 
            value={formData.from} 
            onChange={handleChange} 
          />
          <span>🛫🛫</span>
          <TextField 
            id="to" 
            label="To" 
            type="search" 
            value={formData.to} 
            onChange={handleChange} 
          />
          <br />
          <TextField 
            id="departureDate" 
            label="Departure Date" 
            type="search" 
            value={formData.departureDate} 
            onChange={handleChange} 
          />
          🛫🛫
          <TextField 
            id="returnDate" 
            label="Return Date" 
            type="search" 
            value={formData.returnDate} 
            onChange={handleChange} 
          />
          <br/>
          <TextField 
            id="passenger" 
            label="Passenger" 
            type="search" 
            value={formData.passenger} 
            onChange={handleChange} 
          />
          🛫🛫
          <TextField 
            id="promoCode" 
            label="PromoCode" 
            type="search" 
            value={formData.promoCode} 
            onChange={handleChange} 
          />
          <br/>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div className="flex flex-wrap">
        {loading && <div>Searching flights...</div>}
        {error && <div>Error searching flights: {error}</div>}
        {searchResult && (
          <div>Search Result: {JSON.stringify(searchResult)}</div>
        )}
      </div>
    </>
  );
}

export default InputField;
