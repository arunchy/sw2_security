import React, { useRef, useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../reducer/searchSlice';
import { searchProductsApi } from '../api/api';
import { Avatar, IconButton } from '@mui/material';
import { Add,  Home } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

function NavBar(props) {
  const navigate=useNavigate();
  const [sidebar,setSidebar]=useState(false);
  const openSideBar=()=>{
    setSidebar(true);
  }
  const closeSideBar=()=>{
    setSidebar(false);
  }
  const redirectHome=()=>{
      navigate('/vendor/home')
  }
 const redirectAddProduct=()=>{
    navigate('/vendor/addproduct')
 }


  
  
  return (
    <>
    <div className={`${styles.nav} row fixed-top`}>
      <div className='row bg-dark p-3'>
      <div className='col-sm-3 d-flex align-items-center col-12 justify-content-start'>
      {
        sidebar===false?  <button className='btn btn-dark d-block d-md-none' onClick={openSideBar}>
        <span className='bi bi-list'></span>
      </button> : ''
      }

     {
      sidebar===true? <button className='btn btn-dark d-block d-md-none' onClick={closeSideBar}>
      <span className='bi bi-x'></span>
    </button>:''
     }
      <h3 className='text-white'><b>Ecommerce Hub</b></h3>
    </div>
    <div className='col-sm-5 d-md-flex d-sm-none d-none align-items-center justify-content-md-around'>
    </div>
    <div className='col-sm-2 d-flex justify-content-end'>
    <IconButton onClick={redirectHome}><Home sx={{color:'error'}} color='primary'></Home></IconButton>
      <IconButton onClick={redirectAddProduct}>
      <Add sx={{color:"white"}} ></Add>
      </IconButton>
    </div>
    <div className='col-sm-2 d-flex flex-row align-items-center justify-content-end'>
      <div className={`${styles.profilediv} d-none d-sm-none d-md-block`}>
      <div class="dropdown">
   <Avatar id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" sx={{cursor:"pointer",bgcolor: deepPurple[500]}}>V</Avatar>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item"  href="/logout">Logout</a></li>
  </ul>
</div>
      

      </div>
     
    </div>
    

   {
     sidebar ? <div className={`${styles.sidebar} row bg-dark d-flex d-md-none`}>

     <div style={{width:'100%',height:'40px'}} className={navigate.pathname==='/Home'? styles.activeLink : styles.link}>
     <div> <span className='bi bi-house fs-4'></span></div>
     <div><p className='fs-4'>Home</p></div>
     
     </div> 
     
     <div style={{width:'100%',height:'40px'}} className={navigate.pathname==='/Notification'? styles.activeLink : styles.link}>
     <div> <span className='bi bi-bell fs-4'></span></div>
     <div><p className='fs-4'>Notification</p></div>
     
     </div> 
     
     <div style={{width:'100%',height:'40px'}} className={navigate.pathname==='/Cart'? styles.activeLink : styles.link}>
     <div> <span className='bi bi-bag fs-3'></span></div>
     <div><p className='fs-4'>Cart</p></div>
     
     </div> 
     
     
     <div style={{width:'100%',height:'40px'}} className={navigate.pathname==='/Admin'? styles.activeLink : styles.link}>
     <div> <span className='bi bi-person-fill-gear fs-3'></span></div>
     <div><p className='fs-4'>Admin</p></div>
     
     </div> 
     
     <div style={{width:'100%',height:'50px'}} className='d-flex justify-content-around overflow-hidden'>
           <div className={`${styles.profilediv} `}>
               
           {/* <img src={userData.profilePicture} height={50} width={50} alt='profile'></img> */}
     
           </div></div>
     
           <div style={{width:'100%',height:'40px'}} className='text-white d-flex justify-content-around'>
     <div> <span className='bi bi-box-arrow-right fs-3'></span></div>
     <div><p className='fs-4'>Logout</p></div>
     
     </div> 
     
          
     </div> : ''

   }
      </div>
   
   
 

   
  </div>
   

 
  </>
  )
}

export default NavBar