import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Completed from '../../../components/AdminComponents/Office/Completed'

function CompletedBills() {
  return (
    <div>
        <Header headers="COMPLETED BILLS"/>
        <Completed/>
        <Footer/>
    </div>
  )
}

export default CompletedBills