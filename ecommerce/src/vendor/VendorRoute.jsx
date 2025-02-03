import React from 'react'
import { Routes,Route } from 'react-router-dom'
import VendorLayout from './VendorLayout'
import Home from './Home';
import Login from './Login';
import Crud from './AddProduct';
import EditProduct from './EditProduct';
import Product from './Product';
import VendorSignup from './Signup';
import Otp from './Otp';
const VendorRoute = () => {
  return (
  <Routes>
    <Route path='/vendor' element={<VendorLayout/>}>
    <Route path='home' element={<Home></Home>}></Route>
    <Route path='login' element={<Login></Login>}></Route>
    <Route path='addproduct' element={<Crud></Crud>}></Route>
    <Route path='editproduct/:id' element={<EditProduct></EditProduct>}></Route>

    <Route path='view/:id' element={<Product></Product>}></Route>
    <Route path='signup' element={<VendorSignup></VendorSignup>}></Route>
    <Route path='otp' element={<Otp></Otp>}></Route>



    </Route>
  
  </Routes>
  )
}

export default VendorRoute