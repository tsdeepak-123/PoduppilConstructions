import React, { useEffect, useState } from 'react'
import ReturnButton from "../../CommonComponents/Return/ReturnButton"
import { axiosAdmin } from '../../../Api/Api';
import { useNavigate } from 'react-router-dom';

function CompletedProjects() {
    const[ProjectData,setProjectData]=useState()
    const navigate=useNavigate()

          // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList?status=true");
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
    <ReturnButton/>

  <div className='flex justify-center mt-8'>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Project number
                </th>
                <th scope="col" class="px-6 py-3">
                    Project name
                </th>
                <th scope="col" class="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
        {
          ProjectData && ProjectData.length>0 ?(
           ProjectData?.map((data)=>{
            return(   
                <tr key={data?._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                {data?.projectnumber}
                </td>
                <td className="px-6 py-4">
                 {data?.name}
                </td>
                <td className="px-6 py-4 text-blue-500 cursor-pointer" onClick={()=>nav(data?._id)}>
                  View
                </td>
            </tr>
            )
        }) ):(
          <tr>
          <td colspan="8" class="text-center py-4">
            No data available
          </td>
        </tr>
        ) }
        </tbody>
    </table>
</div>
</div>
    </>
  )
}

export default CompletedProjects