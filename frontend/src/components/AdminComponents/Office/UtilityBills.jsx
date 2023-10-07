import React, { useState, useEffect } from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import Search from "../../CommonComponents/Search/Search";
import { axiosAdmin } from "../../../Api/Api";

function UtilityBills() {
  const [billData, setBillData] = useState();
  const navigate = useNavigate();

  const handleBackArrowClick = () => {
    navigate("/admin/dashboard");
  };

  const handleAddBillClick = () => {
    navigate("/admin/addbills");
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("billslist");
      console.log(response);

      setBillData(response.data.allBillData);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Buttons name="+ ADD NEW BILL" click={handleAddBillClick} />
        </div>
      </div>
      <div className="ms-6 mt-9">
        <Search />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Bills name
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Bill Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Paid
              </th>
              <th scope="col" class="px-6 py-3">
                Pending
              </th>
              <th scope="col" class="px-6 py-3">
                Deatils
              </th>
            </tr>
          </thead>
          <tbody>
            {
              billData && billData.length>0 ?(
                billData.map((item)=>
                <tr key={item._id} class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">{item.name}</td>
                <td class="px-6 py-4">{item.date}</td>
                <td class="px-6 py-4">{item.amount}</td>
                <td class="px-6 py-4">{item.status}</td>
                <td class="px-6 py-4">{item.paid}</td>
                <td class="px-6 py-4">{item.pending}</td>
                <td class="px-6 py-4 text-blue-600 cursor-pointer">View</td>
              </tr>
                )
               
              ): (
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
    </>
  );
}

export default UtilityBills;
