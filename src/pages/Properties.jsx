import { faBathtub, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import HeadingLine from "../components/HeadingLine";
import Loading from "../components/Loading";
import { CircularPagination } from "../components/Pagination";
import { useGetAllPropertiesQuery } from "../features/Api";
import { baseUrl } from "../features/constant";

const Properties = () => {
  const nav = useNavigate();
  const { data, isLoading } = useGetAllPropertiesQuery();

 if(isLoading){
  return<Loading/>
 }
  return (
    <>
      <FadeIn delay={0.2} direction={"up"}>
        <div className=" p-12 md:grid grid-cols-3 ">
          {data &&
            data.map((propertyData) => (
              <>
                <div
                  key={propertyData._id}
                  onClick={() => nav(`/propertiesDetails/${propertyData._id}`)}
                  className="m-4"
                >
                  <div className="relative flex flex-col justify-center">
                    <div className="">
                      <img
                        src={`${baseUrl}${propertyData.image}`}
                        className="w-[400px]  h-[300px]"
                      />
                    </div>
                    <div className="bg-white h-[100px]">
                      <div className="absolute w-3/4 ml-10  mb-0 p-5 shadow-2xl bottom-0 gap-3 flex flex-col bg-white text-black ">
                        <span>Rs.{propertyData.property_price}</span>
                        <div className="flex gap-4 ">
                          <span>
                            <FontAwesomeIcon icon={faBathtub} />{" "}
                            {propertyData.property_bathrooms}
                          </span>
                          <span>
                            <FontAwesomeIcon icon={faBed} />{" "}
                            {propertyData.property_beds}
                          </span>
                          <span>
                            <FontAwesomeIcon icon={faHouse} />{" "}
                            {propertyData.property_floorArea}
                          </span>
                        </div>
                        <span>{propertyData.property_name}</span>
                        <span className="text-gray-800">
                          {propertyData.property_address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </FadeIn>
      <div className="flex justify-center mb-6">
        <CircularPagination />
      </div>
    </>
  );
};

export default Properties;

export function HomeProperties() {
  const nav = useNavigate();
  const { data, isLoading } = useGetAllPropertiesQuery();


  if (isLoading) {
    return <Loading/>
  }
  return (
    <>
      <div>
        <div>
          <HeadingLine heading="WHAT WE OFFER" />
        </div>

        <h1 className="text-4xl text-center mt-4">Exclusive Offer For You</h1>
      </div>
      <FadeIn delay={0.2} direction="up">
        <div className="md:grid grid-cols-3">
          {data &&
            data.slice(0, 3).map((propertyData,index) => (
              <>
                <div
                  onClick={() => nav(`/propertiesDetails/${propertyData._id}`)}
                  className="m-4"
                  key={index}
                >
                  <div className="relative flex flex-col justify-center">
                    <div>
                      <img
                        src={`${baseUrl}${propertyData.image}`}
                        className="w-[400px]  h-[300px]"
                      />
                    </div>
                    <div className="bg-white h-[100px]">
                      <div className="absolute w-3/4 ml-10  mb-0 p-5 shadow-2xl bottom-0 gap-3 flex flex-col bg-white text-black ">
                        <span>Rs.{propertyData.property_price}</span>
                        <div className="flex gap-4 ">
                          <span>
                            <FontAwesomeIcon icon={faBathtub} />{" "}
                            {propertyData.property_bathrooms}
                          </span>
                          <span>
                            <FontAwesomeIcon icon={faBed} />{" "}
                            {propertyData.property_beds}
                          </span>
                          <span>
                            <FontAwesomeIcon icon={faHouse} />{" "}
                            {propertyData.property_floorArea}
                          </span>
                        </div>
                        <span>{propertyData.property_name}</span>
                        <span className="text-gray-800">
                          {propertyData.property_address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </FadeIn>
    </>
  );
}
