import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
import MaterialDropdown from "./MaterialDropdown";
import Buttons from "../../CommonComponents/Button/Buttons";
import AddMaterialModal from "./AddMaterialModal";
import TextFields from "../../CommonComponents/TextFields/TextFields";
function PurchaseMaterial() {
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };
  const handleMaterialDataRecieved = () => {
    setMaterialName(MaterialName);
  };
  const handleQuantitychange=(e)=>{
    setQuantity(e.target.value)
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
      // console.log(response?.data?.allMaterials);

      setMaterialData(response?.data?.allMaterials);
    } catch (error) {
      console.log(error);
    }
  };

  //data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData();
  }, [MaterialName]);

  // console.log(projectname);
  console.log(quantity, "kioooo");
  return (
    <div>
      <ReturnButton />
      <div className="flex flex-col justify-center items-center">
        <div>
        <Dropdown projects={projectData} onDataPassed={handleDataReceived} />
        </div>
        <div className="flex mt-6 flex-row gap-4">
        <MaterialDropdown
          materials={MaterialData}
          onDataPassed={handleMaterialDataRecieved}
        />
        </div>
        <div className="flex ms-[500px]">
        <AddMaterialModal />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        <TextFields name="Quantity" type="number" onChange={handleQuantitychange}/>
      </div>
      <div className="mt-2 flex justify-center">
        <Buttons name="SUBMIT" />
        </div>
    </div>
  );
}

export default PurchaseMaterial;
