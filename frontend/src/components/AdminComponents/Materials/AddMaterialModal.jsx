import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin } from '../../../Api/Api'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '40px',
    width: 400,
    bgcolor: '#FFF', // Use a light color for background
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Adjust box shadow
    p: 4,
  };
  

function AddMaterialModal() {
    const [open, setOpen] = useState(false);
    const [MaterialName, setMaterialName] = useState()
    const [MaterialRate, setMaterialRate] = useState()
     
  
    const handleMaterialNameChange=(e)=>{
      setMaterialName(e.target.value)
    }
    const handleMaterialRateChange=(e)=>{
      setMaterialRate(e.target.value)
    }
  
    const handleSubmit=async(e)=>{
      e.preventDefault()
      console.log(MaterialName,MaterialRate);
     const response= await axiosAdmin.post('addmaterial',{MaterialName,MaterialRate})
     console.log(response.data,'res.data canmme');
       handleClose()
    }
  
 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="success">
        +
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={12}>
            Add material
          </Typography>
          <div className='mb-4'>
          <TextField label="Material Name" type="text" fullWidth value={MaterialName} onChange={handleMaterialNameChange}/>
          <div className='mt-4'>
          <TextField label="Material Rate"type="number" fullWidth value={MaterialRate} onChange={handleMaterialRateChange}/>
          </div>
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default AddMaterialModal