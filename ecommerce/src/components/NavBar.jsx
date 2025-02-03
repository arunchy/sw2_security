import React, { useRef, useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../reducer/searchSlice';
import { searchProductsApi } from '../api/api';
import { Button } from '@mui/material';

function NavBar(props) {
  const dispatch=useDispatch(); 
  const[query,setQuery]=useState(useSelector((state)=>state.search.query));
  const navigate=useNavigate();
  const[searchData,setSearchData]=useState([]);
  const [sidebar,setSidebar]=useState(false);
  const openSideBar=()=>{
    setSidebar(true);
  }
  const closeSideBar=()=>{
    setSidebar(false);
  }
  const redirectHome=()=>{
      navigate('/')
  }
  const redirectCart=()=>{
    navigate('/cart')
  }
  const redirectDashboard=()=>{
    navigate('/vendor/home')
  }
   // const redirectProfile=()=>{
   //  navigate.push('/Profile')
   //}
  const [profileDropDown,setProfileDropDown]=useState(false);
  const handleProfileDropDown=()=>{
             console.log(profileDropDown)
             setProfileDropDown(!profileDropDown)
  }
  const[searchlist,setSearchList]=useState(false);
  const handleSearchList=()=>{
      setSearchList(!searchlist)
  }
  const[userData,setUserData]=useState([]);

//   const clearAllCookies = () => {
//     const cookies = document.cookie.split(";");

//     // Iterate over cookies and delete them
//     cookies.forEach(cookie => {
//         const cookieName = cookie.split("=")[0].trim();
//         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
//     });
// };


// const handleLogout=()=>{
//   clearAllCookies();
//   navigate("/vendor/login")
// }




  const handleSerach=async(e)=>{
      dispatch(setSearchQuery(e.target.value));
      setQuery(e.target.value);
      try{
      const response=await searchProductsApi(query);
      if(response.status===200){
        dispatch(setSearchResults(response.data));
        console.log("search result: ",response.data)
      }
      }catch(error){

      }
  }
 const handleSearchClick=()=>{
  navigate("/search");
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
      {/* <img src={laceuplogo} height={50} width={220}></img> */}
      <h3 className='text-white'><b>Ecommerce Hub</b></h3>
    </div>
    <div className='col-sm-4 d-md-flex d-sm-none d-none align-items-center justify-content-md-around'>
      <button className={navigate.pathname==='/Home'?'btn btn-primary':'btn btn-outline-secondary'} onClick={redirectHome}><a className='text-white' href='/'><span className='bi bi-house'></span></a></button>
      <button className={navigate.pathname==='/Cart'?'btn btn-primary':'btn btn-outline-secondary'} onClick={redirectCart}><span className='bi bi-cart'></span></button>
      <button className={navigate.pathname==='/Admin'?'btn btn-primary':'btn btn-outline-secondary'} onClick={redirectDashboard}><span className='bi bi-person-fill-gear'></span></button>
      
      
    </div>
    <div className='col-sm-5 d-flex flex-row align-items-center justify-content-around'>
      
  <div className='d-sm-none d-none d-md-block'><input className={`${styles.searchInput} form-control`} placeholder='search products' autoFocus={props.isFocus} onClick={handleSearchClick} onChange={handleSerach}></input></div>
    
      
      <div className={`${styles.profilediv} d-none d-sm-none d-md-block`}>
        {/* <button className={styles.profile_dd_btn} onClick={handleProfileDropDown}>
        <img  src={userData.profilePicture} height={50} width={50} alt='profile' className={styles.face}></img>
        </button> */}
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Profile
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="/profile">profile</a></li>
    <li><a href='/logout'>Logout</a></li>
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
               
           <img src={userData.profilePicture} height={50} width={50} alt='profile'></img>
     
           </div></div>
     
           <div style={{width:'100%',height:'40px'}} className='text-white d-flex justify-content-around'>
     <div> <span className='bi bi-box-arrow-right fs-3'></span></div>
     <div><p className='fs-4'>Logout</p></div>
     
     </div> 
     
          
     </div> : ''

   }
      </div>
   
   
      
   <div className='row p-2 ' >
    <ul style={{listStyleType:"none",display:"flex",justifyContent:"space-around", margin:"0"}}>
    <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Tshirt'>Tshirt</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Jens'>Jeans</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Shoes'>Shoes</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Dress'>Dress</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Skirt'>Skirt</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Jacket'>Jacket</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Activewear'>Activewear</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Accessories'>Accessories</a></li>
      <li ><a className='text-black' style={{textDecoration:"none"}} href='/category/Other'>Other</a></li>
    </ul>
    </div>

   
  </div>
   

 
  </>
  )
}

export default NavBar