import React from 'react'
import AttendanceSheet from '../../../components/AdminComponents/Labour/AttendanceSheet'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'

const LabourAttendance = () => {
  return (
    <div>
       <Header headers="Labour Attendance Sheet"/>
    <AttendanceSheet/>
    <div className='mt-14'>
    <Footer/>
    </div>
     
    </div>
  )
}

export default LabourAttendance