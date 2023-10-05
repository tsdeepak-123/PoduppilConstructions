import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import MaterialDetails from '../../../components/AdminComponents/Materials/MaterialDetails'
import Dropdown from '../../../components/CommonComponents/Dropdown/Dropdown'

function Materials() {
  return (
    <div>
        <Header/>
        <MaterialDetails/>
        <Footer/>
    </div>
  )
}

export default Materials
