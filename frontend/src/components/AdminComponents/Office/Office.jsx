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
    // const handleStaffView=()=>{
    //   navigate('/admin/staffdetails')
    // }
    // const handleContractView=()=>{
    //   navigate('/admin/contractdetails')
    // }
    const handleOfficeView=()=>{
      navigate('/admin/officedetails')
    }
    // const handleMaterialView=()=>{
    //   navigate('/admin/projectlist')
    // }

    const handleBackArrowClick=()=>{
        navigate('/admin/dashboard')
    }
    // const handleAddBillClick=()=>{
    //     navigate('/admin/addbills')
    // }
  return (
    <>
    <div className='flex justify-between me-7 mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer' onClick={handleBackArrowClick}/>
    <div className='relative top-20'>
    {/* <Buttons name="+ ADD NEW BILL" click={handleAddBillClick}/> */}
    </div>
    
    </div>
    {/* <div className="ms-6 mt-9">
   <Search/>
  </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-11 ms-6 me-6">
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
            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                  View
                </td>
            </tr>
        </tbody>
    </table> */}
{/* </div> */}



<div className='flex flex-wrap mx-5 mt-32'>
      <ItemCard classes={'mx-16 mt-16'} name="ATTENDANCE" discription="" navigation={handleAttendance}/>
      <ItemCard classes={'mx-16 mt-16'} name="UTILITY BILLS" discription="" navigation={handleUtilitybills}/>
      {/* <ItemCard classes={'mx-16 mt-16'} name="STAFFS" discription="" navigation={handleStaffView}/> */}
      {/* <ItemCard classes={'mx-16 mt-16'} name="OFFICE" discription="" navigation={handleOfficeView}/> */}
      {/* <ItemCard classes={'mx-16 mt-16'} name="CONTRACT WORK" discription="" navigation={handleContractView}/> */}
      {/* <ItemCard classes={'mx-16 mt-16'} name="MATERIAL PURCHASE" discription="" navigation={handleMaterialView}/> */}
  
  

    </div>
</>
  )
}

export default Office
