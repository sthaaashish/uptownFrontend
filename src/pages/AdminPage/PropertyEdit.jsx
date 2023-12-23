import React from 'react'
import { useParams } from 'react-router'
import Loading from '../../components/Loading';
import { useGetPropertiesByIdQuery } from '../../features/Api';
import EditForm from './EditForm';
const PropertyEdit = () => {
    const{id}=useParams();
    const {data,isLoading}=useGetPropertiesByIdQuery(id);

 if(isLoading){
      return<Loading/>
    }

  return (
    <div>
    {data && <EditForm data={data}/>}
    </div>
  )
}

export default PropertyEdit
