import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/slices/userSlices/userSlice'
import { useNavigate } from 'react-router'

function MyAccount() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={
            ()=>{
dispatch(logoutUser())
navigate('/login')
            }
        }>Click Me</button>
    </div>
  )
}

export default MyAccount