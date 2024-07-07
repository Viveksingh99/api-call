// components/DirectionTwoComponent.tsx
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

interface DirectionTwoComponentProps {
  data: TransformedData[];
}

const DirectionTwoComponent: React.FC<DirectionTwoComponentProps> = ({ data }) => {
  return (
    <>
      <h1 className="text-center">2 Time</h1>
      <div className="flex text-center">
        {data.map((time, index) => {
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

export default DirectionTwoComponent;
