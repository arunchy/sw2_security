import React, { useEffect } from 'react'
import { clearAllCookies } from '../helper/clearCookie';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate=useNavigate();
    useEffect(()=>{
     clearAllCookies();
     navigate("/login");

    },[navigate])
  return (
    <div>Logging out....</div>
  )
}

export default Logout