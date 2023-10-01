import React from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate=useNavigate()

    const handleLoginClick=()=>{
        navigate('/admin/login')
    }

  return (
<div>
  <div className="flex flex-col items-center">
    <img
      src="/Images/poduppilLogo.jpg"
      alt=""
      style={{ maxWidth: "100%", height: "83vh" }}
    />
    <div className="relative bottom-32">
      <Buttons name="LOGIN TO CONTINUE" classes={'h-14 w-[300px]'} click={handleLoginClick}/>
    </div>
  </div>
</div>

  );
}

export default Home;
