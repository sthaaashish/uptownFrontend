import React from "react";
import { baseUrl } from "../features/constant";
import FadeIn from "./FadeIn";

const Cards = ({ data, onClick }) => {
  return (
    <>
      <FadeIn delay={0.4} direction="up">
        <div
          className="relative flex flex-col items-center space-y-4 "
          onClick={onClick}
        >
          <div className=" overflow-hidden">
            <img
              src={data.image}
              alt="images"
              className="md:h-[350px] w-[400px] transition ease-in-out delay-150    hover:-translate-y-1 hover:scale-110  duration-300"
            />
          </div>
          <div className="absolute bottom-0 bg-white p-4 bg-opacity-50 text-center">
            <h5>{data.name}</h5>
            <p>{data.label}</p>
          </div>
        </div>
      </FadeIn>
    </>
  );
};

export default Cards;
