import React,{useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MaterialDropdown(materials,onDataPassed) {
    const [Materialname, setMaterialname] =useState('');
    const handleChange = (e) => {
      const selectedMaterialname=e.target.value
      setMaterialname(selectedMaterialname);
      materials.onDataPassed(selectedMaterialname)
    };
     
    console.log(materials,"iammmmmmmmmmm");

  return (
    <>
    {
      materials?.materials?.length>0 ?(
        
        <Box className='w-[380px]'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">SELECT MATERIAL</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Materialname}
            label="SELECT PROJECT"
            onChange={handleChange}
          >
            {
            materials?.materials?.map((item)=>
            <MenuItem value={item?.name}>{item?.name}</MenuItem>
            )
            }
           
          </Select>
        </FormControl>
      </Box>
        
      ):(
        <Box className='sm:w-[380px] w-80'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">No materials found</InputLabel>
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

export default MaterialDropdown