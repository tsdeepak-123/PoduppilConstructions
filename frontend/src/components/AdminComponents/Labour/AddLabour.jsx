import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import TextFields from '../../CommonComponents/TextFields/TextFields';
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from '../../../Api/Api'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import TextField from "@mui/material/TextField";
import toast, { Toaster } from 'react-hot-toast';
 import Swal from 'sweetalert2'
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
  const [idproof,setIdproof] = useState([])
  const [photo,setphoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()


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
    const selectedPhotos = e.target.files;
    setIdproof(selectedPhotos)
   
  }

  
  const handleImageChange=(e)=>{
    const file = e.target.files[0];
    setphoto(file)
  }


  const handleSubmit=(e)=>{
try {
  e.preventDefault()
  setLoading(true)

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
  for (const proof of idproof) {
    formData.append("proof", proof);
  }

  // formData.append("proof",idproof);
  formData.append("photo",photo);
  axiosAdmin.post('addlabour',formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }  
       
       
  }).then((response)=>{
    setLoading(false)
    if(response.data.success){
      Swal.fire('Labour added successfully')
      navigate('/admin/labourdetails')
    }
    toast.error(response?.data?.message);
    
   
  })
} catch (error) {
  setLoading(false)
  toast.error(error.response?.data?.message);
  if (error.response && error.response.status === 401) {
    window.location.replace("/admin/login")
  }
}

  }
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
    <ReturnButton/>
      <div className='flex flex-wrap justify-around px-16 mt-24'>
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
      <TextField
              type="file"
              label="idproof"
              InputLabelProps={{shrink:true}}
              inputProps={{ multiple: true }}
              className='sm:w-96 w-80'
              onChange={handleproofChange}
              
            />
      <>
      <Buttons click={handleSubmit} name={loading ?"LOADING...":"ADD LABOUR"} classes={'sm:w-96'} />
      </>  
   </div>
</>
  )
}

export default AddLabour
