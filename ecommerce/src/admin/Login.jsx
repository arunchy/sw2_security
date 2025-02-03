import React, { useState } from 'react';
import Style from '../styles/Signup.module.css';
import {TextField,Button,IconButton,InputAdornment} from '@mui/material';
import { VisibilityOff,Visibility,AlternateEmail } from '@mui/icons-material';
import { loginApi, vendorLoginApi } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const[isLoading,setIsLoading]=useState(false);
  const naviate=useNavigate();
  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(userData);
  };

  const handleLogin = async() => {
    try{
      setIsLoading(true);
      userData.user_type="vendor"
    const response=await vendorLoginApi(userData);
    if(response.status===200){
      toast.success(response.data.message)
      setIsLoading(false);
      naviate("/admin/crud/");
 
    }else{
      setIsLoading(false);
      toast.error(response.data.message);
    }
    }catch(error){
      console.log("error: ",error)
     setIsLoading(false);
     toast.error("error occur...");
    }

  };
 
const[showPassword,setShowPassword]=useState(false);
const handleClickShowPassword=()=>setShowPassword(!showPassword)            
const handleMouseDownPassword=(e)=>e.preventDefault();

  return (
    <div className={`container-fluid ${Style.body} d-flex flex-column justify-content-center`}>
      <div className='col-sm-6' style={{
          backgroundColor:"rgba(0,0,0,0.5)",
          padding:"10px"
        }}>
        <div className='row'>
          <h3 className='text-center'>Vendor Login</h3>
        </div>
        <div className='row'>
           <div className='row d-flex align-items-center justify-content-center'>
           <div className='col-sm-6'>
             <TextField label="Email"
              variant='filled'
              fullWidth
              margin='normal'
              name='email'
              type='email'
              value={userData.email}
              onChange={handleLoginData}
              sx={{backgroundColor:"white"}}
              slotProps={{
                input:{
                  endAdornment:(
                    <InputAdornment position='end'>
                      <AlternateEmail/>
                    </InputAdornment>
                  )
                }
              }}
             />
            
          </div>
            
           </div>
            <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6  '>
            <TextField
             label="Password"
             variant='filled'
             fullWidth
             margin='normal'
             name='password'
             type={showPassword? 'text':'password'}
             value={userData.password}
             onChange={handleLoginData}
             sx={{
              backgroundColor:"white"
             }}
             slotProps={{
              input:{
                endAdornment:(
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>
                  </InputAdornment>
                )
              }
             }}
              
             />



          </div>
            </div>


          <div className='col-sm-12 d-flex align-items-center justify-content-center'>
            <div><Button variant='contained' type='submit' color='error' onClick={handleLogin}>LOGIN</Button></div>
          </div>

         <div className='row d-flex align-items-center justify-content-center'>
          <div className='col-sm-6 my-2 d-flex'>
           <p className='mx-1' style={{fontSize:"13px"}}>Don't have an account?</p>
           <a href='/admin/signup' style={{fontSize:"13px",color:"yellow",textDecoration:"none"}}>SIGNUP</a>
          </div>
         </div>

        </div>
      </div>
      <div className='col-sm-6'>

      </div>
    </div>
  );
}

export default Login;
