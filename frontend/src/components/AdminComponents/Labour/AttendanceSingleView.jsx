// import React, { useEffect, useState } from 'react';
// import { axiosAdmin } from '../../../Api/Api'
// function AttendanceSingleView() {
//     const laborData= {
//         "2023-09-22": "present",
//         "2023-09-23": "halfday",
//         "2023-09-25": "absent",
//         "2023-09-24": "present"
//     }
  
//   const currentDate = new Date();
//     const[data,setData]=useState()
  
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();


//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

//   const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

//   const dates = [];

//   for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
//     dates.push(new Date(date));
//   }

//   const fetchData = async () => {
//     try {
//       const response = await axiosAdmin.get(`labourattendanceById?labourId=650d596703c7e32ffbef88a5`);
//       console.log(response?.data?.laborData);

//       setData(response?.data?.laborData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="calendar">
//       {dates.map((date) => {
//         const dateString = date.toISOString().split('T')[0];
//         const status = laborData[dateString];

       
//         const className = status === 'present'
//           ? 'presence'
//           : status === 'halfday'
//           ? 'halfday'
//           : status === 'absent'
//           ? 'absent'
//           : 'gray';

//         return (
//           <div key={dateString} className={`calendar-date ${className}`}>
//             {date.getDate()}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default AttendanceSingleView;




// import React, { useEffect, useState } from 'react';
// import { axiosAdmin } from '../../../Api/Api';

// function AttendanceSingleView() {
//   const currentDate = new Date();
//   const [data, setData] = useState();

//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//   const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

//   const dates = [];

//   for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
//     dates.push(new Date(date));
//   }

//   const fetchData = async () => {
//     try {
//       const response = await axiosAdmin.get(`labourattendanceById?labourId=650d596703c7e32ffbef88a5`);
//       console.log(response?.data?.laborData);

//       setData(response?.data?.laborData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="calendar">
//       {dates.map((date) => {
//         const dateString = date.toISOString().split('T')[0];
//         const status = data[dateString];

//         const className = status === 'present'
//           ? 'bg-green-300' 
//           : status === 'halfday'
//           ? 'bg-yellow-300' 
//           : status === 'absent'
//           ? 'bg-red-300' 
//           : 'bg-gray-300'; 

//         return (
//           <div key={dateString} className={`w-12 h-12 border border-gray-300 text-center leading-12 ${className}`}>
//             {date.getDate()}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default AttendanceSingleView;
import React, { useEffect, useState } from 'react';
import { axiosAdmin } from '../../../Api/Api';

function AttendanceSingleView() {
  const currentDate = new Date();
  const [data, setData] = useState();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);

  const dates = [];

  for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`labourattendanceById?labourId=650d596703c7e32ffbef88a5`);
      console.log(response?.data?.laborData);

      setData(response?.data?.laborData);

      // Determine the current month from the data
      if (response?.data?.laborData) {
        const firstDataDate = Object.keys(response.data.laborData)[0];
        const month = new Date(firstDataDate).getMonth();
        setCurrentMonth(month);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColorClass = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-300';
      case 'halfday':
        return 'bg-yellow-300';
      case 'absent':
        return 'bg-red-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="calendar">
      <div className="text-center font-semibold mb-2">
        {monthNames[currentMonth]} {currentDate.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {dates.map((date) => {
          const dateString = date.toISOString().split('T')[0];
          const status = data && data[dateString] ? data[dateString] : 'gray';
          const className = getColorClass(status);

          return (
            <div
              key={dateString}
              className={`w-12 h-12 border border-gray-300 text-center leading-12 ${className}`}
            >
              <span
                className={status === 'absent' ? 'text-white' : 'text-black'}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttendanceSingleView;
