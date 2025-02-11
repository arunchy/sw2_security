import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Signup.module.css';
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { AlternateEmail, LocationCity, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../reducer/vendorSignupSlice'; 
import { sendOTPApi } from '../api/api';
import ReCAPTCHA from 'react-google-recaptcha';

const validationSchema = Yup.object({
  vendor_shop_name: Yup.string().required('Vendor shop name is required'),
  shop_location: Yup.string().required('Shop location is required'),
  contact_number: Yup.string()
    .matches(/^\d{10}$/, 'Must be a 10-digit number')
    .required('Contact number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

function VendorSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ppref = useRef();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState(`${process.env.PUBLIC_URL}/profile.png`);
  const [profilePicture, setProfilePicture] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setProfilePicture(selectedFile);
      setPreviewProfilePicture(objectURL);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    values.profile_picture = profilePicture;
    values.captcha = captchaValue;
    dispatch(updateField({ values }));
    const response = await sendOTPApi({ email: values.email, user_type: 'vendor' });
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate('/vendor/otp');
    } else {
      toast.error('Error occurred');
    }
    setSubmitting(false);
  };

  return (
    <div className={`container-fluid ${styles.body} d-flex flex-column justify-content-center`}>
      <Formik
        initialValues={{
          vendor_shop_name: '',
          shop_location: '',
          contact_number: '',
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='row'>
              <div className='col-sm-12 d-flex justify-content-center my-sm-2'>
                <Button
                  variant='outlined'
                  className={`${styles.square_button} mx-md-4 mx-sm-2 mx-4`}
                  onClick={() => ppref.current.click()}
                >
                  <img src={previewProfilePicture} width={120} height={120} alt='profile' />
                </Button>
                <input type='file' className='d-none' ref={ppref} onChange={handleProfilePicture} />
              </div>
              
              <div className='col-sm-6'>
                <Field name='vendor_shop_name' as={TextField} label='Vendor Shop Name' fullWidth margin='normal' required />
                <ErrorMessage name='vendor_shop_name' component='div' className='text-danger' />
              </div>
              
              <div className='col-sm-6'>
                <Field name='shop_location' as={TextField} label='Shop Location' fullWidth margin='normal' required />
                <ErrorMessage name='shop_location' component='div' className='text-danger' />
              </div>
              
              <div className='col-sm-6'>
                <Field name='contact_number' as={TextField} label='Contact Number' fullWidth margin='normal' required />
                <ErrorMessage name='contact_number' component='div' className='text-danger' />
              </div>
              
              <div className='col-sm-6'>
                <Field name='email' as={TextField} label='Email' fullWidth margin='normal' required />
                <ErrorMessage name='email' component='div' className='text-danger' />
              </div>
              
              <div className='col-sm-6'>
                <Field name='password' as={TextField} label='Password' fullWidth margin='normal' type={showPassword ? 'text' : 'password'} required />
                <ErrorMessage name='password' component='div' className='text-danger' />
              </div>
              
              <div className='col-sm-6'>
                <ReCAPTCHA sitekey='6LdJWscqAAAAANCNXKsan7zpNUTM3XgHnBl90i51' onChange={setCaptchaValue} />
              </div>
              
              <div className='col-sm-6 d-flex my-2'>
                <Button variant='contained' color='error' type='submit' disabled={isSubmitting}>
                  SIGN UP
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VendorSignup;
