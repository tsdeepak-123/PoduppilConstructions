import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosAdmin } from "../../../Api/Api";
const SingleViewProject = () => {
    const location = useLocation();
    const [ProjectData, setProjectData] = useState();

    const id=location?.state?.id
    console.log(id,'id came   ');
      // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`projectById?id=${location?.state?.id}`);
      console.log(response?.data?.FindProject);

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='text-3xl'>SingleView Project data is came in state value of ProjectData</div>
  )
}

export default SingleViewProject