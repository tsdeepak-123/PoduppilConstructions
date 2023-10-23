import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
import MaterialDropdown from "./MaterialDropdown";
import Buttons from "../../CommonComponents/Button/Buttons";
import AddMaterialModal from "./AddMaterialModal";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import PurchaseTable from "./PurchaseTable";
function PurchaseMaterial() {
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState();
  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };
  const handleMaterialDataRecieved = () => {
    console.log(MaterialName,"heyyyyyyyyyyyyyyy");
    setMaterialName(MaterialName);
  };
  const handleQuantitychange = (e) => {
    setQuantity(e.target.value);
  };
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


  const handleMaterialSubmit = async () => {
    try {
      const response = await axiosAdmin.post("/purchasematerial",{MaterialName,quantity,projectname});
      console.log(response?.data?.FindProject);

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      console.log(error);
    }
  };


  //data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData();
  }, [MaterialName]);

  console.log(MaterialName,"materiallllllllllllllllllllllllllllllllllllllllll");
  console.log(quantity, "kioooo");
  return (
    <div>
      <ReturnButton />

      { projectname ?
      <>
      <p className="flex justify-center font-bold">  PROJECT : &nbsp;&nbsp; {projectname}</p>
        <div className="flex justify-center gap-4 mt-8">
          <MaterialDropdown
            materials={MaterialData}
            onDataPassed={handleMaterialDataRecieved}
          />
          <div className="mt-3">
          <AddMaterialModal />
          </div>
          
          <TextFields
            name="Quantity"
            type="number"
            onChange={handleQuantitychange}
          />
          <div className="mt-2">
          <Buttons name="SUBMIT" click={handleMaterialSubmit} />
          </div> 
        </div>
        <div className="flex justify-center">
           <PurchaseTable />
           {/* materialName={MaterialName} quantity={quantity} */}
        </div>
        </>
                :      <div className="flex justify-center">
        <Dropdown projects={projectData} onDataPassed={handleDataReceived} />
      </div>
      }
    </div>
  );
}

export default PurchaseMaterial;
