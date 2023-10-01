import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { axiosAdmin } from "../../../Api/Api";
const SingleViewContract = () => {
    const location = useLocation();
    const [ContractData, setContractData] = useState();

    const id=location?.state?.id
    console.log(id,'id came   ');
      // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`ContractById?id=${location?.state?.id}`);
      console.log(response?.data?.FindContract);

      setContractData(response?.data?.FindContract);
    } catch (error) {
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='text-3xl'>SingleViewContract data is came in state value of ContractData</div>
  )
}

export default SingleViewContract