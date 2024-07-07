// components/DirectionOneComponent.tsx
import React from "react";

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

interface DirectionOneComponentProps {
  data: TransformedData[];
}

const DirectionOneComponent: React.FC<DirectionOneComponentProps> = ({ data }) => {
  return (
    <>
      <h1 className="text-center">1 Time</h1>
      <div className="flex text-center mb-5">
        {data.map((time, index) => {
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
    </>
  );
};

export default DirectionOneComponent;
