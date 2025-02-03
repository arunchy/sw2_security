import React, { useState, useRef } from 'react';
import styles from '../styles/Signup.module.css'; // Assuming the CSS file is in the same directory
import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { AlternateEmail, LocationCity, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../reducer/vendorSignupSlice'; 
import { sendOTPApi } from '../api/api';

function VendorSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    vendor_shop_name: '',
    shop_location: '',
    contact_number: '',
    email: '',
    password: '',
  });

  const ppref = useRef();
  const [previewProfilePicture, setPreviewProfilePicture] = useState(`${process.env.PUBLIC_URL}/profile.png`);
  const [profilePicture, setProfilePicture] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setProfilePicture(selectedFile);
      setPreviewProfilePicture(objectURL);
    }
  };

  const handleSubmitBtn = async () => {
    setIsLoading(true);
    formValues.profile_picture = profilePicture;
    dispatch(updateField({ values: formValues })); 
    const response = await sendOTPApi({ email: formValues.email, user_type: 'vendor' });
    if (response.status === 200) {
      toast.success(response.data.message);
      setIsLoading(false);
      navigate("/vendor/otp");
    } else {
      toast.error("Error occurred");
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`container-fluid ${styles.body} d-flex flex-column justify-content-center`}>
      <div className='row my-4'>
        <div className='col-sm-6'>
          <form>
            <div className='row'>
              <div className='col-sm-12 d-flex justify-content-center my-sm-2'>
                <Button
                  variant='outlined'
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
                />
              </div>

              <div className='col-sm-6'>
                <TextField
                  label="Vendor Shop Name"
                  fullWidth
                  margin='normal'
                  name='vendor_shop_name'
                  value={formValues.vendor_shop_name}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='col-sm-6'>
                <TextField
                  label="Shop Location"
                  fullWidth
                  margin='normal'
                  name='shop_location'
                  value={formValues.shop_location}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='col-sm-6'>
                <TextField
                  label="Contact Number"
                  fullWidth
                  margin='normal'
                  name='contact_number'
                  value={formValues.contact_number}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>+977</InputAdornment>,
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='col-sm-6'>
                <TextField
                  label="Email"
                  fullWidth
                  margin='normal'
                  name='email'
                  type='email'
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='col-sm-6'>
                <TextField
                  label="Password"
                  fullWidth
                  margin='normal'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleShowPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </div>

              <div className='row d-flex justify-content-center my-2'>
                <div className='col-sm-6 d-flex'>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={handleSubmitBtn}
                    disabled={isLoading}
                  >
                    SIGN UP
                  </Button>
                </div>
              </div>

              <div className='row d-flex align-items-center justify-content-center'>
          <div className='col-sm-6 my-2 d-flex'>
           <p className='mx-1' style={{fontSize:"13px"}}>Already have an account?</p>
           <a href='/admin/login' style={{fontSize:"13px",color:"yellow",textDecoration:"none"}}>Login</a>
          </div>
         </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorSignup;
