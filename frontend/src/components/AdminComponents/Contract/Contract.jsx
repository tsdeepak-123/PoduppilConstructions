import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import EditIcon from "@mui/icons-material/Edit";
function Contract() {
  const navigate = useNavigate();
  const [ContractData, setContractData] = useState([]);

  const handleAddContractClick = () => {
    navigate("/admin/addcontract");
  };

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

  const nav = (id) => {
    // console.log(id);
    navigate("/admin/contractview", { state: { id } });
  };

  const editpage = (data) => {
    // console.log(id);
    navigate("/admin/editcontract", { state: { data } });
  };
  return (
    <>
      <AddNav name="+ ADD NEW CONTRACT" click={handleAddContractClick} />
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
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {ContractData && ContractData.length > 0 ? (
              ContractData.map((data) => (
                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.project?.name}
                  </th>
                  <td className="px-6 py-4">{data?.Contractorname}</td>
                  <td className="px-6 py-4">{data?.phone}</td>
                  <td className="px-6 py-4">{data?.Contractwork}</td>
                  <td className="px-6 py-4">{data?.Amount}</td>

                  <td
                    className="px-6 py-4 text-blue-500 cursor-pointer"
                    onClick={() => nav(data?._id)}
                  >
                    View
                  </td>
                  <td class="px-6 py-4 font-medium cursor-pointer">
                    <EditIcon
                      onClick={() => editpage(data)}
                      className="text-yellow-600"
                    />
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

export default Contract;
