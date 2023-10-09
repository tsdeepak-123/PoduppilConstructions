import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import ProjectList from '../../../components/AdminComponents/Project/ProjectList'
import Dropdown from '../../../components/CommonComponents/Dropdown/Dropdown'



function ProjectLists() {
  return (
    <div>
        <Header headers="MATERIAL DETAILS"/>
        <ProjectList/>
        <div className='flex justify-center items-center mt-24'>
          <Dropdown/>
        </div> 
        <div className='mt-52'>
        <Footer/>
        </div>
       
      
    </div>
  )
}

export default ProjectLists
