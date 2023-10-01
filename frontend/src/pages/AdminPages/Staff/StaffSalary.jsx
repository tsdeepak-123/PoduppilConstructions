import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Salary from '../../../components/AdminComponents/Viewsalary/Salary'


function StaffSalary() {
  return (
    <div>
        <Header headers='STAFF SALARY DETAILS'/>
        <Salary/>
        <Footer/>
    </div>
  )
}

export default StaffSalary