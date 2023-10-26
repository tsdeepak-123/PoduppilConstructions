import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { axiosAdmin } from "../../../Api/Api";
import { useState } from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import Swal from "sweetalert2";

function BillSingle() {
  const location = useLocation();
  const [billData, setBillData] = useState(null);
  const id = location?.state?.id;
  
  // Fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`billsingle?id=${id}`);
      setBillData(response?.data?.billData);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaidBills=async()=>{
    try {
    
       Swal.fire({
         title: 'Is the bill paid ?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, paid!'
       }).then((result) => {
           if (result.isConfirmed) {
             axiosAdmin.post(`paidbills?id=${id}`)
             Swal.fire(
               'bill paid',
               'The bill is added to paid bills',
               'success',
             )
         }
      
    
       })
      
     
    } catch (error) {
     console.log(error);
    }
 
   }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ReturnButton />
      
      {billData &&
        billData?.map((data,index) => (
          <div
            key={index}
            className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex justify-center">
              <div>
                <img
                  src={data.photo}
                  alt="Project Image 1"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
              <p>
                <strong>
                  Bill
                  date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.date}
              </p>
              <p>
                <strong>
                  Bill
                  amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.amount}
              </p>
              <p>
                <strong>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>{" "}
                {data.status}
              </p>
              <p>
                <strong>
                  Paid amount
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.paid}
              </p>
              <p>
                <strong>
                  Pending amount
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.pending}
              </p>
              <p>
                <strong>
                  Paid by
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.paidby}
              </p>
              <p>
                <strong>
                  Payment type
                  &nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>{" "}
                {data.payment}
              </p>
            </div>
            <div className="flex justify-end">
            <Buttons name="Bill Paid" click={handlePaidBills}/>
            </div>   
          </div>
        ))}
    </>
  );
}

export default BillSingle;
