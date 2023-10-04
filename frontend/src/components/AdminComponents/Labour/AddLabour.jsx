import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from '../../../Api/Api'
import Input from "@mui/material/Input";
function AddLabour() {
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [phone,setPhone] = useState('')
  const [street,setStreet] = useState('')
  const [post,setPost] = useState('')
  const [town,setTown] = useState('')
  const [district,setDistrict] = useState('')
  const [state,setState] = useState('')
  const [adhar,setAdhar] = useState('')
  const [pincode,setPincode] = useState('')
  const [salary,setSalary] = useState('')
  const [date,setDate] = useState('')
  const [idproof,setIdproof] = useState(null)
  const [photo,setphoto] = useState(null)
  const navigate= useNavigate()
  const handleBackArrowClick=()=>{
      navigate(-1)
  }

  const handleNameChange=(e)=>{
    setName(e.target.value)
  }
  const handleAgeChange=(e)=>{
    setAge(e.target.value)
  } 
  const handlePhoneChange=(e)=>{
    setPhone(e.target.value)
  }
  const handleStreetChange=(e)=>{
    setStreet(e.target.value)
  }
  const handlePostChange=(e)=>{
    setPost(e.target.value)
  }
  const handleTownChange=(e)=>{
    setTown(e.target.value)
  }
  const handleDistrictChange=(e)=>{
    setDistrict(e.target.value)
  }
  const handleStateChange=(e)=>{
    setState(e.target.value)
  }
  const handlePincodeChange=(e)=>{
    setPincode(e.target.value)
  }
  const handleSalaryChange=(e)=>{
    setSalary(e.target.value)
  }
  const handleDateChange=(e)=>{
    setDate(e.target.value)
  }
  const handleAdharChange=(e)=>{
    setAdhar(e.target.value)
  }
  const handleproofChange=(e)=>{
    // setIdproof(e.target.value)
    console.log(e.target.files[0],'tagetfile');
    const file = e.target.files[0];
    setIdproof(file)
  }


  // const handleproofChange = (e) => {
  //   const files = e.target.files;
  //   const selectedFiles = [];
  
  //   for (let i = 0; i < files.length; i++) {
  //     selectedFiles.push(files[i]);
  //   }
  
  //   setIdproof(selectedFiles);
  // };
  
  const handleImageChange=(e)=>{
    // setIdproof(e.target.value)
    console.log(e.target.files[0],'tagetfile');
    const file = e.target.files[0];
    setphoto(file)
  }


  const handleSubmit=(e)=>{
    console.log('submiting data');
    e.preventDefault()

    const LabourData={
      name,
      age,
      phone,
      street,
      post,
      town,
      district,
      state,
      pincode,
      salary,
      adhar,
      date
    }
    const formData = new FormData();
    
    Object.entries(LabourData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(idproof,'idproof');

    formData.append("proof",idproof);
    formData.append("photo",photo);
    axiosAdmin.post('addlabour',formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
     
    }).then((response)=>{
      alert(response?.data?.message);
      console.log(response?.data?.message,'response for adding labour');
      navigate('/admin/labourdetails')
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <>
    <div className='flex justify-start mt-32'>
    <KeyboardReturnIcon className='ms-11 mt-4 cursor-pointer'onClick={handleBackArrowClick} />
    </div>
   <div>
    <form action='' className='flex flex-wrap ms-16 px-16 mt-24' onSubmit={handleSubmit}>
      <TextFields name="Labour name" type="text" value={name} onChange={handleNameChange}/>
      <TextFields name="Age" type="number" value={age} onChange={handleAgeChange}/>
      <TextFields name="Phone number" type="text" value={phone} onChange={handlePhoneChange}/>
      <TextFields name="Street name" type="text" value={street} onChange={handleStreetChange}/>
      <TextFields name="Post office" type="text" value={post} onChange={handlePostChange}/>
      <TextFields name="Town" type="text" value={town} onChange={handleTownChange}/>
      <TextFields name="District" type="text" value={district} onChange={handleDistrictChange}/>
      <TextFields name="State" type="text" value={state} onChange={handleStateChange}/>
      <TextFields name="Adhar Number" type="number" value={adhar} onChange={handleAdharChange}/>
      <TextFields name="Pincode" type="number" value={pincode} onChange={handlePincodeChange}/>
      <TextFields name="Basic salary" type="number" value={salary} onChange={handleSalaryChange}/>
      <TextFields name="Date of joining" type="date"  value={date} onChange={handleDateChange} input={true}/>
      <TextFields name="photo" type="file"  input={true} onChange={handleImageChange}/>
      <TextFields name="IDProof" type="file" input={true} onChange={handleproofChange} />
      
    <div className='mx-auto mt-11'>
    {/* <button type="submit" className="text-[#fff] bg-[#3ef112] rounded-md font-medium my-6 px-6 py-3 w-auto items-center self-center">submit</button> */}
    <Buttons type="submit" name="ADD LABOUR" classes={'w-96'} />
    </div>
    </form>
   </div>
</>
  )
}

export default AddLabour
