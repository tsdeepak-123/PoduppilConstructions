import React, { useEffect, useState } from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useNavigate} from "react-router-dom"
import Search from '../../CommonComponents/Search/Search';
import { axiosAdmin } from "../../../Api/Api";

function Contract() {
    const navigate= useNavigate()
    const [ContractData, setContractData] = useState([]);

    const handleBackArrowClick=()=>{
        navigate(-1)
    }
    const handleAddContractClick=()=>{
        navigate('/admin/addcontract')
    }

      // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("ContractList");
      console.log(response?.data?.FindContract);

      setContractData([...response?.data?.FindContract]);
    } catch (error) {
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  const nav=(id)=>{
    console.log(id);
    navigate('/admin/contractview',{ state: { id } })
  }
  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer' onClick={handleBackArrowClick}/>
    <div className='relative top-20'>
    <Buttons name="+ ADD NEW CONTRACT" click={handleAddContractClick}/>
    </div>

    </div>
    <div className="ms-6 mt-9">
   <Search/>
  </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Project name
                </th>
                <th scope="col" className="px-6 py-3">
                    Contractor
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Contractwork

                </th>
                <th scope="col" className="px-6 py-3">
                    Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                   Details
                </th>
               
               
            </tr>
        </thead>
        <tbody>
           {
           ContractData.map((data)=>{
            return(
                
           <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {data?.project?.name}
                </th>
                <td className="px-6 py-4">
                    {data?.Contractorname}
                </td>
                <td className="px-6 py-4">
                   {data?.phone}
                </td>
                <td className="px-6 py-4">
                    {data?.Contractwork}
                </td>
                <td className="px-6 py-4">
                   {data?.Amount}
                </td>
             
                <td className="px-6 py-4 " onClick={()=>nav(data?._id)}>
                  View
                </td>
            </tr>
            )
        })  }
        </tbody>
    </table>
</div>
</>
  )
}

export default Contract
