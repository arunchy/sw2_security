import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Signup.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { curdSchema } from '../schema/crud';
import { createProductApi } from '../api/api';
import { toast } from 'react-toastify';

export default function Crud() {
  const noImage = `${process.env.PUBLIC_URL}/no_image.png`;
  const getMainImg = useRef();
  const getExtraImage1 = useRef();
  const getExtraImage2 = useRef();
  const getExtraImage3 = useRef();
  const [mainImg, setMainImg] = useState(noImage);
  const [extraImg1, setExtraImg1] = useState(noImage);
  const [extraImg2, setExtraImg2] = useState(noImage);
  const [extraImg3, setExtraImg3] = useState(noImage);
  const [add, setAdd] = useState(false);
  const [alert, setAlert] = useState(false);
  const [imageLink, setImageLink] = useState({
    mainImg: noImage,
    extraImg1: noImage,
    extraImg2: noImage,
    extraImg3:noImage,
  });



  const handleImageLink = (e) => {
    const { name, value } = e.target;
    // setImageLink((prevImageLink) => ({ ...prevImageLink, [name]: value }));
   if(e.target.type==="file"){
    const file=e.target.files[0];
    if(file){
      const objectUrl = URL.createObjectURL(file);
      setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));

    }else{
      setImageLink((prevImageLink)=>({...prevImageLink,[name]:value}));
    }
   }
  };



  const handleMainImg = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setMainImg(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
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
        setExtraImg1(file);
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
        setExtraImg2(file);
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
        setExtraImg3(objectUrl);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };







  const handleSetAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const initialValues = {
    productName: '',
    productDescription: '',
    productBrand: '',
    productPrice: '',
    productColor: '',
    productType: '',
    productAudience: '',
    sizeS: '',
    sizeM: '',
    sizeL: '',
    sizeXL: '',
    sizeXXL: '',
  };



  const { values, errors, handleBlur, handleChange, handleSubmit, touched, resetForm } = useFormik({
    initialValues:initialValues,
    validationSchema: curdSchema,
     
  });
  

  const handleAddProductBtn = async () => {
    console.log("add product clicked...")
    console.log("error: ",errors)
    console.log("data: ",initialValues)
    // const vendor=localStorage.getItem("user_id");
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();

      if (mainImg === noImage && extraImg1 === noImage && extraImg2 === noImage && extraImg3 === noImage) {
        Object.entries(imageLink).forEach(([key, value]) => formData.append(key, value));
      } else {
        formData.append('product_display_picture', mainImg);
        formData.append('product_extra_picture_1', extraImg1);
        formData.append('product_extra_picture2', extraImg2);
        formData.append('product_extra_picture3', extraImg3);
      }

      // Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      formData.append("product_name",values.productName);
      formData.append("product_brand",values.productBrand);
      formData.append("product_description",values.productDescription);
      formData.append("product_color",values.productColor);
      formData.append("product_size","XL");
      formData.append("product_audience",values.productAudience);
      formData.append("product_price",values.productPrice);
      formData.append("product_type",values.productType);
      formData.append("size_S",values.sizeS);
      formData.append("size_XS",values.sizeXL);
      formData.append("size_M",values.sizeM);
      formData.append("size_L",values.sizeL);
      formData.append("size_XL",values.sizeXL);
      formData.append("size_XXL",values.sizeXXL);
      

      try {
       const response=await createProductApi(formData);
       console.log("create product response: ",response.data);
       if(response.status===201){
        toast.success("product created successfully...")
        resetForm();
       }
      } catch (err) {
        console.error("Failed to add product:", err);
      }
    }
  };

  return (
    <div className={`container-fluid ${styles.body}`} >
      <div className='row'>
        <div className='col-sm-6'>
          <h2>Ecommerce Hub</h2>
        </div>
        <div className='col-sm-6'>
          <a href='/'>Home</a>
        </div>
      </div>
      <div className={`${styles.model} row mt-5 d-flex align-items-center justify-content-center`}>
        <div className={`${styles.innerModel} `}>
          <h5 className='text-center text-dark my-4'>Add New Product</h5>
          <form>
            <div className='row d-flex justify-content-center'>
              <div className='col-sm-6'>
                <span className='small text-danger'>{errors.productName}</span>
                <input type='text' className='form-control my-2' placeholder='Product FullName' name='productName' onChange={handleChange} onBlur={handleBlur} value={values.productName}></input>
                <span className='small text-black'>Select Product Brand</span>
                <input className='form-control' placeholder='Product Brand' name='productBrand' onChange={handleChange} onBlur={handleBlur}></input>
                <span className='small text-danger'>{errors.productBrand}</span>
                <br></br>
                <span className='text-black small'>Amount of Products</span>
                <div className='row d-flex justify-content-lg-between'>
                  <input className='form-control' placeholder='S' style={{width:'70px'}} name='sizeS' value={values.S} onChange={handleChange}></input>
                  <input className='form-control' placeholder='M' style={{width:'70px'}} name='sizeM' value={values.M} onChange={handleChange}></input>
                  <input className='form-control' placeholder='L' style={{width:'70px'}} name='sizeL' value={values.L} onChange={handleChange}></input>
                  <input className='form-control' placeholder='XL' style={{width:'70px'}} name='sizeXL' value={values.XL} onChange={handleChange}></input>
                  <input className='form-control' placeholder='XXL' style={{width:'70px'}} name='sizeXXL' value={values.XXL} onChange={handleChange}></input>
                </div>
                <span className='small text-danger'>{errors.S}</span>
                <span className='small text-danger'>{errors.M}</span>
                <span className='small text-danger'>{errors.L}</span>
                <span className='small text-danger'>{errors.XL}</span>
                <span className='small text-danger'>{errors.XXL}</span>

                <br></br> 
                 
                 
                <span className='small text-black'>Select Product Type</span>
                <select className='form-select' name='productType' onChange={handleChange} onBlur={handleBlur} value={values.productType}>
                  <option value='Jens'>Jens</option>
                  <option value='Tshirt'>Tshirt</option>
                  <option value='Shoes'>Shoes</option>
                  <option value='Dress'>Dress</option>
                  <option value='Skirt'>Skirt</option>
                  <option value='Shorts'>Shorts</option>
                  <option value='Jacket'>Jacket</option>
                  <option value='Activewear'>Activewear</option>
                </select>
                <span className='small text-danger'>{errors.productType}</span>
                <br />



                <span className='small text-black'>Select Product Audience</span>
                <select className='form-select' value={values.productAudience} name='productAudience' onChange={handleChange} onBlur={handleBlur}>
                  <option value='Men'>Men</option>
                  <option value='Women'>Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="">Children</option>

                </select>
                <span className='text-danger small'>{errors.productAudience}</span>
                <br></br>
               
                    <span className='text-primary small'>Select Main Picture</span>
                    <br></br>
                    <button onClick={() => getMainImg.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}} >
                      <img src={imageLink.mainImg} alt='mainImage' height={120} width={120}></img>
                    </button>
                    <input type='file' className='d-none' name='mainImg' ref={getMainImg} onChange={handleMainImg} required></input>
              
              </div>
              <div className='col-sm-6'>
                <textarea className='form-control' placeholder='Product Description' name='productDescription' value={values.productDescription} onChange={handleChange}></textarea>
                <span className='text-danger small'>{errors.productDescription}</span>
                <input className='form-control my-2' type='text' placeholder='Product Price' name='productPrice' value={values.productPrice} onChange={handleChange}></input>
                <span className='text-danger small'>{errors.productPrice}</span>
                <input className='form-control' placeholder='Product Color' name='productColor' value={values.productColor} onChange={handleChange} onBlur={handleBlur}></input>
                <span className='text-danger small'>{errors.productColor}</span>

                <div className='row'>
                  <div className='col-md-6 d-flex flex-column align-items-center'>
                   
                        <span className='text-primary my-3 small'>select Extra Picture1</span>
                        <button onClick={() => getExtraImage1.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}}>
                          <img src={imageLink.extraImg1} alt='extraImage1' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg1' ref={getExtraImage1} onChange={handleExtraImage1}></input>
                        <br></br> 
                    
                  </div>
                  <div className='col-md-6 d-flex flex-column align-items-center'>
                    
                        <span className='text-primary my-3 small'>select Extra Picture2</span>
                        <button onClick={() => getExtraImage2.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}}>
                          <img src={imageLink.extraImg2} alt='extraImage2' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg2' ref={getExtraImage2} onChange={handleExtraImage2}></input>
                        <br></br> 
                     
                  </div>

                  <div className='col-md-6 d-flex flex-column align-items-center'>
                    
                    <span className='text-primary my-3 small'>select Extra Picture3</span>
                    <button onClick={() => getExtraImage3.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}}>
                      <img src={imageLink.extraImg3} alt='extraImage3' height={120} width={120}></img>
                    </button>
                    <input type='file' className='d-none' name='extraImg3' ref={getExtraImage3} onChange={handleExtraImage3}></input>
                    <br></br> 
                 
              </div>


                </div>
                <div className='d-flex align-items-center justify-content-center'>
                  <button type='button' className='btn btn-danger m-2' onClick={handleAddProductBtn}>Add Product</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
