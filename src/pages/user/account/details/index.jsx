import React, { useState } from 'react'
import { usersApi } from '../../../../service/base'

function AccountDetails() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  const [userData , setUserData] = useState(JSON.parse(user))
  const [edit , setEdit] = useState(false)
  return (
    <div>
      <h2>Account Details</h2>
      <input type="text" defaultValue={userData.email} onChange={
        (e) => setUserData({...userData , email : e.target.value})
      } readOnly = {!edit} />
      <button onClick={()=>{
        setEdit(!edit)
      }}>{edit ? 'Close Edit' : 'Open Edit'}</button>

      <button onClick={
        ()=>{
          usersApi.changeUserData(userData.id , userData)
        }
      }>Allow Changes</button>
      </div>
  )
}

export default AccountDetails