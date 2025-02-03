import React, { useRef, useState } from 'react';
import styles from '../styles/Signup.module.css'; // Assuming the CSS file is in the same directory
import { useFormik } from 'formik';
import { signUpSchema } from '../schema/signup';
import {TextField,InputAdornment,Button,IconButton, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { AlternateEmail,LocationCity,Person,Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../reducer/signupSlice';
import { sendOTPApi } from '../api/api';
import ReCAPTCHA from 'react-google-recaptcha';


function Signup() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [captchaValue,setCaptchaValue]=useState("")
  const[isLoading,setIsLoading]=useState(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    contactNumber: '',
    city: '',
    state: '',
    streetAddress: '',
    gender: '',
  };

  const { values, errors, handleBlur, handleChange, touched, } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
  });
   
  const[selectedDate,setSelectedDate]=useState(null)
  const ppref = useRef();
  const[previewProfilePicture,setPreviewProfilePicture]=useState(`${process.env.PUBLIC_URL}/profile.png`)
  const[profilePicture,setProfilePicture]=useState('')
  const handleProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      console.log("object url: ",objectURL)
      setProfilePicture(selectedFile)
      setPreviewProfilePicture(objectURL)
    }
  };




  const handleSubmitBtn = async() => {
    if (Object.keys(errors).length === 0 && selectedDate) {
      setIsLoading(true);
      values.profile_picture=profilePicture;
      values.dob=dayjs(selectedDate).format('YYYY-MM-DD');
      values.user_type="customer";
      values.captcha=captchaValue;
      dispatch(updateField({values}));
        const response=await sendOTPApi({email:values.email,"user_type":"customer"});
        console.log("response: ",response.data)
        if(response.status===200){
          toast.success(response.data.message);
          setIsLoading(false);
          navigate("/otp");
        }else{
          console.log("error: ",response.data)
        }
      } 
    else {
      toast.error("all fields are required...")
      console.log("Please fill all required fields.");
    }
  
  };
  

  const[showPassword,setShowPassword]=useState(false)
  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }
  

  return (
    <>
      <div className={`container-fluid ${styles.body} d-flex flex-column justify-content-center`}>
        <div className='row my-4'>
          <div className='col-sm-6'>
            <form>
              <div className='row'>
                <div className='col-sm-12 d-flex justify-content-center my-sm-2'>
                  <Button variant='outlined'
                    className={`${styles.square_button} mx-md-4 mx-sm-2 mx-4`}
                    onClick={() => ppref.current.click()}
                  >
                    <img src={previewProfilePicture} width={120} height={120} alt='profile' />
                  </Button>
                  <input
                    type='file'
                    className='d-none'
                    ref={ppref}
                    onChange={handleProfilePicture}
                    required
                  />
                </div>

                <div className='col-sm-6'>
                  <TextField
                  label="FirstName"
                  fullWidth
                  margin='normal'
                  name='firstName'
                  type='text'
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                  helperText={touched.firstName && errors.firstName ? errors.firstName : ''}
                  sx={{
                    backgroundColor:'white'
                  }}

                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                          <Person/>
                        </InputAdornment>
                      )
                    }
                    
                  }}

                  />
                </div>

                <div className='col-sm-6'>
                <TextField
                  label="LastName"
                  fullWidth
                  margin='normal'
                  name='lastName'
                  type='text'
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                  helperText={touched.lastName && errors.lastName ? errors.lastName : ''}
                  sx={{
                    backgroundColor:'white'
                  }}

                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                          <Person/>
                        </InputAdornment>
                      )
                    }
                    
                  }}

                  />
                </div>

                <div className='col-sm-6 my-sm-2'>

                <TextField
                  label="Email"
                  fullWidth
                  margin='normal'
                  name='email'
                  type='email'
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email ? errors.email : ''}
                  sx={{
                    backgroundColor:'white'
                  }}

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

                <div className='col-sm-6 my-sm-2'>
                 

                <TextField
                  label="Password"
                  fullWidth
                  margin='normal'
                  name='newPassword'
                  required
                  type={showPassword ? 'text':"password"}
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.newPassword && errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword ? errors.newPassword : ''}
                  sx={{
                    backgroundColor:'white'
                  }}

                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                         <IconButton aria-label='toggle passowrd visibility' onClick={handleShowPassword} edge='end'>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                         </IconButton>
                        </InputAdornment>
                      )
                    }
                    
                  }}

                  />




                </div>

                <div className='col-sm-6'>
                <TextField
                  fullWidth
                  margin='normal'
                  placeholder='ContactNumber'
                  name='contactNumber'
                  type='text'
                  required
                  value={values.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactNumber && errors.contactNumber}
                  helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : ''}
                  sx={{
                    backgroundColor:'white'
                  }}
                    
                  slotProps={{
                    input:{
                      startAdornment:(
                        <InputAdornment position='start'>
                          +977
                        </InputAdornment>
                      )
                    }
                    
                  }}

                  />



                </div>

                <div className='col-sm-6 d-flex align-items-center '>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="select Date" value={selectedDate} name='dob' onChange={(value)=>setSelectedDate(value)} sx={{backgroundColor:"white"}} />
                 </LocalizationProvider>
                  

                  
                </div>

                <div className='col-sm-6 my-sm-2'>
                  <TextField
                  type='text'
                  label="City"
                  name='city'
                  fullWidth
                  required
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactNumber && errors.contactNumber}
                  helperText={touched.contactNumber && errors.contactNumber ? errors.contactNumber : ''}
                  sx={{
                    backgroundColor:"white"
                  }}
                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                             <LocationCity/>
                        </InputAdornment>
                      )
                    }
                  }}
                   />

                </div>

                <div className='col-sm-6 my-sm-2'>

                <TextField
                  type='text'
                  label="State"
                  name='state'
                  fullWidth
                  required
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && errors.state}
                  helperText={touched.state && errors.state ? errors.state : ''}
                  sx={{
                    backgroundColor:"white"
                  }}
                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                               <LocationCity/>
                        </InputAdornment>
                      )
                    }
                  }}
                   />
                

                </div>

                <div className='col-sm-6'>
                    

                <TextField
                  type='text'
                  label="StreetAddress"
                  name='streetAddress'
                  fullWidth
                  required
                  value={values.streetAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.streetAddress && errors.streetAddress}
                  helperText={touched.streetAddress && errors.streetAddress ? errors.streetAddress : ''}
                  sx={{
                    backgroundColor:"white"
                  }}
                  slotProps={{
                    input:{
                      endAdornment:(
                        <InputAdornment position='end'>
                          <i className="bi bi-geo"></i>
                        </InputAdornment>
                      )
                    }
                  }}
                   />



                </div>

                <div className='col-sm-6'>
                   <FormControl fullWidth sx={{backgroundColor:"white"}}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select name='gender' error={touched.email && errors.email} value={values.gender} onChange={handleChange} onBlur={handleBlur} required label="Gender">
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                   </FormControl>

                </div>

                <div className='row'>
                  <ReCAPTCHA sitekey='6LdJWscqAAAAANCNXKsan7zpNUTM3XgHnBl90i51' onChange={(value) => setCaptchaValue(value)}></ReCAPTCHA>
                </div>
               
                <div className='row d-flex justify-content-center my-2'>
                <div className='col-sm-6 d-flex'>
                 
                  <Button variant='contained' type='submit' color='error'  onClick={handleSubmitBtn}>SIGNUP</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='col-sm-6'></div>
        </div>
      </div>
    </>
  );
}

export default Signup;
