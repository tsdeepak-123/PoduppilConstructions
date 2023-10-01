import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";

function AddProject() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [upnext, setUpNext] = useState("");
  const [pending, setPending] = useState("");
  const [notes, setNotes] = useState("");
  const [projectnumber, setProjectNumber] = useState("");
  const [supervisorname, setSuperVisorName] = useState("");
  const handleBackArrowClick = () => {
    navigate(-1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleUpnextChange = (e) => {
    setUpNext(e.target.value);
  };
  const handlePendingChange = (e) => {
    setPending(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleSupervisorNameChange = (e) => {
    setSuperVisorName(e.target.value);
  };
  const handleProjectNumberChange = (e) => {
    setProjectNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosAdmin
      .post("addproject", {
        projectnumber,
        name,
        date,
        status,
        upnext,
        pending,
        notes,
        supervisorname,
      })
      .then((response) => {
        navigate("/admin/projectdetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex justify-start mt-32">
        <KeyboardReturnIcon
          className="ms-11 mt-4 cursor-pointer"
          onClick={handleBackArrowClick}
        />
      </div>
      <div>
        <form className="flex flex-wrap ms-16 px-16 mt-24">
          <TextFields
            name="Number"
            type="text"
            value={projectnumber}
            onChange={handleProjectNumberChange}
          />
          <TextFields
            name="Project name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <TextFields
            name="Starting Date"
            type="date"
            input={true}
            value={date}
            onChange={handleDateChange}
          />
          <TextFields
            name="Status"
            type="text"
            value={status}
            onChange={handleStatusChange}
          />
          <TextFields
            name="Up next"
            type="text"
            value={upnext}
            onChange={handleUpnextChange}
          />
          <TextFields
            name="Pending"
            type="text"
            value={pending}
            onChange={handlePendingChange}
          />
          <TextFields
            name="Supervisor name"
            type="text"
            value={supervisorname}
            onChange={handleSupervisorNameChange}
          />
          <TextFields
            name="Notes"
            type="text"
            value={notes}
            onChange={handleNotesChange}
          />
        </form>
        <div className="flex justify-center mt-11">
          <Buttons name="ADD PROJECT" classes={"w-96"} click={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default AddProject;
