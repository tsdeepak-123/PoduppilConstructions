import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from '../../../Api/Api'

function AddBill() {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState();
  const [pending, setPending] = useState();
  const [paidby, setPaidBy] = useState("");
  const [payment, setPayment] = useState("");
  const [photo, setphoto] = useState(null);
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate(-1);
  };

  const handleBillNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePaidChange = (e) => {
    setPaid(e.target.value);
  };
  const handlePendingChange = (e) => {
    setPending(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePaidByChange = (e) => {
    setPaidBy(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const handlephotoChange = (e) => {
    console.log(e.target.files[0], "tagetfile");
    const file = e.target.files[0];
    setphoto(file);
  };

  console.log(
    name,
    date,
    amount,
    status,
    paid,
    pending,
    paidby,
    payment,
    photo,
    "dataaaaaaaaaaaaaaaa"
  );
  const formSubmit = () => {
    console.log("hellooo");
    const billData = {
      name,
      date,
      amount,
      status,
      paid,
      pending,
      paidby,
      payment,
      photo,
    };
    const formData=new FormData()


    Object.entries(billData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("photo",photo);

    axiosAdmin.post('addbills',formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
     
    }).then((response)=>{
      alert(response?.data?.message);
      console.log(response?.data?.message,'response for adding Bill');
      navigate('/admin/utilitybills')
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <>
      <div className="flex justify-start mt-32">
        <KeyboardReturnIcon
          className="ms-11 mt-4 cursor-pointer"
          onClick={handleBackArrowClick}
        />
      </div>
      <div>
        <form
          className="flex flex-wrap ms-16 px-16 mt-24"
          onSubmit={formSubmit}
        >
          <TextFields
            name="Bill name"
            type="text"
            value={name}
            onChange={handleBillNameChange}
          />
          <TextFields
            name="Date of Bill"
            type="date"
            input={true}
            value={date}
            onChange={handleDateChange}
          />
          <TextFields
            name="Bill amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <TextFields
            name="Status"
            type="text"
            value={status}
            onChange={handleStatusChange}
          />
          <TextFields
            name="Paid"
            type="number"
            value={paid}
            onChange={handlePaidChange}
          />
          <TextFields
            name="Pending"
            type="number"
            value={pending}
            onChange={handlePendingChange}
          />
          <TextFields
            name="Paid by"
            type="text"
            value={paidby}
            onChange={handlePaidByChange}
          />
          <TextFields
            name="Payment type"
            type="text"
            value={payment}
            onChange={handlePaymentChange}
          />
          <TextFields
            name="photo"
            type="file"
            input={true}
            onChange={handlephotoChange}
          />
          <div className="mx-auto mt-11">
            <Buttons type="submit" name="ADD BILL" classes={"w-96"} />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBill;
