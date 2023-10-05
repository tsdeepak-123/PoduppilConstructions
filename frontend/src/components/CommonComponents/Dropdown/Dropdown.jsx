import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dropdown() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
  return (
    <Box className='w-[300px]'>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">SELECT PROJECT</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="SELECT PROJECT"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}

export default Dropdown