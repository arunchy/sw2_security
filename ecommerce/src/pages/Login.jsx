import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../styles/Signup.module.css';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility, AlternateEmail } from '@mui/icons-material';
import { loginApi } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {loginSchema} from '../schema/loginSchema';
// Define validation schema using Yup


function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (!captchaValue) {
        toast.error('Please complete the reCAPTCHA');
        return;
      }
      
      try {
        setIsLoading(true);
        const userData = { ...values, user_type: "customer" };

        const response = await loginApi(userData);
        if (response.status === 200) {
          toast.success(response.data.message);
          localStorage.setItem("token",response.data.access);
          setIsLoading(false);
          navigate("/");
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Login error: ", error);
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    }
  });

  return (
    <div className={`container-fluid ${Style.body} d-flex flex-column justify-content-center`}>
      <div className='col-sm-6' style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "10px" }}>
        <div className='row'>
          <h3 className='text-center'> Login</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6'>
              <TextField
                label="Email"
                variant='filled'
                fullWidth
                margin='normal'
                name='email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AlternateEmail />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6'>
              <TextField
                label="Password"
                variant='filled'
                fullWidth
                margin='normal'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ backgroundColor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>

          {/* Google reCAPTCHA */}
          <div className="row d-flex align-items-center justify-content-center my-3">
            <div className="col-sm-6">
              <ReCAPTCHA
                sitekey="6LdJWscqAAAAANCNXKsan7zpNUTM3XgHnBl90i51"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <div className='col-sm-12 d-flex align-items-center justify-content-center'>
            <Button variant='contained' type='submit' color='error' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'LOGIN'}
            </Button>
          </div>
        </form>

        {/* Signup Redirect */}
        <div className='row d-flex align-items-center justify-content-center'>
          <div className='col-sm-6 my-2 d-flex'>
            <p className='mx-1' style={{ fontSize: "13px" }}>Don't have an account?</p>
            <a href='/signup' style={{ fontSize: "13px", color: "yellow", textDecoration: "none" }}>SIGNUP</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
