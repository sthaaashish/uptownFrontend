import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { UnderlineTabs } from "../components/UnderlineTabs";
import { useGetPropertiesByIdQuery } from "../features/Api";
import { baseUrl } from "../features/constant";

const PropertiesDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertiesByIdQuery(id);

  if(isLoading){
  return<Loading/>
}
  return (
    <div>
      {data &&
        data?.map((items) => (
          <div key={items._id}>
            <div className=" mx-auto p-12 ">
              <img src={`${baseUrl}${items.image}`} className="w-full " />
            </div>
            <div>
              <h1 className="text-center">{items.property_address}</h1>
              <h1 className="text-3xl text-center">{items.property_name}</h1>
            </div>
            <div>
        <UnderlineTabs data={items}/>
      </div>
          </div>
        ))}
     
    </div>
  );
};

export default PropertiesDetail;
