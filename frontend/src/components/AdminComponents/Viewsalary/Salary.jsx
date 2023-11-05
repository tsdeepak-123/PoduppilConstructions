import React, { useEffect, useState } from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import { LuIndianRupee } from "react-icons/lu";
import AdvanceModal from "./AdvanceModal";
import moment from "moment";
function Salary() {
  const location = useLocation();
  const id = location?.state?.id;
  // console.log(location?.state?.id,'cameee');
  const [LabourData, setLabourData] = useState();
  const [selectedDate, setselectedDate] = useState();
  // const[newDate,setnewDate]=useState()
  const navigate = useNavigate();
  // const handleProfileButton = () => {
  //   navigate("/admin/viewprofile");
  // };
  // const handleAttendanceButton = () => {
  //   navigate("/admin/attendancesingle",{ state : {id} } );
  // };
  const handleBackArrowClick = () => {
    navigate("/admin/labourdetails");
  };
  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(
        `salarycalculation?laborId=${location?.state?.id}`
      );
      console.log(response?.data?.salaryData);

      setLabourData(response?.data?.salaryData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  const inputDate = new Date(LabourData?.calculateTo);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = inputDate.getUTCDate();
  const month = months[inputDate.getUTCMonth()];
  const year = inputDate.getUTCFullYear();
  const formattedDate = `${day} / ${month} / ${year}`;
  console.log(Number(LabourData?.lastweek) - Number(LabourData?.advance) ?? 0);

  const salaryoflabour = async () => {
    try {
      // const id=LabourData?.LabourData?._id
      // console.log(selectedDate,'dateee');
      const response = await axiosAdmin.post(
        `salaryoflabour?laborId=${location?.state?.id}&laborSalarydate=${selectedDate}`
      );

      console.log(response?.data?.message, "response");
      window.location.reload();
      // navigate('/admin/viewsalary',{ state: {id } })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const datePortion =
    LabourData?.LabourData?.lastsalaryDate?.match(/^\d{4}-\d{2}-\d{2}/)[0];

  if (datePortion) {
    const originalDate = new Date(datePortion);

    originalDate.setDate(originalDate.getDate());

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");

    var newDate = `${year}-${month}-${day}`;

    console.log(newDate);
  } else {
    console.log("Date portion is undefined or invalid.");
  }

  console.log(datePortion, "datePortion", newDate);
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
          <div>
            <img
              src={LabourData?.LabourData?.photo}
              alt="User Photo"
              class="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold text-xl">
              {LabourData?.LabourData?.name}
            </h2>
            <h5>{LabourData?.LabourData?.phone}</h5>
          </div>
        </div>
        <div className="flex justify-end">
          <AdvanceModal
            labourId={LabourData?.LabourData?._id}
            fetchData={fetchData}
          />
        </div>
        <h1 class="text-2xl font-bold mb-4">Salary Details</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-2">Basic Salary</h2>

            <p className="flex">
              <LuIndianRupee className="mt-1" />{" "}
              {LabourData?.LabourData?.salary}
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-2">Attendance Details</h2>
            <p>Present &nbsp;&nbsp;&nbsp;&nbsp;: {LabourData?.present} days</p>
            <p>Halfday &nbsp;&nbsp;&nbsp;&nbsp;: {LabourData?.halfday}days</p>
            <p>
              Absent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {LabourData?.absent} days
            </p>
            {/* <p>Over Time : {LabourData?.overtime} hours</p> */}
          </div>

          {/* { LabourData?.balance ? 
   <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-2">Balance This Week</h2>
      
      <br/>
      {LabourData?.balance&&<p className='flex'>< LuIndianRupee className='mt-1'/>{LabourData?.balance}</p>}
      </div>
       :''}  */}

          {LabourData?.lastweek ? (
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Salary</h2>
              <p className="flex">
                <LuIndianRupee className="mt-1" />
                {LabourData?.lastweek}
              </p>
            </div>
          ) : (
            ""
          )}
          {LabourData?.advance || LabourData?.advance == 0 ? (
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Advance</h2>
              <p className="flex">
                <LuIndianRupee className="mt-1" />
                {LabourData?.advance}
              </p>
            </div>
          ) : (
            ""
          )}
          {LabourData?.balance ? (
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Balance</h2>
              <p className="flex">
                <LuIndianRupee className="mt-1" />
                {LabourData?.balance}
              </p>
            </div>
          ) : (
            ""
          )}

          {LabourData?.updatedSalary ? (
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Amount to be paid</h2>
              <p className="flex">
                <LuIndianRupee className="mt-1" />
                {LabourData?.updatedSalary}
              </p>
            </div>
          ) : (
            ""
          )}

          {LabourData?.calculateTo ? (
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Calculated At</h2>
              <p className="flex">{formattedDate}</p>
            </div>
          ) : (
            ""
          )}

          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-2">Salary History</h2>
            <p className="text-blue-500 cursor-pointer">View History</p>
          </div>
          <div className="mt-6 flex flex-row gap-4">
            {/* <TextFields onChange={(e) => {setselectedDate(e.target.value)}} min={datePortion} name='Date' type='date' input={true}/> */}

            <input
              type="date"
              value={selectedDate}
              min={newDate}
              onChange={(e) => {
                setselectedDate(e.target.value);
              }}
            />

            <Buttons
              click={salaryoflabour}
              name="Calculate salary"
              className="justify-center"
              classes={"h-14"}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex flex-wrap justify-around mb-7">
        <Buttons name="VIEW LABOUR PROFILE" click={handleProfileButton} />
        <Buttons
          name="VIEW LABOUR ATTENDANCE"
          classes={"ms-4"}
          click={handleAttendanceButton}
        />
      </div> */}
    </>
  );
}

export default Salary;
