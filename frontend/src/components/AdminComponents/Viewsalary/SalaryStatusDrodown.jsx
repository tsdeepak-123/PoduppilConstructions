import React,{useState} from 'react'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SalaryStatusDrodown({status}) {
    const [State, setState] =useState('');

    const handleChange = (event) => {
      setState(event.target.value);
    };
  
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={State}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            {status}
          </MenuItem>
          <MenuItem value={"paid"} className='text-green-500  '>Paid </MenuItem>
          <MenuItem value={"pending"}>pending</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SalaryStatusDrodown