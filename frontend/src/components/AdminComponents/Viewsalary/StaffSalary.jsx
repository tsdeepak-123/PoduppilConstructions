import React, { useEffect, useState } from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosAdmin } from '../../../Api/Api'
import{LuIndianRupee}from 'react-icons/lu'
import TextFields from '../../CommonComponents/TextFields/TextFields';
import AdvanceModal from './AdvanceModal';

function StaffSalarys() {
  const location=useLocation()
  const id=location?.state?.id
  console.log(location?.state?.id,'location?.state?.id');
  const[StaffData,setStaffData]=useState()
  const[selectedDate,setselectedDate]=useState()
const navigate=useNavigate()
  const handleProfileButton=()=>{
    navigate('/admin/viewprofile')
  }
  const handleAttendanceButton=()=>{
    navigate('/admin/attendancesingle')
  }
  const handleBackArrowClick = () => {
    navigate('/admin/labourdetails');
  };
    // fetching data from backend
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get(`staffsalary?staffId=${location?.state?.id}`);
        console.log(response?.data?.salaryData,'salarydata');
  
        setStaffData(response?.data?.salaryData);
      } catch (error) {
        console.log(error);
      }
    };
  
    //data displayin when mounting
    useEffect(() => {
      fetchData();
    }, []);



const inputDate = new Date(StaffData?.calculateTo);
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const day = inputDate.getUTCDate();
const month = months[inputDate.getUTCMonth()];
const year = inputDate.getUTCFullYear();
const formattedDate = `${day} / ${month} / ${year}`;
  console.log(Number(StaffData?.lastweek)-Number(StaffData?.advance)??0);

  const salaryoflabour=async()=>{
    try {
      // const id=StaffData?.StaffData?._id 
      // console.log(selectedDate,'dateee');
      const response = await axiosAdmin.post(`salaryofStaff?staffId=${location?.state?.id}&staffSalarydate=${selectedDate}`);

      console.log(response?.data,'response');
      
      window.location.reload();
  // navigate('/admin/viewsalary',{ state: {id } })

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
         <div className="flex justify-start mt-40">
        <KeyboardReturnIcon
          className="ms-14 cursor-pointer"
          onClick={handleBackArrowClick}
        />
      </div>
    
    <div class="container mx-auto p-4">
    <div class="flex items-center justify-center gap-5 mb-4">
      <div >
        <img src={StaffData?.StaffData?.photo} alt="User Photo" class="w-[150px] h-[150px] rounded-full"/>
      </div>
      <div>
        <h2 className='font-semibold text-xl'>{StaffData?.StaffData?.name}</h2>
        <h5>{StaffData?.StaffData?.phone}</h5>
      </div>
    </div>
     <div className='flex justify-end'>
      <AdvanceModal labourId={StaffData?.StaffData?._id}/>
     </div>
    <h1 class="text-2xl font-bold mb-4">Salary Details</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Basic Salary</h2>
        
        <p className='flex'>< LuIndianRupee className='mt-1'/> {StaffData?.StaffData?.salary}</p>
        
      </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Attendance Details</h2>
        <p>Present &nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.present} days</p>
        <p>Halfday &nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.halfday}days</p>
        <p>Absent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.absent} days</p>
        {/* <p>Over Time : {StaffData?.overtime} hours</p> */}

      </div>

   { StaffData?.salary!=0 && StaffData?.advance ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Balance This Week</h2>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.salary}-{StaffData?.advance} </p>
      <br/>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.updatedSalary}</p>
      </div>:''}
    
     {StaffData?.lastweek ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Total This Week</h2>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.lastweek}</p>
      </div> :''}
     {StaffData?.advance || StaffData?.advance==0 ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Total Weekly advance</h2>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.advance}</p>
      </div> :''}
     {StaffData?.balance ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Total Weekly Balance</h2>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.balance}</p>
      </div> :''}

     {StaffData?.updatedSalary ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Last Salary Total</h2>
        <p className='flex'>< LuIndianRupee className='mt-1'/>{StaffData?.updatedSalary}</p>
      </div> :''}

     {StaffData?.calculateTo ? <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Calculated At</h2>
        <p className='flex'>{formattedDate}</p>
      </div> :''}

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Salary History</h2>
        <p className='text-blue-500 cursor-pointer'>View History</p>
      </div>
      <div className='mt-6 flex flex-row gap-4'>
        <TextFields onChange={(e) => {setselectedDate(e.target.value)}} name='Date' type='date' input={true}/>
        <Buttons click={salaryoflabour} name='Calculate salary' className='justify-center' classes={'h-14'}/>
      </div>
    </div>
  </div>
 
<div className='flex flex-wrap justify-around mb-7'>
<Buttons name='VIEW LABOUR PROFILE' click={handleProfileButton} />
<Buttons name='VIEW LABOUR ATTENDANCE' classes={'ms-4'} click={handleAttendanceButton}/>
</div>
  </>
  )
}

export default StaffSalarys