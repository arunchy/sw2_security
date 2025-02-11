import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardContent, CardMedia, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetOtpApi, } from '../api/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {updatePasswordField } from '../reducer/resetPasswordSlice';


const ResetPassword = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
   
  });

  const validationSchema = Yup.object({
    old_password: Yup.string().required('Old password is required'),
    new_password: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
      user_type:"customer"
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      try{
        handleSendResetOtp(values);
      }catch(error){
       
      }
      

      // navigate('/profile');
    },
  });

  const handleSendResetOtp=async(values)=>{
    try{
     const response=await resetOtpApi();
     if(response.status===200){
      toast.success("otp sent to your email for pasword reset..");
      dispatch(updatePasswordField({values}))
      navigate("/resetotp")

     }
    }catch(error){
     toast.error("error while sending reset otp...")
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className='container-fluid' style={{ minHeight: '100vh' }}>
      <div className='row'>
        <div className='col-sm-4'>
          <Card sx={{ minWidth: '100%', minHeight: '100vh' }}>
            <CardMedia component='img' sx={{ minWidth: '100%', minHeight: 400 }} image={`${process.env.PUBLIC_URL}/back1.png`} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div' sx={{ color: '#E91E63', textAlign: 'center' }}>
                ECOMMERCE HUB
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className='col-sm-8'>
          <div className='row d-flex justify-content-center my-4'>
            <img src={`${process.env.PUBLIC_URL}/new.png`} alt='chillmate' style={{ height: '150px', width: '180px' }} />
          </div>
          <div className='row d-flex justify-content-center'>
            <div className='col-md-6 col-8 border'>
              <div className='row d-flex align-items-center my-1'>
                <span className='w-50 fw-bold fs-4'>Reset Password</span>
                <Link to='/profile' className='w-50 text-end fw-bold' style={{ textDecoration: 'none', color: '#E91E63', fontSize: '14px' }}>
                  Back
                </Link>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {['old_password', 'new_password', 'confirm_password'].map((field, index) => (
                  <div key={index} className='row d-flex justify-content-center'>
                    <div className='col-sm-10'>
                      <TextField
                        label={field.replace('_', ' ').replace(/\w/g, (c) => c.toUpperCase())}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        name={field}
                        type={showPasswords[field] ? 'text' : 'password'}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field] && Boolean(formik.errors[field])}
                        helperText={formik.touched[field] && formik.errors[field]}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={() => togglePasswordVisibility(field)} edge='end'>
                                {showPasswords[field] ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className='col-sm-12 d-flex justify-content-center my-4'>
                  <Button type='submit' size='large' sx={{ backgroundColor: '#E91E63', color: 'white', '&:hover': { backgroundColor: '#D81B60' } }}>
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;