import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import AddStaff from '../../../components/AdminComponents/Staffs/AddStaff'


function StaffAdding() {
  return (
    <div>
      <Header headers="ADD NEW STAFF"/>
      <AddStaff/>
      <div className='mb-6'></div>
      <Footer/>
    </div>
  )
}

export default StaffAdding
