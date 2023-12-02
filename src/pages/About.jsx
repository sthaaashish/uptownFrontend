import React, { useEffect, useState } from "react";
import about from "../assets/about.jpg";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import TestimonalCards from "./TestimonalCards";
import HeadingLine from "../components/HeadingLine";

const NumberAnimated = ({ n }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? n : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.div ref={ref}>{number.to((n) => n.toFixed(0))}</animated.div>
  );
};

const About = () => {
  return (
    <div className="mx-auto p-4 md:p-12">
      <div className="grid md:grid-cols-2 gap-4 relative">
        <img src={about} />
        <div className="md:mt-0 mt-4">
          <h1>We Put People First.</h1>
          <p className="text-sm md:text-base ">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth. On her way she met a
            copy. The copy warned the Little Blind Text, that where it came from
            it would have been rewritten a thousand times and everything that
            was left from its origin would be the word "and" and the Little
            Blind Text should turn around and return to its own, safe country.
            But nothing the copy said could convince her and so it didn’t take
            long until a few insidious Copy Writers ambushed her, made her drunk
            with Longe and Parole and dragged her into their agency, where they
            abused her for their.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 text-xl gap-10 md:text-2xl ">
        <div className="flex flex-row items-center ">
          <strong className="text-4xl">
            <NumberAnimated n={305} />
          </strong>
          <span className="ml-2">
            Area <br /> Population
          </span>
        </div>
        <div className="flex flex-row items-center">
          <strong className="text-4xl">
            <NumberAnimated n={1090} />
          </strong>
          <span className="ml-2">
            Total
            <br />
            Properties
          </span>
        </div>
        <div className="flex flex-row items-center">
          <strong className="text-4xl">
            <NumberAnimated n={209} />
          </strong>
          <span className="ml-2">
            Average <br /> Houses
          </span>
        </div>
        <div className="flex flex-row items-center">
          <strong className="text-4xl">
            <NumberAnimated n={67} />
          </strong>
          <span className="ml-2">
            Total <br />
            Branches
          </span>
        </div>
      </div>
      <div className="mt-12">
        <div>
          <HeadingLine heading="TESTIMONAL" />
        </div>
        <h1 className="md:text-4xl text-center mt-6">Happy Clients</h1>

        <TestimonalCards />
      </div>
    </div>
  );
};

export default About;
