import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupApi, vendorSingupApi } from '../api/api';
import { toast } from 'react-toastify';

function VendorOtp() {
    const otpInputs = Array.from({ length: 4 }, (_, index) => index + 1);
    const otpRef1 = useRef();
    const otpRef2 = useRef();
    const otpRef3 = useRef();
    const otpRef4 = useRef();
    const otpRef = [otpRef1, otpRef2, otpRef3, otpRef4];
    const navigate = useNavigate();
    
    const vendorData = useSelector((state) => state.vendor); // Fetch vendor data from vendorSlice
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const [second, setSecond] = useState(120);
   console.log("vendor slice data: ",vendorData)
    useEffect(() => {
        if (!vendorData.email) {
            navigate("/vendor/signup");
        } else {
            setEmail(vendorData.email);
            setUserData({
                email: vendorData.email,
                vendor_shop_name: vendorData.vendor_shop_name,
                shop_location: vendorData.shop_location,
                contact_number: vendorData.contact_number,
                password: vendorData.password,
                profile_picture: vendorData.profile_picture,
                user_type: 'vendor',
                captcha:vendorData.captcha
            });
        }
    }, [vendorData]);

    const handleInputChange = (index, e) => {
        const input = e.target;
        const maxLength = parseInt(input.getAttribute('maxlength'));
        const currentLength = input.value.length;
        if (currentLength >= maxLength && index < otpInputs.length - 1) {
            otpRef[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpRef[index - 1].current.focus();
        }
    };

    useEffect(() => {
        if (second > 0) {
            const timerId = setTimeout(() => {
                setSecond((prevSecond) => prevSecond - 1);
                setTimer(timerId);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [second]);

    const handleSignup = async () => {
        setIsLoading(true);
        const otpString = otpRef.map(ref => ref.current.value).join("");
        userData.userotp = otpString;
        
        try {
            const response = await vendorSingupApi(userData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/admin/login");
            } else {
                toast.error("Error occurred during verification");
            }
        } catch (error) {
            console.error("Verification error: ", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
            clearTimeout(timer);
        }
    };

    return (
        <div className='container-fluid' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/shoesHub.jpg)`, backgroundSize: "cover" }}>
            <div className='container'>
                <div className='row' style={{ height: '100vh' }}>
                    <div className='col-md-6 col-12 d-flex flex-column justify-content-center'>
                        <div className='row' style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
                        }}>
                            <div className='row mt-4 d-flex justify-content-center'>
                                <div className='col-sm-6 d-flex justify-content-center'>
                                    <img src={`${process.env.PUBLIC_URL}/email.png`} height={80} width={80} alt='email icon' />
                                </div>
                            </div>

                            <div className='row mt-4 d-flex justify-content-center'>
                                <div className='col-sm-6'>
                                    <h4 className='text-white text-center'>OTP Verification</h4>
                                </div>
                            </div>

                            <div className='row d-flex justify-content-center'>
                                <div className='col-sm-6'>
                                    <p className='text-white text-center' style={{ fontSize: "13px" }}>We've sent a code to {email}</p>
                                </div>
                            </div>

                            <div className='row my-2 d-flex justify-content-center align-items-center'>
                                {otpInputs.map((index) => (
                                    <div className='col-sm-2' key={index}>
                                        <input
                                            ref={otpRef[index - 1]}
                                            type='text'
                                            maxLength='1'
                                            onChange={(e) => handleInputChange(index - 1, e)}
                                            onKeyDown={(e) => handleKeyDown(index - 1, e)}
                                            className='form-control'
                                            style={{
                                                height: "80px",
                                                fontSize: "30px",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#ffbe33"
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className='row mt-2 d-flex justify-content-center'>
                                <div className='col-sm-6'>
                                    <p className='text-white text-center'>Time Remaining <span style={{ color: second > 10 ? "#ffbe33" : "red" }}>{second}</span></p>
                                </div>
                            </div>

                            <div className='row d-flex justify-content-center my-2'>
                                <div className='col-sm-6 d-flex align-items-center justify-content-center'>
                                    <p className='text-white text-center' style={{ fontSize: "13px", margin: "0px" }}>Didn't get the code? </p>
                                    <Button variant='text' disabled={isLoading} sx={{
                                        color: "#ffbe33", fontSize: "12px"
                                    }}>Resend</Button>
                                </div>
                            </div>

                            <div className='row my-4 d-flex justify-content-center'>
                                <div className='col-sm-6 d-flex justify-content-between'>
                                    <Button variant='contained' disabled={isLoading} color='error'>Cancel</Button>
                                    <Button disabled={isLoading} variant='contained' sx={{
                                        backgroundColor: '#ffbe33', color: '#fff'
                                    }} color='success' onClick={handleSignup}>Verify</Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorOtp;
