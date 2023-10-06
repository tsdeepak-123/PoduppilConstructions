import React, { useEffect, useState } from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useLocation,useNavigate } from 'react-router-dom'
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from "../../../Api/Api";
import AttendanceDisplay from './AttendanceDisplay';

function AttendanceSheet() {
  const location=useLocation()

  const [selectedValues, setSelectedValues] = useState({});
//   const data = [
//     { id: 1, name: 'Option 100 00' },
//     { id: 2, name: 'Option 200' },
//     { id: 3, name: 'Option 3' },
//   ];
  const [labourData,setLabourdata]=useState([])
  const [attendanceData,SetAttendanceData]=useState([])
  const navigate = useNavigate();
  const fetchData=async()=>{
    const response= await axiosAdmin.get("labourslist");
    console.log(response?.data?.allLabourData,'response');
    setLabourdata(response?.data?.allLabourData)
  }
  const fetchAttendance=async()=>{
    const response= await axiosAdmin.get("labourattendancelist");
    console.log(response?.data?.LabourAttendance,'response attenxdanceeeeeeeeeeeeee');
    SetAttendanceData(response?.data?.LabourAttendance)
  }



  useEffect(()=>{
    fetchData();
    fetchAttendance()
  },[])
  const handleBackArrowClick = () => {
    navigate('/admin/officedetails');
  };

  const handleAddLabour = () => {
    navigate('/admin/addlabour');
  };

  const handleRadioButtonChange = (event, id) => {
    const { value } = event.target;

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [id]: value,
    }));
  };
  useEffect(() => {
    
    const initialValues = {};
    labourData.forEach((item) => {
      initialValues[item._id] = 'absent';
    });
    setSelectedValues(initialValues);
  },[labourData]);

const updateAttendance=()=>{
  console.log(selectedValues);
  axiosAdmin.post("labourattendance",{selectedValues}).then((res)=>{
console.log('res',res.data);
window.location.reload();
  }).catch((err)=>{

    console.log(err);
  })
}
  return (
    <div className='me-7 mt-32'>
      <div className='flex justify-between me-7 mb-24'>
      <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer'onClick={handleBackArrowClick} />
    

<nav className="w-full sm:flex justify-center gap-2 sm:ml-32">
          <div onClick={()=> navigate('/admin/labourattendance')} className="flex text-[#5f655f] bg-transparent outline ml-2 rounded-md font-medium my-6 px-4 py-1 w-[auto] self-center hover:bg-[#e4ece5] hover:text-black transition duration-500">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Labour-Attendance
          </div>
          <div  onClick={()=>navigate('/admin/staffattendance')} className="flex text-[#5f655f] bg-transparent outline ml-2 rounded-md font-medium my-6 px-4 py-1 w-[auto] self-center hover:bg-[#ebeeec] hover:text-black transition duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Staff-Attendance
          </div>
         <div className='mt-5'>
         <Buttons name="+ ADD NEW LABOUR" click={handleAddLabour} />
         </div>
        </nav>

      </div>
      
  {

attendanceData ? <AttendanceDisplay attendanceData={attendanceData}/>:<> <div className='grid grid-cols-1 ml-3 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full overflow-y-auto mb-10'>
{labourData.map((item) => (
  <div key={item._id} className='p-4 flex gap-4 w-auto rounded-2xl shadow-xl'>
    <div className='w-[40%]'>
      <img className='w-16 rounded-full h-16' src={item.photo} alt='labour photo' />
      <div>
        <p className='text-lg font-medium mt-4 flex'>{item.name}</p>
      </div>
    </div>
    <div className='flex gap-10  grid-cols-3 mb-5 items-center w-full'>
      <div className='w-10 h-10'>
        <label>
          <input
            type='radio'
            name={`attendance_${item._id}`} 
            value='present'
            checked={selectedValues[item._id] === 'present'} 
            onChange={(event) => handleRadioButtonChange(event, item._id)}
          />
          <span className='text-xs font-medium'>PRESENT</span>
        </label>
      </div>
      <div className='w-10 h-10'>
        <label>
          <input
            type='radio'
            name={`attendance_${item._id}`}
            value='halfday'
            checked={selectedValues[item._id] === 'halfday'}
            onChange={(event) => handleRadioButtonChange(event, item._id)}
          />
          <span className='text-xs font-medium'>HALF_DAY</span>
        </label>
      </div>
      <div className='w-10 h-10'>
        <label>
          <input
            type='radio'
            name={`attendance_${item._id}`}
            value='absent'
           
            checked={selectedValues[item._id] === 'absent'}
            onChange={(event) => handleRadioButtonChange(event, item._id)}
          />
          <span className='text-xs font-medium'>ABSENT</span>
        </label>
      </div>
    </div>+
    
  </div>
))}
</div>
<div className='justify-center items-center flex mt-7 w-full mb-10'>
<Buttons type="submit" name="SUBMIT" classes={'w-96'} click={updateAttendance} />
{/* <button className=' p-2 border-black outline rounded-xl bg-green-600 text-white' onClick={updateAttendance}>submit</button> */}
</div>
</>
}
     
    </div>
  );
}

export default AttendanceSheet;
