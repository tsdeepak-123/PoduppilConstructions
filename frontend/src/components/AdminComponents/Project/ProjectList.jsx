import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from '../../CommonComponents/Button/Buttons';
import { axiosAdmin } from "../../../Api/Api";

function ProjectList() {
  const [purchaseData, setPurchaseData] = useState(null);
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    navigate('/admin/purchasematerial');
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get('/materialtotal');
      setPurchaseData(response?.data?.materialData);
    } catch (error) {
      console.log(error);
    }
  };

   // Consolidate purchaseData based on project name
   const consolidateProjects = () => {
    const consolidatedData = {};
    purchaseData.forEach((item) => {
      if (consolidatedData[item.projectname]) {
        consolidatedData[item.projectname] += item.TotalAmount;
      } else {
        consolidatedData[item.projectname] = item.TotalAmount;
      }
    });

    // Transform the consolidated data into an array for rendering
    const consolidatedArray = Object.keys(consolidatedData).map((projectname) => ({
      projectname,
      TotalAmount: consolidatedData[projectname],
    }));
    
    setPurchaseData(consolidatedArray);
  };

  useEffect(() => {
    fetchData();
    if(purchaseData){
      consolidateProjects()
    }
   
  }, [purchaseData]);

  return (
    <>
      <ReturnButton /> 
         <div className="flex justify-end mt-14 me-20">
          <Buttons name="+ PURCHASE MATERIAL" click={handlePurchaseClick}/>
        </div>
        <div className=" w-[90%] overflow-x-auto shadow-md sm:rounded-lg mt-8 ms-16" >
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
                <th scope="col" className="px-6 py-3">
                  Project name
                </th>
                <th scope="col" className="px-6 py-3">
                <span className="flex justify-end">Total purchased amount</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseData && purchaseData.map((item, index) => (
                <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.projectname} {/* Assuming project has a 'name' property */}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-500 whitespace-nowrap dark:text-white">
                   <span className="flex justify-end">{item.TotalAmount}</span>         
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

      </div>
    </>
  );
}

export default ProjectList;
