import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility, AlternateEmail } from '@mui/icons-material';
import { loginApi } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Style from '../styles/Signup.module.css';
import { loginSchema } from '../schema/loginSchema';


function VendorLogin() {
  console.log(`site key: ${process.env.GOOGLE_CAPTCHA_SITE_KEY}`);

  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Formik Hook
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (userData) => {
      if (!captchaValue) {
        toast.error("Please complete the CAPTCHA verification");
        return;
      }

      try {
        setIsLoading(true);
        userData.user_type = "vendor";
        userData.captcha = captchaValue;

        const response = await loginApi(userData);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log("response.data",response.data)
          localStorage.setItem("token",response.data.access);
          setIsLoading(false);
          navigate("/vendor/home");
        }
      } catch (error) {
        console.error("Login error: ", error);
        setIsLoading(false);
        toast.error(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className={`container-fluid ${Style.body} d-flex flex-column justify-content-center`}>
      <div className='col-sm-6' style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "10px" }}>
        <div className='row'>
          <h3 className='text-center'> Login</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6'>
              <TextField
                label="Email"
                variant='filled'
                fullWidth
                margin='normal'
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ backgroundColor: "white" }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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

          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6'>
              <TextField
                label="Password"
                variant='filled'
                fullWidth
                margin='normal'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ backgroundColor: "white" }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
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

          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-md-6 col-sm-8 col-12'>
              <label>Please verify that you're not a robot</label>
              <ReCAPTCHA sitekey="6LdJWscqAAAAANCNXKsan7zpNUTM3XgHnBl90i51" onChange={setCaptchaValue} />
            </div>
          </div>

          <div className='col-sm-12 d-flex align-items-center justify-content-center'>
            <Button variant='contained' type='submit' color='error' disabled={isLoading}>
              {isLoading ? "Logging in..." : "LOGIN"}
            </Button>
          </div>

          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-sm-6 my-2 d-flex'>
              <p className='mx-1' style={{ fontSize: "13px" }}>Don't have an account?</p>
              <a href='/vendor/signup' style={{ fontSize: "13px", color: "yellow", textDecoration: "none" }}>SIGNUP</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorLogin;
