import React, { useEffect, useState } from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'

// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useNavigate} from "react-router-dom"
import Search from '../../CommonComponents/Search/Search';
import {TiArrowBackOutline} from 'react-icons/ti'
import { axiosAdmin } from "../../../Api/Api";
function Project() {
    const navigate= useNavigate()
    const[ProjectData,setProjectData]=useState()

    const handleBackArrowClick=()=>{
        navigate(-1)
    }
    const handleAddProjectClick=()=>{
        navigate('/admin/addproject')
    }

    
      // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList");
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

  const nav=(id)=>{
    console.log(id,'idddddddddddddddddddddd');
    navigate('/admin/projectview',{ state: { id } })
  }
  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <TiArrowBackOutline className='ms-11 mt-4 cursor-pointer text-3xl' onClick={handleBackArrowClick}/>
    <div className='relative top-20 block sm:hidden'>
    <Buttons name="+" click={handleAddProjectClick}/>
    </div>
    <div className='relative top-20 hidden sm:block'>
    <Buttons name="+ ADD NEW PROJECT" click={handleAddProjectClick}/>
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
                    Project number
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
        {
           ProjectData?.map((data)=>{
            return(
                
           <tr key={data?._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {data?.name}
                </th>
                <td className="px-6 py-4">
                {data?.projectnumber}
                </td>
                <td className="px-6 py-4">
                    {data?.status}
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

export default Project
