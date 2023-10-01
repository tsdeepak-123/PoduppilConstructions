import React from 'react'
import Header from '../../components/AdminComponents/Header/Header'
import Footer from '../../components/AdminComponents/Footer/Footer'
import Project from '../../components/AdminComponents/Project/Project'

function ProjectDisplay() {
  return (
    <div>
      <Header headers="PROJECT MANAGEMENT"/>
      <Project/>
      <div className='mt-72'>
      <Footer/>
      </div>
    </div>
  )
}

export default ProjectDisplay
