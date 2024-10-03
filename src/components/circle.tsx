import React from 'react';

const Circle = ({ value }: { value: number | any }) => {

  let color;
  if (value < 0) {
    color = 'red';
  } else if (value < 30) {
    color = 'pink';
  } else if (value >= 30 && value < 50) {
    color = 'yellow';
  } else {
    color = 'green';
  }


  const rotateDirection = value < 0 ? `rotate(${180 + value * 1.8}deg)` : `rotate(0deg)`;

  return (
    <div className="relative w-16 h-16">
      <div className="absolute w-full h-full rounded-full border-4 border-gray-300 bg-transparent"></div>
      <div
        className="relative w-full h-full rounded-full"
        style={{
            background: `conic-gradient(${color} 0% ${Math.abs(value)}%, gray ${Math.abs(value)}% 100%)`,
            transform: rotateDirection, 
            padding: "2px", 
        }}
        >
        <div
            className="w-full h-full rounded-full"
            style={{
            background: "white", 
            }}
        ></div>
        </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-lg font-bold ${
            value < 0 ? 'text-red-600' : 'text-black'
          }`}
        >
          {value}%
        </span>
      </div>
    </div>
  );
};

export default Circle;
