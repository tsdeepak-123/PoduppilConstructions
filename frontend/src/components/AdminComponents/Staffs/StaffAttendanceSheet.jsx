import React, { useEffect, useState } from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import AttendanceBar from "../Attendance/AttendanceBar";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import AttendanceDisplay from "../Labour/AttendanceDisplay";
import Nodata from "../../CommonComponents/Nodata/Nodata";

const StaffAttendanceSheet = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [attendanceData, SetAttendanceData] = useState([]);
  const location = useLocation();
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("staffslist");
      console.log(response?.data?.allStaffData, "response");
      setStaffData(response?.data?.allStaffData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axiosAdmin.get("staffattendanceList");
      console.log(response?.data?.StaffAttendance);
      SetAttendanceData(response?.data?.StaffAttendance);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAttendance();
  }, []);

  const handleAddStaff = () => {
    navigate("/admin/addstaff");
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
    staffData.forEach((item) => {
      initialValues[item._id] = "absent";
    });
    setSelectedValues(initialValues);
  }, [staffData]);

  const updateAttendance = () => {
    console.log(selectedValues);
    axiosAdmin
      .post("staffattendance", { selectedValues })
      .then((res) => {
        console.log("res", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ReturnButton />
      <AttendanceBar click={handleAddStaff} name="+ ADD NEW STAFF" />
      <div>
        {staffData.length === 0 ? (
          <Nodata />
        ) : attendanceData?.length > 0 ? (
          <AttendanceDisplay attendanceData={attendanceData} />
        ) : (
          <div className="grid grid-cols-1 ml-3 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full overflow-y-auto mb-10">
            {staffData.map((item) => (
              <div
                key={item._id}
                className="p-4 flex gap-4 w-auto rounded-2xl shadow-xl"
              >
                <div className="w-[40%]">
                  <img
                    className="w-16 rounded-full h-16"
                    src={item.photo}
                    alt="staff photo"
                  />
                  <div>
                    <p className="text-lg font-medium mt-4 flex">{item.name}</p>
                  </div>
                </div>
                <div className="flex gap-10 grid-cols-3 mb-5 items-center w-full">
                  <div className="w-10 h-10">
                    <label>
                      <input
                        type="radio"
                        name={`attendance_${item._id}`}
                        value="present"
                        checked={selectedValues[item._id] === "present"}
                        onChange={(event) =>
                          handleRadioButtonChange(event, item._id)
                        }
                      />
                      <span className="text-xs font-medium">PRESENT</span>
                    </label>
                  </div>
                  <div className="w-10 h-10">
                    <label>
                      <input
                        type="radio"
                        name={`attendance_${item._id}`}
                        value="halfday"
                        checked={selectedValues[item._id] === "halfday"}
                        onChange={(event) =>
                          handleRadioButtonChange(event, item._id)
                        }
                      />
                      <span className="text-xs font-medium">HALF_DAY</span>
                    </label>
                  </div>
                  <div className="w-10 h-10">
                    <label>
                      <input
                        type="radio"
                        name={`attendance_${item._id}`}
                        value="absent"
                        checked={selectedValues[item._id] === "absent"}
                        onChange={(event) =>
                          handleRadioButtonChange(event, item._id)
                        }
                      />
                      <span className="text-xs font-medium">ABSENT</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <div className="justify-center items-center flex mt-7 w-full mb-10">
              <Buttons
                type="submit"
                name="SUBMIT"
                classes={"w-96"}
                click={updateAttendance}
              />
              {/* <button className=' p-2 border-black outline rounded-xl bg-green-600 text-white' onClick={updateAttendance}>submit</button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StaffAttendanceSheet;
