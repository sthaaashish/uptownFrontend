import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import HeadingLine from "../components/HeadingLine";
import Loading from "../components/Loading";
import { CircularPagination } from "../components/Pagination";
import { useGetAllPropertiesQuery } from "../features/Api";
import { baseUrl } from "../features/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBathtub, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";

const PropertyCard = ({ propertyData, index }) => {
  const nav = useNavigate();

  return (
    <FadeIn delay={index * 0.2} direction={"up"}>
      <div
        onClick={() => nav(`/propertiesDetails/${propertyData._id}`)}
        className="m-4"
      >
        <div className="relative flex flex-col justify-center">
          <div>
            <img
              src={`${baseUrl}${propertyData.property_image}`}
              className="w-[400px]  h-[300px]"
            />
          </div>
          <div className="bg-white h-[100px]">
            <div className="absolute w-3/4 ml-10 mb-0 p-5 shadow-2xl bottom-0 gap-3 flex flex-col bg-white text-black ">
              <span>Rs.{propertyData.property_price}</span>
              <div className="flex gap-4 ">
                <span>
                  <FontAwesomeIcon icon={faBathtub} />{" "}
                  {propertyData.property_bathrooms}
                </span>
                <span>
                  <FontAwesomeIcon icon={faBed} /> {propertyData.property_beds}
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
    </FadeIn>
  );
};

const Properties = () => {
  const nav = useNavigate();
  const [filterAddress, setFilterAddress] = useState("All");
  const { data, isLoading } = useGetAllPropertiesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const filteredData =
    filterAddress === "All"
      ? data
      : data?.filter((propertyData) =>
          propertyData.property_address.toLowerCase().includes(filterAddress.toLowerCase())
        );

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  const currentData = filteredData?.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(filteredData?.length / cardsPerPage);

  const handleFilterChange = (e) => {
    setFilterAddress(e.target.value);
    setCurrentPage(1); // Reset current page when filter changes
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-12">
      <div className="mb-2 px-5">
        <label htmlFor="addressFilter" className="mr-2">
          Filter by Location:
        </label>
        <select
          id="addressFilter"
          value={filterAddress}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          {["All", "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <FadeIn delay={0.2} direction={"up"}>
        <div className=" md:grid grid-cols-3">
          {currentData &&
            currentData.map((propertyData, index) => (
              <PropertyCard key={propertyData._id} propertyData={propertyData} index={index} />
            ))}
        </div>
      </FadeIn>

      <div className="flex justify-center mb-6">
        <CircularPagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Properties;

export function HomeProperties() {
  const nav = useNavigate();
  const { data, isLoading } = useGetAllPropertiesQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div>
          <HeadingLine heading="WHAT WE OFFER" />
        </div>

        <h1 className="text-4xl text-center mt-4">Exclusive Offer For You</h1>
      </div>
      <div className="md:grid grid-cols-3">
        {data &&
          data
            .slice(0, 3)
            .map((propertyData, index) => (
              <PropertyCard
                key={propertyData._id}
                propertyData={propertyData}
                index={index}
              />
            ))}
      </div>
    </>
  );
}
