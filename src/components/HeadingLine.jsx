
import React from 'react';

const HeadingLine = ({ heading }) => {
  return (
    <div className="relative  text-center">
      <div className="absolute left-1/2 transform md:-translate-x-1/2 top-1/2 w-1/4 md:w-1/4  h-0.5 bg-pink-500"></div>
      <h2 className="inline-block bg-white text-pink-500 px-4 relative z-10">
        {heading}
      </h2>
      <div className="absolute right-1/2 transform md:translate-x-1/2 top-1/2 w-1/4 md:w-1/6  h-0.5 bg-pink-500"></div>
    </div>
  );
};

export default HeadingLine;

