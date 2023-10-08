import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Labour from '../../../components/AdminComponents/Labour/Labour'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function LabourControll() {
  return (
    <div className='overflow-hidden'>
      <Header headers="LABOUR MANAGEMENT"/>
      <Labour/>
      <div className='mt-72'>
      <Footer/>
      </div>
      
    </div>
  )
}

export default LabourControll
