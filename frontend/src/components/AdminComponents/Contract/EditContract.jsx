import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import TextFields from '../../CommonComponents/TextFields/TextFields'
import Buttons from '../../CommonComponents/Button/Buttons'
import { axiosAdmin } from '../../../Api/Api'
import Dropdown from '../../../components/CommonComponents/Dropdown/Dropdown'
import ReturnButton from "../../CommonComponents/Return/ReturnButton";


function EditContract() {
  const navigate = useNavigate();
  const location=useLocation()
  console.log(location?.state?.data,'location data came in this page ');

  const [projectname,setProjectName]=useState("")
  const [Contractwork,setContractwork]=useState("")
  const [Contractorname,setContractorname]=useState("")
  const [totallabour,settotallabour]=useState(0)
  const [totalhelper,setTotalhelper]=useState(0)
  const [Details,setDetails]=useState("")
  const [status,setStatus]=useState("")
  const [Amount,setAmount]=useState(0)
  const [Paymentdetails,setPaymentdetails]=useState(0)
  // const [age,setAge]=useState("")
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
  const [projectData,setProjectData] = useState('')

  const handleDataReceived = (projectname) => {
    setProjectName(projectname)
  };
  console.log(projectname,"theeeeeeeeee namweeeeeeeeeee");
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosAdmin
      .post("AddContract", {
        projectname,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount
      })
      .then((response) => {
        console.log(response);
        navigate("/admin/contractdetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList");
      console.log(response?.data?.FindProject);

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
    <ReturnButton/>
      <div  className='flex flex-wrap justify-around px-16 mt-24'>
      <div className="ms-4 sm:mb-0 mb-4">
      <Dropdown projects={projectData} onDataPassed={handleDataReceived}/>
      </div>  
      <TextFields name="Contract work name" onChange={(e) => {setContractwork(e.target.value)}} type="text"/>
      <TextFields name="Contractor name"  onChange={(e) => {setContractorname(e.target.value)}} type="text"/>
      <TextFields name="Contractor phone"  onChange={(e) => {setPhone(e.target.value)}} type="number"/>
      <TextFields name="Total main labours" onChange={(e) => {settotallabour(e.target.value)}} type="number"/>
      <TextFields name="Total helpers" onChange={(e) => {setTotalhelper(e.target.value)}} type="number"/>
      <TextFields name="Other details"  onChange={(e) => {setDetails(e.target.value)}} type="text"/>
      <TextFields name="Work status"  onChange={(e) => {setStatus(e.target.value)}}type="text"/> 
      <TextFields name="Contraction Amount"  onChange={(e) => {setAmount(e.target.value)}} type="text"/> 
      <TextFields name="Payment details"  onChange={(e) => {setPaymentdetails(e.target.value)}} type="text"/> 
      <TextFields name="date" type="date"  onChange={(e) => {setDate(e.target.value)}} input={true}/> 
    <div className="flex justify-center mt-3">
          <Buttons name="ADD CONTRACT" classes={"sm:w-96"} click={handleSubmit} />
        </div>
   </div> 
    </>
  );
}

export default EditContract;