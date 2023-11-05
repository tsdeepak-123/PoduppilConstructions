import React, { useEffect, useState } from 'react'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import RecivedCashModal from './RecivedCashModal'
import CashTable from "../../AdminComponents/Project/CashTable"
import { axiosAdmin } from '../../../Api/Api';

function RecivedCash() {
const[cashData,setCashData]=useState()

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("recievedcash")
      // setCashData(response?.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
      console.log(error);
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <ReturnButton/>
    <div className='flex justify-end me-36 mt-14'>
    <RecivedCashModal/>
    </div>
    <CashTable/>
    </>
  )
}

export default RecivedCash