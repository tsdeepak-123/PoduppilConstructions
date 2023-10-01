import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import Buttons from '../../CommonComponents/Button/Buttons';

function AddBill() {
  const navigate= useNavigate()
  const handleBackArrowClick=()=>{
      navigate(-1)
  }
  const formSubmit=()=>{
    console.log('hellooo');
  }
  return (
    <>
    <div className='flex justify-start mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer'onClick={handleBackArrowClick} />
    </div>
    <div>
    <form className='flex flex-wrap ms-16 px-16 mt-24' onSubmit={formSubmit}>
      <TextFields name="Bill name" type="text"/>
      <TextFields name="Date of Bill" type="date" input={true}/>
      <TextFields name="Bill amount" type="number"/>
      <TextFields name="Status" type="text"/>
      <TextFields name="Paid" type="number"/>
      <TextFields name="Pending" type="number"/>
      <TextFields name="Paid by" type="text"/>
      <TextFields name="Payment type" type="text"/> 
      <TextFields name="Bill Photo" type="file" input={true}/>
    <div className='mx-auto mt-11'>
     
    <button type="submit" className="text-[#fff] bg-[#31a051] rounded-md font-medium my-6 px-6 py-3 w-auto items-center self-center">ADD BILL</button>
    </div>
    </form>
   </div>
</>
  )
}

export default AddBill
