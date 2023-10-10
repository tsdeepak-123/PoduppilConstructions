import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { axiosAdmin } from '../../../Api/Api'
import Dropdown from '../../CommonComponents/Dropdown/Dropdown'


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '40px',
    width: 500,
    bgcolor: '#FFFFFF', // Use a light color for background
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Adjust box shadow
    p: 4,
  };

function AttendanceEdit() {

    const [open, setOpen] = useState(false);
    const [labourData,setLabourData]=useState()
    const [LabourId,setLabourId] = useState()

    const handleDataReceived = (LabourId) => {
        setLabourId(LabourId)
      };
      console.log(LabourId);
    // console.log(labourId);
    // const handleAdvanceChange=(e)=>{
    //     setAdvance(e.target.value)
    //   }
    
    //   const handleSubmit=async(e)=>{
    //     e.preventDefault()
    //    const response= await axiosAdmin.post(`labouradvance?labourId=${labourId}`,{advance})
    //    console.log(response.data,'res.data canmme');
    //    if(response){
    //      fetchData()
    //      handleClose()
    
    //    }
    //   }
    
    //   console.log(advance);

    const fetchLabourData=async()=>{
        const response= await axiosAdmin.get('labourslist')
       console.log(response?.data,'res.data canmme');
       setLabourData(response?.data?.allLabourData)
    }
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
 
      useEffect(()=>{
          fetchLabourData()
      },[])
    
  return (
    <>
    <Button onClick={handleOpen} variant="outlined" color="primary">
     EDIT ATTENDANCE
    </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div className='mb-4'>
        <Typography variant="h5" className='flex justify-center'>
          EDIT ATTENDANCE
        </Typography>
        </div>
    
        <div className='mb-4 ms-8'>
            <Dropdown onDataPassed={handleDataReceived} name="Labour" data={labourData}/>
        {/* <TextField label="Advance" type="number" fullWidth value={""} onChange={""}/> */}
        </div>
        <div className='flex justify-center'>
        <Button variant="contained" color="primary" className='w-60' onClick={""}>
          Submit
        </Button>
        </div>
      </Box>
    </Modal>
  </>
  )
}

export default AttendanceEdit