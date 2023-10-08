import React,{ useState ,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { axiosAdmin } from "../../../Api/Api";
import AddNav from '../../CommonComponents/AddNav/AddNav';




function StaffDisplay() {
    const navigate= useNavigate()
    const [staffData,setStaffData]=useState(null)

    const handleBackArrowClick=()=>{
        navigate(-1)
    }
    const handleAddStaffClick=()=>{
        navigate('/admin/addstaff')
    }

      // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("staffslist");
      console.log(response);

      setStaffData(response.data.allStaffData);
    } catch (error) {
      console.log(error);
    }
  };

  //data displaying when mounting
  useEffect(() => {
    fetchData();
  }, []);
  const nav =(id)=>{
    navigate('/admin/staffprofile',{ state: {id } })
  }
  return (
    <>
<AddNav name="+ ADD NEW STAFF" click={handleAddStaffClick}/>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Staff name
                </th>
                <th scope="col" class="px-6 py-3">
                    Age
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone number
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Aadhar number
                </th>
                <th scope="col" class="px-6 py-3">
                    Salary Detals
                </th>
                <th scope="col" class="px-6 py-3">
                    Attendance
                </th>
                <th scope="col" class="px-6 py-3">
                    Profile
                </th>
            </tr>
        </thead>
        <tbody>
        {staffData && staffData.length > 0 ? (
              staffData.map((obj) => (
                <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {obj.name}
                  </th>
                  <td class="px-6 py-4">{obj.age}</td>
                  <td class="px-6 py-4">{obj.phone}</td>
                  { obj.address.map((place)=>(
                  <td class="px-6 py-4">
                    {place.street}
                    <br/>
                    {place.post}
                    <br/>
                    {place.town}
                    <br/>
                    {place.district}
                    <br/>
                    {place.state}
                    <br/>
                    {place.pincode}
                    <br/>
                  </td>
                  ))

}
                  <td class="px-6 py-4">{obj.adhar}</td>
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer" onClick={()=>navigate('/admin/staffsalary')}>View
                  </td>
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer">View
                  </td>
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"  onClick={()=>nav(obj._id)}>View
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="8" class="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
        </tbody>
    </table>
</div>
</>
  )
}

export default StaffDisplay
