import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import Crud from './Crud'
import Login from './Login'
import VendorSignup from './Signup'




const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/admin' element={<AdminLayout/>}>

        <Route path='dashboard' element={<Dashboard/>}></Route>
        <Route path='crud' element={<Crud/>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='signup' element={<VendorSignup></VendorSignup>}></Route>

        </Route>
    </Routes>
  )
}

export default AdminRoutes