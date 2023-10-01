import React from 'react'
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';

function Header({headers}) {
  const navigate=useNavigate()
  return (
    <div>

          <header className='flex justify-between fixed top-0 w-full z-50'>
            <div>
            <div className='w-[150px] h-auto'>
            <img className='cursor-pointer' src="/Images/podu.png" alt="Your Logo" onClick={()=>{navigate('/admin/dashboard')}}/>
        </div>
            </div>
            <h2 className='text-black mt-16 font-bold'>{headers}</h2>
        <Button startIcon={< PowerSettingsNewIcon />} style={{color:"red"}}>
        LOGOUT
        </Button>
    </header>
    </div>
  )
}

export default Header
