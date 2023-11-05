import React from 'react'
import TextFields from '../../CommonComponents/TextFields/TextFields'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import Buttons from '../../CommonComponents/Button/Buttons'
import RecivedCashModal from './RecivedCashModal'

function RecivedCash() {
  return (
    <>
    <ReturnButton/>
    {/* <div className='mt-14 flex flex-row flex-wrap justify-center gap-4'>
    <TextFields name="Date" type="date" input={true} value={""} onChange={""}/>
    <TextFields name="Amount recieved"  type="number"  value={""} onChange={""}/>
    <TextFields name="Payment type" type="text"  value={""} onChange={""}/>
    </div>
    <div className='flex justify-center mt-8'>
    <Buttons name="Recieve Amount"/>
    </div> */}
    <div className='flex justify-end me-36 mt-14'>
    <RecivedCashModal/>
    </div>
  

    </>
  )
}

export default RecivedCash