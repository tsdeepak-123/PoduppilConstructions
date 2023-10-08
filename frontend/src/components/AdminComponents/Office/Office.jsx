import React from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {useNavigate} from "react-router-dom"
import Search from '../../CommonComponents/Search/Search';
import ItemCard from '../../CommonComponents/Card/ItemCard'

function Office() {
    const navigate= useNavigate()


    
    const handleAttendance=()=>{
      navigate('/admin/labourattendance')
    }
    const handleUtilitybills=()=>{
      navigate('/admin/utilitybills')
    }

    const handleBackArrowClick=()=>{
        navigate('/admin/dashboard')
    }
  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer' onClick={handleBackArrowClick}/>
    <div className='relative top-20'>
    {/* <Buttons name="+ ADD NEW BILL" click={handleAddBillClick}/> */}
    </div>
    
    </div>

<div className='flex flex-wrap mx-5'>
      <ItemCard classes={'mx-16 mt-16'} name="ATTENDANCE" discription="" navigation={handleAttendance}/>
      <ItemCard classes={'mx-16 mt-16'} name="UTILITY BILLS" discription="" navigation={handleUtilitybills}/>
      <ItemCard classes={'mx-16 mt-16'} name="SALARY ADVANCE" discription="" navigation={""}/>
      <ItemCard classes={'mx-16 mt-16'} name="RECIEVED CASH" discription="" navigation={""}/>
      <ItemCard classes={'mx-16 mt-16'} name="USER HOME CONTROLL" discription="" navigation={""}/>
      {/* <ItemCard classes={'mx-16 mt-16'} name="" discription="" navigation={""}/> */}

    </div>
</>
  )
}

export default Office
