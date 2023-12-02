import {
  faFileLines,
  faLock,
  faPiggyBank,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from "../components/FadeIn";
import bg_2 from "../assets/bg_2.jpg";
import HeadingLine from "../components/HeadingLine";

const ServicesData = [
  {
    icon: faPiggyBank,
    heading: "No Down Payment",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    icon: faWallet,
    heading: "All Cash Offer",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    icon: faFileLines,
    heading: "Experts in Your Corner",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    icon: faLock,
    heading: "Locked in Pricing",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
];

export const Services = () => {
  return (
    <div className=" p-12 ">
      <div>
        <HeadingLine heading="Our Services" />
      </div>
      <div>
        <h1 className="text-4xl text-center">The smartest way to buy a home</h1>
        <div className="p-4  md:grid md:grid-cols-4">
          {ServicesData.map((service, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="up" fullWidth>
              <div className="text-center p-2">
                <FontAwesomeIcon
                  icon={service.icon}
                  size="4x"
                  className="mx-auto text-pink-400"
                />
                <h1 className="text-center mt-3 text-3xl ">
                  {service.heading}
                </h1>
                <p className="text-center">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

const OurServices = () => (
  <>
    <Services />
    <ServiceImage />
    <div className="p-4">
      Far far away, behind the word mountains, far from the countries Vokalia
      and Consonantia, there live the blind texts. Separated they live in
      Bookmarksgrove right at the coast of the Semantics, a large language
      ocean. A small river named Duden flows by their place and supplies it with
      the necessary regelialia. It is a paradisematic country, in which roasted
      parts of sentences fly into your mouth
    </div>
  </>
);
export default OurServices;

export const ServiceImage = () => (
  <>
    <div className="md:grid grid-cols-2 p-4">
      <div className="bg-black text-white text-center p-8 ">
        <div>
          <h1 className="text-pink-400">WORK fLOW</h1>
        </div>
        <h1 className="text-3xl">How it works</h1>

        <div className="md:grid grid-cols-2 justify-center items-center gap-4">
          {ImagesContent.map((data, index) => (
            <FadeIn delay={0.2} direction="up">
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-pink-400 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                  <span>{index + 1}</span>
                </div>
                <h1 className="text-xl">{data.label}</h1>
                <p className=" text-sm ">{data.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div>
        <img src={bg_2} alt="Background" />
      </div>
    </div>
  </>
);

const ImagesContent = [
  {
    label: "Evaluate Property",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    label: "Meet your Agent",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    label: "Close the Deal",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
  {
    label: "Have your Property",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
  },
];
