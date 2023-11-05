// import React from 'react'
// import ReturnButton from "../../CommonComponents/Return/ReturnButton"

// function Completed() {
//   return (
//     <>
//     <ReturnButton/>

//     {
        
//     }

//   <div className='flex justify-center mt-8'>
//     <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
//     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//                 <th scope="col" class="px-6 py-3">
//                     bill name
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Details
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//                 <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
//                 </td>
//                 <td class="px-6 py-4 text-blue-500 cursor-pointer">
//                     view
//                 </td>
//             </tr>

//         </tbody>
//     </table>
// </div>
// </div>
//     </>
//   )
// }

// export default Completed




// import React, { useEffect, useState } from "react";
// import ReturnButton from "../../CommonComponents/Return/ReturnButton";
// import { useLocation, useNavigate } from "react-router-dom";
// import Buttons from "../../CommonComponents/Button/Buttons";
// import { axiosAdmin } from "../../../Api/Api";
// import AttendanceDisplay from "../Labour/AttendanceDisplay";
// import AttendanceBar from "../Attendance/AttendanceBar";
// import Nodata from "../../CommonComponents/Nodata/Nodata";

// function StaffAttendanceSheet() {
//   const [selectedValues, setSelectedValues] = useState({});
//   const [staffData, setStaffdata] = useState([]);
//   const [attendanceData, SetAttendanceData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axiosAdmin.get("labourslist");
//       setStaffdata(response?.data?.allStaffData);
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   const fetchAttendance = async () => {
//     try {
//       const response = await axiosAdmin.get("labourattendancelist");
//       SetAttendanceData(response?.data?.LabourAttendance);
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   const handleAPIError = (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.replace("/admin/login");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchAttendance();
//   }, []);

//   const handleAddLabour = () => {
//     navigate("/admin/addlabour");
//   };

//   const handleRadioButtonChange = (event, id) => {
//     const { value } = event.target;
//     setSelectedValues((prevSelectedValues) => ({
//       ...prevSelectedValues,
//       [id]: value,
//     }));
//   };

//   useEffect(() => {
//     const initialValues = {};
//     staffData?.forEach((item) => {
//       initialValues[item._id] = "absent";
//     });
//     setSelectedValues(initialValues);
//   }, [staffData]);

//   const updateAttendance = () => {
//     try {
//       axiosAdmin.post("labourattendance", { selectedValues }).then((res) => {
//         window.location.reload();
//       });
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   useEffect(() => {
//     const results = staffData?.filter((staff) =>
//     staff.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//     setSearchResults(results);
//   }, [searchTerm, staffData]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <ReturnButton />
//       <AttendanceBar click={handleAddLabour} name="+ ADD NEW LABOUR"  value={searchTerm} onChange={handleSearch} />

//       {searchResults?.length === 0 ? (
//         <Nodata />
//       ) : attendanceData ? (
//         <AttendanceDisplay attendanceData={attendanceData} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {searchResults?.map((item) => (
//             <div key={item._id} className="rounded-lg shadow-md p-3">
//               <img className="w-16 h-16 rounded-full mx-auto mb-2" src={item.photo} alt="labour photo" />
//               <p className="text-sm font-semibold text-center mb-1">{item.name}</p>
//               <div className="flex justify-around">
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="present"
//                     checked={selectedValues[item._id] === "present"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "present" ? 'text-blue-500' : 'text-gray-500'}`}>Present</span>
//                 </label>
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="halfday"
//                     checked={selectedValues[item._id] === "halfday"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "halfday" ? 'text-blue-500' : 'text-gray-500'}`}>Half Day</span>
//                 </label>
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="absent"
//                     checked={selectedValues[item._id] === "absent"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "absent" ? 'text-blue-500' : 'text-gray-500'}`}>Absent</span>
//                 </label>
//               </div>
//             </div>
//           ))}
//             <div className="justify-center items-center flex  mb-10">
//             <Buttons
//               type="submit"
//               name="SUBMIT"
//               classes={"sm:w-48"}
//               click={updateAttendance}
//             />
//           </div>
//         </div>
//       )}

       
     
//     </>
//   );
// }

// export default StaffAttendanceSheet;














// import React, { useEffect, useState } from "react";
// import ReturnButton from "../../CommonComponents/Return/ReturnButton";
// import { useLocation, useNavigate } from "react-router-dom";
// import Buttons from "../../CommonComponents/Button/Buttons";
// import { axiosAdmin } from "../../../Api/Api";
// import AttendanceDisplay from "./AttendanceDisplay";
// import AttendanceBar from "../Attendance/AttendanceBar";
// import Nodata from "../../CommonComponents/Nodata/Nodata";

// function AttendanceSheet() {
//   const location = useLocation();

//   const [selectedValues, setSelectedValues] = useState({});
//   const [labourData, setLabourdata] = useState([]);
//   const [attendanceData, SetAttendanceData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axiosAdmin.get("labourslist");
//       setLabourdata(response?.data?.allLabourData);
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   const fetchAttendance = async () => {
//     try {
//       const response = await axiosAdmin.get("labourattendancelist");
//       SetAttendanceData(response?.data?.LabourAttendance);
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   const handleAPIError = (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.replace("/admin/login");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchAttendance();
//   }, []);

//   const handleAddLabour = () => {
//     navigate("/admin/addlabour");
//   };

//   const handleRadioButtonChange = (event, id) => {
//     const { value } = event.target;
//     setSelectedValues((prevSelectedValues) => ({
//       ...prevSelectedValues,
//       [id]: value,
//     }));
//   };

//   useEffect(() => {
//     const initialValues = {};
//     labourData.forEach((item) => {
//       initialValues[item._id] = "absent";
//     });
//     setSelectedValues(initialValues);
//   }, [labourData]);

//   const updateAttendance = () => {
//     try {
//       axiosAdmin.post("labourattendance", { selectedValues }).then((res) => {
//         window.location.reload();
//       });
//     } catch (error) {
//       handleAPIError(error);
//     }
//   };

//   useEffect(() => {
//     const results = labourData.filter((labour) =>
//     labour.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//     setSearchResults(results);
//   }, [searchTerm, labourData]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <ReturnButton />
//       <AttendanceBar click={handleAddLabour} name="+ ADD NEW LABOUR"  value={searchTerm} onChange={handleSearch} />

//       {searchResults.length === 0 ? (
//         <Nodata />
//       ) : attendanceData ? (
//         <AttendanceDisplay attendanceData={attendanceData} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {searchResults.map((item) => (
//             <div key={item._id} className="rounded-lg shadow-md p-3">
//               <img className="w-16 h-16 rounded-full mx-auto mb-2" src={item.photo} alt="labour photo" />
//               <p className="text-sm font-semibold text-center mb-1">{item.name}</p>
//               <div className="flex justify-around">
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="present"
//                     checked={selectedValues[item._id] === "present"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "present" ? 'text-blue-500' : 'text-gray-500'}`}>Present</span>
//                 </label>
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="halfday"
//                     checked={selectedValues[item._id] === "halfday"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "halfday" ? 'text-blue-500' : 'text-gray-500'}`}>Half Day</span>
//                 </label>
//                 <label className="cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`attendance_${item._id}`}
//                     value="absent"
//                     checked={selectedValues[item._id] === "absent"}
//                     onChange={(event) => handleRadioButtonChange(event, item._id)}
//                     className="hidden"
//                   />
//                   <span className={`text-xs font-medium ${selectedValues[item._id] === "absent" ? 'text-blue-500' : 'text-gray-500'}`}>Absent</span>
//                 </label>
//               </div>
//             </div>
//           ))}
//             <div className="justify-center items-center flex  mb-10">
//             <Buttons
//               type="submit"
//               name="SUBMIT"
//               classes={"sm:w-48"}
//               click={updateAttendance}
//             />
//           </div>
//         </div>
//       )}

       
     
//     </>
//   );
// }

// export default AttendanceSheet;
