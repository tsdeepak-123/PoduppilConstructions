import React,{useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dropdown({projects}) {
    const [name, setName] =useState('');

    const handleChange = (event) => {
      setName(event.target.value);
    };

  
  return (
    <>
    {
      projects && projects.length>0 ?(
        
        <Box className='w-[380px]'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">SELECT PROJECT</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="SELECT PROJECT"
            onChange={handleChange}
          >
            {
            projects.map((item)=>
            <MenuItem value={item.name}>{item.name}</MenuItem>
            )
            }
           
          </Select>
        </FormControl>
      </Box>
        
      ):(
        <Box className='sm:w-[380px] w-80'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">No projects found</InputLabel>
          <Select
            id="demo-simple-select"
            label="SELECT PROJECT"
          > 
          </Select>
        </FormControl>
      </Box>
      )
     
    }
    </>
   
  )
}

export default Dropdown