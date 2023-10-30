import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from '../../CommonComponents/Button/Buttons'
import SingleView from '../../AdminComponents/Materials/SingleView'
import PhotoAddModal from './PhotoAddModal';
import Swal from 'sweetalert2'

const SingleViewProject = () => {
  const location = useLocation()
  const [projectData, setProjectData] = useState(null)
  const [materialData, setMaterialData] = useState(null)

  const id = location?.state?.id;

  // Fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`projectById?id=${id}`);
      console.log(response?.data?.FindProject);

      setProjectData(response?.data?.FindProject);
    } catch (error) {
      console.log(error);
    }
  };

 const fetchMaterialData=async()=>{
  try {
    const response = await axiosAdmin.get(`PurchaseBillById?projectid=${id}`);
     setMaterialData(response?.data?.PurchaseData)
    
  } catch (error) {
    console.log(error);
  }
 }

  const handleCompletedProjects=async()=>{
   try {
   
      Swal.fire({
        title: 'Is the project completed ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, completed!'
      }).then((result) => {
          if (result.isConfirmed) {
            axiosAdmin.post(`completedprojects?id=${id}`)
            Swal.fire(
              'Work completed',
              'The project is added to completed projects',
              'success',
            )
        }
     
   
      })
     
    
   } catch (error) {
    console.log(error);
   }

  }

  // Data displaying when mounting
  useEffect(() => {
    fetchData();
    fetchMaterialData()
  }, [id]);

  console.log(materialData,"from page");
return (
  <>
    <ReturnButton />
    {projectData && projectData.map((project, index) => (
      <div key={index} className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
  {
    project.photos.length>0 ?(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-6 md:mb-0">
        <img src={project.photos[0]} alt="Project Image 1" className="w-full h-96 rounded-lg" />
      </div>
      <div className="mb-6 md:mb-0">
        <img src={project.photos[1]} alt="Project Image 2" className="w-full h-96 rounded-lg" />
      </div>
    </div>
    ):( 
       project.isCompleted==false ? <p className='text-red-500'>Please add project photos</p>:""
    )

  }

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <p><strong>Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {project.status}</p>
          <p><strong>Pending&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {project.pending}</p>
          <p><strong>Up-next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {project.upnext}</p>
          <p><strong>Supervisor name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {project.supervisorname}</p>
          <p><strong>Notes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> {project.notes}</p>
        </div>
        {
          project.isCompleted==false ?(
            <div className='flex justify-end gap-4 mt-14'>
            <div>
            <PhotoAddModal projectId={project._id}/>
            <p className='text-green-500'>You can add two photos</p>
            </div>
            <div>
            <Buttons name="WORK COMPLETED" click={handleCompletedProjects}/>
            <p className='text-red-500'>If project is completed <br/>click here !</p>
            </div>   
          </div>
          ):(
            ""
          )

        }

      </div>
    ))}

    <div className='flex flex-wrap justify-center mt-14'>
      <p className=' font-serif font-bold text-[30px]'>Material Used For This Project</p>
    </div>
    <SingleView materialData={materialData}/>
  </>
)
        }

export default SingleViewProject
