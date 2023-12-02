import React from "react";
import About from "./About";
import { HomeAgents } from "./Agents";
import { HomeBlogs } from "./Blog";
import { ServiceImage, Services } from "./OurServices";
import Properties, { HomeProperties } from "./Properties";

const Home = () => {
  return (
    <div>
      <Services/>
      <HomeProperties />
      <ServiceImage/>
      <About />
      <HomeAgents />
      <HomeBlogs />
    </div>
  );
};

export default Home;
