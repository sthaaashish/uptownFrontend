import React from "react";
import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";
import team3 from "../assets/team-3.jpg";
import team4 from "../assets/team-4.jpg";
import team5 from "../assets/team-5.jpg";
import team6 from "../assets/team-6.jpg";
import team7 from "../assets/team-7.jpg";
import team8 from "../assets/team-8.jpg";
import HeadingLine from "../components/HeadingLine";
import FadeIn from "../components/FadeIn";

const agents = [
  { image: team1, name: "James Stallon", label: "20 properties " },
  { image: team2, name: "James Stallon", label: "10 properties " },
  { image: team3, name: "James Stallon", label: "4 properties" },
  { image: team4, name: "James Stallon", label: "13 properties " },
  { image: team5, name: "James Stallon", label: "21 properties" },
  { image: team6, name: "James Stallon", label: "11 properties " },
  { image: team7, name: "James Stallon", label: "12 properties" },
  { image: team8, name: "James Stallon", label: "5properties" },
];

const Cards = ({ data, onClick,index }) => {
  return (
    <>
     
        <div
          className="relative flex flex-col items-center space-y-4 "
          onClick={onClick}
        >
           <FadeIn delay={index * 0.2} direction="up">
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
          </FadeIn>
        </div>
     
    </>
  );
};

const Agents = () => {
  return (
    <div className="mt-6 p-12">
      <div className="md:grid grid-cols-4 space-y-4 gap-4">
        {agents.map((agent, index) => (
          <>
            <Cards index={index} data={agent} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Agents;

export const HomeAgents = () => (
  <>
    <div className="mt-6">
      <div>
        <HeadingLine heading="AGENTS" />
      </div>
      <h1 className="text-4xl text-center p-4">Our Agents</h1>
    </div>
    <div className="md:grid grid-cols-4 gap-4 space-y-4 p-12">
      {agents.slice(0, 4).map((agent, index) => (
        <>
          <Cards key={index} data={agent} />
        </>
      ))}
    </div>
  </>
);
