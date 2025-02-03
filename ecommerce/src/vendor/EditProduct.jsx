"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Signup.module.css';
import { getProductByIdApi } from '../api/api';
import { toast } from 'react-toastify';
import NavBar from './NavBar';
import { useNavigate, useParams } from 'react-router-dom';



export default function EditProduct() {
 const [product,setProduct]=useState({});
  const noImage = `${process.env.PUBLIC_URL}/no_image.png`;
  const getMainImg = useRef();
  const getExtraImage1 = useRef();
  const getExtraImage2 = useRef();
  const getExtraImage3 = useRef();
  const [imageLink, setImageLink] = useState({
    mainImg: null,
    extraImg1: null,
    extraImg2: null,
    extraImg3:null,
  });
 
  const navigate=useNavigate();
  const{id}=useParams();
  useEffect(()=>{
    if(!id){
        toast.error("product id required..");
        navigate('/vendor/home')
    }
    const getProductById=async()=>{
      try{
        const response =await getProductByIdApi(id);
        if(response.status !==200){
            toast.error("please login as vendor...");
            navigate("/vendor/login");
        }
        console.log("product:",response.data)
        setProduct(response.data)
      }catch(error){
         toast.error("please login as vendor...")
         navigate("/vendor/login")
      }
    }
    getProductById();
  },[])
const handleChange=()=>{

}

  const handleMainImg = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...");
      }
     }

  };
  const handleExtraImage1 = (e) => {
    e.preventDefault();
    const {name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };
  const handleExtraImage2 = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };
  const handleExtraImage3 = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };






  



 
  return (
    <div className={`container-fluid`} >
      <NavBar></NavBar>
      <div className={`${styles.model} row mt-5 d-flex align-items-center justify-content-center`} style={{marginTop:"130px"}}>
        <div className={`${styles.innerModel} `}>
          <h5 className='text-center text-dark my-4 fw-bold'>Update Product</h5>
          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <div className='col-md-4 col-sm-6'>
                <input type='text' className='form-control my-2' placeholder='Product FullName' name='product_name' onChange={handleChange}  value={product.product_name}></input>
                <input className='form-control' placeholder='Product Brand' name='product_brand' onChange={handleChange} value={product?.product_brand} ></input>
                <br></br>
                <span className='text-black small'>Amount of Products</span>
                <div className='row d-flex justify-content-lg-between'>
                  <input className='form-control' placeholder='S' style={{width:'70px'}} name='size_S' value={product?.size_S} onChange={handleChange} ></input>
                  <input className='form-control' placeholder='M' style={{width:'70px'}} name='size_M' value={product.size_M} onChange={handleChange} ></input>
                  <input className='form-control' placeholder='L' style={{width:'70px'}} name='size_L' value={product.size_L} onChange={handleChange} ></input>
                  <input className='form-control' placeholder='XL' style={{width:'70px'}} name='size_XL' value={product.size_XL} onChange={handleChange} ></input>
                  <input className='form-control' placeholder='XXL' style={{width:'70px'}} name='size_XXL' value={product?.size_XXL} onChange={handleChange} ></input>
                </div>
                
                <br></br>
               
               
                 
                 
                <span className='small text-black'>Select Product Type</span>
                <select className='form-select' name='product_type' onChange={handleChange} value={product?.product_type}>
                  <option value='Jens'>Jens</option>
                  <option value='Tshirt'>Tshirt</option>
                  <option value='Shoes'>Shoes</option>
                  <option value='Dress'>Dress</option>
                  <option value='Skirt'>Skirt</option>
                  <option value='Shorts'>Shorts</option>
                  <option value='Jacket'>Jacket</option>
                  <option value='Activewear'>Activewear</option>
                </select>
                <br />



                <span className='small text-black'>Select Product Audience</span>
                <select className='form-select' value={product?.product_audience} name='product_audience' onChange={handleChange} >
                  <option value='Men'>Men</option>
                  <option value='Women'>Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="">Children</option>

                </select>
                <br></br>
               
                    <span className='text-primary small'>Select Main Picture</span>
                    <br></br>
                    <button onClick={(e) =>{
                       e.preventDefault();
                       getMainImg.current.click()
                    } } style={{height:'120px', width:'120px', overflow:'hidden'}} >
                      <img src={`http://localhost:8000/${product?.product_display_picture}`} alt='mainImage' height={120} width={120}></img>
                    </button>
                    <input type='file' className='d-none' name='mainImg' ref={getMainImg} onChange={handleMainImg} required></input>
                    <br></br>
                    
              
              </div>
              <div className='col-md-4 col-sm-6'>
                <textarea className='form-control' placeholder='Product Description' name='product_description' value={product?.product_description} onChange={handleChange} ></textarea>
                <input className='form-control my-2' type='text' placeholder='Product Price' name='product_price' value={product?.product_price} onChange={handleChange}></input>
                <input className='form-control' placeholder='Product Color' name='product_color' value={product?.product_color} onChange={handleChange} ></input>
              
                 
                <div className='row'>
                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                   
                        <span className='text-primary my-3 small'>select Extra Picture1</span>
                        <button onClick={() => getExtraImage1.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}} >
                          <img src={`http://localhost:8000/${product?.product_extra_picture_1}`}alt='extraImage1' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg1' ref={getExtraImage1} onChange={handleExtraImage1} ></input>

                        <br></br> 
                    
                  </div>
                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                    
                        <span className='text-primary my-3 small'>select Extra Picture2</span>
                        <button onClick={() => getExtraImage2.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}} >
                          <img src={`http://localhost:8000/${product?.product_extra_picture_2}`} alt='extraImage2' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg2' ref={getExtraImage2} onChange={handleExtraImage2} ></input>
                        <br></br> 
                     
                  </div>

                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                    
                    <span className='text-primary my-3 small'>select Extra Picture3</span>
                    <button onClick={() => getExtraImage3.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}}>
                      <img src={`http://localhost:8000/${product?.product_extra_picture_3}`}alt='extra Image3' height={120} width={120} ></img>
                    </button>
                    <input type='file' className='d-none' name='extraImg3' ref={getExtraImage3} onChange={handleExtraImage3}></input>
                    <br></br> 
                 
              </div>


                </div>
                <div className='d-flex align-items-center justify-content-center my-4'>
                  <button type='submit' className='btn btn-primary my-2' >Upate Product</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
