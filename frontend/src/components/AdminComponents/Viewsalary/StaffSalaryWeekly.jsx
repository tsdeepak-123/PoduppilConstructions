import React, { useEffect, useState } from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { axiosAdmin } from "../../../Api/Api";

function StaffSalaryWeekly() {
    const [salaryData, setSalaryData] = useState();
    const fetch = async () => {
      try {
        const response = await axiosAdmin.get("allStaffsalaryhistory");
        console.log(response?.data.updatedStaffSalaryData);
        setSalaryData(response?.data.updatedStaffSalaryData);
      } catch (error) {}
    };
    console.log(salaryData);
  
    useEffect(() => {
      fetch();
    }, []);
  return (
    <>
      <ReturnButton />
      <div className="flex justify-center mt-8">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-16 py-3">
                  Labour Name
                </th>
                <th scope="col" class="px-16 py-3">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {
                salaryData && salaryData?.length>0 ?(
                salaryData?.map((item)=>
                <tr key={item?._id} class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                > {item?.laborerId?.name}</td>
                <td
                  scope="row"
                  class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >{item.records[0].updatedSalary}</td>
              </tr>
                )):(
                    <tr>
                    <td colspan="8" class="text-center py-4">
                      No data available
                      
                    </td>
                  </tr>
                )
               
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default StaffSalaryWeekly