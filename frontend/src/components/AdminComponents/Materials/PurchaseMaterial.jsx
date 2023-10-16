import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
import MaterialDropdown from "./MaterialDropdown";
import Buttons from '../../CommonComponents/Button/Buttons'
import AddMaterialModal from "./AddMaterialModal";
function PurchaseMaterial() {
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");
  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };
  const handleMaterialDataRecieved=()=>{
    setMaterialName(MaterialName)
  }
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList");
      console.log(response?.data?.FindProject);

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get("allmateriallist");
      console.log(response?.data?.allMaterials);

      setMaterialData(response?.data?.allMaterials)
    } catch (error) {
      console.log(error);
    }
  };


  //data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData()
  }, []);

  // console.log(projectname);
  console.log(MaterialData,"kioooo");
  return (
    <div>
        <ReturnButton/>
      <div className="flex justify-center items-center mt-24 gap-7">
        <Dropdown projects={projectData} onDataPassed={handleDataReceived} />
        <MaterialDropdown materials={MaterialData} onDataPassed={handleMaterialDataRecieved}/>
        <AddMaterialModal/>
      </div>
      
    </div>
  );
}

export default PurchaseMaterial;
