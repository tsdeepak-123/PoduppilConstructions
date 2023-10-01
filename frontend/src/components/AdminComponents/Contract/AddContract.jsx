import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TextFields from '../../CommonComponents/TextFields/TextFields'
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from '../../../Api/Api'

function AddContract() {
  const navigate = useNavigate();
  const [projectname,setName]=useState("")
  const [projectnumber,setProjectNo]=useState("")
  const [Contractwork,setContractwork]=useState("")
  const [Contractorname,setContractorname]=useState("")
  const [totallabour,settotallabour]=useState(0)
  const [totalhelper,setTotalhelper]=useState(0)
  const [Details,setDetails]=useState("")
  const [status,setStatus]=useState("")
  const [Amount,setAmount]=useState(0)
  const [Paymentdetails,setPaymentdetails]=useState(0)
  // const [age,setAge]=useState("")
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
 
  const handleBackArrowClick = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosAdmin
      .post("AddContract", {
        projectname,projectnumber,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount
      })
      .then((response) => {
        // navigate("/admin/projectdetails");
      })
      .catch((error) => {
        console.log(error);
      });
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
    <form className='flex flex-wrap ms-16 px-16 mt-24'>
      <TextFields name="Project name"  onChange={(e) => {setName(e.target.value)}} type="text"/>
      <TextFields name="Project number"  onChange={(e) => {setProjectNo(e.target.value)}} type="text"/>
      <TextFields name="Contract work name" onChange={(e) => {setContractwork(e.target.value)}} type="text"/>
      <TextFields name="Contractor name"  onChange={(e) => {setContractorname(e.target.value)}} type="text"/>
      <TextFields name="Contractor phone"  onChange={(e) => {setPhone(e.target.value)}} type="text"/>
      <TextFields name="Total main labours" onChange={(e) => {settotallabour(e.target.value)}} type="number"/>
      <TextFields name="Total helpers" onChange={(e) => {setTotalhelper(e.target.value)}} type="number"/>
      <TextFields name="Other details"  onChange={(e) => {setDetails(e.target.value)}} type="text"/>
      <TextFields name="Work status"  onChange={(e) => {setStatus(e.target.value)}}type="text"/> 
      <TextFields name="Contraction Amount"  onChange={(e) => {setAmount(e.target.value)}} type="text"/> 
      <TextFields name="Payment details"  onChange={(e) => {setPaymentdetails(e.target.value)}} type="text"/> 
      <TextFields name="date" type="date"  onChange={(e) => {setDate(e.target.value)}} input={true}/> 
    </form>
    <div className="flex justify-center mt-11">
          <Buttons name="ADD PROJECT" classes={"w-96"} click={handleSubmit} />
        </div>
   </div>
    </>
  );
}

export default AddContract;
