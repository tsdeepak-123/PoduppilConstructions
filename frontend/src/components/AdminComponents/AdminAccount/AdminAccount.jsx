import React from 'react'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import PasswordChangeModal from './PasswordChangeModal'

function AdminAccount() {
  return (
    <>
    <ReturnButton/>
      <div className='flex justify-end me-14 mt-6'>
        <PasswordChangeModal/>
      </div>
    </>
  )
}

export default AdminAccount
