"use client";
import axios from "axios";
import { useState } from "react";

const SimpleApiCall = () => {
  const [response, setResponse] = useState<any>(null);
  const [search, setsearch] = useState<any>(null);

  interface PaxInfo {
    paxType: number;
    paxKey: string;
  }

  interface RouteInfo {
    depCity: string;
    arrCity: string;
    travelDate: string;
    // schedule: {
    //   before: number;
    //   after: number;
    // };
  }

  interface JourneyInfo {
    journeyType: number;
    routeInfo: RouteInfo[];
  }

  interface SearchCriteria {
    paxInfo: PaxInfo[];
    journeyInfo: JourneyInfo;
    promoCode: string;
  }

  interface QsParam {
    key: string;
    value: string;
  }

  interface BrowserInfo {
    colorDepth: number;
    timeZoneOffset: number;
    screenHeight: number;
    screenWidth: number;
  }

  interface RequestBody {
    token: any;
    ipAddress: string;
    currencyCode: string;
    searchCriteria: SearchCriteria;
    qsParams: QsParam[];
    languageCode: string;
    paxInfoId: number;
    reservationType: number;
    userAgent: string;
    sid: string;
    browserInfo: BrowserInfo;
  }

  const handleSubmit = async () => {
    console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
    const requestBody = {
      clientID: "zjg!7Vu#6t@4Eb!9y@9m",
      appKey: "c#ch*uf1DX!Zz4Gc#T@u4hT!A",
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/connect`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = async () => {
    const requestBody: RequestBody = {
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
    const token = response.token;
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Search/search-flights`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${token}`,
          },
        }
      );

      setsearch(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(search);

  return (
    <>
      <div>simpleApiCall</div>
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <button onClick={handleSearch}>Search</button>
      {response && <div>Response: {JSON.stringify(response)}</div>}
    </>
  );
};

export default SimpleApiCall;
