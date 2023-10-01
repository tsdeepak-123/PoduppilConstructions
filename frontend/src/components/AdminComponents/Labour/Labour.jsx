import React, { useState, useEffect } from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import Search from "../../CommonComponents/Search/Search";
import { axiosAdmin } from "../../../Api/Api";

function Labour() {
  const navigate = useNavigate();
  const [labourData, setLabourData] = useState();

  const handleBackArrowClick = () => {
    navigate(-1);
  };
  const handleAddLabourClick = () => {
    navigate("/admin/addlabour");
  };

  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("labourslist");
      console.log(response);

      setLabourData(response.data.allLabourData);
    } catch (error) {
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between me-7 mt-32">
        <KeyboardReturnIcon
          className="ms-11 mt-4 cursor-pointer"
          onClick={handleBackArrowClick}
        />
        <div className="relative top-20">
          <Buttons name="+ ADD NEW LABOUR" click={handleAddLabourClick} />
        </div>
      </div>
      <div className="ms-6 mt-9">
        <Search />
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Labour name
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
                Adhaar number
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
            {labourData && labourData.length > 0 ? (
              labourData.map((obj) => (
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
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer" onClick={()=>navigate('/admin/viewsalary')}>View
                  </td>
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer">View
                  </td>
                  <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer">View
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
  );
}

export default Labour;
