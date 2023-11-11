import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import ProjectList from '../../../components/AdminComponents/Project/ProjectList'




function ProjectLists() {

  return (
    <div>
        <Header headers="MATERIAL DETAILS"/>
        <ProjectList/>
        <div className='mt-40'>
        <Footer/>
        </div>
       
      
    </div>
  )
}

export default ProjectLists
