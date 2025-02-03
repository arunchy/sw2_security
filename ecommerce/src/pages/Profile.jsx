import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from '../styles/Profile.module.css';
import Footer from '../components/Footer';
import { getBillApi, updateProfileApi, userDetailsApi } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate=useNavigate();
  const updatepic = useRef();
  const [isUpdate, setIsUpdate] = useState(false);
  const[updateProfilePicture,setUpdateProfilePicture]=useState(null);
  // Dummy user data for the frontend
  const [updateData, setUpdateData] = useState({
    first_name:"",
    last_name:"",
    street_address:"",
    phone_number:"",
    city:"",
    state:"",
    profile_picture:""
    
  });

  const[userBills,setUserBills]=useState([]);

  

  useEffect(()=>{
   const getUserDetails=async()=>{
    try{
      const response=await userDetailsApi();
     if(response.status===200){
      const userData=response.data;
      setUpdateData({
        first_name:userData.first_name || "",
        last_name:userData.last_name || "",
        street_address:userData.street_address || "",
        phone_number:userData.phone_number || "",
        city:userData.city || "",
        state: userData.state || "",
        profile_picture:`http://localhost:8000/${userData.profile_picture}` || ""
      });
     }
    }catch(error){
     toast.error("error fetching user data please relogin..")
    }
   }
   const getUserBills=async()=>{
    try{
     const response=await getBillApi();
     console.log("response: ",response.data);
     if(response.status===200){
        setUserBills(response.data);
     }else{
      toast.error("error fetching user bill.please login again..")
      navigate("/login")
     }
    }catch(error){
      
    }
   }
   getUserBills();
   getUserDetails();
  },[]);




  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };
 

  const handleUpdatePic = (e) => {
    const selectedFile = e.target.files[0];
    // Update profile picture locally using a dummy path
    const objectUrl = URL.createObjectURL(selectedFile);
    setUpdateData({
      ...updateData,
      profile_picture: objectUrl
    });
    setUpdateProfilePicture(selectedFile);
  };

  const handleUpdateData = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleUpdateBtn = async() => {
 
    setIsUpdate(false);
    updateData.profile_picture=updateProfilePicture
    try{
     const response=await updateProfileApi(updateData);
     if(response.status===200){
      toast.success("Details update successfully...");
      setUpdateData(response.data)
     }
    }catch(error){
     toast.error("Error while updating profile...");
    }

  };
 
  return (
    <div className='container-fluid'>
      <NavBar />
      <div className='row d-flex' style={{marginTop:"120px"}}>
        <div className='col-md-4 col-12 d-flex justify-content-center flex-column align-items-center'>
          <div className={`${styles.pp} mx-3`}>
            <img src={updateData.profile_picture} height={180} width={180} alt='profile' />
          </div>
          <p className='mx-5'><b>{updateData.first_name} {updateData.last_name}</b></p>
          <p className='mx-4'>{updateData.city} {updateData.street_address}</p>
          <p className='mx-4 text-primary'>{updateData.email}</p>
          <div className='mx-5'>
            <button className='btn btn-outline-dark btn-sm' onClick={handleUpdate}><span className='bi bi-pen'> Edit</span></button>
          </div>
        </div>

        {/* Update frontend */}
        {isUpdate ? (
          <div className='col-md-8'>
            <div className='row'>
              <p className='text-center'>Update Profile</p>
            </div>
            <div className='row d-flex justify-content-center'>
              <button style={{ height: '150px', width: '150px', overflow: "hidden" }}>
                <img src={updateData.profile_picture} height={150} width={150} onClick={() => updatepic.current.click()} alt='update profile' />
              </button>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <input type='file' className='d-none' name='profile_picture' ref={updatepic} onChange={handleUpdatePic} />
                <input type='text' name='first_name' className='form-control my-2' placeholder='First Name' value={updateData.first_name} onChange={handleUpdateData} />
                <input type='text' name='street_address' className='form-control' placeholder='Street Address' value={updateData.street_address} onChange={handleUpdateData} />
                <input type='text' name='city' className='form-control my-2' placeholder='City' value={updateData.city} onChange={handleUpdateData} />
              </div>
              <div className='col-sm-6'>
                <input type='text' name='last_name' className='form-control my-2' placeholder='Last Name' value={updateData.last_name} onChange={handleUpdateData} />
                <input type='text' name='phone_number' className='form-control' placeholder='Contact Number' value={updateData.phone_number} onChange={handleUpdateData} />
                <input type='text' name='state' className='form-control my-2' placeholder='State' value={updateData.state} onChange={handleUpdateData} />
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-sm-3'>
                <button className='btn btn-outline-dark' onClick={handleUpdateBtn}><label className='bi bi-pen'> Update</label></button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <p className='text-center' style={{marginTop:"30px"}}>Your Purchase</p>

      <div className='row overflow-auto flex-nowrap'>
     
        {userBills.map((item, index) => (
              <div className='col-8 col-sm-6 col-md-3' key={item.id}>
               <div className='border card overflow-hidden' key={item.id}>
                 <img src={`http://localhost:8000/${item.product_details.product_display_picture}` && item.product_details.product_display_picture } height={260} width={280} alt={item.product_name}></img>
                 <div className='card-body'>
                   <h5 className='card-title'>{item.product_details.product_brand}</h5>
                   <p className='card-text'>{item.product_details.product_description}</p>
                   <div>
                     <button className='btn' value={index} id={`view${index}`} onClick={()=>{}}><label className='bi bi-eye lead' htmlFor={`view${index}`}></label></button>
                   </div>
                 </div>
               </div>
               </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
