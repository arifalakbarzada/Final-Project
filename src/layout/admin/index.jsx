import React from 'react'
import AdminNavbar from './adminnav'
import { Outlet } from 'react-router'

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  )
}

export default AdminLayout