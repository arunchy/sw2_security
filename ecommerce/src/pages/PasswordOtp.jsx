import React, { useEffect, useRef, useState } from 'react'
import { Email, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { sendOtpApi, signupApi } from '../api/apis';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../api/api';

const ResetOtp = () => {
    
   const navigate=useNavigate();
   const resetData=useSelector(state=>state.resetPassword);
   const[email,setEmail]=useState("");
   const[userData,setUserData]=useState({
});
   const[isLoading,setIsLoading]=useState(false);
   console.log("reset data: ",resetData)
   
   useEffect(()=>{
    if(!resetData.old_password){
    //   navigate("/");
    }else{
      
      setUserData((prevData)=>({
        ...prevData,...resetData
      }))
    }
   },[]);

   

    const resendOtp=async()=>{
     setIsLoading(true);
    //  sendOtpApi({email}).then((res)=>{
    //   setIsLoading(false);
    //   if(res.status===200){
    //     toast.success("otp resend")
    //   }else{
    //     setIsLoading(false);
    //     toast.error(res.data.message);
    //   }
    //  }).catch((error)=>{
    //   toast.error("Internal server error.");
    //  })
    }


    const logo=`${process.env.PUBLIC_URL}/new.png`;
    const otpInputs=Array.from({length:4},(_,index)=>index+1);
    const otpRef1=useRef();
    const otpRef2=useRef();
    const otpRef3=useRef();
    const otpRef4=useRef();
    const otpRef=[otpRef1,otpRef2,otpRef3,otpRef4];

    const handleInputChange=(index,e)=>{
        console.log("changed...")
        const input=e.target;
        const maxLength=parseInt(input.getAttribute('maxlength'))
        const currentLength=input.value.length;
        console.log("max legth: ",maxLength)
        console.log("current length: ",currentLength)
        console.log("index: ",index)
        console.log("key: ",e.key)
        if(currentLength>=maxLength){
          if(index < otpInputs.length -1){
            otpRef[index+1].current.focus();
          }else{
            // input.blur();
          }
        }
       
       }

       const handleChangePassword=async()=>{
          setIsLoading(true);
          const otpString=otpRef.map(ref=>ref.current.value).join("");
          userData.userotp=otpString;
          try{
          const response=await updatePasswordApi(userData);
          if(response.status===200){
            setIsLoading(false);
            navigate("/profile");
            toast.success("password changed successfully...")
          }
          }catch(error){
           toast.error(error.response.message)
          }
       }

       const handleKeyDown=(index,e)=>{
        const input=e.target;
        const maxLength=parseInt(input.getAttribute('maxLength'));
        const currentLength=input.value.length;
        if (e.key === 'Backspace' && currentLength === 0 && index > 0) {
          otpRef[index - 1].current.focus();
      };
       }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-4'>
              <Card sx={{minWidth:"100%",minHeight:"100vh"}}>
                                       <CardMedia component='img' sx={{minWidth:"100%",minHeight:400}} image={`${process.env.PUBLIC_URL}/back1.png`} alt='wallpaper'></CardMedia>
                                       <CardContent>
                                         <Typography gutterBottom variant='h5' component="div" sx={{color:"#E91E63",textAlign:"center"}}>
                                           ECOMMERCE HUB
                                         </Typography>
                                         <Typography variant='body1' color='text-secondary' sx={{textAlign:"center",marginTop:"20px"}}>
                                         
                                         </Typography>
                                       </CardContent>
                                     </Card>
            </div>
            <div className='col-sm-8'>
            <div className='row d-flex justify-content-center my-4'>
                <img src={logo} alt='chillmate' style={{
                    height:"150px",width:"180px"
                }}></img>
            </div>
            <div className='row d-flex justify-content-center'>
            <div className='col-md-6 col-8 border'>
                 <div className='row d-flex align-items-center my-1'>
                                    <span className='fw-bold fs-4 my-1'>OTP Verification</span>
                                   </div>

                <div className='row my-2'>
                    <span className='text-secondary'>
                    Please enter  the OTP(One-Time Password) sent to change you password 
                    </span>
                </div>
                <div className='row d-flex justify-content-around my-4'>
                {otpInputs.map((index) => (
                    <div className='col-sm-2' key={index}>
                        <input
                            ref={otpRef[index - 1]}
                            type='text'
                            maxLength='1'
                            onChange={(e) => handleInputChange(index - 1, e)}
                            onKeyDown={(e)=>handleKeyDown(index-1,e)}
                            className='form-control'
                            style={{height:"70px",fontSize:"30px",fontWeight:"bold",textAlign:"center",color:"#E91E63"}}
                        />
                    </div>
                ))}
                </div>


                <div className='row'>
                    <span className='w-50'>Time Remaning
                        <span style={{color:"#E91E63"}}> 1:10</span>
                    </span>

                    <div className='w-50 d-flex justify-content-end align-items-center'>
                    <Button  variant='text' sx={{
                color:"#E91E63",
                '&:hover':{
                  color:"#D81B60"
                }
              }} >Resend</Button>
                    </div>
                </div>

                <div className='row my-4'>
                  <div className='col-sm-12 d-flex justify-content-center'>
                  <Button size='large' sx={{
                backgroundColor:"#E91E63",
                color:"white",
                '&:hover':{
                  backgroundColor:"#D81B60"
                }
              }} onClick={handleChangePassword}>Verify</Button>
                  </div>
                </div>

                </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ResetOtp