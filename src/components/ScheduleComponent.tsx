"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchToken } from "../../redux/slices/authSlice";
import { fetchScheduleFlights } from "../../redux/slices/scheduleSlice";

const ScheduleComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    token,
    loading: authLoading,
    error: authError,
  } = useSelector((state: RootState) => state.auth);
  const {
    scheduleResult,
    loading: scheduleLoading,
    error: scheduleError,
  } = useSelector((state: RootState) => state.schedule);

  interface Day {
    price: string;
    date: string;
    isLowestPrice: boolean;
    isFlightAvailable: boolean;
    isSoldOut: boolean;
  }

  interface Month {
    month: string;
    days: Day[];
  }

  interface FlightSchedule {
    direction: number;
    year: string;
    currency: string;
    month: Month[];
  }

  interface ApiResponse {
    token: string | null;
    flightSchedule: FlightSchedule[];
    result: {
      isSuccess: boolean;
      msgs: string | null;
    };
  }

  // Define type for transformed data
  interface TransformedData {
    direction: number;
    year: string;
    month: string;
    day: string;
    isLowestPrice: boolean;
    isFlightAvailable: boolean;
    isSoldOut: boolean;
    price: string;
  }

  useEffect(() => {
    // Fetch token on component mount
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    // Trigger fetchScheduleFlights when token becomes available
    if (token) {
      const scheduleParams = {
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
              {
                depCity: "EVN",
                arrCity: "BRU",
                travelDate: "2024-08-29",
                schedule: { before: 5, after: 5 },
              },
              {
                depCity: "BRU",
                arrCity: "EVN",
                travelDate: "2024-09-29",
                schedule: { before: 5, after: 5 },
              },
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
          colorDepth: "24",
          timeZoneOffset: "-330",
          screenHeight: "824",
          screenWidth: "1536",
        },
      };

      dispatch(fetchScheduleFlights(scheduleParams));
    }
  }, [dispatch, token]);

  // Function to transform the API response
  const transformFlightSchedule = (
    flightSchedule: FlightSchedule[]
  ): TransformedData[] => {
    const transformedData: TransformedData[] = [];

    flightSchedule?.forEach((schedule) => {
      const { direction, year, month } = schedule;

      month.forEach((monthData) => {
        const { month, days } = monthData;

        days.forEach((day) => {
          const { price, date, isLowestPrice, isFlightAvailable, isSoldOut } =
            day;

          transformedData.push({
            direction,
            year,
            month,
            day: date,
            price,
            isLowestPrice,
            isFlightAvailable,
            isSoldOut,
          });
        });
      });
    });

    return transformedData;
  };

  const transformedData = transformFlightSchedule(
    scheduleResult?.flightSchedule
  );

  return (
    <>
      <h1 className="text-center">1 Time</h1>
      <div className="flex text-center mb-5">
        {transformedData?.map((time, index) => {
          return time.direction === 1 ? (
            <div key={index}>
              <h1>{time.price}</h1>
              <h1>
                📅{time.year}-{time.month}-{time.day}
              </h1>
            </div>
          ) : null;
        })}
      </div>
      <h1 className="text-center">2 Time</h1>
      <div className="flex text-center">
        {transformedData?.map((time, index) => {
          return time.direction === 2 ? (
            <div key={index}>
              <h1>{time.price}</h1>
              <h1>
                📅{time.year}-{time.month}-{time.day}
              </h1>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};

export default ScheduleComponent;
