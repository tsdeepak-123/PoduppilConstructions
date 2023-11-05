import React from 'react'
import {useNavigate} from "react-router-dom"
import ItemCard from '../../CommonComponents/Card/ItemCard'
import ReturnButton from "../../CommonComponents/Return/ReturnButton"

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
    const handleSalaryClick=()=>{
        navigate('/admin/salarymanagement')
    }
    const handleRecievedCash=()=>{
        navigate('/admin/recievedcash')
    }
  return (
    <>
<ReturnButton/>
<div className='flex flex-wrap mx-5'>
      <ItemCard classes={'mx-16 mt-16'} name="ATTENDANCE" discription="" navigation={handleAttendance}/>
      <ItemCard classes={'mx-16 mt-16'} name="UTILITY BILLS" discription="" navigation={handleUtilitybills}/>
      <ItemCard classes={'mx-16 mt-16'} name="SALARY MANAGEMENT" discription="" navigation={handleSalaryClick}/>
      <ItemCard classes={'mx-16 mt-16'} name="RECIEVED CASH" discription="" navigation={handleRecievedCash}/>
      <ItemCard classes={'mx-16 mt-16'} name="USER HOME CONTROLL" discription="" navigation={""}/>
      {/* <ItemCard classes={'mx-16 mt-16'} name="" discription="" navigation={""}/> */}

    </div>
</>
  )
}

export default Office
