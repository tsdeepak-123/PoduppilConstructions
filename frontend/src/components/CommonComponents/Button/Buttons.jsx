import React from 'react'
import Button from "@mui/material/Button"

function Buttons({classes,name,click}){
  return (
    <div>
      <Button className={classes} variant="contained" style={{backgroundColor:"green"}} onClick={click}>{name}</Button>
    </div>
  )
}

export default Buttons
