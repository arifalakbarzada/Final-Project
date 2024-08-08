import React, { useState } from 'react'
import { usersApi } from '../../../../service/base'

function AccountDetails() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const [userData , setUserData] = useState(JSON.parse(user))
  const [edit , setEdit] = useState(false)
  return (
    <div>
  
      </div>
  )
}

export default AccountDetails