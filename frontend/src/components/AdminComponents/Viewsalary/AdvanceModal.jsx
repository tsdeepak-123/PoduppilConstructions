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
  bgcolor: '#FFFFFF', // Use a light color for background
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Adjust box shadow
  p: 4,
};

function AdvancedModal({labourId,fetchData}) {
  const [open, setOpen] = useState(false);
  const [advance, setAdvance] = useState()
   
  console.log(labourId);

  const handleAdvanceChange=(e)=>{
    setAdvance(e.target.value)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
   const response= await axiosAdmin.post(`labouradvance?labourId=${labourId}`,{advance})
   console.log(response.data,'res.data canmme');
   if(response){
     fetchData()
     handleClose()

   }
  }

  console.log(advance);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        SALARY ADVANCE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={10}>
            Salary Advance
          </Typography>
          <div className='mb-4'>
          <TextField label="Advance" type="number" fullWidth value={advance} onChange={handleAdvanceChange}/>
          </div>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AdvancedModal;
