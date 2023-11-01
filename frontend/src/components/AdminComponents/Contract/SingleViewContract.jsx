import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from "../../CommonComponents/Button/Buttons";
import Swal from "sweetalert2";

const SingleViewContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contractData, setContractData] = useState([]);
  const id = location?.state?.id;

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`ContractById?id=${id}`);
      setContractData(response?.data?.FindContract);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompletedContracts = async () => {
    try {
      Swal.fire({
        title: "Is the contract completed ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, completed!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosAdmin.post(`completedcontracts?id=${id}`);
          Swal.fire(
            "Work completed",
            "The contract is added to completed contract",
            "success"
          ).then(() => {
            navigate("/admin/completedcontracts");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <ReturnButton />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 flex justify-center">
          Contract Work Details
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <div>
              <span className="text-base font-semibold">
                Contract Work Name:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.Contractwork}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Contractor Name:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.Contractorname}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Contractor Phone Number:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">+91 {contractData.phone}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Contract Work Status:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.status}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Contract Amount:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.Amount}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Main Labours:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.totallabour}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Helpers:&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.totalhelper}</span>
            </div>
            <div>
              <span className="text-base font-semibold">
                Date: &nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">{contractData.date}</span>
            </div>
          </div>
          {
            contractData.isCompleted===false ?
            <div className="flex justify-end">
              <Buttons name="WORK COMPLETED" click={handleCompletedContracts} />
            </div>:""
          }
        </div>
      </div>
    </>
  );
};
export default SingleViewContract;
