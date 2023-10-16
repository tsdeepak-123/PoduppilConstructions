import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from '../../CommonComponents/Button/Buttons'
function ProjectList() {
const navigate=useNavigate()
  const handlePurchaseClick=()=>{
    navigate('/admin/purchasematerial')
  }
  return (
    <>
      <ReturnButton /> 
      <div className="flex justify-center mt-8 gap-6">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Project name
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Parchased
                </th>
                <th scope="col" class="px-6 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></td>
                <td class="px-6 py-4 text-blue-500 cursor-pointer">view</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-8">
      <Buttons name="PURCHASE MATERIAL" click={handlePurchaseClick}/>
       </div>
      </div>
    </>
  );
}

export default ProjectList;
