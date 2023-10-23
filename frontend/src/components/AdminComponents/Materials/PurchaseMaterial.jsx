import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
// import MaterialDropdown from "./MaterialDropdown";
import Buttons from "../../CommonComponents/Button/Buttons";
import AddMaterialModal from "./AddMaterialModal";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import PurchaseTable from "./PurchaseTable";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function PurchaseMaterial() {
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [MaterialData, setMaterialData] = useState("");
  const [MaterialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState();
  const [selectedValues, setSelectedValues] = useState([])
  const [Rate,setRate] = useState();
  const [table,setTable] = useState(false);
  const [date,setDate ]= useState();

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

  const handleRatechange = (e) => {
  
    setRate(e.target.value);
  };
  const handleDatechange = (e) => {
    setDate(e.target.value);
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


  const handleChange = (e) => {
    const selectedMaterialname = e.target.value;
    setMaterialName(selectedMaterialname);
    console.log(selectedMaterialname, "nameeeeeeeeeeeeeeeeeeeeeee");
  }

  const handleMaterials = (material, quantity,Rate) => {
    setMaterialName("")
    setQuantity("")
    setRate("")
    setTable(true)
    console.log(material,quantity,'dggdgdgdggffdhg',Rate);
   
    const newMaterial = {
      name: material,
      quantity: quantity,
      baseRate:Rate,
      total:Rate*quantity
    };
    setSelectedValues((prevSelectedValues) => ([...prevSelectedValues,newMaterial]));
  };

  console.log(selectedValues,"selectedValuesssssss");
 
  return (
    <div>
      <ReturnButton />

      { projectname ?
      <>
      <p className="flex justify-center font-bold">  PROJECT : &nbsp;&nbsp; {projectname}</p>
        <div className="flex justify-center gap-4 mt-8">
        <>
      {MaterialData?.length > 0 ? (
        <Box className='w-[380px]'>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">SELECT MATERIAL</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={MaterialName}
              label="SELECT PROJECT"
              onChange={handleChange}
            >
              {MaterialData.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box className='sm:w-[380px] w-80'>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">No materials found</InputLabel>
            <Select id="demo-simple-select" label="SELECT PROJECT" disabled>
              <MenuItem>No materials found</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </>
          <div className="mt-3">
          <AddMaterialModal />
          </div>
          
          <TextFields
            name="Quantity"
            value={quantity}
            type="number"
            onChange={handleQuantitychange}
          />
          <TextFields
            name="BaseRate"
            value={Rate}
            type="number"
            onChange={handleRatechange}
            />
          {/* <Buttons name="SUBMIT" click={handleMaterialSubmit} /> */}
            <div className="mt-2">
          <Buttons name="SUBMIT" click={()=>handleMaterials(MaterialName,quantity,Rate)} />
          </div> 
        </div>
        {
           table?
          <>
          <div className="flex justify-center">
          <PurchaseTable  values={selectedValues}/>
          {/* materialName={MaterialName} quantity={quantity} */}

 
       </div>
       <div className="flex justify-center mt-10">

<Buttons name="SUBMIT" click={handleMaterialSubmit} />
       </div>
       </>:""
        }

        </>
                :<div className="flex justify-center gap-4">
                  <TextFields name="Purchase date" type="date" input={true} onChange={ handleDatechange}/>
        <Dropdown projects={projectData} onDataPassed={handleDataReceived} />
      </div>
      }
    
    </div>
  );
}

export default PurchaseMaterial;
