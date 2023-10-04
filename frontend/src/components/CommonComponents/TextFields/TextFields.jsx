import React from "react";
import TextField from "@mui/material/TextField";

function TextFields({name,type,input,value,onChange}) {
  return (
    <div  style={{ marginBottom: "16px" ,marginLeft:'16px'}}>
        {input ? 
         <TextField id="outlined-basic" label={name}  variant="outlined" className="w-96" type={type} InputLabelProps={{shrink:{input}}} value={value} onChange={onChange}/>: <TextField id="outlined-basic" value={value} onChange={onChange} label={name} variant="outlined" className="w-96" type={type}/>}
        
     
    </div>
  );
}

export default TextFields;
