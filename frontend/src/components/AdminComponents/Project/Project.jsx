import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddNav from '../../CommonComponents/AddNav/AddNav';
import { axiosAdmin } from "../../../Api/Api";
function Project() {
    const navigate= useNavigate()
    const[ProjectData,setProjectData]=useState()

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
<AddNav name="+ ADD NEW PROJECT" click={handleAddProjectClick}/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Project number
                </th>
                <th scope="col" className="px-6 py-3">
                    Project name
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
                <td className="px-6 py-4">
                    {data?.status}
                </td>
                <td className="px-6 py-4 " onClick={()=>nav(data?._id)}>
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
</>
  )
}

export default Project
