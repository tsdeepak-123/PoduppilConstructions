import React from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom'

function Salary() {
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
  return (
    <>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer'onClick={handleBackArrowClick} />
    <div class="container mx-auto p-4 mt-44">
    <div class="flex items-center justify-between mb-4">
      <div>
        <img src="/Images/podu.png" alt="User Photo" class="w-[150px] h-[180px] rounded-full"/>
      </div>
      <div>
        <h2>DEEPAK</h2>
        <h5>7510307113</h5>
      </div>
    </div>

    <h1 class="text-2xl font-bold mb-4">Salary Details</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Basic Salary</h2>
        <p>$XXXXX</p>
      </div>


      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Attendance Details</h2>
        <p>Present: XX days</p>
        <p>Halfday: XX days</p>
        <p>Absent: XX days</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Balance This Week</h2>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Total This Week</h2>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Total This Month</h2>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Salary History</h2>
        <p className='text-blue-500 cursor-pointer'>View History</p>
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

export default Salary
