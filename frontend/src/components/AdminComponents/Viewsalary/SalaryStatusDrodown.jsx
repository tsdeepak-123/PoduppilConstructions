import React,{useState} from 'react'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SalaryStatusDrodown() {
    const [status, setStatus] =useState('');

    const handleChange = (event) => {
      setStatus(event.target.value);
    };
  
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Calculated</em>
          </MenuItem>
          <MenuItem value={"paid"} className='text-green-500  '>Paid </MenuItem>
          <MenuItem value={"pending"}>pending</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SalaryStatusDrodown